'use client';

import Link from 'next/link';
import AnimatedText from '@/components/AnimatedText/AnimatedText';

export function HomeContent({ enterSiteText }: { enterSiteText: string }) {
  return (
    <div className='relative flex flex-col justify-center flex-1 min-h-[50vh]'>
      <div
        id='logo'
        className='absolute w-full h-full flex items-center justify-center z-0'
      >
        <AnimatedText />
      </div>
      <div className='flex flex-col justify-center items-center z-10'>
        <Link href='/home'>{enterSiteText}</Link>
      </div>
    </div>
  );
}
