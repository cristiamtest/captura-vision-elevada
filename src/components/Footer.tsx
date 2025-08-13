import { Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Camera className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">2818 Studios Media</span>
            </div>
            <p className="text-background/70">
              A distinctively Christian media company serving the DMV area with professional real estate photography, video, and 3D tours. Excellence captured and delivered.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-background/70">
              <li>Professional Photography</li>
              <li>Video Tours</li>
              <li>3D Virtual Tours</li>
              <li>Floor Plans</li>
              <li>Social Media Content</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-background/70">
              <li>Phone: +1 (703) 582-2541</li>
              <li>Email: 2818_Studios@proton.me</li>
              <li>Service Area: DMV (DC, MD, VA)</li>
              <li>WhatsApp Available</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/70">
              <li>About Us</li>
              <li>Portfolio</li>
              <li>Services</li>
              <li>Contact</li>
              <li>Book Session</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/70">
            © 2024 2818 Studios Media. All rights reserved. | Founded by Michael Mejía
          </p>
          <p className="text-background/50 text-sm mt-2">
            Professional real estate media services in the Washington D.C. metropolitan area
          </p>
        </div>
      </div>
    </footer>
  );
}