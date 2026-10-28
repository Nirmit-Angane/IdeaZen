// Turns a generated plan (+ optional design kit) into the files and prompt an AI coding tool needs.
import type { Kit } from '@/content/kits';
import { projectToMarkdown } from './markdown';
import type { GeneratedProject } from './types';

export type Tool = 'any' | 'claude' | 'cursor' | 'agents';
export const TOOLS: { value: Tool; label: string; note: string }[] = [
  { value: 'any', label: 'Chat builder (Lovable, v0, Bolt, ChatGPT)', note: 'Paste the prompt into the chat.' },
  { value: 'claude', label: 'Claude Code', note: 'Unzip into the project root. CLAUDE.md points to AGENTS.md.' },
  { value: 'cursor', label: 'Cursor', note: 'Unzip into the project root. The rule is in .cursor/rules.' },
  { value: 'agents', label: 'Other coding agents (AGENTS.md)', note: 'Unzip into the project root.' },
];

export interface PackFile { path: string; content: string }
export interface Pack { prompt: string; files: PackFile[]; designMd: string }


const uxRules = () => `## Interaction states
Every interactive element needs all of these, not just the default:
- **Hover:** primary buttons darken about 8%; secondary buttons and rows get a subtle background tint. Hover is never the only way to reveal an action (touch has no hover).
- **Focus:** a visible 2px outline in the accent colour with a 2px offset. Never remove the outline without replacing it.
- **Active / pressed:** move 1px down or darken further, so the click feels acknowledged.
- **Disabled:** 45% opacity, not-allowed cursor, aria-disabled. If the reason is not obvious, say why next to the control.
- **Loading:** keep the button width, show a spinner, disable repeat clicks, and keep the label ("Saving...").
- **Selected / current:** differs by more than colour (weight, underline, check mark or bar).
- **Error:** danger colour plus an icon and text, never colour alone.

## Forms and validation
- Every field has a visible label above it. Never use a placeholder as the only label.
- Use the control border colour (3:1 contrast) for input and button borders, not the faint line colour.
- Use the right input type and autocomplete attribute; inputs are at least 16px on mobile so iOS does not zoom.
- Mark optional fields, not required ones. Keep forms as short as possible.
- Validate when the user leaves a field and again on submit; do not show errors while they are still typing.
- Put the error message under the field: say what went wrong and how to fix it ("Enter an email like name@example.com"). On submit with errors, move focus to the first invalid field.
- Never clear what the user typed after an error.

## Feedback and system status
- Acknowledge every action within 100ms (pressed state, spinner or optimistic update).
- Loads longer than about 300ms show a skeleton shaped like the content; longer than 10 seconds show progress or a way to cancel.
- Confirm non-critical actions with a toast (role="status", visible at least 5 seconds). Errors stay on screen until dismissed.
- Destructive actions ask for confirmation or offer Undo. Name the thing being deleted in the dialog.
- Empty states say what will appear here and offer one clear action. Error states say what happened and what to do next.

## Navigation and structure
- The user can always tell where they are: current item marked with aria-current and a non-colour cue.
- At most 7 top-level destinations. Keep navigation in the same place on every page.
- Links look like links. Buttons do things; links go places.
- The browser Back button works and URLs reflect state (filters, tabs, steps) so pages can be shared and reloaded.
- One primary action per screen.

## Responsive behaviour
- Design mobile first. Breakpoints: 480, 768, 1024, 1280 px. Single column below 768px.
- No horizontal scrolling at 320px width. Tables scroll inside their own container or collapse to stacked rows.
- Touch targets at least 44 by 44px with 8px between them. Dense desktop UIs may use smaller controls only for a fine pointer; enlarge them under \`@media (pointer: coarse)\`.
- Support zoom to 200% and user font-size changes; use rem for type and spacing where possible.

## Content and tone
- Sentence case. Buttons start with a verb that says what happens ("Save note", not "Submit"). Keep names consistent across screens.
- Plain language, no jargon, no filler. Do not blame the user in errors.

## Accessibility
- Text contrast at least 4.5:1; large text and interface borders at least 3:1.
- Use semantic HTML (button, a, nav, main, label, table). Every control is reachable and operable by keyboard in a logical order.
- Do not rely on colour alone to convey meaning. Give images alt text and icon-only buttons an accessible name.
- Respect prefers-reduced-motion. Set the page language.`;

