import type { GeneratedProject } from './types';
import type { HackathonRoadmap } from './hackathon-types';

const list = (xs: string[]) => xs.map((x) => `- ${x}`).join('\n');

export function projectToMarkdown(p: GeneratedProject): string {
  const out: string[] = [`# ${p.title}`, ''];
  if (p.tagline) out.push(`> ${p.tagline}`, '');
  out.push(p.description, '', `**Difficulty:** ${p.difficulty} (${p.difficultyScore}/10) · **Feasibility:** ${p.feasibility}`, '');
  if (p.features.length) out.push('## Features', ...p.features.map((f) => `- **${f.name}** (${f.tier}): ${f.description}`), '');
  if (p.techStack.primary.length)
    out.push('## Tech stack', ...p.techStack.primary.map((t) => `- **${t.name}**${t.role ? ` — ${t.role}` : ''}${t.reason ? `. ${t.reason}` : ''}`), '');
  if (p.mvp) out.push('## MVP', p.mvp.description, '', list(p.mvp.conditions), '');
  out.push('## Roadmap');
  p.roadmap.forEach((r) => {
    out.push('', `### Phase ${r.phase}: ${r.title}${r.weekRange ? ` (${r.weekRange})` : ''}`);
    if (r.deliverable) out.push(`Deliverable: ${r.deliverable}`, '');
    out.push(...r.tasks.map((t) => `- [ ] ${t}`));
  });
  if (p.firstCommitGuide?.steps.length)
    out.push('', '## First commit', p.firstCommitGuide.intro, '', '```bash', ...p.firstCommitGuide.steps.map((s) => s.action), '```');
  if (p.pitfalls?.length) out.push('', '## Pitfalls', ...p.pitfalls.map((x) => `- **${x.pitfall}**: ${x.why} Fix: ${x.mitigation}`));
  if (p.resources?.length) out.push('', '## Resources', ...p.resources.map((r) => `- ${r.url ? `[${r.title}](${r.url})` : r.title} (${r.source})`));
  return out.join('\n') + '\n';
}

export function hackathonToMarkdown(h: HackathonRoadmap): string {
  const out: string[] = [`# ${h.title} — ${h.timeline} hackathon plan`, '', h.strategicAnalysis.achievability, ''];
  if (h.strategicAnalysis.winningAngle) out.push(`**Winning angle:** ${h.strategicAnalysis.winningAngle}`, '');
  if (h.strategicAnalysis.biggestRisk) out.push(`**Biggest risk:** ${h.strategicAnalysis.biggestRisk}`, '');
  out.push('## Plan');
  h.roadmap.forEach((r) => {
    out.push('', `### ${r.timeBlock ?? `Phase ${r.phase}`}${r.title ? `: ${r.title}` : ''}`);
    if (r.goal) out.push(`Goal: ${r.goal}`, '');
    out.push(...r.tasks.map((t) => `- [ ] ${t.task}${t.duration ? ` (${t.duration})` : ''}${t.assignedTo ? ` — ${t.assignedTo}` : ''}`));
  });
  out.push('', '## Scope', '**Must have**', list(h.mvpScope.mustHave), '', '**Nice to have**', list(h.mvpScope.niceToHave), '', '**Cut if needed**', list(h.mvpScope.cutIfNeeded));
  if (h.risks.length) out.push('', '## Risks', ...h.risks.map((r) => `- **${r.risk}**: ${r.mitigation}`));
  if (h.submissionChecklist.length) out.push('', '## Submission checklist', ...h.submissionChecklist.map((c) => `- [ ] ${c.item}${c.timeAllocation ? ` (${c.timeAllocation})` : ''}`));
  const d = h.demoScript;
  if (d.hook) out.push('', '## Demo script', `1. **Hook:** ${d.hook}`, `2. **Problem:** ${d.problem}`, `3. **The wow:** ${d.theWOW}`, `4. **Close:** ${d.closing}`);
  return out.join('\n') + '\n';
}

export function download(filename: string, content: string, type = 'text/markdown') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'idea';
