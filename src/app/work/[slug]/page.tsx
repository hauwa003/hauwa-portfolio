import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  projects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/projects";
import { CaseStudyHero } from "@/components/work/CaseStudyHero";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";
import { CaseStudySidebar } from "@/components/work/CaseStudySidebar";
import { MobileCaseStudyHeader } from "@/components/work/MobileCaseStudyHeader";
import { ContentEntrance } from "@/components/layout/ContentEntrance";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | Case Study | Hauwa Yusuf`,
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
    <main>
      {/* Fixed sidebar — desktop only */}
      <CaseStudySidebar
        project={project}
        prev={prev}
        next={next}
        allProjects={projects}
      />

      {/* Mobile header */}
      <MobileCaseStudyHeader project={project} prev={prev} next={next} />

      {/* Main content — offset on desktop to account for fixed sidebar */}
      <ContentEntrance>
        <div className="lg:ml-[360px]">
          <CaseStudyHero project={project} />
          <CaseStudyBody project={project} />
        </div>
      </ContentEntrance>
    </main>
  );
}
