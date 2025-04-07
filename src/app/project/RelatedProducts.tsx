import React from 'react';
import Carousel from './Carousel';

const RelatedProducts = () => {
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div>
      <section className='flex flex-col gap-6 lg:hidden'>
        <h3 className='text-center pt-32 font-bold'>( Related Products )</h3>
        <Carousel slides={SLIDES} />
      </section>

      <section className='hidden lg:flex lg:flex-col lg:justify-center gap-8 min-h-dvh'>
        <h3 className='w-full text-center font-bold'>( Related Products )</h3>
        <div className='grid grid-cols-24'>
          <div className='aspect-4/5 col-start-6 col-span-2 bg-orange-200'></div>
          <div className='aspect-4/5 col-start-10 col-span-2 bg-amber-400'></div>
          <div className='aspect-4/5 col-start-14 col-span-2 bg-amber-600'></div>
          <div className='aspect-4/5 col-start-18 col-span-2 bg-amber-800'></div>
        </div>
      </section>
    </div>
  );
};

export default RelatedProducts;
