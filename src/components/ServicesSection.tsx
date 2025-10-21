import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import photographyImg from '@/assets/service-photography.jpg';
import videoImg from '@/assets/service-video.jpg';
import tour3dImg from '@/assets/service-3d.jpg';
import floorplanImg from '@/assets/service-floorplan.jpg';
import socialImg from '@/assets/service-social.jpg';
import customImg from '@/assets/service-custom.jpg';

const services = [
  {
    image: photographyImg,
    title: "PROFESSIONAL PHOTOGRAPHY",
    subtitle: "REAL ESTATE PHOTOGRAPHY",
    description: "High-quality real estate photography delivered in 24 hours, designed to make your listings stand out and attract serious buyers.",
    delivery: "24-Hour Delivery"
  },
  {
    image: videoImg,
    title: "VIDEO TOURS",
    subtitle: "CINEMATIC STORYTELLING",
    description: "Cinematic quality video tours delivered in 48 hours that create emotional connections and help properties sell faster.",
    delivery: "48-Hour Delivery"
  },
  {
    image: tour3dImg,
    title: "3D VIRTUAL TOURS",
    subtitle: "IMMERSIVE EXPERIENCES",
    description: "Interactive 3D experiences using Matterport technology, delivered in 72 hours, giving your clients complete control over property exploration.",
    delivery: "72-Hour Delivery"
  },
  {
    image: floorplanImg,
    title: "FLOOR PLANS",
    subtitle: "ARCHITECTURAL CLARITY",
    description: "Professional floor plans that provide clarity about property layout and spatial organization for informed decision-making.",
    delivery: "Quick Delivery"
  },
  {
    image: socialImg,
    title: "SOCIAL MEDIA CONTENT",
    subtitle: "DIGITAL MARKETING",
    description: "Optimized content for Instagram, Facebook, and TikTok including vertical videos, reels, and custom graphics ready to publish.",
    delivery: "Same Day"
  },
  {
    image: customImg,
    title: "CUSTOM SERVICES",
    subtitle: "PERSONALIZED SOLUTIONS",
    description: "Personalized solutions including agent branding, presentation videos, and custom packages for high-volume clients.",
    delivery: "Flexible Timeline"
  }
];

export default function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 sm:mb-16 space-y-6 sm:space-y-0">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider leading-tight drop-shadow-lg">
              SELECTED
              <br />
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">SERVICES</span>
            </h2>
          </div>
          <Button 
            variant="ghost" 
            className="glass-button text-white hover:text-white transition-all group mb-0 sm:mb-4 self-start sm:self-auto text-sm sm:text-base"
            onClick={() => window.location.href = '/portfolio'}
          >
            VIEW PORTFOLIO
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl glass-card hover:shadow-glow transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => window.location.href = '/portfolio'}
            >
              {/* Background Image */}
              <div className="relative h-80 sm:h-96 lg:h-[500px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-overlay" />
              </div>
              
              {/* Content Overlay with glass effect */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
                <div className="glass-card rounded-2xl p-6 transform transition-all duration-300 group-hover:translate-y-[-8px]">
                  <div className="text-xs sm:text-sm font-medium text-brand-orange mb-2 tracking-wider">
                    {service.subtitle}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-wider leading-tight">
                    {service.title.split(' ').map((word, i) => (
                      <span key={i} className="block">
                        {word.split('').join(' ')}
                      </span>
                    ))}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-xs sm:text-sm font-medium">
                      {service.delivery}
                    </span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 group-hover:text-brand-orange group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-hero rounded-2xl p-6 sm:p-8 lg:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-wide leading-tight">
              Ready to elevate your listings?
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the difference that professional photography and video can make 
              for your real estate business.
            </p>
            <Button 
              className="btn-hero bg-white text-primary hover:bg-white/90 tracking-wide text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              onClick={() => window.open('https://order.2818studios.com/', '_blank')}
            >
              Book Your Session Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}