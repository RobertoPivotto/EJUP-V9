import { useState } from 'react';
import InternalHeader from '@/components/layout/InternalHeader';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/courses/CourseCard';
import SearchAndFilter from '@/components/ui/SearchAndFilter';

// Mock data for courses
const allCourses = [
  {
    id: 1,
    title: 'Elaboração de Contratos Empresariais',
    description: 'Aprenda a elaborar contratos eficientes para empresas.',
    instructor: 'Eduardo Souza',
    instructorRole: 'Advogado Empresarial',
    instructorInitials: 'ES',
    duration: '48 horas',
    modules: 8,
    level: '',
    imageBg: 'bg-gradient-to-br from-ejup-pink/30 to-ejup-cyan/30',
    category: 'empresarial',
    modalidade: 'online',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Direito Digital e Proteção de Dados',
    description: 'Entenda os desafios jurídicos da era digital e LGPD.',
    instructor: 'Marina Lima',
    instructorRole: 'Especialista em Direito Digital',
    instructorInitials: 'ML',
    duration: '32 horas',
    modules: 6,
    level: '',
    imageBg: 'bg-gradient-to-br from-ejup-cyan/30 to-ejup-orange/30',
    category: 'digital',
    modalidade: 'presencial',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    promoted: {
      by: 'DataLaw',
    },
  },
  {
    id: 3,
    title: 'Mediação e Arbitragem',
    description: 'Técnicas e estratégias para resolução alternativa de conflitos.',
    instructor: 'Carlos Mendes',
    instructorRole: 'Mediador Certificado',
    instructorInitials: 'CM',
    duration: '24 horas',
    modules: 5,
    level: '',
    imageBg: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-pink/30',
    category: 'resolucao',
    modalidade: 'hibrido',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Contencioso Trabalhista',
    description: 'Estratégias processuais e preparação de defesas em ações trabalhistas.',
    instructor: 'Ana Rodrigues',
    instructorRole: 'Advogada Trabalhista',
    instructorInitials: 'AR',
    duration: '40 horas',
    modules: 7,
    level: '',
    imageBg: 'bg-gradient-to-br from-ejup-pink/30 to-ejup-orange/30',
    category: 'trabalhista',
    modalidade: 'online',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by13YWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Direito Tributário para Empresas',
    description: 'Planejamento tributário e gestão de contencioso fiscal.',
    instructor: 'Ricardo Torres',
    instructorRole: 'Advogado Tributarista',
    instructorInitials: 'RT',
    duration: '64 horas',
    modules: 10,
    level: '',
    imageBg: 'bg-gradient-to-br from-ejup-cyan/30 to-ejup-pink/30',
    category: 'tributario',
    modalidade: 'presencial',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    promoted: {
      by: 'Mendes & Pacheco Advocacia',
    },
  },
  {
    id: 6,
    title: 'Compliance e Governança Corporativa',
    description: 'Implementação de programas de compliance e melhores práticas de governança.',
    instructor: 'Patricia Santos',
    instructorRole: 'Consultora de Compliance',
    instructorInitials: 'PS',
    duration: '48 horas',
    modules: 8,
    level: '',
    imageBg: 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
    category: 'empresarial',
    modalidade: 'hibrido',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
];

const filters = [
  {
    id: 'category',
    name: 'Categoria',
    options: [
      { id: 'empresarial', name: 'Direito Empresarial' },
      { id: 'digital', name: 'Direito Digital' },
      { id: 'resolucao', name: 'Resolução de Conflitos' },
      { id: 'trabalhista', name: 'Direito Trabalhista' },
      { id: 'tributario', name: 'Direito Tributário' },
    ],
  },
  {
    id: 'modalidade',
    name: 'Modalidade',
    options: [
      { id: 'online', name: 'Online' },
      { id: 'presencial', name: 'Presencial' },
      { id: 'hibrido', name: 'Híbrido' },
    ],
  }
];

const InternalCourses = () => {
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredCourses(allCourses);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = allCourses.filter(
      course => 
        course.title.toLowerCase().includes(lowerQuery) || 
        course.description.toLowerCase().includes(lowerQuery) ||
        course.instructor.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredCourses(filtered);
  };
  
  const handleFilterChange = (filterId: string, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (value && value !== 'all') {
      newFilters[filterId] = value;
    } else {
      delete newFilters[filterId];
    }
    
    setActiveFilters(newFilters);
    
    // Apply filters
    let filtered = [...allCourses];
    
    Object.entries(newFilters).forEach(([key, value]) => {
      switch (key) {
        case 'category':
          filtered = filtered.filter(course => course.category === value);
          break;
        case 'modalidade':
          filtered = filtered.filter(course => course.modalidade === value);
          break;
      }
    });
    
    setFilteredCourses(filtered);
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <InternalHeader />
      <main className="pt-20">
        <div className="ejup-container py-12">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Adquirir Novos Cursos</h1>
            <p className="text-zinc-400">
              Explore nossa coleção de cursos jurídicos práticos e atualizados
            </p>
          </div>
          
          <SearchAndFilter 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
          />
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  instructor={course.instructor}
                  instructorRole={course.instructorRole}
                  instructorInitials={course.instructorInitials}
                  duration={course.duration}
                  modules={course.modules}
                  level={course.level}
                  imageBg={course.imageBg}
                  image={course.image}
                  promoted={course.promoted}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Nenhum curso encontrado</h3>
              <p className="text-zinc-400">Tente ajustar os filtros ou termos de busca</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InternalCourses; 