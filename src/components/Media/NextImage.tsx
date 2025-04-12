import Image from 'next/image';
import { imgData } from '@/sanity/lib/image';
import clsx from 'clsx';
import { ImageProps } from 'next/image';

interface INextImage extends Omit<ImageProps, 'src' | 'alt'> {
  refId?: string;
  src?: string;
  alt?: string;
  lqip?: boolean;
  blurStrength?: number;
}

export default function NextImage({
  refId,
  src,
  alt,
  lqip = true,
  blurStrength,
  width = 400,
  height = 533,
  className,
  sizes,
  priority = false,
  fill,
  ...rest
}: INextImage) {
  const isSanityImage = Boolean(refId);

  const { imageUrl, blurDataURL, altText } = isSanityImage
    ? imgData({
        ref: refId || '',
        alt,
        width: fill ? undefined : Number(width),
        height: fill ? undefined : Number(height),
        lqipBlurAmount: blurStrength,
      })
    : {
        imageUrl: src || '',
        blurDataURL: '',
        altText: alt?.trim() || 'Image',
      };

  if (!imageUrl) return null;

  const calculatedSizes =
    sizes || (fill ? '100vw' : `(max-width: ${width}px) 100vw, ${width}px`);

  return (
    <Image
      src={imageUrl}
      alt={altText}
      {...(!fill ? { width, height } : { fill })}
      className={clsx('object-cover object-top', className)}
      sizes={calculatedSizes}
      priority={priority}
      placeholder={lqip && blurDataURL ? 'blur' : undefined}
      blurDataURL={lqip && blurDataURL ? blurDataURL : undefined}
      loading={priority ? 'eager' : 'lazy'}
      {...rest}
    />
  );
}
