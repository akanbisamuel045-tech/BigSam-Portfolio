export interface SocialLink {
  name: string;
  url: string;
}

export interface PersonalInfo {
  firstName: string;
  displayName: string;
  brandName: string;
  footerWordmark: string;
  role: string;
  copyrightYear: string;
  heroTagline: string;
  shortBio: string;
  philosophyHeadline: {
    black: string;
    gray: string;
  };
  philosophySubtext: string;
  email: string;
  phone: string;
  phoneRaw: string;
  location: string;
  officeHours: string;
  bookingUrl: string;
  heroPortrait: string;
  avatarImage: string;
  impactPortrait: string;
  gadexLogo: string;
  gadexLogoWhite: string;
  socialLinks: SocialLink[];
}

export interface HeroFeaturedProject {
  title: string;
  category: string;
  image: string;
  link: string;
}

export interface PortfolioStats {
  projectsCompleted: number;
  projectsSuffix: string;
  happyClients: number;
  happyClientsSuffix: string;
  yearsExperience: number;
  yearsSuffix: string;
  clientSatisfaction: number;
  satisfactionSuffix: string;
  globalClients: number;
  trustBadgeCount: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  layoutSize: "medium-left" | "small-right" | "full-wide" | "small-left" | "medium-right";
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: "sparkle" | "asterisk" | "bolt" | "plus";
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface PricingTier {
  packageTitle: string;
  badge: string;
  price: string;
  unit: string;
  deliveryTime: string;
  revisions: string;
  techStack: string;
  features: string[];
}

export interface PricingPlan {
  monthly: PricingTier;
  projectBased: PricingTier;
}

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
}

export interface CareerItem {
  company: string;
  period: string;
  image: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  heroFeaturedProject: HeroFeaturedProject;
  stats: PortfolioStats;
  clientLogos: string[];
  services: ServiceItem[];
  projects: ProjectItem[];
  processSteps: ProcessStep[];
  testimonials: TestimonialItem[];
  pricing: PricingPlan;
  achievements: AchievementItem[];
  career: CareerItem[];
  articles: ArticleItem[];
  faqs: FaqItem[];
}

