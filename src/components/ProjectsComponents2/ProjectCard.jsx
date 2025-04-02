import React, { useState } from "react";
import { Link } from "react-router-dom";
import loadingGif from '../../assets/loading.gif';
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const categories = Array.isArray(project.categories) ? project.categories : [];

  return (
    <motion.div 
      className="group relative overflow-hidden"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link to={`/projects/${project.id}`} className="block">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            <img
              src={loadingGif}
              alt="Loading..."
              className="w-10 h-10"
              loading="lazy"
            />
          </div>
        )}
        <div className="relative overflow-hidden rounded-lg shadow-sm">
          <div className="aspect-w-16 aspect-h-10 w-full">
            <img
              src={project.mainImage}
              alt={project.title}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="mt-4 px-1">
          <div className="flex items-center justify-between mb-1">
            {categories.length > 0 && (
              <span className="text-xs uppercase tracking-wider text-primary font-medium">
                {categories[0]}
              </span>
            )}
          </div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {project.description}
          </p>
          <div className="mt-3 inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
            View Project <span className="ml-1">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
