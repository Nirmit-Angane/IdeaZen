import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '../test/test-utils';
import userEvent from '@testing-library/user-event';
import { QuestionFlow } from './QuestionFlow';
import { SkillLevel, UserInputs } from '../App';
import * as fc from 'fast-check';

// Ensure cleanup after each property test iteration
afterEach(() => {
  cleanup();
});

/**
 * Property-Based Tests for QuestionFlow Component
 * 
 * These tests validate universal correctness properties that must hold
 * for all possible inputs using fast-check for property-based testing.
 */

describe('QuestionFlow - Property-Based Tests', () => {
  /**
   * Property 1: Skill Level Question Adaptation
   * 
   * **Validates: Requirements 2.1, 2.2, 2.3**
   * 
   * This property ensures that the question flow adapts correctly based on skill level:
   * - Beginner users get exactly 4 questions
   * - Intermediate users get exactly 5 questions
   * - Advanced users get exactly 6 questions
   */
  describe('Property 1: Skill Level Question Adaptation', () => {
    it('should always show exactly 4 questions for beginner skill level', () => {
      fc.assert(
        fc.property(
          fc.record({
            domain: fc.option(fc.constantFrom('web', 'mobile', 'game', 'automation'), { nil: undefined }),
            learningGoal: fc.option(fc.constantFrom('frontend', 'backend', 'fullstack', 'specific'), { nil: undefined }),
            timeAvailability: fc.option(fc.constantFrom('2-weeks', '1-month', '2-months', '3-months'), { nil: undefined }),
          }),
          (randomInputs) => {
            const skillLevel: SkillLevel = 'beginner';
            const initialInputs: UserInputs = {
              skillLevel,
              ...randomInputs,
            };

            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();

            const { container, unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              // Check that the progress indicator shows "Question 1 of 4"
              const progressText = screen.getAllByText(/Question \d+ of \d+/)[0];
              expect(progressText.textContent).toMatch(/Question 1 of 4/);

              // Verify the component renders (indicates 4 questions are configured)
              expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should always show exactly 5 questions for intermediate skill level', () => {
      fc.assert(
        fc.property(
          fc.record({
            domain: fc.option(fc.constantFrom('fullstack-app', 'api', 'realtime', 'mobile', 'devtools'), { nil: undefined }),
            learningGoal: fc.option(fc.constantFrom('architecture', 'performance', 'testing', 'deployment', 'new-tech'), { nil: undefined }),
            technologies: fc.option(fc.array(fc.constantFrom('react', 'vue', 'node', 'python', 'typescript', 'go', 'database', 'cloud'), { minLength: 0, maxLength: 3 }), { nil: undefined }),
          }),
          (randomInputs) => {
            const skillLevel: SkillLevel = 'intermediate';
            const initialInputs: UserInputs = {
              skillLevel,
              ...randomInputs,
            };

            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();

            const { container, unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              // Check that the progress indicator shows "Question 1 of 5"
              const progressText = screen.getAllByText(/Question \d+ of \d+/)[0];
              expect(progressText.textContent).toMatch(/Question 1 of 5/);

              // Verify the component renders
              expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should always show exactly 6 questions for advanced skill level', () => {
      fc.assert(
        fc.property(
          fc.record({
            domain: fc.option(fc.constantFrom('distributed', 'ai-ml', 'platform', 'infrastructure', 'performance'), { nil: undefined }),
            architecture: fc.option(fc.constantFrom('microservices', 'event-driven', 'serverless', 'cqrs', 'distributed', 'reactive'), { nil: undefined }),
            technologies: fc.option(fc.array(fc.constantFrom('go', 'rust', 'python', 'kubernetes', 'kafka', 'grpc', 'graphql', 'ai-apis'), { minLength: 0, maxLength: 3 }), { nil: undefined }),
          }),
          (randomInputs) => {
            const skillLevel: SkillLevel = 'advanced';
            const initialInputs: UserInputs = {
              skillLevel,
              ...randomInputs,
            };

            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();

            const { container, unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              // Check that the progress indicator shows "Question 1 of 6"
              const progressText = screen.getAllByText(/Question \d+ of \d+/)[0];
              expect(progressText.textContent).toMatch(/Question 1 of 6/);

              // Verify the component renders
              expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should adapt question count for any valid skill level', () => {
      fc.assert(
        fc.property(
          fc.constantFrom<SkillLevel>('beginner', 'intermediate', 'advanced'),
          (skillLevel) => {
            const initialInputs: UserInputs = { skillLevel };
            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();

            const { unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              const progressText = screen.getAllByText(/Question \d+ of \d+/)[0];
              const match = progressText.textContent?.match(/Question 1 of (\d+)/);
              const questionCount = match ? parseInt(match[1], 10) : 0;

              // Verify the question count matches the expected value for each skill level
              if (skillLevel === 'beginner') {
                expect(questionCount).toBe(4);
              } else if (skillLevel === 'intermediate') {
                expect(questionCount).toBe(5);
              } else if (skillLevel === 'advanced') {
                expect(questionCount).toBe(6);
              }

              // Ensure question count is always in valid range
              expect(questionCount).toBeGreaterThanOrEqual(4);
              expect(questionCount).toBeLessThanOrEqual(6);
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 2: Question Flow State Preservation
   * 
   * **Validates: Requirements 2.5, 2.6, 28.6**
   * 
   * This property ensures that navigation through the question flow preserves state:
   * - Clicking back preserves previously entered answers
   * - Progress indicator updates correctly
   * - All answers are maintained through navigation
   */
  describe('Property 2: Question Flow State Preservation', () => {
    it('should preserve answers when navigating back and forward', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom<SkillLevel>('beginner', 'intermediate', 'advanced'),
          fc.constantFrom('web', 'mobile', 'game', 'automation', 'fullstack-app', 'api', 'distributed'),
          async (skillLevel, firstAnswer) => {
            const initialInputs: UserInputs = { skillLevel };
            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();
            const user = userEvent.setup();

            const { unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              // Find and click the first option to answer the first question
              const firstOptions = screen.getAllByRole('button').filter(btn => 
                btn.className.includes('w-full px-4 py-3.5 rounded-xl')
              );
              
              if (firstOptions.length > 0) {
                await user.click(firstOptions[0]);

                // Verify the option is selected (has the selected styling)
                expect(firstOptions[0].className).toContain('border-[#1F3C88]');

                // Click Continue button
                const continueButtons = screen.getAllByText(/Continue|Generate Idea/);
                await user.click(continueButtons[0]);

                // Verify progress updated (should now be on question 2)
                const progressAfterContinue = screen.getAllByText(/Question \d+ of \d+/)[0];
                expect(progressAfterContinue.textContent).toMatch(/Question 2 of \d+/);

                // Click Back button
                const backButtons = screen.getAllByText('Back');
                await user.click(backButtons[0]);

                // Verify we're back to question 1
                const progressAfterBack = screen.getAllByText(/Question \d+ of \d+/)[0];
                expect(progressAfterBack.textContent).toMatch(/Question 1 of \d+/);

                // Verify the previously selected option is still selected
                const firstOptionsAfterBack = screen.getAllByRole('button').filter(btn => 
                  btn.className.includes('w-full px-4 py-3.5 rounded-xl')
                );
                expect(firstOptionsAfterBack[0].className).toContain('border-[#1F3C88]');
              }
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 50 } // Reduced runs due to interaction complexity
      );
    }, 30000); // 30 second timeout for async property tests

    it('should maintain all answers through complete navigation cycle', () => {
      fc.assert(
        fc.property(
          fc.constantFrom<SkillLevel>('beginner'),
          (skillLevel) => {
            const initialInputs: UserInputs = { skillLevel };
            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();

            const { unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              // Answer first question
              const firstOptions = screen.getAllByRole('button').filter(btn => 
                btn.className.includes('w-full px-4 py-3.5 rounded-xl')
              );
              
              if (firstOptions.length > 0) {
                firstOptions[0].click();
                screen.getByText(/Continue|Generate Idea/).click();

                // Answer second question
                const secondOptions = screen.getAllByRole('button').filter(btn => 
                  btn.className.includes('w-full px-4 py-3.5 rounded-xl')
                );
                if (secondOptions.length > 0) {
                  secondOptions[1].click();
                  
                  // Navigate back twice
                  screen.getByText('Back').click();
                  screen.getByText('Back').click();

                  // Verify we're at question 1 and first answer is preserved
                  const progressText = screen.getAllByText(/Question \d+ of \d+/)[0];
                  expect(progressText.textContent).toMatch(/Question 1 of 4/);

                  const optionsAfterBackNav = screen.getAllByRole('button').filter(btn => 
                    btn.className.includes('w-full px-4 py-3.5 rounded-xl')
                  );
                  expect(optionsAfterBackNav[0].className).toContain('border-[#1F3C88]');
                }
              }
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should update progress indicator correctly during navigation', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom<SkillLevel>('beginner', 'intermediate', 'advanced'),
          async (skillLevel) => {
            const initialInputs: UserInputs = { skillLevel };
            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();
            const user = userEvent.setup();

            const { unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              // Get initial progress
              const initialProgress = screen.getAllByText(/Question \d+ of \d+/)[0];
              expect(initialProgress.textContent).toMatch(/Question 1 of \d+/);

              // Answer and continue
              const options = screen.getAllByRole('button').filter(btn => 
                btn.className.includes('w-full px-4 py-3.5 rounded-xl')
              );
              
              if (options.length > 0) {
                await user.click(options[0]);
                const continueButtons = screen.getAllByText(/Continue|Generate Idea/);
                await user.click(continueButtons[0]);

                // Verify progress updated
                const updatedProgress = screen.getAllByText(/Question \d+ of \d+/)[0];
                expect(updatedProgress.textContent).toMatch(/Question 2 of \d+/);

                // Go back and verify progress reverted
                const backButtons = screen.getAllByText('Back');
                await user.click(backButtons[0]);
                const revertedProgress = screen.getAllByText(/Question \d+ of \d+/)[0];
                expect(revertedProgress.textContent).toMatch(/Question 1 of \d+/);
              }
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 50 }
      );
    }, 30000); // 30 second timeout for async property tests
  });

  /**
   * Property 3: Multi-Select Question Behavior
   * 
   * **Validates: Requirements 2.7**
   * 
   * This property ensures that multi-select questions work correctly:
   * - Multiple options can be selected for technology questions
   * - Selections are properly stored in state
   * - Continue button enables after selection
   */
  describe('Property 3: Multi-Select Question Behavior', () => {
    it('should allow multiple selections for multi-select questions', () => {
      fc.assert(
        fc.property(
          fc.constantFrom<SkillLevel>('intermediate', 'advanced'), // These levels have multi-select questions
          (skillLevel) => {
            const initialInputs: UserInputs = { skillLevel };
            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();

            const { unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              // Navigate to a multi-select question (technologies question)
              // For intermediate: question 4 is technologies (multi-select)
              // For advanced: question 4 is technologies (multi-select)
              
              // Answer first 3 questions to reach the multi-select question
              for (let i = 0; i < 3; i++) {
                const options = screen.getAllByRole('button').filter(btn => 
                  btn.className.includes('w-full px-4 py-3.5 rounded-xl')
                );
                if (options.length > 0) {
                  options[0].click();
                  const continueBtn = screen.getByText(/Continue|Generate Idea/);
                  if (!continueBtn.hasAttribute('disabled')) {
                    continueBtn.click();
                  }
                }
              }

              // Now we should be at a multi-select question
              // Check for the multi-select hint
              const multiSelectHint = screen.queryByText(/You can select multiple options/i);
              
              if (multiSelectHint) {
                // This is a multi-select question
                const options = screen.getAllByRole('button').filter(btn => 
                  btn.className.includes('w-full px-4 py-3.5 rounded-xl')
                );

                // Select first option
                if (options.length > 0) {
                  options[0].click();
                  expect(options[0].className).toContain('border-[#1F3C88]');

                  // Select second option (should also be selected)
                  if (options.length > 1) {
                    options[1].click();
                    expect(options[0].className).toContain('border-[#1F3C88]'); // First still selected
                    expect(options[1].className).toContain('border-[#1F3C88]'); // Second also selected
                  }

                  // Continue button should be enabled after selection
                  const continueBtn = screen.getByText(/Continue|Generate Idea/);
                  expect(continueBtn).not.toHaveAttribute('disabled');
                }
              }
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should store multi-select selections in state', () => {
      fc.assert(
        fc.property(
          fc.constantFrom<SkillLevel>('intermediate', 'advanced'),
          (skillLevel) => {
            const initialInputs: UserInputs = { skillLevel };
            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();

            const { unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              // Navigate to multi-select question
              for (let i = 0; i < 3; i++) {
                const options = screen.getAllByRole('button').filter(btn => 
                  btn.className.includes('w-full px-4 py-3.5 rounded-xl')
                );
                if (options.length > 0) {
                  options[0].click();
                  const continueBtn = screen.getByText(/Continue|Generate Idea/);
                  if (!continueBtn.hasAttribute('disabled')) {
                    continueBtn.click();
                  }
                }
              }

              const multiSelectHint = screen.queryByText(/You can select multiple options/i);
              
              if (multiSelectHint) {
                const options = screen.getAllByRole('button').filter(btn => 
                  btn.className.includes('w-full px-4 py-3.5 rounded-xl')
                );

                // Select multiple options
                if (options.length >= 2) {
                  options[0].click();
                  options[1].click();

                  // Both should remain selected (indicating state is maintained)
                  expect(options[0].className).toContain('border-[#1F3C88]');
                  expect(options[1].className).toContain('border-[#1F3C88]');

                  // Deselect first option
                  options[0].click();
                  
                  // First should be deselected, second should still be selected
                  expect(options[0].className).not.toContain('border-[#1F3C88]');
                  expect(options[1].className).toContain('border-[#1F3C88]');
                }
              }
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should enable continue button after multi-select selection', () => {
      fc.assert(
        fc.property(
          fc.constantFrom<SkillLevel>('intermediate', 'advanced'),
          (skillLevel) => {
            const initialInputs: UserInputs = { skillLevel };
            const mockOnComplete = vi.fn();
            const mockOnBack = vi.fn();

            const { unmount } = render(
              <QuestionFlow
                skillLevel={skillLevel}
                initialInputs={initialInputs}
                onComplete={mockOnComplete}
                onBack={mockOnBack}
              />
            );

            try {
              // Navigate to multi-select question
              for (let i = 0; i < 3; i++) {
                const options = screen.getAllByRole('button').filter(btn => 
                  btn.className.includes('w-full px-4 py-3.5 rounded-xl')
                );
                if (options.length > 0) {
                  options[0].click();
                  const continueBtn = screen.getByText(/Continue|Generate Idea/);
                  if (!continueBtn.hasAttribute('disabled')) {
                    continueBtn.click();
                  }
                }
              }

              const multiSelectHint = screen.queryByText(/You can select multiple options/i);
              
              if (multiSelectHint) {
                const options = screen.getAllByRole('button').filter(btn => 
                  btn.className.includes('w-full px-4 py-3.5 rounded-xl')
                );

                if (options.length > 0) {
                  // Before selection, continue might be disabled
                  // After selection, continue should be enabled
                  options[0].click();
                  
                  const continueBtn = screen.getByText(/Continue|Generate Idea/);
                  expect(continueBtn).not.toHaveAttribute('disabled');
                  expect(continueBtn.className).not.toContain('cursor-not-allowed');
                }
              }
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 30 }
      );
    });
  });
});
