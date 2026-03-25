"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types";

interface CaseStudyHeroProps {
  project: Project;
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3">
          <Tag>{project.category}</Tag>
          <span className="text-sm text-muted">{project.year}</span>
        </div>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-muted">{project.tagline}</p>
      </motion.div>

      <motion.div
        className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-surface"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={project.heroImage}
          alt={`${project.title} hero`}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
      </motion.div>
    </section>
  );
}
