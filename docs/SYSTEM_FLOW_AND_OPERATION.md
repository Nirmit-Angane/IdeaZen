# System Flow and Operation

## Overview

IdeaZen is an AI-powered project idea generator that operates as a single-page React application with two distinct operational modes: Regular Mode for personalized project generation and Hackathon Mode for time-constrained competitive development. This document provides a comprehensive technical overview of how the system operates, including state management, data flow, screen transitions, and AI integration.

**Current Status:** Frontend Complete | AI Integration Active | Backend Ready for Integration  
**Version:** 1.2.0  
**Last Updated:** January 2025

---

## System Architecture

### Technology Stack

**Frontend Framework**
- React 18 with functional components and hooks
- TypeScript-ready architecture (currently using JSX)
- Vite for build tooling and hot module replacement

**Styling and UI**
- Tailwind CSS v4.0 for utility-first styling
- CSS Custom Properties for design tokens
- Lucide React for consistent iconography

**State Management**
- Pure React hooks (useState, useEffect)
- Centralized state in App.tsx
- Unidirectional data flow via props

**AI Integration**
- Real-time AI generation via generateProjectIdea function
- Support for multiple AI providers (OpenAI, Claude, Groq)
- Two-stage generation: suggestions → blueprint

---

## Application State Machine

### Core State Variables

The application maintains state through several key variables in App.tsx:

**appMode: AppMode**
- Type: 'regular' | 'hackathon'
- Purpose: Determines which workflow the user follows
- Default: 'regular'

**currentScreen: Screen**
- Type: Union of 14 possible screen states
- Purpose: Controls which component is rendered
- Screens: landing, mode-selection, skill-selection, questions, generating, idea-preview, generating-blueprint, output, my-ideas, problem-upload, hackathon-questions, generating-strategy, strategy-display, live-dashboard, submission-package

**userInputs: UserInputs**
- Purpose: Stores all user responses from question flow
- Initial: { skillLevel: null }
- Accumulates: domain, learningGoal, timeAvailability, deployment, technologies, etc.

**hackathonContext: HackathonContext | null**
- Purpose: Stores hackathon-specific information
- Includes: problemStatement, team, timeline, submission requirements, resources

**generatedProject: GeneratedProject | null**
- Purpose: Stores the currently displayed project blueprint
- Contains: title, difficulty, description, reasoning, features, techStack, roadmap, etc.

**generatedIdeas: GeneratedProject[]**
- Purpose: Stores multiple project suggestions for user selection
- Populated: After initial AI generation
- Used: In idea-preview screen

**hackathonStrategy: HackathonStrategy | null**
- Purpose: Stores hackathon-specific strategy (future implementation)
- Contains: winningAngle, scope, risks, roadmap, submissionPackage

---

## Regular Mode Flow

### Complete User Journey

#### 1. Landing Page (Screen: 'landing')

**Purpose:** Marketing and onboarding

**Components Rendered:**
- Navbar (with logo, navigation, Generate CTA)
- LandingPage (hero, features, examples, FAQ)
- Footer

**User Actions:**
- Click "Get Started" CTA → triggers handleStartGeneration()

**State Changes:**
- currentScreen: 'landing' → 'mode-selection'

**Visual Elements:**
- Animated gradient background blobs
- TextLoader animation
- ServerNodeLoader visualization
- Feature cards with semantic colors
- Example project previews

---

#### 2. Mode Selection (Screen: 'mode-selection')

**Purpose:** Choose between Regular and Hackathon modes

**Components Rendered:**
- Navbar
- ModeSelection
- Footer

**User Actions:**
- Select "Regular Mode" → triggers handleModeSelect('regular')
- Select "Hackathon Mode" → triggers handleModeSelect('hackathon')

**State Changes:**
- appMode: set to selected mode
- currentScreen: 'mode-selection' → 'skill-selection' (regular) or 'problem-upload' (hackathon)

---

#### 3. Skill Level Selection (Screen: 'skill-selection')

**Purpose:** Determine user's coding experience level

**Components Rendered:**
- Navbar
- SkillLevelSelection
- Footer

**User Actions:**
- Select Beginner, Intermediate, or Advanced → triggers handleSkillLevelSelect(level)

