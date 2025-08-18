
import { useState } from 'react';
import { CheckCircle, BookOpen, CheckIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

export type LessonType = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'quiz' | 'text';
  hasExercises: boolean;
  hasMaterials: boolean;
  videoUrl?: string;
  content?: string;
  keyPoints?: string[];
  exercises?: {
    id: number;
    question: string;
    type: string;
    options?: string[];
    answer?: string;
  }[];
  materials?: {
    id: number;
    title: string;
    type: string;
    size: string;
    url: string;
  }[];
};

export type ModuleType = {
  id: number;
  title: string;
  description: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  lessons: LessonType[];
};

type CourseModuleListProps = {
  courseId: number;
  modules: ModuleType[];
  currentLessonId?: number;
  courseName?: string;
  onLessonClick?: (lessonId: number) => void;
};

const CourseModuleList = ({ courseId, modules, currentLessonId, courseName, onLessonClick }: CourseModuleListProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id.toString() || '']);
  
  return (
    <div className="space-y-6">
      {courseName && (
        <h2 className="text-xl font-semibold mb-4">{courseName}</h2>
      )}
      <Accordion type="multiple" value={expandedModules} onValueChange={setExpandedModules}>
        {modules.map((module) => (
          <AccordionItem key={module.id} value={module.id.toString()} className="border border-zinc-800 rounded-lg mb-3 overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex flex-col items-start text-left">
                <div className="text-lg font-medium mb-1">Módulo {module.id}: {module.title}</div>
                <div className="flex items-center gap-4 w-full">
                  <div className="text-sm text-zinc-400">
                    {module.completedLessons} de {module.totalLessons} aulas concluídas
                  </div>
                  <div className="flex-1 max-w-48">
                    <Progress value={module.progress} className="h-1" />
                  </div>
                  <div className="text-sm text-zinc-400">{module.progress}%</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0">
              <div className="bg-zinc-900/50">
                <div className="px-4 py-3 border-b border-zinc-800">
                  <p className="text-sm text-zinc-300">{module.description}</p>
                </div>
                <ul className="divide-y divide-zinc-800">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <div
                        onClick={() => onLessonClick ? onLessonClick(lesson.id) : null}
                        className={`flex items-center px-4 py-3 hover:bg-zinc-800/50 transition-colors cursor-pointer ${
                          currentLessonId === lesson.id ? 'bg-ejup-cyan/10 text-ejup-cyan' : ''
                        }`}
                      >
                        <div className="mr-3">
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5 text-ejup-orange" />
                          ) : (
                            <BookOpen className="h-5 w-5 text-zinc-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{lesson.title}</div>
                          <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                            <span>{lesson.duration}</span>
                            {lesson.type === 'video' && <span>Vídeo</span>}
                            {lesson.type === 'quiz' && <span>Quiz</span>}
                            {lesson.type === 'text' && <span>Leitura</span>}
                            {lesson.hasExercises && (
                              <span className="flex items-center">
                                <CheckIcon className="h-3 w-3 mr-1" />
                                Exercícios
                              </span>
                            )}
                            {lesson.hasMaterials && (
                              <span className="flex items-center">
                                <CheckIcon className="h-3 w-3 mr-1" />
                                Materiais
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-zinc-500" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseModuleList;
