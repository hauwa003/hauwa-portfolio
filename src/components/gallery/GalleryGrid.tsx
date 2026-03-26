"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { galleryItems, type GalleryItem } from "@/lib/gallery";

const ease = [0.22, 1, 0.36, 1] as const;

function GalleryTile({ tile, index, hydrated }: { tile: GalleryItem; index: number; hydrated: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(smoothY, [0, 1], [3, -3]);
  const rotateY = useTransform(smoothX, [0, 1], [-3, 3]);

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const isTilt = tile.hoverEffect === "tilt";
  const isLift = tile.hoverEffect === "lift";
  const isReveal = tile.hoverEffect === "reveal";

  const Wrapper = hydrated ? motion.div : "div";
  const wrapperProps = hydrated
    ? {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-5%" },
        transition: {
          duration: 0.7,
          delay: (index % 3) * 0.06,
          ease,
        },
      }
    : {};

  return (
    <Wrapper
      className="w-full"
      {...wrapperProps}
    >
      <motion.div
        ref={ref}
        className="group relative overflow-hidden"
        style={{
          perspective: 800,
          ...(isTilt ? { rotateX, rotateY } : {}),
        }}
        whileHover={isLift ? { y: -6, scale: 1.015 } : undefined}
        transition={{ duration: 0.4, ease }}
        onMouseMove={isTilt ? handleMouse : undefined}
        onMouseLeave={isTilt ? handleLeave : undefined}
      >
        <Image
          src={tile.src}
          alt={tile.alt}
          width={tile.width}
          height={tile.height}
          className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, calc(100vw - 360px)"
        />

        {isReveal ? (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 translate-y-full bg-foreground/85 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
            <div className="relative flex h-full flex-col items-center justify-center opacity-0 transition-opacity delay-150 duration-300 group-hover:opacity-100">
              <span className="text-lg font-medium text-white">
                {tile.project}
              </span>
              <span className="mt-1 text-[12px] uppercase tracking-[0.15em] text-white/60">
                View project
              </span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="text-[13px] font-medium tracking-wide text-white">
              {tile.project}
            </span>
          </div>
        )}

        {tile.hoverEffect === "zoom" && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        )}
      </motion.div>
    </Wrapper>
  );
}

/* ── Sidebar (desktop only) ── */
function GallerySidebar({ hydrated }: { hydrated: boolean }) {
  const sidebarContent = (
    <>
      {/* Gallery metadata */}
      <div className="space-y-8">
        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Section
          </p>
          <p className="mt-1.5 text-[15px] font-medium">UI Gallery</p>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            About
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed">
            A curated collection of screens, interfaces, and design details
            from various projects.
          </p>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Total Pieces
          </p>
          <p className="mt-1.5 text-[15px]">{galleryItems.length}</p>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Categories
          </p>
          <p className="mt-1.5 text-[15px]">
            {[...new Set(galleryItems.map((g) => g.project))].join(", ")}
          </p>
        </div>
      </div>
    </>
  );

  const bottomNav = (
    <div className="flex items-center gap-3">
      <Link
        href="/"
        className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
      >
        Home
      </Link>
      <Link
        href="/work"
        className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
      >
        Work
      </Link>
      <Link
        href="/#contact"
        className="bg-foreground px-5 py-2.5 text-[13px] text-background transition-colors hover:bg-accent-hover"
      >
        Book a call
      </Link>
    </div>
  );

  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-[360px] lg:flex-col lg:border-r lg:border-border lg:bg-background lg:z-40">
      {hydrated ? (
      <motion.div
        className="flex flex-1 flex-col px-8 pt-8 pb-8 overflow-y-auto"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
      >
        {sidebarContent}
      </motion.div>
      ) : (
      <div className="flex flex-1 flex-col px-8 pt-8 pb-8 overflow-y-auto">
        {sidebarContent}
      </div>
      )}

      {/* Bottom nav links */}
      {hydrated ? (
      <motion.div
        className="shrink-0 border-t border-border px-8 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {bottomNav}
      </motion.div>
      ) : (
      <div className="shrink-0 border-t border-border px-8 py-6">
        {bottomNav}
      </div>
      )}
    </aside>
  );
}

/* ── Mobile header ── */
function GalleryMobileHeader({ hydrated }: { hydrated: boolean }) {
  const content = (
    <div className="space-y-4">
      <div>
        <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
          Section
        </p>
        <p className="mt-1 text-[15px] font-medium">UI Gallery</p>
      </div>
      <div>
        <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
          About
        </p>
        <p className="mt-1 text-[15px] leading-relaxed">
          A curated collection of screens, interfaces, and design details
          from various projects.
        </p>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      {hydrated ? (
      <motion.div
        className="border-b border-border px-6 py-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease }}
      >
        {content}
      </motion.div>
      ) : (
      <div className="border-b border-border px-6 py-6">
        {content}
      </div>
      )}
    </div>
  );
}

/* ── Main export ── */
export function GalleryGrid() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <>
      <GallerySidebar hydrated={hydrated} />
      <GalleryMobileHeader hydrated={hydrated} />

      {/* Main content — offset on desktop for fixed sidebar */}
      <div className="lg:ml-[360px]">
        <div className="px-6 py-10 lg:px-10 lg:py-12">
          <div className="space-y-5">
            {galleryItems.map((tile, i) => (
              <GalleryTile key={tile.src} tile={tile} index={i} hydrated={hydrated} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
