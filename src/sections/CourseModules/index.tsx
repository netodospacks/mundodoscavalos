"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { courseModules } from "@/data/courseModules";

export default function CourseModules() {
  const [selectedModule, setSelectedModule] = useState<typeof courseModules[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Função para rolar o catálogo horizontalmente
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      id="modulos"
      className="section-gap"
      style={{ backgroundColor: "var(--ink-mid)", position: "relative" }}
    >
      <div className="container">
        {/* Header da seção Centralizado */}
        <SectionReveal type="up">
          <div
            style={{
              marginBottom: "clamp(2rem, 5vw, 3rem)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                color: "var(--gold-light)",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                fontWeight: 700,
                fontSize: "0.72rem",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              CATÁLOGO DE APRENDIZADO
            </span>

            <h2
              className="font-sans"
              style={{
                color: "var(--off-white)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                margin: "0.1rem 0",
              }}
            >
              Explore o Curso Mundo dos Cavalos
            </h2>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
                color: "var(--gold-light)",
                fontWeight: 700,
                backgroundColor: "rgba(196, 169, 110, 0.1)",
                border: "1px solid rgba(196, 169, 110, 0.25)",
                padding: "0.3rem 0.85rem",
                borderRadius: "20px",
                marginTop: "0.25rem",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--gold-light)" }} />
              <span>10 MÓDULOS DISPONÍVEIS</span>
            </div>
          </div>
        </SectionReveal>

        {/* CONTÊINER DO CATÁLOGO DE POSTERS COM ROLAGEM HORIZONTAL & BOTÕES DE NAVEGAÇÃO */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Botão Scroll Esquerda */}
          <button
            onClick={() => handleScroll("left")}
            aria-label="Rolar para esquerda"
            style={{
              position: "absolute",
              left: "-1rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(13, 12, 10, 0.85)",
              border: "1px solid var(--gold-light)",
              color: "var(--off-white)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
            }}
            className="hover:scale-110 hide-mobile-btn"
          >
            ‹
          </button>

          {/* Trilho Horizontal de Posters Verticais 2:3 */}
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: "1.25rem",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              paddingBottom: "1rem",
              paddingTop: "0.3rem",
            }}
            className="no-scrollbar"
          >
            {courseModules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                className="module-poster-card"
                role="button"
                tabIndex={0}
                aria-label={`Ver detalhes do Módulo ${mod.number}: ${mod.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedModule(mod);
                }}
                style={{
                  flex: "0 0 clamp(180px, 24vw, 240px)",
                  scrollSnapAlign: "start",
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

                {/* Layer 2: Degradê Escuro Profundo */}
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
            ))}
          </div>

          {/* Botão Scroll Direita */}
          <button
            onClick={() => handleScroll("right")}
            aria-label="Rolar para direita"
            style={{
              position: "absolute",
              right: "-1rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(13, 12, 10, 0.85)",
              border: "1px solid var(--gold-light)",
              color: "var(--off-white)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
            }}
            className="hover:scale-110 hide-mobile-btn"
          >
            ›
          </button>
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

        {/* Estilos CSS */}
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .module-poster-card:hover {
            border-color: var(--gold-light) !important;
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 15px 35px rgba(0,0,0,0.85) !important;
          }
          .module-poster-card:hover .poster-bg-image {
            transform: scale(1.08);
            opacity: 0.85 !important;
          }
          @media (max-width: 767px) {
            .hide-mobile-btn { display: none !important; }
          }
        `}} />
      </div>
    </section>
  );
}
