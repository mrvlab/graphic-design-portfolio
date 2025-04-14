import NextImage from './NextImage';
import MuxVideo from './MuxVideo';
import { ImageProps } from 'next/image';

type IMedia = {
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
} & Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'placeholder' | 'blurDataURL'
>;

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
}: IMedia) {
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
