import React, { useState } from 'react';
import { SERVICES } from '../data/portfolioData';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useUIStore } from '../store/useStore';

export const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('full-stack-web');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { setActiveSection } = useUIStore();

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Keep track of active section on scroll
  const { ref: sectionRef } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('services');
    },
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative z-10 py-24 px-6 md:px-12 bg-transparent"
    >
      <div
        ref={ref}
        className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4 mb-16"
      >
        {/* Section Title Clip-Path Swipe equivalent */}
        <motion.h2
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase"
        >
          My Quality Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-base text-slate-400 max-w-2xl leading-relaxed"
        >
          End-to-end development — from database schema to deployed product. I own the full stack.
        </motion.p>
      </div>

      {/* Accordion Container */}
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {SERVICES.map((service, index) => {
          const isOpen = expandedId === service.id;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#0e0e1c]/80 border-l-[4px] border-l-[#7c3aed] border-y border-r border-[#7c3aed]/25 shadow-lg shadow-[#7c3aed]/5'
                  : 'bg-[#0e0e1c]/40 border-l-[4px] border-l-transparent border border-[#7c3aed]/10 hover:border-[#7c3aed]/30'
              }`}
            >
              {/* Header Toggle Row */}
              <button
                onClick={() => handleToggle(service.id)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Icon Indicator */}
                  <span
                    className={`font-mono text-xl sm:text-2xl flex items-center justify-center w-12 h-12 rounded-xl bg-[#06060f] border border-[#7c3aed]/20 text-[#7c3aed] group-hover:text-[#06b6d4] transition-colors duration-300 ${
                      isOpen ? 'shadow-[0_0_12px_rgba(124,58,237,0.3)]' : ''
                    }`}
                  >
                    {service.icon}
                  </span>

                  {/* Title & Tag */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                    <span
                      className={`font-syne font-bold text-lg sm:text-xl transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {service.title}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full border border-slate-700 bg-slate-800/50 font-mono text-[10px] text-slate-400 uppercase w-fit">
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Rotating arrow indicator */}
                <span
                  className={`w-8 h-8 rounded-full bg-[#06060f] border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-all duration-300 ${
                    isOpen ? 'rotate-45 border-[#7c3aed] text-white' : ''
                  }`}
                >
                  <ChevronRight size={18} />
                </span>
              </button>

              {/* Collapsible Pane */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-8 pl-[76px] sm:pl-[88px] pr-6 sm:pr-8 flex flex-col gap-5 border-t border-[#7c3aed]/10 pt-4">
                      {/* Expanded description */}
                      <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed">
                        {service.expandedText}
                      </p>

                      {/* Tech badges strip */}
                      <div className="flex flex-wrap items-center gap-2">
                        {service.techBadges.map((badge) => (
                          <span
                            key={badge}
                            className="px-3 py-1 rounded-full border border-[#7c3aed]/20 bg-[#06060f]/60 font-mono text-[11px] text-[#a855f7] shadow-[inset_0_0_8px_rgba(124,58,237,0.05)] hover:border-[#7c3aed]/50 hover:text-white transition-colors duration-200"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
