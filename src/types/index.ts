export type ProjectCategory =
  | "Healthcare"
  | "Fintech"
  | "Real Estate"
  | "Web3"
  | "SaaS"
  | "Edtech";

export interface ProcessSection {
  heading: string;
  body: string;
  images?: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  heroImage: string;
  role: string;
  tools: string[];
  duration: string;
  overview: string;
  problem: string;
  process: ProcessSection[];
  outcome: string;
  metrics?: string[];
  protected?: boolean;
}
