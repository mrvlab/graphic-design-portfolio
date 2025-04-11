import NextImage from './NextImage';
import MuxVideo from './MuxVideo';
import { INextImage } from './types/INextImage';

type MediaProps = {
  id?: string;
  playbackId?: string;
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  lqip?: boolean;
  blurStrength?: number;
  sizes?: string;
} & Omit<INextImage, 'refId'>;

export default function Media({
  id,
  playbackId,
  className,
  alt,
  width,
  height,
  priority,
  lqip,
  blurStrength,
  sizes,
  ...rest
}: MediaProps) {
  if (!id && !playbackId) return null;

  if (playbackId) {
    return <MuxVideo playbackId={playbackId} className={className} />;
  }

  return (
    <NextImage
      refId={id}
      className={className}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      lqip={lqip}
      blurStrength={blurStrength}
      sizes={sizes}
      {...rest}
    />
  );
}
