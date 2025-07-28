import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/courses/CourseCard';
import SearchAndFilter from '@/components/ui/SearchAndFilter';
import { X } from 'lucide-react';
import { getAllCourses, getCoursesBySchool, getSchoolById, CourseData } from '@/utils/courseData';

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
  }
];

const Courses = () => {
  const { schoolId } = useParams<{ schoolId?: string }>();
  const [baseCourses, setBaseCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [currentSchool, setCurrentSchool] = useState<any>(null);
  
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
      if (!newFilters[filterId]) {
        newFilters[filterId] = [];
      }
      // Toggle the filter: if it's already selected, remove it; if not, add it
      if (newFilters[filterId].includes(value)) {
        newFilters[filterId] = newFilters[filterId].filter(v => v !== value);
        if (newFilters[filterId].length === 0) {
          delete newFilters[filterId];
        }
      } else {
        newFilters[filterId] = [...newFilters[filterId], value];
      }
    } else {
      // Clear all filters for this category
      delete newFilters[filterId];
    }
    
    setActiveFilters(newFilters);
    
    // Apply filters
    let filtered = [...baseCourses];
    
    Object.entries(newFilters).forEach(([key, values]) => {
      switch (key) {
        case 'category':
          filtered = filtered.filter(course => values.includes(course.category));
          break;
      }
    });
    
    setFilteredCourses(filtered);
  };

  const removeFilter = (filterId: string, value: string) => {
    const newFilters = { ...activeFilters };
    if (newFilters[filterId]) {
      newFilters[filterId] = newFilters[filterId].filter(v => v !== value);
      if (newFilters[filterId].length === 0) {
        delete newFilters[filterId];
      }
    }
    setActiveFilters(newFilters);
    
    // Apply filters
    let filtered = [...baseCourses];
    
    Object.entries(newFilters).forEach(([key, values]) => {
      switch (key) {
        case 'category':
          filtered = filtered.filter(course => values.includes(course.category));
          break;
      }
    });
    
    setFilteredCourses(filtered);
  };



  const getFilterDisplayName = (filterId: string, value: string) => {
    const filter = filters.find(f => f.id === filterId);
    const option = filter?.options.find(o => o.id === value);
    return option?.name || value;
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-20">
        <div className="ejup-container py-12">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {currentSchool ? currentSchool.name : 'Cursos'}
            </h1>
            <p className="text-zinc-400">
              {currentSchool 
                ? currentSchool.description
                : 'Explore nossa coleção de cursos jurídicos práticos e atualizados'
              }
            </p>
          </div>
          
          <SearchAndFilter 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
            activeFilters={activeFilters}
          />
          
          {/* Active Filters */}
          {Object.keys(activeFilters).length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-zinc-400">Filtros ativos:</span>
                {Object.entries(activeFilters).map(([filterId, values]) => 
                  values.map(value => (
                    <span 
                      key={`${filterId}-${value}`}
                      className="inline-flex items-center gap-1 text-sm text-ejup-pink"
                    >
                      {getFilterDisplayName(filterId, value)}
                      <button
                        onClick={() => removeFilter(filterId, value)}
                        className="ml-1 hover:text-white transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))
                ).flat()}
              </div>
            </div>
          )}
          
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

export default Courses;
