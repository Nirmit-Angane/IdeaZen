# 01 — Audit of the current repo

Audited: commit `8ca673a`, 19 commits, files under `src/`, `api/`, config, `docs/`.

## What the product does today
Flow: Landing → skill level (beginner/intermediate/advanced) → 4–8 adaptive questions → `POST /api/generate {mode:'suggestions'}` returns 3 idea cards → pick one → `{mode:'blueprint'}` returns a full blueprint (features, stack, 4 phases × 5–7 tasks, first-commit guide, pitfalls, resources, portfolio blurb) → save to localStorage, PDF export.
Second flow: Hackathon → title + team/timeline/submission questions → `POST /api/hackathon` → hour-ranged roadmap with strategy, risks, checklist.
Model: Groq `llama-3.3-70b-versatile`, JSON mode, temp 0.7, 6000 max tokens.

## Problems, ranked

### Critical
| # | Issue | Evidence | Fix |
|---|-------|----------|-----|
| C1 | **Invisible to search.** Pure client-rendered SPA; `index.html` title is "AI Project Idea Generator UI", no description, OG, canonical, sitemap, robots. | `index.html` | Server-rendered/prerendered pages (04, 06) |
| C2 | **Open, unauthenticated AI endpoint.** No rate limit, no origin check, no input validation. Anyone can burn your Groq quota. | `api/generate.ts`, `api/hackathon.ts` | Rate limit per IP, zod validation, origin allow-list, token caps |
| C3 | **Prompt injection / JSON breakage.** `selectedProjectTitle`, `projectTitle` interpolated raw into prompts (and into the JSON template). | `generate.ts:92`, `hackathon.ts:34` | Validate + length-cap, pass as data not template |
| C4 | **Hackathon mode is not AI-powered.** `hackathon.service.ts` never calls `/api/hackathon`; it waits 2.5s and returns a hard-coded template. README claims otherwise. **FIXED in Phase 0** (service now calls the API). | `src/services/hackathon.service.ts` | Done |
| C5 | **"Refine / simplify / harder" doesn't refine.** `refineIdea()` calls blueprint mode; server `refine` mode exists but nothing calls it; `difficultyStretch` is passed but blueprint prompt ignores it. | `generate.service.ts`, `generate.ts:149` | Real refine call with the existing blueprint as input |
| C6 | **Fake share link.** Copies `/project/<slug>`, a route that doesn't exist. | `ProjectOutput.tsx:112` | Real persisted share pages |

### High
- State lives in an exported mutable object `_sharedState` in `App.tsx`. Refresh on `/idea-preview` or `/hackathon/output` loses everything and bounces to `/`. `any` casts hide a shape mismatch (`hackathonContext as any`).
- Duplicate persistence code: `saveProjectById/loadProjectById` exist in both `App.tsx` and `useSavedProjects.ts`. Delete-by-title deletes the wrong item if two share a title.
- `console.log` of the full raw model response on the server; `alert()`-style placeholders per earlier docs.
- Zero tests exist although Vitest, Testing Library and fast-check are installed.
- Model output is trusted: no schema validation, so a missing `roadmap` crashes `ProjectOutput` (893 lines).
- Resource URLs are LLM-generated and often hallucinated.

### Medium (bloat)
- **0 of 45 shadcn `components/ui/*` files are imported by any screen.** ~25 Radix packages, recharts, react-day-picker, cmdk, vaul, embla, input-otp, react-resizable-panels, next-themes, react-hook-form, `@types/react-router-dom` (v7 ships its own) are dead weight. Also `@types/react` is 19 while `react` is 18.
- `vite.config.ts`: ~40 version-pinned aliases (Figma-export leftover) do nothing.
- `src/index.css` (3,844 lines) is a compiled Tailwind v4.1.3 output that nothing imports. `main.tsx` imports `globals.css` twice.
- `build/` (compiled output) is committed; Vite writes to `dist/`.
- `README` says dev server is :5173; `vite.config` says :3000.
- `LandingPage.tsx` embeds a `<style>` block of keyframes; `ProjectOutput.tsx` (893), `HackathonQuestions.tsx` (696, appears unused next to `HackathonQuestionFlow`), `ModeSelection.tsx`, `ProblemStatementUpload.tsx` are likely orphaned — verify before deleting.
- ~200 inline hex colours (`#1F3C88` ×178, `#22D3EE` ×74, `#FF6B35` ×51): no real token usage.

## Design critique (why it reads "AI-generated")
- Navy→violet gradient buttons, cyan accents, soft blurred blobs at 2% opacity, rounded-xl white cards with identical shadows: the stock SaaS kit.
- Headline pattern "Stop Wondering." + emoji/icon feature trio + FAQ accordion: interchangeable with a thousand landing pages.
- Four unrelated accent colours (navy, cyan, orange, violet) with no hierarchy.
- The product's real value (a concrete build spec) is hidden behind a long wizard; the landing page never shows an actual output.

## Keep
Two-stage generation (cards → blueprint), the adaptive questions, hackathon mode, first-commit guide, pitfalls, match breakdown. The *content model* is good; the shell around it is what to replace.
