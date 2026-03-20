# IdeaZen — Page Structure Documentation

> **Purpose:** This document maps out every screen, its layout sections, components, and user interactions. Use this as a reference guide when redesigning any page.

---

## App Navigation Overview

IdeaZen is a **single-page application (SPA)** built with React + TypeScript + Vite. Navigation happens by swapping a screen state variable in `App.tsx`. There is **no router** — all screens are conditionally rendered components.

```
App.tsx (Root)
├── Navbar (always visible)
├── [Screen based on currentScreen state]
└── Footer (visible on all non-landing screens)
```

### Screen State Flow

```
Regular Flow:
landing → skill-selection → questions → generating → idea-preview → generating-blueprint → output → my-ideas

Hackathon Flow:
landing → hackathon-entry → hackathon-questions → hackathon-generating → hackathon-output
```

---

## Color Palette Reference

| Token | Hex | Usage |
|---|---|---|
| Primary Blue | `#1F3C88` | Headers, buttons, links |
| Cyan Accent | `#22D3EE` | Gradients, highlights |
| Purple Accent | `#7C6CF6` | AI elements, badges |
| Yellow Accent | `#FACC15` | Hackathon mode, warnings |
| Green Success | `#22C55E` | High feasibility, saved state |
| Text Dark | `#0F172A` | Body text |
| Text Medium | `#334155` | Descriptions |
| Text Light | `#64748B` | Secondary text |
| Background | `#F8FAFC` | Page background |

---

## 1. Landing Page (`LandingPage.tsx`)

**Screen ID:** `landing`  
**Route Trigger:** Default on app load or logo click  

### Layout Structure

```
LandingPage
├── Hero Section
│   ├── Animated Background (AIParticles canvas + gradient blobs)
│   ├── Left Column
│   │   ├── H1 Headline ("Stop Wondering. Start Building.")
│   │   ├── Subheadline paragraph
│   │   ├── TextLoader (animated rotating phrases)
│   │   ├── [CTA Button] → "Generate My Project Idea" → triggers onGetStarted
│   │   ├── [Secondary CTA] → "Hackathon Mode" → triggers onStartHackathonMode
│   │   └── Trust text ("No signup", "Free forever", "Instant results")
│   └── Right Column
│       └── ServerNodeLoader (animated AI network visual)
│
├── How It Works Section (id="how-it-works")
│   ├── Section Title
│   └── 3-column card grid
│       ├── Step 1: "Tell Us Your Level" — Target icon
│       ├── Step 2: "Answer Smart Questions" — Sparkles icon
│       └── Step 3: "Get Your Idea" — Lightbulb icon
│
├── Example AI Output Section (id="examples")
│   ├── Section Title
│   ├── AI Badge ("Example AI-Generated Idea")
│   └── Mock Project Card
│       ├── Header (gradient) — Project title, description, tags
│       └── Body
│           ├── Key Features list
│           ├── Tech Stack badges
│           └── "Why AI Chose This" reasoning box
│
├── FAQ Section (`FAQ.tsx` component)
│
├── Final CTA Section
│   ├── H2 Headline
│   ├── Description
│   └── [CTA Button] → "Generate My Project Idea"
│
└── Back-to-Top Button (fixed, appears on scroll > 500px)
```

### Key Interactions
- Scroll-triggered Back-to-Top button
- Smooth scroll to `#how-it-works` section
- Two primary CTAs that trigger different flows

### Reusable Sub-components
| Component | File | Purpose |
|---|---|---|
| `TextLoader` | `TextLoader.tsx` | Animated typewriter text |
| `ServerNodeLoader` | `ServerNodeLoader.tsx` | Animated AI node graphic |
| `AIParticles` | `AIParticles.tsx` | Canvas particle background |
| `FloatingOrbs` | `FloatingOrbs.tsx` | Decorative blurred circles |
| `NeuralNetwork` | `NeuralNetwork.tsx` | Neural network animation |
| `FAQ` | `FAQ.tsx` | Accordion FAQ component |

---

## 2. Skill Level Selection (`SkillLevelSelection.tsx`)

**Screen ID:** `skill-selection`  
**Flow:** Regular Mode only  

### Layout Structure

```
SkillLevelSelection
├── AI Recommendation Badge (purple gradient pill)
├── H1: "What's Your Skill Level?"
├── Subheading paragraph
├── 3-column Card Grid (md:grid-cols-3)
│   ├── [Beginner Card] — Rocket icon, cyan gradient — "Recommended" badge
│   ├── [Intermediate Card] — Code2 icon, dark blue gradient
│   └── [Advanced Card] — Cpu icon, purple gradient
└── Reassurance Message (green pill: "Don't worry — you can change this later")
```

