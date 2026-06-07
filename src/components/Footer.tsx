import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative z-10 border-t border-[#7c3aed]/15 bg-[#06060f]/60 backdrop-blur-md pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#7c3aed] font-bold text-lg">&lt;/&gt;</span>
              <span className="font-syne font-bold text-lg text-white">Shilesh Mavchi</span>
            </div>
            <p className="font-body text-sm text-slate-400">
              Full Stack Engineer · AI/ML Developer · Nashik, India
            </p>
          </div>

          {/* Center Links */}
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {['About', 'Services', 'Works', 'Experience', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                className="font-body text-sm text-slate-400 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Socials */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#7c3aed]/20 bg-[#0e0e1c] flex items-center justify-center text-slate-300 hover:text-[#7c3aed] hover:border-[#7c3aed]/50 hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] transition-all duration-300 cursor-pointer"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#7c3aed]/20 bg-[#0e0e1c] flex items-center justify-center text-slate-300 hover:text-[#06b6d4] hover:border-[#06b6d4]/50 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-10 h-10 rounded-full border border-[#7c3aed]/20 bg-[#0e0e1c] flex items-center justify-center text-slate-300 hover:text-[#a855f7] hover:border-[#a855f7]/50 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-pointer"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#7c3aed]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-body text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Shilesh Mavchi. Built with React & passion. All rights reserved.
          </p>
          <p className="font-body text-xs text-slate-600">
            Nashik, Maharashtra, India
          </p>
        </div>
      </div>
    </footer>
  );
};
