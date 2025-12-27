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
