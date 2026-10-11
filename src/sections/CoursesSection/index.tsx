"use client";

import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { cursoTratadoresData } from "@/data/cursoTratadores";

interface CoursesSectionProps {
  showOnlineNotice?: boolean;
}

export default function CoursesSection({ showOnlineNotice = false }: CoursesSectionProps) {
  return (
    <section
      id="cursos"
      style={{
        backgroundColor: "#f7f5f0",
        position: "relative",
        paddingTop: "clamp(4.5rem, 8vw, 7rem)",
        paddingBottom: "clamp(4.5rem, 8vw, 7rem)",
        color: "#1d1914",
      }}
    >
      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Cabeçalho da Seção de Cursos */}
        <SectionReveal type="up">
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8c6e3d",
                display: "block",
                marginBottom: "0.65rem",
              }}
            >
              FORMAÇÃO & CAPACITAÇÃO EQUINA
            </span>

            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 600,
                color: "#1f1a14",
                lineHeight: 1.15,
                margin: "0 auto 1rem",
                letterSpacing: "-0.01em",
              }}
            >
              Cursos Mundo dos Cavalos
            </h2>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                color: "#5f564a",
                maxWidth: "640px",
                margin: "0 auto",
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              Conhecimento técnico fundamentado na rotina real do Haras Nossa Senhora Aparecida,
              aliando ciência, manejo e respeito ao animal.
            </p>
          </div>
        </SectionReveal>

        {/* ── CARD PRINCIPAL: CAPACITAÇÃO DE TRATADORES DE EQUINOS (PRESENCIAL) ── */}
        <SectionReveal type="up">
          <div style={{ marginBottom: showOnlineNotice ? "clamp(3rem, 6vw, 4.5rem)" : "0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#8c6e3d",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#8c6e3d",
                  }}
                >
                  CURSO EM DESTAQUE
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#5f564a",
                }}
              >
                Modalidade: Presencial • Vagas limitadas por turma
              </span>
            </div>

            {/* Card Destaque Premium */}
            <div
              className="featured-course-card"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid rgba(140, 110, 61, 0.2)",
                boxShadow: "0 18px 45px rgba(31, 26, 20, 0.08)",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
                transition: "all 0.35s ease",
              }}
            >
              {/* Coluna da Imagem Protagonista */}
              <div
                style={{
                  position: "relative",
                  minHeight: "360px",
                  overflow: "hidden",
                  backgroundColor: "#1f1a14",
                }}
              >
                <img
                  src="/images/hero-bg.jpg"
                  alt="Cavalos e rotina de manejo no Haras Nossa Senhora Aparecida"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.6s ease",
                  }}
                  className="featured-course-img"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(13, 12, 10, 0.7) 0%, rgba(13, 12, 10, 0.15) 50%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Badges sobre a foto */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    left: "1.25rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#8c6e3d",
                      color: "#ffffff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "0.35rem 0.85rem",
                      borderRadius: "100px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                    }}
                  >
                    FORMAÇÃO PRESENCIAL
                  </span>
                  <span
                    style={{
                      backgroundColor: "rgba(13, 12, 10, 0.75)",
                      color: "#f7f5f0",
                      backdropFilter: "blur(8px)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      padding: "0.35rem 0.85rem",
                      borderRadius: "100px",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    Haras Nossa Senhora Aparecida
                  </span>
                </div>

                {/* Informação na base da foto */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1.25rem",
                    left: "1.25rem",
                    right: "1.25rem",
                    color: "#f7f5f0",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: "#e6d5b8",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Instrutora Oficial
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                    }}
                  >
                    Pollyanna Santiago Carrazzoni • Zootecnista (UFPB)
                  </span>
                </div>
              </div>

              {/* Coluna do Conteúdo / Copy */}
              <div
                style={{
                  padding: "clamp(1.75rem, 4vw, 3rem)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#ffffff",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      color: "#8c6e3d",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>MODALIDADE: PRESENCIAL</span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
                      fontWeight: 600,
                      color: "#1f1a14",
                      lineHeight: 1.18,
                      margin: "0 0 1rem 0",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Curso de Capacitação de Tratadores de Equinos
                  </h3>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.95rem",
                      color: "#4a4135",
                      lineHeight: 1.65,
                      margin: "0 0 1.5rem 0",
                      fontWeight: 400,
                    }}
                  >
                    Aprenda fundamentos essenciais de manejo, alimentação, higiene,
                    controle de parasitas e avaliação de equinos.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "0.65rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    {[
                      "8 tópicos programáticos completos",
                      "Prática real em ambiente de haras",
                      "Prevenção sanitária e arraçoamento",
                      "Avaliação e observação de equinos",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.8rem",
                          color: "#5f564a",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8c6e3d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preço e Botão Principal */}
                <div
                  style={{
                    borderTop: "1px solid rgba(140, 110, 61, 0.15)",
                    paddingTop: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1.25rem",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.68rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#7a6e5e",
                        fontWeight: 600,
                        marginBottom: "0.2rem",
                      }}
                    >
                      Investimento na capacitação
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
                        fontWeight: 800,
                        color: "#1f1a14",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      R$ 1.200,00
                    </span>
                  </div>

                  <Link
                    href="/cursos/capacitacao-tratadores-equinos"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      backgroundColor: "#1f1a14",
                      color: "#f7f5f0",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "0.95rem 1.85rem",
                      borderRadius: "6px",
                      textDecoration: "none",
                      boxShadow: "0 6px 20px rgba(31, 26, 20, 0.2)",
                      transition: "all 0.25s ease",
                    }}
                    className="btn-conhecer-curso"
                  >
                    <span>CONHECER CURSO</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ── 2. SEÇÃO DE CURSOS ONLINE: EM BREVE (Exibida somente quando solicitada na aba/área Cursos) ── */}
        {showOnlineNotice && (
          <SectionReveal type="up">
            <div
              id="cursos-online"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid rgba(140, 110, 61, 0.15)",
                padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(31, 26, 20, 0.04)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(140, 110, 61, 0.05) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 2, maxWidth: "680px", margin: "0 auto" }}>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#f2ece1",
                    color: "#8c6e3d",
                    border: "1px solid rgba(140, 110, 61, 0.25)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "0.35rem 0.95rem",
                    borderRadius: "100px",
                    marginBottom: "1rem",
                  }}
                >
                  CURSOS ONLINE
                </span>

                <h3
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    fontWeight: 600,
                    color: "#1f1a14",
                    marginBottom: "0.5rem",
                  }}
                >
                  Em breve
                </h3>

                <p
                  className="font-sans"
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                    color: "#5f564a",
                    lineHeight: 1.7,
                    margin: "0 auto 1.5rem",
                    fontWeight: 400,
                  }}
                >
                  “Estamos preparando novos conteúdos para ampliar seus conhecimentos sobre o universo
                  dos cavalos. Em breve, novas oportunidades de aprendizado estarão disponíveis.”
                </p>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#8c6e3d",
                    fontSize: "0.8rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    backgroundColor: "rgba(140, 110, 61, 0.08)",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "100px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#8c6e3d",
                    }}
                  />
                  <span>Produção em andamento pelo Haras Nossa Senhora Aparecida</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .featured-course-card:hover {
          box-shadow: 0 24px 60px rgba(31, 26, 20, 0.14) !important;
          border-color: rgba(140, 110, 61, 0.4) !important;
        }
        .featured-course-card:hover .featured-course-img {
          transform: scale(1.03);
        }
        .btn-conhecer-curso:hover {
          background-color: #8c6e3d !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(140, 110, 61, 0.35) !important;
        }
      `}} />
    </section>
  );
}
