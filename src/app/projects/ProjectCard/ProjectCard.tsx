'use client';

import Link from 'next/link';
import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import NextImage from '@/components/Media/NextImage';
import containerVariants from '@/utils/containerVariants';
import imageVariants from '@/utils/imageVariants';
import IProjectCard from '../types/IProjectCard';
import IMediaItem from '../types/IMediaItem';
import TextLayoutMobile from './TextLayoutMobile';
import TextLayoutDesktop from './TextLayoutDesktop';

function ProjectCard({ project, index }: IProjectCard) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    margin: '-25% 0px -35% 0px',
  });

  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const check = () => {
      const newIsDesktop = window.innerWidth >= 1024;
      setIsDesktop(newIsDesktop);

      if (isHovered && newIsDesktop !== isDesktop) {
        setIsHovered(false);
      }
    };

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(check, 150);
    };

    check();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered, isDesktop]);

  const mediaItems = useMemo(
    () => project?.images?.mediaItems ?? [],
    [project?.images?.mediaItems]
  );

  const heightClasses = useMemo(() => {
    const isTwo = mediaItems.length === 2;
    return isTwo
      ? ['h-[85%]', 'h-full']
      : ['h-full', 'h-[85%]', 'h-full', 'h-[85%]'];
  }, [mediaItems]);

  const animateState = useMemo(() => {
    if (isDesktop) return isHovered ? 'visible' : 'hidden';
    return isInView ? 'visible' : 'hidden';
  }, [isDesktop, isHovered, isInView]);

  if (!project) return null;

  return (
    <Link
      href={project.slug ? `/project/${project.slug}` : '/home'}
      className='flex flex-col items-stretch border-t-[0.5px] pt-1 px-1 lg:gap-0 lg:relative lg:px-2 lg:min-h-[146px]'
      id={`project-${index + 1}`}
      ref={cardRef}
    >
      <div className='flex flex-col gap-3 lg:grid lg:grid-cols-4 lg:gap-2'>
        <TextLayoutMobile index={index} project={project} />

        <TextLayoutDesktop
          index={index}
          project={project}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />

        <div className='lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-1 z-10'>
          <motion.div
            className='grid grid-cols-4 gap-1 lg:gap-2 lg:grid-cols-5 lg:pl-[20%] lg:pb-3'
            variants={containerVariants}
            initial='hidden'
            animate={animateState}
          >
            {mediaItems.length < 5 &&
              [...Array(5 - mediaItems.length)].map((_, i) => (
                <div key={`placeholder-${i}`} className='hidden lg:block' />
              ))}

            {mediaItems.slice(0, 5).map((image: IMediaItem, i: number) => {
              const heightClass = heightClasses[i] || '';
              const visibilityClass = i === 4 ? 'hidden lg:block' : '';
              const ref = image.asset?._ref;

              if (!ref) return null;

              return (
                <motion.div
                  key={`${index}-${i}`}
                  variants={imageVariants}
                  className={`w-full ${heightClass} ${visibilityClass}`}
                >
                  <NextImage refId={ref} className='w-full h-full' />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
