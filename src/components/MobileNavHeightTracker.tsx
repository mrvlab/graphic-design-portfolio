"use client";

import { memo } from "react";
import { useMobileNavHeights } from "@/utils/useMobileNavHeights";

/**
 * Client component that tracks mobile navigation heights
 * and updates CSS custom properties dynamically.
 *
 * Performance optimized with React.memo to prevent unnecessary re-renders.
 * Place this component once in your layout to enable
 * automatic height tracking for mobile navigation.
 */
function MobileNavHeightTrackerComponent() {
  useMobileNavHeights();

  // This component doesn't render anything
  return null;
}

// Memoize to prevent unnecessary re-renders
export const MobileNavHeightTracker = memo(MobileNavHeightTrackerComponent);

