import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { PerformanceProvider } from "./context/PerformanceContext";
import App from "./App.jsx";
import "./index.css";

// Preload critical resources
const preloadCriticalAssets = () => {
  // Preload critical images, fonts, etc.
  const preloadLinks = [
    // LCP image
    { 
      rel: 'preload', 
      href: 'https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/Bali+Travels/grayyyy.webp', 
      as: 'image',
      type: 'image/webp',
      importance: 'high'
    },
    // Font preconnect instead of preload
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];
  
  preloadLinks.forEach(attrs => {
    const link = document.createElement('link');
    Object.entries(attrs).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  });
  
  // Load the font asynchronously
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      fontLink.rel = 'stylesheet';
      fontLink.media = 'print';
      fontLink.onload = () => { fontLink.media = 'all'; };
      document.head.appendChild(fontLink);
    }, { timeout: 1000 });
  } else {
    setTimeout(() => {
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }, 20);
  }
};

// Prefetch non-critical but likely-to-be-needed resources
const prefetchAssets = () => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      const prefetchLinks = [];
      
      prefetchLinks.forEach(attrs => {
        const link = document.createElement('link');
        Object.entries(attrs).forEach(([key, value]) => {
          link.setAttribute(key, value);
        });
        document.head.appendChild(link);
      });
    }, { timeout: 2000 });
  }
};

// Non-critical initialization (analytics, etc.) - run when browser is idle
const initNonCriticalFeatures = () => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Register service worker for PWA
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').catch(error => {
            console.error('Service Worker registration failed:', error);
          });
        });
      }
    }, { timeout: 3000 });
  }
};

// Execute preloading
preloadCriticalAssets();

// Create root with performance monitoring
const root = ReactDOM.createRoot(document.getElementById("root"));

// Deferred rendering for better performance
const renderApp = () => {
  try {
    root.render(
      <React.StrictMode>
        <PerformanceProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PerformanceProvider>
      </React.StrictMode>
    );
    
    // After app is rendered, prefetch assets and initialize non-critical features
    prefetchAssets();
    initNonCriticalFeatures();
  } catch (error) {
    console.error("Error rendering the app:", error);
    
    // Fallback to render without PerformanceProvider
    root.render(
      <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>
    );
  }
};

// Use requestIdleCallback if available to defer non-critical initialization
if (window.requestIdleCallback) {
  window.requestIdleCallback(renderApp, { timeout: 2000 });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(renderApp, 0);
}
