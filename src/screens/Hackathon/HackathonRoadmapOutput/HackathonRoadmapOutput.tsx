import { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Target, 
  AlertTriangle, 
  ChevronRight, 
  Download, 
  Share2, 
  RefreshCcw,
  Zap,
  CheckCircle2,
  Users,
  Clock,
  Layout,
  Star,
  Sparkles,
  ArrowRight,
  Info,
  Rocket,
  CheckSquare,
  PlayCircle,
  Timer,
  Anchor,
  Flag,
  Lightbulb
} from 'lucide-react';
import type { HackathonRoadmap } from '../../../types/hackathon.types';
import { generateProjectPDF } from '../../../services/pdf.service';

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
  const [activePhase, setActivePhase] = useState(0);

  const downloadPDF = async () => {
    try {
      await generateProjectPDF('roadmap-content', `${roadmap.title}_Roadmap`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20">
      {/* Top narrow amber strip */}
      <div className="h-1.5 bg-amber-400 w-full" />
      
      {/* Top Banner - Strategy Focused */}
      <div className="bg-white text-slate-900 pt-16 pb-8 border-b border-slate-200 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 rounded-full text-sm font-black uppercase tracking-widest text-cyan-700 mb-4 border border-cyan-100">
                <Trophy className="w-3.5 h-3.5 text-cyan-600" />
                <span>Winning Strategy Generated</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black mb-2 text-slate-900 tracking-tight">{roadmap.title}</h1>
              <p className="text-slate-500 flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4" />
                <span>{roadmap.timeline} Hackathon Plan</span>
                <span className="mx-2 text-slate-300">|</span>
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span className="font-bold text-slate-700">Feasibility: {roadmap.feasibility}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={onAdjustTimeline}
                className="px-5 py-2.5 bg-white text-slate-700 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-2 border border-slate-200 text-sm font-bold shadow-sm active:scale-95"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Adjust Plan</span>
              </button>
              <button 
                onClick={downloadPDF}
                className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-sm active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 mt-16 mb-20" id="roadmap-content">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Phase-based Roadmap */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Execution Roadmap</h2>
                    <p className="text-xs text-slate-500">Hour-by-hour breakdown for your team</p>
                  </div>
                </div>
              </div>

              {/* Phase Selector */}
              <div className="flex overflow-x-auto p-3 bg-slate-50 gap-3 scrollbar-hide border-b border-slate-100">
                {roadmap.roadmap.map((phase, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhase(idx)}
                    className={`px-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-200 min-w-[120px] ${
                      activePhase === idx 
                        ? 'bg-[#1F3C88] text-white shadow-[0_8px_20px_-4px_rgba(31,60,136,0.3)]'
                        : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300 hover:text-slate-600'
                    }`}
                  >
                    <div className="text-[10px] opacity-60 mb-1">PHASE {idx + 1}</div>
                    <div>{phase.timeBlock || `Phase ${idx + 1}`}</div>
                  </button>
                ))}
              </div>

              {/* Phase Goal & Context */}
              <div className="bg-[#1F3C8810] p-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1F3C88] text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#1F3C8840]">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#1F3C88] uppercase tracking-widest mb-1">Current Objective</h3>
                    <p className="text-lg font-bold text-slate-900 leading-tight">
                      {roadmap.roadmap[activePhase].goal || `Execute primary tasks for ${roadmap.roadmap[activePhase].phase}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phase Tasks */}
              <div className="p-6">
                <div className="space-y-4">
                  {roadmap.roadmap[activePhase].tasks.map((task, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-sm z-10">
                          {idx + 1}
                        </div>
                        {idx !== roadmap.roadmap[activePhase].tasks.length - 1 && (
                          <div className="w-0.5 h-full bg-cyan-100/50 -mt-1 mb-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-[#1F3C88] transition-colors">{task.task}</h3>
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-black uppercase tracking-wider shrink-0 border border-slate-200">
                            {task.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Users className="w-3.5 h-3.5 text-cyan-600" />
                          <span>Assignee: <span className="text-slate-900 font-bold">{task.assignedTo}</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-cyan-600 flex flex-col justify-between group hover:shadow-md transition-all">
                <div>
                  <h3 className="text-sm font-black text-cyan-600 mb-4 flex items-center gap-2 uppercase tracking-widest">
                    <Target className="w-4 h-4" />
                    Win Probability
                  </h3>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
                      {roadmap.feasibility === 'High' ? '92%' : roadmap.feasibility === 'Medium' ? '65%' : '35%'}
                    </span>
                    <span className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Accuracy</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                    <div 
                      className="h-full bg-cyan-600 rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(8,145,178,0.4)]"
                      style={{ width: roadmap.feasibility === 'High' ? '92%' : roadmap.feasibility === 'Medium' ? '65%' : '35%' }}
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic font-medium">
                  "{roadmap.strategicAnalysis.achievability}"
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-amber-500 group hover:shadow-md transition-all">
                <h3 className="text-sm font-black text-amber-600 mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <Star className="w-4 h-4" />
                  Your Winning Move
                </h3>
                <div className="p-5 bg-amber-50 rounded-xl border border-amber-100 mb-4 shadow-inner">
                  <p className="text-base font-bold text-amber-900 leading-tight">
                    {roadmap.strategicAnalysis.winningAngle || "Focus on extreme UI polish and a flawless 3-minute demo script."}
                  </p>
                </div>
                <ul className="space-y-3">
                  {roadmap.strategicAnalysis.mitigations.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Redesigned Demo Script Section */}
            {roadmap.demoScript && (
              <div className="bg-[#0F172A] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-white/5">
                {/* Decorative background gradients */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3 border border-cyan-500/20">
                        <Timer className="w-3 h-3" />
                        <span>3-Minute Winning Pitch</span>
                      </div>
                      <h3 className="text-3xl font-black tracking-tight text-white">The Perfect Demo Script</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Ready</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* The Hook */}
                    <div className="group relative p-5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 rounded-2xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-500/30">
                          <Anchor className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/70">0:00 - 0:30 • The Hook</span>
                          </div>
                          <p className="text-lg text-white leading-relaxed font-medium italic">
                            "{roadmap.demoScript.hook}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* The Problem */}
                    <div className="group relative p-5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 rounded-2xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
                          <AlertTriangle className="w-5 h-5 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400/70">0:30 - 1:15 • The Pain Point</span>
                          </div>
                          <p className="text-base text-slate-300 leading-relaxed font-medium">
                            "{roadmap.demoScript.problem}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* The WOW Moment */}
                    <div className="group relative p-6 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 rounded-2xl shadow-lg shadow-cyan-500/5 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">1:15 - 2:30 • The WOW Moment</span>
                            <div className="px-2 py-0.5 bg-cyan-500 text-[8px] font-black uppercase tracking-widest rounded text-white shadow-sm">Crucial</div>
                          </div>
                          <p className="text-xl text-white leading-relaxed font-black">
                            "{roadmap.demoScript.theWOW}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* The Closing */}
                    <div className="group relative p-5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 rounded-2xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                          <Flag className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/70">2:30 - 3:00 • The Vision</span>
                          </div>
                          <p className="text-base text-slate-300 leading-relaxed font-medium">
                            "{roadmap.demoScript.closing}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-cyan-500/30 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Pro Tip</h4>
                      </div>
                      <p className="text-sm text-slate-300 font-medium italic leading-snug">"Keep the energy high. Don't read from a script—tell a story."</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-amber-500/30 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-3.5 h-3.5 text-amber-400" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400">Judge's Lens</h4>
                      </div>
                      <p className="text-sm text-slate-300 font-medium italic leading-snug">"They care about scalability and the 'unfair advantage' you've built."</p>
                    </div>
                  </div>
                </div>
              </div>
            )}


          </div>

          {/* Sidebar - Right 1 Column */}
          <div className="space-y-8">
            
            {/* MVP Scope */}
            <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Layout className="w-20 h-20 text-slate-900" />
              </div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-slate-800" />
                MVP Core Scope
              </h3>
              <div className="space-y-6 relative z-10">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Must Have</h4>
                  <ul className="space-y-3">
                    {roadmap.mvpScope.mustHave.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Cut if Needed</h4>
                  <ul className="space-y-3">
                    {roadmap.mvpScope.cutIfNeeded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-500 flex-1">
                        <div className="w-4 h-[1px] bg-slate-300 mt-2.5 shrink-0"></div>
                        <span className="line-through opacity-70 italic">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Submission Checklist */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-500" />
                Submission Checklist
              </h3>
              <div className="space-y-3">
                {roadmap.submissionChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl transition-all group border border-transparent hover:border-slate-100">
                    <div className="w-5 h-5 rounded border-2 border-slate-200 group-hover:border-emerald-500 transition-colors shrink-0 mt-0.5 shadow-sm bg-white"></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800 leading-tight mb-1">{item.item}</p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {item.timeAllocation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Warnings */}
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Risk & Mitigations
              </h3>
              <div className="space-y-4">
                {roadmap.risks.map((risk, idx) => (
                  <div key={idx} className="p-3 bg-white/50 rounded-xl border border-red-100">
                    <p className="text-sm font-black text-red-900 mb-1.5 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                      {risk.risk}
                    </p>
                    <p className="text-xs text-red-800 leading-relaxed italic font-medium">
                      <span className="uppercase font-black text-[10px] tracking-widest mr-1 opacity-70">Mitigation:</span> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Action Bar Bottom */}
        <div className="mt-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Ready to start?</h3>
              <p className="text-sm text-slate-500">Save this strategy to your dashboard to track progress.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
             <button 
              className="flex-1 md:flex-none px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 active:scale-95"
            >
              Full Blueprint
              <Zap className="w-4 h-4 text-cyan-400" />
            </button>
            <button 
              onClick={onGenerateNew}
              className="flex-1 md:flex-none px-10 py-4 bg-white text-slate-900 border-2 border-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              New Strategy
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
