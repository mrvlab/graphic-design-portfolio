'use client';

import Image from 'next/image';
import { imgData } from '@/sanity/lib/image';
import clsx from 'clsx';
import { ImageProps } from 'next/image';

type INextImage = Omit<ImageProps, 'src' | 'alt'> & {
  refId?: string;
  src?: string;
  alt?: string;
  lqip?: boolean;
  blurStrength?: number;
  hideScrollRef?: React.RefObject<HTMLImageElement | null>;
};

export default function NextImage({
  refId,
  src,
  alt,
  lqip = true,
  blurStrength,
  width = 800,
  height = 1066,
  className,
  sizes,
  priority = false,
  fill,
  hideScrollRef,
  quality = 90,
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
    sizes ||
    (fill
      ? '100vw'
      : `(max-width: 768px) 100vw, (max-width: 1200px) 80vw, ${width}px`);

  return (
    <div className='relative w-full h-full'>
      <Image
        src={imageUrl}
        alt={altText}
        {...(!fill ? { width, height } : { fill })}
        className={clsx(
          'object-cover object-top opacity-0 transition-opacity duration-300 ease-in-out [&.loaded]:opacity-100',
          className
        )}
        sizes={calculatedSizes}
        priority={priority}
        placeholder={lqip && blurDataURL ? 'blur' : undefined}
        blurDataURL={lqip && blurDataURL ? blurDataURL : undefined}
        loading={priority ? 'eager' : 'lazy'}
        quality={quality}
        ref={hideScrollRef}
        onLoad={(e) => {
          e.currentTarget.classList.add('loaded');
        }}
        {...rest}
      />
    </div>
  );
}
