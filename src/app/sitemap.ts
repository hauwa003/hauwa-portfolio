import { projects } from "@/lib/projects";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((p) => ({
    url: `https://hauwa.design/work/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://hauwa.design", lastModified: new Date() },
    { url: "https://hauwa.design/about", lastModified: new Date() },
    { url: "https://hauwa.design/process", lastModified: new Date() },
    ...projectRoutes,
  ];
}
