import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Headphones, Share, Clock, Calendar, MessageSquare, ChevronDown, ChevronUp, Play, ExternalLink, Copy, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getPodcastById, getRelatedPodcasts, type PodcastData } from '@/utils/podcastData';

const PodcastDetail = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState<PodcastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [relatedEpisodes, setRelatedEpisodes] = useState<PodcastData[]>([]);
  const [expandedRelated, setExpandedRelated] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const podcastId = parseInt(id || '1');
    const foundPodcast = getPodcastById(podcastId);
    
    if (foundPodcast) {
      setPodcast(foundPodcast);
      const related = getRelatedPodcasts(podcastId);
      setRelatedEpisodes(related);
    }
    
    setLoading(false);
  }, [id]);

  const shareEpisode = async () => {
    const url = window.location.href;
    const title = podcast?.title || 'Podcast EJUP';
    const text = `Confira este episódio: ${title}`;

    // Verifica se o navegador suporta Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch (error) {
        // Se o usuário cancelar ou houver erro, copia para o clipboard
        copyToClipboard(url);
      }
    } else {
      // Fallback: copia para o clipboard
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "O link do episódio foi copiado para sua área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Extrai o ID do vídeo do YouTube
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ejup-darkBg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ejup-orange"></div>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="min-h-screen bg-ejup-darkBg">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="ejup-container">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4">Podcast não encontrado</h1>
              <Button asChild>
                <Link to="/content">Ver todo o conteúdo</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-20 pb-16">
        <article>
          {/* Breadcrumb e título */}
          <div className="ejup-container mb-8">
            <Button
              variant="ghost"
              className="mb-6 text-zinc-400 hover:text-white"
              asChild
            >
              <Link to="/content">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para conteúdo
              </Link>
            </Button>
            
            {/* Categorias */}
            <div className="flex items-center gap-2 mb-4">
              {podcast.categories.map((categoryId, index) => (
                <span key={categoryId} className="text-sm font-medium px-3 py-1 rounded-full bg-zinc-800 text-ejup-orange">
                  {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{podcast.title}</h1>
            
            {/* Meta informações */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-400">{podcast.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-400">{formatDate(podcast.date)}</span>
              </div>
            </div>

            {/* Botão de compartilhar */}
            <div className="mb-8">
              <Button
                onClick={shareEpisode}
                variant="outline"
                className="border-ejup-orange/50 text-ejup-orange hover:bg-ejup-orange/10"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Share className="mr-2 h-4 w-4" />
                    Compartilhar este episódio
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Vídeo do YouTube embed */}
          <div className="bg-zinc-900/50 py-12 mb-10">
            <div className="ejup-container">
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video relative mb-6 bg-zinc-800 rounded-xl overflow-hidden shadow-xl">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src={getYouTubeEmbedUrl(podcast.videoUrl)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={podcast.title}
                  ></iframe>
                </div>

                {/* Link para abrir no YouTube */}
                <div className="text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <a href={podcast.videoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Abrir no YouTube
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ejup-container">
            <div className="max-w-4xl mx-auto">
              {/* Descrição e convidados */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Sobre este episódio</h2>
                <p className="text-zinc-300 mb-6 text-lg leading-relaxed">
                  {podcast.description}
                </p>

                {/* Frase em destaque */}
                {podcast.highlightQuote && (
                  <blockquote className="border-l-4 border-ejup-orange pl-6 my-8 italic text-xl text-zinc-300 bg-zinc-900/50 py-4 rounded-r-lg">
                    "{podcast.highlightQuote}"
                  </blockquote>
                )}
                
                {/* Convidados */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-3">Convidados</h3>
                  {podcast.guests.map((guest, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-ejup-orange flex items-center justify-center">
                        <Headphones className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{guest}</div>
                        <div className="text-sm text-zinc-400">{podcast.guestsRoles[index] || 'Especialista'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics/Tags */}
              {podcast.topics && podcast.topics.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-4">Temas Abordados</h3>
                  <div className="flex flex-wrap gap-2">
                    {podcast.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-ejup-cyan/20 text-ejup-cyan text-sm rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resumo do Conteúdo */}
              {podcast.content && (
                <div className="mb-10">
                  <Button
                    variant="outline"
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="mb-4 border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {showTranscript ? 'Ocultar' : 'Ver'} Resumo do Conteúdo
                    {showTranscript ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                  </Button>
                  
                  {showTranscript && (
                    <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700">
                      <h4 className="text-lg font-semibold text-white mb-4">Principais tópicos abordados:</h4>
                      <div 
                        className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: podcast.content }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Episódios Relacionados */}
              {relatedEpisodes.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-2xl font-bold mb-6">Episódios Relacionados</h3>
                  
                  <div className="grid gap-6">
                    {relatedEpisodes.map((relatedEpisode) => (
                      <div key={relatedEpisode.id} className="bg-zinc-900/50 rounded-xl border border-zinc-700 overflow-hidden hover:border-ejup-orange/50 transition-all duration-300">
                        <Link
                          to={`/content/podcast/${relatedEpisode.id}`}
                          className="block md:flex h-full"
                        >
                          <div className="md:w-1/3 relative">
                            <img
                              src={relatedEpisode.thumbnailImage}
                              alt={relatedEpisode.title}
                              className="w-full h-48 md:h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute bottom-4 left-4 flex items-center">
                              <div className="bg-ejup-orange/90 rounded-full h-8 w-8 flex items-center justify-center">
                                <Play className="w-4 h-4 text-white ml-0.5" />
                              </div>
                              <span className="text-white text-sm ml-2">{relatedEpisode.duration}</span>
                            </div>
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex gap-2">
                                {relatedEpisode.categories.map((categoryId) => (
                                  <span key={categoryId} className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                                    {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs text-zinc-500">{formatDate(relatedEpisode.date)}</span>
                            </div>
                            <h4 className="text-xl font-semibold mb-3 text-white hover:text-ejup-orange transition-colors">
                              {relatedEpisode.title}
                            </h4>
                            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                              {relatedEpisode.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {relatedEpisode.topics.slice(0, 3).map((topic, index) => (
                                <span
                                  key={index}
                                  className="text-xs px-2 py-1 rounded-full bg-ejup-cyan/20 text-ejup-cyan"
                                >
                                  {topic}
                                </span>
                              ))}
                              {relatedEpisode.topics.length > 3 && (
                                <span className="text-xs px-2 py-1 rounded-full bg-zinc-800/50 text-zinc-400">
                                  +{relatedEpisode.topics.length - 3} mais
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-zinc-400">
                              Com <span className="text-white">{relatedEpisode.guests.join(', ')}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PodcastDetail; 