"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/gallery", label: "Gallery" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/hauwa-yusuf", label: "LinkedIn" },
  { href: "https://cal.com/hauwa-yusuf", label: "Book a call" },
];

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
            ? "bg-background/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-[60] font-display text-xl tracking-tight transition-opacity duration-300 hover:opacity-60"
          >
            hauwa<span className="text-accent">.</span>design
          </Link>

          {/* Hamburger — always visible */}
          <button
            onClick={() => setOpen(!open)}
            className="relative z-[60] flex h-10 w-10 items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.svg
                  key="close"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </motion.svg>
              ) : (
                <motion.div
                  key="burger"
                  className="flex flex-col gap-[6px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="block h-[1.5px] w-7 bg-foreground" />
                  <span className="block h-[1.5px] w-7 bg-foreground" />
                  <span className="block h-[1.5px] w-7 bg-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
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
              className="fixed right-0 top-0 z-[58] flex h-full w-full flex-col items-center justify-center bg-black px-12 md:w-[50vw] md:px-16 lg:px-20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.4, ease: [0.25, 0.8, 0.25, 1] }}
            >
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
                    <Link
                      href={link.href}
                      className="block font-display text-5xl text-white/50 transition-colors duration-300 hover:text-white md:text-6xl lg:text-7xl"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

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
                    className="block font-display text-2xl text-white/30 transition-colors duration-300 hover:text-white md:text-3xl"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>

              {/* Email at bottom */}
              <motion.p
                className="absolute bottom-10 left-0 right-0 text-center text-sm text-white/30"
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
