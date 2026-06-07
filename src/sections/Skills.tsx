import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useUIStore } from '../store/useStore';

// Custom SVG Icons with clean shapes & brand colors
const ReactIcon = () => (
  <svg className="w-5 h-5 text-[#00D8FF] animate-[spin_12s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const NextjsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="4"/>
    <path d="M149.508 157.52L69.142 54H54V126H68.858V76.4803L139.117 166.702C142.825 163.957 146.305 160.879 149.508 157.52Z" fill="white"/>
    <path d="M126 54H111.142V126H126V54Z" fill="white"/>
  </svg>
);

const TypeScriptIcon = () => (
  <svg className="w-5 h-5 rounded-[4px] overflow-hidden" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#3178C6"/>
    <text x="30" y="72" fill="white" fontSize="36" fontWeight="bold" fontFamily="sans-serif">TS</text>
  </svg>
);

const NodejsIcon = () => (
  <svg className="w-5 h-5 text-[#339933]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.25 15.3c-.85.5-1.9.7-2.9.7-2 0-3.3-1-3.3-2.8 0-1.7 1.3-2.6 3.3-2.6 1 0 1.9.2 2.9.6v4.1zm0-5.2c-.8-.3-1.7-.5-2.7-.5-1.3 0-2 .5-2 1.3 0 .8.6 1.2 1.8 1.2 1 0 2-.2 2.9-.6v-1.4z"/>
  </svg>
);

const FastAPIIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#009485"/>
    <path d="M13 4L6 13h6l-1 7 7-9h-6l1-7z" fill="white"/>
  </svg>
);

const DjangoIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#092E20"/>
    <text x="5" y="16" fill="#44B78B" fontSize="11" fontWeight="bold" fontFamily="monospace">dj</text>
  </svg>
);

const PythonIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.002 2c-2.73 0-5.023.167-6.24.475C4.24 2.856 3 4.14 3 5.66v2.247c0 1.096.88 1.986 1.968 1.986h1.968v.993c0 .822.668 1.49 1.488 1.49h5.58c.82 0 1.488-.668 1.488-1.49V8.895c0-.822-.668-1.49-1.488-1.49H8.424V5.42C8.424 4.598 9.092 3.93 9.912 3.93h4.092V2z" fill="#3776AB"/>
    <path d="M11.998 22c2.73 0 5.023-.167 6.24-.475 1.522-.381 2.762-1.665 2.762-3.185v-2.247c0-1.096-.88-1.986-1.968-1.986h-1.968v-.993c0-.822-.668-1.49-1.488-1.49h-5.58c-.82 0-1.488.668-1.488 1.49v2.49c0 .822.668 1.49 1.488 1.49h5.58v1.985c0 .822-.668 1.49-1.488 1.49H9.996V22h2.002z" fill="#FFE873"/>
    <circle cx="9.2" cy="6.2" r="0.75" fill="white"/>
    <circle cx="14.8" cy="17.8" r="0.75" fill="black"/>
  </svg>
);

