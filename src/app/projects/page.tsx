// app/projects/page.tsx

import { sanityFetch } from '@/sanity/lib/live';
import { fetchProjectsIndexQuery } from '@/sanity/lib/queries';
import Link from 'next/link';
import { FetchProjectsIndexQueryResult } from '../../../sanity.types';

export default async function Page() {
  const { data }: { data: FetchProjectsIndexQueryResult } = await sanityFetch({
    query: fetchProjectsIndexQuery,
  });

  if (!data) {
    return (
      <div className='py-40 text-center text-3xl text-gray-500'>404 –</div>
    );
  }
  if (!data.projects) {
    return console.log('No projects found');
  }
  const { projects } = data;

  return (
    <div className='container max-w-4xl mx-auto my-20 px-4'>
      <div className='border-b pb-8 mb-12'>
        <h1 className='text-5xl font-bold text-gray-900'>List of projects</h1>
      </div>
      {projects.map((project) => (
        <Link key={project._id} href={`/project/${project.slug}`}>
          <h3 className='text-2xl font-bold text-gray-900' key={project._id}>
            {project.title} {project.year}
          </h3>
        </Link>
      ))}
    </div>
  );
}
