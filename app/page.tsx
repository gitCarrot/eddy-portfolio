'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Add classes for scroll snap
    document.documentElement.classList.add('has-scroll-snap');
    document.body.classList.add('has-scroll-snap');
    
    return () => {
      clearTimeout(timeout);
      document.documentElement.classList.remove('has-scroll-snap');
      document.body.classList.remove('has-scroll-snap');
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 text-white"
          >
            <motion.div
              className="mb-8 text-3xl font-bold tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              EDDY JEON
            </motion.div>
            
            <motion.div
              className="relative w-16 h-16"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-indigo-600"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white opacity-40"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* 배경 그라디언트 요소들 - 연한 파스텔톤 애니메이션 */}
            <div id="gradient-bg-hero" className="continuous-bg bg-hero" style={{ opacity: 1 }}></div>
            <div id="gradient-bg-about" className="continuous-bg bg-about" style={{ opacity: 0 }}></div>
            <div id="gradient-bg-projects" className="continuous-bg bg-projects" style={{ opacity: 0 }}></div>
            <div id="gradient-bg-experience" className="continuous-bg bg-experience" style={{ opacity: 0 }}></div>
            <div id="gradient-bg-skills" className="continuous-bg bg-skills" style={{ opacity: 0 }}></div>
            <div id="gradient-bg-contact" className="continuous-bg bg-contact" style={{ opacity: 0 }}></div>
            
            <Navbar />
            <main className="scroll-container" ref={containerRef}>
              <motion.section 
                id="hero" 
                className="section text-white"
              >
                <div className="section-content">
                  <HeroSection />
                </div>
              </motion.section>
              
              <motion.section 
                id="about" 
                className="section text-white"
              >
                <div className="section-content">
                  <AboutSection />
                </div>
                <motion.div 
                  className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 opacity-50 z-20 pb-8"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <a href="#projects" className="text-[var(--text-primary)] dark:text-white/70 hover:text-[var(--accent-blue)] dark:hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                </motion.div>
              </motion.section>
              
              <motion.section 
                id="projects" 
                className="section text-white"
              >
                <div className="section-content overflow-visible py-12 md:py-0">
                  <ProjectsSection />
                </div>
                <motion.div 
                  className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 opacity-50 z-20 pb-8"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <a href="#skills" className="text-[var(--text-primary)] dark:text-white/70 hover:text-[var(--accent-blue)] dark:hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                </motion.div>
              </motion.section>
              
              <motion.section
                id="experience" 
                className="section text-white"
              >
                <div className="section-content">
                  <ExperienceSection />
                </div>
                <motion.div 
                  className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 opacity-50 z-20 pb-8"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <a href="#skills" className="text-[var(--text-primary)] dark:text-white/70 hover:text-[var(--accent-blue)] dark:hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                </motion.div>
              </motion.section>
              
              <motion.section
                id="skills" 
                className="section text-white"
              >
                <div className="section-content">
                  <SkillsSection />
                </div>
                <motion.div 
                  className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 opacity-50 z-20 pb-8"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <a href="#contact" className="text-[var(--text-primary)] dark:text-white/70 hover:text-[var(--accent-blue)] dark:hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                </motion.div>
              </motion.section>
              
              <motion.section 
                id="contact" 
                className="section text-white"
              >
                <div className="section-content">
                  <ContactSection />
                </div>
                <motion.footer
                  className="absolute bottom-4 left-0 right-0 py-4 text-center text-sm text-zinc-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p>© {new Date().getFullYear()} Eddy Jeon. All rights reserved.</p>
                </motion.footer>
              </motion.section>
            </main>
            
            {/* Footer moved to the contact section */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
