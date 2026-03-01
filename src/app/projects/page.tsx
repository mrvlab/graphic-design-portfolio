import { sanityFetch } from '@/sanity/lib/live';
import { fetchProjectsIndexQuery } from '@/sanity/lib/queries';
import { FetchProjectsIndexQueryResult } from '../../../sanity.types';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import { dataAttr } from '@/sanity/lib/utils';

import ProjectList from './ProjectList';

export async function generateMetadata() {
  const { data: projectsIndex } = await sanityFetch({
    query: fetchProjectsIndexQuery,
  });

  return generateSeoMetadata({
    slug: 'projects',
    page: projectsIndex,
  });
}

export default async function Page() {
  const { data }: { data: FetchProjectsIndexQueryResult } = await sanityFetch({
    query: fetchProjectsIndexQuery,
  });

  if (!data) {
    return (
      <div className='py-40 text-center text-3xl text-gray-500'>404 –</div>
    );
  }
  if (!data.projects?.length) {
    return console.log('No projects found');
  }
  const projects = data.projects;

  const projectsIndexAttr = data._id
    ? dataAttr({ id: data._id, type: 'projectsIndex', path: 'projects' }).toString()
    : undefined;

  return (
    <div
      className='grid grid-cols-1 gap-4 pt-[100px] pb-12 lg:gap-0 lg:pb-0 lg:pt-[70px]'
      data-sanity={projectsIndexAttr}
    >
      {projects.map((project, indx) => (
        <ProjectList key={project._id} project={project} index={indx} />
      ))}
    </div>
  );
}
