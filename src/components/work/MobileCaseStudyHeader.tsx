"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
            <Link
              href={`/work/${prev.slug}`}
              className="border border-border px-4 py-2 text-[13px] transition-colors hover:bg-surface"
            >
              &larr; Prev
            </Link>
          ) : (
            <span className="border border-border px-4 py-2 text-[13px] text-muted/40">
              &larr; Prev
            </span>
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="border border-border px-4 py-2 text-[13px] transition-colors hover:bg-surface"
            >
              Next &rarr;
            </Link>
          ) : (
            <span className="border border-border px-4 py-2 text-[13px] text-muted/40">
              Next &rarr;
            </span>
          )}
        </div>
      </div>

      {/* Project info */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Project Name
          </p>
          <p className="mt-1 text-[15px] font-medium">{project.title}</p>
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Scope of Work
          </p>
          <p className="mt-1 text-[15px]">{project.scope}</p>
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
