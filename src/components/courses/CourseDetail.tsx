import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckIcon, ShoppingCart, Check, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCourseProgress from '@/hooks/useCourseProgress';
import { isCourseOwned, addPurchasedCourse, updateLastAccess, initializePurchasedCourses } from '@/utils/courseUtils';

interface Module {
  id: number;
  title: string;
  duration: string;
  lessons: { title: string; duration: string }[];
}

interface InstructorType {
  name: string;
  role: string;
  bio?: string;
  initials: string;
  photo?: string;
}

interface MultipleInstructorsType {
  instructors: InstructorType[];
}

interface CourseDetailProps {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  level: string;
  duration: string;
  modules: Module[];
  price: string;
  videoUrl?: string;
  objectives: string[];
  instructor: InstructorType;
  instructors?: InstructorType[]; // Para múltiplos instrutores
  category?: string;
  promotedBy?: {
    name: string;
    logo?: string;
  };
  showRelatedCourses?: boolean;
  relatedCourses?: {
    id: string;
    title: string;
    price: string;
    link: string;
  }[];
}

// Função para mapear categorias para nomes de áreas
const getCategoryDisplayName = (category?: string): string => {
  const categoryMap: Record<string, string> = {
    'empresarial': 'Direito Empresarial',
    'digital': 'Direito Digital',
    'resolucao': 'Resolução de Conflitos',
    'trabalhista': 'Direito Trabalhista',
    'tributario': 'Direito Tributário',
  };
  
  return category ? categoryMap[category] || 'Direito' : 'Direito';
};

// Função para extrair valor numérico do preço
const extractPriceValue = (priceString: string): number => {
  const numericValue = priceString.replace(/[^0-9,]/g, '').replace(',', '.');
  return parseFloat(numericValue) || 0;
};

