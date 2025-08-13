import { Award, Clock, Heart, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: "Christian Values",
    description: "We honor our clients not just in the products we deliver, but in how we treat them, guided by biblical principles of integrity and respect."
  },
  {
    icon: Clock,
    title: "Rapid Delivery",
    description: "Photos in 24 hours, videos in 48 hours, 3D tours in 72 hours - because timing is crucial in real estate success."
  },
  {
    icon: Sparkles,
    title: "Creative Excellence",
    description: "Attention to detail and creativity in every photograph and video, capturing the essence of each property with professional precision."
  },
  {
    icon: Award,
    title: "Simple Process",
    description: "Streamlined booking and delivery process designed for busy real estate professionals - from contact to final delivery."
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
                About <span className="gradient-text">2818 Studios Media</span>
              </h2>
              <p className="text-xl text-dark-fg/80 leading-relaxed mb-6">
                Founded and led by Michael Mejía, we are a distinctively Christian media company serving 
                the Washington D.C. metropolitan area, including Maryland and Virginia. With less than a year 
                in formal operation, we've established ourselves as a reliable and professional service.
              </p>
              <p className="text-lg text-dark-fg/70 leading-relaxed">
                What sets us apart is our commitment to biblical principles - we aim to honor our clients 
                in both the products we deliver and how we treat them, with ethics, integrity, and respect 
                as non-negotiable elements in every business relationship.
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