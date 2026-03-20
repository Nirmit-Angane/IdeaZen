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
  CheckSquare
} from 'lucide-react';
import type { HackathonRoadmap } from '../../../types/hackathon.types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    const element = document.getElementById('roadmap-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${roadmap.title.replace(/\s+/g, '_')}_Roadmap.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20">
      {/* Top narrow amber strip */}
      <div className="h-1.5 bg-amber-400 w-full" />
      
      {/* Top Banner - Strategy Focused */}
      <div className="bg-white text-slate-900 py-8 border-b border-slate-200 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-700 mb-4 border border-cyan-100">
                <Trophy className="w-3.5 h-3.5" />
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

      <div className="container mx-auto max-w-5xl px-4 -mt-8" id="roadmap-content">
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
                    className={`px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                      activePhase === idx 
                        ? 'bg-[#1F3C88] text-white shadow-[0_8px_20px_-4px_rgba(31,60,136,0.3)] translate-y-[-4px]'
                        : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300 hover:text-slate-600 hover:translate-y-[-2px] active:translate-y-0'
                    }`}
                  >
                    Phase {idx + 1}
                  </button>
                ))}
              </div>

              {/* Phase Tasks */}
              <div className="p-6">
                <div className="space-y-4">
                  {roadmap.roadmap[activePhase].tasks.map((task, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-xs">
                          {idx + 1}
                        </div>
                        {idx !== roadmap.roadmap[activePhase].tasks.length - 1 && (
                          <div className="w-0.5 h-full bg-cyan-50 my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 leading-tight">{task.task}</h3>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase shrink-0">
                            {task.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Users className="w-3 h-3" />
                          <span>Assigned to: <span className="text-cyan-600 font-medium">{task.assignedTo}</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-cyan-500 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
                    <Target className="w-4 h-4 text-cyan-500" />
                    Win Probability
                  </h3>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-4xl font-black text-slate-900">
                      {roadmap.feasibility === 'High' ? '92%' : roadmap.feasibility === 'Medium' ? '65%' : '35%'}
                    </span>
                    <span className="text-xs font-bold text-cyan-600 mb-1.5 uppercase">Likelihood</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-cyan-500 rounded-full transition-all duration-1000"
                      style={{ width: roadmap.feasibility === 'High' ? '92%' : roadmap.feasibility === 'Medium' ? '65%' : '35%' }}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  "{roadmap.strategicAnalysis.achievability}"
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-amber-500">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
                  <Star className="w-4 h-4 text-amber-500" />
                  Your Winning Move
                </h3>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mb-4">
                  <p className="text-sm font-bold text-amber-900 leading-snug">
                    {roadmap.strategicAnalysis.winningAngle || "Focus on extreme UI polish and a flawless 3-minute demo script."}
                  </p>
                </div>
                <ul className="space-y-2">
                  {roadmap.strategicAnalysis.mitigations.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
                      <div className="mt-1 w-1 h-1 rounded-full bg-slate-300 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

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
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Must Have</h4>
                  <ul className="space-y-2">
                    {roadmap.mvpScope.mustHave.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Cut if Needed</h4>
                  <ul className="space-y-2">
                    {roadmap.mvpScope.cutIfNeeded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-500 flex-1">
                        <div className="w-3.5 h-[1px] bg-slate-300 mt-2 shrink-0"></div>
                        <span className="line-through opacity-70">{item}</span>
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
                  <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors group">
                    <div className="w-5 h-5 rounded border border-slate-200 group-hover:border-emerald-300 transition-colors shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-700">{item.item}</p>
                      <p className="text-[10px] text-slate-400">Time: {item.timeAllocation}</p>
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
                  <div key={idx}>
                    <p className="text-xs font-bold text-red-800 mb-1">{risk.risk}</p>
                    <p className="text-[10px] text-red-700 leading-relaxed">
                      <span className="font-bold">FIX:</span> {risk.mitigation}
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
