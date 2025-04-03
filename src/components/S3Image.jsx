import React, { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';
import { convertToWebP } from '../utils/imageOptimizer';

/**
 * A specialized component for S3 hosted images that automatically applies
 * best practices for optimal loading and rendering performance
 */
const S3Image = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  fetchpriority = "auto",
  placeholderColor = '#121212',
  imageType = 'thumbnail',
  objectFit = 'cover',
  objectPosition = 'center',
  loading,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inlinePreloaded, setInlinePreloaded] = useState(false);
  
  // Only apply S3 optimization if the image is from the S3 bucket
  const isS3Image = src && src.includes('s3.ap-south-1.amazonaws.com');
  
  // For S3 images, we can apply special optimizations
  const optimizedSrc = isS3Image ? convertToWebP(src) : src;
  
  // For highest priority images (LCP candidates), preload them inline
  useEffect(() => {
    if (priority && fetchpriority === "high" && !inlinePreloaded) {
      const linkAlreadyExists = document.querySelector(`link[rel="preload"][href="${optimizedSrc}"]`);
      
      if (!linkAlreadyExists) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = optimizedSrc;
        link.type = 'image/webp';
        document.head.appendChild(link);
        
        // Mark as preloaded to avoid duplicate preloading
        setInlinePreloaded(true);
        
        return () => {
          if (link && link.parentNode) {
            link.parentNode.removeChild(link);
          }
        };
      }
    }
  }, [priority, fetchpriority, optimizedSrc, inlinePreloaded]);
  
  // If not an S3 image, just pass through to the regular OptimizedImage
  if (!isS3Image) {
    return (
      <OptimizedImage
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        priority={priority}
        fetchpriority={fetchpriority}
        placeholderColor={placeholderColor}
        imageType={imageType}
        objectFit={objectFit}
        objectPosition={objectPosition}
        loading={loading}
        {...props}
      />
    );
  }
  
  // If S3 images are failing, you may need a fallback
  const handleImageError = () => {
    console.error(`Failed to load S3 image: ${optimizedSrc}`);
    setHasError(true);
  };
  
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  // For LCP images, we use a simpler structure to reduce render complexity
  if (priority && fetchpriority === "high") {
    return (
      <OptimizedImage
        src={optimizedSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        priority={true}
        fetchpriority="high"
        imageType={imageType}
        objectFit={objectFit}
        objectPosition={objectPosition}
        loading="eager"
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    );
  }
  
  // For non-LCP images, use the regular pattern with loading spinner
  return (
    <div className={`relative ${className}`} style={{ 
      backgroundColor: placeholderColor,
      minHeight: '50px' 
    }}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="mt-2 text-sm">Image failed to load</p>
          </div>
        </div>
      )}
      
      <OptimizedImage
        src={optimizedSrc}
        alt={alt}
        className={isLoaded ? className : 'opacity-0'}
        width={width}
        height={height}
        priority={priority}
        fetchpriority={fetchpriority}
        placeholderColor={placeholderColor}
        imageType={imageType}
        objectFit={objectFit}
        objectPosition={objectPosition}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    </div>
  );
};

export default React.memo(S3Image); 