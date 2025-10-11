import Hero from '@/components/home/Hero';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import AboutSection from '@/components/home/AboutSection';
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
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-ejup-darkBg">
            {/* Efeitos de iluminação compartilhados */}
            <div className="absolute top-[3%] left-[-10%] w-[50%] h-[35%] bg-[#29D6E6]/12 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-[-15%] left-[15%] w-[55%] h-[40%] bg-[#29D6E6]/8 blur-[180px] rounded-full"></div>
            <div className="absolute top-[-10%] right-[-15%] w-[80%] h-[60%] bg-[#29D6E6]/8 blur-[200px] rounded-full"></div>
            <div className="absolute top-[40%] right-[-10%] w-[50%] h-[35%] bg-[#29D6E6]/12 blur-[150px] rounded-full"></div>
          </div>
          <AboutSection />
          <ContentPreview />
          <PartnersShowcase />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
