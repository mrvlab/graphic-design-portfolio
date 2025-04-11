import IIndexProject from './IIndexProject';

type IMediaItem = NonNullable<
  NonNullable<IIndexProject['mediaGallery']>['mediaItems']
>[number];

export default IMediaItem;
