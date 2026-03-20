
# IdeaZen — Recommended Project Structure

## Current Problems with the Old Structure
- All screens, animation components, and UI utilities are mixed together in one flat /components folder
- No types/ folder — types are likely scattered inline or in App.tsx
- No hooks/ folder — logic is probably mixed inside screen components
- No lib/ or services/ folder — API calls likely live inside components or App.tsx
- The /api folder has the right idea (Vercel serverless) but only one file with two modes crammed in
- No constants/ — question data and config likely hardcoded in component files

---

## Recommended Structure

```
IdeaZen/
│
├── api/                                ← Vercel serverless functions (backend)
│   ├── generate.ts                     ← Suggestions + Blueprint + Refine modes
│   └── hackathon.ts                    ← Hackathon roadmap generation (separate)
│
├── src/
│   │
│   ├── main.tsx                        ← Vite entry point (unchanged)
│   ├── App.tsx                         ← Root: screen state, navigation logic
│   ├── vite-env.d.ts                   ← Vite type declarations
│   │
│   ├── types/                          ← ALL TypeScript interfaces in one place
│   │   ├── project.types.ts            ← GeneratedProject, IdeaCard, MatchBreakdown, etc.
│   │   ├── hackathon.types.ts          ← HackathonRoadmap, HackathonPhase, etc.
│   │   └── navigation.types.ts        ← ScreenName union type, NavigationProps
│   │
│   ├── constants/                      ← Static data and config (no logic)
│   │   ├── questions.ts                ← All question sets (beginner/intermediate/advanced)
│   │   ├── hackathonQuestions.ts       ← Hackathon-specific question set
│   │   └── skillLevels.ts             ← Skill level card definitions (icon, label, desc)
│   │
│   ├── services/                       ← All API communication in one place
│   │   ├── generate.service.ts         ← fetchSuggestions(), fetchBlueprint(), refineIdea()
│   │   └── hackathon.service.ts        ← fetchHackathonRoadmap()
│   │
│   ├── hooks/                          ← Custom React hooks (logic, no JSX)
│   │   ├── useLocalStorage.ts          ← Generic read/write hook for localStorage
│   │   ├── useSavedProjects.ts         ← Save, delete, compare projects
│   │   ├── useScreenNavigation.ts      ← currentScreen state + navigate() helper
│   │   └── useClipboard.ts            ← Copy-to-clipboard with isCopied state
│   │
│   ├── lib/                            ← Pure utility functions (no React, no API)
│   │   ├── formatters.ts               ← formatDate(), formatConfidence(), truncate()
│   │   └── validators.ts               ← isValidTitle(), isAnswered(), etc.
│   │
│   ├── screens/                        ← Full-page screen components (one per route)
│   │   ├── LandingPage/
│   │   │   ├── LandingPage.tsx         ← Layout + section composition
│   │   │   ├── HeroSection.tsx         ← H1, CTA buttons, TextLoader, ServerNodeLoader
│   │   │   ├── HowItWorksSection.tsx   ← 3-step card grid
│   │   │   ├── ExampleOutputSection.tsx ← Mock project card preview
│   │   │   └── FinalCTASection.tsx     ← Bottom CTA
│   │   │
│   │   ├── SkillLevelSelection/
│   │   │   └── SkillLevelSelection.tsx ← 3 skill level cards
│   │   │
│   │   ├── QuestionFlow/
│   │   │   ├── QuestionFlow.tsx        ← Main question flow controller
│   │   │   ├── QuestionCard.tsx        ← Individual question + options
│   │   │   └── ProgressBar.tsx         ← Step counter + progress fill
│   │   │
│   │   ├── GeneratingScreen/
│   │   │   └── GeneratingScreen.tsx    ← Loading UI with step-by-step progress list
│   │   │
│   │   ├── IdeaPreview/
│   │   │   ├── IdeaPreview.tsx         ← Grid layout + filter bar
│   │   │   └── IdeaCard.tsx            ← Single idea card (clean, minimal)
│   │   │
│   │   ├── ProjectOutput/
│   │   │   ├── ProjectOutput.tsx       ← Main layout + sticky nav
│   │   │   ├── OutputHero.tsx          ← Title, description, match stats
│   │   │   ├── WhyThisSection.tsx      ← 3-bullet reasoning block
│   │   │   ├── FeaturesSection.tsx     ← Tiered features list (Core/Enhanced/Stretch)
│   │   │   ├── TechStackSection.tsx    ← Primary + alternative stack with reasons
│   │   │   ├── RoadmapSection.tsx      ← Phase timeline mapped to weeks
│   │   │   ├── FirstCommitSection.tsx  ← Terminal steps + first goal
│   │   │   ├── MVPSection.tsx          ← 3 demo conditions + recruiter demo script
│   │   │   ├── SkillOutcomesSection.tsx ← Solidify vs Gain New tiers
│   │   │   ├── PitfallsSection.tsx     ← Pitfall + why + mitigation triplets
│   │   │   ├── PortfolioSection.tsx    ← Resume blurb + copy button
│   │   │   ├── ResourcesSection.tsx    ← Named resources with format + time tags
│   │   │   └── AIControlsSidebar.tsx   ← Refine / harder / simpler / new idea buttons
│   │   │
│   │   ├── MyIdeas/
│   │   │   ├── MyIdeas.tsx             ← List layout + search + sort
│   │   │   ├── SavedProjectCard.tsx    ← Single saved card with compare checkbox
│   │   │   └── CompareView.tsx         ← Side-by-side comparison panel
│   │   │
│   │   └── Hackathon/
│   │       ├── HackathonModeEntry.tsx  ← Project title input + examples
│   │       ├── HackathonQuestionFlow.tsx ← 5 hackathon questions
│   │       ├── HackathonGenerating.tsx ← Hackathon-specific loader
│   │       └── HackathonRoadmapOutput/
│   │           ├── HackathonRoadmapOutput.tsx ← Main layout
│   │           ├── HackathonHero.tsx           ← Title, timeline, feasibility stats
│   │           ├── ExecutionPlanSection.tsx    ← Hour-by-hour phase breakdown
│   │           ├── MVPScopeSection.tsx         ← Must / Nice / Cut tiers
│   │           ├── RisksSection.tsx            ← Risk + mitigation pairs
│   │           ├── SubmissionChecklist.tsx     ← Final checklist items
│   │           └── HackathonSidebar.tsx        ← Adjust / simplify / new roadmap
│   │
│   ├── components/                     ← Shared, reusable UI components (no screen logic)
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              ← Logo, nav links, mobile menu
│   │   │   └── Footer.tsx             ← Brand row, links, copyright
│   │   │
│   │   ├── ui/                         ← Pure UI primitives (no business logic)
│   │   │   ├── Badge.tsx               ← Reusable badge/pill with variant prop
│   │   │   ├── Button.tsx              ← Primary / secondary / ghost variants
│   │   │   ├── Card.tsx                ← Base card wrapper (border, radius, padding)
│   │   │   ├── CollapsibleSection.tsx  ← Accordion wrapper used across ProjectOutput
│   │   │   ├── CopyButton.tsx          ← Copy-to-clipboard with checkmark feedback
│   │   │   ├── ProgressBar.tsx         ← Reusable bar with width% + color props
│   │   │   └── Tooltip.tsx             ← Hover tooltip for confidence/feasibility
│   │   │
│   │   └── animations/                 ← All animation components isolated here
│   │       ├── ServerNodeLoader.tsx    ← Animated AI node graphic (hero only)
│   │       ├── TextLoader.tsx          ← Typewriter rotating phrases
│   │       └── GridBackground.tsx      ← Static subtle dot-grid for interior pages
│   │
│   ├── styles/
│   │   └── globals.css                 ← Tailwind base + any custom CSS vars
│   │
│   └── assets/
│       └── logo.svg                    ← IdeaZen logo SVG
│
├── .env.local                          ← Never committed (GROQ_API_KEY for local dev)
├── .env.example                        ← Committed: shows required env vars without values
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vercel.json
└── README.md
```

