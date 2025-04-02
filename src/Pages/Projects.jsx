import React, { useState, useEffect, Suspense, lazy } from "react";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

// Use dynamic import for lazy loading
const Filter = lazy(() => import("../components/ProjectsComponents2/Filter"));
const ProjectList = lazy(() =>
  import("../components/ProjectsComponents2/ProjectList")
);

// Use ES module import for static data
import { projectsData } from "../assets/projectsData";

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" ||
      project.categories.includes(selectedCategory);
    const matchesSearchQuery = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

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
      <motion.div
        className="container mx-auto p-4 text-white bg-[#1a1a1a] pt-24 lg:pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-10 mx-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl font-medium">Our Projects</h1>
          <div className="border border-primary mt-4"></div>
        </motion.div>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-40">
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
                className="text-xl text-primary"
              >
                Loading...
              </motion.div>
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Filter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <ProjectList projects={filteredProjects} />
          </motion.div>
        </Suspense>
      </motion.div>
    </>
  );
};

export default Projects;
