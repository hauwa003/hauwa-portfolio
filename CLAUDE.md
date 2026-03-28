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
- `@anthropic-ai/sdk` — Claude API for AI chat assistant
- Deployed on Vercel at hauwa.design

## Architecture

**Routing:** Pages are statically generated except `/api/chat` (dynamic). Case study pages use `generateStaticParams()` from the projects array.

**Data layer:** All project data lives in `src/lib/projects.ts` as a static array of `Project` objects. Gallery data in `src/lib/gallery.ts`. Tag colors in `src/lib/tag-colors.ts`. Types in `src/types/index.ts`. To add a new project, add an entry to the projects array — the case study page, sitemap, and nav are all derived from it.

**Layout:** `LayoutShell` (client component) conditionally hides navbar/footer on pages that use sidebar navigation. Pages with sidebars: `/work`, `/work/[slug]`, `/explorations`, `/gallery`, `/about`, `/process`. These pages have their own sidebar + mobile header components instead.

**Sidebar pattern:** Desktop sidebars are fixed-positioned at 360px width with purple background (`bg-[#5B21B6]`). Main content offsets with `lg:ml-[360px]`. Each sidebar page has three components: `*Sidebar.tsx` (desktop), `*MobileHeader.tsx` (mobile), `*Content.tsx` (main content).

**Components:** Organized under `src/components/` by concern:
- `layout/` — LayoutShell, Navbar, Footer, CustomCursor, TransitionLink, ExitPostcard, page transitions
- `chat/` — ChatBubble (floating AI assistant, uses Claude API via `/api/chat`)
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
- Testimonial deep purples: `#4C1D95`, `#3B0764`, `#2E1065`, `#1E1B4B`

## Key Patterns

**Hydration guard:** Most animated components use a `hydrated` state + `wasInView` ref to prevent Framer Motion from flashing `opacity: 0` during SSR. Pattern: render plain HTML during SSR, swap to `motion.*` after `useEffect(() => setHydrated(true), [])`. If the element was already in view on mount, skip the entrance animation (`initial: false`).

**Consistent easing:** `[0.22, 1, 0.36, 1]` cubic-bezier used across all Framer Motion animations.

**ScrollReveal:** `useInView`-based fade-in wrapper component used throughout for scroll-triggered entrances.

**Testimonial sweep:** Canvas-based top-to-bottom color sweep transition using `globalCompositeOperation: "destination-out"` with a gradient blend zone. Auto-rotates every 6 seconds.

**Custom cursor:** Hides system cursor on hover devices via `@media (hover: hover) { * { cursor: none !important; } }`. Custom cursor rendered by `CustomCursor` component.

**Page transitions:** `TransitionLink` (drop-in replacement for `next/link`) intercepts navigation, plays a wipe exit animation (dark + accent curtains slide down), then navigates. `TransitionProvider` in LayoutShell provides the transition context. `WipeTransition` handles entrance animations on sidebar pages.

**AI Chat:** Floating chat bubble (`ChatBubble.tsx`) in bottom-right corner, available on all pages. Streams responses from Claude via `/api/chat` route. System prompt built from project data in `src/lib/chat-context.ts`. Requires `ANTHROPIC_API_KEY` in `.env.local`.

**Exit postcard:** `ExitPostcard.tsx` shows a postcard-style popover on exit intent (mouse leaves viewport top on desktop, scroll-up + inactivity on mobile). Shows once per session. Fetches visitor location via ipapi.co. "Keep this" button downloads a canvas-rendered postcard PNG.

## Path Alias
`@/*` maps to `./src/*` (configured in tsconfig.json).

## Environment Variables
- `ANTHROPIC_API_KEY` — Required for the AI chat assistant (in `.env.local`)

## Images
All images in `public/images/projects/`. Use `next/image` with `fill` + `sizes` for responsive images. Set `priority` on above-fold hero images.
