"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const sections = [
  { id: "overview", label: "Overview" },
  { id: "interests", label: "Interests" },
  { id: "family-values", label: "Family Values" },
  { id: "music", label: "Music" },
  { id: "lets-connect", label: "Let's Connect" },
];

export function AboutSidebar() {
  const [activeId, setActiveId] = useState("");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const timeout = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-10% 0px -70% 0px" }
      );

      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer!.observe(el);
      });
    }, 800);

    return () => {
      clearTimeout(timeout);
      observer?.disconnect();
    };
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const navContent = (
    <nav>
      <ul className="space-y-1">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`flex w-full items-center gap-3 py-2 text-left font-display text-base transition-all duration-300 ${
                  activeId === id
                    ? "font-medium text-white translate-x-3"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span className={`h-px shrink-0 transition-all duration-300 ${
                  activeId === id ? "w-5 bg-white" : "w-2 bg-white/40"
                }`} />
                {label}
              </button>
            </li>
          ))}
        </ul>
    </nav>
  );

  const bottomNav = (
    <div className="flex items-center gap-2">
      <Link
        href="/"
        className="rounded-full border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:bg-white/10"
      >
        Home
      </Link>
      <Link
        href="/work"
        className="rounded-full border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:bg-white/10"
      >
        Work
      </Link>
      <Link
        href="/#contact"
        className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#5B21B6] transition-colors hover:bg-white/90"
      >
        Book a call
      </Link>
    </div>
  );

  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[360px] lg:flex-col lg:border-r lg:border-white/10 lg:bg-[#5B21B6] lg:z-40">
      {hydrated ? (
      <motion.div
        className="flex flex-1 flex-col justify-center px-8 pt-8 pb-8 overflow-y-auto"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
      >
        {navContent}
      </motion.div>
      ) : (
      <div className="flex flex-1 flex-col justify-center px-8 pt-8 pb-8 overflow-y-auto">
        {navContent}
      </div>
      )}

      {/* Bottom nav links */}
      {hydrated ? (
      <motion.div
        className="shrink-0 border-t border-white/10 px-8 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {bottomNav}
      </motion.div>
      ) : (
      <div className="shrink-0 border-t border-white/10 px-8 py-6">
        {bottomNav}
      </div>
      )}
    </aside>
  );
}
