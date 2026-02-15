import { useState } from 'react';
import { Trophy, ArrowRight, ChevronLeft, Sparkles, Zap } from 'lucide-react';

interface HackathonModeEntryProps {
    onContinue: (projectTitle: string) => void;
    onBack: () => void;
}

export function HackathonModeEntry({ onContinue, onBack }: HackathonModeEntryProps) {
    const [projectTitle, setProjectTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const isValid = projectTitle.trim().length >= 5;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onContinue(projectTitle.trim());
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white py-16 px-4 relative overflow-hidden">

            <style>
                {`
          @keyframes gridMove {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(55px, 55px);
            }
          }

          .grid-pattern {
            background-color: transparent;
            background-image: 
              linear-gradient(0deg, transparent 24%, rgba(31, 60, 136, 0.08) 25%, rgba(31, 60, 136, 0.08) 26%, transparent 27%, transparent 74%, rgba(31, 60, 136, 0.08) 75%, rgba(31, 60, 136, 0.08) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(124, 108, 246, 0.08) 25%, rgba(124, 108, 246, 0.08) 26%, transparent 27%, transparent 74%, rgba(124, 108, 246, 0.08) 75%, rgba(124, 108, 246, 0.08) 76%, transparent 77%, transparent);
            background-size: 55px 55px;
            animation: gridMove 20s linear infinite;
            pointer-events: none;
          }
        `}
            </style>

            {/* Animated Grid Pattern Background */}
            <div className="absolute inset-0 grid-pattern opacity-40"></div>

            <div className="container mx-auto max-w-3xl relative z-10">

                {/* Hackathon Badge */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FACC15]/10 to-[#22D3EE]/10 rounded-full border border-[#FACC15]/30 mb-6">
                        <Zap className="w-4 h-4 text-[#FACC15]" />
                        <span className="text-[#666]">
                            <span className="text-[#1F3C88] font-medium">Hackathon Mode</span> — Get your roadmap in 2 minutes
                        </span>
                    </div>

                    <h1 className="text-[#1F3C88] text-4xl lg:text-5xl mb-4">
                        What's Your Project Idea?
                    </h1>

                    <p className="text-lg text-[#666] max-w-xl mx-auto">
                        Already have a hackathon project in mind? Let's create an execution-focused roadmap to help you win.
                    </p>
                </div>

                {/* Main Card */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">

                        {/* Icon Header */}
                        <div className="px-10 pt-10 pb-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FACC15] to-[#22D3EE] flex items-center justify-center">
                                <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-[#1F3C88] text-2xl mb-2">Enter Your Project Title</h2>
                            <p className="text-[#64748B] text-sm">
                                This will be the centerpiece of your hackathon submission
                            </p>
                        </div>

                        {/* Input Section */}
                        <div className="px-10 pb-10">
                            <div className={`relative transition-all duration-200 ${isFocused ? 'scale-[1.01]' : ''}`}>
                                <input
                                    type="text"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="e.g., AI-Powered Study Companion for Students"
                                    className={`w-full px-6 py-4 text-lg rounded-xl border-2 transition-all duration-200 outline-none ${isFocused
                                            ? 'border-[#1F3C88] bg-[#1F3C88]/5 shadow-md'
                                            : 'border-gray-200 hover:border-[#1F3C88]/40'
                                        }`}
                                    autoFocus
                                />

                                {/* Character Counter */}
                                <div className="mt-2 flex items-center justify-between">
                                    <p className={`text-xs transition-colors duration-200 ${projectTitle.length >= 5 ? 'text-[#22C55E]' : 'text-[#94A3B8]'
                                        }`}>
                                        {projectTitle.length >= 5 ? '✓ Looks good!' : 'Minimum 5 characters'}
                                    </p>
                                    <p className="text-xs text-[#94A3B8]">
                                        {projectTitle.length} characters
                                    </p>
                                </div>
                            </div>

                            {/* Examples */}
                            <div className="mt-6 p-4 bg-[#F7F9FC] rounded-xl">
                                <p className="text-xs text-[#64748B] mb-2 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-[#7C6CF6]" />
                                    <span className="font-medium">Example Ideas:</span>
                                </p>
                                <div className="space-y-1">
                                    <button
                                        type="button"
                                        onClick={() => setProjectTitle('Real-Time Collaboration Whiteboard')}
                                        className="block w-full text-left text-xs text-[#64748B] hover:text-[#1F3C88] transition-colors duration-200"
                                    >
                                        → Real-Time Collaboration Whiteboard
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setProjectTitle('Smart Campus Navigation App')}
                                        className="block w-full text-left text-xs text-[#64748B] hover:text-[#1F3C88] transition-colors duration-200"
                                    >
                                        → Smart Campus Navigation App
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setProjectTitle('Eco-Friendly Habit Tracker')}
                                        className="block w-full text-left text-xs text-[#64748B] hover:text-[#1F3C88] transition-colors duration-200"
                                    >
                                        → Eco-Friendly Habit Tracker
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center gap-4 mb-6">
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-6 py-3.5 bg-white text-[#64748B] border border-gray-200 hover:border-[#1F3C88] hover:text-[#1F3C88] hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Back</span>
                        </button>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg ${isValid
                                    ? 'bg-gradient-to-r from-[#FACC15] to-[#22D3EE] text-white hover:shadow-xl hover:scale-[1.02]'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                }`}
                        >
                            <span className="text-sm font-medium">Continue to Questions</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Reassurance */}
                    <div className="text-center">
                        <p className="text-xs text-[#94A3B8] flex items-center justify-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#7C6CF6]" />
                            <span>We'll help you scope this down to a realistic MVP</span>
                        </p>
                    </div>
                </form>

            </div>
        </div>
    );
}