---

## What Changed from the Old Structure and Why

### 1. screens/ replaces the flat components/ folder
Old: Every screen (LandingPage, ProjectOutput, MyIdeas...) and every animation
     component (AIParticles, FloatingOrbs, NeuralNetwork...) lived side-by-side
     in one flat /components folder. Opening the folder showed 20+ files with no
     grouping — impossible to navigate.

New: Screens live in /screens (each in its own subfolder with sub-components).
     Shared UI primitives live in /components/ui. Animations are isolated in
     /components/animations. You can find any file in under 5 seconds.

### 2. types/ folder — interfaces out of App.tsx
Old: GeneratedProject and HackathonRoadmap interfaces were likely defined in
     App.tsx or inline in each component.

New: All TypeScript types live in /types. project.types.ts exports GeneratedProject
     (with the new nested shape from the upgraded prompt), hackathon.types.ts
     exports HackathonRoadmap, navigation.types.ts exports the ScreenName union.
     Import from one place everywhere.

### 3. services/ folder — API calls out of components
Old: fetch() calls to /api/generate likely lived inside App.tsx or directly inside
     screen components, mixed with rendering logic.

New: All API calls live in /services. generate.service.ts exports three clean
     async functions: fetchSuggestions(), fetchBlueprint(), refineIdea().
     Components call these functions — they don't know anything about fetch,
     URLs, or JSON parsing.

