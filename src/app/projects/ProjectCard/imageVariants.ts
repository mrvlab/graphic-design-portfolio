const imageVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hidden: {
    opacity: 0,
    y: 15,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export default imageVariants;
