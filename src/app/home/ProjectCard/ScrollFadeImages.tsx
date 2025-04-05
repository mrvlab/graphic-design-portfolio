import { motion } from 'framer-motion';
import { imgData } from '@/sanity/lib/image';
import NextImage from '@/components/Media/NextImage';
import IScrollFadeImages from '../types/IScrollFadeImages';

export default function ScrollFadeImages({
  images,
  projectId,
  currentIndex,
  comingSoon = false,
  isVisible,
  isScrollingDown,
}: IScrollFadeImages) {
  const scrollContainerVariants = {
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
      variants={scrollContainerVariants}
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
