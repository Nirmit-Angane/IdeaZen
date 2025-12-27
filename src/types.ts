export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserInputs {
    skillLevel: SkillLevel;
    interests: string[];
    timeCommitment: string;
    preferredTech?: string[];
}

export interface ProjectIdea {
    title: string;
    description: string;
    quickStats: {
        difficulty: string;
        feasibility: string;
        features: string;
        timeline: string;
    };
    scores: {
        aiConfidence: number;
        matchScore: number;
        effort: 'Low' | 'Medium' | 'High' | 'Very High';
    };
    reasoning: string[];
    whatNotToBuild: string[];
    techStack: {
        primary: string[];
        alternatives: string[];
    };
    coreFeatures: string[];
    roadmap: Array<{
        phase: string;
        title: string;
        duration: string;
    }>;
}