**State Changes:**
- userInputs.skillLevel: set to selected level
- currentScreen: 'skill-selection' → 'questions'

**Visual Feedback:**
- AI recommendation badge on Beginner card
- Glow effect on recommended option
- Hover animations on all cards
- Conversational reassurance messaging

**Adaptive Behavior:**
- Selection determines number of questions (4/5/6)
- Affects question complexity and terminology
- Influences generated project difficulty

---

#### 4. Question Flow (Screen: 'questions')

**Purpose:** Gather personalized information for AI generation

**Components Rendered:**
- Navbar
- QuestionFlow (with skillLevel and initialInputs props)
- Footer

**Adaptive Question Sets:**

**Beginner (4 questions):**
1. Domain: Web, Mobile, Game, Automation
2. Learning Goal: Frontend, Backend, Fullstack, Specific Tech
3. Time Availability: 2 weeks, 1 month, 2 months, 3 months
4. Deployment Preference: Local, Cloud, Both, Not Sure

**Intermediate (5 questions):**
1. Project Type: Fullstack App, API, Realtime, Mobile, DevTools
2. Learning Goal: Architecture, Performance, Testing, DevOps, New Tech
3. Time Availability: 1-6 months
4. Technologies: Multi-select (React, Node.js, Python, etc.)
5. Deployment: With scalability considerations

**Advanced (6 questions):**
1. Project Type: Distributed Systems, ML Platform, DevOps Tools, Blockchain, IoT
2. Architecture Complexity: Microservices, Event-Driven, Serverless, etc.
3. Scalability Requirements: Small, Medium, Large, Enterprise
4. Technology Preferences: Multi-select advanced stack
5. Time Availability: 2-12 months
6. Constraints: Budget, team size, compliance

**User Actions:**
- Select options for each question
- Click "Back" to revise previous answers
- Click "Continue" to proceed (disabled until answered)
- Final question: "Generate Project Idea" button

**State Changes:**
- userInputs: accumulates all responses
- currentScreen: 'questions' → 'generating' (on completion)

**Visual Features:**
- Progress bar (0-100%)
- Color-coded icons by semantic meaning
- Helper text and tooltips
- Smooth transitions between questions
- Only current question visible

**Completion Trigger:**
- handleQuestionsComplete(inputs) called
- Initiates AI generation process

---

#### 5. First Generating Screen (Screen: 'generating')

**Purpose:** Build anticipation while AI generates multiple project suggestions

**Components Rendered:**
- Navbar
- GeneratingScreen (mode="ideas")
- Footer

**Duration:** ~3 seconds (actual AI generation time)

**Visual Elements:**
- Animated gradient spinner with Brain icon
- Pulse glow effect
- Progress bar animation (0-100%)
- Timeline visualization (horizontal on desktop, vertical on mobile)

**Timeline Steps:**
1. "Analyzing your inputs..."
2. "Generating project options..."
3. "Validating feasibility..."
4. "Matching to your skill level..."
5. "Finalizing suggestions..."

**Backend Process:**
```javascript
const ideas = await generateProjectIdea(inputs, 'suggestions');
```

**AI Generation:**
- Calls generateProjectIdea() from src/lib/ai.ts
- Mode: 'suggestions'
- Returns: Array of 2 GeneratedProject objects
- Error handling: Alert and return to questions screen

**State Changes:**
- generatedIdeas: populated with AI-generated projects
- currentScreen: 'generating' → 'idea-preview' (on success)

---

#### 6. Idea Preview (Screen: 'idea-preview')

**Purpose:** Present multiple project options for user selection

**Components Rendered:**
- Navbar
- IdeaPreview (with ideas array)
- Footer

**Display Format:**
- 2 project cards in grid layout
- Each card shows:
  - Project title
  - Difficulty badge (color-coded)
  - Brief description (truncated)
  - Feature preview (first 3 features)
  - Confidence score
  - "Select This Idea" button

**User Actions:**
- Click "Select This Idea" on any card → triggers handleSelectIdea(idea)

**State Changes:**
- generatedProject: set to selected idea
- currentScreen: 'idea-preview' → 'generating-blueprint'

**Visual Features:**
- Hover lift effect on cards
- Gradient borders on hover
- Smooth animations
- Responsive grid (2 columns desktop, 1 column mobile)

