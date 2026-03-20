import {
    Trophy,
    Clock,
    Target,
    AlertTriangle,
    CheckCircle2,
    Users,
    Zap,
    TrendingUp,
    Download,
    Home,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Sparkles,
    Brain,
    Lightbulb,
    Shield,
    Check,
    Bookmark,
    Share2,
    RefreshCw,
    UserPlus,
    ArrowDown
} from 'lucide-react';
import { HackathonRoadmap } from '../App';
import { useState } from 'react';

interface HackathonRoadmapOutputProps {
    roadmap: HackathonRoadmap;
    onAdjustTimeline: () => void;
    onSimplifyScope: () => void;
    onAddTeamMember: () => void;
    onGenerateNew: () => void;
    onStartOver: () => void;
}

export function HackathonRoadmapOutput({
    roadmap,
    onAdjustTimeline,
    onSimplifyScope,
    onAddTeamMember,
    onGenerateNew,
    onStartOver
}: HackathonRoadmapOutputProps) {
    const [isSaved, setIsSaved] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        roadmap: true,
        mvp: true,
        risks: true,
        checklist: true
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleSave = () => {
        const savedRoadmaps = JSON.parse(localStorage.getItem('savedHackathonRoadmaps') || '[]');
        savedRoadmaps.push({ ...roadmap, savedAt: new Date().toISOString() });
        localStorage.setItem('savedHackathonRoadmaps', JSON.stringify(savedRoadmaps));
        setIsSaved(true);
    };

    const handleShare = () => {
        const shareUrl = `${window.location.origin}/hackathon/${roadmap.title.toLowerCase().replace(/\s+/g, '-')}`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareUrl)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                });
        }
    };

    const handleDownloadPDF = () => {
        alert('PDF download functionality would be implemented here!');
    };

    const getFeasibilityColor = (feasibility: string) => {
        return feasibility === 'High'
            ? { bg: 'bg-[#22C55E]', gradient: 'from-[#22C55E] to-[#16a34a]', border: 'border-[#22C55E]' }
            : { bg: 'bg-[#FACC15]', gradient: 'from-[#FACC15] to-[#f59e0b]', border: 'border-[#FACC15]' };
    };

    const feasibilityColors = getFeasibilityColor(roadmap.feasibility);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">

            {/* Sticky Top Navigation Bar */}
            <div className="sticky top-20 lg:top-24 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* Left: Breadcrumb */}
                        <div className="flex items-center gap-2 min-w-0">
                            <button
                                onClick={onStartOver}
                                className="text-sm text-[#64748B] hover:text-[#1F3C88] transition-colors flex items-center gap-1.5 flex-shrink-0"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Home</span>
                            </button>
                            <ChevronRight className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                            <span className="text-sm text-[#1F3C88] font-medium truncate">
                                {roadmap.title}
                            </span>
                        </div>

                        {/* Right: Quick Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleSave}
                                className={`px-3 py-1.5 rounded-lg transition-all text-sm flex items-center gap-1.5 ${isSaved
                                        ? 'bg-[#22C55E] text-white'
                                        : 'bg-gray-100 text-[#64748B] hover:bg-gray-200'
                                    }`}
                            >
                                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
                            </button>
                            <button
                                onClick={handleShare}
                                className="px-3 py-1.5 bg-gray-100 text-[#64748B] hover:bg-gray-200 rounded-lg transition-all text-sm flex items-center gap-1.5"
                            >
                                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                                <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Share'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Hero Header */}
                <div className="mb-8">
                    <div className={`bg-gradient-to-br ${feasibilityColors.gradient} rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden`}>
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>

                        <div className="relative z-10">
                            {/* Hackathon Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full text-sm mb-4 border border-white/40 shadow-lg">
                                <Trophy className="w-4 h-4" />
                                <span className="font-semibold">Hackathon Roadmap</span>
                            </div>

                            {/* Project Title */}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
                                {roadmap.title}
                            </h1>

                            {/* Key Stats */}
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-md">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{roadmap.timeline}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-md">
                                    <Target className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{roadmap.feasibility} Feasibility</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-md">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm font-semibold">{roadmap.roadmap.length} Phases</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Main Content - Left 2/3 */}
                    <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">

                        {/* Strategic Analysis */}
                        <div className="bg-gradient-to-br from-[#7C6CF6]/10 to-[#22D3EE]/10 rounded-2xl p-6 border-2 border-[#7C6CF6]/30">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#7C6CF6] to-[#22D3EE] rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-[#1F3C88] mb-2">AI Strategic Analysis</h3>
                                    <p className="text-[#334155] leading-relaxed mb-4">
                                        {roadmap.strategicAnalysis.achievability}
                                    </p>

                                    {roadmap.strategicAnalysis.skillGaps.length > 0 && (
                                        <div className="mt-4 p-4 bg-white/60 rounded-xl">
                                            <p className="text-sm font-medium text-[#64748B] mb-2">Detected Skill Gaps:</p>
                                            <div className="space-y-2">
                                                {roadmap.strategicAnalysis.skillGaps.map((gap, i) => (
                                                    <div key={i} className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-[#FACC15] flex-shrink-0 mt-0.5" />
                                                        <div>
                                                            <span className="text-sm text-[#334155] font-medium">{gap}</span>
                                                            <p className="text-xs text-[#64748B] mt-1">
                                                                → {roadmap.strategicAnalysis.mitigations[i]}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Hour-by-Hour Roadmap */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('roadmap')}
                                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#FACC15]/5 to-transparent hover:from-[#FACC15]/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#FACC15] to-[#f59e0b] rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1F3C88]">Hour-by-Hour Execution Plan</h2>
                                    <span className="text-sm text-[#64748B]">({roadmap.roadmap.length} phases)</span>
                                </div>
                                {expandedSections.roadmap ? (
                                    <ChevronUp className="w-5 h-5 text-[#64748B]" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-[#64748B]" />
                                )}
                            </button>

                            {expandedSections.roadmap && (
                                <div className="px-6 py-4 border-t border-gray-100">
                                    <div className="space-y-4">
                                        {roadmap.roadmap.map((phase, index) => (
                                            <div key={index} className="relative">
                                                {/* Connecting Line */}
                                                {index < roadmap.roadmap.length - 1 && (
                                                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-[#FACC15] to-transparent"></div>
                                                )}

                                                <div className="flex gap-4 p-4 bg-[#F8FAFC] rounded-xl hover:shadow-md transition-shadow">
                                                    {/* Phase Badge */}
                                                    <div className={`w-12 h-12 bg-gradient-to-br ${feasibilityColors.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
                                                        {index + 1}
                                                    </div>

                                                    {/* Phase Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-[#1F3C88] text-lg mb-3">{phase.phase}</h4>
                                                        <div className="space-y-2">
                                                            {phase.tasks.map((task, taskIndex) => (
                                                                <div key={taskIndex} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                                                                    <div className="w-6 h-6 bg-[#22D3EE] rounded-lg flex items-center justify-center flex-shrink-0">
                                                                        <Check className="w-4 h-4 text-white" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="text-[#334155] text-sm leading-relaxed">{task.task}</p>
                                                                        <div className="flex items-center gap-3 mt-1">
                                                                            <span className="text-xs text-[#7C6CF6] font-medium">
                                                                                👤 {task.assignedTo}
                                                                            </span>
                                                                            <span className="text-xs text-[#64748B]">
                                                                                ⏱️ {task.duration}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* MVP Scope */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('mvp')}
                                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#22C55E]/5 to-transparent hover:from-[#22C55E]/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#22C55E] to-[#16a34a] rounded-lg flex items-center justify-center">
                                        <Target className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1F3C88]">Critical MVP Scope</h2>
                                </div>
                                {expandedSections.mvp ? (
                                    <ChevronUp className="w-5 h-5 text-[#64748B]" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-[#64748B]" />
                                )}
                            </button>

                            {expandedSections.mvp && (
                                <div className="px-6 py-4 border-t border-gray-100 space-y-5">
                                    <div>
                                        <div className="text-sm text-[#22C55E] font-medium mb-3 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Must-Have Features
                                        </div>
                                        <div className="space-y-2">
                                            {roadmap.mvpScope.mustHave.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-[#22C55E]/5 rounded-lg">
                                                    <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                                                    <span className="text-[#334155]">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-[#64748B] font-medium mb-3">
                                            Nice-to-Have (If Time Permits)
                                        </div>
                                        <div className="space-y-2">
                                            {roadmap.mvpScope.niceToHave.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <Sparkles className="w-5 h-5 text-[#64748B] flex-shrink-0 mt-0.5" />
                                                    <span className="text-[#64748B]">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-[#94A3B8] font-medium mb-3">
                                            Cut If Behind Schedule
                                        </div>
                                        <div className="space-y-2">
                                            {roadmap.mvpScope.cutIfNeeded.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg opacity-60">
                                                    <ArrowDown className="w-5 h-5 text-[#94A3B8] flex-shrink-0 mt-0.5" />
                                                    <span className="text-[#94A3B8] line-through">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Risks & Mitigation */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('risks')}
                                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-amber-500/5 to-transparent hover:from-amber-500/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1F3C88]">Risk Points & Mitigation</h2>
                                    <span className="text-sm text-[#64748B]">({roadmap.risks.length})</span>
                                </div>
                                {expandedSections.risks ? (
                                    <ChevronUp className="w-5 h-5 text-[#64748B]" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-[#64748B]" />
                                )}
                            </button>

                            {expandedSections.risks && (
                                <div className="px-6 py-4 border-t border-gray-100">
                                    <div className="space-y-3">
                                        {roadmap.risks.map((risk, i) => (
                                            <div key={i} className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                                <div className="flex items-start gap-3 mb-2">
                                                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                    <p className="text-[#334155] font-medium">{risk.risk}</p>
                                                </div>
                                                <div className="ml-8 p-3 bg-white rounded-lg">
                                                    <p className="text-sm text-[#64748B]">
                                                        <span className="font-medium text-[#22C55E]">✓ Mitigation:</span> {risk.mitigation}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submission Checklist */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleSection('checklist')}
                                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#1F3C88]/5 to-transparent hover:from-[#1F3C88]/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#1F3C88] to-[#7C6CF6] rounded-lg flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-[#1F3C88]">Final Submission Checklist</h2>
                                </div>
                                {expandedSections.checklist ? (
                                    <ChevronUp className="w-5 h-5 text-[#64748B]" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-[#64748B]" />
                                )}
                            </button>

                            {expandedSections.checklist && (
                                <div className="px-6 py-4 border-t border-gray-100">
                                    <div className="space-y-3">
                                        {roadmap.submissionChecklist.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl hover:bg-white hover:shadow-sm transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 border-2 border-[#1F3C88] rounded-lg flex items-center justify-center">
                                                        {item.completed && <Check className="w-4 h-4 text-[#1F3C88]" />}
                                                    </div>
                                                    <span className="text-[#334155] font-medium">{item.item}</span>
                                                </div>
                                                <span className="text-sm text-[#64748B] bg-white px-3 py-1 rounded-full">
                                                    {item.timeAllocation}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Sidebar - Right 1/3 */}
                    <div className="lg:col-span-1 order-1 lg:order-2">
                        <div className="lg:sticky lg:top-24 space-y-6">

                            {/* AI Mentor Controls */}
                            <div className="bg-gradient-to-br from-[#FACC15] to-[#22D3EE] rounded-2xl p-6 shadow-xl text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <Trophy className="w-6 h-6" />
                                    <h3 className="text-xl font-semibold">Hackathon Tools</h3>
                                </div>
                                <p className="text-white/80 text-sm mb-6">
                                    Adjust your roadmap on the fly
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={onAdjustTimeline}
                                        className="w-full px-4 py-3 bg-white text-[#1F3C88] rounded-xl transition-all flex items-center justify-center gap-2 font-medium hover:bg-white/95 hover:shadow-lg group"
                                    >
                                        <Clock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span>Adjust Timeline</span>
                                    </button>

                                    <button
                                        onClick={onSimplifyScope}
                                        className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm group"
                                    >
                                        <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                        <span>Simplify Scope</span>
                                    </button>

                                    <button
                                        onClick={onAddTeamMember}
                                        className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm group"
                                    >
                                        <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span>Add Team Member</span>
                                    </button>

                                    <div className="pt-3 border-t border-white/20">
                                        <button
                                            onClick={onGenerateNew}
                                            className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                                        >
                                            <RefreshCw className="w-5 h-5" />
                                            <span>Generate New Roadmap</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Download PDF */}
                            <button
                                onClick={handleDownloadPDF}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-[#1F3C88] rounded-xl hover:border-[#FACC15] hover:bg-[#FACC15]/5 transition-all flex items-center justify-center gap-2 font-medium shadow-sm"
                            >
                                <Download className="w-5 h-5" />
                                <span>Download as PDF</span>
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
