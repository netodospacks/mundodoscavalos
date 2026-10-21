"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      aria-label="Mundo dos Cavalos — Haras Nossa Senhora Aparecida"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0a0907",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* ── IMAGEM DE FUNDO CINEMATOGRÁFICA ── */}
      <div
        className="hero-bg-cover"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* ── CAMADA DE CONTRASTE FOTOGRÁFICO UNIFORME E PROFISSIONAL (SEM DEGRADÊS SUJOS) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(10, 9, 7, 0.44)",
          zIndex: 1,
        }}
      />

      {/* ── TRANSIÇÃO ARQUITETÔNICA ELEGANTE PARA A SEÇÃO DE CURSOS (SEM DEGRADÊ EMBAÇADO) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          height: "44px",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 1440 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path
            d="M0,44 L1440,44 L1440,16 C1050,44 390,44 0,16 Z"
            fill="#f7f5f0"
          />
          <path
            d="M0,16 C390,44 1050,44 1440,16"
            stroke="#c4a96e"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            fill="none"
          />
        </svg>
      </div>

      {/* ── CONTEÚDO PRINCIPAL — POSICIONADO MAIS ACIMA COM ELEVADA PRESENÇA ── */}
      <div
        className="hero-content-wrap"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "clamp(4.8rem, 9.5vh, 7.2rem) clamp(1.25rem, 5vw, 4rem) clamp(2.5rem, 5vh, 4rem)",
        }}
      >
        {/* ── EMBLEMA / LOGO OFICIAL HARAS NOSSA SENHORA APARECIDA ── */}
        <div
          className={`hero-anim ${mounted ? "hero-anim-in" : "hero-anim-out"}`}
          style={{
            transitionDelay: "40ms",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "clamp(0.6rem, 1.5vh, 1.1rem)",
          }}
        >
          <img
            src="/images/logo-haras-transparente.png"
            alt="Haras Nossa Senhora Aparecida"
            style={{
              height: "clamp(52px, 7.5vw, 76px)",
              width: "auto",
              display: "block",
              filter: "drop-shadow(0 4px 18px rgba(0, 0, 0, 0.8)) drop-shadow(0 2px 6px rgba(196, 169, 110, 0.3))",
            }}
          />
        </div>

        {/* TÍTULO / LOGOMARCA PRINCIPAL: MUNDO DOS CAVALOS — 100% RECRIADA EM QUALIDADE ESTÚDIO 3D */}
        <div
          className={`hero-anim ${mounted ? "hero-anim-in" : "hero-anim-out"}`}
          style={{
            transitionDelay: "100ms",
            width: "100%",
            maxWidth: "clamp(300px, 86vw, 680px)",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1 style={{ margin: 0, width: "100%" }}>
            <span className="sr-only">Mundo dos Cavalos — Haras Nossa Senhora Aparecida</span>
            <img
              src="/images/logo-mundo-dos-cavalos-recreated.png"
              alt="Mundo dos Cavalos"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                margin: "0 auto",
                filter: "drop-shadow(0 8px 32px rgba(0, 0, 0, 0.95)) drop-shadow(0 2px 10px rgba(196, 169, 110, 0.2))",
              }}
            />
          </h1>
        </div>

        {/* SUBTÍTULO */}
        <div
          className={`hero-anim ${mounted ? "hero-anim-in" : "hero-anim-out"}`}
          style={{ transitionDelay: "240ms", marginTop: "1.25rem", maxWidth: "620px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(0.98rem, 2vw, 1.2rem)",
              lineHeight: 1.5,
              color: "#f4efe4",
              margin: 0,
              textShadow: "0 2px 16px rgba(0,0,0,0.9)",
            }}
          >
            Cuidar de cavalos não é apenas tradição.
            <br />
            <span style={{ color: "#c4a96e" }}>
              É ciência, manejo e respeito ao animal.
            </span>
          </p>
        </div>

        {/* DESCRIÇÃO COMPLEMENTAR */}
        <div
          className={`hero-anim ${mounted ? "hero-anim-in" : "hero-anim-out"}`}
          style={{ transitionDelay: "320ms", marginTop: "1rem", maxWidth: "520px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)",
              lineHeight: 1.65,
              color: "rgba(244,239,228,0.88)",
              margin: 0,
              textShadow: "0 2px 14px rgba(0,0,0,0.9)",
            }}
          >
            Conhecimento prático e aplicável sobre bem-estar, saúde,
            nutrição e reprodução equina direto da rotina real do
            Haras Nossa Senhora Aparecida.
          </p>
        </div>
      </div>

      {/* ── ESTILOS DE ANIMAÇÃO E RESPONSIVIDADE ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-anim-out {
          opacity: 0;
          transform: translateY(18px);
        }
        .hero-anim-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        @media (max-width: 768px) {
          .hero-section {
            min-height: 87vh !important;
          }
          .hero-content-wrap {
            padding-top: clamp(4.2rem, 7.5vh, 5.8rem) !important;
            padding-bottom: clamp(1.2rem, 2.5vh, 2.2rem) !important;
          }
          .hero-bg-cover {
            background-position: 72% center !important;
          }
        }
      `}} />
    </section>
  );
}
