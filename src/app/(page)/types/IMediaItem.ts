import { FetchHomePageQueryResult } from '../../../../sanity.types';

type MediaItem = NonNullable<
  NonNullable<
    NonNullable<FetchHomePageQueryResult>['projects']
  >[number]['mediaGallery']
>['mediaItems'];

export default MediaItem;
