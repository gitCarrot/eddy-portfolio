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
  const [direction, setDirection] = useState(0);

  // 화면 크기에 따라 모바일 여부 감지
  useEffect(() => {
    const checkMobile = () => {
      // setIsMobile(window.innerWidth < 768);
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
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const indicatorVariants = {
    inactive: { scale: 1, opacity: 0.5 },
    active: { 
      scale: 1.2, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="w-full">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6">Experience</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          My professional journey and work experience
        </p>
      </motion.div>

      {/* 고정된 높이 대신 min-height 사용하고 overflow-visible로 변경 */}
      <div className="relative min-h-[440px] overflow-visible mb-16">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
            style={{ perspective: 2000 }}
          >
            <div className="max-w-4xl mx-auto perspective-card">
              {/* 모바일에서 패딩 조정 */}
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-xl p-1">
                {/* Card header - 모바일에서 패딩 줄임 */}
                <div className="bg-black/30 p-4 md:p-6 rounded-t-lg border-b border-white/10">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-0">{experiences[activeIndex].position}</h3>
                    <span className="text-indigo-300 font-medium text-sm md:text-base">{experiences[activeIndex].duration}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <p className="text-lg md:text-xl text-white/90">{experiences[activeIndex].company}</p>
                    <p className="text-zinc-400 italic text-sm">{experiences[activeIndex].location}</p>
                  </div>
                </div>
                
                {/* Card content - 모바일에서 패딩 줄임 */}
                <div className="p-4 md:p-6 text-zinc-300">
                  <ul className="list-disc list-inside space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base">
                    {experiences[activeIndex].description.map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {experiences[activeIndex].technologies.map((tech, index) => (
                      <motion.span 
                        key={index}
                        className="bg-indigo-900/40 text-indigo-200 text-xs py-1 px-2 md:px-3 rounded-full backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 + 0.5 }}
                        whileHover={{ 
                          backgroundColor: "rgba(99, 102, 241, 0.4)", 
                          scale: 1.05,
                        }}
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

        {/* Navigation buttons - 모바일에서 위치 조정 */}
        <motion.button
          className="absolute left-2 md:left-10 top-1/3 md:top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-indigo-900/40 transition-colors z-10"
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.button>
        
        <motion.button
          className="absolute right-2 md:right-10 top-1/3 md:top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-indigo-900/40 transition-colors z-10"
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </motion.button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4 md:mt-8 gap-2">
        {experiences.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-indigo-500' : 'bg-zinc-600'}`}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1);
              setActiveIndex(index);
            }}
            variants={indicatorVariants}
            animate={activeIndex === index ? "active" : "inactive"}
          />
        ))}
      </div>
    </div>
  );
}