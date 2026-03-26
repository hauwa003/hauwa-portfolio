import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const previewProjects = projects.slice(0, 3);

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <ScrollReveal>
        <div className="flex items-end justify-between gap-8">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Selected Work
          </h2>
          <span className="hidden text-[13px] text-muted md:block">
            {String(previewProjects.length).padStart(2, "0")} of{" "}
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>
        <div className="mt-4 h-px bg-border" />
      </ScrollReveal>

      {/* Project list — first 3 only */}
      <div className="mt-14 grid gap-y-16">
        {previewProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* See more CTA */}
      <ScrollReveal>
        <div className="mt-16 flex justify-center">
          <Link
            href="/work"
            className="border border-border px-8 py-3 text-[14px] transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            See more work
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
