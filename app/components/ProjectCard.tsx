import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform the mouse position values to rotation values - reduced effect for better balance
  const rotateX = useTransform(y, [-100, 100], [8, -8]);  // Reduced from 10 to 8
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);  // Reduced from 10 to 8
  
  // Check if mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Handle mouse movement for the 3D effect - only on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Update motion values
    x.set(mouseX);
    y.set(mouseY);
  };
  
  // Reset the 3D effect when the mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="perspective-card w-full rounded-xl overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-[var(--text-primary)] dark:text-white">{project.title}</h3>
        <p className="text-sm md:text-base mb-4 text-[var(--text-primary)] dark:text-zinc-300">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-[var(--accent-blue)]/30 dark:bg-blue-900/30 text-[var(--text-primary)] dark:text-blue-300 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between mt-4">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm flex items-center gap-1 text-[var(--text-primary)] dark:text-zinc-400 hover:text-[var(--accent-blue)] dark:hover:text-blue-400 transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Code
          </a>
          
          <a 
            href={project.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm flex items-center gap-1 text-[var(--text-primary)] dark:text-zinc-400 hover:text-[var(--accent-blue)] dark:hover:text-blue-400 transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}