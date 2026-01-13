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
  ChevronUp
} from 'lucide-react';
import { GeneratedProject, UserInputs } from '../App';
import { useState } from 'react';

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

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here!');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return { bg: 'bg-[#22D3EE]', text: 'text-[#22D3EE]', gradient: 'from-[#0891b2] via-[#06b6d4] to-[#22D3EE]', border: 'border-[#22D3EE]' };
      case 'intermediate': return { bg: 'bg-[#1F3C88]', text: 'text-[#1F3C88]', gradient: 'from-[#1e3a8a] via-[#1F3C88] to-[#7C6CF6]', border: 'border-[#1F3C88]' };
      case 'advanced': return { bg: 'bg-[#7C6CF6]', text: 'text-[#7C6CF6]', gradient: 'from-[#6366f1] via-[#7C6CF6] to-[#a78bfa]', border: 'border-[#7C6CF6]' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-600', gradient: 'from-gray-600 via-gray-500 to-gray-600', border: 'border-gray-500' };
    }
  };

  const difficultyColors = getDifficultyColor(project.difficulty);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">
      
      {/* Sticky Top Navigation Bar - Positioned below main navbar */}
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
                {project.title}
              </span>
            </div>

            {/* Right: Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className={`px-3 py-1.5 rounded-lg transition-all text-sm flex items-center gap-1.5 ${
                  isSaved
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
        
        {/* Hero Header - Project Title */}
        <div className="mb-8">
          <div className={`bg-gradient-to-br ${difficultyColors.gradient} rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden`}>
            {/* Decorative Elements - Enhanced with better visibility */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
            
            <div className="relative z-10">
              {/* AI Badge - More prominent */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full text-sm mb-4 border border-white/40 shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">AI-Generated Project Idea</span>
              </div>

              {/* Project Title - Large and Prominent with text shadow */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
                {project.title}
              </h1>

              {/* Description - Better contrast */}
              <p className="text-lg sm:text-xl text-white mb-6 max-w-3xl leading-relaxed drop-shadow-md">
                {project.description}
              </p>

              {/* Key Stats - Horizontal Pills with better visibility */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-md">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-semibold">{project.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-md">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-semibold">{project.roadmap.length} Phases</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-md">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-semibold">{project.confidence} Match</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-md">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-semibold">{project.feasibility} Feasibility</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            
            {/* Why AI Chose This - Highlighted Box */}
            <div className="bg-gradient-to-br from-[#7C6CF6]/10 to-[#22D3EE]/10 rounded-2xl p-6 border-2 border-[#7C6CF6]/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7C6CF6] to-[#22D3EE] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#1F3C88] mb-2">Why AI Chose This Project</h3>
                  <p className="text-[#334155] leading-relaxed">
                    This project perfectly matches your <span className="font-semibold text-[#7C6CF6]">{project.difficulty}</span> skill level 
                    and aligns with your goals. It's designed to be achievable within your timeframe while teaching valuable skills 
                    that employers look for.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('features')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#22D3EE]/5 to-transparent hover:from-[#22D3EE]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#22D3EE] to-[#0ea5e9] rounded-lg flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#1F3C88]">Key Features</h2>
                  <span className="text-sm text-[#64748B]">({project.features.length})</span>
                </div>
                {expandedSections.features ? (
                  <ChevronUp className="w-5 h-5 text-[#64748B]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#64748B]" />
                )}
              </button>
              
              {expandedSections.features && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg hover:bg-[#22D3EE]/5 transition-colors group">
                        <div className="w-6 h-6 bg-[#22D3EE] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[#334155] leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tech Stack Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('techStack')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#1F3C88]/5 to-transparent hover:from-[#1F3C88]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1F3C88] to-[#7C6CF6] rounded-lg flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#1F3C88]">Tech Stack</h2>
                </div>
                {expandedSections.techStack ? (
                  <ChevronUp className="w-5 h-5 text-[#64748B]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#64748B]" />
                )}
              </button>
              
              {expandedSections.techStack && (
                <div className="px-6 py-4 border-t border-gray-100 space-y-5">
                  <div>
                    <div className="text-sm text-[#7C6CF6] font-medium mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Recommended Technologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.primary.map((tech, index) => (
                        <span key={index} className="px-4 py-2 bg-gradient-to-r from-[#1F3C88] to-[#7C6CF6] text-white rounded-lg font-medium shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-[#64748B] font-medium mb-3">
                      Alternatives (Choose if preferred)
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.alternative.map((tech, index) => (
                        <span key={index} className="px-4 py-2 bg-gray-100 text-[#64748B] rounded-lg hover:bg-gray-200 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Roadmap Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('roadmap')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#FACC15]/5 to-transparent hover:from-[#FACC15]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FACC15] to-[#f59e0b] rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#1F3C88]">Development Roadmap</h2>
                  <span className="text-sm text-[#64748B]">({project.roadmap.length} phases)</span>
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
                    {project.roadmap.map((phase, index) => (
                      <div key={index} className="relative">
                        {/* Connecting Line */}
                        {index < project.roadmap.length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-[#7C6CF6] to-transparent"></div>
                        )}
                        
                        <div className="flex gap-4 p-4 bg-[#F8FAFC] rounded-xl hover:shadow-md transition-shadow">
                          {/* Phase Number */}
                          <div className={`w-12 h-12 bg-gradient-to-br ${difficultyColors.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
                            {index + 1}
                          </div>
                          
                          {/* Phase Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="font-semibold text-[#1F3C88] text-lg">{phase.title}</h4>
                              <span className="text-sm text-white bg-[#7C6CF6] px-3 py-1 rounded-full whitespace-nowrap">
                                {phase.duration}
                              </span>
                            </div>
                            <p className="text-[#64748B] leading-relaxed">{phase.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Learning Outcomes Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('learning')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#22C55E]/5 to-transparent hover:from-[#22C55E]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#22C55E] to-[#16a34a] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#1F3C88]">What You'll Learn</h2>
                  <span className="text-sm text-[#64748B]">({project.skillOutcomes.length} skills)</span>
                </div>
                {expandedSections.learning ? (
                  <ChevronUp className="w-5 h-5 text-[#64748B]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#64748B]" />
                )}
              </button>
              
              {expandedSections.learning && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.skillOutcomes.map((skill, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg hover:bg-[#22C55E]/5 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                        <span className="text-[#334155] leading-relaxed">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avoid These Pitfalls */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-amber-900 mb-3">Common Pitfalls to Avoid</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-amber-800">Don't add a backend initially — use local storage for data persistence</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-amber-800">Skip complex authentication at first — focus on core features</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-amber-800">Prioritize functionality over polish in the early stages</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Section */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('resources')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#7C6CF6]/5 to-transparent hover:from-[#7C6CF6]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7C6CF6] to-[#6558d3] rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#1F3C88]">Learning Resources</h2>
                </div>
                {expandedSections.resources ? (
                  <ChevronUp className="w-5 h-5 text-[#64748B]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#64748B]" />
                )}
              </button>
              
              {expandedSections.resources && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="grid gap-3">
                    {[
                      { icon: FileText, title: 'Official Documentation', desc: project.techStack.primary[0] + ' docs', color: 'text-blue-600' },
                      { icon: Youtube, title: 'Video Tutorials', desc: 'Step-by-step guides and walkthroughs', color: 'text-red-600' },
                      { icon: Github, title: 'Example Projects', desc: 'Open source code to learn from', color: 'text-gray-700' },
                      { icon: BookOpen, title: 'Interactive Courses', desc: 'Hands-on learning platforms', color: 'text-purple-600' }
                    ].map((resource, i) => {
                      const Icon = resource.icon;
                      return (
                        <div key={i} className="group flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl hover:bg-white hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-200">
                          <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-[#7C6CF6] transition-colors">
                            <Icon className={`w-6 h-6 ${resource.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[#1F3C88]">{resource.title}</div>
                            <div className="text-sm text-[#64748B]">{resource.desc}</div>
                          </div>
                          <ExternalLink className="w-5 h-5 text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar - Right 1/3 */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* AI Mentor Controls */}
              <div className="bg-gradient-to-br from-[#1F3C88] to-[#7C6CF6] rounded-2xl p-6 shadow-xl text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-xl font-semibold text-[rgb(255,255,255)]">AI Mentor</h3>
                </div>
                <p className="text-white/80 text-sm mb-6">
                  Refine your project without starting over
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={onRefine}
                    className="w-full px-4 py-3 bg-white text-[#1F3C88] rounded-xl transition-all flex items-center justify-center gap-2 font-medium hover:bg-white/95 hover:shadow-lg group"
                  >
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Refine This Idea</span>
                  </button>

                  <button
                    onClick={onIncreaseDifficulty}
                    className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm group"
                  >
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    <span>Make It Harder</span>
                  </button>

                  <button
                    onClick={onSimplify}
                    className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm group"
                  >
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    <span>Simplify It</span>
                  </button>

                  <div className="pt-3 border-t border-white/20">
                    <button
                      onClick={onGenerateAnother}
                      className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                      <Lightbulb className="w-5 h-5" />
                      <span>Generate New Idea</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Download PDF */}
              <button
                onClick={handleDownloadPDF}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-[#1F3C88] rounded-xl hover:border-[#7C6CF6] hover:bg-[#7C6CF6]/5 transition-all flex items-center justify-center gap-2 font-medium shadow-sm"
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