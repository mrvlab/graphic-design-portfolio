import { sanityFetch } from '@/sanity/lib/live';
import { fetchContactQuery, fetchHomePageQuery } from '@/sanity/lib/queries';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import React from 'react';
import {
  FetchContactQueryResult,
  FetchHomePageQueryResult,
} from '../../../sanity.types';
import { DesktopHomeGrid } from './ContactHomeGrid/DesktopHomeGrid';
import { MobileHomeGrid } from './ContactHomeGrid/MobileHomeGrid';
import ContactContent from './ContactContent';

export async function generateMetadata() {
  const { data: page } = await sanityFetch({
    query: fetchContactQuery,
  });

  return generateSeoMetadata({
    slug: 'contact',
    page: page,
  });
}

const page = async () => {
  const { data: contact }: { data: FetchContactQueryResult } =
    await sanityFetch({
      query: fetchContactQuery,
    });

  const { data: homeData }: { data: FetchHomePageQueryResult } =
    await sanityFetch({
      query: fetchHomePageQuery,
    });

  const projects = homeData?.projects?.slice(0, 12) || [];

  if (!contact) {
    return (
      <div className="py-40 text-center text-3xl text-gray-500">
        {' '}
        404 – Contact Not Found –
      </div>
    );
  }
  return (
    <>
      {/* <ContactContent contact={contact} /> */}

      {/* Desktop grid */}
      <div className="hidden lg:block lg:my-auto lg:w-full lg:h-full">
        <DesktopHomeGrid projects={projects} />
      </div>

      {/* Mobile grid */}
      <div className="block lg:hidden overflow-hidden">
        <MobileHomeGrid projects={projects} />
      </div>

      {/* Blur overlay */}
      <div className="fixed inset-0 top-[var(--mobile-nav-combined-height)] z-50 bg-white/75 backdrop-blur-[20px] supports-[backdrop-filter]:bg-white/20 lg:top-0 pointer-events-none" />
      {/* Contact content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-100">
        <ContactContent contact={contact} />
      </div>
    </>
  );
};

export default page;
