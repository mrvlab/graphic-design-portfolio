import { motion } from 'framer-motion';
import { imgData } from '@/sanity/lib/image';
import NextImage from '@/components/Media/NextImage';
import IScrollFadeImages from '../types/IScrollFadeImages';

export default function ScrollFadeImages({
  mediaGallery,
  projectId,
  currentIndex,
  comingSoon = false,
  isVisible,
}: IScrollFadeImages) {
  const firstImage = mediaGallery?.[0];
  
  if (!firstImage) return null;

  const ref = firstImage.asset?._id;
  const { imageUrl } = imgData({
    ref: ref || '',
    alt: firstImage.alt?.trim(),
  });

  if (!imageUrl) return null;

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
      className='w-full'
      variants={imageVariants}
      initial='hidden'
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <NextImage
        refId={ref}
        priority={currentIndex === 0}
        className='w-full h-full'
      />
    </motion.div>
  );
}
