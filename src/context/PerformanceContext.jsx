import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { runWhenIdle } from '../utils/performance';

// Create context
const PerformanceContext = createContext(null);

// Performance monitoring provider component
export const PerformanceProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    navigationStart: performance.now(),
    timeToFirstByte: null,
    domContentLoaded: null,
    windowLoaded: null,
    firstPaint: null,
    firstContentfulPaint: null,
    largestContentfulPaint: null,
    firstInputDelay: null,
    cumulativeLayoutShift: null,
    componentRenderTimes: {},
  });

  // Using ref to avoid state updates that trigger re-renders
  const metricsRef = useRef(metrics);

  // Function to track component render time without causing re-renders
  const trackRender = (componentName) => {
    // Using a ref to store timing data prevents the infinite loop
    // This only updates internal data without causing a re-render
    const startTime = performance.now();
    
    // Use setTimeout to ensure this runs after render is complete
    setTimeout(() => {
      const renderTime = performance.now() - startTime;
      metricsRef.current = {
        ...metricsRef.current,
        componentRenderTimes: {
          ...metricsRef.current.componentRenderTimes,
          [componentName]: renderTime
        }
      };
      
      // Only update state periodically for logging purposes
      if (renderTime > 50) {
        console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
    }, 0);
  };

  // Measure web vitals when browser is idle
  useEffect(() => {
    // Basic metrics
    const handleLoad = () => {
      runWhenIdle(() => {
        const navigationEntry = performance.getEntriesByType('navigation')[0];
        const paintEntries = performance.getEntriesByType('paint');
        
        if (navigationEntry) {
          setMetrics(prevMetrics => ({
            ...prevMetrics,
            timeToFirstByte: navigationEntry.responseStart - navigationEntry.startTime,
            domContentLoaded: navigationEntry.domContentLoadedEventStart - navigationEntry.startTime,
            windowLoaded: navigationEntry.loadEventStart - navigationEntry.startTime,
          }));
        }
        
        // First Paint and First Contentful Paint
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        
        if (firstPaint) {
          setMetrics(prevMetrics => ({
            ...prevMetrics,
            firstPaint: firstPaint.startTime,
          }));
        }
        
        if (firstContentfulPaint) {
          setMetrics(prevMetrics => ({
            ...prevMetrics,
            firstContentfulPaint: firstContentfulPaint.startTime,
          }));
        }
      });
    };
    
    window.addEventListener('load', handleLoad);
    
    // Advanced metrics using PerformanceObserver if available
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          setMetrics(prevMetrics => ({
            ...prevMetrics,
            largestContentfulPaint: lastEntry.startTime,
          }));
        });
        
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.warn('Largest Contentful Paint not supported', e);
      }
      
      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          const firstInput = entryList.getEntries()[0];
          if (firstInput) {
            const delay = firstInput.processingStart - firstInput.startTime;
            
            setMetrics(prevMetrics => ({
              ...prevMetrics,
              firstInputDelay: delay,
            }));
          }
        });
        
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.warn('First Input Delay not supported', e);
      }
      
      // Cumulative Layout Shift
      try {
        let cumulativeLayoutShiftScore = 0;
        
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              cumulativeLayoutShiftScore += entry.value;
              
              setMetrics(prevMetrics => ({
                ...prevMetrics,
                cumulativeLayoutShift: cumulativeLayoutShiftScore,
              }));
            }
          }
        });
        
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('Cumulative Layout Shift not supported', e);
      }
    }
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Hook to measure component render time
  const useComponentTimer = (componentName) => {
    const hasTracked = useRef(false);
    
    useEffect(() => {
      // Only track on initial mount to avoid infinite loops
      if (!hasTracked.current) {
        trackRender(componentName);
        hasTracked.current = true;
      }
      
      return () => {
        // You could also track unmount time if needed
      };
    }, [componentName]);
    
    // Return a function to manually measure render time for components
    // that need more granular timing (e.g., after data loads)
    return () => trackRender(componentName);
  };

  // Log performance data periodically rather than on every change
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMetrics(metricsRef.current);
    }, 5000); // Update metrics in state every 5 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  // Filter and keep only essential metrics for development
  const optimizationSuggestions = React.useMemo(() => {
    const suggestions = [];
    
    if (metrics.firstContentfulPaint > 1000) {
      suggestions.push('Consider optimizing First Contentful Paint (currently > 1s)');
    }
    
    if (metrics.largestContentfulPaint > 2500) {
      suggestions.push('Improve Largest Contentful Paint (currently > 2.5s)');
    }
    
    if (metrics.firstInputDelay > 100) {
      suggestions.push('Optimize First Input Delay (currently > 100ms)');
    }
    
    if (metrics.cumulativeLayoutShift > 0.1) {
      suggestions.push('Fix layout shifts (CLS > 0.1)');
    }
    
    return suggestions;
  }, [metrics]);

  const value = {
    metrics,
    useComponentTimer,
    trackRender,
    optimizationSuggestions,
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Custom hook to use the performance context
export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (context === null) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

// HOC to automatically track component render times
export const withPerformanceTracking = (WrappedComponent, componentName) => {
  const displayName = componentName || (WrappedComponent ? WrappedComponent.displayName || WrappedComponent.name : 'Component');
  
  const ComponentWithPerformance = (props) => {
    const { useComponentTimer } = usePerformance();
    useComponentTimer(displayName);
    
    return <WrappedComponent {...props} />;
  };
  
  ComponentWithPerformance.displayName = `WithPerformance(${displayName})`;
  
  return ComponentWithPerformance;
}; 