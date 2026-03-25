# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands
- `npm run dev` — Start dev server
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

**Data layer:** All project data lives in `src/lib/projects.ts` as a static array of `Project` objects. Gallery data in `src/lib/gallery.ts`. Types in `src/types/index.ts`. To add a new project, add an entry to the projects array — the case study page, sitemap, and nav are all derived from it.

**Layout:** `LayoutShell` (client component) conditionally hides navbar/footer/exit-message on case study pages (`/work/[slug]`). Case studies use their own sidebar navigation (`CaseStudySidebar` on desktop, `MobileCaseStudyHeader` on mobile) instead.

**Components:** Organized under `src/components/` by concern:
- `layout/` — LayoutShell, Navbar, Footer, page transitions
- `sections/` — Homepage sections (Hero, SelectedWork, Showreel, Testimonial, etc.)
- `work/` — Case study components (CaseStudyBody, CaseStudySidebar, ProjectCard, ProjectNav)
- `gallery/` — GalleryGrid with hover effects
- `ui/` — Reusable primitives (Button, ScrollReveal, AnimatedText, SectionLabel, Tag)

**Fonts:** Three font families loaded in root layout (`src/app/layout.tsx`):
- Instrument Serif (display) — Google Fonts
- Caveat (handwriting) — Google Fonts
- Tomato Grotesk (body) — local .otf files from `public/fonts/`

Applied via CSS variables: `--font-display`, `--font-hand`, `--font-body`.

## Design Tokens (in globals.css)
- Background: `#ffffff`
- Foreground: `#1a1a18`
- Accent: `#1a1a18` (same as foreground)
- Accent-hover: `#333331`
- Muted: `#8a8a85`
- Border: `#e5e5e5`
- Surface: `#f5f5f5`
- Surface-elevated: `#fafafa`

## Styling Conventions
- All theme tokens are CSS variables defined in `globals.css` under `@theme inline` — Tailwind classes reference them (e.g., `text-foreground`, `bg-surface`).
- Decorative: dotted grid background + SVG fractal noise grain overlay.
- Consistent easing: `[0.22, 1, 0.36, 1]` cubic-bezier used across Framer Motion animations.
- `ScrollReveal` wrapper for fade-in-on-scroll with `useInView`.

## Path Alias
`@/*` maps to `./src/*` (configured in tsconfig.json).

## Images
All images in `public/images/projects/`. Use `next/image` with `fill` + `sizes` for responsive images. Set `priority` on above-fold hero images.
