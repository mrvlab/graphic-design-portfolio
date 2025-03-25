// app/project/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { projectsQuery, singleProjectQuery } from '@/sanity/lib/queries';
import { PortableText, QueryParams } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';
import { SingleProjectQueryResult } from '../../../../sanity.types';

export async function generateStaticParams() {
  const projects = await client.fetch(projectsQuery);

  return projects.map((project) => ({
    slug: project?.slug,
  }));
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

  return (
    <div className='container max-w-4xl mx-auto my-20 px-4'>
      <div className='border-b pb-8 mb-12'>
        <h1 className='text-5xl font-bold text-gray-900'>
          {project.title} {project.year}
        </h1>
      </div>
      {project.comingSoon && (
        <p className='mt-4 text-xl text-gray-600'>
          isComingSoon: {project.comingSoon ? 'Yes' : 'No'}
        </p>
      )}

      <div className='prose prose-lg prose-gray max-w-none'>
        {project.richText && <PortableText value={project.richText} />}
      </div>
    </div>
  );
}
