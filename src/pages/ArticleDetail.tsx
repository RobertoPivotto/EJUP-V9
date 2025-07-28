import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share, 
  BookOpen, 
  Headphones, 
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
  BookMarked,
  Quote
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import RelatedCourses from '@/components/content/RelatedCourses';

// Dados dos artigos (mockados para demonstração)
const articles = [
  {
    id: '1',
    title: 'A importância dos contratos bem elaborados no ambiente empresarial',
    excerpt: 'Entenda como contratos bem redigidos podem prevenir litígios e proteger os interesses da empresa.',
    author: {
      name: 'Eduardo Souza',
      role: 'Advogado Empresarial',
      company: 'Souza & Associados',
      bio: 'Eduardo Souza é advogado especialista em Direito Empresarial com mais de 15 anos de experiência em consultoria para empresas de médio e grande porte. Possui mestrado em Direito Comercial pela USP e é professor convidado em cursos de pós-graduação.',
      image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    },
    date: '10 de maio, 2025',
    readTime: '5 min',
    category: 'Direito Empresarial',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    topics: [
      'Contratos',
      'Segurança Jurídica',
      'Empresarial',
      'Gestão de Riscos'
    ],
    content: `
      <p>A elaboração de contratos sólidos e bem estruturados é um dos pilares fundamentais para a segurança jurídica no ambiente empresarial. Em um cenário econômico cada vez mais complexo e dinâmico, documentos contratuais precisos atuam como salvaguardas essenciais para proteger interesses comerciais e prevenir litígios dispendiosos.</p>
      
      <h2>Por que contratos bem elaborados são essenciais?</h2>
      
      <p>Contratos bem redigidos oferecem clareza nas relações comerciais, estabelecendo de forma inequívoca os direitos e obrigações de cada parte envolvida. Quando elaborados com precisão, eles eliminam ambiguidades que poderiam levar a interpretações divergentes, reduzindo significativamente o risco de disputas futuras.</p>
      
      <p>Além disso, contratos robustos funcionam como importantes ferramentas de gestão de riscos. Ao prever cenários adversos e estabelecer mecanismos de mitigação, como cláusulas de limitação de responsabilidade e procedimentos para resolução de conflitos, as empresas se protegem contra contingências que poderiam comprometer sua estabilidade financeira e operacional.</p>
      
      <h2>Elementos essenciais para um contrato eficaz</h2>
      
      <p>Um contrato empresarial eficaz deve conter, no mínimo, os seguintes elementos:</p>
      
      <ul>
        <li><strong>Qualificação precisa das partes</strong> - Identificação clara de quem são os contratantes, incluindo dados completos e poderes de representação</li>
        <li><strong>Objeto bem definido</strong> - Descrição detalhada do que está sendo contratado, evitando termos genéricos</li>
        <li><strong>Condições comerciais explícitas</strong> - Valores, formas de pagamento, prazos e condições específicas do negócio</li>
        <li><strong>Cláusulas de proteção</strong> - Confidencialidade, exclusividade, propriedade intelectual e não concorrência, quando aplicáveis</li>
        <li><strong>Mecanismos de gestão de riscos</strong> - Garantias, seguros, penalidades e condições para caso de inadimplemento</li>
        <li><strong>Procedimentos para resolução de conflitos</strong> - Previsão de mediação, arbitragem ou foro judicial</li>
      </ul>
      
      <h2>Riscos de contratos mal elaborados</h2>
      
      <p>Contratos com falhas de redação ou estrutura podem expor as empresas a diversos riscos, como:</p>
      
      <ul>
        <li>Interpretações divergentes que levam a litígios</li>
        <li>Dificuldade de execução forçada em caso de inadimplemento</li>
        <li>Invalidade ou ineficácia de cláusulas essenciais</li>
        <li>Exposição desnecessária a passivos não previstos</li>
        <li>Perda de oportunidades de proteção legal disponíveis</li>
      </ul>
      
      <p>Um estudo recente da Câmara de Comércio Internacional apontou que aproximadamente 60% dos litígios empresariais decorrem de falhas contratuais que poderiam ser evitadas com uma redação mais cuidadosa e abrangente.</p>
      
      <h2>A importância da assessoria jurídica especializada</h2>
      
      <p>Diante da complexidade do ambiente de negócios atual, a elaboração de contratos empresariais demanda conhecimento técnico especializado. O investimento em assessoria jurídica qualificada para a redação contratual representa, na verdade, uma economia significativa a médio e longo prazo, quando consideramos os custos potenciais de disputas judiciais e reparação de danos.</p>
      
      <p>Advogados especializados em direito empresarial podem não apenas identificar e mitigar riscos específicos do setor de atuação, mas também estruturar os instrumentos contratuais de forma a maximizar oportunidades e vantagens competitivas dentro dos limites legais.</p>
      
      <h2>Conclusão</h2>
      
      <p>Os contratos são ferramentas estratégicas para qualquer empresa. Quando bem elaborados, vão muito além da formalização de acordos – transformam-se em instrumentos de proteção patrimonial e de viabilização segura de negócios. Investir tempo e recursos na elaboração cuidadosa desses documentos é, sem dúvida, uma das decisões mais acertadas que uma empresa pode tomar para garantir sua sustentabilidade e crescimento a longo prazo.</p>
    `,
    relatedCourses: [
      {
        id: 1,
        title: 'Elaboração de Contratos Empresariais',
        instructor: 'Eduardo Souza',
        instructorRole: 'Advogado Empresarial',
        duration: '48 horas',
        modules: 8,
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        instructorImage: '/lovable-uploads/team/instructor.png',
      },
      {
        id: 2,
        title: 'Direito Digital e Proteção de Dados',
        instructor: 'Marina Lima',
        instructorRole: 'Especialista em Direito Digital',
        duration: '32 horas',
        modules: 6,
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        instructorImage: '/lovable-uploads/team/depoente 1.png',
      }
    ],
    relatedPodcasts: [
      {
        id: 1,
        title: 'Desafios do direito empresarial pós-pandemia',
        duration: '38 min',
        guests: 'Marcelo Torres'
      }
    ]
  },
  
  // Outros artigos podem ser adicionados aqui...
];

