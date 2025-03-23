import { PortableText, QueryParams } from 'next-sanity';
import { PAGE_QUERY, getPageQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { sanityFetch } from '@/sanity/lib/live';

export async function generateStaticParams() {
  const posts = await client.fetch(getPageQuery);

  return posts.map((page) => ({
    slug: page?.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  });

  if (!page) {
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
        {page.richText && <PortableText value={page.richText} />}
      </div>
    </div>
  );
}
