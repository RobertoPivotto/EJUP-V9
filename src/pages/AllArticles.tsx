import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Search, ChevronRight, ChevronDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ColumnSponsors, { Sponsor } from '@/components/content/ColumnSponsors';
import PopularTopics from '@/components/content/PopularTopics';
import UpcomingEvents, { Event } from '@/components/content/UpcomingEvents';
import ContentFilter from '@/components/content/ContentFilter';
import FilteredTags from '@/components/content/FilteredTags';

// Mock data for articles (expanded version)
const articles = [
  {
    id: 1,
    title: 'A importância dos contratos bem elaborados no ambiente empresarial',
    excerpt: 'Entenda como contratos bem redigidos podem prevenir litígios e proteger os interesses da empresa.',
    author: 'Eduardo Souza',
    role: 'Advogado Empresarial',
    date: '10 de maio, 2025',
    readTime: '5 min',
    category: 'Direito Empresarial',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
    content: 'Uma análise detalhada sobre a importância de contratos bem elaborados no ambiente empresarial, abordando aspectos práticos e jurídicos essenciais para a proteção dos interesses das empresas.',
    topics: [
      'Contratos',
      'Segurança Jurídica',
      'Empresarial',
      'Gestão de Riscos'
    ],
    featured: true
  },
  {
    id: 2,
    title: 'LGPD: 5 passos essenciais para adequação de escritórios de advocacia',
    excerpt: 'Confira as principais medidas para garantir a conformidade com a Lei Geral de Proteção de Dados.',
    author: 'Marina Lima',
    role: 'Especialista em Direito Digital',
    date: '5 de maio, 2025',
    readTime: '7 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf',
    content: 'Um guia prático para escritórios de advocacia se adequarem à LGPD, com foco em medidas concretas e implementáveis para garantir a conformidade com a legislação.',
    topics: [
      'LGPD',
      'Proteção de Dados',
      'Compliance',
      'Privacidade'
    ],
    featured: false
  },
  {
    id: 3,
    title: 'Arbitragem vs. Mediação: quando usar cada método?',
    excerpt: 'Análise comparativa sobre os métodos alternativos de resolução de conflitos e quando aplicá-los.',
    author: 'Carlos Mendes',
    role: 'Árbitro e Mediador',
    date: '28 de abril, 2025',
    readTime: '6 min',
    category: 'Resolução de Conflitos',
    image: 'https://images.unsplash.com/photo-1453847668862-487637052f8a',
    content: 'Uma análise comparativa detalhada entre arbitragem e mediação, ajudando profissionais a escolherem o método mais adequado para cada tipo de conflito.',
    topics: [
      'Arbitragem',
      'Mediação',
      'Resolução de Conflitos',
      'Negociação'
    ],
    featured: true
  },
  {
    id: 4,
    title: 'O impacto das decisões do STF no planejamento tributário empresarial',
    excerpt: 'Como as recentes decisões do Supremo estão mudando o cenário para empresas e seus consultores jurídicos.',
    author: 'Ana Rodrigues',
    role: 'Advogada Tributarista',
    date: '20 de abril, 2025',
    readTime: '8 min',
    category: 'Direito Tributário',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
    content: 'Uma análise das recentes decisões do STF em matéria tributária e seus impactos práticos no planejamento tributário das empresas.',
    topics: [
      'Tributário',
      'STF',
      'Jurisprudência',
      'Planejamento'
    ],
    featured: true
  },
  {
    id: 5,
    title: 'Compliance trabalhista: como evitar problemas com a fiscalização',
    excerpt: 'Guia prático para implementar programas de compliance trabalhista eficientes.',
    author: 'Roberto Gomes',
    role: 'Advogado Trabalhista',
    date: '12 de abril, 2025',
    readTime: '6 min',
    category: 'Direito Trabalhista',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0',
    content: 'Um guia detalhado sobre como implementar programas de compliance trabalhista para evitar problemas com fiscalização e reduzir riscos jurídicos.',
    topics: [
      'Compliance',
      'Trabalhista',
      'Fiscalização',
      'Recursos Humanos'
    ],
    featured: true
  },
  {
    id: 6,
    title: 'Os desafios da advocacia pública no Brasil contemporâneo',
    excerpt: 'Principais obstáculos enfrentados pelos advogados públicos e suas perspectivas futuras.',
    author: 'Juliana Martins',
    role: 'Procuradora Federal',
    date: '5 de abril, 2025',
    readTime: '9 min',
    category: 'Advocacia Pública',
    image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5',
    content: 'Uma discussão aprofundada sobre os desafios e perspectivas da advocacia pública no Brasil atual, com foco nas questões estruturais e institucionais.',
    topics: [
      'Advocacia Pública',
      'Carreira',
      'Instituições',
      'Políticas Públicas'
    ],
    featured: false
  },
  {
    id: 7,
    title: 'A reforma tributária e seus impactos no setor de serviços',
    excerpt: 'Especialistas analisam como a reforma pode afetar empresas prestadoras de serviços.',
    author: 'Lucas Prado',
    role: 'Tributário',
    date: '16 de maio, 2025',
    readTime: '4 min',
    category: 'Direito Tributário',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    content: 'Análise sobre a reforma tributária...',
    topics: ['Tributário', 'Reforma', 'Serviços'],
    featured: false
  },
  {
    id: 8,
    title: 'O futuro da energia limpa no Brasil',
    excerpt: 'Debate sobre incentivos e desafios para fontes renováveis.',
    author: 'Marina Silva',
    role: 'Energia',
    date: '15 de maio, 2025',
    readTime: '5 min',
    category: 'Energia',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
    content: 'Energia limpa e renovável...',
    topics: ['Energia', 'Sustentabilidade'],
    featured: false
  },
  {
    id: 9,
    title: 'Coluna: O papel do advogado na sociedade digital',
    excerpt: 'Reflexão sobre ética e tecnologia no Direito.',
    author: 'Patrícia Souza',
    role: 'Coluna',
    date: '14 de maio, 2025',
    readTime: '6 min',
    category: 'Opinião e análise',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    content: 'Coluna sobre ética digital...',
    topics: ['Opinião', 'Ética', 'Digital'],
    featured: false,
    type: 'coluna'
  },
  {
    id: 10,
    title: 'Artigo: Inteligência artificial e o futuro do Judiciário',
    excerpt: 'Como a IA pode transformar processos judiciais.',
    author: 'João Mendes',
    role: 'Artigo',
    date: '13 de maio, 2025',
    readTime: '7 min',
    category: 'Opinião e análise',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    content: 'Artigo sobre IA no Judiciário...',
    topics: ['Opinião', 'IA', 'Judiciário'],
    featured: false,
    type: 'artigo'
  },
  {
    id: 11,
    title: 'Coluna: O desafio da inclusão social no Direito',
    excerpt: 'Análise crítica sobre políticas públicas e acesso à justiça.',
    author: 'Fernanda Lima',
    role: 'Coluna',
    date: '12 de maio, 2025',
    readTime: '5 min',
    category: 'Opinião e análise',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290',
    content: 'Coluna sobre inclusão social...',
    topics: ['Opinião', 'Inclusão', 'Justiça'],
    featured: false,
    type: 'coluna'
  },
  {
    id: 12,
    title: 'Artigo: O impacto das fake news no processo eleitoral',
    excerpt: 'Discussão sobre desinformação e democracia.',
    author: 'Ricardo Alves',
    role: 'Artigo',
    date: '11 de maio, 2025',
    readTime: '6 min',
    category: 'Opinião e análise',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41',
    content: 'Artigo sobre fake news...',
    topics: ['Opinião', 'Fake News', 'Eleições'],
    featured: false,
    type: 'artigo'
  },
  {
    id: 13,
    title: 'A importância da mediação em conflitos empresariais',
    excerpt: 'Como a mediação pode ser uma alternativa eficiente para empresas.',
    author: 'Beatriz Ramos',
    role: 'Resolução de Conflitos',
    date: '10 de maio, 2025',
    readTime: '5 min',
    category: 'Resolução de Conflitos',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    content: 'Mediação empresarial...',
    topics: ['Mediação', 'Empresarial'],
    featured: false
  },
  {
    id: 14,
    title: 'Novas tendências em Direito Digital',
    excerpt: 'O que esperar da legislação digital nos próximos anos.',
    author: 'Carlos Silva',
    role: 'Direito Digital',
    date: '9 de maio, 2025',
    readTime: '6 min',
    category: 'Direito Digital',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    content: 'Tendências digitais...',
    topics: ['Digital', 'Tendências'],
    featured: false
  },
  {
    id: 15,
    title: 'Compliance ambiental: desafios e oportunidades',
    excerpt: 'Como empresas podem se adaptar à legislação ambiental.',
    author: 'Débora Tavares',
    role: 'Ambiental',
    date: '8 de maio, 2025',
    readTime: '7 min',
    category: 'Ambiental',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    content: 'Compliance ambiental...',
    topics: ['Ambiental', 'Compliance'],
    featured: false
  },
  {
    id: 16,
    title: 'Coluna: O papel do advogado público',
    excerpt: 'Reflexão sobre a atuação dos advogados públicos no Brasil.',
    author: 'Sérgio Nunes',
    role: 'Coluna',
    date: '7 de maio, 2025',
    readTime: '5 min',
    category: 'Opinião e análise',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    content: 'Coluna sobre advocacia pública...',
    topics: ['Coluna', 'Advocacia Pública'],
    featured: false,
    type: 'coluna'
  },
  {
    id: 17,
    title: 'Artigo: O futuro do trabalho remoto no Direito',
    excerpt: 'Impactos e desafios do home office para advogados.',
    author: 'Lívia Castro',
    role: 'Artigo',
    date: '6 de maio, 2025',
    readTime: '6 min',
    category: 'Opinião e análise',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290',
    content: 'Artigo sobre trabalho remoto...',
    topics: ['Artigo', 'Trabalho Remoto'],
    featured: false,
    type: 'artigo'
  },
  {
    id: 18,
    title: 'Coluna: Justiça e inovação',
    excerpt: 'Como a inovação pode transformar o acesso à justiça.',
    author: 'Ana Paula Borges',
    role: 'Coluna',
    date: '5 de maio, 2025',
    readTime: '5 min',
    category: 'Opinião e análise',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41',
    content: 'Coluna sobre inovação...',
    topics: ['Coluna', 'Inovação'],
    featured: false,
    type: 'coluna'
  },
  {
    id: 19,
    title: 'Artigo: A LGPD e o setor público',
    excerpt: 'Desafios da Lei Geral de Proteção de Dados para órgãos públicos.',
    author: 'Rafael Martins',
    role: 'Artigo',
    date: '4 de maio, 2025',
    readTime: '7 min',
    category: 'Opinião e análise',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    content: 'Artigo sobre LGPD...',
    topics: ['Artigo', 'LGPD'],
    featured: false,
    type: 'artigo'
  },
  {
    id: 20,
    title: 'Saúde pública e os desafios do SUS',
    excerpt: 'Análise sobre os principais desafios enfrentados pelo Sistema Único de Saúde.',
    author: 'Dr. Paulo Mendes',
    role: 'Saúde',
    date: '3 de maio, 2025',
    readTime: '6 min',
    category: 'Saúde',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    content: 'Desafios do SUS...',
    topics: ['Saúde', 'SUS'],
    featured: false
  },
  {
    id: 21,
    title: 'Judicialização da saúde: impactos e soluções',
    excerpt: 'Como o Judiciário tem influenciado o acesso à saúde no Brasil.',
    author: 'Maria Clara Souza',
    role: 'Saúde',
    date: '2 de maio, 2025',
    readTime: '5 min',
    category: 'Saúde',
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29',
    content: 'Judicialização da saúde...',
    topics: ['Saúde', 'Judicialização'],
    featured: false
  },
  {
    id: 22,
    title: 'Reforma da Previdência: o que mudou?',
    excerpt: 'Entenda as principais alterações na legislação previdenciária.',
    author: 'Fernanda Lopes',
    role: 'Previdenciário',
    date: '1 de maio, 2025',
    readTime: '7 min',
    category: 'Previdenciário',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    content: 'Reforma da Previdência...',
    topics: ['Previdenciário', 'Reforma'],
    featured: false
  },
  {
    id: 23,
    title: 'Benefícios do INSS: direitos e deveres',
    excerpt: 'Guia prático sobre os principais benefícios previdenciários.',
    author: 'João Pedro Martins',
    role: 'Previdenciário',
    date: '30 de abril, 2025',
    readTime: '6 min',
    category: 'Previdenciário',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    content: 'Benefícios do INSS...',
    topics: ['Previdenciário', 'INSS'],
    featured: false
  },
  {
    id: 24,
    title: 'Criminalidade e políticas públicas de segurança',
    excerpt: 'Estudo sobre a eficácia das políticas de segurança pública.',
    author: 'Lucas Ferreira',
    role: 'Criminal',
    date: '29 de abril, 2025',
    readTime: '5 min',
    category: 'Criminal',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41',
    content: 'Políticas de segurança...',
    topics: ['Criminal', 'Segurança'],
    featured: false
  },
  {
    id: 25,
    title: 'Direitos do réu no processo penal brasileiro',
    excerpt: 'Quais são as principais garantias do acusado no Brasil.',
    author: 'Patrícia Gomes',
    role: 'Criminal',
    date: '28 de abril, 2025',
    readTime: '6 min',
    category: 'Criminal',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    content: 'Direitos do réu...',
    topics: ['Criminal', 'Processo Penal'],
    featured: false
  },
  {
    id: 26,
    title: 'Cibersegurança: desafios para escritórios de advocacia',
    excerpt: 'Como proteger dados sensíveis em ambientes jurídicos digitais.',
    author: 'Bruno Tavares',
    role: 'Direito Digital',
    date: '8 de maio, 2025',
    readTime: '5 min',
    category: 'Direito Digital',
    image: '', // sem imagem
    content: 'Cibersegurança em escritórios...',
    topics: ['Digital', 'Cibersegurança'],
    featured: false
  },
  {
    id: 27,
    title: 'Blockchain e contratos inteligentes: o que muda?',
    excerpt: 'Entenda o impacto da tecnologia blockchain no Direito.',
    author: 'Renata Dias',
    role: 'Direito Digital',
    date: '7 de maio, 2025',
    readTime: '6 min',
    category: 'Direito Digital',
    image: '', // sem imagem
    content: 'Blockchain e contratos...',
    topics: ['Digital', 'Blockchain'],
    featured: false
  },
  {
    id: 28,
    title: 'Desafios da carreira na advocacia pública',
    excerpt: 'Os principais obstáculos e oportunidades para advogados públicos.',
    author: 'Marina Prado',
    role: 'Advocacia Pública',
    date: '6 de maio, 2025',
    readTime: '6 min',
    category: 'Advocacia Pública',
    image: '',
    content: 'Desafios da carreira...',
    topics: ['Advocacia Pública', 'Carreira'],
    featured: false
  },
  {
    id: 29,
    title: 'A importância da consultoria jurídica no setor público',
    excerpt: 'Como a consultoria jurídica contribui para a administração pública.',
    author: 'Carlos Nunes',
    role: 'Advocacia Pública',
    date: '5 de maio, 2025',
    readTime: '5 min',
    category: 'Advocacia Pública',
    image: '',
    content: 'Consultoria jurídica...',
    topics: ['Advocacia Pública', 'Consultoria'],
    featured: false
  },
  {
    id: 30,
    title: 'Gestão de riscos em empresas familiares',
    excerpt: 'Estratégias para mitigar riscos em negócios familiares.',
    author: 'Fernanda Souza',
    role: 'Direito Empresarial',
    date: '4 de maio, 2025',
    readTime: '6 min',
    category: 'Direito Empresarial',
    image: '',
    content: 'Gestão de riscos...',
    topics: ['Empresarial', 'Riscos'],
    featured: false
  },
  {
    id: 31,
    title: 'Contratos de franquia: pontos de atenção',
    excerpt: 'O que observar ao elaborar contratos de franquia.',
    author: 'João Lima',
    role: 'Direito Empresarial',
    date: '3 de maio, 2025',
    readTime: '5 min',
    category: 'Direito Empresarial',
    image: '',
    content: 'Contratos de franquia...',
    topics: ['Empresarial', 'Contratos'],
    featured: false
  },
  {
    id: 32,
    title: 'Planejamento tributário para pequenas empresas',
    excerpt: 'Dicas para otimizar a carga tributária de pequenos negócios.',
    author: 'Lucas Martins',
    role: 'Direito Tributário',
    date: '2 de maio, 2025',
    readTime: '7 min',
    category: 'Direito Tributário',
    image: '',
    content: 'Planejamento tributário...',
    topics: ['Tributário', 'Pequenas Empresas'],
    featured: false
  },
  {
    id: 33,
    title: 'ICMS: principais mudanças em 2025',
    excerpt: 'O que mudou na legislação do ICMS neste ano.',
    author: 'Patrícia Alves',
    role: 'Direito Tributário',
    date: '1 de maio, 2025',
    readTime: '6 min',
    category: 'Direito Tributário',
    image: '',
    content: 'ICMS 2025...',
    topics: ['Tributário', 'ICMS'],
    featured: false
  },
  {
    id: 34,
    title: 'Reforma trabalhista: impactos práticos',
    excerpt: 'Como a reforma trabalhista afeta empregadores e empregados.',
    author: 'Rafael Souza',
    role: 'Direito Trabalhista',
    date: '30 de abril, 2025',
    readTime: '7 min',
    category: 'Direito Trabalhista',
    image: '',
    content: 'Reforma trabalhista...',
    topics: ['Trabalhista', 'Reforma'],
    featured: false
  },
  {
    id: 35,
    title: 'Terceirização e seus limites legais',
    excerpt: 'O que diz a legislação sobre terceirização de serviços.',
    author: 'Ana Paula Lima',
    role: 'Direito Trabalhista',
    date: '29 de abril, 2025',
    readTime: '6 min',
    category: 'Direito Trabalhista',
    image: '',
    content: 'Terceirização...',
    topics: ['Trabalhista', 'Terceirização'],
    featured: false
  },
  {
    id: 36,
    title: 'Telemedicina: avanços e desafios',
    excerpt: 'O crescimento da telemedicina no Brasil e seus desafios.',
    author: 'Juliana Prado',
    role: 'Saúde',
    date: '28 de abril, 2025',
    readTime: '5 min',
    category: 'Saúde',
    image: '',
    content: 'Telemedicina...',
    topics: ['Saúde', 'Telemedicina'],
    featured: false
  },
  {
    id: 37,
    title: 'Planos de saúde: direitos do consumidor',
    excerpt: 'O que o consumidor precisa saber sobre planos de saúde.',
    author: 'Marcos Silva',
    role: 'Saúde',
    date: '27 de abril, 2025',
    readTime: '6 min',
    category: 'Saúde',
    image: '',
    content: 'Planos de saúde...',
    topics: ['Saúde', 'Planos'],
    featured: false
  },
  {
    id: 38,
    title: 'Energia solar: incentivos fiscais em 2025',
    excerpt: 'Como aproveitar os incentivos fiscais para energia solar.',
    author: 'Paula Mendes',
    role: 'Energia',
    date: '26 de abril, 2025',
    readTime: '5 min',
    category: 'Energia',
    image: '',
    content: 'Energia solar...',
    topics: ['Energia', 'Solar'],
    featured: false
  },
  {
    id: 39,
    title: 'Mercado livre de energia: oportunidades e riscos',
    excerpt: 'O que considerar ao migrar para o mercado livre de energia.',
    author: 'Ricardo Lima',
    role: 'Energia',
    date: '25 de abril, 2025',
    readTime: '6 min',
    category: 'Energia',
    image: '',
    content: 'Mercado livre...',
    topics: ['Energia', 'Mercado Livre'],
    featured: false
  },
  {
    id: 40,
    title: 'Licenciamento ambiental: etapas e exigências',
    excerpt: 'Como funciona o processo de licenciamento ambiental.',
    author: 'Sofia Castro',
    role: 'Ambiental',
    date: '24 de abril, 2025',
    readTime: '7 min',
    category: 'Ambiental',
    image: '',
    content: 'Licenciamento ambiental...',
    topics: ['Ambiental', 'Licenciamento'],
    featured: false
  },
  {
    id: 41,
    title: 'Poluição urbana e responsabilidade civil',
    excerpt: 'A responsabilidade civil em casos de poluição urbana.',
    author: 'Gabriel Souza',
    role: 'Ambiental',
    date: '23 de abril, 2025',
    readTime: '6 min',
    category: 'Ambiental',
    image: '',
    content: 'Poluição urbana...',
    topics: ['Ambiental', 'Poluição'],
    featured: false
  },
  {
    id: 42,
    title: 'Aposentadoria especial: quem tem direito?',
    excerpt: 'Regras e requisitos para aposentadoria especial.',
    author: 'Patrícia Lima',
    role: 'Previdenciário',
    date: '22 de abril, 2025',
    readTime: '7 min',
    category: 'Previdenciário',
    image: '',
    content: 'Aposentadoria especial...',
    topics: ['Previdenciário', 'Aposentadoria'],
    featured: false
  },
  {
    id: 43,
    title: 'Pensão por morte: principais dúvidas',
    excerpt: 'Perguntas frequentes sobre pensão por morte no INSS.',
    author: 'Eduardo Silva',
    role: 'Previdenciário',
    date: '21 de abril, 2025',
    readTime: '6 min',
    category: 'Previdenciário',
    image: '',
    content: 'Pensão por morte...',
    topics: ['Previdenciário', 'Pensão'],
    featured: false
  },
  {
    id: 44,
    title: 'Crimes digitais: legislação e desafios',
    excerpt: 'Como o Direito Penal trata os crimes digitais.',
    author: 'Marina Duarte',
    role: 'Criminal',
    date: '20 de abril, 2025',
    readTime: '7 min',
    category: 'Criminal',
    image: '',
    content: 'Crimes digitais...',
    topics: ['Criminal', 'Digital'],
    featured: false
  },
  {
    id: 45,
    title: 'Execução penal: etapas do processo',
    excerpt: 'Entenda as fases da execução penal no Brasil.',
    author: 'João Batista',
    role: 'Criminal',
    date: '19 de abril, 2025',
    readTime: '6 min',
    category: 'Criminal',
    image: '',
    content: 'Execução penal...',
    topics: ['Criminal', 'Execução Penal'],
    featured: false
  },
  {
    id: 46,
    title: 'Arbitragem: vantagens e desvantagens',
    excerpt: 'Quando optar pela arbitragem em vez do Judiciário.',
    author: 'Cláudia Ramos',
    role: 'Resolução de Conflitos',
    date: '18 de abril, 2025',
    readTime: '6 min',
    category: 'Resolução de Conflitos',
    image: '',
    content: 'Arbitragem...',
    topics: ['Resolução de Conflitos', 'Arbitragem'],
    featured: false
  },
  {
    id: 47,
    title: 'Mediação familiar: benefícios e limites',
    excerpt: 'Como a mediação pode ajudar em conflitos familiares.',
    author: 'Roberta Dias',
    role: 'Resolução de Conflitos',
    date: '17 de abril, 2025',
    readTime: '5 min',
    category: 'Resolução de Conflitos',
    image: '',
    content: 'Mediação familiar...',
    topics: ['Resolução de Conflitos', 'Mediação'],
    featured: false
  }
];

