'use client';

import ComingSoonText from '@/components/ComingSoonText/ComingSoonText';
import Link from 'next/link';
import { SettingsQueryResult } from '../../../sanity.types';

type EnterPageProps = {
  settings: SettingsQueryResult;
};

export default function index({ settings }: EnterPageProps) {
  const enterSiteText = settings?.enterSiteText;
  return (
    <>
      <div className='relative flex flex-col flex-1'>
        <div
          id='logo'
          className='absolute w-full h-full flex items-center justify-center z-0 lg:px-[6%]'
        >
          <ComingSoonText />
        </div>
        <div className='flex flex-col flex-1 justify-center items-center z-10'>
          <Link href='/home'>{enterSiteText || '( Coming Soon )'}</Link>
        </div>
      </div>
    </>
  );
}
