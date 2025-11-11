import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { CONFIG, getNavHeight } from './constants';

/**
 * Manages scroll-jacking behavior with smooth transitions between items.
 * Handles scroll events, keyboard navigation, and syncs active item with scroll position.
 */
export function useScrollJacking(
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  projectsLength: number,
  hasEntered: boolean
) {
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const hasInitialized = useRef(false);

  const getTargetScroll = useCallback(
    (index: number): number => {
      const element = itemRefs.current[index];
      if (!element) return 0;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const isFirstOrLast = index === 0 || index === projectsLength - 1;

      if (isFirstOrLast) {
        return elementTop - getNavHeight() - CONFIG.FIRST_ITEM_OFFSET;
      }

      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.height / 2;
      return elementTop - viewportCenter + elementCenter;
    },
    [itemRefs, projectsLength]
  );

  const gotoIndex = useCallback(
    (index: number) => {
      const isValid =
        index >= 0 &&
        index < projectsLength &&
        index !== currentIndexRef.current &&
        !isAnimating.current;

      if (!isValid) return;

      isAnimating.current = true;
      currentIndexRef.current = index;
      setCurrentIndex(index);

      gsap.to(window, {
        scrollTo: { y: getTargetScroll(index), autoKill: false },
        duration: CONFIG.ANIMATION_DURATION,
        ease: 'power3.out',
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    },
    [projectsLength, getTargetScroll]
  );

  const syncScrollPosition = useCallback(() => {
    if (isAnimating.current || window.innerWidth >= CONFIG.DESKTOP_BREAKPOINT)
      return;

    const scrollY = window.scrollY;
    const viewportCenter = scrollY + window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    const items = itemRefs.current;
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + scrollY + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;

        if (distance < 10) break;
      }
    }

    if (closestIndex !== currentIndexRef.current) {
      currentIndexRef.current = closestIndex;
      setCurrentIndex(closestIndex);
    }
  }, [itemRefs]);

  // Re-initialize scroll position when user enters
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.innerWidth >= CONFIG.DESKTOP_BREAKPOINT ||
      !hasEntered ||
      hasInitialized.current
    )
      return;

    const initTimer = setTimeout(() => {
      window.scrollTo({ top: getTargetScroll(0), behavior: 'auto' });
      syncScrollPosition();
      hasInitialized.current = true;
    }, 150); // Slightly longer delay to ensure layout has settled

    return () => clearTimeout(initTimer);
  }, [hasEntered, getTargetScroll, syncScrollPosition]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.innerWidth >= CONFIG.DESKTOP_BREAKPOINT
    )
      return;

    let syncTimeout: NodeJS.Timeout;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          syncScrollPosition();
          rafId = null;
        });
      }

      clearTimeout(syncTimeout);
      syncTimeout = setTimeout(syncScrollPosition, CONFIG.SYNC_DEBOUNCE);
    };

    const observer = Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () =>
        !isAnimating.current && gotoIndex(currentIndexRef.current - 1),
      onUp: () =>
        !isAnimating.current && gotoIndex(currentIndexRef.current + 1),
      tolerance: CONFIG.SCROLL_TOLERANCE,
      preventDefault: true,
    });

    const handleKeydown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;

      const keyActions: Record<string, () => void> = {
        ArrowDown: () => gotoIndex(currentIndexRef.current + 1),
        ArrowUp: () => gotoIndex(currentIndexRef.current - 1),
        PageDown: () => gotoIndex(currentIndexRef.current + 1),
        PageUp: () => gotoIndex(currentIndexRef.current - 1),
        ' ': () => gotoIndex(currentIndexRef.current + 1),
        Home: () => gotoIndex(0),
        End: () => gotoIndex(projectsLength - 1),
      };

      const action = keyActions[e.key];
      if (action) {
        e.preventDefault();
        action();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeydown);

    return () => {
      clearTimeout(syncTimeout);
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
      observer.kill();
    };
  }, [projectsLength, gotoIndex, getTargetScroll, syncScrollPosition]);

  return { currentIndex };
}
