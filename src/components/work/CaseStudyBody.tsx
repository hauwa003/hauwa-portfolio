import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Project } from "@/types";

interface CaseStudyBodyProps {
  project: Project;
}

export function CaseStudyBody({ project }: CaseStudyBodyProps) {
  return (
    <div className="px-8 py-16 lg:px-16">
      {/* Title bar */}
      <ScrollReveal>
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-2xl tracking-tight">
              {project.title}
            </h1>
          </div>
          <span className="text-[13px] text-muted">{project.category}</span>
        </div>
      </ScrollReveal>

      {/* Overview */}
      <ScrollReveal>
        <div className="mt-14 max-w-2xl space-y-4">
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Overview
          </p>
          <p className="text-base leading-[1.85] text-muted">
            {project.overview}
          </p>
        </div>
      </ScrollReveal>

      {/* Problem */}
      <ScrollReveal>
        <div className="mt-14 max-w-2xl space-y-4">
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            The Problem
          </p>
          <p className="text-base leading-[1.85] text-muted">
            {project.problem}
          </p>
        </div>
      </ScrollReveal>

      {/* Process sections */}
      {project.process.map((section, i) => (
        <ScrollReveal key={i}>
          <div className="mt-14 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[12px] tabular-nums text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-4 bg-border" />
              <h2 className="font-display text-xl tracking-tight">
                {section.heading}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-[1.85] text-muted">
              {section.body}
            </p>
            {section.images && section.images.length > 0 && (
              <div className="mt-8 grid gap-4">
                {section.images.map((img, j) => (
                  <div
                    key={j}
                    className="relative aspect-[16/10] overflow-hidden bg-surface"
                  >
                    <Image
                      src={img}
                      alt={`${section.heading} - image ${j + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      ))}

      {/* Outcome */}
      <ScrollReveal>
        <div className="mt-20 bg-surface p-8 lg:p-10">
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Outcome
          </p>
          <p className="mt-4 max-w-2xl text-base leading-[1.85] text-muted">
            {project.outcome}
          </p>
          {project.metrics && (
            <ul className="mt-6 space-y-3">
              {project.metrics.map((metric, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-foreground" />
                  <span className="text-[15px] font-medium">{metric}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
