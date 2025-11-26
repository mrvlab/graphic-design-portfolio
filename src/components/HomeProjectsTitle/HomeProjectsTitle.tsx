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
      className='flex flex-col justify-between'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`flex flex-col ${isHovered && !project.comingSoon ? 'italic' : ''}`}
      >
        <span>{(index + 1).toFixed(1)}</span>
      </div>
    </h2>
  );
};

export default HomeProjectsTitle;
