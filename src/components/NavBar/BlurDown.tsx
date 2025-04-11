import React from 'react';

const BlurDown = () => {
  return (
    <div className='absolute top-0 left-0 right-0 w-full z-[5] pointer-events-none transition-[transform,height] duration-[1000ms] ease-[cubic-bezier(0.55,0,0.1,1)] transform translate-y-[-36%] origin-top-left h-[280%]'>
      <div className='absolute inset-0 z-[2] backdrop-blur-[1px] blur-mask-layer-down-1' />
      <div className='absolute inset-0 z-[3] backdrop-blur-[2px] blur-mask-layer-down-2' />
      <div className='absolute inset-0 z-[4] backdrop-blur-[4px] blur-mask-layer-down-3' />
      <div className='absolute inset-0 z-[5] blur-mask-layer-down-4' />
    </div>
  );
};

export default BlurDown;
