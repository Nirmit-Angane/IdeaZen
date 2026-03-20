import { useState, useEffect } from 'react';
import { GeneratedProject } from '../types/project.types';

export function useSavedProjects() {
  const [savedProjects, setSavedProjects] = useState<GeneratedProject[]>([]);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  useEffect(() => {
    const loadAll = () => {
      const projects: GeneratedProject[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('ideazen_output_')) {
          try {
            const item = JSON.parse(localStorage.getItem(key) || '');
            projects.push(item);
          } catch (e) {
            console.error('Failed to parse saved project', e);
          }
        }
      }
      setSavedProjects(projects);
    };

    loadAll();
    window.addEventListener('storage', loadAll);
    return () => window.removeEventListener('storage', loadAll);
  }, []);

  const saveProject = (project: GeneratedProject, existingId?: string) => {
    const id = existingId || `idea-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(`ideazen_output_${id}`, JSON.stringify(project));
    // Trigger update
    setSavedProjects(prev => {
        const index = prev.findIndex(p => p.title === project.title);
        if (index >= 0) {
            const next = [...prev];
            next[index] = project;
            return next;
        }
        return [...prev, project];
    });
    return id;
  };

  const deleteProject = (title: string) => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('ideazen_output_')) {
        const item = JSON.parse(localStorage.getItem(key) || '{}');
        if (item.title === title) {
          localStorage.removeItem(key);
          setSavedProjects(prev => prev.filter(p => p.title !== title));
          break;
        }
      }
    }
  };

  const isSaved = (title: string) => {
    return savedProjects.some(p => p.title === title);
  };

  const toggleCompare = (title: string) => {
    setSelectedForCompare(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return {
    savedProjects,
    saveProject,
    deleteProject,
    isSaved,
    selectedForCompare,
    toggleCompare
  };
}

export function loadProjectById(id: string): GeneratedProject | null {
  try {
    const raw = localStorage.getItem(`ideazen_output_${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
