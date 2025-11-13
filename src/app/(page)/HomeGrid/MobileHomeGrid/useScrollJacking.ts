import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { CONFIG, getNavHeight, getFooterHeight } from './constants';

/**
 * Manages scroll-jacking behavior with smooth transitions between items.
 */
export function useScrollJacking(
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  projectsLength: number,
  hasEntered: boolean
) {
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reinitKey, setReinitKey] = useState(0);
  const isAnimating = useRef(false);
  const hasInitialized = useRef(false);
  const wasMobileRef = useRef(false);

  const isMobile = () => window.innerWidth < CONFIG.DESKTOP_BREAKPOINT;

  const getTargetScroll = useCallback(
    (index: number): number => {
      const element = itemRefs.current[index];
      if (!element) return 0;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;

      // First item: offset from top by nav height
      if (index === 0) {
        return elementTop - getNavHeight() - CONFIG.FIRST_ITEM_OFFSET;
      }

      // Last item: ensure footer is visible below
      if (index === projectsLength - 1) {
        const footerHeight = getFooterHeight();
        const viewportCenter = window.innerHeight / 2;
        // Position element in upper portion of viewport to allow room for footer
        return elementTop - viewportCenter + rect.height / 2 - footerHeight / 2;
      }

      // Middle items: center in viewport
      const viewportCenter = window.innerHeight / 2;
      return elementTop - viewportCenter + rect.height / 2;
    },
    [itemRefs, projectsLength]
  );

  const gotoIndex = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= projectsLength ||
        index === currentIndexRef.current ||
        isAnimating.current
      )
        return;

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
    if (isAnimating.current || !isMobile()) return;

    const viewportCenter = window.scrollY + window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    itemRefs.current.forEach((element, i) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + window.scrollY + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
        if (distance < 10) return; // Early exit approximation
      }
    });

    if (closestIndex !== currentIndexRef.current) {
      currentIndexRef.current = closestIndex;
      setCurrentIndex(closestIndex);
    }
  }, [itemRefs]);

  // Handle resize and detect mobile/desktop transitions
  useEffect(() => {
    const handleResize = () => {
      const nowMobile = isMobile();
      if (nowMobile && !wasMobileRef.current && hasEntered) {
        hasInitialized.current = false;
        setReinitKey((prev) => prev + 1);
      }
      wasMobileRef.current = nowMobile;
    };

    wasMobileRef.current = isMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasEntered]);

  // Initialize scroll position on mobile
  useEffect(() => {
    if (!isMobile() || !hasEntered || hasInitialized.current) return;

    const timer = setTimeout(() => {
      window.scrollTo({ top: getTargetScroll(0), behavior: 'auto' });
      syncScrollPosition();
      hasInitialized.current = true;
    }, 150);

    return () => clearTimeout(timer);
  }, [hasEntered, getTargetScroll, syncScrollPosition, reinitKey]);

  // Main scroll-jacking behavior
  useEffect(() => {
    if (!isMobile() || !hasEntered) return;

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

    const keyActions: Record<string, () => void> = {
      ArrowDown: () => gotoIndex(currentIndexRef.current + 1),
      ArrowUp: () => gotoIndex(currentIndexRef.current - 1),
      PageDown: () => gotoIndex(currentIndexRef.current + 1),
      PageUp: () => gotoIndex(currentIndexRef.current - 1),
      ' ': () => gotoIndex(currentIndexRef.current + 1),
      Home: () => gotoIndex(0),
      End: () => gotoIndex(projectsLength - 1),
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
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
  }, [projectsLength, gotoIndex, syncScrollPosition, hasEntered, reinitKey]);

  return { currentIndex };
}