---

#### 7. Second Generating Screen (Screen: 'generating-blueprint')

**Purpose:** Build anticipation while AI creates detailed project blueprint

**Components Rendered:**
- Navbar
- GeneratingScreen (mode="blueprint")
- Footer

**Duration:** ~3.5 seconds (actual AI generation time)

**Timeline Steps:**
1. "Analyzing requirements..."
2. "Building comprehensive roadmap..."
3. "Finalizing tech stack..."
4. "Creating detailed blueprint..."
5. "Validating timeline..."

**Backend Process:**
```javascript
const fullProject = await generateProjectIdea(userInputs, 'blueprint', idea.title);
```

**AI Generation:**
- Calls generateProjectIdea() with mode='blueprint'
- Passes selected idea title for context
- Returns: Complete GeneratedProject with full details
- Error handling: Alert and return to idea-preview

**State Changes:**
- generatedProject: updated with full blueprint
- currentScreen: 'generating-blueprint' → 'output' (on success)

---

#### 8. Project Output (Screen: 'output')

**Purpose:** Display complete project blueprint with refinement options

**Components Rendered:**
- Navbar
- ProjectOutput (with project, userInputs, and action handlers)
- Footer

**Layout Structure:**

**Main Content Area (Left/Top):**

1. **Header Section**
   - Project title (large, bold)
   - Difficulty badge (color-coded: cyan/blue/purple)
   - Feasibility indicator (High/Medium/Low with color)
   - Confidence score

2. **AI Reasoning Section** (Purple background)
   - "Why This Project is Perfect for You"
   - Personalized explanation
   - Match factors
   - Confidence building

3. **Project Description**
   - Clear overview
   - What will be built
   - Key objectives

4. **Features Section** (Expandable accordion)
   - Checkmark icons
   - 5-8 implementable features
   - Two-column grid (desktop)
   - Single column (mobile)

5. **Tech Stack Section** (Expandable accordion)
   - Primary recommendations (with icons)
   - Alternative options
   - Rationale for choices
   - Two-column layout

6. **Development Roadmap** (Expandable accordion)
   - 4-5 phases
   - Sequential numbering
   - Phase titles and descriptions
   - Duration estimates
   - Visual timeline
   - Detailed tasks per phase

7. **Skill Outcomes Section** (Green background)
   - "What You'll Learn"
   - 4-6 specific learning goals
   - Bullet points with icons
   - Expandable accordion

8. **Learning Resources** (Optional)
   - Documentation links
   - Tutorial suggestions
   - Example projects
   - Interactive courses

**Sidebar (Right/Bottom):**

**AI Mentor Controls**
- Sticky positioning (desktop only)
- Full width on mobile (appears first with order-1)

**Available Actions:**

1. **Refine Idea**
   - Returns to question flow
   - Keeps context
   - Allows input adjustment

2. **Make It Harder**
   - Adds advanced features
   - Increases complexity
   - Adjusts roadmap
   - Triggers new AI generation with difficultyStretch='more-complex'

3. **Simplify It**
   - Removes complex features
   - Reduces scope
   - Shortens timeline
   - Triggers new AI generation with difficultyStretch='simpler'

4. **Generate New Idea**
   - Creates different project
   - Uses same inputs
   - Returns to generating screen
   - Shows new idea-preview

5. **Start Over**
   - Returns to landing page
   - Clears all state
   - Fresh start

6. **Download PDF** (Future)
   - Export project blueprint
   - Formatted document

**User Actions:**
- Click any AI Mentor Control button
- Save project to My Ideas (via localStorage)
- Scroll through sections
- Expand/collapse accordions

**State Changes:**
- Depends on action selected
- May trigger new AI generation
- May navigate to different screen

**Responsive Behavior:**
- Desktop: Side-by-side layout, sticky sidebar
- Mobile: Stacked layout, sidebar first, full width

---

#### 9. My Ideas (Screen: 'my-ideas')

**Purpose:** View and manage saved project history

**Components Rendered:**
- Navbar
- MyIdeas (with onViewProject handler)
- Footer

**Features:**

**Project List**
- Grid of saved project cards
- Each card shows:
  - Project title
  - Difficulty badge
  - Save date
  - Confidence score
  - Quick actions (View, Delete)

