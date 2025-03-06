import { Variants } from 'framer-motion';

// Fade up animation for sections - optimized for smoother scrolling
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Staggered animation for lists of items
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Staggered item animation
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.165, 0.84, 0.44, 1]
    }
  }
};

// Scroll-triggered reveal
export const revealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.165, 0.84, 0.44, 1]
    }
  }
};

// 3D tilt effect for cards (used with useMotionValue)
export const tiltVariants: Variants = {
  hover: {
    rotateX: 0,
    rotateY: 0,
    scale: 1.05,
    transition: { 
      duration: 0.3, 
      ease: "easeOut" 
    }
  }
};