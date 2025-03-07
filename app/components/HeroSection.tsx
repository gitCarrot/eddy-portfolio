import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function HeroSection() {
  const [carrotRotation, setCarrotRotation] = useState(0);
  const [carrotScale, setCarrotScale] = useState(1);
  const [carrotHover, setCarrotHover] = useState(false);
  const [showRabbit, setShowRabbit] = useState(false);
  const [rabbitPosition, setRabbitPosition] = useState({ x: 0, y: 0 });
  const [rabbitCount, setRabbitCount] = useState(0);
  const [flyingCarrot, setFlyingCarrot] = useState(false); // 날아가는 당근 상태
  const [flyingCarrotPosition, setFlyingCarrotPosition] = useState({ x: 0, y: 0 }); // 날아가는 당근 위치
  const [multipleRabbits, setMultipleRabbits] = useState<Array<{id: number, x: number, y: number, message: string}>>([]);
  const [isCarrotRunning, setIsCarrotRunning] = useState(false); // 당근 술래잡기 상태
  const [runningCarrotPosition, setRunningCarrotPosition] = useState({ x: 0, y: 0 }); // 도망가는 당근 위치
  const [runningCarrotInterval, setRunningCarrotInterval] = useState<NodeJS.Timeout | null>(null); // 당근 이동 인터벌
  const carrotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // 랜덤 메시지 배열
  const rabbitMessages = [
    "Hi there!", 
    "Hello!", 
    "Found a carrot!", 
    "Yummy!", 
    "I love carrots!", 
    "Click again!", 
    "More carrots please!", 
    "Hop hop!", 
    "Nice to meet you!", 
    "Let's be friends!"
  ];

  // 당근 잡았을 때 메시지
  const carrotCaughtMessages = [
    "You caught me!", 
    "Good job!", 
    "Too slow!", 
    "Nice catch!", 
    "You're fast!"
  ];

  useEffect(() => {
    // 컴포넌트 마운트 시 당근 애니메이션 시작
    setTimeout(startCarrotAnimation, 1000);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => {
      if (runningCarrotInterval) {
        clearInterval(runningCarrotInterval);
      }
    };
  }, [runningCarrotInterval]);

  // 더블 탭 방지 함수
  useEffect(() => {
    // 더블 탭 방지 함수
    const preventDoubleTapZoom = (e: TouchEvent) => {
      // 기본 동작 방지
      e.preventDefault();
      
      // 필요한 경우 여기에 추가 로직 구현
    };

    // 모바일 터치 이벤트 리스너 등록
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('touchstart', preventDoubleTapZoom, { passive: false });
    }

    // 클린업 함수
    return () => {
      if (section) {
        section.removeEventListener('touchstart', preventDoubleTapZoom);
      }
    };
  }, []);

  // CSS 스타일을 적용하는 함수
  useEffect(() => {
    // 모바일에서 확대 방지를 위한 스타일 추가
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        touch-action: manipulation;
      }
      #hero {
        touch-action: manipulation;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 당근 술래잡기 시작
  const startCarrotRunning = () => {
    setIsCarrotRunning(true);
    
    // 초기 위치 설정
    moveRunningCarrot();
    
    // 일정 간격으로 당근 위치 변경
    const interval = setInterval(() => {
      moveRunningCarrot();
    }, 800); // 0.8초마다 위치 변경
    
    setRunningCarrotInterval(interval);
  };
  
  // 도망가는 당근 위치 변경
  const moveRunningCarrot = () => {
    if (!containerRef.current) return;
    
    // 컨테이너 크기 가져오기
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    // 랜덤 위치 계산 (컨테이너 내부)
    const padding = 100; // 화면 가장자리에서 최소 여백
    const randomX = (Math.random() * (containerWidth - padding * 2)) - (containerWidth / 2) + padding;
    const randomY = (Math.random() * (containerHeight - padding * 2)) - (containerHeight / 2) + padding;
    
    setRunningCarrotPosition({ x: randomX, y: randomY });
  };
  
  // 도망가는 당근 클릭 처리
  const handleRunningCarrotClick = () => {
    // 인터벌 정리
    if (runningCarrotInterval) {
      clearInterval(runningCarrotInterval);
      setRunningCarrotInterval(null);
    }
    
    // 당근 술래잡기 종료
    setIsCarrotRunning(false);
    
    // 토끼 생성
    setRabbitPosition({ x: 0, y: 0 });
    setShowRabbit(true);
    
    // 토끼 메시지 설정을 위한 카운트 증가
    setRabbitCount(prev => prev + 1);
    
    // 3초 후 토끼 숨기기
    setTimeout(() => {
      setShowRabbit(false);
    }, 3000);
    
    // 당근 애니메이션 시작
    startCarrotAnimation();
  };
  
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
  
  // 랜덤 메시지 선택
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * rabbitMessages.length);
    return rabbitMessages[randomIndex];
  };

  // 여러 토끼 생성 애니메이션
  const createMultipleRabbits = () => {
    const newRabbits = [];
    const count = Math.floor(Math.random() * 3) + 2; // 2-4마리 토끼 생성
    
    for (let i = 0; i < count; i++) {
      const randomX = (Math.random() * 300) - 150; // -150px ~ 150px
      const randomY = (Math.random() * 200) - 100; // -100px ~ 100px
      
      newRabbits.push({
        id: Date.now() + i,
        x: randomX,
        y: randomY,
        message: getRandomMessage()
      });
    }
    
    setMultipleRabbits(newRabbits);
    
    // 5초 후 토끼들 제거
    setTimeout(() => {
      setMultipleRabbits([]);
    }, 5000);
  };

  // 당근 날리기 애니메이션
  const launchCarrot = () => {
    // 랜덤 방향으로 날아가는 당근
    setFlyingCarrotPosition({ x: 0, y: 0 });
    setFlyingCarrot(true);
    
    // 애니메이션 종료 후 상태 초기화
    setTimeout(() => {
      setFlyingCarrot(false);
    }, 1500);
  };
  
  // 당근 클릭 시 토끼 애니메이션 시작
  const handleCarrotClick = () => {
    // 당근 애니메이션 시작
    startCarrotAnimation();
    
    // 토끼 카운트 증가
    setRabbitCount(prev => prev + 1);
    
    // 랜덤 애니메이션 타입 선택 (0-5, 5번은 술래잡기)
    const newAnimationType = Math.floor(Math.random() * 6);
    
    // 애니메이션 타입에 따른 처리
    if (newAnimationType === 5) {
      // 당근 술래잡기 시작
      startCarrotRunning();
      return;
    }
    else if (newAnimationType === 0) {
      // 기본 토끼 애니메이션
      const randomX = (Math.random() * 200) - 100; // -100px ~ 100px
      const randomY = (Math.random() * 100) - 50;  // -50px ~ 50px
      setRabbitPosition({ x: randomX, y: randomY });
      setShowRabbit(true);
    } 
    else if (newAnimationType === 1) {
      // 당근 날리기 애니메이션
      launchCarrot();
      
      // 토끼도 함께 표시
      const randomX = (Math.random() * 200) - 100;
      const randomY = (Math.random() * 100) - 50;
      setRabbitPosition({ x: randomX, y: randomY });
      setShowRabbit(true);
    }
    else if (newAnimationType === 2 || newAnimationType === 3) {
      // 여러 토끼 생성 애니메이션
      createMultipleRabbits();
    }
    else {
      // 토끼가 당근 치는 애니메이션 (토끼 표시 + 당근 날리기)
      const randomX = (Math.random() * 100) - 50;
      const randomY = (Math.random() * 50) - 25;
      setRabbitPosition({ x: randomX, y: randomY });
      setShowRabbit(true);
      
      // 약간 딜레이 후 당근 날리기
      setTimeout(() => {
        launchCarrot();
      }, 300);
    }
    
    // 3-5초 후 토끼 숨기기 (애니메이션 타입에 따라 다른 시간)
    const hideDelay = newAnimationType === 2 ? 5000 : 3000;
    setTimeout(() => {
      setShowRabbit(false);
    }, hideDelay);
  };
  
  return (
    <section 
      id="hero" 
      className="section relative overflow-hidden" 
      ref={sectionRef}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* 섹션 콘텐츠 */}
      <div ref={containerRef} className="section-content flex flex-col items-center justify-center pt-0 sm:pt-0 pb-20 sm:pb-24 relative z-10 min-h-screen">
        {/* 당근 이모티콘 */}
        <div className="relative">
          {!isCarrotRunning ? (
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
          ) : (
            // 도망가는 당근 애니메이션
            <motion.div
              className="absolute z-50"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ 
                x: runningCarrotPosition.x,
                y: runningCarrotPosition.y,
                rotate: [0, 360],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ 
                x: { duration: 0.4, ease: "easeOut" },
                y: { duration: 0.4, ease: "easeOut" },
                rotate: { duration: 0.8, ease: "linear" },
                scale: { duration: 0.8, repeat: Infinity }
              }}
              onClick={handleRunningCarrotClick}
              style={{ 
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
              <span role="img" aria-label="running-carrot" style={{ fontSize: '4rem' }}>🥕</span>
            </motion.div>
          )}
          
          {/* 날아가는 당근 애니메이션 */}
          <AnimatePresence>
            {flyingCarrot && (
              <motion.div
                key="flying-carrot"
                initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                animate={{ 
                  opacity: [1, 1, 0],
                  scale: [1, 1, 0.5],
                  x: flyingCarrotPosition.x,
                  y: flyingCarrotPosition.y - 500,
                  rotate: 360 * 3
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1.5,
                  ease: "easeOut"
                }}
                className="absolute z-30"
                style={{ 
                  fontSize: '2rem',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span role="img" aria-label="flying-carrot" style={{ fontSize: '2rem' }}>🥕</span>
              </motion.div>
            )}
          </AnimatePresence>
          
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
                  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-medium shadow-lg text-gray-800 dark:text-white"
                >
                  {isCarrotRunning ? carrotCaughtMessages[Math.floor(Math.random() * carrotCaughtMessages.length)] : getRandomMessage()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* 여러 토끼 애니메이션 */}
          <AnimatePresence>
            {multipleRabbits.map((rabbit) => (
              <motion.div
                key={`multi-rabbit-${rabbit.id}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: [0, 1.2, 1],
                  x: rabbit.x,
                  y: rabbit.y,
                  rotate: [0, -5, 5, -3, 0]
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0,
                  y: [rabbit.y, rabbit.y - 30],
                  transition: { duration: 0.5 }
                }}
                transition={{ 
                  duration: 0.8,
                  scale: { duration: 0.5 },
                  rotate: { duration: 1, repeat: 2, repeatType: "reverse" }
                }}
                className="absolute z-20"
                style={{ 
                  fontSize: '2.5rem',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span role="img" aria-label="rabbit" style={{ fontSize: '2.5rem' }}>🐰</span>
                
                {/* 말풍선 효과 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: 0.3, duration: 0.3 }
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium shadow-lg text-gray-800 dark:text-white"
                >
                  {rabbit.message}
                </motion.div>
              </motion.div>
            ))}
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