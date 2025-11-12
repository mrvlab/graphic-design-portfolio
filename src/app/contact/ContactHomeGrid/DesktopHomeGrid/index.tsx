import React from 'react';
import { getBackgroundColor } from '@/utils/homeProjectUtils';
import { IProjects } from '@/app/(page)/types/IProject';

type IDesktopHomeGrid = {
  projects: IProjects;
};

export function DesktopHomeGrid({ projects }: IDesktopHomeGrid) {
  return (
    <div className="relative lg:h-full">
      <div className="grid lg:grid-rows-3 lg:grid-cols-4 lg:gap-[13.06%] lg:aspect-[2/1] my-auto lg:h-full lg:w-full">
        {projects?.map((project, index) => {
          const currentColor = getBackgroundColor(project) || '#ffffff';
          return (
            <div
              key={index}
              className="flex justify-center relative aspect-[4/3] gap-2.5 overflow-hidden"
            >
              <div
                className="flex px-3 w-fit justify-center"
                style={{ position: 'relative' }}
              >
                {(index + 1).toFixed(1)}
              </div>

              {/* Image container */}
              <div className="flex relative aspect-3/4 h-full">
                {/* Color placeholder - shows rotating colors during animation and when not hovered */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: currentColor,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
