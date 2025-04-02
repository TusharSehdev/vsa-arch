/**
 * Performance optimization utilities for the application
 */

/**
 * Debounces a function to limit how often it can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to wait
 * @returns {Function} The debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttles a function to limit how often it can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} The throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Promise-based image loading that can be used with async/await
 * @param {string} imageUrl - The URL of the image to load
 * @returns {Promise} - Promise that resolves when the image is loaded
 */
export const loadImageAsync = (imageUrl) => {
  return new Promise((resolve, reject) => {
    if (!imageUrl) {
      reject(new Error('No image URL provided'));
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(imageUrl);
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = imageUrl;
  });
};

/**
 * Image loading optimization - only loads images when they are about to enter the viewport
 * @param {string} imageUrl - The URL of the image to load
 * @param {Function} onLoad - Callback function when image loads
 * @param {Function} onError - Callback function when image fails to load
 * @returns {Function} Function to remove the observer
 */
export const lazyLoadImage = (imageUrl, onLoad, onError) => {
  const img = new Image();
  
  const loadImage = () => {
    img.onload = onLoad;
    img.onerror = onError;
    img.src = imageUrl;
  };
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px 0px' } // Start loading when image is 200px from viewport
    );
    
    observer.observe(img);
    return () => observer.disconnect();
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    loadImage();
    return () => {};
  }
};

/**
 * Creates a memoized version of a function that only recalculates when inputs change
 * @param {Function} fn - The function to memoize
 * @returns {Function} The memoized function
 */
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Prevents layout thrashing by batching DOM read and write operations
 */
export const domBatch = {
  reads: [],
  writes: [],
  scheduled: false,
  
  read(fn) {
    this.reads.push(fn);
    this.schedule();
    return this;
  },
  
  write(fn) {
    this.writes.push(fn);
    this.schedule();
    return this;
  },
  
  schedule() {
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.execute());
    }
  },
  
  execute() {
    // Read operations first (forces layout calculation once)
    const reads = this.reads.splice(0, this.reads.length);
    reads.forEach(read => read());
    
    // Then do all write operations
    const writes = this.writes.splice(0, this.writes.length);
    writes.forEach(write => write());
    
    this.scheduled = false;
    
    // If new operations were added during execution, schedule again
    if (this.reads.length > 0 || this.writes.length > 0) {
      this.schedule();
    }
  }
};

/**
 * Creates an intersection observer hook for components to use
 * @param {Object} options - IntersectionObserver options
 * @returns {Function} A function that accepts a ref and callback
 */
export const createIntersectionObserver = (options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };
  
  let observer = null;
  
  return (element, callback) => {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => callback(entry));
      }, defaultOptions);
    }
    
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  };
};

/**
 * Enable idle time optimization
 * Schedules low-priority tasks to run when the browser is idle
 * @param {Function} callback - The function to run during idle time
 * @param {Object} options - requestIdleCallback options
 */
export const runWhenIdle = (callback, options = { timeout: 1000 }) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    const start = Date.now();
    return setTimeout(() => {
      callback({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      });
    }, 1);
  }
};

/**
 * Cancel a previously scheduled idle callback
 * @param {number} id - The ID returned by runWhenIdle
 */
export const cancelIdleCallback = (id) => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}; 