### Key Interactions
- Each card click calls `onSelectLevel(level)` and advances to `questions`
- Inline "Recommended" badge on Beginner option

---

## 3. Question Flow (`QuestionFlow.tsx`)

**Screen ID:** `questions`  
**Flow:** Regular Mode only  

### Layout Structure

```
QuestionFlow
├── Animated Grid Background
├── Progress Bar (gradient, full-width)
│   └── Question Counter ("Question X of N")
├── AI Feedback Bubble (contextual message per step)
├── Question Card (main white card)
│   ├── Question Header
│   │   ├── H2: Question text
│   │   ├── Description subtitle
│   │   └── Hint ("This helps personalize your project idea")
│   ├── Options Grid (1–2 columns, responsive)
│   │   └── [Option Button] — icon + label + check indicator
│   └── Multi-select Hint (shown when isMultiSelect = true)
├── Navigation Row
│   ├── [Back Button]
│   └── [Continue / Generate Idea Button] (disabled until answered)
└── Bottom Reassurance ("You can refine your idea anytime with AI")
```

### Question Sets by Skill Level

| Level | Questions | Multi-select? |
|---|---|---|
| **Beginner** | 4 questions | None |
| **Intermediate** | 5 questions | Technologies (multi) |
| **Advanced** | 6 questions | Architecture (multi), Technologies (multi) |

#### Beginner Questions
1. Project Type (Web, Mobile, Game, Automation)
2. Learning Goal (Frontend, Backend, Full Stack, Specific Tech)
3. Time Available (2 weeks – 3+ months)
4. Deployment preference

#### Intermediate Questions
1. Project Type (Full-Stack, API, Realtime, Mobile, DevTools)
2. Primary Learning Goal (Architecture, Performance, Testing, DevOps, New Tech)
3. Timeline
4. Tech Stack (multi-select: React, Vue, Node, Python, TypeScript, Go, DB, Cloud)
5. Deployment (Cloud, PaaS, Containerized, Local)

#### Advanced Questions
1. Domain/Scope (Distributed, AI/ML, Platform, Infrastructure, Performance)
2. Architecture Patterns (multi-select: Microservices, Event-Driven, Serverless, CQRS, etc.)
3. Scalability Requirements
4. Technology Preferences (multi-select: Go, Rust, Python, Kubernetes, Kafka, gRPC, etc.)
5. Project Constraints (Budget, Security, Performance, None)
6. Timeline

---

## 4. Generating Screen (`GeneratingScreen.tsx`)

**Screen IDs:** `generating`, `generating-blueprint`, `hackathon-generating`  

### Layout Structure

```
GeneratingScreen
├── Animated background
├── Mode-specific loading text
│   ├── "ideas" mode → "Finding Your Perfect Project Ideas..."
│   └── "blueprint" mode → "Crafting Your Detailed Blueprint..."
├── Animated loader graphic (spinner or node animation)
└── Progress indicators / status messages
```

---

## 5. Idea Preview (`IdeaPreview.tsx`)

**Screen ID:** `idea-preview`  
**Flow:** Regular Mode only  

### Layout Structure

```
IdeaPreview
├── Animated Background (grid + floating orbs)
├── Header Section
│   ├── AI Badge ("AI-Generated Project Ideas")
│   ├── H1: "Choose Your Perfect Project"
│   └── Count text ("Here are N personalized project ideas")
├── Ideas Grid (md:grid-cols-2)
│   └── [Idea Card] (per idea)
│       ├── Top colored border (difficulty color)
│       ├── "Best Match" badge (first card only)
│       ├── Title + Difficulty + Feasibility badges
│       ├── Description (2-line truncated)
│       ├── Stats Row (Features count, Phases count, Match %)
│       ├── Top 3 Features list
│       └── [View Full Plan Button]
└── Bottom Helper Text ("Click any card to see the complete blueprint")
```

### Key Interactions
- Click on card → calls `onSelectIdea(idea)` → triggers blueprint generation
- "Best Match" badge auto-applied to first idea

---

## 6. Project Output (`ProjectOutput.tsx`)

**Screen ID:** `output`  
**Flow:** Regular Mode only — the most complex page  

### Layout Structure

