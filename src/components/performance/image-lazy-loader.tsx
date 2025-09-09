import { useState, useRef, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';
import { ImageSkeleton } from '@/components/ui/skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage = memo(function LazyImage({
  src,
  alt,
  className,
  aspectRatio = '16/9',
  priority = false,
  placeholder,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  return (
    <div 
      ref={containerRef}
      className={cn(`aspect-${aspectRatio} overflow-hidden relative`, className)}
    >
      {!isInView && (
        <ImageSkeleton className="absolute inset-0 w-full h-full rounded-lg" />
      )}
      
      {isInView && !isError && (
        <>
          {!isLoaded && (
            <ImageSkeleton className="absolute inset-0 w-full h-full rounded-lg" />
          )}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              isLoaded 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105",
              className
            )}
            style={{ 
              aspectRatio: aspectRatio.replace('/', '/'), 
              contentVisibility: 'auto'
            }}
          />
        </>
      )}
      
      {isError && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-muted/50 to-muted/80 flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-bold text-sm">!</span>
            </div>
            <span className="text-xs text-muted-foreground">Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
});