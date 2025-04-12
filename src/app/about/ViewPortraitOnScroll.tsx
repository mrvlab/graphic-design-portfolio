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
      { threshold: 0.6 }
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
        <div className='flex flex-col justify-center items-center aspect-4/5 relative p-[0.5px] flex-1 overflow-hidden'>
          <div className='relative w-full h-full'>
            {about.portrait?.asset?._ref && (
              <NextImage
                refId={about.portrait.asset._ref}
                className='object-cover'
                alt='Portrait photograph'
                fill
              />
            )}
            <div
              className={`absolute inset-0 transition-all duration-700 ${isVisible ? '' : 'backdrop-blur-[2.82px]'} pointer-events-none`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPortraitOnScroll;
