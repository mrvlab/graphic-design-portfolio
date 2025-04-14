import React from 'react';
import { SingleProjectQueryResult } from '../../../../../sanity.types';
import ProductInfo from '../ProductInfo';
import NextImage from '@/components/Media/NextImage';

type RelatedSection = Extract<
  NonNullable<NonNullable<SingleProjectQueryResult>['sectionList']>[number],
  { _type: 'relatedProjects' }
>;

type ProjectCarouselContentProps = {
  project: NonNullable<RelatedSection['projects']>[number];
  index: number;
  textClass: string;
};

const ProjectCarouselContent: React.FC<ProjectCarouselContentProps> = ({
  project,
  index,
  textClass,
}) => (
  <>
    <div className='embla__slide__number h-full relative'>
      <NextImage
        refId={project.mediaGallery?.mediaItems?.[0]?.asset?._id}
        alt={project.mediaGallery?.mediaItems?.[0]?.alt || ''}
        fill
        className='object-cover'
      />
    </div>
    <ProductInfo
      index={index}
      project={project}
      isComingSoon={project.comingSoon || false}
      textClass={textClass}
    />
  </>
);

export default ProjectCarouselContent;
