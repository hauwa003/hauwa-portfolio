@AGENTS.md

# hauwa.design — Portfolio v2.0

## Stack
- Next.js 14+ (App Router) with TypeScript
- Tailwind CSS v4 (CSS-based config via `@theme inline` in globals.css)
- Framer Motion for animations
- Deployed on Vercel at hauwa.design

## Key Architecture
- All project data in `src/lib/projects.ts` (static, no CMS)
- Types in `src/types/index.ts`
- Components organized: `layout/`, `sections/`, `work/`, `ui/`
- Fonts: Playfair Display (display) + Inter (body) via next/font/google
- CSS variables for theming in `src/app/globals.css`

## Design Tokens
- Background: #fafaf8 (warm off-white)
- Foreground: #111110 (near-black)
- Accent: #d4622a (warm orange)
- Muted: #737370 (secondary text)
- Border: #e5e5e3

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
