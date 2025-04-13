import React from 'react';

interface IHoverableTitle {
  name: string | null;
  comingSoon?: boolean | null;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const HoverableTitle = ({
  name,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  comingSoon,
}: IHoverableTitle) => {
  return (
    <div
      className='flex flex-col'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h2 className='hidden lg:flex lg:gap-1 lg:row-start-1 lg:col-start-2 lg:col-end-2'>
        <span
          className={`transition-opacity duration-300 ${isHovered !== undefined ? (isHovered ? 'opacity-100' : 'opacity-0') : 'hover:opacity-100'}`}
        >
          (
        </span>
        {name}

        <span
          className={`transition-opacity duration-300 ${isHovered !== undefined ? (isHovered ? 'opacity-100' : 'opacity-0') : 'hover:opacity-100'}`}
        >
          )
        </span>
      </h2>
      <span
        className={`transition-opacity duration-300 ${comingSoon && isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        ( Coming Soon )
      </span>
    </div>
  );
};

export default HoverableTitle;
