import { Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-8 sm:py-12">
      <div className="container-custom px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <a 
              href="/" 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname !== '/') {
                  window.location.href = '/';
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold">2818 Studios Media</span>
            </a>
            <p className="text-background/70 text-sm sm:text-base leading-relaxed">
              A distinctively Christian media company serving the DMV area with professional real estate photography, video, and 3D tours. Excellence captured and delivered.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-background/70 text-sm sm:text-base">
              <li>Professional Photography</li>
              <li>Video Tours</li>
              <li>3D Virtual Tours</li>
              <li>Floor Plans</li>
              <li>Social Media Content</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-background/70 text-sm sm:text-base">
              <li>Phone: +1 (703) 582-2541</li>
              <li>Email: info@2818studios.com</li>
              <li>Service Area: DMV (DC, MD, VA)</li>
              <li>WhatsApp Available</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-background/70 text-sm sm:text-base">
              <li>About Us</li>
              <li>Portfolio</li>
              <li>Services</li>
              <li>Contact</li>
              <li>Book Session</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-background/70 text-sm sm:text-base">
            ©2025 2818 Studios Media. All rights reserved. | Founded by Michael Mejía
          </p>
          <p className="text-background/50 text-xs sm:text-sm mt-2">
            Professional real estate media services in the Washington D.C. metropolitan area
          </p>
        </div>
      </div>
    </footer>
  );
}