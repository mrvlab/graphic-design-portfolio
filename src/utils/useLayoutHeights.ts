'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook that dynamically measures layout element heights (navigation and footer)
 * for both mobile and desktop, and updates CSS custom properties on the document root.
 *
 * Performance optimized:
 * - Uses requestAnimationFrame for smooth updates
 * - Debounces updates to prevent excessive reflows
 * - Only updates if values actually changed
 * - Uses ResizeObserver (more efficient than window resize)
 *
 * Watches for:
 * - #mobile-nav-home element height
 * - #mobile-nav-height element height
 * - #desktop-nav-height element height
 * - #footer-height element height
 *
 * Updates CSS variables:
 * - --mobile-nav-home-height
 * - --mobile-nav-height
 * - --nav-total-mobile (home + main combined)
 * - --desktop-nav-height
 * - --footer-height
 * - --nav-footer-total-mobile (mobile nav + footer)
 * - --nav-footer-total-desktop (desktop nav + footer)
 */
export function useLayoutHeights() {
  // Track previous values to avoid unnecessary updates
  const prevHeightsRef = useRef({
    mobileHome: 0,
    mobileMain: 0,
    mobileCombined: 0,
    desktopNav: 0,
    footer: 0,
    totalMobile: 0,
    totalDesktop: 0,
  });
  const rafIdRef = useRef<number | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Get references to all layout elements
    const mobileHomeNavElement = document.getElementById('mobile-nav-home');
    const mobileMainNavElement = document.getElementById('mobile-nav-height');
    const desktopNavElement = document.getElementById('desktop-nav-height');
    const footerElement = document.getElementById('footer-height');

    if (
      !mobileHomeNavElement &&
      !mobileMainNavElement &&
      !desktopNavElement &&
      !footerElement
    ) {
      // No elements found, skip measurement
      return;
    }

    const root = document.documentElement;

    // Function to measure and update CSS variables
    const updateLayoutHeights = () => {
      // Cancel any pending RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Use RAF for optimal performance
      rafIdRef.current = requestAnimationFrame(() => {
        let mobileHomeHeight = 0;
        let mobileMainHeight = 0;
        let desktopNavHeight = 0;
        let footerHeight = 0;

        // Measure mobile home nav height
        if (mobileHomeNavElement) {
          mobileHomeHeight = mobileHomeNavElement.offsetHeight;
        }

        // Measure mobile main nav height
        if (mobileMainNavElement) {
          mobileMainHeight = mobileMainNavElement.offsetHeight;
        }

        // Measure desktop nav height
        if (desktopNavElement) {
          desktopNavHeight = desktopNavElement.offsetHeight;
        }

        // Measure footer height
        if (footerElement) {
          footerHeight = footerElement.offsetHeight;
        }

        // Calculate combined heights
        const mobileCombinedHeight = mobileHomeHeight + mobileMainHeight;
        const totalMobileHeight = mobileCombinedHeight + footerHeight;
        const totalDesktopHeight = desktopNavHeight + footerHeight;

        // Only update if values changed (avoid unnecessary reflows)
        const prev = prevHeightsRef.current;
        if (
          prev.mobileHome !== mobileHomeHeight ||
          prev.mobileMain !== mobileMainHeight ||
          prev.mobileCombined !== mobileCombinedHeight ||
          prev.desktopNav !== desktopNavHeight ||
          prev.footer !== footerHeight ||
          prev.totalMobile !== totalMobileHeight ||
          prev.totalDesktop !== totalDesktopHeight
        ) {
          // Batch DOM writes for better performance
          root.style.setProperty(
            '--mobile-nav-home-height',
            `${mobileHomeHeight}px`
          );
          root.style.setProperty(
            '--mobile-nav-height',
            `${mobileMainHeight}px`
          );
          root.style.setProperty(
            '--nav-total-mobile',
            `${mobileCombinedHeight}px`
          );
          root.style.setProperty(
            '--desktop-nav-height',
            `${desktopNavHeight}px`
          );
          root.style.setProperty('--footer-height', `${footerHeight}px`);
          root.style.setProperty(
            '--nav-footer-total-mobile',
            `${totalMobileHeight}px`
          );
          root.style.setProperty(
            '--nav-footer-total-desktop',
            `${totalDesktopHeight}px`
          );

          // Update previous values
          prevHeightsRef.current = {
            mobileHome: mobileHomeHeight,
            mobileMain: mobileMainHeight,
            mobileCombined: mobileCombinedHeight,
            desktopNav: desktopNavHeight,
            footer: footerHeight,
            totalMobile: totalMobileHeight,
            totalDesktop: totalDesktopHeight,
          };

          // Optional: log for debugging (only when values change)
          if (process.env.NODE_ENV === 'development') {
            console.log('Layout Heights Updated:', {
              mobile: {
                home: mobileHomeHeight,
                main: mobileMainHeight,
                combined: mobileCombinedHeight,
              },
              desktop: {
                nav: desktopNavHeight,
              },
              footer: footerHeight,
              totals: {
                mobile: totalMobileHeight,
                desktop: totalDesktopHeight,
              },
            });
          }
        }

        rafIdRef.current = null;
      });
    };

    // Debounced update function (prevents excessive calls)
    const debouncedUpdate = () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(updateLayoutHeights, 16); // ~60fps
    };

    // Initial measurement (immediate, no debounce)
    updateLayoutHeights();

    // Create ResizeObserver to watch for size changes
    // Use debounced version for resize events
    const resizeObserver = new ResizeObserver(debouncedUpdate);

    // Observe all elements if they exist
    if (mobileHomeNavElement) {
      resizeObserver.observe(mobileHomeNavElement);
    }
    if (mobileMainNavElement) {
      resizeObserver.observe(mobileMainNavElement);
    }
    if (desktopNavElement) {
      resizeObserver.observe(desktopNavElement);
    }
    if (footerElement) {
      resizeObserver.observe(footerElement);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array - only run once on mount
}

// Keep legacy export for backwards compatibility
export const useMobileNavHeights = useLayoutHeights;
