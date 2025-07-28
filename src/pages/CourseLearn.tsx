import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckIcon, ArrowLeft, Menu, X, CheckCircle, BookOpen, ArrowRight, ChevronLeft, ChevronRight, Lock, ShoppingCart } from 'lucide-react';
import CourseModuleList, { ModuleType, LessonType } from '@/components/courses/CourseModuleList';
import CourseMaterials from '@/components/courses/CourseMaterials';
import useCourseProgress from '@/hooks/useCourseProgress';
import { updateLastAccess, isCourseOwned } from '@/utils/courseUtils';

// Mock data for course content with enhanced structure
const courseLessons: Record<number, {
  title: string;
  description: string;
  modules: ModuleType[];
  instructor: {
    name: string;
    role: string;
    bio: string;
    initials: string;
  };
  progress: number;
}> = {
  1: { // Course ID 1
    title: 'Elaboração de Contratos Empresariais',
    description: 'Aprenda a elaborar contratos eficientes para empresas e dominar as melhores práticas contratuais.',
    modules: [
      {
        id: 1,
        title: 'Fundamentos da Contratação Empresarial',
        description: 'Entenda os princípios básicos que regem os contratos empresariais e sua importância.',
        completedLessons: 2,
        totalLessons: 3,
        progress: 66,
        lessons: [
          { 
            id: 101, 
            title: 'Princípios básicos do direito contratual', 
            duration: '15 min',
            completed: true,
            type: 'video',
            hasExercises: true,
            hasMaterials: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Nesta aula, exploramos os princípios fundamentais do direito contratual que servem como base para todos os contratos empresariais. Discutimos a autonomia da vontade, a força obrigatória dos contratos e a boa-fé objetiva.',
            keyPoints: [
              'Princípio da autonomia da vontade',
              'Princípio da força obrigatória (pacta sunt servanda)',
              'Princípio da boa-fé objetiva',
              'Função social dos contratos'
            ],
            exercises: [
              {
                id: 1,
                question: 'Identifique e explique os elementos essenciais que fazem um contrato ser juridicamente válido.',
                type: 'essay'
              },
              {
                id: 2,
                question: 'Qual princípio determina que as partes devem agir com lealdade e transparência durante toda a relação contratual?',
                type: 'multiple-choice',
                options: ['Autonomia da vontade', 'Boa-fé objetiva', 'Força obrigatória', 'Função social'],
                answer: 'Boa-fé objetiva'
              }
            ],
            materials: [
              {
                id: 1,
                title: 'Modelo de contrato básico',
                type: 'pdf',
                size: '320KB',
                url: '#'
              },
              {
                id: 2,
                title: 'Checklist de verificação contratual',
                type: 'pdf',
                size: '150KB',
                url: '#'
              }
            ]
          },
          { 
            id: 102, 
            title: 'Legislação aplicável aos contratos empresariais', 
            duration: '20 min',
            completed: true,
            type: 'video',
            hasExercises: true,
            hasMaterials: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Esta aula aborda o quadro legislativo que rege os contratos empresariais no Brasil, incluindo Código Civil, Código Comercial e legislação específica.',
            keyPoints: [
              'Código Civil e suas aplicações nos contratos empresariais',
              'Código Comercial e sua relação com o direito contratual',
              'Legislações específicas para tipos contratuais',
              'Jurisprudência relevante'
            ],
            exercises: [
              {
                id: 1,
                question: 'Explique a relação hierárquica entre o Código Civil e legislações específicas no contexto contratual.',
                type: 'essay'
              }
            ],
            materials: [
              {
                id: 1,
                title: 'Compilação legislativa atualizada',
                type: 'pdf',
                size: '450KB',
                url: '#'
              }
            ]
          },
          { 
            id: 103, 
            title: 'Elementos essenciais de um contrato válido', 
            duration: '25 min',
            completed: false,
            type: 'video',
            hasExercises: true,
            hasMaterials: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Nesta aula, examinamos os elementos fundamentais que devem estar presentes em qualquer contrato para que ele seja considerado juridicamente válido e eficaz.',
            keyPoints: [
              'Capacidade das partes',
              'Objeto lícito, possível e determinado',
              'Forma prescrita ou não defesa em lei',
              'Manifestação livre e consciente da vontade'
            ],
            exercises: [
              {
                id: 1,
                question: 'Analise o contrato modelo fornecido e identifique possíveis cláusulas problemáticas.',
                type: 'essay'
              }
            ],
            materials: [
              {
                id: 1,
                title: 'Guia prático de verificação contratual',
                type: 'pdf',
                size: '280KB',
                url: '#'
              }
            ]
          }
        ],
      },
      {
        id: 2,
        title: 'Técnicas de Redação Contratual',
        description: 'Aprenda a redigir contratos claros, objetivos e juridicamente seguros.',
        completedLessons: 0,
        totalLessons: 2,
        progress: 0,
        lessons: [
          { 
            id: 201, 
            title: 'Estrutura básica de um contrato empresarial', 
            duration: '20 min',
            completed: false,
            type: 'video',
            hasExercises: true,
            hasMaterials: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Esta aula apresenta a estrutura fundamental de um contrato empresarial, desde o preâmbulo até as disposições finais.',
            keyPoints: [
              'Preâmbulo e qualificação das partes',
              'Considerandos e sua importância contextual',
              'Cláusulas essenciais e acessórias',
              'Disposições finais e foro'
            ],
            exercises: [
              {
                id: 1,
                question: 'Elabore um preâmbulo contratual completo para uma prestação de serviços advocatícios.',
                type: 'essay'
              }
            ],
            materials: [
              {
                id: 1,
                title: 'Modelos de estruturas contratuais',
                type: 'pdf',
                size: '380KB',
                url: '#'
              }
            ]
          },
          { 
            id: 202, 
            title: 'Linguagem jurídica eficiente', 
            duration: '15 min',
            completed: false,
            type: 'video',
            hasExercises: false,
            hasMaterials: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Aprenda a utilizar uma linguagem jurídica clara e eficiente na redação de contratos, evitando ambiguidades e garantindo a compreensão de todas as partes.',
            keyPoints: [
              'Clareza e objetividade na redação jurídica',
              'Evitando ambiguidades e interpretações dúbias',
              'Uso adequado de termos técnicos',
              'Estruturação lógica das cláusulas'
            ],
            materials: [
              {
                id: 1,
                title: 'Guia de redação jurídica',
                type: 'pdf',
                size: '250KB',
                url: '#'
              }
            ]
          }
        ],
      },
    ],
    instructor: {
      name: 'Dr. Carlos Mendes',
      role: 'Especialista em Direito Empresarial',
      bio: 'Dr. Carlos Mendes possui mais de 15 anos de experiência em direito empresarial e contratual.',
      initials: 'CM',
    },
    progress: 35,
  },
  2: { // Course ID 2
    title: 'Direito Digital e Proteção de Dados',
    description: 'Compreenda as nuances do direito digital e as regulamentações de proteção de dados.',
    modules: [
      {
        id: 1,
        title: 'Introdução ao Direito Digital',
        description: 'Fundamentos e conceitos básicos do direito digital.',
        completedLessons: 1,
        totalLessons: 2,
        progress: 50,
        lessons: [
          { 
            id: 301, 
            title: 'Conceitos fundamentais do direito digital', 
            duration: '18 min',
            completed: true,
            type: 'video',
            hasExercises: true,
            hasMaterials: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Esta aula introduz os conceitos fundamentais do direito digital, explorando como a tecnologia impacta as relações jurídicas.',
            keyPoints: [
              'Definição e escopo do direito digital',
              'Impacto da tecnologia nas relações jurídicas',
              'Principais desafios regulatórios',
              'Tendências e perspectivas futuras'
            ],
            exercises: [
              {
                id: 1,
                question: 'Explique como a digitalização afeta os contratos tradicionais.',
                type: 'essay'
              }
            ],
            materials: [
              {
                id: 1,
                title: 'Marco Civil da Internet',
                type: 'pdf',
                size: '180KB',
                url: '#'
              }
            ]
          },
          { 
            id: 302, 
            title: 'Marco regulatório brasileiro', 
            duration: '22 min',
            completed: false,
            type: 'video',
            hasExercises: true,
            hasMaterials: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Análise detalhada do marco regulatório brasileiro para o ambiente digital, incluindo leis e regulamentações específicas.',
            keyPoints: [
              'Marco Civil da Internet',
              'Lei Geral de Proteção de Dados (LGPD)',
              'Regulamentações setoriais',
              'Jurisprudência relevante'
            ],
            exercises: [
              {
                id: 1,
                question: 'Compare o Marco Civil da Internet com a LGPD em termos de escopo e aplicação.',
                type: 'essay'
              }
            ],
            materials: [
              {
                id: 1,
                title: 'LGPD - Texto completo',
                type: 'pdf',
                size: '420KB',
                url: '#'
              }
            ]
          }
        ],
      },
    ],
    instructor: {
      name: 'Dra. Marina Lima',
      role: 'Especialista em Direito Digital',
      bio: 'Marina Lima é especialista em Direito Digital com foco em proteção de dados e privacidade.',
      initials: 'ML',
    },
    progress: 15,
  },
};

