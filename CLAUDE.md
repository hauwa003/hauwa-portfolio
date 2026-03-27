# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

## Stack
- Next.js 16.2.1 (App Router) with TypeScript (strict mode)
- React 19
- Tailwind CSS v4 (CSS-based config via `@theme inline` in `src/app/globals.css`, no tailwind.config.js)
- Framer Motion for animations
- Deployed on Vercel at hauwa.design

## Architecture

**Routing:** All pages are statically generated (no API calls, no CMS). Case study pages use `generateStaticParams()` from the projects array.

**Data layer:** All project data lives in `src/lib/projects.ts` as a static array of `Project` objects. Gallery data in `src/lib/gallery.ts`. Tag colors in `src/lib/tag-colors.ts`. Types in `src/types/index.ts`. To add a new project, add an entry to the projects array — the case study page, sitemap, and nav are all derived from it.

**Layout:** `LayoutShell` (client component) conditionally hides navbar/footer on pages that use sidebar navigation. Pages with sidebars: `/work`, `/work/[slug]`, `/explorations`, `/gallery`, `/about`, `/process`. These pages have their own sidebar + mobile header components instead.

**Sidebar pattern:** Desktop sidebars are fixed-positioned at 360px width with purple background (`bg-[#5B21B6]`). Main content offsets with `lg:ml-[360px]`. Each sidebar page has three components: `*Sidebar.tsx` (desktop), `*MobileHeader.tsx` (mobile), `*Content.tsx` (main content).

**Components:** Organized under `src/components/` by concern:
- `layout/` — LayoutShell, Navbar, Footer, CustomCursor, page transitions
- `sections/` — Homepage sections (Hero, SelectedWork, Showreel, Testimonial, DesignPhilosophy, ContactCTA, etc.)
- `work/` — Case study components (CaseStudyBody, CaseStudySidebar, ProjectCard, ProjectNav)
- `gallery/` — GalleryGrid with hover effects (zoom, lift, tilt, reveal)
- `about/`, `process/`, `explorations/` — Sidebar page components
- `ui/` — Reusable primitives (Button, ScrollReveal, AnimatedText, SectionLabel, Tag)

## Fonts (loaded in `src/app/layout.tsx`)
- **Bricolage Grotesque** (display) — `font-display` class, `--font-bricolage-grotesque`
- **DM Sans** (body) — `font-body` class, `--font-dm-sans`
- **Caveat** (handwriting) — `font-handwriting` class, `--font-caveat`

## Design Tokens (in globals.css `@theme inline`)
- Accent: `#7C3AED` (purple) — used via `text-accent`, `bg-accent`
- Foreground: `#0A0A0A`
- Background: `#FFFFFF`
- Muted: `#6B7280`
- Border: `#E5E7EB`
- Surface: `#F9FAFB`
- Sidebar purple: `#5B21B6` (hardcoded in sidebar components)
- Testimonial deep purples: `#4C1D95`, `#3B0764`, `#2E1065`

## Key Patterns

**Hydration guard:** Most animated components use a `hydrated` state + `wasInView` ref to prevent Framer Motion from flashing `opacity: 0` during SSR. Pattern: render plain HTML during SSR, swap to `motion.*` after `useEffect(() => setHydrated(true), [])`. If the element was already in view on mount, skip the entrance animation (`initial: false`).

**Consistent easing:** `[0.22, 1, 0.36, 1]` cubic-bezier used across all Framer Motion animations.

**ScrollReveal:** `useInView`-based fade-in wrapper component used throughout for scroll-triggered entrances.

**Testimonial sweep:** Canvas-based top-to-bottom color sweep transition using `globalCompositeOperation: "destination-out"` with a gradient blend zone. Auto-rotates every 6 seconds.

**Custom cursor:** Hides system cursor on hover devices via `@media (hover: hover) { * { cursor: none !important; } }`. Custom cursor rendered by `CustomCursor` component.

## Path Alias
`@/*` maps to `./src/*` (configured in tsconfig.json).

## Images
All images in `public/images/projects/`. Use `next/image` with `fill` + `sizes` for responsive images. Set `priority` on above-fold hero images.
