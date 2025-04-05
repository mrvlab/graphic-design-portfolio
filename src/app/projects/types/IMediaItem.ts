import IProject from './IProject';

type IMediaItem = NonNullable<
  NonNullable<IProject['images']>['mediaItems']
>[number];

export default IMediaItem;
