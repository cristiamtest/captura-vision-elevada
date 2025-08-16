import { useState, useEffect } from 'react';
import { storage, ref, listAll, getDownloadURL } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Grid3X3, Grid2X2, Rows3, X, ChevronLeft, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';

type ViewMode = 'grid-2' | 'grid-3' | 'grid-4' | 'masonry';

interface PortfolioImage {
  url: string;
  originalUrl?: string;
  id: string;
  name?: string;
}

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid-3');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [allImages, setAllImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    loadImages();
  }, []);

  // Update visible images when visibleCount changes
  useEffect(() => {
    setImages(allImages.slice(0, visibleCount));
  }, [allImages, visibleCount]);

  const loadImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Starting to load images from Firebase Storage...');
      
      // Reference to the 'portfolio' folder in Firebase Storage
      const portfolioRef = ref(storage, 'portfolio');
      console.log('📁 Portfolio reference created:', portfolioRef.fullPath);
      
      // List all items in the portfolio folder
      const result = await listAll(portfolioRef);
      console.log('📋 Storage listing result:', {
        items: result.items.length,
        prefixes: result.prefixes.length,
        itemNames: result.items.map(item => item.name)
      });
      
      if (result.items.length === 0) {
        console.log('❌ No images found in portfolio folder');
        setImages([]);
        setLoading(false);
        return;
      }
      
      // Get download URLs for all images with optimization
      const imagePromises = result.items.map(async (imageRef) => {
        try {
          const url = await getDownloadURL(imageRef);
          
          // Create optimized URL for faster loading (smaller size for gallery)
          const optimizedUrl = url.includes('?') 
            ? `${url}&w=800&h=600&fit=crop&fm=webp&q=80`
            : `${url}?w=800&h=600&fit=crop&fm=webp&q=80`;
          
          return {
            id: imageRef.name,
            url: optimizedUrl,
            originalUrl: url, // Keep original for lightbox
            name: imageRef.name
          };
        } catch (urlError) {
          console.error(`Error getting URL for ${imageRef.name}:`, urlError);
          return null;
        }
      });
      
      const portfolioImages = await Promise.all(imagePromises);
      
      // Filter out any failed downloads and sort by name
      const validImages = portfolioImages
        .filter((img): img is PortfolioImage => img !== null)
        .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      
      setAllImages(validImages);
      setImages(validImages.slice(0, visibleCount));
      setLoading(false);
      
      console.log(`✅ Successfully loaded ${validImages.length} images from portfolio:`, validImages);
      
    } catch (error) {
      console.error('❌ Error loading images from Firebase Storage:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: (error as any)?.code,
        stack: error instanceof Error ? error.stack : undefined
      });
      setError(`Failed to load images: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setImages([]);
      setLoading(false);
    }
  };

  const refreshImages = () => {
    loadImages();
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

            {/* View Mode Controls and Refresh */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
              
              {/* Refresh Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={refreshImages}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
            </div>

            {/* Image Count Display */}
            {!loading && !error && (
              <div className="text-center mb-6">
                <p className="text-muted-foreground">
                  Showing {images.length} of {allImages.length} {allImages.length === 1 ? 'image' : 'images'}
                </p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                  <h3 className="text-lg font-semibold text-foreground">Failed to Load Portfolio</h3>
                  <p className="text-muted-foreground max-w-md">{error}</p>
                  <Button onClick={refreshImages} className="btn-hero">
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="aspect-[4/3] bg-muted/30 rounded-xl animate-pulse" />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && images.length === 0 && (
              <div className="text-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <Grid3X3 className="w-12 h-12 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">No Images Found</h3>
                  <p className="text-muted-foreground max-w-md">
                    No images were found in the portfolio folder. Upload some images to Firebase Storage 
                    in the "portfolio" folder to see them here.
                  </p>
                  <Button onClick={refreshImages} variant="outline">
                    Refresh
                  </Button>
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {!loading && !error && images.length > 0 && (
              <div className={viewMode === 'masonry' ? getGridClass() : `grid ${getGridClass()} gap-6`}>
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`group cursor-pointer ${viewMode === 'masonry' ? 'break-inside-avoid mb-6' : 'aspect-[4/3]'} overflow-hidden rounded-2xl bg-muted/30 hover:shadow-glow transition-all duration-500`}
                    onClick={() => openLightbox(index)}
                  >
                    <OptimizedImage
                      src={image.url}
                      alt={`Real estate photography - ${image.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      index={index}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {!loading && !error && allImages.length > images.length && (
              <div className="text-center mt-12 mb-16">
                <Button
                  onClick={() => setVisibleCount(prev => Math.min(prev + 6, allImages.length))}
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Load More Images ({allImages.length - images.length} remaining)
                </Button>
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
              src={images[selectedImage].originalUrl || images[selectedImage].url}
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