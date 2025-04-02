'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  const items = useMemo(() => images?.slice(0, 2) ?? [], [images]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className='lg:absolute lg:-top-[29%] lg:left-[29%] lg:grid lg:grid-cols-2 lg:gap-2 w-full h-full'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((image, idx) => (
        <motion.div
          key={`${projectId}-${idx}`}
          className='relative w-full h-full'
          initial={false}
          animate={{
            opacity: isHovered ? (comingSoon ? 0.2 : 1) : 0,
          }}
          transition={{
            duration: isHovered ? 0.2 : 2.5,
            ease: 'easeInOut',
          }}
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
      ))}
    </div>
  );
}
