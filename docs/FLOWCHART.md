# IdeaZen System Flowcharts

## Overview

This document provides visual representations of the IdeaZen application flow using multiple diagram formats. These flowcharts help visualize user journeys, state transitions, and system operations.

**Version:** 1.2.0  
**Last Updated:** January 2025

---

## Table of Contents

1. [High-Level Application Flow](#high-level-application-flow)
2. [Regular Mode Detailed Flow](#regular-mode-detailed-flow)
3. [Hackathon Mode Flow](#hackathon-mode-flow)
4. [State Machine Diagram](#state-machine-diagram)
5. [AI Generation Flow](#ai-generation-flow)
6. [Data Flow Architecture](#data-flow-architecture)
7. [Component Interaction Diagram](#component-interaction-diagram)

---

## High-Level Application Flow

### Mermaid Diagram

```mermaid
graph TD
    A[Landing Page] -->|Get Started| B[Mode Selection]
    B -->|Regular Mode| C[Skill Level Selection]
    B -->|Hackathon Mode| D[Problem Statement Upload]
    
    C -->|Select Level| E[Question Flow]
    E -->|Complete Questions| F[Generating Ideas]
    F -->|AI Generation| G[Idea Preview]
    G -->|Select Idea| H[Generating Blueprint]
    H -->|AI Generation| I[Project Output]
    
    I -->|Refine| E
    I -->|Make Harder| H
    I -->|Simplify| H
    I -->|Generate Another| F
    I -->|Start Over| A
    I -->|View My Ideas| J[My Ideas]
    J -->|View Project| I
    
    D -->|Upload Complete| K[Hackathon Questions]
    K -->|Complete| L[Generating Strategy]
    L -->|AI Generation| M[Strategy Display]
    M -->|Track Progress| N[Live Dashboard]
    M -->|Generate Materials| O[Submission Package]
    
    style A fill:#1F3C88,color:#fff
    style I fill:#22C55E,color:#fff
    style M fill:#7C6CF6,color:#fff
```



### ASCII Diagram

```
┌─────────────────┐
│  Landing Page   │
└────────┬────────┘
         │ Get Started
         ▼
┌─────────────────┐
│ Mode Selection  │
└────┬───────┬────┘
     │       │
     │       └──────────────────────┐
     │ Regular                      │ Hackathon
     ▼                              ▼
┌─────────────────┐      ┌──────────────────────┐
│ Skill Selection │      │ Problem Upload       │
└────────┬────────┘      └──────────┬───────────┘
         │                          │
         ▼                          ▼
┌─────────────────┐      ┌──────────────────────┐
│ Question Flow   │      │ Hackathon Questions  │
└────────┬────────┘      └──────────┬───────────┘
         │                          │
         ▼                          ▼
┌─────────────────┐      ┌──────────────────────┐
│ Generating      │      │ Generating Strategy  │
│ (Ideas)         │      │                      │
└────────┬────────┘      └──────────┬───────────┘
         │                          │
         ▼                          ▼
┌─────────────────┐      ┌──────────────────────┐
│ Idea Preview    │      │ Strategy Display     │
└────────┬────────┘      └──────────┬───────────┘
         │                          │
         ▼                          ├─→ Live Dashboard
┌─────────────────┐                │
│ Generating      │                └─→ Submission Package
│ (Blueprint)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Project Output  │◄──────┐
└────┬────────────┘       │
     │                    │
     ├─→ Refine Idea      │
     ├─→ Make Harder      │
     ├─→ Simplify         │
     ├─→ Generate Another │
     ├─→ My Ideas ────────┘
     └─→ Start Over
```

---

## Regular Mode Detailed Flow

### Mermaid Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant UI as UI Components
    participant S as State Manager
    participant AI as AI Service
    participant LS as LocalStorage

    U->>UI: Click "Get Started"
    UI->>S: handleStartGeneration()
    S->>UI: Show Mode Selection
    
    U->>UI: Select "Regular Mode"
    UI->>S: handleModeSelect('regular')
    S->>UI: Show Skill Selection
    
    U->>UI: Select Skill Level
    UI->>S: handleSkillLevelSelect(level)
    S->>UI: Show Question Flow
    
    U->>UI: Answer Questions (4-6)
    UI->>S: handleQuestionsComplete(inputs)
    S->>UI: Show Generating Screen
    S->>AI: generateProjectIdea(inputs, 'suggestions')
    AI-->>S: Return 2 project ideas
    S->>UI: Show Idea Preview
    
    U->>UI: Select Preferred Idea
    UI->>S: handleSelectIdea(idea)
    S->>UI: Show Generating Blueprint
    S->>AI: generateProjectIdea(inputs, 'blueprint', title)
    AI-->>S: Return full project blueprint
    S->>UI: Show Project Output
    
    U->>UI: Save Project
    UI->>LS: Save to localStorage
    
    U->>UI: Click "Make It Harder"
    UI->>S: handleIncreaseDifficulty()
    S->>AI: generateProjectIdea(inputs, 'blueprint', title)
    AI-->>S: Return enhanced project
    S->>UI: Update Project Output
```



### Step-by-Step Flow with Timing

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: Landing Page (30 seconds)                           │
├──────────────────────────────────────────────────────────────┤
│ • User reads hero section                                    │
│ • Reviews "How It Works"                                     │
│ • Checks example projects                                    │
│ • Reads FAQ                                                  │
│ • Clicks "Get Started" CTA                                   │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 2: Mode Selection (10 seconds)                         │
├──────────────────────────────────────────────────────────────┤
│ • Choose Regular or Hackathon mode                           │
│ • Read mode descriptions                                     │
│ • Click to proceed                                           │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 3: Skill Level Selection (20 seconds)                  │
├──────────────────────────────────────────────────────────────┤
│ • AI recommends Beginner                                     │
│ • User reads descriptions                                    │
│ • Selects: Beginner / Intermediate / Advanced                │
│ • Card animates and glows                                    │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 4: Question Flow (1-2 minutes)                         │
├──────────────────────────────────────────────────────────────┤
│ Beginner: 4 questions                                        │
│   1. Domain (Web/Mobile/Game/Automation)                     │
│   2. Learning Goal (Frontend/Backend/Fullstack)              │
│   3. Time Availability (2 weeks - 3 months)                  │
│   4. Deployment Preference                                   │
│                                                              │
│ Intermediate: 5 questions                                    │
│   + Technology preferences (multi-select)                    │
│                                                              │
│ Advanced: 6 questions                                        │
│   + Architecture complexity                                  │
│   + Scalability requirements                                 │
│                                                              │
│ • Progress bar shows completion                              │
│ • Back button allows revision                                │
│ • Icons color-coded by meaning                               │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 5: Generating Ideas (3 seconds)                        │
├──────────────────────────────────────────────────────────────┤
│ • Animated gradient spinner                                  │
│ • Progress messages:                                         │
│   - Analyzing your inputs...                                 │
│   - Generating project options...                            │
│   - Validating feasibility...                                │
│   - Matching to skill level...                               │
│   - Finalizing suggestions...                                │
│ • AI generates 2 project ideas                               │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 6: Idea Preview (30-60 seconds)                        │
├──────────────────────────────────────────────────────────────┤
│ • 2 project cards displayed                                  │
│ • Each shows:                                                │
│   - Title                                                    │
│   - Difficulty badge                                         │
│   - Brief description                                        │
│   - First 3 features                                         │
│   - Confidence score                                         │
│ • User selects preferred idea                                │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 7: Generating Blueprint (3.5 seconds)                  │
├──────────────────────────────────────────────────────────────┤
│ • Different animation                                        │
│ • Progress messages:                                         │
│   - Analyzing requirements...            


### Step-by-Step Flow with Timing

```
Step 1: Landing Page (30s)
  → User explores features and examples
  → Clicks "Get Started"

Step 2: Mode Selection (10s)
  → Choose Regular or Hackathon
  → Proceeds to next screen

Step 3: Skill Level Selection (20s)
  → Select Beginner/Intermediate/Advanced
  → Determines question complexity

Step 4: Question Flow (1-2 min)
  → Answer 4-6 adaptive questions
  → Progress bar shows completion
  → Click "Generate Project Idea"

Step 5: Generating Ideas (3s)
  → AI generates 2 project suggestions
  → Animated loading with progress messages

Step 6: Idea Preview (30-60s)
  → Review 2 project options
  → Select preferred idea

Step 7: Generating Blueprint (3.5s)
  → AI creates detailed project plan
  → Animated loading with progress messages

Step 8: Project Output (5-10 min)
  → Review complete blueprint
  → AI reasoning, features, tech stack, roadmap
  → Use AI Mentor Controls to refine

Step 9: My Ideas (optional)
  → Save projects to history
  → Compare multiple projects
  → Reload saved projects
```

---

## Hackathon Mode Flow

### Mermaid Diagram

```mermaid
graph TD
    A[Mode Selection] -->|Hackathon| B[Problem Statement Upload]
    B -->|PDF| C[Extract Text]
    B -->|Image| C
    B -->|Text Paste| C
    B -->|URL| C
    
    C --> D[Parse Requirements]
    D --> E[Hackathon Questions]
    
    E -->|Team Info| F[Collect Team Details]
    E -->|Timeline| G[Set Duration & Times]
    E -->|Submission| H[Define Requirements]
    E -->|Resources| I[List Constraints]
    E -->|Priority| J[Set Goal]
    
    F --> K[Generate Strategy]
    G --> K
    H --> K
    I --> K
    J --> K
    
    K -->|AI Analysis| L[Strategy Display]
    L --> M[Winning Angle]
    L --> N[Feature Scope]
    L --> O[Risk Assessment]
    L --> P[Hour-by-Hour Roadmap]
    L --> Q[Submission Templates]
    
    L --> R[Live Dashboard]
    R --> S[Track Progress]
    R --> T[Report Blockers]
    R --> U[AI Assistance]
    
    L --> V[Submission Package]
    V --> W[Pitch Deck]
    V --> X[Demo Script]
    V --> Y[Video Storyboard]
    V --> Z[Social Posts]
    
    style K fill:#7C6CF6,color:#fff
    style L fill:#22C55E,color:#fff
```



### ASCII Diagram - Hackathon Flow

```
┌─────────────────────┐
│ Problem Statement   │
│ Upload              │
└──────┬──────────────┘
       │
       ├─→ PDF Upload
       ├─→ Image Upload
       ├─→ Text Paste
       └─→ URL Input
       │
       ▼
┌─────────────────────┐
│ Extract & Parse     │
│ Requirements        │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Hackathon Questions │
├─────────────────────┤
│ • Team (size/roles) │
│ • Timeline (hours)  │
│ • Submission reqs   │
│ • Resources/APIs    │
│ • Priority goal     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ AI Strategy         │
│ Generation          │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Strategy Display    │
├─────────────────────┤
│ • Winning Angle     │
│ • Feature Scope     │
│ • Risk Assessment   │
│ • Hour-by-Hour Plan │
│ • Work Streams      │
└──────┬──────────────┘
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌─────────────────┐   ┌──────────────────┐
│ Live Dashboard  │   │ Submission       │
│                 │   │ Package          │
├─────────────────┤   ├──────────────────┤
│ • Progress      │   │ • Pitch Deck     │
│ • Time Tracking │   │ • Demo Script    │
│ • Blockers      │   │ • README         │
│ • AI Help       │   │ • Video Plan     │
│ • Team Sync     │   │ • Social Posts   │
└─────────────────┘   └──────────────────┘
```

---

## State Machine Diagram

### Complete State Transitions

```mermaid
stateDiagram-v2
    [*] --> Landing
    
    Landing --> ModeSelection: Get Started
    
    ModeSelection --> SkillSelection: Regular Mode
    ModeSelection --> ProblemUpload: Hackathon Mode
    
    SkillSelection --> Questions: Select Level
    Questions --> SkillSelection: Back
    Questions --> GeneratingIdeas: Complete
    
    GeneratingIdeas --> IdeaPreview: AI Success
    GeneratingIdeas --> Questions: AI Error
    
    IdeaPreview --> GeneratingBlueprint: Select Idea
    
    GeneratingBlueprint --> Output: AI Success
    GeneratingBlueprint --> IdeaPreview: AI Error
    
    Output --> Questions: Refine Idea
    Output --> GeneratingBlueprint: Make Harder
    Output --> GeneratingBlueprint: Simplify
    Output --> GeneratingIdeas: Generate Another
    Output --> MyIdeas: View My Ideas
    Output --> Landing: Start Over
    
    MyIdeas --> Output: View Project
    MyIdeas --> Landing: Back
    
    ProblemUpload --> HackathonQuestions: Upload Complete
    ProblemUpload --> ModeSelection: Back
    
    HackathonQuestions --> GeneratingStrategy: Complete
    HackathonQuestions --> ProblemUpload: Back
    
    GeneratingStrategy --> StrategyDisplay: AI Success
    GeneratingStrategy --> HackathonQuestions: AI Error
    
    StrategyDisplay --> LiveDashboard: Track Progress
    StrategyDisplay --> SubmissionPackage: Generate Materials
    StrategyDisplay --> Landing: Start Over
    
    LiveDashboard --> StrategyDisplay: Back
    SubmissionPackage --> StrategyDisplay: Back
```



### State Transition Table

| Current State | User Action | Next State | Handler Function |
|--------------|-------------|------------|------------------|
| landing | Get Started | mode-selection | handleStartGeneration() |
| mode-selection | Regular Mode | skill-selection | handleModeSelect('regular') |
| mode-selection | Hackathon Mode | problem-upload | handleModeSelect('hackathon') |
| skill-selection | Select Level | questions | handleSkillLevelSelect(level) |
| questions | Complete | generating | handleQuestionsComplete(inputs) |
| questions | Back | skill-selection | onBack() |
| generating | AI Success | idea-preview | (automatic) |
| generating | AI Error | questions | (error handler) |
| idea-preview | Select Idea | generating-blueprint | handleSelectIdea(idea) |
| generating-blueprint | AI Success | output | (automatic) |
| generating-blueprint | AI Error | idea-preview | (error handler) |
| output | Refine Idea | questions | handleRefineIdea() |
| output | Make Harder | generating-blueprint | handleIncreaseDifficulty() |
| output | Simplify | generating-blueprint | handleSimplifyProject() |
| output | Generate Another | generating | handleGenerateAnother() |
| output | View My Ideas | my-ideas | handleViewMyIdeas() |
| output | Start Over | landing | handleStartOver() |
| my-ideas | View Project | output | handleViewProject(project) |
| problem-upload | Complete | hackathon-questions | handleProblemStatementComplete() |
| hackathon-questions | Complete | generating-strategy | handleHackathonQuestionsComplete() |

---

## AI Generation Flow

### Two-Stage Generation Process

```mermaid
graph LR
    A[User Inputs] --> B{Generation Mode}
    
    B -->|suggestions| C[Stage 1: Ideas]
    B -->|blueprint| D[Stage 2: Blueprint]
    
    C --> E[AI Prompt Engineering]
    E --> F[Call AI Provider]
    F --> G{Response Valid?}
    
    G -->|Yes| H[Return 2 Ideas]
    G -->|No| I[Retry/Error]
    
    H --> J[User Selects Idea]
    J --> D
    
    D --> K[AI Prompt Engineering]
    K --> L[Call AI Provider]
    L --> M{Response Valid?}
    
    M -->|Yes| N[Return Full Blueprint]
    M -->|No| O[Retry/Error]
    
    N --> P[Display Project Output]
    
    style C fill:#22D3EE,color:#000
    style D fill:#7C6CF6,color:#fff
    style P fill:#22C55E,color:#fff
```

### AI Provider Selection

```
┌─────────────────────────────────────┐
│ AI Generation Request               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Check Environment Variables         │
├─────────────────────────────────────┤
│ • VITE_OPENAI_API_KEY              │
│ • VITE_ANTHROPIC_API_KEY           │
│ • VITE_GROQ_API_KEY                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Select Available Provider           │
├─────────────────────────────────────┤
│ Priority:                           │
│ 1. OpenAI (GPT-4)                  │
│ 2. Anthropic (Claude)              │
│ 3. Groq (Fast Inference)           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Construct Prompt                    │
├─────────────────────────────────────┤
│ • System role (expert mentor)       │
│ • User context (skill, goals)      │
│ • Task requirements                 │
│ • Output format (JSON)              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Call AI API                         │
├─────────────────────────────────────┤
│ • Timeout: 30 seconds               │
│ • Retry: 2 attempts                 │
│ • Error handling                    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Validate Response                   │
├─────────────────────────────────────┤
│ • Check JSON structure              │
│ • Verify required fields            │
│ • Validate data types               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Return Generated Project(s)         │
└─────────────────────────────────────┘
```



---

## Data Flow Architecture

### Component Data Flow

```mermaid
graph TB
    subgraph "App.tsx - State Container"
        S1[currentScreen]
        S2[userInputs]
        S3[generatedProject]
        S4[generatedIdeas]
        S5[hackathonContext]
        S6[appMode]
    end
    
    subgraph "UI Components"
        C1[Navbar]
        C2[LandingPage]
        C3[SkillLevelSelection]
        C4[QuestionFlow]
        C5[GeneratingScreen]
        C6[IdeaPreview]
        C7[ProjectOutput]
        C8[MyIdeas]
    end
    
    subgraph "External Services"
        AI[AI Service]
        LS[LocalStorage]
    end
    
    S1 -->|controls| C1
    S1 -->|controls| C2
    S1 -->|controls| C3
    S1 -->|controls| C4
    S1 -->|controls| C5
    S1 -->|controls| C6
    S1 -->|controls| C7
    S1 -->|controls| C8
    
    S2 -->|props| C4
    S2 -->|props| C7
    
    S3 -->|props| C7
    S4 -->|props| C6
    
    C4 -->|onComplete| S2
    C6 -->|onSelectIdea| S3
    C7 -->|actions| S1
    C8 -->|onViewProject| S3
    
    S2 -->|request| AI
    AI -->|response| S3
    AI -->|response| S4
    
    C7 -->|save| LS
    LS -->|load| C8
    
    style S1 fill:#1F3C88,color:#fff
    style AI fill:#7C6CF6,color:#fff
    style LS fill:#22D3EE,color:#000
```

### Props Flow Diagram

```
App.tsx (State Container)
│
├─→ Navbar
│   ├─ onLogoClick: handleStartOver
│   ├─ onMyIdeasClick: handleViewMyIdeas
│   ├─ onGenerateClick: handleStartGeneration
│   └─ currentPage: derived from currentScreen
│
├─→ LandingPage
│   └─ onGetStarted: handleStartGeneration
│
├─→ ModeSelection
│   └─ onSelectMode: handleModeSelect
│
├─→ SkillLevelSelection
│   └─ onSelectLevel: handleSkillLevelSelect
│
├─→ QuestionFlow
│   ├─ skillLevel: userInputs.skillLevel
│   ├─ initialInputs: userInputs
│   ├─ onComplete: handleQuestionsComplete
│   └─ onBack: () => setCurrentScreen('skill-selection')
│
├─→ GeneratingScreen
│   └─ mode: 'ideas' | 'blueprint'
│
├─→ IdeaPreview
│   ├─ ideas: generatedIdeas[]
│   └─ onSelectIdea: handleSelectIdea
│
├─→ ProjectOutput
│   ├─ project: generatedProject
│   ├─ userInputs: userInputs
│   ├─ onRefine: handleRefineIdea
│   ├─ onIncreaseDifficulty: handleIncreaseDifficulty
│   ├─ onSimplify: handleSimplifyProject
│   ├─ onGenerateAnother: handleGenerateAnother
│   └─ onStartOver: handleStartOver
│
├─→ MyIdeas
│   └─ onViewProject: handleViewProject
│
├─→ ProblemStatementUpload
│   ├─ onComplete: handleProblemStatementComplete
│   └─ onBack: () => setCurrentScreen('mode-selection')
│
└─→ HackathonQuestions
    ├─ initialContext: hackathonContext
    ├─ onComplete: handleHackathonQuestionsComplete
    └─ onBack: () => setCurrentScreen('problem-upload')
```

---

## Component Interaction Diagram

### User Interaction Flow

```mermaid
sequenceDiagram
    actor User
    participant Nav as Navbar
    participant LP as LandingPage
    participant MS as ModeSelection
    participant SS as SkillSelection
    participant QF as QuestionFlow
    participant GS as GeneratingScreen
    participant IP as IdeaPreview
    participant PO as ProjectOutput
    participant MI as MyIdeas
    participant App as App State
    participant AI as AI Service
    
    User->>LP: Views landing page
    User->>LP: Clicks "Get Started"
    LP->>App: handleStartGeneration()
    App->>MS: Render ModeSelection
    
    User->>MS: Selects "Regular Mode"
    MS->>App: handleModeSelect('regular')
    App->>SS: Render SkillSelection
    
    User->>SS: Selects "Intermediate"
    SS->>App: handleSkillLevelSelect('intermediate')
    App->>QF: Render QuestionFlow
    
    User->>QF: Answers 5 questions
    QF->>App: handleQuestionsComplete(inputs)
    App->>GS: Render GeneratingScreen
    App->>AI: generateProjectIdea(inputs, 'suggestions')
    AI-->>App: Return 2 ideas
    App->>IP: Render IdeaPreview
    
    User->>IP: Selects idea #1
    IP->>App: handleSelectIdea(idea)
    App->>GS: Render GeneratingScreen
    App->>AI: generateProjectIdea(inputs, 'blueprint')
    AI-->>App: Return full project
    App->>PO: Render ProjectOutput
    
    User->>PO: Clicks "Make It Harder"
    PO->>App: handleIncreaseDifficulty()
    App->>AI: generateProjectIdea(inputs, 'blueprint')
    AI-->>App: Return enhanced project
    App->>PO: Update ProjectOutput
    
    User->>Nav: Clicks "My Ideas"
    Nav->>App: handleViewMyIdeas()
    App->>MI: Render MyIdeas
    
    User->>MI: Views saved project
    MI->>App: handleViewProject(project)
    App->>PO: Render ProjectOutput
```



---

## Question Flow Decision Tree

### Adaptive Questions by Skill Level

```
User Selects Skill Level
│
├─ BEGINNER (4 Questions)
│  │
│  ├─ Q1: What type of project?
│  │   ├─ Web Application
│  │   ├─ Mobile App
│  │   ├─ Game
│  │   └─ Automation Tool
│  │
│  ├─ Q2: What do you want to learn?
│  │   ├─ Frontend Development
│  │   ├─ Backend Development
│  │   ├─ Fullstack Development
│  │   └─ Specific Technology
│  │
│  ├─ Q3: How much time do you have?
│  │   ├─ 2 weeks
│  │   ├─ 1 month
│  │   ├─ 2 months
│  │   └─ 3 months
│  │
│  └─ Q4: Where will you deploy?
│      ├─ Local Machine
│      ├─ Cloud Platform
│      ├─ Both
│      └─ Not Sure Yet
│
├─ INTERMEDIATE (5 Questions)
│  │
│  ├─ Q1: What type of project?
│  │   ├─ Fullstack Application
│  │   ├─ API/Backend Service
│  │   ├─ Real-time Application
│  │   ├─ Mobile Application
│  │   └─ Developer Tools
│  │
│  ├─ Q2: What's your learning goal?
│  │   ├─ System Architecture
│  │   ├─ Performance Optimization
│  │   ├─ Testing & Quality
│  │   ├─ DevOps & Deployment
│  │   └─ New Technology
│  │
│  ├─ Q3: How much time available?
│  │   ├─ 1 month
│  │   ├─ 2 months
│  │   ├─ 3 months
│  │   ├─ 4-5 months
│  │   └─ 6 months
│  │
│  ├─ Q4: Which technologies? (Multi-select)
│  │   ├─ React / Vue / Angular
│  │   ├─ Node.js / Express
│  │   ├─ Python / Django / Flask
│  │   ├─ TypeScript
│  │   ├─ PostgreSQL / MongoDB
│  │   └─ Docker / Kubernetes
│  │
│  └─ Q5: Deployment requirements?
│      ├─ Simple Hosting
│      ├─ Scalable Cloud
│      ├─ Containerized
│      └─ Serverless
│
└─ ADVANCED (6 Questions)
   │
   ├─ Q1: What type of system?
   │   ├─ Distributed System
   │   ├─ ML/AI Platform
   │   ├─ DevOps/Infrastructure
   │   ├─ Blockchain Application
   │   └─ IoT System
   │
   ├─ Q2: Architecture complexity?
   │   ├─ Microservices
   │   ├─ Event-Driven
   │   ├─ Serverless
   │   ├─ Hybrid Architecture
   │   └─ Custom Design
   │
   ├─ Q3: Scalability requirements?
   │   ├─ Small Scale (< 1K users)
   │   ├─ Medium Scale (1K-10K)
   │   ├─ Large Scale (10K-100K)
   │   └─ Enterprise (100K+)
   │
   ├─ Q4: Technology preferences? (Multi-select)
   │   ├─ Go / Rust / Elixir
   │   ├─ Kubernetes / Docker
   │   ├─ GraphQL / gRPC
   │   ├─ Redis / RabbitMQ
   │   ├─ TensorFlow / PyTorch
   │   └─ AWS / GCP / Azure
   │
   ├─ Q5: Project timeline?
   │   ├─ 2-3 months
   │   ├─ 4-6 months
   │   ├─ 7-9 months
   │   └─ 10-12 months
   │
   └─ Q6: Constraints?
       ├─ Budget limitations
       ├─ Team size
       ├─ Compliance requirements
       └─ Performance targets
```

---

## Error Handling Flow

### AI Generation Error Recovery

```mermaid
graph TD
    A[User Completes Questions] --> B[Call AI Generation]
    B --> C{API Call Success?}
    
    C -->|Yes| D{Response Valid?}
    C -->|No| E[Network Error]
    
    D -->|Yes| F[Parse JSON]
    D -->|No| G[Invalid Response]
    
    F --> H{Structure Valid?}
    H -->|Yes| I[Return Project]
    H -->|No| J[Validation Error]
    
    E --> K[Show Error Alert]
    G --> K
    J --> K
    
    K --> L[Return to Previous Screen]
    L --> M[Preserve User Inputs]
    M --> N[User Can Retry]
    
    I --> O[Display Project]
    
    style E fill:#ff6b6b,color:#fff
    style G fill:#ff6b6b,color:#fff
    style J fill:#ff6b6b,color:#fff
    style I fill:#22C55E,color:#fff
```

### Error Recovery Paths

```
AI Generation Fails
│
├─ Network Error
│  ├─ Show: "Network connection failed"
│  ├─ Action: Return to questions screen
│  └─ State: Preserve all user inputs
│
├─ API Timeout (>30s)
│  ├─ Show: "Request timed out, please try again"
│  ├─ Action: Return to questions screen
│  └─ State: Preserve all user inputs
│
├─ Invalid API Key
│  ├─ Show: "Configuration error, please contact support"
│  ├─ Action: Return to questions screen
│  └─ State: Preserve all user inputs
│
├─ Rate Limit Exceeded
│  ├─ Show: "Too many requests, please wait"
│  ├─ Action: Return to questions screen
│  └─ State: Preserve all user inputs
│
├─ Malformed Response
│  ├─ Show: "Invalid response, please try again"
│  ├─ Action: Return to questions screen
│  └─ State: Preserve all user inputs
│
└─ Validation Error
   ├─ Show: "Generated project invalid, retrying"
   ├─ Action: Retry once, then return to questions
   └─ State: Preserve all user inputs
```

---

## LocalStorage Data Flow

### Save and Load Operations

```mermaid
graph LR
    A[Project Output] --> B{User Action}
    
    B -->|Save Project| C[Get Current Projects]
    C --> D[Add New Project]
    D --> E[Save to localStorage]
    E --> F[Show Success Message]
    
    B -->|View My Ideas| G[Navigate to My Ideas]
    G --> H[Load from localStorage]
    H --> I[Parse JSON]
    I --> J{Valid Data?}
    
    J -->|Yes| K[Display Projects]
    J -->|No| L[Show Empty State]
    
    K --> M{User Action}
    M -->|View| N[Load Project to Output]
    M -->|Delete| O[Remove from Array]
    O --> P[Save Updated Array]
    M -->|Compare| Q[Show Comparison View]
    
    style E fill:#22D3EE,color:#000
    style K fill:#22C55E,color:#fff
```

### Storage Structure

```javascript
// localStorage key: 'ideazen-saved-projects'
{
  projects: [
    {
      title: "Project Title",
      difficulty: "Intermediate",
      description: "...",
      reasoning: "...",
      features: [...],
      techStack: {...},
      roadmap: [...],
      skillOutcomes: [...],
      feasibility: "High",
      confidence: "85%",
      savedAt: "2025-01-15T10:30:00Z"
    },
    // ... more projects
  ]
}
```

---

## Responsive Layout Flow

### Screen Size Adaptations

```
┌─────────────────────────────────────────────────────────┐
│ MOBILE (320px - 480px)                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Hamburger Menu                                   │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Content (Single Column)                          │  │
│  │                                                  │  │
│  │ • Sidebar appears FIRST (order-1)               │  │
│  │ • Full width sections                           │  │
│  │ • Vertical timeline                             │  │
│  │ • Stacked cards                                 │  │
│  │ • Collapsed accordions                          │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ TABLET (768px - 1024px)                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Navbar (Some Links Visible)                     │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────┐  ┌──────────────────────┐  │
│  │ Content              │  │ Sidebar              │  │
│  │ (Two Columns)        │  │ (Starts Appearing)   │  │
│  │                      │  │                      │  │
│  │ • 2-column grids     │  │ • Moderate width     │  │
│  │ • Touch-friendly     │  │ • Not sticky yet     │  │
│  └──────────────────────┘  └──────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ DESKTOP (1280px+)                                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Navbar (All Links + Generate Button)            │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────┐  ┌──────────────────┐  │
│  │ Main Content             │  │ Sticky Sidebar   │  │
│  │ (Multi-column)           │  │ (order-2)        │  │
│  │                          │  │                  │  │
│  │ • 3-column grids         │  │ • Fixed position │  │
│  │ • Horizontal timeline    │  │ • Always visible │  │
│  │ • Hover effects          │  │ • Full controls  │  │
│  │ • Expanded accordions    │  │                  │  │
│  └──────────────────────────┘  └──────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Future Enhancements Flow

### Planned Features

```mermaid
graph TD
    A[Current System] --> B[Phase 1: Backend Integration]
    B --> C[User Authentication]
    B --> D[Database Persistence]
    B --> E[Real AI Generation]
    
    A --> F[Phase 2: Enhanced Features]
    F --> G[Project Sharing]
    F --> H[PDF Export]
    F --> I[Progress Tracking]
    
    A --> J[Phase 3: Community]
    J --> K[Project Ratings]
    J --> L[User Comments]
    J --> M[Featured Projects]
    
    A --> N[Phase 4: Advanced]
    N --> O[AI Chat Refinement]
    N --> P[GitHub Integration]
    N --> Q[Team Collaboration]
    N --> R[Mobile App]
    
    style B fill:#22D3EE,color:#000
    style F fill:#7C6CF6,color:#fff
    style J fill:#22C55E,color:#fff
    style N fill:#1F3C88,color:#fff
```

---

## Summary

This flowchart document provides comprehensive visual representations of the IdeaZen system flow, including:

- **High-level application flow** showing all major screens and transitions
- **Regular mode detailed flow** with step-by-step user journey
- **Hackathon mode flow** for competitive development scenarios
- **State machine diagram** showing all possible state transitions
- **AI generation flow** explaining the two-stage generation process
- **Data flow architecture** showing how data moves through components
- **Component interaction diagrams** illustrating props and callbacks
- **Question flow decision tree** showing adaptive questions by skill level
- **Error handling flow** demonstrating recovery mechanisms
- **LocalStorage operations** for project persistence
- **Responsive layout adaptations** across device sizes
- **Future enhancement roadmap** for planned features

These diagrams complement the SYSTEM_FLOW_AND_OPERATION.md document and provide visual references for developers, designers, and stakeholders.

---

**Related Documentation:**
- SYSTEM_FLOW_AND_OPERATION.md - Detailed technical documentation
- FRONTEND_ARCHITECTURE.md - Component architecture details
- PROJECT_OVERVIEW.md - High-level project vision
- API_SPECIFICATION.md - Backend integration requirements

---

**Version:** 1.2.0  
**Last Updated:** January 2025
