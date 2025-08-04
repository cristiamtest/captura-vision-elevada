import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    info: "(703) 582-2541",
    action: "Call Us"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp", 
    info: "(703) 582-2541",
    action: "Message Us"
  },
  {
    icon: Mail,
    title: "Email",
    info: "2818_Studios@proton.me",
    action: "Send Email"
  },
  {
    icon: MapPin,
    title: "Service Area",
    info: "Northern Virginia",
    action: "View Coverage"
  }
];

export default function ContactSection() {
  return (
    <section className="section-padding bg-dark-bg text-dark-fg">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                Let's <span className="gradient-text">Connect</span>
              </h2>
              <p className="text-xl text-dark-fg/80 leading-relaxed">
                Ready to elevate your property listings? Contact us today and 
                experience the 2818 Studios difference.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 scroll-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <contact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-dark-fg">{contact.title}</h4>
                    <p className="text-dark-fg/70">{contact.info}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                    {contact.action}
                  </Button>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="pt-8 border-t border-white/10">
              <h4 className="font-semibold text-dark-fg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Instagram
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-dark-fg mb-6">Book Your Session</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-fg mb-2">
                    First Name
                  </label>
                  <Input 
                    placeholder="Michael"
                    className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-fg mb-2">
                    Last Name
                  </label>
                  <Input 
                    placeholder="Mejia"
                    className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-fg mb-2">
                  Email Address
                </label>
                <Input 
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-fg mb-2">
                  Phone Number
                </label>
                <Input 
                  type="tel"
                  placeholder="(703) 582-2541"
                  className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-fg mb-2">
                  Property Address
                </label>
                <Input 
                  placeholder="123 Main Street, City, State"
                  className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-fg mb-2">
                  Services Needed
                </label>
                <Textarea 
                  placeholder="Photography, Video Tours, 3D Tours, Floor Plans..."
                  rows={4}
                  className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50"
                />
              </div>

              <Button className="w-full btn-hero">
                Book Your Session Today
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}