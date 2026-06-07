import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useUIStore } from '../store/useStore';

type FilterType = 'All' | 'AI/ML' | 'SaaS/Web' | 'Mobile' | 'Backend';
const FILTERS: FilterType[] = ['All', 'AI/ML', 'SaaS/Web', 'Mobile', 'Backend'];

export const Works: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { setActiveSection } = useUIStore();

  const { ref: sectionRef } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      if (inView) setActiveSection('works');
    },
  });

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative z-10 py-24 px-6 md:px-12 bg-transparent"
    >
      <div
        ref={ref}
        className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4 mb-12"
      >
        <motion.h2
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase"
        >
          My Recent Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-base text-slate-400 max-w-2xl leading-relaxed"
        >
          Production-deployed projects — real stacks, real problems solved.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-2 mb-16 border-b border-[#7c3aed]/10 pb-6">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeFilter === filter
                ? 'bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white shadow-[0_0_16px_rgba(124,58,237,0.3)]'
                : 'bg-[#0e0e1c]/40 border border-[#7c3aed]/10 text-slate-400 hover:text-white hover:border-[#7c3aed]/30'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative overflow-hidden rounded-2xl glass-card group flex flex-col h-[400px] border border-[#7c3aed]/15 shadow-lg group"
              >
                {/* Fallback image cover */}
                <div className="h-44 sm:h-48 bg-gradient-to-br from-[#0e0e1c] to-[#06060f] relative overflow-hidden flex items-center justify-center p-6 border-b border-[#7c3aed]/10">
                  <div className="absolute inset-0 bg-[#7c3aed]/5 opacity-30 pointer-events-none" />
                  
                  {/* Glowing text inside fallback thumbnail */}
                  <span className="font-syne font-extrabold text-3xl text-slate-700 select-none group-hover:scale-105 transition-transform duration-500">
                    {project.title}
                  </span>

                  {/* Category Status Badge */}
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full border border-[#7c3aed]/35 bg-[#0e0e1c] font-mono text-[10px] font-semibold text-[#a855f7] tracking-wider uppercase shadow-md">
                    {project.statusBadge}
                  </span>
                </div>

                {/* Default Card Body Info */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-syne font-bold text-lg sm:text-xl text-white tracking-wide">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-[#06b6d4] font-medium tracking-wide">
                      {project.headline}
                    </p>
                    <p className="font-body text-xs text-slate-400 leading-relaxed line-clamp-2 mt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badges at bottom */}
                  <div className="flex flex-wrap gap-1.5 mt-4 overflow-hidden h-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded border border-[#7c3aed]/15 bg-[#06060f]/60 font-mono text-[9px] text-[#a855f7]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="font-mono text-[9px] text-slate-500 self-center">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Details Panel Overlay */}
                <div className="absolute inset-0 bg-[#0e0e1c] opacity-0 group-hover:opacity-100 flex flex-col justify-between p-6 transition-all duration-300 z-10 border border-[#7c3aed]/30 rounded-2xl overflow-y-auto">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-syne font-bold text-lg text-white">
                          {project.title}
                        </h4>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#06b6d4] border border-[#06b6d4]/20 bg-[#06b6d4]/5 px-2.5 py-0.5 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <p className="font-body text-xs text-[#a855f7] font-semibold">
                        {project.headline}
                      </p>
                    </div>

                    {/* Achievements bullets */}
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Key Achievements:
                      </span>
                      <ul className="list-disc pl-4 space-y-1.5 text-[11px] sm:text-xs text-slate-300 font-body">
                        {project.keyAchievements.map((item, index) => (
                          <li key={index} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges List */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded border border-[#7c3aed]/20 bg-[#06060f] font-mono text-[9px] text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center gap-3 border-t border-[#7c3aed]/10 pt-4 mt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#06060f] border border-[#7c3aed]/20 hover:border-[#7c3aed] text-xs font-semibold text-white transition-all cursor-pointer"
                      >
                        <Github size={13} />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] text-xs font-semibold text-white transition-all cursor-pointer"
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
