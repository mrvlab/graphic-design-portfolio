import NextImage from '@/components/Media/NextImage';
import React from 'react';
import { FetchAboutQueryResult } from '../../../sanity.types';

const ViewPortraitOnHover = ({
  portrait,
}: {
  portrait: NonNullable<FetchAboutQueryResult>['portrait'];
}) => {
  return (
    <div className='flex justify-center items-center p-2.5 aspect-2/3'>
      <div className='h-fit w-1/2 group'>
        {portrait?.asset?._ref && (
          <NextImage
            refId={portrait.asset._ref}
            priority={true}
            className='aspect-3/4 p-1 blur-[3.82px] transition-all duration-700 group-hover:blur-[0px]'
            alt='Portrait photograph'
          />
        )}
      </div>
    </div>
  );
};

export default ViewPortraitOnHover;
