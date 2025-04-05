import IMediaItem from './IMediaItem';

type IScrollFadeImages = {
  images: IMediaItem;
  projectId: string;
  currentIndex: number;
  comingSoon: boolean | null;
  isVisible: boolean;
  isScrollingDown: boolean;
};

export default IScrollFadeImages;
