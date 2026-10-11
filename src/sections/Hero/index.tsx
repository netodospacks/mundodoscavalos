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
      aria-label="Mundo dos Cavalos — Haras Nossa Senhora Aparecida"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0a0907",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* ── IMAGEM DE FUNDO CINEMATOGRÁFICA ── */}
      <div
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

      {/* ── OVERLAY ESCURO CENTRAL PARA MÁXIMA LEGIBILIDADE ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 85% at 50% 50%, rgba(10,9,7,0.52) 0%, rgba(10,9,7,0.25) 60%, transparent 100%)",
          zIndex: 1,
        }}
      />
      {/* Escurecimento sutil nas laterais */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(10,9,7,0.45) 0%, transparent 28%, transparent 72%, rgba(10,9,7,0.45) 100%)",
          zIndex: 1,
        }}
      />
      {/* Gradiente inferior — transição suave com a seção de cursos */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "240px",
          background:
            "linear-gradient(to top, #f7f5f0 0%, rgba(247,245,240,0.85) 25%, rgba(10,9,7,0.7) 65%, transparent 100%)",
          zIndex: 1,
        }}
      />
      {/* Gradiente superior suave para contraste do header */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "140px",
          background:
            "linear-gradient(to bottom, rgba(10,9,7,0.65) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* ── CONTEÚDO PRINCIPAL — CENTRALIZADO E ELEGANTE ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "clamp(6.5rem, 14vh, 9.5rem) clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vh, 6rem)",
        }}
      >
        {/* TÍTULO PRINCIPAL: MUNDO DOS CAVALOS */}
        <div
          className={`hero-anim ${mounted ? "hero-anim-in" : "hero-anim-out"}`}
          style={{ transitionDelay: "60ms" }}
        >
          <h1
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.4rem, 9.5vw, 8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
              color: "#f4efe4",
              margin: 0,
              textTransform: "uppercase",
              textShadow: "0 4px 50px rgba(0,0,0,0.75)",
            }}
          >
            <span style={{ display: "block" }}>MUNDO DOS</span>
            <span
              style={{
                display: "block",
                color: "#c4a96e",
              }}
            >
              CAVALOS
            </span>
          </h1>
        </div>

        {/* LINHA DECORATIVA DOURADA */}
        <div
          className={`hero-anim ${mounted ? "hero-anim-in" : "hero-anim-out"}`}
          style={{
            transitionDelay: "160ms",
            margin: "1.6rem auto 0",
            width: "56px",
            height: "2px",
            background: "linear-gradient(to right, transparent, #c4a96e, transparent)",
          }}
        />

        {/* SUBTÍTULO */}
        <div
          className={`hero-anim ${mounted ? "hero-anim-in" : "hero-anim-out"}`}
          style={{ transitionDelay: "240ms", marginTop: "1.8rem", maxWidth: "620px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.05rem, 2.1vw, 1.25rem)",
              lineHeight: 1.55,
              color: "#f4efe4",
              margin: 0,
              textShadow: "0 2px 20px rgba(0,0,0,0.85)",
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
          style={{ transitionDelay: "340ms", marginTop: "1.5rem", maxWidth: "520px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.85rem, 1.25vw, 0.98rem)",
              lineHeight: 1.75,
              color: "rgba(244,239,228,0.82)",
              margin: 0,
              textShadow: "0 2px 16px rgba(0,0,0,0.9)",
            }}
          >
            Conhecimento prático e aplicável sobre bem-estar, saúde,
            nutrição e reprodução equina direto da rotina real do
            Haras Nossa Senhora Aparecida.
          </p>
        </div>
      </div>

      {/* ── ESTILOS DE ANIMAÇÃO ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-anim-out {
          opacity: 0;
          transform: translateY(22px);
        }
        .hero-anim-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
      `}} />
    </section>
  );
}
