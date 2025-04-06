'use client';

import { useEffect, useRef, useState } from 'react';
import NextImage from '@/components/Media/NextImage';
import IMobileLayout from './types/IAbout';

const ViewPortraitOnScroll = ({ about }: IMobileLayout) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.8 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className='flex justify-center items-center p-2.5 aspect-2/3'
    >
      <div className='h-fit w-1/2'>
        {about.portrait?.asset?._ref && (
          <NextImage
            refId={about.portrait.asset._ref}
            priority={true}
            className={`p-1 transition-all duration-700 ${
              isVisible ? 'blur-0' : 'blur-[3.82px]'
            }`}
            alt='Portrait photograph'
          />
        )}
      </div>
    </div>
  );
};

export default ViewPortraitOnScroll;
