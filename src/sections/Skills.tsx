import React from 'react';
import { SKILL_CATEGORIES, TECH_TAGS } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useUIStore } from '../store/useStore';

export const Skills: React.FC = () => {
  const { ref: sectionRef } = useInView({
    threshold: 0.15,
    onChange: (inView) => {
      if (inView) setActiveSection('skills');
    },
  });

  const { setActiveSection } = useUIStore();
  const [headerRef, headerInView] = useInView({ triggerOnce: true });
  const [listRef, listInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [cloudRef, cloudInView] = useInView({ triggerOnce: true });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 py-24 px-6 md:px-12 bg-transparent"
    >
      {/* Title */}
      <div
        ref={headerRef}
        className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4 mb-20"
      >
        <motion.h2
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={headerInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase"
        >
          My Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-base text-slate-400 max-w-2xl leading-relaxed"
        >
          A full-spectrum toolkit — from pixel to pipeline to production.
        </motion.p>
      </div>

      {/* Skills Group Grid */}
      <div
        ref={listRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
      >
        {SKILL_CATEGORIES.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 30 }}
            animate={listInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
            className="glass-card p-6 sm:p-8 rounded-2xl border border-[#7c3aed]/15 flex flex-col gap-6"
          >
            {/* Category Header */}
            <h3 className="font-syne font-bold text-base text-[#06b6d4] tracking-wider uppercase border-b border-[#7c3aed]/10 pb-3">
              {cat.category}
            </h3>

            {/* Skills List */}
            <div className="flex flex-col gap-5">
              {cat.items.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                  parentInView={listInView}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech Tag Cloud */}
      <div ref={cloudRef} className="max-w-4xl mx-auto text-center border-t border-[#7c3aed]/15 pt-16">
        <h3 className="font-syne font-bold text-lg text-white mb-8 tracking-wide uppercase">
          Technologies Cloud
        </h3>

        <motion.div
          initial="hidden"
          animate={cloudInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.02
              }
            }
          }}
          className="flex flex-wrap justify-center items-center gap-3"
        >
          {TECH_TAGS.map((tag) => (
            <motion.span
              key={tag}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              className="px-3.5 py-1.5 rounded-full border border-[#7c3aed]/15 bg-[#0e0e1c]/50 font-mono text-xs text-slate-300 shadow-[0_0_8px_rgba(124,58,237,0.02)] hover:border-[#7c3aed] hover:text-[#7c3aed] hover:shadow-[0_0_12px_rgba(124,58,237,0.25)] transition-all duration-300 hover:scale-105 select-none"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Subcomponent for Skill Progress Bar
interface SkillBarProps {
  name: string;
  percentage: number;
  parentInView: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, parentInView }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Title & value */}
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="font-body text-slate-200">{name}</span>
        <span className="font-mono text-[#a855f7]">{percentage}%</span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 rounded-full bg-[#06060f] border border-[#7c3aed]/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={parentInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-full"
        />
      </div>
    </div>
  );
};
