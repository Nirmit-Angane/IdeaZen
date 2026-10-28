# 07 — Roadmap

Phases are ordered by dependency. Durations assume one developer part-time-to-full-time; adjust.

## Phase 0 — Stabilise (DONE except SEO quick-win; see status below)
- [ ] Delete dead code/deps (doc 04 cleanup list); confirm `npm run build` still passes
- [ ] Zod schemas + validation + rate limit on both API routes; fix hackathon payload mismatch
- [ ] Real refine mode wired to UI
- [ ] Quick-win SEO in `index.html` + robots/sitemap/llms.txt (doc 06 §7)
- [ ] Remove committed `build/`; fix README ports
- [ ] First tests: schemas, prompt builders
**Exit:** API safe to leave public; repo noticeably smaller.

## Phase 1 — Platform migration (1 week)
- [ ] Next.js App Router scaffold; Tailwind v4 tokens file; fonts
- [ ] Port API → route handlers (streaming); delete `local-api.js`
- [ ] URL-state wizard replacing `_sharedState`
- [ ] CI: typecheck, lint, test, build, Lighthouse
**Exit:** current feature set running on new stack, old design.

## Phase 2 — Design system (1 week)
- [ ] `tokens.css`, Schibsted Grotesk + JetBrains Mono, light + dark
- [ ] Primitives: Button, Input, Option row, Tag, Tabs, Dialog, Toast, Tooltip
- [ ] Signature components: SpecSheet, CommitLog, FileTree, Terminal, MatchMeter
- [ ] `/design` page; axe pass
**Exit:** component gallery signed off by you.

## Phase 3 — Core screens (1–1.5 weeks)
- [ ] Landing with live spec hero
- [ ] Wizard (one question per step, keyboard), idea selection as IdeaRows
- [ ] Spec page (+ rail, progress checkboxes, refine controls, export md/pdf)
- [ ] Hackathon entry, wizard, roadmap, pitch kit
- [ ] Share pages + OG images
**Exit:** every existing flow redesigned, all P0 features done.

## Phase 4 — Retention features (1–1.5 weeks)
- [ ] Dashboard + progress persistence in localStorage, JSON backup/import
- [ ] GitHub export bundle (README, ROADMAP, `gh` issue script)
- [ ] Idea library with filters; seed 30–50 curated specs (generate, then human review)
- [ ] Hackathon live mode
**Exit:** reasons to return exist.

## Phase 5 — SEO/AEO content (parallel from Phase 3; 1 week focused)
- [ ] sitemap/robots/metadata/JSON-LD across all templates
- [ ] 30 stack×level pages with reviewed content; 10 guides
- [ ] About/FAQ/privacy; author + dates
- [ ] Search Console + Bing verified, sitemaps submitted
- [ ] Original-data post once ≥ 500 generations exist
**Exit:** Lighthouse SEO 100; all public URLs indexable.

## Phase 6 — Launch (3–4 days)
- [ ] Playwright happy paths; load test rate limiter; set Groq spend alert
- [ ] Pick domain, set `NEXT_PUBLIC_SITE_URL`, redirects from old URLs
- [ ] Product Hunt, Show HN, dev.to post, GitHub topics
- [ ] Analytics dashboard for activation/retention metrics

## Risks
| Risk | Mitigation |
|------|-----------|
| Groq quota or model changes | Provider wrapper + fallback model + cache |
| Thin-content demotion | Human-review gate for programmatic pages |
| Scope creep | P2/P3 stay out until Phase 6 metrics exist |
| localStorage data loss | JSON export/import; versioned storage key |

## Suggested first working session
Phase 0 in full. It is small, independent of every open decision except none, and makes the live app safer immediately.

## Phase 0 status
- [x] Dead code/deps removed (45 ui files, ~35 packages, compiled CSS, `build/`, orphan screens, vite aliases)
- [x] zod validation, input cleaning, origin check, per-IP rate limit (in-memory) on both endpoints
- [x] Hackathon mode wired to the real API; real refine mode; one-shot `difficultyStretch`
- [x] 5 API tests passing; `tsc` and `vite build` clean
- [ ] Quick-win SEO in index.html + robots/sitemap/llms.txt (domain unknown; skipped until Next.js metadata)
- Known gap: refine/simplify after a page refresh fails (400) because wizard answers live in memory; fixed by URL-state wizard in Phase 1.

## Build status (2026-10-24)
Done in code: Phase 1 (Next.js, API routes with zod/limits, URL-state wizard, localStorage store with legacy-key migration), Phase 2 core (tokens, primitives, SpecView, CommitLog roadmap, terminal block, meters), Phase 3 (landing, wizard, ideas, spec, hackathon, share, saved), Phase 4 partial (progress tracking, JSON backup/restore, Markdown + print export), Phase 5 base (sitemap, robots, llms.txt, JSON-LD, OG image, 13 library ideas, 3 guides, FAQ/about/privacy).
Not done: GitHub export bundle, hackathon live mode and pitch kit, compare ideas, Lighthouse/axe CI, Playwright tests in repo, more library and guide content, Search Console setup (needs your Google account).

## AI pack and design kits (2026-10-28)
Done: "Build it with AI" panel on every plan (tool + design selector, copy prompt, .zip with AGENTS.md / CLAUDE.md / Cursor rule / docs/PROJECT, STACK, DESIGN); /design library with 4 original kits (Ledger, Marginalia, Night Shift, Launchpad), live previews, copy/download DESIGN.md; sitemap, llms.txt, nav and landing teaser.
Next: "Describe your project" (AI picks a kit and stack from a short description), stack advisor, more kits (portfolio, blog/docs, mobile), and a with/without DESIGN.md comparison to prove the benefit.
