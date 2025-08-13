import { Camera, Video, Box, FileText, Instagram, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  {
    icon: Camera,
    title: "Professional Photography",
    description: "High-quality real estate photography delivered in 24 hours, designed to make your listings stand out and attract serious buyers.",
    features: ["24-Hour Delivery", "HDR Processing", "Professional Editing", "Multiple Angles", "High Resolution Images"]
  },
  {
    icon: Video,
    title: "Video Tours",
    description: "Cinematic quality video tours delivered in 48 hours that create emotional connections and help properties sell faster.",
    features: ["48-Hour Delivery", "Cinematic Quality", "Story-Driven Approach", "Multiple Formats", "Social Media Ready"]
  },
  {
    icon: Box,
    title: "3D Virtual Tours",
    description: "Interactive 3D experiences using Matterport technology, delivered in 72 hours, giving your clients complete control over property exploration.",
    features: ["72-Hour Delivery", "Matterport Technology", "Interactive Elements", "Mobile Compatible", "Global Accessibility"]
  },
  {
    icon: FileText,
    title: "Floor Plans",
    description: "Professional floor plans that provide clarity about property layout and spatial organization for informed decision-making.",
    features: ["Accurate Measurements", "Professional Design", "Clear Layout", "Quick Delivery", "Multiple Formats"]
  },
  {
    icon: Instagram,
    title: "Social Media Content",
    description: "Optimized content for Instagram, Facebook, and TikTok including vertical videos, reels, and custom graphics ready to publish.",
    features: ["Vertical Videos", "Instagram Reels", "Facebook Posts", "TikTok Ready", "Custom Graphics"]
  },
  {
    icon: Sparkles,
    title: "Custom Services",
    description: "Personalized solutions including agent branding, presentation videos, and custom packages for high-volume clients.",
    features: ["Agent Branding", "Custom Packages", "Personal Videos", "Volume Discounts", "Consultation Included"]
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