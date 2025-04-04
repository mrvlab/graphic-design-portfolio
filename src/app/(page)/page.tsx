import ComingSoonText from '@/components/ComingSoonText/ComingSoonText';
import Link from 'next/link';
import { SettingsQueryResult } from '../../../sanity.types';
import { fetchHomePageQuery, settingsQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { generateSeoMetadata } from '@/utils/generateMetadata';

export async function generateMetadata() {
  const { data: page } = await sanityFetch({
    query: fetchHomePageQuery,
  });

  return generateSeoMetadata({
    slug: '',
    page: page,
  });
}

export default async function page() {
  const { data: settings }: { data: SettingsQueryResult } = await sanityFetch({
    query: settingsQuery,
  });
  const enterSiteText = settings?.enterSiteText;
  return (
    <>
      <div className='relative flex flex-col justify-center flex-1'>
        <div
          id='logo'
          className='absolute w-full h-full flex items-center justify-center z-0 lg:px-[6%]'
        >
          <ComingSoonText />
        </div>
        <div className='flex flex-col justify-center items-center z-10'>
          <Link href='/home'>{enterSiteText || '( Coming Soon )'}</Link>
        </div>
      </div>
    </>
  );
}
