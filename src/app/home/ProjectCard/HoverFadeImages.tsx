import { useMemo } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { imgData } from '@/sanity/lib/image';
import NextImage from '../../../components/Media/NextImage';
import IHoverFadeImages from '../types/IHoverFadeImages';

export default function HoverFadeImages({
  mediaGallery,
  projectId,
  comingSoon = false,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: IHoverFadeImages) {
  const items = useMemo(() => mediaGallery?.slice(0, 2) ?? [], [mediaGallery]);

  const imageData = useMemo(
    () =>
      items.map((image) => {
        const ref = image.asset?._ref;
        return {
          ref,
          ...imgData({
            ref: ref || '',
            alt: image.alt?.trim(),
          }),
        };
      }),
    [items]
  );

  const containerVariants = {
    visible: {
      opacity: 1,
      transform: 'none',
      transition: {
        staggerChildren: 0.14,
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transform: 'translateY(0)',
      transition: {
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.2,
      },
    },
  };

  const imageVariants = {
    visible: {
      opacity: isHovered ? (comingSoon ? 0.5 : 1) : 1,
      transform: 'none',
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    hidden: {
      opacity: 0,
      transform: 'translateY(0)',
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className='lg:max-w-[85%] lg:absolute lg:-top-[29%] lg:left-[29%] lg:grid lg:grid-cols-2 lg:gap-2 w-full h-full'
        variants={containerVariants}
        initial={false}
        animate={isHovered ? 'visible' : 'hidden'}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        layoutId={`container-${projectId}`}
      >
        {imageData.map(({ ref, imageUrl }, idx: number) => {
          if (!imageUrl) return null;

          return (
            <m.div
              key={`${projectId}-${idx}`}
              className='relative w-full h-full'
              layoutId={`image-${projectId}-${idx}`}
              variants={imageVariants}
            >
              <NextImage
                refId={ref}
                priority={idx === 0}
                className={'w-full h-full'}
                sizes='(min-width: 1024px) 40vw, 100vw'
                loading='eager'
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                width={800}
                height={1067}
              />
            </m.div>
          );
        })}
      </m.div>
    </LazyMotion>
  );
}
