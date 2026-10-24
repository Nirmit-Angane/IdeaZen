# 03 — Design system: "Spec Sheet"

## Concept
IdeaZen's output is a *build spec*. So the product should look like artefacts developers already trust: a README, a file tree, a `git log`, a terminal. Not a SaaS marketing page. Identity: **a well-typeset engineering document with a highlighter pen** — calm, dense where it should be, one loud mark.

Memorable element (spend boldness here only): **the highlighter.** Key phrases in specs, the selected wizard option, and the primary action get a flat marker-yellow underlay, like highlighting a printed spec. Everything else stays quiet.

## What we are deliberately NOT doing
Navy/cyan/violet gradients; blurred blobs; identical rounded white cards with the same shadow; icon-in-circle feature trios; ALL-CAPS eyebrow labels over every heading; one-word-coloured headlines; fade-up on every section; cream + terracotta; black + acid green.

## Palette (light default; dark is a designed theme, not inverted)
| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--paper` | `#F3F4F1` | `#101512` | page |
| `--sheet` | `#FBFBF9` | `#171D19` | spec surfaces |
| `--ink` | `#14201A` | `#E8EDE9` | text |
| `--ink-2` | `#4A5750` | `#9AA79F` | secondary text |
| `--rule` | `#D5D9D2` | `#2A332D` | 1px borders |
| `--mark` | `#F5D547` | `#F5D547` | highlighter, primary CTA fill |
| `--pine` | `#1E4D3B` | `#7FC4A4` | links, success, progress |
| `--redpen` | `#C8452D` | `#F07B65` | errors, pitfalls |

Rules: ink-on-mark text only; never mark as text colour on paper. Three semantic colours total. No gradients, no glow. Contrast verified with axe in CI before ship (values above are a starting point, not yet measured).

## Type
- **Schibsted Grotesk** (variable) for UI and headlines; tight tracking on display (−0.02em); sentence case everywhere.
- **JetBrains Mono** only for real code: commands, file trees, hour/week stamps.
- Scale 1.25: 14 / 16 / 20 / 25 / 31 / 39 / 61. Body 16–17px, line-height 1.6, measure ≤ 68ch.
- Self-host with `next/font` (no layout shift).

## Layout & shape
- 12-col grid, max width 1120px; spec reading column 68ch.
- Radius by role: 2px inputs/tags, 6px panels, 0 elsewhere.
- No shadows. Separation via 1px rules and background steps (`paper` → `sheet`).
- 4px spacing base; section rhythm 96 / 64 / 40.
- Left-aligned text throughout.

## Signature components
1. **SpecSheet** — blueprint as a document: title, one-line tagline, metadata row (difficulty, time, stack), sections. Sticky left rail = README-style TOC with scroll-spy and completion %.
2. **FileTree** — proposed repo structure in mono, collapsible.
3. **CommitLog roadmap** — phases as a vertical git log: node, id (`p1`), title, week range in mono, tasks as persisted checkboxes.
4. **Terminal block** — first-commit commands with copy button.
5. **MatchMeter** — three horizontal bars (skill / stack / time) with numbers; no radial charts.
6. **Wizard** — one question per screen, large option rows (not cards), keys 1–9 to choose, `?step=` in URL, highlighter on selection.
7. **IdeaRow** — library entries as dense rows (title, stack chips, level, time), not a card grid.
8. **Overlays** (toast, dialog, tabs, tooltip, dropdown) — keep Radix primitives for these only, styled to tokens.

## Landing hero
The hero **is the product**. Left: plain headline plus a 3-field inline form (level, stack, time) and one button, "Generate spec". Right: a live SpecSheet that streams a real example once on load, then rests. Below: 6 real indexed specs as IdeaRows → hackathon mode → FAQ. No stock illustration.

## Motion
One orchestrated moment (the streaming spec) plus the highlighter swipe (scaleX 0→1, 400ms) on selection. Everything else instant. Respect `prefers-reduced-motion`.

## Accessibility floor
2px pine focus ring, fully keyboard-driven wizard, AA contrast, landmarks, `aria-live` for generation status, 44px touch targets, usable at 320px.

## Voice
Plain verbs, sentence case. "Generate spec", "Export to GitHub", "Save idea". Errors say what failed and what to do: "The model timed out. Your answers are saved — retry." Ban: magic, supercharge, seamless, unlock.

## Implementation
Tailwind v4 `@theme` tokens in a single `tokens.css`; no raw hex in components (lint rule). Internal `/design` route showing every component in both themes.

## Logo: Route Z (chosen)
The Z of IdeaZen drawn as a git branch path: three commit nodes at the bends and a yellow dot where the project ships. Chosen from six concepts (kept in `docs/brand/`) for being both a letter and a recognisable developer symbol.

- Mark component: `src/components/logo.tsx` (follows theme tokens, so it inverts in dark mode).
- Static assets in `public/`: `logo-mark.svg`, `logo-lockup.png` (dark text, for light backgrounds), `logo-lockup-light.png` (for dark backgrounds), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon.ico`. `src/app/icon.svg` is the browser-tab icon.
- Clear space: at least the height of one commit node (about 1/8 of the mark) on every side. Minimum size 16px. Do not recolour the yellow dot; do not use gradients or shadows.
- Palette for the mark: ink `#14201a`, paper `#f3f4f1`, highlighter `#f5d547`.
