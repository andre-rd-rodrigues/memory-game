const containerVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const horizontalEntrance = {
  hidden: {
    opacity: 0,
    x: -90
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring"
    }
  }
};

const verticalEntrance = {
  hidden: {
    opacity: 0,
    y: -90
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring"
    }
  },
  viewport: { once: true }
};

export { containerVariant, horizontalEntrance, verticalEntrance };
