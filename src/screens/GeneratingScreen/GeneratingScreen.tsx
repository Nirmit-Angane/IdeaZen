import { Brain, Sparkles, Target, Code2, Zap, CheckCircle2, Lightbulb, FileText, Layers, Rocket, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GeneratingScreenProps {
  mode?: 'ideas' | 'blueprint';
  error?: string | null;
  onRetry?: () => void;
  onTryDifferentFlow?: () => void;
}

export function GeneratingScreen({ mode = 'ideas', error, onRetry, onTryDifferentFlow }: GeneratingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Different steps based on mode
  const ideasSteps = [
    {
      id: 1,
      icon: Brain,
      title: "Analyzing Your Inputs",
      description: "Processing your skill level, goals, and preferences",
      color: "from-[#1F3C88] to-[#2563EB]",
    },
    {
      id: 2,
      icon: Target,
      title: "Validating Feasibility",
      description: "Ensuring projects match your time and expertise",
      color: "from-[#22C55E] to-[#16A34A]",
    },
    {
      id: 3,
      icon: Zap,
      title: "Calculating Complexity",
      description: "Optimizing difficulty and learning impact",
      color: "from-[#22D3EE] to-[#06B6D4]",
    },
    {
      id: 4,
      icon: Code2,
      title: "Generating Ideas",
      description: "Creating personalized project concepts",
      color: "from-[#1F3C88] to-[#2563EB]",
    },
    {
      id: 5,
      icon: Lightbulb,
      title: "Ranking Matches",
      description: "Selecting the best projects for you",
      color: "from-[#22D3EE] to-[#06B6D4]",
    }
  ];

  const blueprintSteps = [
    {
      id: 1,
      icon: Brain,
      title: "Understanding Project",
      description: "Analyzing your selected idea in depth",
      color: "from-[#1F3C88] to-[#2563EB]",
    },
    {
      id: 2,
      icon: Layers,
      title: "Building Roadmap",
      description: "Creating detailed phase-by-phase plan",
      color: "from-[#22D3EE] to-[#06B6D4]",
    },
    {
      id: 3,
      icon: Code2,
      title: "Selecting Tech Stack",
      description: "Choosing optimal technologies",
      color: "from-[#1F3C88] to-[#2563EB]",
    },
    {
      id: 4,
      icon: FileText,
      title: "Crafting Features",
      description: "Defining detailed feature specifications",
      color: "from-[#22D3EE] to-[#06B6D4]",
    },
    {
      id: 5,
      icon: Rocket,
      title: "Finalizing Blueprint",
      description: "Compiling your complete project plan",
      color: "from-[#22C55E] to-[#16A34A]",
    }
  ];

  const steps = mode === 'ideas' ? ideasSteps : blueprintSteps;
  const headerText = mode === 'ideas' 
    ? { title: "Generating Project Ideas", subtitle: "Our AI is creating personalized project options..." }
    : { title: "Creating Detailed Blueprint", subtitle: "Building your complete project roadmap..." };
  const tipText = mode === 'ideas'
    ? {
        early: "Analyzing hundreds of project patterns to find your perfect match...",
        mid: "Balancing challenge with achievability for optimal learning...",
        late: "Almost there! Selecting the best matches for you..."
      }
    : {
        early: "Deep-diving into your selected project concept...",
        mid: "Structuring a comprehensive development roadmap...",
        late: "Finalizing your complete blueprint with all details..."
      };

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full">
          <div className="bg-white rounded-3xl shadow-xl border border-red-100 overflow-hidden text-center p-8 space-y-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-[#1F3C88] mb-2">Generation Failed</h2>
              <p className="text-[#64748B]">{error}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="w-full sm:w-auto px-8 py-3 flex-1 bg-[#1F3C88] text-white rounded-xl shadow-lg hover:bg-[#1A3273] transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
              )}
              {onTryDifferentFlow && (
                <button
                  onClick={onTryDifferentFlow}
                  className="w-full sm:w-auto px-8 py-3 flex-1 bg-white text-[#1F3C88] border-2 border-[#1F3C88] rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Go Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header with subtle tint */}
          <div className="relative bg-white border-b border-slate-200 p-8 overflow-hidden">
            {/* Animated background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-50 rounded-full blur-2xl animate-pulse delay-700"></div>
            
            <div className="relative z-10 text-center">
              {/* AI Brain Icon with glow */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-cyan-100/50 rounded-2xl blur-xl"></div>
                <div className="relative w-16 h-16 mx-auto bg-white border-2 border-cyan-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <Brain className="w-8 h-8 text-cyan-600" />
                </div>
              </div>
              
              <h1 className="text-2xl text-slate-900 mb-2 font-semibold">{headerText.title}</h1>
              <p className="text-slate-500 text-sm">{headerText.subtitle}</p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="p-8 space-y-8">
            
            {/* Overall Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-[#64748B] font-medium">Overall Progress</span>
                <span className="text-sm text-[#1F3C88] font-bold">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>

            {/* Horizontal Steps Timeline */}
            <div className="relative">
              {/* Progress Line - Hidden on mobile, shown on desktop */}
              <div className="hidden sm:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] transition-all duration-500"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Steps - Horizontal on desktop, vertical on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2 relative">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  
                  return (
                    <div key={step.id} className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
                      {/* Icon Circle */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 flex-shrink-0 ${
                        isActive
                          ? `bg-gradient-to-br ${step.color} shadow-lg ring-4 ring-white`
                          : isCompleted
                          ? 'bg-[#22C55E] shadow-md'
                          : 'bg-white border-2 border-gray-200'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        )}
                      </div>

                      {/* Step Info */}
                      <div className="sm:mt-3 text-left sm:text-center flex-1 sm:flex-none sm:max-w-[120px]">
                        <h3 className={`text-sm sm:text-xs font-semibold mb-1 transition-colors ${
                          isActive ? 'text-[#1F3C88]' : isCompleted ? 'text-[#22C55E]' : 'text-[#94A3B8]'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-xs text-[#64748B] sm:hidden ${isActive ? 'block' : 'hidden'}`}>
                          {step.description}
                        </p>
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <div className="flex gap-1 justify-start sm:justify-center mt-2">
                            <div className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full animate-bounce delay-150"></div>
                            <div className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full animate-bounce delay-300"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Mentor Tip - Compact */}
            <div className="bg-slate-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-[#1F3C88]" />
                </div>
                <p className="text-[#64748B] text-sm">
                  {currentStep < 2 && tipText.early}
                  {currentStep >= 2 && currentStep < 4 && tipText.mid}
                  {currentStep >= 4 && tipText.late}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Fun fact at bottom */}
        <div className="mt-4 text-center">
          <p className="text-[#94A3B8] text-sm">
            ✨ We analyze 50+ factors to create your personalized project
          </p>
        </div>

      </div>
    </div>
  );
}