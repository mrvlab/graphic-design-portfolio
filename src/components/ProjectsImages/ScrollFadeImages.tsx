'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useVisibleProjectIds } from './useVisibleProjectIds';

type ImageItem = {
  url: string | null;
  alt: string | null;
};

type Props = {
  images: ImageItem[] | null;
  projectId: string;
  currentIndex: number;
  comingSoon: boolean | null;
};

export default function ScrollFadeImages({
  images,
  projectId,
  currentIndex,
  comingSoon = false, // default to false
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
      {images?.slice(0, 2).map((image, idx) => (
        <motion.div
          key={`${projectId}-${idx}`}
          variants={imageVariants}
          className='w-full h-full'
        >
          <Image
            src={image.url ?? ''}
            alt={image.alt ?? ''}
            width={400}
            height={533}
            className='w-full h-full object-cover aspect-3/4'
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
