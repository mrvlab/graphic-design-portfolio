import React from 'react';
import { ProjectsQueryResult } from '../../../sanity.types';

type IHomeProjectsTitle = {
  project: ProjectsQueryResult[number];
  index: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
};

const HomeProjectsTitle = ({
  project,
  index,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}: IHomeProjectsTitle) => {
  return (
    <h2
      className='flex-1 flex flex-col justify-between'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`flex flex-col gap-0.5 lg:max-h-[42px] ${
          isHovered ? 'italic' : ''
        }`}
      >
        <span>({(index + 1).toString().padStart(2, '0')})</span>
        <span>{project.title}</span>
        {project.comingSoon ? (
          <span>( Coming Soon )</span>
        ) : (
          <div className='flex gap-2'>
            <span>Year:</span>
            <span>
              {project.year ? new Date(project.year).getFullYear() : ''}
            </span>
          </div>
        )}
      </div>
    </h2>
  );
};

export default HomeProjectsTitle;
