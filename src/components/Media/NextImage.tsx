// components/RefImage.tsx
'use client';

import Image, { ImageProps } from 'next/image';
import { imgData } from '@/sanity/lib/image';
import clsx from 'clsx';

type RefImageProps = {
  refId?: string; // Sanity _ref
  src?: string; // Fallback to direct URL if no ref
  alt?: string;
  lqip?: boolean;
  blurStrength?: number;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
} & Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'placeholder' | 'blurDataURL'
>;

export default function NextImage({
  refId,
  src,
  alt,
  lqip = true,
  blurStrength,
  width = 400,
  height = 533,
  className,
  sizes = '(min-width: 1024px) 20vw, 50vw',
  priority = false,
  ...rest
}: RefImageProps) {
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

  return (
    <Image
      src={imageUrl}
      alt={altText}
      width={width}
      height={height}
      className={clsx('object-cover aspect-3/4', className)}
      sizes={sizes}
      priority={priority}
      placeholder={lqip && blurDataURL ? 'blur' : undefined}
      blurDataURL={lqip && blurDataURL ? blurDataURL : undefined}
      {...rest}
    />
  );
}
