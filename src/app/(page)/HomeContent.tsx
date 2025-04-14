'use client';

import { useState } from 'react';
import ComingSoonText from '@/components/ComingSoonText/ComingSoonText';
import Link from 'next/link';

export function HomeContent({ enterSiteText }: { enterSiteText: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='relative flex flex-col justify-center flex-1'>
      <div
        id='logo'
        className='absolute w-full h-full flex items-center justify-center z-0 lg:px-[6%]'
      >
        <ComingSoonText
          className={`transition-opacity duration-700 ease-in-out ${
            isHovered ? 'opacity-50' : 'opacity-100'
          }`}
        />
      </div>
      <div
        className='flex flex-col justify-center items-center z-10'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href='/home'>{enterSiteText}</Link>
      </div>
    </div>
  );
}
