'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import type { FetchHomePageQueryResult } from '../../../sanity.types';
import { useVisibleProjectIds } from '@/components/useVisibleProjectIds';

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

export default function ProjectImages({
  images,
  projectId,
  currentIndex,
}: Props) {
  const visibleProjects = useVisibleProjectIds();
  const isVisible = visibleProjects.includes(currentIndex);

  return (
    <div className='grid grid-cols-2 gap-2'>
      {images?.slice(0, 2).map((image, idx) => (
        <motion.div
          key={`${projectId}-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
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
    </div>
  );
}
