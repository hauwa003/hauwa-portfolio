"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types";

interface CaseStudyHeroProps {
  project: Project;
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const image = (
    <Image
      src={project.heroImage}
      alt={`${project.title} hero`}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 75vw"
      priority
    />
  );

  if (!hydrated) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface lg:aspect-auto lg:h-[70vh]">
        {image}
      </div>
    );
  }

  return (
    <motion.div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface lg:aspect-auto lg:h-[70vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {image}
    </motion.div>
  );
}
