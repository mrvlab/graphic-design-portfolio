const containerVariants = {
  visible: {
    opacity: 1,
    transform: 'none',
    transition: {
      staggerChildren: 0.14,
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transform: 'translateY(0)', // Prevent vertical shift
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.2,
    },
  },
};

export default containerVariants;
