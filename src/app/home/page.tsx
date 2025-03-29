import { sanityFetch } from '@/sanity/lib/live';
import { fetchHomePageQuery } from '@/sanity/lib/queries';
import Link from 'next/link';
import React from 'react';
import { FetchHomePageQueryResult } from '../../../sanity.types';
import { generateSeoMetadata } from '@/utils/generateMetadata';

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
    <div className='container max-w-4xl mx-auto my-20 px-4'>
      <div className='border-b pb-8 mb-12'>
        <h1 className='text-5xl font-bold text-gray-900'>
          Home Page list of 12 projects
        </h1>
      </div>

      <div>
        {home.projects &&
          home.projects.map((project) => (
            <div key={project._id} className='flex flex-col gap-4 mb-8'>
              <Link href={`/project/${project.slug}`}>
                <h2 className='text-3xl font-bold text-gray-900'>
                  {project.title}
                </h2>
              </Link>
              <p className='flex gap-1.5 items-center text-xl  text-gray-600'>
                Project status:{' '}
                {project.comingSoon ? (
                  <span className='text-red-500'> Coming soon</span>
                ) : (
                  <span className='text-green-500'> Available</span>
                )}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
