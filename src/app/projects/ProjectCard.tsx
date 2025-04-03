import { PortableText } from 'next-sanity';
import { FetchProjectsIndexQueryResult } from '../../../sanity.types';
import Link from 'next/link';

import NextImage from '@/components/Media/NextImage';

type Project = NonNullable<
  NonNullable<FetchProjectsIndexQueryResult>['projects']
>[number];

type MediaItem = NonNullable<
  NonNullable<Project['images']>['mediaItems']
>[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  if (!project) return null;

  const mediaItems = project.images?.mediaItems ?? [];
  const isTwoImages = mediaItems.length === 2;

  const heightClasses = isTwoImages
    ? ['h-[85%]', 'h-full']
    : ['h-full', 'h-[85%]', 'h-full', 'h-[85%]'];

  return (
    <Link
      href={project.slug ? `/project/${project.slug}` : '/home'}
      className='flex flex-col items-stretch gap-3 border-t-[0.5px] pt-1 px-1 lg:gap-0 lg:relative lg:px-2 lg:min-h-[146px] lg:h-48'
      id={`project-${index + 1}`}
    >
      <h2 className='flex flex-1 gap-1 lg:grid lg:grid-cols-4 lg:gap-2'>
        <span className='max-lg:flex-[0.4]'>
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <span className='max-lg:flex-[1]'>{project.title}</span>
        <span className='max-lg:flex-[1]'>
          {project.richText && <PortableText value={project.richText} />}
        </span>
        <span className='max-lg:flex-[0.4] lg:text-right'>
          {project.year ? new Date(project.year).getFullYear() : ''}
        </span>

        {project.comingSoon && <span>( Coming Soon )</span>}
      </h2>

      <div className='lg:absolute lg:top-1 lg:right-2 lg:mb-auto lg:w-1/2'>
        <div className='hidden lg:flex' />
        <div className='grid grid-cols-4 gap-1 lg:gap-2 lg:grid-cols-5 lg:pl-[20%]'>
          {mediaItems.slice(0, 5).map((image: MediaItem, i: number) => {
            const heightClass = heightClasses[i] || '';
            const visibilityClass = i === 4 ? 'hidden lg:block' : '';
            const ref = image.asset?._ref;

            if (!ref) return null;

            return (
              <NextImage
                key={`${index}-${i}`}
                refId={ref}
                className={`w-full ${heightClass} ${visibilityClass}`}
              />
            );
          })}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
