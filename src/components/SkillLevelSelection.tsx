import {
  Rocket,
  Code2,
  Cpu,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import { SkillLevel } from "../App";

interface SkillLevelSelectionProps {
  onSelectLevel: (level: SkillLevel) => void;
}

export function SkillLevelSelection({
  onSelectLevel,
}: SkillLevelSelectionProps) {
  const levels = [
    {
      id: "beginner" as SkillLevel,
      icon: Rocket,
      title: "Beginner",
      description: "Learning to code",
      isRecommended: true,
      color: "from-[#3EC1D3] to-[#2a9ca9]",
    },
    {
      id: "intermediate" as SkillLevel,
      icon: Code2,
      title: "Intermediate",
      description: "Built a few projects",
      isRecommended: false,
      color: "from-[#1F3C88] to-[#2d5ac9]",
    },
    {
      id: "advanced" as SkillLevel,
      icon: Cpu,
      title: "Advanced",
      description: "Professional experience",
      isRecommended: false,
      color: "from-[#9B8CFF] to-[#7c6fd9]",
    },
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
            <span className="text-[#666]">
              Based on most students, we recommend{" "}
              <span className="text-[#9B8CFF]">Beginner</span>
            </span>
          </div>

          <h1 className="text-[#1F3C88] text-4xl lg:text-5xl mb-4">
            What's Your Skill Level?
          </h1>

          <p className="text-lg text-[#666] max-w-xl mx-auto">
            This helps the AI adapt every question to your
            experience
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
                className={`group relative bg-white rounded-2xl p-6 border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left ${
                  level.isRecommended
                    ? "border-[#1F3C88] shadow-md"
                    : "border-gray-200 hover:border-[#1F3C88]/50"
                }`}
              >
                {/* Recommended Badge */}
                {level.isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F3C88] text-white text-xs font-medium rounded-full shadow-md">
                      <Star className="w-3 h-3 fill-white" />
                      <span>Recommended</span>
                    </div>
                  </div>
                )}

                {/* Icon - More minimal */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title & Description */}
                <h2 className="text-[#1F3C88] text-xl font-semibold mb-2">
                  {level.title}
                </h2>
                <p className="text-[#64748B] text-sm mb-6">
                  {level.description}
                </p>

                {/* CTA - Simplified */}
                <div
                  className={`flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300 ${
                    level.isRecommended ? "text-[#1F3C88]" : "text-[#64748B] group-hover:text-[#1F3C88]"
                  }`}
                >
                  <span>Choose {level.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Reassurance Message - Now Highlighted */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#22C55E]/10 to-[#22D3EE]/10 rounded-xl border-2 border-[#22C55E]/30 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#22C55E]" />
            <p className="text-sm text-[#1F3C88]">
              Don't worry — you can always change this later
              with the AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}