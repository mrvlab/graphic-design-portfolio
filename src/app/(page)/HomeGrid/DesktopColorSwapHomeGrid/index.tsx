'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEntranceDetection } from './useEntranceDetection';
import { useColorShiftAnimation } from './useColorShiftAnimation';
import { ANIMATION_CONFIG } from './constants';
import { getBackgroundColor } from '@/utils/homeProjectUtils';
import { IProjects } from '../../types/IProject';
import { IBoxState } from '../../types/IBoxState';
import { GridItem } from './GridItem';

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

  // Grid class name based on entrance state
  const baseClasses =
    'grid grid-cols-4 grid-rows-3 gap-x-[var(--horizontal-grid-spacing)] gap-y-[var(--vertical-grid-spacing)] h-full w-full lg:aspect-[16/9]';
  const columnClass = hasEntered ? 'grid-cols-1' : 'grid-cols-2';
  const gridClassName = `${baseClasses} ${columnClass}`;

  return (
    <div className="relative lg:h-full">
      {/* Main grid with images */}
      <div className={gridClassName} suppressHydrationWarning>
        {boxes.map((box, index) => (
          <GridItem
            key={index}
            box={box}
            index={index}
            projects={projects}
            hoveredIndex={hoveredIndex}
            elevatedIndex={elevatedIndex}
            animationComplete={animationComplete}
            boxRefs={boxRefs}
            imageRefs={imageRefs}
            onHoverStart={() => animationComplete && setHoveredIndex(index)}
            onHoverEnd={() => animationComplete && setHoveredIndex(null)}
          />
        ))}
      </div>

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
            className="fixed inset-0 mx-auto text-white mix-blend-difference text-[83.53px] font-bold flex justify-center items-center flex-wrap w-fit z-200 pointer-events-none tracking-[-3.34]"
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
