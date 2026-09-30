"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { courseModules } from "@/data/courseModules";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Efeito de paralaia e opacidade no scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / heroHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
          2. VÍDEO CINEMATOGRÁFICO DE FUNDO & GRADIENTES DE LEITURA
          ============================================================ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          transform: `scale(${1 - scrollProgress * 0.04}) translateY(${scrollProgress * 25}px)`,
          opacity: 1 - scrollProgress * 0.5,
          transition: "transform 0.1s linear, opacity 0.1s linear",
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
            objectPosition: "center 38%",
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
            backgroundPosition: "center 35%",
            zIndex: -1,
          }}
          aria-hidden="true"
        />

        {/* Gradiente estilo Streaming (Sombra profunda à esquerda e base inferior para cards) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 75% 40%, transparent 20%, rgba(13, 12, 10, 0.4) 60%, rgba(13, 12, 10, 0.95) 100%),
              linear-gradient(to right, rgba(13, 12, 10, 0.96) 0%, rgba(13, 12, 10, 0.8) 35%, rgba(13, 12, 10, 0.25) 65%, transparent 100%),
              linear-gradient(to top, rgba(13, 12, 10, 0.98) 0%, rgba(13, 12, 10, 0.7) 20%, transparent 60%)
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
          4. FAIXA DE MÓDULOS DESTAQUES SURGINDO NA BASE DO HERO (CATÁLOGO STREAMING)
          ============================================================ */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          paddingBottom: "1.25rem",
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
          <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              className="font-sans"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--off-white)",
              }}
            >
              POPULARES NO MUNDO DOS CAVALOS
            </span>
          </div>

          {/* FAIXA HORIZONTAL DE CAPAS */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              paddingBottom: "0.5rem",
            }}
            className="no-scrollbar"
          >
            {courseModules.map((mod) => (
              <a
                key={mod.id}
                href="#modulos"
                style={{
                  flex: "0 0 clamp(160px, 22vw, 220px)",
                  scrollSnapAlign: "start",
                  aspectRatio: "16/9",
                  position: "relative",
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: "1px solid rgba(196, 169, 110, 0.25)",
                  backgroundColor: "var(--ink-soft)",
                  textDecoration: "none",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                }}
                className="hero-catalog-card"
              >
                <Image
                  src={mod.image}
                  alt={mod.title}
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13,12,10,0.95) 0%, transparent 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "0.5rem",
                    left: "0.6rem",
                    right: "0.6rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.52rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "var(--gold-light)",
                      textTransform: "uppercase",
                      display: "block",
                    }}
                  >
                    MÓDULO 0{mod.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: "var(--off-white)",
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {mod.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Estilos específicos do Layout Streaming */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .hero-catalog-card:hover {
          transform: scale(1.05);
          border-color: var(--gold-light);
          z-index: 10;
        }
      `}} />
    </section>
  );
}
