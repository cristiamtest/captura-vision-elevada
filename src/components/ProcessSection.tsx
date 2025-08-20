import { Calendar, Camera, Edit3, Send } from 'lucide-react';

const processSteps = [
  {
    icon: Calendar,
    step: "01",
    title: "Easy Booking",
    description: "Reserve your session via our website form, WhatsApp (+1 703-582-2541), or direct phone call. Simple and quick for busy agents."
  },
  {
    icon: Camera,
    step: "02", 
    title: "Confirmation",
    description: "We confirm your appointment details, timing, and specific requirements. No surprises, everything is clear from the start."
  },
  {
    icon: Edit3,
    step: "03",
    title: "Professional Shoot",
    description: "Our team captures your property with attention to detail and creativity. You don't need to be present during the session."
  },
  {
    icon: Send,
    step: "04",
    title: "Fast Delivery",
    description: "Receive your content via private digital link: Photos in 24hrs, Videos in 48hrs, 3D Tours in 72hrs. Fast and reliable."
  }
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A streamlined workflow designed for efficiency and excellence, 
            making it simple to get professional results fast.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary via-primary/50 to-transparent hidden lg:block" />
          
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-8 sm:gap-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:flex-row`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                  <div className="scroll-reveal" style={{ animationDelay: `${index * 0.2}s` }}>
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">
                      Step {step.step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-3 sm:mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow animate-float">
                    <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-muted/50 to-accent/50 border border-border">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              Ready to Get Started?
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
              Experience our simple, efficient process that delivers exceptional results 
              while honoring your time and investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                className="btn-hero text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                onClick={() => window.open('https://order.2818studios.com/', '_blank')}
              >
                Book Your Session
              </button>
              <button 
                className="btn-outline-hero border-foreground text-foreground hover:bg-foreground hover:text-background text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}