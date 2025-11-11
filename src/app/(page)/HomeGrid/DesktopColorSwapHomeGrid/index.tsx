'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from '@/components/Media/NextImage';
import { useEntranceDetection } from './useEntranceDetection';
import { useColorShiftAnimation } from './useColorShiftAnimation';
import { ANIMATION_CONFIG, Z_INDEX } from './constants';
import { getImageAssetId, getBackgroundColor } from '@/utils/homeProjectUtils';
import { IProjects } from '../../types/IProject';
import { IBoxState } from '../../types/IBoxState';

type IDesktopColorSwapHomeGrid = {
  projects: IProjects;
};

/**
 * Desktop home grid with color-shifting animation and hover interactions
 * @see ANIMATION_DOCUMENTATION.md for detailed animation behavior
 */
export function DesktopColorSwapHomeGrid({
  projects,
}: IDesktopColorSwapHomeGrid) {
  const hasEntered = useEntranceDetection();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [elevatedIndex, setElevatedIndex] = useState<number | null>(null);

  // Initialize box states
  const [boxes, setBoxes] = useState<IBoxState[]>(() =>
    projects.map((project, index) => ({
      currentProjectIndex: index,
      loaded: false,
      color: getBackgroundColor(project),
      imageLoaded: false,
    }))
  );

  // Animation hook - manages color shifting and image loading
  const { boxRefs, imageRefs } = useColorShiftAnimation({
    projects,
    boxes,
    setBoxes,
    hasEntered,
    onAnimationComplete: () => setAnimationComplete(true),
  });

  // Sync elevated index with hovered index
  useEffect(() => {
    if (hoveredIndex !== null) {
      setElevatedIndex(hoveredIndex);
    }
  }, [hoveredIndex]);

  // Reset elevation when blur overlay exits
  const handleOverlayExitComplete = useCallback(() => {
    setElevatedIndex(null);
  }, []);

  // Re-initialize boxes when projects change
  useEffect(() => {
    setBoxes(
      projects.map((project, index) => ({
        currentProjectIndex: index,
        loaded: false,
        color: getBackgroundColor(project),
        imageLoaded: false,
      }))
    );
  }, [projects]);

  // Memoize class names
  const gridClassName = useMemo(() => {
    const baseClasses =
      'grid lg:grid-rows-3 lg:grid-cols-4 lg:gap-[13.06%] lg:aspect-[1.9/1] my-auto';
    const columnClass = hasEntered ? 'grid-cols-1' : 'grid-cols-2';
    return `${baseClasses} ${columnClass}`;
  }, [hasEntered]);

  const itemClassName = 'relative aspect-[4/3] flex gap-2.5';

  return (
    <div className="relative">
      {/* Main grid with images */}
      <div className={gridClassName} suppressHydrationWarning>
        {boxes.map((box, index) => {
          const isElevated = elevatedIndex === index;
          // Use index for image (preserves CMS order)
          const project = projects[index];
          // Use currentProjectIndex for rotating colors (creates ladder effect)
          // Only calculate currentColor if box is not loaded (during animation)
          const currentColor = box.loaded
            ? '#ffffff'
            : getBackgroundColor(projects[box.currentProjectIndex]) ||
              box.color;

          const isLinkable = project.slug && !project.comingSoon;
          const projectUrl = isLinkable
            ? `/project/${project.slug}`
            : undefined;

          const gridItemContent = (
            <>
              {/* Project number */}
              <motion.div
                className="flex flex-[0.5] w-full justify-center"
                style={{ position: 'relative' }}
              >
                {(index + 1).toFixed(1)}
              </motion.div>

              {/* Image container */}
              <div className="relative flex-1 aspect-4/5">
                {/* Color placeholder - shows rotating colors during animation */}
                <div
                  ref={(el) => {
                    boxRefs.current[index] = el;
                  }}
                  className="absolute inset-0"
                  style={{
                    backgroundColor: currentColor,
                    opacity: box.loaded ? 0 : 1,
                    display: box.loaded ? 'none' : 'block',
                  }}
                />

                {/* Image - loads at correct position based on index */}
                <div
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="absolute inset-0 opacity-0"
                  style={{
                    backgroundColor: currentColor,
                  }}
                >
                  <NextImage
                    refId={getImageAssetId(project)}
                    alt={project.title || undefined}
                    className="w-full h-full object-cover"
                    width={800}
                    height={1000}
                  />
                </div>
              </div>
            </>
          );

          const motionDivProps = {
            className: itemClassName,
            style: { zIndex: isElevated ? Z_INDEX.ELEVATED : Z_INDEX.BASE },
            onHoverStart: () => animationComplete && setHoveredIndex(index),
            onHoverEnd: () => animationComplete && setHoveredIndex(null),
            suppressHydrationWarning: true,
          };

          return isLinkable && projectUrl ? (
            <Link key={index} href={projectUrl} className="block">
              <motion.div {...motionDivProps}>{gridItemContent}</motion.div>
            </Link>
          ) : (
            <motion.div key={index} {...motionDivProps}>
              {gridItemContent}
            </motion.div>
          );
        })}
      </div>

      {/* Number parentheses overlay */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            className={`${gridClassName} absolute inset-0 pointer-events-none z-200`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: ANIMATION_CONFIG.TRANSITION_DURATION,
              ease: 'easeInOut',
            }}
          >
            {boxes.map((_, index) => (
              <div key={index} className={itemClassName}>
                <div className="flex flex-[0.5] w-full justify-center relative">
                  <motion.span
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{
                      duration: ANIMATION_CONFIG.TRANSITION_DURATION,
                      ease: 'easeInOut',
                    }}
                  >
                    (&nbsp;
                  </motion.span>
                  <span>{(index + 1).toFixed(1)}</span>
                  <motion.span
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{
                      duration: ANIMATION_CONFIG.TRANSITION_DURATION,
                      ease: 'easeInOut',
                    }}
                  >
                    &nbsp;)
                  </motion.span>
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blur overlay */}
      <AnimatePresence onExitComplete={handleOverlayExitComplete}>
        {hoveredIndex !== null && (
          <motion.div
            className="fixed inset-0 backdrop-blur-[20px] pointer-events-none z-50 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: ANIMATION_CONFIG.TRANSITION_DURATION,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
            role="presentation"
          />
        )}
      </AnimatePresence>

      {/* Project title */}
      <AnimatePresence mode="wait">
        {hoveredIndex !== null && (
          <motion.h3
            key={hoveredIndex}
            className="fixed inset-0 mx-auto text-white mix-blend-difference text-[83.53px] font-bold flex justify-center items-center flex-wrap w-fit z-200 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: ANIMATION_CONFIG.HOVER_TRANSITION,
              ease: 'easeInOut',
            }}
          >
            {projects[hoveredIndex]?.title || ''}
          </motion.h3>
        )}
      </AnimatePresence>
    </div>
  );
}
