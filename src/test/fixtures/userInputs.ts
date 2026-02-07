import { UserInputs } from '../../App';

/**
 * Test fixtures for UserInputs
 */

export const beginnerUserInputs: UserInputs = {
  skillLevel: 'beginner',
  domain: 'web',
  learningGoal: 'frontend',
  timeAvailability: '4-6 weeks',
  deployment: 'yes',
};

export const intermediateUserInputs: UserInputs = {
  skillLevel: 'intermediate',
  domain: 'web',
  learningGoal: 'fullstack',
  timeAvailability: '6-8 weeks',
  deployment: 'yes',
  technologies: ['React', 'Node.js', 'PostgreSQL'],
};

export const advancedUserInputs: UserInputs = {
  skillLevel: 'advanced',
  domain: 'web',
  learningGoal: 'fullstack',
  timeAvailability: '2-3 months',
  technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
  architecture: 'microservices',
  scalability: 'high',
  constraints: 'Must handle 10k concurrent users',
  teamSize: '1',
};

export const minimalUserInputs: UserInputs = {
  skillLevel: 'beginner',
};

export const emptyUserInputs: UserInputs = {
  skillLevel: null,
};
