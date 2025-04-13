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
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setHasScrolled(window.scrollY > 0);
        }, 100);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (!hideScrollRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => setIsFirstSectionVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );

      observer.observe(hideScrollRef.current);
      return () => observer.disconnect();
    }, []);

    return { isFirstSectionVisible, hasScrolled, hideScrollRef };
  };
