import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        space: {
          950: "#010206",
          900: "#02040a",
          850: "#040714",
          800: "#070c1d",
          700: "#0c152e",
        },
        electric: {
          DEFAULT: "#0066ff",
          50: "#e6f1ff",
          100: "#cce2ff",
          200: "#99c6ff",
          300: "#66a9ff",
          400: "#338dff",
          500: "#0066ff",
          600: "#0052cc",
          700: "#003d99",
          glow: "#00d2ff",
        },
        royal: {
          500: "#1d4ed8",
          600: "#1e40af",
          700: "#1e3a8a",
        },
        cyanGlow: {
          DEFAULT: "#38bdf8",
          light: "#7dd3fc",
          neon: "#00f0ff",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(to right, rgba(0, 102, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 102, 255, 0.05) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "orbit": "orbit 20s linear infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 10px rgba(0, 102, 255, 0.4))" },
          "100%": { filter: "drop-shadow(0 0 25px rgba(0, 210, 255, 0.8))" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
      },
      boxShadow: {
        "neon-blue": "0 0 25px -5px rgba(0, 102, 255, 0.5), 0 0 10px -2px rgba(0, 210, 255, 0.4)",
        "neon-cyan": "0 0 30px -5px rgba(56, 189, 248, 0.6), 0 0 12px -2px rgba(0, 240, 255, 0.5)",
        "glass": "0 8px 32px 0 rgba(0, 10, 30, 0.37)",
        "glass-elevated": "0 12px 40px 0 rgba(0, 102, 255, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
