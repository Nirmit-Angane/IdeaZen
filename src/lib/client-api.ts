// Browser-side calls to our own API routes.
import { normalizeHackathon, normalizeIdeas, normalizeProject } from './normalize';
import type { GeneratedProject, IdeaCard, UserInputs } from './types';
import type { HackathonInputs, HackathonRoadmap } from './hackathon-types';

async function post(url: string, body: unknown, signal?: AbortSignal): Promise<any> {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export async function fetchIdeas(inputs: UserInputs, signal?: AbortSignal): Promise<IdeaCard[]> {
  const ideas = normalizeIdeas(await post('/api/generate', { ...inputs, mode: 'suggestions' }, signal));
  if (!ideas.length) throw new Error('The AI returned no ideas. Try again.');
  return ideas;
}

export async function fetchBlueprint(
  inputs: UserInputs, title: string, stretch?: 'simpler' | 'more-complex', signal?: AbortSignal,
): Promise<GeneratedProject> {
  const raw = await post('/api/generate', {
    ...inputs, mode: stretch ? 'refine' : 'blueprint', selectedProjectTitle: title, difficultyStretch: stretch,
  }, signal);
  const p = normalizeProject(Array.isArray(raw) ? raw[0] : raw);
  if (!p.roadmap.length) throw new Error('The AI returned an incomplete plan. Try again.');
  return p;
}

export async function fetchHackathon(inputs: HackathonInputs, signal?: AbortSignal): Promise<HackathonRoadmap> {
  return normalizeHackathon(await post('/api/hackathon', inputs, signal), inputs.projectTitle, inputs.timeline);
}
