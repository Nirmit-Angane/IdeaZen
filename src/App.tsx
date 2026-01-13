import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { SkillLevelSelection } from './components/SkillLevelSelection';
import { QuestionFlow } from './components/QuestionFlow';
import { ProjectOutput } from './components/ProjectOutput';
import { MyIdeas } from './components/MyIdeas';
import { GeneratingScreen } from './components/GeneratingScreen';
import { IdeaPreview } from './components/IdeaPreview';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | null;

export interface UserInputs {
  skillLevel: SkillLevel;
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

export interface GeneratedProject {
  title: string;
  difficulty: string;
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

type Screen = 'landing' | 'skill-selection' | 'questions' | 'generating' | 'idea-preview' | 'output' | 'my-ideas' | 'generating-blueprint';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userInputs, setUserInputs] = useState<UserInputs>({ skillLevel: null });
  const [generatedProject, setGeneratedProject] = useState<GeneratedProject | null>(null);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedProject[]>([]);

  const handleStartGeneration = () => {
    setCurrentScreen('skill-selection');
  };

  const handleSkillLevelSelect = (level: SkillLevel) => {
    setUserInputs({ ...userInputs, skillLevel: level });
    setCurrentScreen('questions');
  };

  const handleQuestionsComplete = (inputs: UserInputs) => {
    setUserInputs(inputs);
    setCurrentScreen('generating');
    
    // Simulate AI generation - Generate 3-4 ideas
    setTimeout(() => {
      const ideas = generateMultipleProjects(inputs, 4);
      setGeneratedIdeas(ideas);
      setCurrentScreen('idea-preview');
    }, 3000);
  };

  const handleSelectIdea = (idea: GeneratedProject) => {
    setGeneratedProject(idea);
    setCurrentScreen('generating-blueprint');
    
    // Show second generating screen for creating detailed blueprint
    setTimeout(() => {
      setCurrentScreen('output');
    }, 3500);
  };

  const handleRefineIdea = () => {
    setCurrentScreen('questions');
  };

  const handleIncreaseDifficulty = () => {
    if (generatedProject) {
      const refined = generateProject(userInputs, 'increase');
      setGeneratedProject(refined);
    }
  };

  const handleSimplifyProject = () => {
    if (generatedProject) {
      const refined = generateProject(userInputs, 'simplify');
      setGeneratedProject(refined);
    }
  };

  const handleGenerateAnother = () => {
    const project = generateProject(userInputs, 'new');
    setGeneratedProject(project);
  };

  const handleStartOver = () => {
    setCurrentScreen('landing');
    setUserInputs({ skillLevel: null });
    setGeneratedProject(null);
    setGeneratedIdeas([]);
  };

  const handleViewMyIdeas = () => {
    setCurrentScreen('my-ideas');
  };

  const handleViewProject = (project: GeneratedProject) => {
    setGeneratedProject(project);
    setCurrentScreen('output');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar 
        onLogoClick={handleStartOver} 
        onMyIdeasClick={handleViewMyIdeas}
        onGenerateClick={handleStartGeneration}
        currentPage={currentScreen === 'landing' ? 'home' : currentScreen === 'my-ideas' ? 'my-ideas' : 'generate'}
      />
      
      {currentScreen === 'landing' && (
        <LandingPage onGetStarted={handleStartGeneration} />
      )}
      
      {currentScreen === 'skill-selection' && (
        <SkillLevelSelection onSelectLevel={handleSkillLevelSelect} />
      )}
      
      {currentScreen === 'questions' && userInputs.skillLevel && (
        <QuestionFlow 
          skillLevel={userInputs.skillLevel}
          initialInputs={userInputs}
          onComplete={handleQuestionsComplete}
          onBack={() => setCurrentScreen('skill-selection')}
        />
      )}
      
      {currentScreen === 'generating' && (
        <GeneratingScreen mode="ideas" />
      )}
      
      {currentScreen === 'idea-preview' && generatedIdeas.length > 0 && (
        <IdeaPreview 
          ideas={generatedIdeas}
          onSelectIdea={handleSelectIdea}
        />
      )}
      
      {currentScreen === 'generating-blueprint' && (
        <GeneratingScreen mode="blueprint" />
      )}
      
      {currentScreen === 'output' && generatedProject && (
        <ProjectOutput
          project={generatedProject}
          userInputs={userInputs}
          onRefine={handleRefineIdea}
          onIncreaseDifficulty={handleIncreaseDifficulty}
          onSimplify={handleSimplifyProject}
          onGenerateAnother={handleGenerateAnother}
          onStartOver={handleStartOver}
        />
      )}
      
      {currentScreen === 'my-ideas' && (
        <MyIdeas onViewProject={handleViewProject} />
      )}
      
      {currentScreen !== 'landing' && <Footer />}
    </div>
  );
}

