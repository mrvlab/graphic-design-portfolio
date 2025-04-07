// app/project/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { projectsQuery, singleProjectQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import { SingleProjectQueryResult } from '../../../../sanity.types';
import { HeightCalculator } from '@/components/HeightCalculator';
import { QueryParams } from 'next-sanity';

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

  return (
    <div className='flex flex-col h-full relative'>
      <HeightCalculator />
      <div className='flex flex-col relative'>
        <section className='flex flex-col justify-center items-center sticky top-0 min-h-[100dvh] flex-1 bg-transparent z-10'>
          First section
        </section>
        <section
          id='first-media-section'
          className='flex flex-col justify-center items-start relative h-fit flex-1 bg-transparent lg:grid lg:grid-cols-24 z-20'
        >
          <div className='col-start-2 col-span-6 aspect-3/4 bg-amber-200 mt-[120px]'>
            <div>First media 1</div>
          </div>
        </section>
        <section
          id='second-media-section'
          className='flex flex-col relative min-h-[100dvh] items-start flex-1 bg-transparent lg:grid lg:grid-cols-24 z-20'
        >
          <div className='col-start-15 col-span-9 aspect-3/4 bg-amber-400 -translate-y-[10%]'>
            Second media 2
          </div>
        </section>
        <section
          id='third-media-section'
          className='flex flex-col justify-center items-center sticky top-0 min-h-[100dvh] flex-1 bg-transparent p-6 z-20'
        >
          <div className='w-1/2 aspect-16/9 bg-amber-600 '>Third media 3</div>
        </section>
        <section
          id='first-bg-media-section'
          className='flex flex-col absolute top-0 left-0 right-0 flex-1 min-h-[100dvh] h-[calc(200dvh+var(--first-media-section-height))] bg-red-400 z-0'
        >
          Background image
        </section>

        <section
          id='second-bg-media-section'
          className='flex flex-col justify-center items-center sticky top-0 min-h-[100dvh] flex-1 bg-blue-400 z-20'
        >
          Second background image
        </section>
        <section
          id='fourth-media-section'
          className='flex flex-col justify-center items-center sticky h-[100dvh] top-0 min-lg:aspect-[5/4] lg:h-fit flex-1 bg-transparent lg:grid lg:grid-cols-24 z-20'
        >
          <div className='col-start-9 col-span-8 aspect-4/5 bg-amber-200'>
            <div>Fourth media 4</div>
          </div>
        </section>
      </div>

      <div className='flex flex-col relative bg-green-600 h-fit'>
        <div className='flex flex-col relative'>
          <section
            id='third-bg-media-section'
            className='flex flex-col justify-center items-center sticky h-[100dvh] top-0 min-lg:aspect-[5/4] lg:h-fit flex-1 lg:grid lg:grid-cols-24 z-20'
          >
            <div className='col-start-3 col-span-5 h-full relative'>
              <div className='flex flex-col sticky top-20 mt-[25%] mb-[40%]'>
                Bröd text
              </div>
            </div>
            <div className='col-start-14 col-span-9 h-fit relative'>
              <div className='flex flex-col w-full aspect-4/5 mt-[15%] bg-amber-200'>
                Fourth media 4
              </div>
            </div>
          </section>
        </div>

        <div className='relative bg-green-600'>
          <section className='min-h-screen sticky top-0 z-10 flex items-center justify-center lg:grid lg:grid-cols-24'>
            <div className='col-start-2 col-span-5 z-10'>
              <div className='w-full aspect-4/5 bg-amber-200 bg-opacity-80 backdrop-blur'>
                Fifth media 5
              </div>
            </div>
          </section>

          <section className='min-h-screen sticky top-0 z-20 flex items-center justify-center lg:grid lg:grid-cols-24'>
            <div className='col-start-10 col-span-5 z-20'>
              <div className='w-full aspect-4/5 bg-amber-400 bg-opacity-80 backdrop-blur'>
                Sixth media 6
              </div>
            </div>
          </section>

          <section className='min-h-screen sticky top-0 z-30 flex items-center justify-center lg:grid lg:grid-cols-24'>
            <div className='col-start-19 col-span-5 z-30'>
              <div className='w-full aspect-4/5 bg-amber-600 bg-opacity-80 backdrop-blur'>
                Seventh media 7
              </div>
            </div>
          </section>

          <div className='flex flex-col items-center justify-center py-[90px]'>
            <p>Designed during the pandemic</p>
            <p>All rights reserved to former employer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
