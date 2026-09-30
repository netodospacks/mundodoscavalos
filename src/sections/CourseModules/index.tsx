"use client";

import { useState } from "react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { BrandIconPlaceholder } from "@/components/ui/BrandIconPlaceholder";
import { courseModules } from "@/data/courseModules";

export default function CourseModules() {
  const [selectedModule, setSelectedModule] = useState<typeof courseModules[0] | null>(null);

  return (
    <section
      id="modulos"
      className="section-gap"
      style={{ backgroundColor: "var(--ink-mid)", position: "relative" }}
    >
      <div className="container">
        {/* Header da seção */}
        <SectionReveal type="up">
          <div
            style={{
              marginBottom: "clamp(2rem, 5vw, 3.5rem)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <span
                className="text-label font-sans"
                style={{
                  color: "var(--gold-light)",
                  display: "block",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                }}
              >
                CATÁLOGO DE APRENDIZADO
              </span>
              <h2
                className="font-sans text-heading"
                style={{ color: "var(--off-white)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}
              >
                Explore o Mundo dos Cavalos
              </h2>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
                color: "var(--gold-light)",
                fontWeight: 600,
              }}
            >
              <span>10 MÓDULOS DISPONÍVEIS</span>
            </div>
          </div>
        </SectionReveal>

        {/* Grid de Capas Verticais (Posters 2:3 Idênticos ao Hero) */}
        <div className="modules-grid-container">
          {courseModules.map((mod, index) => (
            <SectionReveal
              key={mod.id}
              delay={(index % 4) as 0 | 1 | 2 | 3 | 4}
            >
              <div
                onClick={() => setSelectedModule(mod)}
                className="module-poster-card"
                role="button"
                tabIndex={0}
                aria-label={`Ver detalhes do Módulo ${mod.number}: ${mod.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedModule(mod);
                }}
                style={{
                  aspectRatio: "2/3",
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid rgba(196, 169, 110, 0.3)",
                  backgroundColor: "#151310",
                  cursor: "pointer",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.65)",
                  transition: "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1rem",
                }}
              >
                {/* Layer 1: Imagem de Fundo em HD */}
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
                  className="poster-bg-image"
                />

                {/* Layer 2: Degradê Escuro Profundo para Legibilidade */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13,12,10,0.98) 0%, rgba(13,12,10,0.75) 50%, rgba(13,12,10,0.3) 80%, rgba(13,12,10,0.4) 100%)",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />

                {/* Layer 3 Top: Emblema Módulo + Ícone */}
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
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: "var(--gold-light)",
                      backgroundColor: "rgba(13,12,10,0.85)",
                      backdropFilter: "blur(6px)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "3px",
                      border: "1px solid rgba(196,169,110,0.35)",
                      textTransform: "uppercase",
                    }}
                  >
                    MÓDULO {mod.number}
                  </span>

                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      border: "1px solid rgba(196, 169, 110, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(13,12,10,0.75)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  </div>
                </div>

                {/* Layer 3 Bottom: Título e Descrição Integrados */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.58rem",
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
                      fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
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

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 400,
                      color: "rgba(244,239,228,0.8)",
                      lineHeight: 1.4,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {mod.description}
                  </p>

                  <div
                    style={{
                      marginTop: "0.4rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "var(--gold-light)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span>VER CONTEÚDO</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Modal de Detalhes do Módulo */}
        {selectedModule && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(13, 12, 10, 0.9)",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.25rem",
            }}
            onClick={() => setSelectedModule(null)}
          >
            <div
              style={{
                backgroundColor: "var(--ink-soft)",
                border: "1px solid var(--gold)",
                maxWidth: "580px",
                width: "100%",
                borderRadius: "6px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 25px 60px rgba(0,0,0,0.9)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Modal em HD */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                <img
                  src={selectedModule.image}
                  alt={selectedModule.imageAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, var(--ink-soft) 0%, transparent 80%)",
                    pointerEvents: "none",
                  }}
                />
                <button
                  onClick={() => setSelectedModule(null)}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    backgroundColor: "rgba(13, 12, 10, 0.8)",
                    border: "1px solid rgba(244, 239, 228, 0.25)",
                    color: "var(--off-white)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                  }}
                  aria-label="Fechar janela"
                >
                  ✕
                </button>
              </div>

              {/* Conteúdo do Modal */}
              <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    color: "var(--gold-light)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  MÓDULO {selectedModule.number}
                </span>

                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "var(--off-white)",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  {selectedModule.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(244, 239, 228, 0.85)",
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {selectedModule.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "0.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(244, 239, 228, 0.1)",
                  }}
                >
                  <Link
                    href="#quero-aprender"
                    onClick={() => setSelectedModule(null)}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      padding: "0.85rem 1.5rem",
                      backgroundColor: "var(--off-white)",
                      color: "var(--ink)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    INSCREVER-SE NO CURSO →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Profissional de Especificações da Plataforma ("Informações do Curso") */}
        <SectionReveal type="up">
          <div
            id="inscreva-se"
            style={{
              marginTop: "clamp(3.5rem, 7vw, 5.5rem)",
              backgroundColor: "rgba(18, 16, 13, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(196, 169, 110, 0.3)",
              padding: "clamp(2rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "var(--gold-light)",
                  textTransform: "uppercase",
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                FICHA TÉCNICA DA PLATAFORMA
              </span>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "var(--off-white)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 800,
                  margin: "0.25rem 0 0.85rem 0",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                }}
              >
                Informações do Curso
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(244,239,228,0.8)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  fontSize: "0.92rem",
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Metodologia baseada na prática real e na ciência do Haras Nossa Senhora Aparecida. Assista de onde quiser com acesso para sempre.
              </p>
            </div>

            {/* Grid de Especificações */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "1.25rem",
                width: "100%",
                maxWidth: "920px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(13, 12, 10, 0.75)",
                  border: "1px solid rgba(196, 169, 110, 0.2)",
                  padding: "1.25rem 1.1rem",
                  borderRadius: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--gold-light)", textTransform: "uppercase" }}>
                  MÓDULOS & EVOLUÇÃO
                </span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--off-white)" }}>
                  10+ Módulos Práticos
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(244,239,228,0.7)", lineHeight: 1.4 }}>
                  Início com 10 módulos. Novos conteúdos inclusos sem custo extra.
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(13, 12, 10, 0.75)",
                  border: "1px solid rgba(196, 169, 110, 0.2)",
                  padding: "1.25rem 1.1rem",
                  borderRadius: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--gold-light)", textTransform: "uppercase" }}>
                  TIPO DE ACESSO
                </span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--off-white)" }}>
                  Vitalício (Pague 1x)
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(244,239,228,0.7)", lineHeight: 1.4 }}>
                  Sem mensalidades ou assinaturas recorrentes. Seu para sempre.
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(13, 12, 10, 0.75)",
                  border: "1px solid rgba(196, 169, 110, 0.2)",
                  padding: "1.25rem 1.1rem",
                  borderRadius: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--gold-light)", textTransform: "uppercase" }}>
                  DISPOSITIVOS
                </span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--off-white)" }}>
                  Web, TV & App Android
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(244,239,228,0.7)", lineHeight: 1.4 }}>
                  Assista no computador, celular ou aplicativo Android dedicado.
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(13, 12, 10, 0.75)",
                  border: "1px solid rgba(196, 169, 110, 0.2)",
                  padding: "1.25rem 1.1rem",
                  borderRadius: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--gold-light)", textTransform: "uppercase" }}>
                  CERTIFICAÇÃO
                </span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--off-white)" }}>
                  Certificado Oficial
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(244,239,228,0.7)", lineHeight: 1.4 }}>
                  Emitido automaticamente ao concluir as aulas da plataforma.
                </span>
              </div>
            </div>

            {/* CTA Link */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.85rem",
                width: "100%",
                maxWidth: "380px",
              }}
            >
              <Link
                href="#quero-aprender"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "1rem 2rem",
                  fontSize: "0.78rem",
                  letterSpacing: "0.14em",
                  backgroundColor: "var(--off-white)",
                  color: "var(--ink)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                INSCREVER-SE AGORA →
              </Link>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(244,239,228,0.7)",
                }}
              >
                Acesso imediato • 7 Dias de Garantia Incondicional
              </span>
            </div>
          </div>
        </SectionReveal>

        {/* Estilos CSS do Grid Responsivo de Posters */}
        <style dangerouslySetInnerHTML={{__html: `
          .modules-grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.15rem;
          }
          @media (min-width: 768px) {
            .modules-grid-container {
              grid-template-columns: repeat(4, 1fr);
              gap: 1.5rem;
            }
          }
          .module-poster-card:hover {
            border-color: var(--gold-light) !important;
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 15px 35px rgba(0,0,0,0.85) !important;
          }
          .module-poster-card:hover .poster-bg-image {
            transform: scale(1.08);
            opacity: 0.85 !important;
          }
        `}} />
      </div>
    </section>
  );
}

