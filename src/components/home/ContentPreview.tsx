import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Headphones, BookOpen, ArrowRight } from 'lucide-react';

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'A importância dos contratos bem elaborados no ambiente empresarial',
    excerpt: 'Entenda como contratos bem redigidos podem prevenir litígios e proteger os interesses da empresa.',
    author: 'Eduardo Souza',
    date: '10 de maio, 2025',
    category: 'Direito Empresarial',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    title: 'LGPD: 5 passos essenciais para adequação de escritórios de advocacia',
    excerpt: 'Confira as principais medidas para garantir a conformidade com a Lei Geral de Proteção de Dados.',
    author: 'Marina Lima',
    date: '5 de maio, 2025',
    category: 'Direito Digital',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    title: 'Arbitragem empresarial: vantagens e aplicações práticas',
    excerpt: 'Explore como a arbitragem pode ser uma solução eficiente para resolução de conflitos empresariais.',
    author: 'Carlos Oliveira',
    date: '2 de maio, 2025',
    category: 'Direito Empresarial',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
];

// Mock data for podcast episodes
const podcastEpisodes = [
  {
    id: 1,
    title: 'O futuro da advocacia na era digital',
    excerpt: 'Conversamos com especialistas sobre como a tecnologia está transformando a prática jurídica.',
    guests: 'Paulo Silva e Renata Mendonça',
    date: '12 de maio, 2025',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    title: 'Desafios do direito empresarial pós-pandemia',
    excerpt: 'Análise dos novos cenários e oportunidades para profissionais do direito empresarial.',
    guests: 'Marcelo Torres',
    date: '3 de maio, 2025',
    duration: '38 min',
    image: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    title: 'Carreiras jurídicas não tradicionais',
    excerpt: 'Conheça caminhos alternativos para profissionais do direito além da advocacia tradicional.',
    guests: 'Carla Peixoto e Henrique Alves',
    date: '26 de abril, 2025',
    duration: '52 min',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
  },
];

const ContentPreview = () => {
  return (
    <div className="ejup-section pt-10 pb-24 relative">
      {/* Efeitos de iluminação específicos do ContentPreview */}
      <div className="absolute top-[0%] left-[5%] w-[40%] h-[30%] bg-[#29D6E6]/10 blur-[100px] rounded-full"></div>
      <div className="absolute top-[60%] right-[-5%] w-[40%] h-[30%] bg-[#29D6E6]/10 blur-[100px] rounded-full"></div>
      <div className="ejup-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#f2ca7e]">Conteúdos On Demand</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Acompanhe nosso podcast e coluna para se manter atualizado com as tendências e discussões do mundo jurídico
          </p>
        </div>

        {/* Blog Section */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BookOpen className="text-[#f2ca7e] mr-3 h-6 w-6" />
              <h3 className="text-2xl font-bold">Coluna Jurídica</h3>
            </div>
            <Link to="/content/articles" className="text-[#f2ca7e] hover:text-[#f2ca7e]/80 flex items-center text-sm font-medium group">
              <span>Ver todos os artigos</span>
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {blogPosts.map((post, index) => (
              <div className={`relative w-full group ${index >= 2 ? 'hidden lg:block' : ''}`} key={post.id}>
                <div className="absolute -inset-0.5 bg-[#f2ca7e] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <Link to={`/content/blog/${post.id}`} className="relative block rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
                  <div className="bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden h-full flex flex-col">
                    <div className="h-32 md:h-48 relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 md:p-5 flex-grow">
                      <div className="flex items-center mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                          {post.category}
                        </span>
                      </div>
                      <h4 className="text-sm md:text-lg font-semibold mb-2 text-zinc-300 group-hover:text-[#f2ca7e] transition-colors line-clamp-2">{post.title}</h4>
                      <p className="text-zinc-400 text-xs md:text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="text-xs text-zinc-500 flex justify-between items-center mt-auto">
                        <span>{post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-base px-8 py-4" variant="secondary">
              <Link to="/content/articles">Ver todo o conteúdo</Link>
            </Button>
          </div>
        </div>
        
        {/* Podcast Section - Highlighted */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Headphones className="text-[#f2ca7e] mr-3 h-6 w-6" />
              <h3 className="text-2xl font-bold">Podcast EJUP</h3>
            </div>
            <Link to="/content/podcast" className="text-[#f2ca7e] hover:text-[#f2ca7e]/80 flex items-center text-sm font-medium group">
              <span>Ver todos os episódios</span>
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {podcastEpisodes.slice(0, 3).map((episode, index) => (
              <div key={episode.id} className={`relative w-full group h-full ${index >= 2 ? 'hidden lg:block' : ''}`}>
                {/* Efeito de brilho - visível apenas no hover */}
                <div className="absolute -inset-0.5 bg-[#f2ca7e] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <Link to={`/content/podcast/${episode.id}`} className="relative block rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 h-full">
                  <div className="bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden h-full flex flex-col">
                    <div className="relative h-32 md:h-48">
                      <img 
                        src={episode.image} 
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center mb-1">
                          <div className="bg-[#f2ca7e]/90 rounded-full h-8 w-8 flex items-center justify-center group-hover:bg-[#f2ca7e] transition-colors">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <span className="text-white text-sm ml-2 font-medium">{episode.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 md:p-5 flex flex-col flex-grow">
                      <h4 className="text-sm md:text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[#f2ca7e] transition-colors">{episode.title}</h4>
                      <p className="text-zinc-400 text-xs md:text-sm mb-3 line-clamp-2">{episode.excerpt}</p>
                      <div className="text-xs text-zinc-500 flex justify-between items-center mt-auto">
                        <span>Com {episode.guests}</span>
                        <span>{episode.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPreview;
