const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: 'easeOut',
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.3,
    },
  },
};

export default containerVariants;
