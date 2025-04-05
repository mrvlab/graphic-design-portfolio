import { PortableText } from 'next-sanity';
import ITextLayoutMobile from '../types/ITextLayoutMobile';

const TextLayoutMobile = ({ index, project }: ITextLayoutMobile) => {
  return (
    <div className=' flex gap-1 lg:hidden'>
      <span className='flex-[0.4]'>
        {(index + 1).toString().padStart(2, '0')}
      </span>
      <h2 className='flex-[1]'>
        <span className=''>{project.title}</span>
      </h2>

      <span className='flex-[1]'>
        {project.richText && <PortableText value={project.richText} />}
        {project.comingSoon && <span>( Coming Soon )</span>}
      </span>
      <span className='flex-[0.4]'>
        {project.year ? new Date(project.year).getFullYear() : ''}
      </span>
    </div>
  );
};

export default TextLayoutMobile;
