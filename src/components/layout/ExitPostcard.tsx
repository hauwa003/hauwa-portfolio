"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Location-based messages ── */
function getLocationNote(loc: string | null): { message: string[]; closing: string } {
  if (!loc) {
    return {
      message: [
        "wherever you are right now,",
        "I hope something here",
        "made you pause for a second.",
      ],
      closing: "that's what good design does.",
    };
  }

  const city = loc.split(",")[0].trim().toLowerCase();
  const country = loc.split(",")[1]?.trim().toLowerCase() || "";

  // Africa
  if (["lagos", "abuja", "accra", "nairobi", "cape town", "johannesburg", "kigali", "dar es salaam"].includes(city) ||
      ["nigeria", "ghana", "kenya", "south africa", "rwanda", "tanzania", "egypt", "ethiopia"].includes(country)) {
    return {
      message: [
        "from one creative in Africa",
        "to someone browsing in " + loc.split(",")[0] + " —",
        "this one's for you.",
      ],
      closing: "we're building something beautiful here.",
    };
  }

  // UK
  if (["london", "manchester", "birmingham", "edinburgh", "bristol", "leeds"].includes(city) || country === "united kingdom") {
    return {
      message: [
        "a little note landing in " + loc.split(",")[0] + ".",
        "hope the weather's being kind.",
        "this postcard? always sunny.",
      ],
      closing: "cheers for stopping by.",
    };
  }

  // USA / Canada
  if (["new york", "san francisco", "los angeles", "chicago", "austin", "seattle", "toronto", "vancouver"].includes(city) ||
      ["united states", "canada"].includes(country)) {
    return {
      message: [
        "hey " + loc.split(",")[0] + ",",
        "thanks for scrolling this far.",
        "most people don't — you're different.",
      ],
      closing: "that curiosity? it's a superpower.",
    };
  }

  // Europe
  if (["berlin", "paris", "amsterdam", "madrid", "barcelona", "lisbon", "rome", "milan", "stockholm", "copenhagen", "prague", "vienna", "warsaw", "dublin", "zurich", "munich", "hamburg"].includes(city) ||
      ["germany", "france", "netherlands", "spain", "italy", "portugal", "sweden", "denmark", "czech republic", "austria", "poland", "ireland", "switzerland"].includes(country)) {
    return {
      message: [
        "sending this from the internet",
        "to " + loc.split(",")[0] + " with care.",
        "some things are worth the detour.",
      ],
      closing: "like good coffee. and good design.",
    };
  }

  // Asia
  if (["tokyo", "singapore", "dubai", "mumbai", "bangalore", "delhi", "hong kong", "seoul", "shanghai", "beijing", "bangkok", "jakarta", "manila", "kuala lumpur", "taipei"].includes(city) ||
      ["japan", "singapore", "united arab emirates", "india", "china", "south korea", "thailand", "indonesia", "philippines", "malaysia", "taiwan"].includes(country)) {
    return {
      message: [
        "all the way to " + loc.split(",")[0] + " —",
        "this little note found you.",
        "must be meant to be.",
      ],
      closing: "good things travel far.",
    };
  }

  // South America
  if (["são paulo", "rio de janeiro", "buenos aires", "bogotá", "lima", "santiago", "medellín", "mexico city"].includes(city) ||
      ["brazil", "argentina", "colombia", "peru", "chile", "mexico"].includes(country)) {
    return {
      message: [
        "a postcard for " + loc.split(",")[0] + "?",
        "why not. design has no borders.",
        "neither does good taste.",
      ],
      closing: "glad you made it here.",
    };
  }

  // Australia / NZ
  if (["sydney", "melbourne", "brisbane", "perth", "auckland", "wellington"].includes(city) ||
      ["australia", "new zealand"].includes(country)) {
    return {
      message: [
        "this postcard crossed the whole internet",
        "to reach " + loc.split(",")[0] + ".",
        "that's commitment.",
      ],
      closing: "thanks for making it worth the trip.",
    };
  }

  // Fallback with location
  return {
    message: [
      "a little note for " + loc.split(",")[0] + " —",
      "thanks for spending some time here.",
      "it means more than you know.",
    ],
    closing: "good design remembers its visitors.",
  };
}