export function kitToMarkdown(k: Kit): string {
  const t = k.tokens;
  const vars = [
    ['--bg', t.bg], ['--surface', t.surface], ['--ink', t.ink], ['--muted', t.muted], ['--line', t.line],
    ['--control', t.control], ['--danger', t.danger], ['--accent', t.accent], ['--accent-ink', t.accentInk], ...(t.accent2 ? [['--accent-2', t.accent2]] : []),
    ['--radius', k.shape.radius], ['--border-width', k.shape.border], ['--shadow', k.shape.shadow],
  ];
  return `# DESIGN.md: ${k.name}

${k.tagline}
Category: ${k.category}. Best for: ${k.bestFor.join('; ')}.

Follow this file for every screen and component. If something is not covered, choose the option closest to these principles. Do not substitute your own default style.

## Principles
${k.principles.map((p) => `- ${p}`).join('\n')}

## Colour tokens
Define these once (CSS variables or Tailwind theme) and use only these. No raw hex values in components.

\`\`\`css
:root {
${vars.map(([n, v]) => `  ${n}: ${v};`).join('\n')}
}
\`\`\`

| Token | Value | Use |
|-------|-------|-----|
| bg | ${t.bg} | page background |
| surface | ${t.surface} | panels, cards, inputs |
| ink | ${t.ink} | primary text |
| muted | ${t.muted} | secondary text, captions |
| line | ${t.line} | decorative dividers only (too faint for control borders) |
| control | ${t.control} | borders of inputs, buttons and other controls (3:1 contrast) |
| danger | ${t.danger} | errors and destructive actions (4.5:1 on bg and surface) |
| accent | ${t.accent} | primary action, links, active state |
| accent-ink | ${t.accentInk} | text on accent |
${t.accent2 ? `| accent-2 | ${t.accent2} | highlight (one phrase per screen) |\n` : ''}
## Typography
- Display / headings: ${k.fonts.display}
- Body: ${k.fonts.body}
- Mono: ${k.fonts.mono}
- Load them from Google Fonts or the framework's font loader. Keep body text at 16px or larger on mobile.
- Left-align text. Keep paragraphs under 70 characters wide.

## Shape and spacing
- Corner radius: ${k.shape.radius}
- Border: ${k.shape.border} solid ${k.shape.border === '2px' ? 'ink' : 'line'}
- Shadow: ${k.shape.shadow}
- Density: ${k.density}
- Type scale: ${k.scale.type}
- Spacing scale: ${k.scale.space} (use only these steps)

## Components
${Object.entries(k.components).map(([n, d]) => `- **${n}.** ${d}`).join('\n')}

## Layout
${k.layout.map((l) => `- ${l}`).join('\n')}

## Motion
${k.motion}

${uxRules()}

## Avoid
${k.avoid.map((a) => `- ${a}`).join('\n')}
`;
}

const defaultDesign = (p: GeneratedProject) => `# DESIGN.md: general rules for ${p.title}

No design kit was chosen, so use these rules to keep the interface from looking like a default AI template. Pick ONE direction and apply it everywhere.

## Do
- Choose a palette of 4 to 6 named colours (background, surface, ink, muted, one accent) and define them once as CSS variables or Tailwind theme tokens. No raw hex values in components.
- Choose one or two typefaces on purpose (not the framework default) and a type scale with clear steps.
- Use one corner radius for interactive controls and a different, deliberate one for panels.
- Separate regions with spacing, 1px borders or background steps rather than the same shadow on everything.
- Left-align text. Keep paragraphs under 70 characters wide.
- Design empty, loading and error states for every list and form.
- Make every control keyboard accessible with a visible focus ring; text contrast at least 4.5:1; touch targets at least 44px.

## Avoid
- Purple-to-blue gradients, glowing blobs and glassmorphism.
- A grid of identical rounded white cards with soft grey shadows.
- Icon-in-a-circle feature trios and stock illustrations.
- Centred paragraph text and all-caps labels above every heading.
- Emoji used as icons.
- Animations on every element; use motion only to show what changed.

${uxRules()}

Browse ready-made kits with exact tokens at https://ideazen.vercel.app/design.
`;

