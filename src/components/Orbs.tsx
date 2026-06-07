import React from 'react';

export const Orbs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Orb 1: Violet/Purple (Top-Left area) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#7c3aed] opacity-[0.25] blur-[120px] animate-float-slow" />
      
      {/* Orb 2: Cyan (Top-Right area) */}
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#06b6d4] opacity-[0.2] blur-[120px] animate-float-medium" />
      
      {/* Orb 3: Indigo (Bottom-Left to Center area) */}
      <div className="absolute bottom-[-10%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#4f46e5] opacity-[0.22] blur-[140px] animate-float-fast" />
    </div>
  );
};
