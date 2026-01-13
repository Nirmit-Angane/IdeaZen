import { 
  Sparkles, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  ChevronRight,
  Zap,
  Award,
  Lightbulb
} from 'lucide-react';
import { GeneratedProject } from '../App';

interface IdeaPreviewProps {
  ideas: GeneratedProject[];
  onSelectIdea: (idea: GeneratedProject) => void;
}

export function IdeaPreview({ ideas, onSelectIdea }: IdeaPreviewProps) {
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': 
        return { 
          bg: 'bg-[#22D3EE]', 
          text: 'text-[#22D3EE]', 
          gradient: 'from-[#22D3EE] to-[#0ea5e9]'
        };
      case 'intermediate': 
        return { 
          bg: 'bg-[#1F3C88]', 
          text: 'text-[#1F3C88]', 
          gradient: 'from-[#1F3C88] to-[#3b5ba5]'
        };
      case 'advanced': 
        return { 
          bg: 'bg-[#7C6CF6]', 
          text: 'text-[#7C6CF6]', 
          gradient: 'from-[#7C6CF6] to-[#6558d3]'
        };
      default: 
        return { 
          bg: 'bg-gray-500', 
          text: 'text-gray-600', 
          gradient: 'from-gray-500 to-gray-600'
        };
    }
  };

  const getFeasibilityColor = (feasibility: 'High' | 'Medium' | 'Low') => {
    switch(feasibility) {
      case 'High': return { bg: 'bg-[#22C55E]/10', text: 'text-[#22C55E]', border: 'border-[#22C55E]/30' };
      case 'Medium': return { bg: 'bg-[#FACC15]/10', text: 'text-[#FACC15]', border: 'border-[#FACC15]/30' };
      case 'Low': return { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] via-white to-[#F7F9FC] relative overflow-hidden">
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#7C6CF6]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#22D3EE]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center sm:mb-16 mt-[0px] mr-[0px] mb-[24px] ml-[0px]">
          {/* AI Badge - Larger and more prominent */}
          <div className="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-gradient-to-r from-[#7C6CF6]/10 to-[#22D3EE]/10 border-2 border-[#7C6CF6]/30 rounded-2xl mb-6 shadow-md">
            <div className="w-8 h-8 bg-gradient-to-br from-[#7C6CF6] to-[#22D3EE] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-[#1F3C88]">AI-Generated Project Ideas</span>
          </div>
          
          <h1 className="sm:text-5xl lg:text-6xl text-[#1F3C88] mb-6 font-bold leading-tight text-[48px]">
            Choose Your <span className="bg-gradient-to-r from-[#7C6CF6] to-[#22D3EE] bg-clip-text text-transparent">Perfect Project</span>
          </h1>
          <p className="sm:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed text-[16px]">
            Based on your answers, here are <span className="font-semibold text-[#1F3C88]">{ideas.length} personalized project ideas</span>. Pick one to see the full plan.
          </p>
        </div>

        {/* Ideas Grid - Larger Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {ideas.map((idea, index) => {
            const difficultyColors = getDifficultyColor(idea.difficulty);
            const feasibilityColors = getFeasibilityColor(idea.feasibility);
            
            return (
              <div
                key={index}
                onClick={() => onSelectIdea(idea)}
                className="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-[#7C6CF6] transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-2xl hover:scale-[1.02]"
              >
                {/* Best Match Badge - Only first one */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#22C55E] text-white text-sm font-medium rounded-full shadow-lg">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                )}
                
                {/* Colored top border */}
                <div className={`h-1.5 bg-gradient-to-r ${difficultyColors.gradient}`}></div>
                
                <div className="p-6 sm:p-8">
                  
                  {/* Title & Quick Info */}
                  <div className="mb-5">
                    <h3 className="text-xl sm:text-2xl text-[#1F3C88] font-semibold mb-4 group-hover:text-[#7C6CF6] transition-colors pr-8 leading-tight">
                      {idea.title}
                    </h3>
                    
                    {/* Badges Row */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className={`px-4 py-1.5 ${difficultyColors.bg} text-white rounded-full text-sm font-medium`}>
                        {idea.difficulty}
                      </span>
                      <span className={`px-4 py-1.5 ${feasibilityColors.bg} ${feasibilityColors.text} border ${feasibilityColors.border} rounded-full text-sm font-medium`}>
                        {idea.feasibility} Feasibility
                      </span>
                    </div>

                    {/* Description - Larger text */}
                    <p className="text-base text-[#64748B] leading-relaxed line-clamp-2">
                      {idea.description}
                    </p>
                  </div>

                  {/* Compact Stats - 3 columns */}
                  <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#7C6CF6]">{idea.features.length}</div>
                      <div className="text-sm text-[#64748B] mt-1">Features</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#22D3EE]">{idea.roadmap.length}</div>
                      <div className="text-sm text-[#64748B] mt-1">Phases</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#22C55E]">{idea.confidence.split('%')[0]}%</div>
                      <div className="text-sm text-[#64748B] mt-1">Match</div>
                    </div>
                  </div>

                  {/* Top 3 Features Only */}
                  <div className="mb-5">
                    <div className="text-sm font-medium text-[#64748B] mb-3">Top Features:</div>
                    <div className="space-y-2">
                      {idea.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#334155] leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button - Larger */}
                  <button className="w-full px-5 py-3.5 bg-gradient-to-r from-[#1F3C88] to-[#7C6CF6] text-white rounded-xl group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-base font-medium">
                    <span>View Full Plan</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Text - Larger */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-3 bg-white border border-gray-200 rounded-xl text-base text-[#64748B] shadow-sm">
            <Lightbulb className="w-5 h-5 text-[#FACC15]" />
            <span>Click any card to see the complete project blueprint</span>
          </div>
        </div>

      </div>
    </div>
  );
}