import React from 'react';

const Blur = () => {
  return (
    <div className='absolute top-0 left-0 w-full z-[5] pointer-events-none transition-[transform,height] duration-[1000ms] ease-[cubic-bezier(0.55,0,0.1,1)] transform translate-y-[-30%] origin-top-left h-[280%]'>
      <div className='absolute inset-0 z-[2] backdrop-blur-[1px] blur-mask-layer-1' />
      <div className='absolute inset-0 z-[3] backdrop-blur-[2px] blur-mask-layer-2' />
      <div className='absolute inset-0 z-[4] backdrop-blur-[4px] blur-mask-layer-3' />
      <div className='absolute inset-0 z-[5] blur-mask-layer-4' />
    </div>
  );
};

export default Blur;
