export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | null;

export interface UserInputs {
  skillLevel: SkillLevel;
  domain?: string;
  learningGoal?: string;
  timeAvailability?: string;
  deployment?: string;
  difficultyStretch?: string;
  technologies?: string[];
  architecture?: string;
  scalability?: string;
  constraints?: string;
  teamSize?: string;
}

export interface MatchBreakdown {
  skillMatch: number;
  stackMatch: number;
  timeFit: number;
  overall: number;
  explanation?: string;
}

export interface Feature {
  name: string;
  tier: 'Core' | 'Enhanced' | 'Stretch';
  description: string;
  technicalNote?: string;
}

export interface TechStackItem {
  name: string;
  role: string;
  reason: string;
}

export interface AltTechStackItem {
  name: string;
  role: string;
  whenToUse: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  weekRange: string;
  description: string;
  duration: string;
  deliverable: string;
  tasks: string[];
}

export interface DifficultyBreakdown {
  stateComplexity: 'High' | 'Medium' | 'Low';
  stateReason: string;
  apiIntegrations: 'High' | 'Medium' | 'Low';
  apiReason: string;
  authComplexity: 'High' | 'Medium' | 'Low';
  authReason: string;
  deploymentComplexity: 'High' | 'Medium' | 'Low';
  deploymentReason: string;
}

export interface GeneratedProject {
  title: string;
  difficulty: string;
  difficultyScore: number;
  difficultyBreakdown?: DifficultyBreakdown;
  description: string;
  tagline?: string;
  realWorldComparison?: string;
  matchBreakdown?: MatchBreakdown;
  reasoning: {
    skillFit: string;
    stackFit: string;
    growthOpportunity: string;
  };
  targetUser?: string;
  features: Feature[];
  mvp?: {
    description: string;
    conditions: string[];
    demoScript: string;
  };
  techStack: {
    primary: TechStackItem[];
    alternative: AltTechStackItem[];
  };
  firstCommitGuide?: {
    intro: string;
    steps: { step: number; action: string; note?: string }[];
    firstGoal: string;
  };
  roadmap: RoadmapPhase[];
  skillOutcomes: {
    solidify: string[];
    gainNew: string[];
  };
  pitfalls?: {
    pitfall: string;
    why: string;
    mitigation: string;
  }[];
  portfolioBlurb?: string;
  resources?: {
    title: string;
    source: string;
    url: string;
    format: string;
    timeEstimate: string;
    why: string;
  }[];
  feasibility: 'High' | 'Medium' | 'Low';
  timeFit?: 'Comfortable' | 'Tight' | 'Challenging';
  confidence: string;
}

export interface IdeaCard extends Pick<GeneratedProject, 'title' | 'difficulty' | 'difficultyScore' | 'description' | 'matchBreakdown' | 'realWorldComparison' | 'reasoning' | 'targetUser' | 'features' | 'techStack' | 'roadmap' | 'feasibility'> {
    buildComplexity: 'High' | 'Medium' | 'Low';
    timeFit: 'Comfortable' | 'Tight' | 'Challenging';
}
