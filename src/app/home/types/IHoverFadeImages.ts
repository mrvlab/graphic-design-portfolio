import MediaItem from './IMediaItem';

type IHoverFadeImages = {
  mediaGallery: MediaItem | null;
  projectId: string;
  comingSoon?: boolean | null;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default IHoverFadeImages;