### 4. hooks/ folder — stateful logic out of screens
Old: localStorage reads/writes and clipboard logic were probably spread across
     ProjectOutput.tsx, MyIdeas.tsx, and HackathonRoadmapOutput.tsx separately,
     duplicating the same patterns.

New: useSavedProjects() manages all localStorage logic in one place.
     useClipboard() handles copy state. useScreenNavigation() owns the
     currentScreen state that App.tsx currently manages inline.

### 5. constants/ folder — question data out of components
Old: The question arrays (beginner questions, intermediate questions, hackathon
     questions) were likely defined at the top of QuestionFlow.tsx and
     HackathonQuestionFlow.tsx respectively.

New: All static question data lives in /constants. QuestionFlow.tsx imports
     from constants/questions.ts — it doesn't define its own data.

### 6. Removed animation components
Old: AIParticles.tsx, FloatingOrbs.tsx, NeuralNetwork.tsx were imported
     and used in the landing page, creating 3 competing canvas/CSS animations.

New: These three are deleted entirely. Only ServerNodeLoader.tsx and
     TextLoader.tsx remain in /components/animations. The interior page
     animated dot-grid becomes a single static GridBackground.tsx component.

### 7. api/ split into two files
Old: One generate.ts handled both regular ideas AND hackathon roadmaps
     via different body params.

New: api/generate.ts handles suggestions, blueprint, refine.
     api/hackathon.ts handles hackathon roadmap generation with its own
     tailored prompt and schema. Cleaner separation, easier to debug.

### 8. ProjectOutput broken into section components
Old: ProjectOutput.tsx was one giant file handling 5 collapsible sections,
     sticky nav, save logic, share logic, sidebar, and the hero block.

New: Each major section is its own file (WhyThisSection, FeaturesSection,
     TechStackSection, etc.). ProjectOutput.tsx is just a layout compositor.
     Adding or editing a section never requires touching the whole page.

---

## Key File Contents Reference

### src/types/project.types.ts
Defines the GeneratedProject interface matching the new blueprint prompt output:
- matchBreakdown: { skillMatch, stackMatch, timeFit, overall, explanation }
- reasoning: { skillFit, stackFit, growthOpportunity }
- features: { name, tier, description, technicalNote }[]
- techStack.primary: { name, role, reason }[]
- roadmap: { phase, title, weekRange, description, duration, deliverable, tasks }[]
- mvp: { description, conditions, demoScript }
- firstCommitGuide: { intro, steps, firstGoal }
- skillOutcomes: { solidify, gainNew }
- pitfalls: { pitfall, why, mitigation }[]
- resources: { title, source, url, format, timeEstimate, why }[]
- portfolioBlurb: string
- difficultyScore: number
- difficultyBreakdown: { stateComplexity, apiIntegrations, authComplexity, deploymentComplexity ... }
- realWorldComparison: string
- targetUser: string
- tagline: string

### src/services/generate.service.ts
Exports:
- fetchSuggestions(params) → Promise<IdeaCard[]>
- fetchBlueprint(params) → Promise<GeneratedProject>
- refineIdea(params) → Promise<GeneratedProject>

### src/constants/questions.ts
Exports QUESTIONS object:
- QUESTIONS.beginner: Question[]      (4 questions)
- QUESTIONS.intermediate: Question[]  (5 questions)
- QUESTIONS.advanced: Question[]      (6 questions)

Each Question: { id, text, description, options, isMultiSelect }

### src/hooks/useSavedProjects.ts
Exports:
- savedProjects: GeneratedProject[]
- saveProject(project): void
- deleteProject(id): void
- isSaved(title): boolean
- selectedForCompare: string[]
- toggleCompare(title): void
