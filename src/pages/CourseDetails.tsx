import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourseDetail from '@/components/courses/CourseDetail';
import { getCourseById, getRelatedCourses, formatPrice } from '@/utils/courseData';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // Garantir que a página sempre carregue do topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const courseId = parseInt(id || '1');
  const courseData = getCourseById(courseId);
  const relatedCoursesData = getRelatedCourses(courseId);
  
  if (!courseData) {
    return (
      <div className="min-h-screen bg-ejup-darkBg">
        <Navbar />
        <main className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Curso não encontrado</h1>
            <p className="text-zinc-400">O curso solicitado não existe ou foi removido.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Preparar dados para o componente CourseDetail
  const courseDetailProps = {
    id: courseData.id,
    title: courseData.title,
    description: courseData.description,
    longDescription: courseData.longDescription,
    level: courseData.level,
    duration: courseData.duration,
    price: formatPrice(courseData.price),
    videoUrl: courseData.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    objectives: courseData.objectives || [
      'Dominar técnicas avançadas da área',
      'Identificar e mitigar riscos jurídicos',
      'Elaborar documentos específicos da área',
      'Analisar criticamente situações existentes',
      'Adaptar práticas às necessidades específicas dos clientes',
      'Aplicar a legislação pertinente de maneira eficaz',
      'Dominar estratégias de negociação',
      'Implementar sistemas de gestão eficazes',
    ],
    modules: courseData.moduleDetails || [
      {
        id: 1,
        title: 'Fundamentos da Área',
        duration: '45 min',
        lessons: [
          { title: 'Princípios básicos', duration: '15 min' },
          { title: 'Legislação aplicável', duration: '15 min' },
          { title: 'Elementos essenciais', duration: '15 min' },
        ],
      },
      {
        id: 2,
        title: 'Técnicas Práticas',
        duration: '1h 20min',
        lessons: [
          { title: 'Estrutura básica de documentos', duration: '20 min' },
          { title: 'Linguagem jurídica eficiente', duration: '15 min' },
          { title: 'Clareza vs. tecnicidade', duration: '15 min' },
          { title: 'Exercício prático', duration: '30 min' },
        ],
      },
      {
        id: 3,
        title: 'Elementos Essenciais',
        duration: '2h',
        lessons: [
          { title: 'Objeto e escopo', duration: '20 min' },
          { title: 'Prazos e condições', duration: '20 min' },
          { title: 'Obrigações das partes', duration: '25 min' },
          { title: 'Garantias', duration: '25 min' },
          { title: 'Confidencialidade', duration: '30 min' },
        ],
      },
      {
        id: 4,
        title: 'Gestão de Riscos',
        duration: '1h 30min',
        lessons: [
          { title: 'Identificação de riscos', duration: '20 min' },
          { title: 'Cláusulas de limitação', duration: '25 min' },
          { title: 'Multas e penalidades', duration: '25 min' },
          { title: 'Estudo de caso', duration: '20 min' },
        ],
      },
    ],
    instructor: {
      name: courseData.instructor,
      role: courseData.instructorRole,
      bio: courseData.instructorBio || `${courseData.instructor} é especialista com mais de 15 anos de experiência. Possui mestrado em Direito e é professor convidado em diversas instituições de ensino.`,
      initials: courseData.instructorInitials,
      photo: courseData.instructorPhoto,
    },
    instructors: courseData.instructors,
    category: courseData.category,
    promotedBy: courseData.promotedBy || {
      name: 'Escola Jurídica',
    },
    showRelatedCourses: relatedCoursesData.show,
    relatedCourses: relatedCoursesData.courses,
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-20">
        <CourseDetail {...courseDetailProps} />
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