export const portfolioData: PortfolioData = {
  "personalInfo": {
    "firstName": "BIGSAM",
    "displayName": "BigSam",
    "brandName": "Gadex®",
    "footerWordmark": "BigSam®",
    "role": "Full-Stack Engineer",
    "copyrightYear": "2026",
    "heroTagline": "I ARCHITECT SCALABLE FULL-STACK SYSTEMS THAT ARE FAST, RESILIENT AND IMPACTFUL",
    "shortBio": "HI, I'M BIGSAM, A FULL-STACK ENGINEER PASSIONATE ABOUT BUILDING HIGH-PERFORMANCE WEB APPLICATIONS, SCALABLE APIS, AND INTUITIVE USER INTERFACES.",
    "philosophyHeadline": {
      "black": "BIGSAM BELIEVES CODE CREATES",
      "gray": "MEANINGFUL DIGITAL PRODUCTS."
    },
    "philosophySubtext": "Every system is engineered to maximize performance, strengthen reliability, and deliver seamless, responsive experiences across web, cloud, and mobile platforms.",
    "email": "akanbisamuel045@gmail.com",
    "phone": "+234 916 057 5724",
    "phoneRaw": "+2349160575724",
    "location": "Remote — Worldwide",
    "officeHours": "Monday – Friday, 08AM – 08PM",
    "bookingUrl": "https://wa.me/2349160575724?text=Hello%20BigSam%20(Gadex),%20I%20would%20like%20to%20discuss%20a%20project%20with%20you",
    "heroPortrait": "/assets/hero-portrait.png",
    "avatarImage": "/assets/samuel-avatar.png",
    "impactPortrait": "/assets/samuel-impact.png",
    "gadexLogo": "/assets/gadex-logo.png",
    "gadexLogoWhite": "/assets/gadex-logo-white.png",
    "socialLinks": [
      {
        "name": "GitHub",
        "url": "https://github.com/akanbisamuel045-tech"
      },
      {
        "name": "LinkedIn",
        "url": "https://linkedin.com"
      },
      {
        "name": "X / Twitter",
        "url": "https://x.com"
      },
      {
        "name": "WhatsApp",
        "url": "https://wa.me/2349160575724"
      }
    ]
  },
  "heroFeaturedProject": {
    "title": "GADEX CLOUD",
    "category": "/Full-Stack",
    "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    "link": "https://github.com/akanbisamuel045-tech"
  },
  "stats": {
    "projectsCompleted": 5,
    "projectsSuffix": "+",
    "happyClients": 10,
    "happyClientsSuffix": "+",
    "yearsExperience": 4,
    "yearsSuffix": "+",
    "clientSatisfaction": 98,
    "satisfactionSuffix": "%",
    "globalClients": 12,
    "trustBadgeCount": "100% Reliable"
  },
  "clientLogos": [
    "Gadex Labs",
    "NextWave Tech",
    "CloudScale",
    "Apex Digital",
    "Vortex Systems"
  ],
  "services": [
    {
      "id": "fullstack-web",
      "index": "001",
      "title": "FULL-STACK DEVELOPMENT",
      "description": "Engineering end-to-end web applications with modern frontend frameworks and rock-solid backend architectures.",
      "tags": [
        "Next.js & React",
        "TypeScript Architecture",
        "Node.js & Express",
        "REST & GraphQL APIs",
        "Database Modeling"
      ],
      "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80",
      "link": "/contact"
    },
    {
      "id": "backend-api",
      "index": "002",
      "title": "API & BACKEND SYSTEMS",
      "description": "Designing high-throughput, secure microservices, authentication pipelines, and real-time data infrastructure.",
      "tags": [
        "PostgreSQL & MongoDB",
        "JWT & OAuth2 Security",
        "Redis Caching",
        "WebSockets & Real-Time",
        "Cloud Deployment"
      ],
      "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80",
      "link": "/contact"
    },
    {
      "id": "frontend-ui",
      "index": "003",
      "title": "FRONTEND ENGINEERING",
      "description": "Translating complex designs into pixel-perfect, accessible, and fluidly animated user interfaces.",
      "tags": [
        "Tailwind CSS Systems",
        "Framer Motion UI",
        "State Management",
        "Core Web Vitals SEO",
        "Responsive Layouts"
      ],
      "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
      "link": "/contact"
    },
    {
      "id": "ai-automation",
      "index": "004",
      "title": "AI & SAAS INTEGRATION",
      "description": "Integrating LLM workflows, payment gateways, and automated dashboards into modern SaaS products.",
      "tags": [
        "AI SDK & LLM APIs",
        "Paystack & Stripe",
        "Automated Workflows",
        "Admin Dashboards",
        "Analytics Pipelines"
      ],
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
      "link": "/contact"
    },
    {
      "id": "devops-cloud",
      "index": "005",
      "title": "CLOUD & DEVOPS",
      "description": "Streamlining deployments with containerized environments, CI/CD pipelines, and automated monitoring.",
      "tags": [
        "Docker Containers",
        "GitHub Actions CI/CD",
        "Vercel & AWS",
        "Linux Server Admin",
        "Performance Tuning"
      ],
      "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80",
      "link": "/contact"
    },
    {
      "id": "system-optimization",
      "index": "006",
      "title": "SYSTEM REFACTORING",
      "description": "Upgrading legacy codebases into clean, maintainable, and blazing-fast modern web applications.",
      "tags": [
        "Codebase Audits",
        "Query Optimization",
        "TypeScript Migration",
        "Security Hardening",
        "Automated Testing"
      ],
      "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=80",
      "link": "/contact"
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "title": "GADEX NEXUS",
      "category": "/Full-Stack",
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
      "link": "https://github.com/akanbisamuel045-tech",
      "layoutSize": "medium-left"
    },
    {
      "id": "proj-2",
      "title": "PULSE FINTECH",
      "category": "/Web App",
      "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
      "link": "https://github.com/akanbisamuel045-tech",
      "layoutSize": "small-right"
    },
    {
      "id": "proj-3",
      "title": "ARKEO CLOUD ENGINE",
      "category": "/Architecture",
      "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&auto=format&fit=crop&q=80",
      "link": "https://github.com/akanbisamuel045-tech",
      "layoutSize": "full-wide"
    },
    {
      "id": "proj-4",
      "title": "NOVU ANALYTICS",
      "category": "/SaaS",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      "link": "https://github.com/akanbisamuel045-tech",
      "layoutSize": "small-left"
    },
    {
      "id": "proj-5",
      "title": "ZENTIX API HUB",
      "category": "/Backend",
      "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
      "link": "https://github.com/akanbisamuel045-tech",
      "layoutSize": "medium-right"
    }
  ],
  "processSteps": [
    {
      "step": "01",
      "title": "ARCHITECTURE",
      "description": "Mapping system requirements, database schemas, and API contracts to establish a rock-solid foundation.",
      "icon": "sparkle"
    },
    {
      "step": "02",
      "title": "PROTOTYPING",
      "description": "Structuring clean frontend component hierarchies and interactive wireframes for rapid validation.",
      "icon": "asterisk"
    },
    {
      "step": "03",
      "title": "DEVELOPMENT",
      "description": "Writing clean, strongly-typed frontend and backend code with seamless third-party integrations.",
      "icon": "bolt"
    },
    {
      "step": "04",
      "title": "DEPLOYMENT",
      "description": "Rigorous testing, performance profiling, and automated CI/CD deployment for zero-downtime launches.",
      "icon": "plus"
    }
  ],
  "testimonials": [
    {
      "id": "t1",
      "name": "Daniel Smith",
      "role": "Product Manager",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      "rating": 5,
      "quote": "BigSam engineered our web platform from scratch with incredible speed and clean code. Our load times dropped by 60% immediately."
    },
    {
      "id": "t2",
      "name": "Sophia Taylor",
      "role": "Startup Founder",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      "rating": 5,
      "quote": "Working with BigSam was seamless. He translated our product vision into a scalable full-stack application ahead of schedule."
    },
    {
      "id": "t3",
      "name": "Olivia Harris",
      "role": "Tech Lead",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
      "rating": 5,
      "quote": "Excellent communication, rock-solid API architecture, and outstanding attention to UI detail. Highly recommended for any full-stack build."
    },
    {
      "id": "t4",
      "name": "Marcus Vance",
      "role": "Operations Director",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      "rating": 5,
      "quote": "BigSam built a custom dashboard and backend workflow that automated hours of manual work for our team. True professional."
    }
  ],
  "pricing": {
    "monthly": {
      "packageTitle": "DEDICATED RETAINER",
      "badge": "MONTHLY SPRINT",
      "price": "$800",
      "unit": "/Month",
      "deliveryTime": "Ongoing Sprints",
      "revisions": "Unlimited",
      "techStack": "Next.js / Node / TS",
      "features": [
        "Full-Stack Feature Development",
        "API & Database Management",
        "UI/UX Component Engineering",
        "Performance & Security Audits",
        "CI/CD & Cloud Maintenance",
        "Priority WhatsApp & GitHub Support"
      ]
    },
    "projectBased": {
      "packageTitle": "COMPLETE MVP PACKAGE",
      "badge": "ONE-TIME PAYMENT",
      "price": "$500",
      "unit": "/Project",
      "deliveryTime": "2–4 Weeks",
      "revisions": "Up to 4",
      "techStack": "Next.js / Full-Stack",
      "features": [
        "Custom Responsive Web Application",
        "Backend API & Database Setup",
        "Authentication & Role Security",
        "Payment or 3rd-Party Integrations",
        "Technical SEO & Speed Optimization",
        "1 Month Post-Launch Support"
      ]
    }
  },
  "achievements": [
    {
      "title": "FULL-STACK ARCHITECTURE EXCELLENCE",
      "organization": "Gadex Engineering",
      "year": "2026"
    },
    {
      "title": "HIGH-PERFORMANCE WEB SYSTEMS",
      "organization": "Open Source & GitHub",
      "year": "2025"
    },
    {
      "title": "SCALABLE API & CLOUD DESIGN",
      "organization": "Software Engineering",
      "year": "2024"
    },
    {
      "title": "MODERN FRONTEND & UX DELIVERY",
      "organization": "Web Development",
      "year": "2023"
    }
  ],
  "career": [
    {
      "company": "FREELANCE FULL-STACK_",
      "period": "[ 2022 - 2024 ]",
      "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
    },
    {
      "company": "GADEX ENGINEERING_",
      "period": "[ 2024 - PRESENT ]",
      "image": "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80"
    }
  ],
  "articles": [
    {
      "id": "art-1",
      "title": "Architecting Scalable Full-Stack Apps with Next.js",
      "excerpt": "Why clean boundaries between server actions, APIs, and client state make or break modern web apps.",
      "category": "Architecture",
      "author": "BigSam",
      "date": "Oct 10, 2026",
      "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
    },
    {
      "id": "art-2",
      "title": "How Database Indexing Shapes API Speed Instantly",
      "excerpt": "Practical techniques for cutting query latency in PostgreSQL and MongoDB.",
      "category": "Backend",
      "author": "BigSam",
      "date": "Sep 22, 2026",
      "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
    },
    {
      "id": "art-3",
      "title": "Why Micro-Interactions Matter in Technical Products",
      "excerpt": "Blending Framer Motion with Tailwind CSS for tactile, zero-lag interfaces.",
      "category": "Frontend",
      "author": "BigSam",
      "date": "Aug 15, 2026",
      "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80"
    },
    {
      "id": "art-4",
      "title": "The Real Rules of Type-Safe API Contracts",
      "excerpt": "Eliminating runtime bugs between backend services and frontend clients using TypeScript.",
      "category": "TypeScript",
      "author": "BigSam",
      "date": "Jul 19, 2026",
      "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
    },
    {
      "id": "art-5",
      "title": "How Systems Thinking Transforms Problem Solving",
      "excerpt": "Moving from writing isolated code to engineering resilient end-to-end digital products.",
      "category": "Process",
      "author": "BigSam",
      "date": "Jun 13, 2026",
      "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
    },
    {
      "id": "art-6",
      "title": "Securing Modern Web Applications From Day One",
      "excerpt": "Essential authentication, rate-limiting, and validation patterns every full-stack project needs.",
      "category": "Security",
      "author": "BigSam",
      "date": "May 28, 2026",
      "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
    }
  ],
  "faqs": [
    {
      "question": "1. WHAT SERVICES DO YOU OFFER AS A FULL-STACK ENGINEER?",
      "answer": "I specialize in end-to-end web development, custom backend APIs, database architecture, interactive React/Next.js frontends, SaaS dashboards, and third-party/AI integrations."
    },
    {
      "question": "2. WHAT IS YOUR TYPICAL DEVELOPMENT PROCESS FROM START TO FINISH?",
      "answer": "Every project begins with system architecture and requirements mapping, followed by interactive UI prototyping, full-stack TypeScript development, automated testing, and cloud deployment."
    },
    {
      "question": "3. WILL I BE INVOLVED DURING THE DEVELOPMENT SPRINTS?",
      "answer": "Yes. You get regular staging preview links, GitHub progress updates, and direct communication via WhatsApp and email at every milestone."
    },
    {
      "question": "4. WHAT DELIVERABLES WILL I RECEIVE WHEN THE PROJECT IS COMPLETE?",
      "answer": "You receive the complete, well-documented source code repository on GitHub, live cloud deployment, database schemas, environment documentation, and post-launch support."
    },
    {
      "question": "5. DO YOU OFFER REVISIONS AND POST-LAUNCH SUPPORT?",
      "answer": "Yes, every package includes dedicated revision rounds and post-launch technical support to ensure your application runs smoothly in production."
    },
    {
      "question": "6. CAN YOU WORK WITH AN EXISTING CODEBASE OR TEAM?",
      "answer": "Absolutely. I frequently jump into existing React, Next.js, or Node.js repositories to build new features, refactor bottlenecks, or collaborate with product teams."
    }
  ]
};
