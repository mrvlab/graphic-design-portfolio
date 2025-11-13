import React from 'react';
import { getBackgroundColor } from '@/utils/homeProjectUtils';
import { IProjects } from '@/app/(page)/types/IProject';
import { GRID_STYLES } from '@/app/(page)/HomeGrid/DesktopColorSwapHomeGrid/gridStyles';

type IDesktopHomeGrid = {
  projects: IProjects;
};

export function DesktopHomeGrid({ projects }: IDesktopHomeGrid) {
  return (
    <div className={GRID_STYLES.CONTAINER}>
      <div className={GRID_STYLES.GRID}>
        {projects?.map((project, index) => {
          const currentColor = getBackgroundColor(project) || '#ffffff';
          return (
            <div key={index} className={GRID_STYLES.GRID_ITEM}>
              <div
                className={GRID_STYLES.PROJECT_NUMBER}
                style={{ position: 'relative' }}
              >
                {(index + 1).toFixed(1)}
              </div>

              {/* Image container */}
              <div
                className={GRID_STYLES.IMAGE_CONTAINER}
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
