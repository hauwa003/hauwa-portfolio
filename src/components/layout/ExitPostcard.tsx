"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Location greeting in local language ── */
function getLocationLine(loc: string | null): string {
  if (!loc) return "sent with love from the internet —";
  const city = loc.split(",")[0]?.trim() || "";
  const country = loc.split(",")[1]?.trim().toLowerCase() || "";
  const c = city.toLowerCase();

  if (["lagos", "abuja", "kano", "ibadan", "port harcourt"].includes(c) || country === "nigeria")
    return `hello from ${city}! —`;
  if (c === "accra" || country === "ghana") return `akwaaba, ${city}! —`;
  if (["nairobi", "mombasa", "dar es salaam"].includes(c) || ["kenya", "tanzania"].includes(country))
    return `karibu, ${city}! —`;
  if (["cape town", "johannesburg", "durban", "pretoria"].includes(c) || country === "south africa")
    return `sawubona, ${city}! —`;
  if (["rwanda", "ethiopia", "senegal", "cameroon", "egypt"].includes(country) || ["kigali", "addis ababa", "dakar"].includes(c))
    return `welcome, ${city}! —`;
  if (["paris", "lyon", "marseille", "nice"].includes(c) || country === "france")
    return `bienvenue, ${city}! —`;
  if (["madrid", "barcelona", "buenos aires", "bogotá", "lima", "santiago", "medellín", "mexico city"].includes(c) || ["spain", "argentina", "colombia", "peru", "chile", "mexico", "ecuador", "uruguay"].includes(country))
    return `bienvenido, ${city}! —`;
  if (["são paulo", "rio de janeiro", "lisbon", "porto"].includes(c) || ["brazil", "portugal"].includes(country))
    return `bem-vindo, ${city}! —`;
  if (["berlin", "munich", "hamburg", "vienna", "zurich"].includes(c) || ["germany", "austria"].includes(country))
    return `willkommen, ${city}! —`;
  if (c === "amsterdam" || country === "netherlands") return `welkom, ${city}! —`;
  if (["rome", "milan", "florence", "naples"].includes(c) || country === "italy")
    return `benvenuto, ${city}! —`;
  if (["stockholm", "copenhagen", "oslo"].includes(c) || ["sweden", "denmark", "norway"].includes(country))
    return `välkommen, ${city}! —`;
  if (["tokyo", "osaka", "kyoto"].includes(c) || country === "japan") return `ようこそ, ${city}! —`;
  if (c === "seoul" || country === "south korea") return `환영합니다, ${city}! —`;
  if (["shanghai", "beijing", "shenzhen"].includes(c) || country === "china") return `欢迎, ${city}! —`;
  if (["mumbai", "bangalore", "delhi", "hyderabad", "chennai"].includes(c) || country === "india")
    return `swaagatam, ${city}! —`;
  if (c === "dubai" || country === "united arab emirates") return `أهلاً وسهلاً, ${city}! —`;
  if (c === "bangkok" || country === "thailand") return `ยินดีต้อนรับ, ${city}! —`;
  if (c === "jakarta" || country === "indonesia") return `selamat datang, ${city}! —`;
  if (c === "manila" || country === "philippines") return `mabuhay, ${city}! —`;
  if (["australia", "new zealand", "united kingdom", "uk", "united states", "usa", "us", "canada", "ireland"].includes(country))
    return `hello from ${city}! —`;
  return `hello, ${city}! —`;
}

/* ── Landmark stamp — Ghibli-style ── */

type LandmarkData = {
  colors: [string, string, string];
  scene: React.ReactNode;
};

function getLandmark(loc: string | null): LandmarkData {
  if (!loc) return landmarks.default;
  const country = loc.split(",")[1]?.trim().toLowerCase() || "";
  const city = loc.split(",")[0]?.trim().toLowerCase() || "";

  if (country === "nigeria" || ["lagos", "abuja"].includes(city)) return landmarks.nigeria;
  if (country === "ghana" || country === "kenya" || country === "tanzania" || country === "south africa")
    return landmarks.africa;
  if (country === "japan" || ["tokyo", "osaka", "kyoto"].includes(city)) return landmarks.japan;
  if (country === "france" || city === "paris") return landmarks.france;
  if (["united states", "usa", "us"].includes(country) || ["new york", "san francisco", "los angeles"].includes(city))
    return landmarks.usa;
  if (["united kingdom", "uk"].includes(country) || city === "london") return landmarks.uk;
  if (country === "india" || ["mumbai", "delhi", "bangalore"].includes(city)) return landmarks.india;
  if (country === "brazil" || ["são paulo", "rio de janeiro"].includes(city)) return landmarks.brazil;
  if (country === "egypt" || city === "cairo") return landmarks.egypt;
  if (country === "china" || ["shanghai", "beijing"].includes(city)) return landmarks.china;
  if (country === "south korea" || city === "seoul") return landmarks.korea;
  if (country === "italy" || ["rome", "milan"].includes(city)) return landmarks.italy;
  if (["united arab emirates", "uae"].includes(country) || city === "dubai") return landmarks.dubai;
  if (country === "australia" || city === "sydney") return landmarks.australia;
  if (["germany", "austria"].includes(country) || ["berlin", "munich"].includes(city)) return landmarks.germany;
  if (["spain", "mexico", "argentina", "colombia"].includes(country)) return landmarks.spain;
  if (country === "turkey" || city === "istanbul") return landmarks.turkey;
  return landmarks.default;
}

