'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type ImageItem = {
  url: string | null;
  alt: string | null;
};

type IHoverFadeImages = {
  images: ImageItem[] | null;
  projectId: string;
  comingSoon?: boolean | null;
};

export default function HoverFadeImages({
  images,
  projectId,
  comingSoon = false,
}: IHoverFadeImages) {
  const [isHovered, setIsHovered] = useState(false);

  // Memoized first two images
  const items = useMemo(() => images?.slice(0, 2) ?? [], [images]);

  // Memoized opacity and transition
  const opacity = isHovered ? (comingSoon ? 0.2 : 1) : 0;
  const transition = useMemo(
    () => ({
      duration: isHovered ? 0.2 : 1,
      ease: 'easeInOut' as const,
    }),
    [isHovered]
  );

  // Memoized handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className='lg:absolute lg:-top-[29%] lg:left-[29%] lg:grid lg:grid-cols-2 lg:gap-2 w-full h-full'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((image, idx) => (
        <div key={`${projectId}-${idx}`} className='relative w-full h-full'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={`${projectId}-img-${idx}-${isHovered}`}
              initial={{ opacity: 0 }}
              animate={{ opacity, transition }}
              exit={{
                opacity: 0,
                transition: { duration: 2.5, ease: 'easeInOut' },
              }}
              className='absolute inset-0 w-full h-full'
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={image.alt ?? ''}
                  width={400}
                  height={400}
                  className='w-full object-cover aspect-3/4'
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