const DockerIcon = () => (
  <svg className="w-5 h-5 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V9.006a.185.185 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.93 0h2.118a.185.185 0 0 0 .186-.185V9.006a.185.185 0 0 0-.186-.186h-2.118a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m-2.937 0h2.118a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H8.116a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.152a.185.185 0 0 0-.186.185v1.887c0 .102.084.186.186.186m-2.93 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H2.222a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m1.022-3h2.119a.185.185 0 0 0 .185-.186V6.005a.185.185 0 0 0-.185-.186H3.244a.185.185 0 0 0-.185.186v1.887c0 .102.083.186.185.186m2.964 0h2.119a.185.185 0 0 0 .185-.186V6.005a.185.185 0 0 0-.185-.186H6.208a.185.185 0 0 0-.185.186v1.887c0 .102.083.186.185.186m2.928 0h2.119a.185.185 0 0 0 .185-.186V6.005a.185.185 0 0 0-.185-.186H9.136a.185.185 0 0 0-.185.186v1.887c0 .102.083.186.185.186m2.94 0h2.119a.185.185 0 0 0 .185-.186V6.005a.185.185 0 0 0-.185-.186h-2.119a.185.185 0 0 0-.185.186v1.887c0 .102.083.186.185.186M15 2.993a.185.185 0 0 0-.186-.185h-2.119a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.185H14.8a.185.185 0 0 0 .185-.185V2.993zm9 7.37c-.088-.06-.097-.09-.328-.156-.37-.104-.653-.129-.947-.129-.304 0-.918.151-1.267.579-.44.539-.37 1.576-.328 1.98.05.48.243.834.469.834.025 0 .05-.001.078-.004 1.127-.124 1.704-.457 2.19-.848.36-.289.48-.41.513-.748.016-.175.002-.323-.05-.444-.093-.215-.224-.315-.33-.377m-5.88 5.163c-.11-.539-.31-.81-.62-1.047-.276-.213-.647-.38-1.432-.38h-8.22c-.081 0-.152.012-.223.034-2.868.887-3.698-.218-3.707-.23-.07-.088-.17-.116-.27-.08-.1.04-.16.13-.16.24v.5c0 1.206.084 2.264.911 3.116.699.719 1.626 1.082 2.756 1.082h7.02c.256 0 .5-.05.7-.13.9-.37 1.4-1.25 1.7-2.07.13-.35.25-.71.3-1.035" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const AWSIcon = () => (
  <svg className="w-5 h-5 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.9 8.2c-.3-.2-.7-.4-1.1-.5-.8-.1-1.3.3-1.3.8 0 .5.4.7 1.1.9.9.2 2 .5 2 1.7 0 1.2-1 2-2.4 2-1 0-1.8-.3-2.3-.6v-1.3c.4.3.9.5 1.5.5.6 0 1-.2 1-.7s-.3-.6-1-.8c-1-.2-2.1-.5-2.1-1.7 0-1.1.9-2 2.4-2 .8 0 1.6.2 2 .4l-.2 1.3zm3.7 3.3c.1-.4.2-1 .2-1.6h.1c.2.6.5 1.2.7 1.6l1.3 3.7h1.4l-3-7.5h-1.4l-3 7.5h1.4l1.3-3.7zM4.3 12c.1-.4.2-1 .2-1.6h.1c.2.6.5 1.2.7 1.6l1.3 3.7h1.4l-3-7.5H6.9l-3 7.5h1.4l1.3-3.7z"/>
    <path d="M3.5 19.3c5-2.8 12.1-2.8 17 0 .4.2.8 0 .6-.4-1.3-2.5-4.4-4.2-8.3-4.2s-7 1.7-8.3 4.2c-.2.4.2.6.6.4z"/>
  </svg>
);

const NestJSIcon = () => (
  <svg className="w-5 h-5 text-[#E0234E]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7.7v11.1L12 22l10-3.2V7.7L12 2zm7.2 15.3L12 20.2l-7.2-4.9V9.7L12 6.1l7.2 3.6v7.6z"/>
  </svg>
);

const PostgreSQLIcon = () => (
  <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.1 14H9.9v-1.1c.5-.1.9-.3 1.2-.6.3-.3.5-.7.5-1.2V9.9h-1.7V8.8h3.9c.7 0 1.2.2 1.6.5.4.3.6.8.6 1.4v2.2c0 .6-.2 1.1-.6 1.4-.4.4-1 .6-1.9.7z"/>
  </svg>
);

const MongoDBIcon = () => (
  <svg className="w-5 h-5 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
  </svg>
);

const SupabaseIcon = () => (
  <svg className="w-5 h-5 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v8.8h6.8L12 22v-8.8H5.2L12 2z"/>
  </svg>
);

const MySQLIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#00758F"/>
    <text x="3" y="15" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">SQL</text>
  </svg>
);

