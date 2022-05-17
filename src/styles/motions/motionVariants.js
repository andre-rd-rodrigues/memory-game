import { motion } from "framer-motion";

const containerVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0
  }
};

const horizontal = {
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
  },
  exit: {
    x: 90,
    opacity: 0,
    transition: {
      ease: "easeInOut"
    }
  }
};

const vertical = {
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
  exit: {
    y: -90,
    opacity: 0,
    transition: {
      type: "spring"
    }
  },
  viewport: { once: true }
};

export { containerVariant, horizontal, vertical, motion };
