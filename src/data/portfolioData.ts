export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  tag: string;
  expandedText: string;
  techBadges: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI/ML' | 'SaaS/Web' | 'Mobile' | 'Backend';
  statusBadge: string;
  headline: string;
  description: string;
  techStack: string[];
  keyAchievements: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  isCurrent: boolean;
  points: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  grade?: string;
  isCurrent: boolean;
  core?: string;
}

export interface CertificationItem {
  id: string;
  icon: string;
  title: string;
  issuer: string;
  dateOrStatus: string;
}

export interface SkillCategory {
  category: string;
  items: { name: string; percentage: number }[];
}

export interface TestimonialItem {
  id: string;
  avatarInitials: string;
  name: string;
  company: string;
  stars: number;
  quote: string;
}

export const PERSONAL_INFO = {
  name: "Shilesh Mavchi",
  fullName: "Shilesh Mahesh Mavchi",
  role: "Full Stack Engineer · AI/ML Developer · MERN Stack",
  email: "mavchi1212@gmail.com",
  phone: "+91-8766909365",
  location: "Nashik, Maharashtra, India",
  linkedin: "https://linkedin.com/in/shileshmavchi",
  github: "https://github.com/shileshmavchi",
  availability: "Open to Work — Freelance & Full-Time",
  bio: "I architect production-grade SaaS platforms, real-time systems, and AI-powered applications — from REST APIs and RAG pipelines to cross-platform mobile apps — built to scale and ship."
};

