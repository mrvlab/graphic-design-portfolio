export const entranceOverlay = {
  storage: {
    /** Key to track if user has seen/dismissed the entrance overlay */
    hasEnteredKey: "entrance-overlay-seen",
  },

  /** CSS class names applied to document element */
  classes: {
    /** Class added when content should be visible behind overlay */
    contentVisible: "entrance-content-visible",
    /** Class added when user has entered the site */
    userEntered: "user-has-entered",
    /** Class added when overlay is ready to show */
    overlayReady: "overlay-ready",
  },
} as const;
