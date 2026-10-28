# IdeaZen

Free project plans for developers: answer a few questions, get three project ideas, then a full build plan (features, stack, phased roadmap, first-commit guide). Plus an hour-by-hour hackathon planner and a hand-written idea library.

Live: https://ideazen.vercel.app

## Stack
Next.js (App Router) · React 19 · Tailwind CSS v4 · TypeScript · zod · Groq (gpt-oss-120b, with gpt-oss-20b as backup) · Vitest

No database and no accounts. Saved plans and progress live in the browser (`localStorage`, key `ideazen:v1`). Share links carry the plan in the URL fragment.

## Run it
```bash
npm install
cp .env.example .env.local   # add your GROQ_API_KEY
npm run dev                  # http://localhost:3000
npm test                     # API + helper tests
npm run build
```

## Environment
| Variable | Required | Purpose |
|----------|----------|---------|
| `GROQ_API_KEY` | yes | Groq API key (console.groq.com) |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical origin for sitemap/metadata. Default `https://ideazen.vercel.app` |
| `GROQ_MODEL` / `GROQ_FALLBACK_MODEL` | no | Main and backup chat models. Defaults `openai/gpt-oss-120b` / `openai/gpt-oss-20b` |
| `PROMPT_GUARD_MODEL` | no | Injection detector. Default `meta-llama/llama-prompt-guard-2-86m` |
| `RATE_LIMIT_PER_HOUR` | no | Per-IP generations per hour. Default 20 |
| `GLOBAL_DAILY_LIMIT` | no | Total generations per day per server instance. Default 3000 |

## Layout
```
src/app/            routes (generate wizard, spec, hackathon, ideas, guides, saved, s=share, api/*)
src/components/     ui primitives, SpecView, HackathonView, site chrome
src/content/        hand-written ideas, guides, FAQ, design kits (kits.ts: add a kit by appending to KITS and a layout in kit-preview.tsx)
src/lib/            storage, share, markdown export, normalize (model output), wizard, server/common (API guard)
docs/redesign/      audit, strategy, design system, architecture, roadmap, SEO/AEO plan
```

## Design
"Spec Sheet": the output is a build spec, so the UI looks like one. Tokens are in `src/app/globals.css`; see `docs/redesign/03-DESIGN-SYSTEM.md`.

## API security
The API can only turn validated inputs into a project plan; it is not a chat endpoint.
- Same-origin only in production (other sites and scripts get 403), 8 KB body cap, per-IP hourly limit and a daily total cap.
- Every field except the project title must match the wizard's own options (`src/lib/server/allowed.ts`).
- The title is screened three ways: pattern check, Llama Prompt Guard, and a separate yes/no "is this a software project?" call. Failures return a clear 400 before the main model runs.
- Output is rebuilt from known plan fields only, with every string length-capped, so extra model text never reaches the user.
- Model names are config, with automatic retry on the backup model.

## Notes
- The rate limiters are in memory per serverless instance (reset on cold start, not shared). Move to Upstash/Vercel KV if abuse appears.
- Model output is untrusted: `src/lib/normalize.ts` coerces it before rendering. Resource links from the model can be wrong; the UI says so.
- Adding a library idea: append to `IDEAS` in `src/content/ideas.ts`. Listing pages appear automatically once a stack has 3 ideas (or a stack+level has 2).
