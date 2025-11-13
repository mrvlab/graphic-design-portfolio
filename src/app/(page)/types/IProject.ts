import { FetchHomePageQueryResult } from '../../../../sanity.types';

export type IProject = NonNullable<
  NonNullable<FetchHomePageQueryResult>['projects']
>[number];

export type IProjects = IProject[];
