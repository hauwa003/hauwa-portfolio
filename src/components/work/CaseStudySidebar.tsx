"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

interface CaseStudySidebarProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
  allProjects: Project[];
}

const fixedSections = ["Overview", "The Problem"];

export function CaseStudySidebar({
  project,
  prev,
  next,
  allProjects,
}: CaseStudySidebarProps) {
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const [activeId, setActiveId] = useState("");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  // Build list of all section ids
  const sectionIds = [
    "overview",
    "the-problem",
    ...project.process.map((_, i) => `process-${i}`),
    "outcome",
  ];

  // Track which section is in view
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // Small delay to let ScrollReveal render the sections into the DOM
    const timeout = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-10% 0px -70% 0px" }
      );

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer!.observe(el);
      });
    }, 800);

    return () => {
      clearTimeout(timeout);
      observer?.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.slug]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[360px] lg:flex-col lg:border-r lg:border-border lg:bg-background lg:z-40">
      {hydrated ? (
      <motion.div
        className="flex flex-1 flex-col px-8 pt-8 pb-8 overflow-y-auto"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
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

        {/* Project title + meta */}
        <div className="mt-10">
          <p className="font-display text-lg tracking-tight">{project.title}</p>
          <p className="mt-1 text-[13px] text-muted">
            {project.role} · {project.duration}
          </p>
        </div>

        {/* Table of contents */}
        <nav className="mt-8">
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Contents
          </p>
          <ul className="mt-4 space-y-1">
            {/* Overview */}
            <li>
              <button
                onClick={() => scrollTo("overview")}
                className={`w-full text-left px-3 py-2 text-[14px] transition-colors duration-200 ${
                  activeId === "overview"
                    ? "font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Overview
              </button>
            </li>

            {/* The Problem */}
            <li>
              <button
                onClick={() => scrollTo("the-problem")}
                className={`w-full text-left px-3 py-2 text-[14px] transition-colors duration-200 ${
                  activeId === "the-problem"
                    ? "font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                The Problem
              </button>
            </li>

            {/* Process sections */}
            {project.process.map((section, i) => (
              <li key={i}>
                <button
                  onClick={() => scrollTo(`process-${i}`)}
                  className={`w-full text-left px-3 py-2 text-[14px] transition-colors duration-200 ${
                    activeId === `process-${i}`
                      ? "font-medium text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <span className="mr-2 text-[12px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </button>
              </li>
            ))}

            {/* Outcome */}
            <li>
              <button
                onClick={() => scrollTo("outcome")}
                className={`w-full text-left px-3 py-2 text-[14px] transition-colors duration-200 ${
                  activeId === "outcome"
                    ? "font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Outcome
              </button>
            </li>
          </ul>
        </nav>
      </motion.div>
      ) : (
      <div className="flex flex-1 flex-col px-8 pt-8 pb-8 overflow-y-auto">
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

        {/* Project title + meta */}
        <div className="mt-10">
          <p className="font-display text-lg tracking-tight">{project.title}</p>
          <p className="mt-1 text-[13px] text-muted">
            {project.role} · {project.duration}
          </p>
        </div>

        {/* Table of contents */}
        <nav className="mt-8">
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Contents
          </p>
          <ul className="mt-4 space-y-1">
            <li>
              <button
                onClick={() => scrollTo("overview")}
                className="w-full text-left px-3 py-2 text-[14px] text-muted hover:text-foreground transition-colors duration-200"
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo("the-problem")}
                className="w-full text-left px-3 py-2 text-[14px] text-muted hover:text-foreground transition-colors duration-200"
              >
                The Problem
              </button>
            </li>
            {project.process.map((section, i) => (
              <li key={i}>
                <button
                  onClick={() => scrollTo(`process-${i}`)}
                  className="w-full text-left px-3 py-2 text-[14px] text-muted hover:text-foreground transition-colors duration-200"
                >
                  <span className="mr-2 text-[12px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollTo("outcome")}
                className="w-full text-left px-3 py-2 text-[14px] text-muted hover:text-foreground transition-colors duration-200"
              >
                Outcome
              </button>
            </li>
          </ul>
        </nav>
      </div>
      )}

      {/* Bottom nav links */}
      {hydrated ? (
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
            href="/work"
            className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
          >
            Work
          </Link>
          <Link
            href="/#contact"
            className="bg-foreground px-5 py-2.5 text-[13px] text-background transition-colors hover:bg-accent-hover"
          >
            Book a call
          </Link>
        </div>
      </motion.div>
      ) : (
      <div className="shrink-0 border-t border-border px-8 py-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
          >
            Work
          </Link>
          <Link
            href="/#contact"
            className="bg-foreground px-5 py-2.5 text-[13px] text-background transition-colors hover:bg-accent-hover"
          >
            Book a call
          </Link>
        </div>
      </div>
      )}
    </aside>
  );
}
