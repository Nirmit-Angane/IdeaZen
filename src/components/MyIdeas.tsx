import { Bookmark, Trash2, Eye, Calendar, GitCompare, Check, Clock, Zap, Award, X, Target } from 'lucide-react';
import { GeneratedProject } from '../App';
import { useState, useEffect } from 'react';

interface SavedProject extends GeneratedProject {
  savedAt: string;
}

interface MyIdeasProps {
  onViewProject: (project: GeneratedProject) => void;
}

export function MyIdeas({ onViewProject }: MyIdeasProps) {
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedProjects') || '[]');
    setSavedProjects(saved);
  }, []);

  const handleDelete = (index: number) => {
    const updated = savedProjects.filter((_, i) => i !== index);
    localStorage.setItem('savedProjects', JSON.stringify(updated));
    setSavedProjects(updated);
    // Clear selection if deleted project was selected
    setSelectedForCompare(prev => prev.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

  const handleToggleCompare = (index: number) => {
    setSelectedForCompare(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else if (prev.length < 2) {
        return [...prev, index];
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

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return { bg: 'bg-[#3EC1D3]', text: 'text-[#3EC1D3]', light: 'bg-[#3EC1D3]/10', border: 'border-[#3EC1D3]' };
      case 'intermediate': return { bg: 'bg-[#1F3C88]', text: 'text-[#1F3C88]', light: 'bg-[#1F3C88]/10', border: 'border-[#1F3C88]' };
      case 'advanced': return { bg: 'bg-[#9B8CFF]', text: 'text-[#9B8CFF]', light: 'bg-[#9B8CFF]/10', border: 'border-[#9B8CFF]' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-600', light: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#1F3C88] to-[#22D3EE] rounded-2xl flex items-center justify-center shadow-lg">
              <Bookmark className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-[#1F3C88] text-4xl mb-3">My Saved Ideas</h1>
          <p className="text-[#64748B]">Saved locally — no account required</p>
        </div>

        {/* Comparison Mode Notice & Compare Button */}
        {savedProjects.length >= 2 && !showComparison && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <GitCompare className="w-5 h-5 text-[#7C6CF6] flex-shrink-0" />
              <div>
                <p className="text-[#1F3C88] font-medium">
                  {selectedForCompare.length === 0 && "Select up to 2 ideas to compare"}
                  {selectedForCompare.length === 1 && "Select 1 more idea to compare"}
                  {selectedForCompare.length === 2 && "2 ideas selected for comparison"}
                </p>
                <p className="text-[#64748B] text-sm">Compare difficulty, time, learning impact, and confidence</p>
              </div>
            </div>
            <button
              onClick={handleCompare}
              disabled={selectedForCompare.length !== 2}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
                selectedForCompare.length === 2
                  ? 'bg-gradient-to-r from-[#7C6CF6] to-[#9B8CFF] text-white shadow-lg hover:shadow-xl'
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

        {/* Saved Ideas List */}
        {!showComparison && (
          <div className="space-y-6">
            {savedProjects.map((project, index) => {
              const colors = getDifficultyColor(project.difficulty);
              const isSelected = selectedForCompare.includes(index);
              
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    isSelected ? 'border-[#7C6CF6] ring-2 ring-[#7C6CF6]/20' : 'border-gray-100'
                  }`}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {savedProjects.length >= 2 && (
                            <button
                              onClick={() => handleToggleCompare(index)}
                              disabled={!isSelected && selectedForCompare.length >= 2}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                isSelected
                                  ? 'bg-[#7C6CF6] border-[#7C6CF6]'
                                  : selectedForCompare.length >= 2
                                  ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
                                  : 'bg-white border-gray-300 hover:border-[#7C6CF6]'
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
                          <span className="px-4 py-2 bg-gradient-to-r from-[#22C55E]/10 to-[#22C55E]/5 text-[#22C55E] rounded-xl text-sm font-medium border border-[#22C55E]/30">
                            {project.confidence}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => onViewProject(project)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] hover:from-[#1A3273] hover:to-[#1F9BB3] text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Project
                      </button>
                      
                      <button
                        onClick={() => handleDelete(index)}
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
            <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <GitCompare className="w-6 h-6 text-[#7C6CF6]" />
                <div>
                  <h2 className="text-[#1F3C88] text-xl font-semibold">Idea Comparison</h2>
                  <p className="text-[#64748B] text-sm">Side-by-side analysis of your selected ideas</p>
                </div>
              </div>
              <button
                onClick={handleCloseComparison}
                className="px-6 py-3 bg-white border-2 border-gray-200 text-[#64748B] hover:border-[#1F3C88] hover:text-[#1F3C88] rounded-xl transition-all duration-300 flex items-center gap-2 font-medium"
              >
                <X className="w-4 h-4" />
                Close Comparison
              </button>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {selectedForCompare.map((projectIndex) => {
                const project = savedProjects[projectIndex];
                const colors = getDifficultyColor(project.difficulty);
                
                // Extract metrics from project
                const timeEstimate = "2-4 weeks"; // Mock data
                const learningImpact = project.difficulty === 'Beginner' ? 'Medium' : project.difficulty === 'Intermediate' ? 'High' : 'Very High';
                const confidenceScore = parseInt(project.confidence.split('%')[0]);
                
                return (
                  <div 
                    key={projectIndex}
                    className="bg-white rounded-2xl shadow-xl border-2 border-[#7C6CF6]/30 overflow-hidden"
                  >
                    {/* Project Header */}
                    <div className="bg-gradient-to-br from-[#7C6CF6]/10 to-[#9B8CFF]/5 p-6 border-b border-gray-100">
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
                      <div className="p-4 bg-gradient-to-br from-[#7C6CF6]/10 to-[#7C6CF6]/5 rounded-xl border border-[#7C6CF6]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-[#7C6CF6]" />
                          <span className="text-sm text-[#7C6CF6] font-medium">Learning Impact</span>
                        </div>
                        <p className="text-[#7C6CF6] font-semibold">{learningImpact}</p>
                        <p className="text-xs text-[#64748B] mt-1">Skills gained: {project.skillOutcomes.length} outcomes</p>
                      </div>

                      {/* Confidence Score */}
                      <div className="p-4 bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-xl border border-[#22C55E]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-[#22C55E]" />
                          <span className="text-sm text-[#22C55E] font-medium">AI Confidence Score</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl text-[#22C55E] font-bold">{confidenceScore}%</span>
                          <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#22C55E] rounded-full transition-all duration-1000"
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
                        className="w-full px-6 py-3 bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] hover:from-[#1A3273] hover:to-[#1F9BB3] text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-medium"
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
            <div className="bg-gradient-to-br from-[#F3F1FF] to-white rounded-2xl shadow-lg border border-[#7C6CF6]/30 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7C6CF6] to-[#9B8CFF] rounded-xl flex items-center justify-center">
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