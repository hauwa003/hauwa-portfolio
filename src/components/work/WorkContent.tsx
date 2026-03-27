import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function WorkContent() {
  return (
    <div className="px-8 py-16 lg:px-16">
      <ScrollReveal>
        <div className="flex items-center justify-between border-b border-border pb-6">
          <h1 className="font-display text-2xl tracking-[-0.04em]">Selected projects</h1>
          <span className="text-sm text-muted">Work</span>
        </div>
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
