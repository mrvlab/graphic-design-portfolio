import React from 'react';

type Props = {
  index: number;
  project: {
    title: string | null;
    year: string | null;
  };
  textClass?: string;
};

const ProductInfo = ({ index, project, textClass = '' }: Props) => {
  return (
    <div
      className={`flex flex-col text-center pt-3 transition-opacity duration-300 ease-in ${textClass}`}
    >
      <span className=''>(0{index + 1})</span>
      <span className=''>{project.title || 'Untitled'}</span>
      <span className=''>Year: {project.year || '2024'}</span>
    </div>
  );
};

export default ProductInfo;
