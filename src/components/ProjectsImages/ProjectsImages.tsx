'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import type { FetchHomePageQueryResult } from '../../../sanity.types';
import { useVisibleProjectIds } from '@/components/ProjectsImages/useVisibleProjectIds';

type MediaItem = NonNullable<
  NonNullable<
    NonNullable<FetchHomePageQueryResult>['projects']
  >[number]['images']
>['mediaItems'];

type Props = {
  images: MediaItem;
  projectId: string;
  currentIndex: number;
};

export default function ProjectsImages({
  images,
  projectId,
  currentIndex,
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
      opacity: 1,
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
      {images?.slice(0, 2).map((image, idx) => (
        <motion.div
          key={`${projectId}-${idx}`}
          variants={imageVariants}
          className='w-full h-full'
        >
          <Image
            src={image.url ?? ''}
            alt={image.alt ?? ''}
            width={500}
            height={500}
            className='w-full h-full object-cover aspect-3/4'
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
