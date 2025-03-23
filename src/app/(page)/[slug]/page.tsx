// app/[slug]/page.tsx

import { PortableText } from '@portabletext/react';
import { sanityFetch } from '@/sanity/lib/live';
import { getPageQuery } from '@/sanity/lib/queries';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { slug: params.slug },
    stega: false,
  });

  return {
    title: page?.name ?? 'Untitled Page',
    description: page?.subheading,
  };
}

export default async function Page({ params }: Props) {
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { slug: params.slug },
  });

  if (!page?._id) {
    return (
      <div className='py-40 text-center text-3xl text-gray-500'>
        404 – Page Not Found
      </div>
    );
  }

  return (
    <div className='container max-w-4xl mx-auto my-20 px-4'>
      <div className='border-b pb-8 mb-12'>
        <h1 className='text-5xl font-bold text-gray-900'>
          {page.title || page.name}
        </h1>
        {page.subheading && (
          <p className='mt-4 text-xl text-gray-600'>{page.subheading}</p>
        )}
      </div>

      <div className='prose prose-lg prose-gray max-w-none'>
        <PortableText value={page.richText} />
      </div>
    </div>
  );
}