const stackMd = (p: GeneratedProject) => {
  const lines = [`# STACK.md: ${p.title}`, '', '## Use', ...(p.techStack.primary.length
    ? p.techStack.primary.map((t) => `- **${t.name}**${t.role ? `: ${t.role}` : ''}${t.reason ? `. ${t.reason}` : ''}`)
    : ['- No stack was specified. Choose the simplest mainstream stack and record the choice here.'])];
  if (p.techStack.alternative.length)
    lines.push('', '## Alternatives (only if the main choice blocks you)', ...p.techStack.alternative.map((t) => `- **${t.name}**${t.whenToUse ? `: ${t.whenToUse}` : ''}`));
  lines.push('', '## Rules', '- Do not add libraries beyond this list without a stated reason.', '- Prefer built-in platform features over new dependencies.', '- Keep configuration in environment variables; never commit secrets.');
  return lines.join('\n') + '\n';
};

const agentsMd = (p: GeneratedProject) => `# AGENTS.md

Instructions for AI coding tools working on **${p.title}**.

## Read first
- docs/PROJECT.md: what to build, features and the phased roadmap
- docs/STACK.md: the tech stack and rules about dependencies
- docs/DESIGN.md: the design system. Follow it for every screen.

## How to work
- Build one roadmap phase at a time, in order. Finish and run a phase before starting the next.
- Before writing code for a phase, list the files you will create or change.
- Implement only what the current phase asks for. Do not add features, pages or abstractions that are not in docs/PROJECT.md.
- Keep changes small and runnable. After each phase the app should start without errors.
- Add tests for logic that is easy to get wrong (calculations, parsing, permissions).
- If the plan is unclear or two requirements conflict, ask a short question instead of guessing.

## Definition of done
${p.mvp?.conditions.length ? p.mvp.conditions.map((c) => `- ${c}`).join('\n') : '- The core flow works end to end and the app runs without errors.'}

## Design
- Follow docs/DESIGN.md exactly. Use its tokens; no raw colour values in components.
- Do not fall back on a default style (gradients, identical rounded cards, emoji icons).

## Code
- Match the existing code style. Keep functions small and name things plainly.
- Handle loading, empty and error states for anything that fetches or lists data.
`;

const cursorRule = (agents: string) =>
  `---\ndescription: Project brief and working rules for ${'this project'}\nalwaysApply: true\n---\n\n${agents.replace(/^# AGENTS.md\n\n/, '')}`;

export function buildPack(p: GeneratedProject, kit: Kit | null, tool: Tool): Pack {
  const designMd = kit ? kitToMarkdown(kit) : defaultDesign(p);
  const projectMd = projectToMarkdown(p);
  const stack = stackMd(p);
  const agents = agentsMd(p);

  const files: PackFile[] = [{ path: 'AGENTS.md', content: agents }];
  if (tool === 'claude') files.push({ path: 'CLAUDE.md', content: '@AGENTS.md\n' });
  if (tool === 'cursor') files.push({ path: '.cursor/rules/ideazen.mdc', content: cursorRule(agents) });
  files.push(
    { path: 'docs/PROJECT.md', content: projectMd },
    { path: 'docs/STACK.md', content: stack },
    { path: 'docs/DESIGN.md', content: designMd },
  );

  const prompt = `I want you to build "${p.title}". Everything you need is below: the project brief, the tech stack and the design system.

How to work:
- Build one roadmap phase at a time and stop after each phase so I can review it.
- Implement only what is in the brief; do not add extra features.
- Follow the design system exactly. Do not use your default style.
- Ask a short question if anything is unclear.

Start with Phase 1 only.

---

${projectMd}
---

${stack}
---

${designMd}`;

  return { prompt, files, designMd };
}
