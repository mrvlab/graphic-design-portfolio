import { FetchHomePageQueryResult } from '../../../../sanity.types';

type IHomeProjectList = {
  project: Partial<
    NonNullable<NonNullable<FetchHomePageQueryResult>['projects']>[number]
  >;
  index: number;
};

export default IHomeProjectList;
