"use client";

import { useEffect, useRef } from "react";

export function CloudParallaxTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cloudFrontRef = useRef<HTMLDivElement>(null);
  const cloudBackRef = useRef<HTMLDivElement>(null);
  const cloudMidRef = useRef<HTMLDivElement>(null);
  const sectionOpacityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Progresso: 0 = seção entrando pelo baixo, 1 = saindo pelo topo
      const rawProgress = (vh - rect.top) / (vh + rect.height);
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Seção toda faz fade in/out nas bordas
      if (sectionOpacityRef.current) {
        const edgeFade = progress < 0.12
          ? progress / 0.12
          : progress > 0.88
          ? (1 - progress) / 0.12
          : 1;
        sectionOpacityRef.current.style.opacity = edgeFade.toFixed(2);
      }

      // Nuvens de fundo (lentas)
      if (cloudBackRef.current) {
        const y = ((progress - 0.5) * -80).toFixed(1);
        cloudBackRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }

      // Nuvens do meio
      if (cloudMidRef.current) {
        const y = ((progress - 0.5) * -130).toFixed(1);
        cloudMidRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }

      // Nuvens da frente (rápidas — passam na frente das letras)
      if (cloudFrontRef.current) {
        const y = ((progress - 0.5) * -200).toFixed(1);
        cloudFrontRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      aria-label="Transição cinematográfica — Mundo dos Cavalos"
      style={{
        position: "relative",
        height: "clamp(480px, 75vh, 720px)",
        overflow: "hidden",
        backgroundColor: "#0a0d14",
      }}
    >
      {/* Fade nas bordas superior/inferior para colar com seções vizinhas */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "clamp(80px, 18vh, 160px)",
        background: "linear-gradient(to bottom, var(--ink), transparent)",
        zIndex: 30, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "clamp(80px, 18vh, 160px)",
        background: "linear-gradient(to top, var(--ink), transparent)",
        zIndex: 30, pointerEvents: "none",
      }} />

      {/* Wrapper principal com fade de entrada/saída da seção */}
      <div
        ref={sectionOpacityRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          willChange: "opacity",
        }}
      >
        {/* ── CÉU / HORIZONTE DE FUNDO ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(to bottom,
              #5c8bb5 0%,
              #7fb0d4 18%,
              #a8cce0 35%,
              #c8dfe8 50%,
              #dde9ee 62%,
              #e8ecdf 75%,
              #c8b88a 88%,
              #a89060 100%
            )
          `,
          zIndex: 0,
        }} />

        {/* Sol / luz no horizonte */}
        <div style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(180px, 35vw, 400px)",
          height: "clamp(180px, 35vw, 400px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,220,140,0.6) 0%, rgba(240,180,80,0.3) 40%, transparent 70%)",
          filter: "blur(30px)",
          zIndex: 1,
          pointerEvents: "none",
        }} />

        {/* Silhueta de colinas/fazenda na base */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: `
            linear-gradient(to top,
              rgba(18, 14, 8, 1) 0%,
              rgba(25, 20, 12, 0.92) 30%,
              rgba(35, 28, 18, 0.75) 60%,
              transparent 100%
            )
          `,
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* ── NUVENS DE FUNDO (lentas, grandes) ── */}
        <div
          ref={cloudBackRef}
          style={{
            position: "absolute",
            inset: "-20% 0",
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          {/* Nuvem grande esquerda */}
          <div style={{
            position: "absolute",
            top: "18%", left: "-8%",
            width: "55%", height: "40%",
            background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(255,255,255,0.92) 0%, rgba(240,245,255,0.75) 40%, rgba(220,235,250,0.4) 65%, transparent 85%)",
            filter: "blur(1px)",
          }} />
          {/* Nuvem grande direita */}
          <div style={{
            position: "absolute",
            top: "12%", right: "-5%",
            width: "50%", height: "36%",
            background: "radial-gradient(ellipse 65% 50% at 45% 40%, rgba(255,255,255,0.88) 0%, rgba(235,242,252,0.7) 45%, rgba(215,230,248,0.35) 68%, transparent 88%)",
            filter: "blur(2px)",
          }} />
          {/* Nuvem central topo */}
          <div style={{
            position: "absolute",
            top: "5%", left: "25%",
            width: "50%", height: "28%",
            background: "radial-gradient(ellipse 80% 55% at 50% 50%, rgba(255,255,255,0.80) 0%, rgba(240,245,255,0.55) 50%, transparent 78%)",
            filter: "blur(3px)",
          }} />
        </div>

        {/* ── TEXTO JANELA: MUNDO DOS CAVALOS com background-clip:text ── */}
        {/* Texto como máscara — a imagem do céu/fazenda aparece DENTRO das letras */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
          padding: "0 1rem",
          pointerEvents: "none",
        }}>
          {/* Tagline acima */}
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.6rem, 1vw, 0.78rem)",
            fontWeight: 800,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(30, 24, 14, 0.75)",
            marginBottom: "0.5rem",
          }}>
            ✦ &nbsp; PLATAFORMA EQUESTRE &nbsp; ✦
          </div>

          {/* LINHA 1: MUNDO DOS */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              /* ══ EFEITO JANELA: o céu/campo fica DENTRO das letras ══ */
              backgroundImage: `
                url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=90')
              `,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              filter: "contrast(1.05) brightness(1.1)",
            }}
          >
            MUNDO DOS
          </div>

          {/* LINHA 2: CAVALOS */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              backgroundImage: `
                url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=90')
              `,
              backgroundSize: "cover",
              backgroundPosition: "center 55%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              filter: "contrast(1.05) brightness(1.1)",
            }}
          >
            CAVALOS
          </div>

          {/* Subtítulo abaixo */}
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)",
            fontWeight: 300,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(20, 16, 10, 0.65)",
            marginTop: "0.8rem",
          }}>
            Conhecimento · Manejo · Bem-estar equino
          </div>
        </div>

        {/* ── NUVENS DO MEIO (passam NA FRENTE das letras) ── */}
        <div
          ref={cloudMidRef}
          style={{
            position: "absolute",
            inset: "-15% 0",
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
            zIndex: 7,
            pointerEvents: "none",
          }}
        >
          {/* Nuvem esquerda cortando as letras */}
          <div style={{
            position: "absolute",
            top: "32%", left: "-12%",
            width: "48%", height: "30%",
            background: "radial-gradient(ellipse 65% 50% at 55% 45%, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.82) 40%, rgba(225,238,252,0.5) 62%, transparent 82%)",
            filter: "blur(0.5px)",
          }} />
          {/* Nuvem direita cortando as letras */}
          <div style={{
            position: "absolute",
            top: "28%", right: "-8%",
            width: "45%", height: "32%",
            background: "radial-gradient(ellipse 60% 48% at 42% 42%, rgba(255,255,255,0.93) 0%, rgba(238,246,255,0.78) 42%, rgba(220,236,250,0.45) 64%, transparent 84%)",
            filter: "blur(1px)",
          }} />
        </div>

        {/* ── NUVENS DA FRENTE (rápidas, passam bem na frente das letras) ── */}
        <div
          ref={cloudFrontRef}
          style={{
            position: "absolute",
            inset: "-10% 0",
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
            zIndex: 9,
            pointerEvents: "none",
          }}
        >
          {/* Nuvem grande frente-esquerda */}
          <div style={{
            position: "absolute",
            top: "40%", left: "-18%",
            width: "42%", height: "25%",
            background: "radial-gradient(ellipse 62% 52% at 58% 48%, rgba(255,255,255,0.98) 0%, rgba(245,250,255,0.88) 35%, rgba(225,240,255,0.55) 58%, transparent 80%)",
          }} />
          {/* Nuvem grande frente-direita */}
          <div style={{
            position: "absolute",
            top: "36%", right: "-15%",
            width: "44%", height: "28%",
            background: "radial-gradient(ellipse 58% 50% at 40% 44%, rgba(255,255,255,0.97) 0%, rgba(242,248,255,0.85) 38%, rgba(222,238,254,0.52) 60%, transparent 82%)",
          }} />
          {/* Nuvem pequena central-frente */}
          <div style={{
            position: "absolute",
            top: "48%", left: "30%",
            width: "40%", height: "18%",
            background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,255,255,0.90) 0%, rgba(240,247,255,0.65) 45%, transparent 75%)",
          }} />
        </div>
      </div>
    </div>
  );
}
