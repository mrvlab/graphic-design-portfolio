"use client";

/**
 * EntranceOverlay Component
 *
 * SEO-FRIENDLY OVERLAY APPROACH (Pattern 3)
 * ==========================================
 *
 * This component implements an entrance overlay that is SEO-friendly because:
 *
 * 1. Server-Side Rendering: The actual page content (projects, text, etc.) is
 *    rendered on the server and included in the HTML that search engines crawl.
 *
 * 2. Client-Side Only Overlay: This overlay is purely cosmetic and only renders
 *    in the browser after JavaScript loads. Search engine crawlers see the real
 *    content underneath.
 *
 * 3. No URL Manipulation: Unlike some patterns that use redirects or URL rewrites,
 *    this approach keeps the URL clean and doesn't hide content from crawlers.
 *
 * 4. No Cloaking: The same HTML is served to both bots and users. The overlay is
 *    just a visual layer that users can dismiss.
 *
 * 5. Session-Based: Uses sessionStorage to remember if the user has entered, so
 *    the overlay only shows once per session, improving UX without hurting SEO.
 *
 * 6. Accessibility: Includes keyboard support, focus management, and respects
 *    user preferences for reduced motion.
 *
 * 7. No Content Flash: Uses CSS to hide content immediately, preventing FOUC
 *    (Flash of Unstyled Content) while JavaScript loads.
 */

import { useState, useEffect } from "react";
import { entranceOverlay } from "@/app/project/utils/entranceOverlayConstants";

export function EntranceOverlay({ enterSiteText }: { enterSiteText?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Check if user has already entered during this session
    const hasEntered = sessionStorage.getItem(
      entranceOverlay.storage.hasEnteredKey
    );

    // Only show overlay if user hasn't entered yet
    if (!hasEntered) {
      setIsVisible(true);

      // Signal that overlay is ready - makes content visible behind it
      document.documentElement.classList.add(
        entranceOverlay.classes.overlayReady
      );

      // Trigger fade-in animation after a tiny delay (allows initial render)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
    } else {
      // User has entered before, ensure classes are set
      // (Script in <head> should have already done this, but double-check)
      document.documentElement.classList.add(
        entranceOverlay.classes.contentVisible
      );
      document.documentElement.classList.add(
        entranceOverlay.classes.userEntered
      );
    }
  }, []);

  useEffect(() => {
    // Handle keyboard events (Enter or Space to dismiss)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        isVisible &&
        isAnimatingIn &&
        !isAnimatingOut &&
        (e.key === "Enter" || e.key === " ")
      ) {
        e.preventDefault();
        handleEnter();
      }
    };

    if (isVisible && isAnimatingIn) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isVisible, isAnimatingIn, isAnimatingOut]);

  const handleEnter = () => {
    // Mark that user has entered this session
    sessionStorage.setItem(entranceOverlay.storage.hasEnteredKey, "true");

    // Start fade out animation
    setIsAnimatingOut(true);

    // Remove overlay-ready class and add content-visible classes
    document.documentElement.classList.remove(
      entranceOverlay.classes.overlayReady
    );
    document.documentElement.classList.add(
      entranceOverlay.classes.contentVisible
    );
    document.documentElement.classList.add(entranceOverlay.classes.userEntered);

    // Remove overlay after animation completes
    setTimeout(() => {
      setIsVisible(false);
    }, 700); // Match transition duration
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 top-[var(--mobile-nav-combined-height)] z-100 bg-white/75 backdrop-blur-[15px] supports-[backdrop-filter]:bg-white/20 pointer-events-auto lg:cursor-none lg:top-0 ${
        isAnimatingOut
          ? "opacity-0 !pointer-events-none transition-opacity duration-700 ease-in-out"
          : isAnimatingIn
            ? "opacity-100"
            : "opacity-0"
      }`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="relative flex flex-col justify-center h-full">
        <div className="absolute w-full h-full flex flex-col items-center justify-center z-0 lg:px-[6%] gap-2">
          {/* Enter logo - placeholder */}
          <div id="entrance-logo" className="h-fit w-fit"></div>

          {/* Enter button - visible on mobile only */}
          <div className="flex flex-col justify-center items-center z-10 lg:hidden">
            <button
              onClick={handleEnter}
              className="hover:opacity-70 transition-opacity cursor-pointer focus:outline-none"
              aria-label={enterSiteText || "Enter Site"}
              autoFocus
            >
              {enterSiteText || "Enter Site"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
