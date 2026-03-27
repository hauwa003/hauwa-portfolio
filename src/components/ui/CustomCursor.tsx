"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const TRAIL_COUNT = 5;
const DOT_SIZE = 10;

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Main dot — tight spring
  const springX = useSpring(mouseX, { damping: 25, stiffness: 700, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 700, mass: 0.5 });

  // Trail dots — progressively softer springs
  const trails = useRef(
    Array.from({ length: TRAIL_COUNT }, (_, i) => ({
      x: useSpring(mouseX, {
        damping: 20 - i * 2,
        stiffness: 300 - i * 45,
        mass: 0.5 + i * 0.15,
      }),
      y: useSpring(mouseY, {
        damping: 20 - i * 2,
        stiffness: 300 - i * 45,
        mass: 0.5 + i * 0.15,
      }),
    }))
  ).current;

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Detect interactive elements for cursor scaling
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      setIsHoveringInteractive(!!interactive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY, visible]);

  if (isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{ display: visible ? "block" : "none" }}
    >
      {/* Trail dots — render back to front so main dot is on top */}
      {trails.map((trail, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            x: trail.x,
            y: trail.y,
            width: DOT_SIZE - i * 1.2,
            height: DOT_SIZE - i * 1.2,
            translateX: -(DOT_SIZE - i * 1.2) / 2,
            translateY: -(DOT_SIZE - i * 1.2) / 2,
            backgroundColor: "var(--color-accent)",
            opacity: 0.3 - i * 0.05,
          }}
        />
      ))}

      {/* Main dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          width: DOT_SIZE,
          height: DOT_SIZE,
          translateX: -DOT_SIZE / 2,
          translateY: -DOT_SIZE / 2,
          backgroundColor: "var(--color-accent)",
        }}
        animate={{
          scale: isHoveringInteractive ? 1.8 : 1,
          opacity: isHoveringInteractive ? 0.7 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