// Shared project database - used by both generation functions
const PROJECT_DATABASE = {
  beginner: [
    {
      title: "Personal Portfolio Website with Blog",
      difficulty: "Beginner",
      description: "Build a responsive personal portfolio website with an integrated blog section. Perfect for showcasing your projects and sharing your learning journey.",
      features: [
        "Responsive homepage with about section",
        "Project showcase gallery",
        "Blog with markdown support",
        "Contact form",
        "Dark/Light theme toggle"
      ],
      techStack: {
        primary: ["React", "Tailwind CSS", "React Router", "Markdown Parser"],
        alternative: ["HTML/CSS/JavaScript", "Bootstrap", "Simple CMS"]
      },
      roadmap: [
        { phase: "Phase 1", title: "Planning & Setup", description: "Create wireframes, set up React project, and plan component structure", duration: "3-4 days" },
        { phase: "Phase 2", title: "Core Development", description: "Build homepage, portfolio gallery, and blog components", duration: "2 weeks" },
        { phase: "Phase 3", title: "Styling & Responsiveness", description: "Add Tailwind styling, ensure mobile responsiveness, implement theme toggle", duration: "1 week" },
        { phase: "Phase 4", title: "Testing & Deployment", description: "Test across devices, fix bugs, deploy to Netlify or Vercel", duration: "3-4 days" }
      ],
      skillOutcomes: [
        "Understanding React components and hooks",
        "Responsive design with Tailwind CSS",
        "Client-side routing with React Router",
        "Working with markdown content",
        "Deployment on modern platforms"
      ],
      feasibility: "High" as const,
      confidence: "95% - Well-suited for beginners with clear learning path"
    },
    {
      title: "Task Manager with Local Storage",
      difficulty: "Beginner",
      description: "Create an intuitive task management app that helps users organize their daily activities with categories, priorities, and persistence.",
      features: [
        "Add, edit, and delete tasks",
        "Mark tasks as complete",
        "Filter by category and priority",
        "Search functionality",
        "Data persistence with localStorage"
      ],
      techStack: {
        primary: ["React", "TypeScript", "Tailwind CSS", "LocalStorage API"],
        alternative: ["Vue.js", "Vanilla JavaScript"]
      },
      roadmap: [
        { phase: "Phase 1", title: "Planning & Setup", description: "Design UI mockups, set up project with React and TypeScript", duration: "2-3 days" },
        { phase: "Phase 2", title: "Core Features", description: "Implement task CRUD operations, build forms and task list", duration: "1.5 weeks" },
        { phase: "Phase 3", title: "Enhanced Features", description: "Add filtering, search, categories, and localStorage", duration: "1 week" },
        { phase: "Phase 4", title: "Polish & Deploy", description: "Refine UI/UX, add animations, test thoroughly, deploy", duration: "3-4 days" }
      ],
      skillOutcomes: [
        "State management in React",
        "TypeScript basics and type safety",
        "Browser storage APIs",
        "Form handling and validation",
        "Component composition patterns"
      ],
      feasibility: "High" as const,
      confidence: "98% - Perfect beginner project with immediate practical value"
    }
  ],
  intermediate: [
    {
      title: "Real-time Collaborative Whiteboard",
      difficulty: "Intermediate",
      description: "Build a collaborative whiteboard application where multiple users can draw, add shapes, and brainstorm together in real-time.",
      features: [
        "Canvas-based drawing with multiple tools",
        "Real-time collaboration with WebSockets",
        "Shape and text tools",
        "Undo/Redo functionality",
        "Export as image",
        "Room-based collaboration"
      ],
      techStack: {
        primary: ["React", "TypeScript", "Canvas API", "Socket.io", "Node.js", "Express"],
        alternative: ["WebRTC", "Firebase Realtime Database"]
      },
      roadmap: [
        { phase: "Phase 1", title: "Planning & Architecture", description: "Design system architecture, set up frontend and backend repos", duration: "4-5 days" },
        { phase: "Phase 2", title: "Canvas Development", description: "Implement drawing tools, shapes, and local canvas functionality", duration: "2 weeks" },
        { phase: "Phase 3", title: "Real-time Integration", description: "Set up WebSocket server, implement real-time synchronization", duration: "1.5 weeks" },
        { phase: "Phase 4", title: "Testing & Deployment", description: "Multi-user testing, optimize performance, deploy frontend and backend", duration: "1 week" }
      ],
      skillOutcomes: [
        "Canvas API and graphics programming",
        "WebSocket communication",
        "Real-time state synchronization",
        "Backend development with Node.js",
        "Event-driven architecture",
        "Performance optimization"
      ],
      feasibility: "High" as const,
      confidence: "85% - Challenging but achievable with solid fundamentals"
    },
    {
      title: "E-Commerce Platform with Admin Dashboard",
      difficulty: "Intermediate",
      description: "Develop a full-featured e-commerce platform with product management, shopping cart, checkout flow, and comprehensive admin dashboard.",
      features: [
        "Product catalog with search and filters",
        "Shopping cart and wishlist",
        "User authentication and profiles",
        "Order management system",
        "Admin dashboard with analytics",
        "Payment integration (sandbox mode)"
      ],
      techStack: {
        primary: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Stripe API"],
        alternative: ["Next.js", "PostgreSQL", "Supabase"]
      },
      roadmap: [
        { phase: "Phase 1", title: "Planning & Database Design", description: "Create database schema, API design, UI wireframes", duration: "1 week" },
        { phase: "Phase 2", title: "Backend Development", description: "Build REST API, authentication, product and order management", duration: "3 weeks" },
        { phase: "Phase 3", title: "Frontend Development", description: "Build user-facing store, cart, checkout, and user dashboard", duration: "3 weeks" },
        { phase: "Phase 4", title: "Admin Panel & Deployment", description: "Create admin dashboard, integrate payments, test and deploy", duration: "2 weeks" }
      ],
      skillOutcomes: [
        "Full-stack development",
        "RESTful API design",
        "Database modeling and queries",
        "Authentication and authorization",
        "Payment gateway integration",
        "Admin panel development",
        "State management at scale"
      ],
      feasibility: "Medium" as const,
      confidence: "80% - Comprehensive project requiring solid time commitment"
    }
  ],
  advanced: [
    {
      title: "AI-Powered Code Review Platform",
      difficulty: "Advanced",
      description: "Build an intelligent code review platform that uses AI to analyze code quality, suggest improvements, and provide automated feedback on pull requests.",
      features: [
        "GitHub integration for PR analysis",
        "AI-powered code quality analysis",
        "Automated vulnerability detection",
        "Code pattern recognition",
        "Custom rule engine",
        "Team analytics dashboard",
        "Real-time collaboration features"
      ],
      techStack: {
        primary: ["React", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "Redis", "OpenAI API", "Docker"],
        alternative: ["Next.js", "GraphQL", "Kubernetes", "AWS Lambda"]
      },
      roadmap: [
        { phase: "Phase 1", title: "Architecture & Setup", description: "Design microservices architecture, set up repos, CI/CD pipeline", duration: "1.5 weeks" },
        { phase: "Phase 2", title: "Core Analysis Engine", description: "Build code parsing, AST analysis, AI integration for code review", duration: "4 weeks" },
        { phase: "Phase 3", title: "Platform Development", description: "Develop web platform, GitHub integration, real-time features", duration: "4 weeks" },
        { phase: "Phase 4", title: "Analytics & Optimization", description: "Build analytics dashboard, optimize performance, scale testing", duration: "2 weeks" },
        { phase: "Phase 5", title: "Production Deployment", description: "Security audit, load testing, containerization, cloud deployment", duration: "1.5 weeks" }
      ],
      skillOutcomes: [
        "Microservices architecture",
        "AI/ML integration in production",
        "Abstract Syntax Tree (AST) parsing",
        "GitHub API and webhooks",
        "Real-time data processing",
        "Scalable system design",
        "DevOps and containerization",
        "Security best practices"
      ],
      feasibility: "Medium" as const,
      confidence: "75% - Complex but feasible with strong technical foundation"
    },
    {
      title: "Distributed Task Orchestration System",
      difficulty: "Advanced",
      description: "Create a distributed system for orchestrating and monitoring complex task workflows across multiple workers with fault tolerance and auto-scaling.",
      features: [
        "Task queue with priority scheduling",
        "Distributed worker management",
        "Fault tolerance and retry mechanisms",
        "Real-time monitoring dashboard",
        "Auto-scaling based on load",
        "Task dependency graphs",
        "Webhook notifications",
        "REST and WebSocket APIs"
      ],
      techStack: {
        primary: ["React", "TypeScript", "Go", "Node.js", "RabbitMQ", "Redis", "PostgreSQL", "Docker", "Kubernetes"],
        alternative: ["Python", "Celery", "Apache Kafka", "Prometheus", "Grafana"]
      },
      roadmap: [
        { phase: "Phase 1", title: "System Design", description: "Design distributed architecture, message queue patterns, database schema", duration: "2 weeks" },
        { phase: "Phase 2", title: "Core Engine Development", description: "Build task scheduler, worker management, message queue integration", duration: "5 weeks" },
        { phase: "Phase 3", title: "Monitoring & Dashboard", description: "Create real-time monitoring, metrics collection, web dashboard", duration: "3 weeks" },
        { phase: "Phase 4", title: "Scaling & Resilience", description: "Implement auto-scaling, fault tolerance, failure recovery", duration: "3 weeks" },
        { phase: "Phase 5", title: "Production Hardening", description: "Security hardening, performance optimization, deployment automation", duration: "2 weeks" }
      ],
      skillOutcomes: [
        "Distributed systems design",
        "Message queue architectures",
        "Concurrency and parallelism",
        "Container orchestration with Kubernetes",
        "System monitoring and observability",
        "High availability patterns",
        "Performance optimization at scale",
        "Infrastructure as Code"
      ],
      feasibility: "Medium" as const,
      confidence: "70% - Highly challenging but excellent for advanced learning"
    }
  ]
};

