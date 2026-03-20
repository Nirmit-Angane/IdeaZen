import { Zap, BookOpen, Check } from 'lucide-react';

interface ModeSelectionProps {
  onSelectMode: (mode: 'regular' | 'hackathon') => void;
}

export function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EEF2FF] to-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Choose Your Mode
          </h1>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            Select the experience that fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Regular Mode Card */}
          <button
            onClick={() => onSelectMode('regular')}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#1F3C88] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1F3C88]/5 to-[#7C6CF6]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1F3C88] to-[#7C6CF6] rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-[#0F172A] mb-3">
                Regular Mode
              </h2>
              
              <p className="text-[#475569] mb-6">
                Build at your pace
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#22C55E] mr-2 mt-0.5 shrink-0" />
                  <span className="text-[#475569]">Personalized project ideas</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#22C55E] mr-2 mt-0.5 shrink-0" />
                  <span className="text-[#475569]">Detailed learning roadmaps</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#22C55E] mr-2 mt-0.5 shrink-0" />
                  <span className="text-[#475569]">Tech stack recommendations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-[#22C55E] mr-2 mt-0.5 shrink-0" />
                  <span className="text-[#475569]">Self-paced development</span>
                </li>
              </ul>

              <div className="inline-block px-4 py-2 bg-[#1F3C88]/10 text-[#1F3C88] rounded-lg font-medium">
                Perfect for learning
              </div>
            </div>
          </button>

          {/* Hackathon Mode Card */}
          <button
            onClick={() => onSelectMode('hackathon')}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#FF6B35] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 to-[#FF4500]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FF4500] rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-[#0F172A] mb-3">
                Hackathon Mode
              </h2>
              
              <p className="text-[#475569] mb-6">
                Win hackathons under pressure
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Zap className="w-3.5 h-3.5 text-[#FF6B35] mr-2 mt-1 shrink-0" />
                  <span className="text-[#475569]">Problem statement analysis</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-3.5 h-3.5 text-[#FF6B35] mr-2 mt-1 shrink-0" />
                  <span className="text-[#475569]">Winning strategy generation</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-3.5 h-3.5 text-[#FF6B35] mr-2 mt-1 shrink-0" />
                  <span className="text-[#475569]">Hour-by-hour roadmap</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-3.5 h-3.5 text-[#FF6B35] mr-2 mt-1 shrink-0" />
                  <span className="text-[#475569]">Live progress tracking</span>
                </li>
              </ul>

              <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 text-[#FF6B35] rounded-lg font-medium">
                Perfect for competing
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
