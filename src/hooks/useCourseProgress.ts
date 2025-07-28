import { useState, useCallback } from 'react';

interface CourseProgress {
  lastLessonId: number;
  moduleId: number;
  timestamp: string;
  completed?: boolean;
}

export const useCourseProgress = (courseId: string | number) => {
  const [progress, setProgress] = useState<CourseProgress | null>(null);

  // Obter progresso salvo
  const getSavedProgress = useCallback((): CourseProgress | null => {
    try {
      const savedProgress = localStorage.getItem(`course-${courseId}-progress`);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setProgress(parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error parsing saved progress:', error);
    }
    return null;
  }, [courseId]);

  // Salvar progresso
  const saveProgress = useCallback((data: CourseProgress) => {
    try {
      const progressData = {
        ...data,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(progressData));
      setProgress(progressData);
      return true;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    }
  }, [courseId]);

  // Limpar progresso
  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem(`course-${courseId}-progress`);
      setProgress(null);
      return true;
    } catch (error) {
      console.error('Error clearing progress:', error);
      return false;
    }
  }, [courseId]);

  // Gerar link de continuação
  const getContinueLink = useCallback((fallbackModule?: number, fallbackLesson?: number, lastPosition?: number) => {
    try {
      const savedProgressString = localStorage.getItem(`course-${courseId}-progress`);
      if (savedProgressString) {
        const savedProgress = JSON.parse(savedProgressString);
        if (savedProgress && savedProgress.lastLessonId) {
          return `/courses/${courseId}/learn?module=${savedProgress.moduleId}&lesson=${savedProgress.lastLessonId}&t=${lastPosition || 0}`;
        }
      }
    } catch (error) {
      console.error('Error getting saved progress for link:', error);
    }
    
    // Fallback para valores padrão
    if (fallbackModule && fallbackLesson) {
      return `/courses/${courseId}/learn?module=${fallbackModule}&lesson=${fallbackLesson}&t=${lastPosition || 0}`;
    }
    return `/courses/${courseId}/learn`;
  }, [courseId]);

  return {
    progress,
    getSavedProgress,
    saveProgress,
    clearProgress,
    getContinueLink
  };
};

export default useCourseProgress; 