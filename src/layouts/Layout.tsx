import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Orbs } from '../components/Orbs';
import { Grain } from '../components/Grain';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Update Zustand or local listeners if scroll coordinates are needed elsewhere
    // We can also connect scroll coordinates to GSAP ScrollTrigger if necessary
    
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06060f] text-white selection:bg-[#7c3aed] selection:text-white">
      {/* Texture grain overlay */}
      <Grain />

      {/* Floating radial glow shapes */}
      <Orbs />

      {/* Header Sticky Navbar */}
      <Navbar />

      {/* Main Single Page Contents */}
      <main className="relative z-10 pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
