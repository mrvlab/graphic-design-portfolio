import { sanityFetch } from '@/sanity/lib/live';
import { fetchHomePageQuery } from '@/sanity/lib/queries';
import React from 'react';
import { FetchHomePageQueryResult } from '../../../sanity.types';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import { DesktopColorSwapHomeGrid } from './HomeGrid/DesktopColorSwapHomeGrid';
import { MobileHomeGrid } from './HomeGrid/MobileHomeGrid';
import HomeGridCursor from './HomeGrid/HomeGridCursor/indtex';

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
      <div className="py-40 text-center text-3xl text-gray-500">
        404 – Home Not Found
      </div>
    );
  }

  if (!data.projects?.length) {
    return (
      <div className="py-40 text-center text-3xl text-gray-500">
        No Projects Found
      </div>
    );
  }

  // Limit to first 12 projects (preserves CMS order)
  // Note: Using slice() which is non-mutating and maintains original array order
  const projects = data.projects.slice(0, 12);

  return (
    <>
      <HomeGridCursor
        enterSiteText={data?.enterSiteText || '( Click to enter )'}
      />

      <div className="hidden lg:block lg:my-auto">
        <DesktopColorSwapHomeGrid projects={projects} />
      </div>

      {/* Mobile version - simple static grid */}
      <div className="block lg:hidden">
        <MobileHomeGrid projects={projects} />
      </div>
    </>
  );
};

export default page;
