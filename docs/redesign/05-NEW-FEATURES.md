# 05 — New features (prioritised)

P0 = needed for the relaunch to make sense. P1 = retention. P2 = growth. P3 = later/optional.

## P0 — Foundation
| Feature | Detail |
|---------|--------|
| Persistent, refresh-safe wizard | URL state; resume where you left off |
| Streaming generation | Spec appears section by section |
| Real refine | Simpler / harder / swap stack / shorter timeline, applied to the existing spec |
| Real share links | `/s` page that decodes the spec from the URL, with OG image; no storage needed |
| Schema-validated output | No more crashes on malformed model JSON |
| Markdown + PDF export | Replace html2canvas screenshot PDF with a print stylesheet or server PDF; add `.md` download (README-ready) |

## P1 — Retention
| Feature | Detail |
|---------|--------|
| Task progress tracking | Checkbox per task, % per phase, "next task" card on dashboard |
| Dashboard | My ideas, status (planned / building / shipped), progress; all in localStorage |
| GitHub export (no login) | Download a zip/script: `README.md`, `ROADMAP.md`, and a `gh` CLI script that creates milestones and issues from the roadmap. Upgrade to OAuth only if demand shows |
| Backup / move devices | Export and import all saved ideas as one JSON file |
| Idea library | Browse/filter by stack, level, time, domain; "Remix for my level" |
| Hackathon pitch kit | 60-second pitch script, demo-flow outline, slide outline, judging-criteria checklist (current mode stops at the roadmap) |
| Hackathon live mode | Countdown by phase, tick tasks, "cut scope" button that re-plans remaining hours |

## P2 — Growth
| Feature | Detail |
|---------|--------|
| Programmatic stack/level pages | `/project-ideas/react/beginners` etc. with 10–20 curated specs each |
| Guides | 15–20 MDX articles ("How to pick a portfolio project", "48-hour hackathon plan") |
| Portfolio write-up generator | After shipping: README, LinkedIn post, resume bullets from the spec |
| Weekly nudge email (opt-in) | Next task + streak |
| Idea of the day | Static daily page + RSS; recurring crawl target |
| Compare ideas | Side by side, 2–3 ideas (hook `selectedForCompare` already exists) |

## P3 — Later
Accounts, public profiles, cloud sync (needs the DB decision revisited); team/cohort mode for mentors; role-targeted generation ("frontend intern at a fintech"); VS Code/CLI `npx ideazen init`; localisation (e.g. Hindi) once analytics show demand; paid tier only if API cost demands it.

## Dropped on purpose
Community feed and comments (moderation cost, no audience yet); a second AI chat UI (the refine buttons cover it); gamification badges beyond a simple streak.

## Content fixes inside existing features
- Pitfalls: project-specific, not generic.
- Resources: allow-listed or link-checked (see 04).
- Time estimates: ask the model for ranges plus a "confidence" note; show as ranges.
- First-commit guide: tailor commands to the chosen stack and show them in the terminal block.
