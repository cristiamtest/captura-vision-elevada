import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import logoDark from '../assets/logo-dark.png';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-0">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src={logoDark} 
                alt="2818 Studios Real Estate Media" 
                className="h-20 sm:h-18 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base"
                onClick={item.href.startsWith('#') ? (e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    window.location.href = '/' + item.href;
                  } else {
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }
                } : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="btn-hero text-sm lg:text-base px-4 lg:px-8 py-2 lg:py-4"
              onClick={() => window.open('https://order.2818studios.com/', '_blank')}
            >
              Book Session
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-white">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg py-2 px-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (item.href.startsWith('#') && window.location.pathname !== '/') {
                      window.location.href = '/' + item.href;
                    } else if (item.href.startsWith('#')) {
                      setTimeout(() => {
                        const element = document.querySelector(item.href);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4">
                <Button 
                  className="w-full btn-hero text-lg py-4"
                  onClick={() => {
                    window.open('https://order.2818studios.com/', '_blank');
                    setIsMenuOpen(false);
                  }}
                >
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}