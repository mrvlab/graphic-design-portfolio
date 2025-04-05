import { sanityFetch } from '@/sanity/lib/live';
import { fetchHomePageQuery } from '@/sanity/lib/queries';
import React from 'react';
import { FetchHomePageQueryResult } from '../../../sanity.types';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import ProjectList from './ProjectList';

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
  const { data }: { data: FetchHomePageQueryResult } = await sanityFetch({
    query: fetchHomePageQuery,
  });

  if (!data) {
    return (
      <div className='py-40 text-center text-3xl text-gray-500'>
        404 – Home Not Found
      </div>
    );
  }

  const projects = data.projects;

  if (!projects?.length) {
    return (
      <div className='py-40 text-center text-3xl text-gray-500'>
        No Projects Found
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-x-1 gap-y-12 px-1 pt-[140px] pb-12 lg:grid-cols-4 lg:pl-2 lg:pr-0 lg:pt-0 lg:pb-0 lg:my-auto lg:mr-auto lg:aspect-[21/7] lg:max-w-[94.5%] lg:w-full lg:gap-[140px]'>
      {projects.map((project, indx) => (
        <ProjectList key={project._id} project={project} index={indx} />
      ))}
    </div>
  );
};

export default page;
