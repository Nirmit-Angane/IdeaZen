import { 
  CheckCircle2, 
  Lightbulb, 
  Layers, 
  Code2, 
  Target, 
  TrendingUp,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Home,
  Sparkles,
  Bookmark,
  Share2,
  Download,
  ExternalLink,
  BookOpen,
  Github,
  Youtube,
  FileText,
  Clock,
  Zap,
  Award,
  Check,
  X,
  AlertCircle,
  Brain,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Rocket
} from 'lucide-react';
import { GeneratedProject, UserInputs } from '../../types/project.types';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ProjectOutputProps {
  project: GeneratedProject;
  userInputs: UserInputs;
  onRefine: () => void;
  onIncreaseDifficulty: () => void;
  onSimplify: () => void;
  onGenerateAnother: () => void;
  onStartOver: () => void;
}

export function ProjectOutput({ 
  project, 
  userInputs, 
  onRefine, 
  onIncreaseDifficulty, 
  onSimplify, 
  onGenerateAnother,
  onStartOver 
}: ProjectOutputProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState({
    features: true,
    techStack: true,
    roadmap: true,
    learning: true,
    resources: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = () => {
    const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
    savedProjects.push({ ...project, savedAt: new Date().toISOString() });
    localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
    setIsSaved(true);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/project/${project.title.toLowerCase().replace(/\s+/g, '-')}`;
    
    const fallbackCopyTextToClipboard = (text: string) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Fallback: Unable to copy', err);
      }
      
      document.body.removeChild(textArea);
    };
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(() => {
          fallbackCopyTextToClipboard(shareUrl);
        });
    } else {
      fallbackCopyTextToClipboard(shareUrl);
    }
  };

  const handleDownloadPDF = async () => {
    if (!printableRef.current || isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    
    try {
      const canvas = await html2canvas(printableRef.current, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#F8FAFC' // Match background
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgRatio = canvas.height / canvas.width;
      let imgWidth = pdfWidth;
      let imgHeight = pdfWidth * imgRatio;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      const safeTitle = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      pdf.save(`ideazen-${safeTitle}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return { bg: 'bg-[#22D3EE]', text: 'text-[#0891b2]' };
      case 'intermediate': return { bg: 'bg-[#1F3C88]', text: 'text-[#1F3C88]' };
      case 'advanced': return { bg: 'bg-slate-800', text: 'text-slate-800' };
      default: return { bg: 'bg-slate-500', text: 'text-slate-600' };
    }
  };

  const difficultyColors = getDifficultyColor(project.difficulty);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Sticky Top Navigation Bar - Flat elevation */}
      <div data-html2canvas-ignore="true" className="sticky top-20 lg:top-24 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Breadcrumb */}
            <div className="flex items-center gap-2 min-w-0">
              <button 
                onClick={onStartOver}
                className="text-sm text-slate-500 hover:text-[#1F3C88] transition-colors flex items-center gap-1.5 flex-shrink-0"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Home</span>
              </button>
              <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
              <span className="text-sm text-[#1F3C88] font-semibold truncate">
                {project.title}
              </span>
            </div>

            {/* Right: Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className={`px-4 py-1.5 rounded-lg transition-all text-sm font-medium flex items-center gap-1.5 ${
                  isSaved
                    ? 'bg-[#22C55E] text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save Plan'}</span>
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-1.5 bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg transition-all text-sm font-medium flex items-center gap-1.5"
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isCopied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={printableRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-[#F8FAFC]">
        
        {/* Hero Header - Flat Authoritative Design */}
        <div className="mb-10">
          <div className="bg-[#1F3C88] rounded-2xl p-10 text-white relative overflow-hidden border-b-4 border-[#22D3EE]/30 shadow-lg">
            {/* Subtle Static Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-pattern"></div>
            
            <div className="relative z-10">
              {/* AI Badge - Cyan high-contrast */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="text-white">AI Engine Blueprint</span>
              </div>

              {/* Project Title */}
              <h1 className="text-4xl sm:text-6xl font-black mb-6 text-white tracking-tight leading-tight">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-blue-100/80 mb-10 max-w-3xl leading-relaxed font-medium">
                {project.description}
              </p>

              {/* Tagline Box - Premium Flat Highlight */}
              {(project.tagline || project.realWorldComparison) && (
                <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-white mb-12 max-w-2xl backdrop-blur-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#22D3EE] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    <Lightbulb className="w-5 h-5 text-[#1F3C88]" />
                  </div>
                  <p className="text-[15px] font-semibold leading-relaxed">
                    {project.tagline || `Analogy: ${project.realWorldComparison}`}
                  </p>
                </div>
              )}

              {/* Stats - Authoritative horizontal layout */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                {[
                  { icon: Award, label: project.difficulty, highlight: false },
                  { icon: Clock, label: `${project.roadmap.length} Phases`, highlight: false },
                  { icon: Zap, label: `${project.confidence} Fit`, highlight: true },
                  { icon: Target, label: project.feasibility, highlight: false }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <stat.icon className={`w-5 h-5 ${stat.highlight ? 'text-[#22D3EE]' : 'text-blue-200/60'}`} />
                    <span className={`text-[13px] font-bold uppercase tracking-wider ${stat.highlight ? 'text-white' : 'text-blue-100'}`}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left column */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            
            {/* Reasoning Box - Flat highlight */}
            <div className="bg-white rounded-2xl p-8 border border-[#22D3EE]/20 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#22D3EE]/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 bg-[#22D3EE]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-8 h-8 text-[#0891B2]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1F3C88] mb-4">Strategic Reasoning</h3>
                  {typeof project.reasoning === 'string' ? (
                    <p className="text-slate-600 leading-relaxed italic">
                       "{project.reasoning}"
                    </p>
                  ) : (
                    <div className="grid gap-4">
                      {[
                        { icon: '🎯', title: 'Skill Match', content: project.reasoning.skillFit },
                        { icon: '🛠️', title: 'Stack Alignment', content: project.reasoning.stackFit },
                        { icon: '📈', title: 'Growth Factor', content: project.reasoning.growthOpportunity }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                           <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                           <div className="text-sm text-slate-600 leading-relaxed">
                             <strong className="text-slate-800 font-bold mr-1">{item.title}:</strong> {item.content}
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => toggleSection('features')}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <Layers className="w-4 h-4 text-slate-500" />
                  </div>
                  <h2 className="text-lg font-medium text-[#1F3C88]">Key Features</h2>
                  <span className="text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{project.features.length}</span>
                </div>
                {expandedSections.features ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {expandedSections.features && (
                <div className="px-6 py-4 border-t border-slate-100">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => {
                      if (typeof feature === 'string') {
                        return (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="mt-1">
                              <Check className="w-4 h-4 text-[#22C55E]" />
                            </div>
                            <span className="text-slate-600 text-sm leading-relaxed">{feature}</span>
                          </div>
                        );
                      }
                      
                      return (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                          <div className="mt-1">
                            <Check className="w-4 h-4 text-[#22C55E]" />
                          </div>
                          <div>
                            <span className="text-slate-800 text-sm font-semibold">{feature.name}</span>
                            <span className="text-slate-500 text-xs ml-2 bg-slate-100 px-1.5 py-0.5 rounded">{feature.tier}</span>
                            <p className="text-slate-600 text-sm mt-1 leading-relaxed">{feature.description}</p>
                            {feature.technicalNote && (
                              <p className="text-slate-400 text-xs mt-1 italic leading-relaxed">Note: {feature.technicalNote}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Tech Stack Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => toggleSection('techStack')}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-slate-500" />
                  </div>
                  <h2 className="text-lg font-medium text-[#1F3C88]">Tech Stack</h2>
                </div>
                {expandedSections.techStack ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {expandedSections.techStack && (
                <div className="px-6 py-4 border-t border-slate-100 space-y-5">
                  <div>
                    <div className="text-sm text-slate-700 font-medium mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                      Recommended Technologies
                    </div>
                    <div className="flex flex-wrap gap-3">
                       {project.techStack.primary.map((tech, index) => {
                         if (typeof tech === 'string') {
                           return (
                             <span key={index} className="px-4 py-2 bg-[#1F3C88] text-white rounded-xl text-sm font-bold shadow-sm border border-[#1F3C88]">
                               {tech}
                             </span>
                           );
                         }
                         return (
                           <div key={index} className="px-4 py-2.5 bg-[#1F3C88] text-white rounded-xl group relative cursor-help border border-[#1F3C88] shadow-sm">
                             <div className="font-bold text-sm tracking-tight">{tech.name}</div>
                             <div className="text-[10px] text-[#22D3EE] font-black uppercase tracking-widest mt-0.5">{tech.role}</div>
                             
                             {/* Refined Tooltip */}
                             <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white text-slate-600 text-xs p-3 rounded-xl shadow-2xl pointer-events-none border border-slate-100 ring-4 ring-[#1F3C88]/5">
                               <p className="font-medium leading-relaxed">{tech.reason}</p>
                               <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                             </div>
                           </div>
                         );
                       })}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-500 font-medium mb-3">
                      Alternatives (Choose if preferred)
                    </div>
                    <div className="flex flex-wrap gap-3">
                       {project.techStack.alternative.map((tech, index) => {
                         if (typeof tech === 'string') {
                           return (
                             <span key={index} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold border border-slate-200 hover:border-[#22D3EE] transition-colors">
                               {tech}
                             </span>
                           );
                         }
                         return (
                           <div key={index} className="px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-white hover:border-[#22D3EE] transition-all group relative cursor-help border border-slate-200">
                             <div className="font-bold text-sm text-slate-700">{tech.name}</div>
                             <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{tech.role}</div>
                             
                             {/* Refined Tooltip */}
                             <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-[#1F3C88] text-white text-xs p-3 rounded-xl shadow-2xl pointer-events-none">
                               <p className="font-medium leading-relaxed">{tech.whenToUse}</p>
                               <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1F3C88]"></div>
                             </div>
                           </div>
                         );
                       })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Roadmap Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => toggleSection('roadmap')}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <Target className="w-4 h-4 text-slate-500" />
                  </div>
                  <h2 className="text-lg font-medium text-[#1F3C88]">Development Roadmap</h2>
                  <span className="text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{project.roadmap.length}</span>
                </div>
                {expandedSections.roadmap ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {expandedSections.roadmap && (
                <div className="px-6 py-4 border-t border-slate-100">
                  <div className="space-y-4">
                    {project.roadmap.map((phase, index) => (
                      <div key={index} className="relative">
                        {/* Connecting Line */}
                        {index < project.roadmap.length - 1 && (
                          <div className="absolute left-5 top-12 bottom-0 w-px bg-slate-200"></div>
                        )}
                        
                        <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                          {/* Phase Number - Navy background */}
                          <div className="w-10 h-10 bg-[#1F3C88] rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 z-10 shadow-[0_4px_10px_rgba(31,60,136,0.2)]">
                            0{index + 1}
                          </div>
                          
                          {/* Phase Content */}
                          <div className="flex-1 min-w-0 pt-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <h4 className="font-medium text-slate-900">{phase.title}</h4>
                              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap w-fit">
                                {phase.duration}
                              </span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">{phase.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* First Commit Guide - Dark Mode Terminal */}
            {project.firstCommitGuide && (
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
                {/* Terminal Header */}
                <div className="px-5 py-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest">
                      <Rocket className="w-3.5 h-3.5" />
                      Initialization-Guide
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">zsh — 80x24</div>
                </div>

                <div className="p-8 space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                       First Commit Checklist
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                      {project.firstCommitGuide.intro}
                    </p>
                  </div>

                  <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800/50 font-mono space-y-6">
                    {project.firstCommitGuide.steps.map((step, index) => (
                      <div key={index} className="space-y-2 relative">
                        <div className="flex items-center gap-2 text-[#22D3EE]/50 text-[11px] font-bold uppercase tracking-wider">
                          <span className="w-4 h-px bg-[#22D3EE]/20"></span>
                          {step.note || `Step 0${index + 1}`}
                        </div>
                        <div className="flex items-start gap-3 text-slate-300">
                          <span className="text-[#22D3EE] mt-0.5">$</span>
                          <code className="text-sm md:text-base selection:bg-[#22D3EE]/20 leading-relaxed">
                            {step.action}
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Your First Goal - Highlighted box */}
                  <div className="p-5 rounded-2xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#22D3EE]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-[#22D3EE]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wide">Milestone Alpha</h4>
                      <p className="text-[#22D3EE] text-sm leading-relaxed font-medium">
                        {project.firstCommitGuide.firstGoal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Outcomes Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => toggleSection('learning')}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-slate-500" />
                  </div>
                  <h2 className="text-lg font-medium text-[#1F3C88]">What You'll Learn</h2>
                  <span className="text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {Array.isArray(project.skillOutcomes) ? project.skillOutcomes.length : ((project.skillOutcomes.solidify?.length || 0) + (project.skillOutcomes.gainNew?.length || 0))}
                  </span>
                </div>
                {expandedSections.learning ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {expandedSections.learning && (
                <div className="px-6 py-4 border-t border-slate-100">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {Array.isArray(project.skillOutcomes) ? (
                      project.skillOutcomes.map((skill, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 text-sm leading-relaxed">{skill}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Capabilities to Solidify</h4>
                          {project.skillOutcomes.solidify.map((skill, index) => (
                             <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                                <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-sm leading-relaxed">{skill}</span>
                             </div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-[#1F3C88] bg-[#1F3C88]/5 px-2.5 py-1 inline-block rounded uppercase tracking-widest mb-2 border border-[#1F3C88]/10">Capabilities to Gain</h4>
                          {project.skillOutcomes.gainNew.map((skill, index) => (
                             <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white hover:bg-slate-50 transition-all border border-slate-100 shadow-sm group">
                                <TrendingUp className="w-4 h-4 text-[#22D3EE] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="text-slate-700 font-bold text-sm leading-relaxed">{skill}</span>
                             </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Pitfalls - Warning box */}
            <div className="bg-white rounded-2xl p-8 border-2 border-red-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/50 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-900 mb-4">Engineering Guardrails</h3>
                  <div className="grid gap-4">
                    {[
                      "Avoid complex backend setup initially — use local persistence (JSON/LocalStorage).",
                      "De-prioritize advanced Auth/JWT until core engine is functional.",
                      "Focus on component functionality before perfecting CSS/Transitions."
                    ].map((pitfall, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="text-sm text-red-800 leading-relaxed font-medium">{pitfall}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => toggleSection('resources')}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                  </div>
                  <h2 className="text-lg font-medium text-[#1F3C88]">Learning Resources</h2>
                </div>
                {expandedSections.resources ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {expandedSections.resources && (
                <div className="px-6 py-4 border-t border-slate-100">
                  <div className="grid gap-3">
                    {[
                      { icon: FileText, title: 'Official Documentation', desc: project.techStack.primary[0] + ' docs', color: 'text-blue-600' },
                      { icon: Youtube, title: 'Video Tutorials', desc: 'Step-by-step guides and walkthroughs', color: 'text-red-600' },
                      { icon: Github, title: 'Example Projects', desc: 'Open source code to learn from', color: 'text-slate-700' },
                      { icon: BookOpen, title: 'Interactive Courses', desc: 'Hands-on learning platforms', color: 'text-indigo-600' }
                    ].map((resource, i) => {
                      const Icon = resource.icon;
                      return (
                        <div key={i} className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-200">
                          <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-[#22D3EE] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all">
                            <Icon className={`w-5 h-5 ${resource.color.replace('blue', '[#1F3C88]').replace('red', '[#EF4444]')}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[#1F3C88] text-sm mb-0.5">{resource.title}</div>
                            <div className="text-xs text-slate-500">{resource.desc}</div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio Blurb - Impact highlight */}
            {project.portfolioBlurb && (
              <div className="bg-slate-900 rounded-2xl p-8 text-white border border-slate-800 shadow-sm group">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#22D3EE]" />
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight">LinkedIn & Portfolio Hook</h3>
                    </div>
                    <div className="relative group/copy">
                      <p className="text-slate-300 text-[15px] leading-relaxed italic border-l-4 border-[#22D3EE] pl-6 py-1">
                        "{project.portfolioBlurb}"
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(project.portfolioBlurb!);
                          setIsCopied(true);
                          setTimeout(() => setIsCopied(false), 2000);
                        }}
                        className="mt-6 flex items-center gap-2.5 px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-[#22D3EE] transition-all hover:-translate-y-0.5"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4" />
                            <span>Copy Impact Statement</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* AI Mentor Sidebar - Navy/Cyan flat design */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                {/* Side highlight */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#22D3EE]"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#1F3C88]/5 rounded-xl flex items-center justify-center">
                    <Brain className="w-5 h-5 text-[#1F3C88]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F3C88]">AI Mentor</h3>
                </div>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Need to adjust the scope? Use these controls to fine-tune your project blueprint.
                </p>
                
                <div className="space-y-3">
                  <button onClick={onRefine} className="w-full flex items-center justify-between gap-3 px-6 py-4 bg-[#1F3C88] text-white rounded-2xl font-black text-sm hover:bg-[#1A3273] transition-all group shadow-lg shadow-[#1F3C88]/20 border-b-4 border-black/20 active:border-b-0 active:translate-y-1">
                    <span className="flex items-center gap-3">
                      <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700 text-[#22D3EE]" />
                      Refine Scope
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={onIncreaseDifficulty} className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-[#1F3C88] hover:bg-slate-50 transition-all group">
                      <ArrowUp className="w-5 h-5 text-[#22D3EE] group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[11px] font-bold text-slate-600 uppercase">Scale Up</span>
                    </button>
                    <button onClick={onSimplify} className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-[#1F3C88] hover:bg-slate-50 transition-all group">
                      <ArrowDown className="w-5 h-5 text-slate-400 group-hover:translate-y-1 transition-transform" />
                      <span className="text-[11px] font-bold text-slate-600 uppercase">Scale Down</span>
                    </button>
                  </div>

                  <button onClick={onGenerateAnother} className="w-full mt-4 px-5 py-3 text-slate-500 font-bold text-sm border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all">
                    Try Different Idea
                  </button>
                </div>
              </div>

              {/* PDF Download - Flat button */}
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                <Download className={`w-4 h-4 ${isGeneratingPDF ? 'animate-bounce' : ''}`} />
                <span>{isGeneratingPDF ? 'Preparing PDF...' : 'Download Full Blueprint'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
