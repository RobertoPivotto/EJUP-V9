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
  }
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
    <div className="relative min-h-screen flex items-start md:items-center pt-24 md:pt-24 pb-12 md:pb-8 bg-[#1d1d1d]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-ejup-darkBg">
        <div className="absolute top-0 left-0 right-0 h-[70%] bg-gradient-to-br from-[#050D1A]/20 via-ejup-cyan/10 to-[#050D1A]/10 opacity-60 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="ejup-container relative z-10 px-4 md:px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-24">
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-gotham font-medium tracking-tight mb-6 md:mb-8">
              <span className="block md:hidden font-gotham">
                Direito com quem faz<br />
                <span className="font-bold text-[#F2CA7E] border-b-2 border-[#F2CA7E] whitespace-nowrap font-gotham">na prática</span>
              </span>
              <span className="hidden md:block font-gotham">
                Direito com quem faz <span className="font-bold text-[#F2CA7E] border-b-2 border-[#F2CA7E] whitespace-nowrap font-gotham">na prática</span>
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-zinc-300 mb-6 md:mb-10 max-w-xl leading-relaxed font-gotham">
              <span className="block md:hidden font-gotham">
                Aprenda com quem faz o mercado jurídico acontecer.<br />
                Cursos práticos e estratégicos, pensados para transformar sua carreira.
              </span>
              <span className="hidden md:block font-gotham">
                Aprenda com quem faz o mercado jurídico acontecer. Cursos práticos e estratégicos, pensados para transformar sua carreira.
              </span>
            </p>
            
            <div className="flex justify-center md:justify-start mb-8 md:mb-12">
              <div className="w-full max-w-md md:max-w-none md:w-auto">
                <Button className="bg-black/30 hover:bg-black/40 backdrop-blur-xl border-0 ring-1 ring-[#F2CA7E]/50 text-white hover:text-white group text-xs md:text-sm px-3 md:px-6 py-3 transition-all duration-300 flex-1 md:flex-none shadow-sm font-gotham" asChild>
                  <Link to="/courses">
                    <span>Explorar Cursos</span>
                    <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
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
              <div className="text-sm text-zinc-300 font-gotham">
                Mais de <span className="text-white font-semibold">500</span> profissionais capacitados
              </div>
            </div>
          </div>
          
          {/* Right Column - Featured Content */}
          <div className="w-full md:w-1/2 flex-grow max-w-xl animate-slide-up" style={{ animationDelay: '0.4s' }}>            
            {/* Mobile Layout: Arrows + Card */}
            <div className="flex items-center gap-3 md:relative">
              {/* Left Arrow */}
              <div className="flex-shrink-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:-left-14 md:z-20">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 md:h-9 md:w-9 hover:bg-transparent transition-colors" 
                  onClick={prevContent}
                >
                  <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-[#F2CA7E] transition-colors" />
                </Button>
              </div>
              
              {/* Content Card */}
              <div className="relative w-full group h-[360px] md:h-[520px] flex-grow transition-all duration-300">
              {/* Content Label - Positioned over the card */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                <div className="bg-zinc-800 border border-white/20 px-5 py-2 rounded-lg h-9 flex items-center justify-center min-w-0">
                  <span className="text-sm font-semibold text-zinc-300 whitespace-nowrap font-gotham">
                    {activeContent.type} em destaque
                  </span>
                </div>
              </div>
              
              {/* Efeito de brilho fixo que acompanha a expansão */}
              <div className="absolute -inset-0.5 bg-[#F2CA7E] rounded-2xl blur opacity-40 group-hover:scale-[1.02] transition-all duration-300"></div>
              
              <div className="relative rounded-2xl overflow-hidden h-full group-hover:scale-[1.02] transition-all duration-300">
                <div className="bg-[#151515] rounded-2xl border border-zinc-700/50 overflow-hidden h-full flex flex-col">
                  <div className="relative h-44 md:h-72 overflow-hidden">
                    <img 
                      src={activeContent.image}
                      alt={activeContent.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
                  </div>
                  
                  <div className="p-3 md:p-4 flex flex-col flex-grow">
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
                    
                    <Link to={activeContent.path} className="block mb-2">
                      <h3 className="text-lg md:text-xl font-semibold leading-tight group-hover:text-[#F2CA7E] transition-colors cursor-pointer hover:text-[#F2CA7E] font-gotham">{activeContent.title}</h3>
                    </Link>
                    
                    <div className="flex items-center mb-2 md:mb-3">
                      <img 
                        src="/lovable-uploads/team/instructor.png" 
                        alt={activeContent.author} 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2 md:mr-3 object-cover border-2 border-zinc-700" 
                      />
                      <div className="font-gotham">
                        <div className="text-xs md:text-sm font-medium">{activeContent.author}</div>
                        <div className="text-xs text-zinc-500">{activeContent.authorRole}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-2 md:mb-3">
                      {activeContent.type === 'Curso' && (
                        <>
                          <div className="bg-zinc-800/60 p-1 md:p-1.5 rounded-lg">
                            <div className="text-xs text-zinc-500 font-gotham">Duração</div>
                            <div className="text-xs md:text-sm font-medium font-gotham">{activeContent.duration}</div>
                          </div>
                          <div className="bg-zinc-800/60 p-1 md:p-1.5 rounded-lg">
                            <div className="text-xs text-zinc-500 font-gotham">Módulos</div>
                            <div className="text-xs md:text-sm font-medium font-gotham">{activeContent.modules}</div>
                          </div>
                        </>
                      )}
                      
                      {activeContent.type === 'Podcast' && (
                        <div className="bg-zinc-800/60 p-1 md:p-1.5 rounded-lg col-span-2">
                          <div className="text-xs text-zinc-500 font-gotham">Duração</div>
                          <div className="text-xs md:text-sm font-medium font-gotham">{activeContent.duration}</div>
                        </div>
                      )}
                      
                      {activeContent.type === 'Artigo' && (
                        <div className="bg-zinc-800/60 p-1 md:p-1.5 rounded-lg col-span-2">
                          <div className="text-xs text-zinc-500 font-gotham">Tempo de Leitura</div>
                          <div className="text-xs md:text-sm font-medium font-gotham">{activeContent.readTime}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-auto">
                      <Button 
                        className="w-full flex items-center justify-center py-2 md:py-3 group bg-[#F2CA7E] hover:bg-[#F2CA7E]/90 text-[#A66F0A] font-gotham" 
                        variant="secondary"
                        asChild
                      >
                        <Link to={activeContent.path}>
                          <span className="text-xs md:text-sm">
                            {activeContent.type === 'Curso' ? 'Ver detalhes' : 
                             activeContent.type === 'Podcast' ? 'Ouvir agora' : 
                             'Ler artigo'}
                          </span>
                          <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              
              {/* Right Arrow */}
              <div className="flex-shrink-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:-right-14 md:z-20">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 md:h-9 md:w-9 hover:bg-transparent transition-colors" 
                  onClick={nextContent}
                >
                  <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-[#F2CA7E] transition-colors" />
                </Button>
              </div>
            </div>
            
            {/* Indicadores de página */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {featuredContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "w-8 bg-[#F2CA7E]" : "w-2 bg-zinc-600"
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
