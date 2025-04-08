'use client';

import { useEffect, useCallback } from 'react';

export const FirstLayoutHeightCalculator = () => {
  const updateHeight = useCallback((element: HTMLElement) => {
    requestAnimationFrame(() => {
      const height = element.offsetHeight;
      document.documentElement.style.setProperty(
        '--first-media-section-height',
        `${height}px`
      );
    });
  }, []);

  useEffect(() => {
    // Wait for hydration
    if (typeof window === 'undefined') return;

    const parentElement = document.getElementById('first-layout');
    if (!parentElement) return;

    const element = parentElement.querySelector('#first-media-section');
    if (!element) return;

    // Initial measurement
    updateHeight(element as HTMLElement);

    // Setup ResizeObserver for the element
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target instanceof HTMLElement) {
          updateHeight(entry.target);
        }
      }
    });

    resizeObserver.observe(element);

    // Also watch for window resize for any layout shifts
    const handleWindowResize = () => updateHeight(element as HTMLElement);
    window.addEventListener('resize', handleWindowResize, { passive: true });

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [updateHeight]);

  return null;
};
