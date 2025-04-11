'use client';
import React from 'react';
import SayHiSvgMobile from './SayHiSvgMobile';
import SayHiSvgDesktop from './SayHiSvgDesktop';
import { PortableText } from 'next-sanity';
import { FetchContactQueryResult } from '../../../sanity.types';

const ContactContent = ({ contact }: { contact: FetchContactQueryResult }) => {
  return (
    <>
      <div className='flex justify-center items-center w-full leading-[125%] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
        {contact?.richText && <PortableText value={contact.richText} />}
      </div>
      <SayHiSvgDesktop />
      <SayHiSvgMobile />
    </>
  );
};

export default ContactContent;
