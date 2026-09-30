"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { featuredPaths } from "@/data/paths";

export default function FeaturedPaths() {
  const paths = featuredPaths.slice(0, 3);

  return (
    <section className="section-gap" style={{ backgroundColor: "var(--ink)", position: "relative" }}>
      <div className="container">
        {/* Header da seção */}
        <SectionReveal type="up">
          <div style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="text-label font-sans" style={{ color: "var(--gold)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                EXPLORAÇÃO & CONHECIMENTO
              </span>
              <h2 className="font-serif text-heading" style={{ color: "var(--off-white)" }}>
                Três Caminhos
              </h2>
            </div>

            {/* Aviso Arraste (exibido apenas em telas menores) */}
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

        {/* Catalog Container — Horizontal scroll no mobile, Grid 3 colunas no desktop */}
        <div className="paths-catalog-wrapper">
          {paths.map((path, index) => (
            <SectionReveal key={path.id || index} delay={(index % 4) as 0 | 1 | 2 | 3 | 4} className="path-card-reveal">
              <Link 
                href={path.href}
                className="featured-path-card"
                style={{
                  display: "block",
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  textDecoration: "none",
                  border: "1px solid rgba(157, 132, 82, 0.2)",
                  borderRadius: "2px",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image 
                    src={path.image} 
                    alt={path.imageAlt}
                    fill
                    sizes="(max-width: 768px) 80vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    className="path-image"
                  />
                  
                  {/* Overlay gradiente cinematográfico */}
                  <div 
                    style={{ 
                      position: "absolute", 
                      inset: 0, 
                      background: "linear-gradient(to top, rgba(13, 12, 10, 0.95) 0%, rgba(13, 12, 10, 0.4) 50%, rgba(13, 12, 10, 0.15) 100%)",
                      transition: "background 0.5s ease" 
                    }} 
                    className="path-overlay"
                  />

                  {/* Conteúdo do Card */}
                  <div style={{ 
                    position: "absolute", 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    padding: "clamp(1.25rem, 3vw, 2rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem"
                  }}>
                    <span style={{ 
                      fontFamily: "'Inter', sans-serif", 
                      fontSize: "0.6rem", 
                      letterSpacing: "0.2em", 
                      color: "var(--gold-light)", 
                      textTransform: "uppercase" 
                    }}>
                      PORTAL 0{index + 1}
                    </span>

                    <h3 className="font-serif" style={{ color: "var(--off-white)", fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", margin: 0, fontWeight: 400 }}>
                      {path.title}
                    </h3>

                    <p className="font-sans" style={{ color: "rgba(244, 239, 228, 0.75)", fontSize: "0.8rem", fontWeight: 300, lineHeight: 1.5, margin: "0.2rem 0 0.5rem 0" }}>
                      {path.description}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold-light)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
                      <span>Explorar</span>
                      <span aria-hidden="true" style={{ transition: "transform 0.3s ease" }} className="arrow-icon">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {/* Estilos CSS do catálogo horizontal mobile / grid desktop */}
        <style dangerouslySetInnerHTML={{__html: `
          .paths-catalog-wrapper {
            display: flex;
            gap: 1.25rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.75rem;
            scrollbar-width: none;
          }
          .paths-catalog-wrapper::-webkit-scrollbar { display: none; }
          .path-card-reveal {
            flex: 0 0 82%;
            scroll-snap-align: start;
            min-width: 0;
          }
          @media (min-width: 768px) {
            .paths-catalog-wrapper {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 2rem;
              overflow-x: visible;
              padding-bottom: 0;
            }
            .path-card-reveal {
              flex: unset;
            }
          }
          .featured-path-card .path-image { transform: scale(1); }
          .featured-path-card:hover .path-image { transform: scale(1.06); }
          .featured-path-card:hover .path-overlay { background: linear-gradient(to top, rgba(13, 12, 10, 0.98) 0%, rgba(13, 12, 10, 0.5) 60%, rgba(13, 12, 10, 0.25) 100%); }
          .featured-path-card:hover .arrow-icon { transform: translateX(4px); }
        `}} />
      </div>
    </section>
  );
}

