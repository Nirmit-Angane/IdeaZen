import {
  Rocket,
  Code2,
  Cpu,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import { SkillLevel } from "../../types/project.types";

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
    },
    {
      id: "intermediate" as SkillLevel,
      icon: Code2,
      title: "Intermediate",
      description: "Built a few projects",
      isRecommended: false,
    },
    {
      id: "advanced" as SkillLevel,
      icon: Cpu,
      title: "Advanced",
      description: "Professional experience",
      isRecommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 relative overflow-hidden">
      {/* Static Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-40"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* AI Recommendation Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EEF2FF] rounded-full border border-[#1F3C88]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#1F3C88]" />
            <span className="text-slate-600">
              Based on most students, we recommend{" "}
              <span className="text-[#1F3C88] font-semibold">Beginner</span>
            </span>
          </div>

          <h1 className="text-[#1F3C88] text-4xl lg:text-5xl font-bold mb-4">
            What's Your Skill Level?
          </h1>

          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            This helps the AI adapt every question to your
            experience
          </p>
        </div>

        {/* Skill Level Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {levels.map((level) => {
            const Icon = level.icon;
            const isBeginner = level.id === 'beginner';
            const isIntermediate = level.id === 'intermediate';
            const isAdvanced = level.id === 'advanced';

            let accentColor = "bg-[#1F3C88]";
            if (isBeginner) accentColor = "bg-[#22D3EE]";
            if (isAdvanced) accentColor = "bg-slate-700";

            return (
              <button
                key={level.id}
                onClick={() => onSelectLevel(level.id)}
                className={`group relative bg-white rounded-2xl p-6 border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left ${
                  level.isRecommended
                    ? "border-[#1F3C88] shadow-md"
                    : "border-slate-200 hover:border-[#1F3C88]/50"
                }`}
              >
                {/* Recommended Badge */}
                {level.isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F3C88] text-white text-xs font-semibold rounded-full shadow-md">
                      <Star className="w-3 h-3 fill-white" />
                      <span>Recommended</span>
                    </div>
                  </div>
                )}

                {/* Icon - Minimal solid background */}
                <div
                  className={`w-12 h-12 rounded-xl ${accentColor} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-sm`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title & Description */}
                <h2 className="text-[#1F3C88] text-xl font-bold mb-2">
                  {level.title}
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  {level.description}
                </p>

                {/* CTA - Simplified */}
                <div
                  className={`flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300 ${
                    level.isRecommended ? "text-[#1F3C88]" : "text-slate-600 group-hover:text-[#1F3C88]"
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
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-50 rounded-xl border-2 border-emerald-100 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <p className="text-sm text-slate-700">
              Don't worry — you can always change this later
              with the AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}