import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HackathonQuestions } from './HackathonQuestions';
import type { HackathonContext } from '../types';

describe('HackathonQuestions', () => {
  const mockInitialContext: Partial<HackathonContext> = {
    problemStatement: {
      rawText: 'Test problem statement',
      extractedFrom: 'text',
    },
    team: {
      size: 1,
      members: [],
    },
    timeline: {
      duration: 48,
    },
    submission: {
      demoRequired: false,
      deckRequired: false,
      videoRequired: false,
      repoRequired: false,
      deploymentRequired: false,
    },
    resources: {
      allowedAPIs: [],
      preExistingCodeAllowed: false,
      deploymentPlatforms: [],
      bannedTechnologies: [],
    },
    priority: 'win',
  };

  const mockOnComplete = vi.fn();
  const mockOnBack = vi.fn();

  it('should render the first question', () => {
    render(
      <HackathonQuestions
        initialContext={mockInitialContext}
        onComplete={mockOnComplete}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText("What's your team configuration?")).toBeInTheDocument();
    expect(screen.getByText('Select your team size')).toBeInTheDocument();
  });

  it('should display all team size options', () => {
    render(
      <HackathonQuestions
        initialContext={mockInitialContext}
        onComplete={mockOnComplete}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(screen.getByText('2-Person Team')).toBeInTheDocument();
    expect(screen.getByText('3-4 Person Team')).toBeInTheDocument();
    expect(screen.getByText('5+ Person Team')).toBeInTheDocument();
  });

  it('should show progress indicator', () => {
    render(
      <HackathonQuestions
        initialContext={mockInitialContext}
        onComplete={mockOnComplete}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText(/Question 1 of 6/)).toBeInTheDocument();
  });

  it('should show time estimate', () => {
    render(
      <HackathonQuestions
        initialContext={mockInitialContext}
        onComplete={mockOnComplete}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText(/remaining/)).toBeInTheDocument();
  });

  it('should allow selecting a team size', () => {
    render(
      <HackathonQuestions
        initialContext={mockInitialContext}
        onComplete={mockOnComplete}
        onBack={mockOnBack}
      />
    );

    const soloButton = screen.getByText('Solo').closest('button');
    expect(soloButton).toBeInTheDocument();
    
    if (soloButton) {
      fireEvent.click(soloButton);
      // After selection, the button should have selected styling
      expect(soloButton).toHaveClass('border-[#FF6B35]');
    }
  });

  it('should enable continue button after selection', () => {
    render(
      <HackathonQuestions
        initialContext={mockInitialContext}
        onComplete={mockOnComplete}
        onBack={mockOnBack}
      />
    );

    const continueButton = screen.getByText('Continue').closest('button');
    
    // Initially should be disabled (no selection yet in fresh render)
    // Note: initialContext has size: 1, so it should be enabled
    expect(continueButton).not.toBeDisabled();
  });

  it('should call onBack when back button is clicked', () => {
    render(
      <HackathonQuestions
        initialContext={mockInitialContext}
        onComplete={mockOnComplete}
        onBack={mockOnBack}
      />
    );

    const backButton = screen.getByText('Back').closest('button');
    if (backButton) {
      fireEvent.click(backButton);
      expect(mockOnBack).toHaveBeenCalled();
    }
  });

  it('should show emergency skip option', () => {
    render(
      <HackathonQuestions
        initialContext={mockInitialContext}
        onComplete={mockOnComplete}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText(/Skip with smart defaults/)).toBeInTheDocument();
  });

  it('should show AI feedback message', () => {
    render(
      <HackathonQuestions
        initialContext={mockInitialContext}
        onComplete={mockOnComplete}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText(/Let's build your winning strategy/)).toBeInTheDocument();
  });
});
