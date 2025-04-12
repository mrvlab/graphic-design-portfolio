import { sanityFetch } from '@/sanity/lib/live';
import { fetchContactQuery } from '@/sanity/lib/queries';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import React from 'react';
import { FetchContactQueryResult } from '../../../sanity.types';
import SayHiSvgDesktop from './SayHiSvgDesktop';
import SayHiSvgMobile from './SayHiSvgMobile';
import RichText from '@/components/RichText/RichText';

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
      <div className='leading-[125%] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full hover-underline-links'>
        {contact.richText && <RichText content={contact.richText} />}
      </div>
      <SayHiSvgDesktop />
      <SayHiSvgMobile />
    </div>
  );
};

export default page;
