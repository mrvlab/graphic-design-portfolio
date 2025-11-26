import React from 'react';
import { motion } from 'framer-motion';

const HoverOverlay = () => {
  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-[20px] pointer-events-none z-50 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.7,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default HoverOverlay;
