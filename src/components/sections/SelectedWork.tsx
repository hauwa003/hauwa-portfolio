"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ProjectType } from "@/types";

const filters: ("All" | ProjectType)[] = [
  "All",
  "Mobile App",
  "Web",
  "Dashboard",
  "Branding",
];

export function SelectedWork() {
  const [active, setActive] = useState<"All" | ProjectType>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.type === active);

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <ScrollReveal>
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="text-[13px] uppercase tracking-[0.2em] text-muted">
              Selected Work
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Projects I&apos;m proud of
            </h2>
          </div>
          <span className="hidden text-[13px] text-muted md:block">
            {String(filtered.length).padStart(2, "0")} projects
          </span>
        </div>
        <div className="mt-4 h-px bg-border" />
      </ScrollReveal>

      {/* Filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`relative px-5 py-2 text-[13px] transition-colors duration-300 ${
              active === filter
                ? "text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            {active === filter && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 bg-foreground"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="relative">{filter}</span>
          </button>
        ))}
      </div>

      {/* Project list */}
      <div className="mt-14 grid gap-y-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid gap-y-16"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))
            ) : (
              <p className="py-20 text-center text-muted">
                No projects in this category yet — stay tuned.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
