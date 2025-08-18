import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { useToast } from "../../hooks/use-toast";
import { Search, Plus, Edit, Trash2, Star, StarOff, Calendar, Clock, User, Tag, CheckCircle, XCircle, FileText, Eye, Settings, Check, X } from 'lucide-react';

// Tipos de dados
interface Article {
  id: number;
  title: string;
  categories: string[]; // Múltiplas categorias por artigo
  readTime: string;
  date: string;
  summary: string;
  author: {
    name: string;
    photo: string;
    specialization: string;
  };
  content: string;
  excerpt: string;
  highlightQuote: string; // Frase em destaque que aparece na página do artigo
  imageColor: string;
  images: {
    featured: string; // Imagem principal do artigo (grande)
    thumbnail: string; // Miniatura para cards
    banner: string; // Banner para header da página
    social: string; // Imagem para compartilhamento social
  };
  isFeatured: boolean;
  isSubFeatured: boolean;
  status: 'published' | 'draft' | 'scheduled';
  featuredCourses: number[]; // IDs dos cursos em destaque para este artigo
  featuredSponsors: number[]; // IDs dos patrocinadores em destaque para este artigo
}

interface StudentArticle {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
    studentId: string;
    photo?: string;
    bio?: string;
  };
  categories: string[]; // Múltiplas categorias por artigo de estudante
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  content: string;
  excerpt: string;
  reviewNotes?: string;
  publishedDate?: string;
  readTime?: string;
  publishingConfig?: {
    featuredImage?: string;
    thumbnailImage?: string;
    bannerImage?: string;
    socialImage?: string;
    imageColor?: string;
    highlightQuote?: string;
    summary?: string;
    authorSpecialization?: string;
    isFeatured?: boolean;
    isSubFeatured?: boolean;
    tags?: string[];
  };
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  price: number;
  rating: number;
  students: number;
  image: string;
}

interface Podcast {
  id: number;
  title: string;
  description: string;
  guests: string[];
  guestsRoles: string[];
  categories: string[]; // Múltiplas categorias por podcast
  duration: string;
  date: string;
  excerpt: string;
  content: string;
  highlightQuote: string;
  videoUrl: string; // URL do YouTube
  thumbnailImage: string;
  topics: string[];
  relatedPodcasts: number[];
  status: 'published' | 'draft' | 'scheduled';
  imageColor: string;
  socialImage: string;
}

import { Sponsor, mockSponsors } from '../../utils/sponsorsData';

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Direito Empresarial Avançado',
    instructor: 'Dr. Eduardo Souza',
    category: 'Empresarial',
    price: 497,
    rating: 4.8,
    students: 1250,
    image: '/lovable-uploads/course-preview.jpg'
  },
  {
    id: 2,
    title: 'Resolução de Conflitos na Prática',
    instructor: 'Dra. Ana Paula Silva',
    category: 'Resolução de Conflitos',
    price: 397,
    rating: 4.9,
    students: 890,
    image: '/lovable-uploads/course-preview.jpg'
  },
  {
    id: 3,
    title: 'Direito Digital e LGPD',
    instructor: 'Dr. Carlos Mendes',
    category: 'Digital',
    price: 347,
    rating: 4.7,
    students: 650,
    image: '/lovable-uploads/course-preview.jpg'
  },
  {
    id: 4,
    title: 'Direito Tributário Essencial',
    instructor: 'Dra. Mariana Santos',
    category: 'Tributário',
    price: 427,
    rating: 4.6,
    students: 520,
    image: '/lovable-uploads/course-preview.jpg'
  }
];

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'A importância dos contratos bem elaborados no ambiente empresarial',
    categories: ['empresarial', 'carreira'],
    readTime: '5 min',
    date: '2025-01-15',
    summary: 'Entenda como contratos bem redigidos podem prevenir litígios e proteger os interesses da empresa.',
    author: {
      name: 'Eduardo Souza',
      photo: '/lovable-uploads/team/instructor.png',
      specialization: 'Especialista em Direito Empresarial'
    },
    content: 'Conteúdo completo do artigo sobre contratos empresariais...',
    excerpt: 'Entenda como contratos bem redigidos podem prevenir litígios e proteger os interesses da empresa.',
    highlightQuote: 'Contratos bem elaborados são a base para relações empresariais sólidas e seguras.',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-orange/30',
    images: {
      featured: '/lovable-uploads/course-preview.jpg',
      thumbnail: '/lovable-uploads/course-preview.jpg',
      banner: '/lovable-uploads/course-preview.jpg',
      social: '/lovable-uploads/course-preview.jpg'
    },
    isFeatured: true,
    isSubFeatured: false,
    status: 'published',
    featuredCourses: [1, 2],
    featuredSponsors: [1, 3]
  },
  {
    id: 2,
    title: 'Arbitragem vs. Mediação: quando usar cada método?',
    categories: ['resolucao', 'empresarial'],
    readTime: '7 min',
    date: '2025-01-10',
    summary: 'Análise comparativa entre arbitragem e mediação para resolução de conflitos empresariais.',
    author: {
      name: 'Ana Paula Silva',
      photo: '/lovable-uploads/team/depoente 1.png',
      specialization: 'Especialista em Resolução de Conflitos'
    },
    content: 'Conteúdo completo sobre arbitragem e mediação...',
    excerpt: 'Análise comparativa entre arbitragem e mediação para resolução de conflitos empresariais.',
    highlightQuote: 'A mediação oferece soluções mais ágeis e econômicas para conflitos empresariais.',
    imageColor: 'bg-gradient-to-br from-ejup-cyan/30 to-ejup-orange/30',
    images: {
      featured: '/lovable-uploads/course-preview.jpg',
      thumbnail: '/lovable-uploads/course-preview.jpg',
      banner: '/lovable-uploads/course-preview.jpg',
      social: '/lovable-uploads/course-preview.jpg'
    },
    isFeatured: false,
    isSubFeatured: true,
    status: 'published',
    featuredCourses: [2],
    featuredSponsors: [2, 4, 5]
  },
  {
    id: 3,
    title: 'Direito Digital: novos desafios para advogados',
    categories: ['digital', 'carreira'],
    readTime: '6 min',
    date: '2025-01-08',
    summary: 'Como os profissionais do direito podem se adaptar às mudanças tecnológicas.',
    author: {
      name: 'Carlos Mendes',
      photo: '/lovable-uploads/team/depoente 2.png',
      specialization: 'Especialista em Direito Digital'
    },
    content: 'Conteúdo completo sobre direito digital...',
    excerpt: 'Como os profissionais do direito podem se adaptar às mudanças tecnológicas.',
    highlightQuote: 'A transformação digital exige que advogados se reinventem constantemente.',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
    images: {
      featured: '/lovable-uploads/course-preview.jpg',
      thumbnail: '/lovable-uploads/course-preview.jpg',
      banner: '/lovable-uploads/course-preview.jpg',
      social: '/lovable-uploads/course-preview.jpg'
    },
    isFeatured: false,
    isSubFeatured: true,
    status: 'published',
    featuredCourses: [3, 4],
    featuredSponsors: [1, 2, 3]
  }
];

