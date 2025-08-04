import { Award, Clock, Heart, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: "Christian Standards",
    description: "We honor our clients not just in our products, but in how we treat them with Christian values and integrity."
  },
  {
    icon: Sparkles,
    title: "Creativity & Detail",
    description: "Every photo and video is crafted with meticulous attention to detail and creative vision."
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Photos delivered in 24 hours, videos in 48 hours. We respect your time and deadlines."
  },
  {
    icon: Award,
    title: "Excellence First",
    description: "We're committed to delivering nothing less than excellence in every project we undertake."
  }
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-dark-bg text-dark-fg">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                About <span className="gradient-text">2818 Studios</span>
              </h2>
              <p className="text-xl text-dark-fg/80 leading-relaxed">
                We are a distinctively Christian company dedicated to attention to detail 
                and creativity in photography and video for real estate agents.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary">Our Mission</h3>
              <p className="text-lg text-dark-fg/70 leading-relaxed">
                To serve real estate professionals with excellence, helping them achieve 
                their sales goals through high-quality visual content while maintaining 
                the highest standards of integrity and service.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary">What Sets Us Apart</h3>
              <p className="text-lg text-dark-fg/70 leading-relaxed">
                Our commitment to creativity, attention to detail, and Christian standards 
                of service. We don't just create content – we build relationships based 
                on trust, quality, and mutual respect.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <value.icon className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-lg font-semibold text-dark-fg mb-3">
                  {value.title}
                </h4>
                <p className="text-dark-fg/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}