import CityClock from '@/components/CityClock/CityClock';
import ComingSoonText from '@/components/ComingSoonText/ComingSoonText';
import { sanityFetch } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import { getCurrentYear } from '@/utils/getCurrentYear';

export default async function Home() {
  const { data: settings } = await sanityFetch({ query: settingsQuery });

  return (
    <div className='flex flex-col py-4 h-dvh'>
      <main className='relative flex flex-col flex-1'>
        <div
          id='logo'
          className='absolute w-full h-full flex items-center justify-center z-0 lg:px-[6%]'
        >
          <ComingSoonText />
        </div>
        <div className='flex flex-col flex-1 justify-center items-center z-10'>
          {settings?.enterSiteText}
        </div>
      </main>
      <footer className='flex flex-col items-center'>
        <div>
          <CityClock />
        </div>
        <span>&copy; {getCurrentYear()} All rights reserved</span>
      </footer>
    </div>
  );
}
