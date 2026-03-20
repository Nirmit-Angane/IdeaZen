import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Users,
    Code,
    Clock,
    Target,
    Zap,
    TrendingUp,
    Check,
    Lightbulb,
    Info,
    Brain,
    Palette,
    Terminal,
    HelpCircle,
    Sprout,
    Flame,
    Award,
    Layout,
    Server,
    Monitor,
    FileBarChart,
    Video,
    Github,
    Globe,
    Trophy,
    GraduationCap,
    Rocket
} from 'lucide-react';
import type { HackathonInputs } from '../../../types/hackathon.types';
import { getOptionIcon } from '../../QuestionFlow/QuestionFlowIcons';

interface HackathonQuestionFlowProps {
    projectTitle: string;
    onComplete: (inputs: HackathonInputs) => void;
    onBack: () => void;
}

interface Question {
    id: keyof HackathonInputs | string;
    question: string;
    description: string;
    icon: any;
    color: string;
    isSkillQuestion: boolean;
    isMultiSelect: boolean;
    options: { value: string; label: string; icon?: any; emoji?: string; }[];
    memberIndex?: number;
    proficiencyOptions?: { value: string; label: string; icon?: any; emoji?: string; }[];
}

export function HackathonQuestionFlow({ projectTitle, onComplete, onBack }: HackathonQuestionFlowProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputs, setInputs] = useState<Partial<HackathonInputs>>({
        projectTitle,
        teamMembers: [],
        submissionRequirements: [],
    });

    // Question definitions
    const questions = [
        {
            id: 'teamSize' as const,
            question: "What's your team configuration?",
            description: 'How many people are working on this?',
            icon: Users,
            color: '#22D3EE',
            isSkillQuestion: false,
            isMultiSelect: false,
            options: [
                { value: 'solo', label: 'Solo', icon: Users },
                { value: '2-person', label: '2 People', icon: Users },
                { value: '3-4', label: '3-4 People', icon: Users },
                { value: '5+', label: '5+ People', icon: Users }
            ]
        },
        {
            id: 'timeline' as const,
            question: 'How long is your hackathon?',
            description: 'Total time available',
            icon: Clock,
            color: '#1F3C88',
            isSkillQuestion: false,
            isMultiSelect: false,
            options: [
                { value: '24h', label: '24 Hours', icon: Clock },
                { value: '36h', label: '36 Hours', icon: Clock },
                { value: '48h', label: '48 Hours', icon: Clock },
                { value: '72h', label: '72 Hours', icon: Clock }
            ]
        },
        {
            id: 'submissionRequirements' as const,
            question: 'What do you need to submit?',
            description: 'Select all that apply',
            icon: Target,
            color: '#22C55E',
            isSkillQuestion: false,
            isMultiSelect: true,
            options: [
                { value: 'demo', label: 'Working Demo', icon: Monitor },
                { value: 'pitch-deck', label: 'Pitch Deck', icon: FileBarChart },
                { value: 'video', label: 'Demo Video', icon: Video },
                { value: 'github', label: 'GitHub Repo', icon: Github },
                { value: 'deployment', label: 'Live Deployment', icon: Globe }
            ]
        },
        {
            id: 'priority' as const,
            question: "What's your main goal?",
            description: 'Strategic priority for this hackathon',
            icon: TrendingUp,
            color: '#22D3EE',
            isSkillQuestion: false,
            isMultiSelect: false,
            options: [
                { value: 'win', label: 'Win the Competition', icon: Trophy },
                { value: 'learn', label: 'Learn New Skills', icon: GraduationCap },
                { value: 'mvp', label: 'Build a Real MVP', icon: Rocket },
                { value: 'networking', label: 'Network & Have Fun', icon: Users }
            ]
        }
    ];

    // Dynamic skill breakdown questions based on team size
    const getSkillQuestions = () => {
        const teamSize = inputs.teamSize;
        if (!teamSize) return [];

        const memberCount =
            teamSize === 'solo' ? 1 :
                teamSize === '2-person' ? 2 :
                    teamSize === '3-4' ? 3 : 5;

        return Array.from({ length: memberCount }, (_, index): Question => ({
            id: `member-${index}`,
            question: memberCount === 1
                ? "What's your primary skill?"
                : `Team Member ${index + 1}: Primary Skill?`,
            description: memberCount === 1
                ? 'Your main area of expertise'
                : `What does member ${index + 1} specialize in?`,
            icon: Code,
            color: '#1F3C88',
            memberIndex: index,
            isSkillQuestion: true,
            isMultiSelect: false,
            options: [
                { value: 'frontend', label: 'Frontend', icon: Layout },
                { value: 'backend', label: 'Backend', icon: Server },
                { value: 'ml', label: 'AI/ML', icon: Brain },
                { value: 'design', label: 'Design', icon: Palette },
                { value: 'devops', label: 'DevOps', icon: Terminal },
                { value: 'other', label: 'Other', icon: HelpCircle }
            ],
            proficiencyOptions: [
                { value: 'beginner', label: 'Beginner', icon: Sprout },
                { value: 'intermediate', label: 'Intermediate', icon: Flame },
                { value: 'advanced', label: 'Advanced', icon: Award }
            ]
        }));
    };

    // Combine all questions
    const allQuestions: Question[] = [
        questions[0], // Team size
        ...getSkillQuestions(), // Dynamic skill questions
        ...questions.slice(1) // Rest of the questions
    ];

    const currentQuestion = allQuestions[currentStep];
    const progress = ((currentStep + 1) / allQuestions.length) * 100;

    const handleOptionSelect = (questionId: string, value: string) => {
        if (currentQuestion.isMultiSelect) {
            const currentValues = (inputs[questionId as keyof HackathonInputs] as string[]) || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            setInputs({ ...inputs, [questionId]: newValues });
        } else if (currentQuestion.isSkillQuestion) {
            // Handle skill selection
            const members = [...(inputs.teamMembers || [])];
            const memberIndex = currentQuestion.memberIndex!;

            if (!members[memberIndex]) {
                members[memberIndex] = { skill: value, level: 'intermediate' };
            } else {
                members[memberIndex].skill = value;
            }

            setInputs({ ...inputs, teamMembers: members });
        } else {
            setInputs({ ...inputs, [questionId]: value });
        }
    };

    const handleProficiencySelect = (proficiency: string) => {
        const members = [...(inputs.teamMembers || [])];
        const memberIndex = currentQuestion.memberIndex!;

        if (members[memberIndex]) {
            members[memberIndex].level = proficiency;
            setInputs({ ...inputs, teamMembers: members });
        }
    };

    const handleNext = () => {
        if (currentStep < allQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Complete - validate and submit
            onComplete(inputs as HackathonInputs);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            onBack();
        }
    };

    const isCurrentQuestionAnswered = () => {
        const questionId = currentQuestion.id;

        if (currentQuestion.isSkillQuestion) {
            const member = inputs.teamMembers?.[currentQuestion.memberIndex!];
            return member && member.skill && member.level;
        }

        if (currentQuestion.isMultiSelect) {
            const answer = inputs[questionId as keyof HackathonInputs] as string[];
            return Array.isArray(answer) && answer.length > 0;
        }

        return Boolean(inputs[questionId as keyof HackathonInputs]);
    };

    const getCurrentMember = () => {
        if (!currentQuestion.isSkillQuestion) return null;
        return inputs.teamMembers?.[currentQuestion.memberIndex!];
    };

    const Icon = currentQuestion.icon;

    return (
        <div className="min-h-screen bg-white py-12 px-4 relative overflow-hidden">

            <style>
                {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }

          .grid-pattern {
            background-color: transparent;
            background-image: 
              linear-gradient(0deg, transparent 24%, rgba(148, 163, 184, 0.05) 25%, rgba(148, 163, 184, 0.05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, 0.05) 75%, rgba(148, 163, 184, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(148, 163, 184, 0.05) 25%, rgba(148, 163, 184, 0.05) 26%, transparent 27%, transparent 74%, rgba(148, 163, 184, 0.05) 75%, rgba(148, 163, 184, 0.05) 76%, transparent 77%, transparent);
            background-size: 55px 55px;
            pointer-events: none;
          }
        `}
            </style>

            {/* Static Grid Pattern Background */}
            <div className="absolute inset-0 grid-pattern opacity-60"></div>

            <div className="container mx-auto max-w-3xl relative z-10">

                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="relative mb-3">
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#1F3C88] transition-all duration-700 ease-out rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Counter */}
                    <div className="text-center">
                        <p className="text-xs text-[#94A3B8]">
                            Question {currentStep + 1} of {allQuestions.length}
                        </p>
                    </div>
                </div>

                {/* AI Feedback Message */}
                <div className="mb-6 flex justify-center animate-fadeIn">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
                        <div className="w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                        </div>
                        <p className="text-sm text-[#64748B]">
                            {currentStep === 0 && "Let's understand your team setup..."}
                            {currentStep > 0 && currentStep <= getSkillQuestions().length && "Building your skill matrix..."}
                            {currentStep > getSkillQuestions().length && currentStep < allQuestions.length - 1 && "Almost there! Finalizing your roadmap..."}
                            {currentStep === allQuestions.length - 1 && "Last question! Then we'll create your plan..."}
                        </p>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8 animate-fadeIn">

                    {/* Question Header */}
                    <div className="px-10 pt-10 pb-2">
                        <div className="flex items-center gap-4 mb-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-100 bg-slate-50"
                            >
                                <Icon className="w-5 h-5 text-[#1F3C88]" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-[#1F3C88] text-2xl font-medium leading-tight">{currentQuestion.question}</h1>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm mb-4 leading-relaxed">{currentQuestion.description}</p>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <Info className="w-3.5 h-3.5" />
                            <span>{projectTitle}</span>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="px-10 pb-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentQuestion.options.map((option: any) => {
                                const isSelected = currentQuestion.isSkillQuestion
                                    ? getCurrentMember()?.skill === option.value
                                    : currentQuestion.isMultiSelect
                                        ? ((inputs[currentQuestion.id as keyof HackathonInputs] as string[]) || []).includes(option.value)
                                        : inputs[currentQuestion.id as keyof HackathonInputs] === option.value;

                                const OptionIcon = option.icon || getOptionIcon(option.value);

                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => handleOptionSelect(String(currentQuestion.id), option.value)}
                                        className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 text-left flex items-center gap-3 group ${isSelected
                                            ? 'border-[#1F3C88] bg-slate-50 shadow-sm'
                                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isSelected
                                            ? 'bg-[#1F3C88] text-white'
                                            : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'
                                            }`}>
                                            <OptionIcon className="w-5 h-5" />
                                        </div>

                                        {/* Label */}
                                        <div className="flex-1">
                                            <span className={`text-base transition-colors duration-200 ${isSelected ? 'text-[#1F3C88] font-medium' : 'text-[#334155] group-hover:text-[#1F3C88]'}`}>
                                                {option.label}
                                            </span>
                                        </div>

                                        {/* Check indicator */}
                                        {isSelected && (
                                            <div className="w-5 h-5 bg-[#1F3C88] rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-white stroke-[3]" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Proficiency Selection for Skill Questions */}
                        {currentQuestion.isSkillQuestion && currentQuestion.proficiencyOptions && (
                            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 scale-in-center">
                                <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">Proficiency Level</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {currentQuestion.proficiencyOptions.map((prof: any) => {
                                        const isSelected = getCurrentMember()?.level === prof.value;
                                        return (
                                            <button
                                                key={prof.value}
                                                onClick={() => handleProficiencySelect(prof.value)}
                                                className={`px-3 py-2 rounded-lg border text-sm transition-all duration-200 flex items-center justify-center gap-2 ${isSelected
                                                    ? 'border-[#1F3C88] bg-white text-[#1F3C88] font-medium shadow-sm'
                                                    : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'
                                                    }`}
                                            >
                                                <prof.icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#1F3C88]' : 'text-slate-400'}`} />
                                                <span>{prof.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Multi-select hint */}
                    {currentQuestion.isMultiSelect && (
                        <div className="px-10 pb-8">
                            <div className="p-3 bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl">
                                <p className="text-xs text-[#92400E] text-center flex items-center justify-center gap-1.5">
                                    <Lightbulb className="w-3.5 h-3.5 text-[#92400E]" />
                                    <span>You can select multiple options</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center gap-4 mb-6">
                    <button
                        onClick={handlePrevious}
                        className="px-6 py-3 bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-200 flex items-center gap-2"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Back</span>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!isCurrentQuestionAnswered()}
                        className={`px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${isCurrentQuestionAnswered()
                            ? 'bg-[#1F3C88] text-white hover:bg-[#162a60] shadow-md hover:shadow-lg'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        <span className="text-sm font-medium">{currentStep < allQuestions.length - 1 ? 'Continue' : 'Generate Plan'}</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Reassurance */}
                <div className="text-center">
                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                        <Lightbulb className="w-3.5 h-3.5 text-[#22D3EE]" />
                        <span>Based on your team's strengths & timeline</span>
                    </p>
                </div>

            </div>
        </div>
    );
}
