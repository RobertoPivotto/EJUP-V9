import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, ArrowLeft, Play } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import ContentFilter from '@/components/content/ContentFilter';
import { getPublishedPodcasts } from '@/utils/podcastData';

const AllPodcasts = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Usar dados centralizados
  const podcastEpisodes = getPublishedPodcasts();

  // Extract all unique topics
  const allTopics = Array.from(new Set(
    podcastEpisodes.flatMap(episode => episode.topics)
  )).sort();

  // Filter episodes based on selected topics and search term
  const filteredEpisodes = useMemo(() => {
    return podcastEpisodes.filter(episode => {
      const matchesTopics = selectedTopics.length === 0 || 
        episode.topics.some(topic => selectedTopics.includes(topic));
      
      const matchesSearch = searchTerm === '' || 
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesTopics && matchesSearch;
    });
  }, [selectedTopics, searchTerm, podcastEpisodes]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="ejup-container py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="h-8 w-8 text-ejup-orange" />
              <h1 className="text-3xl md:text-4xl font-bold">Podcast EJUP</h1>
            </div>
            <p className="text-zinc-400 max-w-3xl">
              Acompanhe discussões aprofundadas sobre temas relevantes do mundo jurídico com especialistas renomados.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="border-ejup-orange/50 text-ejup-orange hover:bg-ejup-orange/10" asChild>
                <Link to="/content">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Ver todo o conteúdo
                </Link>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <ContentFilter
            topics={allTopics}
            onFilterChange={setSelectedTopics}
            onSearchChange={setSearchTerm}
            accentColor="ejup-orange"
          />

          {/* Episodes Grid */}
          <div className="grid grid-cols-1 gap-8">
            {filteredEpisodes.length > 0 ? (
              filteredEpisodes.map((episode) => (
                <div key={episode.id} className="w-full">
                  <Link
                    to={`/content/podcast/${episode.id}`}
                    className="block bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden hover:border-ejup-orange/50 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 relative">
                        <img
                          src={episode.thumbnailImage}
                          alt={episode.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute bottom-4 left-4 flex items-center">
                          <div className="bg-ejup-orange/90 rounded-full h-8 w-8 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white ml-0.5" />
                          </div>
                          <span className="text-white text-sm ml-2">{episode.duration}</span>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex gap-2">
                            {episode.categories.map((categoryId) => (
                              <span key={categoryId} className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                                {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-zinc-500">{formatDate(episode.date)}</span>
                        </div>
                        <h2 className="text-xl font-semibold mb-3">{episode.title}</h2>
                        <p className="text-zinc-400 text-sm mb-4">{episode.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {episode.topics.map((topic, index) => (
                            <span
                              key={index}
                              className={`text-xs px-2 py-1 rounded-full ${
                                selectedTopics.includes(topic)
                                  ? "bg-ejup-orange/20 text-ejup-orange"
                                  : "bg-zinc-800/50 text-zinc-400"
                              }`}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-zinc-400">
                          Com <span className="text-white">{episode.guests.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-zinc-800/20 rounded-2xl border border-zinc-700/30">
                <h3 className="text-xl font-medium mb-2">Nenhum episódio encontrado</h3>
                <p className="text-zinc-400">Tente ajustar seus filtros ou termos de busca</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllPodcasts; 