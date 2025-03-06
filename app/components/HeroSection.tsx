import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroSection() {
  useEffect(() => {
    const handleMouseMove = () => {
      // 사용되지 않는 코드 제거
    };
    
    const handleResize = () => {
      // 사용되지 않는 코드 제거
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };
  
  // Splitting text into letters for animation
  const titleText = "Honggun Jeon";
  const titleLetters = titleText.split('');
  
  return (
    <div className="w-full px-4 sm:px-8 flex flex-col items-center justify-center relative overflow-hidden py-12">
      {/* Clean, subtle background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Subtle gradient base */}
        <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-indigo-950/30 to-black"></div>
        
        {/* Minimal smooth gradient motion */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, transparent 50%)",
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
        
        {/* Soft nebula effect */}
        <motion.div 
          className="absolute inset-0 opacity-15"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            filter: "blur(40px)"
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.div
        className="flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Name with letter animation */}
        <motion.h1 
          className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3
              }
            }
          }}
        >
          {titleLetters.map((letter, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants} 
              className="inline-block"
              whileHover={{ 
                scale: 1.2, 
                color: '#6366f1',
                rotate: [-5, 5, -5, 0],
                transition: { duration: 0.3 }
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p
          className="text-lg text-white/80 font-light tracking-wide mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.5,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          Software Engineer
        </motion.p>
        
        {/* Tech stack icons */}
        <motion.div
          className="flex justify-center gap-4 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.5,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {/* React icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="text-white opacity-60 hover:opacity-100 transition-opacity">
            <path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89c0 1-.84 1.85-1.87 1.85c-1.03 0-1.87-.85-1.87-1.85c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7c-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86c.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5l-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47c.54.03 1.11.03 1.71.03c.6 0 1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7c.52.59 1.03 1.23 1.51 1.9c.82.08 1.63.2 2.4.36c.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86c-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63c2.54.75 4.37 1.99 4.37 3.68c0 1.69-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63c-1.46.84-3.45-.12-5.37-1.95c-1.92 1.83-3.91 2.79-5.38 1.95c-1.46-.84-1.62-3.05-1-5.63c-2.54-.75-4.37-1.99-4.37-3.68c0-1.69 1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63c1.47-.84 3.46.12 5.38 1.95c1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26c2.1-.63 3.28-1.53 3.28-2.26c0-.73-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26c-2.1.63-3.28 1.53-3.28 2.26c0 .73 1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16c-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7c.64-.35.83-1.82.32-3.96c-.77.16-1.58.28-2.4.36c-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16c.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9Z" />
          </svg>
          
          {/* Node.js icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="text-white opacity-60 hover:opacity-100 transition-opacity">
            <path fill="currentColor" d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.7.47c1.38 0 2.17-.84 2.17-2.3V8.65c0-.12-.1-.22-.22-.22h-.93c-.12 0-.21.1-.21.22v8.79c0 .65-.67 1.3-1.77.75L3.6 17.14a.25.25 0 0 1-.11-.22V7.38c0-.1.04-.18.11-.22l7.36-4.24a.23.23 0 0 1 .23 0l7.36 4.24c.07.04.11.13.11.22v9.54c0 .1-.04.18-.11.22l-7.36 4.24a.23.23 0 0 1-.23 0l-1.89-1.12c-.07-.04-.16-.04-.23 0c-.54.3-1.63.84-2.15.38c-.54-.46-.03-1.25.37-1.56c.11-.09.27-.07.38 0l1.85 1.08c.07.04.16.04.23 0l7.36-4.24c.07-.04.14-.13.14-.22V7.38c0-.1-.07-.18-.14-.22l-7.36-4.24c-.07-.04-.16-.04-.23 0L5.54 7.17c-.07.04-.14.12-.14.21v9.54c0 .1.05.16.12.21l2 1.16c.47.28 1.17.28 1.63.07c.48-.2.77-.6.77-1.02V8.57c0-.17.14-.3.3-.3h2.4c.82 0 1.62-.24 2.09-.67c.49-.44.74-1.06.74-1.72c0-1.3-.85-2.07-2.33-2.07h-3.56c-.12 0-.21.1-.21.22v7.4c0 .1-.03.19-.1.26a.84.84 0 0 1-1.2 0a.38.38 0 0 1-.1-.26V3.25c0-.22.19-.4.4-.4h4.77c2 0 3.25 1.4 3.25 3.54c0 2.37-1.7 3.35-3.72 3.35H14.1c-.14 0-.26.12-.26.26v7.27c0 1.43-.47 2.13-1.57 2.68c-.3.15-.6.22-.91.22c-.31 0-.61-.07-.88-.2l-1.88-1.1c-.47-.27-.76-.78-.78-.76-1.33V7.38c0-.55.29-1.06.76-1.33l7.44-4.3c.23-.13.49-.2.78-.2c.29 0 .55.07.78.2l7.44 4.3c.48.27.77.78.77 1.34v8.57c0 .56-.3 1.07-.78 1.34l-7.44 4.3c-.23.13-.49.2-.78.2Z" />
          </svg>
          
          {/* Python icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="text-white opacity-60 hover:opacity-100 transition-opacity">
            <path fill="currentColor" d="M11.87.21a2.43 2.43 0 0 0-1.17.3a10.56 10.56 0 0 0-1.87 1.15l-.59.46l.02.95a12 12 0 0 0 .03 1.09c.05.15 0 .28-.17.39c-.94.63-1.63 1.71-1.85 2.88C6.11 8.04 6.1 8.17 6.06 9c-.16 3.92-.16 5.03-.02 5.32a.5.5 0 0 0 .43.32c.37.05 1.4.05 1.82.02c.33-.03.42 0 .47.15c.05.1.07.68.07 1.38v1.21l.32.26c.18.14.56.46.84.7c.83.69 1.22.92 1.75.97c.42.05.9-.05 1.17-.21c.3-.19.53-.47.59-.73c.03-.15.07-.69.08-1.23c.01-.53.06-1.02.1-1.08c.07-.12.14-.13.7-.13c.53 0 .78-.04.91-.18c.1-.1.36-.64.36-.77c0-.05-.15-.14-.32-.21a.74.74 0 0 1-.33-.26c-.02-.09-.04-.88-.04-1.75c0-1.95-.01-2-.36-2c-.15 0-.24.08-.4.34c-.16.27-.29.37-.68.51a3.2 3.2 0 0 1-1.08.13c-.38 0-.71-.05-.87-.13a1.18 1.18 0 0 1-.49-.48c-.15-.3-.15-.35-.15-2.23V7.95l.36-.1c.5-.15.72-.31.83-.63a.92.92 0 0 0 0-.48c-.04-.18-.13-.33-.3-.46a1.82 1.82 0 0 0-.64-.35c-.36-.11-.42-.15-.24-.21a4.63 4.63 0 0 1 .8-.28c.67-.17 1.65-.2 2.26-.08c.76.14 1.04.49 1.04 1.31v.47h.27c.32 0 .42-.3.42-1.07c0-.59-.01-.67-.16-.78a2.1 2.1 0 0 0-.55-.24c-.4-.12-1.59-.19-2.22-.13l-.48.04l-.18-.3a6.53 6.53 0 0 1-.44-.86c-.25-.63-.25-.63-.7-.74c-.3-.07-1.22-.11-1.52-.06Zm.61 1.13c.28.15.28.31.02.71c-.25.37-.38.39-.8.1c-.6-.43-.75-.8-.42-1.05c.2-.17.9-.04 1.2.24Zm-1.51 5.15c-.08.56.07 1.06.41 1.32c.26.19.75.2 1.1.01c.26-.14.3-.2.36-.5a1.48 1.48 0 0 0-.02-.95c-.13-.36-.63-.57-1.21-.5c-.4.04-.42.06-.53.26c-.07.12-.1.28-.1.36Zm9.93.76c-.4.09-.89.26-1.07.38c-.85.55-.96.63-1.09 1.06c-.1.36-.12.37-.8.14c-.3-.1-.54-.12-.85-.08c-.77.1-1.13.45-1.13 1.05c0 .7.6 1.8 1.15 2.1c.34.17.76.17 1.08 0a2.4 2.4 0 0 0 .85-.9c.18-.31.3-.42.51-.48c.3-.08.32-.04.37.8c.03.47.08.84.17 1.03c.22.47.85.8 1.52.8c.45 0 .68-.06.97-.28c.3-.21.32-.26.35-.78c.06-.81.22-1.08.71-1.16c.54-.1.58-.29.22-1.22a4.2 4.2 0 0 0-.71-1.22c-.23-.28-.7-.75-1.05-1.05a5.18 5.18 0 0 0-1.2-.64c-.18-.06-.19-.05.01-.55Zm-.3 1.09c.24.11.76.56 1.19 1.04c.6.67.93 1.23.85 1.4c-.13.33-1.47-.06-1.73-.5c-.13-.24-.14-.7-.01-1.46c.1-.61.12-.63.28-.61c.1 0 .29.06.43.13Zm-1.38 4.75c-.03.53.01.63.2.82c.3.3.84.33 1.18.06c.3-.24.33-.74.06-1.05a.97.97 0 0 0-1.32-.14c-.12.1-.12.12-.12.31Z" />
          </svg>
          
          {/* Docker icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="text-white opacity-60 hover:opacity-100 transition-opacity">
            <g fill="none" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 18h18m-9-4v-2m0 0v-2m0 0H9m3 0h3"/><path d="M9 8H8a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1Zm0 4H8a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1Zm4-4h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1Zm0 4h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1Zm4-4h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1Z"/><path strokeLinecap="round" d="M4 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/></g>
          </svg>
          
          {/* Github icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="text-white opacity-60 hover:opacity-100 transition-opacity">
            <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
          </svg>
        </motion.div>
        
        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: '#6366f1' }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white text-black px-6 py-2 text-sm font-medium transition-colors"
            href="#projects"
          >
            View Projects
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05, borderColor: '#6366f1' }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-zinc-600 text-white px-6 py-2 text-sm font-medium transition-colors"
            href="#contact"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}