const RedisIcon = () => (
  <svg className="w-5 h-5 text-[#DC382D]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 10L2 17l10 5 10-5-10-5z"/>
  </svg>
);

const LangChainIcon = () => (
  <span className="text-sm select-none">🦜</span>
);

const RAGPipIcon = () => (
  <svg className="w-5 h-5 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="3" fill="#8B5CF6" />
    <circle cx="18" cy="18" r="3" fill="#06B6D4" />
    <circle cx="18" cy="6" r="3" fill="#A855F7" />
    <line x1="9" y1="6" x2="15" y2="6" />
    <line x1="6" y1="9" x2="15" y2="18" />
    <line x1="18" y1="9" x2="18" y2="15" />
  </svg>
);

const AzureIcon = () => (
  <svg className="w-5 h-5 text-[#0078D4]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 19h7l3-6.5 3 6.5h7L12 2z"/>
  </svg>
);

const VercelIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 22.5H0L12 1.5L24 22.5z"/>
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-5 h-5 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"/>
  </svg>
);

const FramerMotionIcon = () => (
  <svg className="w-5 h-5 text-[#F024B6]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h12v12H0V0zm0 12h12l12 12H12v-12H0zm24 0H12V0h12v12z"/>
  </svg>
);

const HTML5CSS3Icon = () => (
  <svg className="w-5 h-5 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.4 6H7.1l.3 3.5h7.7l-.3 3.6-2.8.9-2.8-.9-.2-2H5.8l.4 5.3 5.8 1.9 5.8-1.9.9-10.4H16.9z"/>
  </svg>
);

const PHPIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#777BB4"/>
    <text x="3" y="15" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PHP</text>
  </svg>
);