const landmarks: Record<string, LandmarkData> = {
  // Nigeria — Abuja National Mosque dome, warm sunset
  nigeria: {
    colors: ["#F59E0B", "#E67E22", "#D35400"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        <circle cx="40" cy="18" r="10" fill="white" opacity="0.25" />
        <circle cx="60" cy="24" r="6" fill="white" opacity="0.15" />
        {/* Mosque dome */}
        <ellipse cx="40" cy="62" rx="28" ry="22" fill="white" opacity="0.9" />
        <rect x="12" y="62" width="56" height="30" fill="white" opacity="0.9" />
        {/* Minaret left */}
        <rect x="8" y="40" width="5" height="52" fill="white" opacity="0.85" />
        <circle cx="10.5" cy="39" r="3.5" fill="white" opacity="0.85" />
        {/* Minaret right */}
        <rect x="67" y="40" width="5" height="52" fill="white" opacity="0.85" />
        <circle cx="69.5" cy="39" r="3.5" fill="white" opacity="0.85" />
        {/* Crescent */}
        <path d="M38 42 Q40 36 42 42" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
      </svg>
    ),
  },
  // Africa — Acacia tree, golden savanna
  africa: {
    colors: ["#D97706", "#B45309", "#92400E"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        <circle cx="55" cy="16" r="8" fill="white" opacity="0.3" />
        {/* Acacia tree */}
        <rect x="37" y="50" width="6" height="42" fill="white" opacity="0.85" />
        <ellipse cx="40" cy="42" rx="26" ry="16" fill="white" opacity="0.85" />
        <ellipse cx="30" cy="48" rx="14" ry="10" fill="white" opacity="0.8" />
        <ellipse cx="52" cy="46" rx="16" ry="11" fill="white" opacity="0.8" />
        {/* Ground */}
        <rect x="0" y="90" width="80" height="10" fill="white" opacity="0.2" />
      </svg>
    ),
  },
  // Japan — Torii gate + Fuji, cherry blossom pinks
  japan: {
    colors: ["#FDA4AF", "#F472B6", "#DB2777"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Mt Fuji */}
        <path d="M5 92 L40 30 L75 92Z" fill="white" opacity="0.3" />
        <path d="M25 55 L40 30 L55 55Z" fill="white" opacity="0.2" />
        {/* Torii gate */}
        <rect x="18" y="50" width="5" height="42" fill="white" opacity="0.9" />
        <rect x="57" y="50" width="5" height="42" fill="white" opacity="0.9" />
        <rect x="12" y="48" width="56" height="5" rx="1" fill="white" opacity="0.9" />
        <rect x="16" y="58" width="48" height="3" fill="white" opacity="0.85" />
        {/* Cherry blossoms */}
        <circle cx="14" cy="20" r="2.5" fill="white" opacity="0.5" />
        <circle cx="66" cy="15" r="2" fill="white" opacity="0.4" />
        <circle cx="50" cy="22" r="1.5" fill="white" opacity="0.35" />
        <circle cx="30" cy="12" r="2" fill="white" opacity="0.45" />
      </svg>
    ),
  },
  // France — Eiffel Tower, twilight blue
  france: {
    colors: ["#818CF8", "#6366F1", "#4F46E5"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        <circle cx="60" cy="18" r="6" fill="white" opacity="0.2" />
        {/* Eiffel Tower */}
        <path d="M40 12 L26 92 L54 92Z" fill="white" opacity="0.85" />
        <rect x="30" y="55" width="20" height="4" rx="1" fill="white" opacity="0.9" />
        <rect x="28" y="72" width="24" height="4" rx="1" fill="white" opacity="0.9" />
        {/* Cutout */}
        <path d="M35 60 Q40 50 45 60Z" fill="currentColor" opacity="0.5" className="text-[#6366F1]" />
        {/* Stars */}
        <circle cx="18" cy="30" r="1" fill="white" opacity="0.5" />
        <circle cx="65" cy="40" r="1.2" fill="white" opacity="0.4" />
        <circle cx="22" cy="55" r="0.8" fill="white" opacity="0.35" />
      </svg>
    ),
  },
  // USA — Statue of Liberty, sunset
  usa: {
    colors: ["#F97316", "#EA580C", "#9333EA"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Statue silhouette */}
        <rect x="33" y="55" width="14" height="37" fill="white" opacity="0.85" />
        {/* Body */}
        <path d="M30 55 Q40 28 50 55Z" fill="white" opacity="0.85" />
        {/* Crown */}
        <path d="M33 30 L35 20 L37 28 L40 16 L43 28 L45 20 L47 30Z" fill="white" opacity="0.9" />
        {/* Torch arm */}
        <rect x="48" y="22" width="3" height="20" fill="white" opacity="0.85" transform="rotate(15 49 32)" />
        <ellipse cx="50" cy="18" rx="3" ry="5" fill="white" opacity="0.9" />
        {/* Base */}
        <rect x="25" y="88" width="30" height="6" fill="white" opacity="0.6" />
      </svg>
    ),
  },
  // UK — Big Ben, misty blue
  uk: {
    colors: ["#94A3B8", "#64748B", "#475569"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        <circle cx="58" cy="22" r="8" fill="white" opacity="0.15" />
        {/* Big Ben tower */}
        <rect x="32" y="20" width="16" height="72" fill="white" opacity="0.85" />
        {/* Spire */}
        <path d="M36 20 L40 6 L44 20Z" fill="white" opacity="0.9" />
        {/* Clock face */}
        <circle cx="40" cy="36" r="6" fill="white" opacity="0.2" />
        <circle cx="40" cy="36" r="5" fill="none" stroke="white" strokeWidth="1" opacity="0.9" />
        {/* Windows */}
        <rect x="36" y="50" width="8" height="5" rx="1" fill="white" opacity="0.3" />
        <rect x="36" y="60" width="8" height="5" rx="1" fill="white" opacity="0.3" />
        {/* Base */}
        <rect x="26" y="85" width="28" height="8" fill="white" opacity="0.6" />
      </svg>
    ),
  },
  // India — Taj Mahal, warm saffron
  india: {
    colors: ["#FBBF24", "#F59E0B", "#D97706"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Main dome */}
        <ellipse cx="40" cy="40" rx="16" ry="20" fill="white" opacity="0.9" />
        {/* Finial */}
        <circle cx="40" cy="18" r="2.5" fill="white" opacity="0.9" />
        <rect x="39" y="20" width="2" height="4" fill="white" opacity="0.85" />
        {/* Body */}
        <rect x="14" y="55" width="52" height="30" fill="white" opacity="0.85" />
        {/* Arch */}
        <path d="M32 85 Q40 65 48 85Z" fill="currentColor" opacity="0.4" className="text-[#F59E0B]" />
        {/* Minarets */}
        <rect x="8" y="35" width="4" height="50" fill="white" opacity="0.75" />
        <circle cx="10" cy="34" r="2.5" fill="white" opacity="0.75" />
        <rect x="68" y="35" width="4" height="50" fill="white" opacity="0.75" />
        <circle cx="70" cy="34" r="2.5" fill="white" opacity="0.75" />
        {/* Base */}
        <rect x="10" y="85" width="60" height="6" fill="white" opacity="0.5" />
      </svg>
    ),
  },
  // Brazil — Christ the Redeemer, tropical green
  brazil: {
    colors: ["#34D399", "#10B981", "#059669"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        <circle cx="58" cy="18" r="8" fill="white" opacity="0.2" />
        {/* Mountain */}
        <path d="M0 92 L40 40 L80 92Z" fill="white" opacity="0.25" />
        {/* Christ statue */}
        <circle cx="40" cy="32" r="4" fill="white" opacity="0.9" />
        <rect x="38" y="36" width="4" height="28" fill="white" opacity="0.9" />
        {/* Arms */}
        <rect x="16" y="38" width="48" height="4" rx="2" fill="white" opacity="0.9" />
        {/* Base */}
        <rect x="34" y="64" width="12" height="8" fill="white" opacity="0.7" />
      </svg>
    ),
  },
  // Egypt — Pyramids, golden
  egypt: {
    colors: ["#FCD34D", "#FBBF24", "#D97706"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        <circle cx="62" cy="20" r="9" fill="white" opacity="0.3" />
        {/* Pyramid large */}
        <path d="M10 88 L42 32 L74 88Z" fill="white" opacity="0.85" />
        {/* Pyramid small */}
        <path d="M0 88 L18 52 L36 88Z" fill="white" opacity="0.6" />
        {/* Sand dunes */}
        <ellipse cx="40" cy="92" rx="42" ry="6" fill="white" opacity="0.2" />
      </svg>
    ),
  },
  // China — Pagoda, soft red
  china: {
    colors: ["#FCA5A5", "#EF4444", "#DC2626"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Pagoda tiers */}
        <path d="M22 92 L28 78 L52 78 L58 92Z" fill="white" opacity="0.85" />
        <path d="M24 78 L30 65 L50 65 L56 78Z" fill="white" opacity="0.85" />
        <path d="M26 65 L32 52 L48 52 L54 65Z" fill="white" opacity="0.85" />
        <path d="M28 52 L34 40 L46 40 L52 52Z" fill="white" opacity="0.85" />
        <path d="M32 40 L36 30 L44 30 L48 40Z" fill="white" opacity="0.85" />
        {/* Spire */}
        <rect x="39" y="18" width="2" height="12" fill="white" opacity="0.9" />
        <circle cx="40" cy="16" r="2" fill="white" opacity="0.9" />
        {/* Clouds */}
        <circle cx="14" cy="28" r="4" fill="white" opacity="0.2" />
        <circle cx="66" cy="22" r="3" fill="white" opacity="0.15" />
      </svg>
    ),
  },
  // Korea — Temple gate, autumn
  korea: {
    colors: ["#FB923C", "#F97316", "#EA580C"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Temple roof */}
        <path d="M6 52 L40 28 L74 52Z" fill="white" opacity="0.85" />
        <path d="M10 54 L40 35 L70 54Z" fill="white" opacity="0.3" />
        {/* Pillars */}
        <rect x="18" y="52" width="5" height="34" fill="white" opacity="0.85" />
        <rect x="57" y="52" width="5" height="34" fill="white" opacity="0.85" />
        {/* Base */}
        <rect x="12" y="84" width="56" height="6" fill="white" opacity="0.6" />
        {/* Leaves */}
        <circle cx="10" cy="20" r="2" fill="white" opacity="0.35" />
        <circle cx="70" cy="18" r="1.5" fill="white" opacity="0.3" />
        <circle cx="65" cy="38" r="2" fill="white" opacity="0.25" />
      </svg>
    ),
  },
  // Italy — Colosseum, warm terracotta
  italy: {
    colors: ["#FDBA74", "#F97316", "#C2410C"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Colosseum arches */}
        <ellipse cx="40" cy="60" rx="34" ry="28" fill="white" opacity="0.85" />
        <ellipse cx="40" cy="60" rx="26" ry="20" fill="currentColor" opacity="0.4" className="text-[#F97316]" />
        {/* Top arches row */}
        <path d="M14 48 Q18 40 22 48" fill="none" stroke="white" strokeWidth="2" opacity="0.9" />
        <path d="M24 46 Q28 38 32 46" fill="none" stroke="white" strokeWidth="2" opacity="0.9" />
        <path d="M34 44 Q38 36 42 44" fill="none" stroke="white" strokeWidth="2" opacity="0.9" />
        <path d="M44 44 Q48 36 52 44" fill="none" stroke="white" strokeWidth="2" opacity="0.9" />
        <path d="M54 46 Q58 38 62 46" fill="none" stroke="white" strokeWidth="2" opacity="0.9" />
        {/* Ground */}
        <rect x="4" y="86" width="72" height="6" fill="white" opacity="0.3" />
      </svg>
    ),
  },
  // Dubai — Burj Khalifa, sand/gold
  dubai: {
    colors: ["#FDE68A", "#FBBF24", "#B45309"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        <circle cx="60" cy="18" r="8" fill="white" opacity="0.3" />
        {/* Burj Khalifa */}
        <path d="M38 8 L36 92 L44 92 L42 8Z" fill="white" opacity="0.9" />
        <path d="M32 40 L36 30 L36 92 L32 92Z" fill="white" opacity="0.7" />
        <path d="M48 40 L44 30 L44 92 L48 92Z" fill="white" opacity="0.7" />
        {/* Smaller buildings */}
        <rect x="16" y="60" width="10" height="32" fill="white" opacity="0.4" />
        <rect x="55" y="55" width="12" height="37" fill="white" opacity="0.35" />
        <rect x="70" y="65" width="8" height="27" fill="white" opacity="0.3" />
      </svg>
    ),
  },
  // Australia — Opera House, ocean blue
  australia: {
    colors: ["#7DD3FC", "#38BDF8", "#0284C7"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        <circle cx="60" cy="20" r="8" fill="white" opacity="0.2" />
        {/* Opera House shells */}
        <path d="M15 75 Q22 35 30 75Z" fill="white" opacity="0.9" />
        <path d="M25 75 Q35 30 45 75Z" fill="white" opacity="0.9" />
        <path d="M38 75 Q46 38 54 75Z" fill="white" opacity="0.85" />
        <path d="M48 75 Q53 48 58 75Z" fill="white" opacity="0.8" />
        {/* Base */}
        <rect x="10" y="75" width="55" height="8" fill="white" opacity="0.7" />
        {/* Water */}
        <path d="M0 88 Q20 84 40 88 Q60 92 80 88 L80 100 L0 100Z" fill="white" opacity="0.15" />
      </svg>
    ),
  },
  // Germany — Brandenburg Gate, stone grey
  germany: {
    colors: ["#A1A1AA", "#71717A", "#52525B"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Columns */}
        {[16, 26, 36, 46, 56].map((x) => (
          <rect key={x} x={x} y="38" width="5" height="48" fill="white" opacity="0.85" />
        ))}
        {/* Top beam */}
        <rect x="12" y="32" width="56" height="8" fill="white" opacity="0.9" />
        {/* Pediment */}
        <path d="M14 32 L40 16 L66 32Z" fill="white" opacity="0.85" />
        {/* Quadriga (simplified) */}
        <rect x="36" y="10" width="8" height="6" fill="white" opacity="0.7" />
        {/* Base */}
        <rect x="12" y="84" width="56" height="6" fill="white" opacity="0.5" />
      </svg>
    ),
  },
  // Spain / Latin America — Sagrada Familia style
  spain: {
    colors: ["#FB923C", "#E11D48", "#BE123C"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Spires */}
        <rect x="18" y="22" width="5" height="68" fill="white" opacity="0.85" />
        <path d="M16 22 L20.5 8 L25 22Z" fill="white" opacity="0.85" />
        <rect x="35" y="28" width="5" height="62" fill="white" opacity="0.8" />
        <path d="M33 28 L37.5 14 L42 28Z" fill="white" opacity="0.8" />
        <rect x="52" y="18" width="5" height="72" fill="white" opacity="0.85" />
        <path d="M50 18 L54.5 4 L59 18Z" fill="white" opacity="0.85" />
        {/* Body */}
        <rect x="14" y="50" width="52" height="40" fill="white" opacity="0.6" />
        {/* Arch */}
        <path d="M28 90 Q40 70 52 90Z" fill="currentColor" opacity="0.4" className="text-[#E11D48]" />
      </svg>
    ),
  },
  // Turkey — Hagia Sophia, warm terracotta
  turkey: {
    colors: ["#FDBA74", "#E11D48", "#9F1239"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Main dome */}
        <ellipse cx="40" cy="42" rx="22" ry="18" fill="white" opacity="0.9" />
        {/* Body */}
        <rect x="14" y="50" width="52" height="36" fill="white" opacity="0.85" />
        {/* Finial */}
        <circle cx="40" cy="23" r="2" fill="white" opacity="0.9" />
        {/* Minarets */}
        <rect x="6" y="30" width="3.5" height="56" fill="white" opacity="0.8" />
        <circle cx="7.75" cy="28" r="2.5" fill="white" opacity="0.8" />
        <rect x="70" y="30" width="3.5" height="56" fill="white" opacity="0.8" />
        <circle cx="71.75" cy="28" r="2.5" fill="white" opacity="0.8" />
        {/* Base */}
        <rect x="4" y="86" width="72" height="6" fill="white" opacity="0.4" />
      </svg>
    ),
  },
  // Default — Globe with clouds
  default: {
    colors: ["#A78BFA", "#7C3AED", "#6D28D9"],
    scene: (
      <svg viewBox="0 0 80 100" className="h-full w-full">
        {/* Globe */}
        <circle cx="40" cy="50" r="26" fill="none" stroke="white" strokeWidth="2" opacity="0.85" />
        {/* Meridians */}
        <ellipse cx="40" cy="50" rx="12" ry="26" fill="none" stroke="white" strokeWidth="1.2" opacity="0.5" />
        <line x1="14" y1="50" x2="66" y2="50" stroke="white" strokeWidth="1.2" opacity="0.5" />
        <line x1="18" y1="36" x2="62" y2="36" stroke="white" strokeWidth="1" opacity="0.35" />
        <line x1="18" y1="64" x2="62" y2="64" stroke="white" strokeWidth="1" opacity="0.35" />
        {/* Clouds */}
        <ellipse cx="18" cy="22" rx="8" ry="4" fill="white" opacity="0.3" />
        <ellipse cx="62" cy="80" rx="10" ry="4" fill="white" opacity="0.25" />
        {/* Sparkle */}
        <circle cx="60" cy="18" r="1.5" fill="white" opacity="0.5" />
        <circle cx="22" cy="82" r="1" fill="white" opacity="0.4" />
      </svg>
    ),
  },
};

