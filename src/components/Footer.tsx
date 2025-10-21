import { Camera, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-3 opacity-90"></div>
      
      {/* Glass overlay */}
      <div className="relative glass-card">
        <div className="container-custom px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
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
                <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg">2818 Studios Media</span>
              </a>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed drop-shadow">
                A distinctively Christian media company serving the DMV area with professional real estate photography, video, and 3D tours. Excellence captured and delivered.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4 pt-2">
                <a 
                  href="https://facebook.com/2818studios" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-button p-3 rounded-xl hover:scale-110 transition-all duration-300"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://instagram.com/2818studios" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-button p-3 rounded-xl hover:scale-110 transition-all duration-300"
                  aria-label="Visit our Instagram page"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white drop-shadow-lg">Services</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-white/90 text-sm sm:text-base">
                <li className="hover:text-white transition-colors cursor-pointer">Professional Photography</li>
                <li className="hover:text-white transition-colors cursor-pointer">Video Tours</li>
                <li className="hover:text-white transition-colors cursor-pointer">3D Virtual Tours</li>
                <li className="hover:text-white transition-colors cursor-pointer">Floor Plans</li>
                <li className="hover:text-white transition-colors cursor-pointer">Social Media Content</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white drop-shadow-lg">Contact</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-white/90 text-sm sm:text-base">
                <li className="hover:text-white transition-colors">Phone: +1 (703) 582-2541</li>
                <li className="hover:text-white transition-colors">Email: info@2818studios.com</li>
                <li className="hover:text-white transition-colors">Service Area: DMV (DC, MD, VA)</li>
                <li className="hover:text-white transition-colors">WhatsApp Available</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white drop-shadow-lg">Quick Links</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-white/90 text-sm sm:text-base">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Portfolio</li>
                <li className="hover:text-white transition-colors cursor-pointer">Services</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-white transition-colors cursor-pointer">Book Session</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-white/90 text-sm sm:text-base drop-shadow">
              ©2025 2818 Studios Media. All rights reserved. | Founded by Michael Mejía
            </p>
            <p className="text-white/80 text-xs sm:text-sm mt-2">
              Professional real estate media services in the Washington D.C. metropolitan area
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
