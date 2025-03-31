import { sanityFetch } from '@/sanity/lib/live';
import { fetchAboutQuery } from '@/sanity/lib/queries';
import { generateSeoMetadata } from '@/utils/generateMetadata';

export async function generateMetadata() {
  const { data: page } = await sanityFetch({
    query: fetchAboutQuery,
  });

  return generateSeoMetadata({
    slug: 'about',
    page: page,
  });
}

const page = () => {
  return <div>About</div>;
};

export default page;
