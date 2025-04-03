'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import type { FetchHomePageQueryResult } from '../../../sanity.types';
import { urlFor } from '@/sanity/lib/image';

type MediaItem = NonNullable<
  NonNullable<
    NonNullable<FetchHomePageQueryResult>['projects']
  >[number]['images']
>['mediaItems'];

type Props = {
  images: MediaItem | null;
  projectId: string;
  comingSoon?: boolean | null;
};

export default function HoverFadeImages({
  images,
  projectId,
  comingSoon = false,
}: Props) {
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
      {items.map((image, idx) => {
        const ref = image.asset?._ref;
        const imageUrl = ref ? urlFor(ref).width(800).height(1066).url() : null;
        const blurDataURL = ref
          ? urlFor(ref).width(24).height(24).blur(10).url()
          : '';
        const altText = image.alt?.trim() || 'Project image';

        if (!imageUrl) return null;

        return (
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
            <Image
              src={imageUrl}
              alt={altText}
              width={400}
              height={533}
              className='w-full object-cover aspect-3/4'
              placeholder={blurDataURL ? 'blur' : undefined}
              blurDataURL={blurDataURL}
              loading='lazy'
              sizes='(min-width: 1024px) 20vw, 50vw'
            />
          </motion.div>
        );
      })}
    </div>
  );
}
