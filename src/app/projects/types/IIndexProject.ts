import { FetchProjectsIndexQueryResult } from '../../../../sanity.types';

type IIndexProject = NonNullable<
  NonNullable<FetchProjectsIndexQueryResult>['projects']
>[number];

export default IIndexProject;