// Componente para exibir os parceiros/patrocinadores
const Partners = () => {
  return (
    <div className="py-8 bg-zinc-800/20 rounded-xl border border-zinc-700/30 px-6">
      <h3 className="text-lg font-medium mb-6 text-center">Patrocinadores</h3>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='50' viewBox='0 0 150 50' fill='none'%3E%3Crect width='150' height='50' fill='%230D8ABC'/%3E%3Ctext x='75' y='30' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EPatrocinador 1%3C/text%3E%3C/svg%3E" alt="Logo Parceiro 1" className="h-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='50' viewBox='0 0 150 50' fill='none'%3E%3Crect width='150' height='50' fill='%238A2BE2'/%3E%3Ctext x='75' y='30' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EPatrocinador 2%3C/text%3E%3C/svg%3E" alt="Logo Parceiro 2" className="h-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='50' viewBox='0 0 150 50' fill='none'%3E%3Crect width='150' height='50' fill='%23FF4500'/%3E%3Ctext x='75' y='30' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EPatrocinador 3%3C/text%3E%3C/svg%3E" alt="Logo Parceiro 3" className="h-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='50' viewBox='0 0 150 50' fill='none'%3E%3Crect width='150' height='50' fill='%2332CD32'/%3E%3Ctext x='75' y='30' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EPatrocinador 4%3C/text%3E%3C/svg%3E" alt="Logo Parceiro 4" className="h-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
      </div>
    </div>
  );
};

