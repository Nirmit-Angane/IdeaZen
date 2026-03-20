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
  Rocket,
  ShieldAlert,
  ShieldCheck,
  PlayCircle,
  Cpu,
  Flag,
  Map,
  Star
} from 'lucide-react';
import { GeneratedProject, UserInputs } from '../../types/project.types';
import { useState, useRef, useEffect } from 'react';
import { generateProjectPDF } from '../../services/pdf.service';

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

  useEffect(() => {
    // Check if this project is already saved in System A (ideaZen_savedIdeas)
    try {
      const saved = localStorage.getItem('ideaZen_savedIdeas');
      if (saved) {
        const parsed = JSON.parse(saved);
        const exists = parsed.some((p: any) => p.title === project.title);
        setIsSaved(exists);
      }
    } catch (e) {
      console.error('Error checking saved status:', e);
    }
  }, [project.title]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = () => {
    try {
      const savedProjects = JSON.parse(localStorage.getItem('ideaZen_savedIdeas') || '[]');
      
      // Prevent duplicates in System A
      const exists = savedProjects.some((p: any) => p.title === project.title);
      if (!exists) {
        const id = `idea-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        savedProjects.push({ ...project, id, savedAt: new Date().toISOString() });
        localStorage.setItem('ideaZen_savedIdeas', JSON.stringify(savedProjects));
      }
      
      setIsSaved(true);
    } catch (e) {
      console.error('Failed to save project:', e);
    }
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
      await generateProjectPDF('project-output-content', project.title);
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

      <div ref={printableRef} id="project-output-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-[#F8FAFC]">
        
        {/* Hero Header - Flat Authoritative Design */}
        <div className="mb-10">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden border-l-4 border-l-cyan-400">
            <div className="relative z-10">
              {/* AI Badge - Cyan high-contrast */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 rounded-full text-sm font-black uppercase tracking-widest mb-6 border border-cyan-100">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-cyan-800">AI Engine Blueprint</span>
              </div>

              {/* Project Title */}
              <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-slate-700 text-lg leading-relaxed mb-8 max-w-3xl">
                {project.description}
              </p>

              {/* Tagline Box - Premium Flat Highlight */}
              {(project.tagline || project.realWorldComparison) && (
                <div className="inline-flex items-center gap-4 px-6 py-5 bg-cyan-50 rounded-2xl border border-cyan-100 text-slate-800 mb-10 max-w-2xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Lightbulb className="w-6 h-6 text-cyan-600" />
                  </div>
                  <p className="text-base font-medium leading-relaxed">
                    {project.tagline || `Analogy: ${project.realWorldComparison}`}
                  </p>
                </div>
              )}

              {/* Stats - 3 Large Stat Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-100">
                {[
                  { 
                    label: 'Confidence', 
                    value: project.feasibility === 'High' ? 'High' : project.feasibility === 'Medium' ? 'Medium' : 'Low',
                    detail: 'Build Certainty',
                    icon: CheckCircle2,
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50'
                  },
                  { 
                    label: 'Difficulty', 
                    value: project.difficulty,
                    detail: 'Effort Level',
                    icon: Award,
                    color: 'text-indigo-600',
                    bg: 'bg-indigo-50'
                  },
                  { 
                    label: 'Time Fit', 
                    value: project.timeFit,
                    detail: 'Schedule Match',
                    icon: Clock,
                    color: 'text-amber-600',
                    bg: 'bg-amber-50'
                  }
                ].map((stat, i) => (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${stat.bg} border border-white shadow-sm transition-transform hover:scale-[1.02]`}>
                    <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-0.5">{stat.label}</div>
                      <div className="text-lg font-black text-slate-900 leading-none mb-1">{stat.value}</div>
                      <div className="text-xs font-medium text-slate-400">{stat.detail}</div>
                    </div>
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
            
            {/* Strategic Reasoning - WHY RIGHT */}
            <div className="bg-white rounded-2xl p-8 border border-[#22D3EE]/20 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#22D3EE]/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 bg-[#22D3EE]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-8 h-8 text-[#0891B2]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1F3C88] mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Why this is the right project for you
                  </h3>
                  {typeof project.reasoning === 'string' ? (
                    <p className="text-slate-700 text-base leading-relaxed italic">
                       "{String(project.reasoning).replace(/\*\*(.*?)\*\*/g, '$1')}"
                    </p>
                  ) : (
                    <div className="grid gap-4">
                      {[
                        { icon: Target, title: 'Skill Match', content: String(project.reasoning.skillFit).replace(/\*\*(.*?)\*\*/g, '$1'), color: 'text-emerald-500' },
                        { icon: Zap, title: 'Stack Alignment', content: String(project.reasoning.stackFit).replace(/\*\*(.*?)\*\*/g, '$1'), color: 'text-amber-500' },
                        { icon: TrendingUp, title: 'Growth Factor', content: String(project.reasoning.growthOpportunity).replace(/\*\*(.*?)\*\*/g, '$1'), color: 'text-[#22D3EE]' }
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="flex items-start gap-4">
                             <div className="mt-1 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                               <Icon className={`w-4 h-4 ${item.color}`} />
                             </div>
                             <div className="text-base text-slate-700 leading-relaxed">
                               <strong className="text-slate-900 font-bold mr-1">{item.title}:</strong> {item.content}
                             </div>
                           </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* MVP Section - Refined Card */}
            {project.mvp && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <Zap className="w-6 h-6 text-amber-500" />
                      MVP Scope
                    </h2>
                    <p className="text-base text-slate-500 font-medium">Core essentials for your first version</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-cyan-600">
                    <Zap className="w-6 h-6" />
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-700 text-lg leading-relaxed mb-8">
                    {project.mvp.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-widest text-[#0891B2] flex items-center gap-2">
                        <Target className="w-4 h-4" /> Core Conditions
                      </h4>
                      <div className="space-y-3">
                        {project.mvp.conditions.map((condition, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-base text-slate-700 font-medium bg-slate-50 px-4 py-3 rounded-xl border border-slate-100/50">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span>{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded-2xl p-6 text-white self-start">
                      <h4 className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                         <PlayCircle className="w-4 h-4" /> Demo Script Angle
                      </h4>
                      <p className="text-base leading-relaxed text-slate-300 font-medium italic">
                        "{project.mvp.demoScript}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Tech Stack - Clean Pills */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-8">
              <div className="bg-slate-950 px-8 py-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-cyan-400 border border-white/10">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Tech Stack</h2>
                    <p className="text-cyan-400/80 text-sm font-bold uppercase tracking-widest">Recommended Architecture</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSection('techStack')}
                  className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  {expandedSections.techStack ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </button>
              </div>
              
              {expandedSections.techStack && (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.techStack.primary.map((tech, i) => {
                      const techName = typeof tech === 'string' ? tech : tech.name;
                      const techReason = typeof tech === 'string' ? 'Industry standard for this project type.' : tech.reason;
                      return (
                        <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-cyan-200 transition-colors group">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 font-bold text-sm">
                               {techName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-slate-900 leading-none">{techName}</h4>
                            </div>
                          </div>
                          <div className="text-base text-slate-600 leading-relaxed font-medium">
                            <span className="text-cyan-600 font-bold text-sm uppercase tracking-wide inline-block mb-1">Why this?</span><br/>
                            {techReason}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {project.techStack.alternative && project.techStack.alternative.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-slate-100">
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Alternatives</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.techStack.alternative.map((tech, i) => {
                          const name = typeof tech === 'string' ? tech : tech.name;
                          const role = typeof tech === 'string' ? 'Alternative' : tech.role;
                          return (
                            <div key={i} className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-base font-bold text-slate-700">
                              {name} <span className="text-slate-400 font-medium ml-2 text-sm">({role})</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
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
                  <div className="text-xs text-slate-500 font-mono">zsh — 80x24</div>
                </div>

                <div className="p-8 space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-white flex items-center gap-2">
                       First Commit Checklist
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-xl font-medium">
                      {project.firstCommitGuide.intro}
                    </p>
                  </div>

                  <div className="bg-slate-950/50 p-6 md:p-8 rounded-2xl border border-slate-800/50 font-mono space-y-6 md:space-y-8">
                    {project.firstCommitGuide.steps?.map((step, index) => (
                      <div key={index} className="space-y-3 relative group/step">
                        <div className="flex items-center gap-2 text-[#22D3EE]/50 text-xs md:text-sm font-bold uppercase tracking-widest">
                          <span className="w-6 h-px bg-[#22D3EE]/20 transition-all group-hover/step:w-10 group-hover/step:bg-[#22D3EE]/50"></span>
                          {step.note || `Step 0${index + 1}`}
                        </div>
                        <div className="flex items-start gap-4 text-slate-300">
                          <span className="text-[#22D3EE] mt-1 text-lg font-bold select-none">$</span>
                          <code className="text-lg md:text-xl selection:bg-[#22D3EE]/30 leading-relaxed font-bold tracking-tight text-white">
                            {step.action}
                          </code>
                        </div>
                      </div>
                    ))}
                    {(!project.firstCommitGuide.steps || project.firstCommitGuide.steps.length === 0) && (
                      <div className="text-slate-500 italic text-sm">No steps generated for this guide.</div>
                    )}
                  </div>

                  {/* Your First Goal - Highlighted box */}
                  <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-start gap-5 group/goal">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/goal:scale-110">
                      <Target className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white mb-1 uppercase tracking-widest opacity-60">Milestone Alpha</h4>
                      <p className="text-cyan-300 text-xl leading-relaxed font-bold">
                        {project.firstCommitGuide.firstGoal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Section - KEY FEATURES */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => toggleSection('features')}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <Layers className="w-4 h-4 text-slate-500" />
                  </div>
                  <h2 className="text-lg font-medium text-[#1F3C88] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Key Features
                  </h2>
                  <span className="text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{project.features.length}</span>
                </div>
                {expandedSections.features ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {expandedSections.features && (
                <div className="px-8 py-8 border-t border-slate-100">
                  <div className="grid gap-6">
                    {project.features.map((feature, index) => {
                      if (typeof feature === 'string') {
                        return (
                          <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group">
                            <div className="mt-1 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-emerald-500" />
                            </div>
                            <span className="text-slate-700 text-lg font-bold leading-relaxed">{feature}</span>
                          </div>
                        );
                      }
                      
                      return (
                        <div key={index} className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-slate-100 hover:border-cyan-200 hover:shadow-md transition-all group">
                          <div className="mt-1.5 w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0 text-cyan-600">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <span className="text-cyan-600 text-sm font-black uppercase tracking-widest bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-100">{feature.tier}</span>
                              <h4 className="text-2xl font-black text-slate-900 leading-tight">{feature.name}</h4>
                            </div>
                            <p className="text-slate-600 text-lg font-medium mt-2 leading-relaxed">{feature.description}</p>
                            {feature.technicalNote && (
                              <div className="mt-4 flex items-center gap-2 text-slate-400 text-base font-bold bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
                                <Code2 className="w-4 h-4" />
                                <span>Note: {feature.technicalNote}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
                  <h2 className="text-lg font-medium text-[#1F3C88] flex items-center gap-2">
                    <Flag className="w-4 h-4 text-emerald-500" />
                    Development Roadmap
                  </h2>
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
                        {/* Connecting Line - Extended to bridge gaps between phases */}
                        {index < project.roadmap.length - 1 && (
                          <div 
                            className="absolute left-5 top-12 w-0.5 bg-slate-200 z-0" 
                            style={{ height: 'calc(100% + 1.5rem)' }}
                          />
                        )}
                        
                        <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                          {/* Phase Number - Navy background */}
                          <div className="w-10 h-10 bg-[#1F3C88] rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 z-10 shadow-[0_4px_10px_rgba(31,60,136,0.2)]">
                            0{index + 1}
                          </div>
                          
                          {/* Phase Content */}
                          <div className="flex-1 min-w-0 pt-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <h4 className="text-lg font-bold text-slate-900">{phase.title}</h4>
                              <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap w-fit">
                                {phase.duration}
                              </span>
                            </div>
                            <p className="text-slate-600 text-base leading-relaxed">{phase.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
                  <h2 className="text-sm font-black text-[#1F3C88] uppercase tracking-wider">WHAT YOU'LL LEARN</h2>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-bold">
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
                          <span className="text-slate-600 text-base leading-relaxed">{skill}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Capabilities to Solidify</h4>
                          {project.skillOutcomes.solidify.map((skill, index) => (
                             <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                                <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-base font-medium leading-relaxed">{skill}</span>
                             </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Capabilities to Gain</h4>
                          {project.skillOutcomes.gainNew.map((skill, index) => (
                             <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white hover:bg-slate-50 transition-all border border-slate-100 shadow-sm group">
                                <TrendingUp className="w-4 h-4 text-[#22D3EE] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="text-slate-700 font-bold text-base leading-relaxed">{skill}</span>
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
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-black text-amber-900 mb-4 tracking-wider uppercase">Watch out for</h3>
                  <div className="grid gap-4">
                    {project.pitfalls?.map((pitfallObj: any, i: number) => {
                      const pitfallText = typeof pitfallObj === 'string' ? pitfallObj : pitfallObj.pitfall;
                      const mitigationText = pitfallObj.mitigation;
                      
                      return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ShieldAlert className="w-4 h-4 text-amber-500" />
                        </div>
                        <div>
                          <span className="text-base text-amber-900 leading-relaxed font-bold">{pitfallText}</span>
                          {mitigationText && <p className="text-sm text-amber-800 mt-1 leading-relaxed opacity-80"><span className="font-black uppercase tracking-widest text-[11px] mr-1">Fix:</span> {mitigationText}</p>}
                        </div>
                      </div>
                    )})}
                    {(!project.pitfalls || project.pitfalls.length === 0) && [
                      "Avoid complex backend setup initially — use local persistence (JSON/LocalStorage).",
                      "De-prioritize advanced Auth/JWT until core engine is functional.",
                      "Focus on component functionality before perfecting CSS/Transitions."
                    ].map((pitfall, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ShieldAlert className="w-4 h-4 text-amber-500" />
                        </div>
                        <span className="text-base text-amber-900 leading-relaxed font-black">{pitfall}</span>
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
                  <h2 className="text-sm font-black text-[#1F3C88] uppercase tracking-wider">LEARNING RESOURCES</h2>
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
                    {project.resources?.map((r: any, i: number) => {
                      let Icon = FileText;
                      if (r.format === 'Video') Icon = Youtube;
                      else if (r.format === 'GitHub') Icon = Github;
                      else if (r.format === 'Course') Icon = BookOpen;

                      return (
                        <a key={i} href={r.url || "#"} target="_blank" rel="noopener noreferrer" className="flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-cyan-300 transition-all bg-white hover:bg-slate-50 group">
                           <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-colors">
                            <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-base text-slate-900 flex items-center justify-between">
                              {r.title}
                              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">{r.format}</span>
                            </span>
                            <span className="text-sm text-slate-500 block mt-0.5 font-medium">{r.source} · {r.timeEstimate}</span>
                            <span className="text-sm text-slate-600 mt-2 block leading-relaxed font-medium opacity-80">{r.why}</span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio Blurb - impact highlight */}
            {project.portfolioBlurb && (
              <div className="border-l-4 border-cyan-400 bg-slate-50 rounded-r-xl p-6 mt-4 group">
                 <p className="text-xs font-black text-cyan-700 mb-3 uppercase tracking-widest">READY TO PASTE INTO YOUR RESUME</p>
                 <p className="text-sm text-slate-800 leading-relaxed font-medium italic">
                   "{project.portfolioBlurb}"
                 </p>
                 <button
                   onClick={() => {
                     navigator.clipboard.writeText(project.portfolioBlurb!);
                     setIsCopied(true);
                     setTimeout(() => setIsCopied(false), 2000);
                   }}
                   className="mt-4 text-xs uppercase tracking-widest flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-black hover:border-cyan-300 hover:text-cyan-700 transition-all shadow-sm active:translate-y-0.5"
                 >
                   {isCopied ? (
                     <>
                       <Check className="w-3.5 h-3.5 text-emerald-500" />
                       <span>Copied!</span>
                     </>
                   ) : (
                     <>
                       <Share2 className="w-3.5 h-3.5" />
                       <span>Copy Impact Statement</span>
                     </>
                   )}
                 </button>
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
                      <span className="text-sm font-bold text-slate-600 uppercase">Scale Up</span>
                    </button>
                    <button onClick={onSimplify} className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-[#1F3C88] hover:bg-slate-50 transition-all group">
                      <ArrowDown className="w-5 h-5 text-slate-400 group-hover:translate-y-1 transition-transform" />
                      <span className="text-sm font-bold text-slate-600 uppercase">Scale Down</span>
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
