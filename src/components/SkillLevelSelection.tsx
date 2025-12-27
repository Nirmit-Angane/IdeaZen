import { Rocket, Code2, Cpu, ArrowRight, Sparkles, Star } from 'lucide-react';
import { SkillLevel } from '../types';

interface SkillLevelSelectionProps {
  onSelectLevel: (level: SkillLevel) => void;
}

export function SkillLevelSelection({ onSelectLevel }: SkillLevelSelectionProps) {
  const levels = [
    {
      id: 'Beginner' as SkillLevel,
      icon: Rocket,
      title: 'Beginner',
      description: 'Learning to code',
      isRecommended: true,
      color: 'from-[#3EC1D3] to-[#2a9ca9]'
    },
    {
      id: 'Intermediate' as SkillLevel,
      icon: Code2,
      title: 'Intermediate',
      description: 'Built a few projects',
      isRecommended: false,
      color: 'from-[#1F3C88] to-[#2d5ac9]'
    },
    {
      id: 'Advanced' as SkillLevel,
      icon: Cpu,
      title: 'Advanced',
      description: 'Professional experience',
      isRecommended: false,
      color: 'from-[#9B8CFF] to-[#7c6fd9]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white py-16 px-4 relative overflow-hidden">

      {/* Animated Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-40"></div>

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* AI Recommendation Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#9B8CFF]/10 to-[#3EC1D3]/10 rounded-full border border-[#9B8CFF]/30 mb-6">
            <Sparkles className="w-4 h-4 text-[#9B8CFF]" />
            <span className="text-[#666]">Based on most students, we recommend <span className="text-[#9B8CFF]">Beginner</span></span>
          </div>

          <h1 className="text-[#1F3C88] text-4xl lg:text-5xl mb-4">
            What's Your Skill Level?
          </h1>

          <p className="text-lg text-[#666] max-w-xl mx-auto">
            This helps the AI adapt every question to your experience
          </p>
        </div>

        {/* Skill Level Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {levels.map((level) => {
            const Icon = level.icon;

            return (
              <button
                key={level.id}
                onClick={() => onSelectLevel(level.id)}
                className={`group relative bg-white rounded-2xl p-6 border-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-left ${level.isRecommended
                  ? 'border-[#9B8CFF] scale-105 shadow-lg'
                  : 'border-gray-200 hover:border-[#3EC1D3]'
                  }`}
              >
                {/* Recommended Badge */}
                {level.isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#9B8CFF] to-[#7c6fd9] text-white text-xs rounded-full shadow-lg">
                      <Star className="w-3 h-3 fill-white" />
                      <span>Recommended</span>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title & Description */}
                <h2 className="text-[#1F3C88] text-2xl mb-2">{level.title}</h2>
                <p className="text-[#666] mb-6">{level.description}</p>

                {/* CTA */}
                <div className={`flex items-center gap-2 text-[#1F3C88] group-hover:gap-3 transition-all duration-300 ${level.isRecommended ? 'text-[#9B8CFF]' : ''
                  }`}>
                  <span>Start with {level.title}</span>
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Glow effect for recommended */}
                {level.isRecommended && (
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#9B8CFF] to-[#3EC1D3] rounded-2xl blur-lg opacity-30 -z-10"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Reassurance Message */}
        <div className="text-center">
          <p className="text-sm text-[#999]">
            💡 Don't worry — you can always change this later with the AI
          </p>
        </div>

        {/* AI Conversational Moment */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-start gap-3 px-6 py-4 bg-gradient-to-r from-[#3EC1D3]/10 to-[#9B8CFF]/10 rounded-2xl border border-[#3EC1D3]/30 max-w-md">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3EC1D3] to-[#9B8CFF] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🤖</span>
            </div>
            <p className="text-sm text-[#666] leading-relaxed">
              Not sure? Choose <span className="text-[#9B8CFF]">Beginner</span> — I'll adjust everything automatically based on this choice. You can relax.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}