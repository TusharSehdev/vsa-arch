import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-10">
      {projects.map((project) => (
        <div key={project.id} className="mt-5">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
