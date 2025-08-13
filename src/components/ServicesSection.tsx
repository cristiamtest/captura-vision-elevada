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
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-6xl lg:text-7xl font-bold text-foreground tracking-wider">
              SELECTED
              <br />
              <span className="text-brand-orange">SERVICES</span>
            </h2>
          </div>
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground transition-colors group mb-4"
          >
            SEE ALL SERVICES
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-muted/30 hover:shadow-glow transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <div className="relative h-96 lg:h-[500px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <div className="text-sm font-medium text-brand-orange mb-2 tracking-wider">
                    {service.subtitle}
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-wider leading-tight">
                    {service.title.split(' ').map((word, i) => (
                      <span key={i} className="block">
                        {word.split('').join(' ')}
                      </span>
                    ))}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">
                      {service.delivery}
                    </span>
                    <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-brand-orange group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-hero rounded-2xl p-12 text-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-wide">
              Ready to elevate your listings?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience the difference that professional photography and video can make 
              for your real estate business.
            </p>
            <Button className="btn-hero bg-white text-primary hover:bg-white/90 tracking-wide">
              Book Your Session Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}