const CourseDetail = ({
  id,
  title,
  description,
  longDescription,
  level,
  duration,
  modules,
  price,
  videoUrl,
  objectives,
  instructor,
  instructors,
  category,
  promotedBy,
  showRelatedCourses,
  relatedCourses,
}: CourseDetailProps) => {
  const { addItem, items, openCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const { getContinueLink, getSavedProgress } = useCourseProgress(id);
  const [imageError, setImageError] = useState(false);
  const [instructorImageError, setInstructorImageError] = useState(false);
  
  // Verificar se o curso já está no carrinho
  const isInCart = items.some(item => item.id === id);
  
  // Obter progresso salvo
  const savedProgress = getSavedProgress();
  const hasProgress = savedProgress && savedProgress.lastLessonId;

  // Inicializar dados e verificar se o curso foi comprado
  useEffect(() => {
    initializePurchasedCourses();
    setIsPurchased(isCourseOwned(id));
  }, [id]);
  
  // Função para alternar expansão do módulo
  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };
  
  // Função para extrair o valor numérico do preço (ex: "R$ 997,00" -> 997)
  const getPriceValue = (priceString: string): number => {
    const numericValue = priceString.replace(/[^0-9,]/g, '').replace(',', '.');
    return parseFloat(numericValue);
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      addItem({
        id,
        title,
        price: getPriceValue(price),
        image: imageError ? '/placeholder.svg' : getAvatarUrl(instructor.name)
      });
    }
    
    // Redirecionar diretamente para o checkout
    window.location.href = '/checkout';
  };

  const getAvatarUrl = (name: string) => {
    try {
      const encodedName = encodeURIComponent(name.trim());
      if (!encodedName) return '/placeholder.svg';
      return `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff&size=256`;
    } catch (error) {
      console.warn('Erro ao gerar URL do avatar:', error);
      return '/placeholder.svg';
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleInstructorImageError = () => {
    setInstructorImageError(true);
  };

  return (
    <div className="ejup-container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <div className="mb-2">
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                    {getCategoryDisplayName(category)}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              </div>
            </div>
            
            <p className="text-lg text-zinc-300">{description}</p>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="curriculum">Currículo</TabsTrigger>
              <TabsTrigger value="instructor">Instrutor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="animate-fade-in">
              <div className="ejup-card p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Sobre o Curso</h3>
                <p className="text-zinc-300 mb-6">{longDescription}</p>
                
                <h4 className="text-lg font-semibold mb-3">O que você vai aprender</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-0.5 bg-ejup-pink/20 rounded-full p-0.5">
                        <CheckIcon className="h-4 w-4 text-ejup-pink" />
                      </div>
                      <span className="text-zinc-300 text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="text-lg font-semibold mb-3">Para quem é este curso</h4>
                <p className="text-zinc-300 mb-6">
                  Este curso é destinado a advogados, estudantes de Direito em fase final de formação e profissionais 
                  que atuam na área jurídica e desejam aprofundar seus conhecimentos práticos na matéria.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="animate-fade-in">
              <div className="ejup-card p-6">
                <h3 className="text-xl font-semibold mb-4">Estrutura do Curso</h3>
                <div className="text-sm text-zinc-400 mb-6">
                  {modules.length} módulos • {calculateTotalLessons(modules)} aulas • {duration}
                </div>
                
                <div className="space-y-2">
                  {modules.map((module) => (
                    <div key={module.id} className="border border-zinc-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-800/50 hover:bg-zinc-800/70 transition-colors"
                      >
                        <div className="text-left">
                          <h4 className="font-medium text-white text-base">Módulo {module.id}: {module.title}</h4>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {module.lessons.length} aulas • {module.duration}
                          </div>
                        </div>
                        <div className="ml-4 text-zinc-400">
                          {expandedModules.has(module.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                      
                      {expandedModules.has(module.id) && (
                        <div className="px-4 py-3 space-y-2 animate-slide-down">
                          {module.lessons.map((lesson, idx) => (
                            <div key={idx} className="flex items-center justify-between py-1.5 border-b border-zinc-800 last:border-0">
                              <div className="flex items-center">
                                <div className="mr-2 text-zinc-500">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                </div>
                                <span className="text-sm text-zinc-300">{lesson.title}</span>
                              </div>
                              <span className="text-xs text-zinc-500">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="animate-fade-in">
              <div className="ejup-card p-6">
                {instructors && instructors.length > 1 ? (
                  // Múltiplos instrutores
                  <div className="space-y-8">
                    <h3 className="text-xl font-semibold mb-6">Instrutores do Curso</h3>
                    {instructors.map((inst, index) => (
                      <div key={index} className="flex items-start gap-6 pb-6 border-b border-zinc-800 last:border-0">
                        <div className="flex-shrink-0">
                          <img 
                            src={instructorImageError ? '/placeholder.svg' : getAvatarUrl(inst.name)}
                            alt={inst.name}
                            className="w-20 h-20 rounded-full object-cover"
                            onError={handleInstructorImageError}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">{inst.name}</h4>
                          <p className="text-ejup-cyan text-sm font-medium mb-3">{inst.role}</p>
                          <p className="text-zinc-300 text-sm leading-relaxed">{inst.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Instrutor único
                  <div>
                    <div className="flex items-center mb-6">
                      <img 
                        src={instructorImageError ? '/placeholder.svg' : getAvatarUrl(instructor.name)}
                        alt={instructor.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                        onError={handleInstructorImageError}
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{instructor.name}</h3>
                        <p className="text-zinc-400">{instructor.role}</p>
                      </div>
                    </div>
                    <p className="text-zinc-300">{instructor.bio}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {showRelatedCourses && relatedCourses && relatedCourses.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-ejup-cyan/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-ejup-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Cursos Relacionados</h3>
                  <p className="text-sm text-zinc-400">Aprofunde seus conhecimentos com estes cursos complementares</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedCourses.map((course) => (
                  <div key={course.id} className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-5 hover:bg-zinc-800/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-ejup-cyan rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white mb-2 line-clamp-2">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span>R$ {course.price}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              // Adicionar ao carrinho e redirecionar para checkout
                              const courseItem = {
                                id: parseInt(course.id) || Date.now(),
                                title: course.title,
                                price: extractPriceValue(course.price),
                                image: imageError ? '/placeholder.svg' : getAvatarUrl(course.title)
                              };
                              addItem(courseItem);
                              window.location.href = '/checkout';
                            }}
                            className="text-ejup-cyan hover:text-ejup-cyan/80 hover:bg-ejup-cyan/10 p-0 h-auto font-medium text-sm"
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            Comprar agora
                          </Button>
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Popular</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="ejup-card sticky top-24">
            {/* Vídeo do professor */}
            <div className="aspect-video bg-zinc-900 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Fallback para caso o vídeo não carregue */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-ejup-pink/30 via-ejup-cyan/20 to-ejup-orange/30 z-0">
                  {instructors && instructors.length > 1 ? (
                    <div className="flex items-center gap-2 mb-3">
                      {instructors.slice(0, 3).map((inst, index) => (
                        <div key={index} className="w-16 h-16 rounded-full bg-ejup-cyan flex items-center justify-center text-sm font-medium text-black">
                          {inst.initials}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-ejup-cyan flex items-center justify-center text-2xl font-medium text-black mb-3">
                      {instructor.initials}
                    </div>
                  )}
                  <p className="text-white text-center font-medium">Vídeo de apresentação do curso</p>
                  <p className="text-zinc-300 text-sm text-center mt-1">
                    {instructors && instructors.length > 1 
                      ? `Com ${instructors.length} instrutores especialistas`
                      : `Com ${instructor.name}, ${instructor.role}`
                    }
                  </p>
                </div>
                
                {/* Vídeo do YouTube */}
                <iframe 
                  className="w-full h-full relative z-10"
                  src={videoUrl || `https://www.youtube.com/embed/dQw4w9WgXcQ?si=example`} 
                  title={`Vídeo de apresentação: ${title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  onError={(e) => {
                    // Esconder o iframe em caso de erro
                    (e.target as HTMLIFrameElement).style.display = 'none';
                  }}
                ></iframe>
              </div>
            </div>
            <div className="p-6">
              {!isPurchased && <div className="text-3xl font-bold mb-4">{price}</div>}
              
              {isPurchased ? (
                // Se o curso foi comprado, mostrar botão de continuar/iniciar
                <Link to={getContinueLink(1, 1)}>
                  <Button className="w-full mb-4 bg-ejup-pink hover:bg-ejup-pink/90 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    {hasProgress ? 'Continuar Assistindo' : 'Acessar Curso'}
                  </Button>
                </Link>
              ) : (
                // Se não foi comprado, mostrar apenas opção de compra
                <div className="space-y-3 mb-4">
                  <Button 
                    className={`w-full ${
                      isInCart || showSuccess
                        ? 'bg-ejup-cyan hover:bg-ejup-cyan/90 text-white'
                        : 'bg-ejup-pink/20 hover:bg-ejup-pink/30 text-white border border-ejup-pink/30 hover:border-ejup-pink/50'
                    } font-semibold transition-all duration-300`}
                    onClick={handleAddToCart}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        No carrinho
                      </>
                    ) : showSuccess ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Adicionado!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Adquirir agora
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {hasProgress && isPurchased && (
                <div className="mb-4 p-3 bg-zinc-800/50 rounded-lg">
                  <div className="text-sm text-zinc-400 mb-1">Seu progresso:</div>
                  <div className="text-sm">
                    Última aula: Módulo {savedProgress?.moduleId}
                  </div>
                </div>
              )}
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <div className="mr-3 text-ejup-cyan">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span>{duration} de curso</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-ejup-cyan">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                    </svg>
                  </div>
                  <span>{modules.length} módulos</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-ejup-cyan">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                    </svg>
                  </div>
                  <span>{calculateTotalLessons(modules)} aulas</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-ejup-cyan">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span>Acesso online</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-ejup-cyan">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span>Certificado de conclusão</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate total lessons
const calculateTotalLessons = (modules: Module[]): number => {
  return modules.reduce((total, module) => total + module.lessons.length, 0);
};

export default CourseDetail;
