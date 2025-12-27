import { Brain, Sparkles, Target, Code2, Zap, CheckCircle2, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

export function GeneratingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 1,
      icon: Brain,
      title: "Analyzing Your Inputs",
      description: "Processing your skill level, goals, and preferences",
      color: "from-[#7C6CF6] to-[#9B8CFF]",
      duration: 800
    },
    {
      id: 2,
      icon: Target,
      title: "Validating Feasibility",
      description: "Ensuring the project matches your time and expertise",
      color: "from-[#22C55E] to-[#16A34A]",
      duration: 700
    },
    {
      id: 3,
      icon: Zap,
      title: "Calculating Complexity",
      description: "Optimizing difficulty and learning impact",
      color: "from-[#FACC15] to-[#F59E0B]",
      duration: 600
    },
    {
      id: 4,
      icon: Code2,
      title: "Selecting Tech Stack",
      description: "Choosing the best technologies for your project",
      color: "from-[#1F3C88] to-[#2563EB]",
      duration: 700
    },
    {
      id: 5,
      icon: Lightbulb,
      title: "Crafting Your Blueprint",
      description: "Building a personalized roadmap for success",
      color: "from-[#22D3EE] to-[#06B6D4]",
      duration: 600
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Header with animated gradient */}
          <div className="relative bg-gradient-to-br from-[#1F3C88] via-[#7C6CF6] to-[#22D3EE] p-8 overflow-hidden">
            {/* Animated background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-700"></div>
            
            <div className="relative z-10 text-center">
              {/* AI Brain Icon with glow */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-white/30 rounded-3xl blur-2xl animate-pulse"></div>
                <div className="relative w-20 h-20 mx-auto bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl">
                  <Brain className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-3xl text-white mb-3 font-semibold">Generating Your Project Blueprint</h1>
              <p className="text-white/80">Our AI is crafting the perfect project for you...</p>
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
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#7C6CF6] via-[#22D3EE] to-[#22C55E] rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#7C6CF6]/5 to-[#22D3EE]/5 border-[#7C6CF6]/30 shadow-lg scale-105'
                        : isCompleted
                        ? 'bg-[#22C55E]/5 border-[#22C55E]/30'
                        : 'bg-gray-50/50 border-gray-100'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? `bg-gradient-to-br ${step.color} shadow-lg animate-pulse`
                        : isCompleted
                        ? 'bg-[#22C55E] shadow-md'
                        : 'bg-gray-200'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={`w-6 h-6 ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold mb-1 transition-colors ${
                        isActive ? 'text-[#1F3C88]' : isCompleted ? 'text-[#22C55E]' : 'text-[#94A3B8]'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm transition-colors ${
                        isActive || isCompleted ? 'text-[#64748B]' : 'text-[#94A3B8]'
                      }`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Status Indicator */}
                    {isActive && (
                      <div className="flex-shrink-0">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[#7C6CF6] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#7C6CF6] rounded-full animate-bounce delay-150"></div>
                          <div className="w-2 h-2 bg-[#7C6CF6] rounded-full animate-bounce delay-300"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* AI Personality Touch */}
            <div className="bg-gradient-to-br from-[#F3F1FF] to-[#ECFEFF] rounded-2xl p-6 border border-[#7C6CF6]/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7C6CF6] to-[#22D3EE] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[#1F3C88] font-medium mb-1">AI Mentor Tip</p>
                  <p className="text-[#64748B] text-sm">
                    {currentStep < 2 && "I'm analyzing hundreds of project patterns to find your perfect match..."}
                    {currentStep >= 2 && currentStep < 4 && "Balancing challenge with achievability is key to great learning..."}
                    {currentStep >= 4 && "Almost there! Crafting a roadmap that sets you up for success..."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Fun fact at bottom */}
        <div className="mt-6 text-center">
          <p className="text-[#94A3B8] text-sm">
            ✨ Did you know? We analyze over 50+ factors to create your personalized project
          </p>
        </div>

      </div>
    </div>
  );
}