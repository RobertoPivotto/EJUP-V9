import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data para diferentes tipos de conteúdo em destaque
const featuredContent = [
  {
    id: 1,
    type: 'Curso',
    title: 'Elaboração de Contratos Empresariais',
    author: 'Eduardo Souza',
    authorRole: 'Advogado Empresarial',
    duration: '48 horas',
    modules: '8 módulos',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    path: '/courses/1'
  },
  {
    id: 2,
    type: 'Podcast',
    title: 'O futuro da advocacia na era digital',
    author: 'Paulo Silva e Renata Mendonça',
    authorRole: 'Especialistas em Legaltech',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    path: '/content/podcast/1'
  },
  {
    id: 3,
    type: 'Artigo',
    title: 'LGPD: 5 passos essenciais para adequação de escritórios de advocacia',
    author: 'Marina Lima',
    authorRole: 'Advogada Especialista em Direito Digital',
    readTime: '7 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    path: '/content/blog/2'
  },

];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextContent = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % featuredContent.length);
  };
  
  const prevContent = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + featuredContent.length) % featuredContent.length);
  };
  
  const activeContent = featuredContent[activeIndex];
  
  return (
    <div className="relative h-screen flex items-center pt-16 pb-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-ejup-darkBg">
        <div className="absolute top-0 left-0 right-0 h-[70%] bg-gradient-to-br from-ejup-pink/20 via-ejup-cyan/10 to-ejup-orange/10 opacity-60 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="ejup-container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-24">
          {/* Left Column - Text Content */}
          <div className="md:w-1/2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              Direito com quem faz <span className="text-ejup-pink border-b-2 border-ejup-pink whitespace-nowrap">na prática</span>
            </h1>
            
            <p className="text-lg text-zinc-300 mb-10 max-w-xl leading-relaxed">
              A EJUP é uma plataforma de educação jurídica que conecta profissionais e estudantes ao conhecimento prático e atualizado.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Button className="bg-ejup-pink hover:bg-ejup-pink/90 group text-sm px-4 py-3" asChild>
                <Link to="/courses">
                  <span>Explorar Cursos</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" className="ejup-button-secondary text-sm px-4 py-3" asChild>
                <Link to="/creator">
                  Seja Creator
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="flex -space-x-2">
                <img 
                  src="/lovable-uploads/team/depoente 1.png" 
                  alt="Profissional Jurídico" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/lovable-uploads/team/depoente 2.png" 
                  alt="Profissional Jurídico" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="/lovable-uploads/team/depoente 3.png" 
                  alt="Profissional Jurídico" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-white flex items-center justify-center text-xs font-medium">+</div>
              </div>
              <div className="text-sm text-zinc-300">
                Mais de <span className="text-white font-semibold">500</span> profissionais capacitados
              </div>
            </div>
          </div>
          
          {/* Right Column - Featured Content */}
          <div className="md:w-1/2 flex-grow max-w-xl relative animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {/* Content Label */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-zinc-800 border border-white/20 px-5 py-2 rounded-full">
                <span className="text-sm font-semibold text-zinc-300">
                  {activeContent.type} em destaque
                </span>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="absolute top-1/2 z-20 -translate-y-1/2 -left-14">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 h-10 w-10 shadow-lg" 
                onClick={prevContent}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="absolute top-1/2 z-20 -translate-y-1/2 -right-14">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 h-10 w-10 shadow-lg" 
                onClick={nextContent}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Content Card com mesmo efeito dos cursos */}
            <div className="relative w-full group h-[460px]">
              {/* Efeito de brilho - visível apenas no hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-pink via-ejup-cyan to-ejup-orange rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              
              <div className="relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 h-full">
                <div className="bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden h-full flex flex-col">
                  <div className="relative h-96 overflow-hidden">
                    <img 
                      src={activeContent.image}
                      alt={activeContent.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2 flex items-center gap-2">
                      {activeContent.type === 'Curso' && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                          Curso
                        </span>
                      )}
                      
                      {activeContent.type === 'Artigo' && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                          {activeContent.category}
                        </span>
                      )}
                      
                      {activeContent.type === 'Podcast' && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                          Podcast
                        </span>
                      )}
                      

                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 leading-tight">{activeContent.title}</h3>
                    
                    <div className="flex items-center mb-3">
                      <img 
                        src="/lovable-uploads/team/instructor.png" 
                        alt={activeContent.author} 
                        className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-zinc-700" 
                      />
                      <div>
                        <div className="text-sm font-medium">{activeContent.author}</div>
                        <div className="text-xs text-zinc-500">{activeContent.authorRole}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {activeContent.type === 'Curso' && (
                        <>
                          <div className="bg-zinc-800/60 p-1.5 rounded-lg">
                            <div className="text-xs text-zinc-500">Duração</div>
                            <div className="text-sm font-medium">{activeContent.duration}</div>
                          </div>
                          <div className="bg-zinc-800/60 p-1.5 rounded-lg">
                            <div className="text-xs text-zinc-500">Módulos</div>
                            <div className="text-sm font-medium">{activeContent.modules}</div>
                          </div>
                        </>
                      )}
                      
                      {activeContent.type === 'Podcast' && (
                        <div className="bg-zinc-800/60 p-1.5 rounded-lg col-span-2">
                          <div className="text-xs text-zinc-500">Duração</div>
                          <div className="text-sm font-medium">{activeContent.duration}</div>
                        </div>
                      )}
                      
                      {activeContent.type === 'Artigo' && (
                        <div className="bg-zinc-800/60 p-1.5 rounded-lg col-span-2">
                          <div className="text-xs text-zinc-500">Tempo de Leitura</div>
                          <div className="text-sm font-medium">{activeContent.readTime}</div>
                        </div>
                      )}
                      

                    </div>
                    
                    <div className="mt-auto">
                      <Button 
                        className="w-full flex items-center justify-center py-3 group bg-zinc-800 hover:bg-zinc-700 text-white" 
                        variant="secondary"
                        asChild
                      >
                        <Link to={activeContent.path}>
                          <span>
                            {activeContent.type === 'Curso' ? 'Ver detalhes' : 
                             activeContent.type === 'Podcast' ? 'Ouvir agora' : 
                             'Ler artigo'}
                          </span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Indicadores de página */}
            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                {featuredContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "w-8 bg-ejup-pink" : "w-2 bg-zinc-600"
                    }`}
                    aria-label={`Ver slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Elemento invisível para criar um pequeno espaço após o Hero */}
      <div className="h-4"></div>
    </div>
  );
};

export default Hero;
