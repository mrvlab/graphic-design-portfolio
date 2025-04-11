import Image from 'next/image';
import { imgData } from '@/sanity/lib/image';
import clsx from 'clsx';
import { INextImage } from './types/INextImage';

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
  ...rest
}: INextImage) {
  const isSanityImage = Boolean(refId);

  const { imageUrl, blurDataURL, altText } = isSanityImage
    ? imgData({
        ref: refId || '',
        alt,
        width,
        height,
        lqipBlurAmount: blurStrength,
      })
    : {
        imageUrl: src || '',
        blurDataURL: '',
        altText: alt?.trim() || 'Image',
      };

  if (!imageUrl) return null;

  const calculatedSizes = sizes || `(max-width: ${width}px) 100vw, ${width}px`;

  return (
    <Image
      src={imageUrl}
      alt={altText}
      width={width}
      height={height}
      className={clsx('object-cover', className)}
      sizes={calculatedSizes}
      priority={priority}
      placeholder={lqip && blurDataURL ? 'blur' : undefined}
      blurDataURL={lqip && blurDataURL ? blurDataURL : undefined}
      loading={priority ? 'eager' : 'lazy'}
      {...rest}
    />
  );
}
