"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { motion } from "framer-motion";

import { getTagColor } from "@/lib/tag-colors";

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
    tagline: "A fragrance discovery app. Swipe through scent profiles matched to your mood and style",
    category: "Mobile App",
    video: "/videos/explorations/scented.mp4",
    href: "#",
  },
  {
    title: "FridgeChef",
    tagline: "Snap your fridge, get recipes. An AI-powered cooking companion for what you already have",
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
    tagline: "Turn long videos into short, shareable clips. Powered by AI scene detection",
    category: "Web App",
    video: "/videos/explorations/scrapcut.mp4",
    href: "#",
  },
  {
    title: "PixelPin",
    tagline: "Pin design feedback directly on live websites. A QA tool for design-obsessed teams",
    category: "Chrome Extension",
    video: "/videos/explorations/pixelpin.mp4",
    href: "#",
  },
  {
    title: "VibeFlick",
    tagline: "Pick a mood, get a movie. Mood-based recommendations for when you can't decide what to watch",
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
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface">
        <video
          src={item.video}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-3">
          <span className="text-sm tabular-nums text-muted">{number}</span>
          <span className="h-px w-4 bg-border" />
          <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
          <span className={`shrink-0 rounded-full border px-3 py-1 text-xs ${getTagColor(item.category)}`}>
            {item.category}
          </span>
        </div>
        <p className="mt-1.5 text-base leading-relaxed text-muted">
          {item.tagline}
        </p>
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
    <nav>
      <ul className="space-y-1">
          {explorations.map((item, i) => {
            const id = explorationId(i);
            const isActive = activeId === id;
            return (
              <li key={item.title}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`flex w-full items-center gap-3 py-2 text-left font-display text-base transition-all duration-300 ${
                    isActive
                      ? "font-medium text-white translate-x-3"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className={`h-px shrink-0 transition-all duration-300 ${
                    isActive ? "w-5 bg-white" : "w-2 bg-white/40"
                  }`} />
                  <span className="text-sm tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </button>
              </li>
            );
          })}
        </ul>
    </nav>
  );

  const bottomNav = (
    <div className="flex items-center gap-2">
      <TransitionLink
        href="/"
        className="rounded-full border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:bg-white/10"
      >
        Home
      </TransitionLink>
      <TransitionLink
        href="/gallery"
        className="rounded-full border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:bg-white/10"
      >
        Gallery
      </TransitionLink>
      <TransitionLink
        href="/#contact"
        className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#5B21B6] transition-colors hover:bg-white/90"
      >
        Book a call
      </TransitionLink>
    </div>
  );

  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:z-40 lg:flex lg:h-screen lg:w-[360px] lg:flex-col lg:border-r lg:border-white/10 lg:bg-[#5B21B6]">
      {hydrated ? (
        <motion.div
          className="flex flex-1 flex-col justify-center overflow-y-auto px-8 pb-8 pt-8"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
        >
          {sidebarContent}
        </motion.div>
      ) : (
        <div className="flex flex-1 flex-col justify-center overflow-y-auto px-8 pb-8 pt-8">
          {sidebarContent}
        </div>
      )}

      {hydrated ? (
        <motion.div
          className="shrink-0 border-t border-white/10 px-8 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {bottomNav}
        </motion.div>
      ) : (
        <div className="shrink-0 border-t border-white/10 px-8 py-6">
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
        <p className="font-display text-lg tracking-[-0.04em]">Explorations</p>
        <p className="mt-1 text-sm text-muted">
          Side projects & experiments
        </p>
      </div>
      <p className="text-base leading-relaxed">
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
          <div className="mb-12 flex items-center justify-between border-b border-border pb-6">
            <h1 className="font-display text-2xl tracking-[-0.04em]">Side projects & experiments</h1>
            <span className="text-sm text-muted">Explorations</span>
          </div>
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
