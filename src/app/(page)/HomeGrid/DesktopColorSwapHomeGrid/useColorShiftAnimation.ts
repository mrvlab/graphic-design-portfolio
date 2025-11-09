import { useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ANIMATION_CONFIG } from './constants';
import { getImageUrl, getBackgroundColor } from '@/utils/homeProjectUtils';
import { IBoxState } from '../../types/IBoxState';
import { IProjects } from '../../types/IProject';

type IUseColorShiftAnimation = {
  projects: IProjects;
  boxes: IBoxState[];
  setBoxes: React.Dispatch<React.SetStateAction<IBoxState[]>>;
  hasEntered: boolean;
  onAnimationComplete: () => void;
};

/**
 * Manages the color shifting animation and progressive image loading
 */
export function useColorShiftAnimation({
  projects,
  boxes,
  setBoxes,
  hasEntered,
  onAnimationComplete,
}: IUseColorShiftAnimation) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loadedProjectsRef = useRef(new Set<number>());
  const animationStartedRef = useRef(false);
  const shiftCountRef = useRef(0);

  // Load a single image and update state
  const loadImage = useCallback(
    (projectIndex: number) => {
      if (loadedProjectsRef.current.has(projectIndex)) return;

      loadedProjectsRef.current.add(projectIndex);
      const project = projects[projectIndex];
      const img = new Image();

      img.onload = () => {
        setBoxes((prevBoxes) => {
          const newBoxes = [...prevBoxes];
          newBoxes[projectIndex] = {
            ...newBoxes[projectIndex],
            loaded: true,
            imageLoaded: true,
            // Lock currentProjectIndex to original position (prevents rotation)
            currentProjectIndex: projectIndex,
          };
          return newBoxes;
        });

        // Smooth transition: fade out color, fade in image
        const imageRef = imageRefs.current[projectIndex];
        const boxRef = boxRefs.current[projectIndex];

        if (imageRef && boxRef) {
          // Also set directly on element style as backup
          boxRef.style.backgroundColor = '#ffffff';
          imageRef.style.backgroundColor = '#ffffff';

          // Use GSAP only for opacity transitions
          gsap.to(boxRef, {
            opacity: 0,
            backgroundColor: '#ffffff',
          });
          gsap.to(imageRef, {
            opacity: project.comingSoon ? 0.2 : 1,
            backgroundColor: '#ffffff',
          });
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image for project ${projectIndex + 1}`);
      };

      img.src = getImageUrl(project);
    },
    [projects, setBoxes]
  );

  // Check if it's time to load the next image
  const checkForImageLoad = useCallback(() => {
    const projectIndexToLoad =
      shiftCountRef.current - ANIMATION_CONFIG.SHIFT_START_OFFSET;

    if (
      projectIndexToLoad >= 0 &&
      projectIndexToLoad < ANIMATION_CONFIG.TOTAL_PROJECTS &&
      !loadedProjectsRef.current.has(projectIndexToLoad)
    ) {
      loadImage(projectIndexToLoad);
    }
  }, [loadImage]);

  // Shift colors to the right (circular rotation) for visual effect
  // Algorithm: temp = color at position 12, all shift right, position 1 gets temp
  // BUT: Loaded boxes keep their locked currentProjectIndex and don't participate in shifting
  const shiftColors = useCallback(() => {
    shiftCountRef.current += 1;

    setBoxes((prevBoxes) => {
      const newBoxes = [...prevBoxes];

      // Helper to find the previous position (with wrapping), skipping loaded boxes
      // Uses prevBoxes to read original values before shifting
      const getPreviousNonLoadedIndex = (
        currentIndex: number
      ): number | null => {
        // Start searching from the previous position (with wrapping)
        let searchIndex =
          currentIndex === 0
            ? ANIMATION_CONFIG.TOTAL_PROJECTS - 1 // Wrap to end if starting at 0
            : currentIndex - 1;
        let attempts = 0;
        const maxAttempts = ANIMATION_CONFIG.TOTAL_PROJECTS;

        while (attempts < maxAttempts) {
          // If this position is not loaded, use it
          if (!prevBoxes[searchIndex].loaded) {
            return searchIndex;
          }

          // Otherwise, continue searching backwards (with wrapping)
          searchIndex--;
          if (searchIndex < 0) {
            searchIndex = ANIMATION_CONFIG.TOTAL_PROJECTS - 1;
          }
          attempts++;
        }

        return null; // All boxes are loaded (shouldn't happen during animation)
      };

      // Save the value that will wrap from the last position to the first
      // Find the last non-loaded position (searching backwards from position 11)
      let wrapValue: number | null = null;
      const lastNonLoadedForWrap = getPreviousNonLoadedIndex(0);
      if (lastNonLoadedForWrap !== null) {
        wrapValue = prevBoxes[lastNonLoadedForWrap].currentProjectIndex;
      }

      // Shift all non-loaded positions right
      // Process from right to left to avoid overwriting values we need
      for (let i = ANIMATION_CONFIG.TOTAL_PROJECTS - 1; i >= 0; i--) {
        if (!prevBoxes[i].loaded) {
          if (i === 0) {
            // Position 0 gets the wrapped value from the last non-loaded position
            if (wrapValue !== null) {
              newBoxes[i] = {
                ...newBoxes[i],
                currentProjectIndex: wrapValue,
              };
            }
          } else {
            // All other positions get from the previous non-loaded position
            const sourceIndex = getPreviousNonLoadedIndex(i);
            if (sourceIndex !== null) {
              newBoxes[i] = {
                ...newBoxes[i],
                currentProjectIndex: prevBoxes[sourceIndex].currentProjectIndex,
              };
            }
          }
        }
        // If loaded, currentProjectIndex stays locked (don't modify)
      }

      // Animate color changes for non-loaded boxes (creates the ladder effect)
      // Also ensure loaded boxes maintain white background
      newBoxes.forEach((box, boxIndex) => {
        const boxRef = boxRefs.current[boxIndex];
        if (!boxRef) return;

        if (box.loaded) {
          // Lock white background for loaded boxes (prevent any color animations)
          gsap.set(boxRef, { backgroundColor: '#ffffff' });
          boxRef.style.backgroundColor = '#ffffff';
        } else {
          // Animate color for non-loaded boxes
          const projectIndex = box.currentProjectIndex;
          gsap.to(boxRef, {
            backgroundColor: getBackgroundColor(projects[projectIndex]),
          });
        }
      });

      return newBoxes;
    });

    // Check for image load after state update
    setTimeout(checkForImageLoad, 0);
  }, [projects, setBoxes, checkForImageLoad]);

  // Recursive animation loop
  const animationLoop = useCallback(() => {
    const shift = () => {
      shiftColors();

      if (loadedProjectsRef.current.size < ANIMATION_CONFIG.TOTAL_PROJECTS) {
        setTimeout(shift, ANIMATION_CONFIG.SHIFT_INTERVAL);
      } else {
        onAnimationComplete();
      }
    };

    shift();
  }, [shiftColors, onAnimationComplete]);

  // Start the animation sequence
  const startAnimation = useCallback(() => {
    const timeline = gsap.timeline();
    timelineRef.current = timeline;

    timeline.to(
      {},
      {
        onComplete: animationLoop,
      }
    );
  }, [animationLoop]);

  // Trigger animation when user enters
  useEffect(() => {
    if (hasEntered && boxes.length > 0 && !animationStartedRef.current) {
      animationStartedRef.current = true;
      shiftCountRef.current = 0;
      startAnimation();
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, [hasEntered, boxes, startAnimation]);

  return {
    boxRefs,
    imageRefs,
  };
}
