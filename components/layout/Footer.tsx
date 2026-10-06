import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative bg-space-950 border-t border-slate-900/80 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-electric/40">
            <Image src="/assets/mahaktech-logo.jpeg" alt="MahakTech logo" fill className="object-cover" />
          </div>
          <div>
            <p className="font-mono font-bold tracking-wider text-white">MahakTech</p>
            <p className="text-xs text-slate-400 font-mono tracking-wider">Technology. Design. Innovation.</p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-6 text-sm font-mono text-slate-300">
          <a
            href="https://github.com/MahakTech"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyanGlow transition-colors py-2"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/company/mahak-tech/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyanGlow transition-colors py-2"
          >
            LinkedIn
          </a>
          <a href="mailto:mahaktech90@gmail.com" className="hover:text-cyanGlow transition-colors py-2">
            Email
          </a>
        </nav>
      </div>
      <p className="mt-10 text-center text-xs text-slate-500 font-mono">
        © 2026 MahakTech. All rights reserved.
      </p>
    </footer>
  );
}