// Mock data para patrocinadores
const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "NDF Advogados",
    image: "/lovable-uploads/logos/3.png",
    link: "#"
  },
  {
    id: 2,
    name: "MDR Advocacia",
    image: "/lovable-uploads/logos/2.png",
    link: "#"
  },
  {
    id: 3,
    name: "CCGD Advocacia",
    image: "/lovable-uploads/logos/1.png",
    link: "#"
  },
  {
    id: 4,
    name: "JuridIq.",
    image: "/lovable-uploads/logos/4.png",
    link: "#"
  }
];

// Mock data para eventos em destaque
const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Congresso de Direito Digital",
    date: "15 de junho, 2025",
    link: "/events"
  },
  {
    id: 2,
    title: "Workshop: Contratos na Prática",
    date: "22 de maio, 2025",
    link: "/events"
  }
];

const AllArticles = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [opDropdownOpen, setOpDropdownOpen] = useState(false);
  const [opType, setOpType] = useState<'all' | 'coluna' | 'artigo'>('all');

  // Extrair todas as categorias de artigos para uso como tópicos no filtro
  const allCategories = useMemo(() => {
    const categories = ['Advocacia Pública', 'Direito Digital', 'Direito Empresarial', 
      'Direito Tributário', 'Direito Trabalhista', 'Saúde', 'Energia', 'Ambiental', 
      'Previdenciário', 'Criminal', 'Opinião e Análise'];
    return categories;
  }, []);

  // Filter articles based on selected topics and search term
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Filtrar por categorias selecionadas
      const matchesCategory = 
        selectedTopics.length === 0 || 
        selectedTopics.includes(article.category) ||
        // Para "Opinião e Análise", também incluir todos os artigos com categoria "Opinião e análise"
        (selectedTopics.includes("Opinião e Análise") && article.category === "Opinião e análise");
      
      // Filtrar por termo de busca
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedTopics, searchTerm, articles]);

  // Separate featured and regular articles
  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  // Handler for filter changes
  const handleFilterChange = (topics: string[]) => {
    setSelectedTopics(topics);
  };

  // Handler for search term changes
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Handler for removing individual topics
  const handleRemoveTopic = (topicToRemove: string) => {
    setSelectedTopics(prev => prev.filter(topic => topic !== topicToRemove));
  };

  // Handler for clearing all filters
  const handleClearAllFilters = () => {
    setSelectedTopics([]);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      {/* Cabeçalho compacto e integrado */}
      <div className="pt-28 pb-8">
        <div className="ejup-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Coluna Jurídica</h1>
                <span className="hidden md:flex items-center gap-2 text-sm text-zinc-400 ml-2">
                  <Calendar className="h-4 w-4 text-zinc-400" />
                  Edição de {new Date().toLocaleDateString('pt-BR', {month: 'long', year: 'numeric'})}
                </span>
              </div>
              <p className="text-zinc-400 font-serif text-base mt-1 mb-2">
                Notícias e análises sobre os temas mais relevantes do mundo jurídico contemporâneo
              </p>
            </div>
          </div>
          {/* Data embaixo para mobile */}
          <div className="flex md:hidden items-center gap-2 text-sm text-zinc-400 mt-2">
            <Calendar className="h-4 w-4 text-zinc-400" />
            Edição de {new Date().toLocaleDateString('pt-BR', {month: 'long', year: 'numeric'})}
          </div>
        </div>
      </div>

      {/* ContentFilter component */}
      <div className="ejup-container">
        <ContentFilter 
          topics={allCategories}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          accentColor="ejup-orange"
        />
        
        {/* Filtered Tags - Mobile only */}
        <FilteredTags
          selectedTopics={selectedTopics}
          onRemoveTopic={handleRemoveTopic}
          onClearAll={handleClearAllFilters}
        />
      </div>

      <main className="py-8">
        <div className="ejup-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Coluna Principal (8 colunas) */}
            <div className="lg:col-span-8">
              {/* Layout condicional dependendo se algum filtro está ativo ou não */}
              {selectedTopics.length === 0 ? (
                // Quando nenhum filtro está selecionado, exibe o layout original com artigos em destaque
                <>
                  {/* Manchete (Artigo Principal em Destaque) */}
                  {filteredArticles.filter(a => a.featured).length > 0 && (
                    <div className="mb-8">
                      <div className="relative">
                        <Link to={`/content/blog/${filteredArticles.filter(a => a.featured)[0].id}`}>
                          <div className="aspect-[21/9] rounded-lg overflow-hidden">
                            <img 
                              src={filteredArticles.filter(a => a.featured)[0].image} 
                              alt={filteredArticles.filter(a => a.featured)[0].title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300">
                                  {filteredArticles.filter(a => a.featured)[0].role}
                                </span>
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300">
                                  {filteredArticles.filter(a => a.featured)[0].category}
                                </span>
                              </div>
                              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                                {filteredArticles.filter(a => a.featured)[0].title}
                              </h2>
                              <p className="text-zinc-300 text-base hidden md:block mb-4">
                                {filteredArticles.filter(a => a.featured)[0].excerpt}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="text-zinc-400 text-sm">{filteredArticles.filter(a => a.featured)[0].author}</div>
                                {filteredArticles.filter(a => a.featured)[0].readTime && (
                                  <div className="text-zinc-400 text-sm">{filteredArticles.filter(a => a.featured)[0].readTime}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  {/* Artigos em destaque - Layout podcast style no mobile */}
                  {filteredArticles.filter(a => a.featured).length > 1 && (
                    <div className="grid grid-cols-1 gap-6 mb-12">
                      {filteredArticles.filter(a => a.featured).slice(1, 4).map((article) => (
                        <Link key={article.id} to={`/content/blog/${article.id}`} className="block bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden hover:border-ejup-orange/50 transition-all duration-300 group">
                          <div className="flex flex-col md:flex-row h-full">
                            <div className="md:w-1/3 relative">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div className="flex-1 p-4 md:p-6">
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                                  {article.role}
                                </span>
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                                  {article.category}
                                </span>
                              </div>
                              <h3 className="text-lg md:text-xl font-semibold mb-2 text-zinc-300 group-hover:text-white transition-colors line-clamp-2">
                                {article.title}
                              </h3>
                              <p className="text-zinc-400 text-sm mb-4 line-clamp-2 md:line-clamp-3">
                                {article.excerpt}
                              </p>
                              <div className="flex justify-between items-center text-xs text-zinc-500 mt-auto">
                                <span>{article.author}</span>
                                {article.readTime && <span>{article.readTime}</span>}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Lista de Artigos */}
                  <h2 className="text-xl font-bold mb-6 border-b border-zinc-800 pb-4">
                    Artigos Recentes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    {filteredArticles
                      .filter(article => !article.featured || (article.featured && filteredArticles.filter(a => a.featured).indexOf(article) >= 3))
                      .map((article) => (
                      <Link key={article.id} to={`/content/blog/${article.id}`} className="group border-b border-zinc-800 pb-6 mb-6 block">
                        <h3 className="text-lg font-serif font-semibold mb-1 text-zinc-300 group-hover:text-white transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-zinc-400 text-sm mb-2 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex justify-between items-center text-xs text-zinc-500">
                          <span>{article.author}</span>
                          {article.readTime && <span>{article.readTime}</span>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                // Quando um filtro está ativo, exibe um layout misto com os artigos filtrados
                <>
                  <h2 className="text-xl font-bold mb-6 border-b border-zinc-800 pb-4">
                    Resultados ({filteredArticles.length})
                  </h2>
                  
                  {/* Artigos com imagem - Layout podcast style */}
                  {filteredArticles.filter(a => a.image).length > 0 && (
                    <div className="grid grid-cols-1 gap-6 mb-8">
                      {filteredArticles.filter(a => a.image).slice(0, 4).map((article) => (
                        <Link key={article.id} to={`/content/blog/${article.id}`} className="block bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden hover:border-ejup-orange/50 transition-all duration-300 group">
                          <div className="flex flex-col md:flex-row h-full">
                            <div className="md:w-1/3 relative">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                            <div className="flex-1 p-4 md:p-6">
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                                  {article.role}
                                </span>
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                                  {article.category}
                                </span>
                              </div>
                              <h3 className="text-lg md:text-xl font-semibold mb-2 text-zinc-300 group-hover:text-white transition-colors line-clamp-2">
                                {article.title}
                              </h3>
                              <p className="text-zinc-400 text-sm mb-4 line-clamp-2 md:line-clamp-3">
                                {article.excerpt}
                              </p>
                              <div className="flex justify-between items-center text-xs text-zinc-500 mt-auto">
                                <span>{article.author}</span>
                                {article.readTime && <span>{article.readTime}</span>}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Lista de artigos sem imagem ou restantes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    {filteredArticles
                      .filter((article, index) => !article.image || (article.image && index >= 4))
                      .map((article) => (
                      <Link key={article.id} to={`/content/blog/${article.id}`} className="group border-b border-zinc-800 pb-6 mb-6 block">
                        <h3 className="text-lg font-serif font-semibold mb-1 text-zinc-300 group-hover:text-white transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-zinc-400 text-sm mb-2 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex justify-between items-center text-xs text-zinc-500">
                          <span>{article.author}</span>
                          {article.readTime && <span>{article.readTime}</span>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
              
              {/* Mensagem caso nenhum resultado seja encontrado */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h2>
                  <p className="text-zinc-400">Tente outros filtros ou termos de busca.</p>
                </div>
              )}
            </div>
            
            {/* Coluna Lateral (4 colunas) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Destaque para Podcasts */}
              <div className="bg-gradient-to-br from-ejup-cyan/20 to-ejup-orange/20 rounded-lg border border-zinc-700/50 overflow-hidden">
                <div className="relative aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                    alt="Podcast EJUP" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 flex flex-col justify-end p-4">
                    <Badge className="mb-2 bg-ejup-orange text-white border-none w-fit">
                      Podcast
                    </Badge>
                    <h3 className="text-xl font-serif font-semibold text-white mb-2">
                      Ouça o Podcast EJUP
                    </h3>
                    <p className="text-zinc-300 text-sm mb-3">
                      Conversas e debates sobre os temas mais relevantes do universo jurídico
                    </p>
                    <Button className="bg-ejup-orange hover:bg-ejup-orange/90 w-full" asChild>
                      <Link to="/content/podcast">
                        Ver todos os episódios
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Área de Patrocínio */}
              <ColumnSponsors sponsors={sponsors} />
              
              {/* Tags Populares */}
              <PopularTopics 
                topics={allCategories} 
                onTopicClick={handleFilterChange}
                selectedTopics={selectedTopics}
                accentColor="ejup-orange"
              />
              
              {/* Próximos Eventos */}
              <div className="hidden md:block">
                <UpcomingEvents events={upcomingEvents} />
              </div>
              
              {/* Segundo destaque, se houver */}
              {filteredArticles.filter(a => a.featured).length > 1 && (
                <div className="bg-ejup-darkCard rounded-lg border border-zinc-700/50 overflow-hidden hidden md:block">
                  <div className="aspect-video">
                    <img 
                      src={filteredArticles.filter(a => a.featured)[1].image} 
                      alt={filteredArticles.filter(a => a.featured)[1].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <Badge className="mb-2 bg-ejup-orange text-white border-none">Em Destaque</Badge>
                    <Link to={`/content/blog/${filteredArticles.filter(a => a.featured)[1].id}`}>
                      <h3 className="text-lg font-serif font-semibold mb-2 text-zinc-300 hover:text-white transition-colors">
                        {filteredArticles.filter(a => a.featured)[1].title}
                      </h3>
                    </Link>
                    <p className="text-zinc-400 text-sm mb-3">
                      {filteredArticles.filter(a => a.featured)[1].excerpt}
                    </p>
                    <Link 
                      to={`/content/blog/${filteredArticles.filter(a => a.featured)[1].id}`}
                      className="text-ejup-cyan hover:text-ejup-cyan/80 text-sm font-medium flex items-center"
                    >
                      <span>Ler artigo completo</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllArticles; 