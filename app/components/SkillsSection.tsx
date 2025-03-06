import { motion } from 'framer-motion';
import { useRef } from 'react';

// Sample skills data by category
const skillsByCategory = {
  frontend: [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Framer Motion', level: 75 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'Firebase', level: 70 },
    { name: 'SQL', level: 65 },
  ],
  tools: [
    { name: 'Git', level: 90 },
    { name: 'Docker', level: 65 },
    { name: 'AWS', level: 60 },
    { name: 'Jest', level: 70 },
    { name: 'Figma', level: 75 },
  ]
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const SkillBar = ({ name, level }: { name: string; level: number }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-sm text-zinc-500">{level}%</span>
        </div>
        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
          <motion.div 
            className="bg-indigo-500 dark:bg-indigo-400 h-2.5 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
            whileHover={{
              boxShadow: "0 0 8px rgba(99, 102, 241, 0.7)"
            }}
          />
        </div>
      </div>
    );
  };
  
  const CategorySection = ({ title, skills }: { title: string; skills: { name: string; level: number }[] }) => {
    return (
      <motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ 
          y: -10, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          background: "linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(255, 255, 255, 0))"
        }}
      >
        <h3 className="text-xl font-bold mb-6 capitalize">{title}</h3>
        {skills.map((skill, index) => (
          <SkillBar key={index} name={skill.name} level={skill.level} />
        ))}
      </motion.div>
    );
  };
  
  return (
    <div className="w-full" ref={sectionRef}>
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6">Skills</h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          My technical proficiencies across various technologies, languages, and tools.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <CategorySection title="Frontend" skills={skillsByCategory.frontend} />
        <CategorySection title="Backend" skills={skillsByCategory.backend} />
        <CategorySection title="Tools & Others" skills={skillsByCategory.tools} />
      </motion.div>
    </div>
  );
}