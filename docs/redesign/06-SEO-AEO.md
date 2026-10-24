# 06 — SEO and AEO plan

Caveat: most AEO guidance online is vendor content with little independent evidence. Do the fundamentals (crawlable, fast, genuinely useful, well-structured) first; treat `llms.txt` and schema as cheap extras, not guarantees. Verify Google's current rich-result policies in Search Console, since FAQ/HowTo rich results have been restricted in recent years; markup is still harmless for machine readability.

## 1. Technical SEO (blocked today by the SPA — see audit C1)
- [ ] Server-rendered/static HTML for every public route (framework migration, doc 04).
- [ ] One canonical host (domain TBD; read from `NEXT_PUBLIC_SITE_URL`, placeholder `https://ideazen.app`), HTTPS, `www` redirect, trailing-slash policy.
- [ ] `app/sitemap.ts` (static routes + all public ideas/guides, `lastmod`), submit in Search Console + Bing Webmaster.
- [ ] `app/robots.ts`: allow all; disallow `/dashboard`, `/api/`, `/generate?*`; list sitemap.
- [ ] Per-page `generateMetadata`: unique title (≤60 chars), description (≤155), canonical, OG/Twitter, `og:image` via `opengraph-image.tsx`.
- [ ] Noindex thin or private pages (user-owned unshared specs, search-result URLs).
- [ ] Core Web Vitals budget: LCP < 2.5s, INP < 200ms, CLS < 0.1; self-hosted fonts, no layout shift, no 3.8k-line unused CSS.
- [ ] Real 404 page and real 404 status (today catch-all redirects to `/`, a soft-404 pattern).
- [ ] Internal linking: every idea page links to its stack page, level page, 3 related ideas, and a guide.

## 2. Page templates and keyword targets
| Template | Example target query | Title pattern |
|----------|---------------------|---------------|
| Stack × level | "react project ideas for beginners" | `React project ideas for beginners (with build plans)` |
| Domain | "full stack project ideas for portfolio" | `Full-stack portfolio project ideas with roadmaps` |
| Hackathon | "48 hour hackathon project plan" | `48-hour hackathon plan: hour-by-hour template` |
| Single idea | "build a [thing] project roadmap" | `[Idea]: build plan, stack and tasks` |
| Guide | "how to choose a portfolio project" | plain question title |
Quality gate for programmatic pages: each must carry unique, human-reviewed content (intro, 10+ specs with real differences, FAQ). Do not mass-publish raw model output; that is the quickest route to a thin-content demotion. Start with ~30 pages, expand on Search Console impressions.

## 3. Structured data (JSON-LD, generated in `lib/seo/jsonld.ts`)
Site-wide:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://ideazen.app/#org", "name": "IdeaZen",
      "url": "https://ideazen.app", "logo": "https://ideazen.app/logo.png" },
    { "@type": "WebSite", "@id": "https://ideazen.app/#site", "url": "https://ideazen.app",
      "name": "IdeaZen", "publisher": { "@id": "https://ideazen.app/#org" } },
    { "@type": "WebApplication", "name": "IdeaZen", "url": "https://ideazen.app",
      "applicationCategory": "DeveloperApplication", "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }
  ]
}
```
Per page: `BreadcrumbList` everywhere; `FAQPage` on FAQ/stack pages (content must be visible on page); `HowTo` or `Article` on guides and idea pages (steps = roadmap phases); `ItemList` on library/stack pages; `Article` with `author`, `datePublished`, `dateModified` on guides. Validate with Rich Results Test in CI-adjacent manual step.

## 4. AEO — being quoted by AI answers
- [ ] **Answer-first writing**: each guide and idea page opens with a 40–60 word direct answer, then detail.
- [ ] Question-form H2s ("What is a good first React project?") followed by a self-contained 2–3 sentence answer.
- [ ] Tables and numbered lists for comparisons/steps (easy to extract).
- [ ] Visible author, "last updated" date, and an About page stating who builds IdeaZen (E-E-A-T signals).
- [ ] Original data: publish "State of portfolio projects" (e.g. most-requested stacks and durations from anonymised generation logs, with thresholds to protect privacy). Original numbers are what get cited.
- [ ] Allow AI crawlers in `robots.txt` if you want citations (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended); decide consciously, it is a policy choice.
- [ ] `llms.txt` at root: short site description + links to key pages and guides in Markdown. Low cost; no evidence major engines rely on it.
- [ ] Serve a `.md` version of guides/specs (`/ideas/[slug].md`) for easy machine reading.
- [ ] Keep facts consistent across site, GitHub README, and listing profiles (name, one-line description).
- [ ] Off-site mentions: Product Hunt, Hacker News Show HN, dev.to/Hashnode posts, r/learnprogramming (read rules), awesome-lists, GitHub topics on the repo. Answer engines cite pages that other sources corroborate.

## 5. Starter `llms.txt`
```
# IdeaZen
> Free tool that turns your skill level, stack and time into a project spec: features, tech stack, phased roadmap and first-commit guide. Includes a hackathon planner.

## Core
- [Generate a project spec](https://ideazen.app/generate): answer 4 questions
- [Hackathon planner](https://ideazen.app/hackathon): hour-by-hour plan for 24–48h events
- [Project idea library](https://ideazen.app/ideas)

## Guides
- [How to choose a portfolio project](https://ideazen.app/guides/choose-a-portfolio-project)
- [48-hour hackathon plan](https://ideazen.app/guides/48-hour-hackathon-plan)
```

## 6. Measurement
Search Console (indexing, queries, CWV), Bing Webmaster, Plausible. Monthly: manually ask ChatGPT, Perplexity, Google AI Overviews 20 target questions and log whether IdeaZen is cited. Targets: 100% of public URLs indexed in 8 weeks; first 10 stack pages ranking top 20 for their query within 3–4 months (realistic for a new domain, not guaranteed).

## 7. Immediate quick wins even before migration
Fix `index.html`: real `<title>`, meta description, `lang`, theme-color, OG tags, canonical, favicon, JSON-LD block; add `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`. Gives Google something to read in the interim.
