import Link from "next/link";
import type { Project } from "@/types";

interface ProjectNavProps {
  prev: Project | null;
  next: Project | null;
}

export function ProjectNav({ prev, next }: ProjectNavProps) {
  return (
    <nav className="border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group px-6 py-10 transition-colors hover:bg-surface"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Previous
            </p>
            <p className="mt-2 font-display text-lg font-semibold group-hover:text-accent transition-colors">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div className="px-6 py-10" />
        )}

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group px-6 py-10 text-right transition-colors hover:bg-surface"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Next
            </p>
            <p className="mt-2 font-display text-lg font-semibold group-hover:text-accent transition-colors">
              {next.title}
            </p>
          </Link>
        ) : (
          <div className="px-6 py-10" />
        )}
      </div>
    </nav>
  );
}
