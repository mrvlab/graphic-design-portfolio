import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Media from '@/components/Media/Media';
import { IProjects } from '../../types/IProject';
import { Z_INDEX, TITLE_ANIMATION } from './constants';
import { getBackgroundColor } from '@/utils/homeProjectUtils';

type GridItemProps = {
  project: IProjects[number];
  index: number;
  isActive: boolean;
  hasEntered: boolean;
  itemRef: (el: HTMLDivElement | null) => void;
};

export const GridItem = memo(
  ({ project, index, isActive, hasEntered, itemRef }: GridItemProps) => {
    const firstMediaItem = project.mediaGallery?.mediaItems?.[0];
    const isElevated = hasEntered && isActive;
    const isLinkable = project.slug && !project.comingSoon;
    const projectUrl = isLinkable ? `/project/${project.slug}` : undefined;
    const projectColor = getBackgroundColor(project);

    const gridItemContent = (
      <>
        <motion.div
          ref={itemRef}
          className="mobile-home-grid-item"
          style={{
            zIndex: isElevated ? Z_INDEX.ELEVATED : Z_INDEX.BASE,
          }}
          suppressHydrationWarning
        >
          <div className="flex w-full justify-center lg:hidden">
            {`( ${(index + 1).toFixed(1)} )`}
          </div>

          <div className="relative aspect-3/4">
            {/* Color placeholder - shows when not active */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundColor: projectColor,
              }}
              animate={{
                opacity: hasEntered && !isActive ? 1 : 0,
              }}
              transition={{
                duration: TITLE_ANIMATION.duration,
                ease: TITLE_ANIMATION.ease,
              }}
            />

            {/* Image - shows when active or before entered */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: project.comingSoon ? 0.2 : 1,
              }}
              animate={{
                opacity:
                  !hasEntered || isActive ? (project.comingSoon ? 0.2 : 1) : 0,
              }}
              transition={{
                duration: TITLE_ANIMATION.duration,
                ease: TITLE_ANIMATION.ease,
              }}
            >
              <Media
                id={
                  firstMediaItem?.asset?.url
                    ? firstMediaItem.asset._id
                    : undefined
                }
                playbackId={firstMediaItem?.asset?.playbackId || undefined}
                alt={
                  firstMediaItem?.alt || project.title || `Project ${index + 1}`
                }
                className="w-full h-full object-cover"
                width={800}
                height={1000}
                priority={index < 4}
              />
            </motion.div>
          </div>
        </motion.div>

        {hasEntered && (
          <motion.h3
            className="absolute inset-0 flex justify-center items-center flex-wrap leading-[90%] text-white mix-blend-difference text-[45px] sm:text-[83.53px] font-bold text-center px-4 pointer-events-none tracking-[-3.34px]"
            style={{ zIndex: Z_INDEX.ELEVATED }}
            initial={TITLE_ANIMATION.initial}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.9,
            }}
            transition={{
              duration: TITLE_ANIMATION.duration,
              ease: TITLE_ANIMATION.ease,
            }}
          >
            {project.title || ''}
          </motion.h3>
        )}
      </>
    );

    return (
      <div className="relative">
        {isLinkable && projectUrl ? (
          <Link href={projectUrl} className="block">
            {gridItemContent}
          </Link>
        ) : (
          gridItemContent
        )}
      </div>
    );
  },
  (prev, next) =>
    prev.isActive === next.isActive && prev.hasEntered === next.hasEntered
);

GridItem.displayName = 'GridItem';
