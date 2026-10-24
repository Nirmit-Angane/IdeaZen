# 02 — Product strategy

## Positioning
Competitors found (Peerlist app-idea generator, ProjectPilot, assorted hackathon-built generators, paid idea lists) mostly stop at "here are some ideas". None that I found keep users after the first result.

**IdeaZen = "pick a project, then actually finish it."**
Not an idea generator; a *project starter and tracker*: idea → spec → GitHub repo with issues → progress → portfolio write-up.

Tagline candidates (plain, specific): "Get a project spec you can start today." / "From idea to first commit."

## Audiences
1. Students and self-taught devs building portfolio projects (largest; searches "project ideas for X").
2. Job switchers needing a project that matches a target role/stack.
3. Hackathon participants (spiky, high intent, time-boxed).
4. Bootcamp/college mentors who assign projects (later: cohort links).

## Why users come back (retention loops)
| Loop | Mechanism |
|------|-----------|
| Progress | Tick tasks per phase, see % done, streak. Ideas become a dashboard, not a dead PDF. |
| Export to GitHub | One click creates repo + milestones + issues from the roadmap; work happens in GitHub, tied back to IdeaZen. |
| Share | Real public link per spec with OG image; every share is acquisition. |
| Library | Browsable, indexable idea pages (SEO) with "Remix for my level". |
| Email nudge (opt-in) | "You're on Phase 2 of X — next task: …" weekly. |
| Hackathon season | Pre-event "plan your 48h" entry point, seasonal traffic. |

## Funnel
Search / share link → public idea page (read the full spec preview) → "Make this mine" (3 questions, not 8) → full blueprint → export / track → return.
Key change: **first value is delivered before the wizard**, not after.

## Metrics
- Activation: % of visitors who reach a blueprint (target 25%).
- Retention: % of saved ideas with ≥1 task ticked; D7 return.
- Acquisition: organic sessions, share-link visits, indexed pages.
- Cost: Groq tokens per blueprint, cache hit rate.
Instrument with Plausible or Vercel Analytics (no cookie banner needed).

## Principles
- Output is the marketing: show real specs on the landing page.
- Fewer clicks before value. Wizard ≤ 4 steps, skippable, state in the URL.
- Honest AI: label generated content, verify links, never promise outcomes.
