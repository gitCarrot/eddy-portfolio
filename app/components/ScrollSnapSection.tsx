import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { fadeUpVariants } from '../lib/framer-motion';

interface ScrollSnapSectionProps {
  children: ReactNode;
}

export default function ScrollSnapSection({ 
  children, 
}: ScrollSnapSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Optimized animation wrapper with improved transitions for smoother scrolling
  return (
    <motion.div
      ref={ref}
      className="w-full max-w-7xl mx-auto will-change-transform"
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: false, 
        amount: 0.15,
        margin: "100px 0px" // Pre-load animations before they fully enter viewport
      }}
    >
      {children}
    </motion.div>
  );
}