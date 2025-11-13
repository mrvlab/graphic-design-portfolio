/**
 * Shared grid styles and constants for both home and contact page grids
 * This ensures consistency across both implementations without code duplication
 */

export const GRID_STYLES = {
  // Main grid container
  CONTAINER: 'relative lg:h-full',

  // Grid layout with 4 columns and 3 rows
  GRID: 'grid grid-cols-4 grid-rows-3 gap-x-[var(--horizontal-grid-spacing)] gap-y-[var(--vertical-grid-spacing)] h-full w-full lg:aspect-[16/9]',

  // Individual grid item layout (number + image box)
  GRID_ITEM: 'relative grid grid-cols-[auto_1fr] gap-4 w-fit',

  // Project number container
  PROJECT_NUMBER: 'flex px-3 w-fit justify-center',

  // Image/color box container
  IMAGE_CONTAINER: 'aspect-3/4 w-fit bg-cover bg-center',

  // Additional styles for relative positioning
  RELATIVE_POSITION: 'relative',

  // For overflow control on image containers
  OVERFLOW_HIDDEN: 'overflow-hidden',
} as const;

export const GRID_CONFIG = {
  COLUMNS: 4,
  ROWS: 3,
} as const;
