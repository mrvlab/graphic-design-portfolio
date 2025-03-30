import { sanityFetch } from '@/sanity/lib/live';
import { fetchHomePageQuery } from '@/sanity/lib/queries';
import Link from 'next/link';
import React from 'react';
import { FetchHomePageQueryResult } from '../../../sanity.types';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import ProjectImages from './ProjectImages';

export async function generateMetadata() {
  const { data: page } = await sanityFetch({
    query: fetchHomePageQuery,
  });

  return generateSeoMetadata({
    slug: 'home',
    page: page,
  });
}

const page = async () => {
  const { data: home }: { data: FetchHomePageQueryResult } = await sanityFetch({
    query: fetchHomePageQuery,
  });

  if (!home) {
    return (
      <div className='py-40 text-center text-3xl text-gray-500'>
        404 – Home Not Found
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-x-1 gap-y-12 px-1 pt-[140px]'>
      {home.projects &&
        home.projects.map((project, indx) => (
          <Link
            href={`/project/${project.slug}`}
            key={project._id}
            className='flex flex-col gap-4'
            id={`project-${indx + 1}`}
          >
            <div>
              <h2 className='flex flex-col'>
                <span>({(indx + 1).toString().padStart(2, '0')})</span>
                <span>{project.title}</span>
                <span>
                  {project.year ? new Date(project.year).getFullYear() : ''}
                </span>
              </h2>
            </div>
            <ProjectImages
              images={project.images?.mediaItems ?? []}
              projectId={project._id}
              currentIndex={indx}
            />
          </Link>
        ))}
    </div>
  );
};

export default page;
