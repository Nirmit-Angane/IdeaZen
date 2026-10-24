import { QUESTIONS, type Question } from './questions';
import type { SkillLevel, UserInputs } from './types';

export const LEVELS = [
  { value: 'beginner', label: 'Beginner', hint: 'Learning fundamentals. Step-by-step projects with small scope.' },
  { value: 'intermediate', label: 'Intermediate', hint: 'Comfortable building apps. Wants new patterns and real-world features.' },
  { value: 'advanced', label: 'Advanced', hint: 'Architecture, scale and production concerns. Complex systems.' },
] as const;

export const isLevel = (v: string | null): v is Exclude<SkillLevel, null> => v === 'beginner' || v === 'intermediate' || v === 'advanced';

export const questionsFor = (level: Exclude<SkillLevel, null>): Question[] => QUESTIONS[level];

const labelOf = (q: Question, value: string) => q.options.find((o) => o.value === value)?.label ?? value;

/** URL params (option values, comma-separated for multi-select) -> the labelled inputs the API expects. */
export function inputsFromParams(params: URLSearchParams): UserInputs | null {
  const level = params.get('level');
  if (!isLevel(level)) return null;
  const inputs: Record<string, unknown> = { skillLevel: level };
  for (const q of questionsFor(level)) {
    const raw = params.get(q.id);
    if (!raw) continue;
    const values = raw.split(',').filter(Boolean);
    if (q.id === 'technologies') {
      const labels = values.filter((v) => v !== 'not-sure').map((v) => labelOf(q, v));
      if (labels.length) inputs.technologies = labels;
    } else {
      inputs[q.id] = values.map((v) => labelOf(q, v)).join(', ');
    }
  }
  return inputs as unknown as UserInputs;
}

/** Keeps only wizard answers, so other params (like a chosen title) don't leak into the next step. */
export function answersQuery(params: URLSearchParams): string {
  const level = params.get('level');
  if (!isLevel(level)) return '';
  const out = new URLSearchParams({ level });
  for (const q of questionsFor(level)) {
    const v = params.get(q.id);
    if (v) out.set(q.id, v);
  }
  return out.toString();
}
