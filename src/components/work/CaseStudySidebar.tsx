"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types";

interface CaseStudySidebarProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
  allProjects: Project[];
}

export function CaseStudySidebar({
  project,
  prev,
  next,
  allProjects,
}: CaseStudySidebarProps) {
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);

  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[360px] lg:flex-col lg:border-r lg:border-border lg:bg-background lg:z-40">
      <motion.div
        className="flex flex-1 flex-col px-8 pt-8 pb-8 overflow-y-auto"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Navigation row */}
        <div className="flex items-center gap-0">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="flex items-center gap-2 border border-border px-4 py-2.5 text-[13px] transition-colors hover:bg-surface"
            >
              <span className="text-muted">&larr;</span>
              <span>Previous</span>
            </Link>
          ) : (
            <span className="flex items-center gap-2 border border-border px-4 py-2.5 text-[13px] text-muted/40">
              <span>&larr;</span>
              <span>Previous</span>
            </span>
          )}

          {/* Project indicator */}
          <div className="flex items-center border-y border-border px-4 py-2.5">
            <span className="max-w-[80px] truncate text-[13px] text-muted">
              {String(currentIndex + 1).padStart(2, "0")}{" "}
              {project.title.slice(0, 6)}...
            </span>
          </div>

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="flex items-center gap-2 border border-border px-4 py-2.5 text-[13px] transition-colors hover:bg-surface"
            >
              <span>Next</span>
              <span className="text-muted">&rarr;</span>
            </Link>
          ) : (
            <span className="flex items-center gap-2 border border-border px-4 py-2.5 text-[13px] text-muted/40">
              <span>Next</span>
              <span>&rarr;</span>
            </span>
          )}
        </div>

        {/* Project metadata */}
        <div className="mt-12 space-y-8">
          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
              Project Name
            </p>
            <p className="mt-1.5 text-[15px] font-medium">{project.title}</p>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
              Scope of Work
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed">
              {project.scope}
            </p>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
              Notes
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed">
              {project.notes}
            </p>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
              Role
            </p>
            <p className="mt-1.5 text-[15px]">{project.role}</p>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
              Tools
            </p>
            <p className="mt-1.5 text-[15px]">{project.tools.join(", ")}</p>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
              Duration
            </p>
            <p className="mt-1.5 text-[15px]">{project.duration}</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom nav links — always visible, outside scroll area */}
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
            href="/#work"
            className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
          >
            All Work
          </Link>
          <Link
            href="/#contact"
            className="bg-foreground px-5 py-2.5 text-[13px] text-background transition-colors hover:bg-accent-hover"
          >
            Let&apos;s talk
          </Link>
        </div>
      </motion.div>
    </aside>
  );
}
