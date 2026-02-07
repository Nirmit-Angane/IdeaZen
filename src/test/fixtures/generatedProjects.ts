import { GeneratedProject } from '../../App';

/**
 * Test fixtures for GeneratedProject
 */

export const beginnerProject: GeneratedProject = {
  title: 'Personal Portfolio Website',
  difficulty: 'Beginner',
  description: 'Build a responsive personal portfolio website to showcase your projects and skills.',
  reasoning: 'This project is perfect for beginners as it covers HTML, CSS, and basic JavaScript while creating something practical.',
  features: [
    'Responsive navigation menu',
    'Hero section with introduction',
    'Projects showcase grid',
    'Contact form',
    'Smooth scrolling animations',
  ],
  techStack: {
    primary: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
    alternative: ['React', 'Tailwind CSS', 'Vercel'],
  },
  roadmap: [
    {
      phase: '1',
      title: 'Setup and Structure',
      description: 'Create project structure and basic HTML layout',
      duration: '3-4 days',
    },
    {
      phase: '2',
      title: 'Styling',
      description: 'Add CSS styling and make it responsive',
      duration: '5-7 days',
    },
    {
      phase: '3',
      title: 'Interactivity',
      description: 'Add JavaScript for animations and form handling',
      duration: '4-5 days',
    },
    {
      phase: '4',
      title: 'Deployment',
      description: 'Deploy to Netlify and test',
      duration: '1-2 days',
    },
  ],
  skillOutcomes: [
    'HTML semantic structure',
    'CSS Flexbox and Grid',
    'Responsive design principles',
    'Basic JavaScript DOM manipulation',
    'Deployment workflows',
  ],
  feasibility: 'High',
  confidence: '95%',
};

export const intermediateProject: GeneratedProject = {
  title: 'Task Management App',
  difficulty: 'Intermediate',
  description: 'Build a full-stack task management application with user authentication and real-time updates.',
  reasoning: 'This project introduces backend development, databases, and authentication while building a practical application.',
  features: [
    'User authentication and authorization',
    'Create, read, update, delete tasks',
    'Task categories and tags',
    'Due date reminders',
    'Real-time collaboration',
    'Search and filter functionality',
  ],
  techStack: {
    primary: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
    alternative: ['Vue.js', 'NestJS', 'MongoDB', 'Auth0'],
  },
  roadmap: [
    {
      phase: '1',
      title: 'Backend Setup',
      description: 'Set up Node.js server, database, and authentication',
      duration: '1-2 weeks',
    },
    {
      phase: '2',
      title: 'Frontend Foundation',
      description: 'Create React app with routing and state management',
      duration: '1-2 weeks',
    },
    {
      phase: '3',
      title: 'Core Features',
      description: 'Implement task CRUD operations and UI',
      duration: '2 weeks',
    },
    {
      phase: '4',
      title: 'Advanced Features',
      description: 'Add real-time updates and search',
      duration: '1 week',
    },
    {
      phase: '5',
      title: 'Testing and Deployment',
      description: 'Write tests and deploy to production',
      duration: '1 week',
    },
  ],
  skillOutcomes: [
    'RESTful API design',
    'Database schema design',
    'JWT authentication',
    'React state management',
    'WebSocket integration',
    'Full-stack deployment',
  ],
  feasibility: 'High',
  confidence: '88%',
};

