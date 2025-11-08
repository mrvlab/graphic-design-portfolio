'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface Project {
  title: string;
  color: string;
  image: string;
  targetPosition?: number;
}

interface DesktopColorSwapHomeGridProps {
  projects: Project[];
}

interface BoxState {
  currentProjectIndex: number;
  loaded: boolean;
  color: string;
  imageLoaded: boolean;
}

export function DesktopColorSwapHomeGrid({
  projects,
}: DesktopColorSwapHomeGridProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [boxes, setBoxes] = useState<BoxState[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loadedProjectsRef = useRef(new Set<number>());
  const animationStartedRef = useRef(false);
  const shiftCountRef = useRef(0);

  useEffect(() => {
    const actuallyEntered =
      document.documentElement.classList.contains('user-has-entered');
    setHasEntered(actuallyEntered);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const hasEnteredNow =
            document.documentElement.classList.contains('user-has-entered');
          setHasEntered(hasEnteredNow);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const initialBoxes: BoxState[] = projects.map((project, index) => ({
      currentProjectIndex: index,
      loaded: false,
      color: project.color,
      imageLoaded: false,
    }));
    setBoxes(initialBoxes);
  }, [projects]);

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
          };
          return newBoxes;
        });

        // Fade in the image at original position - instant transition from color to image
        if (imageRefs.current[projectIndex] && boxRefs.current[projectIndex]) {
          // Instantly hide the color placeholder
          gsap.set(boxRefs.current[projectIndex], {
            opacity: 0,
          });

          // Start image at full opacity (instant replacement)
          gsap.set(imageRefs.current[projectIndex], {
            opacity: 1,
          });
        }
      };

      img.onerror = () => {
        console.error(
          `Failed to load Project ${projectIndex + 1} image:`,
          project.image
        );
        loadedProjectsRef.current.add(projectIndex);
      };

      img.src = project.image;
    },
    [projects]
  );

  const checkForImageLoad = useCallback(() => {
    const projectIndexToLoad = shiftCountRef.current - 5;

    if (
      projectIndexToLoad >= 0 &&
      projectIndexToLoad < 12 &&
      !loadedProjectsRef.current.has(projectIndexToLoad)
    ) {
      loadImage(projectIndexToLoad);
    }
  }, [loadImage]);

  const shiftColors = useCallback(() => {
    shiftCountRef.current += 1;

    setBoxes((prevBoxes) => {
      const newBoxes = [...prevBoxes];
      const tempProjectIndex = newBoxes[11].currentProjectIndex;

      for (let i = 11; i > 0; i--) {
        newBoxes[i] = {
          ...newBoxes[i],
          currentProjectIndex: newBoxes[i - 1].currentProjectIndex,
        };
      }
      newBoxes[0] = {
        ...newBoxes[0],
        currentProjectIndex: tempProjectIndex,
      };

      newBoxes.forEach((box, boxIndex) => {
        if (!box.loaded && boxRefs.current[boxIndex]) {
          const projectIndex = box.currentProjectIndex;
          gsap.to(boxRefs.current[boxIndex], {
            backgroundColor: projects[projectIndex].color,
            duration: 0.2,
            ease: 'power2.inOut',
          });
        }
      });

      return newBoxes;
    });

    setTimeout(() => checkForImageLoad(), 0);
  }, [projects, checkForImageLoad]);

  const animationLoop = useCallback(() => {
    // Calculate timing: 2300ms total animation, 12 shifts = ~191ms per shift
    const totalAnimationTime = 2300;
    const numberOfShifts = 12;
    const delayPerShift = totalAnimationTime / numberOfShifts;

    const shift = () => {
      shiftColors();

      if (loadedProjectsRef.current.size < 12) {
        setTimeout(shift, delayPerShift);
      } else {
      }
    };

    shift();
  }, [shiftColors]);

  const startAnimation = useCallback(() => {
    const timeline = gsap.timeline();
    timelineRef.current = timeline;

    // Wait 700ms for overlay to fade out, then start the 2300ms animation
    timeline.to(
      {},
      {
        duration: 0.7, // 700ms delay for overlay fade-out
        onComplete: animationLoop,
      }
    );
  }, [animationLoop]);

  useEffect(() => {
    if (hasEntered && boxes.length > 0 && !animationStartedRef.current) {
      animationStartedRef.current = true;
      shiftCountRef.current = 0;
      startAnimation();
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [hasEntered, boxes, startAnimation]);

  // Grid layout changes smoothly over 2300ms starting at 700ms (synchronized with GSAP animation)
  const gridClass = hasEntered
    ? 'grid grid-cols-1 lg:grid-rows-3 lg:grid-cols-4 lg:gap-[13.06%] lg:aspect-[1.9/1] transition-all duration-[2300ms] ease-in-out'
    : 'grid grid-cols-2 lg:grid-rows-3 lg:grid-cols-4 lg:gap-[13.06%] lg:aspect-[1.9/1]';

  const itemClass = hasEntered
    ? 'relative aspect-4/3 flex gap-2.5 max-lg:w-[80%] max-lg:mx-auto transition-all duration-[2300ms] ease-in-out'
    : 'relative aspect-4/3 flex gap-2.5';

  return (
    <div className={gridClass} suppressHydrationWarning>
      {boxes.map((box, index) => (
        <div key={index} className={itemClass} suppressHydrationWarning>
          <div className="hidden lg:flex flex-[0.5] w-full justify-center">
            {(index + 1).toFixed(1)}
          </div>

          <div className="relative flex-1 aspect-4/5 overflow-hidden">
            {/* Color placeholder */}
            <div
              ref={(el) => {
                boxRefs.current[index] = el;
              }}
              className="absolute inset-0 transition-colors"
              style={{
                backgroundColor: box.color,
                opacity: box.loaded ? 0 : 1,
              }}
            />

            {/* Real image */}
            <div
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="absolute inset-0 opacity-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={projects[index].image}
                alt={projects[index].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