/* ── Stamp designs ── */
const stamps: { bg: string; border: string; icon: React.ReactNode; label: string }[] = [
  {
    bg: "from-violet-500 to-purple-700",
    border: "border-violet-300/40",
    label: "DESIGN",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    bg: "from-rose-400 to-pink-600",
    border: "border-rose-300/40",
    label: "WITH LOVE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    bg: "from-amber-400 to-orange-600",
    border: "border-amber-300/40",
    label: "AIRMAIL",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
  {
    bg: "from-emerald-400 to-teal-600",
    border: "border-emerald-300/40",
    label: "EXPLORE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    bg: "from-sky-400 to-blue-600",
    border: "border-sky-300/40",
    label: "NAVIGATE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="white" stroke="none" />
      </svg>
    ),
  },
];

/* ── Perforated edge dots ── */
function PerfEdge({ side }: { side: "left" | "right" | "top" | "bottom" }) {
  const count = side === "top" || side === "bottom" ? 7 : 9;
  const isVert = side === "left" || side === "right";
  const pos = {
    left: "-left-[3px] top-0 bottom-0 flex-col",
    right: "-right-[3px] top-0 bottom-0 flex-col",
    top: "-top-[3px] left-0 right-0 flex-row",
    bottom: "-bottom-[3px] left-0 right-0 flex-row",
  }[side];

  return (
    <div className={`absolute ${pos} flex justify-around`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`rounded-full bg-[#FFFDF9] ${isVert ? "h-1.5 w-1.5" : "h-1.5 w-1.5"}`} />
      ))}
    </div>
  );
}

