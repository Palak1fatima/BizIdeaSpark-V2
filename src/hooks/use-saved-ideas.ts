
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BusinessIdea } from '@/ai/flows/generate-business-ideas';

const SAVED_IDEAS_KEY = 'savedBusinessIdeas';

export function useSavedIdeas() {
  const [savedIdeas, setSavedIdeas] = useState<BusinessIdea[]>([]);

  useEffect(() => {
    // This effect runs only on the client side
    try {
      const item = window.localStorage.getItem(SAVED_IDEAS_KEY);
      if (item) {
        setSavedIdeas(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to parse saved ideas from localStorage', error);
      setSavedIdeas([]);
    }
  }, []);

  const saveIdeasToLocalStorage = (ideas: BusinessIdea[]) => {
    try {
      window.localStorage.setItem(SAVED_IDEAS_KEY, JSON.stringify(ideas));
    } catch (error) {
      console.error('Failed to save ideas to localStorage', error);
    }
  };
  
  const isIdeaSaved = useCallback((ideaToCompare: BusinessIdea) => {
    return savedIdeas.some(idea => idea.idea === ideaToCompare.idea);
  }, [savedIdeas]);

  const toggleSaveIdea = (ideaToToggle: BusinessIdea) => {
    const isSaved = isIdeaSaved(ideaToToggle);
    let newSavedIdeas;

    if (isSaved) {
      newSavedIdeas = savedIdeas.filter(idea => idea.idea !== ideaToToggle.idea);
    } else {
      newSavedIdeas = [...savedIdeas, ideaToToggle];
    }
    
    setSavedIdeas(newSavedIdeas);
    saveIdeasToLocalStorage(newSavedIdeas);
  };

  return { savedIdeas, toggleSaveIdea, isIdeaSaved };
}
