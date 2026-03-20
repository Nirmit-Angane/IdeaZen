import { 
  Target, 
  Code, 
  Zap, 
  Clock, 
  Layers, 
  TrendingUp, 
  Shield 
} from 'lucide-react';

export const QUESTION_ICONS: { [key: string]: any } = {
  'domain': Target,
  'learningGoal': Code,
  'timeAvailability': Clock,
  'deployment': Zap,
  'technologies': Code,
  'architecture': Layers,
  'scalability': TrendingUp,
  'constraints': Shield
};

export const BEGINNER_QUESTIONS = [
  {
    id: 'domain',
    question: 'What type of project interests you?',
    description: 'Choose what excites you most',
    isMultiSelect: false,
    options: [
      { value: 'web', label: 'Web Development' },
      { value: 'mobile', label: 'Mobile Apps' },
      { value: 'game', label: 'Game Development' },
      { value: 'automation', label: 'Automation' }
    ]
  },
  {
    id: 'learningGoal',
    question: 'What do you want to learn?',
    description: 'Pick your main focus',
    isMultiSelect: false,
    options: [
      { value: 'frontend', label: 'Frontend Skills' },
      { value: 'backend', label: 'Backend Skills' },
      { value: 'fullstack', label: 'Full Stack' },
      { value: 'specific', label: 'Specific Technology' }
    ]
  },
  {
    id: 'timeAvailability',
    question: 'How much time can you dedicate?',
    description: 'Be realistic',
    isMultiSelect: false,
    options: [
      { value: '2-weeks', label: '2 Weeks' },
      { value: '1-month', label: '1 Month' },
      { value: '2-months', label: '2 Months' },
      { value: '3-months', label: '3+ Months' }
    ]
  },
  {
    id: 'deployment',
    question: 'Want to deploy your project?',
    description: 'Make it live on the internet',
    isMultiSelect: false,
    options: [
      { value: 'yes-simple', label: 'Yes, Easy Setup' },
      { value: 'yes-custom', label: 'Yes, Learn Deployment' },
      { value: 'no', label: 'Not Required' },
      { value: 'maybe', label: 'Maybe Later' }
    ]
  }
];

export const INTERMEDIATE_QUESTIONS = [
  {
    id: 'domain',
    question: 'What type of project do you want to build?',
    description: 'Select your focus area',
    isMultiSelect: false,
    options: [
      { value: 'fullstack-app', label: 'Full-Stack Web App' },
      { value: 'api', label: 'REST/GraphQL API' },
      { value: 'realtime', label: 'Real-time App' },
      { value: 'mobile', label: 'Mobile App' },
      { value: 'devtools', label: 'Developer Tools' }
    ]
  },
  {
    id: 'learningGoal',
    question: 'What\'s your primary learning goal?',
    description: 'What do you want to master?',
    isMultiSelect: false,
    options: [
      { value: 'architecture', label: 'Software Architecture' },
      { value: 'performance', label: 'Performance' },
      { value: 'testing', label: 'Testing & Quality' },
      { value: 'deployment', label: 'DevOps' },
      { value: 'new-tech', label: 'New Technologies' }
    ]
  },
  {
    id: 'timeAvailability',
    question: 'Project timeline?',
    description: 'Total time commitment',
    isMultiSelect: false,
    options: [
      { value: '1-month', label: '1 Month' },
      { value: '2-months', label: '2 Months' },
      { value: '3-months', label: '3 Months' },
      { value: 'flexible', label: 'Flexible' }
    ]
  },
  {
    id: 'technologies',
    question: 'Preferred tech stack?',
    description: 'Select all that interest you',
    isMultiSelect: true,
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'go', label: 'Go' },
      { value: 'database', label: 'Databases' },
      { value: 'cloud', label: 'Cloud' }
    ]
  },
  {
    id: 'deployment',
    question: 'Deployment requirements?',
    description: 'Where will this be hosted?',
    isMultiSelect: false,
    options: [
      { value: 'cloud', label: 'Cloud Platform' },
      { value: 'paas', label: 'Platform as a Service' },
      { value: 'containerized', label: 'Containerized' },
      { value: 'local', label: 'Local Only' }
    ]
  }
];

export const ADVANCED_QUESTIONS = [
  {
    id: 'domain',
    question: 'Project domain and scope?',
    description: 'Type of system to architect',
    isMultiSelect: false,
    options: [
      { value: 'distributed', label: 'Distributed Systems' },
      { value: 'ai-ml', label: 'AI/ML Integration' },
      { value: 'platform', label: 'Platform/SaaS' },
      { value: 'infrastructure', label: 'Infrastructure' },
      { value: 'performance', label: 'High-Performance' }
    ]
  },
  {
    id: 'architecture',
    question: 'Architectural patterns?',
    description: 'Select all that interest you',
    isMultiSelect: true,
    options: [
      { value: 'microservices', label: 'Microservices' },
      { value: 'event-driven', label: 'Event-Driven' },
      { value: 'serverless', label: 'Serverless' },
      { value: 'cqrs', label: 'CQRS' },
      { value: 'distributed', label: 'Distributed' },
      { value: 'reactive', label: 'Reactive' }
    ]
  },
  {
    id: 'scalability',
    question: 'Scalability requirements?',
    description: 'Expected scale',
    isMultiSelect: false,
    options: [
      { value: 'horizontal', label: 'Horizontal Scaling' },
      { value: 'vertical', label: 'Vertical Scaling' },
      { value: 'auto-scaling', label: 'Auto-scaling' },
      { value: 'not-critical', label: 'Not Critical' }
    ]
  },
  {
    id: 'technologies',
    question: 'Technology preferences?',
    description: 'Select all that apply',
    isMultiSelect: true,
    options: [
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
      { value: 'python', label: 'Python' },
      { value: 'kubernetes', label: 'Kubernetes' },
      { value: 'kafka', label: 'Kafka' },
      { value: 'grpc', label: 'gRPC' },
      { value: 'graphql', label: 'GraphQL' },
      { value: 'ai-apis', label: 'AI/ML APIs' }
    ]
  },
  {
    id: 'constraints',
    question: 'Project constraints?',
    description: 'Any specific requirements',
    isMultiSelect: false,
    options: [
      { value: 'budget', label: 'Budget Conscious' },
      { value: 'security', label: 'Security Critical' },
      { value: 'performance', label: 'Performance Critical' },
      { value: 'none', label: 'No Constraints' }
    ]
  },
  {
    id: 'timeAvailability',
    question: 'Project timeline?',
    description: 'Development duration',
    isMultiSelect: false,
    options: [
      { value: '2-months', label: '2 Months' },
      { value: '3-months', label: '3 Months' },
      { value: '6-months', label: '6 Months' },
      { value: 'ongoing', label: 'Ongoing' }
    ]
  }
];

export const QUESTIONS = {
    beginner: BEGINNER_QUESTIONS,
    intermediate: INTERMEDIATE_QUESTIONS,
    advanced: ADVANCED_QUESTIONS
};
