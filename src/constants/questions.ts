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
      { value: 'web', label: 'Web Development', emoji: '🌐' },
      { value: 'mobile', label: 'Mobile Apps', emoji: '📱' },
      { value: 'game', label: 'Game Development', emoji: '🎮' },
      { value: 'automation', label: 'Automation', emoji: '🤖' }
    ]
  },
  {
    id: 'learningGoal',
    question: 'What do you want to learn?',
    description: 'Pick your main focus',
    isMultiSelect: false,
    options: [
      { value: 'frontend', label: 'Frontend Skills', emoji: '🎨' },
      { value: 'backend', label: 'Backend Skills', emoji: '⚙️' },
      { value: 'fullstack', label: 'Full Stack', emoji: '🔥' },
      { value: 'specific', label: 'Specific Technology', emoji: '🎯' }
    ]
  },
  {
    id: 'timeAvailability',
    question: 'How much time can you dedicate?',
    description: 'Be realistic',
    isMultiSelect: false,
    options: [
      { value: '2-weeks', label: '2 Weeks', emoji: '⚡' },
      { value: '1-month', label: '1 Month', emoji: '📅' },
      { value: '2-months', label: '2 Months', emoji: '📆' },
      { value: '3-months', label: '3+ Months', emoji: '🗓️' }
    ]
  },
  {
    id: 'deployment',
    question: 'Want to deploy your project?',
    description: 'Make it live on the internet',
    isMultiSelect: false,
    options: [
      { value: 'yes-simple', label: 'Yes, Easy Setup', emoji: '✅' },
      { value: 'yes-custom', label: 'Yes, Learn Deployment', emoji: '🚀' },
      { value: 'no', label: 'Not Required', emoji: '' },
      { value: 'maybe', label: 'Maybe Later', emoji: '🤔' }
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
      { value: 'fullstack-app', label: 'Full-Stack Web App', emoji: '🌐' },
      { value: 'api', label: 'REST/GraphQL API', emoji: '🔌' },
      { value: 'realtime', label: 'Real-time App', emoji: '⚡' },
      { value: 'mobile', label: 'Mobile App', emoji: '📱' },
      { value: 'devtools', label: 'Developer Tools', emoji: '🛠️' }
    ]
  },
  {
    id: 'learningGoal',
    question: 'What\'s your primary learning goal?',
    description: 'What do you want to master?',
    isMultiSelect: false,
    options: [
      { value: 'architecture', label: 'Software Architecture', emoji: '🏗️' },
      { value: 'performance', label: 'Performance', emoji: '⚡' },
      { value: 'testing', label: 'Testing & Quality', emoji: '✅' },
      { value: 'deployment', label: 'DevOps', emoji: '🚀' },
      { value: 'new-tech', label: 'New Technologies', emoji: '🔥' }
    ]
  },
  {
    id: 'timeAvailability',
    question: 'Project timeline?',
    description: 'Total time commitment',
    isMultiSelect: false,
    options: [
      { value: '1-month', label: '1 Month', emoji: '📅' },
      { value: '2-months', label: '2 Months', emoji: '📆' },
      { value: '3-months', label: '3 Months', emoji: '🗓️' },
      { value: 'flexible', label: 'Flexible', emoji: '🔄' }
    ]
  },
  {
    id: 'technologies',
    question: 'Preferred tech stack?',
    description: 'Select all that interest you',
    isMultiSelect: true,
    options: [
      { value: 'react', label: 'React', emoji: '⚛️' },
      { value: 'vue', label: 'Vue.js', emoji: '💚' },
      { value: 'node', label: 'Node.js', emoji: '🟢' },
      { value: 'python', label: 'Python', emoji: '🐍' },
      { value: 'typescript', label: 'TypeScript', emoji: '🔷' },
      { value: 'go', label: 'Go', emoji: '🔵' },
      { value: 'database', label: 'Databases', emoji: '🗄️' },
      { value: 'cloud', label: 'Cloud', emoji: '☁️' }
    ]
  },
  {
    id: 'deployment',
    question: 'Deployment requirements?',
    description: 'Where will this be hosted?',
    isMultiSelect: false,
    options: [
      { value: 'cloud', label: 'Cloud Platform', emoji: '☁️' },
      { value: 'paas', label: 'Platform as a Service', emoji: '🚀' },
      { value: 'containerized', label: 'Containerized', emoji: '🐳' },
      { value: 'local', label: 'Local Only', emoji: '💻' }
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
      { value: 'distributed', label: 'Distributed Systems', emoji: '🌐' },
      { value: 'ai-ml', label: 'AI/ML Integration', emoji: '🤖' },
      { value: 'platform', label: 'Platform/SaaS', emoji: '🏢' },
      { value: 'infrastructure', label: 'Infrastructure', emoji: '⚙️' },
      { value: 'performance', label: 'High-Performance', emoji: '⚡' }
    ]
  },
  {
    id: 'architecture',
    question: 'Architectural patterns?',
    description: 'Select all that interest you',
    isMultiSelect: true,
    options: [
      { value: 'microservices', label: 'Microservices', emoji: '🔷' },
      { value: 'event-driven', label: 'Event-Driven', emoji: '⚡' },
      { value: 'serverless', label: 'Serverless', emoji: '☁️' },
      { value: 'cqrs', label: 'CQRS', emoji: '🔄' },
      { value: 'distributed', label: 'Distributed', emoji: '🌐' },
      { value: 'reactive', label: 'Reactive', emoji: '🔥' }
    ]
  },
  {
    id: 'scalability',
    question: 'Scalability requirements?',
    description: 'Expected scale',
    isMultiSelect: false,
    options: [
      { value: 'horizontal', label: 'Horizontal Scaling', emoji: '↔️' },
      { value: 'vertical', label: 'Vertical Scaling', emoji: '↕️' },
      { value: 'auto-scaling', label: 'Auto-scaling', emoji: '🔄' },
      { value: 'not-critical', label: 'Not Critical', emoji: '➖' }
    ]
  },
  {
    id: 'technologies',
    question: 'Technology preferences?',
    description: 'Select all that apply',
    isMultiSelect: true,
    options: [
      { value: 'go', label: 'Go', emoji: '🔵' },
      { value: 'rust', label: 'Rust', emoji: '🦀' },
      { value: 'python', label: 'Python', emoji: '🐍' },
      { value: 'kubernetes', label: 'Kubernetes', emoji: '☸️' },
      { value: 'kafka', label: 'Kafka', emoji: '📨' },
      { value: 'grpc', label: 'gRPC', emoji: '🔌' },
      { value: 'graphql', label: 'GraphQL', emoji: '📊' },
      { value: 'ai-apis', label: 'AI/ML APIs', emoji: '🤖' }
    ]
  },
  {
    id: 'constraints',
    question: 'Project constraints?',
    description: 'Any specific requirements',
    isMultiSelect: false,
    options: [
      { value: 'budget', label: 'Budget Conscious', emoji: '💰' },
      { value: 'security', label: 'Security Critical', emoji: '🔒' },
      { value: 'performance', label: 'Performance Critical', emoji: '⚡' },
      { value: 'none', label: 'No Constraints', emoji: '🆓' }
    ]
  },
  {
    id: 'timeAvailability',
    question: 'Project timeline?',
    description: 'Development duration',
    isMultiSelect: false,
    options: [
      { value: '2-months', label: '2 Months', emoji: '📆' },
      { value: '3-months', label: '3 Months', emoji: '🗓️' },
      { value: '6-months', label: '6 Months', emoji: '📅' },
      { value: 'ongoing', label: 'Ongoing', emoji: '♾️' }
    ]
  }
];

export const QUESTIONS = {
    beginner: BEGINNER_QUESTIONS,
    intermediate: INTERMEDIATE_QUESTIONS,
    advanced: ADVANCED_QUESTIONS
};
