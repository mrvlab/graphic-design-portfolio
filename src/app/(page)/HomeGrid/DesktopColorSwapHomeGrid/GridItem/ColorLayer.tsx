import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '../constants';

type IColorLayer = {
  boxRef: (el: HTMLDivElement | null) => void;
  currentColor: string;
  shouldShowColor: boolean;
};

/**
 * Animated color background layer that shifts during animation
 */
export function ColorLayer({
  boxRef,
  currentColor,
  shouldShowColor,
}: IColorLayer) {
  return (
    <motion.div
      ref={boxRef}
      className="absolute inset-0"
      initial={{ opacity: 1, backgroundColor: currentColor }}
      animate={{
        opacity: shouldShowColor ? 1 : 0,
        backgroundColor: currentColor,
      }}
      transition={{
        opacity: {
          duration: ANIMATION_CONFIG.TRANSITION_DURATION,
          ease: 'easeInOut',
        },
        backgroundColor: {
          duration: 0.2,
          ease: 'easeInOut',
        },
      }}
    />
  );
}
