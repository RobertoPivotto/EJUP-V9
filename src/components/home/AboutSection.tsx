import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="ejup-section relative overflow-hidden">
      <div className="absolute inset-0 bg-ejup-darkBg">
        <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-br from-ejup-orange/15 via-transparent to-ejup-orange/5 opacity-40 blur-3xl"></div>
      </div>
      
      <div className="ejup-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título e Descrição */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Conheça a EJUP <span className="text-ejup-orange">por Dentro</span>
            </h2>
            <p className="text-lg font-medium text-ejup-orange leading-relaxed max-w-3xl mx-auto">
              Quem não se desenvolve com a EJUP concorre em desvantagem. Descubra como estamos redefinindo o conceito de educação jurídica.
            </p>
          </div>

          {/* Vídeo */}
          <div className="mb-10">
            <div className="relative max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700 group cursor-pointer hover:border-ejup-orange/50 transition-all duration-300">
              {/* Thumbnail do vídeo */}
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Conheça a EJUP"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay escuro */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
              
              {/* Botão Play */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative bg-ejup-orange hover:bg-ejup-orange/90 rounded-full p-4 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <Play className="h-6 w-6 text-white fill-white ml-0.5" />
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
            <Button 
              className="bg-orange-900/40 hover:bg-orange-800/50 backdrop-blur-md border border-orange-800/30 text-orange-100 hover:text-white group text-sm px-6 py-3 transition-all duration-300"
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
    </section>
  );
};

export default AboutSection;
