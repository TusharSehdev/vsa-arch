import React, { lazy, Suspense, useEffect, useCallback } from "react";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import { usePerformance } from "../context/PerformanceContext";

// Lazy load components
const SwiperCarousel = lazy(() => import("../components/HomeComponents/SwiperCarousel"));
const Aboutus = lazy(() => import("../components/Aboutus"));
const Experience = lazy(() => import("../components/HomeComponents/Experience"));
const Expertise = lazy(() => import("../components/HomeComponents/Expertise"));
const Testimonials = lazy(() => import("../components/HomeComponents/Testimonials"));
const FeaturedProjects = lazy(() => import("../components/HomeComponents/FeaturedProjects"));
const ContactCTA = lazy(() => import("../components/HomeComponents/ContactCTA"));

// Fallback loading component
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <LoadingSpinner />
  </div>
);

const Home = () => {
  const { trackRender } = usePerformance();
  
  // Memoize preload function
  const preloadComponents = useCallback(async () => {
    const SwiperModule = import("../components/HomeComponents/SwiperCarousel");
    const AboutModule = import("../components/Aboutus");
    
    await Promise.all([SwiperModule, AboutModule]);
  }, []);
  
  // Preload critical assets
  useEffect(() => {
    // Track component render - only call once
    trackRender("Home");
    
    // Preload the most important component
    preloadComponents();
  }, []); // Empty dependency array to run once

  const keywords = `
    architects in Jalandhar, interior design Jalandhar, landscape design Punjab,
    urban design firms India, master planning services, sustainable architecture India,
    residential architects Jalandhar, commercial architects Punjab, innovative architecture firm Jalandhar,
    architectural design services, landmark building design, collaborative architecture firms,
    large-scale urban developments India, creative architectural solutions, functional architectural design,
    space planning experts, vibrant urban community design, architectural excellence India,
    architecture for quality of life, multidisciplinary design team Jalandhar, visionary architecture projects,
    end-to-end architecture services, exterior and interior architecture Jalandhar, environmentally friendly architecture,
    urban space planning Punjab, residential and commercial design, custom architecture projects India,
    architecture to elevate human experience, holistic design services Jalandhar, premium design studio Jalandhar,
    award-winning architects Punjab, eco-friendly building design, modern architecture Punjab, innovative building solutions,
    luxury home architects Jalandhar, commercial complex design, office space design Jalandhar, green building consultants Punjab,
    heritage conservation architecture, mixed-use development design, institutional building architects, healthcare facility design Punjab,
    hospitality architecture Jalandhar, retail space design Punjab, cultural space architects, educational institution design,
    urban renewal projects India, smart city planning Punjab, high-end residential design, biophilic architecture India,
    climate-responsive design Punjab, parametric architecture, contemporary design solutions, integrated design approach,
    architectural visualization services, 3D architectural rendering Punjab, architecture project management, design-build services
  `;

  const description =
    "VSA Architects is a premier architectural firm in Jalandhar, Punjab specializing in innovative and sustainable design solutions for residential, commercial, and urban projects. Our multidisciplinary team delivers excellence in architectural design, interior design, landscape design, and master planning services across India.";

  // Use lightweight animation renderer
  return (
    <>
      <SEO
        title="Home"
        description={description}
        keywords={keywords}
        canonicalUrl="/"
        breadcrumb={true}
      />
      <Header />
      
      {/* Use LazyMotion to only load animation features when needed */}
      <LazyMotion features={domAnimation}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden"
        >
          <Suspense fallback={<SectionLoader />}>
            <SwiperCarousel />
          </Suspense>
        </motion.div>

        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <Aboutus />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <Experience />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <FeaturedProjects />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <Expertise />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <Testimonials />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <ContactCTA />
          </motion.div>
        </Suspense>
      </LazyMotion>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(Home);
