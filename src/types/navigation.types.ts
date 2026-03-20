export type ScreenName = 
  | 'landing' 
  | 'skill' 
  | 'questions' 
  | 'generating' 
  | 'idea-preview' 
  | 'generating-blueprint' 
  | 'output' 
  | 'my-ideas' 
  | 'hackathon' 
  | 'hackathon-questions' 
  | 'hackathon-generating' 
  | 'hackathon-output';

export interface NavigationProps {
  currentScreen: ScreenName;
  navigate: (screen: ScreenName, params?: Record<string, string>) => void;
}
