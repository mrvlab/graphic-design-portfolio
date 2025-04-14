import { sanityFetch } from '@/sanity/lib/live';
import { fetchAboutQuery } from '@/sanity/lib/queries';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import { FetchAboutQueryResult } from '../../../sanity.types';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

export async function generateMetadata() {
  const { data: page } = await sanityFetch({
    query: fetchAboutQuery,
  });

  return generateSeoMetadata({
    slug: 'about',
    page: page,
  });
}

const page = async () => {
  const { data: about }: { data: FetchAboutQueryResult } = await sanityFetch({
    query: fetchAboutQuery,
  });

  if (!about) {
    return (
      <div className='py-40 text-center text-3xl text-gray-500'>
        No About Page not found
      </div>
    );
  }

  return (
    <div className='flex flex-col pt-[100px] px-2 pb-[100px] lg:gap-0 lg:pb-0 lg:pt-[68px] lg:h-full'>
      <MobileLayout about={about} />
      <DesktopLayout about={about} />
    </div>
  );
};

export default page;
