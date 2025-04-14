import { sanityFetch } from '@/sanity/lib/live';
import { fetchContactQuery } from '@/sanity/lib/queries';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import React from 'react';
import { FetchContactQueryResult } from '../../../sanity.types';
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

  if (!contact) {
    return (
      <div className='py-40 text-center text-3xl text-gray-500'>
        {' '}
        404 – Contact Not Found –
      </div>
    );
  }
  return (
    <div className='flex flex-col justify-center items-center h-full relative'>
      <div className='group relative w-full'>
        <ContactContent contact={contact} />
      </div>
    </div>
  );
};

export default page;
