import { FetchProjectsIndexQueryResult } from '../../../sanity.types';
import ProjectCard from './ProjectCard';

type ProjectListProps = {
  project: NonNullable<
    NonNullable<FetchProjectsIndexQueryResult>['projects']
  >[number];
  index: number;
};

function ProjectList({ project, index }: ProjectListProps) {
  if (!project) return null;

  return <ProjectCard key={project._id} project={project} index={index} />;
}

export default ProjectList;
