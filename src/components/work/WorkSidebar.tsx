"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export function WorkSidebar() {
  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[360px] lg:flex-col lg:border-r lg:border-border lg:bg-background lg:z-40">
      <motion.div
        className="flex flex-1 flex-col px-8 pt-8 pb-8 overflow-y-auto"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
      >
        <div>
          <p className="font-display text-lg tracking-tight">Work</p>
          <p className="mt-1 text-[13px] text-muted">Selected projects</p>
        </div>

        {/* Project list */}
        <nav className="mt-8">
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Projects
          </p>
          <ul className="mt-4 space-y-1">
            {projects.map((project, i) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-[14px] text-muted transition-colors duration-200 hover:text-foreground"
                >
                  <span className="text-[12px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Bottom nav links */}
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
            href="/about"
            className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="bg-foreground px-5 py-2.5 text-[13px] text-background transition-colors hover:bg-accent-hover"
          >
            Book a call
          </Link>
        </div>
      </motion.div>
    </aside>
  );
}
