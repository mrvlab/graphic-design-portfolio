import { useState, useEffect, useRef } from 'react';

interface UseScrollVisibilityResult {
  isFirstSectionVisible: boolean;
  hasScrolled: boolean;
  hideScrollRef: React.RefObject<HTMLDivElement | null>;
}

export const useProjectMobileScrollVisibility =
  (): UseScrollVisibilityResult => {
    const [isFirstSectionVisible, setIsFirstSectionVisible] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const hideScrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleScroll = () => setHasScrolled(window.scrollY > 0);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsFirstSectionVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );

      const currentRef = hideScrollRef.current;
      if (currentRef) observer.observe(currentRef);
      return () => observer.disconnect();
    }, []);

    return {
      isFirstSectionVisible,
      hasScrolled,
      hideScrollRef,
    };
  };
