import React, { useEffect, Suspense, lazy, memo, useCallback } from "react";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Banner from "../components/Banner";
import { usePerformance } from "../context/PerformanceContext";
import LoadingSpinner from "../components/LoadingSpinner";

// Lazy load components
const Aboutus = lazy(() => import("../components/Aboutus"));
const Experience = lazy(() => import("../components/HomeComponents/Experience"));
const TeamSection = lazy(() => import("../components/AboutComponents/TeamSection"));
const ValuesSection = lazy(() => import("../components/AboutComponents/ValuesSection"));
const ProcessSection = lazy(() => import("../components/AboutComponents/ProcessSection"));
const Testimonials = lazy(() => import("../components/AboutComponents/Testimonials"));

// Fallback loading component
const SectionLoader = () => (
  <div className="flex justify-center items-center h-64">
    <LoadingSpinner />
  </div>
);

const About = () => {
  const { trackRender } = usePerformance();
  
  // Memoize scroll function to prevent it from being recreated on each render
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  // Memoize preload function
  const preloadComponents = useCallback(() => {
    // Preload critical components
    import("../components/HomeComponents/Experience");
    import("../components/AboutComponents/TeamSection");
  }, []);
  
  useEffect(() => {
    // Track component render - only call once
    trackRender("About");
    
    // Use requestAnimationFrame for smooth scrolling
    requestAnimationFrame(scrollToTop);
    
    // Defer preloading using requestIdleCallback
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadComponents, { timeout: 2000 });
    } else {
      setTimeout(preloadComponents, 300);
    }
    
    // Empty dependency array means this only runs once on mount
  }, []); // ← Empty dependency array, with functions memoized above

  const keywords = `
    About architects Jalandhar, Our team Jalandhar architects, Jalandhar architecture firm profile, 
    Meet the architects Jalandhar, Jalandhar design experts, Architecture services Jalandhar, 
    Jalandhar architectural expertise, Experienced architects Jalandhar, Jalandhar architectural professionals, 
    About our firm Jalandhar, Jalandhar design team, Company history Jalandhar architects, 
    Jalandhar architects background, Our approach Jalandhar, Jalandhar architecture philosophy, 
    Jalandhar architecture firm, Our mission Jalandhar architects, Jalandhar architectural innovation, 
    Professional team Jalandhar architects, About our projects Jalandhar, Jalandhar architectural achievements, 
    Jalandhar design consultants, Team of architects Jalandhar, Jalandhar architects team, 
    Company values Jalandhar architects, Jalandhar design professionals, Our story Jalandhar architects, 
    Architecture practice Jalandhar, Jalandhar firm history, Jalandhar architectural excellence, 
    Our designers Jalandhar, Jalandhar project leaders, Our team experience Jalandhar, 
    About us Jalandhar architects, Jalandhar architecture experts, Team expertise Jalandhar, 
    Jalandhar firm profile, Design professionals Jalandhar, Jalandhar architecture team, 
    Firm values Jalandhar, Jalandhar architecture company, Meet our team Jalandhar, 
    Jalandhar architectural consultants, About us Jalandhar design, Jalandhar design practice, 
    Firm achievements Jalandhar, Jalandhar architectural leaders, Our vision Jalandhar architects, 
    architecture firm history Punjab, award-winning design team Jalandhar, expert architectural consultants, 
    innovative design approach India, sustainable design philosophy Punjab
  `;

  const description =
    "Learn about VSA Architects, a premier architectural firm in Jalandhar. We are a team of passionate architects and designers committed to creating innovative, sustainable, and aesthetically pleasing spaces that enhance the quality of life.";

  return (
    <>
      <SEO
        title="About Us"
        description={description}
        keywords={keywords}
        canonicalUrl="/about"
        breadcrumb={true}
      />
      <Header />
      <div className="bg-white dark:bg-[#1a1a1a]">
        <Banner 
          title="About Us" 
          subtitle="We are a team of passionate architects and designers committed to creating innovative, sustainable, and aesthetically pleasing spaces."
        />
        
        <LazyMotion features={domAnimation}>
          {/* Company Overview Section */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-8"
          >
            <Suspense fallback={<SectionLoader />}>
              <Aboutus hideHeading={true} />
            </Suspense>
          </m.div>
          
          {/* Values Section */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="py-10"
          >
            <Suspense fallback={<SectionLoader />}>
              <ValuesSection />
            </Suspense>
          </m.div>
          
          {/* Our Process Section */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="py-10 bg-gray-50 dark:bg-[#121212]"
          >
            <Suspense fallback={<SectionLoader />}>
              <ProcessSection />
            </Suspense>
          </m.div>
          
          {/* Experience Section */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
          </m.div>
          
          {/* Team Section
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="py-10 bg-white dark:bg-[#1a1a1a]"
          >
            <Suspense fallback={<SectionLoader />}>
              <TeamSection />
            </Suspense>
          </m.div> */}
          
         
        </LazyMotion>
      </div>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(About);
