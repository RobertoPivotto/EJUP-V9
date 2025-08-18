import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchAndFilter from '@/components/ui/SearchAndFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPublishedPodcasts, type PodcastData } from '@/utils/podcastData';

// Define types for blog posts and podcast episodes
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  imageColor: string;
}

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'A importância dos contratos bem elaborados no ambiente empresarial',
    excerpt: 'Entenda como contratos bem redigidos podem prevenir litígios e proteger os interesses da empresa.',
    content: '',
    author: 'Eduardo Souza',
    date: '10 de maio, 2025',
    category: 'empresarial',
    readTime: '5 min',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
  },
  {
    id: 2,
    title: 'LGPD: 5 passos essenciais para adequação de escritórios de advocacia',
    excerpt: 'Confira as principais medidas para garantir a conformidade com a Lei Geral de Proteção de Dados.',
    content: '',
    author: 'Marina Lima',
    date: '5 de maio, 2025',
    category: 'digital',
    readTime: '7 min',
    imageColor: 'bg-gradient-to-br from-ejup-cyan/30 to-ejup-orange/30',
  },
  {
    id: 3,
    title: 'Arbitragem vs. Mediação: quando usar cada método?',
    excerpt: 'Análise comparativa sobre os métodos alternativos de resolução de conflitos e quando aplicá-los.',
    content: '',
    author: 'Carlos Mendes',
    date: '28 de abril, 2025',
    category: 'resolucao',
    readTime: '6 min',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-orange/30',
  },
  {
    id: 4,
    title: 'O impacto das decisões do STF no planejamento tributário empresarial',
    excerpt: 'Como as recentes decisões do Supremo estão mudando o cenário para empresas e seus consultores jurídicos.',
    content: '',
    author: 'Ana Rodrigues',
    date: '20 de abril, 2025',
    category: 'tributario',
    readTime: '8 min',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-orange/30',
  },
];

// Use centralized podcast data
const podcastEpisodes: PodcastData[] = getPublishedPodcasts();

const filters = [
  {
    id: 'category',
    name: 'Categoria',
    options: [
      { id: 'empresarial', name: 'Dir. Empresarial' },
      { id: 'digital', name: 'Dir. Digital' },
      { id: 'resolucao', name: 'Resolução de Conflitos' },
      { id: 'tributario', name: 'Dir. Tributário' },
      { id: 'carreira', name: 'Carreira Jurídica' },
    ],
  },
];

const ContentHub = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [filteredContent, setFilteredContent] = useState<BlogPost[] | PodcastData[]>(blogPosts);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'blog') {
      setFilteredContent(applyFilters(blogPosts) as BlogPost[]);
    } else {
      setFilteredContent(applyFilters(podcastEpisodes) as PodcastData[]);
    }
  };
  
  const handleSearch = (query: string) => {
    const baseContent = activeTab === 'blog' ? blogPosts : podcastEpisodes;
      
    if (!query) {
      setFilteredContent(applyFilters(baseContent) as typeof filteredContent);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = baseContent.filter(
      item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.excerpt.toLowerCase().includes(lowerQuery) ||
        (activeTab === 'blog' && 'author' in item && item.author.toLowerCase().includes(lowerQuery)) ||
        (activeTab === 'podcast' && 'guests' in item && item.guests.join(', ').toLowerCase().includes(lowerQuery))
    );
    
    setFilteredContent(filtered as typeof filteredContent);
  };
  
  const handleFilterChange = (filterId: string, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (value && value !== 'all') {
      newFilters[filterId] = value;
    } else {
      delete newFilters[filterId];
    }
    
    setActiveFilters(newFilters);
    
    const baseContent = activeTab === 'blog' ? blogPosts : podcastEpisodes;
    setFilteredContent(applyFilters(baseContent, newFilters) as typeof filteredContent);
  };
  
  const applyFilters = (content: BlogPost[] | PodcastData[], filters = activeFilters) => {
    let filtered = [...content];
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'category') {
        filtered = filtered.filter(item => {
          if ('category' in item) {
            return item.category === value;
          } else if ('categories' in item) {
            return item.categories.includes(value);
          }
          return false;
        });
      }
    });
    
    return filtered;
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-20">
        <div className="ejup-container py-12">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Central de Conteúdo</h1>
            <p className="text-zinc-400">
              Artigos, podcasts e materiais exclusivos para profissionais do Direito
            </p>
          </div>
          
          <Tabs defaultValue="blog" onValueChange={handleTabChange} className="mb-8">
            <TabsList>
              <TabsTrigger value="blog">Coluna</TabsTrigger>
              <TabsTrigger value="podcast">Podcast</TabsTrigger>
            </TabsList>
          
            <SearchAndFilter 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              filters={filters}
            />
          
            <TabsContent value="blog" className="animate-fade-in">
              {filteredContent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredContent.map((post: any) => (
                    <Link to={`/content/blog/${post.id}`} key={post.id} className="ejup-card hover:scale-[1.02] hover:shadow-lg hover:shadow-ejup-orange/5">
                      <div className={`h-32 ${post.imageColor}`}></div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                            {post.category === 'empresarial' ? 'Dir. Empresarial' : 
                             post.category === 'digital' ? 'Dir. Digital' :
                             post.category === 'resolucao' ? 'Resolução de Conflitos' :
                             post.category === 'tributario' ? 'Dir. Tributário' : post.category}
                          </span>
                          <span className="text-xs text-zinc-500">{post.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                        <p className="text-zinc-400 text-sm mb-5">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-zinc-400">
                            Por <span className="text-white">{post.author}</span>
                          </div>
                          <div className="text-xs text-zinc-500">{post.readTime} leitura</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">Nenhum artigo encontrado</h3>
                  <p className="text-zinc-400">Tente ajustar os filtros ou termos de busca</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="podcast" className="animate-fade-in">
              {filteredContent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredContent.map((episode: any) => (
                    <Link to={`/content/podcast/${episode.id}`} key={episode.id} className="ejup-card hover:scale-[1.02] hover:shadow-lg hover:shadow-ejup-orange/5">
                      <div className={`h-32 ${episode.imageColor} flex items-center justify-center`}>
                        <div className="w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex gap-1">
                            {(Array.isArray(episode.categories) ? episode.categories : [episode.category]).slice(0, 2).map((cat: string, index: number) => (
                              <span key={index} className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                                {cat === 'empresarial' ? 'Dir. Empresarial' : 
                                 cat === 'digital' ? 'Dir. Digital' :
                                 cat === 'carreira' ? 'Carreira Jurídica' :
                                 cat === 'sustentabilidade' ? 'Sustentabilidade' : cat}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-zinc-500">{episode.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{episode.title}</h3>
                        <p className="text-zinc-400 text-sm mb-5">{episode.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-zinc-400">
                            Com <span className="text-white">{Array.isArray(episode.guests) ? episode.guests.join(', ') : episode.guests}</span>
                          </div>
                          <div className="text-xs text-zinc-500">{episode.duration}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">Nenhum episódio encontrado</h3>
                  <p className="text-zinc-400">Tente ajustar os filtros ou termos de busca</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContentHub;
