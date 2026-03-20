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
        duration: number;
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

export interface HackathonRoadmap {
    title: string;
    timeline: string;
    feasibility: 'High' | 'Medium' | 'Low';
    feasibilityNote?: string;
    strategicAnalysis: {
        achievability: string;
        biggestRisk?: string;
        winningAngle?: string;
        skillGaps: string[];
        mitigations: string[];
    };
    roadmap: {
        phase: string;
        title?: string;
        timeBlock?: string;
        goal?: string;
        tasks: {
            task: string;
            assignedTo: string;
            duration: string;
            priority?: 'Must' | 'Should' | 'Nice';
        }[];
    }[];
    mvpScope: {
        mustHave: string[];
        niceToHave: string[];
        cutIfNeeded: string[];
    };
    techRecommendations?: {
        shortcuts: string[];
        avoid: string[];
    };
    risks: {
        risk: string;
        likelihood?: 'High' | 'Medium' | 'Low';
        mitigation: string;
    }[];
    submissionChecklist: {
        item: string;
        timeAllocation: string;
        critical?: boolean;
        completed: boolean;
    }[];
    demoScript: {
        hook: string;
        problem: string;
        theWOW: string;
        closing: string;
    };
}

export interface HackathonInputs {
  projectTitle: string;
  timeline: string;
  teamSize: string;
  teamMembers: { skill: string; level: string }[];
  submissionRequirements: string[];
}