function generateMultipleProjects(inputs: UserInputs, count: number): GeneratedProject[] {
  const projects: GeneratedProject[] = [];
  const { skillLevel } = inputs;
  
  const projectPool = PROJECT_DATABASE[skillLevel as keyof typeof PROJECT_DATABASE] || PROJECT_DATABASE.beginner;
  
  // Shuffle and select unique projects
  const shuffled = [...projectPool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  
  return selected.map(project => ({
    ...project,
    reasoning: `Generated because: ${skillLevel} + ${inputs.timeAvailability || '1 month'} + ${inputs.domain || 'Web Development'} + ${inputs.deployment || 'Cloud deployment'}`
  }));
}

function generateProject(inputs: UserInputs, mode: 'new' | 'increase' | 'simplify' | 'normal' = 'normal'): GeneratedProject {
  const { skillLevel, domain, timeAvailability, deployment } = inputs;
  
  const projectList = PROJECT_DATABASE[skillLevel as keyof typeof PROJECT_DATABASE] || PROJECT_DATABASE.beginner;
  let selectedProject = projectList[Math.floor(Math.random() * projectList.length)];

  if (mode === 'increase' && selectedProject.difficulty === 'Beginner') {
    selectedProject = { ...selectedProject, difficulty: 'Intermediate' };
    selectedProject.features.push("Advanced analytics", "API integration");
  } else if (mode === 'simplify' && selectedProject.difficulty === 'Advanced') {
    selectedProject = { ...selectedProject, difficulty: 'Intermediate' };
    selectedProject.features = selectedProject.features.slice(0, 5);
  }

  return {
    ...selectedProject,
    reasoning: `Generated because: ${skillLevel} + ${timeAvailability || '1 month'} + ${domain || 'Web Development'} + ${deployment || 'Cloud deployment'}`
  };
}