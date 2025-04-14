import { FetchProjectsIndexQueryResult } from '../../../../sanity.types';

type IProjectList = {
  project: NonNullable<
    NonNullable<FetchProjectsIndexQueryResult>['projects']
  >[number];
  index: number;
};

export default IProjectList;
