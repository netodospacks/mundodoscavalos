"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
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
              marginBottom: "clamp(2rem, 5vw, 4rem)",
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
                  fontWeight: 600,
                }}
              >
                CATÁLOGO DE APRENDIZADO
              </span>
              <h2
                className="font-sans text-heading"
                style={{ color: "var(--off-white)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em" }}
              >
                Módulos do Curso
              </h2>
            </div>

            {/* Indicador Arraste para o Lado */}
            <div
              className="md:hidden"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
                color: "var(--gold-light)",
                opacity: 0.85,
              }}
            >
              <span>arraste para o lado</span>
              <span className="animate-slide-right" aria-hidden="true">→</span>
            </div>
          </div>
        </SectionReveal>

        {/* Faixa Horizontal de Capas (Streaming Catalog) */}
        <div className="modules-catalog-wrapper">
          {courseModules.map((mod, index) => (
            <SectionReveal
              key={mod.id}
              delay={(index % 4) as 0 | 1 | 2 | 3 | 4}
              className="module-card-reveal"
            >
              <div
                onClick={() => setSelectedModule(mod)}
                className="module-cover-card"
                role="button"
                tabIndex={0}
                aria-label={`Ver detalhes do Módulo ${mod.number}: ${mod.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedModule(mod);
                }}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backgroundColor: "var(--ink-soft)",
                  border: "1px solid rgba(157, 132, 82, 0.25)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                }}
              >
                {/* Capa com Imagem */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/10",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={mod.image}
                    alt={mod.imageAlt}
                    fill
                    sizes="(max-width: 768px) 80vw, 25vw"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="module-cover-image"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(13, 12, 10, 0.95) 0%, rgba(13, 12, 10, 0.3) 60%, rgba(13, 12, 10, 0.2) 100%)",
                    }}
                  />
                  {/* Badge de Número do Módulo */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      left: "0.85rem",
                      backgroundColor: "rgba(13, 12, 10, 0.85)",
                      border: "1px solid var(--gold)",
                      padding: "0.2rem 0.6rem",
                      color: "var(--gold-light)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      borderRadius: "2px",
                    }}
                  >
                    MÓDULO {mod.number}
                  </div>
                </div>

                {/* Conteúdo da Capa */}
                <div
                  style={{
                    padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <h3
                      className="font-serif"
                      style={{
                        color: "var(--off-white)",
                        fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)",
                        fontWeight: 400,
                        lineHeight: 1.25,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {mod.title}
                    </h3>
                    <p
                      className="font-sans"
                      style={{
                        color: "var(--stone-light)",
                        fontSize: "0.82rem",
                        fontWeight: 300,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {mod.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1px solid rgba(244, 239, 228, 0.08)",
                      paddingTop: "0.85rem",
                      marginTop: "auto",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.65rem",
                        color: "var(--stone-light)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Aulas Práticas
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        color: "var(--gold-light)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <span>Ver Módulo</span>
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Modal de Detalhes do Módulo (Abertura de Conteúdo) */}
        {selectedModule && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              backgroundColor: "rgba(13, 12, 10, 0.88)",
              backdropFilter: "blur(12px)",
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
                maxWidth: "600px",
                width: "100%",
                borderRadius: "2px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagem Banner Modal */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                <Image
                  src={selectedModule.image}
                  alt={selectedModule.imageAlt}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, var(--ink-soft) 0%, transparent 100%)",
                  }}
                />
                <button
                  onClick={() => setSelectedModule(null)}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    backgroundColor: "rgba(13, 12, 10, 0.75)",
                    border: "1px solid rgba(244, 239, 228, 0.2)",
                    color: "var(--off-white)",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  aria-label="Fechar janela"
                >
                  ✕
                </button>
              </div>

              {/* Detalhes Modal */}
              <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    color: "var(--gold-light)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  MÓDULO {selectedModule.number}
                </span>

                <h3
                  className="font-serif"
                  style={{
                    color: "var(--off-white)",
                    fontSize: "1.8rem",
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {selectedModule.title}
                </h3>

                <p
                  className="font-sans"
                  style={{
                    color: "var(--stone-light)",
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {selectedModule.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginTop: "0.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(244, 239, 228, 0.08)",
                  }}
                >
                  <a
                    href="#inscreva-se"
                    onClick={() => setSelectedModule(null)}
                    className="btn btn-primary-dark"
                    style={{ flex: 1, justifyContent: "center", padding: "0.85rem 1.5rem" }}
                  >
                    INSCREVER-SE NO CURSO →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card com Informações do Curso & Call-to-Action */}
        <SectionReveal type="up">
          <div
            id="inscreva-se"
            style={{
              marginTop: "clamp(4rem, 8vw, 6rem)",
              backgroundColor: "var(--ink-soft)",
              border: "1px solid rgba(157, 132, 82, 0.3)",
              padding: "clamp(2rem, 5vw, 4rem)",
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
              alignItems: "center",
              textAlign: "center",
              borderRadius: "2px",
            }}
          >
            <div>
              <span
                className="text-label font-sans"
                style={{ color: "var(--gold)", textTransform: "uppercase" }}
              >
                QUERO TRANSFORMAR MEU MANEJO
              </span>
              <h3
                className="font-serif"
                style={{
                  color: "var(--off-white)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 300,
                  marginTop: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                Informações do Curso
              </h3>
              <p
                className="font-sans"
                style={{
                  color: "var(--stone-light)",
                  maxWidth: "540px",
                  margin: "0 auto",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                }}
              >
                Acesso completo ao conteúdo, materiais complementares e
                metodologia prática do Haras Nossa Senhora Aparecida.
              </p>
            </div>

            {/* Linha Horizontal Compacta de Informações do Curso (Sem Empilhamento Vertical) */}
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(0.5rem, 3vw, 1.5rem)",
                padding: "0.85rem clamp(0.75rem, 3vw, 2rem)",
                backgroundColor: "rgba(13, 12, 10, 0.75)",
                border: "1px solid rgba(196, 169, 110, 0.25)",
                borderRadius: "2px",
                width: "100%",
                maxWidth: "680px",
                overflowX: "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", whiteSpace: "nowrap" }}>
                <span className="font-sans" style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--stone-light)" }}>Formato</span>
                <span className="font-sans" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold-light)" }}>CURSO PRÁTICO</span>
              </div>

              <span style={{ color: "rgba(196, 169, 110, 0.35)", fontSize: "0.8rem" }}>|</span>

              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", whiteSpace: "nowrap" }}>
                <span className="font-sans" style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--stone-light)" }}>Duração</span>
                <span className="font-sans" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--off-white)" }}>12 HORAS</span>
              </div>

              <span style={{ color: "rgba(196, 169, 110, 0.35)", fontSize: "0.8rem" }}>|</span>

              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", whiteSpace: "nowrap" }}>
                <span className="font-sans" style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--stone-light)" }}>Módulos</span>
                <span className="font-sans" style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--off-white)" }}>4 MÓDULOS</span>
              </div>
            </div>

            {/* Botão Comece Agora */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                maxWidth: "360px",
              }}
            >
              <Link
                href="/login"
                className="btn btn-primary-dark"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "1.1rem 2rem",
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                }}
              >
                COMECE AGORA →
              </Link>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  color: "var(--stone-light)",
                  opacity: 0.8,
                }}
              >
                Garantia de aprendizado com aplicação prática
              </span>
            </div>
          </div>
        </SectionReveal>

        {/* Estilos CSS do catálogo horizontal mobile / grid desktop */}
        <style dangerouslySetInnerHTML={{__html: `
          .modules-catalog-wrapper {
            display: flex;
            gap: 1.25rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.75rem;
            scrollbar-width: none;
          }
          .modules-catalog-wrapper::-webkit-scrollbar { display: none; }
          .module-card-reveal {
            flex: 0 0 82%;
            scroll-snap-align: start;
            min-width: 0;
          }
          @media (min-width: 768px) {
            .modules-catalog-wrapper {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 1.5rem;
              overflow-x: visible;
              padding-bottom: 0;
            }
            .module-card-reveal {
              flex: unset;
            }
          }
          .module-cover-card:hover {
            border-color: var(--gold);
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.5);
          }
          .module-cover-card:hover .module-cover-image {
            transform: scale(1.06);
          }
        `}} />
      </div>
    </section>
  );
}