export function ExitPostcard() {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const [stamp] = useState(() => stamps[Math.floor(Math.random() * stamps.length)]);
  const shownRef = useRef(false);
  const startTime = useRef(Date.now());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem("postcard-shown") === "1") {
        shownRef.current = true;
      }
    } catch { /* private browsing */ }
  }, []);

  /* ── 3D tilt on hover ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeaveCard = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setTimeout(() => setEngaged(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (data.city) setLocation(`${data.city}, ${data.country_name}`);
        else if (data.country_name) setLocation(data.country_name);
      })
      .catch(() => {});
  }, []);

  const trigger = useCallback(() => {
    if (shownRef.current) return;
    shownRef.current = true;
    try { sessionStorage.setItem("postcard-shown", "1"); } catch { /* private browsing */ }
    setShow(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Desktop: mouse exits toward top
  useEffect(() => {
    const h = (e: MouseEvent) => { if (e.clientY <= 5 && !shownRef.current) trigger(); };
    document.addEventListener("mouseleave", h);
    return () => document.removeEventListener("mouseleave", h);
  }, [trigger]);

  // Tab visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && !shownRef.current) {
        shownRef.current = true;
        try { sessionStorage.setItem("postcard-shown", "1"); } catch { /* private browsing */ }
        const handleReturn = () => {
          if (document.visibilityState === "visible") {
            setShow(true);
            document.body.style.overflow = "hidden";
            document.removeEventListener("visibilitychange", handleReturn);
          }
        };
        document.addEventListener("visibilitychange", handleReturn);
      }
    };
    const delay = setTimeout(() => document.addEventListener("visibilitychange", handleVisibility), 10000);
    return () => { clearTimeout(delay); document.removeEventListener("visibilitychange", handleVisibility); };
  }, [trigger]);

  // Inactivity — 90s
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const reset = () => { clearTimeout(t); if (!shownRef.current) t = setTimeout(trigger, 90000); };
    reset();
    const evts = ["mousemove", "scroll", "keydown", "touchstart", "click"];
    evts.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => { clearTimeout(t); evts.forEach((e) => window.removeEventListener(e, reset)); };
  }, [trigger]);

  // Mobile: scroll up
  useEffect(() => {
    let lastY = window.scrollY, ups = 0, t: ReturnType<typeof setTimeout>;
    const h = () => {
      const y = window.scrollY;
      if (y < lastY) ups++; else ups = 0;
      lastY = y;
      if (ups >= 3 && !shownRef.current) { clearTimeout(t); t = setTimeout(trigger, 2500); }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => { window.removeEventListener("scroll", h); clearTimeout(t); };
  }, [trigger]);

  const close = () => { setShow(false); document.body.style.overflow = ""; };

  const note = getLocationNote(location);
  const locationDisplay = location || "somewhere in the world";
  const today = new Date();

  const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
  const introLine = engaged || elapsed > 30
    ? "You stayed for a bit\u2026 so I made you this."
    : "Even if it was brief\u2026 I made you this.";

  const downloadPostcard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = 900, h = 520;
    canvas.width = w; canvas.height = h;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#F5F3FF"); grad.addColorStop(0.5, "#FBF8F3"); grad.addColorStop(1, "#FDF2F8");
    ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#E8E0D4"; ctx.lineWidth = 1.5; ctx.strokeRect(16, 16, w - 32, h - 32);

    const mid = Math.floor(w * 0.5);
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(mid, 32); ctx.lineTo(mid, h - 32);
    ctx.strokeStyle = "#D4C9B8"; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);

    ctx.font = "bold 18px sans-serif"; ctx.fillStyle = "#7C3AED";
    ctx.fillText("hauwa.design", 44, 64);

    // Left: location note
    ctx.font = "italic 20px Georgia, serif"; ctx.fillStyle = "#4A3F35";
    let ny = 120;
    note.message.forEach((line) => { ctx.fillText(line, 44, ny); ny += 32; });
    ctx.font = "italic 16px Georgia, serif"; ctx.fillStyle = "#7C6B5A";
    ctx.fillText(note.closing, 44, ny + 16);

    // Location badge
    ctx.fillStyle = "#7C3AED";
    ctx.beginPath(); ctx.roundRect(44, 300, mid - 100, 60, 12); ctx.fill();
    ctx.font = "bold 10px sans-serif"; ctx.fillStyle = "#FFFFFF";
    ctx.fillText("SENT FROM", 60, 322);
    ctx.font = "bold 14px sans-serif";
    ctx.fillText(locationDisplay, 60, 346);

    ctx.font = "12px sans-serif"; ctx.fillStyle = "#9B8F80";
    ctx.fillText(today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), 44, h - 50);

    // Right: signature
    const rX = mid + 40;
    ctx.font = "italic 22px Georgia, serif"; ctx.fillStyle = "#4A3F35";
    ctx.fillText("Good design isn't just", rX, 120);
    ctx.fillText("what you see.", rX, 156);
    ctx.fillText("It's what stays with you", rX, 220);
    ctx.fillText("after you leave.", rX, 256);
    ctx.font = "italic 20px Georgia, serif"; ctx.fillStyle = "#7C6B5A";
    ctx.fillText("— hauwa", rX + 20, 330);

    // Stamp
    const sx = w - 80, sy = 56;
    ctx.strokeStyle = "#7C3AED"; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(sx, sy, 28, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(sx, sy, 22, 0, Math.PI * 2); ctx.stroke();
    ctx.font = "bold 18px sans-serif"; ctx.fillStyle = "#7C3AED"; ctx.textAlign = "center";
    ctx.fillText("H", sx, sy + 6); ctx.textAlign = "left";

    const link = document.createElement("a");
    link.download = "hauwa-postcard.png"; link.href = canvas.toDataURL("image/png"); link.click();
  }, [location, locationDisplay, note, today]);

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <AnimatePresence>
        {show && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[80] bg-foreground/40 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={close}
            />

            <motion.div
              className="fixed inset-0 z-[85] flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* 3D tilt wrapper */}
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeaveCard}
                style={{ rotateX, rotateY, transformPerspective: 900 }}
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.6, ease }}
                className="relative w-full max-w-[580px]"
              >
                {/* Floating decorations */}
                <motion.span className="absolute -left-5 -top-5 text-xl text-accent/50" animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>✦</motion.span>
                <motion.span className="absolute -bottom-3 -right-3 text-base text-pink-400/40" animate={{ rotate: [0, -15, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>✧</motion.span>
                <motion.span className="absolute -right-6 top-1/2 text-xs text-accent/30" animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}>✦</motion.span>

                <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
                  {/* Close */}
                  <button
                    onClick={close}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-muted backdrop-blur-sm transition-all hover:bg-white hover:text-foreground hover:scale-110"
                    aria-label="Close"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>

                  {/* Colored accent strip at top */}
                  <div className="h-1.5 bg-gradient-to-r from-accent via-purple-500 to-pink-400" />

                  {/* Intro */}
                  <motion.div variants={fadeUp} initial="hidden" animate="show" className="px-6 py-5 sm:px-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">Before you go&hellip;</p>
                    <h2 className="mt-1.5 font-display text-xl tracking-[-0.02em] text-foreground sm:text-2xl">
                      I left something for you.
                    </h2>
                    <p className="mt-1 text-sm text-muted">{introLine}</p>
                  </motion.div>

                  {/* The postcard itself */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease }}
                    className="mx-5 mb-5 overflow-hidden rounded-xl border border-[#E8E0D4] shadow-sm sm:mx-7"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {/* LEFT — gradient side with location-specific note */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-[#F5F3FF] via-[#FBF8F3] to-[#FDF2F8] p-5 sm:p-6">
                        {/* Dot pattern */}
                        <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.12) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />

                        <div className="relative">
                          <div className="flex items-center gap-1.5">
                            <span className="font-display text-sm font-bold text-accent">hauwa</span>
                            <span className="text-sm text-accent/50">.design</span>
                          </div>

                          {/* Location-specific handwritten note */}
                          <div className="mt-4 space-y-0.5">
                            {note.message.map((line, i) => (
                              <motion.p
                                key={i}
                                className="font-handwriting text-lg leading-snug text-[#4A3F35] sm:text-xl"
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease }}
                              >
                                {line}
                              </motion.p>
                            ))}
                          </div>

                          <motion.p
                            className="mt-3 font-handwriting text-base text-accent/70 italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.4 }}
                          >
                            {note.closing}
                          </motion.p>

                          {/* Location badge */}
                          <motion.div
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2.5 text-white shadow-lg shadow-accent/20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.4, ease }}
                            whileHover={{ scale: 1.03 }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                            </svg>
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/60">Sent from</p>
                              <p className="text-xs font-semibold leading-tight">{locationDisplay}</p>
                            </div>
                          </motion.div>

                          {/* Date */}
                          <div className="mt-2.5 flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-accent/10 font-display text-xs font-bold text-accent">
                              {today.getDate()}
                            </div>
                            <span className="text-[11px] text-[#9B8F80]">
                              {today.toLocaleDateString("en-US", { weekday: "short", month: "short", year: "numeric" })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT — message side with stamp */}
                      <div className="relative border-t border-dashed border-[#D4C9B8] bg-[#FFFDF9] p-5 sm:border-l sm:border-t-0 sm:p-6">
                        {/* Postage stamp */}
                        <motion.div
                          className="absolute right-3 top-3"
                          initial={{ opacity: 0, rotate: 15, scale: 0.4 }}
                          animate={{ opacity: 1, rotate: 4, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
                        >
                          <div className={`relative flex h-[68px] w-[56px] flex-col items-center justify-center rounded-sm bg-gradient-to-br ${stamp.bg} shadow-md`}>
                            <PerfEdge side="left" />
                            <PerfEdge side="right" />
                            <PerfEdge side="top" />
                            <PerfEdge side="bottom" />
                            <div className={`absolute inset-1.5 rounded-[1px] border ${stamp.border}`} />
                            {stamp.icon}
                            <span className="mt-0.5 text-[6px] font-bold uppercase tracking-wider text-white/80">{stamp.label}</span>
                          </div>
                        </motion.div>

                        {/* Handwritten quote on lines */}
                        <div className="mt-1 pr-16 sm:pr-14">
                          {[
                            { text: "Good design isn\u2019t just", delay: 0.35 },
                            { text: "what you see.", delay: 0.45 },
                            { text: "", delay: 0 },
                            { text: "It\u2019s what stays with you", delay: 0.55 },
                            { text: "after you leave.", delay: 0.65 },
                          ].map((line, i) => (
                            <motion.div
                              key={i}
                              className="border-b border-[#E8E0D4]/60 py-[9px]"
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.35, delay: line.delay, ease }}
                            >
                              {line.text && (
                                <p className="font-handwriting text-lg leading-none text-[#4A3F35] sm:text-xl">
                                  {line.text}
                                </p>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        {/* Signature */}
                        <motion.div
                          className="mt-3 flex items-end gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <div>
                            <p className="font-handwriting text-lg text-[#7C6B5A]">— hauwa</p>
                            <svg width="70" height="6" viewBox="0 0 70 6" fill="none" className="mt-0.5">
                              <path d="M1 5C18 1 35 1 69 5" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
                            </svg>
                          </div>
                          <span className="mb-0.5 text-[10px] text-accent/30">✦</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between border-t border-border/40 px-6 py-3.5 sm:px-8"
                  >
                    <button onClick={close} className="text-sm text-muted transition-colors hover:text-foreground">
                      &larr; Back to site
                    </button>
                    <motion.button
                      onClick={downloadPostcard}
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      Keep this
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
