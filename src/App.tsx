import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { SkillLevelSelection } from './components/SkillLevelSelection';
import { QuestionFlow } from './components/QuestionFlow';
import { ProjectOutput } from './components/ProjectOutput';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { ProjectIdea, UserInputs, SkillLevel } from './types';
import { Loader2, AlertCircle } from 'lucide-react';
import { generateProjectIdea } from './lib/ai';

type Screen = 'landing' | 'skill-selection' | 'questions' | 'generating' | 'output' | 'error';

function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
    const [userInputs, setUserInputs] = useState<Partial<UserInputs>>({});
    const [generatedProject, setGeneratedProject] = useState<ProjectIdea | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleStart = () => {
        setCurrentScreen('skill-selection');
    };

    const handleSkillSelect = (level: SkillLevel) => {
        setUserInputs(prev => ({ ...prev, skillLevel: level }));
        setCurrentScreen('questions');
    };

    const handleQuestionsComplete = async (inputs: any) => {
        const finalInputs = { ...userInputs, ...inputs };
        setUserInputs(finalInputs);
        setCurrentScreen('generating');

        try {
            // Minimum loading time for UX (1.5s) + API call time
            const minLoading = new Promise(resolve => setTimeout(resolve, 2000));
            const aiRequest = generateProjectIdea(finalInputs);

            const [_, project] = await Promise.all([minLoading, aiRequest]);

            setGeneratedProject(project);
            setCurrentScreen('output');
        } catch (err: any) {
            console.error(err);
            // Show the actual error message to the user for debugging
            setErrorMsg(err.message || "Failed to generate idea. Please check your API key or try again.");
            setCurrentScreen('error');
        }
    };

    const resetFlow = () => {
        setUserInputs({});
        setGeneratedProject(null);
        setErrorMsg("");
        setCurrentScreen('landing');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-purple-100 selection:text-primary-blue">
            <Navbar onGenerateClick={resetFlow} />

            <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-80px)]">
                {currentScreen === 'landing' && (
                    <LandingPage onGetStarted={handleStart} />
                )}

                {currentScreen === 'skill-selection' && (
                    <SkillLevelSelection onSelect={handleSkillSelect} />
                )}

                {currentScreen === 'questions' && userInputs.skillLevel && (
                    <QuestionFlow
                        skillLevel={userInputs.skillLevel}
                        onComplete={handleQuestionsComplete}
                    />
                )}

                {currentScreen === 'generating' && (
                    <div className="flex flex-col items-center justify-center h-[60vh] space-y-8 animate-fade-in-up">
                        <div className="relative">
                            <div className="absolute inset-0 bg-accent-cyan/20 blur-xl rounded-full animate-pulse" />
                            <Loader2 className="w-16 h-16 text-primary-blue animate-spin relative z-10" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-accent-purple text-center">
                            Consulting the AI...
                        </h2>
                        <p className="text-slate-500 text-lg animate-pulse">
                            Crafting a unique project based on your {userInputs.skillLevel} profile
                        </p>
                    </div>
                )}

                {currentScreen === 'error' && (
                    <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 animate-fade-in-up">
                        <div className="p-4 bg-red-100 rounded-full">
                            <AlertCircle className="w-12 h-12 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Something went wrong</h2>
                        <p className="text-slate-500">{errorMsg}</p>
                        <button
                            onClick={resetFlow}
                            className="px-6 py-3 bg-primary-blue text-white rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {currentScreen === 'output' && generatedProject && (
                    <ProjectOutput
                        project={generatedProject}
                        onReset={resetFlow}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;
