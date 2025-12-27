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
  MessageCircle,
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
  Brain
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
  const [activeTab, setActiveTab] = useState<'features' | 'techstack' | 'roadmap' | 'learning'>('features');
  const [isWhatNotExpanded, setIsWhatNotExpanded] = useState(false);

  const handleSave = () => {
    // Save to localStorage
    const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
    savedProjects.push({ ...project, savedAt: new Date().toISOString() });
    localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
    setIsSaved(true);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/project/${project.title.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Fallback method for copying text without Clipboard API
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
    
    // Try modern Clipboard API first, fallback if it fails
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(() => {
          // Fallback to older method
          fallbackCopyTextToClipboard(shareUrl);
        });
    } else {
      // Use fallback directly if Clipboard API not available
      fallbackCopyTextToClipboard(shareUrl);
    }
  };

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here!');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return { bg: 'bg-[#3EC1D3]', text: 'text-[#3EC1D3]', light: 'bg-[#3EC1D3]/10', border: 'border-[#3EC1D3]' };
      case 'intermediate': return { bg: 'bg-[#1F3C88]', text: 'text-[#1F3C88]', light: 'bg-[#1F3C88]/10', border: 'border-[#1F3C88]' };
      case 'advanced': return { bg: 'bg-[#9B8CFF]', text: 'text-[#9B8CFF]', light: 'bg-[#9B8CFF]/10', border: 'border-[#9B8CFF]' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-600', light: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const difficultyColors = getDifficultyColor(project.difficulty);

  // Calculate effort vs learning (mock calculation)
  const effortLevel = project.difficulty === 'Beginner' ? 'Low' : project.difficulty === 'Intermediate' ? 'Medium' : 'High';
  const learningImpact = 'High';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white relative overflow-hidden">
      
      {/* Animated Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        
        {/* LAYER 1: RESULT HEADER - Emotion + Confidence */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-[#3EC1D3]/30 overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-10">
              
              {/* Top Row - Title + Quick Actions */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#3EC1D3] to-[#2a9ca9] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-[#3EC1D3] mb-1">✨ AI Generated Project Idea</div>
                      <h1 className="text-[#1F3C88] text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight">{project.title}</h1>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl text-[#666] leading-relaxed max-w-3xl">{project.description}</p>
                </div>

                <button
                  onClick={onStartOver}
                  className="px-6 py-3 bg-white border-2 border-gray-200 text-[#666] hover:border-[#1F3C88] hover:text-[#1F3C88] rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                >
                  <Home className="w-5 h-5" />
                  Start Over
                </button>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-5 py-2 ${difficultyColors.bg} text-white rounded-full shadow-md text-sm`}>
                  {project.difficulty}
                </span>
                <span className="px-5 py-2 bg-[#1F3C88] text-white rounded-full shadow-md text-sm">
                  Web Development
                </span>
                <span className="px-5 py-2 bg-white border-2 border-gray-200 text-[#666] rounded-full text-sm">
                  <Clock className="w-4 h-4 inline mr-1" />
                  2-4 weeks
                </span>
                <span className="px-5 py-2 bg-green-50 border-2 border-green-200 text-green-600 rounded-full text-sm">
                  <Check className="w-4 h-4 inline mr-1" />
                  High Feasibility
                </span>
              </div>

              {/* AI Confidence & Match Score */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Confidence Meter - GREEN for Success/Confidence */}
                <div className="p-5 bg-gradient-to-br from-[#EAFBF1] to-[#EAFBF1] border border-[#86EFAC] rounded-2xl">
                  <div className="text-3xl text-[#22C55E] mb-1">{project.confidence.split('%')[0]}%</div>
                  <div className="text-sm text-[#22C55E] mb-3">AI Confidence</div>
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-3">
                    <div 
                      className="h-full bg-[#22C55E] rounded-full transition-all duration-1000" 
                      style={{ width: project.confidence.split('%')[0] + '%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#334155] mb-2">High probability of success</p>
                  <p className="text-xs text-[#64748B]">🤖 Based on your skill level & time</p>
                </div>

                {/* Effort vs Learning - PURPLE for AI Intelligence */}
                <div className="p-5 bg-gradient-to-br from-[#F3F1FF] to-[#F3F1FF] border border-[#7C6CF6]/30 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl text-[#7C6CF6] mb-1">{effortLevel}</div>
                      <div className="text-xs text-[#64748B]">Effort Required</div>
                    </div>
                    <Zap className="w-10 h-10 text-[#7C6CF6]" />
                  </div>
                  <div className="text-sm text-[#334155] mb-1">
                    Learning Impact: <span className="text-[#7C6CF6]">{learningImpact}</span>
                  </div>
                  <p className="text-xs text-[#64748B]">Best learning-to-effort ratio</p>
                </div>

                {/* Match Score - CYAN for Personalization */}
                <div className="p-5 bg-gradient-to-br from-[#ECFEFF] to-[#ECFEFF] border border-[#67E8F9] rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-3xl text-[#22D3EE] mb-1">94%</div>
                      <div className="text-sm text-[#22D3EE]">Perfect Match</div>
                    </div>
                    <Award className="w-8 h-8 text-[#22D3EE]" />
                  </div>
                  <p className="text-xs text-[#334155] mt-3">Based on your goals, time, and preferences</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className={`px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    isSaved
                      ? 'bg-[#9B8CFF] text-white shadow-md'
                      : 'bg-white border-2 border-gray-200 text-[#666] hover:border-[#9B8CFF] hover:text-[#9B8CFF]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  {isSaved ? 'Saved locally ' : 'Save (no account)'}
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-2.5 bg-white border-2 border-gray-200 text-[#666] hover:border-[#3EC1D3] hover:text-[#3EC1D3] rounded-xl transition-all duration-200 flex items-center gap-2"
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {isCopied ? 'Link Copied!' : 'Share'}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="px-6 py-2.5 bg-white border-2 border-gray-200 text-[#666] hover:border-[#1F3C88] hover:text-[#1F3C88] rounded-xl transition-all duration-200 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* LAYER 3: CORE IDEA DETAILS - Tabs for Progressive Disclosure */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              
              {/* Tab Navigation - 2x2 Grid */}
              <div className="border-b border-gray-200 bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'features', label: 'Features', icon: Layers },
                    { id: 'techstack', label: 'Tech Stack', icon: Code2 },
                    { id: 'roadmap', label: 'Roadmap', icon: Target },
                    { id: 'learning', label: 'Learning', icon: TrendingUp }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-center gap-2 sm:gap-3 transition-all duration-200 rounded-xl border-2 ${
                          activeTab === tab.id
                            ? 'bg-white text-[#1F3C88] border-[#1F3C88] shadow-md'
                            : 'bg-white/50 text-[#666] border-gray-200 hover:text-[#1F3C88] hover:border-[#3EC1D3]/50 hover:bg-white'
                        }`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-sm sm:text-base font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6 lg:p-8">
                
                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-[#1F3C88] text-lg sm:text-xl mb-4 sm:mb-5">Key Features to Build</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-gradient-to-br from-[#F7F9FC] to-white rounded-xl border border-gray-100 hover:border-[#3EC1D3]/50 hover:shadow-md transition-all duration-300 group">
                          <div className="w-6 h-6 bg-[#3EC1D3] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm sm:text-base text-[#1E1E1E]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Tab */}
                {activeTab === 'techstack' && (
                  <div>
                    <h3 className="text-[#1F3C88] text-lg sm:text-xl mb-4 sm:mb-5">Recommended Tech Stack</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-[#1F3C88] to-[#3EC1D3] rounded-full"></div>
                          <p className="text-sm text-[#666]">Primary Stack (AI Recommended)</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {project.techStack.primary.map((tech, index) => (
                            <span key={index} className="px-5 py-3 bg-gradient-to-r from-[#1F3C88] to-[#3EC1D3] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <p className="text-sm text-[#666]">Alternative Options</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {project.techStack.alternative.map((tech, index) => (
                            <span key={index} className="px-5 py-3 bg-white border-2 border-gray-200 text-[#666] rounded-xl hover:border-[#1F3C88] hover:text-[#1F3C88] hover:shadow-md transition-all duration-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Roadmap Tab */}
                {activeTab === 'roadmap' && (
                  <div>
                    <h3 className="text-[#1F3C88] text-xl mb-5">Development Roadmap</h3>
                    <div className="space-y-4">
                      {project.roadmap.map((phase, index) => (
                        <div key={index} className="relative">
                          {index < project.roadmap.length - 1 && (
                            <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-gradient-to-b from-[#3EC1D3] to-transparent"></div>
                          )}
                          <div className="flex gap-4 p-5 bg-gradient-to-br from-[#F7F9FC] to-white rounded-2xl border border-gray-100 hover:border-[#3EC1D3]/50 hover:shadow-md transition-all duration-300">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#1F3C88] to-[#3EC1D3] rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[#1F3C88]">{phase.title}</h4>
                                <span className="text-xs text-white bg-[#3EC1D3] px-3 py-1 rounded-full">
                                  {phase.duration}
                                </span>
                              </div>
                              <p className="text-[#666] text-sm leading-relaxed">{phase.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learning Tab */}
                {activeTab === 'learning' && (
                  <div>
                    <h3 className="text-[#1F3C88] text-xl mb-5">What You'll Learn</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.skillOutcomes.map((skill, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#F7F9FC] to-white rounded-xl border border-gray-100 hover:border-[#9B8CFF]/50 transition-all duration-300">
                          <TrendingUp className="w-5 h-5 text-[#9B8CFF] flex-shrink-0 mt-0.5" />
                          <span className="text-[#1E1E1E]">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* What NOT to Build */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl border-2 border-amber-200 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5 mb-4 sm:mb-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-amber-900 text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3">What NOT to Build</h2>
                  <p className="text-sm sm:text-base text-amber-700 mb-3 sm:mb-4">The AI recommends avoiding these to keep your project on track:</p>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-amber-800">No backend required — keep it simple with local storage</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-amber-800">Avoid complex authentication — focus on core features first</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-amber-800">Do not over-optimize UI — functionality before polish</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#9B8CFF] to-[#7c6fd9] rounded-lg sm:rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-[#1F3C88] text-lg sm:text-xl">Learning Resources</h2>
              </div>
              <div className="space-y-3">
                {[
                  { icon: FileText, title: 'Official Documentation', desc: `Read the docs for ${project.techStack.primary[0]}`, tags: ['Beginner Friendly', 'Free'] },
                  { icon: Youtube, title: 'Video Tutorials', desc: 'Step-by-step project tutorials', tags: ['Visual Learning', 'Free'] },
                  { icon: Github, title: 'Example Projects', desc: 'Browse similar open-source projects', tags: ['Code Examples', 'Open Source'] }
                ].map((resource, i) => {
                  const Icon = resource.icon;
                  return (
                    <div key={i} className="group p-4 bg-[#F7F9FC] rounded-xl border border-gray-100 hover:border-[#3EC1D3] hover:shadow-md transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#1F3C88]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[#1F3C88]">{resource.title}</h4>
                            <ExternalLink className="w-4 h-4 text-[#666] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-[#666] mb-2">{resource.desc}</p>
                          <div className="flex gap-2">
                            {resource.tags.map((tag, j) => (
                              <span key={j} className="px-2 py-0.5 bg-white text-xs text-[#666] rounded border border-gray-200">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Sidebar - LAYER 4: AI ACTION ZONE (STICKY) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              
              {/* AI MENTOR ACTIONS - POWERFUL & COLORFUL */}
              <div className="bg-gradient-to-br from-[#1F3C88] via-[#2d5ac9] to-[#3EC1D3] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#3EC1D3]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
                  </div>
                  <h3 className="text-white text-lg sm:text-xl">AI Mentor Actions</h3>
                </div>
                <p className="text-white/90 text-xs sm:text-sm mb-5 sm:mb-6">Adjust this idea without starting over</p>
                
                <div className="space-y-2.5 sm:space-y-3">
                  <button
                    onClick={onRefine}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/95 hover:bg-white text-[#1F3C88] rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group text-sm sm:text-base"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="font-medium">Refine This Idea</span>
                  </button>

                  <button
                    onClick={onIncreaseDifficulty}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#9B8CFF] hover:bg-[#8a7ae6] text-white rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group text-sm sm:text-base"
                  >
                    <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform" />
                    <span>Make It Harder</span>
                  </button>

                  <button
                    onClick={onSimplify}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#3EC1D3] hover:bg-[#36acc0] text-white rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group text-sm sm:text-base"
                  >
                    <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
                    <span>Simplify It</span>
                  </button>

                  <div className="pt-3 sm:pt-4 border-t border-white/20">
                    <button
                      onClick={onGenerateAnother}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border border-white/30 text-sm sm:text-base"
                    >
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Generate New Idea</span>
                    </button>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="text-xs text-white/90 text-center flex items-center justify-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>AI will adjust without losing your preferences</span>
                  </p>
                </div>
              </div>

              {/* WHY AI CHOSE THIS - MOVED TO SIDEBAR */}
              <div className="bg-gradient-to-br from-[#3EC1D3]/10 via-white to-[#9B8CFF]/10 rounded-2xl sm:rounded-3xl border-2 border-[#3EC1D3]/30 p-4 sm:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#3EC1D3] to-[#2a9ca9] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[#1F3C88] text-base sm:text-lg font-semibold mb-2">Why the AI Chose This Idea</h3>
                    <p className="text-xs sm:text-sm text-[#666] italic leading-relaxed">{project.reasoning}</p>
                  </div>
                </div>
                
                {/* AI Reasoning Bullets */}
                <div className="space-y-2 bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-[#3EC1D3]/20">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3EC1D3] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#666]">You selected <span className="text-[#1F3C88] font-medium">{project.difficulty}</span> skill level</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3EC1D3] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#666]">You have <span className="text-[#1F3C88] font-medium">2-4 weeks</span> available</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3EC1D3] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#666]">You prefer <span className="text-[#1F3C88] font-medium">Web Development</span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3EC1D3] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#666]">This project <span className="text-[#1F3C88] font-medium">maximizes learning with low risk</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#3EC1D3] bg-[#3EC1D3]/10 px-3 py-2 rounded-xl border border-[#3EC1D3]/20 mt-3">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="leading-relaxed">Based on your unique answers</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}