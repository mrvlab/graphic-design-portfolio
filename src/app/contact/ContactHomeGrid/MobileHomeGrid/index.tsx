import React from 'react';
import { getBackgroundColor } from '@/utils/homeProjectUtils';
import { IProjects } from '@/app/(page)/types/IProject';
import { MOBILE_GRID_STYLES } from '@/app/(page)/HomeGrid/MobileHomeGrid/gridStyles';

type IMobileHomeGrid = {
  projects: IProjects;
};

export function MobileHomeGrid({ projects }: IMobileHomeGrid) {
  return (
    <div className="relative items-center justify-center py-0 h-[calc(100dvh-var(--nav-footer-total-mobile))]">
      <div
        className={`grid grid-cols-2 mx-auto ${MOBILE_GRID_STYLES.GRID_BASE} pt-6 py-0`}
        suppressHydrationWarning
      >
        {projects.map((project, index) => {
          const projectColor = getBackgroundColor(project);

          return (
            <div
              key={project.title || index}
              className={MOBILE_GRID_STYLES.GRID_ITEM_OUTER}
            >
              <div
                className={MOBILE_GRID_STYLES.GRID_ITEM_INNER}
                suppressHydrationWarning
              >
                <div className={MOBILE_GRID_STYLES.PROJECT_NUMBER}>
                  {`( ${(index + 1).toFixed(1)} )`}
                </div>

                <div className={MOBILE_GRID_STYLES.IMAGE_CONTAINER}>
                  {/* Color placeholder */}
                  <div
                    className={MOBILE_GRID_STYLES.LAYER_ABSOLUTE}
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
