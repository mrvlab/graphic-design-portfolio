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
      <div className='h-fit w-[40%] mb-[36%] group'>
        <div className='flex flex-col justify-center items-center aspect-4/5 relative p-[0.5px] flex-1 overflow-hidden'>
          <div className='relative w-full h-full'>
            {portrait?.asset?._ref && (
              <NextImage
                refId={portrait.asset._ref}
                className='object-cover'
                alt='Portrait photograph'
                priority={true}
                loading='eager'
                fill
              />
            )}
            <div className='absolute inset-0 backdrop-blur-[2.82px] transition-all duration-700 group-hover:backdrop-blur-[0px] pointer-events-none'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPortraitOnHover;
