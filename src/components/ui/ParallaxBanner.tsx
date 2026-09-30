"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function ParallaxBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [parallaxEnabled, setParallaxEnabled] = useState(true);

  useEffect(() => {
    if (!parallaxEnabled) {
      if (bgRef.current) bgRef.current.style.transform = "translate3d(0, 0, 0) scale(1.08)";
      if (contentRef.current) contentRef.current.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
        
        // Manipulação direta do DOM (sem re-renders do React para 60 FPS fluido)
        if (bgRef.current) {
          const bgY = (centerOffset * 0.35).toFixed(2);
          bgRef.current.style.transform = `translate3d(0, ${bgY}px, 0) scale(1.08)`;
        }

        if (contentRef.current) {
          const contentY = (centerOffset * -0.1).toFixed(2);
          contentRef.current.style.transform = `translate3d(0, ${contentY}px, 0)`;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [parallaxEnabled]);

  return (
    <section
      ref={containerRef}
      aria-label="Demonstração do Efeito Parallax em Tempo Real"
      style={{
        position: "relative",
        height: "clamp(380px, 55vh, 560px)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--ink)",
        margin: "3rem 0",
        borderTop: "1px solid rgba(196, 169, 110, 0.25)",
        borderBottom: "1px solid rgba(196, 169, 110, 0.25)",
      }}
    >
      {/* Camada 1: IMAGEM DE FUNDO COM PARALLAX ULTRA-FLUIDO 60FPS */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-20% 0", // Margem ampla para movimento continuo
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
          transform: "translate3d(0, 0, 0) scale(1.08)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          zIndex: 0,
          filter: "brightness(0.55) contrast(1.1)",
        }}
        aria-hidden="true"
      />

      {/* Camada 2: OVERLAY EM DEGRADÊ CINEMATOGRÁFICO */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgba(13, 12, 10, 0.4) 0%, rgba(13, 12, 10, 0.88) 85%),
            linear-gradient(to top, var(--ink) 0%, transparent 40%, transparent 60%, var(--ink) 100%)
          `,
          zIndex: 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Camada 3: CONTEÚDO DA FRENTE FLUIDO */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "850px",
          padding: "0 1.5rem",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Control Badge & Toggle */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            backgroundColor: "rgba(18, 16, 13, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(196, 169, 110, 0.4)",
            padding: "0.4rem 1rem",
            borderRadius: "30px",
            marginBottom: "1.25rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: parallaxEnabled ? "#22c55e" : "#ef4444",
              boxShadow: parallaxEnabled ? "0 0 10px #22c55e" : "none",
              transition: "all 0.3s ease",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.18em",
              color: "var(--gold-light)",
              textTransform: "uppercase",
            }}
          >
            {parallaxEnabled ? "✦ PARALLAX FLUIDO 60FPS" : "PARALLAX DESATIVADO"}
          </span>

          <button
            onClick={() => setParallaxEnabled(!parallaxEnabled)}
            style={{
              background: parallaxEnabled ? "rgba(196, 169, 110, 0.25)" : "rgba(255,255,255,0.15)",
              border: "1px solid rgba(196, 169, 110, 0.4)",
              color: "var(--off-white)",
              fontSize: "0.62rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
              borderRadius: "12px",
              cursor: "pointer",
              marginLeft: "0.25rem",
              transition: "all 0.2s ease",
            }}
            title="Clique para alternar o efeito Parallax"
          >
            {parallaxEnabled ? "DESATIVAR PARA COMPARAR" : "ATIVAR PARALLAX"}
          </button>
        </div>

        {/* Título Principal */}
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 900,
            color: "var(--off-white)",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 1rem 0",
            textShadow: "0 4px 20px rgba(0,0,0,0.9)",
          }}
        >
          EXPERIMENTE A PROFUNDIDADE <br />
          <span style={{ color: "var(--gold-light)" }}>EM TEMPO REAL</span>
        </h2>

        {/* Descrição */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.88rem, 1.2vw, 1.05rem)",
            color: "rgba(244, 239, 228, 0.88)",
            fontWeight: 400,
            lineHeight: 1.6,
            marginBottom: "1.75rem",
            maxWidth: "680px",
            margin: "0 auto 1.75rem auto",
          }}
        >
          Ao rolar a tela, perceba como a imagem do cavalo no fundo desliza suavemente sem travamentos. O movimento via aceleração por GPU garante total fluidez.
        </p>

        {/* Botão de Ação */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Link
            href="#modulos"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--ink)",
              backgroundColor: "var(--gold-light)",
              padding: "0.8rem 1.8rem",
              borderRadius: "4px",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(196, 169, 110, 0.4)",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
          >
            EXPLORAR CURSOS DA PLATAFORMA
          </Link>
        </div>
      </div>
    </section>
  );
}
