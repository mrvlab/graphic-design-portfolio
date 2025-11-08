"use client";

import { useEffect, useRef } from "react";

/**
 * Custom hook that dynamically measures mobile navigation heights
 * and updates CSS custom properties on the document root.
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
 *
 * Updates CSS variables:
 * - --mobile-nav-home-height
 * - --mobile-nav-height
 * - --mobile-nav-combined-height (combined)
 */
export function useMobileNavHeights() {
  // Track previous values to avoid unnecessary updates
  const prevHeightsRef = useRef({ home: 0, main: 0, combined: 0 });
  const rafIdRef = useRef<number | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Get references to the nav elements
    const homeNavElement = document.getElementById("mobile-nav-home");
    const mainNavElement = document.getElementById("mobile-nav-height");

    if (!homeNavElement && !mainNavElement) {
      // No nav elements found, skip measurement
      return;
    }

    const root = document.documentElement;

    // Function to measure and update CSS variables
    const updateNavHeights = () => {
      // Cancel any pending RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Use RAF for optimal performance
      rafIdRef.current = requestAnimationFrame(() => {
        let homeHeight = 0;
        let mainHeight = 0;

        // Measure home nav height
        if (homeNavElement) {
          homeHeight = homeNavElement.offsetHeight;
        }

        // Measure main nav height
        if (mainNavElement) {
          mainHeight = mainNavElement.offsetHeight;
        }

        // Calculate combined height
        const combinedHeight = homeHeight + mainHeight;

        // Only update if values changed (avoid unnecessary reflows)
        const prev = prevHeightsRef.current;
        if (
          prev.home !== homeHeight ||
          prev.main !== mainHeight ||
          prev.combined !== combinedHeight
        ) {
          // Batch DOM writes for better performance
          root.style.setProperty("--mobile-nav-home-height", `${homeHeight}px`);
          root.style.setProperty("--mobile-nav-height", `${mainHeight}px`);
          root.style.setProperty(
            "--mobile-nav-combined-height",
            `${combinedHeight}px`
          );

          // Update previous values
          prevHeightsRef.current = {
            home: homeHeight,
            main: mainHeight,
            combined: combinedHeight,
          };

          // Optional: log for debugging (only when values change)
          if (process.env.NODE_ENV === "development") {
            console.log("Mobile Nav Heights Updated:", {
              home: homeHeight,
              main: mainHeight,
              combined: combinedHeight,
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
      debounceTimeoutRef.current = setTimeout(updateNavHeights, 16); // ~60fps
    };

    // Initial measurement (immediate, no debounce)
    updateNavHeights();

    // Create ResizeObserver to watch for size changes
    // Use debounced version for resize events
    const resizeObserver = new ResizeObserver(debouncedUpdate);

    // Observe both elements if they exist
    if (homeNavElement) {
      resizeObserver.observe(homeNavElement);
    }
    if (mainNavElement) {
      resizeObserver.observe(mainNavElement);
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
