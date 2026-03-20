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
        { value: 'web', label: 'Web Development', emoji: '🌐' },
        { value: 'mobile', label: 'Mobile Apps', emoji: '📱' },
        { value: 'game', label: 'Game Development', emoji: '🎮' },
        { value: 'automation', label: 'Automation', emoji: '🤖' }
      ]
    },
    {
      id: 'learningGoal',
      question: 'What do you want to learn?',
      description: 'Pick your main focus',
      isMultiSelect: false,
      options: [
        { value: 'frontend', label: 'Frontend Skills', emoji: '🎨' },
        { value: 'backend', label: 'Backend Skills', emoji: '⚙️' },
        { value: 'fullstack', label: 'Full Stack', emoji: '🔥' },
        { value: 'specific', label: 'Specific Technology', emoji: '🎯' }
      ]
    },
    {
      id: 'timeAvailability',
      question: 'How much time can you dedicate?',
      description: 'Be realistic',
      isMultiSelect: false,
      options: [
        { value: '2-weeks', label: '2 Weeks', emoji: '⚡' },
        { value: '1-month', label: '1 Month', emoji: '📅' },
        { value: '2-months', label: '2 Months', emoji: '📆' },
        { value: '3-months', label: '3+ Months', emoji: '🗓️' }
      ]
    },
    {
      id: 'deployment',
      question: 'Want to deploy your project?',
      description: 'Make it live on the internet',
      isMultiSelect: false,
      options: [
        { value: 'yes-simple', label: 'Yes, Easy Setup', emoji: '✅' },
        { value: 'yes-custom', label: 'Yes, Learn Deployment', emoji: '🚀' },
        { value: 'no', label: 'Not Required', emoji: '' },
        { value: 'maybe', label: 'Maybe Later', emoji: '🤔' }
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
        { value: 'fullstack-app', label: 'Full-Stack Web App', emoji: '🌐' },
        { value: 'api', label: 'REST/GraphQL API', emoji: '🔌' },
        { value: 'realtime', label: 'Real-time App', emoji: '⚡' },
        { value: 'mobile', label: 'Mobile App', emoji: '📱' },
        { value: 'devtools', label: 'Developer Tools', emoji: '🛠️' }
      ]
    },
    {
      id: 'learningGoal',
      question: 'What\'s your primary learning goal?',
      description: 'What do you want to master?',
      isMultiSelect: false,
      options: [
        { value: 'architecture', label: 'Software Architecture', emoji: '🏗️' },
        { value: 'performance', label: 'Performance', emoji: '⚡' },
        { value: 'testing', label: 'Testing & Quality', emoji: '✅' },
        { value: 'deployment', label: 'DevOps', emoji: '🚀' },
        { value: 'new-tech', label: 'New Technologies', emoji: '🔥' }
      ]
    },
    {
      id: 'timeAvailability',
      question: 'Project timeline?',
      description: 'Total time commitment',
      isMultiSelect: false,
      options: [
        { value: '1-month', label: '1 Month', emoji: '📅' },
        { value: '2-months', label: '2 Months', emoji: '📆' },
        { value: '3-months', label: '3 Months', emoji: '🗓️' },
        { value: 'flexible', label: 'Flexible', emoji: '🔄' }
      ]
    },
    {
      id: 'technologies',
      question: 'Preferred tech stack?',
      description: 'Select all that interest you',
      isMultiSelect: true,
      options: [
        { value: 'react', label: 'React', emoji: '⚛️' },
        { value: 'vue', label: 'Vue.js', emoji: '💚' },
        { value: 'node', label: 'Node.js', emoji: '🟢' },
        { value: 'python', label: 'Python', emoji: '🐍' },
        { value: 'typescript', label: 'TypeScript', emoji: '🔷' },
        { value: 'go', label: 'Go', emoji: '🔵' },
        { value: 'database', label: 'Databases', emoji: '🗄️' },
        { value: 'cloud', label: 'Cloud', emoji: '☁️' }
      ]
    },
    {
      id: 'deployment',
      question: 'Deployment requirements?',
      description: 'Where will this be hosted?',
      isMultiSelect: false,
      options: [
        { value: 'cloud', label: 'Cloud Platform', emoji: '☁️' },
        { value: 'paas', label: 'Platform as a Service', emoji: '🚀' },
        { value: 'containerized', label: 'Containerized', emoji: '🐳' },
        { value: 'local', label: 'Local Only', emoji: '💻' }
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
        { value: 'distributed', label: 'Distributed Systems', emoji: '🌐' },
        { value: 'ai-ml', label: 'AI/ML Integration', emoji: '🤖' },
        { value: 'platform', label: 'Platform/SaaS', emoji: '🏢' },
        { value: 'infrastructure', label: 'Infrastructure', emoji: '⚙️' },
        { value: 'performance', label: 'High-Performance', emoji: '⚡' }
      ]
    },
    {
      id: 'architecture',
      question: 'Architectural patterns?',
      description: 'Select all that interest you',
      isMultiSelect: true,
      options: [
        { value: 'microservices', label: 'Microservices', emoji: '🔷' },
        { value: 'event-driven', label: 'Event-Driven', emoji: '⚡' },
        { value: 'serverless', label: 'Serverless', emoji: '☁️' },
        { value: 'cqrs', label: 'CQRS', emoji: '🔄' },
        { value: 'distributed', label: 'Distributed', emoji: '🌐' },
        { value: 'reactive', label: 'Reactive', emoji: '🔥' }
      ]
    },
    {
      id: 'scalability',
      question: 'Scalability requirements?',
      description: 'Expected scale',
      isMultiSelect: false,
      options: [
        { value: 'horizontal', label: 'Horizontal Scaling', emoji: '↔️' },
        { value: 'vertical', label: 'Vertical Scaling', emoji: '↕️' },
        { value: 'auto-scaling', label: 'Auto-scaling', emoji: '🔄' },
        { value: 'not-critical', label: 'Not Critical', emoji: '➖' }
      ]
    },
    {
      id: 'technologies',
      question: 'Technology preferences?',
      description: 'Select all that apply',
      isMultiSelect: true,
      options: [
        { value: 'go', label: 'Go', emoji: '🔵' },
        { value: 'rust', label: 'Rust', emoji: '🦀' },
        { value: 'python', label: 'Python', emoji: '🐍' },
        { value: 'kubernetes', label: 'Kubernetes', emoji: '☸️' },
        { value: 'kafka', label: 'Kafka', emoji: '📨' },
        { value: 'grpc', label: 'gRPC', emoji: '🔌' },
        { value: 'graphql', label: 'GraphQL', emoji: '📊' },
        { value: 'ai-apis', label: 'AI/ML APIs', emoji: '🤖' }
      ]
    },
    {
      id: 'constraints',
      question: 'Project constraints?',
      description: 'Any specific requirements',
      isMultiSelect: false,
      options: [
        { value: 'budget', label: 'Budget Conscious', emoji: '💰' },
        { value: 'security', label: 'Security Critical', emoji: '🔒' },
        { value: 'performance', label: 'Performance Critical', emoji: '⚡' },
        { value: 'none', label: 'No Constraints', emoji: '🆓' }
      ]
    },
    {
      id: 'timeAvailability',
      question: 'Project timeline?',
      description: 'Development duration',
      isMultiSelect: false,
      options: [
        { value: '2-months', label: '2 Months', emoji: '📆' },
        { value: '3-months', label: '3 Months', emoji: '🗓️' },
        { value: '6-months', label: '6 Months', emoji: '📅' },
        { value: 'ongoing', label: 'Ongoing', emoji: '♾️' }
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