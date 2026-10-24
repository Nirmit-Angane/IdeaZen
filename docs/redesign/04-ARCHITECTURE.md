# 04 — Target architecture

## Framework decision
Need: indexable public pages (library, share pages, landing) plus app-like wizard/dashboard.

| Option | Pros | Cons |
|--------|------|------|
| **A. Next.js App Router on Vercel (recommended)** | SSR/SSG/ISR for programmatic pages, `generateMetadata`, `sitemap.ts`, OG images, route handlers replace `api/` + `local-api.js`, streaming. Reuses your React code. | Migration effort; RSC boundaries to learn. |
| B. Keep Vite + prerender (vite-react-ssg / vike) | Smallest change | Weak story for dynamic share pages, OG images, ISR. |
| C. Astro + React islands | Best raw SEO/perf for content | Two mental models; auth/dashboard awkward. |

Web sources I checked agree a plain Vite SPA needs workarounds for public SEO pages; here those pages are the growth engine, so A.

## Routes
| Route | Rendering | Purpose |
|-------|-----------|---------|
| `/` | static | Landing with live spec hero |
| `/generate` | client | Wizard (state in URL + sessionStorage) |
| `/ideas` | ISR | Library index with filters |
| `/ideas/[slug]` | ISR | Public full spec (SEO + share) |
| `/project-ideas/[stack]` and `/[stack]/[level]` | SSG | Programmatic pages ("react project ideas for beginners") |
| `/hackathon` | static | Hackathon mode entry |
| `/hackathon/plan/[id]` | dynamic | Roadmap view/share |
| `/dashboard` | client | My ideas + progress (localStorage) |
| `/s` | dynamic + OG | Share link; spec compressed into `#d=` / `?d=` param, no server storage |
| `/guides/[slug]` | MDX SSG | Editorial content (AEO) |
| `/about`, `/faq`, `/privacy` | static | Trust pages |
| `/api/generate`, `/api/refine`, `/api/hackathon` | route handlers | Server logic |
| `sitemap.xml`, `robots.txt`, `llms.txt` | generated | Discovery |

## Folder layout
```
src/
  app/                 routes only (thin)
  features/            wizard/ spec/ hackathon/ library/ dashboard/ export/
  components/ui/       ~10 primitives on tokens
  lib/ai/              prompts.ts, schema.ts (zod), client.ts (provider wrapper)
  lib/db/              schema + queries
  lib/seo/             jsonld.ts, metadata.ts
  content/guides/*.mdx
```
Feature folders own components, hooks, tests. `_sharedState` is deleted.

## State
- Wizard answers: URL search params + `sessionStorage` (refresh-safe, linkable).
- Saved ideas and progress: localStorage only, one versioned key (`ideazen:v1`), with JSON export/import so users can move devices.
- Optional later: server cache keyed by hash of inputs (needs KV/DB).

## Data model
No database. Curated library = `content/ideas/*.json` (validated by the same zod spec schema at build time). If a DB is added later (Supabase), the first tables would be `ideas` (public shared specs) and `generation_log`; nothing else is planned.

## API hardening (ship before the redesign goes public)
1. One zod schema per endpoint shared by client and server (fixes the hackathon field mismatch, audit C4).
2. Enum/length-cap every field; reject unknown keys.
3. Rate limit per IP (start with an in-memory limiter, move to Upstash/Vercel KV when traffic justifies) and Cloudflare Turnstile on generate, since everyone is anonymous.
4. Origin check; no wildcard CORS in production.
5. User text goes in as JSON data, never interpolated into the schema template; tell the model to ignore instructions in fields (audit C3).
6. Validate model output with zod; one repair retry, then a typed error.
7. Stream (SSE) to show progress and avoid function timeouts; set `maxDuration`.
8. Remove the raw-response `console.log`; log token counts only.
9. Provider wrapper with model from env and a fallback model.
10. Resource links: have the model name resources, resolve against a curated allow-list (MDN, official docs, freeCodeCamp, The Odin Project) and HEAD-check the rest; drop dead links.
11. Real refine endpoint: input = existing spec + `simpler | harder | swap-stack`, output = revised spec (audit C5).

## Quality & delivery
- Vitest: schema tests, prompt-builder snapshots, wizard reducer, one fast-check property (URL-state round-trip).
- Playwright: one happy path per flow + axe.
- GitHub Actions: typecheck, lint, test, build, Lighthouse CI budget (LCP < 2.5s, CLS < 0.1, a11y ≥ 95, SEO 100).

## Cleanup first (~1 hour, no design work)
Delete the 45 unused `components/ui/*`, unused deps, `src/index.css`, the vite alias block, committed `build/`, the duplicate `globals.css` import, `@types/react-router-dom`, and orphan screens after confirming no imports.
