"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const sections = [
  { id: "discover", label: "01 Discover" },
  { id: "define", label: "02 Define" },
  { id: "design", label: "03 Design" },
  { id: "deliver", label: "04 Deliver" },
  { id: "toolkit", label: "Toolkit" },
  { id: "working-together", label: "Working Together" },
];

export function ProcessSidebar() {
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

  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[360px] lg:flex-col lg:border-r lg:border-border lg:bg-background lg:z-40">
      {hydrated ? (
      <motion.div
        className="flex flex-1 flex-col px-8 pt-8 pb-8 overflow-y-auto"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
      >
        <div>
          <p className="font-display text-lg tracking-tight">Process</p>
          <p className="mt-1 text-[13px] text-muted">How I work</p>
        </div>

        <nav className="mt-8">
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Contents
          </p>
          <ul className="mt-4 space-y-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-3 py-2 text-[14px] transition-colors duration-200 ${
                    activeId === id
                      ? "font-medium text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
      ) : (
      <div className="flex flex-1 flex-col px-8 pt-8 pb-8 overflow-y-auto">
        <div>
          <p className="font-display text-lg tracking-tight">Process</p>
          <p className="mt-1 text-[13px] text-muted">How I work</p>
        </div>

        <nav className="mt-8">
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Contents
          </p>
          <ul className="mt-4 space-y-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="w-full text-left px-3 py-2 text-[14px] text-muted hover:text-foreground transition-colors duration-200"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      )}

      {hydrated ? (
      <motion.div
        className="shrink-0 border-t border-border px-8 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
          >
            Home
          </Link>
          <Link
            href="/explorations"
            className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
          >
            Work
          </Link>
          <Link
            href="/#contact"
            className="bg-foreground px-5 py-2.5 text-[13px] text-background transition-colors hover:bg-accent-hover"
          >
            Book a call
          </Link>
        </div>
      </motion.div>
      ) : (
      <div className="shrink-0 border-t border-border px-8 py-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
          >
            Home
          </Link>
          <Link
            href="/explorations"
            className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
          >
            Work
          </Link>
          <Link
            href="/#contact"
            className="bg-foreground px-5 py-2.5 text-[13px] text-background transition-colors hover:bg-accent-hover"
          >
            Book a call
          </Link>
        </div>
      </div>
      )}
    </aside>
  );
}
