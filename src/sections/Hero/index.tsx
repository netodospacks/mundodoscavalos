"use client";

import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Handle autoplay restriction on mobile browsers
    });
  }, []);

  return (
    <section
      aria-label="Apresentação principal"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "var(--ink)",
      }}
    >
      {/* ── Vídeo / Fallback Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=85"
          onCanPlay={() => setVideoLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
          aria-hidden="true"
        >
          {/* Adicione a URL do vídeo MP4 definitivo quando disponível */}
          {/* <source src="URL_DO_VIDEO.mp4" type="video/mp4" /> */}
        </video>

        {/* Fallback image when video is loading or unsupported on mobile */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1553284965-e2815db4c1c4?w=1920&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            opacity: videoLoaded ? 0 : 1,
            transition: "opacity 1.2s ease",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Overlay cinematográfico ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(13, 12, 10, 0.6) 0%,
              rgba(13, 12, 10, 0.35) 35%,
              rgba(13, 12, 10, 0.7) 70%,
              rgba(13, 12, 10, 0.96) 100%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* ── Conteúdo sobre o vídeo (Com Z-index elevado e padding responsivo) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "clamp(115px, 16vh, 150px)",
          paddingRight: "clamp(1.25rem, 5vw, 4rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
          paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
          maxWidth: "1380px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Label acima / Brand Tag */}
        <SectionReveal delay={0} type="up">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
              }}
            >
              Haras Nossa Senhora Aparecida
            </span>
            <span
              style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "var(--gold)",
                opacity: 0.6,
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--off-white)",
                backgroundColor: "rgba(157, 132, 82, 0.2)",
                border: "1px solid rgba(157, 132, 82, 0.4)",
                padding: "0.2rem 0.6rem",
                borderRadius: "2px",
              }}
            >
              PLATAFORMA DIGITAL
            </span>
          </div>
        </SectionReveal>

        {/* Título Principal */}
        <SectionReveal delay={1} type="up">
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 7vw, 7rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "var(--off-white)",
              maxWidth: "850px",
              marginBottom: "0.3em",
            }}
          >
            Cuidar de Cavalos
            <br />
            <em
              style={{
                fontStyle: "italic",
                color: "rgba(244, 239, 228, 0.82)",
                fontWeight: 300,
              }}
            >
              não é apenas tradição.
            </em>
          </h1>
        </SectionReveal>

        <SectionReveal delay={2} type="up">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(1.35rem, 3vw, 2.6rem)",
              lineHeight: 1.25,
              color: "var(--off-white)",
              maxWidth: "640px",
              marginTop: "0.75rem",
            }}
          >
            É ciência, <span style={{ color: "var(--gold-light)" }}>manejo</span>
            <br />e respeito ao animal.
          </p>
        </SectionReveal>

        {/* Metadata Pill Badge + Resumo Curto */}
        <SectionReveal delay={3} type="up">
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxWidth: "580px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--stone-light)",
              }}
            >
              <span>Curso Prático</span>
              <span aria-hidden="true">•</span>
              <span>4 Módulos</span>
              <span aria-hidden="true">•</span>
              <span>100% Online</span>
            </div>

            <p
              className="font-sans"
              style={{
                color: "rgba(244, 239, 228, 0.75)",
                fontSize: "clamp(0.85rem, 1.1vw, 0.98rem)",
                fontWeight: 300,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Conhecimento sério e aplicável sobre bem-estar, saúde, alimentação e
              manejo equino, direto da rotina real de um haras profissional.
            </p>
          </div>
        </SectionReveal>

        {/* Botões de Ação (Primary + Secondary) */}
        <SectionReveal delay={4} type="up">
          <div
            style={{
              marginTop: "2.25rem",
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#modulos"
              className="btn btn-primary-dark"
              style={{
                fontSize: "0.72rem",
                padding: "1rem 2.2rem",
                whiteSpace: "nowrap",
                fontWeight: 600,
                letterSpacing: "0.16em",
              }}
            >
              COMEÇAR AGORA →
            </a>
            <a
              href="#quero-aprender"
              className="btn btn-outline-light"
              style={{
                fontSize: "0.68rem",
                padding: "0.95rem 1.8rem",
                whiteSpace: "nowrap",
              }}
            >
              Conhecer a plataforma
              <span aria-hidden="true" style={{ marginLeft: "0.35rem" }}>
                ↓
              </span>
            </a>
          </div>
        </SectionReveal>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "1.5rem",
          right: "clamp(1rem, 4vw, 3rem)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.45,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, transparent, var(--off-white))",
            animation: "pulse-slow 2.5s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--off-white)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}

