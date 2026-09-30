"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { BrandIconPlaceholder } from "@/components/ui/BrandIconPlaceholder";

export default function WantToLearnCTA() {
  return (
    <section
      id="quero-aprender"
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "var(--ink)",
        overflow: "hidden",
        color: "var(--off-white)",
      }}
    >
      {/* Background Container com Ícone da Marca e Gradiente */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <BrandIconPlaceholder label="MUNDO DOS CAVALOS" aspectRatio="16/9" />
        {/* Gradiente Escuro Cinematográfico */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(13,12,10,0.65) 0%, rgba(13,12,10,0.95) 85%), linear-gradient(to bottom, rgba(13,12,10,0.9) 0%, transparent 40%, rgba(13,12,10,0.98) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "clamp(5rem, 10vw, 9rem)",
          paddingBottom: "clamp(5rem, 10vw, 9rem)",
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <SectionReveal type="up">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.75rem" }}>
            
            {/* Tagline */}
            <span
              className="font-sans"
              style={{
                color: "var(--gold-light)",
                textTransform: "uppercase",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--gold-light)" }} />
              Pausa Cinematográfica &bull; Escolha seu Destino
            </span>

            {/* High Impact Headline */}
            <h2
              className="font-sans"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                fontWeight: 800,
                color: "var(--off-white)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: "0.5rem 0",
                maxWidth: "800px",
                textTransform: "uppercase",
              }}
            >
              Quero Transformar <br style={{ display: "block" }} />
              <span style={{ color: "var(--gold-light)", fontWeight: 800 }}>Meu Manejo</span>
            </h2>

            <div style={{ height: "1px", width: "60px", backgroundColor: "var(--gold)", opacity: 0.7 }} />

            {/* Premium Product Metadata Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(0.75rem, 2vw, 2rem)",
                padding: "1.25rem clamp(1rem, 3vw, 2.5rem)",
                background: "rgba(13, 12, 10, 0.75)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(206, 175, 114, 0.25)",
                borderRadius: "2px",
                margin: "1rem 0 1.5rem 0",
                width: "100%",
                maxWidth: "780px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="font-sans" style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--stone-light)" }}>Tipo</span>
                <span className="font-sans" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gold-light)" }}>CURSO PRÁTICO</span>
              </div>
              <span style={{ color: "rgba(206, 175, 114, 0.3)" }}>|</span>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="font-sans" style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--stone-light)" }}>Duração</span>
                <span className="font-sans" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--off-white)" }}>12 HORAS</span>
              </div>
              <span style={{ color: "rgba(206, 175, 114, 0.3)" }}>|</span>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="font-sans" style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--stone-light)" }}>Conteúdo</span>
                <span className="font-sans" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--off-white)" }}>4 MÓDULOS</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
              }}
            >
              <Link
                href="/login"
                className="font-sans"
                style={{
                  padding: "1.15rem 3rem",
                  backgroundColor: "var(--gold)",
                  color: "var(--ink)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  borderRadius: "2px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span>COMEÇAR AGORA</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <span
                className="font-sans"
                style={{ fontSize: "0.72rem", color: "var(--stone-light)", letterSpacing: "0.05em" }}
              >
                Acesso imediato &bull; Certificado de Conclusão &bull; Suporte Técnico
              </span>
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
