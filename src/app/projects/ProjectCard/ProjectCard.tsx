'use client';

import Link from 'next/link';
import { useRef, useEffect, useState, useMemo } from 'react';
import { useInView } from 'framer-motion';
import IProjectCard from '../types/IProjectCard';
import ProjectCardContent from './ProjectCardContent';

function ProjectCard({ project, index }: IProjectCard) {
  const cardRef = useRef<HTMLDivElement>(null);
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
    () => project?.mediaGallery?.mediaItems ?? [],
    [project?.mediaGallery?.mediaItems]
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

  return project.comingSoon ? (
    <div
      className='flex flex-col items-stretch border-t-[0.5px] pt-1 px-1 lg:gap-0 lg:relative lg:px-2 lg:min-h-[146px]'
      id={`project-${index + 1}`}
      ref={cardRef}
    >
      <ProjectCardContent
        project={project}
        index={index}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        mediaItems={mediaItems}
        heightClasses={heightClasses}
        animateState={animateState}
      />
    </div>
  ) : (
    <Link
      href={project.slug ? `/project/${project.slug}` : '/'}
      className='flex flex-col items-stretch border-t-[0.5px] pt-1 px-1 lg:gap-0 lg:relative lg:px-2 lg:min-h-[146px]'
      id={`project-${index + 1}`}
    >
      <div ref={cardRef}>
        <ProjectCardContent
          project={project}
          index={index}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          mediaItems={mediaItems}
          heightClasses={heightClasses}
          animateState={animateState}
        />
      </div>
    </Link>
  );
}

export default ProjectCard;
