import IIndexProject from './IIndexProject';

type IMediaItem = NonNullable<
  NonNullable<IIndexProject['images']>['mediaItems']
>[number];

export default IMediaItem;
