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
      
      {/* Top Banner - Strategy Focused */}
      <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF4500] text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm mb-4">
                <Trophy className="w-3.5 h-3.5" />
                <span>Winning Strategy Generated</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{roadmap.title}</h1>
              <p className="text-white/80 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{roadmap.timeline} Hackathon Plan</span>
                <span className="mx-2 opacity-30">|</span>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="font-semibold">Feasibility: {roadmap.feasibility}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={onAdjustTimeline}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-2 border border-white/20"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Adjust Plan</span>
              </button>
              <button 
                onClick={downloadPDF}
                className="px-4 py-2 bg-white text-[#FF6B35] hover:bg-orange-50 rounded-xl transition-colors flex items-center gap-2 font-medium shadow-lg"
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
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Execution Roadmap</h2>
                    <p className="text-xs text-slate-500">Hour-by-hour breakdown for your team</p>
                  </div>
                </div>
              </div>

              {/* Phase Selector */}
              <div className="flex overflow-x-auto p-2 bg-slate-50 gap-2 scrollbar-hide">
                {roadmap.roadmap.map((phase, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhase(idx)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activePhase === idx 
                        ? 'bg-white text-[#FF6B35] shadow-sm border border-orange-100'
                        : 'text-slate-500 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    Phase {idx + 1}: {phase.phase}
                  </button>
                ))}
              </div>

              {/* Phase Tasks */}
              <div className="p-6">
                <div className="space-y-4">
                  {roadmap.roadmap[activePhase].tasks.map((task, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                          {idx + 1}
                        </div>
                        {idx !== roadmap.roadmap[activePhase].tasks.length - 1 && (
                          <div className="w-0.5 h-full bg-orange-50 my-1"></div>
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
                          <span>Assigned to: <span className="text-[#FF6B35] font-medium">{task.assignedTo}</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Achievability Score
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{roadmap.strategicAnalysis.achievability}"
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Key Mitigations
                </h3>
                <ul className="space-y-2">
                  {roadmap.strategicAnalysis.mitigations.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0"></div>
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
            <div className="bg-[#1F2937] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Layout className="w-20 h-20" />
              </div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-orange-400" />
                MVP Core Scope
              </h3>
              <div className="space-y-6 relative z-10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-2">Must Have</h4>
                  <ul className="space-y-2">
                    {roadmap.mvpScope.mustHave.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#22D3EE] mb-2">Cut if Needed</h4>
                  <ul className="space-y-2 opacity-60">
                    {roadmap.mvpScope.cutIfNeeded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <div className="w-3.5 h-[1px] bg-gray-500 mt-2 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Submission Checklist */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-500" />
                Submission Checklist
              </h3>
              <div className="space-y-3">
                {roadmap.submissionChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors group">
                    <div className="w-5 h-5 rounded border border-slate-200 group-hover:border-orange-300 transition-colors shrink-0"></div>
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
        <div className="mt-12 p-8 bg-white rounded-3xl border border-orange-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Ready to start?</h3>
              <p className="text-sm text-slate-500">Save this strategy to your dashboard to track progress.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
             <button 
              onClick={onGenerateNew}
              className="flex-1 md:flex-none px-10 py-4 bg-[#FF6B35] text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-[#FF4500] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Generate New
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onStartOver}
              className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"
              title="Start Over"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
