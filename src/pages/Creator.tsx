import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookText, 
  CheckCircle2, 
  Instagram, 
  FileText, 
  Camera,
  BarChart2, 
  BarChart4, 
  PenTool,
  ChevronRight, 
  Target, 
  Rocket, 
  TrendingUp, 
  Sparkles,
  Globe, 
  Newspaper,
  MessageCircle,
  Users,
  PlayCircle,
  LayoutGrid,
  ArrowRight,
  ChevronLeft,
  VideoIcon,
  ChevronDown,
  ChevronUp,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { handleAnchorClick } from '@/utils/scrollUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Interface para os itens dos planos
interface PlanFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Interface para os planos
interface Plan {
  id: string;
  name: string;
  description: string;
  highlight?: string;
  monthlySemestral: string;
  monthlyAnnual: string;
  features: PlanFeature[];
}

// Interface para serviços
interface Service {
  id: number;
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image: string;
}

const Creator = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});
  const [visibleFeatures, setVisibleFeatures] = useState<Record<string, number>>({
    "ignite": 3,
    "elevate": 3,
    "scale": 3
  });
  const [hoveredFeature, setHoveredFeature] = useState<{planId: string, index: number} | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  // Função para alternar a expansão de um serviço
  const toggleServiceExpansion = (serviceId: number) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceId);
    }
  };
  
  // Função para alternar a expansão de uma feature de plano
  const toggleFeatureExpansion = (planId: string, featureIndex: number) => {
    const key = `${planId}-${featureIndex}`;
    setExpandedFeatures(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const showMoreFeatures = (planId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibleFeatures(prev => ({
      ...prev,
      [planId]: plans.find(p => p.id === planId)?.features.length || prev[planId]
    }));
  };

  const showLessFeatures = (planId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibleFeatures(prev => ({
      ...prev,
      [planId]: 3
    }));
    
    // Rola para a seção de portfolio quando "Ver menos" é clicado
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  // Serviços
  const servicesList: Service[] = [
    {
      id: 1,
      type: "Serviço",
      title: "Marketing Digital",
      description: "Estratégias de presença digital e posicionamento para seu escritório ou marca pessoal no universo jurídico.",
      icon: <Instagram className="h-6 w-6 text-white" />,
      color: "bg-ejup-orange",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      type: "Serviço",
      title: "Conteúdo Jurídico",
      description: "Produção de artigos, posts e materiais especializados com linguagem adequada ao seu público-alvo.",
      icon: <BookText className="h-6 w-6 text-white" />,
      color: "bg-ejup-orange",
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      type: "Serviço",
      title: "Infoprodutos Jurídicos",
      description: "Desenvolvimento e lançamento de cursos, mentorias e e-books para monetizar seu conhecimento.",
      icon: <Rocket className="h-6 w-6 text-white" />,
      color: "bg-ejup-orange",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      type: "Serviço",
      title: "Estratégia Comercial",
      description: "Automação de marketing e estruturação de produtos de recorrência para seu escritório crescer.",
      icon: <BarChart4 className="h-6 w-6 text-white" />,
      color: "bg-ejup-orange",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      type: "Serviço",
      title: "Design Exclusivo",
      description: "Identidade visual, templates e materiais gráficos exclusivos para sua marca no mundo do Direito.",
      icon: <PenTool className="h-6 w-6 text-white" />,
      color: "bg-ejup-orange",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      type: "Serviço",
      title: "Sites e Landing Pages",
      description: "Desenvolvimento de websites e páginas de conversão otimizadas para captação de clientes.",
      icon: <Globe className="h-6 w-6 text-white" />,
      color: "bg-ejup-orange",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 7,
      type: "Serviço",
      title: "Vídeos Institucionais",
      description: "Produção audiovisual profissional para fortalecer a imagem do seu escritório e atrair clientes.",
      icon: <VideoIcon className="h-6 w-6 text-white" />,
      color: "bg-ejup-orange",
      image: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 8,
      type: "Serviço",
      title: "Treinamentos On Demand",
      description: "Conteúdos educativos especializados disponíveis 24/7 para capacitação jurídica contínua.",
      icon: <BookText className="h-6 w-6 text-white" />,
      color: "bg-ejup-orange",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const activeService = servicesList[activeServiceIndex];

  const nextService = () => {
    setActiveServiceIndex((prev) => (prev + 1) % servicesList.length);
  };

  const prevService = () => {
    setActiveServiceIndex((prev) => (prev - 1 + servicesList.length) % servicesList.length);
  };

  // Funções do carrossel
  const nextCarousel = () => {
    setCurrentCarouselIndex((prev) => 
      prev + 4 >= servicesList.length ? 0 : prev + 4
    );
  };

  const prevCarousel = () => {
    setCurrentCarouselIndex((prev) => 
      prev - 4 < 0 ? Math.max(0, servicesList.length - 4) : prev - 4
    );
  };

  // Funções específicas para mobile (navegação de 1 em 1)
  const nextCarouselMobile = () => {
    setCurrentCarouselIndex((prev) => 
      prev + 1 >= servicesList.length ? 0 : prev + 1
    );
  };

  const prevCarouselMobile = () => {
    setCurrentCarouselIndex((prev) => 
      prev - 1 < 0 ? servicesList.length - 1 : prev - 1
    );
  };

  const getCurrentServices = () => {
    return servicesList.slice(currentCarouselIndex, currentCarouselIndex + 4);
  };
  
  const differentials = [
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: "Linguagem Jurídica Especializada",
      description: "Conteúdo produzido por e para profissionais do Direito, com terminologia e abordagem adequadas ao público jurídico."
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Time de Especialistas em Direito",
      description: "Nossa equipe combina profissionais do marketing com advogados e especialistas em comunicação jurídica e educação."
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: "Posicionamento em Canais da EJUP",
      description: "Acesso aos canais já estabelecidos da EJUP, com público jurídico qualificado e engajado."
    },
    {
      icon: <LayoutGrid className="h-6 w-6 text-white" />,
      title: "Integração com Plataforma Educacional",
      description: "Capacidade única de integrar seu posicionamento com a comercialização de produtos educacionais na mesma plataforma."
    },
    {
      icon: <PlayCircle className="h-6 w-6 text-white" />,
      title: "Produção Audiovisual de Alto Padrão",
      description: "Material visual e audiovisual criado com padrões profissionais e otimizado para as diferentes plataformas digitais."
    },
    {
      icon: <Newspaper className="h-6 w-6 text-white" />,
      title: "Publicação de Conteúdos como Creator",
      description: "Única plataforma que permite ao advogado posicionar-se também como autor de artigos e cursos na área jurídica."
    },
    {
      icon: <Target className="h-6 w-6 text-white" />,
      title: "Rede de Networking Jurídico",
      description: "Acesso exclusivo a uma rede de contatos qualificados no meio jurídico, impulsionando oportunidades de parcerias e negócios."
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-white" />,
      title: "Análise de Dados Jurídicos",
      description: "Métricas e insights específicos para o setor jurídico, permitindo decisões estratégicas baseadas em dados reais de performance."
    }
  ];
  
  const igniteFeatures: PlanFeature[] = [
    { icon: <Instagram />, title: "Diagnóstico de Marketing no Instagram", description: "Análise estratégica do perfil, linguagem, diferenciais, persona e engajamento com foco em posicionamento e geração de autoridade." },
    { icon: <PenTool />, title: "Criação de Identidade Digital", description: "Capas, destaques, papelaria digital, templates e assinatura — tudo alinhado à reputação e proposta de valor do escritório." },
    { icon: <Calendar />, title: "Cronograma de Postagens Personalizado", description: "Calendário mensal com temas, formatos e sugestões estratégicas (feed, stories e reels), voltado para atrair e engajar seu público jurídico (não inclui artes e legendas)." },
    { icon: <Camera />, title: "Produção de Conteúdo Mobile (1x por mês)", description: "Captura de fotos e vídeos leves com celular durante uma visita mensal (reels, bastidores, depoimentos, etc.)." },
    { icon: <MessageCircle />, title: "Reunião Estratégica Inicial (online)", description: "Briefing com especialista EJUP para definição da persona, tom de voz, diferenciais e estratégia de conteúdo." },
    { icon: <BookText />, title: "Artigo Mensal na Coluna da EJUP (com SEO)", description: "Publicação de 1 artigo assinado por você ou seu escritório, com otimização para motores de busca, fortalecendo reputação e presença online." },
    { icon: <Users />, title: "CRM com Desconto Exclusivo", description: "Orientação na implementação de CRM comercial com desconto especial. Obs: contratação da ferramenta não está inclusa." },
    { icon: <Globe />, title: "Desconto em ERP Jurídico Parceiro", description: "Condições especiais em sistema de gestão de escritórios referência no mercado. Obs: contratação da ferramenta não está inclusa." },
    { icon: <BarChart4 />, title: "Relatórios Mensais de Performance", description: "Acompanhamento dos principais indicadores das campanhas e conteúdo, com orientações para ajustes e melhoria contínua." },
  ];
  
  const elevateFeatures: PlanFeature[] = [
    { icon: <Instagram />, title: "Diagnóstico de Marketing no Instagram", description: "Análise estratégica do perfil, linguagem, diferenciais, persona e engajamento com foco em posicionamento e geração de autoridade." },
    { icon: <PenTool />, title: "Criação de Identidade Digital", description: "Capas, destaques, papelaria digital, templates e assinatura — tudo alinhado à reputação e proposta de valor do escritório." },
    { icon: <Calendar />, title: "Cronograma de Postagens Personalizado", description: "Calendário mensal com temas, formatos e sugestões estratégicas (feed, stories e reels), voltado para atrair e engajar seu público jurídico (não inclui artes e legendas)." },
    { icon: <VideoIcon />, title: "Produção de 8 Vídeos Profissionais por Mês (1 gravação mensal)", description: "Sessão mensal com fotógrafo e videomaker profissional para gerar conteúdos de alta qualidade para feed, stories e reels." },
    { icon: <MessageCircle />, title: "Reunião Estratégica Inicial (online)", description: "Briefing com especialista EJUP para definição da persona, tom de voz, diferenciais e estratégia de conteúdo." },
    { icon: <BookText />, title: "Artigo Mensal na Coluna da EJUP (com SEO)", description: "Publicação de 1 artigo assinado por você ou seu escritório, com otimização para motores de busca, fortalecendo reputação e presença online." },
    { icon: <BarChart2 />, title: "Gestão de Tráfego Pago (Meta Ads)", description: "Criação e gerenciamento de campanhas personalizadas no Facebook e Instagram para atrair leads." },
    { icon: <Users />, title: "CRM com Desconto Exclusivo", description: "Orientação na implementação de CRM comercial com desconto especial. Obs: contratação da ferramenta não está inclusa." },
    { icon: <Globe />, title: "Desconto em ERP Jurídico Parceiro", description: "Condições especiais em sistema de gestão de escritórios referência no mercado. Obs: contratação da ferramenta não está inclusa." },
    { icon: <BarChart4 />, title: "Relatórios Mensais de Performance", description: "Acompanhamento dos principais indicadores das campanhas e conteúdo, com orientações para ajustes e melhoria contínua." },
    { icon: <PenTool />, title: "Criação de Artes e Legendas estáticas (8 conteúdos mensais)", description: "Pacote mensal com 8 artes estáticas (carrossel, post informativo, institucional), seguindo o tom de voz." },
    { icon: <Globe />, title: "Página de Apresentação Profissional (Landing Page)", description: "Criação de uma página digital para apresentação dos serviços ou especialidades do escritório (mini-biografia, áreas de atuação, agendamento, portfólio de conteúdos)." },
  ];
  
  const scaleFeatures: PlanFeature[] = [
    { icon: <Instagram />, title: "Diagnóstico de Marketing no Instagram", description: "Análise estratégica do perfil, linguagem, diferenciais, persona e engajamento com foco em posicionamento e geração de autoridade." },
    { icon: <PenTool />, title: "Criação de Identidade Digital", description: "Capas, destaques, papelaria digital, templates e assinatura — tudo alinhado à reputação e proposta de valor do escritório." },
    { icon: <Calendar />, title: "Cronograma de Postagens Personalizado", description: "Calendário mensal com temas, formatos e sugestões estratégicas (feed, stories e reels), voltado para atrair e engajar seu público jurídico (não inclui artes e legendas)." },
    { icon: <VideoIcon />, title: "Produção de 8 Vídeos Profissionais por Mês (1 gravação mensal)", description: "Sessão mensal com fotógrafo e videomaker profissional para gerar conteúdos de alta qualidade para feed, stories e reels." },
    { icon: <MessageCircle />, title: "Reunião Estratégica Inicial (online)", description: "Briefing com especialista EJUP para definição da persona, tom de voz, diferenciais e estratégia de conteúdo." },
    { icon: <BookText />, title: "Artigo Mensal na Coluna da EJUP (com SEO)", description: "Publicação de 1 artigo assinado por você ou seu escritório, com otimização para motores de busca, fortalecendo reputação e presença online." },
    { icon: <BarChart2 />, title: "Gestão de Tráfego Pago (Meta Ads)", description: "Criação e gerenciamento de campanhas personalizadas no Facebook e Instagram para atrair leads." },
    { icon: <Users />, title: "CRM com Desconto Exclusivo", description: "Orientação na implementação de CRM comercial com desconto especial. Obs: contratação da ferramenta não está inclusa." },
    { icon: <Globe />, title: "Desconto em ERP Jurídico Parceiro", description: "Condições especiais em sistema de gestão de escritórios referência no mercado. Obs: contratação da ferramenta não está inclusa." },
    { icon: <BarChart4 />, title: "Relatórios Mensais de Performance", description: "Acompanhamento dos principais indicadores das campanhas e conteúdo, com orientações para ajustes e melhoria contínua." },
    { icon: <PenTool />, title: "Criação de Artes e Legendas estáticas (12 conteúdos mensais)", description: "Pacote mensal com 12 artes estáticas (carrossel, post informativo, institucional), seguindo o tom de voz." },
    { icon: <CheckCircle2 />, title: "Estruturação de 1 Produto Digital", description: "Produto validado junto ao escritório (curso, consultoria, workshop, e-book ou infoproduto híbrido) com curadoria, planejamento, roteirização e apoio na precificação. Produção em parceria com a EJUP (valor do tráfego não incluso)." },
    { icon: <Camera />, title: "Gravação Profissional do Produto", description: "2 diárias com equipe técnica (diretor, cinegrafista, áudio e iluminação), equipamentos profissionais, captação no estúdio da EJUP e edição de até 6h de conteúdo com vinheta, trilha e identidade visual." },
    { icon: <Globe />, title: "Landing Page de Venda do Infoproduto", description: "Página com copy estratégica e integração com plataforma da EJUP." },
    { icon: <Rocket />, title: "Campanha de Lançamento + Tráfego Pago (Meta e Google - valores não inclusos)", description: "Planejamento e execução de campanha de captação (pré-lançamento e lançamento), criação de artes, vídeos e textos para anúncios, gerenciamento de tráfego com foco em leads e conversão em vendas." },
    { icon: <TrendingUp />, title: "Mentoria de Escala (mensal)", description: "Sessões com time da EJUP para análise de métricas, otimização da estratégia comercial, validação de novos produtos e roadmap de crescimento." },
    { icon: <Target />, title: "Definição e Estruturação de 1 Produto de Sustentação Nichado", description: "Estruturação de produto de sustentação, landing page com teste A/B, treinamento da equipe comercial, script de vendas com gatilhos mentais e storytelling, e tráfego no Google e Meta ADS." },
    { icon: <Sparkles />, title: "Posicionamento Estratégico no Ecossistema EJUP", description: "Publicação de 4 conteúdos na Coluna da EJUP como especialista, entrevista em vídeo no EJUPCast ou redes sociais, página de Apoiadores no site, e destaque em campanhas institucionais." },
  ];
  
  const plans: Plan[] = [
    {
      id: "ignite",
      name: "EJUP Ignite",
      description: "Ideal para advogados e escritórios que desejam iniciar ou fortalecer seu posicionamento digital com marketing jurídico estratégico",
      monthlySemestral: "6x de R$ 3.990",
      monthlyAnnual: "12x de R$ 3.490",
      features: igniteFeatures
    },
    {
      id: "elevate",
      name: "EJUP Elevate",
      description: "Inclui tudo do EJUP Ignite, mais recursos avançados para quem deseja elevar sua autoridade e alcance no mundo jurídico",
      highlight: "Mais Popular",
      monthlySemestral: "6x de R$ 5.700",
      monthlyAnnual: "12x de R$ 4.750",
      features: elevateFeatures
    },
    {
      id: "scale",
      name: "EJUP Scale",
      description: "Solução completa incluindo EJUP Ignite e EJUP Elevate, mais estruturação e lançamento de produtos digitais escaláveis com participação da EJUP.",
      monthlySemestral: "6x de R$ 7.900",
      monthlyAnnual: "12x de R$ 6.590",
      features: scaleFeatures
    }
  ];

  // Componente para interação com as tags
  const handleTagClick = (message: string) => {
    window.alert(message);
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-10 md:pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center py-4 md:py-12 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-ejup-darkBg">
            <div className="absolute top-0 left-0 right-0 h-[70%] bg-gradient-to-br from-ejup-orange/20 via-ejup-cyan/10 to-ejup-orange/10 opacity-60 blur-3xl"></div>
          </div>
          
          {/* Content */}
          <div className="ejup-container relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-20">
              {/* Left Column - Text Content */}
              <div className="md:w-1/2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                  Posicione sua<br />
                  Autoridade com a<br />
                  <span className="text-ejup-orange border-b-2 border-ejup-orange">EJUP Creator</span>.
                </h1>
                
                <p className="text-lg text-zinc-300 mb-10 max-w-xl leading-relaxed">
                  Agência e produtora especializada em marketing jurídico para advogados, escritórios e profissionais do Direito que querem se destacar digitalmente.
                </p>
                
                <div className="relative group mb-10">
                  {/* Efeito de brilho de fundo */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-ejup-orange/30 via-ejup-cyan/30 to-ejup-orange/30 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Container principal */}
                  <div className="relative bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 backdrop-blur-sm border border-zinc-600/50 rounded-lg p-2 shadow-2xl flex justify-center">
                    <p className="bg-gradient-to-r from-white via-zinc-100 to-white bg-clip-text text-transparent font-semibold text-center text-sm">Única plataforma com soluções 360º para o seu posicionamento</p>
                  </div>
                </div>
                
                <div className="flex gap-3 mb-12">
                  <Button 
                    className="bg-orange-900/40 hover:bg-orange-800/50 backdrop-blur-md border border-orange-800/30 text-orange-100 hover:text-white group text-sm px-3 md:px-4 py-3 flex-1 transition-all duration-300"
                    onClick={() => handleAnchorClick('#portfolio')}
                  >
                    <span>Ver Nossos Resultados</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="ejup-button-secondary text-sm px-3 md:px-4 py-3 flex-1" asChild>
                    <a href="mailto:contato@ejup.com.br?subject=Interesse em EJUP Creator">
                      Atendemos em todo o Brasil
                    </a>
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
                    mais de <span className="text-white font-semibold">30</span> escritórios de advocacia atendidos
                  </div>
                </div>
              </div>
              
              {/* Right Column - Featured Content - Hidden on mobile */}
              <div className="hidden md:block md:w-1/2 flex-grow max-w-xl relative animate-slide-up" style={{ animationDelay: '0.4s' }}>
                {/* Content Label */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-zinc-800 border border-white/20 px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-zinc-300">
                      {activeService.type} em destaque
                    </span>
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="absolute top-1/2 z-20 -translate-y-1/2 -left-12">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 hover:bg-zinc-800/50 transition-colors" 
                    onClick={prevService}
                  >
                    <ChevronLeft className="h-6 w-6 text-white hover:text-ejup-orange transition-colors" />
                  </Button>
                </div>
                
                <div className="absolute top-1/2 z-20 -translate-y-1/2 -right-12">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 hover:bg-zinc-800/50 transition-colors" 
                    onClick={nextService}
                  >
                    <ChevronRight className="h-6 w-6 text-white hover:text-ejup-orange transition-colors" />
                  </Button>
                </div>
                
                {/* Content Card */}
                <div className="relative w-full group h-[26rem]">
                  {/* Efeito de brilho - visível apenas no hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange via-ejup-cyan to-ejup-orange rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  <div className="relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 h-full">
                    <div className="bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={activeService.image}
                          alt={activeService.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
                        <div className={`absolute bottom-2.5 left-2.5 ${activeService.color} rounded-lg p-1.5`}>
                          {activeService.icon}
                        </div>
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-2.5">{activeService.title}</h3>
                        
                        <p className="text-zinc-300 leading-relaxed text-sm">
                          {activeService.description}
                        </p>
                        
                        <div className="mt-5">
                          <Button 
                            className="w-full flex items-center justify-center py-3 group bg-zinc-800 hover:bg-zinc-700 text-white text-sm" 
                            variant="secondary"
                            onClick={() => handleAnchorClick('#servicos')}
                          >
                            <span>Saiba mais</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Indicadores de página */}
                <div className="flex justify-center mt-3">
                  <div className="flex gap-1.5">
                    {servicesList.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveServiceIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === activeServiceIndex ? "w-6 bg-ejup-orange" : "w-1.5 bg-zinc-600"
                        }`}
                        aria-label={`Ver slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="servicos" className="py-8 bg-ejup-darkBg">
          <div className="ejup-container">
            <h2 className="text-4xl font-bold text-center mb-3">Nossos Serviços</h2>
            <p className="text-base text-zinc-400 text-center max-w-2xl mx-auto mb-8">
              Soluções completas em marketing e posicionamento jurídico
            </p>
            
            {/* Layout para mobile com carrossel */}
            <div className="md:hidden relative px-12">
              {/* Setas de navegação laterais */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={prevCarouselMobile}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 hover:bg-zinc-800/50 transition-colors bg-zinc-900/80 border border-zinc-700"
              >
                <ChevronLeft className="h-5 w-5 text-white hover:text-ejup-orange transition-colors" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={nextCarouselMobile}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 hover:bg-zinc-800/50 transition-colors bg-zinc-900/80 border border-zinc-700"
              >
                <ChevronRight className="h-5 w-5 text-white hover:text-ejup-orange transition-colors" />
              </Button>

              {/* Carrossel - um por vez no mobile */}
              <div className="relative w-full group">
                {(() => {
                  const service = servicesList[currentCarouselIndex];
                  return (
                    <div key={service.id} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange/20 via-ejup-cyan/20 to-ejup-orange/20 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                      
                      <div className={`relative bg-ejup-darkCard rounded-xl border border-zinc-700/50 overflow-hidden flex flex-col transition-all duration-500 ease-in-out ${
                        expandedService === service.id ? 'h-[280px]' : 'h-[160px]'
                      }`}>
                        <div className="flex items-start gap-3 p-4 pb-2">
                          <div className={`${service.color} rounded-lg p-2 flex-shrink-0`}>
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{service.description}</p>
                          </div>
                        </div>
                        
                        {/* Área de conteúdo expandido dentro do card */}
                        <div className={`px-4 transition-all duration-500 ease-in-out ${
                          expandedService === service.id 
                            ? 'flex-1 opacity-100 transform translate-y-0 pb-2' 
                            : 'h-0 opacity-0 transform -translate-y-4 overflow-hidden'
                        }`}>
                          <div className="bg-zinc-800/30 rounded-lg p-3 border border-zinc-700/30">
                            {service.id === 1 && (
                              <p className="text-zinc-300 text-sm leading-relaxed">
                                <span className="font-semibold text-ejup-cyan">Estratégias completas</span> de presença digital incluindo análise de concorrência, criação de personas jurídicas, planejamento de conteúdo, gestão de redes sociais, SEO especializado em Direito, e campanhas de tráfego pago otimizadas para captação de clientes no setor jurídico.
                              </p>
                            )}
                            
                            {service.id === 2 && (
                              <p className="text-zinc-300 text-sm leading-relaxed">
                                <span className="font-semibold text-ejup-orange">Produção especializada</span> de artigos técnicos, posts educativos, e-books jurídicos, newsletters, cases de sucesso, comunicados oficiais e materiais de apoio, sempre com linguagem técnica adequada e revisão por profissionais especializados em comunicação jurídica.
                              </p>
                            )}
                            
                            {service.id === 3 && (
                              <p className="text-zinc-300 text-sm leading-relaxed">
                                <span className="font-semibold text-ejup-orange">Desenvolvimento completo</span> de produtos educacionais incluindo curadoria de conteúdo, roteirização, produção audiovisual, criação de materiais complementares, plataforma de hospedagem, sistema de certificação e estratégias de monetização para advogados especialistas.
                              </p>
                            )}
                            
                            {service.id === 4 && (
                              <p className="text-zinc-300 text-sm leading-relaxed">
                                <span className="font-semibold text-emerald-400">Estruturação avançada</span> de funis de vendas, automação de marketing, implementação de sistemas de CRM e desenvolvimento de produtos de recorrência para crescimento sustentável do seu escritório.
                              </p>
                            )}
                            
                            {service.id === 5 && (
                              <p className="text-zinc-300 text-sm leading-relaxed">
                                <span className="font-semibold text-purple-400">Criação completa</span> de identidade visual para escritórios e profissionais do Direito, incluindo marca, papelaria, materiais impressos e digitais, templates para redes sociais e apresentações, com linguagem visual alinhada ao posicionamento jurídico pretendido.
                              </p>
                            )}
                            
                            {service.id === 6 && (
                              <p className="text-zinc-300 text-sm leading-relaxed">
                                <span className="font-semibold text-blue-400">Desenvolvimento profissional</span> de websites e páginas de conversão otimizadas para advogados e escritórios, com foco em usabilidade, SEO jurídico, captação de leads e conversão de visitantes em potenciais clientes.
                              </p>
                            )}
                            
                            {service.id === 7 && (
                              <p className="text-zinc-300 text-sm leading-relaxed">
                                <span className="font-semibold text-red-400">Produção audiovisual</span> completa para promover sua marca jurídica, incluindo roteirização, gravação em estúdio ou locação, edição profissional, legendagem e otimização para diferentes plataformas digitais.
                              </p>
                            )}
                            
                            {service.id === 8 && (
                              <p className="text-zinc-300 text-sm leading-relaxed">
                                <span className="font-semibold text-amber-400">Conteúdos educativos</span> especializados disponíveis 24/7 para capacitação jurídica contínua, incluindo cursos, workshops e materiais de estudo atualizados constantemente com as mudanças na legislação.
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Botão Ver mais detalhes */}
                        <div className="p-4 pt-2 mt-auto">
                          <button
                            onClick={() => toggleServiceExpansion(service.id)}
                            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-zinc-700/50 hover:bg-zinc-600/50 transition-colors duration-300"
                          >
                            <span className="text-sm font-medium text-zinc-300">
                              {expandedService === service.id ? 'Ver menos' : 'Ver mais detalhes'}
                            </span>
                            <div className={`transition-transform duration-300 ${
                              expandedService === service.id ? 'rotate-180' : 'rotate-0'
                            }`}>
                              <ChevronDown className="h-4 w-4 text-ejup-cyan" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              
              {/* Indicadores para mobile */}
              <div className="flex justify-center gap-2 mt-6">
                {servicesList.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCarouselIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentCarouselIndex === index 
                        ? 'w-8 bg-ejup-cyan' 
                        : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Layout para desktop (original) */}
            <div className="hidden md:block relative max-w-6xl mx-auto">
              {/* Setas de navegação do carrossel desktop */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={prevCarousel}
                disabled={currentCarouselIndex === 0}
                className="absolute left-[-70px] top-1/2 -translate-y-1/2 z-20 h-10 w-10 hover:bg-zinc-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-6 w-6 text-white hover:text-ejup-orange transition-colors" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={nextCarousel}
                disabled={currentCarouselIndex + 4 >= servicesList.length}
                className="absolute right-[-70px] top-1/2 -translate-y-1/2 z-20 h-10 w-10 hover:bg-zinc-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-6 w-6 text-white hover:text-ejup-orange transition-colors" />
              </Button>

              <div className="grid grid-cols-2 gap-4">
                {getCurrentServices().map((service) => (
                  <div key={service.id} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange/20 via-ejup-cyan/20 to-ejup-orange/20 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                    
                    <div className={`relative bg-ejup-darkCard rounded-xl border border-zinc-700/50 overflow-hidden flex flex-col transition-all duration-500 ease-in-out ${
                      expandedService === service.id ? 'h-[320px]' : 'h-[200px]'
                    }`}>
                      <div className="flex items-start gap-3 p-4 pb-2">
                        <div className={`${service.color} rounded-lg p-2 flex-shrink-0`}>
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                          <p className="text-zinc-400 text-sm leading-relaxed">{service.description}</p>
                        </div>
                      </div>
                      
                      {/* Área de conteúdo expandido dentro do card */}
                      <div className={`px-4 transition-all duration-500 ease-in-out ${
                        expandedService === service.id 
                          ? 'flex-1 opacity-100 transform translate-y-0 pb-2' 
                          : 'h-0 opacity-0 transform -translate-y-4 overflow-hidden'
                      }`}>
                        <div className="bg-zinc-800/30 rounded-lg p-3 border border-zinc-700/30">
                          {service.id === 1 && (
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              <span className="font-semibold text-ejup-cyan">Estratégias completas</span> de presença digital incluindo análise de concorrência, criação de personas jurídicas, planejamento de conteúdo, gestão de redes sociais, SEO especializado em Direito, e campanhas de tráfego pago otimizadas para captação de clientes no setor jurídico.
                            </p>
                          )}
                          
                          {service.id === 2 && (
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              <span className="font-semibold text-ejup-orange">Produção especializada</span> de artigos técnicos, posts educativos, e-books jurídicos, newsletters, cases de sucesso, comunicados oficiais e materiais de apoio, sempre com linguagem técnica adequada e revisão por profissionais especializados em comunicação jurídica.
                            </p>
                          )}
                          
                          {service.id === 3 && (
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              <span className="font-semibold text-ejup-orange">Desenvolvimento completo</span> de produtos educacionais incluindo curadoria de conteúdo, roteirização, produção audiovisual, criação de materiais complementares, plataforma de hospedagem, sistema de certificação e estratégias de monetização para advogados especialistas.
                            </p>
                          )}
                          
                          {service.id === 4 && (
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              <span className="font-semibold text-emerald-400">Estruturação avançada</span> de funis de vendas, automação de marketing, implementação de sistemas de CRM e desenvolvimento de produtos de recorrência para crescimento sustentável do seu escritório.
                            </p>
                          )}
                          
                          {service.id === 5 && (
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              <span className="font-semibold text-purple-400">Criação completa</span> de identidade visual para escritórios e profissionais do Direito, incluindo marca, papelaria, materiais impressos e digitais, templates para redes sociais e apresentações, com linguagem visual alinhada ao posicionamento jurídico pretendido.
                            </p>
                          )}
                          
                          {service.id === 6 && (
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              <span className="font-semibold text-blue-400">Desenvolvimento profissional</span> de websites e páginas de conversão otimizadas para advogados e escritórios, com foco em usabilidade, SEO jurídico, captação de leads e conversão de visitantes em potenciais clientes.
                            </p>
                          )}
                          
                          {service.id === 7 && (
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              <span className="font-semibold text-red-400">Produção audiovisual</span> completa para promover sua marca jurídica, incluindo roteirização, gravação em estúdio ou locação, edição profissional, legendagem e otimização para diferentes plataformas digitais.
                            </p>
                          )}
                          
                          {service.id === 8 && (
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              <span className="font-semibold text-amber-400">Conteúdos educativos</span> especializados disponíveis 24/7 para capacitação jurídica contínua, incluindo cursos, workshops e materiais de estudo atualizados constantemente com as mudanças na legislação.
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Botão Ver mais detalhes */}
                      <div className="p-4 pt-2 mt-auto">
                        <button
                          onClick={() => toggleServiceExpansion(service.id)}
                          className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-zinc-700/50 hover:bg-zinc-600/50 transition-colors duration-300"
                        >
                          <span className="text-sm font-medium text-zinc-300">
                            {expandedService === service.id ? 'Ver menos' : 'Ver mais detalhes'}
                          </span>
                          <div className={`transition-transform duration-300 ${
                            expandedService === service.id ? 'rotate-180' : 'rotate-0'
                          }`}>
                            <ChevronDown className="h-4 w-4 text-ejup-cyan" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Indicadores centrais para desktop */}
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: Math.ceil(servicesList.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCarouselIndex(index * 4)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentCarouselIndex / 4) === index 
                        ? 'w-8 bg-ejup-cyan' 
                        : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Portfolio & Results Section */}
        <section id="portfolio" className="py-16 bg-ejup-darkBg">
          <div className="ejup-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Resultados Falam por Si</h2>
              <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                Veja alguns dos nossos trabalhos através de cases reais, produtos entregues e depoimentos de clientes satisfeitos.
              </p>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Brand Identity Card */}
              <Card className="group bg-ejup-darkCard border-zinc-700/50 hover:border-ejup-orange/50 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="w-full h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 flex flex-col justify-center items-center group-hover:scale-105 transition-transform duration-300">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="w-6 h-6 bg-ejup-orange rounded"></div>
                      <div className="w-6 h-6 bg-ejup-cyan rounded"></div>
                      <div className="w-6 h-6 bg-ejup-orange rounded"></div>
                    </div>
                    <div className="text-white font-bold text-lg">LOGO</div>
                    <div className="text-zinc-400 text-xs mt-1">Escritório & Advocacia</div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-ejup-orange text-white text-xs">Branding</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2">Identidade Visual</h3>
                  <p className="text-zinc-400 text-xs mb-3 leading-relaxed">
                    Criação completa de marca e identidade para escritórios jurídicos
                  </p>
                  <Button className="w-full bg-ejup-orange hover:bg-ejup-orange/90 text-sm h-9" asChild>
                    <a href="#" onClick={() => alert('Em breve!')}>
                      <LayoutGrid className="w-3 h-3 mr-2" />
                      Ver Projeto
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Video Content Card */}
              <Card className="group bg-ejup-darkCard border-zinc-700/50 hover:border-ejup-orange/50 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="w-full h-40 bg-gradient-to-br from-zinc-900 to-black p-4 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-ejup-orange rounded-full flex items-center justify-center">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-white text-xs font-semibold">EJUP Creator</div>
                          <div className="text-zinc-400 text-xs">Direito Digital</div>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-white text-xs">05:42</div>
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-ejup-cyan rounded"></div>
                        <div className="w-1 h-2 bg-ejup-cyan rounded"></div>
                        <div className="w-1 h-4 bg-ejup-cyan rounded"></div>
                        <div className="w-1 h-2 bg-ejup-cyan rounded"></div>
                        <div className="w-1 h-3 bg-ejup-cyan rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-ejup-orange text-white text-xs">Vídeo</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2">Produção Audiovisual</h3>
                  <p className="text-zinc-400 text-xs mb-3 leading-relaxed">
                    Conteúdo em vídeo profissional para redes sociais e cursos
                  </p>
                  <Button className="w-full bg-ejup-orange hover:bg-ejup-orange/90 text-sm h-9" asChild>
                    <a href="#" onClick={() => alert('Em breve!')}>
                      <VideoIcon className="w-3 h-3 mr-2" />
                      Ver Demo
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Course Development Card */}
              <Card className="group bg-ejup-darkCard border-zinc-700/50 hover:border-ejup-orange/50 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="w-full h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BookText className="w-4 h-4 text-ejup-orange" />
                        <div className="text-white text-xs font-semibold">Direito Empresarial</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-ejup-cyan rounded-full"></div>
                          <div className="text-zinc-300 text-xs">Módulo 1: Fundamentos</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-ejup-cyan rounded-full"></div>
                          <div className="text-zinc-300 text-xs">Módulo 2: Contratos</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-zinc-600 rounded-full"></div>
                          <div className="text-zinc-500 text-xs">Módulo 3: Tributário</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-ejup-orange text-xs font-semibold">75% concluído</div>
                      <div className="w-12 h-1 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="w-9 h-full bg-ejup-orange rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-ejup-orange text-white text-xs">Educação</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2">Cursos Jurídicos</h3>
                  <p className="text-zinc-400 text-xs mb-3 leading-relaxed">
                    Desenvolvimento de conteúdo educacional especializado
                  </p>
                  <Button className="w-full bg-ejup-orange hover:bg-ejup-orange/90 text-sm h-9" asChild>
                    <a href="#" onClick={() => alert('Em breve!')}>
                      <BookText className="w-3 h-3 mr-2" />
                      Ver Curso
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Digital Marketing Card */}
              <Card className="group bg-ejup-darkCard border-zinc-700/50 hover:border-ejup-orange/50 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="w-full h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-white text-xs font-semibold">Alcance Orgânico</div>
                        <div className="text-ejup-cyan text-xs">+24%</div>
                      </div>
                      <div className="flex items-end gap-1 h-16">
                        <div className="w-2 bg-ejup-orange h-6 rounded-t"></div>
                        <div className="w-2 bg-ejup-cyan h-10 rounded-t"></div>
                        <div className="w-2 bg-ejup-orange h-8 rounded-t"></div>
                        <div className="w-2 bg-ejup-orange h-12 rounded-t"></div>
                        <div className="w-2 bg-ejup-cyan h-16 rounded-t"></div>
                        <div className="w-2 bg-ejup-orange h-10 rounded-t"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-ejup-cyan" />
                        <div className="text-zinc-300 text-xs">2.1K engajamentos</div>
                      </div>
                      <div className="text-ejup-orange text-xs">Este mês</div>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-ejup-orange text-white text-xs">Marketing</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2">Marketing Digital</h3>
                  <p className="text-zinc-400 text-xs mb-3 leading-relaxed">
                    Estratégias e campanhas para posicionamento digital
                  </p>
                  <Button className="w-full bg-ejup-orange hover:bg-ejup-orange/90 text-sm h-9" asChild>
                    <a href="#" onClick={() => alert('Em breve!')}>
                      <TrendingUp className="w-3 h-3 mr-2" />
                      Ver Estratégia
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-ejup-darkCard rounded-lg border border-zinc-700/50">
                <div className="text-3xl font-bold text-ejup-orange mb-2">30+</div>
                <div className="text-zinc-400 text-sm">Escritórios Atendidos</div>
              </div>
              <div className="text-center p-6 bg-ejup-darkCard rounded-lg border border-zinc-700/50">
                <div className="text-3xl font-bold text-ejup-orange mb-2">500+</div>
                <div className="text-zinc-400 text-sm">Materiais Criados</div>
              </div>
              <div className="text-center p-6 bg-ejup-darkCard rounded-lg border border-zinc-700/50">
                <div className="text-3xl font-bold text-ejup-orange mb-2">20+</div>
                <div className="text-zinc-400 text-sm">Eventos Realizados</div>
              </div>
              <div className="text-center p-6 bg-ejup-darkCard rounded-lg border border-zinc-700/50">
                <div className="text-3xl font-bold text-ejup-orange mb-2">98%</div>
                <div className="text-zinc-400 text-sm">Satisfação dos Clientes</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-ejup-darkCard rounded-xl p-8 text-center border border-zinc-700/50">
              <h3 className="text-2xl font-bold mb-4">Pronto para Elevar Sua Autoridade Digital?</h3>
              <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
                Entre em contato conosco e descubra como podemos transformar sua presença digital 
                e posicionar você como referência no mercado jurídico.
              </p>
              <div className="flex justify-center">
                <Button className="bg-ejup-orange hover:bg-ejup-orange/90 text-white px-8 py-3" asChild>
                  <a href="mailto:contato@ejup.com.br?subject=Interesse em EJUP Creator">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Falar com Consultor
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-8 bg-zinc-900/50 mt-8">
          <div className="ejup-container">
            <h2 className="text-2xl font-bold text-center mb-3">Por que escolher a EJUP Creator?</h2>
            <p className="text-base text-zinc-400 text-center max-w-3xl mx-auto mb-8">
              Diferenciais exclusivos para o posicionamento de profissionais e escritórios jurídicos
            </p>
            <div className="max-w-6xl mx-auto px-4">
              <div className="mb-4">
                <div className="flex flex-wrap -mx-3">
                  {/* Box 1 */}
                  <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange to-ejup-cyan rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative h-full rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
                        <div className="bg-ejup-darkCard h-full rounded-xl border border-zinc-700/50 overflow-hidden p-4 min-h-[140px]">
                          <div className="flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-ejup-orange rounded-lg p-2 flex-shrink-0">
                                <FileText className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-base font-semibold leading-tight">Linguagem Jurídica Especializada</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              Conteúdo produzido por e para profissionais do Direito, com terminologia e abordagem adequadas ao público jurídico.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Box 2 */}
                  <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange to-ejup-cyan rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative h-full rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
                        <div className="bg-ejup-darkCard h-full rounded-xl border border-zinc-700/50 overflow-hidden p-4 min-h-[140px]">
                          <div className="flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-ejup-orange rounded-lg p-2 flex-shrink-0">
                                <Users className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-base font-semibold leading-tight">Time de Especialistas em Direito</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              Nossa equipe combina profissionais do marketing com advogados e especialistas em comunicação jurídica e educação.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Box 3 */}
                  <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange to-ejup-cyan rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative h-full rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
                        <div className="bg-ejup-darkCard h-full rounded-xl border border-zinc-700/50 overflow-hidden p-4 min-h-[140px]">
                          <div className="flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-ejup-orange rounded-lg p-2 flex-shrink-0">
                                <Globe className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-base font-semibold leading-tight">Posicionamento em Canais da EJUP</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              Acesso aos canais já estabelecidos da EJUP, com público jurídico qualificado e engajado.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Box 4 */}
                  <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange to-ejup-cyan rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative h-full rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
                        <div className="bg-ejup-darkCard h-full rounded-xl border border-zinc-700/50 overflow-hidden p-4 min-h-[140px]">
                          <div className="flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-ejup-orange rounded-lg p-2 flex-shrink-0">
                                <LayoutGrid className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-base font-semibold leading-tight">Integração com Plataforma Educacional</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              Capacidade única de integrar seu posicionamento com a comercialização de produtos educacionais na mesma plataforma.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                  {/* Box 5 */}
                  <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange to-ejup-cyan rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative h-full rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
                        <div className="bg-ejup-darkCard h-full rounded-xl border border-zinc-700/50 overflow-hidden p-4 min-h-[140px]">
                          <div className="flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-ejup-orange rounded-lg p-2 flex-shrink-0">
                                <PlayCircle className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-base font-semibold leading-tight">Produção Audiovisual de Alto Padrão</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              Material visual e audiovisual criado com padrões profissionais e otimizado para as diferentes plataformas digitais.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Box 6 */}
                  <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange to-ejup-cyan rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative h-full rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
                        <div className="bg-ejup-darkCard h-full rounded-xl border border-zinc-700/50 overflow-hidden p-4 min-h-[140px]">
                          <div className="flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-ejup-orange rounded-lg p-2 flex-shrink-0">
                                <Newspaper className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-base font-semibold leading-tight">Publicação de Conteúdos como Creator</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              Única plataforma que permite ao advogado posicionar-se também como autor de artigos e cursos na área jurídica.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Box 7 */}
                  <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange to-ejup-cyan rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative h-full rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
                        <div className="bg-ejup-darkCard h-full rounded-xl border border-zinc-700/50 overflow-hidden p-4 min-h-[140px]">
                          <div className="flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-ejup-orange rounded-lg p-2 flex-shrink-0">
                                <Target className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-base font-semibold leading-tight">Rede de Networking Jurídico</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              Acesso exclusivo a uma rede de contatos qualificados no meio jurídico, impulsionando oportunidades de parcerias e negócios.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Box 8 - Análise de Dados Jurídicos */}
                  <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
                    <div className="relative group h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-ejup-orange to-ejup-cyan rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative h-full rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300">
                        <div className="bg-ejup-darkCard h-full rounded-xl border border-zinc-700/50 overflow-hidden p-4 min-h-[140px]">
                          <div className="flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-ejup-orange rounded-lg p-2 flex-shrink-0">
                                <BarChart4 className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-base font-semibold leading-tight">Análise de Dados Jurídicos</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                              Métricas e insights específicos para o setor jurídico, permitindo decisões estratégicas baseadas em dados reais de performance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="text-center mt-8">
                <Button className="bg-ejup-orange hover:bg-ejup-orange/90 group text-base px-8 py-4" asChild>
                  <a href="mailto:contato@ejup.com.br?subject=Interesse em falar com especialista EJUP Creator">
                    <span>Fale com um especialista</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Creator; 