"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink, usePageTransition } from "./TransitionLink";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/explorations", label: "Explorations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/hauwayusuf", label: "LinkedIn" },
  { href: "https://cal.com/hauwa-yusuf", label: "Book a call" },
];

const headerSocials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hauwayusuf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" rx="1" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Behance",
    href: "https://www.behance.net/hauwayusuf1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18V6h5.5a3.5 3.5 0 0 1 0 7H3" />
        <path d="M3 12.5h6a3.5 3.5 0 0 1 0 7H3" />
        <path d="M15 12.5h6" />
        <path d="M21 15.5c0 2-1.5 3-3 3s-3-1-3-3 1.5-3 3-3 3 1 3 3z" />
        <path d="M15 8h6" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com/hauwa03",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20 10.5 13M14 10 20 4" />
        <path d="M20 4h-5M20 4v5" />
        <path d="M4 4l16 16" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@hauwa.design",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hauwa.design",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

function NavLinks({ setOpen }: { setOpen: (v: boolean) => void }) {
  const { navigateTo } = usePageTransition();
  return (
    <nav className="space-y-2 text-center">
      {navLinks.map((link, i) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15 + i * 0.06,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <button
            className="block w-full font-display text-4xl text-white transition-colors duration-300 hover:text-white/80 md:text-5xl lg:text-6xl"
            onClick={() => {
              setOpen(false);
              navigateTo(link.href);
            }}
          >
            {link.label}
          </button>
        </motion.div>
      ))}
    </nav>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 shadow-[0_1px_8px_rgba(0,0,0,0.06)] backdrop-blur-md"
            : "bg-background"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          {/* Logo */}
          <TransitionLink
            href="/"
            className="relative z-[60] font-display text-xl tracking-[-0.04em] transition-opacity duration-300 hover:opacity-60"
          >
            hauwa<span className="text-accent">.</span>design
          </TransitionLink>

          {/* Social icons + Hamburger */}
          <div className="relative z-[60] flex items-center gap-5">
            {/* Social icons — hidden on mobile, visible on md+ */}
            <div className="hidden items-center gap-2 md:flex">
              {headerSocials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:bg-surface"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Separator */}
            <div className="hidden h-5 w-px bg-border md:block" />

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <div className="flex flex-col gap-[6px]">
                <span className="block h-[1.5px] w-7 rounded-full bg-foreground" />
                <span className="block h-[1.5px] w-7 rounded-full bg-foreground" />
                <span className="block h-[1.5px] w-7 rounded-full bg-foreground" />
              </div>
            )}
          </button>
          </div>
        </nav>
      </header>

      {/* Slide-in menu panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 z-[55] bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(false)}
            />

            {/* Panel from right */}
            <motion.div
              className="fixed right-0 top-0 z-[58] flex h-full w-full flex-col items-center justify-center bg-[#5B21B6] px-12 md:w-[50vw] md:px-16 lg:px-20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.4, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <NavLinks setOpen={setOpen} />

              {/* Social / secondary links */}
              <motion.div
                className="mt-16 space-y-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-display text-xl text-white transition-colors duration-300 hover:text-white/80 md:text-2xl"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>

              {/* Email at bottom */}
              <motion.p
                className="absolute bottom-10 left-0 right-0 text-center text-sm text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                hauwayusuf003@gmail.com
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
