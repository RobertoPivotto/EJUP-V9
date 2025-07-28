import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Interface para os cursos relacionados
interface RelatedCourse {
  id: number;
  title: string;
  instructor: string;
  instructorRole?: string;
  duration: string;
  modules?: number;
  image?: string;
  instructorImage?: string;
}

interface RelatedCoursesProps {
  courses: RelatedCourse[];
}

const RelatedCourses = ({ courses }: RelatedCoursesProps) => {
  if (!courses || courses.length === 0) return null;
  
  // Imagem de fallback caso a imagem do curso não esteja disponível
  const fallbackImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-zinc-800/20 rounded-xl border border-zinc-700/30 p-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="h-5 w-5 text-ejup-pink" />
        <h2 className="text-xl font-serif font-semibold">Cursos relacionados</h2>
      </div>
      
      <div className="space-y-6">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700/50 group hover:border-ejup-pink/30 transition-colors"
          >
            <div className="relative">
              <img 
                src={course.image || fallbackImage} 
                alt={course.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Fallback se a imagem falhar ao carregar
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Previne loop infinito
                  target.src = fallbackImage;
                }}
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-ejup-pink text-white border-none">Curso em destaque</Badge>
              </div>
            </div>
            
            <div className="p-5">
              <div className="mb-4">
                <div className="text-sm text-zinc-400 mb-1">Curso</div>
                <h3 className="text-xl font-bold group-hover:text-ejup-pink transition-colors">
                  {course.title}
                </h3>
              </div>
              
              <div className="flex items-center mb-5">
                <div className="mr-3 h-10 w-10 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-700">
                  {course.instructorImage ? (
                    <img 
                      src={course.instructorImage} 
                      alt={course.instructor}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Se a imagem do instrutor falhar, exibe ícone
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-5 w-5 text-zinc-500" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-white">{course.instructor}</div>
                  <div className="text-xs text-zinc-500">{course.instructorRole || "Professor"}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <div className="text-xs text-zinc-500">Duração</div>
                  <div className="text-sm font-medium">{course.duration}</div>
                </div>
                {course.modules && (
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <div className="text-xs text-zinc-500">Módulos</div>
                    <div className="text-sm font-medium">{course.modules} módulos</div>
                  </div>
                )}
              </div>
              
              <Button 
                asChild 
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 group-hover:border-ejup-pink/30 group-hover:text-ejup-pink"
              >
                <Link to={`/courses/${course.id}`} className="flex items-center justify-center">
                  Ver detalhes
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses; 