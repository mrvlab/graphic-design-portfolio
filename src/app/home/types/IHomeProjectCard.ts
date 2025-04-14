import { ProjectsQueryResult } from '../../../../sanity.types';

type IHomeProjectCard = {
  project: Partial<ProjectsQueryResult[number]>;
  index: number;
};

export default IHomeProjectCard;
