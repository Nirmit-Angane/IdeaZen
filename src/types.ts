export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | null;

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
    // Legacy support for AI prompt
    interests?: string[];
    timeCommitment?: string;
}

export interface GeneratedProject {
    title: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    description: string;
    reasoning: string;
    features: string[];
    techStack: {
        primary: string[];
        alternative: string[];
    };
    roadmap: {
        phase: string;
        title: string;
        description: string;
        duration: string;
    }[];
    skillOutcomes: string[];
    feasibility: 'High' | 'Medium' | 'Low';
    confidence: string;
}

export type ProjectIdea = GeneratedProject;

// Hackathon Mode Types

export interface TeamMember {
    role: 'backend' | 'frontend' | 'design' | 'ml' | 'devops' | 'fullstack';
    proficiency: 'beginner' | 'intermediate' | 'expert';
    name?: string;
}

export interface HackathonContext {
    problemStatement: {
        rawText: string;
        extractedFrom: 'pdf' | 'image' | 'text' | 'url';
        sourceUrl?: string;
    };
    analysis?: {
        mainChallenge: string;
        mustHaveFeatures: string[];
        constraints: string[];
        judgingCriteria: { criterion: string; weight: number }[];
        winningOpportunities: string[];
    };
    team: {
        size: 1 | 2 | 3 | 4 | 5;
        members: TeamMember[];
    };
    timeline: {
        duration: 24 | 36 | 48 | 72 | number;
        startTime?: string;
        endTime?: string;
    };
    submission: {
        demoRequired: boolean;
        deckRequired: boolean;
        videoRequired: boolean;
        repoRequired: boolean;
        deploymentRequired: boolean;
        presentationTime?: number;
    };
    resources: {
        allowedAPIs: string[];
        budget?: number;
        preExistingCodeAllowed: boolean;
        deploymentPlatforms: string[];
        bannedTechnologies: string[];
    };
    priority: 'win' | 'learn' | 'mvp' | 'network';
}

export interface ScopeItem {
    feature: string;
    reason: string;
    estimatedHours: number;
    dependencies: string[];
}

export interface Risk {
    description: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
}

export interface WorkStream {
    teamMember: string;
    tasks: string[];
    estimatedHours: number;
    dependencies: string[];
}

export interface Break {
    afterHour: number;
    duration: number;
    type: 'short' | 'meal' | 'sleep';
    mandatory: boolean;
}

export interface HackathonPhase {
    phaseNumber: number;
    title: string;
    hourRange: string;
    description: string;
    workStreams: WorkStream[];
    checkpoint: string;
    bufferHours: number;
    breaks: Break[];
}

export interface Slide {
    title: string;
    content: string;
    layout: 'title' | 'content' | 'image' | 'chart';
    notes?: string;
}

export interface PitchDeck {
    slides: Slide[];
    format: 'pptx' | 'pdf';
    downloadUrl?: string;
}

export interface ScriptSection {
    timeRange: string;
    title: string;
    script: string;
    screenAction: string;
}

export interface DemoScript {
    totalSeconds: number;
    sections: ScriptSection[];
}

export interface Shot {
    shotNumber: number;
    timestamp: string;
    description: string;
    screenAction: string;
    duration: number;
}

export interface VideoStoryboard {
    shots: Shot[];
    voiceoverScript: string;
    musicSuggestions: string[];
    editingTips: string[];
}

export interface SocialPost {
    platform: 'linkedin' | 'twitter' | 'devto';
    content: string;
    hashtags: string[];
}

export interface SubmissionPackage {
    pitchDeck: PitchDeck;
    demoScript: DemoScript;
    readme: string;
    videoStoryboard: VideoStoryboard;
    socialPosts: SocialPost[];
}

export interface HackathonStrategy {
    id: string;
    mode: 'hackathon';
    winningAngle: string;
    whyThisWins: string[];
    criticalSuccessFactors: string[];
    scope: {
        mustBuild: ScopeItem[];
        shouldBuild: ScopeItem[];
        niceToHave: ScopeItem[];
        dontBuild: string[];
    };
    risks: {
        technical: Risk[];
        time: Risk[];
        team: Risk[];
    };
    roadmap: HackathonPhase[];
    submissionPackage: SubmissionPackage;
    createdAt: string;
    updatedAt: string;
}

export interface Blocker {
    id: string;
    description: string;
    reportedAt: string;
    resolvedAt?: string;
    aiSuggestions: string[];
    resolved: boolean;
}

export interface Note {
    id: string;
    phaseId: string;
    taskId?: string;
    content: string;
    createdAt: string;
    tags: string[];
}

export interface TimeEntry {
    id: string;
    phaseId: string;
    taskId?: string;
    startTime: string;
    endTime?: string;
    durationMinutes: number;
}

export interface PhaseProgress {
    phaseId: string;
    status: 'not-started' | 'in-progress' | 'completed';
    startedAt?: string;
    completedAt?: string;
    actualHours: number;
    estimatedHours: number;
}

export interface ProgressTracking {
    projectId: string;
    mode: 'regular' | 'hackathon';
    status: 'not-started' | 'in-progress' | 'completed' | 'abandoned';
    startedAt: string;
    completedAt?: string;
    currentPhase: number;
    completedTasks: string[];
    inProgressTasks: string[];
    blockers: Blocker[];
    notes: Note[];
    timeTracking: TimeEntry[];
    overallProgress: number;
    phases: PhaseProgress[];
}
