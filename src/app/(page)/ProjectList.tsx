import React from 'react';
import IHomeProjectList from './types/IHomeProjectList';
import ProjectCard from './ProjectCard/ProjectCard';

function ProjectList({ project, index }: IHomeProjectList) {
  if (!project) return null;

  return <ProjectCard key={project._id} project={project} index={index} />;
}

export default ProjectList;
