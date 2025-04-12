import { client } from '@/sanity/lib/client';
import { projectsQuery, singleProjectQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import { SingleProjectQueryResult } from '../../../../sanity.types';
import { QueryParams } from 'next-sanity';
import RelatedProducts from '../RelatedProducts';
import FirstLayout from '../ProjectLayouts/FirstLayout/FirstLayout';
import SecondLayout from '../ProjectLayouts/SecondLayout/SecondLayout';
import ThirdLayout from '../ProjectLayouts/ThirdLayout/ThirdLayout';
import CustomCursor from '../CustomCursor/CustomCursor';

export async function generateStaticParams() {
  const projects = await client.fetch(projectsQuery);

  return projects.map((project) => ({
    slug: project?.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { data: project } = await sanityFetch({
    query: singleProjectQuery,
    params: await params,
  });

  return generateSeoMetadata({
    slug: `project/${(await params).slug}`,
    page: project,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { data: project }: { data: SingleProjectQueryResult } =
    await sanityFetch({
      query: singleProjectQuery,
      params: await params,
    });

  if (!project) {
    return (
      <div className='py-40 text-center text-3xl text-gray-500'>
        404 – Project not found
      </div>
    );
  }
  const layout = project.layout;

  return (
    <div
      className='flex flex-col h-full relative cursor-none'
      id='project-page'
    >
      <CustomCursor />
      {(() => {
        switch (layout) {
          case 'firstLayout':
            return <FirstLayout project={project} />;
          case 'secondLayout':
            return <SecondLayout project={project} />;
          case 'thirdLayout':
            return <ThirdLayout project={project} />;
          default:
            return <FirstLayout project={project} />;
        }
      })()}

      <RelatedProducts project={project} />
    </div>
  );
}
