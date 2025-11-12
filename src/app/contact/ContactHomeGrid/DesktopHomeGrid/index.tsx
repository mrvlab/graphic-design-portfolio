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
            <div key={index} className="relative aspect-[4/3] flex gap-2.5">
              <div
                className="flex flex-1 w-full justify-center"
                style={{ position: 'relative' }}
              >
                {(index + 1).toFixed(1)}
              </div>

              {/* Image container */}
              <div className="relative aspect-3/4">
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
