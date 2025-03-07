import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Experience } from '../types';

// Experience data
const experiences: Experience[] = [
  {
    id: 1,
    company: "Information Technology Services, University of Hawaii",
    position: "Fullstack Developer (API Lead)",
    duration: "Nov 2023 – Dec 2024",
    location: "Honolulu, HI",
    description: [
      "Maintained the UH Groupings website using Java and Spring Boot, implementing new features based on stakeholder input.",
      "Led API development for UH Groupings, a web service for organizing and managing groupings of people affiliated with the University of Hawaii.",
      "Created comprehensive API documentation and standardized project structures.",
      "Mentored junior developers and conducted in-person workshops on API technologies."
    ],
    technologies: ["Java", "Spring Boot", "Angular", "Next.js", "RESTful APIs", "API Documentation", "SQL", "Git"]
  }
];

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // 화면 크기에 따라 모바일 여부 감지
  useEffect(() => {
    const checkMobile = () => {
      // 모바일 감지 로직이 필요하면 여기에 구현
    };
    
    // 초기 체크
    checkMobile();
    
    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <div className="w-full py-12 md:py-16 relative">
      <motion.div
        className="max-w-5xl mx-auto px-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section heading */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 section-title">Work Experience</h2>
          <p className="text-base md:text-lg text-[var(--text-primary)] dark:text-zinc-300 max-w-2xl mx-auto font-medium">
            My professional journey and the projects I&apos;ve contributed to.
          </p>
        </div>
        
        {/* Experience cards */}
        <div className="relative">
          {/* Navigation buttons */}
          {experiences.length > 1 &&
            <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10">
              <motion.button
                onClick={handlePrev}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 flex items-center justify-center text-[var(--text-primary)] dark:text-white"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.button>
              
              <motion.button
                onClick={handleNext}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 flex items-center justify-center text-[var(--text-primary)] dark:text-white"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          }
          
          {/* Experience card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ 
                opacity: 0, 
                y: 20
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }}
              exit={{ 
                opacity: 0, 
                y: -20,
                transition: { duration: 0.3 }
              }}
              className="bg-gradient-to-br from-white/40 to-white/20 dark:from-white/10 dark:to-white/5 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-10 shadow-xl w-full"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
                {/* Company logo or icon - 모바일에서는 작게 표시하고 상단에 배치 */}
                <div className="flex-shrink-0 flex md:block justify-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-10 md:w-10 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                </div>
                
                {/* Experience details */}
                <div className="flex-grow">
                  {/* 모바일에서는 수직 레이아웃, 데스크톱에서는 수평 레이아웃 */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 md:mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-1">{experiences[activeIndex].position}</h3>
                      <p className="text-base md:text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-2">{experiences[activeIndex].company}</p>
                    </div>
                    <div className="mt-1 md:mt-0 md:text-right bg-white/20 dark:bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg self-start text-xs md:text-sm">
                      <p className="font-medium text-[var(--text-primary)] dark:text-zinc-300">{experiences[activeIndex].duration}</p>
                      <p className="font-medium text-[var(--text-primary)] dark:text-zinc-300">{experiences[activeIndex].location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-5 md:mb-8">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[var(--text-primary)] dark:text-white flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm.293 9.293a1 1 0 001.414 0L10 12.414l2.293 2.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 000 1.414z" clipRule="evenodd" />
                      </svg>
                      Responsibilities
                    </h4>
                    <ul className="space-y-2 md:space-y-3">
                      {experiences[activeIndex].description.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="text-[var(--text-primary)] dark:text-zinc-300 font-medium pl-5 md:pl-6 relative text-sm md:text-base"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="absolute left-0 top-1.5 md:top-2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-500"></span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[var(--text-primary)] dark:text-white flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {experiences[activeIndex].technologies.map((tech, index) => (
                        <motion.span 
                          key={index} 
                          className="px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.3)" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Pagination dots */}
          {experiences.length > 1 && (
            <div className="flex justify-center mt-6 md:mt-8 gap-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'bg-indigo-500 scale-125' 
                      : 'bg-zinc-400/30 hover:bg-zinc-400/50'
                  }`}
                  aria-label={`Go to experience ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}