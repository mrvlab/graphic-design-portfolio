/**
 * Shared grid styles and constants for both home and contact page mobile grids
 * This ensures consistency across both implementations without code duplication
 */

export const MOBILE_GRID_STYLES = {
  // Main container wrapper
  CONTAINER: 'relative',
  
  // Grid layout base classes (combines with CSS class mobile-home-grid)
  GRID_BASE: 'gap-y-16 gap-x-24 px-12 sm:max-w-[70%]',
  
  // Grid item outer wrapper
  GRID_ITEM_OUTER: 'relative',
  
  // Grid item inner container (CSS class from globals)
  GRID_ITEM_INNER: 'mobile-home-grid-item',
  
  // Project number container
  PROJECT_NUMBER: 'flex w-full justify-center lg:hidden',
  
  // Image container with aspect ratio
  IMAGE_CONTAINER: 'relative aspect-3/4',
  
  // Absolute positioned layers (color/image)
  LAYER_ABSOLUTE: 'absolute inset-0',
} as const;

export const MOBILE_GRID_CONFIG = {
  COLUMNS: 2,
  GAP_Y: 16,
  GAP_X: 24,
  PADDING_X: 12,
} as const;

