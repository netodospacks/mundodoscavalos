"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { featuredPaths } from "@/data/paths";

export default function FeaturedPaths() {
  const paths = featuredPaths.slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScrollPillarSpotlight = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Executa apenas quando a seção de pilares estiver visível na tela
      if (rect.top <= viewportHeight * 0.75 && rect.bottom >= viewportHeight * 0.25) {
        const totalScrollableHeight = rect.height;
        const scrolledIntoSection = viewportHeight * 0.75 - rect.top;
        const progress = Math.min(Math.max(scrolledIntoSection / totalScrollableHeight, 0), 1);

        // Divide a rolagem em 3 fases para acender o Pilar 1 -> Pilar 2 -> Pilar 3
        if (progress < 0.38) {
          setActivePillar(0); // Pilar 1 aceso
        } else if (progress < 0.72) {
          setActivePillar(1); // Pilar 2 aceso
        } else {
          setActivePillar(2); // Pilar 3 aceso
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScrollPillarSpotlight);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScrollPillarSpotlight();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pilares-conhecimento"
      className="section-gap"
      style={{ backgroundColor: "var(--ink)", position: "relative" }}
    >
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

            {/* Badge indicadora do Pilar Ativado no Scroll */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.4rem",
                backgroundColor: "rgba(196, 169, 110, 0.12)",
                border: "1px solid rgba(196, 169, 110, 0.3)",
                padding: "0.25rem 0.75rem",
                borderRadius: "20px",
                fontSize: "0.62rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "var(--gold-light)",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--gold)",
                  boxShadow: "0 0 8px var(--gold)",
                }}
              />
              <span>FOCO ATIVO NO SCROLL: PILAR 0{ (hoveredPillar !== null ? hoveredPillar : activePillar) + 1 }</span>
            </div>
          </div>
        </SectionReveal>

        {/* Grid de 3 Cards Lado a Lado (Com Destaque Sequencial Acende/Apaga no Scroll) */}
        <div className="paths-grid-container">
          {paths.map((path, index) => {
            const isHighlighted = hoveredPillar !== null ? hoveredPillar === index : activePillar === index;

            return (
              <SectionReveal key={path.id || index} delay={(index % 4) as 0 | 1 | 2 | 3 | 4}>
                <Link
                  href={path.href}
                  className={`path-text-card ${isHighlighted ? "pillar-active" : "pillar-dimmed"}`}
                  onMouseEnter={() => setHoveredPillar(index)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    minHeight: "220px",
                    position: "relative",
                    borderRadius: "8px",
                    textDecoration: "none",
                    padding: "1.5rem 1.25rem",
                    transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                    opacity: isHighlighted ? 1 : 0.38,
                    filter: isHighlighted ? "none" : "brightness(0.65) blur(0.3px)",
                    transform: isHighlighted ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(0.98)",
                    border: isHighlighted
                      ? "1px solid rgba(196, 169, 110, 0.95)"
                      : "1px solid rgba(196, 169, 110, 0.15)",
                    backgroundColor: isHighlighted
                      ? "rgba(26, 22, 18, 0.98)"
                      : "rgba(14, 12, 10, 0.75)",
                    boxShadow: isHighlighted
                      ? "0 0 35px rgba(196, 169, 110, 0.35), 0 15px 35px rgba(0,0,0,0.9)"
                      : "0 5px 15px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
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
                        color: isHighlighted ? "var(--ink)" : "var(--gold-light)",
                        backgroundColor: isHighlighted ? "var(--gold-light)" : "rgba(196,169,110,0.12)",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "4px",
                        border: isHighlighted ? "1px solid var(--gold)" : "1px solid rgba(196,169,110,0.3)",
                        textTransform: "uppercase",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isHighlighted ? "✦ ACESO (EM FOCO)" : `PILAR 0${index + 1}`}
                    </span>

                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: isHighlighted ? "1px solid var(--gold-light)" : "1px solid rgba(196, 169, 110, 0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isHighlighted ? "rgba(196,169,110,0.2)" : "rgba(13,12,10,0.6)",
                        boxShadow: isHighlighted ? "0 0 12px rgba(196,169,110,0.6)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
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
                        color: isHighlighted ? "var(--gold-light)" : "var(--gold)",
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
                        color: isHighlighted ? "rgba(244,239,228,0.95)" : "rgba(244,239,228,0.6)",
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
                      borderTop: isHighlighted ? "1px solid rgba(196, 169, 110, 0.4)" : "1px solid rgba(196, 169, 110, 0.15)",
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
                    <span className="arrow-icon" style={{ transform: isHighlighted ? "translateX(6px)" : "none", transition: "transform 0.3s ease" }}>
                      &rarr;
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>

        {/* Estilos CSS do Grid e Transição entre Pilares */}
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
        `}} />
      </div>
    </section>
  );
}