function LandmarkStamp({ location }: { location: string | null }) {
  const lm = getLandmark(location);
  return (
    <div className="relative h-[120px] w-[96px]">
      {/* Perforated border */}
      <div className="absolute inset-0 rounded-[3px] border-[2px] border-dashed border-foreground/[0.08]" />
      {/* Gradient inner */}
      <div
        className="absolute inset-[6px] overflow-hidden rounded-[2px]"
        style={{ background: `linear-gradient(135deg, ${lm.colors[0]}, ${lm.colors[1]}, ${lm.colors[2]})` }}
      >
        {/* Dreamy texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.1] via-transparent to-white/[0.12]" />
        {/* Landmark scene */}
        <div className="absolute inset-0">{lm.scene}</div>
      </div>
    </div>
  );
}

/* ── Postmark ── */
function Postmark({ date }: { date: string }) {
  return (
    <div className="relative">
      {/* Circular mark */}
      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1.5px] border-foreground/[0.08]">
        <div className="flex flex-col items-center">
          <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-foreground/20">HAUWA</span>
          <span className="text-[5px] uppercase tracking-[0.1em] text-foreground/15">DESIGN</span>
        </div>
      </div>
      {/* Cancellation lines */}
      <div className="absolute -right-5 top-1/2 flex -translate-y-1/2 flex-col gap-[2.5px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[0.8px] w-6 bg-foreground/[0.06]" />
        ))}
      </div>
      {/* Date below */}
      <p className="mt-1 text-center text-[7px] tracking-wider text-foreground/15">{date}</p>
    </div>
  );
}

