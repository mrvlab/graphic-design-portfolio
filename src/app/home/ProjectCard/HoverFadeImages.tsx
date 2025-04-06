import { useMemo } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
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

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className='lg:absolute lg:-top-[29%] lg:left-[29%] lg:grid lg:grid-cols-2 lg:gap-2 w-full h-full'
        variants={containerVariants}
        initial={false}
        animate={isHovered ? 'visible' : 'hidden'}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        layoutId={`container-${projectId}`}
      >
        {imageData.map(({ ref, imageUrl }, idx) => {
          if (!imageUrl) return null;

          return (
            <m.div
              key={`${projectId}-${idx}`}
              className='relative w-full h-full'
              variants={imageVariants}
              style={{
                opacity: comingSoon ? 0.2 : 1,
                willChange: 'transform',
              }}
              layoutId={`image-${projectId}-${idx}`}
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
