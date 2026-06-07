import React, { useRef } from 'react';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';
import { Briefcase, GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useUIStore } from '../store/useStore';

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useUIStore();
  const { ref: sectionRef } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      if (inView) setActiveSection('experience');
    },
  });

  // Scroll Progress for SVG Drawing Lines
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [headerRef, headerInView] = useInView({ triggerOnce: true });

  return (
    <section
      ref={sectionRef}
      id="experience"
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
          My Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-base text-slate-400 max-w-2xl leading-relaxed"
        >
          A timeline of my professional work experience, academic background, and official certifications.
        </motion.p>
      </div>

      {/* Columns Container */}
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative mb-24"
      >
        {/* Experience Column */}
        <div className="relative pl-8 sm:pl-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-10 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center text-[#7c3aed]">
              <Briefcase size={20} />
            </span>
            <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">
              Work Experience
            </h3>
          </div>

          {/* Scrolling Vertical SVG Line */}
          <div className="absolute left-[18px] top-12 bottom-0 w-[2px] bg-[#7c3aed]/10">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-[#7c3aed] to-[#06b6d4] rounded-full"
            />
          </div>

          {/* Timeline Cards */}
          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((exp, idx) => (
              <TimelineCard key={exp.id} item={exp} isLeft={true} index={idx} />
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="relative pl-8 sm:pl-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/30 flex items-center justify-center text-[#06b6d4]">
              <GraduationCap size={20} />
            </span>
            <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">
              Education
            </h3>
          </div>

          {/* Scrolling Vertical SVG Line */}
          <div className="absolute left-[18px] top-12 bottom-0 w-[2px] bg-[#06b6d4]/10">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-[#06b6d4] to-[#7c3aed] rounded-full"
            />
          </div>

          {/* Timeline Cards */}
          <div className="flex flex-col gap-10">
            {EDUCATION.map((edu, idx) => (
              <TimelineCard key={edu.id} item={edu} isLeft={false} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Row */}
      <div className="max-w-7xl mx-auto border-t border-[#7c3aed]/15 pt-16">
        <div className="flex items-center gap-3 mb-12 justify-center lg:justify-start">
          <span className="w-10 h-10 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7]">
            <Award size={20} />
          </span>
          <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">
            Licenses & Certifications
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <CertificationCard key={cert.id} cert={cert} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Sub-Component for Timeline Card
interface TimelineCardProps {
  item: any;
  isLeft: boolean;
  index: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, isLeft, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="relative flex flex-col items-start">
      {/* Pop-in Dot Indicator */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        className={`absolute left-[-26px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#06060f] z-10 flex items-center justify-center ${
          item.isCurrent
            ? 'border-[#7c3aed] shadow-[0_0_10px_#7c3aed]'
            : isLeft
            ? 'border-[#7c3aed]/60'
            : 'border-[#06b6d4]/60'
        }`}
      >
        {item.isCurrent && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-ping" />
        )}
      </motion.div>

      {/* Card Content Slider */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-full glass-card p-6 rounded-2xl border border-[#7c3aed]/15 shadow-md flex flex-col gap-3 group hover:border-[#7c3aed]/45 transition-colors duration-300"
      >
        {/* Period */}
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#a855f7] font-semibold">
          <Calendar size={13} />
          <span>{item.period}</span>
          {item.isCurrent && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-[#7c3aed]/15 text-[#7c3aed] font-mono text-[9px] uppercase tracking-wider">
              Current
            </span>
          )}
        </div>

        {/* Title / Role */}
        <div>
          <h4 className="font-syne font-bold text-base sm:text-lg text-white group-hover:text-[#06b6d4] transition-colors duration-300">
            {item.role || item.degree}
          </h4>
          <p className="font-body text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
            {item.company || item.institution}
          </p>
        </div>

        {/* Location & Details */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1 font-body text-xs text-slate-500">
            <MapPin size={12} />
            <span>{item.location}</span>
          </div>

          {/* Grade or Core Subjects */}
          {item.grade && (
            <span className="font-mono text-xs text-emerald-400 font-semibold px-2 py-1 rounded bg-emerald-500/10 w-fit">
              {item.grade}
            </span>
          )}
          {item.core && (
            <p className="font-body text-xs text-slate-400 border-l border-slate-700 pl-2.5">
              <strong className="text-slate-300">Core:</strong> {item.core}
            </p>
          )}

          {/* Achievements bullets */}
          {item.points && (
            <ul className="list-none flex flex-col gap-2 font-body text-xs text-slate-300 mt-1">
              {item.points.map((pt: string, pIdx: number) => (
                <li key={pIdx} className="flex gap-2 items-start leading-relaxed">
                  <span className="text-[#7c3aed] text-sm leading-none mt-0.5">▸</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Sub-Component for Certification Card
interface CertificationCardProps {
  cert: any;
  index: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ cert, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-5 rounded-2xl border border-[#7c3aed]/15 flex flex-col justify-between gap-4 hover:border-[#a855f7]/50 hover:shadow-[0_0_16px_rgba(168,85,247,0.15)] transition-all duration-300"
    >
      <div className="flex flex-col gap-3">
        {/* Icon */}
        <span className="text-2xl w-10 h-10 rounded-xl bg-[#06060f] flex items-center justify-center border border-[#7c3aed]/10 shadow-[inset_0_0_8px_rgba(124,58,237,0.05)]">
          {cert.icon}
        </span>
        
        {/* Details */}
        <div>
          <h4 className="font-syne font-bold text-sm sm:text-base text-white tracking-wide leading-snug line-clamp-2">
            {cert.title}
          </h4>
          <p className="font-body text-xs text-slate-400 mt-1">
            {cert.issuer}
          </p>
        </div>
      </div>

      {/* Date */}
      <span className="font-mono text-[10px] font-semibold text-[#a855f7] tracking-wider uppercase bg-[#7c3aed]/10 px-2.5 py-1 rounded w-fit border border-[#7c3aed]/10">
        {cert.dateOrStatus}
      </span>
    </motion.div>
  );
};
