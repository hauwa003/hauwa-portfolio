"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { galleryItems, type GalleryItem } from "@/lib/gallery";

function GalleryTile({ tile, index }: { tile: GalleryItem; index: number }) {
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

  return (
    <motion.div
      className="mb-5 break-inside-avoid"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        ref={ref}
        className="group relative overflow-hidden"
        style={{
          perspective: 800,
          ...(isTilt ? { rotateX, rotateY } : {}),
        }}
        whileHover={isLift ? { y: -6, scale: 1.015 } : undefined}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={isTilt ? handleMouse : undefined}
        onMouseLeave={isTilt ? handleLeave : undefined}
      >
        <Image
          src={tile.src}
          alt={tile.alt}
          width={tile.width}
          height={tile.height}
          className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
    </motion.div>
  );
}

export function GalleryGrid() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted">
            UI Gallery
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Visual explorations
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
            A curated collection of screens, interfaces, and design details from
            various projects.
          </p>
        </motion.div>
        <div className="mt-6 h-px bg-border" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="columns-2 gap-5 md:columns-3 lg:columns-4">
          {galleryItems.map((tile, i) => (
            <GalleryTile key={tile.src} tile={tile} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
