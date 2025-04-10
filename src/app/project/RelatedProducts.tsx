import React from 'react';
import Carousel from './Carousel';
import { SingleProjectQueryResult } from '../../../sanity.types';
import NextImage from '@/components/Media/NextImage';

const RelatedProducts = ({
  project,
}: {
  project: SingleProjectQueryResult;
}) => {
  const relatedProducts = project?.sectionList?.find(
    (section) => section._type === 'relatedProjects'
  );
  if (!relatedProducts) return null;

  return (
    <div className='bg-white z-10'>
      <section className='flex flex-col gap-6 lg:hidden'>
        <h3 className='text-center pt-32 font-bold'>( Related Products )</h3>
        <Carousel relatedProducts={relatedProducts} />
      </section>

      <section className='hidden lg:aspect-16/9 lg:flex lg:flex-col lg:justify-center lg:gap-8 '>
        <h3 className='lg:w-full lg:text-center lg:font-bold'>
          ( Related Products )
        </h3>
        <div className='lg:grid lg:grid-cols-24'>
          {relatedProducts.projects?.map((project, index) => (
            <div
              key={project._id}
              className={`lg:aspect-4/5 lg:col-span-2 lg:col-start-${6 + index * 4}`}
            >
              <NextImage
                refId={project.mediaGallery?.mediaItems?.[0]?.asset?._id}
                alt={project.mediaGallery?.mediaItems?.[0]?.alt || ''}
                width={1920}
                height={1280}
                priority={true}
                className='object-cover w-full h-full'
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RelatedProducts;
