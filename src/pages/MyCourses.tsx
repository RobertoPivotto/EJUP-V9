import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InternalLayout from '@/components/layout/InternalLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FiPlay, FiClock, FiBook, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useCourseProgress from '@/hooks/useCourseProgress';
import { initializePurchasedCourses } from '@/utils/courseUtils';

const MyCourses = () => {
  // Mock user data
  const userName = "João Silva";
  
  // State para o carrossel de notícias
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  
  // Inicializar cursos comprados na primeira carga
  useEffect(() => {
    initializePurchasedCourses();
  }, []);
  
  // Componente para card de curso com hook de progresso
  const CourseCard = ({ course }: { course: any }) => {
    const { getContinueLink } = useCourseProgress(course.id);
    
    const continueLinkUrl = getContinueLink(course.moduleId, course.lessonId, course.lastPosition);
    
    return (
      <Card className="bg-zinc-800/50 border-zinc-700 hover:border-ejup-orange/50 transition-all overflow-hidden flex flex-col">
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-32 md:h-40 object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-700">
            <div className="bg-ejup-orange h-1" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
        <CardContent className="p-3 md:p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-sm md:text-base line-clamp-2">{course.title}</h3>
            {course.caap && (
              <Badge variant="outline" className="border-ejup-cyan text-ejup-cyan text-xs hidden md:inline-flex">CAAP</Badge>
            )}
          </div>
          <p className="text-xs md:text-sm text-zinc-400 mb-3 md:mb-4 line-clamp-1">{course.module} | {course.lesson}</p>
          <Link 
            to={continueLinkUrl}
            className="border border-zinc-600 bg-zinc-800/50 hover:bg-ejup-orange hover:border-ejup-orange text-white font-medium rounded-lg px-3 md:px-6 py-2 transition-all flex items-center justify-center gap-2 mt-auto w-full text-xs md:text-sm no-underline"
          >
            <span className="md:hidden flex items-center gap-2">
              <FiPlay size={12} />
              Acessar Curso
            </span>
            <span className="hidden md:inline">
              Acessar Curso
            </span>
          </Link>
        </CardContent>
      </Card>
    );
  };
  
  // Mock data for courses with CAAP status
  const recommendedCourses = [
    {
      id: 1,
      title: 'Advocacia 4.0',
      duration: '12 horas',
      modules: 8,
      caap: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Cálculos Judiciais',
      duration: '10 horas',
      modules: 6,
      caap: false,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Contratos Inteligentes',
      duration: '8 horas',
      modules: 5,
      caap: true,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Compliance Empresarial',
      duration: '14 horas',
      modules: 9,
      caap: false,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Mock news data
  const latestNews = [
    {
      id: 1,
      category: 'Notícias do Dia',
      title: 'STF decide sobre constitucionalidade da Lei de Improbidade',
      date: '13 de maio, 2025',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      category: 'EJUP',
      title: 'Novo curso de Direito Digital disponível esta semana',
      date: '12 de maio, 2025',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      category: 'Notícias do Dia',
      title: 'OAB anuncia novos critérios para o Exame de Ordem',
      date: '11 de maio, 2025',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      category: 'EJUP',
      title: 'EJUP firma parceria com a OAB para cursos com certificação',
      date: '10 de maio, 2025',
      image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Dados dos cursos para "Continue Assistindo" - APENAS cursos já adquiridos/pagos
  const continueCourses = [
    {
      id: 1,
      title: 'Direito Civil',
      module: 'Módulo 2',
      lesson: 'Aula 1',
      progress: 20,
      caap: true,
      lastPosition: 450, // tempo em segundos onde parou
      moduleId: 2,
      lessonId: 1,
      purchased: true, // Curso já comprado
      purchaseDate: '2024-11-15',
      expiryDate: '2025-11-15',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Direito Penal',
      module: 'Módulo 3',
      lesson: 'Aula 2',
      progress: 40,
      caap: false,
      lastPosition: 720, // tempo em segundos onde parou
      moduleId: 3,
      lessonId: 2,
      purchased: true, // Curso já comprado
      purchaseDate: '2024-10-20',
      expiryDate: '2025-10-20',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Direito Empresarial',
      module: 'Módulo 4',
      lesson: 'Aula 3',
      progress: 60,
      caap: true,
      lastPosition: 1200, // tempo em segundos onde parou
      moduleId: 4,
      lessonId: 3,
      purchased: true, // Curso já comprado
      purchaseDate: '2024-09-10',
      expiryDate: '2025-09-10',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Direito Trabalhista',
      module: 'Módulo 5',
      lesson: 'Aula 4',
      progress: 80,
      caap: false,
      lastPosition: 350, // tempo em segundos onde parou
      moduleId: 5,
      lessonId: 4,
      purchased: true, // Curso já comprado
      purchaseDate: '2024-08-05',
      expiryDate: '2025-08-05',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Funções para navegação do carrossel
  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % latestNews.length);
  };

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + latestNews.length) % latestNews.length);
  };

  // Mostrar 2 notícias por vez no mobile, 3 no desktop
  const getVisibleNews = () => {
    const result = [];
    const itemsToShow = window.innerWidth < 768 ? 2 : 3; // 2 no mobile, 3 no desktop
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentNewsIndex + i) % latestNews.length;
      result.push(latestNews[index]);
    }
    return result;
  };
  
  return (
    <InternalLayout>
      <div className="ejup-container py-10">
        <h1 className="text-3xl font-bold mb-6">Bem-vindo, {userName}!</h1>
        {/* Player embed - Área de membros */}
        <section className="mb-10">
          <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden">
            <CardContent className="p-0">
              <iframe
                src="https://player.scaleup.com.br/embed/798645c51d36bbd1656b9355790b93cfe14e055d"
                title="Sergio Sacani"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: '100%', aspectRatio: '16 / 9', border: 0, margin: '0 auto' }}
              />
            </CardContent>
          </Card>
        </section>
        
        {/* Seção de Notícias em Destaque - Carrossel */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Notícias em Destaque</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevNews}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 transition-colors"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextNews}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 transition-colors"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getVisibleNews().map((news) => (
              <Card key={news.id} className="bg-zinc-800/50 border-zinc-700 hover:border-ejup-orange/50 transition-all overflow-hidden flex flex-col">
                <div className="relative h-24 md:h-32">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 m-3">
                    <Badge 
                      className={`text-xs ${
                        news.category === 'EJUP' 
                          ? 'bg-ejup-orange text-white' 
                          : 'bg-ejup-cyan text-black'
                      }`}
                    >
                      {news.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3 md:p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-xs md:text-sm mb-2 md:mb-3 line-clamp-2 flex-grow">{news.title}</h3>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-zinc-400">{news.date}</span>
                    <button className="text-ejup-orange text-xs hover:underline">
                      Leia mais
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Continue Assistindo */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Continue Assistindo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {continueCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Recomendados para Você - Direcionam para página de compra (apenas desktop) */}
        <section className="mb-12 hidden md:block">
          <h2 className="text-2xl font-bold mb-6">Recomendados para Você</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="bg-zinc-800/50 border-zinc-700 hover:border-ejup-orange/50 transition-all overflow-hidden flex flex-col">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-40 object-cover" 
                  />
                  {/* Badge indicando que é um curso para compra */}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-ejup-orange/90 text-white text-xs">
                      Novo
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    {course.caap && (
                      <Badge variant="outline" className="border-ejup-cyan text-ejup-cyan text-xs">CAAP</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
                    <div className="flex items-center gap-1">
                      <FiClock size={14} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiBook size={14} />
                      <span>{course.modules} módulos</span>
                    </div>
                  </div>
                  {/* Link direciona para página de detalhes/compra */}
                  <Link 
                    to={`/courses/${course.id}`}
                    className="border border-zinc-600 bg-zinc-800/50 hover:bg-ejup-orange hover:border-ejup-orange text-white font-medium rounded-lg px-6 py-2 transition-all flex items-center justify-center gap-2 mt-auto w-full text-sm no-underline"
                  >
                    <FiBook size={14} />
                    Ver Curso
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </InternalLayout>
  );
};

export default MyCourses;
