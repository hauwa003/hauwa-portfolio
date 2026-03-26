import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "medtrack",
    title: "MedTrack",
    tagline:
      "A SaaS dashboard redesign for retail pharmacies to manage daily operations faster and with fewer errors",
    category: "Healthcare",
    type: "Dashboard",
    year: "2024",
    coverImage: "/images/projects/medtrack-cover.jpg",
    heroImage: "/images/projects/medtrack-hero.jpg",
    role: "Product Designer",
    tools: ["Figma", "FigJam"],
    duration: "6 weeks",
    scope: "Dashboard redesign, UX research, user flows, visual design",
    notes:
      "41% faster workflow navigation after redesign",
    overview:
      "MedTrack is a SaaS dashboard built for retail pharmacies to manage day-to-day operations in one place. It covers inventory, expiry date tracking, purchasing, suppliers, returns, reporting, and staff activity across multiple user roles. This redesign focuses on reducing daily friction — the existing experience was creating unnecessary complexity, simple tasks took too long, and mistakes increased under pressure. The goal was to make MedTrack easier to navigate and quicker to use.",
    problem:
      "Our users are struggling with the current dashboard because it feels confusing and hard to use. Everyday tasks like tracking expiry dates and managing purchases take too many steps, which wastes time and increases mistakes. We need a redesign that makes the whole experience faster, clearer, and easier to manage.",
    process: [
      {
        heading: "UX Research & Discovery",
        body: "Through user interviews, we uncovered key pain points that shaped the redesign. Users couldn't tell what needed attention first, so they ended up clicking across pages just to start their day. Buying stock took more steps than it should, making a routine task feel unnecessarily complicated. Alerts for items close to expiry were easy to miss, and by the time someone noticed, stock had already gone to waste. Many users knew exactly what they needed to do — but finding it on the dashboard was the hard part.",
        images: ["/images/projects/medtrack/research.jpg"],
      },
      {
        heading: "Building the Right Solution",
        body: "Before jumping into design, we mapped out the user flow to understand exactly where the experience was breaking down and why. We identified the core actions users needed: seeing medication stock counts, toggling between drug categories, opening restock flows for low stock items, reviewing pending orders, and getting AI-powered context-aware answers from inventory data. Each of these had to be reachable with minimal effort.",
        images: ["/images/projects/medtrack/user-flow.jpg"],
      },
      {
        heading: "Designing for Real Users",
        body: "We designed around two key personas. The Superintendent Pharmacist who wants one place that shows what needs attention today — trusted numbers, quick exports, and a clear audit trail of who did what. And the Inventory Manager who needs to get ahead of low stock before it becomes an emergency, follow an order from request to arrival, and verify that what was delivered matches what was ordered.",
        images: ["/images/projects/medtrack/personas.jpg"],
      },
      {
        heading: "Aligning Design with Business Goals",
        body: "The UX strategy focused on three key challenges. First, the overview was showing a lot of numbers but not telling users what to do next — I redesigned it to surface what actually needed attention so users could act the moment they logged in. Second, the most common tasks were taking too many steps — I stripped them back so users could go from spotting a problem to fixing it without losing momentum. Third, the page had too much information competing for attention — I restructured the hierarchy so urgent items were impossible to miss and everything else stayed out of the way.",
        images: ["/images/projects/medtrack/dashboard.jpg"],
      },
      {
        heading: "Challenges & Solutions",
        body: "Simplifying the dashboard without losing important information was tricky — I reworked the hierarchy so urgent items stood out and secondary details stopped fighting for attention. Users were spending time looking for actions that should have been immediately reachable, so I introduced a 'New' button in the navbar that brought everything into one place. The old activity feed made it hard to tell what actually mattered, so I cleaned up the structure, added context to each entry, and built in hover interactions on user names so managers could get to the right person without digging around. One of the biggest frustrations was not knowing where to start — we fixed that by adding a 'Today's Priorities' section that surfaces the most urgent tasks the moment users open the dashboard.",
        images: ["/images/projects/medtrack/final.jpg"],
      },
    ],
    outcome:
      "The final design introduced a stronger visual hierarchy that surfaces urgent items first, keeps key context easy to scan, and makes important actions easier to find. To validate the redesign, I built a prototype and tested it with real users — their feedback showed where things still felt off, and I used that to make the final round of improvements. The redesign resulted in 41% faster workflow navigation, giving healthcare teams a reliable tool for managing day-to-day pharmacy operations.",
    metrics: [
      "41% faster workflow navigation",
      "Faster task completion — users moved through key workflows quicker after urgent items and actions were made easier to find",
      "Improved action discoverability — bringing key actions under one entry point meant users stopped searching and started doing",
      "Better update scanability — a clearer activity feed meant users could tell what changed, who did it, and when, at a glance",
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
    tagline:
      "Making the house hunting journey less complicated for renters in Lagos",
    category: "Real Estate",
    type: "Web",
    year: "2025",
    coverImage: "/images/projects/cospace-cover.jpg",
    heroImage: "/images/projects/cospace-hero.jpg",
    role: "Product Designer",
    tools: ["Figma"],
    duration: "4 weeks",
    scope: "0→1, web platform, UX/UI design, user research",
    notes: "150+ pre-launch waitlist signups",
    overview:
      "I designed CoSpace to make finding a home in Lagos less stressful and less costly. Renters often rely on agents, fragmented listings, and repeated inspections — paying fees without any guarantee of securing a home. CoSpace enables direct connections between renters, homeowners, and potential roommates, reducing friction and helping people make clearer housing decisions.",
    problem:
      "Finding a place to rent and possible roommates to rent with is stressful. Repeated inspection fees and agent dependency only make it worse. Renters move between different agents and apartments with no guarantee of success, often losing money before they ever move in.",
    process: [
      {
        heading: "Research & Discovery",
        body: "I spoke with renters in Lagos to understand their experiences finding a place to live. These conversations revealed recurring frustrations: inspection fee fatigue from repeated fees that rarely led to securing an apartment, trust and safety concerns from past experiences with scams and fake listings, and poor filtering systems that made it difficult to narrow down options. With a clear understanding of user needs and pain points, I translated those insights into user flows.",
        images: ["/images/projects/cospace/research.jpg"],
      },
      {
        heading: "Designing for Real Users",
        body: "I created two personas based on research. Kunle, a 34-year-old business development manager who needs a reliable replacement flatmate quickly without dealing with agents. And Amaka, a 28-year-old junior content strategist who is a budget-conscious first-time renter nervous about navigating the Lagos rental market without getting taken advantage of. Both share a common need: find a place faster, with less stress and no agent fees.",
        images: ["/images/projects/cospace/personas.jpg"],
      },
      {
        heading: "Wireframing the Experience",
        body: "I used wireframes to map a clear, low-friction renting journey, focusing on discovery, understanding listings, and initiating contact. This stage helped validate flows early and ensured the experience directly addressed user pain points before moving into high-fidelity design.",
        images: ["/images/projects/cospace/wireframes.jpg"],
      },
      {
        heading: "High-Fidelity Design",
        body: "I allowed users to access the home screen without signing up to support exploration before commitment. I introduced identity verification requiring all listers to upload a valid government-issued ID before their listing goes live. I designed a robust filtering system with key filters immediately visible to support quick decision-making. I added a simple way for users to report suspicious listings, making safety a shared responsibility. And I standardised listing details to surface essential information upfront, improving transparency and reducing uncertainty.",
        images: ["/images/projects/cospace/hifi.jpg"],
      },
      {
        heading: "Designing for Trust",
        body: "Working on CoSpace highlighted that trust must be reinforced across the entire experience. Verification steps, consistent listing information, and the ability to report suspicious content were designed to reduce anxiety and increase perceived platform credibility. Moving forward, I plan to design trust cues more intentionally at key decision points rather than relying on isolated features.",
        images: ["/images/projects/cospace/trust.jpg"],
      },
    ],
    outcome:
      "CoSpace addressed key renting challenges by removing agent-led friction and enabling direct connections between renters and homeowners. Early validation through user research and pre-launch waitlist signups demonstrated strong demand for a calmer, more transparent renting experience. The result is a focused solution that prioritises clarity, trust, and real-world renting behaviour.",
    metrics: [
      "90% task completion confidence — participants completed key tasks without confusion or external help",
      "Increased trust in listings — visible verification steps and reporting reduced anxiety",
      "150+ pre-launch waitlist signups — confirming demand for a transparent approach to renting in Lagos",
    ],
  },
  {
    slug: "mira",
    title: "Mira",
    tagline:
      "A therapy matching platform built exclusively for women, connecting them with licensed female therapists",
    category: "Healthcare",
    type: "Web",
    year: "2026",
    coverImage: "/images/projects/mira-cover.jpg",
    heroImage: "/images/projects/mira-hero.jpg",
    role: "Framer Developer, UI/UX Designer",
    tools: ["Figma", "Framer", "Lummi"],
    duration: "2 weeks",
    scope: "End-to-end UI/UX, Framer development",
    notes: "Designed and built in 2 weeks",
    overview:
      "Mira is a therapy matching platform built exclusively for women, connecting them with licensed female therapists who specialise in the challenges women actually face. I designed the end-to-end UI/UX with one goal: make women feel genuinely welcome.",
    problem:
      "Women seeking mental health support are often already carrying a lot before they even open a browser. They may have been dismissed by a doctor, talked themselves out of it a dozen times, or simply never felt like existing platforms were built with them in mind. Mira started from a different question: what would it take for a woman to feel genuinely welcome here, from the very first word on the page?",
    process: [
      {
        heading: "Visual Language & Tone",
        body: "The colour palette centres on deep forest green and warm cream. Green was a considered choice — it carries associations of calm and growth, two things that feel genuinely relevant to a woman beginning a mental health journey. The cream ground keeps it warm and approachable rather than corporate. Together they create a visual environment that feels safe to spend time in, which matters when the content itself asks something emotionally significant of the user.",
        images: ["/images/projects/mira/visual.jpg"],
      },
      {
        heading: "Typography",
        body: "The type system pairs a soft italic serif for display and emotional emphasis with a clean, highly legible body font for everything informational. The serif was chosen for its softness: rounded, considered, a little warm. It gives headlines and key phrases like 'tailored for women' a quality that feels personal rather than broadcast. The body font then does the practical work of making longer content easy to read without fatigue.",
        images: ["/images/projects/mira/typography.jpg"],
      },
      {
        heading: "Trust-Building Design",
        body: "Every section earns the next click rather than demanding it. The hero opens with a social proof pill showing real faces alongside 'Join 20k+ women'. The CTA is immediately followed by 'No credit card required. Free 20min consultation' because nobody should have to wonder if there is a catch. Therapist profiles lead with faces and lived specialisations rather than a list of credentials, because the user needs to feel a connection before they feel reassured by a qualification.",
        images: ["/images/projects/mira/trust.jpg"],
      },
    ],
    outcome:
      "The Mira website came together in 2 weeks. Every visual and interaction decision points back to the same goal: that women deserve mental health platforms designed with the same care and intention they are being asked to bring to their own healing. Mira is what that looks like.",
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
