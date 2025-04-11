import { motion } from 'framer-motion';

import IMediaItem from '../types/IMediaItem';
import IProjectCard from '../types/IProjectCard';
import TextLayoutDesktop from './TextLayoutDesktop';
import TextLayoutMobile from './TextLayoutMobile';
import NextImage from '@/components/Media/NextImage';

type IProjectCardContent = {
  project: IProjectCard['project'];
  index: number;
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  mediaItems: IMediaItem[];
  heightClasses: string[];
  animateState: string;
};

function ProjectCardContent({
  project,
  index,
  isHovered,
  setIsHovered,
  mediaItems,
  heightClasses,
  animateState,
}: Omit<IProjectCardContent, 'cardRef'>) {
  const containerVariants = {
    visible: {
      opacity: 1,
      transform: 'none',
      transition: {
        staggerChildren: 0.14,
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transform: 'translateY(0)',
      transition: {
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.2,
      },
    },
  };

  const imageVariants = {
    visible: {
      opacity: isHovered ? (project.comingSoon ? 0.5 : 1) : 1,
      transform: 'none',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    hidden: {
      opacity: 0,
      transform: 'translateY(0)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
  return (
    <div className='flex flex-col gap-3 lg:grid lg:grid-cols-4 lg:gap-2'>
      <TextLayoutMobile index={index} project={project} />

      <TextLayoutDesktop
        index={index}
        project={project}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
      />

      <div className='lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-1 z-10'>
        <motion.div
          className='grid grid-cols-4 gap-1 lg:gap-2 lg:grid-cols-5 lg:pl-[20%] lg:pb-3'
          variants={containerVariants}
          initial='hidden'
          animate={animateState}
        >
          {mediaItems.length < 5 &&
            [...Array(5 - mediaItems.length)].map((_, i) => (
              <div key={`placeholder-${i}`} className='hidden lg:block' />
            ))}

          {mediaItems.slice(0, 5).map((image: IMediaItem, i: number) => {
            const heightClass = heightClasses[i] || '';
            const visibilityClass = i === 4 ? 'hidden lg:block' : '';
            const ref = image.asset?._id;

            if (!ref) return null;

            return (
              <motion.div
                key={`${index}-${i}`}
                variants={imageVariants}
                className={`w-full ${heightClass} ${visibilityClass}`}
                style={{
                  opacity: project.comingSoon ? (isHovered ? 0.5 : 0.2) : 1,
                }}
              >
                <NextImage refId={ref} className='w-full h-full' />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default ProjectCardContent;
