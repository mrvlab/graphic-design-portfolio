import React from 'react';

type IProductInfo = {
  index: number;
  project: {
    title: string | null;
    year: string | null;
  };
  isComingSoon: boolean;
  textClass?: string;
};

const ProductInfo = ({
  index,
  project,
  isComingSoon,
  textClass = '',
}: IProductInfo) => {
  return (
    <div
      className={`flex flex-col text-center pt-3 transition-opacity duration-300 ease-in ${textClass} lg:pt-0 lg:text-left lg:justify-center lg:opacity-0 lg:group-hover:opacity-100`}
    >
      <span className=''>0.{index + 1}</span>
      <span className=''>{project.title || 'Untitled'}</span>
      <span className=''>
        {!isComingSoon && (
          <>Year: {project.year ? new Date(project.year).getFullYear() : ''}</>
        )}
      </span>
      {isComingSoon && (
        <span className=''>{isComingSoon ? '( Coming Soon )' : ''}</span>
      )}
    </div>
  );
};

export default ProductInfo;
