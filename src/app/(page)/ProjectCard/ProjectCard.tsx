'use client';

import HomeProjectsTitle from '@/components/HomeProjectsTitle/HomeProjectsTitle';
import Link from 'next/link';
import React, { useMemo, useState, useCallback } from 'react';
import { ProjectsQueryResult } from '../../../../sanity.types';
import { useIsMobile } from '@/utils/useIsMobile';
import { useVisibleProjectIds } from './useVisibleProjectIds';
import HoverFadeImages from './HoverFadeImages';
import ScrollFadeImages from './ScrollFadeImages';
import IHomeProjectCard from '../types/IHomeProjectCard';

const ProjectCard = ({ project, index }: IHomeProjectCard) => {
  const mediaItems = useMemo(
    () =>
      (project?.mediaGallery?.mediaItems ?? []).map((item) => ({
        ...item,
        _id: null,
      })),
    [project?.mediaGallery?.mediaItems]
  );

  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const { visibleProjects, isScrollingDown } = useVisibleProjectIds();
  const isVisible = visibleProjects.includes(index);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  if (!project) return null;
  return project.comingSoon ? (
    <div
      key={project._id}
      className='flex items-stretch gap-4 lg:gap-6 lg:relative lg:justify-center'
      id={`project-${index + 1}`}
    >
      <HomeProjectsTitle
        project={project as ProjectsQueryResult[number]}
        index={index}
        isHovered={isHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {isMobile ? (
        <ScrollFadeImages
          mediaGallery={mediaItems}
          projectId={project._id || ''}
          currentIndex={index}
          comingSoon={project.comingSoon || false}
          isVisible={isVisible}
        />
      ) : (
        <HoverFadeImages
          mediaGallery={mediaItems}
          projectId={project._id || ''}
          comingSoon={project.comingSoon || false}
        />
      )}
    </div>
  ) : (
    <Link
      href={project.slug ? `/project/${project.slug}` : '/'}
      key={project._id}
      className='flex items-stretch gap-4 lg:gap-6 lg:relative lg:justify-center'
      id={`project-${index + 1}`}
    >
      <HomeProjectsTitle
        project={project as ProjectsQueryResult[number]}
        index={index}
        isHovered={isHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {isMobile ? (
        <ScrollFadeImages
          mediaGallery={mediaItems}
          projectId={project._id || ''}
          currentIndex={index}
          comingSoon={project.comingSoon || false}
          isVisible={isVisible}
        />
      ) : (
        <HoverFadeImages
          mediaGallery={mediaItems}
          projectId={project._id || ''}
          comingSoon={project.comingSoon || false}
        />
      )}
    </Link>
  );
};

export default ProjectCard;