```
ProjectOutput
├── Sticky Sub-Navbar (below main Navbar)
│   ├── Breadcrumb (Home > Project Title)
│   └── Quick Actions (Save button, Share/Copy button)
│
├── Hero Header Section
│   └── Gradient Card (difficulty-colored)
│       ├── "AI-Generated Project Idea" badge
│       ├── H1: Project Title
│       ├── Project Description
│       └── Key Stats Row (Difficulty, Phases, Match %, Feasibility)
│
├── Two-Column Grid (lg:grid-cols-3)
│   │
│   ├── Main Content (lg:col-span-2) — LEFT COLUMN
│   │   ├── "Why AI Chose This Project" box (purple/cyan gradient)
│   │   ├── Key Features Section (collapsible)
│   │   │   └── 2-column grid of feature items
│   │   ├── Tech Stack Section (collapsible)
│   │   │   ├── Recommended Technologies (colored badges)
│   │   │   └── Alternative Technologies (gray badges)
│   │   ├── Development Roadmap Section (collapsible)
│   │   │   └── Vertical timeline of phases (numbered)
│   │   ├── "What You'll Learn" Section (collapsible)
│   │   │   └── Skill outcomes grid
│   │   ├── Common Pitfalls to Avoid (amber warning box)
│   │   └── Learning Resources Section (collapsible)
│   │       └── 4 resource types (Docs, YouTube, GitHub, Courses)
│   │
│   └── Sidebar (lg:col-span-1) — RIGHT COLUMN (sticky)
│       ├── AI Mentor Controls (dark gradient card)
│       │   ├── [Refine This Idea] → onRefine
│       │   ├── [Make It Harder] → onIncreaseDifficulty
│       │   ├── [Simplify It] → onSimplify
│       │   └── [Generate New Idea] → onGenerateAnother
│       └── [Download as PDF] button (not yet implemented)
```

### State Management
- `isSaved` — tracks if project is bookmarked to localStorage
- `isCopied` — tracks clipboard copy state
- `expandedSections` — tracks which of 5 sections are open/closed

### Key Interactions
| Interaction | Handler | Result |
|---|---|---|
| Save button | `handleSave()` | Writes to `localStorage.savedProjects` |
| Share button | `handleShare()` | Copies URL to clipboard |
| Download PDF | `handleDownloadPDF()` | Placeholder alert |
| Refine Idea | `onRefine()` | Goes back to `questions` screen |
| Make Harder | `onIncreaseDifficulty()` | Re-generates with `difficultyStretch: more-complex` |
| Simplify | `onSimplify()` | Re-generates with `difficultyStretch: simpler` |
| Generate Another | `onGenerateAnother()` | Re-generates ideas from scratch |

---

## 7. My Ideas (`MyIdeas.tsx`)

**Screen ID:** `my-ideas`  
**Data Source:** `localStorage.savedProjects`  

### Layout Structure

```
MyIdeas
├── Page Header
│   ├── Icon (Bookmark in blue gradient circle)
│   ├── H1: "My Saved Ideas"
│   └── Subtitle ("Saved locally — no account required")
│
├── [If ≥2 projects saved]
│   └── Comparison Bar
│       ├── Instructional text (0/1/2 selected states)
│       └── [Compare Ideas Button] (enabled only when 2 selected)
│
├── [If 0 saved] → Empty State
│   └── Placeholder with Bookmark icon + message
│
├── Saved Ideas List (vertical stack)
│   └── [Project Card] per saved project
│       ├── Checkbox (for comparison selection)
│       ├── Title + Description
│       ├── Tags (Difficulty, Saved Date, Confidence)
│       └── Action Row
│           ├── [View Project Button] → opens full ProjectOutput
│           └── [Delete Button] → removes from localStorage
│
└── Comparison View (shown when 2 selected + Compare clicked)
    ├── Comparison Header + Close button
    ├── Side-by-Side Cards (md:grid-cols-2)
    │   └── Per project: Difficulty, Time, Learning Impact, Confidence Score bar
    └── AI Recommendation summary box
```

### Key Interactions
- Toggle compare checkbox on each card (max 2 selectable)
- Live comparison in modal-like expandable view
- Delete removes from localStorage and updates list

---

## 8. Hackathon Mode Entry (`HackathonModeEntry.tsx`)

**Screen ID:** `hackathon-entry`  
**Flow:** Hackathon Mode only — first step  

### Layout Structure

```
HackathonModeEntry
├── Animated Grid Background
├── Hackathon Badge ("Hackathon Mode — Get your roadmap in 2 minutes")
├── H1: "What's Your Project Idea?"
├── Subheading
├── Main Form Card
│   ├── Trophy icon header
│   ├── H2: "Enter Your Project Title"
│   ├── Text Input (min 5 chars, autofocus)
│   │   └── Character counter + validation message
│   └── Example Ideas (3 clickable suggestions)
├── Navigation Row
│   ├── [Back Button]
│   └── [Continue to Questions] (disabled until ≥5 chars)
└── Reassurance text ("We'll help you scope this to a realistic MVP")
```

---

## 9. Hackathon Question Flow (`HackathonQuestionFlow.tsx`)

**Screen ID:** `hackathon-questions`  
**Flow:** Hackathon Mode only — second step  

