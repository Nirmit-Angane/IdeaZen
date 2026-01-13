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