import React from 'react';
import { ProjectsQueryResult } from '../../../sanity.types';

type IHomeProjectsTitle = {
  project: ProjectsQueryResult[number];
  index: number;
};

const HomeProjectsTitle = ({ project, index }: IHomeProjectsTitle) => {
  return (
    <h2 className='flex-1 flex flex-col justify-between'>
      <div className='flex flex-col gap-0.5 lg:max-h-[42px]'>
        <span>({(index + 1).toString().padStart(2, '0')})</span>
        <span>{project.title}</span>
        {project.year && (
          <div className='flex gap-2'>
            <span>Year:</span>
            <span>
              {project.year ? new Date(project.year).getFullYear() : ''}
            </span>
          </div>
        )}

        {project.comingSoon && <span>( Coming Soon )</span>}
      </div>
    </h2>
  );
};

export default HomeProjectsTitle;
