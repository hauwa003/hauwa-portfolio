import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <SectionLabel className="mb-4">Selected Work</SectionLabel>
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Projects I&apos;m proud of
      </h2>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
