# Desktop Color Swap Home Grid Animation

## Overview

The Desktop Color Swap Home Grid implements a sophisticated loading animation that creates a "ladder effect" by:
1. Continuously shifting colors through a 12-position grid
2. Loading images sequentially as the animation progresses
3. Replacing color blocks with images instantly upon load

## Visual Layout

```
Desktop Grid (4 columns × 3 rows):

Position:  1      2      3      4
          [1.0]  [2.0]  [3.0]  [4.0]

Position:  5      6      7      8
          [5.0]  [6.0]  [7.0]  [8.0]

Position:  9     10     11     12
          [9.0]  [10.0] [11.0] [12.0]
```

## Initial State (Before Animation Starts)

```
Project Colors at Initial Positions:

Position 1:  Project 1  (color: #377724 - green)
Position 2:  Project 2  (color: #A9ADAC - gray)
Position 3:  Project 3  (color: #AA7026 - brown)
Position 4:  Project 4  (color: #A6947E - tan)
Position 5:  Project 5  (color: #000000 - black)
Position 6:  Project 6  (color: #DAD5B3 - beige)
Position 7:  Project 7  (color: #9FAFBA - blue-gray)
Position 8:  Project 8  (color: #4C192A - burgundy)
Position 9:  Project 9  (color: #C11D69 - pink)
Position 10: Project 10 (color: #D2AB91 - peach)
Position 11: Project 11 (color: #000000 - black)
Position 12: Project 12 (color: #6D80AB - blue)
```

## Color Shifting Mechanism

### How Colors Move

**Direction**: Colors shift RIGHT, with position 12 wrapping to position 1 (circular rotation)

**Algorithm**:
```
Before Shift:
  temp = color at position 12

Shift Process:
  position 12 gets color from position 11
  position 11 gets color from position 10
  position 10 gets color from position 9
  ...
  position 2 gets color from position 1
  position 1 gets temp (wrapped from position 12)

After Shift:
  All colors have moved one position to the right
  Position 12's color is now at position 1
```

### Shift Timing
- **Interval**: 250ms per shift
- **Transition Duration**: 200ms (GSAP animation)
- **Easing**: `power2.inOut`

## Animation Sequence

### Trigger
Animation starts when user clicks "Enter" on the entrance overlay (`user-has-entered` class is added to `<html>`).

### Detailed Shift-by-Shift Sequence

```
=== SHIFT 1 ===
Duration: 250ms
Colors: Position 12 → Position 1, all others shift right
Image Load: None

=== SHIFT 2 ===
Duration: 250ms
Colors: Position 12 → Position 1, all others shift right
Image Load: None

=== SHIFT 3 ===
Duration: 250ms
Colors: Position 12 → Position 1, all others shift right
Image Load: None

=== SHIFT 4 ===
Duration: 250ms
Colors: Position 12 → Position 1, all others shift right
Image Load: None

=== SHIFT 5 ===
Duration: 250ms
Colors: Position 12 → Position 1, all others shift right
Image Load: ✓ Project 1's image loads at Position 1
  - Color #377724 has now reached position 6
  - Image appears INSTANTLY at position 1 (no fade)

=== SHIFT 6 ===
Duration: 250ms
Colors: Continue shifting (except position 1 - image locked)
Image Load: ✓ Project 2's image loads at Position 2
  - Image appears INSTANTLY at position 2

=== SHIFT 7 ===
Duration: 250ms
Image Load: ✓ Project 3's image loads at Position 3

=== SHIFT 8 ===
Duration: 250ms
Image Load: ✓ Project 4's image loads at Position 4

=== SHIFT 9 ===
Duration: 250ms
Image Load: ✓ Project 5's image loads at Position 5

=== SHIFT 10 ===
Duration: 250ms
Image Load: ✓ Project 6's image loads at Position 6

=== SHIFT 11 ===
Duration: 250ms
Image Load: ✓ Project 7's image loads at Position 7

=== SHIFT 12 ===
Duration: 250ms
Image Load: ✓ Project 8's image loads at Position 8

=== SHIFT 13 ===
Duration: 250ms
Image Load: ✓ Project 9's image loads at Position 9

=== SHIFT 14 ===
Duration: 250ms
Image Load: ✓ Project 10's image loads at Position 10

=== SHIFT 15 ===
Duration: 250ms
Image Load: ✓ Project 11's image loads at Position 11

=== SHIFT 16 ===
Duration: 250ms
Image Load: ✓ Project 12's image loads at Position 12
Animation: STOPS - All images loaded
```

### Total Animation Time
- **Duration**: ~4 seconds (16 shifts × 250ms)
- **Start Delay**: Begins immediately after user clicks "Enter"

## Image Loading Behavior

### Loading Logic
```javascript
// Image loads based on shift count
const projectIndexToLoad = shiftCountRef.current - 5;

// Shift 5 → load project 0 (index 0 = Project 1)
// Shift 6 → load project 1 (index 1 = Project 2)
// etc.
```

