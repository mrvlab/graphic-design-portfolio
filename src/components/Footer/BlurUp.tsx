import React from 'react';

const BlurUp = () => {
  return (
    <div className='absolute bottom-0 left-0 right-0 w-full z-[5] pointer-events-none transition-[transform,height] duration-[1000ms] ease-[cubic-bezier(0.55,0,0.1,1)] transform translate-y-[30%] lg:translate-y-[36%] origin-bottom h-[180%]'>
      <div className='absolute inset-0 z-[2] backdrop-blur-[1px] blur-mask-layer-up-1' />
      <div className='absolute inset-0 z-[3] backdrop-blur-[2px] blur-mask-layer-up-2' />
      <div className='absolute inset-0 z-[4] backdrop-blur-[4px] blur-mask-layer-up-3' />
      <div className='absolute inset-0 z-[5] blur-mask-layer-up-4' />
    </div>
  );
};

export default BlurUp;
