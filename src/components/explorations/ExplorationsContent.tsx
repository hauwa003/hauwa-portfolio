"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface Exploration {
  title: string;
  tagline: string;
  category: string;
  video: string;
  href: string;
  external?: boolean;
}

const explorations: Exploration[] = [
  {
    title: "Scented",
    tagline: "A fragrance discovery app — swipe through scent profiles matched to your mood and style",
    category: "Mobile App",
    video: "/videos/explorations/scented.mp4",
    href: "#",
  },
  {
    title: "FridgeChef",
    tagline: "Snap your fridge, get recipes — an AI-powered cooking companion for what you already have",
    category: "Mobile App",
    video: "/videos/explorations/fridgechef.mp4",
    href: "#",
  },
  {
    title: "Memory Bird",
    tagline: "A spaced-repetition app that makes remembering feel effortless and delightful",
    category: "Mobile App",
    video: "/videos/explorations/memory-bird.mp4",
    href: "#",
  },
  {
    title: "Scrapcut",
    tagline: "Turn long videos into short, shareable clips — powered by AI scene detection",
    category: "Web App",
    video: "/videos/explorations/scrapcut.mp4",
    href: "#",
  },
  {
    title: "PixelPin",
    tagline: "Pin design feedback directly on live websites — a QA tool for design-obsessed teams",
    category: "Chrome Extension",
    video: "/videos/explorations/pixelpin.mp4",
    href: "#",
  },
  {
    title: "VibeFlick",
    tagline: "Pick a mood, get a movie — mood-based recommendations for when you can't decide what to watch",
    category: "Chrome Extension",
    video: "/videos/explorations/vibeflick.mp4",
    href: "#",
  },
];

function explorationId(index: number) {
  return `exploration-${index}`;
}

/* ── Exploration Card ── */
function ExplorationCard({
  item,
  index,
  hydrated,
}: {
  item: Exploration;
  index: number;
  hydrated: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  const card = (
    <div id={explorationId(index)}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-surface">
        <video
          src={item.video}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] tabular-nums text-muted">{number}</span>
            <span className="h-px w-4 bg-border" />
            <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
          </div>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
            {item.tagline}
          </p>
        </div>
        <span className="mt-0.5 shrink-0 border border-border px-3 py-1 text-xs text-muted">
          {item.category}
        </span>
      </div>
    </div>
  );

  if (!hydrated) {
    return <div>{card}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        ease,
      }}
    >
      {card}
    </motion.div>
  );
}

/* ── Sidebar ── */
function ExplorationsSidebar({
  hydrated,
  activeId,
}: {
  hydrated: boolean;
  activeId: string;
}) {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const sidebarContent = (
    <div className="space-y-8">
      <div>
        <p className="font-display text-lg tracking-tight">Explorations</p>
        <p className="mt-1 text-[13px] text-muted">
          Side projects & experiments
        </p>
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
          About
        </p>
        <p className="mt-1.5 text-[15px] leading-relaxed">
          Personal projects where I explore new ideas, learn by building, and
          design without constraints.
        </p>
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
          Projects
        </p>
        <ul className="mt-4 space-y-1">
          {explorations.map((item, i) => {
            const id = explorationId(i);
            const isActive = activeId === id;
            return (
              <li key={item.title}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[14px] transition-colors duration-200 ${
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <span className="text-[12px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
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
        href="/gallery"
        className="border border-border px-5 py-2.5 text-[13px] transition-colors hover:bg-surface"
      >
        Gallery
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
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:z-40 lg:flex lg:h-screen lg:w-[360px] lg:flex-col lg:border-r lg:border-border lg:bg-background">
      {hydrated ? (
        <motion.div
          className="flex flex-1 flex-col overflow-y-auto px-8 pb-8 pt-8"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
        >
          {sidebarContent}
        </motion.div>
      ) : (
        <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-8 pt-8">
          {sidebarContent}
        </div>
      )}

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

/* ── Mobile Header ── */
function ExplorationsMobileHeader({ hydrated }: { hydrated: boolean }) {
  const content = (
    <div className="space-y-4">
      <div>
        <p className="font-display text-lg tracking-tight">Explorations</p>
        <p className="mt-1 text-[13px] text-muted">
          Side projects & experiments
        </p>
      </div>
      <p className="text-[15px] leading-relaxed">
        Personal projects where I explore new ideas, learn by building, and
        design without constraints.
      </p>
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
        <div className="border-b border-border px-6 py-6">{content}</div>
      )}
    </div>
  );
}

/* ── Main Export ── */
export function ExplorationsContent() {
  const [hydrated, setHydrated] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => setHydrated(true), []);

  // Track which exploration is in view
  useEffect(() => {
    const timeout = setTimeout(() => {
      const ids = explorations.map((_, i) => explorationId(i));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-10% 0px -70% 0px" }
      );

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <ExplorationsSidebar hydrated={hydrated} activeId={activeId} />
      <ExplorationsMobileHeader hydrated={hydrated} />

      <div className="lg:ml-[360px]">
        <div className="px-6 py-10 lg:px-10 lg:py-12">
          <div className="grid gap-y-16">
            {explorations.map((item, i) => (
              <ExplorationCard
                key={item.title}
                item={item}
                index={i}
                hydrated={hydrated}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
