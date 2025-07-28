import Hero from '@/components/home/Hero';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import PartnersShowcase from '@/components/home/PartnersShowcase';
import ContentPreview from '@/components/home/ContentPreview';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main>
        <Hero />
        <FeaturedCourses />
        <ContentPreview />
        <PartnersShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
