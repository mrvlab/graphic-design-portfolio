import ITextLayoutDesktop from '../types/ITextLayoutDesktop';
import HoverableTitle from '@/components/HoverableTitle';
import RichText from '@/components/RichText/RichText';

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
        comingSoon={project.comingSoon}
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      <span
        className='hidden lg:block lg:col-start-3 lg:col-end-auto lg:row-start-1 z-30'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {project.richText && <RichText content={project.richText} />}
      </span>
      <span
        className={`hidden lg:block lg:row-start-1 lg:absolute lg:right-2 z-0 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {project.year ? new Date(project.year).getFullYear() : ''}
      </span>
    </>
  );
};

export default TextLayoutDesktop;
