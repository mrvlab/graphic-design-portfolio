import { sanityFetch } from '@/sanity/lib/live';
import { fetchHomePageQuery } from '@/sanity/lib/queries';
import Link from 'next/link';
import React from 'react';
import {
  FetchHomePageQueryResult,
  ProjectsQueryResult,
} from '../../../sanity.types';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import ProjectsImages from '@/components/ProjectsImages/ProjectsImages';
import HomeProjectsTitle from '@/components/HomeProjectsTitle/HomeProjectsTitle';
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
    <div className='grid grid-cols-2 gap-x-1 gap-y-12 px-1 pt-[140px] lg:grid-cols-4 lg:pl-2 lg:pr-0 lg:pt-0 lg:my-auto lg:mr-auto lg:aspect-[21/7] lg:max-w-[94.5%] lg:w-full lg:gap-[140px]'>
      {home.projects &&
        home.projects.map((project, indx) => (
          <Link
            href={project.slug ? `/project/${project.slug}` : '/home'}
            key={project._id}
            className='flex flex-col items-stretch gap-4 lg:gap-0 lg:relative'
            id={`project-${indx + 1}`}
          >
            <HomeProjectsTitle
              project={project as ProjectsQueryResult[number]}
              index={indx}
            />

            <ProjectsImages
              images={project.images?.mediaItems ?? []}
              projectId={project._id}
              currentIndex={indx}
              comingSoon={project.comingSoon}
            />
          </Link>
        ))}
    </div>
  );
};

export default page;
