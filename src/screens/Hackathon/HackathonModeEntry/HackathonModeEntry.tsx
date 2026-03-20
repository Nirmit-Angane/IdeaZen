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

            {/* Static Grid Pattern Background */}
            <div className="absolute inset-0 grid-pattern opacity-40"></div>

            <div className="container mx-auto max-w-3xl relative z-10">

                {/* Hackathon Badge */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22D3EE]/5 rounded-full border border-[#22D3EE]/20 mb-6">
                        <Zap className="w-4 h-4 text-[#22D3EE]" />
                        <span className="text-[#64748B] text-sm font-medium">
                            <span className="text-[#1F3C88]">Hackathon Mode</span> — Get your roadmap in 2 minutes
                        </span>
                    </div>

                    <h1 className="text-[#1F3C88] text-4xl lg:text-5xl font-bold mb-4">
                        What's Your Project Idea?
                    </h1>

                    <p className="text-lg text-slate-500 max-w-xl mx-auto font-regular">
                        Already have a hackathon project in mind? Let's create an execution-focused roadmap to help you win.
                    </p>
                </div>

                {/* Main Card */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">

                        {/* Icon Header */}
                        <div className="px-10 pt-10 pb-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                <Trophy className="w-8 h-8 text-[#1F3C88]" />
                            </div>
                            <h2 className="text-[#1F3C88] text-2xl font-medium mb-2">Enter Your Project Title</h2>
                            <p className="text-slate-500 text-sm font-regular">
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
                                            ? 'border-[#1F3C88] bg-slate-50/50 shadow-sm'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    autoFocus
                                />

                                {/* Character Counter */}
                                <div className="mt-2 flex items-center justify-between">
                                    <p className={`text-xs transition-colors duration-200 font-medium ${projectTitle.length >= 5 ? 'text-emerald-600' : 'text-slate-400'
                                        }`}>
                                        {projectTitle.length >= 5 ? '✓ Looks good!' : 'Minimum 5 characters'}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {projectTitle.length} characters
                                    </p>
                                </div>
                            </div>

                            {/* Examples */}
                            <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5 font-medium">
                                    <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                                    <span>Example Ideas:</span>
                                </p>
                                <div className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => setProjectTitle('Real-Time Collaboration Whiteboard')}
                                        className="block w-full text-left text-xs text-slate-500 hover:text-[#1F3C88] transition-colors duration-200"
                                    >
                                        → Real-Time Collaboration Whiteboard
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setProjectTitle('Smart Campus Navigation App')}
                                        className="block w-full text-left text-xs text-slate-500 hover:text-[#1F3C88] transition-colors duration-200"
                                    >
                                        → Smart Campus Navigation App
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setProjectTitle('Eco-Friendly Habit Tracker')}
                                        className="block w-full text-left text-xs text-slate-500 hover:text-[#1F3C88] transition-colors duration-200"
                                    >
                                        → Eco-Friendly Habit Tracker
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center gap-4 mb-8">
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-6 py-3.5 bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Back</span>
                        </button>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-sm ${isValid
                                    ? 'bg-[#1F3C88] text-white hover:bg-[#162a5f] hover:shadow-md hover:scale-[1.02]'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            <span className="text-sm font-medium">Continue to Questions</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Reassurance */}
                    <div className="text-center">
                        <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                            <span>We'll help you scope this down to a realistic MVP</span>
                        </p>
                    </div>
                </form>

            </div>
        </div>
    );
}
