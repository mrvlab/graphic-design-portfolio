import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '../constants';
import { GRID_STYLES } from '../gridStyles';

type IProjectNumber = {
  index: number;
  isHovered: boolean;
};

/**
 * Displays project number with animated parentheses on hover
 */
export function ProjectNumber({ index, isHovered }: IProjectNumber) {
  return (
    <div className={GRID_STYLES.PROJECT_NUMBER}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{
          duration: ANIMATION_CONFIG.TRANSITION_DURATION,
          ease: 'easeInOut',
        }}
      >
        (&nbsp;
      </motion.span>
      <span>{(index + 1).toFixed(1)}</span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{
          duration: ANIMATION_CONFIG.TRANSITION_DURATION,
          ease: 'easeInOut',
        }}
      >
        &nbsp;)
      </motion.span>
    </div>
  );
}
