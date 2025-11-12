/**
 * Animation timing and configuration constants
 */
export const ANIMATION_CONFIG = {
  SHIFT_INTERVAL: 250,
  SHIFT_START_OFFSET: 5,
  TOTAL_PROJECTS: 12,
  TRANSITION_DURATION: 0.7,
  HOVER_TRANSITION: 0.5,
} as const;

/**
 * Z-index layers for stacking context
 */
export const Z_INDEX = {
  BASE: 10,
  ELEVATED: 200,
  BLUR: 50,
} as const;
