export interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  /** Description supplied by MahakTech. */
  desc: string;
  /** Focus areas drawn from the description — edit with real stacks when ready. */
  tags: string[];
  /** Real project URL. Leave undefined until one exists — the button stays disabled. */
  liveUrl?: string;
  /** Project-specific repository URL. Leave undefined to fall back to the org profile. */
  repoUrl?: string;
  /** Tailwind gradient classes for the scene accent. */
  accent: string;
}

export const GITHUB_ORG_URL = "https://github.com/MahakTech";

export const PROJECTS: Project[] = [
  {
    id: "vittape",
    num: "01",
    title: "VittaPe",
    category: "Fintech / UPI Concept",
    desc: "A fintech / UPI concept focused on modern social money interactions and Indian postal-inspired visual storytelling.",
    tags: ["Fintech", "UPI Concept", "Social Payments", "Visual Storytelling"],
    accent: "from-blue-600 to-cyan-500",
  },
  {
    id: "tradeflow",
    num: "02",
    title: "TradeFlow",
    category: "Business Software",
    desc: "A business-focused software platform and workflow ecosystem.",
    tags: ["Business Platform", "Workflow", "Software Ecosystem"],
    accent: "from-cyan-500 to-blue-700",
  },
  {
    id: "restaurant-pos",
    num: "03",
    title: "Restaurant POS",
    category: "Restaurant Management",
    desc: "A modern restaurant management and ordering ecosystem with QR-based customer ordering and management capabilities.",
    tags: ["POS", "QR Ordering", "Restaurant Management"],
    accent: "from-blue-500 to-sky-400",
  },
  {
    id: "qr-inventory",
    num: "04",
    title: "QR Inventory System",
    category: "Inventory Management",
    desc: "A QR-driven inventory management solution.",
    tags: ["QR Codes", "Inventory", "Stock Management"],
    accent: "from-sky-400 to-blue-600",
  },
  {
    id: "vizora",
    num: "05",
    title: "VIZORA",
    category: "Technology / Startup Concept",
    desc: "A modern technology/startup concept.",
    tags: ["Startup Concept", "Brand & Product Vision"],
    accent: "from-blue-600 to-cyan-400",
  },
];
