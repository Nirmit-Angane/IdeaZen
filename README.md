# IdeaZen — AI-Powered Project Idea Generator

> An intelligent project mentor that helps developers of all skill levels discover, plan, and build personalized coding projects with detailed roadmaps and actionable guidance.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Adaptive Intelligence** | Questions and suggestions adapt to the user's skill level (Beginner / Intermediate / Advanced) |
| **Personalized Ideas** | AI generates project ideas matched to interests, goals, time, and tech-stack preferences |
| **Detailed Blueprints** | Phase-by-phase roadmaps with 5–7 actionable tasks per phase and realistic time estimates |
| **Hackathon Mode** | Dedicated flow with problem-statement input and hackathon-specific roadmaps |
| **AI Mentor Controls** | Refine, simplify, or increase difficulty on demand after generation |
| **Two-Stage Generation** | Choose from multiple idea cards, then drill into a full implementation blueprint |
| **My Ideas** | Save, search, sort, and manage generated projects locally with PDF export |
| **FAQ Section** | Built-in FAQ page for common questions |
| **Fully Responsive** | Optimised for mobile, tablet, and desktop breakpoints |

---

## 🛠 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Vite 6** — build tool with SWC plugin
- **React Router v7** — client-side routing
- **Lucide React** — icon library
- **Radix UI** — accessible headless UI primitives
- **Recharts** — data visualisation
- **Sonner** — toast notifications
- **jsPDF + html2canvas** — PDF export

### Backend / API

- **Vercel Serverless Functions** (TypeScript) — deployed via `vercel.json` rewrites
- **Groq API** with **Llama 3.3 70B** — powers AI idea generation
- **Local dev proxy** — `local-api.js` (Express) runs alongside Vite via `concurrently`

### Testing

- **Vitest** — unit & integration tests
- **Testing Library** (React + user-event + jest-dom)
- **fast-check** — property-based testing

---

## 📁 Project Structure

```
IdeaZen/
├── api/                         # Vercel serverless functions
│   ├── generate.ts              #   └─ AI idea generation endpoint
│   └── hackathon.ts             #   └─ Hackathon roadmap endpoint
├── docs/                        # Project documentation
│   ├── FEATURE_ENHANCEMENT_IDEAS.md
│   ├── PAGE_STRUCTURE.md
│   └── PROJECT_STRUCTURE.md
├── src/
│   ├── components/
│   │   ├── Layout/              # Navbar, Footer
│   │   ├── Common/              # Shared / reusable components
│   │   ├── animations/          # Animation components
│   │   └── ui/                  # shadcn-style UI primitives
│   ├── screens/                 # Page-level screens
│   │   ├── LandingPage/
│   │   ├── ModeSelection/
│   │   ├── SkillLevelSelection/
│   │   ├── QuestionFlow/
│   │   ├── GeneratingScreen/
│   │   ├── IdeaPreview/
│   │   ├── ProjectOutput/
│   │   ├── Hackathon/
│   │   ├── ProblemStatement/
│   │   ├── MyIdeas/
│   │   └── FAQ/
│   ├── services/                # API service layer
│   │   ├── generate.service.ts  #   └─ Idea generation calls
│   │   ├── hackathon.service.ts #   └─ Hackathon generation calls
│   │   └── pdf.service.ts       #   └─ PDF export logic
│   ├── hooks/                   # Custom React hooks
│   │   ├── useClipboard.ts
│   │   ├── useSavedProjects.ts
│   │   └── useScreenNavigation.ts
│   ├── constants/               # Static data & question configs
│   ├── types/                   # TypeScript interfaces
│   ├── lib/                     # Utility helpers
│   ├── styles/                  # Global styles & design tokens
│   ├── App.tsx                  # Root app with routing
│   ├── main.tsx                 # Entry point
│   └── index.css                # Tailwind directives & global CSS
├── index.html
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
├── vercel.json                  # Vercel rewrites for /api/*
└── local-api.js                 # Local Express dev server for API
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm** (or yarn / pnpm)
- A **Groq API key** (free tier available at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/IdeaZen.git
cd IdeaZen

# Install dependencies
npm install

# Create a .env.local file with your Groq API key
echo GROQ_API_KEY=your_key_here > .env.local
```

### Development

```bash
npm run dev
```

This starts **both** the Vite dev server and the local Express API proxy via `concurrently`. The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Output goes to the `dist/` directory.

### Tests

```bash
npm test              # Run all tests once
npm run test:watch    # Watch mode
npm run test:ui       # Vitest UI
npm run test:coverage # Coverage report
```

---

## 🧭 User Flow

```
Landing Page
    ↓
Mode Selection  →  Standard  |  Hackathon
    ↓                              ↓
Skill Level Selection        Problem Statement Input
    ↓                              ↓
Adaptive Question Flow       Generating Screen
    ↓                              ↓
Generating Screen            Hackathon Roadmap Output
    ↓
Idea Preview (3 cards)
    ↓
Full Project Blueprint
    ↓
Save / Refine / Export PDF
```

---

## 🎨 Design System

IdeaZen uses a **Navy / Cyan flat design** with a semantic colour system:

| Colour | Role |
|--------|------|
| **Deep Navy** | Trust, structure, backgrounds |
| **Cyan Accent** | Interactivity, highlights, CTAs |
| **Success Green** | Confidence, feasibility |
| **Guidance Yellow** | Tips and reassurance |

Design tokens and global styles are centralised in `src/index.css` and `src/styles/`.

---

## 🌐 Deployment

The project is configured for **Vercel** out of the box:

1. Push to GitHub.
2. Import the repo in [vercel.com](https://vercel.com).
3. Set the `GROQ_API_KEY` environment variable.
4. Deploy — Vercel auto-detects the Vite build and serverless functions.

---

## 📄 Documentation

| File | Contents |
|------|----------|
| `docs/PAGE_STRUCTURE.md` | Page-by-page breakdown of screens and components |
| `docs/PROJECT_STRUCTURE.md` | Technical architecture and file organisation |
| `docs/FEATURE_ENHANCEMENT_IDEAS.md` | Planned feature enhancements and improvements |

---

## 🤝 Contributing

Contributions are welcome! Areas of interest:

- **Frontend** — UX improvements, accessibility, animations
- **AI Prompts** — Better generation quality, new modes
- **Testing** — Expand unit and integration test coverage
- **Documentation** — Guides, tutorials, API docs

---

## 📝 License

This project uses components from [shadcn/ui](https://ui.shadcn.com) (MIT) and icons from [Lucide](https://lucide.dev) (ISC).

---

**Version:** 2.0.0  
**Status:** Frontend Complete · AI Backend Live (Groq + Llama 3.3) · Hackathon Mode · Fully Responsive  
**Last Updated:** March 2026

Built with intelligence, designed with care, crafted for developers.
