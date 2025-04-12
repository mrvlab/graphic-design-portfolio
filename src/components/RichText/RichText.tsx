import { PortableText } from 'next-sanity';
import React from 'react';

type IRichText = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: 'span';
    _key: string;
  }>;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  listItem?: 'bullet' | 'number';
  markDefs?: Array<{
    href?: string;
    _type: 'link';
    _key: string;
  }>;
  level?: number;
  _type: 'block';
  _key: string;
}>;

const RichText = ({ content }: { content: IRichText }) => {
  if (!content) return null;
  return (
    <div className='leading-[115%] flex flex-col gap-[6px]'>
      <PortableText value={content} />
    </div>
  );
};

export default RichText;
