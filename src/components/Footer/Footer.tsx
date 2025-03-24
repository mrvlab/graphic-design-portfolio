import { getCurrentYear } from '@/utils/getCurrentYear';
import React from 'react';
import CityClock from '../CityClock/CityClock';
import { fetchFooterQuery } from '@/sanity/lib/queries';
import { FetchFooterQueryResult } from '../../../sanity.types';
import { sanityFetch } from '@/sanity/lib/live';
import { PortableText } from 'next-sanity';

const Footer = async () => {
  const { data: footer }: { data: FetchFooterQueryResult } = await sanityFetch({
    query: fetchFooterQuery,
  });

  if (!footer) {
    return console.log('footer not found');
  }
  const { lefttext, location, name, rights } = footer;
  return (
    <footer className='flex flex-col items-center lg:flex-row lg:px-2 lg:justify-between'>
      <div className='hidden lg:flex lg:pt-3 lg:pb-1'>
        {lefttext && <PortableText value={lefttext} />}
      </div>
      <div className='lg:order-last'>
        <CityClock location={location} />
      </div>
      <div className='lg:flex lg:gap-[3px]'>
        &copy; {getCurrentYear()}
        <span className='hidden lg:flex lg:justify-center'>{name}</span>
        {rights}
      </div>
    </footer>
  );
};

export default Footer;
