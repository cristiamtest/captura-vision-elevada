import { useState, useEffect } from 'react';
import { storage, ref, listAll, getDownloadURL } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Grid3X3, Grid2X2, Rows3, X, ChevronLeft, ChevronRight, RefreshCw, AlertCircle, Play, Video } from 'lucide-react';
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

interface PortfolioVideo {
  url: string;
  id: string;
  name?: string;
}

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid-3');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [allImages, setAllImages] = useState<PortfolioImage[]>([]);
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [allVideos, setAllVideos] = useState<PortfolioVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [visibleVideoCount, setVisibleVideoCount] = useState(6);
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');

  useEffect(() => {
    loadImages();
    loadVideos();
  }, []);

  useEffect(() => {
    setImages(allImages.slice(0, visibleCount));
  }, [allImages, visibleCount]);

  useEffect(() => {
    setVideos(allVideos.slice(0, visibleVideoCount));
  }, [allVideos, visibleVideoCount]);

  const loadImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const portfolioRef = ref(storage, 'portfolio');
      const result = await listAll(portfolioRef);
      
      if (result.items.length === 0) {
        setImages([]);
        setLoading(false);
        return;
      }
      
      const imagePromises = result.items.map(async (imageRef) => {
        try {
          const url = await getDownloadURL(imageRef);
          const optimizedUrl = url.includes('?') 
            ? `${url}&w=800&h=600&fit=crop&fm=webp&q=80`
            : `${url}?w=800&h=600&fit=crop&fm=webp&q=80`;
          
          return {
            id: imageRef.name,
            url: optimizedUrl,
            originalUrl: url,
            name: imageRef.name
          };
        } catch (urlError) {
          console.error(`Error getting URL for ${imageRef.name}:`, urlError);
          return null;
        }
      });
      
      const portfolioImages = await Promise.all(imagePromises);
      const validImages = portfolioImages
        .filter((img) => img !== null) as PortfolioImage[];
        .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      
      setAllImages(validImages);
      setImages(validImages.slice(0, visibleCount));
      setLoading(false);
      
    } catch (error) {
      console.error('Error loading images:', error);
      setError(`Failed to load images: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setImages([]);
      setLoading(false);
    }
  };

  const loadVideos = async () => {
    try {
      setVideoLoading(true);
      setVideoError(null);
      
      const videosRef = ref(storage, 'videos');
      const result = await listAll(videosRef);
      
      if (result.items.length === 0) {
        setVideos([]);
        setVideoLoading(false);
        return;
      }
      
      const videoPromises = result.items.map(async (videoRef) => {
        try {
          const url = await getDownloadURL(videoRef);
          return {
            id: videoRef.name,
            url: url,
            name: videoRef.name
          };
        } catch (urlError) {
          console.error(`Error getting URL for ${videoRef.name}:`, urlError);
          return null;
        }
      });
      
      const portfolioVideos = await Promise.all(videoPromises);
      const validVideos = portfolioVideos
        .filter((video) => video !== null) as PortfolioVideo[];
        .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      
      setAllVideos(validVideos);
      setVideos(validVideos.slice(0, visibleVideoCount));
      setVideoLoading(false);
      
    } catch (error) {
      console.error('Error loading videos:', error);
      setVideoError(`Failed to load videos: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setVideos([]);
      setVideoLoading(false);
    }
  };

  const refreshImages = () => loadImages();
  const refreshVideos = () => loadVideos();

  const getGridClass = () => {
    switch (viewMode) {
      case 'grid-2': return 'grid-cols-1 md:grid-cols-2';
      case 'grid-3': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 'grid-4': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 'masonry': return 'columns-1 md:columns-2 lg:columns-3';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % images.length
      : (selectedImage - 1 + images.length) % images.length;
    
    setSelectedImage(newIndex);
  };

  const handleBookSession = () => {
    window.open('https://order.2818studios.com/', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
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
              
              <Button 
                className="btn-hero text-lg px-8 py-4 mb-12"
                onClick={handleBookSession}
              >
                Book Your Session Today
              </Button>
            </div>

            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-muted/30 rounded-xl p-2">
                <Button
                  variant={activeTab === 'images' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('images')}
                  className="px-6 py-2 flex items-center space-x-2"
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span>Photography</span>
                </Button>
                <Button
                  variant={activeTab === 'videos' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('videos')}
                  className="px-6 py-2 flex items-center space-x-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Videos</span>
                </Button>
              </div>
            </div>

            {activeTab === 'images' && (
              <>
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

                {!loading && !error && (
                  <div className="text-center mb-6">
                    <p className="text-muted-foreground">
                      Showing {images.length} of {allImages.length} {allImages.length === 1 ? 'image' : 'images'}
                    </p>
                  </div>
                )}

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

                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="aspect-[4/3] bg-muted/30 rounded-xl animate-pulse" />
                    ))}
                  </div>
                )}

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
              </>
            )}

            {activeTab === 'videos' && (
              <>
                <div className="flex justify-center mb-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshVideos}
                    disabled={videoLoading}
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${videoLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </Button>
                </div>

                {!videoLoading && !videoError && (
                  <div className="text-center mb-6">
                    <p className="text-muted-foreground">
                      Showing {videos.length} of {allVideos.length} {allVideos.length === 1 ? 'video' : 'videos'}
                    </p>
                  </div>
                )}

                {videoError && (
                  <div className="text-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <AlertCircle className="w-12 h-12 text-destructive" />
                      <h3 className="text-lg font-semibold text-foreground">Failed to Load Videos</h3>
                      <p className="text-muted-foreground max-w-md">{videoError}</p>
                      <Button onClick={refreshVideos} className="btn-hero">
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}

                {videoLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="aspect-video bg-muted/30 rounded-xl animate-pulse" />
                    ))}
                  </div>
                )}

                {!videoLoading && !videoError && videos.length === 0 && (
                  <div className="text-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <Video className="w-12 h-12 text-muted-foreground" />
                      <h3 className="text-lg font-semibold text-foreground">No Videos Found</h3>
                      <p className="text-muted-foreground max-w-md">
                        No videos were found in the videos folder. Upload some videos to Firebase Storage 
                        in the "videos" folder to see them here.
                      </p>
                      <Button onClick={refreshVideos} variant="outline">
                        Refresh
                      </Button>
                    </div>
                  </div>
                )}

                {!videoLoading && !videoError && videos.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <div
                        key={video.id}
                        className="group relative aspect-video overflow-hidden rounded-2xl bg-muted/30 hover:shadow-glow transition-all duration-500"
                      >
                        <video
                          src={video.url}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          controls
                          preload="metadata"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                          <div className="bg-primary/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-white fill-white" />
                          </div>
                        </div>
                        
                        <Button
                          className="absolute top-4 right-4 btn-hero text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookSession();
                          }}
                        >
                          Book Session
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {!videoLoading && !videoError && allVideos.length > videos.length && (
                  <div className="text-center mt-12 mb-16">
                    <Button
                      onClick={() => setVisibleVideoCount(prev => Math.min(prev + 6, allVideos.length))}
                      variant="outline"
                      className="px-8 py-3 text-lg"
                    >
                      Load More Videos ({allVideos.length - videos.length} remaining)
                    </Button>
                  </div>
                )}
              </>
            )}

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
                  onClick={handleBookSession}
                >
                  Book Your Session Today
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedImage !== null && activeTab === 'images' && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 p-2"
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            className="absolute top-4 left-4 z-10 btn-hero text-sm px-4 py-2"
            onClick={handleBookSession}
          >
            Book Session
          </Button>

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

          <div className="max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={images[selectedImage].originalUrl || images[selectedImage].url}
              alt="Real estate photography"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}