import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <div className="ejup-section pt-8 pb-10 bg-[#e5e5e0]">
      {/* Efeitos de iluminação removidos */}
      <div className="ejup-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Vídeo */}
          <div className="mb-10">
            <div className="relative w-full mx-auto rounded-lg overflow-hidden bg-[#e5e5e0] border border-ejup-mediumGray/40 group cursor-pointer hover:border-ejup-accent/50 transition-all duration-300" style={{ width: '130%', maxWidth: '130%', marginLeft: '-15%', height: '500px' }}>
              {/* Thumbnail do vídeo */}
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Conheça a EJUP"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay escuro - sem efeito hover */}
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Botão Play */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative bg-ejup-accent hover:bg-ejup-accent/90 rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <Play className="h-6 w-6 text-ejup-primary fill-ejup-primary ml-0.5" />
                </div>
              </div>
              
              {/* Texto no vídeo */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-semibold text-white mb-2">Nossa História e Missão</h3>
                <p className="text-zinc-200 text-sm">Assista e entenda como estamos transformando a educação jurídica</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex justify-center">
            <div className="w-full max-w-md md:max-w-none md:w-auto">
              <Button 
                className="bg-zinc-800 hover:bg-zinc-700 text-white group text-base px-8 py-4 transition-all duration-300 shadow-sm font-medium"
                variant="secondary"
                asChild
              >
                <Link to="/courses">
                  <span>Conheça Nossos Cursos</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
