import { PortableText } from 'next-sanity';
import ITextLayoutDesktop from '../types/ITextLayoutDesktop';
import HoverableTitle from '@/components/HoverableTitle';

const TextLayoutDesktop = ({
  index,
  project,
  setIsHovered,
  isHovered,
}: ITextLayoutDesktop) => {
  return (
    <>
      <span className='hidden lg:block lg:row-start-1 lg:col-start-1 lg:col-end-2'>
        {(index + 1).toFixed(1)}
      </span>

      <HoverableTitle
        name={project.title}
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      <span
        className='hidden lg:block lg:col-start-3 lg:col-end-auto lg:row-start-1 z-30'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {project.richText && <PortableText value={project.richText} />}
        {project.comingSoon && <span>( Coming Soon )</span>}
      </span>
      <span className='hidden lg:block lg:row-start-1 lg:absolute lg:right-2 z-0'>
        {project.year ? new Date(project.year).getFullYear() : ''}
      </span>
    </>
  );
};

export default TextLayoutDesktop;
