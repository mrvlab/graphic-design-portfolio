'use client';
import React from 'react';
import SayHiSvgFilledDesktop from './SayHiSvgDesktop/SayHiSvgFilledDesktop';
import { FetchContactQueryResult } from '../../../sanity.types';
import RichText from '@/components/RichText/RichText';
import SayHiSvgOutlinedDesktop from './SayHiSvgDesktop/SayHiSvgOutlinedDesktop';
import SayHiSvgOutlinedMobile from './SayHiSvgMobile/SayHiSvgOutlinedMobile';
import SayHiSvgFilledMobile from './SayHiSvgMobile/SayHiSvgFilledMobile';

const ContactContent = ({ contact }: { contact: FetchContactQueryResult }) => {
  if (!contact) return null;
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex'>
          <SayHiSvgFilledDesktop />
          <SayHiSvgOutlinedDesktop />
        </div>
        <div className='flex'>
          <SayHiSvgOutlinedMobile />
          <SayHiSvgFilledMobile />
        </div>
      </div>
      <div className='leading-[125%] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full hover-underline-links pointer-events-auto'>
        {contact.richText && <RichText content={contact.richText} />}
      </div>
    </>
  );
};

export default ContactContent;
