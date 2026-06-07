import React, { useEffect, useState } from 'react';
import { useUIStore } from '../store/useStore';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Works', href: '#works', id: 'works' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const { isMobileMenuOpen, activeSection, setMobileMenuOpen, setActiveSection } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-4 bg-[#06060f]/85 backdrop-blur-md border-b border-[#7c3aed]/15 shadow-lg shadow-[#06060f]/20'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about', 'about')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-mono text-[#7c3aed] font-bold text-xl group-hover:text-[#06b6d4] transition-colors duration-300">
              &lt;/&gt;
            </span>
            <span className="font-syne font-bold text-xl text-white tracking-wide">
              Shilesh
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`relative py-1 font-body text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#7c3aed] rounded-full shadow-[0_0_8px_#7c3aed]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Hire Me CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-[1.02]"
            >
              Hire Me
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#7c3aed] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Slide-in */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[76px] z-30 bg-[#06060f]/95 backdrop-blur-lg border-b border-[#7c3aed]/15 md:hidden flex flex-col justify-center items-center gap-8 py-12 px-6"
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`text-xl font-syne font-medium tracking-wide transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.2)]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className="flex items-center gap-2 px-8 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-[1.02]"
            >
              Hire Me
              <ArrowRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
