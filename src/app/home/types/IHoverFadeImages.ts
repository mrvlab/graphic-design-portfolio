import MediaItem from './IMediaItem';

type IHoverFadeImages = {
  images: MediaItem | null;
  projectId: string;
  comingSoon?: boolean | null;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default IHoverFadeImages;
