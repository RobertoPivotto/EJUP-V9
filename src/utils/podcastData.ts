export interface PodcastData {
  id: number;
  title: string;
  description: string;
  guests: string[];
  guestsRoles: string[];
  categories: string[];
  duration: string;
  date: string;
  excerpt: string;
  content: string;
  highlightQuote: string;
  videoUrl: string;
  thumbnailImage: string;
  topics: string[];
  relatedPodcasts: number[];
  status: 'published' | 'draft' | 'scheduled';
  imageColor: string;
  socialImage: string;
}

export const mockPodcastData: PodcastData[] = [
  {
    id: 1,
    title: 'O futuro da advocacia na era digital',
    description: 'Neste episódio, mergulhamos fundo nas transformações que a tecnologia está trazendo para o campo jurídico. Discutimos inteligência artificial, automação de processos e as novas competências necessárias para os advogados do futuro.',
    guests: ['Paulo Silva', 'Renata Mendonça'],
    guestsRoles: ['Especialista em Legaltech', 'Consultora em Transformação Digital'],
    categories: ['digital', 'carreira'],
    duration: '45 min',
    date: '2025-01-12',
    excerpt: 'Discussão sobre como a tecnologia está transformando a advocacia.',
    content: `
      <p><strong>Apresentador:</strong> Olá, sejam bem-vindos a mais um episódio do Podcast EJUP. Hoje vamos falar sobre o futuro da advocacia na era digital.</p>
      
      <p><strong>Paulo:</strong> A tecnologia está mudando drasticamente a forma como praticamos o direito. Vemos isso nas automações de documentos, nas pesquisas jurídicas com IA e nas novas formas de interação com clientes.</p>
      
      <p><strong>Renata:</strong> Exatamente, Paulo. E isso não significa que advogados serão substituídos, mas que precisarão desenvolver novas habilidades. O pensamento crítico, a capacidade de resolver problemas complexos e a criatividade serão ainda mais valorizados.</p>
      
      <p><strong>Paulo:</strong> Um exemplo claro é como a análise de jurisprudência mudou. O que antes levava dias ou semanas de pesquisa manual, hoje pode ser feito em minutos com as ferramentas certas.</p>
    `,
    highlightQuote: 'A tecnologia não substitui o advogado, mas potencializa suas capacidades.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    topics: ['Inteligência Artificial', 'Automação', 'Competências Digitais', 'Futuro da Advocacia'],
    relatedPodcasts: [2, 3],
    status: 'published',
    imageColor: 'bg-gradient-to-br from-ejup-pink/30 to-ejup-cyan/30',
    socialImage: '/lovable-uploads/course-preview.jpg'
  },
  {
    id: 2,
    title: 'Desafios do direito empresarial pós-pandemia',
    description: 'Uma análise profunda das mudanças no cenário empresarial após a pandemia e como isso afeta a prática do direito empresarial. Discutimos novos modelos de negócio, contratos e relações comerciais.',
    guests: ['Marcelo Torres'],
    guestsRoles: ['Especialista em Direito Empresarial'],
    categories: ['empresarial'],
    duration: '38 min',
    date: '2025-01-03',
    excerpt: 'Análise dos novos cenários e oportunidades para profissionais do direito empresarial.',
    content: `
      <p><strong>Apresentador:</strong> Hoje vamos analisar os desafios que o direito empresarial enfrenta no mundo pós-pandemia.</p>
      
      <p><strong>Marcelo:</strong> A pandemia acelerou mudanças que já estavam em curso. Vimos empresas digitalizando seus processos em semanas, quando antes planejavam fazer isso em anos.</p>
      
      <p><strong>Apresentador:</strong> E como isso impacta os contratos e as relações comerciais?</p>
      
      <p><strong>Marcelo:</strong> Os contratos precisaram se adaptar rapidamente. Cláusulas de força maior foram analisadas com muito mais atenção, e novos tipos de garantias surgiram para lidar com incertezas.</p>
    `,
    highlightQuote: 'A pandemia acelerou transformações que antes levariam anos para acontecer.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailImage: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    topics: ['Contratos', 'Relações Comerciais', 'Crise Empresarial', 'Adaptação'],
    relatedPodcasts: [1, 4],
    status: 'published',
    imageColor: 'bg-gradient-to-br from-ejup-cyan/30 to-ejup-orange/30',
    socialImage: '/lovable-uploads/course-preview.jpg'
  },
  {
    id: 3,
    title: 'Carreiras jurídicas não tradicionais',
    description: 'Exploramos diferentes possibilidades de carreira para profissionais do direito além da advocacia tradicional. Desde legal design até consultoria especializada, descubra novos caminhos profissionais.',
    guests: ['Carla Peixoto', 'Henrique Alves'],
    guestsRoles: ['Legal Designer', 'Consultor de Carreira Jurídica'],
    categories: ['carreira'],
    duration: '52 min',
    date: '2025-01-26',
    excerpt: 'Conheça caminhos alternativos para profissionais do direito além da advocacia tradicional.',
    content: `
      <p><strong>Apresentador:</strong> Hoje vamos explorar caminhos não tradicionais para profissionais do direito.</p>
      
      <p><strong>Carla:</strong> Muitos advogados não percebem quantas opções existem além dos escritórios tradicionais. Legal design, por exemplo, combina direito com design thinking para criar soluções mais acessíveis.</p>
      
      <p><strong>Henrique:</strong> E também temos o crescimento do papel do advogado como consultor estratégico, especialmente em startups e empresas de tecnologia.</p>
    `,
    highlightQuote: 'O direito vai muito além dos escritórios tradicionais - há todo um mundo de possibilidades.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    topics: ['Legal Design', 'Consultoria', 'Tecnologia', 'Empreendedorismo'],
    relatedPodcasts: [1, 4],
    status: 'published',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-pink/30',
    socialImage: '/lovable-uploads/course-preview.jpg'
  },
  {
    id: 4,
    title: 'ESG e o papel dos departamentos jurídicos',
    description: 'Uma discussão aprofundada sobre o papel dos departamentos jurídicos na implementação de práticas ESG nas empresas. Abordamos aspectos legais, regulatórios e práticos.',
    guests: ['Fernando Mendes', 'Júlia Castro'],
    guestsRoles: ['Especialista em Direito Ambiental', 'Consultora de Compliance'],
    categories: ['empresarial', 'sustentabilidade'],
    duration: '47 min',
    date: '2025-01-15',
    excerpt: 'Como os profissionais do direito podem contribuir para as iniciativas de sustentabilidade das empresas.',
    content: `
      <p><strong>Apresentador:</strong> Hoje vamos falar sobre ESG e como os departamentos jurídicos estão envolvidos nessa transformação.</p>
      
      <p><strong>Fernando:</strong> ESG não é mais apenas uma tendência, mas uma necessidade para empresas que querem se manter competitivas e cumprir com as crescentes exigências regulatórias.</p>
      
      <p><strong>Júlia:</strong> Os profissionais jurídicos têm um papel fundamental não apenas em garantir o compliance, mas em ajudar a desenhar estratégias que realmente integrem ESG ao core business.</p>
    `,
    highlightQuote: 'ESG não é apenas compliance, é uma estratégia de negócio.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailImage: 'https://images.unsplash.com/photo-1535615615570-3b839f4359be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    topics: ['Compliance', 'Sustentabilidade', 'Governança', 'Regulamentações'],
    relatedPodcasts: [2, 3],
    status: 'published',
    imageColor: 'bg-gradient-to-br from-ejup-green/30 to-ejup-cyan/30',
    socialImage: '/lovable-uploads/course-preview.jpg'
  }
];

// Helper function to get a podcast by ID
export const getPodcastById = (id: number): PodcastData | undefined => {
  return mockPodcastData.find(podcast => podcast.id === id);
};

// Helper function to get related podcasts
export const getRelatedPodcasts = (podcastId: number): PodcastData[] => {
  const podcast = getPodcastById(podcastId);
  if (!podcast) return [];
  
  return mockPodcastData.filter(p => 
    podcast.relatedPodcasts.includes(p.id) && p.status === 'published'
  );
};

// Helper function to get all published podcasts
export const getPublishedPodcasts = (): PodcastData[] => {
  return mockPodcastData.filter(podcast => podcast.status === 'published');
};
 