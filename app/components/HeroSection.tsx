import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [carrotRotation, setCarrotRotation] = useState(0);
  const [carrotScale, setCarrotScale] = useState(1);
  const [carrotHover, setCarrotHover] = useState(false);
  const carrotRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 마우스 이동 핸들러
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // 마우스 위치를 -0.5 ~ 0.5 범위로 정규화
    const x = (e.clientX / windowSize.width) - 0.5;
    const y = (e.clientY / windowSize.height) - 0.5;
    
    setMousePosition({ x, y });
  }, [windowSize.width, windowSize.height]);

  // 윈도우 크기 변경 핸들러
  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    // 초기 윈도우 크기 설정
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // 마우스 이벤트 리스너 등록
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // 컴포넌트 마운트 시 당근 애니메이션 시작
    setTimeout(startCarrotAnimation, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleResize]);
  
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
  
  // 마우스 움직임에 따른 배경 효과 계산
  const calculateMovement = () => {
    if (!mousePosition || !windowSize.width || !windowSize.height) return {};
    
    // 마우스 위치를 -0.5 ~ 0.5 범위로 정규화
    const x = mousePosition.x;
    const y = mousePosition.y;
    
    // 배경 이동 효과
    return {
      transform: `translate(${x * 20}px, ${y * 20}px)`,
      backgroundPosition: `${50 + x * 10}% ${50 + y * 10}%`
    };
  };
  
  return (
    <section id="hero" className="section relative overflow-hidden">
      {/* 배경 요소 */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 z-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900"
        style={calculateMovement()}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,50,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8),transparent_70%)]"></div>
        </div>
      </div>

      {/* 섹션 콘텐츠 */}
      <div ref={containerRef} className="section-content flex flex-col items-center justify-center relative z-10">
        {/* 당근 이모티콘 */}
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
          onClick={startCarrotAnimation}
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
        <motion.p
          className="text-xs sm:text-sm text-zinc-400 font-light tracking-wider mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.5,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <span className="font-medium text-zinc-300">Honggun Jeon</span> • Software Engineer
        </motion.p>
        
        {/* 기술 스택 아이콘 */}
        <motion.div
          className="flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.5,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {/* React 아이콘 */}
          <motion.div
            whileHover={{ y: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6 text-blue-400">
              <path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89c0 1-.84 1.85-1.87 1.85c-1.03 0-1.87-.85-1.87-1.85c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7c-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86c.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5l-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47c.54.03 1.11.03 1.71.03c.6 0 1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7c.52.59 1.03 1.23 1.51 1.9c.82.08 1.63.2 2.4.36c.51-2.14.32-3.61-.32-3.96Z" />
            </svg>
          </motion.div>
          
          {/* Next.js 아이콘 */}
          <motion.div
            whileHover={{ y: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6 text-white">
              <path fill="currentColor" d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
            </svg>
          </motion.div>
          
          {/* Node.js 아이콘 */}
          <motion.div
            whileHover={{ y: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6 text-green-500">
              <path fill="currentColor" d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.7.47c1.38 0 2.17-.84 2.17-2.3V8.65c0-.12-.1-.22-.22-.22h-.93c-.12 0-.21.1-.21.22v8.79c0 .65-.67 1.3-1.77.75L3.6 17.14a.25.25 0 0 1-.11-.22V7.38c0-.1.04-.18.11-.22l7.36-4.24a.23.23 0 0 1 .23 0l7.36 4.24c.07.04.11.13.11.22v9.54c0 .1-.04.18-.11.22l-7.36 4.24a.23.23 0 0 1-.23 0l-1.89-1.12c-.07-.04-.16-.04-.23 0c-.54.3-1.63.84-2.15.38c-.54-.46-.03-1.25.37-1.56c.11-.09.27-.07.38 0l1.85 1.08c.07.04.16.04.23 0l7.36-4.24c.07-.04.14-.13.14-.22V7.38c0-.1-.07-.18-.14-.22l-7.36-4.24c-.07-.04-.16-.04-.23 0L5.54 7.17c-.07.04-.14.12-.14.21v9.54c0 .1.05.16.12.21l2 1.16c.47.28 1.17.28 1.63.07c.48-.2.77-.6.77-1.02V8.57c0-.17.14-.3.3-.3h2.4c.82 0 1.62-.24 2.09-.67c.49-.44.74-1.06.74-1.72c0-1.3-.85-2.07-2.33-2.07h-3.56c-.12 0-.21.1-.21.22v7.4c0 .1-.03.19-.1.26a.84.84 0 0 1-1.2 0a.38.38 0 0 1-.1-.26V3.25c0-.22.19-.4.4-.4h4.77c2 0 3.25 1.4 3.25 3.54c0 2.37-1.7 3.35-3.72 3.35H14.1c-.14 0-.26.12-.26.26v7.27c0 1.43-.47 2.13-1.57 2.68c-.3.15-.6.22-.91.22c-.31 0-.61-.07-.88-.2l-1.88-1.1c-.47-.27-.76-.78-.78-.76-1.33V7.38c0-.55.29-1.06.76-1.33l7.44-4.3c.23-.13.49-.2.78-.2c.29 0 .55.07.78.2l7.44 4.3c.48.27.77.78.77 1.34v8.57c0 .56-.3 1.07-.78 1.34l-7.44 4.3c-.23.13-.49.2-.78.2Z" />
            </svg>
          </motion.div>
          
          {/* TypeScript 아이콘 */}
          <motion.div
            whileHover={{ y: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6 text-blue-500">
              <path fill="currentColor" d="M3 3h18v18H3V3zm10.71 14.29c.18.18.43.29.71.29s.53-.11.71-.29l2.59-2.59a.996.996 0 1 0-1.41-1.41L15 14.59V8c0-.55-.45-1-1-1s-1 .45-1 1v6.59l-1.29-1.29a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l2.41 2.58zM8 11h8v2H8v-2z" />
            </svg>
          </motion.div>
          
          {/* Python 아이콘 */}
          <motion.div
            whileHover={{ y: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6 text-yellow-400">
              <path fill="currentColor" d="M11.87.21a2.43 2.43 0 0 0-1.17.3a10.56 10.56 0 0 0-1.87 1.15l-.59.46l.02.95a12 12 0 0 0 .03 1.09c.05.15 0 .28-.17.39c-.94.63-1.63 1.71-1.85 2.88C6.11 8.04 6.1 8.17 6.06 9c-.16 3.92-.16 5.03-.02 5.32a.5.5 0 0 0 .43.32c.37.05 1.4.05 1.82.02c.33-.03.42 0 .47.15c.05.1.07.68.07 1.38v1.21l.32.26c.18.14.56.46.84.7c.83.69 1.22.92 1.75.97c.42.05.9-.05 1.17-.21c.3-.19.53-.47.59-.73c.03-.15.07-.69.08-1.23c.01-.53.06-1.02.1-1.08c.07-.12.14-.13.7-.13c.53 0 .78-.04.91-.18c.1-.1.36-.64.36-.77c0-.05-.15-.14-.32-.21a.74.74 0 0 1-.33-.26c-.02-.09-.04-.88-.04-1.75c0-1.95-.01-2-.36-2c-.15 0-.24.08-.4.34c-.16.27-.29.37-.68.51a3.2 3.2 0 0 1-1.08.13c-.38 0-.71-.05-.87-.13a1.18 1.18 0 0 1-.49-.48c-.15-.3-.15-.35-.15-2.23V7.95l.36-.1c.5-.15.72-.31.83-.63a.92.92 0 0 0 0-.48c-.04-.18-.13-.33-.3-.46a1.82 1.82 0 0 0-.64-.35c-.36-.11-.42-.15-.24-.21a4.63 4.63 0 0 1 .8-.28c.67-.17 1.65-.2 2.26-.08c.76.14 1.04.49 1.04 1.31v.47h.27c.32 0 .42-.3.42-1.07c0-.59-.01-.67-.16-.78a2.1 2.1 0 0 0-.55-.24c-.4-.12-1.59-.19-2.22-.13l-.48.04l-.18-.3a6.53 6.53 0 0 1-.44-.86c-.25-.63-.25-.63-.7-.74c-.3-.07-1.22-.11-1.52-.06Zm.61 1.13c.28.15.28.31.02.71c-.25.37-.38.39-.8.1c-.6-.43-.75-.8-.42-1.05c.2-.17.9-.04 1.2.24Zm-1.51 5.15c-.08.56.07 1.06.41 1.32c.26.19.75.2 1.1.01c.26-.14.3-.2.36-.5a1.48 1.48 0 0 0-.02-.95c-.13-.36-.63-.57-1.21-.5c-.4.04-.42.06-.53.26c-.07.12-.1.28-.1.36Zm9.93.76c-.4.09-.89.26-1.07.38c-.85.55-.96.63-1.09 1.06c-.1.36-.12.37-.8.14c-.3-.1-.54-.12-.85-.08c-.77.1-1.13.45-1.13 1.05c0 .7.6 1.8 1.15 2.1c.34.17.76.17 1.08 0a2.4 2.4 0 0 0 .85-.9c.18-.31.3-.42.51-.48c.3-.08.32-.04.37.8c.03.47.08.84.17 1.03c.22.47.85.8 1.52.8c.45 0 .68-.06.97-.28c.3-.21.32-.26.35-.78c.06-.81.22-1.08.71-1.16c.54-.1.58-.29.22-1.22a4.2 4.2 0 0 0-.71-1.22c-.23-.28-.7-.75-1.05-1.05a5.18 5.18 0 0 0-1.2-.64c-.18-.06-.19-.05.01-.55Zm-.3 1.09c.24.11.76.56 1.19 1.04c.6.67.93 1.23.85 1.4c-.13.33-1.47-.06-1.73-.5c-.13-.24-.14-.7-.01-1.46c.1-.61.12-.63.28-.61c.1 0 .29.06.43.13Zm-1.38 4.75c-.03.53.01.63.2.82c.3.3.84.33 1.18.06c.3-.24.33-.74.06-1.05a.97.97 0 0 0-1.32-.14c-.12.1-.12.12-.12.31Z" />
            </svg>
          </motion.div>
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
              borderColor: 'rgba(255, 120, 50, 0.8)',
              boxShadow: '0 0 15px rgba(255, 120, 50, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-zinc-600 text-white px-5 py-2 sm:px-7 sm:py-3 text-xs sm:text-sm font-medium transition-all"
            href="#contact"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
      
      {/* 스크롤 다운 인디케이터 - 섹션 콘텐츠 밖으로 이동 */}
      <motion.div
        className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-zinc-500 text-xs mb-2 text-center hidden sm:block">Scroll Down</span>
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
          <svg className="w-5 h-5 text-zinc-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}