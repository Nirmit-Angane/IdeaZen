import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { LandingPage } from './screens/LandingPage/LandingPage';
import { SkillLevelSelection } from './screens/SkillLevelSelection/SkillLevelSelection';
import { QuestionFlow } from './screens/QuestionFlow/QuestionFlow';
import { ProjectOutput } from './screens/ProjectOutput/ProjectOutput';
import { MyIdeas } from './screens/MyIdeas/MyIdeas';
import { GeneratingScreen } from './screens/GeneratingScreen/GeneratingScreen';
import { IdeaPreview } from './screens/IdeaPreview/IdeaPreview';
import { Footer } from './components/Layout/Footer';
import { Navbar } from './components/Layout/Navbar';
import { HackathonModeEntry } from './screens/Hackathon/HackathonModeEntry/HackathonModeEntry';
import { HackathonQuestionFlow } from './screens/Hackathon/HackathonQuestionFlow/HackathonQuestionFlow';
import { HackathonRoadmapOutput } from './screens/Hackathon/HackathonRoadmapOutput/HackathonRoadmapOutput';
import { fetchSuggestions, fetchBlueprint } from './services/generate.service';
import { fetchHackathonRoadmap } from './services/hackathon.service';
import type { 
  SkillLevel, 
  UserInputs, 
  GeneratedProject, 
  HackathonContext, 
  HackathonRoadmap,
  HackathonInputs
} from './types';

export type { HackathonContext, HackathonRoadmap, SkillLevel, UserInputs, GeneratedProject, HackathonInputs };

export type AppMode = 'regular' | 'hackathon';

// ---- Shared in-memory generation state ----
export const _sharedState = {
  userInputs: { skillLevel: null } as UserInputs,
  generatedIdeas: [] as GeneratedProject[],
  hackathonContext: null as Partial<HackathonContext> | null,
  hackathonProjectTitle: '',
  hackathonRoadmap: null as HackathonRoadmap | null,
  selectedTitle: '',
};

// Save project to localStorage, return its id
export function saveProjectById(project: GeneratedProject, existingId?: string): string {
  const id = existingId || `idea-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  try {
    localStorage.setItem(`ideazen_output_${id}`, JSON.stringify(project));
  } catch (e) {
    console.warn('localStorage unavailable', e);
  }
  return id;
}

export function loadProjectById(id: string): GeneratedProject | null {
  try {
    const raw = localStorage.getItem(`ideazen_output_${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ---- Route components ----

function OutputPageRoute() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<GeneratedProject | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!ideaId) { setNotFound(true); return; }
    const loaded = loadProjectById(ideaId);
    if (loaded) {
      setProject(loaded);
    } else {
      setNotFound(true);
    }
  }, [ideaId]);

  const handleIncreaseDifficulty = async () => {
    if (!project) return;
    _sharedState.selectedTitle = project.title;
    _sharedState.userInputs = { ..._sharedState.userInputs, difficultyStretch: 'more-complex' };
    navigate('/generating-blueprint');
  };
  const handleSimplify = async () => {
    if (!project) return;
    _sharedState.selectedTitle = project.title;
    _sharedState.userInputs = { ..._sharedState.userInputs, difficultyStretch: 'simpler' };
    navigate('/generating-blueprint');
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-[#1F3C88] mb-3">Idea not found</h2>
          <p className="text-[#64748B] mb-6">This link may have expired or been opened in a different browser.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-[#1F3C88] to-[#7C6CF6] text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!project) return <GeneratingScreen mode="blueprint" />;

  return (
    <ProjectOutput
      project={project}
      userInputs={_sharedState.userInputs}
      onRefine={() => navigate('/skill')}
      onIncreaseDifficulty={handleIncreaseDifficulty}
      onSimplify={handleSimplify}
      onGenerateAnother={() => navigate('/generating')}
      onStartOver={() => navigate('/')}
    />
  );
}

function GeneratingPageRoute() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState(0); // force re-run on retry

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetchSuggestions(_sharedState.userInputs)
      .then((ideas) => {
        if (cancelled) return;
        _sharedState.generatedIdeas = ideas as unknown as GeneratedProject[];
        navigate('/idea-preview', { replace: true });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || 'The AI could not generate ideas right now.');
      });
    return () => { cancelled = true; };
  }, [key]);

  return (
    <GeneratingScreen
      mode="ideas"
      error={error}
      onRetry={() => setKey(k => k + 1)}
      onTryDifferentFlow={() => navigate('/skill')}
    />
  );
}

function GeneratingBlueprintPageRoute() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    const title = _sharedState.selectedTitle;
    fetchBlueprint(_sharedState.userInputs, title)
      .then((result: GeneratedProject) => {
        if (cancelled) return;
        const id = saveProjectById(result);
        navigate(`/output/${id}`, { replace: true });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || 'The AI could not generate the blueprint right now.');
      });
    return () => { cancelled = true; };
  }, [key]);

  return (
    <GeneratingScreen
      mode="blueprint"
      error={error}
      onRetry={() => setKey(k => k + 1)}
      onTryDifferentFlow={() => navigate('/idea-preview')}
    />
  );
}

