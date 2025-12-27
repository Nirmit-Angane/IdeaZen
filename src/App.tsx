import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { SkillLevelSelection } from './components/SkillLevelSelection';
import { QuestionFlow } from './components/QuestionFlow';
import { ProjectOutput } from './components/ProjectOutput';
import { MyIdeas } from './components/MyIdeas';
import { GeneratingScreen } from './components/GeneratingScreen';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { generateProjectIdea } from './lib/ai';
import { UserInputs, GeneratedProject, SkillLevel } from './types';

type Screen = 'landing' | 'skill-selection' | 'questions' | 'generating' | 'output' | 'my-ideas';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
    const [userInputs, setUserInputs] = useState<UserInputs>({ skillLevel: null });
    const [generatedProject, setGeneratedProject] = useState<GeneratedProject | null>(null);

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
            const project = await generateProjectIdea(inputs);
            setGeneratedProject(project);
            setCurrentScreen('output');
        } catch (error) {
            console.error("Generation failed:", error);
            alert("Failed to generate project. Please try again.");
            setCurrentScreen('landing');
        }
    };

    const handleRefineIdea = () => {
        setCurrentScreen('questions');
    };

    const handleIncreaseDifficulty = async () => {
        if (!userInputs.skillLevel) return;

        // Simple logic: bump skill level
        const levels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
        const currentIndex = levels.indexOf(userInputs.skillLevel);
        const nextLevel = levels[Math.min(currentIndex + 1, 2)];

        const newInputs = { ...userInputs, skillLevel: nextLevel };
        setUserInputs(newInputs);

        setCurrentScreen('generating');
        try {
            const project = await generateProjectIdea(newInputs);
            setGeneratedProject(project);
            setCurrentScreen('output');
        } catch (error) {
            console.error(error);
            setCurrentScreen('output'); // go back to what we had
        }
    };

    const handleSimplifyProject = async () => {
        if (!userInputs.skillLevel) return;

        const levels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
        const currentIndex = levels.indexOf(userInputs.skillLevel);
        const prevLevel = levels[Math.max(currentIndex - 1, 0)];

        const newInputs = { ...userInputs, skillLevel: prevLevel };
        setUserInputs(newInputs);

        setCurrentScreen('generating');
        try {
            const project = await generateProjectIdea(newInputs);
            setGeneratedProject(project);
            setCurrentScreen('output');
        } catch (error) {
            console.error(error);
            setCurrentScreen('output');
        }
    };

    const handleGenerateAnother = async () => {
        setCurrentScreen('generating');
        try {
            const project = await generateProjectIdea(userInputs);
            setGeneratedProject(project);
            setCurrentScreen('output');
        } catch (error) {
            console.error(error);
            setCurrentScreen('output');
        }
    };

    const handleStartOver = () => {
        setCurrentScreen('landing');
        setUserInputs({ skillLevel: null });
        setGeneratedProject(null);
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
                <GeneratingScreen />
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
