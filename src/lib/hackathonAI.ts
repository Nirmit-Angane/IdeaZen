import { HackathonInputs, HackathonRoadmap } from '../App';

export async function generateHackathonRoadmap(
    inputs: HackathonInputs
): Promise<HackathonRoadmap> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Intelligent logic based on inputs
    const teamCount = inputs.teamSize === 'solo' ? 1 : inputs.teamSize === '2-person' ? 2 : inputs.teamSize === '3-4' ? 3 : 5;
    const timelineHours = parseInt(inputs.timeline) || 48;

    // Detect skill gaps
    const skills = inputs.teamMembers.map(m => m.skill);
    const skillGaps: string[] = [];
    if (!skills.includes('frontend')) skillGaps.push('Frontend Development');
    if (!skills.includes('backend')) skillGaps.push('Backend Development');
    if (!skills.includes('design')) skillGaps.push('UI/UX Design');

    // Calculate feasibility
    const feasibility: 'High' | 'Medium' =
        teamCount >= 2 && timelineHours >= 36 && skillGaps.length <= 1 ? 'High' : 'Medium';

    // Generate phase-wise roadmap
    const phases = timelineHours === 24 ? 4 : timelineHours <= 48 ? 6 : 8;
    const hoursPerPhase = Math.floor(timelineHours / phases);

    const roadmap = Array.from({ length: phases }, (_, i) => {
        const startHour = i * hoursPerPhase;
        const endHour = (i + 1) * hoursPerPhase;

        return {
            phase: `Hours ${startHour}-${endHour}`,
            tasks: generateTasksForPhase(i, phases, inputs.teamMembers)
        };
    });

    // Generate submission checklist based on requirements
    const submissionChecklist = inputs.submissionRequirements.map(req => ({
        item: req === 'demo' ? 'Working Demo' :
            req === 'pitch-deck' ? 'Pitch Deck (10 slides)' :
                req === 'video' ? 'Demo Video (2-3 min)' :
                    req === 'github' ? 'GitHub Repository' :
                        'Live Deployment',
        timeAllocation: req === 'demo' ? '2 hours' :
            req === 'pitch-deck' ? '1.5 hours' :
                req === 'video' ? '1 hour' :
                    req === 'github' ? '30 min' :
                        '2 hours',
        completed: false
    }));

    return {
        title: inputs.projectTitle,
        feasibility,
        timeline: inputs.timeline,
        strategicAnalysis: {
            achievability: feasibility === 'High'
                ? `With ${teamCount} team member${teamCount > 1 ? 's' : ''} and ${timelineHours} hours, this project is highly achievable. Your team has strong coverage across key areas.`
                : `This is achievable but requires focused execution. With ${timelineHours} hours and your current team composition, prioritize MVP features ruthlessly.`,
            skillGaps,
            mitigations: skillGaps.map(gap =>
                gap === 'Frontend Development' ? 'Use UI libraries like Bootstrap or Tailwind for rapid prototyping' :
                    gap === 'Backend Development' ? 'Consider Firebase or Supabase for instant backend' :
                        'Use Figma templates or AI tools like v0.dev for quick designs'
            )
        },
        roadmap,
        mvpScope: {
            mustHave: [
                'Core user authentication',
                'Primary feature functionality',
                'Basic responsive UI',
                'Data persistence'
            ],
            niceToHave: [
                'Advanced animations',
                'Email notifications',
                'Social sharing',
                'Analytics dashboard'
            ],
            cutIfNeeded: [
                'Admin panel',
                'Multiple themes',
                'Advanced search filters',
                'Real-time collaboration'
            ]
        },
        risks: [
            {
                risk: 'API integration delays',
                mitigation: 'Have mock data ready as fallback; test APIs in first 6 hours'
            },
            {
                risk: 'Scope creep',
                mitigation: 'Lock features after Hour 12; focus only on MVP'
            },
            {
                risk: 'Last-minute bugs',
                mitigation: 'Reserve final 4 hours for testing and polish only'
            }
        ],
        submissionChecklist
    };
}

function generateTasksForPhase(
    phaseIndex: number,
    totalPhases: number,
    teamMembers: HackathonInputs['teamMembers']
): HackathonRoadmap['roadmap'][0]['tasks'] {
    const roles = teamMembers.map(m => m.skill);

    // Early phases: Setup and core features
    if (phaseIndex === 0) {
        return [
            { task: 'Project setup, repo creation, environment config', assignedTo: 'Backend', duration: '1h' },
            { task: 'Design wireframes and color scheme', assignedTo: 'Design/Frontend', duration: '1.5h' },
            { task: 'Set up database schema', assignedTo: 'Backend', duration: '1h' }
        ];
    }

    // Middle phases: Core development
    if (phaseIndex < totalPhases - 2) {
        return [
            { task: 'Build UI components', assignedTo: 'Frontend', duration: '2h' },
            { task: 'Implement API endpoints', assignedTo: 'Backend', duration: '2h' },
            { task: 'Integrate frontend with backend', assignedTo: 'Full Stack', duration: '1.5h' }
        ];
    }

    // Final phases: Polish and submission
    return [
        { task: 'Bug fixes and testing', assignedTo: 'Everyone', duration: '1.5h' },
        { task: 'Prepare demo and pitch', assignedTo: 'Team Lead', duration: '1h' },
        { task: 'Deploy and submit', assignedTo: 'DevOps/Backend', duration: '1h' }
    ];
}
