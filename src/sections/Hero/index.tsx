"use client";

import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";

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
        // Fallback em caso de bloqueio de autoplay do navegador
      });
    }
  }, []);

  // Efeito de transição de profundidade no scroll no Desktop
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
      aria-label="Apresentação cinematográfica Mundo dos Cavalos"
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "85vh",
        backgroundColor: "var(--ink)",
        overflow: "hidden",
      }}
    >
      {/* ============================================================
          1. COMPOSIÇÃO DESKTOP (VÍDEO EM TELA CHEIA COMO PROTAGONISTA)
          ============================================================ */}
      <div className="hero-desktop-wrapper">
        {/* Container do Vídeo Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            transform: `scale(${1 - scrollProgress * 0.04}) translateY(${scrollProgress * 20}px)`,
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
              objectPosition: "center 40%",
              display: "block",
            }}
            aria-hidden="true"
          >
            <source src="/videos/hero-cavalos.mp4" type="video/mp4" />
          </video>

          {/* Imagem de fallback caso o vídeo falhe */}
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
        </div>

        {/* Gradiente Lateral Esquerdo (garante 100% de contraste no texto) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(
                to right,
                rgba(13, 12, 10, 0.94) 0%,
                rgba(13, 12, 10, 0.78) 32%,
                rgba(13, 12, 10, 0.3) 58%,
                transparent 85%
              ),
              linear-gradient(
                to top,
                rgba(13, 12, 10, 0.98) 0%,
                rgba(13, 12, 10, 0.4) 30%,
                transparent 100%
              )
            `,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Conteúdo Desktop (Alinhado à Esquerda Estilo Streaming) */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1380px",
            margin: "0 auto",
            minHeight: "100vh",
            paddingTop: "clamp(120px, 18vh, 180px)",
            paddingBottom: "clamp(4rem, 8vh, 6.5rem)",
            paddingLeft: "clamp(1.25rem, 8vw, 7.5rem)",
            paddingRight: "clamp(1.25rem, 4vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            transform: `translateY(${scrollProgress * -15}px)`,
            opacity: 1 - scrollProgress * 0.4,
          }}
        >
          <div style={{ maxWidth: "760px" }}>
            {/* Tag de Marca */}
            <SectionReveal delay={0} type="up">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1rem",
                  backgroundColor: "rgba(13, 12, 10, 0.65)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(196, 169, 110, 0.3)",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "2px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--gold-light)",
                    boxShadow: "0 0 8px var(--gold-light)",
                  }}
                  aria-hidden="true"
                />
                <span
                  className="font-sans"
                  style={{
                    fontWeight: 600,
                    fontSize: "0.72rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--gold-light)",
                  }}
                >
                  Mundo dos Cavalos
                </span>
              </div>
            </SectionReveal>

            {/* Título Principal */}
            <SectionReveal delay={1} type="up">
              <h1
                className="font-sans"
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 4.8vw, 4.2rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--off-white)",
                  textTransform: "uppercase",
                  margin: "0.25rem 0 1rem 0",
                }}
              >
                Cuidar de cavalos
                <br />
                <span style={{ color: "rgba(244, 239, 228, 0.9)", fontWeight: 700 }}>
                  não é apenas tradição.
                </span>
                <br />
                <span style={{ color: "var(--gold-light)", fontWeight: 800 }}>
                  É ciência, manejo e respeito ao animal.
                </span>
              </h1>
            </SectionReveal>

            {/* Descrição Curta */}
            <SectionReveal delay={2} type="up">
              <p
                className="font-sans"
                style={{
                  color: "rgba(244, 239, 228, 0.85)",
                  fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  maxWidth: "580px",
                  margin: "0 0 1.25rem 0",
                }}
              >
                Conhecimento sério e aplicável sobre bem-estar, saúde, alimentação e manejo equino,
                direto da rotina real de um haras profissional.
              </p>
            </SectionReveal>

            {/* Metadata Line */}
            <SectionReveal delay={3} type="up">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  backgroundColor: "rgba(13, 12, 10, 0.7)",
                  borderLeft: "2px solid var(--gold-light)",
                  padding: "0.4rem 0.9rem",
                  marginBottom: "1.75rem",
                }}
              >
                <span>CURSO</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>12 HORAS</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>4 MÓDULOS</span>
              </div>
            </SectionReveal>

            {/* Botões */}
            <SectionReveal delay={4} type="up">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <a
                  href="#modulos"
                  className="btn btn-primary-dark"
                  style={{
                    fontSize: "0.75rem",
                    padding: "1.1rem 2.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    backgroundColor: "var(--gold)",
                    color: "var(--ink)",
                  }}
                >
                  <span>COMEÇAR AGORA</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>

                <a
                  href="#quero-aprender"
                  className="btn btn-outline-light"
                  style={{
                    fontSize: "0.72rem",
                    padding: "1.05rem 2rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                  }}
                >
                  SAIBA MAIS
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* ============================================================
          2. COMPOSIÇÃO MOBILE (SPLIT EDITORIAL: TEXTO ESQ / VÍDEO DIR)
          O vídeo NÃO fica atrás das letras no mobile.
          ============================================================ */}
      <div className="hero-mobile-wrapper">
        {/* LADO ESQUERDO: PAINEL DE CONTEÚDO SÓLIDO E ELEGANTE (~52% W) */}
        <div className="hero-mobile-content-col">
          <span
            className="font-sans"
            style={{
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--earth-2)",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            MUNDO DOS CAVALOS
          </span>

          <h1
            className="font-sans"
            style={{
              fontSize: "clamp(1.05rem, 4.2vw, 1.35rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.015em",
              color: "var(--text-dark)",
              textTransform: "uppercase",
              margin: "0 0 0.5rem 0",
            }}
          >
            CUIDAR DE CAVALOS <br />
            <span style={{ color: "var(--earth-1)", fontWeight: 700 }}>
              NÃO É APENAS TRADIÇÃO.
            </span>
            <br />
            <span style={{ color: "var(--earth-3)", fontWeight: 800 }}>
              É CIÊNCIA, MANEJO E RESPEITO.
            </span>
          </h1>

          <p
            className="font-sans"
            style={{
              fontSize: "0.72rem",
              lineHeight: 1.45,
              color: "var(--text-mid-light)",
              fontWeight: 400,
              margin: "0 0 0.65rem 0",
            }}
          >
            Conhecimento prático sobre bem-estar e manejo equino direto do haras.
          </p>

          {/* Metadata Compacto Horizontal (Linha única no mobile) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--earth-2)",
              backgroundColor: "rgba(160, 117, 64, 0.12)",
              padding: "0.3rem 0.5rem",
              borderRadius: "2px",
              marginBottom: "0.85rem",
              whiteSpace: "nowrap",
            }}
          >
            <span>CURSO</span>
            <span>•</span>
            <span>12 HORAS</span>
            <span>•</span>
            <span>4 MÓDULOS</span>
          </div>

          <a
            href="#modulos"
            className="btn"
            style={{
              backgroundColor: "var(--ink)",
              color: "var(--off-white)",
              fontSize: "0.62rem",
              padding: "0.65rem 1rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              borderRadius: "2px",
              width: "100%",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}
          >
            COMEÇAR AGORA &rarr;
          </a>
        </div>

        {/* LADO DIREITO: VÍDEO COM ENQUADRAMENTO NOS CAVALOS (~48% W) */}
        <div className="hero-mobile-video-col">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "68% center",
              display: "block",
            }}
            aria-hidden="true"
          >
            <source src="/videos/hero-cavalos.mp4" type="video/mp4" />
          </video>

          {/* Transição sutil com gradiente na borda esquerda da coluna do vídeo */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, var(--off-white) 0%, transparent 18%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Estilos CSS específicos para controlar Desktop vs Mobile Split */}
      <style dangerouslySetInnerHTML={{__html: `
        .hero-desktop-wrapper {
          display: none;
        }
        .hero-mobile-wrapper {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          width: 100%;
          min-height: 84vh;
          background-color: var(--off-white);
          position: relative;
          z-index: 2;
          padding-top: 56px;
        }
        .hero-mobile-content-col {
          flex: 0 0 54%;
          max-width: 54%;
          padding: 1.25rem 0.85rem 1.5rem 1.1rem;
          display: flex;
          flex-direction: column;
          justifyContent: center;
          background-color: var(--off-white);
          z-index: 3;
          position: relative;
        }
        .hero-mobile-video-col {
          flex: 0 0 46%;
          max-width: 46%;
          position: relative;
          overflow: hidden;
          background-color: var(--ink);
        }

        @media (min-width: 768px) {
          .hero-mobile-wrapper {
            display: none !important;
          }
          .hero-desktop-wrapper {
            display: block !important;
            position: relative;
            min-height: 100vh;
            width: 100%;
          }
        }
      `}} />
    </section>
  );
}
