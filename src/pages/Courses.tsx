import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/courses/CourseCard';
import SearchAndFilter from '@/components/ui/SearchAndFilter';
import { X } from 'lucide-react';
import { getAllCourses, getCoursesBySchool, getSchoolById, getAllSchools, CourseData } from '@/utils/courseData';

// Mapeamento de categorias por escola
const categoriesBySchool = {
  'direito': [
    { id: 'empresarial', name: 'Direito Empresarial' },
    { id: 'trabalhista', name: 'Direito Trabalhista' },
    { id: 'tributario', name: 'Direito Tributário' },
    { id: 'digital', name: 'Direito Digital' },
    { id: 'resolucao', name: 'Resolução de Conflitos' },
  ],
  'power-skills': [
    { id: 'resolucao', name: 'Resolução de Conflitos' },
  ],
  'gestao-tech': [
    { id: 'digital', name: 'Direito Digital' },
    { id: 'empresarial', name: 'Direito Empresarial' },
    { id: 'tributario', name: 'Direito Tributário' },
  ],
};

const Courses = () => {
  const { schoolId } = useParams<{ schoolId?: string }>();
  const [baseCourses, setBaseCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [currentSchool, setCurrentSchool] = useState<any>(null);
  
  // Função para gerar filtros dinamicamente
  const getDynamicFilters = () => {
    const filters = [];
    
    // Se não estamos em uma escola específica, mostrar seletor de escola
    if (!schoolId) {
      filters.push({
        id: 'school',
        name: 'Escolas da EJUP',
        options: getAllSchools().map(school => ({ id: school.id, name: school.name })),
      });
    }
    
    // Se uma escola estiver selecionada (via URL ou filtro), adicionar categorias correspondentes
    const selectedSchool = schoolId || activeFilters.school;
    if (selectedSchool && categoriesBySchool[selectedSchool as keyof typeof categoriesBySchool]) {
      filters.push({
        id: 'category',
        name: 'Categoria',
        options: categoriesBySchool[selectedSchool as keyof typeof categoriesBySchool],
      });
    }
    
    return filters;
  };
  
  // Determinar quais cursos exibir baseado na escola ou mostrar todos
  useEffect(() => {
    if (schoolId) {
      const schoolCourses = getCoursesBySchool(schoolId);
      const school = getSchoolById(schoolId);
      setBaseCourses(schoolCourses);
      setFilteredCourses(schoolCourses);
      setCurrentSchool(school);
    } else {
      const allCourses = getAllCourses();
      setBaseCourses(allCourses);
      setFilteredCourses(allCourses);
      setCurrentSchool(null);
    }
  }, [schoolId]);
  
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredCourses(baseCourses);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = baseCourses.filter(
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
      
      // Se mudou a escola, limpar o filtro de categoria e atualizar cursos base
      if (filterId === 'school') {
        delete newFilters.category;
        // Atualizar cursos base para a escola selecionada
        const schoolCourses = getCoursesBySchool(value);
        setBaseCourses(schoolCourses);
        setFilteredCourses(schoolCourses);
      }
    } else {
      delete newFilters[filterId];
      
      // Se removeu o filtro de escola, voltar para todos os cursos
      if (filterId === 'school') {
        const allCourses = getAllCourses();
        setBaseCourses(allCourses);
        setFilteredCourses(allCourses);
      }
    }
    
    setActiveFilters(newFilters);
    
    // Apply filters (só aplicar se não mudou escola, pois escola já foi aplicada acima)
    if (filterId !== 'school') {
      let filtered = [...baseCourses];
      
      Object.entries(newFilters).forEach(([key, value]) => {
        switch (key) {
          case 'category':
            filtered = filtered.filter(course => course.category === value);
            break;
          case 'school':
            // Escola já foi aplicada na mudança de baseCourses
            break;
        }
      });
      
      setFilteredCourses(filtered);
    }
  };

  const removeFilter = (filterId: string) => {
    handleFilterChange(filterId, 'all');
  };

  const clearFilters = () => {
    setActiveFilters({});
    if (schoolId) {
      const schoolCourses = getCoursesBySchool(schoolId);
      setFilteredCourses(schoolCourses);
    } else {
      const allCourses = getAllCourses();
      setFilteredCourses(allCourses);
    }
  };

  const getFilterDisplayName = (filterId: string, value: string) => {
    const dynamicFilters = getDynamicFilters();
    const filter = dynamicFilters.find(f => f.id === filterId);
    const option = filter?.options.find(o => o.id === value);
    return option?.name || value;
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-20">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-ejup-darkBg">
            {/* Efeitos de iluminação */}
            <div className="absolute top-[3%] left-[-10%] w-[50%] h-[35%] bg-[#29D6E6]/12 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-[-15%] left-[15%] w-[55%] h-[40%] bg-[#29D6E6]/8 blur-[180px] rounded-full"></div>
            <div className="absolute top-[-10%] right-[-15%] w-[80%] h-[60%] bg-[#29D6E6]/8 blur-[200px] rounded-full"></div>
            <div className="absolute top-[40%] right-[-10%] w-[50%] h-[35%] bg-[#29D6E6]/12 blur-[150px] rounded-full"></div>
          </div>
          <div className="ejup-container py-12 relative z-10">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {currentSchool ? currentSchool.name : 'Escola de Direito'}
              </h1>
              <p className="text-zinc-400">
                {currentSchool 
                  ? currentSchool.description
                  : 'Cursos focados em áreas tradicionais e especializadas do Direito'
                }
              </p>
            </div>
          
            <SearchAndFilter 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              filters={getDynamicFilters()}
              activeFilters={activeFilters}
            />
          
            {/* Active Filters */}
            {Object.keys(activeFilters).length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-zinc-400">Filtros ativos:</span>
                  {Object.entries(activeFilters).map(([filterId, value]) => (
                    <span 
                      key={`${filterId}-${value}`}
                      className="inline-flex items-center gap-1 text-sm text-ejup-orange"
                    >
                      {getFilterDisplayName(filterId, value)}
                      <button
                        onClick={() => removeFilter(filterId)}
                        className="text-zinc-400 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard 
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    instructor={course.instructor}
                    instructorRole={course.instructorRole}
                    instructorInitials={course.instructorInitials}
                    instructors={course.instructors}
                    duration={course.duration}
                    modules={course.modules}
                    level={course.level}
                    imageBg={course.imageBg}
                    image={course.image}
                    promoted={course.promoted}
                    price={course.price}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-400">Nenhum curso encontrado com os filtros selecionados.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-ejup-orange hover:text-ejup-orange/80"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
