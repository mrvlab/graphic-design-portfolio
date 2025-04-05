import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { imgData } from '@/sanity/lib/image';
import NextImage from '../../../components/Media/NextImage';
import containerVariants from '@/utils/containerVariants';
import imageVariants from '@/utils/imageVariants';
import IHoverFadeImages from '../types/IHoverFadeImages';

export default function HoverFadeImages({
  images,
  projectId,
  comingSoon = false,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: IHoverFadeImages) {
  const items = useMemo(() => images?.slice(0, 2) ?? [], [images]);

  const animateState = useMemo(() => {
    return isHovered ? 'visible' : 'hidden';
  }, [isHovered]);

  return (
    <motion.div
      className='lg:absolute lg:-top-[29%] lg:left-[29%] lg:grid lg:grid-cols-2 lg:gap-2 w-full h-full'
      variants={containerVariants}
      initial='hidden'
      animate={animateState}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.map((image, idx) => {
        const ref = image.asset?._ref;
        const { imageUrl } = imgData({
          ref: ref || '',
          alt: image.alt?.trim(),
        });

        if (!imageUrl) return null;

        return (
          <motion.div
            key={`${projectId}-${idx}`}
            className='relative w-full h-full'
            variants={imageVariants}
            style={{
              opacity: comingSoon ? 0.2 : 1,
            }}
          >
            <NextImage
              refId={ref}
              priority={idx === 0}
              className={'w-full h-full'}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