### Layout Structure

```
HackathonQuestionFlow
├── Animated Grid Background
├── Progress Bar
├── AI Feedback Bubble
├── Hackathon-specific Questions Card
│   ├── Q1: Team Size (Solo, 2 people, 3–4 people, 5+ people)
│   ├── Q2: Timeline (8h, 12h, 24h, 36h, 48h)
│   ├── Q3: Team Skills (multi-select: Frontend, Backend, Mobile, AI/ML, Design, etc.)
│   ├── Q4: Judging Criteria Focus (Innovation, Technical, Social Impact, UX)
│   └── Q5: Tech Constraints (specific APIs, platforms, languages)
├── Navigation Row
└── Reassurance text
```

---

## 10. Hackathon Roadmap Output (`HackathonRoadmapOutput.tsx`)

**Screen ID:** `hackathon-output`  
**Flow:** Hackathon Mode only — final output  

### Layout Structure

```
HackathonRoadmapOutput
├── Sticky Sub-Navbar (same pattern as ProjectOutput)
│   ├── Breadcrumb + Save/Share buttons
│
├── Hero Header (feasibility-colored gradient)
│   ├── "Hackathon Roadmap" badge (Trophy icon)
│   ├── H1: Project Title
│   └── Key Stats (Timeline, Feasibility, Phase count)
│
├── Two-Column Grid (lg:grid-cols-3)
│   │
│   ├── Main Content (lg:col-span-2)
│   │   ├── AI Strategic Analysis box
│   │   │   ├── Achievability text
│   │   │   └── Detected Skill Gaps + Mitigations
│   │   ├── Hour-by-Hour Execution Plan (collapsible)
│   │   │   └── Phases with tasks (assignee + duration per task)
│   │   ├── Critical MVP Scope (collapsible)
│   │   │   ├── Must-Have Features
│   │   │   ├── Nice-to-Have Features
│   │   │   └── Cut-If-Needed Features (strikethrough)
│   │   ├── Risk Points & Mitigation (collapsible)
│   │   │   └── Risk + Mitigation pairs
│   │   └── Final Submission Checklist (collapsible)
│   │       └── Checklist items with time allocation
│   │
│   └── Sidebar (sticky)
│       ├── Hackathon Tools Card (yellow/cyan gradient)
│       │   ├── [Adjust Timeline]
│       │   ├── [Simplify Scope]
│       │   ├── [Add Team Member]
│       │   └── [Generate New Roadmap]
│       └── [Download as PDF] button
```

---

## 11. Navbar (`Navbar.tsx`)

**Visibility:** Always visible (all screens)  

### Layout Structure

```
Navbar
├── Logo (IdeaZen wordmark) → onLogoClick → resets to landing
├── Desktop Nav Links
│   ├── Home (active when currentPage = 'home')
│   ├── My Ideas (active when currentPage = 'my-ideas')
│   └── [Generate Button] (primary CTA)
└── Mobile Menu (hamburger, toggleable)
    ├── Home link
    ├── My Ideas link
    └── Generate button
```

---

## 12. Footer (`Footer.tsx`)

**Visibility:** All screens except `landing`  

### Layout Structure

```
Footer
├── Brand row (logo + tagline)
├── Links (About, GitHub, etc.)
└── Copyright text
```

---

## Global Background Patterns

All non-landing pages use the animated **grid pattern** CSS:

```css
/* Repeating dot-grid that slowly pans diagonally */
animation: gridMove 20s linear infinite;
background-size: 55px 55px;
opacity: 0.40;
```

This is defined inline via `<style>` tags in each relevant component.

---

## Data Types Reference

### `GeneratedProject` (Regular Mode Output)
```typescript
{
  title: string;
  difficulty: string;
  description: string;
  reasoning: string;
  features: string[];
  techStack: { primary: string[]; alternative: string[] };
  roadmap: { phase, title, description, duration }[];
  skillOutcomes: string[];
  feasibility: 'High' | 'Medium' | 'Low';
  confidence: string;
}
```

### `HackathonRoadmap` (Hackathon Mode Output)
```typescript
{
  title: string;
  timeline: string;
  feasibility: string;
  strategicAnalysis: { achievability, skillGaps[], mitigations[] };
  roadmap: { phase, tasks: { task, assignedTo, duration }[] }[];
  mvpScope: { mustHave[], niceToHave[], cutIfNeeded[] };
  risks: { risk, mitigation }[];
  submissionChecklist: { item, completed, timeAllocation }[];
}
```

---

## localStorage Keys

| Key | Content |
|---|---|
| `savedProjects` | `GeneratedProject[]` — saved from ProjectOutput |
| `savedHackathonRoadmaps` | Saved hackathon roadmaps |