**Comparison Mode**
- Select two projects
- Side-by-side comparison view
- Compare:
  - Difficulty levels
  - Time estimates
  - Features
  - Tech stacks
  - Roadmap phases
- Visual indicators of differences

**Actions:**
- View project → loads to output screen
- Delete project → removes from localStorage
- Compare projects → shows comparison view

**Data Persistence:**
- Uses localStorage
- No authentication required
- Persists across sessions
- Manual save/delete by user

**User Actions:**
- Click "View" → triggers handleViewProject(project)
- Click "Delete" → removes from storage
- Select two projects → enables comparison
- Click "Back to Generate" → returns to landing

**State Changes:**
- generatedProject: set to selected project
- currentScreen: 'my-ideas' → 'output' (when viewing)

---

## Hackathon Mode Flow

### Overview

Hackathon Mode is designed for time-constrained competitive development scenarios. It provides strategic planning, team coordination, and submission package generation.

**Current Status:** Partially implemented (UI complete, AI generation pending)

---

### Hackathon Journey

#### 1. Problem Statement Upload (Screen: 'problem-upload')

**Purpose:** Extract hackathon requirements from various sources

**Components Rendered:**
- Navbar
- ProblemStatementUpload
- Footer

**Input Methods:**
- PDF upload (problem statement document)
- Image upload (screenshot of requirements)
- Text paste (direct copy-paste)
- URL input (link to hackathon page)

**Processing:**
- Extract text from uploaded files
- Parse problem statement
- Identify key requirements
- Extract constraints and criteria

**User Actions:**
- Upload/paste problem statement
- Click "Continue" → triggers handleProblemStatementComplete(context)

**State Changes:**
- hackathonContext.problemStatement: populated
- currentScreen: 'problem-upload' → 'hackathon-questions'

---

#### 2. Hackathon Questions (Screen: 'hackathon-questions')

**Purpose:** Gather team and hackathon-specific details

**Components Rendered:**
- Navbar
- HackathonQuestions (with initialContext)
- Footer

**Question Categories:**

**Team Information:**
- Team size (1-5 members)
- Member roles (backend, frontend, design, ML, DevOps, fullstack)
- Proficiency levels (beginner, intermediate, expert)

**Timeline:**
- Duration (24/36/48/72 hours)
- Start and end times

**Submission Requirements:**
- Demo required? (yes/no)
- Pitch deck required? (yes/no)
- Video required? (yes/no)
- Repository required? (yes/no)
- Deployment required? (yes/no)
- Presentation time (minutes)

**Resources:**
- Allowed APIs
- Budget constraints
- Pre-existing code allowed? (yes/no)
- Deployment platforms
- Banned technologies

**Priority:**
- Win (maximize winning chances)
- Learn (focus on learning new tech)
- MVP (build minimum viable product)
- Network (focus on connections)

**User Actions:**
- Answer all questions
- Click "Generate Strategy" → triggers handleHackathonQuestionsComplete(context)

**State Changes:**
- hackathonContext: fully populated
- currentScreen: 'hackathon-questions' → 'generating-strategy'

---

#### 3. Generating Strategy (Screen: 'generating-strategy')

**Purpose:** AI generates comprehensive hackathon strategy

**Status:** Placeholder implementation (TODO)