// Componente para a seção de compartilhamento
const ShareSection = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center my-8 bg-zinc-800/30 rounded-lg p-6 border border-zinc-700/30">
      <h3 className="text-lg font-medium mb-4">Compartilhe este artigo</h3>
      <div className="flex space-x-4">
        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 border-zinc-700 hover:bg-ejup-pink/10 hover:text-ejup-pink hover:border-ejup-pink">
          <Facebook size={16} />
        </Button>
        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 border-zinc-700 hover:bg-ejup-pink/10 hover:text-ejup-pink hover:border-ejup-pink">
          <Twitter size={16} />
        </Button>
        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 border-zinc-700 hover:bg-ejup-pink/10 hover:text-ejup-pink hover:border-ejup-pink">
          <Linkedin size={16} />
        </Button>
        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 border-zinc-700 hover:bg-ejup-pink/10 hover:text-ejup-pink hover:border-ejup-pink">
          <Mail size={16} />
        </Button>
      </div>
      <p className="text-sm text-zinc-400 mt-4">
        Ajude outros profissionais compartilhando este conhecimento
      </p>
    </div>
  );
};

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<typeof articles[0] | null>(null);
  
  useEffect(() => {
    // Em uma aplicação real, isso seria uma chamada de API
    const foundArticle = articles.find(a => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      // Rolamos para o topo ao carregar um novo artigo
      window.scrollTo(0, 0);
    }
  }, [id]);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-ejup-darkBg">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="ejup-container">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-2">Artigo não encontrado</h2>
              <p className="text-zinc-400 mb-8">O artigo que você está procurando não existe ou foi removido.</p>
              <Button asChild>
                <Link to="/content/articles">Ver todos os artigos</Link>
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
          {/* Breadcrumb e título (novo estilo como no podcast) */}
          <div className="ejup-container mb-8">
            <Button
              variant="ghost"
              className="mb-6 text-zinc-400 hover:text-white"
              asChild
            >
              <Link to="/content/articles">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para artigos
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-zinc-800 text-ejup-cyan">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-400">{article.readTime} de leitura</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-400">{article.date}</span>
              </div>
            </div>
          </div>
          
          {/* Layout com duas colunas */}
          <div className="ejup-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
              {/* Coluna Principal (8 colunas) */}
              <div className="lg:col-span-8">
                {/* Tópicos */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-zinc-800/50 text-zinc-400"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                {/* Primeiro parágrafo em destaque - estilo jornal */}
                <div className="mb-8">
                  <div className="border-l-4 border-ejup-pink pl-4 py-2 italic font-serif text-lg text-zinc-300">
                    {article.excerpt}
                  </div>
                </div>
                
                {/* Autor - Card compacto */}
                <div className="bg-zinc-800/30 rounded-xl p-4 mb-8 flex items-center gap-4 border border-zinc-700/30">
                  <img 
                    src={article.author.image} 
                    alt={article.author.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-ejup-cyan/30"
                  />
                  
                  <div>
                    <h3 className="font-medium text-base">{article.author.name}</h3>
                    <p className="text-ejup-cyan text-sm">{article.author.role}</p>
                  </div>
                </div>
                
                {/* Conteúdo do artigo */}
                <div 
                  className="prose prose-invert prose-zinc max-w-none mb-12 
                             prose-headings:font-serif prose-headings:text-zinc-100
                             prose-p:text-zinc-300 prose-p:leading-relaxed
                             prose-strong:text-white prose-strong:font-semibold
                             prose-li:text-zinc-300 prose-li:my-1
                             prose-blockquote:border-ejup-pink prose-blockquote:bg-zinc-800/30 prose-blockquote:p-4 prose-blockquote:rounded-r-md prose-blockquote:not-italic"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                
                {/* Bio do autor mais detalhada no final do artigo */}
                <div className="bg-zinc-800/30 rounded-xl p-6 mb-10 border border-zinc-700/30">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={article.author.image} 
                      alt={article.author.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-ejup-cyan/30"
                    />
                    <div>
                      <h3 className="font-medium text-lg">{article.author.name}</h3>
                      <p className="text-ejup-cyan text-sm">{article.author.role} • {article.author.company}</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm">{article.author.bio}</p>
                </div>
                
                {/* Seção de compartilhamento */}
                <ShareSection title={article.title} />
              </div>
              
              {/* Coluna Lateral (4 colunas) */}
              <div className="lg:col-span-4 space-y-8">
                {/* Área de patrocínio */}
                <Partners />
                
                {/* Citação em destaque */}
                <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 p-6 relative">
                  <div className="flex items-start">
                    <Quote className="h-8 w-8 text-ejup-pink mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-lg font-serif italic text-zinc-200 mb-4">
                        "Contratos bem elaborados são a base para relações empresariais sólidas e seguras."
                      </p>
                      <p className="text-sm text-zinc-400">
                        — Trecho do artigo
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Cursos relacionados - usando o novo componente */}
                {article.relatedCourses && article.relatedCourses.length > 0 && (
                  <RelatedCourses courses={article.relatedCourses} />
                )}
                
                {/* Podcasts relacionados */}
                {article.relatedPodcasts && article.relatedPodcasts.length > 0 && (
                  <div className="bg-zinc-800/20 rounded-xl border border-zinc-700/30 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Headphones className="h-5 w-5 text-ejup-orange" />
                      <h2 className="text-xl font-serif font-semibold">Episódios relacionados</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {article.relatedPodcasts.map((podcast) => (
                        <Link 
                          key={podcast.id} 
                          to={`/content/podcast/${podcast.id}`}
                          className="flex items-center gap-4 bg-zinc-800/50 p-4 rounded-xl hover:bg-zinc-800 transition-colors group"
                        >
                          <div className="bg-ejup-orange rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium line-clamp-1 group-hover:text-ejup-orange transition-colors">{podcast.title}</h3>
                            <p className="text-sm text-zinc-400">Com {podcast.guests} • {podcast.duration}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Outros artigos relacionados/sugestões de leitura */}
                <div className="bg-zinc-800/20 rounded-xl border border-zinc-700/30 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BookMarked className="h-5 w-5 text-ejup-cyan" />
                    <h2 className="text-xl font-serif font-semibold">Leituras recomendadas</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <Link to="/content/blog/2" className="group block py-4">
                      <h3 className="text-base font-medium mb-2 group-hover:text-ejup-cyan transition-colors">LGPD: 5 passos essenciais para escritórios</h3>
                      <p className="text-sm text-zinc-400">5 min de leitura</p>
                    </Link>
                    <Separator className="bg-zinc-700/50" />
                    <Link to="/content/blog/3" className="group block py-4">
                      <h3 className="text-base font-medium mb-2 group-hover:text-ejup-cyan transition-colors">Arbitragem vs. Mediação: quando usar cada método?</h3>
                      <p className="text-sm text-zinc-400">6 min de leitura</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail; 