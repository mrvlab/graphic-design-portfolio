'use client';
import React from 'react';
import { FetchContactQueryResult } from '../../../sanity.types';
import RichText from '@/components/RichText/RichText';

const ContactContent = ({ contact }: { contact: FetchContactQueryResult }) => {
  if (!contact) return null;
  return (
    <>
      <div className="leading-[125%] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full hover-underline-links pointer-events-auto">
        {contact.richText && <RichText content={contact.richText} />}
      </div>
    </>
  );
};

export default ContactContent;
