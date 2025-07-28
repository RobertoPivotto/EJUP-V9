import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Mock data for courses
const featuredCourses = [
  {
    id: 1,
    title: 'Elaboração de Contratos Empresariais',
    description: 'Aprenda a elaborar contratos eficientes para empresas.',
    instructor: 'Eduardo Souza',
    instructorRole: 'Advogado Empresarial',
    instructorImage: '/lovable-uploads/team/instructor.png',
    duration: '48 horas',
    modules: 8,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Direito Digital e Proteção de Dados',
    description: 'Entenda os desafios jurídicos da era digital e LGPD.',
    instructor: 'Marina Lima',
    instructorRole: 'Especialista em Direito Digital',
    instructorImage: '/lovable-uploads/team/depoente 1.png',
    duration: '32 horas',
    modules: 6,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Mediação e Arbitragem',
    description: 'Técnicas e estratégias para resolução alternativa de conflitos.',
    instructor: 'Carlos Mendes',
    instructorRole: 'Mediador Certificado',
    instructorImage: '/lovable-uploads/team/depoente 2.png',
    duration: '24 horas',
    modules: 5,
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Direito Tributário Avançado',
    description: 'Domine as complexidades do sistema tributário brasileiro.',
    instructor: 'Ana Rodrigues',
    instructorRole: 'Especialista em Direito Tributário',
    instructorImage: '/lovable-uploads/team/depoente 3.png',
    duration: '40 horas',
    modules: 7,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];

const FeaturedCourses = () => {
  // Função para fazer scroll para o topo da página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="ejup-section py-16">
      <div className="ejup-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Cursos em Destaque</h2>
            <p className="text-zinc-400 mt-2">Conhecimento prático e atualizado para profissionais do Direito</p>
          </div>
          <Button className="mt-4 md:mt-0" variant="outline" asChild>
            <Link to="/courses">Ver todos os cursos</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <div className="relative w-full group h-[620px]" key={course.id}>
              {/* Efeito de brilho */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-pink via-ejup-cyan to-ejup-orange rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              
              <div className="relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 h-full">
                <div className="bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden h-full flex flex-col">
                  {/* Imagem padronizada */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  
                  {/* Conteúdo com estrutura rígida para alinhamento */}
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Título com altura fixa e efeito hover */}
                    <div className="h-14 flex items-start mb-3">
                      <h3 className="text-lg font-semibold leading-tight line-clamp-2 text-white group-hover:text-ejup-pink transition-colors duration-300">{course.title}</h3>
                    </div>
                    
                    {/* Descrição com altura fixa */}
                    <div className="h-10 mb-4">
                      <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">{course.description}</p>
                    </div>
                    
                    {/* Instrutor com altura fixa */}
                    <div className="h-12 flex items-center mb-4">
                      <img 
                        src={course.instructorImage}
                        alt={course.instructor}
                        className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-zinc-700 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-white truncate">{course.instructor}</div>
                        <div className="text-xs text-zinc-500 truncate">{course.instructorRole}</div>
                      </div>
                    </div>
                    
                    {/* Espaçador flexível para empurrar elementos para baixo */}
                    <div className="flex-grow"></div>
                    
                    {/* Informações do curso - sempre na mesma posição */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-zinc-800 p-2.5 rounded-lg text-center">
                        <div className="text-xs text-zinc-500 mb-1">Duração</div>
                        <div className="text-sm font-medium text-white">{course.duration}</div>
                      </div>
                      <div className="bg-zinc-800 p-2.5 rounded-lg text-center">
                        <div className="text-xs text-zinc-500 mb-1">Módulos</div>
                        <div className="text-sm font-medium text-white">{course.modules} módulos</div>
                      </div>
                    </div>
                    
                    {/* Botão - sempre na mesma posição com cor rosa */}
                    <Button className="w-full bg-ejup-pink hover:bg-ejup-pink/90 text-white py-3 group border-0" asChild>
                      <Link 
                        to={`/courses/${course.id}`} 
                        onClick={scrollToTop}
                      >
                        <span className="text-sm font-medium">Ver Detalhes</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
