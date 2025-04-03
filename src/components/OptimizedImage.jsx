import React, { useState, useEffect, useRef } from 'react';
import { lazyLoadImage } from '../utils/performance';
import { convertToWebP, generateSrcSet, createPlaceholder, getImageSizes } from '../utils/imageOptimizer';

/**
 * OptimizedImage component that lazy loads images and provides
 * blur-up loading technique, responsive images, and automatic format selection
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = '#f3f4f6',
  lowQualitySrc,
  sizes,
  priority = false,
  quality = 80,
  objectFit = 'cover',
  objectPosition = 'center',
  imageType,
  onLoad,
  onError,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lowQualityLoaded, setLowQualityLoaded] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Determine the appropriate sizes attribute based on the image type or use the provided sizes
  const imageSizes = sizes || (imageType ? getImageSizes(imageType) : '100vw');
  
  // Handle image load events, including passing to external handlers
  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onLoad && typeof onLoad === 'function') {
      onLoad();
    }
  };
  
  // Handle image error events, including passing to external handlers
  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);
    if (onError && typeof onError === 'function') {
      onError();
    }
  };
  
  // Load the low quality image first if provided or can be generated
  useEffect(() => {
    const placeholderSrc = createPlaceholder(src, lowQualitySrc);
    
    if (placeholderSrc) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(placeholderSrc);
        setLowQualityLoaded(true);
      };
      img.onerror = handleImageError;
      img.src = placeholderSrc;
    }
    
    // If this is a priority image, load it immediately
    if (priority) {
      const highQualitySrc = convertToWebP(src);
      const img = new Image();
      img.onload = () => {
        setImageSrc(highQualitySrc);
        setImageLoaded(true);
        if (onLoad && typeof onLoad === 'function') {
          onLoad();
        }
      };
      img.onerror = handleImageError;
      img.src = highQualitySrc;
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current();
      }
    };
  }, [lowQualitySrc, src, priority, onLoad, onError]);

  // Set up lazy loading with IntersectionObserver
  useEffect(() => {
    // Skip if this is a priority image (already loaded)
    if (priority) return;
    
    const elementToObserve = imgRef.current;
    
    if (!elementToObserve) return;
    
    // Function to handle when the image should be loaded
    const loadHighQualityImage = () => {
      const optimizedSrc = convertToWebP(src);
      
      observerRef.current = lazyLoadImage(
        optimizedSrc,
        () => {
          setImageSrc(optimizedSrc);
          setImageLoaded(true);
          if (onLoad && typeof onLoad === 'function') {
            onLoad();
          }
        },
        () => {
          handleImageError();
          // Keep the low quality image if high quality fails
          if (!lowQualityLoaded && !imageLoaded) {
            setImageSrc(placeholderColor);
          }
        }
      );
    };
    
    // Set up the intersection observer
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadHighQualityImage();
              observer.unobserve(elementToObserve);
            }
          });
        },
        { rootMargin: '200px 0px' } // Start loading when image is 200px from viewport
      );
      
      observer.observe(elementToObserve);
      
      return () => {
        if (elementToObserve) {
          observer.unobserve(elementToObserve);
        }
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      loadHighQualityImage();
    }
  }, [src, lowQualityLoaded, imageLoaded, placeholderColor, priority, onLoad, onError]);

  // Styles for the image container
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholderColor,
    width: width || '100%',
    height: height || 'auto',
  };

  // Styles for the image
  const imageStyle = {
    transition: 'opacity 0.3s ease, filter 0.3s ease',
    opacity: imageSrc ? 1 : 0,
    filter: imageLoaded ? 'blur(0)' : 'blur(10px)',
    width: '100%',
    height: '100%',
    objectFit,
    objectPosition,
    ...(props.style || {}),
  };

  return (
    <div style={containerStyle} className={className}>
      <img
        ref={imgRef}
        src={imageSrc || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
        srcSet={imageLoaded ? generateSrcSet(src) : undefined}
        sizes={imageSizes}
        alt={alt}
        style={imageStyle}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(OptimizedImage); 