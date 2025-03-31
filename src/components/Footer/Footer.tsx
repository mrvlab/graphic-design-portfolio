import { getCurrentYear } from '@/utils/getCurrentYear';
import React from 'react';
import CityClock from '../CityClock/CityClock';
import { fetchFooterQuery } from '@/sanity/lib/queries';
import { FetchFooterQueryResult } from '../../../sanity.types';
import { sanityFetch } from '@/sanity/lib/live';
import { PortableText } from 'next-sanity';
import CreativeServicesMobile from './CreativeServicesMobile';
import CreativeServicesDesktop from './CreativeServicesDesktop';

const Footer = async () => {
  const { data: footer }: { data: FetchFooterQueryResult } = await sanityFetch({
    query: fetchFooterQuery,
  });

  return (
    <footer className='flex flex-col items-center pt-[21px] pb-[18px] lg:flex-row lg:px-2 lg:pt-[25px] lg:pb-3 lg:justify-between backdrop-blur-md relative'>
      <div className='hidden lg:flex lg:pt-3 lg:pb-1'>
        {footer?.lefttext && <PortableText value={footer?.lefttext} />}
      </div>
      <div className='lg:order-last'>
        <CityClock location={footer?.location} />
      </div>
      <div className='lg:flex lg:gap-[3px]'>
        &copy; {getCurrentYear()}
        <span className='hidden lg:flex lg:justify-center'>{footer?.name}</span>
        {footer?.rights}
      </div>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='absolute top-4 lg:hidden'>
          <CreativeServicesMobile />
        </div>

        <div className='hidden lg:flex'>
          <CreativeServicesDesktop />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
