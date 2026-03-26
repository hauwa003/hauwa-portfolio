"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const [hydrated, setHydrated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => setHydrated(true), []);

  const content = (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden bg-surface">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-5 font-display text-[4rem] leading-none text-background/0 transition-all duration-500 group-hover:text-background/80">
          {number}
        </div>
        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-background/0 backdrop-blur-sm transition-all duration-500 group-hover:bg-background/90">
          <svg
            className="h-4 w-4 -translate-x-1 -translate-y-1 rotate-45 text-foreground opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] tabular-nums text-muted">{number}</span>
            <span className="h-px w-4 bg-border" />
            <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
          </div>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
            {project.tagline}
          </p>
        </div>
        <span className="mt-0.5 shrink-0 border border-border px-3 py-1 text-xs text-muted">
          {project.category}
        </span>
      </div>
    </Link>
  );

  if (!hydrated) {
    return <div ref={ref}>{content}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {content}
    </motion.div>
  );
}
