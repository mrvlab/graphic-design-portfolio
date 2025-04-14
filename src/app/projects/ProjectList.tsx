import ProjectCard from './ProjectCard/ProjectCard';
import IProjectList from './types/IProjectList';

function ProjectList({ project, index }: IProjectList) {
  if (!project) return null;

  return <ProjectCard key={project._id} project={project} index={index} />;
}

export default ProjectList;