const CICDIcon = () => (
  <svg className="w-5 h-5 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Neon Accent Diagonal Lines Component for background
const NeonGlowLines = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="neon-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#00E5FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="neon-violet" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7B61FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#7B61FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="-10%" y1="15%" x2="110%" y2="75%" stroke="url(#neon-cyan)" strokeWidth="1.5" />
      <line x1="110%" y1="25%" x2="-10%" y2="85%" stroke="url(#neon-violet)" strokeWidth="1.5" />
    </svg>
  </div>
);

// Unified skill items structures
interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

const frontendSkills: SkillItem[] = [
  { name: 'React.js', icon: <ReactIcon /> },
  { name: 'Next.js', icon: <NextjsIcon /> },
  { name: 'TypeScript', icon: <TypeScriptIcon /> },
  { name: 'Tailwind CSS', icon: <TailwindIcon /> },
  { name: 'Framer Motion', icon: <FramerMotionIcon /> },
  { name: 'React Native', icon: <ReactIcon /> },
  { name: 'HTML5 / CSS3', icon: <HTML5CSS3Icon /> }
];

const backendSkills: SkillItem[] = [
  { name: 'Node.js/Express', icon: <NodejsIcon /> },
  { name: 'FastAPI', icon: <FastAPIIcon /> },
  { name: 'Django REST', icon: <DjangoIcon /> },
  { name: 'NestJS', icon: <NestJSIcon /> },
  { name: 'PHP Yii2', icon: <PHPIcon /> }
];

const databaseSkills: SkillItem[] = [
  { name: 'PostgreSQL', icon: <PostgreSQLIcon /> },
  { name: 'MongoDB', icon: <MongoDBIcon /> },
  { name: 'Supabase', icon: <SupabaseIcon /> },
  { name: 'MySQL', icon: <MySQLIcon /> },
  { name: 'Redis', icon: <RedisIcon /> }
];

const aiSkills: SkillItem[] = [
  { name: 'LangChain', icon: <LangChainIcon /> },
  { name: 'RAG Pipelines', icon: <RAGPipIcon /> },
  { name: 'Azure AI', icon: <AzureIcon /> },
  { name: 'Python ML', icon: <PythonIcon /> }
];

const devopsSkills: SkillItem[] = [
  { name: 'Git / GitHub', icon: <GitHubIcon /> },
  { name: 'Docker', icon: <DockerIcon /> },
  { name: 'Vercel / Netlify', icon: <VercelIcon /> },
  { name: 'AWS', icon: <AWSIcon /> },
  { name: 'Azure Cloud', icon: <AzureIcon /> },
  { name: 'CI/CD Pipelines', icon: <CICDIcon /> }
];

// Single Pill Row component inside Cards (Clean, unified styling)
const SkillPill: React.FC<{ item: SkillItem }> = ({ item }) => {
  return (
    <div className="flex items-center w-full h-[48px] px-4 rounded-lg border border-white/5 bg-[#161233]/30 hover:border-white/15 hover:bg-[#1C1742]/55 hover:scale-[1.02] transition-all duration-200 select-none min-w-0 gap-[10px]">
      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
        {item.icon}
      </div>
      <span className="text-[14px] font-medium text-white truncate min-w-0">
        {item.name}
      </span>
    </div>
  );
};

// Card Wrapper component with customized glowing borders & labels
interface CardProps {
  title: string;
  titleColor: string;
  borderColor: string;
  glowColor: string;
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}

const SkillCard: React.FC<CardProps> = ({ title, titleColor, borderColor, glowColor, children, delay = 0, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`p-6 sm:p-8 rounded-2xl border bg-[#0D0B1E]/40 backdrop-blur-xl flex flex-col gap-6 shadow-2xl transition-all duration-300 h-full w-full ${borderColor} ${glowColor}`}
    >
      <h3 className={`font-syne font-bold text-sm tracking-widest uppercase border-b border-white/5 pb-3 ${titleColor}`}>
        {title}
      </h3>
      <div className="flex-grow">
        {children}
      </div>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  const { setActiveSection } = useUIStore();
  const { ref: sectionRef } = useInView({
    threshold: 0.15,
    onChange: (inView) => {
      if (inView) setActiveSection('skills');
    },
  });

  const [headerRef, headerInView] = useInView({ triggerOnce: true });
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      {/* Background Decorators */}
      <NeonGlowLines />

      {/* Header */}
      <div
        ref={headerRef}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-4 mb-20"
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

      {/* Skills 3x2 Asymmetrical Layout Grid */}
      <div
        ref={gridRef}
        className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6 md:gap-8"
      >
        {/* Top Row Cards - col-span-2 each (forms 3 columns) */}
        
        {/* FRONTEND */}
        <div className="lg:col-span-2 h-full">
          <SkillCard
            title="FRONTEND"
            titleColor="text-teal-400"
            borderColor="border-[#00E5FF]/20 hover:border-[#00E5FF]/50"
            glowColor="shadow-[0_0_20px_rgba(0,229,255,0.03)] hover:shadow-[0_0_30px_rgba(0,229,255,0.12)]"
            delay={0}
            inView={gridInView}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <SkillPill item={frontendSkills[0]} /> {/* React.js */}
              </div>
              <div className="col-span-1">
                <SkillPill item={frontendSkills[1]} /> {/* Next.js */}
              </div>
              <div className="col-span-1">
                <SkillPill item={frontendSkills[2]} /> {/* TypeScript */}
              </div>
              <div className="col-span-1">
                <SkillPill item={frontendSkills[3]} /> {/* Tailwind CSS */}
              </div>
              <div className="col-span-1">
                <SkillPill item={frontendSkills[4]} /> {/* Framer Motion */}
              </div>
              <div className="col-span-1">
                <SkillPill item={frontendSkills[5]} /> {/* React Native */}
              </div>
              <div className="col-span-1">
                <SkillPill item={frontendSkills[6]} /> {/* HTML5 / CSS3 */}
              </div>
            </div>
          </SkillCard>
        </div>

        {/* BACKEND */}
        <div className="lg:col-span-2 h-full">
          <SkillCard
            title="BACKEND"
            titleColor="text-[#7B61FF]"
            borderColor="border-[#7B61FF]/20 hover:border-[#7B61FF]/50"
            glowColor="shadow-[0_0_20px_rgba(123,97,255,0.03)] hover:shadow-[0_0_30px_rgba(123,97,255,0.12)]"
            delay={0.1}
            inView={gridInView}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <SkillPill item={backendSkills[0]} /> {/* Node.js/Express */}
              </div>
              <div className="col-span-1">
                <SkillPill item={backendSkills[1]} /> {/* FastAPI */}
              </div>
              <div className="col-span-1">
                <SkillPill item={backendSkills[2]} /> {/* Django REST */}
              </div>
              <div className="col-span-1">
                <SkillPill item={backendSkills[3]} /> {/* NestJS */}
              </div>
              <div className="col-span-1">
                <SkillPill item={backendSkills[4]} /> {/* PHP Yii2 */}
              </div>
            </div>
          </SkillCard>
        </div>

        {/* DATABASES */}
        <div className="lg:col-span-2 h-full">
          <SkillCard
            title="DATABASES"
            titleColor="text-[#3D9BFF]"
            borderColor="border-[#3D9BFF]/20 hover:border-[#3D9BFF]/50"
            glowColor="shadow-[0_0_20px_rgba(61,155,255,0.03)] hover:shadow-[0_0_30px_rgba(61,155,255,0.12)]"
            delay={0.2}
            inView={gridInView}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <SkillPill item={databaseSkills[0]} /> {/* PostgreSQL */}
              </div>
              <div className="col-span-1">
                <SkillPill item={databaseSkills[1]} /> {/* MongoDB */}
              </div>
              <div className="col-span-1">
                <SkillPill item={databaseSkills[2]} /> {/* Supabase */}
              </div>
              <div className="col-span-1">
                <SkillPill item={databaseSkills[3]} /> {/* MySQL */}
              </div>
              <div className="col-span-1">
                <SkillPill item={databaseSkills[4]} /> {/* Redis */}
              </div>
            </div>
          </SkillCard>
        </div>

        {/* Bottom Row Cards - col-span-3 each (forms 2 columns) */}

        {/* AI / ML */}
        <div className="lg:col-span-3 h-full">
          <SkillCard
            title="AI / ML"
            titleColor="text-[#F59E0B]"
            borderColor="border-[#7B61FF]/20 hover:border-[#7B61FF]/50"
            glowColor="shadow-[0_0_20px_rgba(123,97,255,0.03)] hover:shadow-[0_0_30px_rgba(123,97,255,0.12)]"
            delay={0.3}
            inView={gridInView}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <SkillPill item={aiSkills[0]} /> {/* LangChain */}
              </div>
              <div className="col-span-1">
                <SkillPill item={aiSkills[1]} /> {/* RAG Pipelines */}
              </div>
              <div className="col-span-1">
                <SkillPill item={aiSkills[2]} /> {/* Azure AI */}
              </div>
              <div className="col-span-2">
                <SkillPill item={aiSkills[3]} /> {/* Python ML */}
              </div>
            </div>
          </SkillCard>
        </div>

        {/* DEVOPS & TOOLS */}
        <div className="lg:col-span-3 h-full">
          <SkillCard
            title="DEVOPS & TOOLS"
            titleColor="text-[#F43F5E]"
            borderColor="border-[#00E5FF]/20 hover:border-[#00E5FF]/50"
            glowColor="shadow-[0_0_20px_rgba(0,229,255,0.03)] hover:shadow-[0_0_30px_rgba(0,229,255,0.12)]"
            delay={0.4}
            inView={gridInView}
          >
            <div className="grid grid-cols-2 gap-4">
              {devopsSkills.map((skill) => (
                <SkillPill key={skill.name} item={skill} />
              ))}
            </div>
          </SkillCard>
        </div>
      </div>
    </section>
  );
};
