import React, { useState, useEffect, useRef, Suspense, lazy, memo, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiMaximize } from "react-icons/fi";
import loadingGif from "../assets/loading.gif"; // Make sure this path is correct
import SEO from "../components/SEO";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { usePerformance } from "../context/PerformanceContext";
import { lazyLoadImage, throttle, loadImageAsync } from "../utils/performance";
import LoadingSpinner from "../components/LoadingSpinner";

// Lazy load components and data
const Modal = lazy(() => import(/* webpackPrefetch: true */ "../components/Modal"));

// Dynamic import for project data with code splitting
const projectsDataPromise = () => import("../assets/projectsData").then(module => module.projectsData);

// Fallback loading component
const GalleryLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
    <LoadingSpinner />
  </div>
);

// Find related projects with a more sophisticated algorithm
const findRelatedProjects = (currentProject, allProjects, limit = 3) => {
  if (!currentProject || !allProjects || !Array.isArray(allProjects)) {
    return [];
  }

  // Normalize the current project's categories to always be an array
  const currentCategories = Array.isArray(currentProject.categories) 
    ? currentProject.categories 
    : [currentProject.categories].filter(Boolean);

  // Calculate a relevance score for each project
  const projectsWithScores = allProjects
    .filter(project => project.id !== currentProject.id) // Exclude current project
    .map(project => {
      let score = 0;
      
      // Normalize the project categories to always be an array
      const projectCategories = Array.isArray(project.categories)
        ? project.categories
        : [project.categories].filter(Boolean);
      
      // Category match (highest weight)
      if (currentCategories.length > 0 && projectCategories.length > 0) {
        const categoryMatches = projectCategories.filter(category => 
          currentCategories.includes(category)).length;
        // More matching categories = higher score
        score += categoryMatches * 10;
      }
      
      // Project style match
      if (currentProject.style && project.style && currentProject.style === project.style) {
        score += 5;
      }
      
      // Location match
      if (currentProject.location && project.location && currentProject.location === project.location) {
        score += 3;
      }
      
      // Recent projects get a small boost
      if (project.year && currentProject.year) {
        const yearDiff = Math.abs(project.year - currentProject.year);
        if (yearDiff < 3) {
          score += (3 - yearDiff);
        }
      }
      
      return { ...project, relevanceScore: score };
    });
  
  // Sort by relevance score and take the top 'limit' results
  return projectsWithScores
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
};