const mockStudentArticles: StudentArticle[] = [
  {
    id: 1,
    title: 'Análise da Lei Geral de Proteção de Dados no contexto empresarial',
    author: {
      name: 'João Silva Santos',
      email: 'joao.santos@email.com',
      studentId: 'EST001',
      photo: '/lovable-uploads/team/depoente 1.png',
      bio: 'Estudante de Direito Digital, especializado em proteção de dados'
    },
    categories: ['digital', 'empresarial'],
    submittedDate: '2025-01-18',
    status: 'pending',
    content: `A Lei Geral de Proteção de Dados (LGPD) trouxe transformações significativas para o ambiente empresarial brasileiro. Este artigo examina os principais desafios enfrentados pelas empresas na implementação de medidas de conformidade com a LGPD.

## Principais Impactos da LGPD

A entrada em vigor da LGPD em setembro de 2020 representou um marco regulatório no Brasil. As empresas precisaram adequar suas práticas de tratamento de dados pessoais para garantir conformidade com a nova legislação.

### Desafios de Implementação

1. **Mapeamento de dados**: Identificação de todos os dados pessoais coletados e processados
2. **Políticas internas**: Desenvolvimento de políticas e procedimentos específicos
3. **Treinamento**: Capacitação de equipes sobre proteção de dados
4. **Tecnologia**: Implementação de soluções técnicas para garantir segurança

### Impactos Financeiros

As multas previstas na LGPD podem chegar a R$ 50 milhões ou 2% do faturamento da empresa, o que torna essencial o investimento em conformidade.

## Conclusão

A LGPD representa não apenas uma obrigação legal, mas uma oportunidade para as empresas construírem maior confiança com seus clientes através do tratamento responsável de dados pessoais.`,
    excerpt: 'Uma análise detalhada sobre como a LGPD impacta as empresas brasileiras e os principais desafios de implementação.',
    readTime: '8 min'
  },
  {
    id: 2,
    title: 'O papel da mediação na resolução de conflitos trabalhistas',
    author: {
      name: 'Maria Fernanda Costa',
      email: 'maria.costa@email.com',
      studentId: 'EST002',
      photo: '/lovable-uploads/team/depoente 2.png',
      bio: 'Mestranda em Direito do Trabalho, pesquisadora em métodos alternativos de resolução de conflitos'
    },
    categories: ['resolucao'],
    submittedDate: '2025-01-16',
    status: 'approved',
    content: `A mediação tem se consolidado como um importante instrumento para a resolução de conflitos trabalhistas, oferecendo uma alternativa eficaz ao processo judicial tradicional.

## Vantagens da Mediação Trabalhista

A mediação trabalhista apresenta benefícios significativos tanto para empregadores quanto para empregados:

### Para os Empregados
- Rapidez na resolução do conflito
- Menor custo em comparação ao processo judicial
- Maior controle sobre o resultado
- Preservação da relação de trabalho quando possível

### Para os Empregadores
- Redução de custos com litígios
- Maior previsibilidade dos resultados
- Melhoria do clima organizacional
- Fortalecimento da imagem institucional

## Casos de Sucesso

Estudos demonstram que a mediação tem taxa de sucesso de aproximadamente 70% nos conflitos trabalhistas, sendo especialmente eficaz em casos de:

- Questões salariais
- Conflitos interpessoais
- Condições de trabalho
- Rescisões contratuais

## Desafios e Perspectivas

Apesar dos benefícios, a mediação trabalhista ainda enfrenta desafios como:

1. Falta de conhecimento sobre o instituto
2. Resistência cultural ao diálogo
3. Necessidade de capacitação de mediadores especializados

## Conclusão

A mediação representa uma evolução natural do sistema de resolução de conflitos trabalhistas, promovendo soluções mais céleres, econômicas e satisfatórias para todas as partes envolvidas.`,
    excerpt: 'Estudo sobre a eficácia da mediação em conflitos trabalhistas e seus benefícios para empregadores e empregados.',
    reviewNotes: 'Excelente análise. Aprovado para publicação com destaque na homepage.',
    publishedDate: '2025-01-17',
    readTime: '12 min',
    publishingConfig: {
      featuredImage: '/lovable-uploads/course-preview.jpg',
      thumbnailImage: '/lovable-uploads/course-preview.jpg',
      bannerImage: '/lovable-uploads/course-preview.jpg',
      socialImage: '/lovable-uploads/course-preview.jpg',
      imageColor: 'bg-gradient-to-br from-ejup-cyan/30 to-ejup-orange/30',
      highlightQuote: 'A mediação representa uma evolução natural do sistema de resolução de conflitos trabalhistas.',
      summary: 'Análise completa sobre os benefícios e desafios da mediação trabalhista no Brasil.',
      authorSpecialization: 'Especialista em Resolução de Conflitos',
      isFeatured: false,
      isSubFeatured: true,
      tags: ['Mediação', 'Direito do Trabalho', 'Resolução de Conflitos', 'ADR']
    }
  },
  {
    id: 3,
    title: 'Impactos da reforma tributária no setor de serviços',
    author: {
      name: 'Pedro Henrique Lima',
      email: 'pedro.lima@email.com',
      studentId: 'EST003',
      photo: '/lovable-uploads/team/depoente 3.png',
      bio: 'Bacharel em Direito, especialização em Direito Tributário'
    },
    categories: ['tributario', 'empresarial'],
    submittedDate: '2025-01-14',
    status: 'rejected',
    content: `A reforma tributária aprovada recentemente promete transformar significativamente o cenário fiscal brasileiro, especialmente no setor de serviços.

## Principais Mudanças

As principais alterações incluem:
- Criação de novos impostos
- Simplificação do sistema atual
- Impactos nos custos empresariais

## Análise Preliminar

O setor de serviços deverá se adaptar às novas regras tributárias...`,
    excerpt: 'Análise dos impactos da nova reforma tributária no setor de serviços.',
    reviewNotes: 'Artigo necessita de mais fundamentação teórica, fontes atualizadas e análise mais aprofundada dos impactos econômicos. Recomendo incluir dados estatísticos e estudos comparativos.',
    readTime: '6 min'
  },
  {
    id: 4,
    title: 'Compliance digital: desafios da era pós-pandemia',
    author: {
      name: 'Ana Carolina Ribeiro',
      email: 'ana.ribeiro@email.com',
      studentId: 'EST004',
      photo: '/lovable-uploads/team/instructor.png',
      bio: 'Estudante de Direito Digital, pesquisadora em compliance e transformação digital'
    },
    categories: ['digital', 'empresarial'],
    submittedDate: '2025-01-19',
    status: 'pending',
    content: `A pandemia de COVID-19 acelerou a transformação digital das empresas, trazendo novos desafios para os programas de compliance. Este artigo examina as principais questões enfrentadas pelas organizações na era pós-pandemia.

## Transformação Digital e Compliance

A migração forçada para o ambiente digital trouxe:

### Novos Riscos
- Segurança cibernética
- Proteção de dados em trabalho remoto
- Controles internos digitais
- Auditoria em ambiente virtual

### Oportunidades
- Automação de processos de compliance
- Monitoramento em tempo real
- Analytics para detecção de anomalias
- Treinamentos online

## Desafios Específicos

### Trabalho Remoto
O home office criou novos pontos de vulnerabilidade:
- Acesso a dados corporativos
- Controle de documentos
- Monitoramento de atividades
- Comunicação segura

### Digitalização de Processos
A necessidade de digitalizar processos antes manuais trouxe:
- Validação de identidade digital
- Assinatura eletrônica
- Trilha de auditoria digital
- Gestão de acessos

## Soluções Emergentes

As empresas têm adotado:

1. **Tecnologias de monitoramento**: Ferramentas de IA para detectar comportamentos anômalos
2. **Plataformas integradas**: Sistemas que centralizam controles de compliance
3. **Treinamento digital**: Programas de capacitação online interativos
4. **Automação**: Processos automatizados para reduzir erros humanos

## Conclusão

O compliance digital representa o futuro da gestão de riscos empresariais, exigindo adaptação constante às novas realidades tecnológicas e regulatórias.`,
    excerpt: 'Análise dos novos desafios de compliance enfrentados pelas empresas na era digital pós-pandemia.',
    readTime: '10 min'
  },
  {
    id: 5,
    title: 'Responsabilidade civil na economia digital',
    author: {
      name: 'Ricardo Almeida Silva',
      email: 'ricardo.silva@email.com',
      studentId: 'EST005',
      photo: '/lovable-uploads/team/depoente 1.png',
      bio: 'Doutorando em Direito Civil, especialista em responsabilidade civil digital'
    },
    categories: ['digital'],
    submittedDate: '2025-01-15',
    status: 'approved',
    content: `A economia digital trouxe novos paradigmas para a responsabilidade civil, exigindo adaptação dos institutos jurídicos tradicionais às realidades do mundo virtual.

## Novos Cenários de Responsabilidade

### Plataformas Digitais
As plataformas enfrentam questões sobre:
- Responsabilidade por conteúdo de terceiros
- Moderação de conteúdo
- Proteção do consumidor
- Dados pessoais

### Inteligência Artificial
A IA levanta questões sobre:
- Responsabilidade por decisões automatizadas
- Viés algorítmico
- Transparência e explicabilidade
- Accountability

## Marco Legal

O Marco Civil da Internet estabeleceu:
- Princípios da neutralidade de rede
- Proteção da privacidade
- Liberdade de expressão
- Responsabilidade dos provedores

### LGPD e Responsabilidade
A Lei Geral de Proteção de Dados trouxe:
- Responsabilidade objetiva por vazamentos
- Obrigação de notificação
- Direitos dos titulares
- Sanções administrativas

## Jurisprudência Emergente

Os tribunais têm enfrentado casos envolvendo:
- Direito ao esquecimento
- Fake news
- Cyberbullying
- Crimes digitais

## Perspectivas Futuras

### Tendências Legislativas
- Regulamentação de IA
- Lei de crimes cibernéticos
- Proteção de dados setorial
- Responsabilidade algorítmica

### Desafios Interpretativos
- Extraterritorialidade das normas
- Jurisdição competente
- Prova digital
- Execução internacional

## Conclusão

A responsabilidade civil na economia digital exige constante evolução jurisprudencial e legislativa para acompanhar o ritmo da inovação tecnológica.`,
    excerpt: 'Estudo sobre os novos paradigmas da responsabilidade civil na era digital e suas implicações jurídicas.',
    reviewNotes: 'Artigo bem fundamentado e atual. Aprovado para publicação com excelente qualidade técnica.',
    publishedDate: '2025-01-16',
    readTime: '14 min',
    publishingConfig: {
      featuredImage: '/lovable-uploads/course-preview.jpg',
      thumbnailImage: '/lovable-uploads/course-preview.jpg',
      bannerImage: '/lovable-uploads/course-preview.jpg',
      socialImage: '/lovable-uploads/course-preview.jpg',
      imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
      highlightQuote: 'A responsabilidade civil na economia digital exige constante evolução jurisprudencial e legislativa.',
      summary: 'Análise abrangente dos novos paradigmas da responsabilidade civil no ambiente digital.',
      authorSpecialization: 'Especialista em Direito Digital',
      isFeatured: false,
      isSubFeatured: false,
      tags: ['Responsabilidade Civil', 'Direito Digital', 'Tecnologia', 'IA', 'LGPD']
    }
  }
];

const mockPodcasts: Podcast[] = [
  {
    id: 1,
    title: 'Inovação no setor jurídico',
    description: 'Discussão aprofundada sobre como a tecnologia está transformando a advocacia e o futuro da profissão.',
    guests: ['Roberto Silva', 'Marina Costa'],
    guestsRoles: ['CEO da LegalTech Inc', 'Especialista em Transformação Digital'],
    categories: ['carreira', 'digital'],
    duration: '45 min',
    date: '2025-01-12',
    excerpt: 'Discussão sobre como a tecnologia está transformando a advocacia.',
    content: 'Conteúdo completo do episódio sobre inovação no setor jurídico...',
    highlightQuote: 'A tecnologia não substitui o advogado, mas potencializa suas capacidades.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailImage: '/lovable-uploads/course-preview.jpg',
    topics: ['Inovação', 'Tecnologia', 'Advocacia', 'Futuro'],
    relatedPodcasts: [2, 3],
    status: 'published',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
    socialImage: '/lovable-uploads/course-preview.jpg'
  },
  {
    id: 2,
    title: 'ESG e o papel dos departamentos jurídicos',
    description: 'Como os profissionais do direito podem contribuir para as iniciativas de sustentabilidade das empresas.',
    guests: ['Fernando Mendes', 'Júlia Castro'],
    guestsRoles: ['Especialista em Direito Ambiental', 'Consultora de Compliance'],
    categories: ['empresarial', 'sustentabilidade'],
    duration: '52 min',
    date: '2025-01-15',
    excerpt: 'Como os profissionais do direito podem contribuir para as iniciativas de sustentabilidade das empresas.',
    content: 'Conteúdo completo do episódio sobre ESG e departamentos jurídicos...',
    highlightQuote: 'ESG não é apenas compliance, é uma estratégia de negócio.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailImage: '/lovable-uploads/course-preview.jpg',
    topics: ['ESG', 'Sustentabilidade', 'Compliance', 'Governança'],
    relatedPodcasts: [1, 3],
    status: 'published',
    imageColor: 'bg-gradient-to-br from-ejup-cyan/30 to-ejup-orange/30',
    socialImage: '/lovable-uploads/course-preview.jpg'
  },
  {
    id: 3,
    title: 'Direito Digital e Inteligência Artificial',
    description: 'As implicações éticas e legais do uso de IA no direito.',
    guests: ['Dr. Carlos Mendes'],
    guestsRoles: ['Especialista em Direito Digital'],
    categories: ['digital'],
    duration: '38 min',
    date: '2025-01-08',
    excerpt: 'As implicações éticas e legais do uso de IA no direito.',
    content: 'Conteúdo completo do episódio sobre Direito Digital e IA...',
    highlightQuote: 'A IA deve ser uma ferramenta para amplificar a inteligência humana, não substituí-la.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailImage: '/lovable-uploads/course-preview.jpg',
    topics: ['Inteligência Artificial', 'Ética', 'Regulamentação', 'Tecnologia'],
    relatedPodcasts: [1, 2],
    status: 'draft',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-orange/30',
    socialImage: '/lovable-uploads/course-preview.jpg'
  }
];

