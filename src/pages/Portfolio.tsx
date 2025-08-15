import { useState, useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Grid3X3, Grid2X2, Rows3, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type ViewMode = 'grid-2' | 'grid-3' | 'grid-4' | 'masonry';

interface PortfolioImage {
  url: string;
  id: string;
}

export default function Portfolio() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid-3');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const storage = getStorage();
      const portfolioRef = ref(storage, 'portfolio');
      
      // For demo purposes, using placeholder images
      const demoImages: PortfolioImage[] = [
        { id: '1', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80' },
        { id: '2', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80' },
        { id: '3', url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80' },
        { id: '4', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
        { id: '5', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80' },
        { id: '6', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80' },
        { id: '7', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
        { id: '8', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
        { id: '9', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80' },
        { id: '10', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
        { id: '11', url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80' },
        { id: '12', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' },
      ];
      
      setImages(demoImages);
      setLoading(false);
    } catch (error) {
      console.error('Error loading images:', error);
      setLoading(false);
    }
  };

  const getGridClass = () => {
    switch (viewMode) {
      case 'grid-2': return 'grid-cols-1 md:grid-cols-2';
      case 'grid-3': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 'grid-4': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 'masonry': return 'columns-1 md:columns-2 lg:columns-3';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % images.length
      : (selectedImage - 1 + images.length) % images.length;
    
    setSelectedImage(newIndex);
  };

  const scrollToContact = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-[0.2em]">
                P O R T F O L I O
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Explore our collection of professional real estate photography, video tours, 
                and 3D experiences that help properties sell faster.
              </p>
              
              {/* Book Session CTA */}
              <Button 
                className="btn-hero text-lg px-8 py-4 mb-12"
                onClick={scrollToContact}
              >
                Book Your Session Today
              </Button>
            </div>

            {/* View Mode Controls */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-muted/30 rounded-xl p-2">
                <Button
                  variant={viewMode === 'grid-2' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid-2')}
                  className="p-2"
                >
                  <Grid2X2 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid-3' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid-3')}
                  className="p-2"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid-4' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid-4')}
                  className="p-2"
                >
                  <Rows3 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="aspect-[4/3] bg-muted/30 rounded-xl animate-pulse" />
                ))}
              </div>
            )}

            {/* Image Gallery */}
            {!loading && (
              <div className={viewMode === 'masonry' ? getGridClass() : `grid ${getGridClass()} gap-6`}>
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`group cursor-pointer ${viewMode === 'masonry' ? 'break-inside-avoid mb-6' : 'aspect-[4/3]'} overflow-hidden rounded-2xl bg-muted/30 hover:shadow-glow transition-all duration-500`}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.url}
                      alt="Real estate photography"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="bg-gradient-hero rounded-2xl p-8 lg:p-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-wide">
                  Ready to create stunning visuals?
                </h3>
                <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Let's capture your property with the same professional quality you see here.
                </p>
                <Button 
                  className="btn-hero bg-white text-primary hover:bg-white/90 text-lg px-8 py-4"
                  onClick={scrollToContact}
                >
                  Book Your Session Today
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 p-2"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Book Session Button in Lightbox */}
          <Button
            className="absolute top-4 left-4 z-10 btn-hero text-sm px-4 py-2"
            onClick={scrollToContact}
          >
            Book Session
          </Button>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateImage('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateImage('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Main Image */}
          <div className="max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={images[selectedImage].url}
              alt="Real estate photography"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}