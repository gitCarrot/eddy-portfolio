import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  // Refs for animation triggers
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  
  // Check if elements are in view
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };
  
  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center py-6 md:py-10 px-4 sm:px-6" ref={sectionRef}>
      {/* 배경 패턴 유지 */}
      <div className="absolute inset-0 opacity-5 bg-grid-pattern -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent -z-10" />
      
      <div className="max-w-3xl w-full mx-auto">
        {/* 섹션 제목 */}
        <motion.div 
          className="mb-8 md:mb-12 text-center relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold section-title inline-block tracking-tight">
            About Me
          </h2>
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
        
        {/* 텍스트 섹션 */}
        <motion.div
          ref={textRef}
          initial="hidden"
          animate={isTextInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div variants={slideUp} className="mb-6">
            <h3 className="text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-2">Eddy Jeon</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="inline-block h-0.5 w-10 bg-indigo-500"></span>
              <span className="text-indigo-500 dark:text-indigo-400 font-medium">Software Engineer</span>
              <span className="inline-block h-0.5 w-10 bg-indigo-500"></span>
            </div>
          </motion.div>
          
          <div className="flex flex-col items-center space-y-2 mb-6">
            <motion.div variants={slideUp} className="flex items-center gap-2 text-sm text-[var(--text-primary)] dark:text-zinc-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Honolulu, Hawaii</span>
            </motion.div>
            
            <motion.div variants={slideUp} className="flex items-center gap-2 text-sm text-[var(--text-primary)] dark:text-zinc-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              <span>B.S. in Computer Science, University of Hawaii at Manoa (2020-2024)</span>
            </motion.div>
          </div>
          
          <motion.div 
            variants={fadeIn}
            className="space-y-4 mb-8 max-w-2xl mx-auto"
          >
            <motion.p 
              variants={slideUp}
              className="text-[var(--text-primary)] dark:text-zinc-300 text-base leading-relaxed"
            >
              I&apos;m a passionate software engineer focused on creating elegant, user-friendly web applications. With expertise in both frontend and backend technologies, I build solutions that solve real-world problems.
            </motion.p>
            
            <motion.p 
              variants={slideUp}
              className="text-[var(--text-primary)] dark:text-zinc-300 text-base leading-relaxed"
            >
              When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community engagement.
            </motion.p>
          </motion.div>
          
          {/* 모던한 버튼 - Hero 섹션과 동일한 오렌지 그라데이션 */}
          <motion.div variants={slideUp} className="mt-20">
            <motion.a
              href="#contact"
              className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium transition-all"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 20px rgba(255, 120, 50, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center gap-2">
                Get in touch
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </motion.svg>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}