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
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A streamlined workflow designed for efficiency and excellence, 
            making it simple to get professional results fast.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary via-primary/50 to-transparent hidden lg:block" />
          
          <div className="space-y-8 sm:space-y-12 lg:space-y-24">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-6 sm:gap-8 lg:gap-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:flex-row`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                  <div className="scroll-reveal" style={{ animationDelay: `${index * 0.2}s` }}>
                    <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
                      Step {step.step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-3 sm:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow animate-float">
                    <step.icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
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
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-muted/50 to-accent/50 border border-border">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Experience our simple, efficient process that delivers exceptional results 
              while honoring your time and investment.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 justify-center">
              <button 
                className="btn-hero w-full sm:w-auto text-sm sm:text-base"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Book Your Session
              </button>
              <button 
                className="btn-outline-hero border-foreground text-foreground hover:bg-foreground hover:text-background w-full sm:w-auto text-sm sm:text-base"
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