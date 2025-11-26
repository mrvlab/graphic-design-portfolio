'use client';

import { memo } from 'react';
import { useLayoutHeights } from '@/utils/useLayoutHeights';

/**
 * Client component that tracks layout element heights (navigation and footer)
 * for both mobile and desktop, and updates CSS custom properties dynamically.
 *
 * Performance optimized with React.memo to prevent unnecessary re-renders.
 * Place this component once in your root layout to enable
 * automatic height tracking for headers and footers.
 */
function LayoutHeightTrackerComponent() {
  useLayoutHeights();

  // This component doesn't render anything
  return null;
}

// Memoize to prevent unnecessary re-renders
export const LayoutHeightTracker = memo(LayoutHeightTrackerComponent);

// Keep legacy export for backwards compatibility
export const MobileNavHeightTracker = LayoutHeightTracker;
