'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useVisibleProjectIds } from './useVisibleProjectIds';
import { urlFor } from '@/sanity/lib/image';
import type { FetchHomePageQueryResult } from '../../../sanity.types';

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
        const imageUrl = ref ? urlFor(ref).width(400).height(533).url() : '';
        const blurDataURL = ref
          ? urlFor(ref).width(24).height(24).blur(10).url()
          : '';
        const altText = image.alt?.trim() || 'Project image';

        if (!imageUrl) return null;

        return (
          <motion.div
            key={`${projectId}-${idx}`}
            variants={imageVariants}
            className='w-full h-full'
          >
            <Image
              src={imageUrl}
              alt={altText}
              width={400}
              height={533}
              className='w-full h-full object-cover aspect-3/4'
              placeholder={blurDataURL ? 'blur' : undefined}
              blurDataURL={blurDataURL}
              priority={currentIndex === 0 && idx === 0}
              sizes='(min-width: 1024px) 20vw, 50vw'
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