function HackathonGeneratingPageRoute() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    // Build HackathonInputs from hackathonContext or use directly if it is already HackathonInputs
    const rawCtx = _sharedState.hackathonContext as any;
    
    // Check if it's the new flatter structure or old complex one
    const inputs: HackathonInputs = (rawCtx && rawCtx.submissionRequirements) 
      ? rawCtx as HackathonInputs
      : {
          projectTitle: _sharedState.hackathonProjectTitle,
          timeline: String(rawCtx?.timeline?.duration || 48),
          teamSize: String(rawCtx?.team?.size || 1),
          teamMembers: (rawCtx?.team?.members || []).map((m: any) => ({ skill: m.role, level: m.proficiency })),
          submissionRequirements: Object.entries(rawCtx?.submission || {})
            .filter(([, v]) => v === true)
            .map(([k]) => k.replace('Required', '')),
        };
    
    fetchHackathonRoadmap(inputs)
      .then((roadmap: HackathonRoadmap) => {
        if (cancelled) return;
        _sharedState.hackathonRoadmap = roadmap;
        navigate('/hackathon/output', { replace: true });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || 'Could not generate the hackathon roadmap right now.');
      });
    return () => { cancelled = true; };
  }, [key]);

  return (
    <GeneratingScreen
      mode="blueprint"
      error={error}
      onRetry={() => setKey(k => k + 1)}
      onTryDifferentFlow={() => navigate('/hackathon')}
    />
  );
}

function HackathonOutputPageRoute() {
  const navigate = useNavigate();
  const roadmap = _sharedState.hackathonRoadmap;

  if (!roadmap) return <Navigate to="/hackathon" replace />;

  return (
    <HackathonRoadmapOutput
      roadmap={roadmap}
      onAdjustTimeline={() => navigate('/hackathon/generating', { replace: true })}
      onSimplifyScope={() => navigate('/hackathon/generating', { replace: true })}
      onAddTeamMember={() => navigate('/hackathon')}
      onGenerateNew={() => navigate('/hackathon/generating', { replace: true })}
      onStartOver={() => navigate('/')}
    />
  );
}

function IdeaPreviewPageRoute() {
  const navigate = useNavigate();
  const ideas = _sharedState.generatedIdeas;

  if (!ideas || ideas.length === 0) return <Navigate to="/" replace />;

  return (
    <IdeaPreview
      ideas={ideas}
      onSelectIdea={(idea: GeneratedProject) => {
        _sharedState.selectedTitle = idea.title;
        navigate('/generating-blueprint');
      }}
    />
  );
}

function QuestionPageRoute() {
  const navigate = useNavigate();
  const inputs = _sharedState.userInputs;

  if (!inputs.skillLevel) return <Navigate to="/skill" replace />;

  return (
    <QuestionFlow
      skillLevel={inputs.skillLevel}
      initialInputs={inputs}
      onComplete={(completed: UserInputs) => {
        _sharedState.userInputs = completed;
        navigate('/generating');
      }}
      onBack={() => navigate('/skill')}
    />
  );
}

function HackathonQuestionsPageRoute() {
  const navigate = useNavigate();
  const ctx = _sharedState.hackathonContext;

  return (
    <HackathonQuestionFlow
      projectTitle={_sharedState.hackathonProjectTitle || 'My Hackathon Project'}
      onComplete={(inputs: HackathonInputs) => {
        _sharedState.hackathonContext = inputs as any; // Cast to bypass Partial<HackathonContext> mismatch
        navigate('/hackathon/generating');
      }}
      onBack={() => navigate('/hackathon')}
    />
  );
}

// ---- Root App ----
export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={
            <LandingPage
              onGetStarted={() => navigate('/skill')}
              onStartHackathonMode={() => navigate('/hackathon')}
            />
          }
        />

        {/* Regular flow */}
        <Route
          path="/skill"
          element={
            <SkillLevelSelection
              onSelectLevel={(level: SkillLevel) => {
                _sharedState.userInputs = { ..._sharedState.userInputs, skillLevel: level };
                navigate('/questions');
              }}
            />
          }
        />
        <Route path="/questions" element={<QuestionPageRoute />} />
        <Route path="/generating" element={<GeneratingPageRoute />} />
        <Route path="/generating-blueprint" element={<GeneratingBlueprintPageRoute />} />
        <Route path="/idea-preview" element={<IdeaPreviewPageRoute />} />
        <Route path="/output/:ideaId" element={<OutputPageRoute />} />

        {/* My Ideas */}
        <Route
          path="/my-ideas"
          element={
            <MyIdeas
              onViewProject={(project: GeneratedProject) => {
                const id = saveProjectById(project);
                navigate(`/output/${id}`);
              }}
            />
          }
        />

        {/* Hackathon flow */}
        <Route
          path="/hackathon"
          element={
            <HackathonModeEntry
              onContinue={(title: string) => {
                _sharedState.hackathonProjectTitle = title;
                navigate('/hackathon/questions');
              }}
              onBack={() => navigate('/')}
            />
          }
        />
        <Route path="/hackathon/questions" element={<HackathonQuestionsPageRoute />} />
        <Route path="/hackathon/generating" element={<HackathonGeneratingPageRoute />} />
        <Route path="/hackathon/output" element={<HackathonOutputPageRoute />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer on all non-landing pages */}
      <Routes>
        <Route path="/" element={null} />
        <Route path="*" element={<Footer />} />
      </Routes>
    </div>
  );
}