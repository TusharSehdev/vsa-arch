import React, { useState } from "react";
import { Link } from "react-router-dom";
import loadingGif from '../../assets/loading.gif';
import { HiLocationMarker } from "react-icons/hi";

const ProjectCard = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const categories = Array.isArray(project.categories) ? project.categories : [];

  return (
    <div className="group relative lg:p-2 overflow-hidden">
      <Link to={`/projects/${project.id}`}>
        {!imageLoaded && (
          <img
            src={loadingGif}
            alt="Loading..."
            className="absolute inset-0 mx-auto my-auto w-16 h-16 object-cover"
            loading="lazy"
          />
        )}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={project.mainImage}
            alt={project.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out rounded-3xl cursor-pointer ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <h2 className="text-xl font-bold group-hover:text-primary">{project.title}</h2>
        </div>
        <p className="text-gray-400 mt-2">{project.description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm hidden">
              {category}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
