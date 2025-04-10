import React from 'react';
import Carousel from './Carousel';
import { SingleProjectQueryResult } from '../../../sanity.types';

const RelatedProducts = ({
  project,
}: {
  project: SingleProjectQueryResult;
}) => {
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className='bg-white z-10'>
      <section className='flex flex-col gap-6 lg:hidden'>
        <h3 className='text-center pt-32 font-bold'>( Related Products )</h3>
        <Carousel slides={SLIDES} />
      </section>

      <section className='hidden lg:aspect-16/9 lg:flex lg:flex-col lg:justify-center lg:gap-8 '>
        <h3 className='lg:w-full lg:text-center lg:font-bold'>
          ( Related Products )
        </h3>
        <div className='lg:grid lg:grid-cols-24'>
          <div className='lg:aspect-4/5 lg:col-start-6 lg:col-span-2 lg:bg-orange-200'></div>
          <div className='lg:aspect-4/5 lg:col-start-10 lg:col-span-2 lg:bg-amber-400'></div>
          <div className='lg:aspect-4/5 lg:col-start-14 lg:col-span-2 lg:bg-amber-600'></div>
          <div className='lg:aspect-4/5 lg:col-start-18 lg:col-span-2 lg:bg-amber-800'></div>
        </div>
      </section>
    </div>
  );
};

export default RelatedProducts;
