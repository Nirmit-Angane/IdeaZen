import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Target, 
  Code, 
  Zap, 
  Clock, 
  Layers, 
  TrendingUp, 
  Shield, 
  Check,
  Lightbulb
} from 'lucide-react';
import { SkillLevel, UserInputs } from '../../types/project.types';
import { getOptionIcon } from './QuestionFlowIcons';

interface QuestionFlowProps {
  skillLevel: SkillLevel;
  initialInputs: UserInputs;
  onComplete: (inputs: UserInputs) => void;
  onBack: () => void;
}

export function QuestionFlow({ skillLevel, initialInputs, onComplete, onBack }: QuestionFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState<UserInputs>(initialInputs);

  // Question icons mapping
  const questionIcons: { [key: string]: any } = {
    'domain': Target,
    'learningGoal': Code,
    'timeAvailability': Clock,
    'deployment': Zap,
    'technologies': Code,
    'architecture': Layers,
    'scalability': TrendingUp,
    'constraints': Shield
  };

  const beginnerQuestions = [
    {
      id: 'domain',
      question: 'What type of project interests you?',
      description: 'Choose what excites you most',
      isMultiSelect: false,
      options: [
        { value: 'web', label: 'Web Development' },
        { value: 'mobile', label: 'Mobile Apps' },
        { value: 'game', label: 'Game Development' },
        { value: 'automation', label: 'Automation' }
      ]
    },
    {
      id: 'learningGoal',
      question: 'What do you want to learn?',
      description: 'Pick your main focus',
      isMultiSelect: false,
      options: [
        { value: 'frontend', label: 'Frontend Skills' },
        { value: 'backend', label: 'Backend Skills' },
        { value: 'fullstack', label: 'Full Stack' },
        { value: 'specific', label: 'Specific Technology' }
      ]
    },
    {
      id: 'timeAvailability',
      question: 'How much time can you dedicate?',
      description: 'Be realistic',
      isMultiSelect: false,
      options: [
        { value: '2-weeks', label: '2 Weeks' },
        { value: '1-month', label: '1 Month' },
        { value: '2-months', label: '2 Months' },
        { value: '3-months', label: '3+ Months' }
      ]
    },
    {
      id: 'deployment',
      question: 'Want to deploy your project?',
      description: 'Make it live on the internet',
      isMultiSelect: false,
      options: [
        { value: 'yes-simple', label: 'Yes, Easy Setup' },
        { value: 'yes-custom', label: 'Yes, Learn Deployment' },
        { value: 'no', label: 'Not Required' },
        { value: 'maybe', label: 'Maybe Later' }
      ]
    }
  ];

  const intermediateQuestions = [
    {
      id: 'domain',
      question: 'What type of project do you want to build?',
      description: 'Select your focus area',
      isMultiSelect: false,
      options: [
        { value: 'fullstack-app', label: 'Full-Stack Web App' },
        { value: 'api', label: 'REST/GraphQL API' },
        { value: 'realtime', label: 'Real-time App' },
        { value: 'mobile', label: 'Mobile App' },
        { value: 'devtools', label: 'Developer Tools' }
      ]
    },
    {
      id: 'learningGoal',
      question: 'What\'s your primary learning goal?',
      description: 'What do you want to master?',
      isMultiSelect: false,
      options: [
        { value: 'architecture', label: 'Software Architecture' },
        { value: 'performance', label: 'Performance' },
        { value: 'testing', label: 'Testing & Quality' },
        { value: 'deployment', label: 'DevOps' },
        { value: 'new-tech', label: 'New Technologies' }
      ]
    },
    {
      id: 'timeAvailability',
      question: 'Project timeline?',
      description: 'Total time commitment',
      isMultiSelect: false,
      options: [
        { value: '1-month', label: '1 Month' },
        { value: '2-months', label: '2 Months' },
        { value: '3-months', label: '3 Months' },
        { value: 'flexible', label: 'Flexible' }
      ]
    },
    {
      id: 'technologies',
      question: 'Preferred tech stack?',
      description: 'Select all that interest you',
      isMultiSelect: true,
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'node', label: 'Node.js' },
        { value: 'python', label: 'Python' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'go', label: 'Go' },
        { value: 'database', label: 'Databases' },
        { value: 'cloud', label: 'Cloud' }
      ]
    },
    {
      id: 'deployment',
      question: 'Deployment requirements?',
      description: 'Where will this be hosted?',
      isMultiSelect: false,
      options: [
        { value: 'cloud', label: 'Cloud Platform' },
        { value: 'paas', label: 'Platform as a Service' },
        { value: 'containerized', label: 'Containerized' },
        { value: 'local', label: 'Local Only' }
      ]
    }
  ];

  const advancedQuestions = [
    {
      id: 'domain',
      question: 'Project domain and scope?',
      description: 'Type of system to architect',
      isMultiSelect: false,
      options: [
        { value: 'distributed', label: 'Distributed Systems' },
        { value: 'ai-ml', label: 'AI/ML Integration' },
        { value: 'platform', label: 'Platform/SaaS' },
        { value: 'infrastructure', label: 'Infrastructure' },
        { value: 'performance', label: 'High-Performance' }
      ]
    },
    {
      id: 'architecture',
      question: 'Architectural patterns?',
      description: 'Select all that interest you',
      isMultiSelect: true,
      options: [
        { value: 'microservices', label: 'Microservices' },
        { value: 'event-driven', label: 'Event-Driven' },
        { value: 'serverless', label: 'Serverless' },
        { value: 'cqrs', label: 'CQRS' },
        { value: 'distributed', label: 'Distributed' },
        { value: 'reactive', label: 'Reactive' }
      ]
    },
    {
      id: 'scalability',
      question: 'Scalability requirements?',
      description: 'Expected scale',
      isMultiSelect: false,
      options: [
        { value: 'horizontal', label: 'Horizontal Scaling' },
        { value: 'vertical', label: 'Vertical Scaling' },
        { value: 'auto-scaling', label: 'Auto-scaling' },
        { value: 'not-critical', label: 'Not Critical' }
      ]
    },
    {
      id: 'technologies',
      question: 'Technology preferences?',
      description: 'Select all that apply',
      isMultiSelect: true,
      options: [
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
        { value: 'python', label: 'Python' },
        { value: 'kubernetes', label: 'Kubernetes' },
        { value: 'kafka', label: 'Kafka' },
        { value: 'grpc', label: 'gRPC' },
        { value: 'graphql', label: 'GraphQL' },
        { value: 'ai-apis', label: 'AI/ML APIs' }
      ]
    },
    {
      id: 'constraints',
      question: 'Project constraints?',
      description: 'Any specific requirements',
      isMultiSelect: false,
      options: [
        { value: 'budget', label: 'Budget Conscious' },
        { value: 'security', label: 'Security Critical' },
        { value: 'performance', label: 'Performance Critical' },
        { value: 'none', label: 'No Constraints' }
      ]
    },
    {
      id: 'timeAvailability',
      question: 'Project timeline?',
      description: 'Development duration',
      isMultiSelect: false,
      options: [
        { value: '2-months', label: '2 Months' },
        { value: '3-months', label: '3 Months' },
        { value: '6-months', label: '6 Months' },
        { value: 'ongoing', label: 'Ongoing' }
      ]
    }
  ];

  const questions = skillLevel === 'beginner' 
    ? beginnerQuestions 
    : skillLevel === 'intermediate' 
    ? intermediateQuestions 
    : advancedQuestions;

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleOptionSelect = (questionId: string, value: string) => {
    if (currentQuestion.isMultiSelect) {
      const currentValues = (inputs[questionId as keyof UserInputs] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setInputs({ ...inputs, [questionId]: newValues });
    } else {
      setInputs({ ...inputs, [questionId]: value });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(inputs);
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
    const answer = inputs[questionId as keyof UserInputs];
    if (currentQuestion.isMultiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return Boolean(answer);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 relative overflow-hidden">
      
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
              linear-gradient(0deg, transparent 24%, rgba(31, 60, 136, 0.05) 25%, rgba(31, 60, 136, 0.05) 26%, transparent 27%, transparent 74%, rgba(31, 60, 136, 0.05) 75%, rgba(31, 60, 136, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(34, 211, 238, 0.05) 25%, rgba(34, 211, 238, 0.05) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.05) 75%, rgba(34, 211, 238, 0.05) 76%, transparent 77%, transparent);
            background-size: 60px 60px;
            pointer-events: none;
          }
        `}
      </style>

      {/* Static Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-40"></div>

      <div className="container mx-auto max-w-3xl relative z-10">
        
        {/* Progress Bar - Simplified */}
        <div className="mb-10">
          <div className="relative mb-3">
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1F3C88] transition-all duration-700 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Counter */}
          <div className="text-center">
            <p className="text-xs text-slate-500 font-medium">
              Question {currentStep + 1} of {questions.length}
            </p>
          </div>
        </div>

        {/* AI Feedback Message - Conversational Bubble */}
        <div className="mb-6 flex justify-center animate-fadeIn">
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="w-6 h-6 bg-[#1F3C88] rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-sm text-slate-600">
              {currentStep === 0 && `Great! I'm adapting to your ${skillLevel} level...`}
              {currentStep === 1 && "Perfect! Let me narrow down ideas for you..."}
              {currentStep === 2 && "This helps me match your schedule..."}
              {currentStep > 2 && "Almost there! Building your perfect project..."}
            </p>
          </div>
        </div>

        {/* Question Card - Flat Design */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 animate-fadeIn">
          
          {/* Question Header */}
          <div className="px-10 pt-10 pb-8">
            <h2 className="text-[#1F3C88] text-3xl font-bold mb-3 leading-tight">{currentQuestion.question}</h2>
            <p className="text-slate-500 text-lg mb-4">{currentQuestion.description}</p>
            <p className="text-sm text-slate-400 flex items-center gap-1.5">
              <span className="text-[#22D3EE] font-bold">→</span> This helps personalize your project idea
            </p>
          </div>

          {/* Options - Improved Spacing & Hover States */}
          <div className="px-10 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.isMultiSelect
                  ? ((inputs[currentQuestion.id as keyof UserInputs] as string[]) || []).includes(option.value)
                  : inputs[currentQuestion.id as keyof UserInputs] === option.value;

                const OptionIcon = getOptionIcon(option.value);

                return (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-3 group ${
                      isSelected
                        ? 'border-[#1F3C88] bg-[#EEF2FF]'
                        : 'border-slate-100 bg-white hover:border-[#1F3C88]/30 hover:bg-slate-50'
                    }`}
                  >
                    {/* Icon - Minimal solid style */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isSelected 
                        ? 'bg-[#1F3C88] text-white' 
                        : 'bg-slate-100 text-slate-500 group-hover:bg-[#1F3C88]/10 group-hover:text-[#1F3C88]'
                    }`}>
                      <OptionIcon className="w-5 h-5" />
                    </div>

                    {/* Label */}
                    <div className="flex-1">
                      <span className={`text-base font-semibold transition-colors duration-200 ${isSelected ? 'text-[#1F3C88]' : 'text-slate-700 group-hover:text-[#1F3C88]'}`}>
                        {option.label}
                      </span>
                    </div>

                    {/* Check indicator - Minimal */}
                    {isSelected && (
                      <div className="w-5 h-5 bg-[#1F3C88] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multi-select hint */}
          {currentQuestion.isMultiSelect && (
            <div className="px-10 pb-8">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <p className="text-xs text-amber-800 text-center flex items-center justify-center gap-1.5 font-medium">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>You can select multiple options</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation - Improved Styling */}
        <div className="flex justify-between items-center gap-4 mb-6">
          <button
            onClick={handlePrevious}
            className="px-6 py-3.5 bg-white text-slate-600 border border-slate-200 hover:border-[#1F3C88] hover:text-[#1F3C88] hover:bg-slate-50 rounded-xl transition-all duration-200 flex items-center gap-2 font-semibold shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
            className={`px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md ${
              isCurrentQuestionAnswered()
                ? 'bg-[#1F3C88] text-white hover:bg-[#1A3273] hover:shadow-lg active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span className="text-sm font-semibold">{currentStep < questions.length - 1 ? 'Continue' : 'Generate Idea'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Reassurance - Softer Style */}
        <div className="text-center">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>You can refine your idea anytime with AI</span>
          </p>
        </div>

      </div>
    </div>
  );
}