export function ExitPostcard() {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const shownRef = useRef(false);
  const startTime = useRef(Date.now());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── 3D tilt ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], [4, -4]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-4, 4]);
  const sRotX = useSpring(rotX, { damping: 30, stiffness: 200 });
  const sRotY = useSpring(rotY, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetTilt = () => { mx.set(0); my.set(0); };

  /* ── Session check ── */
  useEffect(() => {
    try {
      if (sessionStorage.getItem("postcard-shown") === "1") shownRef.current = true;
    } catch { /* private browsing */ }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setEngaged(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  /* ── Geolocation ── */
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (data.city) setLocation(`${data.city}, ${data.country_name}`);
        else if (data.country_name) setLocation(data.country_name);
      })
      .catch(() => {});
  }, []);

  /* ── Trigger ── */
  const trigger = useCallback(() => {
    if (shownRef.current) return;
    shownRef.current = true;
    try { sessionStorage.setItem("postcard-shown", "1"); } catch { /* private browsing */ }
    setShow(true);
    document.body.style.overflow = "hidden";
  }, []);


  /* ── Exit intent: mouse leaves top ── */
  useEffect(() => {
    const h = (e: MouseEvent) => { if (e.clientY <= 5 && !shownRef.current) trigger(); };
    document.addEventListener("mouseleave", h);
    return () => document.removeEventListener("mouseleave", h);
  }, [trigger]);

  /* ── Tab switch ── */
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

  /* ── Inactivity ── */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const reset = () => { clearTimeout(t); if (!shownRef.current) t = setTimeout(trigger, 90000); };
    reset();
    const evts = ["mousemove", "scroll", "keydown", "touchstart", "click"];
    evts.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => { clearTimeout(t); evts.forEach((e) => window.removeEventListener(e, reset)); };
  }, [trigger]);

  /* ── Mobile scroll-up ── */
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

  /* ── Content ── */
  const locationLine = getLocationLine(location);
  const locationDisplay = location || "the internet";
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const dateShort = today.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
  const elapsed = Math.floor((Date.now() - startTime.current) / 1000);

  const lines = engaged || elapsed > 30
    ? [
        `${locationLine} thanks for spending time here — it really means a lot.`,
        "",
        "I hope something in my work sparked an idea, or at the very least, looked pretty enough to remember.",
        "",
        "take care of yourself.",
        "",
        "yours truly, hauwa",
      ]
    : [
        `${locationLine} thanks for stopping by my little corner of the internet.`,
        "",
        "I hope something here caught your eye, or made you think. that's all I could ask for.",
        "",
        "take care of yourself.",
        "",
        "yours truly, hauwa",
      ];

  /* ── Canvas download ── */
  const downloadPostcard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = 1040, h = 580, mid = Math.floor(w * 0.55);
    canvas.width = w; canvas.height = h;

    // Left — deep purple
    ctx.fillStyle = "#5B21B6";
    ctx.fillRect(0, 0, mid, h);

    // Dot grid on purple
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    for (let dy = 0; dy < h; dy += 18) {
      for (let dx = 0; dx < mid; dx += 18) {
        ctx.beginPath(); ctx.arc(dx, dy, 0.8, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Right — cream
    ctx.fillStyle = "#FAF8F5";
    ctx.fillRect(mid, 0, w - mid, h);

    // Dot grid on cream
    ctx.fillStyle = "rgba(124,58,237,0.04)";
    for (let dy = 0; dy < h; dy += 18) {
      for (let dx = mid; dx < w; dx += 18) {
        ctx.beginPath(); ctx.arc(dx, dy, 0.8, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Accent stripe top + bottom
    const sg1 = ctx.createLinearGradient(0, 0, w, 0);
    sg1.addColorStop(0, "#7C3AED"); sg1.addColorStop(0.5, "#A78BFA"); sg1.addColorStop(1, "#7C3AED");
    ctx.fillStyle = sg1;
    ctx.fillRect(0, 0, w, 3);
    ctx.fillRect(0, h - 3, w, 3);

    // "POST CARD" header
    ctx.font = "bold 9px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.letterSpacing = "3px";
    ctx.fillText("P O S T   C A R D", 40, 42);

    // Letter text — wrap long sentences
    ctx.font = "20px Georgia, serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    let ny = 80;
    const maxLineW = mid - 80;
    lines.forEach((line) => {
      if (!line) { ny += 14; return; }
      const words = line.split(" ");
      let cur = "";
      for (const word of words) {
        const test = cur ? `${cur} ${word}` : word;
        if (ctx.measureText(test).width > maxLineW && cur) {
          ctx.fillText(cur, 40, ny); ny += 28; cur = word;
        } else { cur = test; }
      }
      if (cur) { ctx.fillText(cur, 40, ny); ny += 28; }
    });

    // "To" label
    const rX = mid + 32;
    ctx.font = "bold 11px sans-serif";
    ctx.fillStyle = "#7C3AED";
    ctx.fillText("T O", rX, 55);

    ctx.font = "15px sans-serif";
    ctx.fillStyle = "#374151";
    ctx.fillText("A creative soul", rX, 80);
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "#9CA3AF";
    ctx.fillText(dateStr, rX, 100);

    // Stamp
    const sx = w - 110, sy = 32;
    const stampGrad = ctx.createLinearGradient(sx, sy, sx + 68, sy + 88);
    stampGrad.addColorStop(0, "#7C3AED"); stampGrad.addColorStop(0.5, "#8B5CF6"); stampGrad.addColorStop(1, "#A78BFA");
    ctx.fillStyle = stampGrad;
    ctx.fillRect(sx + 6, sy + 6, 56, 76);
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 2;
    ctx.strokeRect(sx, sy, 68, 88);
    ctx.setLineDash([]);
    // "H" on stamp
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("H", sx + 22, sy + 56);

    // "From" label
    ctx.font = "bold 11px sans-serif";
    ctx.fillStyle = "#7C3AED";
    ctx.fillText("F R O M", rX, 170);
    ctx.font = "15px Georgia, serif";
    ctx.fillStyle = "#6B7280";
    ctx.fillText(locationDisplay, rX, 195);

    // Address lines
    ctx.strokeStyle = "rgba(0,0,0,0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const ly = 240 + i * 28;
      ctx.beginPath(); ctx.moveTo(rX, ly); ctx.lineTo(w - 40, ly); ctx.stroke();
    }

    // hauwa.design
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillText("hauwa.design", rX, h - 30);

    // Outer border
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);

    const link = document.createElement("a");
    link.download = "hauwa-postcard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [lines, locationDisplay, dateStr]);

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <AnimatePresence>
        {show && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[80] bg-foreground/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={close}
            />

            {/* Card container */}
            <motion.div
              className="fixed inset-0 z-[85] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.96 }}
                transition={{ duration: 0.6, ease }}
                className="relative w-full max-w-[540px]"
                style={{
                  rotateX: sRotX,
                  rotateY: sRotY,
                  transformPerspective: 1200,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetTilt}
              >
                {/* Floating close button */}
                <motion.button
                  onClick={close}
                  className="absolute -right-2 -top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground/40 shadow-lg transition-all hover:scale-110 hover:text-foreground sm:-right-3 sm:-top-3"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 20 }}
                  aria-label="Close"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </motion.button>

                {/* The postcard */}
                <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)]">

                  {/* Accent stripe — top */}
                  <div className="h-[3px] bg-gradient-to-r from-accent via-violet-400 to-accent" />

                  <div className="grid grid-cols-1 sm:grid-cols-[1.15fr_0.85fr]">

                    {/* ─── LEFT — Purple letter side ─── */}
                    <div className="relative px-6 py-6 sm:px-7 sm:py-7">
                      {/* Purple background */}
                      <div className="absolute inset-0 bg-[#5B21B6]" />
                      {/* Dot grid */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 0.8px, transparent 0.8px)",
                          backgroundSize: "18px 18px",
                        }}
                      />

                      {/* Faint ruled lines behind text */}
                      <div className="pointer-events-none absolute inset-x-8 top-[64px] bottom-0 sm:inset-x-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="h-px bg-white/[0.04]" style={{ marginTop: i === 0 ? 0 : 36 }} />
                        ))}
                      </div>

                      <div className="relative">
                        {/* POST CARD label */}
                        <motion.p
                          className="font-postcard text-[13px] text-white/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          postcard
                        </motion.p>

                        {/* Letter lines — big handwriting with organic tilts */}
                        <div className="mt-4">
                          {lines.map((line, i) => (
                            <motion.p
                              key={i}
                              className={`font-postcard leading-[1.9] ${
                                line
                                  ? i === lines.length - 1
                                    ? "text-[17px] text-white/90 sm:text-[19px]"
                                    : i === 0
                                      ? "text-[16px] text-white/60 sm:text-[18px]"
                                      : "text-[16px] text-white/80 sm:text-[19px]"
                                  : "h-1"
                              }`}
                              style={{
                                rotate: line ? `${(i % 3 === 0 ? -0.3 : i % 3 === 1 ? 0.2 : -0.15)}deg` : undefined,
                              }}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 + i * 0.06, duration: 0.45, ease }}
                            >
                              {line}
                            </motion.p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ─── RIGHT — Cream address side ─── */}
                    <div className="relative flex flex-col justify-between border-t border-white/10 sm:border-l sm:border-t-0">
                      {/* Cream background */}
                      <div className="absolute inset-0 bg-[#FAF8F5]" />
                      {/* Dot grid */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.035) 0.8px, transparent 0.8px)",
                          backgroundSize: "18px 18px",
                        }}
                      />

                      <div className="relative flex flex-1 flex-col justify-between px-6 py-6 sm:px-7 sm:py-7">
                        <div>
                          {/* Stamp + To cluster */}
                          <div className="flex items-start justify-between">
                            {/* To section — handwritten */}
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4, duration: 0.5, ease }}
                            >
                              <p className="font-postcard text-[15px] text-accent">
                                To:
                              </p>
                              <p className="mt-1 font-postcard text-[17px] text-foreground/75" style={{ rotate: "-0.5deg" }}>
                                A creative soul
                              </p>
                              <p className="mt-0.5 font-postcard text-[13px] text-muted">{dateStr}</p>
                            </motion.div>

                            {/* Stamp */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.4, rotate: 15 }}
                              animate={{ opacity: 1, scale: 1, rotate: 3 }}
                              transition={{ delay: 0.6, type: "spring", stiffness: 160, damping: 12 }}
                            >
                              <LandmarkStamp location={location} />
                            </motion.div>
                          </div>

                          {/* Postmark */}
                          <motion.div
                            className="absolute right-4 top-[100px] sm:right-6 sm:top-[110px]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.75, duration: 0.3, ease }}
                          >
                            <Postmark date={dateShort} />
                          </motion.div>

                          {/* From section — handwritten */}
                          <motion.div
                            className="mt-10"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.5, ease }}
                          >
                            <p className="font-postcard text-[15px] text-accent">
                              From:
                            </p>
                            <p className="mt-1 font-postcard text-[16px] text-foreground/50" style={{ rotate: "0.3deg" }}>
                              {locationDisplay}
                            </p>
                          </motion.div>

                          {/* Ruled address lines */}
                          <motion.div
                            className="mt-7 space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.65, duration: 0.4 }}
                          >
                            {[0, 1, 2].map((i) => (
                              <div key={i} className="h-px bg-foreground/[0.05]" />
                            ))}
                          </motion.div>
                        </div>

                        {/* Bottom: watermark + download */}
                        <motion.div
                          className="mt-6 flex items-end justify-between"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.5, ease }}
                        >
                          <p className="font-postcard text-[14px] text-foreground/[0.12]">
                            hauwa.design
                          </p>

                          <button
                            onClick={downloadPostcard}
                            className="group flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent/[0.07] px-5 py-2.5 font-display text-[13px] font-medium tracking-[-0.01em] text-accent transition-all duration-300 hover:bg-accent hover:text-white"
                          >
                            {downloaded ? (
                              <>
                                saved!
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                              </>
                            ) : (
                              <>
                                keep this
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-0.5">
                                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                              </>
                            )}
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Accent stripe — bottom */}
                  <div className="h-[3px] bg-gradient-to-r from-accent via-violet-400 to-accent" />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
