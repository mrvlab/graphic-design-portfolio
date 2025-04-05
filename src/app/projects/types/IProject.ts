import { FetchProjectsIndexQueryResult } from '../../../../sanity.types';

type IProject = NonNullable<
  NonNullable<FetchProjectsIndexQueryResult>['projects']
>[number];

export default IProject;
