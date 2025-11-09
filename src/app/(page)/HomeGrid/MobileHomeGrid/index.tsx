'use client';

import Media from '@/components/Media/Media';
import { IProjects } from '../../types/IProject';

type IMobileHomeGrid = {
  projects: IProjects;
};

export function MobileHomeGrid({ projects }: IMobileHomeGrid) {
  return (
    <div
      className="mobile-home-grid gap-y-16 gap-x-24 px-12"
      suppressHydrationWarning
    >
      {projects.map((project, index) => {
        // Get first media item from mediaGallery
        const firstMediaItem = project.mediaGallery?.mediaItems?.[0];

        return (
          <div
            key={project.title || index}
            className="mobile-home-grid-item"
            suppressHydrationWarning
          >
            <div className="flex flex-[0.5] w-full justify-center lg:hidden">
              {`( ${(index + 1).toFixed(1)} )`}
            </div>

            <div className="relative flex-1 aspect-4/5">
              <Media
                id={
                  firstMediaItem?.asset?.url
                    ? firstMediaItem.asset._id
                    : undefined
                }
                playbackId={firstMediaItem?.asset?.playbackId || undefined}
                alt={
                  firstMediaItem?.alt || project.title || `Project ${index + 1}`
                }
                className="w-full h-full object-cover"
                width={800}
                height={1000}
                priority={index < 4}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
