import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const images = [
  '/lovable-uploads/Banner para site.png',
  '/lovable-uploads/course-preview.jpg',
  '/lovable-uploads/Cópia de EJUP (5).png',
];

const WelcomeBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) => setIndex((prev) => (prev + dir + images.length) % images.length);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder de captura — aqui podemos integrar com backend/serviço de email
    console.log('Lead:', { name, email });
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-72px)]">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Banner ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Overlay conteúdo dentro do container */}
        <div className="absolute inset-0 flex items-center">
          <div className="ejup-container px-4">
            <div className="max-w-xl bg-black/40 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                Bem-vindo à EJUP
              </h1>
              <p className="text-zinc-200 mb-4 md:mb-6 text-sm md:text-base">
                Aprenda com quem faz na prática. Cadastre-se para receber novidades e conteúdos.
              </p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="bg-zinc-900/60 border-zinc-700 text-white"
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                  required
                  className="bg-zinc-900/60 border-zinc-700 text-white"
                />
                <Button type="submit" className="bg-ejup-orange hover:bg-ejup-orange/90 text-black font-semibold">
                  Quero receber
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6">
          <button
            aria-label="Anterior"
            className="p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20"
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <button
            aria-label="Próximo"
            className="p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20"
            onClick={() => go(1)}
          >
            ›
          </button>
        </div>

        {/* Dots - estilo EJUP (ativo em formato pill, inativos círculos cinza) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              className={`${
                i === index
                  ? 'h-2 w-8 rounded-full bg-ejup-orange'
                  : 'h-2 w-2 rounded-full bg-zinc-700'
              } transition-all`}
              onClick={() => setIndex(i)}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;