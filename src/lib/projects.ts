import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "medtrack",
    title: "MedTrack",
    tagline: "Simplifying hospital inventory management for healthcare teams",
    category: "Healthcare",
    type: "Dashboard",
    year: "2024",
    coverImage: "/images/projects/medtrack-cover.jpg",
    heroImage: "/images/projects/medtrack-hero.jpg",
    role: "Product Designer",
    tools: ["Figma", "FigJam"],
    duration: "6 weeks",
    scope: "Dashboard redesign, UX research, visual design",
    notes: "Reduced inventory errors by 40% in first month",
    overview:
      "MedTrack is a healthcare dashboard redesign aimed at streamlining hospital inventory management. The existing system was outdated, hard to navigate, and led to frequent stock errors that impacted patient care.",
    problem:
      "Hospital staff struggled with a legacy inventory system that was slow, confusing, and error-prone. Critical supplies were frequently over- or under-stocked, leading to waste and shortages.",
    process: [
      {
        heading: "Research & Discovery",
        body: "Conducted stakeholder interviews with hospital administrators and nurses to understand pain points. Mapped existing workflows and identified key friction areas in the inventory tracking process.",
      },
      {
        heading: "Information Architecture",
        body: "Restructured the dashboard navigation to prioritize the most-used actions: checking stock levels, placing orders, and viewing alerts. Reduced the number of clicks to complete core tasks by 60%.",
      },
      {
        heading: "Visual Design",
        body: "Created a clean, scannable interface with clear data hierarchy. Used color coding for stock status (critical, low, adequate) and designed mobile-responsive views for on-the-go checks.",
      },
    ],
    outcome:
      "The redesigned dashboard reduced inventory errors by 40% in the first month and cut the average time to complete a stock check from 12 minutes to under 4 minutes.",
    metrics: [
      "40% reduction in inventory errors",
      "3x faster stock checks",
      "92% user satisfaction score",
    ],
  },
  {
    slug: "budgio",
    title: "Budgio",
    tagline: "Helping freelancers manage money with irregular income",
    category: "Fintech",
    type: "Mobile App",
    year: "2024",
    coverImage: "/images/projects/budgio-cover.jpg",
    heroImage: "/images/projects/budgio-hero.jpg",
    role: "Product Designer",
    tools: ["Figma"],
    duration: "4 weeks",
    scope: "0→1, mobile app design, user research, prototyping",
    notes: "95% task completion rate in user testing",
    overview:
      "Budgio is a budgeting app designed specifically for freelancers and gig workers who deal with irregular income. It helps users plan around variable earnings rather than fixed monthly salaries.",
    problem:
      "Most budgeting apps assume a steady paycheck. Freelancers need tools that adapt to inconsistent income — helping them save during good months and stay afloat during slow ones.",
    process: [
      {
        heading: "User Research",
        body: "Interviewed 12 freelancers across design, development, and writing to understand their financial habits, pain points, and existing tools. Found that 80% had tried and abandoned at least one budgeting app.",
      },
      {
        heading: "Concept & Wireframing",
        body: "Designed an income-first budgeting model where users log earnings as they come in, and the app dynamically adjusts spending recommendations. Created low-fidelity wireframes for core flows.",
      },
      {
        heading: "UI Design & Prototyping",
        body: "Built a warm, approachable visual system that avoids the clinical feel of most fintech apps. Designed interactive prototypes for user testing with 8 participants.",
      },
    ],
    outcome:
      "User testing showed a 95% task completion rate for core budgeting flows. The income-first model resonated strongly with freelancers, with 10 out of 12 testers saying they would switch from their current tool.",
    metrics: [
      "95% task completion rate",
      "83% said it felt designed for them",
      "10/12 testers preferred it over current tools",
    ],
  },
  {
    slug: "cospace",
    title: "CoSpace",
    tagline: "A smarter way to find apartments and roommates",
    category: "Real Estate",
    type: "Web",
    year: "2024",
    coverImage: "/images/projects/cospace-cover.jpg",
    heroImage: "/images/projects/cospace-hero.jpg",
    role: "Product Designer",
    tools: ["Figma"],
    duration: "4 weeks",
    scope: "0→1, web platform, UX/UI design, roommate matching",
    notes: "Dual-search concept validated with 15 users",
    overview:
      "CoSpace is a platform that helps young professionals find apartments and compatible roommates in one place. It combines property listings with roommate matching based on lifestyle preferences.",
    problem:
      "Finding an apartment is stressful enough — finding a compatible roommate at the same time makes it worse. Existing platforms handle one or the other, forcing users to juggle multiple apps and risk bad matches.",
    process: [
      {
        heading: "Competitive Analysis",
        body: "Analyzed 6 competing platforms across real estate and roommate matching categories. Identified a clear gap: no single product handled both apartment search and roommate compatibility well.",
      },
      {
        heading: "User Flows & Wireframes",
        body: "Mapped the dual journey of apartment hunting and roommate matching. Designed flows that let users search for spaces first, then find compatible people — or vice versa.",
      },
      {
        heading: "High-Fidelity Design",
        body: "Created a modern, trustworthy visual design with verification badges, lifestyle tags, and compatibility scores. Designed both mobile and desktop experiences.",
      },
    ],
    outcome:
      "The design was validated with 15 target users. The dual-search concept tested strongly, with users particularly appreciating the lifestyle compatibility scoring feature.",
    metrics: [
      "15 user validation sessions",
      "88% found the dual-search intuitive",
      "Compatibility scoring rated most valuable feature",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
