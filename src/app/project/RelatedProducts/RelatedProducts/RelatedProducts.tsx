'use client';

import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import { SingleProjectQueryResult } from '../../../../../sanity.types';
import Link from 'next/link';
import RelatedProductsContent from './RelatedProductsContent';
import { dataAttr } from '@/sanity/lib/utils';

const RelatedProducts = ({
  project,
}: {
  project: SingleProjectQueryResult;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const relatedProducts = project?.sectionList?.find(
    (section) => section._type === 'relatedProjects'
  );
  if (!relatedProducts) return null;

  return (
    <div className='bg-white z-10'>
      <section className='flex flex-col justify-center items-center gap-6 h-svh sticky top-0 lg:hidden'>
        <h3 className='text-center font-bold'>( Other cases )</h3>
        <Carousel relatedProducts={relatedProducts} />
      </section>

      <section className='hidden lg:flex lg:flex-col lg:justify-center lg:gap-8 lg:h-screen'>
        <h3 className='lg:w-full lg:text-center'>( Other cases )</h3>
        <div className='lg:grid lg:grid-cols-24 lg:gap-x-4'>
          {relatedProducts.projects?.map((project, index) => {
            const colStartClasses = {
              0: 'lg:col-start-6',
              1: 'lg:col-start-10',
              2: 'lg:col-start-14',
              3: 'lg:col-start-18',
            };
            const commonClasses = `lg:grid lg:grid-cols-2 lg:gap-x-4 lg:col-span-4 relative ${colStartClasses[index as keyof typeof colStartClasses]}`;
            const sanityAttr = dataAttr({
              id: project._id,
              type: 'projects',
              path: 'title',
            }).toString();

            return project.slug && !project.comingSoon ? (
              <Link
                href={`/project/${project.slug}`}
                key={project._id}
                className={`${commonClasses} group`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-sanity={sanityAttr}
              >
                <RelatedProductsContent
                  project={project}
                  index={index}
                  isHovered={hoveredIndex === index}
                  isAnyHovered={hoveredIndex !== null}
                />
              </Link>
            ) : (
              <div
                key={project._id}
                className={`${commonClasses} group`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-sanity={sanityAttr}
              >
                <RelatedProductsContent
                  project={project}
                  index={index}
                  isHovered={hoveredIndex === index}
                  isAnyHovered={hoveredIndex !== null}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RelatedProducts;
