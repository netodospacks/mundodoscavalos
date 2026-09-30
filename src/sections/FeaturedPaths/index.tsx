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

        {/* Grid de Capas Verticais (Posters 2:3 Idênticos aos Módulos e ao Hero) */}
        <div className="paths-grid-container">
          {paths.map((path, index) => (
            <SectionReveal key={path.id || index} delay={(index % 4) as 0 | 1 | 2 | 3 | 4}>
              <Link 
                href={path.href}
                className="path-poster-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  aspectRatio: "2/3",
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid rgba(196, 169, 110, 0.3)",
                  backgroundColor: "#151310",
                  textDecoration: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.65)",
                  transition: "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  padding: "1rem",
                }}
              >
                {/* Layer 1: Imagem de Fundo em HD */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${path.image})`,
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

                {/* Layer 3 Top: Emblema Portal + Ícone */}
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
                    PILAR 0{index + 1}
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
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                  </div>
                </div>

                {/* Layer 3 Bottom: Título e Descrição com Fonte Inter */}
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
                      fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
                      fontWeight: 800,
                      lineHeight: 1.2,
                      color: "var(--off-white)",
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {path.title}
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
                    {path.description}
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
                    <span>EXPLORAR</span>
                    <span className="arrow-icon" style={{ transition: "transform 0.3s ease" }}>&rarr;</span>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {/* Estilos CSS do Grid de Posters */}
        <style dangerouslySetInnerHTML={{__html: `
          .paths-grid-container {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1.25rem;
          }
          @media (min-width: 640px) {
            .paths-grid-container {
              grid-template-columns: repeat(3, 1fr);
              gap: 1.5rem;
            }
          }
          .path-poster-card:hover {
            border-color: var(--gold-light) !important;
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 15px 35px rgba(0,0,0,0.85) !important;
          }
          .path-poster-card:hover .poster-bg-image {
            transform: scale(1.08);
            opacity: 0.85 !important;
          }
          .path-poster-card:hover .arrow-icon {
            transform: translateX(4px);
          }
        `}} />
      </div>
    </section>
  );
}
