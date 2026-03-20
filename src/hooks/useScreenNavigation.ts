import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenName } from '../types/navigation.types';

export function useScreenNavigation() {
  const navigate = useNavigate();
  // Using path as source of truth for screen name generally, 
  // but if we need an internal state we can track it here.
  
  const goTo = (screen: ScreenName, params?: Record<string, string>) => {
    let path = '/';
    switch (screen) {
      case 'landing': path = '/'; break;
      case 'skill': path = '/skill'; break;
      case 'questions': path = '/questions'; break;
      case 'generating': path = '/generating'; break;
      case 'idea-preview': path = '/idea-preview'; break;
      case 'generating-blueprint': path = '/generating-blueprint'; break;
      case 'output': path = `/output/${params?.id}`; break;
      case 'my-ideas': path = '/my-ideas'; break;
      case 'hackathon': path = '/hackathon'; break;
      case 'hackathon-questions': path = '/hackathon-questions'; break;
      case 'hackathon-generating': path = '/hackathon-generating'; break;
      case 'hackathon-output': path = '/hackathon-output'; break;
    }
    navigate(path);
  };

  return { navigate: goTo };
}
