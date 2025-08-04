import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Camera, Video, Box, FileText } from 'lucide-react';

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
    subtitle: "Professional Real Estate Photography",
    description: "High-quality photography that showcases properties in their best light",
    icon: Camera
  },
  {
    id: 2,
    image: heroSlide2,
    title: "Dynamic Video Tours", 
    subtitle: "Immersive Property Experiences",
    description: "Engaging video content that brings properties to life",
    icon: Video
  },
  {
    id: 3,
    image: heroSlide3,
    title: "3D Virtual Tours",
    subtitle: "Interactive Property Exploration",
    description: "Cutting-edge 3D technology for comprehensive property viewing",
    icon: Box
  },
  {
    id: 4,
    image: heroSlide4,
    title: "Floor Plans & More",
    subtitle: "Complete Visual Solutions",
    description: "Professional floor plans and social media content",
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
            <div className="mb-8 animate-float">
              {slides[currentSlide].icon && 
                React.createElement(slides[currentSlide].icon, {
                  className: "w-16 h-16 text-primary mb-6"
                })
              }
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-bold text-white leading-tight hero-text">
                {slides[currentSlide].title}
              </h1>
              
              <h2 className="text-2xl lg:text-4xl font-light text-primary hero-text hero-text-delay">
                {slides[currentSlide].subtitle}
              </h2>
              
              <p className="text-xl lg:text-2xl text-white/80 max-w-2xl hero-text hero-text-delay">
                {slides[currentSlide].description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 hero-text hero-text-delay">
                <Button className="btn-hero text-lg">
                  Book with us today!
                </Button>
                <Button variant="outline" className="btn-outline-hero text-lg bg-transparent border-white text-white hover:bg-white hover:text-dark-bg">
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Side Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors p-2"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-6 z-20 text-white/60">
        <div className="flex items-center space-x-2">
          <div className="w-px h-12 bg-white/30"></div>
          <span className="text-sm font-light rotate-90 transform origin-left">scroll</span>
        </div>
      </div>
    </section>
  );
}