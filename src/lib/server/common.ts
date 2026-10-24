// Shared by every API route: request guard, input cleaning, Groq call.
import { z } from 'zod';

const GROQ_API_URL = process.env.GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

/** Short free-text field: strips characters that could break out of the prompt/JSON template. */
export const text = (max = 100) =>
  z.string().trim().max(max).transform((s) => s.replace(/[\r\n\t"{}\\`]/g, ' '));

// ponytail: per-instance in-memory limiter (resets on cold start, not shared across instances).
// Upgrade to Upstash/Vercel KV when real traffic arrives.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;

function rateLimited(ip: string): boolean {
  const limit = Number(process.env.RATE_LIMIT_PER_HOUR || 20);
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > limit;
}

const err = (status: number, error: string) => Response.json({ error }, { status });

type Guarded<T> = { data: T; res?: undefined } | { data?: undefined; res: Response };

/** Origin + rate checks and body validation. Returns parsed data, or a ready-made error Response. */
export async function guard<T extends z.ZodTypeAny>(req: Request, schema: T): Promise<Guarded<z.infer<T>>> {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (process.env.NODE_ENV === 'production' && origin && host && new URL(origin).host !== host) {
    return { res: err(403, 'Forbidden') };
  }
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return { res: err(429, 'Too many requests. Try again in a while.') };

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return { res: err(400, 'Invalid request: ' + parsed.error.issues.map((i) => i.path.join('.')).join(', ')) };
  }
  return { data: parsed.data };
}

export class UpstreamError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** One JSON-mode completion. Throws UpstreamError with a user-safe message. */
export async function groqJson(
  system: string,
  user: string,
  opts: { temperature: number; maxTokens: number },
): Promise<any> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new UpstreamError(500, 'Server configuration error: missing API key');

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: { type: 'json_object' },
      temperature: opts.temperature,
      max_tokens: opts.maxTokens,
    }),
  });
  if (!response.ok) {
    console.error('[api] Groq status', response.status);
    throw new UpstreamError(response.status === 429 ? 429 : 502, 'The AI service is busy. Please try again.');
  }
  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content ?? '';
  try {
    return JSON.parse(content.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim());
  } catch {
    console.error('[api] unparseable model output, length', content.length);
    throw new UpstreamError(502, 'Failed to parse AI response. Please try again.');
  }
}

export function fail(e: unknown): Response {
  if (e instanceof UpstreamError) return err(e.status, e.message);
  console.error('[api] unexpected', e);
  return err(500, 'Unexpected server error. Please try again.');
}

export const json = (body: unknown) => Response.json(body);
export { err as errorResponse };
