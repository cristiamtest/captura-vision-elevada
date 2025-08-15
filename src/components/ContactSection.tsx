import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const contactInfo = [
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    info: "+1 (703) 582-2541",
    action: "Call Now"
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
    info: "Washington D.C., Maryland & Virginia",
    action: "DMV Coverage"
  }
];

export default function ContactSection() {
  return (
    <section className="section-padding bg-dark-bg text-dark-fg">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Book with Us <span className="gradient-text">Today!</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-dark-fg/80 leading-relaxed">
                Ready to showcase your properties with professional media services delivered with Christian values? 
                Contact Michael Mejía and the 2818 Studios team - we're here to help you achieve your sales goals.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 scroll-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-dark-fg text-sm sm:text-base">{contact.title}</h4>
                    <p className="text-dark-fg/70 text-xs sm:text-sm truncate">{contact.info}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary text-primary hover:bg-primary hover:text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 flex-shrink-0"
                    onClick={() => {
                      if (contact.title === "Phone & WhatsApp") {
                        window.open("tel:+17035822541", "_self");
                      } else if (contact.title === "Email") {
                        window.open("mailto:2818_Studios@proton.me", "_self");
                      }
                    }}
                  >
                    {contact.action}
                  </Button>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="pt-8 border-t border-white/10">
              <h4 className="font-semibold text-dark-fg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => window.open("https://facebook.com/2818studios", "_blank")}
                >
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => window.open("https://instagram.com/2818studios", "_blank")}
                >
                  Instagram
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-dark-fg mb-4 sm:mb-6">Book Your Session</h3>
            
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-dark-fg mb-1 sm:mb-2">
                    First Name
                  </label>
                  <Input 
                    placeholder="Michael"
                    className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50 text-sm sm:text-base h-10 sm:h-11"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-dark-fg mb-1 sm:mb-2">
                    Last Name
                  </label>
                  <Input 
                    placeholder="Mejia"
                    className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50 text-sm sm:text-base h-10 sm:h-11"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-dark-fg mb-1 sm:mb-2">
                  Email Address
                </label>
                <Input 
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50 text-sm sm:text-base h-10 sm:h-11"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-dark-fg mb-1 sm:mb-2">
                  Phone Number
                </label>
                <Input 
                  type="tel"
                  placeholder="(703) 582-2541"
                  className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50 text-sm sm:text-base h-10 sm:h-11"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-dark-fg mb-1 sm:mb-2">
                  Property Address
                </label>
                <Input 
                  placeholder="123 Main Street, City, State"
                  className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50 text-sm sm:text-base h-10 sm:h-11"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-dark-fg mb-1 sm:mb-2">
                  Services Needed
                </label>
                <Textarea 
                  placeholder="Photography, Video Tours, 3D Tours, Floor Plans..."
                  rows={3}
                  className="bg-white/10 border-white/20 text-dark-fg placeholder:text-dark-fg/50 text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
                />
              </div>

              <Button className="w-full btn-hero text-sm sm:text-base h-10 sm:h-11">
                Book Your Session Today
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}