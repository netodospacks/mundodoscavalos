"use client";

import { useEffect, useRef } from "react";

export function FarmAtmosphereBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateFarmAtmosphere = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = Math.min(Math.max(scrollY / (maxScroll || 1), 0), 1);

      // Deslocamento sutil do fundo de fazenda
      const bgY = (scrollRatio * -80).toFixed(2);
      const glowOpacity = (0.2 + scrollRatio * 0.25).toFixed(2);

      bgRef.current.style.transform = `translate3d(0, ${bgY}px, 0)`;
      bgRef.current.style.opacity = glowOpacity;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateFarmAtmosphere);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateFarmAtmosphere();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Imagem de Fundo de Fazenda / Haras em Tom Dourado Quente */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-10% 0",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: 0.2,
          willChange: "transform, opacity",
          filter: "sepia(0.3) contrast(1.1) brightness(0.6)",
        }}
      />

      {/* Camada de Névoa Quente de Campo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 80% 20%, rgba(196, 169, 110, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(120, 90, 50, 0.15) 0%, transparent 65%)
          `,
        }}
      />
    </div>
  );
}
