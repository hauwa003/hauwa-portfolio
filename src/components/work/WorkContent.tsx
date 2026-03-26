import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WorkContent() {
  return (
    <div className="px-8 py-16 lg:px-16">
      <ScrollReveal>
        <div className="flex items-end justify-between gap-8">
          <h1 className="font-display text-2xl tracking-tight md:text-3xl">
            Selected Work
          </h1>
          <span className="text-[13px] text-muted">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>
        <div className="mt-4 h-px bg-border" />
      </ScrollReveal>

      {/* Project list */}
      <div className="mt-14 grid gap-y-16">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
