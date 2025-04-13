import { getCurrentYear } from '@/utils/getCurrentYear';
import React from 'react';
import CityClock from '../CityClock/CityClock';
import { fetchFooterQuery } from '@/sanity/lib/queries';
import { FetchFooterQueryResult } from '../../../sanity.types';
import { sanityFetch } from '@/sanity/lib/live';
import CreativeServicesMobile from './CreativeServicesMobile';
import CreativeServicesDesktop from './CreativeServicesDesktop';
import RichText from '../RichText/RichText';
import BlurUp from './BlurUp';
// import BlurUp from './BlurUp';

const Footer = async () => {
  const { data: footer }: { data: FetchFooterQueryResult } = await sanityFetch({
    query: fetchFooterQuery,
  });

  return (
    <footer className='flex flex-col items-center pt-[21px] pb-[18px] lg:flex-row lg:px-2 lg:pt-[25px] lg:pb-3 lg:justify-between relative lg:w-full lg:grid lg:grid-cols-24 lg:items-end lg:sticky lg:bottom-0 overflow-hidden z-50'>
      <div className='hidden lg:flex lg:pt-0 z-10 lg:col-span-4'>
        {footer?.lefttext && <RichText content={footer?.lefttext} />}
      </div>
      <div className='z-10 lg:col-span-12 lg:col-start-21 lg:flex lg:justify-end'>
        <div className='flex gap-1 lg:justify-between lg:max-w-[225px] lg:w-full'>
          <CityClock location={footer?.location} />
        </div>
      </div>
      <div className='lg:flex lg:gap-[3px] z-10 lg:col-start-5 lg:col-span-16 lg:row-start-1 lg:justify-center'>
        &copy; {getCurrentYear()}
        <span className='hidden lg:flex lg:justify-center'>{footer?.name}</span>
        {footer?.rights}
      </div>
      <div className='absolute inset-0 flex items-center justify-center z-10'>
        <div className='absolute top-4 lg:hidden'>
          <CreativeServicesMobile />
        </div>

        <div className='hidden lg:flex'>
          <CreativeServicesDesktop />
        </div>
      </div>
      <BlurUp />
    </footer>
  );
};

export default Footer;
