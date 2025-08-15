import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Camera, Video, Box, FileText } from 'lucide-react';
import logoDark from '../assets/logo-dark.png';

// Import hero images
import heroSlide1 from '@/assets/hero-slide-1.jpg';
import heroSlide2 from '@/assets/hero-slide-2.jpg';
import heroSlide3 from '@/assets/hero-slide-3.jpg';
import heroSlide4 from '@/assets/hero-slide-4.jpg';

const slides = [
  {
    id: 1,
    image: heroSlide1,
    title: "Excellence Captured",
    subtitle: "and Delivered",
    description: "Professional real estate photography and video services guided by Christian values and delivered with exceptional quality in the DMV area",
    icon: Camera
  },
  {
    id: 2,
    image: heroSlide2,
    title: "Fast Delivery", 
    subtitle: "Photos in 24hrs, Videos in 48hrs",
    description: "Quick turnaround times without compromising quality - helping real estate agents close deals faster",
    icon: Video
  },
  {
    id: 3,
    image: heroSlide3,
    title: "3D Virtual Tours",
    subtitle: "Immersive Property Exploration",
    description: "Give your clients control with interactive 3D tours delivered in 72 hours using Matterport technology",
    icon: Box
  },
  {
    id: 4,
    image: heroSlide4,
    title: "Simple Booking",
    subtitle: "Professional Service Made Easy",
    description: "From booking to delivery - our streamlined process makes professional media effortless for busy agents",
    icon: FileText
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleBookSession = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewPortfolio = () => {
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden bg-dark-bg">


      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-4xl">
            {/* Icon */}
            <div className="mb-4 sm:mb-8 animate-float">
              {slides[currentSlide].icon && 
                React.createElement(slides[currentSlide].icon, {
                  className: "w-12 h-12 sm:w-16 sm:h-16 text-primary mb-4 sm:mb-6"
                })
              }
            </div>

            {/* Main Content */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-white leading-tight hero-text">
                {slides[currentSlide].title}
              </h1>
              
              <h2 className="text-lg sm:text-xl lg:text-4xl font-light text-primary hero-text hero-text-delay">
                {slides[currentSlide].subtitle}
              </h2>
              
              <p className="text-base sm:text-lg lg:text-2xl text-white/80 max-w-2xl hero-text hero-text-delay leading-relaxed">
                {slides[currentSlide].description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-6 sm:pt-8 hero-text hero-text-delay">
                <Button 
                  className="btn-hero text-base sm:text-lg w-full sm:w-auto"
                  onClick={handleBookSession}
                >
                  Book with us today!
                </Button>
                <Button 
                  variant="outline" 
                  className="btn-outline-hero text-base sm:text-lg bg-transparent border-white text-white hover:bg-white hover:text-dark-bg w-full sm:w-auto"
                  onClick={handleViewPortfolio}
                >
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3 sm:space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary w-6 sm:w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Side Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-1 sm:p-2"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-1 sm:p-2"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 sm:bottom-16 left-2 sm:left-6 z-20 text-white/60 hidden sm:flex">
        <div className="flex items-center space-x-2">
          <div className="w-px h-12 bg-white/30"></div>
          <span className="text-sm font-light rotate-90 transform origin-left">scroll</span>
        </div>
      </div>
    </section>
  );
}