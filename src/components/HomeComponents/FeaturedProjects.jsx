import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import S3Image from "../S3Image";

const projectsData = [
  {
    id: 29,
    title: "Victoria Garden",
    category: "Urban Design",
    year: "2023",
    image:
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Urban+Design-Masterplanning/Victoria+Garden/master+plan/final+view+2+COLONY.webp",
  },
  {
    id: 1,
    title: "The Gym Khanna Club",
    category: "Commercial Design",
    year: "2022",
    image:
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Commercial/BAR/BAR01+ps01.webp",
  },
  {
    id: 21,
    title: "Manpreet's Residence",
    category: "Residential Design",
    year: "2023",
    image:
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/UE-II/2.webp",
  },
];

const FeaturedProjects = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] md:max_padd_container2 lg:max_padd_container pt-5 lg:pt-8 pb-16 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="relative"
      >
        <div className="px-6 md:px-10">
          {/* Header with View All Link */}
          <motion.div
            variants={fadeIn}
            className="flex justify-between items-end mb-14"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-medium text-gray-900 dark:text-white">
                Featured Projects
              </h2>
              <div className="w-16 h-[1px] mt-3 bg-primary"></div>
            </div>
            <Link
              to="/projects"
              className="text-primary hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group flex items-center"
            >
              <span className="mr-2">View All</span>
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <Link to={`/projects/${project.id}`}>
                  <div className="overflow-hidden rounded-md">
                    <div className="overflow-hidden">
                      <S3Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto"
                        objectFit="contain"
                        placeholderColor="#121212"
                        imageType="thumbnail"
                        priority={index === 0}
                      />
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-primary">
                          {project.category}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-white/50">{project.year}</p>
                      </div>
                      <h3 className="text-xl mt-1 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedProjects;
