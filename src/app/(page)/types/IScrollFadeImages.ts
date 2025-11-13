import IMediaItem from './IMediaItem';

type IScrollFadeImages = {
  mediaGallery: IMediaItem;
  projectId: string;
  currentIndex: number;
  comingSoon: boolean | null;
  isVisible: boolean;
};

export default IScrollFadeImages;
