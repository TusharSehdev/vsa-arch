import React, { useState, useEffect, Suspense, lazy, useCallback, memo } from "react";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Banner from "../components/Banner";
import { throttle } from "../utils/performance";
import { usePerformance } from "../context/PerformanceContext";
import LoadingSpinner from "../components/LoadingSpinner";

// Use dynamic import for lazy loading with prefetch hints
const Filter = lazy(() => import(/* webpackPrefetch: true */ "../components/ProjectsComponents2/Filter"));
const ProjectList = lazy(() => import(/* webpackPrefetch: true */ "../components/ProjectsComponents2/ProjectList"));

// Use ES module import for static data
import { projectsData } from "../assets/projectsData";

// Component fallback
const SectionLoader = () => (
  <div className="flex justify-center items-center h-64">
    <LoadingSpinner />
  </div>
);

const Projects = () => {
  const { trackRender } = usePerformance();
  
  // Memoize scroll function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  // Memoize preload function
  const preloadComponents = useCallback(() => {
    // Use dynamic imports to preload components that will be needed soon
    import("../components/ProjectsComponents2/ProjectCard");
  }, []);
  
  // Track initial render
  useEffect(() => {
    // Track component render once
    trackRender("Projects");
    
    // Scroll to top optimized with requestAnimationFrame
    requestAnimationFrame(scrollToTop);
    
    // Defer preloading using requestIdleCallback
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadComponents, { timeout: 2000 });
    } else {
      setTimeout(preloadComponents, 300);
    }
  }, []); // Empty dependency array

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  // Memoize filter function to prevent unnecessary recalculations
  const filterProjects = useCallback(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.categories.includes(selectedCategory);
      const matchesSearchQuery = project.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearchQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Use throttled effect for filtering to prevent excessive renders
  useEffect(() => {
    const updateFilteredProjects = throttle(() => {
      setFilteredProjects(filterProjects());
    }, 100);
    
    updateFilteredProjects();
    
    return () => {
      // Clean up any subscriptions or timers
    };
  }, [filterProjects]);

  const keywords = `
    Architectural projects Jalandhar, Jalandhar project portfolio, Recent projects Jalandhar, 
    Jalandhar design projects, Completed projects Jalandhar, Jalandhar building projects,
    Residential projects Jalandhar, Commercial projects Jalandhar, Jalandhar architecture examples, 
    Design case studies Jalandhar, Jalandhar renovation projects, Architectural portfolio Jalandhar, 
    Jalandhar construction projects, Featured projects Jalandhar, Jalandhar project highlights, 
    Innovative projects Jalandhar, Jalandhar architectural design, Project showcase Jalandhar, 
    Jalandhar development projects, Design portfolio Jalandhar, Jalandhar architectural works, 
    Project gallery Jalandhar, Jalandhar completed designs, Jalandhar design case studies, 
    Building projects Jalandhar, Jalandhar architectural showcase, Design examples Jalandhar,
    Jalandhar architectural portfolio, Construction design Jalandhar, Jalandhar architectural gallery, 
    Featured designs Jalandhar, Jalandhar project case studies, Innovative design projects Jalandhar, 
    Jalandhar design highlights, Architectural work Jalandhar, Jalandhar project examples, 
    Completed architectural projects Jalandhar, Jalandhar building design, Project examples Jalandhar, 
    Jalandhar design showcase, Recent architecture Jalandhar, Design and build Jalandhar, 
    Jalandhar project designs, Architectural work Jalandhar, commercial building projects Punjab,
    modern residential designs Jalandhar, innovative building solutions Punjab, 
    modern architecture portfolio Jalandhar, sustainable building projects India
  `;

  const description =
    "Explore VSA Architects' portfolio of innovative architectural projects spanning residential, commercial, and urban developments in Jalandhar, Punjab and across India. Our work showcases our commitment to sustainable, functional, and aesthetically pleasing architectural solutions.";

  return (
    <>
      <SEO
        title="Projects"
        description={description}
        keywords={keywords}
        canonicalUrl="/projects"
        breadcrumb={true}
      />
      <Header />
      <div className="bg-white dark:bg-[#1a1a1a]">
        {/* Banner Component */}
        <Banner 
          title="Our Projects" 
          subtitle="Explore our diverse portfolio of architectural projects, each designed with purpose, precision, and passion for creating exceptional spaces."
        />

        {/* Main content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Suspense fallback={<SectionLoader />}>
            <Filter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <LazyMotion features={domAnimation}>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                <ProjectList projects={filteredProjects} />
              </m.div>
            </LazyMotion>
          </Suspense>
        </div>
      </div>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Projects);
