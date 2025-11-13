import React from 'react';
import { getBackgroundColor } from '@/utils/homeProjectUtils';
import { IProjects } from '@/app/(page)/types/IProject';

type IMobileHomeGrid = {
  projects: IProjects;
};

export function MobileHomeGrid({ projects }: IMobileHomeGrid) {
  return (
    <div className="relative items-center justify-center py-0">
      <div
        className="grid grid-cols-2 mx-auto gap-y-16 gap-x-24 px-12 pt-6 sm:max-w-[70%] py-0"
        suppressHydrationWarning
      >
        {projects.map((project, index) => {
          const projectColor = getBackgroundColor(project);

          return (
            <div key={project.title || index} className="relative">
              <div className="mobile-home-grid-item" suppressHydrationWarning>
                <div className="flex w-full justify-center lg:hidden">
                  {`( ${(index + 1).toFixed(1)} )`}
                </div>

                <div className="relative aspect-3/4">
                  {/* Color placeholder */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: projectColor,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
