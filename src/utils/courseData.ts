// Definição das escolas disponíveis
export interface School {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const schools: School[] = [
  {
    id: 'direito',
    name: 'Escola de Direito',
    description: 'Cursos focados em áreas tradicionais e especializadas do Direito',
    color: 'ejup-orange'
  },
  {
    id: 'power-skills',
    name: 'Escola de Power Skills',
    description: 'Desenvolvimento de habilidades comportamentais e liderança',
    color: 'ejup-cyan'
  },
  {
    id: 'gestao-tech',
    name: 'Escola de Gestão, Tecnologia e Inovação Jurídica',
    description: 'Gestão jurídica, tecnologia aplicada ao Direito e inovação',
    color: 'ejup-orange'
  }
];

// Dados centralizados dos cursos - normalmente viriam do banco de dados via API
export interface CourseData {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorRole: string;
  instructorInitials: string;
  instructorBio?: string; // Nova propriedade para biografia do instrutor
  instructorPhoto?: string; // Nova propriedade para foto do instrutor
  instructorExperience?: string; // Nova propriedade para experiência do instrutor
  instructors?: Array<{
    name: string;
    role: string;
    initials: string;
    bio?: string;
    photo?: string;
  }>;
  duration: string;
  modules: number;
  level: string;
  category: string;
  modalidade: string;
  schools: string[]; // Array de IDs das escolas a que o curso pertence
  image?: string;
  imageBg: string;
  price: number; // Preço em número para facilitar cálculos
  promoted?: {
    by: string;
    logo?: string;
  };
  caap?: boolean;
  videoUrl?: string;
  objectives?: string[];
  moduleDetails?: Array<{
    id: number;
    title: string;
    duration: string;
    lessons: Array<{
      title: string;
      duration: string;
    }>;
  }>;
  promotedBy?: {
    name: string;
    logo?: string;
  };
}

// Base de dados central dos cursos
export const coursesDatabase: CourseData[] = [
  {
    id: 1,
    title: 'Elaboração de Contratos Empresariais',
    description: 'Aprenda a elaborar contratos eficientes para empresas.',
    longDescription: 'Este curso completo foi projetado para profissionais do Direito que desejam aprimorar suas habilidades práticas. Através de uma abordagem prática e baseada em casos reais, os participantes aprenderão as melhores técnicas para atuar de forma eficaz na área jurídica.',
    instructor: 'Eduardo Souza',
    instructorRole: 'Advogado Empresarial',
    instructorInitials: 'ES',
    instructorBio: 'Eduardo Souza é advogado especialista em Direito Empresarial com mais de 15 anos de experiência. Formado pela USP, possui mestrado em Direito Comercial e atua na assessoria jurídica de grandes corporações.',
    instructorPhoto: '/lovable-uploads/team/instructor.png',
    instructorExperience: 'Mais de 15 anos de experiência em contratos empresariais, assessoria corporativa e fusões & aquisições.',
    duration: '48 horas',
    modules: 8,
    level: '',
    category: 'empresarial',
    modalidade: 'online',
    schools: ['direito', 'gestao-tech'], // Direito empresarial + gestão jurídica
    imageBg: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 297,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    objectives: [
      'Dominar os fundamentos do direito contratual empresarial',
      'Elaborar contratos juridicamente sólidos e eficientes',
      'Identificar e mitigar riscos contratuais específicos',
      'Aplicar as melhores práticas do mercado corporativo',
      'Desenvolver habilidades de negociação contratual',
      'Adaptar contratos às necessidades específicas de cada negócio',
      'Compreender as implicações legais de cada cláusula',
      'Implementar sistemas de gestão contratual eficazes'
    ],
    moduleDetails: [
      {
        id: 1,
        title: 'Fundamentos da Contratação Empresarial',
        duration: '6h 30min',
        lessons: [
          { title: 'Princípios básicos do direito contratual', duration: '25 min' },
          { title: 'Elementos essenciais dos contratos', duration: '30 min' },
          { title: 'Autonomia da vontade vs função social', duration: '28 min' },
          { title: 'Boa-fé objetiva e responsabilidade contratual', duration: '22 min' },
          { title: 'Exercícios práticos - Módulo 1', duration: '45 min' },
          { title: 'Estudo de caso: Análise de contrato real', duration: '1h 30min' }
        ]
      },
      {
        id: 2,
        title: 'Estrutura e Redação Contratual',
        duration: '8h 15min',
        lessons: [
          { title: 'Anatomia de um contrato empresarial', duration: '35 min' },
          { title: 'Linguagem jurídica clara e objetiva', duration: '30 min' },
          { title: 'Cláusulas padrão vs específicas', duration: '40 min' },
          { title: 'Técnicas de redação avançadas', duration: '45 min' },
          { title: 'Workshop prático de redação', duration: '1h 15min' },
          { title: 'Revisão e edição de contratos', duration: '50 min' },
          { title: 'Exercício: Elaboração de contrato completo', duration: '2h 40min' }
        ]
      },
      {
        id: 3,
        title: 'Tipos de Contratos Empresariais',
        duration: '10h 45min',
        lessons: [
          { title: 'Contratos de compra e venda empresarial', duration: '1h 20min' },
          { title: 'Contratos de prestação de serviços B2B', duration: '1h 35min' },
          { title: 'Contratos de distribuição e representação', duration: '1h 25min' },
          { title: 'Contratos de licenciamento e franquia', duration: '1h 40min' },
          { title: 'Joint ventures e parcerias estratégicas', duration: '1h 30min' },
          { title: 'Contratos de consultoria e assessoria', duration: '1h 15min' },
          { title: 'Contratos tecnológicos e digitais', duration: '1h 20min' },
          { title: 'Workshop: Escolhendo o tipo contratual ideal', duration: '40 min' }
        ]
      },
      {
        id: 4,
        title: 'Gestão de Riscos Contratuais',
        duration: '7h 30min',
        lessons: [
          { title: 'Identificação e mapeamento de riscos', duration: '45 min' },
          { title: 'Cláusulas de limitação de responsabilidade', duration: '1h 10min' },
          { title: 'Garantias, seguros e cauções', duration: '1h 20min' },
          { title: 'Força maior e caso fortuito', duration: '50 min' },
          { title: 'Cláusulas penais e multas contratuais', duration: '1h 15min' },
          { title: 'Resolução de conflitos e arbitragem', duration: '1h 30min' },
          { title: 'Simulação: Gestão de crise contratual', duration: '40 min' }
        ]
      },
      {
        id: 5,
        title: 'Negociação e Fechamento',
        duration: '5h 20min',
        lessons: [
          { title: 'Estratégias de negociação contratual', duration: '55 min' },
          { title: 'Técnicas de persuasão e argumentação', duration: '45 min' },
          { title: 'Due diligence contratual', duration: '1h 15min' },
          { title: 'Documentação e formalização', duration: '50 min' },
          { title: 'Pós-contratação: gestão e acompanhamento', duration: '40 min' },
          { title: 'Role-play: Simulação de negociação', duration: '55 min' }
        ]
      },
      {
        id: 6,
        title: 'Aspectos Tributários e Regulatórios',
        duration: '4h 45min',
        lessons: [
          { title: 'Implicações tributárias dos contratos', duration: '1h 10min' },
          { title: 'Compliance e aspectos regulatórios', duration: '1h 5min' },
          { title: 'LGPD e proteção de dados contratuais', duration: '55 min' },
          { title: 'Aspectos trabalhistas em contratos B2B', duration: '45 min' },
          { title: 'Checklist de conformidade legal', duration: '50 min' }
        ]
      },
      {
        id: 7,
        title: 'Tecnologia e Contratos Digitais',
        duration: '6h 10min',
        lessons: [
          { title: 'Contratos eletrônicos e assinatura digital', duration: '1h 20min' },
          { title: 'Blockchain e smart contracts', duration: '1h 15min' },
          { title: 'Inteligência artificial e automação', duration: '1h 5min' },
          { title: 'Plataformas de gestão contratual', duration: '50 min' },
          { title: 'Segurança da informação em contratos', duration: '45 min' },
          { title: 'Tendências e futuro dos contratos', duration: '55 min' }
        ]
      },
      {
        id: 8,
        title: 'Projeto Final e Certificação',
        duration: '3h 30min',
        lessons: [
          { title: 'Briefing do projeto final', duration: '30 min' },
          { title: 'Desenvolvimento do projeto individual', duration: '2h' },
          { title: 'Apresentação e feedback', duration: '45 min' },
          { title: 'Avaliação final', duration: '15 min' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Direito Digital e Proteção de Dados',
    description: 'Entenda os desafios jurídicos da era digital e LGPD.',
    longDescription: 'Este curso completo foi projetado para profissionais do Direito que desejam aprimorar suas habilidades práticas. Através de uma abordagem prática e baseada em casos reais, os participantes aprenderão as melhores técnicas para atuar de forma eficaz na área jurídica.',
    instructor: 'Marina Lima',
    instructorRole: 'Especialista em Direito Digital',
    instructorInitials: 'ML',
    instructors: [
      {
        name: 'Marina Lima',
        role: 'Especialista em Direito Digital',
        initials: 'ML',
        bio: 'Marina Lima é especialista em Direito Digital com mais de 10 anos de experiência. Mestre em Direito pela UERJ, atua como consultora em LGPD e proteção de dados para grandes empresas.',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      },
      {
        name: 'Roberto Santos',
        role: 'Consultor em LGPD',
        initials: 'RS',
        bio: 'Roberto Santos é consultor especializado em LGPD e compliance digital. Doutor em Direito pela PUC-SP, possui certificações internacionais em proteção de dados e privacidade.',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      },
      {
        name: 'Ana Costa',
        role: 'Advogada Tecnológica',
        initials: 'AC',
        bio: 'Ana Costa é advogada especializada em direito da tecnologia e inovação. Mestre em Direito Digital pela FGV, atua na assessoria jurídica de startups e empresas de tecnologia.',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    ],
    duration: '32 horas',
    modules: 6,
    level: '',
    category: 'digital',
    modalidade: 'presencial',
    schools: ['direito', 'gestao-tech'], // Direito digital + tecnologia jurídica
    imageBg: 'bg-gradient-to-br from-ejup-cyan/30 to-ejup-orange/30',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    promoted: {
      by: 'DataLaw',
    },
    price: 347
  },
  {
    id: 3,
    title: 'Mediação e Arbitragem',
    description: 'Técnicas e estratégias para resolução alternativa de conflitos.',
    longDescription: 'Este curso completo foi projetado para profissionais do Direito que desejam aprimorar suas habilidades práticas. Através de uma abordagem prática e baseada em casos reais, os participantes aprenderão as melhores técnicas para atuar de forma eficaz na área jurídica.',
    instructor: 'Carlos Mendes',
    instructorRole: 'Mediador Certificado',
    instructorInitials: 'CM',
    instructorBio: 'Carlos Mendes é mediador certificado pelo CONIMA com mais de 12 anos de experiência. Doutor em Direito Processual pela PUC-SP, atua na resolução de conflitos empresariais e familiares.',
    instructorPhoto: '/lovable-uploads/team/depoente 1.png',
    instructorExperience: 'Mais de 12 anos em mediação e arbitragem, coordenador de Câmara de Mediação, autor de artigos sobre resolução alternativa de conflitos.',
    duration: '24 horas',
    modules: 5,
    level: '',
    category: 'resolucao',
    modalidade: 'hibrido',
    schools: ['direito', 'power-skills'], // Resolução de conflitos + habilidades comportamentais
    imageBg: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-orange/30',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 247
  },
  {
    id: 4,
    title: 'Contencioso Trabalhista',
    description: 'Estratégias processuais e preparação de defesas em ações trabalhistas.',
    longDescription: 'Este curso completo foi projetado para profissionais do Direito que desejam aprimorar suas habilidades práticas. Através de uma abordagem prática e baseada em casos reais, os participantes aprenderão as melhores técnicas para atuar de forma eficaz na área jurídica.',
    instructor: 'Ana Rodrigues',
    instructorRole: 'Advogada Trabalhista',
    instructorInitials: 'AR',
    duration: '40 horas',
    modules: 7,
    level: '',
    category: 'trabalhista',
    modalidade: 'online',
    schools: ['direito'], // Exclusivamente direito trabalhista
    imageBg: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-orange/30',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 327
  },
  {
    id: 5,
    title: 'Direito Tributário para Empresas',
    description: 'Planejamento tributário e gestão de contencioso fiscal.',
    longDescription: 'Este curso completo foi projetado para profissionais do Direito que desejam aprimorar suas habilidades práticas. Através de uma abordagem prática e baseada em casos reais, os participantes aprenderão as melhores técnicas para atuar de forma eficaz na área jurídica.',
    instructor: 'Ricardo Torres',
    instructorRole: 'Advogado Tributarista',
    instructorInitials: 'RT',
    duration: '64 horas',
    modules: 10,
    level: '',
    category: 'tributario',
    modalidade: 'presencial',
    schools: ['direito', 'gestao-tech'], // Direito tributário + gestão jurídica
    imageBg: 'bg-gradient-to-br from-ejup-cyan/30 to-ejup-orange/30',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    promoted: {
      by: 'Mendes & Pacheco Advocacia',
    },
    price: 497
  },
  {
    id: 6,
    title: 'Compliance e Governança Corporativa',
    description: 'Implementação de programas de compliance e melhores práticas de governança.',
    longDescription: 'Este curso completo foi projetado para profissionais do Direito que desejam aprimorar suas habilidades práticas. Através de uma abordagem prática e baseada em casos reais, os participantes aprenderão as melhores técnicas para atuar de forma eficaz na área jurídica.',
    instructor: 'Patricia Santos',
    instructorRole: 'Consultora de Compliance',
    instructorInitials: 'PS',
    duration: '48 horas',
    modules: 8,
    level: '',
    category: 'empresarial',
    modalidade: 'hibrido',
    schools: ['direito', 'gestao-tech', 'power-skills'], // Compliance envolve direito, gestão e habilidades
    imageBg: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 397
  },
];

// Funções utilitárias para acessar os dados
export const getAllCourses = (): CourseData[] => {
  return coursesDatabase;
};

export const getCourseById = (id: number): CourseData | undefined => {
  return coursesDatabase.find(course => course.id === id);
};

export const formatPrice = (price: number): string => {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

export const getCoursesByCategory = (category: string): CourseData[] => {
  return coursesDatabase.filter(course => course.category === category);
};

// Funções utilitárias para trabalhar com escolas
export const getSchoolById = (schoolId: string): School | undefined => {
  return schools.find(school => school.id === schoolId);
};

export const getCoursesBySchool = (schoolId: string): CourseData[] => {
  return coursesDatabase.filter(course => course.schools.includes(schoolId));
};

export const getAllSchools = (): School[] => {
  return schools;
};

// Configuração de cursos relacionados
export const getRelatedCourses = (mainCourseId: number) => {
  const relatedConfig: Record<number, { show: boolean, courseIds: number[] }> = {
    1: { show: false, courseIds: [] },
    2: { show: false, courseIds: [] },
    3: { show: true, courseIds: [1] },
    4: { show: false, courseIds: [] },
    5: { show: true, courseIds: [1, 6] },
    6: { show: true, courseIds: [1] }
  };

  const config = relatedConfig[mainCourseId] || { show: false, courseIds: [] };
  
  if (!config.show) {
    return { show: false, courses: [] };
  }

  const courses = config.courseIds.map(id => {
    const course = getCourseById(id);
    if (course) {
      return {
        id: id.toString(),
        title: course.title,
        price: course.price.toFixed(2).replace('.', ','),
        link: `/courses/${id}`
      };
    }
    return null;
  }).filter(Boolean);

  return { show: true, courses };
};

// ========================================
// FUNÇÕES DE INTEGRAÇÃO COM SISTEMA ADMIN
// ========================================

// Função para atualizar um curso (simula chamada para API do admin)
export const updateCourse = async (courseId: number, updatedData: Partial<CourseData>): Promise<boolean> => {
  try {
    // Em produção, isso seria uma chamada para API:
    // const response = await fetch(`/api/admin/courses/${courseId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedData)
    // });
    
    // Simulação: atualizar no array local
    const courseIndex = coursesDatabase.findIndex(course => course.id === courseId);
    if (courseIndex !== -1) {
      coursesDatabase[courseIndex] = { ...coursesDatabase[courseIndex], ...updatedData };
      console.log(`Curso ${courseId} atualizado com sucesso:`, updatedData);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    return false;
  }
};

// Função para criar um novo curso (simula chamada para API do admin)
export const createCourse = async (courseData: Omit<CourseData, 'id'>): Promise<CourseData | null> => {
  try {
    // Em produção, isso seria uma chamada para API:
    // const response = await fetch('/api/admin/courses', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(courseData)
    // });
    
    // Simulação: adicionar ao array local
    const newId = Math.max(...coursesDatabase.map(c => c.id)) + 1;
    const newCourse: CourseData = { id: newId, ...courseData };
    coursesDatabase.push(newCourse);
    console.log(`Novo curso criado com ID ${newId}:`, newCourse);
    return newCourse;
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    return null;
  }
};

// Função para deletar um curso (simula chamada para API do admin)
export const deleteCourse = async (courseId: number): Promise<boolean> => {
  try {
    // Em produção, isso seria uma chamada para API:
    // const response = await fetch(`/api/admin/courses/${courseId}`, {
    //   method: 'DELETE'
    // });
    
    // Simulação: remover do array local
    const courseIndex = coursesDatabase.findIndex(course => course.id === courseId);
    if (courseIndex !== -1) {
      coursesDatabase.splice(courseIndex, 1);
      console.log(`Curso ${courseId} deletado com sucesso`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao deletar curso:', error);
    return false;
  }
};

// Função para atualizar apenas o preço de um curso (mais específica)
export const updateCoursePrice = async (courseId: number, newPrice: number): Promise<boolean> => {
  return updateCourse(courseId, { price: newPrice });
};

// Função para obter estatísticas dos cursos (útil para admin dashboard)
export const getCourseStats = () => {
  const totalCourses = coursesDatabase.length;
  const averagePrice = coursesDatabase.reduce((sum, course) => sum + course.price, 0) / totalCourses;
  const coursesByCategory = coursesDatabase.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalCourses,
    averagePrice: Math.round(averagePrice * 100) / 100,
    coursesByCategory,
    priceRange: {
      min: Math.min(...coursesDatabase.map(c => c.price)),
      max: Math.max(...coursesDatabase.map(c => c.price))
    }
  };
};

// Função para validar dados de curso antes de salvar
export const validateCourseData = (courseData: Partial<CourseData>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (courseData.title && courseData.title.length < 3) {
    errors.push('Título deve ter pelo menos 3 caracteres');
  }

  if (courseData.price && courseData.price <= 0) {
    errors.push('Preço deve ser maior que zero');
  }

  if (courseData.duration && !courseData.duration.includes('hora')) {
    errors.push('Duração deve estar no formato "X horas"');
  }

  if (courseData.modules && courseData.modules < 1) {
    errors.push('Curso deve ter pelo menos 1 módulo');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 