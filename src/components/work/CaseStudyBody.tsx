import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Project } from "@/types";

interface CaseStudyBodyProps {
  project: Project;
}

export function CaseStudyBody({ project }: CaseStudyBodyProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      {/* Overview grid */}
      <ScrollReveal>
        <div className="grid gap-8 border-b border-border pb-12 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Role
            </p>
            <p className="mt-1 font-medium">{project.role}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Tools
            </p>
            <p className="mt-1 font-medium">{project.tools.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Duration
            </p>
            <p className="mt-1 font-medium">{project.duration}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Overview */}
      <ScrollReveal>
        <div className="mt-12 space-y-4">
          <h2 className="font-display text-2xl font-semibold">Overview</h2>
          <p className="text-base leading-relaxed text-muted">
            {project.overview}
          </p>
        </div>
      </ScrollReveal>

      {/* Problem */}
      <ScrollReveal>
        <div className="mt-12 space-y-4">
          <h2 className="font-display text-2xl font-semibold">The Problem</h2>
          <p className="text-base leading-relaxed text-muted">
            {project.problem}
          </p>
        </div>
      </ScrollReveal>

      {/* Process sections */}
      {project.process.map((section, i) => (
        <ScrollReveal key={i}>
          <div className="mt-12 space-y-4">
            <h2 className="font-display text-2xl font-semibold">
              {section.heading}
            </h2>
            <p className="text-base leading-relaxed text-muted">
              {section.body}
            </p>
            {section.images && section.images.length > 0 && (
              <div className="mt-6 grid gap-4">
                {section.images.map((img, j) => (
                  <div
                    key={j}
                    className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface"
                  >
                    <Image
                      src={img}
                      alt={`${section.heading} - image ${j + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 896px) 100vw, 896px"
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
        <div className="mt-12 space-y-4">
          <h2 className="font-display text-2xl font-semibold">Outcome</h2>
          <p className="text-base leading-relaxed text-muted">
            {project.outcome}
          </p>
          {project.metrics && (
            <ul className="mt-4 space-y-2">
              {project.metrics.map((metric, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span className="text-base">{metric}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
