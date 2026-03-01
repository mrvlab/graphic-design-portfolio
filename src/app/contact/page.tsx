import { sanityFetch } from '@/sanity/lib/live';
import { fetchContactQuery, fetchHomePageQuery } from '@/sanity/lib/queries';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import React from 'react';
import {
  FetchContactQueryResult,
  FetchHomePageQueryResult,
} from '../../../sanity.types';
import ContactContent from './ContactContent';
import { ContactHomeGrid } from './ContactHomeGrid';
import { dataAttr } from '@/sanity/lib/utils';

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
  const contactAttr = contact._id
    ? dataAttr({ id: contact._id, type: 'contactPage', path: 'richText' }).toString()
    : undefined;

  return (
    <>
      <ContactHomeGrid projects={projects} />

      {/* Blur overlay */}
      <div className="fixed inset-0 top-[var(--nav-total-mobile)] z-50 bg-white/75 backdrop-blur-[20px] supports-[backdrop-filter]:bg-white/20 lg:top-0 pointer-events-none" />

      {/* Contact content */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center z-100 pointer-events-none"
        data-sanity={contactAttr}
      >
        <ContactContent contact={contact} />
      </div>
    </>
  );
};

export default page;
