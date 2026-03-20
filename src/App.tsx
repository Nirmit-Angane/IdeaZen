import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ModeSelection } from './components/ModeSelection';
import { ProblemStatementUpload } from './components/ProblemStatementUpload';
import { HackathonQuestions } from './components/HackathonQuestions';
import { SkillLevelSelection } from './components/SkillLevelSelection';
import { QuestionFlow } from './components/QuestionFlow';
import { ProjectOutput } from './components/ProjectOutput';
import { MyIdeas } from './components/MyIdeas';
import { GeneratingScreen } from './components/GeneratingScreen';
import { IdeaPreview } from './components/IdeaPreview';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { HackathonModeEntry } from './components/HackathonModeEntry';
import { HackathonQuestionFlow } from './components/HackathonQuestionFlow';
import { HackathonRoadmapOutput } from './components/HackathonRoadmapOutput';
import { generateProjectIdea } from './lib/ai';

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
  const [appMode, setAppMode] = useState<AppMode>('regular');
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userInputs, setUserInputs] = useState<UserInputs>({ skillLevel: null });
  const [hackathonContext, setHackathonContext] = useState<HackathonContext | null>(null);
  const [generatedProject, setGeneratedProject] = useState<GeneratedProject | null>(null);
  const [hackathonStrategy, setHackathonStrategy] = useState<HackathonStrategy | null>(null);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedProject[]>([]);

  // Hackathon Mode state
  const [hackathonInputs, setHackathonInputs] = useState<Partial<HackathonInputs>>({});
  const [hackathonRoadmap, setHackathonRoadmap] = useState<HackathonRoadmap | null>(null);

  const handleStartGeneration = () => {
    setCurrentScreen('mode-selection');
  };

  const handleModeSelect = (mode: AppMode) => {
    setAppMode(mode);
    if (mode === 'regular') {
      setCurrentScreen('skill-selection');
    } else {
      setCurrentScreen('problem-upload');
    }
  };

  const handleProblemStatementComplete = (context: Partial<HackathonContext>) => {
    setHackathonContext(context as HackathonContext);
    setCurrentScreen('hackathon-questions');
  };

  const handleHackathonQuestionsComplete = (context: HackathonContext) => {
    setHackathonContext(context);
    setCurrentScreen('generating-strategy');
    
    // TODO: Generate hackathon strategy with AI
    setTimeout(() => {
      // Placeholder - will be implemented in future tasks
      console.log('Hackathon strategy generation:', context);
      alert('Hackathon strategy generation coming soon!');
      setCurrentScreen('hackathon-questions');
    }, 2000);
  };

  // Hackathon Mode handlers
  const handleStartHackathonMode = () => {
    setCurrentScreen('hackathon-entry');
  };

  const handleHackathonTitleSubmit = (projectTitle: string) => {
    setHackathonInputs({ projectTitle });
    setCurrentScreen('hackathon-questions');
  };

  const handleHackathonQuestionsComplete = async (inputs: HackathonInputs) => {
    setHackathonInputs(inputs);
    setCurrentScreen('hackathon-generating');

    try {
      const roadmap = await generateHackathonRoadmap(inputs);
      setHackathonRoadmap(roadmap);
      setCurrentScreen('hackathon-output');
    } catch (error) {
      console.error("Failed to generate hackathon roadmap:", error);
      alert("Failed to generate roadmap. Please try again.");
      setCurrentScreen('hackathon-questions');
    }
  };

  const handleHackathonAdjustTimeline = async () => {
    if (hackathonRoadmap && hackathonInputs) {
      setCurrentScreen('hackathon-generating');
      try {
        const newTimeline = hackathonInputs.timeline === '24h' ? '48h' : '24h';
        const updatedInputs = { ...hackathonInputs as HackathonInputs, timeline: newTimeline };
        const roadmap = await generateHackathonRoadmap(updatedInputs);
        setHackathonRoadmap(roadmap);
        setCurrentScreen('hackathon-output');
      } catch (error) {
        setCurrentScreen('hackathon-output');
      }
    }
  };

  const handleHackathonSimplifyScope = async () => {
    if (hackathonRoadmap && hackathonInputs) {
      setCurrentScreen('hackathon-generating');
      try {
        const roadmap = await generateHackathonRoadmap(hackathonInputs as HackathonInputs);
        setHackathonRoadmap(roadmap);
        setCurrentScreen('hackathon-output');
      } catch (error) {
        setCurrentScreen('hackathon-output');
      }
    }
  };

  const handleHackathonAddTeamMember = () => {
    setCurrentScreen('hackathon-questions');
  };

  const handleHackathonGenerateNew = async () => {
    setCurrentScreen('hackathon-generating');
    try {
      const roadmap = await generateHackathonRoadmap(hackathonInputs as HackathonInputs);
      setHackathonRoadmap(roadmap);
      setCurrentScreen('hackathon-output');
    } catch (error) {
      setCurrentScreen('hackathon-output');
    }
  };

  const handleSkillLevelSelect = (level: SkillLevel) => {
    setUserInputs({ ...userInputs, skillLevel: level });
    setCurrentScreen('questions');
  };

  const handleQuestionsComplete = async (inputs: UserInputs) => {
    setUserInputs(inputs);
    setCurrentScreen('generating');

    try {
      // Real AI AI generation - Generate 2 ideas as requested
      const ideas = await generateProjectIdea(inputs, 'suggestions');
      setGeneratedIdeas(ideas);
      setCurrentScreen('idea-preview');
    } catch (error) {
      console.error("Failed to generate ideas:", error);
      alert("Failed to generate project ideas. Please try again.");
      setCurrentScreen('questions');
    }
  };

  const handleSelectIdea = async (idea: GeneratedProject) => {
    setGeneratedProject(idea);
    setCurrentScreen('generating-blueprint');

    try {
      // Real AI blueprint generation
      const fullProject = await generateProjectIdea(userInputs, 'blueprint', idea.title);
      setGeneratedProject(fullProject);
      setCurrentScreen('output');
    } catch (error) {
      console.error("Failed to generate blueprint:", error);
      alert("Failed to generate project blueprint. Please try again.");
      setCurrentScreen('idea-preview');
    }
  };

  const handleRefineIdea = () => {
    setCurrentScreen('questions');
  };

  const handleIncreaseDifficulty = async () => {
    if (generatedProject) {
      setCurrentScreen('generating-blueprint');
      try {
        const refined = await generateProjectIdea({ ...userInputs, difficultyStretch: 'more-complex' }, 'blueprint', generatedProject.title);
        setGeneratedProject(refined);
        setCurrentScreen('output');
      } catch (error) {
        setCurrentScreen('output');
      }
    }
  };

  const handleSimplifyProject = async () => {
    if (generatedProject) {
      setCurrentScreen('generating-blueprint');
      try {
        const refined = await generateProjectIdea({ ...userInputs, difficultyStretch: 'simpler' }, 'blueprint', generatedProject.title);
        setGeneratedProject(refined);
        setCurrentScreen('output');
      } catch (error) {
        setCurrentScreen('output');
      }
    }
  };

  const handleGenerateAnother = async () => {
    setCurrentScreen('generating');
    try {
      const ideas = await generateProjectIdea(userInputs, 'suggestions');
      setGeneratedIdeas(ideas);
      setCurrentScreen('idea-preview');
    } catch (error) {
      setCurrentScreen('output');
    }
  };

  const handleStartOver = () => {
    setCurrentScreen('landing');
    setAppMode('regular');
    setUserInputs({ skillLevel: null });
    setHackathonContext(null);
    setGeneratedProject(null);
    setHackathonStrategy(null);
    setGeneratedIdeas([]);
    setHackathonInputs({});
    setHackathonRoadmap(null);
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
        <LandingPage
          onGetStarted={handleStartGeneration}
          onStartHackathonMode={handleStartHackathonMode}
        />
      )}

      {currentScreen === 'mode-selection' && (
        <ModeSelection onSelectMode={handleModeSelect} />
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