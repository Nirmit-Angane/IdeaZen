import { Bookmark, Trash2, Eye, Calendar, GitCompare, Check, Clock, Zap, Award, X, Target, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { GeneratedProject } from '../../types/project.types';
import { useState, useEffect } from 'react';

interface SavedProject extends GeneratedProject {
  id: string;
  savedAt: string;
}

interface MyIdeasProps {
  onViewProject: (project: GeneratedProject) => void;
}

export function MyIdeas({ onViewProject }: MyIdeasProps) {
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'difficulty' | 'confidence'>('newest');

  useEffect(() => {
    const saved = localStorage.getItem('ideaZen_savedIdeas');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedProjects(parsed.map((p: SavedProject) => ({
          ...p,
          id: p.id || Math.random().toString(36).substr(2, 9)
        })));
      } catch (e) {
        console.error('Failed to parse saved ideas:', e);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = savedProjects.filter(p => p.id !== id);
    localStorage.setItem('ideaZen_savedIdeas', JSON.stringify(updated));
    setSavedProjects(updated);
    setSelectedForCompare(prev => prev.filter((i: string) => i !== id));
    setSelectedIds(prev => prev.filter((i: string) => i !== id)); // Also remove from multi-select
  };

  const handleToggleCompare = (id: string) => {
    setSelectedForCompare((prev: string[]) => {
      if (prev.includes(id)) {
        return prev.filter((i: string) => i !== id);
      } else if (prev.length < 2) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    setShowComparison(true);
  };

  const handleCloseComparison = () => {
    setShowComparison(false);
    setSelectedForCompare([]);
  };

  const toggleSelect = (projectId: string) => {
    setSelectedIds((prev: string[]) =>
      prev.includes(projectId)
        ? prev.filter((i: string) => i !== projectId)
        : [...prev, projectId]
    );
  };

  const deleteIdeas = () => {
    const remaining = savedProjects.filter((i: SavedProject) => !selectedIds.includes(i.id));
    setSavedProjects(remaining);
    localStorage.setItem('ideaZen_savedIdeas', JSON.stringify(remaining));
    setSelectedIds([]);
    setSelectedForCompare((prev: string[]) => prev.filter((id: string) => !selectedIds.includes(id))); // Also remove from compare selection
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return { bg: 'bg-[#22D3EE]', text: 'text-[#0E7490]', light: 'bg-[#22D3EE]/10', border: 'border-[#22D3EE]/30' };
      case 'intermediate': return { bg: 'bg-[#1F3C88]', text: 'text-[#1F3C88]', light: 'bg-[#1F3C88]/10', border: 'border-[#1F3C88]/30' };
      case 'advanced': return { bg: 'bg-[#0F172A]', text: 'text-[#0F172A]', light: 'bg-[#0F172A]/10', border: 'border-[#0F172A]/30' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-600', light: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredAndSortedProjects = savedProjects
    .filter((project: SavedProject) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.title?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query);
      return matchesSearch;
    })
    .sort((a: SavedProject, b: SavedProject) => {
      if (sortBy === 'newest') return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
      if (sortBy === 'oldest') return new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime();
      if (sortBy === 'confidence') {
        const confA = parseInt(a.confidence.split('%')[0]) || 0;
        const confB = parseInt(b.confidence.split('%')[0]) || 0;
        return confB - confA;
      }
      if (sortBy === 'difficulty') {
        const diffOrders: Record<string, number> = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        return (diffOrders[a.difficulty.toLowerCase()] || 0) - (diffOrders[b.difficulty.toLowerCase()] || 0);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-[#1F3C88] rounded-2xl flex items-center justify-center shadow-md">
              <Bookmark className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-[#1F3C88] text-4xl mb-3 font-bold">My Saved Ideas</h1>
          <p className="text-[#64748B]">Saved locally — no account required</p>
        </div>

        {/* Controls: Search and Sort */}
        {savedProjects.length > 0 && !showComparison && (
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search ideas by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent outline-none transition-all shadow-sm text-gray-700 font-medium"
              />
            </div>
            <div className="relative min-w-[200px] md:min-w-[240px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent outline-none transition-all shadow-sm text-gray-700 font-medium appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="difficulty">Difficulty (Easy → Hard)</option>
                <option value="confidence">Confidence Score</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Comparison Mode Notice & Compare Button */}
        {savedProjects.length >= 2 && !showComparison && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <GitCompare className="w-5 h-5 text-[#22D3EE] flex-shrink-0" />
              <div>
                <p className="text-[#1F3C88] font-medium">
                  {selectedForCompare.length === 0 && "Select up to 2 ideas to compare"}
                  {selectedForCompare.length === 1 && "Select 1 more idea to compare"}
                  {selectedForCompare.length === 2 && "2 ideas selected for comparison"}
                </p>
                <p className="text-[#64748B] text-sm font-light">Compare difficulty, time, learning impact, and confidence</p>
              </div>
            </div>
            <button
              onClick={handleCompare}
              disabled={selectedForCompare.length !== 2}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
                selectedForCompare.length === 2
                  ? 'bg-[#1F3C88] text-white shadow-md hover:bg-[#1A3273]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              Compare Ideas
            </button>
          </div>
        )}

        {/* Empty State */}
        {savedProjects.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-[#1F3C88] text-2xl mb-3">You haven't saved any ideas yet.</h3>
            <p className="text-[#64748B] mb-8 max-w-md mx-auto">
              Generate a project idea and save it to see it here.
            </p>
          </div>
        )}

        {/* No Search Results */}
        {savedProjects.length > 0 && filteredAndSortedProjects.length === 0 && !showComparison && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-[#1F3C88] text-2xl mb-3">No matching ideas found.</h3>
            <p className="text-[#64748B] mb-8 max-w-md mx-auto">
              Try adjusting your search terms.
            </p>
            <button
               onClick={() => setSearchQuery('')}
               className="px-6 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
               Clear Search
            </button>
          </div>
        )}

        {/* Saved Ideas List */}
        {!showComparison && (
          <div className="space-y-6">
            {filteredAndSortedProjects.map((project: SavedProject) => {
              const colors = getDifficultyColor(project.difficulty);
              const projectId = project.id;
              const isSelected = selectedForCompare.includes(projectId);

              return (
                <div
                  key={projectId}
                  className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden hover:shadow-md transition-all duration-300 ${
                    isSelected ? 'border-[#22D3EE] ring-2 ring-[#22D3EE]/10' : 'border-gray-100'
                  }`}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {savedProjects.length >= 2 && (
                            <button
                              onClick={() => handleToggleCompare(projectId)}
                              disabled={!isSelected && selectedForCompare.length >= 2}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                isSelected
                                  ? 'bg-[#22D3EE] border-[#22D3EE]'
                                  : selectedForCompare.length >= 2
                                  ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
                                  : 'bg-white border-gray-300 hover:border-[#22D3EE]'
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </button>
                          )}
                          <h3 className="text-[#1F3C88] text-2xl">{project.title}</h3>
                        </div>
                        <p className="text-[#64748B] mb-4">{project.description}</p>

                        <div className="flex flex-wrap gap-3">
                          <span className={`px-4 py-2 ${colors.light} ${colors.text} rounded-xl text-sm font-medium border ${colors.border}`}>
                            {project.difficulty}
                          </span>
                          <span className="px-4 py-2 bg-gray-100 text-[#64748B] rounded-xl text-sm font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(project.savedAt)}
                          </span>
                          <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium border border-emerald-200">
                            {project.confidence}
                          </span>
                        </div>
                        {project.skillOutcomes && (project.skillOutcomes.solidify?.length > 0 || project.skillOutcomes.gainNew?.length > 0) && (
                          <div className="mt-6">
                            <h4 className="flex items-center gap-2 text-[#1F3C88] font-semibold mb-3">
                              <Target className="w-5 h-5 text-[#22D3EE]" />
                              Skill Outcomes
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.skillOutcomes.solidify?.map((skill: string, i: number) => (
                                <span key={`solidify-${i}`} className="px-3 py-1 bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#0E7490] rounded-full text-xs uppercase tracking-wider">
                                  {skill}
                                </span>
                              ))}
                              {project.skillOutcomes.gainNew?.map((skill: string, i: number) => (
                                <span key={`new-${i}`} className="px-3 py-1 bg-[#1F3C88]/10 border border-[#1F3C88]/20 text-[#1F3C88] rounded-full text-xs uppercase tracking-wider">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => onViewProject(project)}
                        className="flex-1 px-6 py-3 bg-[#1F3C88] hover:bg-[#1A3273] text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Project
                      </button>

                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-6 py-3 bg-white text-red-600 border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Comparison View */}
        {showComparison && selectedForCompare.length === 2 && (
          <div className="space-y-6">
            {/* Close Comparison Header */}
            <div className="flex items-center justify-between bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <GitCompare className="w-6 h-6 text-[#22D3EE]" />
                <div>
                  <h2 className="text-[#1F3C88] text-xl font-semibold">Idea Comparison</h2>
                  <p className="text-[#64748B] text-sm">Side-by-side analysis of your selected ideas</p>
                </div>
              </div>
              <button
                onClick={handleCloseComparison}
                className="px-6 py-3 bg-white border-2 border-gray-200 text-[#64748B] hover:border-[#22D3EE] hover:text-[#1F3C88] rounded-xl transition-all duration-300 flex items-center gap-2 font-medium"
              >
                <X className="w-4 h-4" />
                Close Comparison
              </button>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {selectedForCompare.map((projectId) => {
                const project = savedProjects.find(p => p.id === projectId);
                if (!project) return null;
                const colors = getDifficultyColor(project.difficulty);

                // Extract metrics from project
                const timeEstimate = project.roadmap?.[project.roadmap.length - 1]?.weekRange || project.roadmap?.[project.roadmap.length - 1]?.duration || "2-4 weeks";
                const learningImpact = project.difficulty === 'Beginner' ? 'Medium' : project.difficulty === 'Intermediate' ? 'High' : 'Very High';
                const confidenceScore = parseInt(project.confidence.split('%')[0]);

                return (
                  <div
                    key={projectId}
                    className="bg-white rounded-2xl shadow-lg border-2 border-slate-100 overflow-hidden"
                  >
                    {/* Project Header */}
                    <div className="bg-slate-50 p-6 border-b border-gray-100">
                      <h3 className="text-[#1F3C88] text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-[#64748B] text-sm">{project.description}</p>
                    </div>

                    {/* Comparison Metrics */}
                    <div className="p-6 space-y-4">
                      {/* Difficulty */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-[#1F3C88]" />
                          <span className="text-sm text-[#64748B] font-medium">Difficulty Level</span>
                        </div>
                        <span className={`inline-block px-4 py-2 ${colors.bg} text-white rounded-lg font-medium`}>
                          {project.difficulty}
                        </span>
                      </div>

                      {/* Time Estimate */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-[#1F3C88]" />
                          <span className="text-sm text-[#64748B] font-medium">Time Estimate</span>
                        </div>
                        <p className="text-[#1F3C88] font-semibold">{timeEstimate}</p>
                      </div>

                      {/* Learning Impact */}
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-[#22D3EE]" />
                          <span className="text-sm text-[#0E7490] font-medium">Learning Impact</span>
                        </div>
                        <p className="text-[#1F3C88] font-semibold">{learningImpact}</p>
                        <p className="text-xs text-[#64748B] mt-1">Skills gained: {((project.skillOutcomes?.solidify?.length || 0) + (project.skillOutcomes?.gainNew?.length || 0))} outcomes</p>
                      </div>

                      {/* Confidence Score */}
                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm text-emerald-600 font-medium">AI Confidence Score</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl text-emerald-600 font-bold">{confidenceScore}%</span>
                          <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                              style={{ width: `${confidenceScore}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-xs text-[#64748B] mt-2">{project.confidence.split(' - ')[1]}</p>
                      </div>

                      {/* View Full Project Button */}
                      <button
                        onClick={() => {
                          handleCloseComparison();
                          onViewProject(project);
                        }}
                        className="w-full px-6 py-3 bg-[#1F3C88] hover:bg-[#1A3273] text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Full Project
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comparison Summary */}
            <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#22D3EE] rounded-xl flex items-center justify-center">
                  <GitCompare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[#1F3C88] text-xl font-semibold">AI Recommendation</h3>
              </div>
              <p className="text-[#64748B]">
                Both projects are well-suited for your skill level. Consider starting with the project that has higher confidence score and aligns better with your available time. You can always tackle the other project after completing the first one!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}