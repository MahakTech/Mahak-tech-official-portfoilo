# MahakTech Official Portfolio

> **Technology. Design. Innovation.**
>
> MahakTech is a futuristic digital experience and technology portfolio built to showcase modern web development, UI/UX design, software engineering, AI-powered systems, and immersive 3D experiences.

[![Live Website](https://img.shields.io/badge/Live%20Website-mahak--tech--official--portfoilo.vercel.app-0066ff?style=for-the-badge&logo=vercel&logoColor=white)](https://mahak-tech-official-portfoilo.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=threedotjs)](https://threejs.org/)

## Overview

This repository contains the source code for the MahakTech official portfolio website. It is designed as a single-page, interactive digital experience with:

- A staged loading screen and portal-style introduction
- Animated hero content with an interactive Three.js/WebGL scene
- Responsive sections for the company, services, technology focus, process, vision, and contact
- Framer Motion animations and smooth scrolling powered by Lenis
- Custom cursor and magnetic interaction effects
- WebGL detection with a fallback experience for unsupported browsers
- Live telemetry for page views, unique visitors, and user clicks
- SEO metadata, Open Graph/Twitter metadata, robots configuration, sitemap generation, and Organization JSON-LD
- Accessible features including a skip-to-content link, reduced-motion support, keyboard interactions, and descriptive labels

## Services showcased

The portfolio presents MahakTech's capabilities across six areas:

1. **Web Development** — Modern websites and full-stack web applications
2. **UI/UX Design** — Human-centered interfaces, design systems, and micro-interactions
3. **Software Development** — Scalable software products, APIs, and system architecture
4. **AI & Intelligent Systems** — Automation, intelligent agents, and API integrations
5. **3D & Interactive Experiences** — Three.js, WebGL, motion design, and interactive shaders
6. **Digital Product Development** — Product strategy, architecture, development, deployment, and scale planning

## Features

### Interactive visual experience

- Three.js scenes for the hero, services, technology constellation, vision, and experimental lab sections
- Responsive rendering tuned for mobile devices
- Reduced-motion handling through `prefers-reduced-motion`
- Automatic WebGL support detection through `lib/webgl-check.ts`
- `WebGLFallback` components for browsers or devices without WebGL support

### Portfolio navigation and content

The main page is composed in `components/SiteShell.tsx` and includes:

- `LoadingScreen`
- `PortalIntro`
- `Navbar`
- `HeroSection`
- `AboutSection`
- `ServicesSection`
- `TechWorldSection`
- `ExperimentalLabSection`
- `ProcessSection`
- `WhySection`
- `VisionSection`
- `ContactSection`
- `Footer`

### Telemetry

The site includes a lightweight telemetry system backed by the `/api/telemetry` route.

- `GET /api/telemetry` returns current views, unique visitors, clicks, and the last update time.
- `POST /api/telemetry` records a page view by default or records clicks when sent with `{ "action": "click", "count": 1 }`.
- Anonymous visitor IDs are stored in browser `localStorage`.
- Session view registration uses `sessionStorage` to avoid counting the same browser session repeatedly.
- Server-side telemetry is persisted to `data/telemetry.json` when writable, with `/tmp/mahaktech-telemetry.json` as a fallback.

> **Deployment note:** File-based telemetry is suitable for a simple or single-instance deployment, but it is not a durable shared database for horizontally scaled or serverless production deployments. For reliable production analytics, replace `lib/server-telemetry.ts` with a persistent data store or analytics service.

## Tech stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript
- **UI:** React 18
- **Styling:** Tailwind CSS 3 with custom dark, neon-blue, cyan, glassmorphism, and animation utilities
- **Animation:** Framer Motion 11
- **3D/WebGL:** Three.js
- **Smooth scrolling:** Lenis
- **Icons:** Lucide React
- **Utilities:** `clsx` and `tailwind-merge`
- **SEO and metadata:** Next.js Metadata API, generated sitemap/robots files, and Schema.org JSON-LD

## Project structure

```text
.
├── app/
│   ├── api/telemetry/route.ts       # Telemetry GET/POST API route
│   ├── globals.css                  # Global styles and visual effects
│   ├── layout.tsx                   # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx                     # Home page entry point
│   ├── robots.ts                     # Robots metadata route
│   └── sitemap.ts                    # Sitemap metadata route
├── components/
│   ├── 3d/                          # Three.js scenes and WebGL fallback
│   ├── intro/                       # Loading screen and portal introduction
│   ├── layout/                      # Footer and shared layout elements
│   ├── navigation/                  # Navbar and navigation controls
│   ├── providers/                   # Smooth scrolling and telemetry context
│   ├── sections/                    # Main portfolio sections
│   ├── ui/                          # Cursor, magnetic interactions, telemetry HUD
│   └── SiteShell.tsx                # Main client-side page composition
├── data/
│   └── telemetry.json               # File-backed telemetry state
├── lib/
│   ├── constants.ts                 # Contact and booking links
│   ├── server-telemetry.ts          # Telemetry storage and update logic
│   ├── useInView.ts                 # IntersectionObserver hook
│   └── webgl-check.ts                # Browser WebGL capability check
├── public/
│   └── assets/                      # Public images and brand assets
├── next.config.js                   # Next.js configuration
├── tailwind.config.ts               # Tailwind theme and animation configuration
├── postcss.config.js                # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Scripts and dependencies
```

## Getting started

### Prerequisites

- Node.js compatible with Next.js 14
- npm, or another Node.js package manager
- A browser with WebGL support for the full 3D experience

### Installation

```bash
git clone https://github.com/MahakTech/Mahak-tech-official-portfoilo.git
cd Mahak-tech-official-portfoilo
npm install
```

### Environment variables

The site works without environment variables, but `NEXT_PUBLIC_SITE_URL` should be set for correct canonical, Open Graph, and sitemap URLs in a deployed environment:

```bash
NEXT_PUBLIC_SITE_URL=https://mahak-tech-official-portfoilo.vercel.app
```

Create a local `.env.local` file if needed:

```bash
cp .env.example .env.local
```

> The repository does not currently include an `.env.example` file. If you use the command above, create the file manually and add the variable shown above.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create a production build

```bash
npm run build
npm run start
```

### Lint the project

```bash
npm run lint
```

## Important configuration

- Booking and social links are centralized in `lib/constants.ts`.
- The default site URL fallback is `https://mahaktech.example`; set `NEXT_PUBLIC_SITE_URL` in deployment to override it.
- The Next.js configuration enables React strict mode and transpiles the `three` package.
- Tailwind scans files in `app`, `components`, and `pages` for utility classes.
- The portfolio uses `Space Grotesk` and `JetBrains Mono` through `next/font/google`.

## Deployment

This project is ready to deploy on platforms that support Next.js, including Vercel.

Before deploying:

1. Set `NEXT_PUBLIC_SITE_URL` to the final public URL.
2. Confirm that the `public/assets` brand files are included in the deployment.
3. Decide whether file-based telemetry is sufficient for the target hosting environment.
4. Run a production build locally with `npm run build`.
5. Test the WebGL fallback and reduced-motion behavior on mobile and accessibility-focused browsers.

## Contact

- **Email:** [mahaktech90@gmail.com](mailto:mahaktech90@gmail.com)
- **GitHub:** [MahakTech](https://github.com/MahakTech)
- **LinkedIn:** [MahakTech](https://www.linkedin.com/company/mahak-tech/)
- **YouTube:** [@MahakTech-b6b](https://www.youtube.com/@MahakTech-b6b)
- **Discovery call:** [Book a consultation](https://docs.google.com/forms/d/e/1FAIpQLSdQRupFViYSy2sV12oYf2dmkYDEc23YyJdafJVxCVskrqAL4w/viewform)

## License

No license file is currently included in this repository. Unless a license is added, the source code remains under the copyright of its owner and should not be assumed to be available for unrestricted reuse.
