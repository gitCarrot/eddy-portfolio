import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '../lib/framer-motion';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

// Updated project data based on resume
const projects: Project[] = [
  {
    id: 1,
    title: "UH Groupings",
    description: "Interactive dashboard application with data visualization and real-time analytics features.",
    technologies: ["Sprinb boot", "Java", "Angular", "React", "Docker", "Hash Vault", "Grouper API" ],
    imageUrl: "/uh-groupings.png",
    projectUrl: "https://www.hawaii.edu/its/uhgroupings/",
    githubUrl: "https://github.com/uhawaii-system-its-ti-iam/uh-groupings-ui"
  },
  {
    id: 2,
    title: "AI Agent System",
    description: "Multi-agent system with LangGraph for complex task automation and data analysis workflows.",
    technologies: ["Python", "LangGraph", "FastAPI", "Next.js", "PostgreSQL", "Redis"],
    imageUrl: "/aiproject.png",
    projectUrl: "https://github.com/gitCarrot/OrchAI",
    githubUrl: "https://github.com/gitCarrot/OrchAI"
  },
];

export default function ProjectsSection() {
  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        className="mb-12 md:mb-16 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 section-title">Projects</h2>
        <p className="text-base md:text-lg text-[var(--text-primary)] dark:text-zinc-400 max-w-2xl mx-auto">
          Highlighting some of my recent work. Each project showcases my skills in 
          different areas of software development.
        </p>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mx-auto px-4 md:px-6 pb-12"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={staggerItemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}