import { Camera, Video, Box, FileText, Instagram, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  {
    icon: Camera,
    title: "Professional Photography",
    description: "High-quality photos delivered in 24 hours that showcase properties in their best light",
    features: ["HDR Photography", "Twilight Shots", "Interior & Exterior", "Professional Editing"]
  },
  {
    icon: Video,
    title: "Video Tours",
    description: "Engaging video content delivered in 48 hours that brings properties to life",
    features: ["Cinematic Quality", "Smooth Transitions", "Professional Audio", "Multiple Formats"]
  },
  {
    icon: Box,
    title: "3D Virtual Tours",
    description: "Interactive 3D tours that give clients control and help properties sell faster",
    features: ["Immersive Experience", "Dollhouse View", "Floor Plan Integration", "Mobile Compatible"]
  },
  {
    icon: FileText,
    title: "Floor Plans",
    description: "Accurate and professional floor plans that help buyers understand space layout",
    features: ["Precise Measurements", "Professional Design", "Multiple Formats", "Quick Delivery"]
  },
  {
    icon: Instagram,
    title: "Social Media Content",
    description: "Eye-catching content optimized for social media platforms to boost your marketing",
    features: ["Instagram Ready", "Multiple Formats", "Branded Content", "Story Templates"]
  },
  {
    icon: Sparkles,
    title: "Custom Services",
    description: "Tailored solutions to meet your specific needs with Christian standards of excellence",
    features: ["Personalized Approach", "Flexible Solutions", "Quality Focused", "Client Honor"]
  }
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive real estate visual solutions designed to help you sell properties faster
            with creativity and attention to detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elegant scroll-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <service.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-hero rounded-2xl p-12 text-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to elevate your listings?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience the difference that professional photography and video can make 
              for your real estate business.
            </p>
            <Button className="btn-hero bg-white text-primary hover:bg-white/90">
              Book Your Session Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}