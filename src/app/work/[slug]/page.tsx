import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/lib/projects";
import { CaseStudyHero } from "@/components/work/CaseStudyHero";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";
import { ProjectNav } from "@/components/work/ProjectNav";
import { PageTransition } from "@/components/layout/PageTransition";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Case Study | Hauwa Yusuf`,
      description: project.tagline,
      images: [{ url: project.heroImage, width: 1200, height: 630 }],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <PageTransition>
      <main>
        <CaseStudyHero project={project} />
        <CaseStudyBody project={project} />
        <ProjectNav prev={prev} next={next} />
      </main>
    </PageTransition>
  );
}
