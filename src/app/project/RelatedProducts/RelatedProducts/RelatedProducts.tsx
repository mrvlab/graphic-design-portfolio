import React from 'react';
import Carousel from '../Carousel/Carousel';
import { SingleProjectQueryResult } from '../../../../../sanity.types';
import Link from 'next/link';
import RelatedProductsContent from './RelatedProductsContent';

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
        <h3 className='text-center pt-32 font-bold'>( Other cases )</h3>
        <Carousel relatedProducts={relatedProducts} />
      </section>

      <section className='hidden lg:flex lg:flex-col lg:justify-center lg:gap-8 lg:h-screen'>
        <h3 className='lg:w-full lg:text-center'>( Other cases )</h3>
        <div className='lg:grid lg:grid-cols-24'>
          {relatedProducts.projects?.map((project, index) => {
            const colStartClasses = {
              0: 'lg:col-start-6',
              1: 'lg:col-start-10',
              2: 'lg:col-start-14',
              3: 'lg:col-start-18',
            };
            const commonClasses = `lg:col-span-2 relative ${colStartClasses[index as keyof typeof colStartClasses]}`;

            return project.slug && !project.comingSoon ? (
              <Link
                href={`/project/${project.slug}`}
                key={project._id}
                className={commonClasses}
              >
                <RelatedProductsContent project={project} index={index} />
              </Link>
            ) : (
              <div key={project._id} className={commonClasses}>
                <RelatedProductsContent project={project} index={index} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RelatedProducts;
