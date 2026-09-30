"use client";

import { useEffect, useRef, ReactNode, useState } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  type?: "up" | "fade";
  threshold?: number;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  type = "up",
  threshold = 0.08,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safety fallback timer: ensure visibility even if observer is delayed
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 750);

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return () => clearTimeout(timer);
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsRevealed(true);
      return () => clearTimeout(timer);
    }

    // Bidirectional IntersectionObserver (animates on enter down AND up)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          clearTimeout(timer);
        } else {
          // Reset when out of view so it re-triggers when scrolling back
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold]);

  const baseClass = type === "up" ? "reveal" : "reveal-fade";
  const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";
  const revealedClass = isRevealed ? "revealed" : "";

  return (
    <div
      ref={ref}
      className={[baseClass, delayClass, revealedClass, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export default SectionReveal;


