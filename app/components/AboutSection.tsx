import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll position - 최소 opacity를 0.9로 높여서 항상 선명하게 보이도록 수정
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);
  
  return (
    <div className="w-full py-16 relative" ref={sectionRef}>
      {/* Background gradient - 더 선명하게 보이도록 조정 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent -z-10" />
      
      <motion.div
        className="max-w-4xl mx-auto px-4"
        style={{ opacity, scale }}
      >
        {/* Heading with animated underline */}
        <motion.div 
          className="mb-16 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center">About Me</h2>
          <motion.div 
            className="h-1 w-16 bg-indigo-500 mx-auto mt-4 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>
        
        {/* Content with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-5 text-white/90">
              <p className="text-lg leading-relaxed">
                Hi, I&apos;m <span className="font-bold text-white">Honggun Jeon</span>, a software engineer specializing in 
                full-stack web development and artificial intelligence.
              </p>
              
              <p className="text-lg leading-relaxed">
                I focus on creating high-performance applications with clean, maintainable code. My expertise includes React, Next.js, Node.js, and Python.
              </p>
              
              <p className="text-lg leading-relaxed">
                Currently working on AI-powered agent systems and RESTful APIs, I enjoy 
                exploring new technologies and contributing to the developer community.
              </p>
            </div>
            
            {/* CTA Button */}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 font-medium text-base py-2 px-5 rounded-full bg-indigo-600/70 text-white backdrop-blur-sm mt-8"
              whileHover={{ 
                gap: 6, 
                backgroundColor: "rgba(99, 102, 241, 0.8)",
                boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Get in touch
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </motion.svg>
            </motion.a>
          </motion.div>
          
          {/* Right column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "React", icon: "M12 10.11c1.03 0 1.87.84 1.87 1.89c0 1-.84 1.85-1.87 1.85c-1.03 0-1.87-.85-1.87-1.85c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7c-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86c.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5l-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47c.54.03 1.11.03 1.71.03c.6 0 1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7c.52.59 1.03 1.23 1.51 1.9c.82.08 1.63.2 2.4.36c.51-2.14.32-3.61-.32-3.96Z" },
                { name: "Node.js", icon: "M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.7.47c1.38 0 2.17-.84 2.17-2.3V8.65c0-.12-.1-.22-.22-.22h-.93c-.12 0-.21.1-.21.22v8.79c0 .65-.67 1.3-1.77.75L3.6 17.14Z" },
                { name: "Python", icon: "M11.87.21c-.1.01-.22.03-.33.06c-.35.08-.65.22-1.17.3c-.99.64-1.31.97-1.99 1.42l.02.95c.58-.17 1.19-.27 1.56-.27c.58 0 1.06.14 1.32.38c.29.27.45.69.4 1.08c-2.5.3-4 1.5-4 3.15c0 2.25 1.7 2.25 2 2.25c.47 0 1.42-.28 1.87-1.02c0 0 .03 1.5 1.7 1.5h.39c-.04-.88-.04-1.75-.04-1.75c-.15 0-.24.08-.4.34Z" },
                { name: "Next.js", icon: "M11.5 6.5c-4 0-7.5.11-9.5.39v3.36c1.36.19 2.73.3 4.11.35V19.5c0 .5.08.97.16 1.42c1.7.3 3.4.57 5.23.58c1.84 0 3.54-.27 5.23-.58c.08-.45.16-.92.16-1.42V10.6c1.38-.05 2.75-.16 4.11-.35V6.89c-2-.28-5.5-.39-9.5-.39M18 9.75a2.25 2.25 0 0 0-2.25 2.25a2.25 2.25 0 0 0 2.25 2.25A2.25 2.25 0 0 0 20.25 12A2.25 2.25 0 0 0 18 9.75" },
                { name: "TypeScript", icon: "M6 3h8a3 3 0 0 1 3 3v4h4l-3 4l-3-4h2V6H6v7.5l-2-1v-6L8 5l2 1z" },
                { name: "Docker", icon: "M9 8H8a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1Z M9 12H8a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1Z" }
              ].map((tech, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center text-center"
                  whileHover={{ 
                    y: -5, 
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    borderColor: "rgba(99, 102, 241, 0.3)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.1 * index
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-indigo-400 mb-2">
                    <path fill="currentColor" d={tech.icon} />
                  </svg>
                  <span className="text-white/80 text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}