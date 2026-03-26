"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const [state, setState] = useState<"ssr" | "visible" | "animate">("ssr");
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (ref.current) {
      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setState(inView ? "visible" : "animate");
    } else {
      setState("visible");
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    },
    [cursorX, cursorY]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      // Jump to position immediately on enter (no spring lag)
      cursorX.jump(e.clientX - rect.left);
      cursorY.jump(e.clientY - rect.top);
      setHovered(true);
    },
    [cursorX, cursorY]
  );

  const content = (
    <Link href={`/work/${project.slug}`} className="group block">
      <div
        ref={imageRef}
        className="relative aspect-[3/2] overflow-hidden bg-surface"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "none" }}
      >
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

        {/* Cursor-following "View Project" pill */}
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-10"
          style={{ x, y }}
        >
          <motion.span
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            initial={false}
            animate={{
              scale: hovered ? 1 : 0.6,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="whitespace-nowrap text-[13px] font-medium tracking-wide text-background">
              View Project
            </span>
            <svg
              className="h-3.5 w-3.5 text-background"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 12h16m-6-6 6 6-6 6"
              />
            </svg>
          </motion.span>
        </motion.div>
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

  // SSR or already-visible: render plain div (no framer-motion)
  if (state !== "animate") {
    return <div ref={ref}>{content}</div>;
  }

  // Off-screen: animate on scroll using whileInView (manages its own observer)
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
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
