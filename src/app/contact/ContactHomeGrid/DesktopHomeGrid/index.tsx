import React from 'react';
import { getBackgroundColor } from '@/utils/homeProjectUtils';
import { IProjects } from '@/app/(page)/types/IProject';

type IDesktopHomeGrid = {
  projects: IProjects;
};

export function DesktopHomeGrid({ projects }: IDesktopHomeGrid) {
  return (
    <div className="relative lg:h-full">
      <div className="grid grid-cols-4 grid-rows-3 gap-x-[var(--horizontal-grid-spacing)] gap-y-[var(--vertical-grid-spacing)] h-full w-full lg:aspect-[16/9]">
        {projects?.map((project, index) => {
          const currentColor = getBackgroundColor(project) || '#ffffff';
          return (
            <div
              key={index}
              className="relative grid grid-cols-[auto_1fr] gap-4 w-fit"
            >
              <div
                className="flex px-3 w-fit justify-center"
                style={{ position: 'relative' }}
              >
                {(index + 1).toFixed(1)}
              </div>

              {/* Image container */}
              <div
                className="aspect-3/4 w-fit bg-cover bg-center"
                style={{
                  backgroundColor: currentColor,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
