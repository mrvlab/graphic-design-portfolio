'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { IProjects } from '../../types/IProject';
import { Z_INDEX } from './constants';
import { useEntranceDetection } from './useEntranceDetection';
import { useScrollJacking } from './useScrollJacking';
import { GridItem } from './GridItem';

gsap.registerPlugin(Observer, ScrollToPlugin);

type IMobileHomeGrid = {
  projects: IProjects;
};

export function MobileHomeGrid({ projects }: IMobileHomeGrid) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasEntered = useEntranceDetection();
  const { currentIndex } = useScrollJacking(
    itemRefs,
    projects.length,
    hasEntered
  );

  return (
    <div className="relative">
      <div
        className="mobile-home-grid gap-y-16 gap-x-24 px-12"
        suppressHydrationWarning
      >
        {projects.map((project, index) => (
          <GridItem
            key={project.title || index}
            project={project}
            index={index}
            isActive={currentIndex === index}
            hasEntered={hasEntered}
            itemRef={(el) => {
              itemRefs.current[index] = el;
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {hasEntered && (
          <motion.div
            className="fixed inset-0 backdrop-blur-[20px] pointer-events-none"
            style={{ zIndex: Z_INDEX.BLUR }}
            aria-hidden="true"
            role="presentation"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
