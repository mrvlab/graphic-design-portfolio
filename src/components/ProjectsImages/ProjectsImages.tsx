'use client';

import type { FetchHomePageQueryResult } from '../../../sanity.types';
import { useIsMobile } from '@/utils/useIsMobile';
import ScrollFadeImages from './ScrollFadeImages';
import HoverFadeImages from './HoverFadeImages';

type MediaItem = NonNullable<
  NonNullable<
    NonNullable<FetchHomePageQueryResult>['projects']
  >[number]['images']
>['mediaItems'];

type Props = {
  images: MediaItem;
  projectId: string;
  currentIndex: number;
  comingSoon: boolean | null;
};

export default function ProjectsImages({
  images,
  projectId,
  currentIndex,
  comingSoon = false,
}: Props) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <ScrollFadeImages
        images={images}
        projectId={projectId}
        currentIndex={currentIndex}
        comingSoon={comingSoon}
      />
    );
  }

  return (
    <HoverFadeImages
      images={images}
      projectId={projectId}
      comingSoon={comingSoon}
    />
  );
}