export const advancedProject: GeneratedProject = {
  title: 'Distributed E-Commerce Platform',
  difficulty: 'Advanced',
  description: 'Build a scalable e-commerce platform with microservices architecture, payment processing, and real-time inventory management.',
  reasoning: 'This advanced project covers microservices, distributed systems, caching, and handles complex business logic.',
  features: [
    'Microservices architecture',
    'Product catalog with search',
    'Shopping cart and checkout',
    'Payment gateway integration',
    'Order management system',
    'Real-time inventory tracking',
    'Admin dashboard',
    'Email notifications',
  ],
  techStack: {
    primary: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Stripe'],
    alternative: ['Next.js', 'GraphQL', 'MongoDB', 'RabbitMQ', 'AWS'],
  },
  roadmap: [
    {
      phase: '1',
      title: 'Architecture Design',
      description: 'Design microservices architecture and database schemas',
      duration: '1 week',
    },
    {
      phase: '2',
      title: 'Core Services',
      description: 'Build product, cart, and order services',
      duration: '3 weeks',
    },
    {
      phase: '3',
      title: 'Payment Integration',
      description: 'Integrate Stripe and handle transactions',
      duration: '2 weeks',
    },
    {
      phase: '4',
      title: 'Frontend Development',
      description: 'Build React frontend with all features',
      duration: '3 weeks',
    },
    {
      phase: '5',
      title: 'DevOps and Deployment',
      description: 'Set up Docker, Kubernetes, and CI/CD',
      duration: '2 weeks',
    },
  ],
  skillOutcomes: [
    'Microservices architecture',
    'Distributed systems design',
    'Payment processing',
    'Caching strategies',
    'Container orchestration',
    'CI/CD pipelines',
  ],
  feasibility: 'Medium',
  confidence: '75%',
};

export const mockProjectIdeas: GeneratedProject[] = [
  {
    title: 'Weather Dashboard',
    difficulty: 'Beginner',
    description: 'A simple weather dashboard that displays current weather and forecasts.',
    reasoning: 'Great for learning API integration and data visualization.',
    features: [
      'Current weather display',
      '5-day forecast',
      'Location search',
      'Weather icons',
    ],
    techStack: {
      primary: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
      alternative: ['React', 'Tailwind CSS'],
    },
    roadmap: [
      {
        phase: '1',
        title: 'Setup',
        description: 'Create project structure',
        duration: '1 day',
      },
      {
        phase: '2',
        title: 'API Integration',
        description: 'Connect to weather API',
        duration: '2 days',
      },
      {
        phase: '3',
        title: 'UI Design',
        description: 'Create responsive UI',
        duration: '2 days',
      },
    ],
    skillOutcomes: ['API integration', 'Async JavaScript', 'Data visualization'],
    feasibility: 'High',
    confidence: '92%',
  },
  {
    title: 'Recipe Finder App',
    difficulty: 'Beginner',
    description: 'An app to search and save favorite recipes.',
    reasoning: 'Introduces API usage and local storage concepts.',
    features: [
      'Recipe search',
      'Recipe details view',
      'Save favorites',
      'Filter by cuisine',
    ],
    techStack: {
      primary: ['React', 'Recipe API', 'LocalStorage'],
      alternative: ['Vue.js', 'Spoonacular API'],
    },
    roadmap: [
      {
        phase: '1',
        title: 'Setup React',
        description: 'Initialize React project',
        duration: '1 day',
      },
      {
        phase: '2',
        title: 'Search Feature',
        description: 'Implement recipe search',
        duration: '3 days',
      },
      {
        phase: '3',
        title: 'Favorites',
        description: 'Add save functionality',
        duration: '2 days',
      },
    ],
    skillOutcomes: ['React hooks', 'API integration', 'Local storage'],
    feasibility: 'High',
    confidence: '90%',
  },
];

export const projectWithAllFields: GeneratedProject = beginnerProject;

export const projectWithMinimalFields: GeneratedProject = {
  title: 'Minimal Project',
  difficulty: 'Beginner',
  description: 'A minimal project for testing',
  reasoning: 'Testing purposes',
  features: ['Feature 1'],
  techStack: {
    primary: ['HTML'],
    alternative: [],
  },
  roadmap: [
    {
      phase: '1',
      title: 'Phase 1',
      description: 'First phase',
      duration: '1 day',
    },
  ],
  skillOutcomes: ['Skill 1'],
  feasibility: 'High',
  confidence: '80%',
};
