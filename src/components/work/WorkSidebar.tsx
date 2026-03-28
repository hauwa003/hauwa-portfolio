"use client";

import { useState, useEffect } from "react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export function WorkSidebar() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const navContent = (
    <nav>
      <ul className="space-y-1">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <TransitionLink
              href={`/work/${project.slug}`}
              className="flex items-center gap-3 w-full text-left py-2 font-display text-base text-white/60 transition-all duration-300 hover:text-white hover:translate-x-3"
            >
              <span className="h-px w-2 shrink-0 bg-white/40 transition-all duration-300" />
              <span className="text-sm tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {project.title}
            </TransitionLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  const bottomNav = (
    <div className="flex items-center gap-2">
      <TransitionLink
        href="/"
        className="rounded-full border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:bg-white/10"
      >
        Home
      </TransitionLink>
      <TransitionLink
        href="/about"
        className="rounded-full border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:bg-white/10"
      >
        About
      </TransitionLink>
      <TransitionLink
        href="/#contact"
        className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#5B21B6] transition-colors hover:bg-white/90"
      >
        Book a call
      </TransitionLink>
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
