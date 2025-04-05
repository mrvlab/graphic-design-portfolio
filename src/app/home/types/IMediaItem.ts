import { FetchHomePageQueryResult } from '../../../../sanity.types';

type MediaItem = NonNullable<
  NonNullable<
    NonNullable<FetchHomePageQueryResult>['projects']
  >[number]['images']
>['mediaItems'];

export default MediaItem;
