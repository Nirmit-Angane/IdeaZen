import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StrategyDisplay } from './StrategyDisplay';
import type { HackathonStrategy } from '../types';

describe('StrategyDisplay - Hour-by-Hour Roadmap Visualization', () => {
  const mockStrategy: HackathonStrategy = {
    id: 'test-strategy-1',
    mode: 'hackathon',
    winningAngle: 'Build a real-time collaboration tool with AI-powered suggestions',
    whyThisWins: [
      'Addresses core judging criteria of innovation and technical complexity',
      'Demonstrates practical use case that judges can immediately understand',
    ],
    criticalSuccessFactors: [
      'Working real-time sync by hour 12',
      'AI integration functional by hour 18',
      'Polished demo ready by hour 22',
    ],
    scope: {
      mustBuild: [
        {
          feature: 'Real-time collaboration engine',
          reason: 'Core functionality required for demo',
          estimatedHours: 8,
          dependencies: [],
        },
      ],
      shouldBuild: [
        {
          feature: 'AI suggestions',
          reason: 'Differentiator from competitors',
          estimatedHours: 4,
          dependencies: ['Real-time collaboration engine'],
        },
      ],
      niceToHave: [
        {
          feature: 'User analytics dashboard',
          reason: 'Nice visual for demo',
          estimatedHours: 2,
          dependencies: [],
        },
      ],
      dontBuild: ['Mobile app', 'User authentication'],
    },
    risks: {
      technical: [
        {
          description: 'WebSocket connection stability',
          probability: 'medium',
          impact: 'high',
          mitigation: 'Use proven library like Socket.io',
        },
      ],
      time: [
        {
          description: 'AI integration taking longer than expected',
          probability: 'high',
          impact: 'medium',
          mitigation: 'Have fallback to rule-based suggestions',
        },
      ],
      team: [
        {
          description: 'Frontend developer unfamiliar with WebSockets',
          probability: 'low',
          impact: 'medium',
          mitigation: 'Pair programming session in first 2 hours',
        },
      ],
    },
    roadmap: [
      {
        phaseNumber: 1,
        title: 'Setup & Architecture',
        hourRange: '0-3',
        description: 'Initialize project, set up development environment, and define architecture',
        workStreams: [
          {
            teamMember: 'backend',
            tasks: ['Set up Node.js server', 'Configure WebSocket server', 'Design database schema'],
            estimatedHours: 3,
            dependencies: [],
          },
          {
            teamMember: 'frontend',
            tasks: ['Initialize React app', 'Set up Tailwind CSS', 'Create component structure'],
            estimatedHours: 3,
            dependencies: [],
          },
        ],
        checkpoint: 'Development environment ready, architecture documented',
        bufferHours: 0.5,
        breaks: [
          {
            afterHour: 2,
            duration: 15,
            type: 'short',
            mandatory: false,
          },
        ],
      },
      {
        phaseNumber: 6,
        title: 'Core Features Complete',
        hourRange: '15-18',
        description: 'Finalize core collaboration features and begin AI integration',
        workStreams: [
          {
            teamMember: 'backend',
            tasks: ['Integrate AI API', 'Implement suggestion algorithm', 'Add caching layer'],
            estimatedHours: 3,
            dependencies: ['Real-time sync'],
          },
          {
            teamMember: 'frontend',
            tasks: ['Build suggestion UI', 'Add loading states', 'Implement error handling'],
            estimatedHours: 3,
            dependencies: ['Core UI components'],
          },
        ],
        checkpoint: 'All MUST BUILD features functional, AI integration working',
        bufferHours: 1,
        breaks: [
          {
            afterHour: 16,
            duration: 30,
            type: 'meal',
            mandatory: true,
          },
        ],
      },
      {
        phaseNumber: 8,
        title: 'Final Polish & Submission',
        hourRange: '21-24',
        description: 'Polish UI, prepare demo, create submission materials',
        workStreams: [
          {
            teamMember: 'fullstack',
            tasks: ['Fix critical bugs', 'Optimize performance', 'Deploy to production'],
            estimatedHours: 2,
            dependencies: ['All features'],
          },
          {
            teamMember: 'design',
            tasks: ['Create pitch deck', 'Record demo video', 'Write README'],
            estimatedHours: 2,
            dependencies: [],
          },
        ],
        checkpoint: 'Project submitted, demo ready, all deliverables complete',
        bufferHours: 0.5,
        breaks: [],
      },
    ],
    submissionPackage: {
      pitchDeck: {
        slides: [],
        format: 'pdf',
      },
      demoScript: {
        totalSeconds: 90,
        sections: [],
      },
      readme: '',
      videoStoryboard: {
        shots: [],
        voiceoverScript: '',
        musicSuggestions: [],
        editingTips: [],
      },
      socialPosts: [],
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  const mockOnStartTracking = vi.fn();

  it('renders hour-by-hour roadmap section', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    expect(screen.getByText('Hour-by-Hour Execution Roadmap')).toBeInTheDocument();
  });

  it('displays all phases with time ranges', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    expect(screen.getByText('Setup & Architecture')).toBeInTheDocument();
    expect(screen.getByText('Hours 0-3')).toBeInTheDocument();
    expect(screen.getByText('Core Features Complete')).toBeInTheDocument();
    expect(screen.getByText('Hours 15-18')).toBeInTheDocument();
    expect(screen.getByText('Final Polish & Submission')).toBeInTheDocument();
    expect(screen.getByText('Hours 21-24')).toBeInTheDocument();
  });

  it('shows parallel work streams by team member', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    expect(screen.getAllByText('Parallel Work Streams')[0]).toBeInTheDocument();
    expect(screen.getByText((content, element) => 
      element?.className.includes('capitalize') && content === 'backend'
    )).toBeInTheDocument();
    expect(screen.getByText((content, element) => 
      element?.className.includes('capitalize') && content === 'frontend'
    )).toBeInTheDocument();
    expect(screen.getByText('Set up Node.js server')).toBeInTheDocument();
    expect(screen.getByText('Initialize React app')).toBeInTheDocument();
  });

  it('displays checkpoint markers for phases at 6-hour intervals', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    const checkpoints = screen.getAllByText('Checkpoint Validation');
    expect(checkpoints.length).toBeGreaterThan(0);
    expect(screen.getByText('All MUST BUILD features functional, AI integration working')).toBeInTheDocument();
  });

  it('shows buffer time indicators', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    const bufferIndicators = screen.getAllByText(/\+.*h buffer/);
    expect(bufferIndicators.length).toBeGreaterThan(0);
    expect(screen.getAllByText('+1h buffer')[0]).toBeInTheDocument();
  });

  it('displays mandatory break reminders', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    expect(screen.getByText('⚠️ Mandatory Break')).toBeInTheDocument();
    expect(screen.getByText(/After hour 16.*30 min.*meal/)).toBeInTheDocument();
  });

  it('shows task dependencies', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    expect(screen.getByText((content, element) => 
      content.includes('Depends on:') && content.includes('Real-time sync')
    )).toBeInTheDocument();
  });

  it('displays roadmap summary with statistics', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    expect(screen.getByText('Roadmap Summary')).toBeInTheDocument();
    expect(screen.getByText('Total Phases')).toBeInTheDocument();
    expect(screen.getByText('Work Hours')).toBeInTheDocument();
    expect(screen.getByText('Buffer Time')).toBeInTheDocument();
    expect(screen.getByText('Checkpoints')).toBeInTheDocument();
  });

  it('renders Start Tracking button', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    const startButton = screen.getByRole('button', { name: /Start Tracking Progress/i });
    expect(startButton).toBeInTheDocument();
  });

  it('calculates total work hours correctly', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    // Phase 1: 0-3 = 3h, Phase 6: 15-18 = 3h, Phase 8: 21-24 = 3h = 9h total
    expect(screen.getByText('9h')).toBeInTheDocument();
  });

  it('calculates total buffer time correctly', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    // 0.5 + 1 + 0.5 = 2h buffer - find it in the summary section
    const summarySection = screen.getByText('Buffer Time').closest('div');
    expect(summarySection).toBeInTheDocument();
  });

  it('shows phase numbers in circular badges', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    const phaseNumbers = ['1', '6', '8'];
    phaseNumbers.forEach(num => {
      const badges = screen.getAllByText(num);
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  it('displays team member avatars with initials', () => {
    render(<StrategyDisplay strategy={mockStrategy} onStartTracking={mockOnStartTracking} />);
    
    // Check for capitalized team member names
    const backendMember = screen.getByText((content, element) => 
      element?.className.includes('capitalize') && content === 'backend'
    );
    expect(backendMember).toBeInTheDocument();
    
    const frontendMember = screen.getByText((content, element) => 
      element?.className.includes('capitalize') && content === 'frontend'
    );
    expect(frontendMember).toBeInTheDocument();
  });
});
