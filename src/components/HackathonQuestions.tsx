import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Users, 
  Clock, 
  CheckSquare, 
  Package, 
  Target,
  Check,
  Lightbulb,
  Zap,
  Calendar,
  Code,
  Presentation,
  Video,
  Github,
  Globe,
  Trophy,
  GraduationCap,
  Rocket,
  Network
} from 'lucide-react';
import type { HackathonContext, TeamMember } from '../types';

interface HackathonQuestionsProps {
  initialContext: Partial<HackathonContext>;
  onComplete: (context: HackathonContext) => void;
  onBack: () => void;
}

interface QuestionOption {
  value: string;
  label: string;
  description?: string;
  emoji: string;
}

export function HackathonQuestions({ initialContext, onComplete, onBack }: HackathonQuestionsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [context, setContext] = useState<Partial<HackathonContext>>({
    ...initialContext,
    team: initialContext.team || { size: 1, members: [] },
    timeline: initialContext.timeline || { duration: 48 },
    submission: initialContext.submission || {
      demoRequired: false,
      deckRequired: false,
      videoRequired: false,
      repoRequired: false,
      deploymentRequired: false,
    },
    resources: initialContext.resources || {
      allowedAPIs: [],
      preExistingCodeAllowed: false,
      deploymentPlatforms: [],
      bannedTechnologies: [],
    },
    priority: initialContext.priority || 'win',
  });

  // 6 questions for hackathon context (<2 min total)
  const questions = [
    {
      id: 'team',
      question: 'What\'s your team configuration?',
      description: 'Select your team size',
      icon: Users,
      type: 'single' as const,
      options: [
        { value: '1', label: 'Solo', description: 'Just me', emoji: '👤' },
        { value: '2', label: '2-Person Team', description: 'Pair programming', emoji: '👥' },
        { value: '3', label: '3-4 Person Team', description: 'Small team', emoji: '👨‍👩‍👦' },
        { value: '5', label: '5+ Person Team', description: 'Large team', emoji: '👨‍👩‍👧‍👦' },
      ],
    },
    {
      id: 'skills',
      question: 'What are your team\'s skills?',
      description: 'Select all roles available in your team',
      icon: Code,
      type: 'multi' as const,
      options: [
        { value: 'frontend', label: 'Frontend', description: '', emoji: '🎨' },
        { value: 'backend', label: 'Backend', description: '', emoji: '⚙️' },
        { value: 'fullstack', label: 'Full Stack', description: '', emoji: '🔥' },
        { value: 'design', label: 'UI/UX Design', description: '', emoji: '🎭' },
        { value: 'ml', label: 'ML/AI', description: '', emoji: '🤖' },
        { value: 'devops', label: 'DevOps', description: '', emoji: '🚀' },
      ],
    },
    {
      id: 'timeline',
      question: 'How long is your hackathon?',
      description: 'Total duration available',
      icon: Clock,
      type: 'single' as const,
      options: [
        { value: '24', label: '24 Hours', description: 'Sprint mode', emoji: '⚡' },
        { value: '36', label: '36 Hours', description: 'Standard', emoji: '📅' },
        { value: '48', label: '48 Hours', description: 'Most common', emoji: '📆' },
        { value: '72', label: '72 Hours', description: 'Extended', emoji: '🗓️' },
        { value: 'custom', label: 'Custom Duration', description: 'Other', emoji: '⏱️' },
      ],
    },
    {
      id: 'submission',
      question: 'What submission requirements?',
      description: 'Select all that are required',
      icon: CheckSquare,
      type: 'multi' as const,
      options: [
        { value: 'demo', label: 'Live Demo', description: '', emoji: '🎬' },
        { value: 'deck', label: 'Pitch Deck', description: '', emoji: '📊' },
        { value: 'video', label: 'Demo Video', description: '', emoji: '🎥' },
        { value: 'repo', label: 'GitHub Repo', description: '', emoji: '📦' },
        { value: 'deployment', label: 'Deployed App', description: '', emoji: '🌐' },
      ],
    },
    {
      id: 'resources',
      question: 'Available resources & constraints?',
      description: 'What can you use?',
      icon: Package,
      type: 'multi' as const,
      options: [
        { value: 'apis', label: 'External APIs', description: '', emoji: '🔌' },
        { value: 'existing-code', label: 'Pre-existing Code', description: '', emoji: '📝' },
        { value: 'cloud', label: 'Cloud Platforms', description: '', emoji: '☁️' },
        { value: 'budget', label: 'Budget Available', description: '', emoji: '💰' },
      ],
    },
    {
      id: 'priority',
      question: 'What\'s your strategic priority?',
      description: 'What matters most to you?',
      icon: Target,
      type: 'single' as const,
      options: [
        { value: 'win', label: 'Win the Hackathon', description: 'Go for first place', emoji: '🏆' },
        { value: 'learn', label: 'Learn New Skills', description: 'Educational focus', emoji: '📚' },
        { value: 'mvp', label: 'Build MVP Fast', description: 'Speed over polish', emoji: '⚡' },
        { value: 'network', label: 'Network & Connect', description: 'Meet people', emoji: '🤝' },
      ],
    },
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  // Handle option selection
  const handleOptionSelect = (questionId: string, value: string) => {
    if (questionId === 'team') {
      const teamSize = parseInt(value) as 1 | 2 | 3 | 4 | 5;
      setContext({
        ...context,
        team: {
          size: teamSize,
          members: context.team?.members || [],
        },
      });
    } else if (questionId === 'skills') {
      const currentSkills = context.team?.members.map(m => m.role) || [];
      const newSkills = currentSkills.includes(value as any)
        ? currentSkills.filter(s => s !== value)
        : [...currentSkills, value as any];
      
      // Create team members based on selected skills
      const members: TeamMember[] = newSkills.map(skill => ({
        role: skill as TeamMember['role'],
        proficiency: 'intermediate', // Default proficiency
      }));
      
      setContext({
        ...context,
        team: {
          ...context.team!,
          members,
        },
      });
    } else if (questionId === 'timeline') {
      const duration = value === 'custom' ? 48 : parseInt(value);
      setContext({
        ...context,
        timeline: {
          ...context.timeline!,
          duration: duration as 24 | 36 | 48 | 72 | number,
        },
      });
    } else if (questionId === 'submission') {
      const submissionMap: { [key: string]: keyof HackathonContext['submission'] } = {
        demo: 'demoRequired',
        deck: 'deckRequired',
        video: 'videoRequired',
        repo: 'repoRequired',
        deployment: 'deploymentRequired',
      };
      
      const key = submissionMap[value];
      if (key) {
        setContext({
          ...context,
          submission: {
            ...context.submission!,
            [key]: !context.submission![key],
          },
        });
      }
    } else if (questionId === 'resources') {
      const resourceMap: { [key: string]: string } = {
        'apis': 'allowedAPIs',
        'existing-code': 'preExistingCodeAllowed',
        'cloud': 'deploymentPlatforms',
        'budget': 'budget',
      };
      
      if (value === 'existing-code') {
        setContext({
          ...context,
          resources: {
            ...context.resources!,
            preExistingCodeAllowed: !context.resources!.preExistingCodeAllowed,
          },
        });
      } else if (value === 'apis') {
        const hasAPIs = context.resources!.allowedAPIs.length > 0;
        setContext({
          ...context,
          resources: {
            ...context.resources!,
            allowedAPIs: hasAPIs ? [] : ['OpenAI', 'Stripe', 'Twilio'],
          },
        });
      } else if (value === 'cloud') {
        const hasPlatforms = context.resources!.deploymentPlatforms.length > 0;
        setContext({
          ...context,
          resources: {
            ...context.resources!,
            deploymentPlatforms: hasPlatforms ? [] : ['Vercel', 'Railway', 'Netlify'],
          },
        });
      } else if (value === 'budget') {
        const hasBudget = context.resources!.budget !== undefined;
        setContext({
          ...context,
          resources: {
            ...context.resources!,
            budget: hasBudget ? undefined : 100,
          },
        });
      }
    } else if (questionId === 'priority') {
      setContext({
        ...context,
        priority: value as 'win' | 'learn' | 'mvp' | 'network',
      });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the context and call onComplete
      onComplete(context as HackathonContext);
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
    
    if (questionId === 'team') {
      return context.team?.size !== undefined;
    } else if (questionId === 'skills') {
      return context.team?.members && context.team.members.length > 0;
    } else if (questionId === 'timeline') {
      return context.timeline?.duration !== undefined;
    } else if (questionId === 'submission') {
      const sub = context.submission!;
      return sub.demoRequired || sub.deckRequired || sub.videoRequired || sub.repoRequired || sub.deploymentRequired;
    } else if (questionId === 'resources') {
      // Resources can be empty, so always allow to continue
      return true;
    } else if (questionId === 'priority') {
      return context.priority !== undefined;
    }
    
    return false;
  };

  const getSelectedValue = (questionId: string, optionValue: string): boolean => {
    if (questionId === 'team') {
      return context.team?.size?.toString() === optionValue;
    } else if (questionId === 'skills') {
      return context.team?.members.some(m => m.role === optionValue) || false;
    } else if (questionId === 'timeline') {
      return context.timeline?.duration?.toString() === optionValue || (optionValue === 'custom' && ![24, 36, 48, 72].includes(context.timeline?.duration || 0));
    } else if (questionId === 'submission') {
      const submissionMap: { [key: string]: keyof HackathonContext['submission'] } = {
        demo: 'demoRequired',
        deck: 'deckRequired',
        video: 'videoRequired',
        repo: 'repoRequired',
        deployment: 'deploymentRequired',
      };
      const key = submissionMap[optionValue];
      return key ? Boolean(context.submission![key]) : false;
    } else if (questionId === 'resources') {
      if (optionValue === 'apis') return context.resources!.allowedAPIs.length > 0;
      if (optionValue === 'existing-code') return context.resources!.preExistingCodeAllowed;
      if (optionValue === 'cloud') return context.resources!.deploymentPlatforms.length > 0;
      if (optionValue === 'budget') return context.resources!.budget !== undefined;
    } else if (questionId === 'priority') {
      return context.priority === optionValue;
    }
    
    return false;
  };

  // Auto-suggest role distribution based on team size
  const getSuggestedRoles = (teamSize: number): string => {
    if (teamSize === 1) return 'Solo: Full-stack development';
    if (teamSize === 2) return 'Suggested: 1 Frontend + 1 Backend';
    if (teamSize === 3) return 'Suggested: 1 Frontend + 1 Backend + 1 Design/DevOps';
    return 'Suggested: 2 Frontend + 2 Backend + 1 Design/DevOps';
  };

  // Identify skill gaps
  const getSkillGapWarning = (): string | null => {
    const roles = context.team?.members.map(m => m.role) || [];
    
    if (roles.length === 0) return null;
    
    const hasFrontend = roles.some(r => r === 'frontend' || r === 'fullstack');
    const hasBackend = roles.some(r => r === 'backend' || r === 'fullstack');
    
    if (!hasFrontend && !hasBackend) {
      return '⚠️ Consider adding frontend or backend skills';
    }
    if (!hasFrontend) {
      return '💡 No frontend developer - consider using templates';
    }
    if (!hasBackend) {
      return '💡 No backend developer - consider serverless/BaaS';
    }
    
    return null;
  };

  // Emergency skip with defaults
  const handleEmergencySkip = () => {
    const defaultContext: HackathonContext = {
      ...context,
      team: context.team || { size: 1, members: [{ role: 'fullstack', proficiency: 'intermediate' }] },
      timeline: context.timeline || { duration: 48 },
      submission: context.submission || {
        demoRequired: true,
        deckRequired: true,
        videoRequired: false,
        repoRequired: true,
        deploymentRequired: true,
      },
      resources: context.resources || {
        allowedAPIs: [],
        preExistingCodeAllowed: false,
        deploymentPlatforms: ['Vercel'],
        bannedTechnologies: [],
      },
      priority: context.priority || 'win',
    } as HackathonContext;
    
    onComplete(defaultContext);
  };

  const QuestionIcon = currentQuestion.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F0] to-white py-12 px-4 relative overflow-hidden">
      
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
              filter: drop-shadow(0 0 4px rgba(255, 107, 53, 0.3));
            }
            50% {
              filter: drop-shadow(0 0 8px rgba(255, 69, 0, 0.5));
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

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
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
              linear-gradient(0deg, transparent 24%, rgba(255, 107, 53, 0.08) 25%, rgba(255, 107, 53, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 107, 53, 0.08) 75%, rgba(255, 107, 53, 0.08) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255, 69, 0, 0.08) 25%, rgba(255, 69, 0, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 69, 0, 0.08) 75%, rgba(255, 69, 0, 0.08) 76%, transparent 77%, transparent);
            background-size: 55px 55px;
            animation: gridMove 20s linear infinite;
            pointer-events: none;
          }

          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>

      {/* Animated Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-40"></div>

      <div className="container mx-auto max-w-3xl relative z-10">
        
        {/* Progress Bar - Hackathon Orange Theme */}
        <div className="mb-10">
          <div className="relative mb-3">
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF4500] transition-all duration-700 ease-out rounded-full progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Counter with Time Estimate */}
          <div className="text-center flex items-center justify-center gap-3">
            <p className="text-xs text-[#94A3B8]">
              Question {currentStep + 1} of {questions.length}
            </p>
            <span className="text-xs text-[#94A3B8]">•</span>
            <p className="text-xs text-[#FF6B35] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>~{Math.ceil((questions.length - currentStep) * 15)}s remaining</span>
            </p>
          </div>
        </div>

        {/* AI Feedback Message - Hackathon Urgency */}
        <div className="mb-6 flex justify-center animate-fadeIn">
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-[#FFE4D6] shadow-sm">
            <div className="w-6 h-6 bg-gradient-to-br from-[#FF6B35] to-[#FF4500] rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-sm text-[#64748B]">
              {currentStep === 0 && "Let's build your winning strategy..."}
              {currentStep === 1 && "Understanding your team's strengths..."}
              {currentStep === 2 && "Optimizing for your timeline..."}
              {currentStep === 3 && "Planning your deliverables..."}
              {currentStep === 4 && "Identifying available resources..."}
              {currentStep === 5 && "Aligning with your goals..."}
            </p>
          </div>
        </div>

        {/* Question Card - Hackathon Theme */}
        <div className="bg-white rounded-3xl shadow-lg border border-[#FFE4D6] overflow-hidden mb-8 animate-fadeIn">
          
          {/* Question Header */}
          <div className="px-10 pt-10 pb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FF4500] rounded-xl flex items-center justify-center flex-shrink-0">
                <QuestionIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-[#FF6B35] text-3xl mb-2 leading-tight">{currentQuestion.question}</h2>
                <p className="text-[#64748B] text-base">{currentQuestion.description}</p>
              </div>
            </div>
            
            {/* Smart Suggestions */}
            {currentStep === 0 && context.team?.size && (
              <div className="mt-4 p-3 bg-[#FFF5F0] border border-[#FFE4D6] rounded-xl">
                <p className="text-xs text-[#FF6B35] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{getSuggestedRoles(context.team.size)}</span>
                </p>
              </div>
            )}

            {/* Skill Gap Warning */}
            {currentStep === 1 && getSkillGapWarning() && (
              <div className="mt-4 p-3 bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl">
                <p className="text-xs text-[#92400E] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{getSkillGapWarning()}</span>
                </p>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="px-10 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = getSelectedValue(currentQuestion.id, option.value);

                return (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                    className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 text-left flex items-center gap-3 group ${
                      isSelected
                        ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-sm'
                        : 'border-gray-200 hover:border-[#FF6B35]/40 hover:bg-gray-50'
                    }`}
                  >
                    {/* Emoji Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl transition-all duration-200 ${
                      isSelected 
                        ? 'bg-[#FF6B35] scale-110' 
                        : 'bg-gray-100 group-hover:bg-[#FF6B35]/10 group-hover:scale-105'
                    }`}>
                      {option.emoji}
                    </div>

                    {/* Label */}
                    <div className="flex-1">
                      <span className={`text-base font-medium transition-colors duration-200 block ${
                        isSelected ? 'text-[#FF6B35]' : 'text-[#334155] group-hover:text-[#FF6B35]'
                      }`}>
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="text-xs text-[#94A3B8] block mt-0.5">
                          {option.description}
                        </span>
                      )}
                    </div>

                    {/* Check indicator */}
                    {isSelected && (
                      <div className="w-5 h-5 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white stroke-[2.5]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multi-select hint */}
          {currentQuestion.type === 'multi' && (
            <div className="px-10 pb-8">
              <div className="p-3 bg-[#FFF5F0] border border-[#FFE4D6] rounded-xl">
                <p className="text-xs text-[#FF6B35] text-center flex items-center justify-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
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
            className="px-6 py-3.5 bg-white text-[#64748B] border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
            className={`px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg ${
              isCurrentQuestionAnswered()
                ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF4500] text-white hover:shadow-xl hover:scale-[1.02] hover:from-[#FF5722] hover:to-[#E64A19]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span className="text-sm font-medium">
              {currentStep < questions.length - 1 ? 'Continue' : 'Generate Strategy'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Skip & Reassurance */}
        <div className="text-center space-y-3">
          <button
            onClick={handleEmergencySkip}
            className="text-xs text-[#94A3B8] hover:text-[#FF6B35] transition-colors underline"
          >
            Skip with smart defaults (emergency mode)
          </button>
          
          <p className="text-xs text-[#94A3B8] flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>AI will optimize your strategy in real-time</span>
          </p>
        </div>

      </div>
    </div>
  );
}
