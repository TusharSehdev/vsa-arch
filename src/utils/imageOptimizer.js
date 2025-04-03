/**
 * Utility functions for optimizing images from S3 and other sources
 */

/**
 * Converts an image URL to WebP format if it's not already in an efficient format
 * @param {string} url - The original image URL
 * @returns {string} - The optimized URL
 */
export const convertToWebP = (url) => {
  if (!url) return url;
  
  // Check if the URL is from S3
  if (url.includes('s3.ap-south-1.amazonaws.com')) {
    // Get the file extension from the URL
    const urlParts = url.split('.');
    const extension = urlParts[urlParts.length - 1].toLowerCase();
    
    // Check if the image is already in an efficient format
    const isEfficient = ['webp', 'avif'].includes(extension);
    
    // Return the image with proper formatting
    if (!isEfficient && extension !== 'gif') {
      // Change extension to webp for better compression if not already a webp or avif
      return url.substring(0, url.lastIndexOf('.')) + '.webp';
    }
  }
  return url;
};

/**
 * Generates responsive image sources for different viewport sizes
 * @param {string} url - The original image URL
 * @param {Array<number>} widths - Array of widths to generate srcset for
 * @returns {string} - The srcset attribute value
 */
export const generateSrcSet = (url, widths = [640, 750, 828, 1080, 1200, 1920, 2048]) => {
  if (!url) return '';
  
  const optimizedUrl = convertToWebP(url);
  
  // Generate srcset attribute with the optimized URL
  return widths.map(w => `${optimizedUrl} ${w}w`).join(', ');
};

/**
 * Creates a low-quality placeholder image URL
 * @param {string} url - The original image URL
 * @param {string} customPlaceholder - A custom placeholder URL
 * @returns {string} - The placeholder URL
 */
export const createPlaceholder = (url, customPlaceholder = null) => {
  if (customPlaceholder) return customPlaceholder;
  if (!url) return null;
  
  // For S3 images, we can use the WebP version as the placeholder
  if (url.includes('s3.ap-south-1.amazonaws.com')) {
    return convertToWebP(url);
  }
  
  return url;
};

/**
 * Preloads critical images to improve perceived performance
 * @param {Array<string>} urls - Array of image URLs to preload
 */
export const preloadImages = (urls) => {
  if (!urls || !Array.isArray(urls) || urls.length === 0) return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.type = 'image/webp';
    document.head.appendChild(link);
  });
};

/**
 * Helps determine appropriate sizes attribute for responsive images
 * @param {string} type - The type of image (hero, thumbnail, etc.)
 * @returns {string} - The sizes attribute value
 */
export const getImageSizes = (type) => {
  switch (type) {
    case 'hero':
      return '100vw';
    case 'thumbnail':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'gallery':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw';
    case 'logo':
      return '(max-width: 640px) 70px, 80px';
    default:
      return '100vw';
  }
}; 