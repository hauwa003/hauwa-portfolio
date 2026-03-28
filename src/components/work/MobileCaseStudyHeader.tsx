"use client";

import { useState, useEffect } from "react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { motion } from "framer-motion";
import type { Project } from "@/types";

interface MobileCaseStudyHeaderProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

export function MobileCaseStudyHeader({
  project,
  prev,
  next,
}: MobileCaseStudyHeaderProps) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const content = (
    <>
      {/* Nav row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {prev ? (
            <TransitionLink
              href={`/work/${prev.slug}`}
              className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-surface"
            >
              &larr; Prev
            </TransitionLink>
          ) : (
            <span className="rounded-full border border-border px-4 py-2 text-sm text-muted/60">
              &larr; Prev
            </span>
          )}
          {next ? (
            <TransitionLink
              href={`/work/${next.slug}`}
              className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-surface"
            >
              Next &rarr;
            </TransitionLink>
          ) : (
            <span className="rounded-full border border-border px-4 py-2 text-sm text-muted/60">
              Next &rarr;
            </span>
          )}
        </div>
      </div>

      {/* Project info */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">
            Project Name
          </p>
          <p className="mt-1 text-base font-medium">{project.title}</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">
            Scope of Work
          </p>
          <p className="mt-1 text-base">{project.scope}</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="lg:hidden">
      {hydrated ? (
      <motion.div
        className="border-b border-border px-6 py-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </motion.div>
      ) : (
      <div className="border-b border-border px-6 py-6">
        {content}
      </div>
      )}
    </div>
  );
}