const categories = [
  { id: 'empresarial', name: 'Dir. Empresarial' },
  { id: 'digital', name: 'Dir. Digital' },
  { id: 'resolucao', name: 'Resolução de Conflitos' },
  { id: 'tributario', name: 'Dir. Tributário' },
  { id: 'carreira', name: 'Carreira Jurídica' },
];

const ArticleManagement = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [studentArticles, setStudentArticles] = useState<StudentArticle[]>(mockStudentArticles);
  const [podcasts, setPodcasts] = useState<Podcast[]>(mockPodcasts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [availableCategories, setAvailableCategories] = useState([
    { id: 'empresarial', name: 'Direito Empresarial' },
    { id: 'digital', name: 'Direito Digital' },
    { id: 'resolucao', name: 'Resolução de Conflitos' },
    { id: 'trabalhista', name: 'Direito Trabalhista' },
    { id: 'tributario', name: 'Direito Tributário' },
    { id: 'constitucional', name: 'Direito Constitucional' },
    { id: 'administrativo', name: 'Direito Administrativo' },
    { id: 'civil', name: 'Direito Civil' },
    { id: 'penal', name: 'Direito Penal' },
    { id: 'minerario', name: 'Direito Minerário' },
    { id: 'processo-civil', name: 'Processo Civil' }
  ]);
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Estados para edição de podcast
  const [isEditPodcastDialogOpen, setIsEditPodcastDialogOpen] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);
  const [newPodcastCategory, setNewPodcastCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [selectKey, setSelectKey] = useState(0);
  
  // Estados para episódios relacionados
  const [relatedSearchTerm, setRelatedSearchTerm] = useState('');
  const [selectedRelatedCategory, setSelectedRelatedCategory] = useState('all');
  
  // Formulário de podcast
  const [podcastFormData, setPodcastFormData] = useState({
    title: '',
    description: '',
    guests: [] as string[],
    guestsRoles: [] as string[],
    categories: [] as string[],
    duration: '',
    date: '',
    excerpt: '',
    content: '',
    highlightQuote: '',
    videoUrl: '',
    thumbnailImage: '',
    topics: [] as string[],
    relatedPodcasts: [] as number[],
    status: 'draft' as 'published' | 'draft' | 'scheduled',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
    socialImage: ''
  });
  
  // Estados para busca de cursos
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [selectedCourseCategory, setSelectedCourseCategory] = useState('all');
  const [selectedInstructor, setSelectedInstructor] = useState('all');

  // Estados para gestão de submissões
  const [submissionSearchTerm, setSubmissionSearchTerm] = useState('');
  const [selectedSubmissionCategory, setSelectedSubmissionCategory] = useState('all');
  const [selectedSubmissionStatus, setSelectedSubmissionStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isViewSubmissionDialogOpen, setIsViewSubmissionDialogOpen] = useState(false);
  const [isEditSubmissionDialogOpen, setIsEditSubmissionDialogOpen] = useState(false);
  const [viewingSubmission, setViewingSubmission] = useState<StudentArticle | null>(null);
  const [editingSubmission, setEditingSubmission] = useState<StudentArticle | null>(null);
  
  // Estados para formulário de configurações de publicação
  const [publishingFormData, setPublishingFormData] = useState({
    featuredImage: '',
    thumbnailImage: '',
    bannerImage: '',
    socialImage: '',
    highlightQuote: '',
    summary: '',
    authorSpecialization: '',
    isFeatured: false,
    isSubFeatured: false,
    categories: [] as string[],
    tags: [] as string[],
    status: 'pending' as 'pending' | 'approved' | 'rejected'
  });
  
  const [newTag, setNewTag] = useState('');

  // Formulário de edição
  const [formData, setFormData] = useState({
    title: '',
    categories: [] as string[],
    readTime: '',
    date: '',
    summary: '',
    authorName: '',
    authorPhoto: '',
    authorSpecialization: '',
    content: '',
    excerpt: '',
    highlightQuote: '',
    imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-orange/30',
    featuredImage: '',
    thumbnailImage: '',
    bannerImage: '',
    socialImage: '',
    isFeatured: false,
    isSubFeatured: false,
    status: 'draft' as 'published' | 'draft' | 'scheduled',
    featuredCourses: [] as number[],
    featuredSponsors: [] as number[]
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(a => a.isFeatured);
  const subFeaturedArticles = articles.filter(a => a.isSubFeatured);
  const recentArticles = articles.filter(a => !a.isFeatured && !a.isSubFeatured);

  // Filtros para cursos
  const uniqueInstructors = [...new Set(mockCourses.map(course => course.instructor))];
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(courseSearchTerm.toLowerCase());
    const matchesCategory = selectedCourseCategory === 'all' || course.category === selectedCourseCategory;
    const matchesInstructor = selectedInstructor === 'all' || course.instructor === selectedInstructor;
    return matchesSearch && matchesCategory && matchesInstructor;
  });

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
            setFormData({
          title: article.title,
          categories: article.categories,
          readTime: article.readTime,
          date: article.date,
          summary: article.summary,
          authorName: article.author.name,
          authorPhoto: article.author.photo,
          authorSpecialization: article.author.specialization,
          content: article.content,
          excerpt: article.excerpt,
          highlightQuote: article.highlightQuote,
          imageColor: article.imageColor,
          featuredImage: article.images.featured,
          thumbnailImage: article.images.thumbnail,
          bannerImage: article.images.banner,
          socialImage: article.images.social,
          isFeatured: article.isFeatured,
          isSubFeatured: article.isSubFeatured,
          status: article.status,
          featuredCourses: article.featuredCourses,
          featuredSponsors: article.featuredSponsors
        });
    setIsEditDialogOpen(true);
  };

  const handleCreateArticle = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      categories: [],
      readTime: '',
      date: new Date().toISOString().split('T')[0],
      summary: '',
      authorName: '',
      authorPhoto: '',
      authorSpecialization: '',
      content: '',
      excerpt: '',
      highlightQuote: '',
      imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-orange/30',
      featuredImage: '',
      thumbnailImage: '',
      bannerImage: '',
      socialImage: '',
      isFeatured: false,
      isSubFeatured: false,
      status: 'draft',
      featuredCourses: [],
      featuredSponsors: []
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveArticle = () => {
    const articleData: Article = {
      id: editingArticle?.id || Date.now(),
      title: formData.title,
      categories: formData.categories,
      readTime: formData.readTime,
      date: formData.date,
      summary: formData.summary,
      author: {
        name: formData.authorName,
        photo: formData.authorPhoto,
        specialization: formData.authorSpecialization
      },
      content: formData.content,
      excerpt: formData.excerpt,
      highlightQuote: formData.highlightQuote,
      imageColor: formData.imageColor,
      images: {
        featured: formData.featuredImage,
        thumbnail: formData.thumbnailImage,
        banner: formData.bannerImage,
        social: formData.socialImage
      },
      isFeatured: formData.isFeatured,
      isSubFeatured: formData.isSubFeatured,
      status: formData.status,
      featuredCourses: formData.featuredCourses,
      featuredSponsors: formData.featuredSponsors
    };

    if (editingArticle) {
      setArticles(articles.map(a => a.id === editingArticle.id ? articleData : a));
    } else {
      setArticles([...articles, articleData]);
    }

    setIsEditDialogOpen(false);
    setEditingArticle(null);
  };

  const toggleFeatured = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, isFeatured: !article.isFeatured } : article
    ));
  };

  const toggleSubFeatured = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, isSubFeatured: !article.isSubFeatured } : article
    ));
  };

  const deleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      const categoryId = newCategoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const newCategory = {
        id: categoryId,
        name: newCategoryName.trim()
      };
      setAvailableCategories([...availableCategories, newCategory]);
      setFormData({...formData, categories: [...formData.categories, categoryId]});
      setNewCategoryName('');
      setIsNewCategoryDialogOpen(false);
    }
  };

  // Funções para podcasts
  const handleEditPodcast = (podcast: Podcast) => {
    setEditingPodcast(podcast);
    setPodcastFormData({
      title: podcast.title,
      description: podcast.description,
      guests: podcast.guests,
      guestsRoles: podcast.guestsRoles,
      categories: podcast.categories,
      duration: podcast.duration,
      date: podcast.date,
      excerpt: podcast.excerpt,
      content: podcast.content,
      highlightQuote: podcast.highlightQuote,
      videoUrl: podcast.videoUrl,
      thumbnailImage: podcast.thumbnailImage,
      topics: podcast.topics,
      relatedPodcasts: podcast.relatedPodcasts,
      status: podcast.status,
      imageColor: podcast.imageColor,
      socialImage: podcast.socialImage
    });
    // Reset filtros
    setRelatedSearchTerm('');
    setSelectedRelatedCategory('all');
    setShowNewCategoryInput(false);
    setNewPodcastCategory('');
    setIsEditPodcastDialogOpen(true);
  };

  const handleCreatePodcast = () => {
    setEditingPodcast(null);
    setPodcastFormData({
      title: '',
      description: '',
      guests: [],
      guestsRoles: [],
      categories: [],
      duration: '',
      date: new Date().toISOString().split('T')[0],
      excerpt: '',
      content: '',
      highlightQuote: '',
      videoUrl: '',
      thumbnailImage: '',
      topics: [],
      relatedPodcasts: [],
      status: 'draft',
      imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
      socialImage: ''
    });
    // Reset filtros
    setRelatedSearchTerm('');
    setSelectedRelatedCategory('all');
    setShowNewCategoryInput(false);
    setNewPodcastCategory('');
    setIsEditPodcastDialogOpen(true);
  };

  const handleSavePodcast = () => {
    const podcastData: Podcast = {
      id: editingPodcast?.id || Date.now(),
      title: podcastFormData.title,
      description: podcastFormData.description,
      guests: podcastFormData.guests,
      guestsRoles: podcastFormData.guestsRoles,
      categories: podcastFormData.categories,
      duration: podcastFormData.duration,
      date: podcastFormData.date,
      excerpt: podcastFormData.excerpt,
      content: podcastFormData.content,
      highlightQuote: podcastFormData.highlightQuote,
      videoUrl: podcastFormData.videoUrl,
      thumbnailImage: podcastFormData.thumbnailImage,
      topics: podcastFormData.topics,
      relatedPodcasts: podcastFormData.relatedPodcasts,
      status: podcastFormData.status,
      imageColor: podcastFormData.imageColor,
      socialImage: podcastFormData.socialImage
    };

    if (editingPodcast) {
      setPodcasts(podcasts.map(p => p.id === editingPodcast.id ? podcastData : p));
    } else {
      setPodcasts([...podcasts, podcastData]);
    }

    setIsEditPodcastDialogOpen(false);
    setEditingPodcast(null);
  };

  const deletePodcast = (id: number) => {
    setPodcasts(podcasts.filter(podcast => podcast.id !== id));
  };

  const handleCreatePodcastCategory = () => {
    if (newPodcastCategory.trim()) {
      const categoryId = newPodcastCategory.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const newCategory = {
        id: categoryId,
        name: newPodcastCategory.trim()
      };
      setAvailableCategories(prev => [...prev, newCategory]);
      setPodcastFormData(prev => ({...prev, categories: [...prev.categories, categoryId]}));
      setNewPodcastCategory('');
      setShowNewCategoryInput(false);
      setSelectKey(prev => prev + 1); // Force re-render do Select
    }
  };

  // Filtrar episódios relacionados
  const filteredRelatedPodcasts = podcasts.filter(podcast => {
    // Excluir o episódio atual
    if (podcast.id === editingPodcast?.id) return false;
    
    // Filtro por busca
    const matchesSearch = relatedSearchTerm === '' || 
      podcast.title.toLowerCase().includes(relatedSearchTerm.toLowerCase()) ||
      podcast.guests.some(guest => guest.toLowerCase().includes(relatedSearchTerm.toLowerCase()));
    
    // Filtro por categoria
    const matchesCategory = selectedRelatedCategory === 'all' || 
      podcast.categories.includes(selectedRelatedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Filtrar submissões de alunos
  const filteredSubmissions = studentArticles.filter(submission => {
    const matchesSearch = submissionSearchTerm === '' ||
      submission.title.toLowerCase().includes(submissionSearchTerm.toLowerCase()) ||
      submission.author.name.toLowerCase().includes(submissionSearchTerm.toLowerCase()) ||
      submission.author.studentId.toLowerCase().includes(submissionSearchTerm.toLowerCase());
    
    const matchesCategory = selectedSubmissionCategory === 'all' || 
      submission.categories.includes(selectedSubmissionCategory);
    
    const matchesStatus = selectedSubmissionStatus === 'all' || 
      submission.status === selectedSubmissionStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Ordenar submissões por data de submissão (mais recente primeiro)
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => 
    new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
  );

  // Implementar paginação
  const totalPages = Math.ceil(sortedSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubmissions = sortedSubmissions.slice(startIndex, endIndex);

  // Agrupar submissões por status (usando dados paginados)
  const pendingSubmissions = paginatedSubmissions.filter(s => s.status === 'pending');
  const approvedSubmissions = paginatedSubmissions.filter(s => s.status === 'approved');
  const rejectedSubmissions = paginatedSubmissions.filter(s => s.status === 'rejected');

  // Estatísticas globais (usando dados filtrados, não paginados)
  const totalPendingSubmissions = filteredSubmissions.filter(s => s.status === 'pending').length;
  const totalApprovedSubmissions = filteredSubmissions.filter(s => s.status === 'approved').length;
  const totalRejectedSubmissions = filteredSubmissions.filter(s => s.status === 'rejected').length;

  // Resetar página quando filtros mudarem
  React.useEffect(() => {
    setCurrentPage(1);
  }, [submissionSearchTerm, selectedSubmissionCategory, selectedSubmissionStatus]);

  // Funções para gestão de submissões
  const handleViewSubmission = (submission: StudentArticle) => {
    setViewingSubmission(submission);
    setIsViewSubmissionDialogOpen(true);
  };

  const handleEditSubmissionConfig = (submission: StudentArticle) => {
    setEditingSubmission(submission);
    // Carregar dados existentes no formulário
    setPublishingFormData({
      featuredImage: submission.publishingConfig?.featuredImage || '',
      thumbnailImage: submission.publishingConfig?.thumbnailImage || '',
      bannerImage: submission.publishingConfig?.bannerImage || '',
      socialImage: submission.publishingConfig?.socialImage || '',
      highlightQuote: submission.publishingConfig?.highlightQuote || '',
      summary: submission.publishingConfig?.summary || submission.excerpt,
      authorSpecialization: submission.publishingConfig?.authorSpecialization || '',
      isFeatured: submission.publishingConfig?.isFeatured || false,
      isSubFeatured: submission.publishingConfig?.isSubFeatured || false,
      categories: submission.categories || [],
      tags: submission.publishingConfig?.tags || [],
      status: submission.status
    });
    setIsEditSubmissionDialogOpen(true);
  };

  const handleApproveSubmission = (submissionId: number, publishingConfig?: any) => {
    setStudentArticles(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { 
            ...submission, 
            status: 'approved',
            publishedDate: new Date().toISOString().split('T')[0],
            publishingConfig: publishingConfig || submission.publishingConfig
          } 
        : submission
    ));
  };

  const handleRejectSubmission = (submissionId: number, reviewNotes: string) => {
    setStudentArticles(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, status: 'rejected', reviewNotes } 
        : submission
    ));
  };

  const handleUpdateReviewNotes = (submissionId: number, reviewNotes: string) => {
    setStudentArticles(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, reviewNotes } 
        : submission
    ));
  };

  const handleSavePublishingConfig = () => {
    if (!editingSubmission) return;
    
    setStudentArticles(prev => prev.map(submission => 
      submission.id === editingSubmission.id 
        ? { 
            ...submission,
            status: publishingFormData.status,
            categories: publishingFormData.categories,
            publishedDate: publishingFormData.status === 'approved' ? (submission.publishedDate || new Date().toISOString()) : undefined,
            publishingConfig: {
              ...publishingFormData,
              imageColor: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30'
            }
          } 
        : submission
    ));
    
    toast({
      title: "Configurações salvas",
      description: `Artigo ${publishingFormData.status === 'approved' ? 'aprovado' : publishingFormData.status === 'rejected' ? 'rejeitado' : 'marcado como pendente'} com sucesso.`,
    });
    
    setIsEditSubmissionDialogOpen(false);
    setEditingSubmission(null);
  };

  // Função para alterar status de artigo
  const handleChangeSubmissionStatus = (submissionId: number, newStatus: 'pending' | 'approved' | 'rejected', reviewNotes?: string) => {
    setStudentArticles(prev => prev.map(submission =>
      submission.id === submissionId
        ? { 
            ...submission, 
            status: newStatus,
            reviewNotes: reviewNotes || submission.reviewNotes,
            publishedDate: newStatus === 'approved' ? new Date().toISOString() : undefined
          }
        : submission
    ));
    
    const statusMessages = {
      'pending': 'Artigo movido para pendente',
      'approved': 'Artigo aprovado com sucesso',
      'rejected': 'Artigo rejeitado'
    };
    
    toast({
      title: "Status alterado",
      description: statusMessages[newStatus],
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Gestão de Conteúdo</h1>
            <p className="text-zinc-400 mt-1 text-xs">Gerencie artigos, podcasts e submissões de alunos</p>
          </div>
        </div>

        <Tabs defaultValue="articles" className="space-y-3">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="articles" className="text-sm">Artigos</TabsTrigger>
            <TabsTrigger value="podcasts" className="text-sm">🎧 Podcasts</TabsTrigger>
            <TabsTrigger value="submissions" className="text-sm">Submissões</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar artigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {availableCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateArticle} className="bg-ejup-orange hover:bg-ejup-orange/90">
                <Plus className="h-4 w-4 mr-2" />
                Novo Artigo
              </Button>
            </div>

            <div className="grid gap-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Artigo em Destaque ({featuredArticles.length})
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Artigo principal que aparece em destaque na página (máximo 1)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {featuredArticles.map(article => (
                      <div key={article.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={article.author.photo} />
                            <AvatarFallback className="text-xs">{article.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-sm leading-tight">{article.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                              <span>{article.author.name}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                              <span>•</span>
                              <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className="text-xs px-2 py-0">
                            {article.status === 'published' ? 'Pub' : 'Rascunho'}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFeatured(article.id)}
                            title="Remover do Destaque Principal"
                            className="h-6 w-6 p-0"
                          >
                            <StarOff className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditArticle(article)}
                            title="Editar"
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteArticle(article.id)}
                            title="Deletar"
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {featuredArticles.length === 0 && (
                      <p className="text-zinc-400 text-center py-8">Nenhum artigo em destaque</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Sub-Destaques ({subFeaturedArticles.length})</CardTitle>
                  <CardDescription className="text-xs">
                    Artigos que aparecem como cards menores abaixo do destaque principal (máximo 2)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {subFeaturedArticles.map(article => (
                      <div key={article.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={article.author.photo} />
                            <AvatarFallback className="text-xs">{article.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-sm leading-tight">{article.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                              <span>{article.author.name}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className="text-xs px-2 py-0">
                            {article.status === 'published' ? 'Pub' : 'Rascunho'}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleSubFeatured(article.id)}
                            title="Remover do Sub-Destaque"
                            className="h-6 w-6 p-0"
                          >
                            <StarOff className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditArticle(article)}
                            title="Editar"
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteArticle(article.id)}
                            title="Deletar"
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {subFeaturedArticles.length === 0 && (
                      <p className="text-zinc-400 text-center py-8">Nenhum sub-destaque definido</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Artigos Recentes ({recentArticles.length})</CardTitle>
                  <CardDescription className="text-xs">
                    Todos os demais artigos que não estão em destaque
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentArticles.map(article => (
                      <div key={article.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={article.author.photo} />
                            <AvatarFallback className="text-xs">{article.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-sm leading-tight">{article.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                              <span>{article.categories.map(catId => categories.find(c => c.id === catId)?.name).join(', ')}</span>
                              <span>•</span>
                              <span>{article.author.name}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className="text-xs px-2 py-0">
                            {article.status === 'published' ? 'Pub' : 'Rascunho'}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFeatured(article.id)}
                            title="Promover para Destaque Principal"
                            className="h-6 w-6 p-0 bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/20"
                          >
                            <Star className="h-3 w-3 text-yellow-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleSubFeatured(article.id)}
                            title="Promover para Sub-Destaque"
                            className="h-6 w-6 p-0 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20"
                          >
                            <Star className="h-3 w-3 text-blue-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditArticle(article)}
                            title="Editar"
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteArticle(article.id)}
                            title="Deletar"
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {recentArticles.length === 0 && (
                      <p className="text-zinc-400 text-center py-8">Nenhum artigo recente</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="podcasts" className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar podcasts..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreatePodcast} className="bg-ejup-orange hover:bg-ejup-orange/90">
                <Plus className="h-4 w-4 mr-2" />
                Novo Podcast
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Episódios de Podcast ({podcasts.length})</CardTitle>
                <CardDescription className="text-xs">
                  Gerencie todos os episódios de podcast da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {podcasts.map(podcast => (
                    <div key={podcast.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <div className={`h-6 w-6 ${podcast.imageColor} rounded flex items-center justify-center`}>
                          <div className="w-3 h-3 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm leading-tight">{podcast.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                            <span>{podcast.guests.join(', ')}</span>
                            <span>•</span>
                            <span>{podcast.categories.map(catId => categories.find(c => c.id === catId)?.name).join(', ')}</span>
                            <span>•</span>
                            <span>{podcast.duration}</span>
                            <span>•</span>
                            <span>{new Date(podcast.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant={podcast.status === 'published' ? 'default' : 'secondary'} className="text-xs px-2 py-0">
                          {podcast.status === 'published' ? 'Pub' : 'Rascunho'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPodcast(podcast)}
                          title="Editar"
                          className="h-6 w-6 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deletePodcast(podcast.id)}
                          title="Deletar"
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {podcasts.length === 0 && (
                    <p className="text-zinc-400 text-center py-6 text-xs">Nenhum podcast cadastrado</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            {/* Filtros de Submissões */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar submissões..."
                    value={submissionSearchTerm}
                    onChange={(e) => setSubmissionSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedSubmissionCategory} onValueChange={setSelectedSubmissionCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {availableCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedSubmissionStatus} onValueChange={setSelectedSubmissionStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="approved">Aprovado</SelectItem>
                      <SelectItem value="rejected">Rejeitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">{totalPendingSubmissions}</p>
                      <p className="text-sm text-zinc-600">Análise Pendente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{totalApprovedSubmissions}</p>
                      <p className="text-sm text-zinc-600">Aprovado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <XCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{totalRejectedSubmissions}</p>
                      <p className="text-sm text-zinc-600">Rejeitado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Submissões */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" />
                  Submissões de Artigos ({filteredSubmissions.length})
                </CardTitle>
                <CardDescription>
                  Gerencie submissões de artigos enviados pelos estudantes da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paginatedSubmissions.map(submission => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-800/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={submission.author.photo} />
                          <AvatarFallback className="bg-gradient-to-br from-ejup-cyan to-ejup-orange text-white font-semibold">
                            {submission.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-sm leading-tight">{submission.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                            <span className="font-medium">{submission.author.name}</span>
                            <span>•</span>
                            <span>{submission.author.studentId}</span>
                            <span>•</span>
                            <span>{submission.categories.map(catId => availableCategories.find(c => c.id === catId)?.name).join(', ')}</span>
                            <span>•</span>
                            <span>{new Date(submission.submittedDate).toLocaleDateString('pt-BR')}</span>
                            {submission.readTime && (
                              <>
                                <span>•</span>
                                <span>{submission.readTime}</span>
                              </>
                            )}
                          </div>
                          {submission.excerpt && (
                            <p className="text-xs text-zinc-600 mt-1 max-w-md truncate">{submission.excerpt}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            submission.status === 'approved' ? 'default' : 
                            submission.status === 'rejected' ? 'destructive' : 'secondary'
                          } 
                          className="text-xs"
                        >
                          {submission.status === 'pending' ? '⏳ Pendente' : 
                           submission.status === 'approved' ? '✅ Aprovado' : '❌ Rejeitado'}
                        </Badge>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewSubmission(submission)}
                          title="Visualizar Artigo"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSubmissionConfig(submission)}
                          title="Editar Configurações de Publicação"
                          className="h-8 w-8 p-0"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredSubmissions.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                      <p className="text-zinc-500 text-sm">Nenhuma submissão encontrada</p>
                      <p className="text-zinc-400 text-xs mt-1">
                        {submissionSearchTerm || selectedSubmissionCategory !== 'all' || selectedSubmissionStatus !== 'all' 
                          ? 'Tente ajustar os filtros de busca' 
                          : 'Os artigos enviados pelos alunos aparecerão aqui'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Controles de Paginação */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400">
                      Mostrando {startIndex + 1}-{Math.min(endIndex, filteredSubmissions.length)} de {filteredSubmissions.length} submissões
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Anterior
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => {
                            // Mostra sempre a primeira página, última página, página atual e páginas adjacentes
                            return page === 1 || 
                                   page === totalPages || 
                                   Math.abs(page - currentPage) <= 1;
                          })
                          .map((page, index, array) => {
                            // Adiciona "..." se há uma lacuna entre as páginas
                            const prevPage = index > 0 ? array[index - 1] : null;
                            const showEllipsis = prevPage && page - prevPage > 1;
                            
                            return (
                              <div key={page} className="flex items-center gap-1">
                                {showEllipsis && (
                                  <span className="text-gray-400 px-1">...</span>
                                )}
                                <Button
                                  variant={currentPage === page ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setCurrentPage(page)}
                                  className={currentPage === page 
                                    ? "bg-ejup-orange hover:bg-ejup-orange/90 text-white" 
                                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                                  }
                                >
                                  {page}
                                </Button>
                              </div>
                            );
                          })}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Próxima
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

        {/* Dialog de Edição de Artigo */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-gray-900">
            <DialogHeader className="border-b border-gray-700 pb-4">
              <DialogTitle className="text-2xl font-bold text-white">
                {editingArticle ? 'Editar Artigo' : 'Novo Artigo'}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Preencha todos os campos para criar ou editar o artigo. Todas as informações aqui correspondem ao que aparece na página pública.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-8 py-6">
              {/* Informações Básicas */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">📝 Informações Básicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300 font-medium">Título do Artigo</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Digite o título do artigo"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categories" className="text-gray-300 font-medium">Categorias (Múltipla Seleção)</Label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Select 
                          value="" 
                          onValueChange={(value) => {
                            if (value && !formData.categories.includes(value)) {
                              setFormData({...formData, categories: [...formData.categories, value]});
                            }
                          }}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white flex-1">
                            <SelectValue placeholder="Selecione as categorias..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCategories
                              .filter(category => !formData.categories.includes(category.id))
                              .map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            {availableCategories.filter(category => !formData.categories.includes(category.id)).length === 0 && (
                              <SelectItem value="no-more" disabled>
                                Todas as categorias já foram selecionadas
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsNewCategoryDialogOpen(true)}
                          className="whitespace-nowrap border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          + Nova
                        </Button>
                      </div>
                      
                      {formData.categories.length > 0 && (
                        <div className="p-3 bg-gray-700/50 rounded border border-gray-600">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-300">Categorias Selecionadas:</p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setFormData({...formData, categories: []})}
                              className="text-xs text-gray-400 hover:text-white h-6 px-2"
                            >
                              Limpar todas
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {formData.categories.map(categoryId => {
                              const category = availableCategories.find(c => c.id === categoryId);
                              return category ? (
                                <div key={categoryId} className="flex items-center gap-1 bg-ejup-orange/20 text-ejup-orange px-2 py-1 rounded text-xs">
                                  <span>{category.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => setFormData({
                                      ...formData, 
                                      categories: formData.categories.filter(id => id !== categoryId)
                                    })}
                                    className="hover:text-white ml-1"
                                  >
                                    ×
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metadados */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">⏱️ Metadados</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="readTime" className="text-gray-300 font-medium">Tempo de Leitura</Label>
                    <Input
                      id="readTime"
                      value={formData.readTime}
                      onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                      placeholder="ex: 5 min"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-300 font-medium">Data de Publicação</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-gray-300 font-medium">Status</Label>
                    <Select value={formData.status} onValueChange={(value: 'published' | 'draft' | 'scheduled') => setFormData({...formData, status: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Rascunho</SelectItem>
                        <SelectItem value="published">Publicado</SelectItem>
                        <SelectItem value="scheduled">Agendado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Conteúdo Textual */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">📄 Conteúdo Textual</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="summary" className="text-gray-300 font-medium">Resumo do Artigo</Label>
                    <Textarea
                      id="summary"
                      value={formData.summary}
                      onChange={(e) => setFormData({...formData, summary: e.target.value})}
                      placeholder="Breve resumo do que o usuário irá aprender com este artigo"
                      rows={3}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-gray-300 font-medium">Excerpt (Texto de Prévia)</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      placeholder="Texto que aparece no card do artigo"
                      rows={2}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="highlightQuote" className="text-gray-300 font-medium">Frase em Destaque</Label>
                    <Textarea
                      id="highlightQuote"
                      value={formData.highlightQuote}
                      onChange={(e) => setFormData({...formData, highlightQuote: e.target.value})}
                      placeholder="Frase que aparece destacada na página do artigo (abaixo dos patrocinadores)"
                      rows={2}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400">Esta frase aparece em destaque na página do artigo, logo abaixo da seção de patrocinadores</p>
                  </div>
                </div>
              </div>

              {/* Informações do Autor */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">👤 Informações do Autor</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="authorName" className="text-gray-300 font-medium">Nome do Autor</Label>
                      <Input
                        id="authorName"
                        value={formData.authorName}
                        onChange={(e) => setFormData({...formData, authorName: e.target.value})}
                        placeholder="Nome completo do autor"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authorSpecialization" className="text-gray-300 font-medium">Especialização</Label>
                      <Input
                        id="authorSpecialization"
                        value={formData.authorSpecialization}
                        onChange={(e) => setFormData({...formData, authorSpecialization: e.target.value})}
                        placeholder="ex: Especialista em Direito Empresarial"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authorPhoto" className="text-gray-300 font-medium">URL da Foto do Autor</Label>
                    <Input
                      id="authorPhoto"
                      value={formData.authorPhoto}
                      onChange={(e) => setFormData({...formData, authorPhoto: e.target.value})}
                      placeholder="/lovable-uploads/team/instructor.png"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400">Esta foto aparece na página do artigo junto com o nome e especialização</p>
                  </div>
                </div>
              </div>

              {/* Conteúdo Principal */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">📝 Conteúdo Principal</h3>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-gray-300 font-medium">Conteúdo do Artigo</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Conteúdo completo do artigo (suporte a Markdown)"
                    rows={12}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <p className="text-xs text-gray-400">Este é o conteúdo principal que aparece na página do artigo. Suporta formatação Markdown.</p>
                </div>
              </div>

              {/* Imagens do Artigo */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">🖼️ Imagens do Artigo</h3>
                <p className="text-sm text-gray-300 mb-4">Configure todas as imagens que serão usadas em diferentes contextos do artigo</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="featuredImage" className="text-gray-300 font-medium">Imagem Principal</Label>
                    <Input
                      id="featuredImage"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                      placeholder="/lovable-uploads/course-preview.jpg"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400">Imagem principal que aparece no topo da página do artigo (1200x600px recomendado)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnailImage" className="text-gray-300 font-medium">Miniatura</Label>
                    <Input
                      id="thumbnailImage"
                      value={formData.thumbnailImage}
                      onChange={(e) => setFormData({...formData, thumbnailImage: e.target.value})}
                      placeholder="/lovable-uploads/course-preview.jpg"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400">Imagem pequena para cards e listagens (400x300px recomendado)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bannerImage" className="text-gray-300 font-medium">Banner</Label>
                    <Input
                      id="bannerImage"
                      value={formData.bannerImage}
                      onChange={(e) => setFormData({...formData, bannerImage: e.target.value})}
                      placeholder="/lovable-uploads/course-preview.jpg"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400">Banner largo para header da página (1920x400px recomendado)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialImage" className="text-gray-300 font-medium">Compartilhamento Social</Label>
                    <Input
                      id="socialImage"
                      value={formData.socialImage}
                      onChange={(e) => setFormData({...formData, socialImage: e.target.value})}
                      placeholder="/lovable-uploads/course-preview.jpg"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400">Imagem para redes sociais e WhatsApp (1200x630px recomendado)</p>
                  </div>
                </div>
              </div>

              {/* Configurações de Destaque */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">⭐ Configurações de Destaque</h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-300">Defina onde este artigo aparecerá na página principal:</p>
                  <div className="flex gap-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({...formData, isFeatured: e.target.checked, isSubFeatured: e.target.checked ? false : formData.isSubFeatured})}
                        className="w-4 h-4 text-ejup-orange"
                      />
                      <div>
                        <span className="text-sm font-medium text-white">Artigo em Destaque Principal</span>
                        <p className="text-xs text-gray-400">Aparece como o artigo principal (máximo 1)</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isSubFeatured}
                        onChange={(e) => setFormData({...formData, isSubFeatured: e.target.checked, isFeatured: e.target.checked ? false : formData.isFeatured})}
                        className="w-4 h-4 text-ejup-orange"
                      />
                      <div>
                        <span className="text-sm font-medium text-white">Sub-Destaque</span>
                        <p className="text-xs text-gray-400">Aparece nos artigos secundários (máximo 2)</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Patrocinadores em Destaque */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">🏢 Patrocinadores em Destaque</h3>
                <p className="text-sm text-gray-300 mb-4">Selecione os patrocinadores que aparecerão na página deste artigo (seção "Patrocinadores")</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {mockSponsors.filter(sponsor => sponsor.status === 'active').map(sponsor => (
                    <div key={sponsor.id} className="flex items-center space-x-3 p-3 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.featuredSponsors.includes(sponsor.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, featuredSponsors: [...formData.featuredSponsors, sponsor.id]});
                          } else {
                            setFormData({...formData, featuredSponsors: formData.featuredSponsors.filter(id => id !== sponsor.id)});
                          }
                        }}
                        className="w-4 h-4 text-ejup-orange"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <img 
                          src={sponsor.logo} 
                          alt={sponsor.name}
                          className="w-8 h-8 object-contain bg-white rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-white leading-tight">{sponsor.name}</h4>
                          <p className="text-xs text-gray-400">{sponsor.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {mockSponsors.filter(sponsor => sponsor.status === 'active').length === 0 && (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-gray-400 text-sm">Nenhum patrocinador ativo encontrado</p>
                    </div>
                  )}
                </div>

                {/* Patrocinadores Selecionados */}
                {formData.featuredSponsors.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                    <h5 className="text-sm font-medium text-white mb-2">
                      ✅ Patrocinadores Selecionados ({formData.featuredSponsors.length})
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {formData.featuredSponsors.map(sponsorId => {
                        const sponsor = mockSponsors.find(s => s.id === sponsorId);
                        return sponsor ? (
                          <div key={sponsorId} className="flex items-center gap-2 bg-ejup-orange/20 text-ejup-orange px-2 py-1 rounded text-xs">
                            <img 
                              src={sponsor.logo} 
                              alt={sponsor.name}
                              className="w-4 h-4 object-contain bg-white rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                            <span>{sponsor.name}</span>
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData, 
                                featuredSponsors: formData.featuredSponsors.filter(id => id !== sponsorId)
                              })}
                              className="hover:text-white"
                            >
                              ×
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Cursos em Destaque */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">🎓 Cursos em Destaque</h3>
                <p className="text-sm text-gray-300 mb-4">Selecione os cursos que aparecerão em destaque na página deste artigo (seção "Cursos relacionados")</p>
                
                {/* Filtros de Busca */}
                <div className="mb-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <h4 className="text-sm font-medium text-white mb-3">🔍 Buscar e Filtrar Cursos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-300">Buscar por nome ou instrutor</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                        <Input
                          placeholder="Digite para buscar..."
                          value={courseSearchTerm}
                          onChange={(e) => setCourseSearchTerm(e.target.value)}
                          className="pl-8 bg-gray-600 border-gray-500 text-white placeholder:text-gray-400 text-sm h-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-300">Categoria</Label>
                      <Select value={selectedCourseCategory} onValueChange={setSelectedCourseCategory}>
                        <SelectTrigger className="bg-gray-600 border-gray-500 text-white text-sm h-8">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as categorias</SelectItem>
                          {availableCategories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-300">Instrutor</Label>
                      <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
                        <SelectTrigger className="bg-gray-600 border-gray-500 text-white text-sm h-8">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os instrutores</SelectItem>
                          {uniqueInstructors.map(instructor => (
                            <SelectItem key={instructor} value={instructor}>
                              {instructor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {(courseSearchTerm || selectedCourseCategory !== 'all' || selectedInstructor !== 'all') && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {filteredCourses.length} curso(s) encontrado(s)
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCourseSearchTerm('');
                          setSelectedCourseCategory('all');
                          setSelectedInstructor('all');
                        }}
                        className="text-xs text-gray-400 hover:text-white h-6 px-2"
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  )}
                </div>

                {/* Lista de Cursos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {filteredCourses.map(course => (
                    <div key={course.id} className="flex items-center space-x-3 p-3 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.featuredCourses.includes(course.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, featuredCourses: [...formData.featuredCourses, course.id]});
                          } else {
                            setFormData({...formData, featuredCourses: formData.featuredCourses.filter(id => id !== course.id)});
                          }
                        }}
                        className="w-4 h-4 text-ejup-orange"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white leading-tight">{course.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <span>{course.instructor}</span>
                          <span>•</span>
                          <span>{availableCategories.find(c => c.id === course.category)?.name || course.category}</span>
                          <span>•</span>
                          <span>R$ {course.price}</span>
                          <span>•</span>
                          <span>⭐ {course.rating}</span>
                          <span>•</span>
                          <span>{course.students} alunos</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredCourses.length === 0 && (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-gray-400 text-sm">Nenhum curso encontrado com os filtros aplicados</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCourseSearchTerm('');
                          setSelectedCourseCategory('all');
                          setSelectedInstructor('all');
                        }}
                        className="text-ejup-orange hover:text-ejup-orange/80 mt-2"
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  )}
                </div>

                {/* Cursos Selecionados */}
                {formData.featuredCourses.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                    <h5 className="text-sm font-medium text-white mb-2">
                      ✅ Cursos Selecionados ({formData.featuredCourses.length})
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {formData.featuredCourses.map(courseId => {
                        const course = mockCourses.find(c => c.id === courseId);
                        return course ? (
                          <div key={courseId} className="flex items-center gap-2 bg-ejup-orange/20 text-ejup-orange px-2 py-1 rounded text-xs">
                            <span>{course.title}</span>
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData, 
                                featuredCourses: formData.featuredCourses.filter(id => id !== courseId)
                              })}
                              className="hover:text-white"
                            >
                              ×
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
                className="px-6 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveArticle} 
                className="bg-ejup-orange hover:bg-ejup-orange/90 px-6"
              >
                {editingArticle ? '✅ Salvar Alterações' : '➕ Criar Artigo'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog de Nova Categoria */}
        <Dialog open={isNewCategoryDialogOpen} onOpenChange={setIsNewCategoryDialogOpen}>
          <DialogContent className="max-w-md bg-gray-900">
            <DialogHeader className="border-b border-gray-700 pb-4">
              <DialogTitle className="text-xl font-bold text-white">
                Nova Categoria
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Digite o nome da nova categoria para artigos
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="space-y-2">
                <Label htmlFor="newCategoryName" className="text-gray-300 font-medium">Nome da Categoria</Label>
                <Input
                  id="newCategoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="ex: Direito Trabalhista"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateCategory()}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-700 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsNewCategoryDialogOpen(false);
                  setNewCategoryName('');
                }}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateCategory}
                disabled={!newCategoryName.trim()}
                className="bg-ejup-orange hover:bg-ejup-orange/90"
              >
                ➕ Criar Categoria
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog de Edição de Podcast */}
        <Dialog 
          open={isEditPodcastDialogOpen} 
          onOpenChange={(open) => {
            if (!open) {
              // Reset filtros ao fechar
              setRelatedSearchTerm('');
              setSelectedRelatedCategory('all');
              setShowNewCategoryInput(false);
              setNewPodcastCategory('');
            }
            setIsEditPodcastDialogOpen(open);
          }}
        >
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-gray-900">
            <DialogHeader className="border-b border-gray-700 pb-4">
              <DialogTitle className="text-2xl font-bold text-white">
                {editingPodcast ? 'Editar Podcast' : 'Novo Podcast'}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Configure todas as informações do episódio que aparecerão na página pública.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-8 py-6">
              {/* Informações Básicas */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">🎧 Informações Básicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="podcastTitle" className="text-gray-300 font-medium">Título do Episódio *</Label>
                    <Input
                      id="podcastTitle"
                      value={podcastFormData.title}
                      onChange={(e) => setPodcastFormData({...podcastFormData, title: e.target.value})}
                      placeholder="Ex: O futuro da advocacia na era digital"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="podcastDuration" className="text-gray-300 font-medium">Duração *</Label>
                    <Input
                      id="podcastDuration"
                      value={podcastFormData.duration}
                      onChange={(e) => setPodcastFormData({...podcastFormData, duration: e.target.value})}
                      placeholder="Ex: 45 min"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="podcastDescription" className="text-gray-300 font-medium">Descrição Completa *</Label>
                  <Textarea
                    id="podcastDescription"
                    value={podcastFormData.description}
                    onChange={(e) => setPodcastFormData({...podcastFormData, description: e.target.value})}
                    placeholder="Descrição detalhada do que será abordado no episódio..."
                    rows={3}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="podcastDate" className="text-gray-300 font-medium">Data de Publicação *</Label>
                    <Input
                      id="podcastDate"
                      type="date"
                      value={podcastFormData.date}
                      onChange={(e) => setPodcastFormData({...podcastFormData, date: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="podcastStatus" className="text-gray-300 font-medium">Status</Label>
                    <Select value={podcastFormData.status} onValueChange={(value: 'published' | 'draft' | 'scheduled') => setPodcastFormData({...podcastFormData, status: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Rascunho</SelectItem>
                        <SelectItem value="published">Publicado</SelectItem>
                        <SelectItem value="scheduled">Agendado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Vídeo e Mídia */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">📹 Vídeo e Mídia</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="podcastVideoUrl" className="text-gray-300 font-medium">URL do YouTube *</Label>
                    <Input
                      id="podcastVideoUrl"
                      value={podcastFormData.videoUrl}
                      onChange={(e) => setPodcastFormData({...podcastFormData, videoUrl: e.target.value})}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400">URL completa do vídeo no YouTube</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="podcastThumbnail" className="text-gray-300 font-medium">Imagem Thumbnail</Label>
                      <Input
                        id="podcastThumbnail"
                        value={podcastFormData.thumbnailImage}
                        onChange={(e) => setPodcastFormData({...podcastFormData, thumbnailImage: e.target.value})}
                        placeholder="/lovable-uploads/course-preview.jpg"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                      <p className="text-xs text-gray-400">Recomendado: 800x600px (4:3) ou 1200x800px</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="podcastSocialImage" className="text-gray-300 font-medium">Imagem Social</Label>
                      <Input
                        id="podcastSocialImage"
                        value={podcastFormData.socialImage}
                        onChange={(e) => setPodcastFormData({...podcastFormData, socialImage: e.target.value})}
                        placeholder="/lovable-uploads/course-preview.jpg"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                      <p className="text-xs text-gray-400">Para compartilhamento (1200x630px - formato Facebook/LinkedIn)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Convidados */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">👥 Convidados</h3>
                <p className="text-sm text-gray-300 mb-4">Adicione os convidados e suas respectivas funções/especialidades</p>
                
                <div className="space-y-3">
                  {podcastFormData.guests.map((guest, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-end">
                      <Input
                        value={guest}
                        onChange={(e) => {
                          const newGuests = [...podcastFormData.guests];
                          newGuests[index] = e.target.value;
                          setPodcastFormData({...podcastFormData, guests: newGuests});
                        }}
                        placeholder="Nome do convidado"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={podcastFormData.guestsRoles[index] || ''}
                          onChange={(e) => {
                            const newRoles = [...podcastFormData.guestsRoles];
                            newRoles[index] = e.target.value;
                            setPodcastFormData({...podcastFormData, guestsRoles: newRoles});
                          }}
                          placeholder="Especialização/Cargo"
                          className="bg-gray-700 border-gray-600 text-white flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newGuests = podcastFormData.guests.filter((_, i) => i !== index);
                            const newRoles = podcastFormData.guestsRoles.filter((_, i) => i !== index);
                            setPodcastFormData({...podcastFormData, guests: newGuests, guestsRoles: newRoles});
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPodcastFormData({
                        ...podcastFormData, 
                        guests: [...podcastFormData.guests, ''],
                        guestsRoles: [...podcastFormData.guestsRoles, '']
                      });
                    }}
                    className="border-gray-600 text-gray-300"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Convidado
                  </Button>
                </div>
              </div>

              {/* Categorias e Topics */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">🏷️ Categorização</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-gray-300 font-medium">Categorias Jurídicas</Label>
                    <div className="space-y-2">
                      <Select 
                        key={selectKey}
                        value={undefined}
                        onValueChange={(value) => {
                          if (value === 'create-new') {
                            setShowNewCategoryInput(true);
                          } else if (value && !podcastFormData.categories.includes(value)) {
                            setPodcastFormData({...podcastFormData, categories: [...podcastFormData.categories, value]});
                          }
                        }}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Selecione as categorias..." />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCategories
                            .filter(category => !podcastFormData.categories.includes(category.id))
                            .map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          <SelectItem value="create-new" className="text-ejup-orange font-medium">
                            ➕ Criar Nova Categoria
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Input para nova categoria */}
                      {showNewCategoryInput && (
                        <div className="flex gap-2 p-3 bg-gray-700 border border-gray-600 rounded-lg">
                          <Input
                            value={newPodcastCategory}
                            onChange={(e) => setNewPodcastCategory(e.target.value)}
                            placeholder="Nome da nova categoria"
                            className="bg-gray-600 border-gray-500 text-white flex-1"
                            onKeyPress={(e) => e.key === 'Enter' && handleCreatePodcastCategory()}
                          />
                          <Button
                            type="button"
                            onClick={handleCreatePodcastCategory}
                            disabled={!newPodcastCategory.trim()}
                            className="bg-ejup-orange hover:bg-ejup-orange/90 px-4"
                          >
                            ✅
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                              setShowNewCategoryInput(false);
                              setNewPodcastCategory('');
                            }}
                            className="text-gray-400 hover:text-white px-2"
                          >
                            ✕
                          </Button>
                        </div>
                      )}
                      
                      {podcastFormData.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {podcastFormData.categories.map(categoryId => {
                            const category = availableCategories.find(c => c.id === categoryId);
                            return category ? (
                              <div key={categoryId} className="flex items-center gap-1 bg-ejup-orange/20 text-ejup-orange px-2 py-1 rounded text-xs">
                                <span>{category.name}</span>
                                <button
                                  type="button"
                                  onClick={() => setPodcastFormData({
                                    ...podcastFormData, 
                                    categories: podcastFormData.categories.filter(id => id !== categoryId)
                                  })}
                                  className="hover:text-white"
                                >
                                  ×
                                </button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-300 font-medium">Topics/Tags</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Adicionar topic..."
                          className="bg-gray-700 border-gray-600 text-white flex-1"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const value = (e.target as HTMLInputElement).value.trim();
                              if (value && !podcastFormData.topics.includes(value)) {
                                setPodcastFormData({...podcastFormData, topics: [...podcastFormData.topics, value]});
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                      </div>
                      
                      {podcastFormData.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {podcastFormData.topics.map((topic, index) => (
                            <div key={index} className="flex items-center gap-1 bg-ejup-cyan/20 text-ejup-cyan px-2 py-1 rounded text-xs">
                              <span>{topic}</span>
                              <button
                                type="button"
                                onClick={() => setPodcastFormData({
                                  ...podcastFormData, 
                                  topics: podcastFormData.topics.filter((_, i) => i !== index)
                                })}
                                className="hover:text-white"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteúdo Textual */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">📝 Conteúdo Textual</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="podcastExcerpt" className="text-gray-300 font-medium">Excerpt (Resumo)</Label>
                    <Textarea
                      id="podcastExcerpt"
                      value={podcastFormData.excerpt}
                      onChange={(e) => setPodcastFormData({...podcastFormData, excerpt: e.target.value})}
                      placeholder="Resumo breve para cards e listagens"
                      rows={2}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="podcastHighlightQuote" className="text-gray-300 font-medium">Frase em Destaque</Label>
                    <Textarea
                      id="podcastHighlightQuote"
                      value={podcastFormData.highlightQuote}
                      onChange={(e) => setPodcastFormData({...podcastFormData, highlightQuote: e.target.value})}
                      placeholder="Frase que aparece destacada na página do episódio"
                      rows={2}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="podcastContent" className="text-gray-300 font-medium">Resumo do Conteúdo</Label>
                    <Textarea
                      id="podcastContent"
                      value={podcastFormData.content}
                      onChange={(e) => setPodcastFormData({...podcastFormData, content: e.target.value})}
                      placeholder="Resumo detalhado dos principais tópicos abordados no episódio..."
                      rows={6}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-400">Resumo dos principais pontos discutidos que aparecerá na página do episódio</p>
                  </div>
                </div>
              </div>

              {/* Episódios Relacionados */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">🔗 Episódios Relacionados</h3>
                <p className="text-sm text-gray-300 mb-4">Selecione outros episódios que aparecerão como sugestões</p>
                
                {/* Filtros para episódios relacionados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-300">Pesquisar Episódio</Label>
                    <Input
                      value={relatedSearchTerm}
                      onChange={(e) => setRelatedSearchTerm(e.target.value)}
                      placeholder="Buscar por título ou convidado..."
                      className="bg-gray-600 border-gray-500 text-white text-sm h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-300">Filtrar por Categoria</Label>
                    <Select value={selectedRelatedCategory} onValueChange={setSelectedRelatedCategory}>
                      <SelectTrigger className="bg-gray-600 border-gray-500 text-white text-sm h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {availableCategories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Filtros ativos */}
                {(relatedSearchTerm || selectedRelatedCategory !== 'all') && (
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {filteredRelatedPodcasts.length} episódio(s) encontrado(s)
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setRelatedSearchTerm('');
                        setSelectedRelatedCategory('all');
                      }}
                      className="text-xs text-gray-400 hover:text-white h-6 px-2"
                    >
                      Limpar filtros
                    </Button>
                  </div>
                )}
                
                {/* Lista de episódios */}
                <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                  {filteredRelatedPodcasts.length > 0 ? (
                    filteredRelatedPodcasts.map(podcast => (
                      <div key={podcast.id} className="flex items-center space-x-3 p-3 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors">
                        <input
                          type="checkbox"
                          checked={podcastFormData.relatedPodcasts.includes(podcast.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPodcastFormData({...podcastFormData, relatedPodcasts: [...podcastFormData.relatedPodcasts, podcast.id]});
                            } else {
                              setPodcastFormData({...podcastFormData, relatedPodcasts: podcastFormData.relatedPodcasts.filter(id => id !== podcast.id)});
                            }
                          }}
                          className="w-4 h-4 text-ejup-orange"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-white leading-tight">{podcast.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <span>{podcast.guests.join(', ')}</span>
                            <span>•</span>
                            <span>{podcast.duration}</span>
                            <span>•</span>
                            <div className="flex gap-1">
                              {podcast.categories.slice(0, 2).map(catId => {
                                const category = availableCategories.find(c => c.id === catId);
                                return category ? (
                                  <span key={catId} className="px-1 py-0.5 bg-gray-600 rounded text-xs">
                                    {category.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">Nenhum episódio encontrado</p>
                      <p className="text-xs mt-1">Tente ajustar os filtros de busca</p>
                    </div>
                  )}
                </div>

                {/* Episódios selecionados */}
                {podcastFormData.relatedPodcasts.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                    <h5 className="text-sm font-medium text-white mb-2">
                      ✅ Episódios Selecionados ({podcastFormData.relatedPodcasts.length})
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {podcastFormData.relatedPodcasts.map(podcastId => {
                        const podcast = podcasts.find(p => p.id === podcastId);
                        return podcast ? (
                          <div key={podcastId} className="flex items-center gap-2 bg-ejup-orange/20 text-ejup-orange px-2 py-1 rounded text-xs">
                            <span className="max-w-40 truncate">{podcast.title}</span>
                            <button
                              type="button"
                              onClick={() => setPodcastFormData({
                                ...podcastFormData, 
                                relatedPodcasts: podcastFormData.relatedPodcasts.filter(id => id !== podcastId)
                              })}
                              className="hover:text-white"
                            >
                              ×
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
              <Button 
                variant="outline" 
                onClick={() => setIsEditPodcastDialogOpen(false)}
                className="px-6 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSavePodcast} 
                className="bg-ejup-orange hover:bg-ejup-orange/90 px-6"
              >
                {editingPodcast ? '✅ Salvar Alterações' : '➕ Criar Podcast'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog de Visualização de Submissão */}
        <Dialog open={isViewSubmissionDialogOpen} onOpenChange={setIsViewSubmissionDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-xl font-bold">
                {viewingSubmission?.title}
              </DialogTitle>
              <DialogDescription className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={viewingSubmission?.author.photo} />
                      <AvatarFallback className="bg-gradient-to-br from-ejup-cyan to-ejup-orange text-white text-xs">
                        {viewingSubmission?.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{viewingSubmission?.author.name}</span>
                  </div>
                  <span>•</span>
                  <span>{viewingSubmission?.author.studentId}</span>
                  <span>•</span>
                  <span>{viewingSubmission && new Date(viewingSubmission.submittedDate).toLocaleDateString('pt-BR')}</span>
                  {viewingSubmission?.readTime && (
                    <>
                      <span>•</span>
                      <span>{viewingSubmission.readTime}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      viewingSubmission?.status === 'approved' ? 'default' : 
                      viewingSubmission?.status === 'rejected' ? 'destructive' : 'secondary'
                    }
                  >
                    {viewingSubmission?.status === 'pending' ? '⏳ Pendente' : 
                     viewingSubmission?.status === 'approved' ? '✅ Aprovado' : '❌ Rejeitado'}
                  </Badge>
                  {viewingSubmission?.categories.map(catId => {
                    const category = availableCategories.find(c => c.id === catId);
                    return category ? (
                      <Badge key={catId} variant="outline" className="text-xs">
                        {category.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-6">
              {/* Informações do Autor */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-sm mb-2 text-white">Sobre o Autor</h3>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={viewingSubmission?.author.photo} />
                    <AvatarFallback className="bg-gradient-to-br from-ejup-cyan to-ejup-orange text-white">
                      {viewingSubmission?.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{viewingSubmission?.author.name}</p>
                    <p className="text-sm text-gray-300">{viewingSubmission?.author.email}</p>
                    <p className="text-sm text-gray-300">ID: {viewingSubmission?.author.studentId}</p>
                    {viewingSubmission?.author.bio && (
                      <p className="text-sm text-gray-300 mt-2">{viewingSubmission.author.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Resumo */}
              {viewingSubmission?.excerpt && (
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-sm mb-2 text-white">Resumo</h3>
                  <p className="text-sm text-gray-300 bg-gray-700 p-3 rounded border border-gray-600">{viewingSubmission.excerpt}</p>
                </div>
              )}

              {/* Conteúdo do Artigo */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-sm mb-3 text-white">Conteúdo do Artigo</h3>
                <div className="prose prose-sm max-w-none bg-gray-700 border border-gray-600 rounded-lg p-6 text-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: viewingSubmission?.content.replace(/\n/g, '<br>') || '' }} />
                </div>
              </div>

              {/* Notas de Revisão */}
              {viewingSubmission?.reviewNotes && (
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-sm mb-2 text-white">Notas de Revisão</h3>
                  <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3">
                    <p className="text-sm text-yellow-200">{viewingSubmission.reviewNotes}</p>
                  </div>
                </div>
              )}

              {/* Ações de Aprovação/Rejeição */}
              {viewingSubmission?.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    onClick={() => {
                      handleApproveSubmission(viewingSubmission.id);
                      setIsViewSubmissionDialogOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Aprovar Artigo
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      const notes = prompt('Adicione notas sobre a rejeição (opcional):') || 'Artigo rejeitado pela administração.';
                      handleRejectSubmission(viewingSubmission.id, notes);
                      setIsViewSubmissionDialogOpen(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rejeitar Artigo
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog de Edição de Configurações de Publicação */}
        <Dialog open={isEditSubmissionDialogOpen} onOpenChange={setIsEditSubmissionDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-xl font-bold">
                Configurações de Publicação
              </DialogTitle>
              <DialogDescription>
                Configure como este artigo aparecerá na página pública da coluna
              </DialogDescription>
            </DialogHeader>

            {editingSubmission && (
              <div className="space-y-6 py-6">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-sm mb-2 text-white">Artigo</h3>
                  <p className="font-medium text-white">{editingSubmission.title}</p>
                  <p className="text-sm text-gray-300">por {editingSubmission.author.name}</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">🖼️ Imagens</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300 font-medium">Imagem em Destaque</Label>
                      <Input 
                        placeholder="/lovable-uploads/course-preview.jpg"
                        value={publishingFormData.featuredImage}
                        onChange={(e) => setPublishingFormData({...publishingFormData, featuredImage: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300 font-medium">Imagem Thumbnail</Label>
                      <Input 
                        placeholder="/lovable-uploads/course-preview.jpg"
                        value={publishingFormData.thumbnailImage}
                        onChange={(e) => setPublishingFormData({...publishingFormData, thumbnailImage: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300 font-medium">Imagem Banner</Label>
                      <Input 
                        placeholder="/lovable-uploads/course-preview.jpg"
                        value={publishingFormData.bannerImage}
                        onChange={(e) => setPublishingFormData({...publishingFormData, bannerImage: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300 font-medium">Imagem Social</Label>
                      <Input 
                        placeholder="/lovable-uploads/course-preview.jpg"
                        value={publishingFormData.socialImage}
                        onChange={(e) => setPublishingFormData({...publishingFormData, socialImage: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">✨ Conteúdo</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300 font-medium">Frase em Destaque</Label>
                        <Textarea 
                          placeholder="Frase que aparecerá destacada na página do artigo"
                          value={publishingFormData.highlightQuote}
                          onChange={(e) => setPublishingFormData({...publishingFormData, highlightQuote: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300 font-medium">Resumo para SEO</Label>
                        <Textarea 
                          placeholder="Resumo que aparecerá nos mecanismos de busca"
                          value={publishingFormData.summary}
                          onChange={(e) => setPublishingFormData({...publishingFormData, summary: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300 font-medium">Especialização do Autor</Label>
                        <Input 
                          placeholder="Especialização que aparecerá ao lado do nome"
                          value={publishingFormData.authorSpecialization}
                          onChange={(e) => setPublishingFormData({...publishingFormData, authorSpecialization: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                {/* Categorias e Tags */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">🏷️ Categorização</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-gray-300 font-medium">Categorias Jurídicas</Label>
                      <div className="space-y-2">
                        <Select 
                          value=""
                          onValueChange={(value) => {
                            if (value && !publishingFormData.categories.includes(value)) {
                              setPublishingFormData({...publishingFormData, categories: [...publishingFormData.categories, value]});
                            }
                          }}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Selecione as categorias..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCategories
                              .filter(category => !publishingFormData.categories.includes(category.id))
                              .map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        
                        {publishingFormData.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {publishingFormData.categories.map(categoryId => {
                              const category = availableCategories.find(c => c.id === categoryId);
                              return category ? (
                                <div key={categoryId} className="flex items-center gap-1 bg-ejup-orange/20 text-ejup-orange px-2 py-1 rounded text-xs">
                                  <span>{category.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => setPublishingFormData({
                                      ...publishingFormData, 
                                      categories: publishingFormData.categories.filter(id => id !== categoryId)
                                    })}
                                    className="hover:text-white"
                                  >
                                    ×
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-300 font-medium">Tags</Label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Adicionar tag..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white flex-1 placeholder:text-gray-400"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && newTag.trim() && !publishingFormData.tags.includes(newTag.trim())) {
                                setPublishingFormData({...publishingFormData, tags: [...publishingFormData.tags, newTag.trim()]});
                                setNewTag('');
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (newTag.trim() && !publishingFormData.tags.includes(newTag.trim())) {
                                setPublishingFormData({...publishingFormData, tags: [...publishingFormData.tags, newTag.trim()]});
                                setNewTag('');
                              }
                            }}
                            className="border-gray-600 text-gray-300"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {publishingFormData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {publishingFormData.tags.map((tag, index) => (
                              <div key={index} className="flex items-center gap-1 bg-ejup-cyan/20 text-ejup-cyan px-2 py-1 rounded text-xs">
                                <span>{tag}</span>
                                <button
                                  type="button"
                                  onClick={() => setPublishingFormData({
                                    ...publishingFormData, 
                                    tags: publishingFormData.tags.filter((_, i) => i !== index)
                                  })}
                                  className="hover:text-white"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">⚡ Status do Artigo</h3>
                  <div className="space-y-3">
                    <Label className="text-gray-300 font-medium">Status de Publicação</Label>
                    <Select 
                      value={publishingFormData.status} 
                      onValueChange={(value: 'pending' | 'approved' | 'rejected') => 
                        setPublishingFormData({...publishingFormData, status: value})
                      }
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">⏳ Pendente</SelectItem>
                        <SelectItem value="approved">✅ Aprovado</SelectItem>
                        <SelectItem value="rejected">❌ Rejeitado</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-gray-400 bg-gray-700 p-3 rounded border border-gray-600">
                      💡 <strong className="text-gray-300">Dica:</strong> Alterar o status aqui terá o mesmo efeito que usar os botões de ação na lista de submissões.
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">📍 Posicionamento na Página</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={publishingFormData.isFeatured}
                        onChange={(e) => setPublishingFormData({...publishingFormData, isFeatured: e.target.checked})}
                        className="w-4 h-4 text-ejup-orange"
                      />
                      <span className="text-sm text-gray-300">🌟 Destacar na homepage (artigo principal)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={publishingFormData.isSubFeatured}
                        onChange={(e) => setPublishingFormData({...publishingFormData, isSubFeatured: e.target.checked})}
                        className="w-4 h-4 text-ejup-orange"
                      />
                      <span className="text-sm text-gray-300">⭐ Sub-destaque (cards menores)</span>
                    </label>
                    <div className="text-xs text-gray-400 bg-gray-700 p-3 rounded border border-gray-600">
                      💡 <strong className="text-gray-300">Dica:</strong> Se nenhuma opção for selecionada, o artigo será publicado como artigo normal na área inferior da coluna.
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditSubmissionDialogOpen(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSavePublishingConfig}
                    className="bg-ejup-orange hover:bg-ejup-orange/90"
                  >
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ArticleManagement; 