import { useState, useEffect } from 'react';
import { storage, ref, listAll, getDownloadURL } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Grid3X3, Grid2X2, Rows3, X, ChevronLeft, ChevronRight, RefreshCw, AlertCircle, Video, Play, Maximize, FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import { fetchMedia, MediaItem } from '@/lib/media';
import MoreWork from '@/components/MoreWork';

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
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<number | null>(null);
  
  // Images state
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [firebaseImages, setAllImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Videos state
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [firebaseVideos, setAllVideos] = useState<PortfolioVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [errorVideos, setErrorVideos] = useState<string | null>(null);
  const [visibleVideoCount, setVisibleVideoCount] = useState(6);

  // Floor Plans state
  const [floorPlans, setFloorPlans] = useState<PortfolioImage[]>([]);
  const [firebaseFloorPlans, setAllFloorPlans] = useState<PortfolioImage[]>([]);
  const [loadingFloorPlans, setLoadingFloorPlans] = useState(true);
  const [errorFloorPlans, setErrorFloorPlans] = useState<string | null>(null);
  const [visibleFloorPlanCount, setVisibleFloorPlanCount] = useState(6);

  const [cloud, setCloud] = useState<MediaItem[]>([]);
  useEffect(() => {
    fetchMedia().then(setCloud).catch(() => setCloud([]));
  }, []);
  const toImg = (m: MediaItem): PortfolioImage => ({ id: m.id, url: m.url, originalUrl: m.url, name: m.title || '' });
  const cloudPhotos = cloud.filter(m => m.category === 'photos' && m.media_type === 'image').map(toImg);
  const cloudPlans = cloud.filter(m => m.category === 'floor-plans' && m.media_type === 'image').map(toImg);
  const cloudVideos = cloud.filter(m => (m.category === 'videos' || m.category === 'aerial') && m.media_type === 'video').map(m => ({ id: m.id, url: m.url, name: m.title || '' }));
  const allImages = [...cloudPhotos, ...firebaseImages];
  const allVideos = [...cloudVideos, ...firebaseVideos];
  const allFloorPlans = [...cloudPlans, ...firebaseFloorPlans];
  const hasCloudImages = cloudPhotos.length > 0;
  const hasCloudVideos = cloudVideos.length > 0;
  const hasCloudPlans = cloudPlans.length > 0;

  useEffect(() => {
    loadImages();
    loadVideos();
    loadFloorPlans();
  }, []);

  // Update visible images when visibleCount changes
  useEffect(() => {
    setImages(allImages.slice(0, visibleCount));
  }, [allImages.length, visibleCount, cloud, firebaseImages]);

  // Update visible videos when visibleVideoCount changes
  useEffect(() => {
    setVideos(allVideos.slice(0, visibleVideoCount));
  }, [allVideos.length, visibleVideoCount, cloud, firebaseVideos]);

  // Update visible floor plans when visibleFloorPlanCount changes
  useEffect(() => {
    setFloorPlans(allFloorPlans.slice(0, visibleFloorPlanCount));
  }, [allFloorPlans.length, visibleFloorPlanCount, cloud, firebaseFloorPlans]);

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
      const validImages = (portfolioImages.filter(Boolean) as PortfolioImage[])
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

  const loadVideos = async () => {
    try {
      setLoadingVideos(true);
      setErrorVideos(null);
      
      console.log('🔄 Starting to load videos from Firebase Storage...');
      
      // Reference to the 'videos-portfolio' folder in Firebase Storage
      const videosRef = ref(storage, 'videos-portfolio');
      console.log('📁 Videos reference created:', videosRef.fullPath);
      
      // List all items in the videos-portfolio folder
      const result = await listAll(videosRef);
      console.log('📋 Videos listing result:', {
        items: result.items.length,
        prefixes: result.prefixes.length,
        itemNames: result.items.map(item => item.name)
      });
      
      if (result.items.length === 0) {
        console.log('❌ No videos found in videos-portfolio folder');
        setVideos([]);
        setLoadingVideos(false);
        return;
      }
      
      // Get download URLs for all videos
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
      
      // Filter out any failed downloads and sort by name
      const validVideos = (portfolioVideos.filter(Boolean) as PortfolioVideo[])
        .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      
      setAllVideos(validVideos);
      setVideos(validVideos.slice(0, visibleVideoCount));
      setLoadingVideos(false);
      
      console.log(`✅ Successfully loaded ${validVideos.length} videos from videos-portfolio:`, validVideos);
      
    } catch (error) {
      console.error('❌ Error loading videos from Firebase Storage:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: (error as any)?.code,
        stack: error instanceof Error ? error.stack : undefined
      });
      setErrorVideos(`Failed to load videos: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setVideos([]);
      setLoadingVideos(false);
    }
  };

  const refreshVideos = () => {
    loadVideos();
  };

  const loadFloorPlans = async () => {
    try {
      setLoadingFloorPlans(true);
      setErrorFloorPlans(null);
      
      console.log('🔄 Starting to load floor plans from Firebase Storage...');
      
      // Reference to the 'floor-plans-portfolio' folder in Firebase Storage
      const floorPlansRef = ref(storage, 'floor-plans-portfolio');
      console.log('📁 Floor Plans reference created:', floorPlansRef.fullPath);
      
      // List all items in the floor-plans-portfolio folder
      const result = await listAll(floorPlansRef);
      console.log('📋 Floor Plans listing result:', {
        items: result.items.length,
        prefixes: result.prefixes.length,
        itemNames: result.items.map(item => item.name)
      });
      
      if (result.items.length === 0) {
        console.log('❌ No floor plans found in floor-plans-portfolio folder');
        setFloorPlans([]);
        setLoadingFloorPlans(false);
        return;
      }
      
      // Get download URLs for all floor plans with optimization
      const floorPlanPromises = result.items.map(async (floorPlanRef) => {
        try {
          const url = await getDownloadURL(floorPlanRef);
          
          // Create optimized URL for faster loading (smaller size for gallery)
          const optimizedUrl = url.includes('?') 
            ? `${url}&w=800&h=600&fit=crop&fm=webp&q=80`
            : `${url}?w=800&h=600&fit=crop&fm=webp&q=80`;
          
          return {
            id: floorPlanRef.name,
            url: optimizedUrl,
            originalUrl: url, // Keep original for lightbox
            name: floorPlanRef.name
          };
        } catch (urlError) {
          console.error(`Error getting URL for ${floorPlanRef.name}:`, urlError);
          return null;
        }
      });
      
      const portfolioFloorPlans = await Promise.all(floorPlanPromises);
      
      // Filter out any failed downloads and sort by name
      const validFloorPlans = (portfolioFloorPlans.filter(Boolean) as PortfolioImage[])
        .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      
      setAllFloorPlans(validFloorPlans);
      setFloorPlans(validFloorPlans.slice(0, visibleFloorPlanCount));
      setLoadingFloorPlans(false);
      
      console.log(`✅ Successfully loaded ${validFloorPlans.length} floor plans from floor-plans-portfolio:`, validFloorPlans);
      
    } catch (error) {
      console.error('❌ Error loading floor plans from Firebase Storage:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: (error as any)?.code,
        stack: error instanceof Error ? error.stack : undefined
      });
      setErrorFloorPlans(`Failed to load floor plans: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setFloorPlans([]);
      setLoadingFloorPlans(false);
    }
  };

  const refreshFloorPlans = () => {
    loadFloorPlans();
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

  const openVideoLightbox = (index: number) => {
    setSelectedVideo(index);
  };

  const closeVideoLightbox = () => {
    setSelectedVideo(null);
  };

  const navigateVideo = (direction: 'prev' | 'next') => {
    if (selectedVideo === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedVideo + 1) % videos.length
      : (selectedVideo - 1 + videos.length) % videos.length;
    
    setSelectedVideo(newIndex);
  };

  const openFloorPlanLightbox = (index: number) => {
    setSelectedFloorPlan(index);
  };

  const closeFloorPlanLightbox = () => {
    setSelectedFloorPlan(null);
  };

  const navigateFloorPlan = (direction: 'prev' | 'next') => {
    if (selectedFloorPlan === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedFloorPlan + 1) % floorPlans.length
      : (selectedFloorPlan - 1 + floorPlans.length) % floorPlans.length;
    
    setSelectedFloorPlan(newIndex);
  };

  const handleBookSession = () => {
    window.open('https://order.2818studios.com/', '_blank');
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
                onClick={handleBookSession}
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
            {!loading && (!error || hasCloudImages) && (
              <div className="text-center mb-6">
                <p className="text-muted-foreground">
                  Showing {images.length} of {allImages.length} {allImages.length === 1 ? 'image' : 'images'}
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !hasCloudImages && (
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
            {!loading && (!error || hasCloudImages) && images.length === 0 && (
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
            {!loading && (!error || hasCloudImages) && images.length > 0 && (
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
            {!loading && (!error || hasCloudImages) && allImages.length > images.length && (
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

            {/* Videos Section */}
            <div className="mt-20 pt-16 border-t border-border/20">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-[0.2em] flex items-center justify-center gap-4">
                  <Video className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
                  V I D E O S
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  Professional video tours and cinematic showcases that bring properties to life with immersive experiences.
                </p>
              </div>

              {/* Video Controls */}
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
                  onClick={refreshVideos}
                  disabled={loadingVideos}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingVideos ? 'animate-spin' : ''}`} />
                  <span>Refresh Videos</span>
                </Button>
              </div>

              {/* Video Count Display */}
              {!loadingVideos && (!errorVideos || hasCloudVideos) && (
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">
                    Showing {videos.length} of {allVideos.length} {allVideos.length === 1 ? 'video' : 'videos'}
                  </p>
                </div>
              )}

              {/* Video Error State */}
              {errorVideos && !hasCloudVideos && (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                    <h3 className="text-lg font-semibold text-foreground">Failed to Load Videos</h3>
                    <p className="text-muted-foreground max-w-md">{errorVideos}</p>
                    <Button onClick={refreshVideos} className="btn-hero">
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {/* Video Loading State */}
              {loadingVideos && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-video bg-muted/30 rounded-xl animate-pulse" />
                  ))}
                </div>
              )}

              {/* Video Empty State */}
              {!loadingVideos && (!errorVideos || hasCloudVideos) && videos.length === 0 && (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <Video className="w-12 h-12 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground">No Videos Found</h3>
                    <p className="text-muted-foreground max-w-md">
                      No videos were found in the videos-portfolio folder. Upload some videos to Firebase Storage 
                      in the "videos-portfolio" folder to see them here.
                    </p>
                    <Button onClick={refreshVideos} variant="outline">
                      Refresh
                    </Button>
                  </div>
                </div>
              )}

              {/* Video Gallery */}
              {!loadingVideos && (!errorVideos || hasCloudVideos) && videos.length > 0 && (
                <div className={`grid ${getGridClass()} gap-6`}>
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      className="group cursor-pointer aspect-video overflow-hidden rounded-2xl bg-muted/30 hover:shadow-glow transition-all duration-500 relative"
                      onClick={() => openVideoLightbox(index)}
                    >
                      <video
                        src={video.url}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        preload="metadata"
                        muted
                        playsInline
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                        </div>
                      </div>
                      {/* Video Duration Overlay */}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Video
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More Videos Button */}
              {!loadingVideos && (!errorVideos || hasCloudVideos) && allVideos.length > videos.length && (
                <div className="text-center mt-12">
                  <Button
                    onClick={() => setVisibleVideoCount(prev => Math.min(prev + 6, allVideos.length))}
                    variant="outline"
                    className="px-8 py-3 text-lg"
                  >
                    Load More Videos ({allVideos.length - videos.length} remaining)
                  </Button>
                </div>
              )}
            </div>

            {/* Floor Plans Section */}
            <div className="mt-20 pt-16 border-t border-border/20">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-[0.2em] flex items-center justify-center gap-4">
                  <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
                  F L O O R &nbsp; P L A N S
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  Detailed architectural floor plans that help buyers visualize space layout and flow throughout the property.
                </p>
              </div>

              {/* Floor Plans Controls */}
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
                  onClick={refreshFloorPlans}
                  disabled={loadingFloorPlans}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingFloorPlans ? 'animate-spin' : ''}`} />
                  <span>Refresh Floor Plans</span>
                </Button>
              </div>

              {/* Floor Plans Count Display */}
              {!loadingFloorPlans && (!errorFloorPlans || hasCloudPlans) && (
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">
                    Showing {floorPlans.length} of {allFloorPlans.length} {allFloorPlans.length === 1 ? 'floor plan' : 'floor plans'}
                  </p>
                </div>
              )}

              {/* Floor Plans Error State */}
              {errorFloorPlans && !hasCloudPlans && (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                    <h3 className="text-lg font-semibold text-foreground">Failed to Load Floor Plans</h3>
                    <p className="text-muted-foreground max-w-md">{errorFloorPlans}</p>
                    <Button onClick={refreshFloorPlans} className="btn-hero">
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {/* Floor Plans Loading State */}
              {loadingFloorPlans && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[4/3] bg-muted/30 rounded-xl animate-pulse" />
                  ))}
                </div>
              )}

              {/* Floor Plans Empty State */}
              {!loadingFloorPlans && (!errorFloorPlans || hasCloudPlans) && floorPlans.length === 0 && (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground">No Floor Plans Found</h3>
                    <p className="text-muted-foreground max-w-md">
                      No floor plans were found in the floor-plans-portfolio folder. Upload some floor plan images to Firebase Storage 
                      in the "floor-plans-portfolio" folder to see them here.
                    </p>
                    <Button onClick={refreshFloorPlans} variant="outline">
                      Refresh
                    </Button>
                  </div>
                </div>
              )}

              {/* Floor Plans Gallery */}
              {!loadingFloorPlans && (!errorFloorPlans || hasCloudPlans) && floorPlans.length > 0 && (
                <div className={viewMode === 'masonry' ? getGridClass() : `grid ${getGridClass()} gap-6`}>
                  {floorPlans.map((floorPlan, index) => (
                    <div
                      key={floorPlan.id}
                      className={`group cursor-pointer ${viewMode === 'masonry' ? 'break-inside-avoid mb-6' : 'aspect-[4/3]'} overflow-hidden rounded-2xl bg-muted/30 hover:shadow-glow transition-all duration-500 relative`}
                      onClick={() => openFloorPlanLightbox(index)}
                    >
                      <OptimizedImage
                        src={floorPlan.url}
                        alt={`Floor plan - ${floorPlan.name}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        index={index}
                      />
                      {/* Floor Plan Icon Overlay */}
                      <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm rounded-full p-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More Floor Plans Button */}
              {!loadingFloorPlans && (!errorFloorPlans || hasCloudPlans) && allFloorPlans.length > floorPlans.length && (
                <div className="text-center mt-12">
                  <Button
                    onClick={() => setVisibleFloorPlanCount(prev => Math.min(prev + 6, allFloorPlans.length))}
                    variant="outline"
                    className="px-8 py-3 text-lg"
                  >
                    Load More Floor Plans ({allFloorPlans.length - floorPlans.length} remaining)
                  </Button>
                </div>
              )}
            </div>

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
                  onClick={handleBookSession}
                >
                  Book Your Session Today
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Image Lightbox */}
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
            onClick={handleBookSession}
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

      {/* Video Lightbox */}
      {selectedVideo !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={closeVideoLightbox}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 p-2"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Fullscreen Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const video = document.querySelector('.lightbox-video') as HTMLVideoElement;
              if (video) {
                if (video.requestFullscreen) {
                  video.requestFullscreen();
                } else if ((video as any).webkitRequestFullscreen) {
                  (video as any).webkitRequestFullscreen();
                } else if ((video as any).msRequestFullscreen) {
                  (video as any).msRequestFullscreen();
                }
              }
            }}
            className="absolute top-4 right-16 z-10 text-white hover:bg-white/10 p-2"
          >
            <Maximize className="w-6 h-6" />
          </Button>

          {/* Book Session Button in Video Lightbox */}
          <Button
            className="absolute top-4 left-4 z-10 btn-hero text-sm px-4 py-2"
            onClick={handleBookSession}
          >
            Book Session
          </Button>

          {/* Navigation Buttons */}
          {videos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateVideo('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateVideo('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          {/* Main Video */}
          <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <video
              src={videos[selectedVideo].url}
              className="lightbox-video max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              controls
              autoPlay
              playsInline
              controlsList="nodownload"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>

          {/* Video Counter and Info */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
            <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {selectedVideo + 1} / {videos.length}
            </div>
            <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full flex items-center space-x-2">
              <Video className="w-4 h-4" />
              <span>{videos[selectedVideo].name}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floor Plans Lightbox */}
      {selectedFloorPlan !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={closeFloorPlanLightbox}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10 p-2"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Book Session Button in Floor Plan Lightbox */}
          <Button
            className="absolute top-4 left-4 z-10 btn-hero text-sm px-4 py-2"
            onClick={handleBookSession}
          >
            Book Session
          </Button>

          {/* Navigation Buttons */}
          {floorPlans.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateFloorPlan('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateFloorPlan('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          {/* Main Floor Plan */}
          <div className="max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={floorPlans[selectedFloorPlan].originalUrl || floorPlans[selectedFloorPlan].url}
              alt="Floor plan"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Floor Plan Counter and Info */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
            <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {selectedFloorPlan + 1} / {floorPlans.length}
            </div>
            <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>{floorPlans[selectedFloorPlan].name}</span>
            </div>
          </div>
        </div>
      )}

      <MoreWork items={cloud} />
      <Footer />
    </div>
  );
}