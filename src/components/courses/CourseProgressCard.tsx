
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';

interface CourseProgressCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    progress: number;
    lastAccess: string;
    nextLesson: string;
    imageBg: string;
    modules: number;
    completedModules: number;
  };
}

const CourseProgressCard = ({ course }: CourseProgressCardProps) => {
  return (
    <div className="ejup-card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className={`h-40 md:h-auto md:w-40 ${course.imageBg} flex items-center justify-center`}>
          <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl font-bold">{course.id}</span>
          </div>
        </div>
        <div className="p-6 flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-zinc-400 text-sm mb-4">{course.description}</p>
              <div className="text-sm mb-4">
                <p>Instrutor: <span className="text-zinc-300">{course.instructor}</span></p>
                
                <div className="flex gap-2 items-center text-zinc-400 text-xs mt-1">
                  <Clock className="h-3 w-3" />
                  <span>Último acesso: {course.lastAccess}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Progresso do curso</span>
                  <span className="text-ejup-orange">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Módulos concluídos: {course.completedModules}/{course.modules}</span>
                  <span>Próxima aula: {course.nextLesson}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:w-auto w-full">
              <Button asChild>
                <Link to={`/courses/${course.id}/learn`} className="flex items-center">
                  <span className="md:hidden flex items-center">
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                  <span className="hidden md:inline">
                    Acessar Curso
                  </span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/courses/${course.id}`}>Ver detalhes</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;
