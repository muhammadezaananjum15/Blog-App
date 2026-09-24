export interface BlogPost {
  id: string | number;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  category:
    | "Current Affairs"
    | "Geo Politics"
    | "Tech & AI"
    | "Crypto & Web3"
    | "Design & UI"
    | "Culture & Ideas"
    | "Architecture"
    | "Open Intelligence"
    | "Science & Space"
    | "Health & Wellness"
    | "Finance & Markets"
    | "Startups & Business";
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: string;
  reactionsCount: number;
  commentsCount: number;
  url: string;
  source: string;
  apiSource: string;
  featured?: boolean;
  metrics?: {
    views?: string;
    shares?: string;
    impactScore?: number;
  };
}

export interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship";
  salary?: string;
  description: string;
  requirements: string[];
  tags: string[];
  postedAt: string;
  applyUrl: string;
  logo?: string;
  featured?: boolean;
}

export interface PublicApiEntry {
  api: string;
  description: string;
  auth: string;
  https: boolean;
  cors: string;
  link: string;
  category: string;
}

export interface NavItem {
  id: string;
  label: string;
  count?: number;
  href?: string;
  children?: NavItem[];
}

export interface CategoryConfig {
  id: string;
  label: string;
  slug: string;
  description: string;
  icon: string;
  gradient: string;
  accentColor: string;
}

export const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    id: "current-affairs",
    label: "Current Affairs",
    slug: "current-affairs",
    description: "Breaking news and current events shaping the global landscape",
    icon: "Newspaper",
    gradient: "from-red-500/20 to-orange-500/20",
    accentColor: "#EF4444",
  },
  {
    id: "geo-politics",
    label: "Geo Politics",
    slug: "geo-politics",
    description: "International relations, diplomacy, and geopolitical analysis",
    icon: "Globe",
    gradient: "from-blue-500/20 to-cyan-500/20",
    accentColor: "#3B82F6",
  },
  {
    id: "tech-ai",
    label: "Tech & AI",
    slug: "tech-ai",
    description: "Cutting-edge technology, artificial intelligence, and digital innovation",
    icon: "Cpu",
    gradient: "from-violet-500/20 to-purple-500/20",
    accentColor: "#8B5CF6",
  },
  {
    id: "crypto",
    label: "Crypto & Web3",
    slug: "crypto",
    description: "Cryptocurrency markets, blockchain technology, and decentralized systems",
    icon: "Bitcoin",
    gradient: "from-amber-500/20 to-yellow-500/20",
    accentColor: "#F59E0B",
  },
  {
    id: "design",
    label: "Design & UI",
    slug: "design",
    description: "Interface design, user experience, and visual aesthetics",
    icon: "Palette",
    gradient: "from-pink-500/20 to-rose-500/20",
    accentColor: "#EC4899",
  },
  {
    id: "science",
    label: "Science & Space",
    slug: "science",
    description: "Scientific breakthroughs, space exploration, and research frontiers",
    icon: "Telescope",
    gradient: "from-indigo-500/20 to-blue-500/20",
    accentColor: "#6366F1",
  },
  {
    id: "health",
    label: "Health & Wellness",
    slug: "health",
    description: "Medical advances, mental health, and holistic wellness insights",
    icon: "Heart",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accentColor: "#10B981",
  },
  {
    id: "finance",
    label: "Finance & Markets",
    slug: "finance",
    description: "Global markets, investment strategies, and economic analysis",
    icon: "TrendingUp",
    gradient: "from-green-500/20 to-emerald-500/20",
    accentColor: "#22C55E",
  },
  {
    id: "startups",
    label: "Startups & Business",
    slug: "startups",
    description: "Entrepreneurship, startup ecosystems, and business innovation",
    icon: "Rocket",
    gradient: "from-orange-500/20 to-red-500/20",
    accentColor: "#F97316",
  },
  {
    id: "culture",
    label: "Culture & Ideas",
    slug: "culture",
    description: "Philosophy, art, literature, and the zeitgeist of modern thought",
    icon: "BookOpen",
    gradient: "from-fuchsia-500/20 to-purple-500/20",
    accentColor: "#D946EF",
  },
];
