import React, { useState, useEffect, useRef } from 'react';
import { lazyLoadImage } from '../utils/performance';

/**
 * OptimizedImage component that lazy loads images and provides
 * blur-up loading technique for better perceived performance
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = '#f3f4f6',
  lowQualitySrc,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lowQualityLoaded, setLowQualityLoaded] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Load the low quality image first if provided
  useEffect(() => {
    if (lowQualitySrc) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(lowQualitySrc);
        setLowQualityLoaded(true);
      };
      img.src = lowQualitySrc;
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current();
      }
    };
  }, [lowQualitySrc]);

  // Set up lazy loading with IntersectionObserver
  useEffect(() => {
    const elementToObserve = imgRef.current;
    
    if (!elementToObserve) return;
    
    // Function to handle when the image should be loaded
    const loadHighQualityImage = () => {
      observerRef.current = lazyLoadImage(
        src,
        () => {
          setImageSrc(src);
          setImageLoaded(true);
        },
        () => {
          console.error(`Failed to load image: ${src}`);
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
  }, [src, lowQualityLoaded, imageLoaded, placeholderColor]);

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
    objectFit: 'cover',
  };

  return (
    <div style={containerStyle} className={className}>
      <img
        ref={imgRef}
        src={imageSrc || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
        alt={alt}
        style={imageStyle}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(OptimizedImage); 