**Planned AI Generation:**
- Analyze problem statement
- Identify winning angle
- Scope features (must/should/nice-to-have/don't-build)
- Assess risks (technical, time, team)
- Create hour-by-hour roadmap
- Generate submission package templates

**State Changes:**
- hackathonStrategy: populated with AI-generated strategy
- currentScreen: 'generating-strategy' → 'strategy-display'

---

#### 4. Strategy Display (Screen: 'strategy-display')

**Purpose:** Present comprehensive hackathon execution plan

**Status:** Future implementation

**Planned Sections:**
- Winning angle explanation
- Critical success factors
- Scoped features with time estimates
- Risk assessment and mitigation
- Hour-by-hour roadmap with breaks
- Work stream assignments
- Submission package templates

---

#### 5. Live Dashboard (Screen: 'live-dashboard')

**Purpose:** Real-time progress tracking during hackathon

**Status:** Future implementation

**Planned Features:**
- Current phase indicator
- Time remaining
- Task completion tracking
- Blocker reporting
- AI assistance for blockers
- Team coordination

---

#### 6. Submission Package (Screen: 'submission-package')

**Purpose:** Generate all required submission materials

**Status:** Future implementation

**Planned Outputs:**
- Pitch deck (PPTX/PDF)
- Demo script with timing
- README template
- Video storyboard
- Social media posts

---

## State Management Deep Dive

### State Flow Diagram

```
Landing
  ↓ (handleStartGeneration)
Mode Selection
  ↓ (handleModeSelect)
  ├─ Regular → Skill Selection
  │    ↓ (handleSkillLevelSelect)
  │  Questions
  │    ↓ (handleQuestionsComplete + AI)
  │  Generating (ideas)
  │    ↓
  │  Idea Preview
  │    ↓ (handleSelectIdea + AI)
  │  Generating (blueprint)
  │    ↓
  │  Output
  │    ├─ (handleRefineIdea) → Questions
  │    ├─ (handleIncreaseDifficulty + AI) → Generating → Output
  │    ├─ (handleSimplifyProject + AI) → Generating → Output
  │    ├─ (handleGenerateAnother + AI) → Generating → Idea Preview
  │    └─ (handleStartOver) → Landing
  │
  └─ Hackathon → Problem Upload
       ↓ (handleProblemStatementComplete)
     Hackathon Questions
       ↓ (handleHackathonQuestionsComplete + AI)
     Generating Strategy
       ↓
     Strategy Display
       ├─ Live Dashboard
       └─ Submission Package

My Ideas (accessible from Output)
  ↓ (handleViewProject)
Output
```

### Handler Functions

**Navigation Handlers:**

```javascript
handleStartGeneration()
// Landing → Mode Selection

handleModeSelect(mode: AppMode)
// Mode Selection → Skill Selection (regular) or Problem Upload (hackathon)

handleSkillLevelSelect(level: SkillLevel)
// Skill Selection → Questions

handleQuestionsComplete(inputs: UserInputs)
// Questions → Generating → Idea Preview (with AI)

handleSelectIdea(idea: GeneratedProject)
// Idea Preview → Generating Blueprint → Output (with AI)

handleProblemStatementComplete(context: Partial<HackathonContext>)
// Problem Upload → Hackathon Questions

handleHackathonQuestionsComplete(context: HackathonContext)
// Hackathon Questions → Generating Strategy (TODO)
```

**Refinement Handlers:**

```javascript
handleRefineIdea()
// Output → Questions (keeps context)

handleIncreaseDifficulty()
// Output → Generating Blueprint → Output (with AI, difficultyStretch='more-complex')

handleSimplifyProject()
// Output → Generating Blueprint → Output (with AI, difficultyStretch='simpler')

handleGenerateAnother()
// Output → Generating → Idea Preview (with AI, same inputs)
```

**Utility Handlers:**

```javascript
handleStartOver()
// Any screen → Landing (clears all state)

handleViewMyIdeas()
// Any screen → My Ideas

handleViewProject(project: GeneratedProject)
// My Ideas → Output (loads selected project)
```

---

## AI Integration

### Generation Function

**Location:** src/lib/ai.ts

**Function Signature:**
```typescript
generateProjectIdea(
  inputs: UserInputs,
  mode: 'suggestions' | 'blueprint',
  existingTitle?: string
): Promise<GeneratedProject | GeneratedProject[]>
```

**Modes:**

**'suggestions' Mode:**
- Purpose: Generate multiple project options
- Returns: Array of 2 GeneratedProject objects
- Used: Initial generation after questions
- Prompt: Optimized for variety and options

**'blueprint' Mode:**
- Purpose: Generate detailed single project
- Returns: Single GeneratedProject object
- Used: After idea selection, refinements
- Prompt: Optimized for depth and detail
- Optional: existingTitle for context

### AI Providers

**Supported Providers:**
- OpenAI (GPT-4, GPT-3.5)
- Anthropic Claude
- Groq (fast inference)

**Configuration:**
- API keys stored in .env.local
- Provider selection via environment variables
- Fallback mechanisms for failures

### Prompt Engineering

**Context Provided:**
- Skill level (beginner/intermediate/advanced)
- Domain interest
- Learning goals
- Time availability
- Technology preferences
- Deployment preferences
- Difficulty adjustments (if applicable)

**Output Requirements:**
- Strict JSON format matching GeneratedProject interface
- Specific, actionable project name
- Appropriate difficulty level
- Clear, detailed description
- Explanatory reasoning
- 5-8 implementable features
- Primary and alternative tech stacks
- 4-5 phase roadmap with realistic durations
- 4-6 specific learning outcomes
- Feasibility rating with justification
- Confidence score with explanation

**Quality Assurance:**
- Validation of AI response structure
- Error handling for malformed responses
- Retry logic for failures
- Timeout limits (30 seconds)

---

## Data Models

### UserInputs Interface

```typescript
interface UserInputs {
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | null;
  domain?: string;
  learningGoal?: string;
  timeAvailability?: string;
  deployment?: string;
  difficultyStretch?: string;
  technologies?: string[];
  architecture?: string;
  scalability?: string;
  constraints?: string;
  teamSize?: string;
}
```

**Usage:**
- Accumulated during question flow
- Passed to AI generation
- Stored with saved projects

---

### GeneratedProject Interface

```typescript
interface GeneratedProject {
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  reasoning: string;
  features: string[];
  techStack: {
    primary: string[];
    alternative: string[];
  };
  roadmap: {
    phase: string;
    title: string;
    description: string;
    duration: string;
  }[];
  skillOutcomes: string[];
  feasibility: 'High' | 'Medium' | 'Low';
  confidence: string;
}
```

**Usage:**
- Returned by AI generation
- Displayed in output screen
- Saved to localStorage
- Used for comparisons

---

### HackathonContext Interface

```typescript
interface HackathonContext {
  problemStatement: {
    rawText: string;
    extractedFrom: 'pdf' | 'image' | 'text' | 'url';
    sourceUrl?: string;
  };
  team: {
    size: 1 | 2 | 3 | 4 | 5;
    members: TeamMember[];
  };
  timeline: {
    duration: 24 | 36 | 48 | 72 | number;
    startTime?: string;
    endTime?: string;
  };
  submission: {
    demoRequired: boolean;
    deckRequired: boolean;
    videoRequired: boolean;
    repoRequired: boolean;
    deploymentRequired: boolean;
    presentationTime?: number;
  };
  resources: {
    allowedAPIs: string[];
    budget?: number;
    preExistingCodeAllowed: boolean;
    deploymentPlatforms: string[];
    bannedTechnologies: string[];
  };
  priority: 'win' | 'learn' | 'mvp' | 'network';
}
```

**Usage:**
- Populated during hackathon flow
- Passed to strategy generation AI
- Used for hour-by-hour planning

---

## Local Storage

### Saved Projects

**Key:** 'ideazen-saved-projects'

**Structure:**
```typescript
{
  projects: GeneratedProject[];
  savedAt: string;
}
```

**Operations:**
- Save: Add project to array
- Load: Retrieve all projects
- Delete: Remove by index
- Clear: Remove all projects

**Limitations:**
- No authentication
- Browser-specific storage
- ~5MB storage limit
- Manual save required

---

## Error Handling

### AI Generation Errors

**Scenarios:**
- API timeout
- Invalid API key
- Malformed response
- Rate limit exceeded
- Network failure

**Handling:**
- Try-catch blocks around AI calls
- User-friendly error alerts
- Return to previous screen
- Preserve user inputs
- Retry option

**Example:**
```javascript
try {
  const ideas = await generateProjectIdea(inputs, 'suggestions');
  setGeneratedIdeas(ideas);
  setCurrentScreen('idea-preview');
} catch (error) {
  console.error("Failed to generate ideas:", error);
  alert("Failed to generate project ideas. Please try again.");
  setCurrentScreen('questions');
}
```

### State Recovery

**Principles:**
- Never lose user inputs
- Always provide way back
- Clear error messages
- Preserve context
- Allow retry

---

## Performance Considerations

### Current Optimizations

**Code Structure:**
- Minimal re-renders
- Efficient state updates
- No unnecessary effects
- Clean component hierarchy

**Bundle Size:**
- Minimal dependencies
- Tree shaking enabled
- No unused imports
- Optimized builds

**AI Generation:**
- Async/await patterns
- Loading states
- Progress indicators
- Timeout limits

### Future Optimizations

**Code Splitting:**
- Lazy load screens
- Dynamic imports
- Route-based splitting

**Caching:**
- Cache AI responses
- localStorage for preferences
- Service Worker for offline

**Image Optimization:**
- Compress images
- WebP format
- Lazy loading

---

## Security Considerations

### Frontend Security

**Input Validation:**
- Validate before AI submission
- Sanitize user inputs
- Limit input lengths

**XSS Prevention:**
- React auto-escaping
- No dangerouslySetInnerHTML
- Sanitize external content

**API Key Management:**
- Never expose keys in frontend
- Use environment variables
- Backend proxy for AI calls

### Backend Security (Future)

**Authentication:**
- JWT tokens
- httpOnly cookies
- CSRF protection

**Rate Limiting:**
- IP-based limits
- User-based limits
- Exponential backoff

**API Security:**
- CORS configuration
- Request validation
- Timeout limits
- Input sanitization

---

## Responsive Design

### Breakpoints

- Mobile: 320px - 480px
- Tablet: 768px - 1024px
- Desktop: 1280px+

### Mobile Optimizations

**Navbar:**
- Hamburger menu
- Collapsible navigation
- Touch-friendly targets

**Layouts:**
- Single column grids
- Stacked sections
- Full-width buttons
- Reduced padding

**ProjectOutput:**
- Sidebar appears first (order-1)
- Full width sections
- Vertical timeline
- Collapsed accordions by default

### Desktop Optimizations

**Layouts:**
- Multi-column grids
- Side-by-side sections
- Sticky sidebar (order-2)
- Horizontal timeline

**Interactions:**
- Hover effects
- Smooth transitions
- Larger touch targets

---

## Testing Strategy

### Recommended Tests

**Unit Tests:**
- Component rendering
- State management functions
- Handler functions
- Data transformations

**Integration Tests:**
- Complete user flows
- AI integration
- Error handling
- State persistence

**E2E Tests:**
- Full user journey
- All skill levels
- All question combinations
- Refinement flows

**Tools:**
- Vitest for unit tests
- React Testing Library
- Playwright for E2E

---

## Deployment

### Frontend Deployment

**Platforms:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages

**Build Process:**
```bash
npm run build
# Creates optimized bundle in dist/
```

**Environment Variables:**
- VITE_OPENAI_API_KEY
- VITE_ANTHROPIC_API_KEY
- VITE_GROQ_API_KEY
- VITE_API_BASE_URL (for backend)

### Backend Integration (Future)

**Requirements:**
- API endpoint for project generation
- User authentication system
- Database for project persistence
- Rate limiting
- Caching layer

**See:** API_SPECIFICATION.md for detailed backend requirements

---

## Future Enhancements

### Planned Features

**Regular Mode:**
- Project sharing with URLs
- Export to PDF/Markdown
- Progress tracking
- Community ratings
- AI chat refinement
- GitHub integration
- Learning resource recommendations

**Hackathon Mode:**
- Complete AI strategy generation
- Live progress dashboard
- Blocker assistance
- Team coordination
- Submission package generation
- Real-time collaboration

**Platform:**
- Mobile app version
- Offline support
- Multi-language support
- Premium features
- Team accounts
- Analytics dashboard

---

## Troubleshooting

### Common Issues

**AI Generation Fails:**
- Check API keys in .env.local
- Verify API provider status
- Check network connection
- Review console errors
- Try different provider

**State Not Persisting:**
- Check localStorage availability
- Verify browser settings
- Clear cache and retry
- Check for errors in console

**Responsive Issues:**
- Clear browser cache
- Check viewport meta tag
- Verify Tailwind breakpoints
- Test in different browsers

---

## Related Documentation

- **PROJECT_OVERVIEW.md** - High-level vision and features
- **FRONTEND_ARCHITECTURE.md** - Technical implementation details
- **API_SPECIFICATION.md** - Backend integration requirements
- **BRANDING_UPDATE.md** - Brand identity and guidelines
- **Guidelines.md** - Design system rules

---

**Version:** 1.2.0  
**Status:** Complete and Operational  
**Last Updated:** January 2025
