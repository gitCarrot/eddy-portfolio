import { motion } from 'framer-motion';

// Sample skills data by category
const skillsByCategory = {
  frontend: [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "HTML/CSS", level: 95 },
    { name: "Tailwind CSS", level: 90 }
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 80 },
    { name: "Python", level: 75 },
    { name: "Java", level: 70 },
    { name: "SQL", level: 80 }
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 75 },
    { name: "AWS", level: 70 },
    { name: "CI/CD", level: 65 },
    { name: "Testing", level: 80 }
  ]
};

export default function SkillsSection() {
  const SkillBar = ({ name, level }: { name: string; level: number }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-[var(--text-primary)] dark:text-white">{name}</span>
          <span className="text-xs font-medium text-[var(--text-primary)] dark:text-zinc-400">{level}%</span>
        </div>
        <div className="w-full bg-white/30 dark:bg-white/5 rounded-full h-2.5">
          <motion.div 
            className="bg-indigo-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    );
  };
  
  const CategorySection = ({ title, skills }: { title: string; skills: { name: string; level: number }[] }) => {
    return (
      <motion.div
        className="bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">{title}</h3>
        <div>
          {skills.map((skill, index) => (
            <SkillBar key={index} name={skill.name} level={skill.level} />
          ))}
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="w-full py-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 section-title">Skills & Expertise</h2>
          <p className="text-lg text-[var(--text-primary)] dark:text-zinc-300 max-w-2xl mx-auto font-medium">
            Technologies and tools I&apos;ve worked with and mastered over the years.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategorySection title="Frontend Development" skills={skillsByCategory.frontend} />
          <CategorySection title="Backend Development" skills={skillsByCategory.backend} />
          <CategorySection title="Tools & Platforms" skills={skillsByCategory.tools} />
        </div>
      </div>
    </div>
  );
}