import { sanityFetch } from '@/sanity/lib/live';
import { fetchContactQuery } from '@/sanity/lib/queries';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import React from 'react';

export async function generateMetadata() {
  const { data: page } = await sanityFetch({
    query: fetchContactQuery,
  });

  return generateSeoMetadata({
    slug: 'contact',
    page: page,
  });
}

const page = () => {
  return <div>Contact</div>;
};

export default page;