export const SERVICES: ServiceItem[] = [
  {
    id: "full-stack-web",
    title: "Full Stack Web Development",
    icon: "</>",
    tag: "Web",
    expandedText: "I build scalable SPAs, multi-page apps, and corporate platforms using React.js, Next.js, Node.js, Django REST, and FastAPI — with clean REST/GraphQL APIs, proper auth, and optimized database queries. Delivered production apps including the Rubynex Technologies website (10 pages, SEO-complete, Vercel-deployed) and a live sports analytics platform.",
    techBadges: ["React", "Next.js", "Node.js", "FastAPI", "Django"]
  },
  {
    id: "saas-architecture",
    title: "SaaS Platform Architecture",
    icon: "🔧",
    tag: "SaaS",
    expandedText: "I architect multi-tenant SaaS platforms with hierarchical RBAC, JWT + MFA authentication, admin dashboards, subscription workflows, and scalable REST API backends capable of handling concurrent real-time workloads.",
    techBadges: ["NestJS", "PostgreSQL", "JWT", "RBAC", "MFA"]
  },
  {
    id: "ai-ml-rag",
    title: "AI / ML Integration & RAG Pipelines",
    icon: "🤖",
    tag: "AI/ML",
    expandedText: "I design and integrate AI features including RAG pipelines (LangChain + FAISS + HuggingFace), LLM-powered chatbots (Mistral, Azure AI), contextual recommendation engines, and AI training data pipelines. Built AI-Tutor: a full-stack AI study assistant with PDF ingestion, vector search, and conversational memory.",
    techBadges: ["LangChain", "FAISS", "Mistral LLM", "Azure AI", "Python"]
  },
  {
    id: "mobile-development",
    title: "Mobile App Development (React Native)",
    icon: "📱",
    tag: "Mobile",
    expandedText: "Cross-platform apps with Expo Router, Supabase real-time backend, multi-role systems, real-time messaging, and production-ready auth. Built RozgarConnect — a mobile marketplace for rural agricultural workers across 4 user roles with 9 database tables.",
    techBadges: ["React Native", "Expo SDK 53", "Supabase", "PostgreSQL"]
  },
  {
    id: "backend-devops",
    title: "Backend Architecture & DevOps",
    icon: "⚙️",
    tag: "Backend",
    expandedText: "From API design and database schema to Dockerized deployments and CI/CD pipelines. I build with Node.js/Express, NestJS, FastAPI, Django, and deploy to AWS, Azure, Vercel, Netlify, and Render — with Redis caching, WebSocket event-driven systems, and proper logging.",
    techBadges: ["Docker", "AWS", "Azure", "CI/CD", "Redis"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "ai-tutor",
    title: "AI-Tutor",
    category: "AI/ML",
    statusBadge: "🔬 AI/ML",
    headline: "AI-Powered Study Assistant",
    description: "Upload any PDF → get AI-generated summaries, quizzes, flashcards, and context-aware chat. Built on a RAG pipeline with FAISS vector search and Mistral LLM.",
    techStack: ["FastAPI", "React", "MongoDB", "LangChain", "Mistral LLM", "FAISS", "HuggingFace", "JWT"],
    keyAchievements: [
      "RAG pipeline: PDF → chunk → HuggingFace embeddings → FAISS vector store → LangChain ConversationalRetrievalChain",
      "JWT authentication with persistent history saved to MongoDB",
      "Context-aware chat with in-memory conversation memory",
      "Summaries, quiz generation, and flashcard generation via Mistral LLM"
    ],
    githubUrl: "https://github.com/shileshmavchi/ai-tutor",
    image: "/images/projects/project-ai-tutor.jpg"
  },
  {
    id: "rozgarconnect",
    title: "RozgarConnect",
    category: "Mobile",
    statusBadge: "📱 Mobile",
    headline: "Rural Agricultural Workforce Marketplace",
    description: "Cross-platform React Native mobile app connecting agricultural workers, employers, and equipment providers — with real-time messaging, job posting, booking, and multi-role auth.",
    techStack: ["React Native", "Expo SDK 53", "TypeScript", "Supabase", "PostgreSQL", "Expo Router", "AsyncStorage"],
    keyAchievements: [
      "4 user roles: Workers, Employers, Equipment Providers, Admins",
      "9 Supabase PostgreSQL tables with Row Level Security (RLS)",
      "Real-time messaging via Supabase Realtime (Postgres replication)",
      "File upload (profile pictures, job images) via Supabase Storage",
      "Custom hooks: useAuth, useJobs, useEquipment — all encapsulating Supabase queries",
      "9+ modules, Expo Router file-based navigation"
    ],
    githubUrl: "https://github.com/shileshmavchi/rozgarconnect",
    image: "/images/projects/project-rozgarconnect.jpg"
  },
  {
    id: "rubynex",
    title: "Rubynex Technologies",
    category: "SaaS/Web",
    statusBadge: "🌐 Live",
    headline: "Production Corporate SPA — 10 Pages, Full SEO",
    description: "Marketing website for a software company — 10 lazy-loaded pages, glassmorphism UI, full SEO stack, light/dark theme, and strict CSP headers. Deployed live on Vercel.",
    techStack: ["React 19", "Vite", "Tailwind CSS 4", "Zustand", "Framer Motion", "React Query", "Axios", "Zod"],
    keyAchievements: [
      "Full SEO: React Helmet Async, Open Graph, Twitter Cards, JSON-LD schema, canonical URLs",
      "WCAG accessibility: skip-to-content, aria-labels, semantic HTML",
      "Persistent light/dark theme via Zustand (localStorage)",
      "Glassmorphism UI, animated page transitions with Framer Motion",
      "Strict Content Security Policy via vercel.json",
      "API abstraction layer with Axios + Zod validation",
      "ErrorBoundary + React Query for resilient data fetching"
    ],
    liveUrl: "https://rubynex.com",
    githubUrl: "https://github.com/shileshmavchi/rubynex",
    image: "/images/projects/project-rubynex.jpg"
  },
  {
    id: "saas-platform",
    title: "SaaS Platform",
    category: "SaaS/Web",
    statusBadge: "⚡ SaaS",
    headline: "Production-Grade Multi-Role SaaS Platform",
    description: "Full-stack SaaS with multi-tier auth (JWT + MFA + RBAC), admin dashboards, AI-powered chatbot, real-time WebSocket workflows, and optimized REST API backend.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "MFA", "RBAC", "WebSockets", "REST API"],
    keyAchievements: [
      "Multi-tenant architecture with hierarchical role-based access control",
      "JWT refresh token rotation, session invalidation, MFA for high-privilege accounts",
      "AI-powered contextual chatbot + recommendation engine",
      "Real-time notifications and live data updates via WebSockets",
      "Database indexing, query batching, API response caching, frontend lazy loading"
    ],
    githubUrl: "https://github.com/shileshmavchi/saas-platform",
    image: "/images/projects/project-saas.jpg"
  },
  {
    id: "sports-analytics",
    title: "Sports Analytics Platform",
    category: "Backend",
    statusBadge: "🎯 Live",
    headline: "End-to-End AI Sports Analytics Platform",
    description: "Complete sports video analytics system — video uploads, analyst assignment, frame-level event tagging, match timeline engine, and AI training data pipeline.",
    techStack: ["React.js", "Python Django REST", "Video Pipeline", "Third-party APIs", "AI Training Data"],
    keyAchievements: [
      "Chunked video upload pipeline for large match files with progress tracking",
      "Admin-controlled analyst assignment workflow",
      "Frame-by-frame event tagging system generating structured AI training datasets",
      "Live match support: real-time event tagging during ongoing matches",
      "Resolved critical rendering bottlenecks causing frame drops during live events",
      "Deployed to live production with third-party integrations (Client: Privan Sports Analyzer Pvt. Ltd.)"
    ],
    image: "/images/projects/project-sports.jpg"
  },
  {
    id: "tailoring-erp",
    title: "Tailoring ERP System",
    category: "Backend",
    statusBadge: "🏭 ERP",
    headline: "Full-Stack Tailoring Management ERP",
    description: "Complete Tailoring ERP built solo from scratch — 7 database tables, 8 modules, MVC architecture. Deployed live at AI Ally Pvt. Ltd. for a real client.",
    techStack: ["PHP Yii2", "MySQL/MariaDB", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Apache"],
    keyAchievements: [
      "7 core tables: Customer, Measurement, Dress Type, Rate, Order, Order Item, Invoice",
      "8 modules: Customer Mgmt, Measurements, Dress Types, Rates, Orders, Production, Invoice, Delivery",
      "End-to-end workflow: Customer → Measurement → Order → Production → Invoice → Delivery",
      "Auto-generated invoices linked to orders",
      "MVC architecture using Yii2 (PHP), proper foreign key constraints and referential integrity"
    ],
    image: "/images/projects/project-erp.jpg"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "Feb 2026 – Present",
    role: "AI / ML Intern",
    company: "AI Ally Pvt. Ltd.",
    location: "Nashik, Maharashtra",
    isCurrent: true,
    points: [
      "Maintained TerraCrt (terracart.in) live e-commerce & conducted on-site UX field research",
      "Built Tailoring ERP solo from scratch — PHP Yii2, MySQL, 7 tables, 8 modules, MVC",
      "Maintained Nashik Kumbh Mela high-traffic backend in zero-downtime production environment",
      "Optimized backend APIs: JWT, MFA, RBAC, WebSocket real-time systems",
      "Integrated Azure AI services; pursuing Azure AI-900 certification",
      "Built enterprise apps via MS Power Apps"
    ]
  },
  {
    id: "exp-2",
    period: "Dec 2024 – Present",
    role: "Full Stack Developer (SaaS & Product)",
    company: "Independent / Remote",
    location: "Remote",
    isCurrent: false,
    points: [
      "Architected production SaaS platform: multi-tier auth (JWT + MFA + RBAC), admin dashboard",
      "Designed scalable REST API backend handling concurrent real-time workloads",
      "Integrated AI-powered chatbot + recommendation engine (full architecture ownership)",
      "Optimized: DB indexing, query batching, API caching, lazy loading"
    ]
  },
  {
    id: "exp-3",
    period: "Jun 2023 – Jul 2024",
    role: "Full Stack Developer",
    company: "Privan Sports Analyzer Pvt. Ltd.",
    location: "Remote",
    isCurrent: false,
    points: [
      "Built complete sports analytics platform (React.js + Django REST) from scratch",
      "Video upload pipeline, analyst assignment, frame-level event tagging, match timeline engine",
      "Live deployment with third-party integrations; real-time camera feed processing",
      "Built AI training data pipeline converting raw footage into structured datasets",
      "Resolved critical rendering bottlenecks eliminating frame drops during live matches"
    ]
  },
  {
    id: "exp-4",
    period: "May 2023 – Nov 2023",
    role: "Software Developer Intern",
    company: "SevenMentor Pvt. Ltd.",
    location: "Pune, Maharashtra",
    isCurrent: false,
    points: [
      "Built full-stack apps with React.js and Core Java (project: Video Editor + Online Shopping)",
      "Tech stack: React JS, Java, MySQL — production UI components (login, dashboards, forms)",
      "RESTful API consumption, Postman testing, Git version control",
      "Full SDLC: requirement analysis → development → testing → delivery in Agile team"
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: "edu-1",
    period: "2025 – 2027",
    degree: "Master of Computer Applications (MCA)",
    institution: "K.T.H.M College, Nashik",
    location: "Savitribai Phule Pune University (SPPU), Nashik",
    isCurrent: true
  },
  {
    id: "edu-2",
    period: "2019 – 2022",
    degree: "Bachelor of Science — Computer Science",
    institution: "Ashoka Business and Computer Studies, Nashik",
    location: "Savitribai Phule Pune University (SPPU), Nashik",
    grade: "Grade: A | CGPA: 6.77",
    core: "Data Structures, Algorithms, DBMS, OS, Software Engineering",
    isCurrent: false
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    icon: "🏆",
    title: "Research Paper Presenter",
    issuer: "National Level AI & ML Seminar, SSD College Nashik (Shriram Sadashiv Dhamankar College, Nashik)",
    dateOrStatus: "13th & 14th March 2026"
  },
  {
    id: "cert-2",
    icon: "☁️",
    title: "Microsoft Azure Fundamentals",
    issuer: "AZ-900 Certification, Microsoft",
    dateOrStatus: "Certified"
  },
  {
    id: "cert-3",
    icon: "🤖",
    title: "Azure AI Fundamentals",
    issuer: "AI-900 Certification, Microsoft",
    dateOrStatus: "In Progress"
  },
  {
    id: "cert-4",
    icon: "📊",
    title: "AI & Machine Learning",
    issuer: "Fundamentals Certification, Coursera",
    dateOrStatus: "2026"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "FRONTEND",
    items: [
      { name: "React.js", percentage: 95 },
      { name: "Next.js", percentage: 90 },
      { name: "Tailwind CSS", percentage: 95 },
      { name: "TypeScript", percentage: 90 },
      { name: "Framer Motion", percentage: 85 },
      { name: "React Native", percentage: 85 },
      { name: "HTML5 / CSS3", percentage: 98 }
    ]
  },
  {
    category: "BACKEND",
    items: [
      { name: "Node.js/Express", percentage: 90 },
      { name: "FastAPI", percentage: 85 },
      { name: "Django REST", percentage: 83 },
      { name: "NestJS", percentage: 80 },
      { name: "PHP Yii2", percentage: 70 }
    ]
  },
  {
    category: "DATABASES",
    items: [
      { name: "PostgreSQL", percentage: 88 },
      { name: "MongoDB", percentage: 87 },
      { name: "MySQL", percentage: 88 },
      { name: "Supabase", percentage: 85 },
      { name: "Redis", percentage: 72 }
    ]
  },
  {
    category: "AI / ML",
    items: [
      { name: "LangChain", percentage: 83 },
      { name: "RAG Pipelines", percentage: 82 },
      { name: "Azure AI", percentage: 76 },
      { name: "Python ML", percentage: 78 }
    ]
  },
  {
    category: "DEVOPS & TOOLS",
    items: [
      { name: "Git / GitHub", percentage: 96 },
      { name: "Docker", percentage: 78 },
      { name: "Vercel / Netlify", percentage: 93 },
      { name: "AWS", percentage: 72 },
      { name: "Azure Cloud", percentage: 76 },
      { name: "CI/CD Pipelines", percentage: 78 }
    ]
  }
];

export const TECH_TAGS = [
  "JavaScript", "TypeScript", "Python", "Java", "PHP", "SQL", "React.js", "Next.js", "React Native",
  "Node.js", "Express", "NestJS", "FastAPI", "Django REST", "Tailwind CSS", "Framer Motion",
  "PostgreSQL", "MongoDB", "MySQL", "Supabase", "Redis", "LangChain", "FAISS", "Azure AI",
  "Docker", "Kubernetes", "AWS", "Azure", "Vercel", "Git", "WebSockets", "JWT", "RBAC", "REST API",
  "GraphQL", "OAuth 2.0", "MS Power Apps", "PHP Yii2", "Expo SDK 53"
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    avatarInitials: "PA",
    name: "Privan Analytics Team",
    company: "Privan Sports Analyzer Pvt. Ltd.",
    stars: 5,
    quote: "Shilesh delivered the complete sports analytics platform end-to-end — video upload pipeline, analyst dashboards, live tagging, and the AI data pipeline. He resolved our performance issues under live match conditions with zero downtime."
  },
  {
    id: "test-2",
    avatarInitials: "AA",
    name: "AI Ally Team",
    company: "AI Ally Pvt. Ltd.",
    stars: 5,
    quote: "Built our Tailoring ERP completely from scratch in a short time — 7 tables, 8 modules, fully functional. He also maintained our live e-commerce and the Kumbh Mela backend reliably. A dependable full-stack engineer."
  },
  {
    id: "test-3",
    avatarInitials: "SM",
    name: "SevenMentor Dev Team",
    company: "SevenMentor Pvt. Ltd.",
    stars: 5,
    quote: "Strong React.js and Java skills, delivered production-quality UI components and APIs on live client projects. Quick learner, professional in code reviews and version control."
  }
];
