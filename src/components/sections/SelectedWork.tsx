import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const previewProjects = projects.slice(0, 4);

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <ScrollReveal>
        <div className="flex items-end justify-between gap-8">
          <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
            Selected Work
          </h2>
          <span className="hidden text-sm text-muted md:block">
            {String(previewProjects.length).padStart(2, "0")} projects
          </span>
        </div>
        <div className="mt-4 h-px bg-border" />
      </ScrollReveal>

      {/* Project list — 2 per row on desktop */}
      <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {previewProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