### Image Load Position
**Important**: Each image loads at its **ORIGINAL position**, NOT where its color currently is.

Example:
- Project 1 starts at position 1 with color #377724
- After 5 shifts, color #377724 is at position 6
- But Project 1's **image loads at position 1** (its original spot)

### Transition Type
- **Color to Image**: INSTANT swap (no fade, no delay)
- **Implementation**: 
  ```javascript
  gsap.set(colorPlaceholder, { opacity: 0 });  // Hide color instantly
  gsap.set(imageContainer, { opacity: 1 });    // Show image instantly
  ```

## Technical Implementation

### State Management

**Box State Structure**:
```typescript
interface BoxState {
  currentProjectIndex: number;  // Which project color is at this position
  loaded: boolean;               // Has the image loaded?
  color: string;                 // Current color (for reference)
  imageLoaded: boolean;          // Image load status
}
```

### Key Refs
- `shiftCountRef`: Tracks total number of shifts (used for image loading timing)
- `loadedProjectsRef`: Set of project indices that have loaded (prevents duplicate loads)
- `boxRefs`: References to color placeholder divs (for GSAP animations)
- `imageRefs`: References to image container divs (for opacity control)

### Animation Control

**Start Condition**:
```javascript
if (hasEntered && boxes.length > 0 && !animationStartedRef.current)
```

**Stop Condition**:
```javascript
if (loadedProjectsRef.current.size < 12) {
  // Continue shifting
  setTimeout(shift, 250);
} else {
  // All 12 images loaded - stop animation
  console.log('All images loaded - animation stopped!');
}
```

## Console Logging

The animation logs detailed information for debugging:

```
=== Shift 1 START ===
Before shift - Position 12 has project: 12 color: #6D80AB
After shift - Position 1 now has project: 12 color: #6D80AB
After shift - Position 12 now has project: 11 color: #000000

Shift 1: Checking if should load project 0
(no load - shift count is 1, needs to be 5)

...

=== Shift 5 START ===
Before shift - Position 12 has project: 8 color: #4C192A
After shift - Position 1 now has project: 8 color: #4C192A
After shift - Position 12 now has project: 7 color: #9FAFBA

Shift 5: Checking if should load project 1
✓ Loaded Project 1 at position 1 - Total: 1/12
```

## Grid Layout Behavior

### Before User Enters
```css
grid-cols-2  /* 2 columns on mobile/tablet */
```

### After User Enters
```css
grid-cols-1  /* 1 column - starts transition */
lg:grid-cols-4  /* 4 columns on desktop */
```

### Transition
- Layout changes occur simultaneously with the color animation
- Creates a smooth, unified entrance effect

## Data Requirements

Each project must have:
```typescript
{
  title: string;      // Project name
  color: string;      // Hex color code (e.g., "#377724")
  image: string;      // Image URL
}
```

## Performance Considerations

1. **GSAP**: Optimized for 60fps animations
2. **Image Preloading**: Images load progressively during animation
3. **State Updates**: Minimal re-renders using refs for animation control
4. **Cleanup**: GSAP timeline killed on component unmount

## Customization Options

### Timing Adjustments
```javascript
// Shift speed
setTimeout(shift, 250);  // Change 250ms to adjust

// Color transition speed
duration: 0.2,  // Change to adjust smoothness
```

### Animation Start Delay
```javascript
// In startAnimation()
duration: 0.1,  // Delay before first shift starts
```

### Image Load Offset
```javascript
// When to start loading images
const projectIndexToLoad = shiftCountRef.current - 5;
// Change the "-5" to start earlier/later
```

## Future Enhancements

Potential improvements:
- [ ] Configurable animation speed via props
- [ ] Pause/resume functionality
- [ ] Reverse animation option
- [ ] Custom easing functions per project
- [ ] Stagger effects within each shift
- [ ] Mobile animation variant (currently desktop-only)

## Troubleshooting

### Animation doesn't start
- Check that `user-has-entered` class is on `<html>` element
- Verify `hasEntered` state is true
- Check console for image load errors

### Colors not shifting
- Verify GSAP is imported
- Check boxRefs are populated
- Look for JavaScript errors in console

### Images not loading
- Check image URLs are valid
- Verify `mediaGallery.mediaItems[0].asset.url` exists
- Check network tab for 404s

### Animation doesn't stop
- Verify all 12 projects have valid images
- Check `loadedProjectsRef.current.size` reaches 12
- Look for errors during image loading

## Related Files

- `DesktopColorSwapHomeGrid/index.tsx` - Main component
- `MobileHomeGrid/index.tsx` - Static mobile version (no animation)
- `page.tsx` - Data transformation and grid rendering
- `HomeGridCursor/index.tsx` - Entrance overlay trigger

