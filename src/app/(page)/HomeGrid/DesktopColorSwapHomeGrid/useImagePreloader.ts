import { useCallback, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';

interface UseImagePreloaderProps {
  imageUrls: string[];
  boxRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  imageRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  onImageLoaded: (index: number) => void;
}

/**
 * Handles progressive image preloading for the animation
 */
export function useImagePreloader({
  imageUrls,
  boxRefs,
  imageRefs,
  onImageLoaded,
}: UseImagePreloaderProps) {
  const loadedProjectsRef = useRef(new Set<number>());

  const loadImage = useCallback(
    (projectIndex: number) => {
      if (loadedProjectsRef.current.has(projectIndex)) return;

      loadedProjectsRef.current.add(projectIndex);
      const imageUrl = imageUrls[projectIndex];

      const img = new Image();
      img.onload = () => {
        onImageLoaded(projectIndex);

        // Instant transition from color to image
        if (imageRefs.current[projectIndex] && boxRefs.current[projectIndex]) {
          gsap.set(boxRefs.current[projectIndex], { opacity: 0 });
          gsap.set(imageRefs.current[projectIndex], { opacity: 1 });
        }
      };

      img.onerror = () => {
        console.error(`Failed to load Project ${projectIndex + 1} image`);
        loadedProjectsRef.current.add(projectIndex);
      };

      img.src = imageUrl;
    },
    [imageUrls, boxRefs, imageRefs, onImageLoaded]
  );

  return { loadImage, loadedProjectsRef };
}


