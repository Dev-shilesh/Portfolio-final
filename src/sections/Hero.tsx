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
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=DM+Mono&display=swap');

            @property --angle {
              syntax: '<angle>';
              initial-value: 0deg;
              inherits: false;
            }

            @keyframes spinAngle {
              to {
                --angle: 360deg;
              }
            }

            @keyframes avatarPulse {
              from {
                transform: scale(1);
              }
              to {
                transform: scale(1.04);
              }
            }

            @keyframes availablePulse {
              0% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
              }
              70% {
                box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
              }
            }

            @keyframes floatA {
              from {
                transform: translateY(0);
              }
              to {
                transform: translateY(-10px);
              }
            }

            @keyframes floatB {
              from {
                transform: translateY(0);
              }
              to {
                transform: translateY(-10px);
              }
            }

            @keyframes floatC {
              from {
                transform: translateY(0);
              }
              to {
                transform: translateY(-10px);
              }
            }

            @keyframes cardEntry {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .profile-card-wrapper {
              position: relative;
              width: 300px;
              height: 380px;
              border-radius: 20px;
              padding: 2px;
              background: conic-gradient(from var(--angle), #7c3aed, #06b6d4, #7c3aed);
              animation: spinAngle 4s linear infinite, cardEntry 0.9s ease-out 0.3s forwards;
              box-shadow: 0 0 40px rgba(124, 58, 237, 0.3), 0 0 80px rgba(6, 182, 212, 0.15);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              overflow: visible;
              opacity: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .profile-card-wrapper:hover {
              transform: translateY(-6px);
              box-shadow: 0 0 50px rgba(124, 58, 237, 0.45), 0 0 100px rgba(6, 182, 212, 0.25);
            }

            .profile-card-inner {
              position: relative;
              width: 100%;
              height: 100%;
              border-radius: 18px;
              background: #0d0d1a;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 40px 30px;
              text-align: center;
            }

            .profile-avatar {
              width: 110px;
              height: 110px;
              border-radius: 50%;
              background: linear-gradient(135deg, #60a5fa, #818cf8, #a78bfa);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
              animation: avatarPulse 3s ease-in-out infinite alternate;
            }

            .profile-avatar span {
              color: white;
              font-size: 2rem;
              font-weight: 800;
              letter-spacing: 2px;
              font-family: 'Syne', sans-serif;
            }

            .profile-name {
              color: white;
              font-size: 1.5rem;
              font-weight: 700;
              margin-top: 20px;
              font-family: 'Syne', sans-serif;
            }

            .profile-subtitle {
              color: #818cf8;
              font-size: 0.75rem;
              letter-spacing: 3px;
              font-weight: 500;
              font-family: 'DM Mono', monospace;
              margin-top: 6px;
              margin-bottom: 20px;
            }

            .profile-badge {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: #064e3b;
              padding: 6px 16px;
              border-radius: 999px;
              color: #10b981;
              font-size: 0.85rem;
              font-weight: 600;
            }

            .profile-badge-dot {
              width: 8px;
              height: 8px;
              background: #10b981;
              border-radius: 50%;
              animation: availablePulse 1.5s infinite;
            }

            .floating-badge {
              position: absolute;
              background: #13131f;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 999px;
              padding: 8px 16px;
              font-size: 0.8rem;
              color: #e2e8f0;
              white-space: nowrap;
              display: flex;
              align-items: center;
              gap: 8px;
              z-index: 10;
            }

            .badge-azure {
              top: -18px;
              left: -30px;
              animation: floatA 3s ease-in-out infinite alternate;
            }

            .badge-react {
              top: -18px;
              right: -30px;
              animation: floatB 3s ease-in-out infinite alternate;
              animation-delay: 1s;
            }

            .badge-langchain {
              bottom: 60px;
              left: -40px;
              animation: floatC 3s ease-in-out infinite alternate;
              animation-delay: 2s;
            }
          `}</style>

          <div className="profile-card-wrapper">
            {/* Inner Content Box */}
            <div className="profile-card-inner">
              {/* Circular Logo Profile */}
              <div className="profile-avatar">
                <span>SM</span>
              </div>

              {/* Name */}
              <h2 className="profile-name">
                Shilesh Mavchi
              </h2>

              {/* Subtitle */}
              <p className="profile-subtitle">
                FULL STACK &bull; AI/ML
              </p>

              {/* Available Badge */}
              <div className="profile-badge">
                <span className="profile-badge-dot" />
                Available
              </div>
            </div>

            {/* Floating Badge Chip 1 (Top-Right) */}
            <div className="floating-badge badge-react">
              <span>⚡</span> React & Next.js
            </div>

            {/* Floating Badge Chip 2 (Bottom-Left) */}
            <div className="floating-badge badge-langchain">
              <span>🤖</span> LangChain & RAG
            </div>

            {/* Floating Badge Chip 3 (Top-Left) */}
            <div className="floating-badge badge-azure">
              <span>☁️</span> Azure Certified
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar (Full-Width Row Below Hero) */}
      <div
        ref={ref}
        className="max-w-7xl w-full mx-auto mt-24 rounded-3xl border border-[#7c3aed]/25 bg-gradient-to-r from-[#181335]/50 via-[#251C5C]/65 to-[#181335]/50 backdrop-blur-xl p-8 sm:p-12 shadow-[0_0_50px_rgba(124,58,237,0.15)] transition-all duration-300"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {[
            { label: 'Years of Experience', value: 6, suffix: '+' },
            { label: 'Projects Shipped', value: 20, suffix: '+' },
            { label: 'Technologies', value: 20, suffix: '+' },
            { label: 'Certifications', value: 4, suffix: '' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-1.5 md:border-r last:border-0 border-[#7c3aed]/20 w-full last-of-type:border-r-0"
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
              <span className="font-body text-xs md:text-sm text-slate-300 tracking-wide uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
