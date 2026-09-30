"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { BrandIconPlaceholder } from "@/components/ui/BrandIconPlaceholder";
import { featuredPaths } from "@/data/paths";

export default function FeaturedPaths() {
  const paths = featuredPaths.slice(0, 3);

  return (
    <section className="section-gap" style={{ backgroundColor: "var(--ink)", position: "relative" }}>
      <div className="container">
        {/* Header da seção Centralizado */}
        <SectionReveal type="up">
          <div
            style={{
              marginBottom: "clamp(2rem, 5vw, 3.5rem)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
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
              CATEGORIAS DE CONTEÚDO
            </span>

            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "var(--off-white)",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 4.5vw, 3.2rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                margin: "0.1rem 0",
                whiteSpace: "nowrap",
              }}
            >
              Pilares do Conhecimento
            </h2>
          </div>
        </SectionReveal>

        {/* Grid de 3 Cards Lado a Lado (Sem Imagens de Fundo) */}
        <div className="paths-grid-container">
          {paths.map((path, index) => (
            <SectionReveal key={path.id || index} delay={(index % 4) as 0 | 1 | 2 | 3 | 4}>
              <Link 
                href={path.href}
                className="path-text-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  minHeight: "220px",
                  position: "relative",
                  borderRadius: "8px",
                  border: "1px solid rgba(196, 169, 110, 0.25)",
                  backgroundColor: "rgba(18, 16, 13, 0.95)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  textDecoration: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
                  transition: "all 0.35s ease",
                  padding: "1.5rem 1.25rem",
                }}
              >
                {/* Header do Card (Badge + Ícone) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: "var(--gold-light)",
                      backgroundColor: "rgba(196,169,110,0.12)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "4px",
                      border: "1px solid rgba(196,169,110,0.3)",
                      textTransform: "uppercase",
                    }}
                  >
                    PILAR 0{index + 1}
                  </span>

                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid rgba(196, 169, 110, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(13,12,10,0.6)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                  </div>
                </div>

                {/* Conteúdo Principal do Card */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    flex: 1,
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
                    PORTAL DE CONHECIMENTO
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
                      fontWeight: 900,
                      lineHeight: 1.2,
                      color: "var(--off-white)",
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {path.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 400,
                      color: "rgba(244,239,228,0.8)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {path.description}
                  </p>
                </div>

                {/* Rodapé / Link Explorar */}
                <div
                  style={{
                    marginTop: "1.25rem",
                    paddingTop: "0.85rem",
                    borderTop: "1px solid rgba(196, 169, 110, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    color: "var(--gold-light)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>EXPLORAR</span>
                  <span className="arrow-icon" style={{ transition: "transform 0.3s ease" }}>&rarr;</span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {/* Estilos CSS do Grid Lado a Lado (3 Colunas) */}
        <style dangerouslySetInnerHTML={{__html: `
          .paths-grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
          @media (max-width: 767px) {
            .paths-grid-container {
              grid-template-columns: repeat(1, 1fr);
              gap: 1rem;
            }
          }
          .path-text-card:hover {
            border-color: var(--gold-light) !important;
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.85) !important;
            background-color: rgba(26, 22, 18, 0.98) !important;
          }
          .path-text-card:hover .arrow-icon {
            transform: translateX(4px);
          }
        `}} />
      </div>
    </section>
  );
}
