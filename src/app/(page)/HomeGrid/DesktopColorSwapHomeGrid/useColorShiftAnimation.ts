import { useCallback, useRef, useEffect } from 'react';
import { ANIMATION_CONFIG } from './constants';
import { getImageUrl } from '@/utils/homeProjectUtils';
import { IBoxState } from '../../types/IBoxState';
import { IProjects } from '../../types/IProject';

type IUseColorShiftAnimation = {
  projects: IProjects;
  boxes: IBoxState[];
  setBoxes: React.Dispatch<React.SetStateAction<IBoxState[]>>;
  hasEntered: boolean;
  onAnimationComplete: () => void;
};

export function useColorShiftAnimation({
  projects,
  boxes,
  setBoxes,
  hasEntered,
  onAnimationComplete,
}: IUseColorShiftAnimation) {
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loadedProjectsRef = useRef(new Set<number>());
  const animationStartedRef = useRef(false);
  const shiftCountRef = useRef(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadImage = useCallback(
    (projectIndex: number) => {
      if (loadedProjectsRef.current.has(projectIndex)) return;

      loadedProjectsRef.current.add(projectIndex);
      const img = new Image();

      img.onload = () => {
        setBoxes((prev) => {
          const updated = [...prev];
          updated[projectIndex] = {
            ...updated[projectIndex],
            loaded: true,
            imageLoaded: true,
            currentProjectIndex: projectIndex,
          };
          return updated;
        });
      };

      img.onerror = () =>
        console.error(`Failed to load image for project ${projectIndex + 1}`);
      img.src = getImageUrl(projects[projectIndex]);
    },
    [projects, setBoxes]
  );

  const shiftColors = useCallback(() => {
    shiftCountRef.current += 1;
    const projectToLoad =
      shiftCountRef.current - ANIMATION_CONFIG.SHIFT_START_OFFSET;

    if (projectToLoad >= 0 && projectToLoad < ANIMATION_CONFIG.TOTAL_PROJECTS) {
      loadImage(projectToLoad);
    }

    setBoxes((prev) => {
      const getPrevNonLoaded = (idx: number): number | null => {
        let search = idx === 0 ? ANIMATION_CONFIG.TOTAL_PROJECTS - 1 : idx - 1;
        let attempts = 0;

        while (attempts < ANIMATION_CONFIG.TOTAL_PROJECTS) {
          if (!prev[search].loaded) return search;
          search =
            search === 0 ? ANIMATION_CONFIG.TOTAL_PROJECTS - 1 : search - 1;
          attempts++;
        }
        return null;
      };

      const wrapIdx = getPrevNonLoaded(0);
      const wrapValue =
        wrapIdx !== null ? prev[wrapIdx].currentProjectIndex : null;

      return prev.map((box, i) => {
        if (box.loaded) return box;

        const sourceIdx = i === 0 ? wrapIdx : getPrevNonLoaded(i);
        const newProjectIdx =
          i === 0 && wrapValue !== null
            ? wrapValue
            : sourceIdx !== null
              ? prev[sourceIdx].currentProjectIndex
              : box.currentProjectIndex;

        return { ...box, currentProjectIndex: newProjectIdx };
      });
    });
  }, [loadImage, setBoxes]);

  const animationLoop = useCallback(() => {
    const shift = () => {
      shiftColors();
      if (loadedProjectsRef.current.size < ANIMATION_CONFIG.TOTAL_PROJECTS) {
        animationTimeoutRef.current = setTimeout(
          shift,
          ANIMATION_CONFIG.SHIFT_INTERVAL
        );
      } else {
        onAnimationComplete();
      }
    };
    shift();
  }, [shiftColors, onAnimationComplete]);

  useEffect(() => {
    if (!hasEntered || boxes.length === 0 || animationStartedRef.current)
      return;

    animationStartedRef.current = true;
    shiftCountRef.current = 0;
    animationLoop();
  }, [hasEntered, boxes.length, animationLoop]);

  useEffect(
    () => () => {
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
      animationStartedRef.current = false;
      loadedProjectsRef.current.clear();
      shiftCountRef.current = 0;
    },
    []
  );

  return { boxRefs, imageRefs };
}
