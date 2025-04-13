import React from 'react';
import { SingleProjectQueryResult } from '../../../../../sanity.types';
import ProductInfo from '../ProductInfo';
import NextImage from '@/components/Media/NextImage';
import MuxVideo from '@/components/Media/MuxVideo';

type RelatedSection = Extract<
  NonNullable<NonNullable<SingleProjectQueryResult>['sectionList']>[number],
  { _type: 'relatedProjects' }
>;

type RelatedProductsContentProps = {
  project: NonNullable<RelatedSection['projects']>[number];
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
};

const RelatedProductsContent: React.FC<RelatedProductsContentProps> = ({
  project,
  index,
  isHovered,
  isAnyHovered,
}) => {
  const opacityClass = isHovered
    ? 'opacity-100'
    : isAnyHovered
      ? 'opacity-20'
      : 'opacity-100';

  return (
    <>
      <div
        className={`aspect-4/5 relative transition-opacity duration-300 ease-in-out ${opacityClass}`}
      >
        {project.mediaGallery?.mediaItems?.[0].asset?.url ? (
          <NextImage
            refId={project.mediaGallery.mediaItems[0].asset._id}
            alt={project.mediaGallery.mediaItems[0].alt || ''}
            className='object-cover'
            fill
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
      </div>
      <ProductInfo
        index={index}
        project={project}
        isComingSoon={project.comingSoon || false}
      />
    </>
  );
};

export default RelatedProductsContent;
