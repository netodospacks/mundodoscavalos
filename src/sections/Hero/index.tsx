"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { BrandIconPlaceholder } from "@/components/ui/BrandIconPlaceholder";
import { courseModules } from "@/data/courseModules";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback para política de autoplay de navegadores
      });
    }
  }, []);

  // Efeito de parallax de alta performance (60 FPS via GPU translate3d + requestAnimationFrame)
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!heroRef.current || !bgWrapperRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;

      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        const progress = Math.min(Math.max(-rect.top / heroHeight, 0), 1);
        const y = (progress * 120).toFixed(2);
        const scale = (1.04 + progress * 0.05).toFixed(3);
        const opacity = (1 - progress * 0.4).toFixed(2);

        bgWrapperRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
        bgWrapperRef.current.style.opacity = opacity;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Plataforma Mundo dos Cavalos — Abertura Cinematográfica"
      className="hero-streaming-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "var(--ink)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ============================================================
          1. BARRA VERTICAL FLUTUANTE DE ÍCONES DE NAVEGAÇÃO (ESQUERDA DESKTOP)
          ============================================================ */}
      <aside
        className="hero-streaming-sidebar hide-mobile"
        aria-label="Menu rápido da plataforma"
        style={{
          position: "fixed",
          left: "1.25rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.35rem",
          backgroundColor: "rgba(13, 12, 10, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(196, 169, 110, 0.22)",
          padding: "1.2rem 0.65rem",
          borderRadius: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        }}
      >
        <Link href="#modulos" aria-label="Buscar / Módulos" title="Buscar / Módulos" style={{ color: "var(--off-white)", opacity: 0.8, transition: "opacity 0.2s, color 0.2s" }} className="hover:opacity-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </Link>
        <Link href="/" aria-label="Início" title="Início" style={{ color: "var(--gold-light)", transition: "opacity 0.2s" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </Link>
        <Link href="#modulos" aria-label="Catálogo de Cursos" title="Catálogo de Cursos" style={{ color: "var(--off-white)", opacity: 0.8, transition: "opacity 0.2s" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        </Link>
        <Link href="#docente" aria-label="Especialista" title="Especialista" style={{ color: "var(--off-white)", opacity: 0.8, transition: "opacity 0.2s" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </Link>
        <Link href="#quero-aprender" aria-label="Inscrever-se" title="Inscrever-se" style={{ color: "var(--off-white)", opacity: 0.8, transition: "opacity 0.2s" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </Link>
      </aside>

      {/* ============================================================
          2. VÍDEO CINEMATOGRÁFICO DE FUNDO & DEGRADÊ DE TRANSIÇÃO SUAVE
          ============================================================ */}
      <div
        ref={bgWrapperRef}
        style={{
          position: "absolute",
          inset: "-12% 0",
          zIndex: 0,
          willChange: "transform, opacity",
          transform: "translate3d(0, 0, 0) scale(1.04)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=85"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 28%",
            display: "block",
          }}
          aria-hidden="true"
        >
          <source src="/videos/hero-cavalos.mp4" type="video/mp4" />
        </video>

        {/* Fallback visual */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1553284965-e2815db4c1c4?w=1920&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            zIndex: -1,
          }}
          aria-hidden="true"
        />

        {/* Gradiente estilo Streaming com Degradê Profundo na Base (elimina qualquer corte ao rolar) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 75% 40%, transparent 25%, rgba(13, 12, 10, 0.45) 60%, rgba(13, 12, 10, 0.95) 100%),
              linear-gradient(to right, rgba(13, 12, 10, 0.96) 0%, rgba(13, 12, 10, 0.8) 35%, rgba(13, 12, 10, 0.25) 65%, transparent 100%),
              linear-gradient(to top, var(--ink) 0%, rgba(13, 12, 10, 0.95) 18%, rgba(13, 12, 10, 0.7) 35%, transparent 75%)
            `,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ============================================================
          3. CONTEÚDO PRINCIPAL ESTILO STREAMING DESTAQUE
          ============================================================ */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1380px",
          margin: "0 auto",
          paddingTop: "clamp(100px, 16vh, 160px)",
          paddingLeft: "clamp(1.25rem, 7vw, 6.5rem)",
          paddingRight: "clamp(1.25rem, 4vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <div style={{ maxWidth: "680px", paddingBottom: "1.5rem" }}>
          
          {/* Badge da Categoria (Inspiração: N SÉRIE) */}
          <SectionReveal delay={0} type="up">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  color: "var(--gold)",
                  letterSpacing: "0.05em",
                }}
              >
                M
              </span>
              <span
                className="font-sans"
                style={{
                  fontWeight: 700,
                  fontSize: "0.62rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                }}
              >
                PLATAFORMA • CURSO PRÁTICO
              </span>
            </div>
          </SectionReveal>

          {/* Título Gigante Tipo Logo de Série / Plataforma */}
          <SectionReveal delay={1} type="up">
            <h1
              className="font-sans"
              style={{
                fontWeight: 900,
                fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: "var(--off-white)",
                textTransform: "uppercase",
                margin: "0.15rem 0 0.85rem 0",
                textShadow: "0 4px 25px rgba(0,0,0,0.8)",
              }}
            >
              Mundo dos <br />
              <span style={{ color: "var(--gold-light)" }}>Cavalos</span>
            </h1>
          </SectionReveal>

          {/* Tagline Direta */}
          <SectionReveal delay={2} type="up">
            <p
              className="font-sans"
              style={{
                color: "rgba(244, 239, 228, 0.92)",
                fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)",
                fontWeight: 600,
                lineHeight: 1.35,
                marginBottom: "0.6rem",
              }}
            >
              Cuidar de cavalos não é apenas tradição. <br />
              <span style={{ color: "var(--gold-light)", fontWeight: 700 }}>
                É ciência, manejo e respeito ao animal.
              </span>
            </p>
          </SectionReveal>

          {/* Sinopse Curta */}
          <SectionReveal delay={2} type="up">
            <p
              className="font-sans"
              style={{
                color: "rgba(244, 239, 228, 0.78)",
                fontSize: "clamp(0.82rem, 1.05vw, 0.95rem)",
                fontWeight: 300,
                lineHeight: 1.6,
                marginBottom: "1.5rem",
                maxWidth: "560px",
              }}
            >
              Conhecimento prático e aplicável sobre bem-estar, saúde, nutrição e reprodução equina direto da rotina real do Haras Nossa Senhora Aparecida.
            </p>
          </SectionReveal>

          {/* Botões Estilo Streaming (Pill Buttons: ▶ Assistir / ⓘ Mais Informações) */}
          <SectionReveal delay={3} type="up">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                flexWrap: "wrap",
              }}
            >
              {/* Botão Principal ▶ ASSISTIR / COMEÇAR AGORA */}
              <Link
                href="#modulos"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  backgroundColor: "var(--off-white)",
                  padding: "0.85rem 2rem",
                  borderRadius: "4px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                }}
                className="hover:scale-105"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>COMEÇAR AGORA</span>
              </Link>

              {/* Botão Secundário ⓘ MAIS INFORMAÇÕES */}
              <Link
                href="#inscreva-se"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--off-white)",
                  backgroundColor: "rgba(100, 90, 75, 0.55)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(244, 239, 228, 0.25)",
                  padding: "0.85rem 1.8rem",
                  borderRadius: "4px",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span>MAIS INFORMAÇÕES</span>
              </Link>
            </div>
          </SectionReveal>

        </div>
      </div>

      {/* ============================================================
          4. FAIXA DE MÓDULOS DESTAQUES SURGINDO NA BASE DO HERO (POSTERS ESTILO STREAMING)
          ============================================================ */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          paddingBottom: "2.5rem",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1380px",
            margin: "0 auto",
            paddingLeft: "clamp(1.25rem, 7vw, 6.5rem)",
            paddingRight: "clamp(1.25rem, 4vw, 3rem)",
          }}
        >
          {/* Título do Trilho de Conteúdo */}
          <div style={{ marginBottom: "0.85rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              className="font-sans"
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--gold)" }} />
              MÓDULOS DA PLATAFORMA
            </span>
          </div>

          {/* FAIXA HORIZONTAL DE POSTERS VERTICAIS (TEXTO SOBRE DEGRADÊ + IMAGEM DE FUNDO) */}
          <div
            style={{
              display: "flex",
              gap: "1.15rem",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              paddingBottom: "0.85rem",
              paddingTop: "0.3rem",
            }}
            className="no-scrollbar"
          >
            {courseModules.map((mod) => (
              <a
                key={mod.id}
                href="#modulos"
                style={{
                  flex: "0 0 clamp(160px, 20vw, 210px)",
                  scrollSnapAlign: "start",
                  aspectRatio: "2/3",
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid rgba(196, 169, 110, 0.3)",
                  backgroundColor: "#151310",
                  textDecoration: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.65)",
                  transition: "transform 0.35 ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "0.85rem",
                }}
                className="hero-catalog-card"
              >
                {/* Layer 1: Imagem de Fundo (Pronta para substituição futura) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${mod.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.65,
                    transition: "transform 0.5s ease, opacity 0.5s ease",
                    zIndex: 0,
                  }}
                  className="card-bg-image"
                />

                {/* Layer 2: Degradê Escuro por cima da imagem para dar contraste e legibilidade perfeita ao texto */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13,12,10,0.98) 0%, rgba(13,12,10,0.75) 45%, rgba(13,12,10,0.3) 80%, rgba(13,12,10,0.4) 100%)",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />

                {/* Layer 3 Top: Emblema / Marca no Canto Superior */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.55rem",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: "var(--gold-light)",
                      backgroundColor: "rgba(13,12,10,0.75)",
                      backdropFilter: "blur(4px)",
                      padding: "0.2rem 0.45rem",
                      borderRadius: "3px",
                      border: "1px solid rgba(196,169,110,0.3)",
                      textTransform: "uppercase",
                    }}
                  >
                    MÓDULO {mod.number}
                  </span>
                  
                  {/* Ícone Vetorial sutil no topo */}
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      border: "1px solid rgba(196, 169, 110, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(13,12,10,0.6)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  </div>
                </div>

                {/* Layer 3 Bottom: Texto Principal sobre o Degradê */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.52rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      color: "var(--gold)",
                      textTransform: "uppercase",
                    }}
                  >
                    MUNDO DOS CAVALOS
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
                      fontWeight: 800,
                      lineHeight: 1.2,
                      color: "var(--off-white)",
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {mod.title}
                  </h3>

                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.58rem",
                      fontWeight: 400,
                      color: "rgba(244,239,228,0.75)",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {mod.description}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Degradê de Transição na Base do Hero para Suavizar com a próxima seção */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(13,12,10,0.6) 50%, var(--ink) 100%)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />

      {/* Estilos específicos do Layout Streaming & Ajuste do Vídeo Widescreen */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .hero-catalog-card:hover {
          transform: translateY(-6px) scale(1.03);
          border-color: var(--gold-light) !important;
          box-shadow: 0 15px 35px rgba(0,0,0,0.85) !important;
        }
        .hero-catalog-card:hover .card-bg-image {
          transform: scale(1.08);
          opacity: 0.85 !important;
        }

        /* Enquadramento do Vídeo Widescreen (Não-Story) */
        @media (max-width: 767px) {
          .hero-streaming-section video {
            object-fit: cover !important;
            object-position: center 25% !important;
          }
        }
      `}} />
    </section>
  );
}
