'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import CreativeServicesMobile from './CreativeServicesMobile';
import CreativeServicesDesktop from './CreativeServicesDesktop';

const CreativeServices = () => {
  const pathname = usePathname();

  if (pathname !== '/') {
    return null;
  }

  return (
    <>
      <div className=' lg:hidden'>
        <CreativeServicesMobile />
      </div>

      <div className='hidden lg:flex '>
        <CreativeServicesDesktop />
      </div>
    </>
  );
};

export default CreativeServices;
