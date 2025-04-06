const imageVariants = {
  visible: {
    opacity: 1,
    transform: 'none',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  hidden: {
    opacity: 0,
    transform: 'translateY(0)', // Prevent vertical shift
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default imageVariants;
