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
import { GeneratedProject } from '../../types/project.types';

interface IdeaPreviewProps {
  ideas: GeneratedProject[];
  onSelectIdea: (idea: GeneratedProject) => void;
}

export function IdeaPreview({ ideas, onSelectIdea }: IdeaPreviewProps) {

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return {
          bg: 'bg-[#22D3EE]/10',
          text: 'text-[#0891B2]',
          border: 'border-[#22D3EE]/30'
        };
      case 'intermediate':
        return {
          bg: 'bg-[#1F3C88]/10',
          text: 'text-[#1F3C88]',
          border: 'border-[#1F3C88]/30'
        };
      case 'advanced':
        return {
          bg: 'bg-[#475569]/10',
          text: 'text-[#475569]',
          border: 'border-[#475569]/30'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-200'
        };
    }
  };

  const getFeasibilityColor = (feasibility: 'High' | 'Medium' | 'Low') => {
    switch (feasibility) {
      case 'High': return { bg: 'bg-[#22C55E]/10', text: 'text-[#22C55E]', border: 'border-[#22C55E]/30' };
      case 'Medium': return { bg: 'bg-[#1F3C88]/5', text: 'text-[#1F3C88]', border: 'border-[#1F3C88]/20' };
      case 'Low': return { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200' };
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">

      {/* Static Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#1F3C88 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          {/* AI Badge - Flat design */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#22D3EE]/10 border border-[#22D3EE]/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#0891B2]" />
            <span className="text-sm font-medium text-[#0891B2]">AI-Generated Project Ideas</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#1F3C88] mb-6 font-bold tracking-tight">
            Choose Your <span className="text-[#22D3EE]">Perfect Project</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Based on your profile, here are <span className="font-semibold text-[#1F3C88]">{ideas.length} personalized project ideas</span>. Pick one to see the full blueprint.
          </p>
        </div>

        {/* Ideas Grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ideas.map((idea, index) => {
            const difficultyColors = getDifficultyColor(idea.difficulty);
            const feasibilityColors = getFeasibilityColor(idea.feasibility);

            return (
              <div
                key={index}
                onClick={() => onSelectIdea(idea)}
                className="group relative bg-white rounded-2xl border-t-[4px] border-t-[#22D3EE] border border-slate-200 hover:border-[#1F3C88] transition-all duration-200 cursor-pointer shadow-sm"
              >
                <div className="p-8 h-full flex flex-col pt-10">
                  {/* Best Match Badge - Inline above title */}
                  {index === 0 && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg mb-3 self-start border border-emerald-500/20">
                      <Award className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Best Match</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl text-[#1F3C88] font-semibold mb-4 group-hover:text-[#1F3C88] transition-colors leading-snug">
                    {idea.title}
                  </h3>

                  {/* Badges Row - Flat variants */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className={`px-2.5 py-1 ${difficultyColors.bg} border ${difficultyColors.border} ${difficultyColors.text} rounded-lg text-[11px] font-bold uppercase tracking-wider`}>
                      {idea.difficulty}
                    </span>
                    <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
                      · {idea.matchBreakdown?.overall || 90}% match · {idea.roadmap?.length || 4} phases
                    </span>
                  </div>

                  {/* Description - Prioritize Real World Comparison */}
                  <div className="mb-8 flex-1">
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      <span className="font-bold text-[#1F3C88]">Core Concept:</span> {idea.realWorldComparison || idea.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    {/* CTA Button - Clean Outlined Navy */}
                    <div className="w-full px-5 py-3 bg-white text-[#1F3C88] border-2 border-[#1F3C88] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-bold group-hover:bg-[#1F3C88] group-hover:text-white">
                      <span>Explore Blueprint</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper - Flat */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-500 shadow-sm">
            <Lightbulb className="w-5 h-5 text-[#22D3EE]" />
            <span className="text-sm font-medium">Click any card to explore the complete technical roadmap</span>
          </div>
        </div>

      </div>
    </div>
  );
}