const CourseLearn = () => {
  const { id: courseIdString } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courseId = Number(courseIdString);
  const { saveProgress, getSavedProgress } = useCourseProgress(courseId);
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  // Verificar se o usuário tem acesso ao curso
  useEffect(() => {
    const checkAccess = () => {
      const owned = isCourseOwned(courseId);
      setHasAccess(owned);
      setCheckingAccess(false);
      
      // Se não tem acesso, redirecionar para a página de vendas após um breve delay
      if (!owned) {
        setTimeout(() => {
          navigate(`/courses/${courseId}`);
        }, 3000);
      }
    };
    
    checkAccess();
  }, [courseId, navigate]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("conteudo");
  
  const course = courseLessons[courseId as keyof typeof courseLessons];
  
  // Helper function to get all lessons with module info
  const getAllLessonsFlat = () => {
    const allLessons: (LessonType & { moduleId: number; moduleTitle: string })[] = [];
    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        allLessons.push({
          ...lesson,
          moduleId: module.id,
          moduleTitle: module.title
        });
      });
    });
    return allLessons;
  };
  
  useEffect(() => {
    // Scroll to top when component mounts or lesson changes
    window.scrollTo(0, 0);
    
    // Update last access for the course
    updateLastAccess(courseId);
    
    const urlParams = new URLSearchParams(window.location.search);
    const moduleParam = urlParams.get('module');
    const lessonParam = urlParams.get('lesson');
    
    if (lessonParam) {
      setCurrentLessonId(Number(lessonParam));
    } else {
      // Check if there's a saved progress
      const savedProgress = getSavedProgress();
      if (savedProgress && savedProgress.lastLessonId) {
        setCurrentLessonId(savedProgress.lastLessonId);
        // Update URL to reflect the last lesson
        const lesson = getAllLessonsFlat().find(l => l.id === savedProgress.lastLessonId);
        if (lesson) {
          navigate(`/courses/${courseId}/learn?module=${lesson.moduleId}&lesson=${savedProgress.lastLessonId}`, { replace: true });
        }
        return;
      }
      
      // If no saved progress, find first incomplete lesson or just the first lesson
      let foundLesson = false;
      
      for (const module of course.modules) {
        for (const lesson of module.lessons) {
          if (!lesson.completed) {
            setCurrentLessonId(lesson.id);
            foundLesson = true;
            break;
          }
        }
        if (foundLesson) break;
      }
      
      // If all lessons are completed, show the first one
      if (!foundLesson && course.modules[0]?.lessons[0]) {
        setCurrentLessonId(course.modules[0].lessons[0].id);
      }
    }
  }, [courseId, course]);
  
  // Scroll to top whenever currentLessonId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentLessonId]);
  
  const getCurrentLesson = () => {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === currentLessonId) {
          return lesson;
        }
      }
    }
    return null;
  };
  
  const currentLesson = getCurrentLesson();
  
  const getAllLessons = () => {
    const allLessons: (LessonType & { moduleId: number; moduleTitle: string })[] = [];
    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        allLessons.push({
          ...lesson,
          moduleId: module.id,
          moduleTitle: module.title
        });
      });
    });
    return allLessons;
  };
  
  const allLessons = getAllLessons();
  const currentLessonIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
  
  const getPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      return allLessons[currentLessonIndex - 1];
    }
    return null;
  };
  
  const getNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      return allLessons[currentLessonIndex + 1];
    }
    return null;
  };
  
  const previousLesson = getPreviousLesson();
  const nextLesson = getNextLesson();
  
  const navigateToLesson = (lessonId: number) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    if (lesson) {
      setCurrentLessonId(lessonId);
      
      // Save progress using hook
      saveProgress({
        lastLessonId: lessonId,
        moduleId: lesson.moduleId,
        timestamp: new Date().toISOString()
      });
      
      navigate(`/courses/${courseId}/learn?module=${lesson.moduleId}&lesson=${lessonId}`, { replace: true });
    }
  };
  
  const handlePreviousLesson = () => {
    if (previousLesson) {
      navigateToLesson(previousLesson.id);
    }
  };
  
  const handleNextLesson = () => {
    if (nextLesson) {
      navigateToLesson(nextLesson.id);
    }
  };
  
  const markLessonAsCompleted = () => {
    // Aqui você implementaria a lógica para marcar a aula como concluída
    console.log('Marcando aula como concluída:', currentLessonId);
    
    // Update lesson completion status (this would typically be an API call)
    if (currentLessonId) {
      const lesson = allLessons.find(l => l.id === currentLessonId);
      if (lesson) {
        saveProgress({
          lastLessonId: currentLessonId,
          moduleId: lesson.moduleId,
          timestamp: new Date().toISOString(),
          completed: true
        });
        
        // Automatically go to next lesson if available
        if (nextLesson) {
          setTimeout(() => {
            navigateToLesson(nextLesson.id);
          }, 1000); // Small delay to show completion feedback
        }
      }
    }
  };
  
  // Verificar se o curso existe
  if (!course) {
    return <div className="min-h-screen bg-ejup-darkBg flex items-center justify-center">Curso não encontrado</div>;
  }

  // Tela de carregamento enquanto verifica acesso
  if (checkingAccess) {
    return (
      <div className="min-h-screen bg-ejup-darkBg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ejup-cyan mx-auto mb-4"></div>
          <p className="text-zinc-400">Verificando acesso ao curso...</p>
        </div>
      </div>
    );
  }

  // Tela de acesso negado
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-ejup-darkBg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Acesso Restrito</h1>
          <p className="text-zinc-400 mb-6">
            Você precisa adquirir este curso para acessar o conteúdo. 
            Redirecionando para a página de compra...
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={`/courses/${courseId}`}>
              <Button className="bg-gradient-to-r from-pink-500/80 to-pink-600 hover:from-pink-500 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-pink-500/25 transition-all duration-300">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Comprar Curso
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">
                Ver Outros Cursos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-ejup-darkBg flex flex-col">
      {/* Top Navigation Bar - Minimized for internal area */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/my-courses" className="flex items-center text-zinc-400 hover:text-white mr-4">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Voltar para meus cursos</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="flex items-center">
              <span className="text-sm text-zinc-400 mr-2">Progresso:</span>
              <div className="w-48 mr-2">
                <Progress value={course.progress} className="h-2" />
              </div>
              <span className="text-sm">{course.progress}%</span>
            </div>
          </div>
          
          <button 
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop always visible, mobile as overlay) */}
        <aside 
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 
            fixed md:static inset-0 z-40 md:z-auto
            w-80 bg-zinc-900 md:bg-zinc-900/30 md:border-r border-zinc-800 
            transition-transform duration-300 ease-in-out overflow-y-auto
          `}
        >
          <div className="sticky top-0 bg-zinc-900 z-10 p-4 flex justify-between items-center border-b border-zinc-800">
            <h2 className="font-semibold">{course.title}</h2>
            <button 
              className="md:hidden text-zinc-400 hover:text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4">
            <CourseModuleList 
              courseId={courseId} 
              modules={course.modules} 
              currentLessonId={currentLessonId || undefined}
              onLessonClick={navigateToLesson}
            />
          </div>
        </aside>
        
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {currentLesson ? (
            <div className="max-w-4xl mx-auto">
              {/* Lesson Navigation Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <span>{allLessons.find(l => l.id === currentLessonId)?.moduleTitle}</span>
                  <span>•</span>
                  <span>Aula {currentLessonIndex + 1} de {allLessons.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousLesson}
                    disabled={!previousLesson}
                    className="border-zinc-700"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextLesson}
                    disabled={!nextLesson}
                    className="border-zinc-700"
                  >
                    Próxima
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mb-6">{currentLesson.title}</h2>
              
              <div className="ejup-card overflow-hidden mb-6">
                <div className="aspect-video">
                  <iframe 
                    src={currentLesson.videoUrl} 
                    className="w-full h-full" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              
              <Tabs defaultValue="conteudo" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                  {currentLesson.hasExercises && <TabsTrigger value="exercicios">Exercícios</TabsTrigger>}
                  {currentLesson.hasMaterials && <TabsTrigger value="materiais">Materiais</TabsTrigger>}
                </TabsList>
                
                <TabsContent value="conteudo" className="animate-fade-in">
                  {currentLesson.content ? (
                    <div className="ejup-card p-6">
                      <h3 className="text-xl font-medium mb-4">Resumo da Aula</h3>
                      <p className="text-zinc-300 mb-4">
                        {currentLesson.content}
                      </p>
                      
                      {currentLesson.keyPoints && (
                        <>
                          <h4 className="text-lg font-medium mt-6 mb-3">Pontos-chave</h4>
                          <ul className="space-y-2">
                            {currentLesson.keyPoints.map((point, index) => (
                              <li key={index} className="flex">
                                <CheckIcon className="h-5 w-5 text-ejup-pink mr-2 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="ejup-card p-6">
                      <h3 className="text-xl font-medium mb-4">Resumo da Aula</h3>
                      <p className="text-zinc-300 mb-4">
                        Conteúdo detalhado desta aula estará disponível em breve.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                {currentLesson.hasExercises && (
                  <TabsContent value="exercicios" className="animate-fade-in">
                    <div className="ejup-card p-6">
                      <h3 className="text-xl font-medium mb-4">Exercícios Práticos</h3>
                      
                      {currentLesson.exercises && currentLesson.exercises.length > 0 ? (
                        <>
                          <p className="text-zinc-300 mb-6">
                            Aplique os conceitos aprendidos nesta aula através dos exercícios abaixo.
                          </p>
                          
                          <div className="space-y-6">
                            {currentLesson.exercises.map((exercise) => (
                              <div key={exercise.id} className="p-4 border border-zinc-800 rounded-lg">
                                <h4 className="font-medium mb-2">Exercício {exercise.id}</h4>
                                <p className="text-zinc-400 text-sm mb-4">
                                  {exercise.question}
                                </p>
                                
                                {exercise.type === 'multiple-choice' && exercise.options && (
                                  <div className="space-y-2 mb-4">
                                    {exercise.options.map((option, idx) => (
                                      <div key={idx} className="flex items-center">
                                        <input 
                                          type="radio" 
                                          id={`option-${exercise.id}-${idx}`} 
                                          name={`exercise-${exercise.id}`}
                                          className="mr-2"
                                        />
                                        <label htmlFor={`option-${exercise.id}-${idx}`}>{option}</label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {exercise.type === 'essay' && (
                                  <textarea 
                                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 mb-4"
                                    rows={4}
                                    placeholder="Digite sua resposta aqui..."
                                  />
                                )}
                                
                                <Button variant="outline" size="sm">Enviar Resposta</Button>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-zinc-400">
                          Esta aula não possui exercícios disponíveis no momento.
                        </p>
                      )}
                    </div>
                  </TabsContent>
                )}
                
                {currentLesson.hasMaterials && (
                  <TabsContent value="materiais" className="animate-fade-in">
                    <div className="ejup-card p-6">
                      <h3 className="text-xl font-medium mb-4">Material Complementar</h3>
                      
                      {currentLesson.materials && currentLesson.materials.length > 0 ? (
                        <CourseMaterials materials={currentLesson.materials} />
                      ) : (
                        <p className="text-zinc-400">
                          Esta aula não possui materiais complementares disponíveis no momento.
                        </p>
                      )}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
              
              {/* Lesson Navigation Footer */}
              <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Button variant="outline" asChild>
                    <Link to={`/my-courses`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar para meus cursos
                    </Link>
                  </Button>
                  
                  {!currentLesson.completed && (
                    <Button 
                      variant="outline" 
                      onClick={markLessonAsCompleted}
                      className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/10"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Marcar como concluída
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {previousLesson && (
                    <Button variant="outline" onClick={handlePreviousLesson}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      {previousLesson.title.length > 20 
                        ? `${previousLesson.title.substring(0, 20)}...` 
                        : previousLesson.title}
                    </Button>
                  )}
                  
                  {nextLesson ? (
                    <Button onClick={handleNextLesson} className="bg-ejup-pink hover:bg-ejup-pink/90">
                      {nextLesson.title.length > 20 
                        ? `${nextLesson.title.substring(0, 20)}...` 
                        : nextLesson.title}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Concluir curso
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Selecione uma aula para começar.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseLearn;
