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
      className="group relative rounded-2xl overflow-hidden bg-zinc-800/70 backdrop-blur-sm shadow-lg hover:shadow-xl border border-zinc-700/50 transition-all duration-300 h-full"
      style={{ 
        // Apply 3D effects only on desktop
        ...(isMobile ? {} : {
          rotateX,
          rotateY,
          perspective: 1000,
          transformStyle: 'preserve-3d'
        })
      }}
      whileHover={{ scale: isMobile ? 1.01 : 1.02, boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {}}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full aspect-[16/9] md:aspect-[4/3] relative rounded-t-2xl overflow-hidden">
        <motion.div
          className="w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: isMobile ? 'none' : 'translateZ(20px)'
          }}
        >
          {/* If no actual image exists, use a gradient background */}
          {project.imageUrl.startsWith('/project-') ? (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${
              project.id % 3 === 0 ? 'from-blue-500 to-purple-600' :
              project.id % 3 === 1 ? 'from-emerald-500 to-teal-600' :
              'from-orange-500 to-amber-600'
            }`}>
              <span className="text-white text-4xl font-bold">{project.title.substring(0, 2)}</span>
            </div>
          ) : (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </motion.div>
        
        {/* Action buttons - always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-3 md:p-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2 md:gap-4 w-full justify-center">
            {project.projectUrl && (
              <motion.a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white text-black px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-medium flex-1 md:flex-none text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live
              </motion.a>
            )}
            
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-transparent border border-white text-white px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-medium flex-1 md:flex-none text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.a>
            )}
          </div>
        </div>
      </div>
      
      <motion.div 
        className="p-4 md:p-6"
        style={{
          transformStyle: 'preserve-3d',
          transform: isMobile ? 'none' : 'translateZ(30px)'
        }}
      >
        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-white">{project.title}</h3>
        <p className="text-sm md:text-base text-zinc-300 mb-3 md:mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {project.technologies.map((tech, index) => (
            <motion.span 
              key={index}
              className="text-[10px] md:text-xs font-[family-name:var(--font-geist-mono)] px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-zinc-700/50 text-zinc-200"
              whileHover={{ 
                backgroundColor: "#6366f1", 
                color: "white",
                scale: 1.05,
              }}
              transition={{ duration: 0.2 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}