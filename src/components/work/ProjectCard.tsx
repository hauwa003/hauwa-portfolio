"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
        </div>

        {/* Card info */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-sm text-muted">{number}</span>
              <h3 className="text-lg font-semibold">{project.title}</h3>
            </div>
            <p className="mt-1 text-sm text-muted">{project.tagline}</p>
          </div>
          <Tag>{project.category}</Tag>
        </div>
      </Link>
    </motion.div>
  );
}
