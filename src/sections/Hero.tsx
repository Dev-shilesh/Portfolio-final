import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
  start?: number;
  end: number;
  duration: number;
  delay?: number;
}

const CountUp: React.FC<CountUpProps> = ({ start = 0, end, duration, delay = 0 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Custom cubic ease-out calculation for smooth visual transition
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(start + easeOut * (end - start)));

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        }
      };
      animationFrameId = window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [start, end, duration, delay]);

  return <span>{count}</span>;
};


export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  const handleHireMeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex flex-col justify-center items-center py-20 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column - Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/10 font-mono text-xs font-semibold text-green-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {PERSONAL_INFO.availability}
          </motion.div>

          {/* Hello name tag */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-[#06b6d4] font-mono text-sm tracking-wider uppercase"
          >
            Hello, I am {PERSONAL_INFO.name}
          </motion.span>

          {/* H1 Headline */}
          <h1 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block"
            >
              Shilesh Mavchi
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block gradient-text font-bold"
            >
              Full Stack Developer +
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block gradient-text-cyan font-bold"
            >
              AI / ML Engineer
            </motion.span>
          </h1>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-base md:text-lg text-slate-400 leading-relaxed max-w-xl"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <a
              href="#contact"
              onClick={handleHireMeClick}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:shadow-[0_0_32px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-[1.02]"
            >
              Hire Me
              <ArrowRight size={16} />
            </a>
            <a
              href="/resume.pdf"
              download="Shilesh_Mavchi_Resume.pdf"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white border border-[#7c3aed]/30 bg-[#0e0e1c]/40 hover:bg-[#7c3aed]/10 hover:border-[#7c3aed]/60 transition-all duration-300"
            >
              Download CV
              <Download size={16} />
            </a>
          </motion.div>

          {/* Social Icons Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-4 mt-4"
          >
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-[#7c3aed]/25 bg-[#0e0e1c]/70 flex items-center justify-center text-slate-300 hover:text-[#7c3aed] hover:border-[#7c3aed]/60 hover:shadow-[0_0_16px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-[#7c3aed]/25 bg-[#0e0e1c]/70 flex items-center justify-center text-slate-300 hover:text-[#06b6d4] hover:border-[#06b6d4]/60 hover:shadow-[0_0_16px_rgba(6,182,212,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-11 h-11 rounded-full border border-[#7c3aed]/25 bg-[#0e0e1c]/70 flex items-center justify-center text-slate-300 hover:text-[#a855f7] hover:border-[#a855f7]/60 hover:shadow-[0_0_16px_rgba(168,85,247,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="Send Email"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right Column - Visual Mockup */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl p-1.5 bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] shadow-[0_0_40px_rgba(124,58,237,0.25)]"
          >
            {/* Inner Content Box */}
            <div className="w-full h-full rounded-[14px] bg-[#0e0e1c] overflow-hidden flex items-center justify-center relative group">
              {/* Actual photo, if not loaded/configured show premium placeholder */}
              {!imgError ? (
                <img
                  src="/images/profile.jpg"
                  alt="Shilesh Mavchi"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 text-center p-6 w-full h-full bg-gradient-to-b from-[#0e0e1c] to-[#06060f]">
                  <span className="font-syne font-extrabold text-6xl text-slate-600 tracking-wider">
                    SM
                  </span>
                  <div className="font-mono text-xs text-slate-500 py-1 px-3 border border-slate-700 rounded-full">
                    Full Stack & AI Developer
                  </div>
                </div>
              )}
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#06060f]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Floating Badge Chip 1 (Top-Right) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 px-4 py-2 rounded-xl glass-card text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg border border-[#7c3aed]/30 hover:border-[#7c3aed] transition-colors"
            >
              <span>⚡</span> React & Next.js
            </motion.div>

            {/* Floating Badge Chip 2 (Bottom-Left) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 px-4 py-2 rounded-xl glass-card text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg border border-[#06b6d4]/30 hover:border-[#06b6d4] transition-colors"
            >
              <span>🤖</span> LangChain & RAG
            </motion.div>

            {/* Floating Badge Chip 3 (Top-Left) */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute top-12 -left-12 px-4 py-2 rounded-xl glass-card text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg border border-[#a855f7]/30 hover:border-[#a855f7] transition-colors"
            >
              <span>☁️</span> Azure Certified
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar (Full-Width Row Below Hero) */}
      <div
        ref={ref}
        className="max-w-7xl w-full mx-auto mt-24 border-t border-[#7c3aed]/15 pt-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {[
            { label: 'Years of Experience', value: 3, suffix: '+' },
            { label: 'Projects Shipped', value: 6, suffix: '+' },
            { label: 'Technologies', value: 20, suffix: '+' },
            { label: 'Certifications', value: 4, suffix: '' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-1.5 md:border-r last:border-0 border-[#7c3aed]/15 w-full last-of-type:border-r-0"
            >
              <span className="font-syne font-extrabold text-4xl sm:text-5xl text-white tracking-tight flex items-baseline justify-center">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={1.5}
                    delay={idx * 0.1}
                  />
                ) : (
                  '0'
                )}
                <span className="text-[#a855f7] font-semibold">{stat.suffix}</span>
              </span>
              <span className="font-body text-xs md:text-sm text-slate-400 tracking-wide uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
