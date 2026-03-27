"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types";

interface ProjectNavProps {
  prev: Project | null;
  next: Project | null;
}

export function ProjectNav({ prev, next }: ProjectNavProps) {
  return (
    <nav className="border-t border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group relative overflow-hidden px-6 py-12 transition-colors duration-500 hover:bg-surface lg:px-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Previous
            </p>
            <p className="mt-3 font-display text-xl tracking-[-0.04em] transition-colors duration-300 group-hover:text-accent md:text-2xl">
              {prev.title}
            </p>
            {/* Animated arrow */}
            <motion.span
              className="mt-2 inline-block text-sm text-muted"
              initial={false}
              whileHover={{ x: -4 }}
            >
              &larr;
            </motion.span>
          </Link>
        ) : (
          <div className="px-6 py-12" />
        )}

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group relative overflow-hidden px-6 py-12 text-right transition-colors duration-500 hover:bg-surface lg:px-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Next
            </p>
            <p className="mt-3 font-display text-xl tracking-[-0.04em] transition-colors duration-300 group-hover:text-accent md:text-2xl">
              {next.title}
            </p>
            <motion.span
              className="mt-2 inline-block text-sm text-muted"
              initial={false}
              whileHover={{ x: 4 }}
            >
              &rarr;
            </motion.span>
          </Link>
        ) : (
          <div className="px-6 py-12" />
        )}
      </div>
    </nav>
  );
}
