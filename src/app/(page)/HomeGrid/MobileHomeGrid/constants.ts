export const CONFIG = {
  FIRST_ITEM_OFFSET: 140,
  ANIMATION_DURATION: 0.7,
  SCROLL_TOLERANCE: 20,
  SYNC_DEBOUNCE: 100,
  INIT_DELAY: 100,
  DESKTOP_BREAKPOINT: 1024,
} as const;

export const Z_INDEX = {
  BASE: 10,
  BLUR: 50,
  ELEVATED: 200,
} as const;

export const TITLE_ANIMATION = {
  initial: { opacity: 0, scale: 0.9 },
  duration: 0.5,
  ease: 'easeInOut',
} as const;

export const getNavHeight = (): number => {
  if (typeof window === 'undefined') return 98;
  const cssVar = getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-total-mobile')
    .trim();
  return cssVar ? parseInt(cssVar, 10) : 98;
};
