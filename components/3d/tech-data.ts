export interface TechNode {
  id: string;
  name: string;
  category: string;
  desc: string;
  pos: [number, number, number];
}

/** Technology areas / tools used across MahakTech projects (not claims of mastery). */
export const TECH_LIST: TechNode[] = [
  { id: "react", name: "React", category: "Frontend", desc: "Component-driven user interfaces.", pos: [-2.4, 1.4, 0.5] },
  { id: "nextjs", name: "Next.js", category: "Framework", desc: "Full-stack React framework for fast, SEO-friendly web apps.", pos: [-1.2, 2.2, -0.6] },
  { id: "typescript", name: "TypeScript", category: "Language", desc: "Typed JavaScript for maintainable codebases.", pos: [1.2, 1.9, 0.4] },
  { id: "nodejs", name: "Node.js", category: "Backend", desc: "JavaScript runtime for server-side APIs and tooling.", pos: [2.5, 0.8, -0.5] },
  { id: "mongodb", name: "MongoDB", category: "Database", desc: "Document database for flexible data models.", pos: [2.1, -1.2, 0.6] },
  { id: "python", name: "Python", category: "Language", desc: "Scripting, automation and AI-related workflows.", pos: [0.6, -2.1, -0.4] },
  { id: "ai", name: "AI", category: "Intelligence", desc: "AI-assisted workflows and intelligent automation.", pos: [-1.5, -1.7, 0.7] },
  { id: "threejs", name: "Three.js", category: "Graphics", desc: "WebGL library for interactive 3D on the web.", pos: [0, 0.2, 1.2] },
  { id: "tailwind", name: "Tailwind CSS", category: "Styling", desc: "Utility-first CSS for responsive design systems.", pos: [-2.6, -0.4, -0.8] },
  { id: "git", name: "Git", category: "Tooling", desc: "Version control for collaborative development.", pos: [0.2, 1.2, -1.2] },
  { id: "github", name: "GitHub", category: "Platform", desc: "Code hosting and collaboration platform.", pos: [1.6, -0.2, -1.1] },
];
