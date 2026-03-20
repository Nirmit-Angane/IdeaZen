// Icon mapping for Question Flow options
import {
  Globe,
  Smartphone,
  Gamepad2,
  Bot,
  Palette,
  Settings,
  Flame,
  Target,
  Zap,
  Calendar,
  CalendarDays,
  CalendarRange,
  CheckCircle,
  Rocket,
  HelpCircle,
  Plug,
  Wrench,
  Building2,
  Cloud,
  Box,
  Laptop,
  Building,
  Square,
  RefreshCw,
  Hexagon,
  Mail,
  BarChart3,
  DollarSign,
  Lock,
  CircleDot,
  Lightbulb,
  Code,
  Database,
  Infinity,
  ArrowLeftRight,
  ArrowUpDown,
  Minus
} from 'lucide-react';

export const optionIcons: { [key: string]: any } = {
  // Domain/Project Type Icons
  'web': Globe,
  'mobile': Smartphone,
  'game': Gamepad2,
  'automation': Bot,
  'fullstack-app': Globe,
  'api': Plug,
  'realtime': Zap,
  'devtools': Wrench,
  'distributed': Globe,
  'ai-ml': Bot,
  'platform': Building,
  'infrastructure': Settings,
  
  // Learning Goals
  'frontend': Palette,
  'backend': Settings,
  'fullstack': Flame,
  'specific': Target,
  'architecture': Building2,
  'performance': Zap,
  'testing': CheckCircle,
  'deployment': Rocket,
  'new-tech': Flame,
  
  // Time
  '2-weeks': Zap,
  '1-month': Calendar,
  '2-months': CalendarDays,
  '3-months': CalendarRange,
  'flexible': RefreshCw,
  '6-months': Calendar,
  'ongoing': Infinity,
  
  // Deployment
  'yes-simple': CheckCircle,
  'yes-custom': Rocket,
  'no': Minus,
  'maybe': HelpCircle,
  'cloud': Cloud,
  'paas': Rocket,
  'containerized': Box,
  'local': Laptop,
  
  // Technologies
  'react': Code,
  'vue': Code,
  'node': Code,
  'python': Code,
  'typescript': Square,
  'go': Code,
  'database': Database,
  'rust': Code,
  'kubernetes': Hexagon,
  'kafka': Mail,
  'grpc': Plug,
  'graphql': BarChart3,
  'ai-apis': Bot,
  
  // Architecture
  'microservices': Square,
  'event-driven': Zap,
  'serverless': Cloud,
  'cqrs': RefreshCw,
  'reactive': Flame,
  
  // Scalability
  'horizontal': ArrowLeftRight,
  'vertical': ArrowUpDown,
  'auto-scaling': RefreshCw,
  'not-critical': Minus,
  
  // Constraints
  'budget': DollarSign,
  'security': Lock,
  'none': CircleDot
};

export function getOptionIcon(value: string) {
  return optionIcons[value] || CircleDot;
}
