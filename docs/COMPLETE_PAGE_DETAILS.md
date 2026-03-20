# Complete Page Details - IdeaZen Application

## Overview

This document provides exhaustive details of every page, component, button, form field, and UI element in the IdeaZen application from start to finish.

**Version:** 1.2.0  
**Last Updated:** January 2025

---

## Table of Contents

1. [Navbar (Global)](#navbar-global)
2. [Page 1: Landing Page](#page-1-landing-page)
3. [Page 2: Mode Selection](#page-2-mode-selection)
4. [Page 3: Skill Level Selection](#page-3-skill-level-selection)
5. [Page 4: Question Flow](#page-4-question-flow)
6. [Page 5: Generating Ideas](#page-5-generating-ideas)
7. [Page 6: Idea Preview](#page-6-idea-preview)
8. [Page 7: Generating Blueprint](#page-7-generating-blueprint)
9. [Page 8: Project Output](#page-8-project-output)
10. [Page 9: My Ideas](#page-9-my-ideas)
11. [Page 10: Problem Upload (Hackathon)](#page-10-problem-upload)
12. [Page 11: Hackathon Questions](#page-11-hackathon-questions)
13. [Page 12: Generating Strategy](#page-12-generating-strategy)
14. [Footer (Global)](#footer-global)

---

## Navbar (Global)

**Component:** Navbar.tsx  
**Position:** Sticky top, z-index 50  
**Background:** White 95% opacity, backdrop blur  
**Height:** 80px mobile, 96px desktop

### Desktop Elements

**Logo (Left):**
- Icon: Lightbulb in gradient box (48px)
- Text: "IdeaZen" (gradient, 24px, bold)
- Subtitle: "AI Project Idea Generator" (12px, gray)
- Action: Click → Go to Landing Page

**Navigation Links (Center):**
1. "How It Works" → Scroll to section
2. "Examples" → Scroll to section
3. "My Ideas" → Navigate to My Ideas page
4. "FAQ" → Scroll to section
- Color: Gray (#64748B), hover blue (#1F3C88)
- Font: 14px, medium weight

**CTA Button (Right):**
- Text: "Generate Idea"
- Icon: Sparkles (16px)
- Background: Blue-cyan gradient
- Padding: 24px × 12px
- Rounded: 12px
- Shadow: Large, hover extra-large
- Action: Start generation flow

### Mobile Elements

**Visible:**
- Logo (smaller)
- Hamburger menu button (24px)

**Mobile Menu (when open):**
- "How It Works" button
- "Examples" button
- "My Ideas" button
- "FAQ" button
- Divider line
- "Generate New Idea" button (full width, gradient)

---

## Page 1: Landing Page

**Component:** LandingPage.tsx  
**Background:** Gradient white to light gray

### Hero Section

**Background Effects:**
- Animated AI particles
- 2 gradient blobs (purple/cyan, pulsing)
- Animated grid pattern

**Left Content:**

**Headline:**
- Line 1: "Stop Wondering." (blue, 60px desktop)
- Line 2: "Start Building." (gradient, 60px desktop)

**Subheadline:**
- "AI-powered project ideas that match your skill, interests, and time"
- Gray text, 24px desktop

**Text Loader:**
- Animated typing effect
- Shows rotating messages
- Purple color

**Primary Button:**
- "Generate My Project Idea"
- Sparkles icon (left)
- Arrow icon (right, moves on hover)
- Gradient background
- 40px × 20px padding
- Glow animation
- Action: Go to Mode Selection

**Trust Line:**
- "✓ No signup required • ✓ Free forever • ✓ Instant results"
- Small text, gray with green checkmarks

**Right Content:**
- Server Node Loader animation
- Floating effect

### How It Works Section

**Header:**
- "How It Works" (48px, blue, centered)
- "Three simple steps powered by smart AI features" (18px, gray)

**3 Step Cards:**

**Card 1:**
- Step badge: "1" (gradient circle, top-left)
- Icon: Target (56px gradient box)
- Title: "Tell Us Your Level"
- Description: "Beginner, intermediate, or advanced? AI adapts to you."
- Feature badge: "Skill-Adaptive" with description
- White background, rounded, hover effects

**Card 2:**
- Step badge: "2"
- Icon: Sparkles
- Title: "Answer Smart Questions"
- Description: "AI asks personalized questions based on your skill level."
- Feature badge: "AI Reasoning"

**Card 3:**
- Step badge: "3"
- Icon: Lightbulb
- Title: "Get Your Idea"
- Description: "AI-matched project with roadmap, tech stack, and resources."
- Feature badge: "Feasibility Check"

### Example Section

**Header:**
- "What You Actually Get" (48px, blue, centered)
- "See a real AI-generated project idea" (20px, gray)

**Example Badge:**
- "Example AI-Generated Idea" with Sparkles icon
- Purple background, rounded pill

**Mock Project Card:**

**Card Header (gradient background):**
- Icon badge: Lightbulb (48px)
- Label: "AI Generated for Beginners"
- Title: "Task Manager with Local Storage" (30px, white)
- Description: "A beginner-friendly web app..." (18px, white)
- 3 Tags: "Beginner", "Web Development", "2-3 Weeks"

**Card Content:**

**Left Column - Key Features:**
- Header: "Key Features" with CheckCircle icon
- 4 bullet points:
  1. "Add, edit, and delete tasks"
  2. "Mark tasks as complete"
  3. "Filter by status"
  4. "Persist data with localStorage"

**Right Column - Tech Stack:**
- Header: "Tech Stack" with Code2 icon
- 4 tech badges: "HTML5", "CSS3", "JavaScript", "localStorage"
- Gradient backgrounds

**AI Reasoning Box:**
- Purple/cyan gradient background
- Brain icon (40px gradient box)
- Title: "Why AI Chose This"
- Text: "Perfect for beginners because it teaches core JavaScript concepts..."

### FAQ Section

**Component:** FAQ.tsx  
**Multiple accordion items with questions and answers**

### Final CTA Section

**Header:**
- "Ready to Build Something?" (48px, blue, centered)
- "Stop wondering what to build..." (20px, gray)

**Button:**
- "✨ Generate My Project Idea"
- Arrow icon (moves on hover)
- Gradient background
- Large size
- Action: Go to Mode Selection

**Footer Text:**
- "💡 You can refine your idea anytime with AI"
- Small, gray

**Back to Top Button:**
- Appears when scrolled down
- Circular gradient button
- Arrow up icon
- Fixed bottom-right
- Action: Scroll to top

---


## Page 2: Mode Selection

**Component:** ModeSelection.tsx  
**Background:** Light gray gradient

### Header

**Title:**
- "Choose Your Mode" (48px, blue, centered)
- Margin bottom: 16px

**Subtitle:**
- "Select how you want to generate your project idea" (20px, gray, centered)
- Max width: 672px

### Mode Cards (2 cards)

**Card 1: Regular Mode**

**Icon Container:**
- Icon: Lightbulb
- Size: 64px × 64px
- Background: Gradient blue-cyan
- Rounded: 16px
- Icon size: 32px, white
- Centered
- Margin bottom: 24px

**Badge:**
- Text: "Most Popular"
- Background: Green (#22C55E)
- Text color: White
- Padding: 8px × 16px
- Rounded: Full pill
- Font size: 12px
- Font weight: Semibold
- Position: Top-right of card

**Title:**
- "Regular Mode" (24px, blue, bold)
- Margin bottom: 12px

**Description:**
- "Get personalized project ideas based on your skill level, interests, and available time"
- Color: Gray (#334155)
- Font size: 16px
- Line height: Relaxed
- Margin bottom: 24px

**Features List (4 items):**
1. "✓ Adaptive questions based on skill level"
2. "✓ Multiple project suggestions"
3. "✓ Detailed roadmap and tech stack"
4. "✓ AI reasoning for each recommendation"
- Checkmark color: Cyan (#22D3EE)
- Text color: Gray (#334155)
- Font size: 14px
- Gap: 12px between items

**Button:**
- Text: "Start Regular Mode"
- Icon: ArrowRight (20px, moves on hover)
- Background: Gradient blue-cyan
- Text color: White
- Padding: 16px × 32px
- Rounded: 12px
- Font size: 16px
- Font weight: Semibold
- Full width
- Shadow: Large, hover extra-large
- Action: Go to Skill Level Selection

**Card Styling:**
- Background: White
- Rounded: 24px
- Padding: 32px
- Border: 2px solid light gray
- Hover: Border cyan, shadow extra-large, scale 102%
- Transition: 300ms

**Card 2: Hackathon Mode**

**Icon Container:**
- Icon: Zap (lightning bolt)
- Size: 64px × 64px
- Background: Gradient purple-pink
- Rounded: 16px
- Icon size: 32px, white

**Badge:**
- Text: "Time-Optimized"
- Background: Purple (#7C6CF6)
- (Same styling as Regular Mode badge)

**Title:**
- "Hackathon Mode" (24px, blue, bold)

**Description:**
- "Strategic planning for time-constrained competitive development with hour-by-hour execution plans"
- (Same styling as Regular Mode)

**Features List (4 items):**
1. "✓ Problem statement analysis"
2. "✓ Winning strategy generation"
3. "✓ Hour-by-hour roadmap with breaks"
4. "✓ Submission package templates"
- (Same styling as Regular Mode)

**Button:**
- Text: "Start Hackathon Mode"
- Icon: ArrowRight
- Background: Gradient purple-pink
- (Same styling as Regular Mode button)
- Action: Go to Problem Statement Upload

**Layout:**
- Grid: 2 columns on desktop, 1 column on mobile
- Gap: 32px
- Max width: 1280px
- Centered

---

## Page 3: Skill Level Selection

**Component:** SkillLevelSelection.tsx  
**Background:** Light gray gradient

### Header

**AI Badge:**
- Icon: Sparkles (16px)
- Text: "AI Recommendation"
- Background: Purple/10 opacity
- Text color: Purple (#7C6CF6)
- Border: 1px purple/30
- Padding: 8px × 16px
- Rounded: Full pill
- Font size: 14px
- Centered
- Margin bottom: 16px

**Title:**
- "What's Your Coding Level?" (48px, blue, centered)
- Margin bottom: 16px

**Subtitle:**
- "Don't worry, you can always adjust this later" (20px, gray, centered)
- Max width: 672px

### Skill Level Cards (3 cards)

**Card 1: Beginner (Recommended)**

**Recommended Badge:**
- Text: "Recommended for Most"
- Background: Cyan (#22D3EE)
- Text color: White
- Padding: 8px × 16px
- Rounded: Full pill
- Font size: 12px
- Font weight: Semibold
- Position: Top-center of card
- Glow effect

**Icon Container:**
- Icon: Rocket
- Size: 80px × 80px
- Background: Gradient cyan-blue
- Rounded: 20px
- Icon size: 40px, white
- Centered
- Margin bottom: 24px
- Glow animation

**Title:**
- "Beginner" (28px, blue, bold, centered)
- Margin bottom: 8px

**Subtitle:**
- "Learning to code" (16px, gray, centered)
- Margin bottom: 16px

**Description:**
- "Perfect if you're just starting out or have built 1-2 small projects"
- Color: Gray (#334155)
- Font size: 14px
- Line height: Relaxed
- Text align: Center
- Margin bottom: 24px

**What You'll Get (3 items):**
1. "4 simple questions"
2. "Beginner-friendly projects"
3. "Step-by-step guidance"
- Bullet color: Cyan
- Text color: Gray
- Font size: 14px
- Centered
- Gap: 8px

**Button:**
- Text: "I'm a Beginner"
- Background: Gradient cyan-blue
- Text color: White
- Padding: 16px × 32px
- Rounded: 12px
- Font size: 16px
- Font weight: Semibold
- Full width
- Shadow: Large
- Action: Set skill level to Beginner, go to Questions

**Card Styling:**
- Background: White
- Rounded: 24px
- Padding: 40px
- Border: 3px solid cyan (recommended)
- Glow effect: Cyan shadow
- Scale: 105% (recommended)
- Hover: Shadow extra-large, scale 108%
- Transition: 300ms

**Card 2: Intermediate**

**Icon Container:**
- Icon: Code2
- Background: Gradient blue-purple
- (Same size as Beginner)

**Title:**
- "Intermediate" (28px, blue, bold, centered)

**Subtitle:**
- "Built a few projects" (16px, gray, centered)

**Description:**
- "You've completed several projects and want to level up your skills"

**What You'll Get (3 items):**
1. "5 detailed questions"
2. "Challenging projects"
3. "Advanced concepts"

**Button:**
- Text: "I'm Intermediate"
- Background: Gradient blue-purple
- Action: Set skill level to Intermediate, go to Questions

**Card Styling:**
- Border: 2px solid light gray (not recommended)
- No glow effect
- Normal scale
- Hover: Border blue, shadow large, scale 102%

**Card 3: Advanced**

**Icon Container:**
- Icon: Cpu (processor chip)
- Background: Gradient purple-pink
- (Same size as Beginner)

**Title:**
- "Advanced" (28px, blue, bold, centered)

**Subtitle:**
- "Professional experience" (16px, gray, centered)

**Description:**
- "You're experienced and want complex, portfolio-worthy projects"

**What You'll Get (3 items):**
1. "6 in-depth questions"
2. "Complex architectures"
3. "Production-ready systems"

**Button:**
- Text: "I'm Advanced"
- Background: Gradient purple-pink
- Action: Set skill level to Advanced, go to Questions

**Card Styling:**
- (Same as Intermediate - not recommended)

**Layout:**
- Grid: 3 columns on desktop, 1 column on mobile
- Gap: 24px
- Max width: 1280px
- Centered

**AI Message (Bottom):**
- Icon: Brain (20px, purple)
- Text: "AI will adapt all questions and recommendations to your selected level"
- Background: Purple/5 opacity
- Border: 1px purple/20
- Padding: 16px × 24px
- Rounded: 16px
- Font size: 14px
- Color: Gray
- Centered
- Max width: 768px

---

## Page 4: Question Flow

**Component:** QuestionFlow.tsx  
**Background:** Light gray gradient

### Header (All Questions)

**Progress Bar:**
- Background: Light gray (#E2E8F0)
- Fill: Gradient blue-cyan
- Height: 8px
- Rounded: Full
- Width: 100%
- Percentage: (currentQuestion / totalQuestions) × 100
- Margin bottom: 32px

**Progress Text:**
- "Question {current} of {total}" (14px, gray, centered)
- Margin bottom: 8px

### Question Container

**Question Number:**
- "Question {number}" (14px, purple, semibold)
- Margin bottom: 8px

**Question Text:**
- Font size: 28px desktop, 24px mobile
- Color: Blue (#1F3C88)
- Font weight: Bold
- Margin bottom: 16px

**Helper Text (if present):**
- Font size: 16px
- Color: Gray (#64748B)
- Line height: Relaxed
- Margin bottom: 32px

### Question Types

#### Single Select Options

**Option Cards:**
- Background: White
- Border: 2px solid light gray
- Rounded: 16px
- Padding: 20px × 24px
- Cursor: Pointer
- Transition: 200ms

**Option Content:**
- Icon: Left side (24px, colored)
- Emoji: After icon (24px)
- Text: Main option text (16px, gray)
- Layout: Flex row, gap 12px

**Option States:**
- Default: White background, gray border
- Hover: Light blue background, blue border
- Selected: Blue background, blue border, white text, scale 102%

**Icon Colors by Semantic Meaning:**
- Domain/Type: Cyan (#22D3EE)
- Learning: Purple (#7C6CF6)
- Time: Yellow (#FACC15)
- Deployment: Green (#22C55E)

#### Multi-Select Options

**Same as Single Select, but:**
- Checkbox icon on right side
- Multiple can be selected
- Selected: Blue background with checkmark
- Minimum selection: Usually 1
- Maximum selection: Usually 3-5

### Beginner Questions (4 total)

**Question 1: Domain**
- "What type of project interests you?"
- Helper: "Choose the area you're most excited to learn"
- Options:
  1. 🌐 Web Application
  2. 📱 Mobile App
  3. 🎮 Game
  4. 🤖 Automation Tool

**Question 2: Learning Goal**
- "What do you want to learn?"
- Helper: "Pick your main learning focus"
- Options:
  1. 🎨 Frontend Development
  2. ⚙️ Backend Development
  3. 🔄 Fullstack Development
  4. 🛠️ Specific Technology

**Question 3: Time Availability**
- "How much time can you dedicate?"
- Helper: "Be realistic about your schedule"
- Options:
  1. ⏱️ 2 weeks
  2. 📅 1 month
  3. 📆 2 months
  4. 🗓️ 3 months

**Question 4: Deployment**
- "Where do you want to deploy?"
- Helper: "Don't worry, we'll guide you through it"
- Options:
  1. 💻 Local Machine
  2. ☁️ Cloud Platform
  3. 🌍 Both
  4. 🤷 Not Sure Yet

### Intermediate Questions (5 total)

**Question 1: Project Type**
- "What type of project do you want to build?"
- Options:
  1. 🌐 Fullstack Application
  2. 🔌 API/Backend Service
  3. ⚡ Real-time Application
  4. 📱 Mobile Application
  5. 🛠️ Developer Tools

**Question 2: Learning Goal**
- "What's your main learning goal?"
- Options:
  1. 🏗️ System Architecture
  2. ⚡ Performance Optimization
  3. ✅ Testing & Quality
  4. 🚀 DevOps & Deployment
  5. 🆕 New Technology

**Question 3: Time Availability**
- "Project timeline?"
- Options:
  1. 📅 1 month
  2. 📆 2 months
  3. 🗓️ 3 months
  4. 📊 4-5 months
  5. 📈 6 months

**Question 4: Technologies (Multi-select)**
- "Which technologies interest you?"
- Helper: "Select 1-3 technologies"
- Options:
  1. ⚛️ React / Vue / Angular
  2. 🟢 Node.js / Express
  3. 🐍 Python / Django / Flask
  4. 📘 TypeScript
  5. 🗄️ PostgreSQL / MongoDB
  6. 🐳 Docker / Kubernetes

**Question 5: Deployment**
- "Deployment requirements?"
- Options:
  1. 🌐 Simple Hosting
  2. ☁️ Scalable Cloud
  3. 🐳 Containerized
  4. ⚡ Serverless

### Advanced Questions (6 total)

**Question 1: System Type**
- "What type of system?"
- Options:
  1. 🌐 Distributed System
  2. 🤖 ML/AI Platform
  3. 🚀 DevOps/Infrastructure
  4. ⛓️ Blockchain Application
  5. 📡 IoT System

**Question 2: Architecture**
- "Architecture complexity?"
- Options:
  1. 🔷 Microservices
  2. ⚡ Event-Driven
  3. ☁️ Serverless
  4. 🔀 Hybrid Architecture
  5. 🎨 Custom Design

**Question 3: Scalability**
- "Scalability requirements?"
- Options:
  1. 👥 Small Scale (< 1K users)
  2. 📊 Medium Scale (1K-10K)
  3. 📈 Large Scale (10K-100K)
  4. 🏢 Enterprise (100K+)

**Question 4: Technologies (Multi-select)**
- "Technology preferences?"
- Helper: "Select 2-4 technologies"
- Options:
  1. 🦀 Go / Rust / Elixir
  2. 🐳 Kubernetes / Docker
  3. 🔌 GraphQL / gRPC
  4. ⚡ Redis / RabbitMQ
  5. 🤖 TensorFlow / PyTorch
  6. ☁️ AWS / GCP / Azure

**Question 5: Timeline**
- "Project timeline?"
- Options:
  1. 📅 2-3 months
  2. 📆 4-6 months
  3. 🗓️ 7-9 months
  4. 📊 10-12 months

**Question 6: Constraints**
- "Any constraints?"
- Helper: "Optional - select if applicable"
- Options:
  1. 💰 Budget limitations
  2. 👥 Team size constraints
  3. 📋 Compliance requirements
  4. ⚡ Performance targets

### Navigation Buttons

**Back Button:**
- Text: "Back"
- Icon: ArrowLeft (20px)
- Background: White
- Border: 2px solid gray
- Text color: Gray
- Padding: 12px × 24px
- Rounded: 12px
- Font size: 16px
- Hover: Border blue, text blue
- Action: Go to previous question (or Skill Selection if first question)
- Position: Bottom-left

**Continue Button:**
- Text: "Continue" (or "Generate Project Idea" on last question)
- Icon: ArrowRight (20px, moves on hover)
- Background: Gradient blue-cyan
- Text color: White
- Padding: 12px × 32px
- Rounded: 12px
- Font size: 16px
- Font weight: Semibold
- Shadow: Large
- Disabled: Gray background, no hover, cursor not-allowed
- Enabled: Hover shadow extra-large, scale 102%
- Action: Go to next question (or start generation if last question)
- Position: Bottom-right

**Button Container:**
- Layout: Flex row, space between
- Width: 100%
- Margin top: 48px

---


## Page 5: Generating Ideas

**Component:** GeneratingScreen.tsx (mode="ideas")  
**Background:** Gradient from light gray to white  
**Duration:** ~3 seconds (actual AI generation time)

### Content Container

**Icon:**
- Icon: Brain (Lucide)
- Size: 64px × 64px
- Color: Purple (#7C6CF6)
- Pulse animation
- Glow effect: Purple shadow
- Centered
- Margin bottom: 32px

**Title:**
- "Generating Project Ideas" (36px, blue, bold, centered)
- Margin bottom: 16px

**Subtitle:**
- "AI is analyzing your inputs and creating personalized suggestions..." (18px, gray, centered)
- Max width: 672px
- Margin bottom: 48px

**Progress Bar:**
- Background: Light gray (#E2E8F0)
- Fill: Gradient blue-cyan
- Height: 8px
- Rounded: Full
- Width: 100% (max 512px)
- Animation: 0% to 100% over 3 seconds
- Centered
- Margin bottom: 48px

### Timeline Steps (5 steps)

**Layout:**
- Desktop: Horizontal row
- Mobile: Vertical list
- Gap: 24px desktop, 16px mobile
- Centered

**Step 1:**
- Icon: Search (20px)
- Icon background: Gradient blue-cyan circle (40px)
- Icon color: White
- Text: "Analyzing your inputs..."
- Text color: Blue (active), Gray (inactive)
- Font size: 14px
- State: Active → Complete → Inactive
- Active: Pulse animation, blue text
- Complete: Checkmark icon, blue text
- Inactive: Gray text

**Step 2:**
- Icon: Sparkles
- Text: "Generating project options..."
- (Same styling as Step 1)

**Step 3:**
- Icon: CheckCircle
- Text: "Validating feasibility..."
- (Same styling as Step 1)

**Step 4:**
- Icon: Target
- Text: "Matching to your skill level..."
- (Same styling as Step 1)

**Step 5:**
- Icon: Lightbulb
- Text: "Finalizing suggestions..."
- (Same styling as Step 1)

**Timeline Connector (Desktop only):**
- Line between steps
- Color: Light gray
- Active portion: Blue-cyan gradient
- Height: 2px
- Animated as steps complete

**Mobile Timeline:**
- Vertical layout
- Steps stacked
- Connector line on left side
- Step descriptions visible

---

## Page 6: Idea Preview

**Component:** IdeaPreview.tsx  
**Background:** Light gray gradient

### Header

**Title:**
- "Choose Your Project Idea" (48px, blue, bold, centered)
- Margin bottom: 16px

**Subtitle:**
- "Select the project that excites you most. We'll create a detailed blueprint next." (20px, gray, centered)
- Max width: 768px
- Margin bottom: 48px

### Project Cards (2 cards)

**Card Layout:**
- Grid: 2 columns on desktop, 1 column on mobile
- Gap: 32px
- Max width: 1280px
- Centered

**Card 1: Project Option**

**Card Container:**
- Background: White
- Rounded: 24px
- Padding: 32px
- Border: 2px solid light gray
- Hover: Border cyan, shadow extra-large, scale 102%
- Transition: 300ms
- Cursor: Pointer

**Header Section:**

**Difficulty Badge:**
- Text: "Beginner" / "Intermediate" / "Advanced"
- Background: Gradient (cyan for beginner, blue for intermediate, purple for advanced)
- Text color: White
- Padding: 8px × 16px
- Rounded: Full pill
- Font size: 14px
- Font weight: Semibold
- Position: Top-right
- Margin bottom: 16px

**Project Title:**
- Font size: 28px
- Color: Blue (#1F3C88)
- Font weight: Bold
- Margin bottom: 12px
- Line height: Tight

**Project Description:**
- Font size: 16px
- Color: Gray (#334155)
- Line height: Relaxed
- Margin bottom: 24px
- Max lines: 3 (truncated with ellipsis)

**Features Preview:**
- Label: "Key Features" (14px, gray, semibold)
- Margin bottom: 12px

**Feature List (First 3 features):**
1. Feature 1
2. Feature 2
3. Feature 3
- Bullet: Cyan checkmark (16px)
- Text: Gray (#334155), 14px
- Gap: 8px between items
- Margin bottom: 24px

**Confidence Score:**
- Icon: Sparkles (16px, purple)
- Text: "85% Match" (example)
- Background: Purple/10 opacity
- Text color: Purple (#7C6CF6)
- Border: 1px purple/30
- Padding: 8px × 16px
- Rounded: Full pill
- Font size: 14px
- Font weight: Medium
- Margin bottom: 24px

**Select Button:**
- Text: "Select This Idea"
- Icon: ArrowRight (20px, moves on hover)
- Background: Gradient blue-cyan
- Text color: White
- Padding: 16px × 32px
- Rounded: 12px
- Font size: 16px
- Font weight: Semibold
- Full width
- Shadow: Large, hover extra-large
- Action: Select this project, go to Generating Blueprint

**Card 2:**
- (Same structure as Card 1, different project data)

**Hover Effects:**
- Card lifts with shadow
- Border changes to cyan
- Scale increases to 102%
- Button shadow increases

---

## Page 7: Generating Blueprint

**Component:** GeneratingScreen.tsx (mode="blueprint")  
**Background:** Gradient from light gray to white  
**Duration:** ~3.5 seconds (actual AI generation time)

### Content Container

**Icon:**
- Icon: Brain (Lucide)
- Size: 64px × 64px
- Color: Purple (#7C6CF6)
- Pulse animation
- Glow effect: Purple shadow
- Centered
- Margin bottom: 32px

**Title:**
- "Creating Detailed Blueprint" (36px, blue, bold, centered)
- Margin bottom: 16px

**Subtitle:**
- "AI is building your comprehensive project roadmap..." (18px, gray, centered)
- Max width: 672px
- Margin bottom: 48px

**Progress Bar:**
- (Same as Generating Ideas)

### Timeline Steps (5 steps)

**Step 1:**
- Icon: Search
- Text: "Analyzing requirements..."

**Step 2:**
- Icon: Map
- Text: "Building comprehensive roadmap..."

**Step 3:**
- Icon: Code2
- Text: "Finalizing tech stack..."

**Step 4:**
- Icon: FileText
- Text: "Creating detailed blueprint..."

**Step 5:**
- Icon: CheckCircle
- Text: "Validating timeline..."

(All steps have same styling as Generating Ideas page)

---

## Page 8: Project Output

**Component:** ProjectOutput.tsx  
**Background:** Light gray gradient

### Layout

**Desktop:**
- Two-column layout
- Left: Main content (70%)
- Right: Sidebar (30%, sticky)

**Mobile:**
- Single column
- Sidebar appears FIRST (order-1)
- Main content appears SECOND (order-2)

### Main Content Area

#### Header Section

**Project Title:**
- Font size: 40px desktop, 32px mobile
- Color: Blue (#1F3C88)
- Font weight: Bold
- Margin bottom: 16px

**Badges Row:**

**Difficulty Badge:**
- Text: "Beginner" / "Intermediate" / "Advanced"
- Background: Gradient (cyan/blue/purple based on level)
- Text color: White
- Padding: 10px × 20px
- Rounded: Full pill
- Font size: 16px
- Font weight: Semibold

**Feasibility Badge:**
- Text: "High Feasibility" / "Medium" / "Low"
- Icon: CheckCircle (16px)
- Background: Green/Yellow/Red (10% opacity)
- Text color: Green/Yellow/Red
- Border: 1px solid (matching color, 30% opacity)
- Padding: 10px × 20px
- Rounded: Full pill
- Font size: 14px
- Font weight: Medium

**Confidence Score:**
- Text: "85% Confidence" (example)
- Icon: Sparkles (16px)
- Background: Purple/10 opacity
- Text color: Purple (#7C6CF6)
- Border: 1px purple/30
- Padding: 10px × 20px
- Rounded: Full pill
- Font size: 14px
- Font weight: Medium

**Badges Layout:**
- Flex row, wrap
- Gap: 12px
- Margin bottom: 32px

#### AI Reasoning Section

**Container:**
- Background: Gradient from-[#F3F1FF] to-[#ECFEFF] (purple to cyan, light)
- Border: 1px solid purple/20
- Rounded: 20px
- Padding: 32px
- Margin bottom: 32px

**Header:**
- Icon: Brain (32px, gradient purple-cyan box)
- Title: "Why This Project is Perfect for You" (24px, blue, bold)
- Layout: Flex row, gap 16px
- Margin bottom: 16px

**Reasoning Text:**
- Font size: 16px
- Color: Gray (#334155)
- Line height: Relaxed
- Multiple paragraphs explaining AI's reasoning

**Match Factors (if present):**
- Bullet list with cyan checkmarks
- Font size: 14px
- Color: Gray
- Gap: 8px

#### Project Description Section

**Title:**
- "Project Overview" (24px, blue, bold)
- Margin bottom: 16px

**Description Text:**
- Font size: 16px
- Color: Gray (#334155)
- Line height: Relaxed
- Multiple paragraphs
- Margin bottom: 32px

#### Features Section (Accordion)

**Accordion Header:**
- Title: "Features" (24px, blue, bold)
- Icon: ChevronDown (24px, rotates when open)
- Background: White
- Border: 2px solid light gray
- Rounded: 16px
- Padding: 20px × 24px
- Cursor: Pointer
- Hover: Border cyan
- Margin bottom: 16px

**Accordion Content (when open):**
- Background: White
- Border: 2px solid light gray (top removed)
- Rounded: 16px (top corners square)
- Padding: 24px
- Margin bottom: 32px

**Features List (5-8 items):**
- Grid: 2 columns on desktop, 1 column on mobile
- Gap: 16px

**Feature Item:**
- Icon: CheckCircle (20px, cyan)
- Text: Feature description (16px, gray)
- Layout: Flex row, gap 12px

#### Tech Stack Section (Accordion)

**Accordion Header:**
- Title: "Tech Stack" (24px, blue, bold)
- (Same styling as Features accordion)

**Accordion Content:**

**Primary Technologies:**
- Label: "Primary Stack" (16px, blue, semibold)
- Margin bottom: 12px

**Tech Badges (4-6 items):**
- Background: Gradient blue-cyan
- Text color: White
- Padding: 12px × 20px
- Rounded: 12px
- Font size: 14px
- Font weight: Medium
- Gap: 12px
- Flex wrap

**Alternative Technologies:**
- Label: "Alternative Options" (16px, gray, semibold)
- Margin top: 24px
- Margin bottom: 12px

**Alt Tech Badges:**
- Background: White
- Border: 2px solid gray
- Text color: Gray
- (Same size/padding as primary)

**Rationale Text (if present):**
- Font size: 14px
- Color: Gray
- Line height: Relaxed
- Margin top: 16px

#### Development Roadmap Section (Accordion)

**Accordion Header:**
- Title: "Development Roadmap" (24px, blue, bold)
- (Same styling as other accordions)

**Accordion Content:**

**Phase Cards (4-5 phases):**

**Phase Card:**
- Background: White
- Border: 2px solid light gray
- Rounded: 16px
- Padding: 24px
- Margin bottom: 16px
- Hover: Border cyan, shadow large

**Phase Header:**
- Phase number: "Phase 1" (14px, purple, semibold)
- Phase title: "Setup & Foundation" (20px, blue, bold)
- Duration: "Week 1-2" (14px, gray)
- Layout: Flex column
- Margin bottom: 16px

**Phase Description:**
- Font size: 16px
- Color: Gray (#334155)
- Line height: Relaxed
- Margin bottom: 16px

**Phase Tasks (if present):**
- Bullet list with cyan bullets
- Font size: 14px
- Color: Gray
- Gap: 8px

**Visual Timeline (Desktop):**
- Vertical line connecting phases
- Color: Light gray
- Active portion: Blue-cyan gradient
- Position: Left side of phases

#### Skill Outcomes Section (Accordion)

**Accordion Header:**
- Title: "What You'll Learn" (24px, blue, bold)
- (Same styling as other accordions)

**Accordion Content:**
- Background: Gradient from-[#EAFBF1] to-[#ECFEFF] (green to cyan, light)
- Border: 1px solid green/20
- Rounded: 16px
- Padding: 24px

**Outcomes List (4-6 items):**
- Icon: GraduationCap (20px, green)
- Text: Learning outcome (16px, gray)
- Layout: Flex row, gap 12px
- Margin bottom: 12px (last item no margin)

#### Learning Resources Section (Optional, Accordion)

**Accordion Header:**
- Title: "Learning Resources" (24px, blue, bold)
- (Same styling as other accordions)

**Accordion Content:**

**Resource Categories:**
1. Documentation
2. Tutorials
3. Example Projects
4. Interactive Courses

**Resource Item:**
- Icon: ExternalLink (16px, cyan)
- Title: Resource name (16px, blue, semibold)
- Link: URL (14px, cyan, underline on hover)
- Description: Brief description (14px, gray)
- Layout: Flex column, gap 4px
- Margin bottom: 16px

### Sidebar (AI Mentor Controls)

**Container:**
- Background: White
- Rounded: 20px
- Padding: 24px
- Border: 2px solid light gray
- Shadow: Large
- Sticky: Top 24px (desktop only)
- Order: 1 on mobile, 2 on desktop
- Full width on mobile

**Header:**
- Icon: Sparkles (24px, purple)
- Title: "AI Mentor Controls" (20px, blue, bold)
- Layout: Flex row, gap 12px
- Margin bottom: 24px

**Control Buttons (5 buttons):**

**Button 1: Refine Idea**
- Icon: Edit (20px)
- Text: "Refine Idea"
- Description: "Adjust your inputs"
- Background: White
- Border: 2px solid gray
- Text color: Gray
- Padding: 16px
- Rounded: 12px
- Font size: 16px
- Font weight: Semibold
- Full width
- Hover: Border blue, text blue, shadow medium
- Margin bottom: 12px
- Action: Go back to Questions (keep context)

**Button 2: Make It Harder**
- Icon: TrendingUp (20px)
- Text: "Make It Harder"
- Description: "Add complexity"
- Background: White
- Border: 2px solid gray
- (Same styling as Button 1)
- Action: Regenerate with increased difficulty

**Button 3: Simplify It**
- Icon: TrendingDown (20px)
- Text: "Simplify It"
- Description: "Reduce scope"
- (Same styling as Button 1)
- Action: Regenerate with decreased difficulty

**Button 4: Generate New Idea**
- Icon: RefreshCw (20px)
- Text: "Generate New Idea"
- Description: "Different approach"
- (Same styling as Button 1)
- Action: Generate new ideas with same inputs

**Button 5: Download PDF**
- Icon: Download (20px)
- Text: "Download PDF"
- Description: "Save for later"
- Background: Gradient blue-cyan
- Text color: White
- (Same size/padding as other buttons)
- Hover: Darker gradient, shadow large
- Action: Export project as PDF (future feature)

**Divider:**
- Height: 1px
- Color: Light gray
- Margin: 24px vertical

**Additional Actions:**

**Save Project Button:**
- Icon: Bookmark (20px)
- Text: "Save to My Ideas"
- Background: Green (#22C55E)
- Text color: White
- Padding: 16px
- Rounded: 12px
- Font size: 16px
- Font weight: Semibold
- Full width
- Hover: Darker green, shadow large
- Action: Save to localStorage

**Start Over Button:**
- Icon: Home (20px)
- Text: "Start Over"
- Background: White
- Border: 2px solid gray
- Text color: Gray
- Padding: 12px
- Rounded: 12px
- Font size: 14px
- Full width
- Hover: Border red, text red
- Margin top: 12px
- Action: Go to Landing Page (clear all state)

---


## Page 9: My Ideas

**Component:** MyIdeas.tsx  
**Background:** Light gray gradient

### Header

**Title:**
- "My Saved Ideas" (48px, blue, bold, centered)
- Margin bottom: 16px

**Subtitle:**
- "View, compare, and manage your saved project ideas" (20px, gray, centered)
- Max width: 768px
- Margin bottom: 48px

### Empty State (No Saved Projects)

**Icon:**
- Icon: Bookmark (64px, gray)
- Centered
- Margin bottom: 24px

**Message:**
- "No saved projects yet" (24px, gray, centered)
- Margin bottom: 16px

**Description:**
- "Save projects from the output page to see them here" (16px, light gray, centered)
- Margin bottom: 32px

**Button:**
- Text: "Generate New Idea"
- Icon: Sparkles (20px)
- Background: Gradient blue-cyan
- Padding: 16px × 32px
- Rounded: 12px
- Action: Go to Mode Selection

### Project List (When Projects Exist)

**Layout:**
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Gap: 24px
- Max width: 1280px
- Centered

**Project Card:**

**Card Container:**
- Background: White
- Rounded: 20px
- Padding: 24px
- Border: 2px solid light gray
- Hover: Border cyan, shadow large, scale 102%
- Transition: 300ms
- Cursor: Pointer

**Card Header:**

**Difficulty Badge:**
- Text: "Beginner" / "Intermediate" / "Advanced"
- Background: Gradient (cyan/blue/purple)
- Text color: White
- Padding: 6px × 12px
- Rounded: Full pill
- Font size: 12px
- Font weight: Semibold
- Position: Top-right
- Margin bottom: 12px

**Project Title:**
- Font size: 20px
- Color: Blue (#1F3C88)
- Font weight: Bold
- Margin bottom: 8px
- Line height: Tight
- Max lines: 2 (truncated)

**Save Date:**
- Text: "Saved on Jan 15, 2025" (example)
- Icon: Calendar (14px, gray)
- Font size: 12px
- Color: Gray (#64748B)
- Margin bottom: 16px

**Description:**
- Font size: 14px
- Color: Gray (#334155)
- Line height: Relaxed
- Max lines: 3 (truncated with ellipsis)
- Margin bottom: 16px

**Confidence Score:**
- Icon: Sparkles (14px, purple)
- Text: "85% Match"
- Background: Purple/10 opacity
- Text color: Purple
- Padding: 6px × 12px
- Rounded: Full pill
- Font size: 12px
- Margin bottom: 16px

**Action Buttons:**

**View Button:**
- Text: "View Details"
- Icon: Eye (16px)
- Background: Gradient blue-cyan
- Text color: White
- Padding: 12px × 20px
- Rounded: 10px
- Font size: 14px
- Font weight: Semibold
- Full width
- Hover: Darker gradient, shadow medium
- Margin bottom: 8px
- Action: Load project to Output page

**Delete Button:**
- Text: "Delete"
- Icon: Trash2 (16px)
- Background: White
- Border: 2px solid red/30
- Text color: Red
- Padding: 12px × 20px
- Rounded: 10px
- Font size: 14px
- Full width
- Hover: Background red/10, border red
- Action: Remove from localStorage (with confirmation)

### Comparison Mode

**Trigger:**
- Checkbox on each card (top-left)
- "Compare" button appears when 2 cards selected

**Compare Button:**
- Text: "Compare Selected (2)"
- Icon: GitCompare (20px)
- Background: Purple (#7C6CF6)
- Text color: White
- Padding: 16px × 32px
- Rounded: 12px
- Font size: 16px
- Font weight: Semibold
- Fixed bottom-center
- Shadow: Extra-large
- Action: Show comparison view

**Comparison View:**

**Layout:**
- Two-column grid on desktop
- Single column on mobile
- Gap: 32px
- Max width: 1280px

**Comparison Header:**
- Title: "Project Comparison" (36px, blue, bold, centered)
- Close button: X icon (24px, top-right)
- Margin bottom: 32px

**Comparison Sections:**

1. **Basic Info:**
   - Project titles
   - Difficulty levels
   - Time estimates
   - Feasibility ratings

2. **Features:**
   - Side-by-side feature lists
   - Checkmarks for matching features
   - Highlight differences

3. **Tech Stack:**
   - Primary technologies
   - Alternative options
   - Common technologies highlighted

4. **Roadmap:**
   - Phase counts
   - Duration comparison
   - Complexity indicators

**Visual Indicators:**
- Green: Better/Higher value
- Yellow: Similar/Equal
- Red: Lower value
- Gray: Neutral

**Close Button:**
- Text: "Close Comparison"
- Background: Gray
- Padding: 12px × 24px
- Rounded: 12px
- Centered
- Margin top: 32px
- Action: Return to project list

---

## Page 10: Problem Upload (Hackathon)

**Component:** ProblemStatementUpload.tsx  
**Background:** Light gray gradient

### Header

**Badge:**
- Icon: Zap (16px)
- Text: "Hackathon Mode"
- Background: Purple/10 opacity
- Text color: Purple
- Border: 1px purple/30
- Padding: 8px × 16px
- Rounded: Full pill
- Font size: 14px
- Centered
- Margin bottom: 16px

**Title:**
- "Upload Problem Statement" (48px, blue, bold, centered)
- Margin bottom: 16px

**Subtitle:**
- "Provide the hackathon problem statement so AI can analyze requirements" (20px, gray, centered)
- Max width: 768px
- Margin bottom: 48px

### Upload Methods (4 tabs)

**Tab Navigation:**
- Layout: Flex row, centered
- Gap: 8px
- Margin bottom: 32px

**Tab Button:**
- Background: White (inactive), Gradient blue-cyan (active)
- Text color: Gray (inactive), White (active)
- Border: 2px solid gray (inactive), none (active)
- Padding: 12px × 24px
- Rounded: 12px
- Font size: 14px
- Font weight: Semibold
- Hover: Border blue (inactive)

**Tabs:**
1. "PDF Upload"
2. "Image Upload"
3. "Text Paste"
4. "URL Input"

### Tab 1: PDF Upload

**Upload Area:**
- Background: White
- Border: 2px dashed gray
- Rounded: 20px
- Padding: 48px
- Text align: Center
- Hover: Border cyan, background light cyan
- Cursor: Pointer

**Icon:**
- Icon: FileText (64px, gray)
- Centered
- Margin bottom: 24px

**Text:**
- "Drop PDF here or click to browse" (18px, gray, bold)
- Margin bottom: 8px

**Supported Formats:**
- "Supports: PDF files up to 10MB" (14px, light gray)

**File Input:**
- Hidden input element
- Accept: .pdf
- Max size: 10MB

**Selected File Display:**
- File name (16px, blue)
- File size (14px, gray)
- Remove button (X icon, red)
- Background: Light blue
- Padding: 16px
- Rounded: 12px

### Tab 2: Image Upload

**Upload Area:**
- (Same styling as PDF Upload)

**Icon:**
- Icon: Image (64px, gray)

**Text:**
- "Drop image here or click to browse"

**Supported Formats:**
- "Supports: JPG, PNG up to 5MB"

**File Input:**
- Accept: .jpg, .jpeg, .png
- Max size: 5MB

### Tab 3: Text Paste

**Text Area:**
- Background: White
- Border: 2px solid gray
- Rounded: 16px
- Padding: 20px
- Font size: 16px
- Font family: Monospace
- Color: Gray (#334155)
- Min height: 300px
- Resize: Vertical
- Focus: Border cyan, shadow medium

**Placeholder:**
- "Paste the hackathon problem statement here..."
- Color: Light gray

**Character Count:**
- "0 / 10,000 characters" (12px, gray)
- Position: Bottom-right
- Updates as user types

### Tab 4: URL Input

**Input Field:**
- Background: White
- Border: 2px solid gray
- Rounded: 12px
- Padding: 16px × 20px
- Font size: 16px
- Color: Gray (#334155)
- Full width
- Focus: Border cyan, shadow medium

**Placeholder:**
- "https://hackathon-website.com/problem-statement"

**Icon:**
- Icon: Link (20px, gray)
- Position: Left inside input

**Fetch Button:**
- Text: "Fetch Content"
- Icon: Download (16px)
- Background: Gradient blue-cyan
- Text color: White
- Padding: 12px × 24px
- Rounded: 12px
- Font size: 14px
- Font weight: Semibold
- Margin top: 16px
- Action: Fetch content from URL

**Loading State:**
- Spinner animation
- Text: "Fetching content..."
- Disabled button

### Preview Section (After Upload)

**Container:**
- Background: White
- Border: 2px solid light gray
- Rounded: 16px
- Padding: 24px
- Margin top: 32px

**Header:**
- Title: "Preview" (20px, blue, bold)
- Edit button: "Edit" (14px, cyan, clickable)
- Layout: Flex row, space between
- Margin bottom: 16px

**Content:**
- Extracted text displayed
- Font size: 14px
- Color: Gray
- Line height: Relaxed
- Max height: 400px
- Overflow: Scroll

### Navigation Buttons

**Back Button:**
- Text: "Back"
- Icon: ArrowLeft (20px)
- Background: White
- Border: 2px solid gray
- Text color: Gray
- Padding: 12px × 24px
- Rounded: 12px
- Action: Go to Mode Selection

**Continue Button:**
- Text: "Continue to Questions"
- Icon: ArrowRight (20px)
- Background: Gradient blue-cyan
- Text color: White
- Padding: 12px × 32px
- Rounded: 12px
- Font weight: Semibold
- Shadow: Large
- Disabled: Gray background (if no content)
- Action: Go to Hackathon Questions

**Button Container:**
- Layout: Flex row, space between
- Margin top: 48px

---

## Page 11: Hackathon Questions

**Component:** HackathonQuestions.tsx  
**Background:** Light gray gradient

### Header

**Badge:**
- Icon: Zap (16px)
- Text: "Hackathon Mode"
- Background: Purple/10 opacity
- Text color: Purple
- Padding: 8px × 16px
- Rounded: Full pill
- Centered
- Margin bottom: 16px

**Title:**
- "Hackathon Details" (48px, blue, bold, centered)
- Margin bottom: 16px

**Subtitle:**
- "Help AI create your winning strategy" (20px, gray, centered)
- Margin bottom: 32px

**Progress Bar:**
- (Same as Question Flow)

### Questions (7 sections)

#### Section 1: Team Information

**Question:** "Tell us about your team"

**Team Size Selector:**
- Label: "Team Size" (16px, blue, semibold)
- Buttons: 1, 2, 3, 4, 5
- Button style: Circle (48px), white background, gray border
- Selected: Gradient background, white text
- Layout: Flex row, gap 12px

**Team Members (Dynamic based on size):**

**Member Card (for each member):**
- Background: White
- Border: 2px solid light gray
- Rounded: 16px
- Padding: 20px
- Margin bottom: 16px

**Member Number:**
- "Member 1" (14px, purple, semibold)
- Margin bottom: 12px

**Name Input (Optional):**
- Label: "Name (optional)"
- Input: Text field
- Placeholder: "Team member name"
- Padding: 12px × 16px
- Rounded: 10px
- Border: 2px solid gray
- Focus: Border cyan

**Role Selector:**
- Label: "Role" (14px, gray, semibold)
- Dropdown or button group
- Options:
  1. Backend
  2. Frontend
  3. Design
  4. ML/AI
  5. DevOps
  6. Fullstack
- Selected: Gradient background

**Proficiency Selector:**
- Label: "Proficiency" (14px, gray, semibold)
- Button group
- Options:
  1. Beginner
  2. Intermediate
  3. Expert
- Selected: Gradient background

#### Section 2: Timeline

**Question:** "Hackathon timeline?"

**Duration Selector:**
- Label: "Duration" (16px, blue, semibold)
- Options: 24h, 36h, 48h, 72h, Custom
- Button style: Rounded rectangles
- Selected: Gradient background

**Start Time (Optional):**
- Label: "Start Time"
- Input: DateTime picker
- Placeholder: "When does it start?"

**End Time (Optional):**
- Label: "End Time"
- Input: DateTime picker
- Placeholder: "When does it end?"

#### Section 3: Submission Requirements

**Question:** "What needs to be submitted?"

**Checkboxes (5 items):**
1. ☐ Demo Required
2. ☐ Pitch Deck Required
3. ☐ Video Required
4. ☐ Repository Required
5. ☐ Deployment Required

**Checkbox Style:**
- Size: 20px
- Border: 2px solid gray
- Checked: Gradient background, white checkmark
- Label: 16px, gray

**Presentation Time (if demo required):**
- Label: "Presentation Time (minutes)"
- Input: Number field
- Placeholder: "e.g., 5"
- Width: 120px

#### Section 4: Resources

**Question:** "Available resources?"

**Allowed APIs:**
- Label: "Allowed APIs" (16px, blue, semibold)
- Input: Text area
- Placeholder: "List any APIs you can use (one per line)"
- Rows: 4

**Budget:**
- Label: "Budget (optional)"
- Input: Number field with currency
- Placeholder: "$0"
- Width: 200px

**Pre-existing Code:**
- Label: "Can you use pre-existing code?"
- Radio buttons: Yes / No
- Selected: Gradient background

**Deployment Platforms:**
- Label: "Deployment Platforms"
- Input: Text area
- Placeholder: "e.g., Vercel, AWS, Heroku"
- Rows: 3

**Banned Technologies:**
- Label: "Banned Technologies (optional)"
- Input: Text area
- Placeholder: "Any technologies you cannot use"
- Rows: 3

#### Section 5: Priority

**Question:** "What's your main goal?"

**Priority Cards (4 options):**

**Card 1: Win**
- Icon: Trophy (32px, gold)
- Title: "Win" (20px, bold)
- Description: "Maximize winning chances"
- Selected: Gradient border, scale 105%

**Card 2: Learn**
- Icon: GraduationCap (32px, purple)
- Title: "Learn"
- Description: "Focus on learning new tech"

**Card 3: MVP**
- Icon: Zap (32px, cyan)
- Title: "MVP"
- Description: "Build minimum viable product"

**Card 4: Network**
- Icon: Users (32px, blue)
- Title: "Network"
- Description: "Focus on connections"

**Card Style:**
- Background: White
- Border: 2px solid gray
- Rounded: 16px
- Padding: 24px
- Text align: Center
- Cursor: Pointer
- Hover: Border cyan, shadow medium
- Selected: Border gradient, shadow large

### Navigation Buttons

**Back Button:**
- Text: "Back"
- Action: Go to Problem Upload

**Generate Strategy Button:**
- Text: "Generate Winning Strategy"
- Icon: Sparkles (20px)
- Background: Gradient purple-pink
- Text color: White
- Padding: 16px × 32px
- Rounded: 12px
- Font size: 18px
- Font weight: Bold
- Shadow: Extra-large
- Glow animation
- Disabled: Gray (if required fields empty)
- Action: Go to Generating Strategy

---

## Page 12: Generating Strategy (Hackathon)

**Component:** GeneratingScreen.tsx (mode="strategy")  
**Background:** Gradient from light gray to white  
**Duration:** ~5 seconds (AI generation time)  
**Status:** Placeholder (TODO)

### Content Container

**Icon:**
- Icon: Brain (64px, purple)
- Pulse and glow animation
- Centered
- Margin bottom: 32px

**Title:**
- "Generating Winning Strategy" (36px, blue, bold, centered)
- Margin bottom: 16px

**Subtitle:**
- "AI is analyzing the problem and creating your hour-by-hour execution plan..." (18px, gray, centered)
- Max width: 768px
- Margin bottom: 48px

**Progress Bar:**
- (Same as other generating screens)

### Timeline Steps (6 steps)

1. "Analyzing problem statement..."
2. "Identifying winning angle..."
3. "Scoping features..."
4. "Assessing risks..."
5. "Creating hour-by-hour roadmap..."
6. "Generating submission templates..."

(Same styling as other generating screens)

**Note:** Currently shows placeholder alert after 2 seconds:
- "Hackathon strategy generation coming soon!"
- Returns to Hackathon Questions

---

## Footer (Global)

**Component:** Footer.tsx  
**Position:** Bottom of all pages (except Landing)  
**Background:** White
- Border top: 1px solid light gray
**Padding:** py-8 (32px vertical)

### Content Container

**Layout:**
- Flex row on desktop, column on mobile
- Space between (desktop)
- Centered (mobile)
- Max width: 1280px
- Padding: 0 24px

### Left Section

**Logo:**
- Icon: Lightbulb (24px, gradient)
- Text: "IdeaZen" (18px, gradient, bold)
- Layout: Flex row, gap 8px
- Margin bottom: 8px (mobile only)

**Tagline:**
- "AI Project Idea Generator" (14px, gray)
- Margin bottom: 16px (mobile only)

### Center Section (Desktop only)

**Navigation Links:**
- "How It Works"
- "Examples"
- "My Ideas"
- "FAQ"
- Layout: Flex row, gap 24px
- Font size: 14px
- Color: Gray (#64748B)
- Hover: Blue (#1F3C88)

### Right Section

**Academic Integrity Notice:**
- Icon: AlertCircle (16px, yellow)
- Text: "For educational purposes only"
- Font size: 12px
- Color: Gray
- Layout: Flex row, gap 8px
- Margin bottom: 8px

**Copyright:**
- "© 2025 IdeaZen. All rights reserved."
- Font size: 12px
- Color: Light gray (#94A3B8)

---

## Summary

This document has detailed every page, component, button, form field, color, size, spacing, and interaction in the IdeaZen application. Each page includes:

- Exact component names
- All UI elements with precise styling
- Button text and actions
- Color codes (hex values)
- Font sizes and weights
- Spacing and layout details
- Icons and their sizes
- Hover and active states
- Navigation flows
- Form fields and validation

**Total Pages Documented:** 12 main pages + 2 global components (Navbar, Footer)

**Related Documentation:**
- SYSTEM_FLOW_AND_OPERATION.md - Technical flow details
- FLOWCHART.md - Visual flow diagrams
- FRONTEND_ARCHITECTURE.md - Component architecture
- PROJECT_OVERVIEW.md - High-level overview

---

**Version:** 1.2.0  
**Last Updated:** January 2025
