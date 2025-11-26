import { useState, useEffect, useRef } from 'react';

interface UseScrollVisibilityResult {
  showScrollText: boolean;
  hasScrolled: boolean;
  hideScrollRef: React.RefObject<HTMLDivElement | null>;
}

export const useProjectMobileScrollVisibility =
  (): UseScrollVisibilityResult => {
    const [showScrollText, setShowScrollText] = useState(true);
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
        ([entry]) => {
          // Show scroll text when not intersecting (at top), hide when intersecting (scrolled down)
          setShowScrollText(!entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      observer.observe(hideScrollRef.current);
      return () => observer.disconnect();
    }, []);

    return { showScrollText, hasScrolled, hideScrollRef };
  };
