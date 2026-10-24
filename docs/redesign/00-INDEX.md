# IdeaZen Redesign — Master Plan

Read in order. Each file is self-contained.

| # | File | Answers |
|---|------|---------|
| 01 | [AUDIT.md](01-AUDIT.md) | What exists today, what is broken, what to delete |
| 02 | [PRODUCT-STRATEGY.md](02-PRODUCT-STRATEGY.md) | Who it is for, why they return, positioning |
| 03 | [DESIGN-SYSTEM.md](03-DESIGN-SYSTEM.md) | The new look: tokens, type, components, signature element |
| 04 | [ARCHITECTURE.md](04-ARCHITECTURE.md) | Target stack, routes, API hardening, data model |
| 05 | [NEW-FEATURES.md](05-NEW-FEATURES.md) | Prioritised feature list (P0 to P3) |
| 06 | [SEO-AEO.md](06-SEO-AEO.md) | Google + AI-answer-engine plan, with ready-to-use schema |
| 07 | [ROADMAP.md](07-ROADMAP.md) | Phased, checkable work plan |

## One-paragraph summary
IdeaZen is a Vite + React SPA that calls Groq (Llama 3.3 70B) through two Vercel functions to turn a short questionnaire into project ideas and a phase-by-phase blueprint, plus a hackathon-roadmap mode. Everything lives in localStorage and in-memory module state, so there is no sharing, no accounts, no return reason, and Google sees an empty `<div id="root">`. The plan: (1) rebuild on a server-rendered framework so public pages are indexable, (2) replace the navy/cyan/gradient look with a "repo spec sheet" identity, (3) add the features that create return visits (progress tracking, GitHub export, shareable ideas, a browsable idea library), (4) ship SEO/AEO from day one using programmatic pages like "React project ideas for beginners".

## Decisions (confirmed)
1. Framework: **Next.js App Router**.
2. Accounts: **none. Anonymous only.** Anything "per user" lives in the browser or in the URL.
3. Database: **none for now.** Share links encode the spec in the URL; the idea library is curated JSON/MDX in the repo. Add Supabase only if a feature below the line in 05 needs it.
4. Domain: **not chosen yet.** All absolute URLs read `NEXT_PUBLIC_SITE_URL`; docs still show `ideazen.app` as a placeholder.
5. Monetisation: none (free, rate-limited).
