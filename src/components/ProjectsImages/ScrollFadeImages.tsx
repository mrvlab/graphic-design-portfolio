'use client';

import { motion } from 'framer-motion';
import { useVisibleProjectIds } from './useVisibleProjectIds';
import { imgData } from '@/sanity/lib/image';
import type { FetchHomePageQueryResult } from '../../../sanity.types';
import NextImage from '@/components/Media/NextImage';

type MediaItem = NonNullable<
  NonNullable<
    NonNullable<FetchHomePageQueryResult>['projects']
  >[number]['images']
>['mediaItems'];

type Props = {
  images: MediaItem;
  projectId: string;
  currentIndex: number;
  comingSoon: boolean | null;
};

export default function ScrollFadeImages({
  images,
  projectId,
  currentIndex,
  comingSoon = false,
}: Props) {
  const { visibleProjects, isScrollingDown } = useVisibleProjectIds();
  const isVisible = visibleProjects.includes(currentIndex);

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: isScrollingDown ? 1 : -1,
      },
    },
    hidden: {},
  };

  const imageVariants = {
    visible: {
      opacity: comingSoon ? 0.2 : 1,
      transition: { duration: 0.5 },
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className='grid grid-cols-2 gap-2'
      variants={containerVariants}
      initial='hidden'
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {images?.slice(0, 2).map((image, idx) => {
        const ref = image.asset?._ref;
        const { imageUrl } = imgData({
          ref: ref || '',
          alt: image.alt?.trim(),
        });

        if (!imageUrl) return null;

        return (
          <motion.div
            key={`${projectId}-${idx}`}
            variants={imageVariants}
            className='w-full h-full'
          >
            <NextImage
              refId={ref}
              priority={currentIndex === 0 && idx === 0}
              className='w-full h-full'
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
