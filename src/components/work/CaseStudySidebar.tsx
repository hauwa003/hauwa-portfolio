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

  const navContent = (
    <>
      {/* Navigation row */}
      <div className="flex items-center gap-0">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
          >
            <span className="text-white/60">&larr;</span>
            <span>Previous</span>
          </Link>
        ) : (
          <span className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm text-white/40">
            <span>&larr;</span>
            <span>Previous</span>
          </span>
        )}

        {/* Project indicator */}
        <div className="flex items-center border-y border-white/20 px-4 py-2.5">
          <span className="max-w-[80px] truncate text-sm text-white/60">
            {String(currentIndex + 1).padStart(2, "0")}{" "}
            {project.title.slice(0, 6)}...
          </span>
        </div>

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
          >
            <span>Next</span>
            <span className="text-white/60">&rarr;</span>
          </Link>
        ) : (
          <span className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm text-white/40">
            <span>Next</span>
            <span>&rarr;</span>
          </span>
        )}
      </div>

      {/* Table of contents */}
      <nav className="mt-10">
        <ul className="space-y-1">
          {/* Overview */}
          <li>
            <button
              onClick={() => scrollTo("overview")}
              className={`flex w-full items-center gap-3 py-2 text-left font-display text-base transition-all duration-300 ${
                activeId === "overview"
                  ? "font-medium text-white translate-x-3"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span className={`h-px shrink-0 transition-all duration-300 ${
                activeId === "overview" ? "w-5 bg-white" : "w-2 bg-white/40"
              }`} />
              Overview
            </button>
          </li>

          {/* The Problem */}
          <li>
            <button
              onClick={() => scrollTo("the-problem")}
              className={`flex w-full items-center gap-3 py-2 text-left font-display text-base transition-all duration-300 ${
                activeId === "the-problem"
                  ? "font-medium text-white translate-x-3"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span className={`h-px shrink-0 transition-all duration-300 ${
                activeId === "the-problem" ? "w-5 bg-white" : "w-2 bg-white/40"
              }`} />
              The Problem
            </button>
          </li>

          {/* Process sections */}
          {project.process.map((section, i) => (
            <li key={i}>
              <button
                onClick={() => scrollTo(`process-${i}`)}
                className={`flex w-full items-center gap-3 py-2 text-left font-display text-base transition-all duration-300 ${
                  activeId === `process-${i}`
                    ? "font-medium text-white translate-x-3"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span className={`h-px shrink-0 transition-all duration-300 ${
                  activeId === `process-${i}` ? "w-5 bg-white" : "w-2 bg-white/40"
                }`} />
                <span className="mr-1 text-sm tabular-nums">
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
              className={`flex w-full items-center gap-3 py-2 text-left font-display text-base transition-all duration-300 ${
                activeId === "outcome"
                  ? "font-medium text-white translate-x-3"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span className={`h-px shrink-0 transition-all duration-300 ${
                activeId === "outcome" ? "w-5 bg-white" : "w-2 bg-white/40"
              }`} />
              Outcome
            </button>
          </li>
        </ul>
      </nav>
    </>
  );

  const bottomNav = (
    <div className="flex items-center gap-3">
      <Link
        href="/"
        className="rounded-full border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:bg-white/10"
      >
        Home
      </Link>
      <Link
        href="/#work"
        className="rounded-full border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:bg-white/10"
      >
        Work
      </Link>
      <Link
        href="/#contact"
        className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#5B21B6] transition-colors hover:bg-white/90"
      >
        Book a call
      </Link>
    </div>
  );

  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[360px] lg:flex-col lg:border-r lg:border-white/10 lg:bg-[#5B21B6] lg:z-40">
      {hydrated ? (
      <motion.div
        className="flex flex-1 flex-col justify-center px-8 pt-8 pb-8 overflow-y-auto"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
      >
        {navContent}
      </motion.div>
      ) : (
      <div className="flex flex-1 flex-col justify-center px-8 pt-8 pb-8 overflow-y-auto">
        {navContent}
      </div>
      )}

      {/* Bottom nav links */}
      {hydrated ? (
      <motion.div
        className="shrink-0 border-t border-white/10 px-8 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {bottomNav}
      </motion.div>
      ) : (
      <div className="shrink-0 border-t border-white/10 px-8 py-6">
        {bottomNav}
      </div>
      )}
    </aside>
  );
}
