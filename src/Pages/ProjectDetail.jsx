import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "../assets/projectsData";
import Header from "../components/Header";
import { IoIosArrowRoundBack } from "react-icons/io";
import loadingGif from "../assets/loading.gif"; // Make sure this path is correct
import SEO from "../components/SEO";
import { motion } from "framer-motion";

const Modal = lazy(() => import("../components/Modal"));

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === parseInt(id));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState([]);
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (project) {
      const loadImage = (url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      };

      const loadAllImages = async () => {
        try {
          await loadImage(project.mainImage);
          const imagePromises = project.images.map((img) => loadImage(img));
          await Promise.all(imagePromises);

          setMainImageLoaded(true);
          setImagesLoaded(new Array(project.images.length).fill(true));
        } catch (error) {
          console.error("Error loading images:", error);
          setMainImageLoaded(false);
          setImagesLoaded(new Array(project.images.length).fill(true));
        }
      };

      loadAllImages();
    }
  }, [project]);

  const openModal = (startIndex = 0) => {
    setModalImages(project.images);
    setModalStartIndex(startIndex);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImages([]);
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  // Create dynamic SEO data based on project
  const projectKeywords = `
    ${project.title} architectural project, ${project.categories.join(", ")}, 
    architecture design Jalandhar, architectural project Punjab, 
    VSA Architects portfolio, innovative architecture Jalandhar, 
    architectural design Punjab, modern architecture project, 
    ${project.title} design details, sustainable architecture India, 
    premium architecture Jalandhar, architectural excellence Punjab, 
    residential design project, commercial architecture Punjab, 
    architectural showcase Jalandhar, design case study Punjab
  `;

  const projectDescription = `${project.title} - A ${project.categories.join(
    ", "
  )} architectural project by VSA Architects in Jalandhar, Punjab. ${
    project.description
  }`;

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
      <motion.div
        className="container mx-auto p-4 bg-[#1a1a1a] pb-28 mt-10 pt-16 lg:pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          ref={topRef}
          className="mb-10 px-4 sm:px-6 md:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center text-4xl sm:text-4xl md:text-5xl font-medium">
            <motion.button
              onClick={() => navigate(-1)}
              className="text-white text-lg sm:text-xl md:text-[25px] px-1 sm:px-1 py-1 hidden lg:block rounded-full bg-primary hover:bg-[#1e293b] hover:text-primary hover:border hover:border-primary mr-3 sm:mr-5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoIosArrowRoundBack />
            </motion.button>
            <h1 className="flex-1">{project.title}</h1>
          </div>
          <div className="border border-primary mt-2 sm:mt-4"></div>
        </motion.div>
        <div className="max_padd_container">
          <div className="flex flex-col md:flex-row">
            <motion.div
              className="md:w-2/3 relative"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {!mainImageLoaded && (
                <img
                  src={loadingGif}
                  alt="Loading..."
                  className="absolute inset-0 mx-auto my-auto w-16 h-16 object-cover"
                  loading="lazy"
                />
              )}
              <img
                src={project.mainImage}
                alt={project.title}
                className={`w-full object-cover mb-4 rounded ${
                  mainImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setMainImageLoaded(true)}
                onError={() => setMainImageLoaded(true)}
                loading="lazy"
              />
            </motion.div>
            <motion.div
              className="md:w-1/3 md:pl-4 text-center pt-10"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-3xl text-gray-400 font-bold mb-2">
                {project.title}
              </h1>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <p>{project.details}</p>
            </motion.div>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {project.images && project.images.length > 0 ? (
              project.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  {!imagesLoaded[index] && (
                    <img
                      src={loadingGif}
                      alt="Loading..."
                      className="absolute inset-0 mx-auto my-auto w-16 h-16 object-cover"
                      loading="lazy"
                    />
                  )}
                  <img
                    src={image}
                    alt={`Project ${project.title} image ${index + 1}`}
                    onLoad={() => {
                      setImagesLoaded((prev) => {
                        const newLoaded = [...prev];
                        newLoaded[index] = true;
                        return newLoaded;
                      });
                    }}
                    className={`w-full object-cover rounded-lg cursor-pointer ${
                      imagesLoaded[index] ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={() => openModal(index)}
                    loading="lazy"
                  />
                </motion.div>
              ))
            ) : (
              <p>No additional images available.</p>
            )}
          </motion.div>
        </div>
        {modalOpen && (
          <Suspense
            fallback={
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="text-xl text-white"
                >
                  Loading...
                </motion.div>
              </div>
            }
          >
            <Modal
              isOpen={modalOpen}
              onClose={closeModal}
              images={modalImages}
              startIndex={modalStartIndex}
            />
          </Suspense>
        )}
      </motion.div>
    </>
  );
};

export default ProjectDetail;