const ProjectDetail = () => {
  const { trackRender } = usePerformance();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [similarProjects, setSimilarProjects] = useState([]);
  const topRef = useRef(null);

  // Track component render - only once
  useEffect(() => {
    trackRender("ProjectDetail");
  }, []); // Empty dependency array to avoid infinite loops

  // Load project data efficiently
  useEffect(() => {
    let isMounted = true;
    
    const loadProjectData = async () => {
      try {
        setIsLoading(true);
        
        // Call the function to get the promise
        const projectsData = await projectsDataPromise();
        
        if (!isMounted) return;
        
        // Store all projects for later use
        setAllProjects(projectsData);
        
        const foundProject = projectsData.find((p) => p.id === parseInt(id));
        setProject(foundProject);
        
        if (foundProject) {
          // Find similar projects with our improved algorithm
          const relatedProjects = findRelatedProjects(foundProject, projectsData);
          setSimilarProjects(relatedProjects);
          
          setImagesLoaded(new Array(foundProject.images ? foundProject.images.length : 0).fill(false));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading project data:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    loadProjectData();
    
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Update similar projects when project or allProjects changes
  useEffect(() => {
    if (project && allProjects.length > 0) {
      const relatedProjects = findRelatedProjects(project, allProjects);
      setSimilarProjects(relatedProjects);
    }
  }, [project, allProjects]);

  // Memoized scroll to top function
  const scrollToTop = useCallback(() => {
    requestAnimationFrame(() => {
      // Safety check: only scroll if ref exists and is attached to a DOM element
      if (topRef && topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  // Scroll to top and preload images
  useEffect(() => {
    if (!project) return;
    
    // Only attempt to scroll if we have a ref
    if (topRef && topRef.current) {
      scrollToTop();
    }
    
    // Preload main image first
    const preloadMainImage = async () => {
      try {
        await loadImageAsync(project.mainImage);
        setMainImageLoaded(true);
        
        // Then preload gallery images with lower priority
        if (project.images && project.images.length > 0) {
          // Preload first few images immediately
          const firstBatchPromises = project.images.slice(0, 3).map((img, index) => 
            loadImageAsync(img).then(() => {
              if (index < 3) {
                setImagesLoaded(prev => {
                  const newLoaded = [...prev];
                  newLoaded[index] = true;
                  return newLoaded;
                });
              }
            })
          );
          
          // Handle first batch
          Promise.all(firstBatchPromises).catch(err => console.error("Error preloading first batch:", err));
          
          // Use requestIdleCallback for the rest
          if ('requestIdleCallback' in window && project.images.length > 3) {
            window.requestIdleCallback(() => {
              const remainingPromises = project.images.slice(3).map((img, index) => 
                loadImageAsync(img).then(() => {
                  setImagesLoaded(prev => {
                    const newLoaded = [...prev];
                    newLoaded[index + 3] = true;
                    return newLoaded;
                  });
                })
              );
              
              Promise.all(remainingPromises).catch(err => console.error("Error preloading remaining images:", err));
            }, { timeout: 2000 });
          }
        }
      } catch (error) {
        console.error("Error loading main image:", error);
        setMainImageLoaded(true); // Show the image area even if loading failed
      }
    };
    
    preloadMainImage();
        
    // Preload similar project images with lowest priority
    if (similarProjects.length > 0 && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        similarProjects.forEach(sp => {
          if (sp.mainImage) {
            const img = new Image();
            img.src = sp.mainImage;
          }
        });
      }, { timeout: 5000 });
    }
  }, [project, similarProjects, scrollToTop]);

  // Memoized modal handlers to prevent unnecessary re-renders
  const openModal = useCallback((startIndex = 0) => {
    if (!project || !project.images) return;
    
    setModalImages(project.images);
    setModalStartIndex(startIndex);
    setModalOpen(true);
  }, [project]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    // Clear modal images after animation completes
    setTimeout(() => {
      if (!modalOpen) {
    setModalImages([]);
      }
    }, 300);
  }, [modalOpen]);

  // Handle image load
  const handleImageLoad = useCallback((index) => {
    setImagesLoaded(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  }, []);

  // Render project details section with useMemo for performance
  const renderProjectDetails = useMemo(() => {
    if (!project) return null;
    
    // Normalize categories to always be an array
    const categories = Array.isArray(project.categories) 
      ? project.categories 
      : (project.categories ? [project.categories] : []);
    
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-2 space-y-6"
      >
        <div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Project Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {project.details && (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Details</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.details}
            </p>
          </div>
        )}

        {categories.length > 0 && (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {project.location && (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Location</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {project.location}
            </p>
          </div>
        )}
        
        {project.year && (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Year</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {project.year}
            </p>
          </div>
        )}
      </m.div>
    );
  }, [project]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1a1a1a]">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1a1a1a]">
          <div className="text-center p-8">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Project Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/projects')}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Return to Projects
            </button>
          </div>
        </div>
      </>
    );
  }

  // Create dynamic SEO data based on project
  const projectKeywords = `
    ${project.title} architectural project, ${Array.isArray(project.categories) ? project.categories.join(", ") : ''}, 
    architecture design Jalandhar, architectural project Punjab, 
    VSA Architects portfolio, innovative architecture Jalandhar, 
    architectural design Punjab, modern architecture project, 
    ${project.title} design details, sustainable architecture India, 
    premium architecture Jalandhar, architectural excellence Punjab, 
    residential design project, commercial architecture Punjab, 
    architectural showcase Jalandhar, design case study Punjab
  `;

  const projectDescription = `${project.title} - A ${Array.isArray(project.categories) ? project.categories.join(", ") : project.categories || 'architectural'} architectural project by VSA Architects in Jalandhar, Punjab. ${
    project.description
  }`;

  // Normalize categories for display
  const categories = Array.isArray(project.categories) 
    ? project.categories 
    : (project.categories ? [project.categories] : []);

  return (
    <>
      <SEO
        title={project.title}
        description={projectDescription}
        keywords={projectKeywords}
        canonicalUrl={`/projects/${id}`}
        ogImage={project.mainImage}
        ogType="article"
        breadcrumb={true}
      />
      <Header />
      <LazyMotion features={domAnimation}>
        <div className="bg-white dark:bg-[#1a1a1a] pt-24 pb-24" ref={topRef}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back button and title */}
            <div className="mb-8 flex items-center">
              <m.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="Go back"
              >
                <IoIosArrowRoundBack className="text-gray-900 dark:text-white text-xl" />
              </m.button>
              
              <m.div
                initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 dark:text-white">
                    {project.title}
                  </h1>
                  {categories.length > 0 && (
                    <span className="text-xs uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full inline-flex items-center self-start">
                      {categories[0]}
                    </span>
                  )}
                </div>
              </m.div>
          </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Main image column */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-3 relative overflow-hidden"
              >
                <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-w-16 aspect-h-9 shadow-lg">
              {!mainImageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
              )}
              <img
                src={project.mainImage}
                alt={project.title}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      mainImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setMainImageLoaded(true)}
                onError={() => setMainImageLoaded(true)}
                    loading="eager"
                  />
                  <button
                    onClick={() => openModal(0)}
                    className="absolute right-4 bottom-4 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors duration-300"
                    aria-label="Expand image"
                  >
                    <FiMaximize size={20} />
                  </button>
          </div>
              </m.div>

              {/* Project details column */}
              {renderProjectDetails}
            </div>

            {/* Gallery section */}
            {project.images && project.images.length > 0 && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16"
              >
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
                  Project Gallery
                </h2>
                <div className="w-16 h-1 bg-gray-900 dark:bg-white mb-10"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.images.map((image, index) => (
                    <m.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "100px" }}
                      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)" }}
                      className="relative overflow-hidden rounded-lg aspect-w-4 aspect-h-3 bg-gray-100 dark:bg-gray-800 cursor-pointer group"
                      onClick={() => openModal(index)}
                >
                  {!imagesLoaded[index] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <LoadingSpinner small />
                        </div>
                  )}
                  <img
                    src={image}
                    alt={`Project ${project.title} image ${index + 1}`}
                        onLoad={() => handleImageLoad(index)}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                          imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="bg-white/0 group-hover:bg-white/90 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-all duration-300">
                          <FiMaximize className="text-gray-900" />
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
              </m.div>
            )}

            {/* Similar Projects Section */}
            {similarProjects.length > 0 && (
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-20"
              >
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
                  Similar Projects
                </h2>
                <div className="w-16 h-1 bg-gray-900 dark:bg-white mb-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {similarProjects.map((similarProject, index) => (
                    <m.div
                      key={similarProject.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "50px" }}
                      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
                      whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)" }}
                      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md transition-all duration-500"
                    >
                      <Link to={`/projects/${similarProject.id}`} className="block">
                        <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden">
                          <img 
                            src={similarProject.mainImage} 
                            alt={similarProject.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-lg md:text-xl font-medium mb-2 drop-shadow-md">{similarProject.title}</h3>
                          <p className="text-sm text-white/90 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{similarProject.description}</p>
                          {similarProject.categories && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {(Array.isArray(similarProject.categories) 
                                ? similarProject.categories.slice(0, 2) 
                                : [similarProject.categories].slice(0, 1)
                              ).map((category, idx) => (
                                <span key={idx} className="text-xs font-medium bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                                  {category}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="absolute bottom-6 right-6 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </m.div>
                  ))}
                </div>
                
                <m.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-10 text-center"
                >
                  <Link to="/projects" className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300">
                    <span>View All Projects</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </m.div>
              </m.div>
            )}
          </div>
        </div>

        {/* Modal for image gallery */}
        <AnimatePresence>
        {modalOpen && (
            <Suspense fallback={<GalleryLoader />}>
            <Modal
              isOpen={modalOpen}
              onClose={closeModal}
              images={modalImages}
              startIndex={modalStartIndex}
            />
          </Suspense>
        )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(ProjectDetail);
