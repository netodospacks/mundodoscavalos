"use client";

import { useState } from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import { courseModules, courseInfo } from "@/data/courseModules";

export default function CurriculumSales() {
  const [openModule, setOpenModule] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenModule(openModule === id ? null : id);
  };

  return (
    <section
      id="modulos"
      style={{
        backgroundColor: "var(--ink-mid)",
        position: "relative",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <SectionReveal type="up">
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(3rem, 6vw, 4.5rem)",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Conteúdo Programático
            </span>
            <h2
              className="font-sans"
              style={{
                color: "var(--off-white)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.025em",
                lineHeight: 1,
                marginBottom: "1rem",
              }}
            >
              O Que Você Vai{" "}
              <span style={{ color: "var(--gold-light)" }}>Aprender</span>
            </h2>
            <p
              className="font-sans"
              style={{
                color: "rgba(244, 239, 228, 0.7)",
                fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                fontWeight: 300,
                lineHeight: 1.65,
                maxWidth: "580px",
                margin: "0 auto 1.5rem",
              }}
            >
              {courseInfo.totalModules} módulos práticos com base científica,
              desenvolvidos pela equipe do Haras Nossa Senhora Aparecida.
            </p>

            {/* Course Stats */}
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(196, 169, 110, 0.1)",
                border: "1px solid rgba(196, 169, 110, 0.2)",
                padding: "0.9rem 2rem",
                borderRadius: "40px",
              }}
            >
              {[
                { value: courseInfo.totalModules, label: "Módulos" },
                { value: courseInfo.totalHours, label: "de Conteúdo" },
                { value: "Vitalício", label: "Acesso" },
                { value: "Certificado", label: "Inclusso" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 900,
                      fontSize: "1.05rem",
                      color: "var(--gold-light)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(244,239,228,0.55)",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Accordion Modules */}
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {courseModules.map((mod, i) => {
            const isOpen = openModule === mod.id;
            return (
              <SectionReveal
                key={mod.id}
                delay={(i % 5) as 0 | 1 | 2 | 3 | 4}
                type="up"
              >
                <div
                  style={{
                    backgroundColor: isOpen
                      ? "rgba(196, 169, 110, 0.08)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isOpen ? "rgba(196, 169, 110, 0.4)" : "rgba(196, 169, 110, 0.15)"}`,
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                >
                  <button
                    onClick={() => toggle(mod.id)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 3vw, 1.75rem)",
                      cursor: "pointer",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    {/* Module number badge */}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        color: "var(--gold-light)",
                        backgroundColor: "rgba(196, 169, 110, 0.12)",
                        border: "1px solid rgba(196, 169, 110, 0.3)",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "20px",
                        flexShrink: 0,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Módulo {mod.number}
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span
                        className="font-sans"
                        style={{
                          color: "var(--off-white)",
                          fontWeight: 700,
                          fontSize: "clamp(0.88rem, 1.2vw, 1.05rem)",
                          display: "block",
                        }}
                      >
                        {mod.title}
                      </span>
                      {!isOpen && (
                        <span
                          className="font-sans"
                          style={{
                            color: "rgba(244,239,228,0.5)",
                            fontWeight: 300,
                            fontSize: "0.78rem",
                            display: "block",
                            marginTop: "0.2rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {mod.description}
                        </span>
                      )}
                    </div>

                    {/* Chevron */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--gold-light)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 clamp(1.25rem, 3vw, 1.75rem) clamp(1.25rem, 3vw, 1.75rem)",
                        borderTop: "1px solid rgba(196, 169, 110, 0.15)",
                      }}
                    >
                      <p
                        className="font-sans"
                        style={{
                          color: "rgba(244,239,228,0.75)",
                          fontSize: "clamp(0.82rem, 1vw, 0.92rem)",
                          fontWeight: 300,
                          lineHeight: 1.7,
                          margin: "1rem 0 1.25rem",
                        }}
                      >
                        {mod.description}
                      </p>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                          gap: "0.5rem",
                        }}
                      >
                        {mod.topics.map((topic, ti) => (
                          <div
                            key={ti}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.5rem",
                              fontSize: "0.82rem",
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="var(--gold)"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                              style={{ flexShrink: 0, marginTop: "2px" }}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span
                              className="font-sans"
                              style={{
                                color: "var(--off-white)",
                                fontWeight: 300,
                                lineHeight: 1.5,
                              }}
                            >
                              {topic}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* CTA below curriculum */}
        <SectionReveal type="up">
          <div
            style={{
              textAlign: "center",
              marginTop: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            <a
              href="#inscreva-se"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink)",
                backgroundColor: "var(--off-white)",
                padding: "1rem 2.5rem",
                borderRadius: "4px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                transition: "all 0.25s ease",
                textDecoration: "none",
              }}
              className="hover:scale-105"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              QUERO ME INSCREVER
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
