import { useState, useEffect, useLayoutEffect } from "react";
import { entranceOverlay } from "./entranceOverlayConstants";

/**
 * Custom hook to check if user has entered the site (dismissed entrance overlay)
 *
 * This hook is optimized for:
 * - SEO: Returns false on server-side, preventing hydration mismatches
 * - Performance: Checks sessionStorage synchronously before paint
 * - Reactivity: Watches for real-time changes when user enters during session
 *
 * Note: Components using this hook should use suppressHydrationWarning to prevent
 * React warnings about server/client mismatches.
 *
 * @returns boolean - true if user has entered the site, false otherwise
 */
export function useHasEnteredSite(): boolean {
  // Check sessionStorage immediately on first render (client-side only)
  const [hasEntered, setHasEntered] = useState(() => {
    if (typeof window === "undefined") return false;
    const entered =
      sessionStorage.getItem(entranceOverlay.storage.hasEnteredKey) === "true";
    return entered;
  });

  // Use useLayoutEffect to update BEFORE paint (prevents flash)
  useLayoutEffect(() => {
    // Check entered state synchronously
    const entered =
      sessionStorage.getItem(entranceOverlay.storage.hasEnteredKey) ===
        "true" ||
      document.documentElement.classList.contains(
        entranceOverlay.classes.userEntered
      );

    if (entered !== hasEntered) {
      setHasEntered(entered);
    }
  }, [hasEntered]);

  // Use regular useEffect for the observer (doesn't need to block paint)
  useEffect(() => {
    const checkEntered = () => {
      const entered =
        sessionStorage.getItem(entranceOverlay.storage.hasEnteredKey) ===
          "true" ||
        document.documentElement.classList.contains(
          entranceOverlay.classes.userEntered
        );

      if (entered !== hasEntered) {
        setHasEntered(entered);
      }
    };

    // Watch for the entrance overlay class being added/removed
    const observer = new MutationObserver(() => {
      checkEntered();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [hasEntered]);

  return hasEntered;
}
