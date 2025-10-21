import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ProcessSection from '@/components/ProcessSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-1">
      <Navigation />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="services" className="relative">
          <div className="absolute inset-0 bg-gradient-2 opacity-80"></div>
          <div className="relative">
            <ServicesSection />
          </div>
        </section>
        
        <section id="about" className="relative">
          <div className="absolute inset-0 bg-gradient-4 opacity-80"></div>
          <div className="relative">
            <AboutSection />
          </div>
        </section>
        
        <section id="process" className="relative">
          <div className="absolute inset-0 bg-gradient-1 opacity-80"></div>
          <div className="relative">
            <ProcessSection />
          </div>
        </section>
        
        <section id="faq" className="relative">
          <div className="absolute inset-0 bg-gradient-3 opacity-80"></div>
          <div className="relative">
            <FAQSection />
          </div>
        </section>
        
        <section id="contact" className="relative">
          <div className="absolute inset-0 bg-gradient-2 opacity-80"></div>
          <div className="relative">
            <ContactSection />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
