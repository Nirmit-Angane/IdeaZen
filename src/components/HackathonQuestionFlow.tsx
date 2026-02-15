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
    Lightbulb
} from 'lucide-react';
import { HackathonInputs } from '../App';
import { getOptionIcon } from './QuestionFlowIcons';

interface HackathonQuestionFlowProps {
    projectTitle: string;
    onComplete: (inputs: HackathonInputs) => void;
    onBack: () => void;
}

export function HackathonQuestionFlow({ projectTitle, onComplete, onBack }: HackathonQuestionFlowProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputs, setInputs] = useState<Partial<HackathonInputs>>({
        projectTitle,
        teamMembers: [],
        submissionRequirements: [],
        resources: []
    });

    // Question definitions
    const questions = [
        {
            id: 'teamSize',
            question: "What's your team configuration?",
            description: 'How many people are working on this?',
            icon: Users,
            color: '#22D3EE',
            options: [
                { value: 'solo', label: 'Solo', emoji: '👤' },
                { value: '2-person', label: '2 People', emoji: '👥' },
                { value: '3-4', label: '3-4 People', emoji: '👥👥' },
                { value: '5+', label: '5+ People', emoji: '👥👥👥' }
            ]
        },
        {
            id: 'timeline',
            question: 'How long is your hackathon?',
            description: 'Total time available',
            icon: Clock,
            color: '#1F3C88',
            options: [
                { value: '24h', label: '24 Hours', emoji: '⚡' },
                { value: '36h', label: '36 Hours', emoji: '📅' },
                { value: '48h', label: '48 Hours', emoji: '📆' },
                { value: '72h', label: '72 Hours', emoji: '🗓️' }
            ]
        },
        {
            id: 'submissionRequirements',
            question: 'What do you need to submit?',
            description: 'Select all that apply',
            icon: Target,
            color: '#22C55E',
            isMultiSelect: true,
            options: [
                { value: 'demo', label: 'Working Demo', emoji: '💻' },
                { value: 'pitch-deck', label: 'Pitch Deck', emoji: '📊' },
                { value: 'video', label: 'Demo Video', emoji: '🎥' },
                { value: 'github', label: 'GitHub Repo', emoji: '📁' },
                { value: 'deployment', label: 'Live Deployment', emoji: '🚀' }
            ]
        },
        {
            id: 'resources',
            question: 'What resources do you have?',
            description: 'Available tools and constraints',
            icon: Zap,
            color: '#FACC15',
            isMultiSelect: true,
            options: [
                { value: 'apis', label: 'Third-party APIs', emoji: '🔌' },
                { value: 'hardware', label: 'Special Hardware', emoji: '🔧' },
                { value: 'cloud-credits', label: 'Cloud Credits', emoji: '☁️' },
                { value: 'time-limits', label: 'Strict Time Limits', emoji: '⏰' },
                { value: 'internet', label: 'Limited Internet', emoji: '📶' }
            ]
        },
        {
            id: 'priority',
            question: "What's your main goal?",
            description: 'Strategic priority for this hackathon',
            icon: TrendingUp,
            color: '#22D3EE',
            options: [
                { value: 'win', label: 'Win the Competition', emoji: '🏆' },
                { value: 'learn', label: 'Learn New Skills', emoji: '📚' },
                { value: 'mvp', label: 'Build a Real MVP', emoji: '🚀' },
                { value: 'networking', label: 'Network & Have Fun', emoji: '🤝' }
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

        return Array.from({ length: memberCount }, (_, index) => ({
            id: `member-${index}`,
            question: memberCount === 1
                ? "What's your primary skill?"
                : `Team Member ${index + 1}: Primary Skill?`,
            description: memberCount === 1
                ? 'Your main area of expertise'
                : `What does member ${index + 1} specialize in?`,
            icon: Code,
            color: '#7C6CF6',
            memberIndex: index,
            isSkillQuestion: true,
            options: [
                { value: 'frontend', label: 'Frontend', emoji: '🎨' },
                { value: 'backend', label: 'Backend', emoji: '⚙️' },
                { value: 'ai-ml', label: 'AI/ML', emoji: '🤖' },
                { value: 'design', label: 'Design', emoji: '✨' },
                { value: 'devops', label: 'DevOps', emoji: '🔧' },
                { value: 'other', label: 'Other', emoji: '💡' }
            ],
            proficiencyOptions: [
                { value: 'beginner', label: 'Beginner', emoji: '🌱' },
                { value: 'intermediate', label: 'Intermediate', emoji: '🔥' },
                { value: 'advanced', label: 'Advanced', emoji: '⭐' }
            ]
        }));
    };

    // Combine all questions
    const allQuestions = [
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
                members[memberIndex] = { skill: value as any, proficiency: 'intermediate' };
            } else {
                members[memberIndex].skill = value as any;
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
            members[memberIndex].proficiency = proficiency as any;
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
            return member && member.skill && member.proficiency;
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
        <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white py-12 px-4 relative overflow-hidden">

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

          @keyframes progressGlow {
            0%, 100% {
              filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.3));
            }
            50% {
              filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.5));
            }
          }

          @keyframes gridMove {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(55px, 55px);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }

          .progress-bar {
            animation: progressGlow 2s ease-in-out infinite;
          }

          .grid-pattern {
            background-color: transparent;
            background-image: 
              linear-gradient(0deg, transparent 24%, rgba(250, 204, 21, 0.08) 25%, rgba(250, 204, 21, 0.08) 26%, transparent 27%, transparent 74%, rgba(250, 204, 21, 0.08) 75%, rgba(250, 204, 21, 0.08) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(34, 211, 238, 0.08) 25%, rgba(34, 211, 238, 0.08) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.08) 75%, rgba(34, 211, 238, 0.08) 76%, transparent 77%, transparent);
            background-size: 55px 55px;
            animation: gridMove 20s linear infinite;
            pointer-events: none;
          }
        `}
            </style>

            {/* Animated Grid Pattern Background */}
            <div className="absolute inset-0 grid-pattern opacity-40"></div>

            <div className="container mx-auto max-w-3xl relative z-10">

                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="relative mb-3">
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-[#FACC15] via-[#22D3EE] to-[#1F3C88] transition-all duration-700 ease-out rounded-full progress-bar"
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
                    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#FACC15] to-[#22D3EE] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
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
                    <div className="px-10 pt-10 pb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${currentQuestion.color}15` }}
                            >
                                <Icon className="w-6 h-6" style={{ color: currentQuestion.color }} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-[#1F3C88] text-3xl leading-tight">{currentQuestion.question}</h2>
                            </div>
                        </div>
                        <p className="text-[#64748B] text-base mb-4">{currentQuestion.description}</p>
                        <p className="text-sm text-[#94A3B8] flex items-center gap-1.5">
                            <span className="text-[#FACC15]">→</span> {projectTitle}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="px-10 pb-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentQuestion.options.map((option) => {
                                const isSelected = currentQuestion.isSkillQuestion
                                    ? getCurrentMember()?.skill === option.value
                                    : currentQuestion.isMultiSelect
                                        ? ((inputs[currentQuestion.id as keyof HackathonInputs] as string[]) || []).includes(option.value)
                                        : inputs[currentQuestion.id as keyof HackathonInputs] === option.value;

                                const OptionIcon = getOptionIcon(option.value);

                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                                        className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 text-left flex items-center gap-3 group ${isSelected
                                            ? 'border-[#FACC15] bg-[#FACC15]/5 shadow-sm'
                                            : 'border-gray-200 hover:border-[#FACC15]/40 hover:bg-gray-50'
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isSelected
                                            ? 'bg-[#FACC15] text-white'
                                            : 'bg-gray-100 text-[#64748B] group-hover:bg-[#FACC15]/10 group-hover:text-[#FACC15]'
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
                                            <div className="w-5 h-5 bg-[#FACC15] rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-white stroke-[2.5]" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Proficiency Selection for Skill Questions */}
                        {currentQuestion.isSkillQuestion && getCurrentMember()?.skill && (
                            <div className="mt-6 p-4 bg-[#F7F9FC] rounded-xl">
                                <p className="text-sm text-[#64748B] mb-3 font-medium">Proficiency Level:</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {currentQuestion.proficiencyOptions?.map((prof) => {
                                        const isSelected = getCurrentMember()?.proficiency === prof.value;
                                        return (
                                            <button
                                                key={prof.value}
                                                onClick={() => handleProficiencySelect(prof.value)}
                                                className={`px-3 py-2 rounded-lg border text-sm transition-all duration-200 ${isSelected
                                                    ? 'border-[#7C6CF6] bg-[#7C6CF6]/10 text-[#7C6CF6] font-medium'
                                                    : 'border-gray-200 text-[#64748B] hover:border-[#7C6CF6]/40'
                                                    }`}
                                            >
                                                {prof.emoji} {prof.label}
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
                        className="px-6 py-3.5 bg-white text-[#64748B] border border-gray-200 hover:border-[#FACC15] hover:text-[#FACC15] hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Back</span>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!isCurrentQuestionAnswered()}
                        className={`px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg ${isCurrentQuestionAnswered()
                            ? 'bg-gradient-to-r from-[#FACC15] to-[#22D3EE] text-white hover:shadow-xl hover:scale-[1.02]'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                            }`}
                    >
                        <span className="text-sm font-medium">{currentStep < allQuestions.length - 1 ? 'Continue' : 'Generate Roadmap'}</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Reassurance */}
                <div className="text-center">
                    <p className="text-xs text-[#94A3B8] flex items-center justify-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-[#FACC15]" />
                        <span>We'll create a realistic plan based on your team's strengths</span>
                    </p>
                </div>

            </div>
        </div>
    );
}
