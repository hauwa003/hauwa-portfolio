"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const showreelImages = [
  { src: "/images/projects/basketball.png", alt: "Sport Mag — Basketball" },
  { src: "/images/projects/budgio-screens.png", alt: "Budgio — Fintech App" },
  { src: "/images/projects/tennis.png", alt: "Sport Mag — Tennis" },
  { src: "/images/projects/onboarding.png", alt: "Onboarding Flow" },
  { src: "/images/projects/football.png", alt: "Sport Mag — Football" },
  { src: "/images/projects/brix.png", alt: "Brix — Spending Onboarding" },
  { src: "/images/projects/memory-bird.png", alt: "Memory Bird — 100 Day Streak" },
];

export function Showreel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let pos = 0;
    const speed = 0.5; // pixels per frame

    const tick = () => {
      pos += speed;

      // When we've scrolled past the first set, jump back seamlessly
      const halfWidth = el.scrollWidth / 2;
      if (pos >= halfWidth) {
        pos -= halfWidth;
      }

      el.style.transform = `translateX(${-pos}px)`;
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <section className="w-full overflow-hidden">
      <div ref={scrollRef} className="flex gap-2 will-change-transform">
        {/* Two identical sets for seamless loop */}
        {[0, 1].map((set) =>
          showreelImages.map((img, i) => (
            <div
              key={`${set}-${i}`}
              className="relative h-[280px] w-[380px] shrink-0 overflow-hidden bg-surface md:h-[360px] md:w-[480px] lg:h-[420px] lg:w-[560px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                quality={95}
                sizes="(max-width: 768px) 380px, (max-width: 1024px) 480px, 560px"
                priority={set === 0 && i < 4}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
