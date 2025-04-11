import React from 'react';
import Carousel from './Carousel';
import { SingleProjectQueryResult } from '../../../sanity.types';
import NextImage from '@/components/Media/NextImage';
import MuxVideo from '@/components/Media/MuxVideo';
import Link from 'next/link';

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

      <section className='hidden lg:aspect-16/9 lg:flex lg:flex-col lg:justify-center lg:gap-8'>
        <h3 className='lg:w-full lg:text-center lg:font-bold'>
          ( Related Products )
        </h3>
        <div className='lg:grid lg:grid-cols-24'>
          {relatedProducts.projects?.map((project, index) => {
            const colStartClasses = {
              0: 'lg:col-start-6',
              1: 'lg:col-start-10',
              2: 'lg:col-start-14',
              3: 'lg:col-start-18',
            };
            return (
              <Link
                href={project.slug ? `/project/${project.slug}` : '/home'}
                key={project._id}
                className={`lg:aspect-4/5 lg:col-span-2 ${colStartClasses[index as keyof typeof colStartClasses]}`}
              >
                {project.mediaGallery?.mediaItems?.[0].asset?.url ? (
                  <NextImage
                    refId={project.mediaGallery.mediaItems[0].asset._id}
                    alt={project.mediaGallery.mediaItems[0].alt || ''}
                    className='w-full h-full object-cover'
                    width={1920}
                    height={1280}
                  />
                ) : (
                  project.mediaGallery?.mediaItems?.[0].asset?.playbackId && (
                    <MuxVideo
                      playbackId={
                        project.mediaGallery?.mediaItems?.[0].asset?.playbackId
                      }
                      className='w-full h-full object-cover'
                    />
                  )
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RelatedProducts;
