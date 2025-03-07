import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function HeroSection() {
  const [carrotRotation, setCarrotRotation] = useState(0);
  const [carrotScale, setCarrotScale] = useState(1);
  const [carrotHover, setCarrotHover] = useState(false);
  const [showRabbit, setShowRabbit] = useState(false);
  const [rabbitPosition, setRabbitPosition] = useState({ x: 0, y: 0 });
  const [rabbitCount, setRabbitCount] = useState(0);
  const carrotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 당근 애니메이션 시작
    setTimeout(startCarrotAnimation, 1000);
  }, []);
  
  // 당근 애니메이션 시작
  const startCarrotAnimation = () => {
    // 랜덤 회전 각도 (-15도 ~ 15도)
    const randomRotation = Math.random() * 30 - 15;
    setCarrotRotation(randomRotation);
    
    // 랜덤 스케일 (1.0 ~ 1.2)
    const randomScale = 1 + Math.random() * 0.2;
    setCarrotScale(randomScale);
    
    // 0.5초 후 원래 상태로 복귀
    setTimeout(() => {
      setCarrotRotation(0);
      setCarrotScale(1);
    }, 500);
  };
  
  // 당근 클릭 시 토끼 애니메이션 시작
  const handleCarrotClick = () => {
    // 당근 애니메이션 시작
    startCarrotAnimation();
    
    // 토끼 카운트 증가
    setRabbitCount(prev => prev + 1);
    
    // 랜덤 위치 계산 (당근 주변)
    const randomX = (Math.random() * 200) - 100; // -100px ~ 100px
    const randomY = (Math.random() * 100) - 50;  // -50px ~ 50px
    
    // 토끼 위치 설정
    setRabbitPosition({ x: randomX, y: randomY });
    
    // 토끼 표시
    setShowRabbit(true);
    
    // 3초 후 토끼 숨기기
    setTimeout(() => {
      setShowRabbit(false);
    }, 3000);
  };
  
  return (
    <section id="hero" className="section relative overflow-hidden">
      {/* 섹션 콘텐츠 */}
      <div ref={containerRef} className="section-content flex flex-col items-center justify-center pt-0 sm:pt-0 pb-20 sm:pb-24 relative z-10 min-h-screen">
        {/* 당근 이모티콘 */}
        <div className="relative">
          <motion.div
            ref={carrotRef}
            className="relative mb-4 sm:mb-6 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: carrotHover ? carrotScale * 1.1 : carrotScale,
              rotate: carrotRotation
            }}
            transition={{ 
              duration: 0.5,
              rotate: { duration: 0.3 }
            }}
            onMouseEnter={() => setCarrotHover(true)}
            onMouseLeave={() => setCarrotHover(false)}
            onClick={handleCarrotClick}
            style={{ 
              transformOrigin: 'center',
              cursor: 'pointer',
              fontSize: '4rem',
              lineHeight: '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '80px',
              height: '80px'
            }}
          >
            <span role="img" aria-label="carrot" style={{ fontSize: '4rem' }}>🥕</span>
          </motion.div>
          
          {/* 토끼 애니메이션 */}
          <AnimatePresence>
            {showRabbit && (
              <motion.div
                key={`rabbit-${rabbitCount}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: [0, 1.2, 1],
                  x: rabbitPosition.x,
                  y: rabbitPosition.y,
                  rotate: [0, -10, 10, -5, 0]
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0,
                  y: [rabbitPosition.y, rabbitPosition.y - 50],
                  transition: { duration: 0.5 }
                }}
                transition={{ 
                  duration: 0.8,
                  scale: { duration: 0.5 },
                  rotate: { duration: 1, repeat: 2, repeatType: "reverse" }
                }}
                className="absolute z-20"
                style={{ 
                  fontSize: '3rem',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span role="img" aria-label="rabbit" style={{ fontSize: '3rem' }}>🐰</span>
                
                {/* 말풍선 효과 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: 0.3, duration: 0.3 }
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs shadow-lg"
                >
                  {rabbitCount <= 3 ? "Hi!" : rabbitCount <= 6 ? "See you again!" : "Stop clicking!"}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* 닉네임 (크게 표시) */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-2 sm:mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
            Git Carrot
          </span>
        </motion.h1>
        
        {/* 원래 이름 (작게 표시) */}
        <motion.h2 
          className="text-base sm:text-lg md:text-xl text-center mb-4 sm:mb-6 text-[var(--text-primary)] dark:text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Honggun Jeon - Fullstack Developer
        </motion.h2>
        
        {/* 간단한 소개 */}
        <motion.p 
          className="text-sm sm:text-base text-center max-w-lg mb-8 sm:mb-10 text-[var(--text-primary)] dark:text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Passionate about creating beautiful, responsive, and user-friendly web experiences with modern technologies.
        </motion.p>
        
        {/* 소셜 링크 */}
        <motion.div 
          className="flex gap-4 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.a 
            href="https://github.com/yourusername" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-[var(--text-primary)] dark:text-zinc-400 hover:text-[var(--accent-blue)] dark:hover:text-blue-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </motion.a>
          
          <motion.a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-[var(--text-primary)] dark:text-zinc-400 hover:text-[var(--accent-blue)] dark:hover:text-blue-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </motion.a>
          
          <motion.a 
            href="mailto:your.email@example.com" 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-[var(--text-primary)] dark:text-zinc-400 hover:text-[var(--accent-blue)] dark:hover:text-blue-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </motion.a>
        </motion.div>
        
        {/* 버튼 그룹 */}
        <motion.div
          className="flex gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <motion.a
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(255, 120, 50, 1)',
              boxShadow: '0 0 20px rgba(255, 120, 50, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium transition-all"
            href="#projects"
          >
            View Projects
          </motion.a>
          
          <motion.a
            whileHover={{ 
              scale: 1.05, 
              borderColor: 'var(--accent-blue)',
              color: 'var(--accent-blue)',
              boxShadow: '0 0 15px rgba(144, 205, 244, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-[var(--text-primary)] dark:border-zinc-600 text-[var(--text-primary)] dark:text-white px-5 py-2 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium transition-all"
            href="#contact"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
      
      {/* 스크롤 다운 인디케이터 - 섹션 콘텐츠 밖으로 이동 */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[var(--text-primary)] dark:text-zinc-500 text-xs mb-2 text-center hidden sm:block">Scroll Down</span>
        <motion.div
          className="flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <svg className="w-5 h-5 text-[var(--text-primary)] dark:text-zinc-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}