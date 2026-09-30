"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import { BrandIconPlaceholder } from "@/components/ui/BrandIconPlaceholder";
import { mainFaculty } from "@/data/faculty";

export default function Faculty() {
  return (
    <section id="docente" className="section-gap" style={{ backgroundColor: "var(--ink-soft)", position: "relative" }}>
      <div className="container">
        <SectionReveal type="up">
          {/* Layout responsivo — Mobile: 38% Foto Esquerda / 62% Texto Direita | Desktop: Editorial 42%/58% */}
          <div className="faculty-layout-wrapper">
            
            {/* COLUNA FOTO / ÍCONE DA MARCA (Esquerda) */}
            <div className="faculty-photo-col">
              <div className="faculty-photo-frame">
                <BrandIconPlaceholder label={mainFaculty.name} aspectRatio="3/4" />
              </div>
            </div>

            {/* COLUNA TEXTO (Direita) */}
            <div className="faculty-info-col">
              <span className="text-label font-sans" style={{ color: "var(--gold-light)", textTransform: "uppercase", fontSize: "0.68rem", letterSpacing: "0.15em", display: "block" }}>
                Corpo Docente & Especialista
              </span>
              
              <h2 className="font-serif" style={{ color: "var(--off-white)", fontSize: "clamp(1.5rem, 3.8vw, 3rem)", fontWeight: 400, marginTop: "0.25rem", marginBottom: "0.2rem", lineHeight: 1.15 }}>
                {mainFaculty.name}
              </h2>
              
              <p className="font-sans" style={{ color: "var(--gold-light)", fontSize: "clamp(0.72rem, 1vw, 0.85rem)", letterSpacing: "0.04em", margin: "0 0 1.25rem 0", fontWeight: 400 }}>
                {mainFaculty.title}
              </p>
              
              <div className="divider-gold" style={{ width: "40px", height: "1px", backgroundColor: "var(--gold)", marginBottom: "1.25rem" }} />
              
              {/* Formação */}
              <div style={{ marginBottom: "1.25rem" }}>
                <h3 className="font-sans" style={{ color: "var(--gold)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                  Formação & Especialização
                </h3>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {mainFaculty.formation.map((item, index) => (
                    <li key={index} className="font-sans" style={{ color: "var(--stone-light)", fontWeight: 300, fontSize: "clamp(0.75rem, 0.9vw, 0.88rem)", marginBottom: "0.35rem", display: "flex", lineHeight: 1.4 }}>
                      <span style={{ marginRight: "6px", color: "var(--gold)" }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experiência */}
              <div className="faculty-experience-block" style={{ marginBottom: "1.25rem" }}>
                <h3 className="font-sans" style={{ color: "var(--gold)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                  Experiência Prática
                </h3>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {mainFaculty.experience.map((item, index) => (
                    <li key={index} className="font-sans" style={{ color: "var(--stone-light)", fontWeight: 300, fontSize: "clamp(0.75rem, 0.9vw, 0.88rem)", marginBottom: "0.35rem", display: "flex", lineHeight: 1.4 }}>
                      <span style={{ marginRight: "6px", color: "var(--gold)" }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Citação do Docente */}
              <div style={{ 
                borderLeft: "2px solid rgba(206, 175, 114, 0.4)", 
                paddingLeft: "0.85rem", 
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
                marginTop: "0.75rem" 
              }}>
                <p className="font-sans" style={{ color: "rgba(244, 239, 228, 0.82)", fontWeight: 300, fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
                  "{mainFaculty.bio}"
                </p>
              </div>

            </div>

          </div>
        </SectionReveal>

        {/* Estilos responsivos do Corpo Docente */}
        <style dangerouslySetInnerHTML={{__html: `
          .faculty-layout-wrapper {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            align-items: flex-start;
          }
          .faculty-photo-col {
            flex: 0 0 38%;
            max-width: 38%;
            position: relative;
          }
          .faculty-photo-frame {
            position: relative;
            width: 100%;
            aspect-ratio: 3/4;
            overflow: hidden;
            border-radius: 2px;
            border: 1px solid rgba(157, 132, 82, 0.3);
            box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          }
          .faculty-info-col {
            flex: 0 0 62%;
            max-width: 62%;
            min-width: 0;
          }
          @media (min-width: 768px) {
            .faculty-layout-wrapper {
              gap: 4rem;
              align-items: center;
            }
            .faculty-photo-col {
              flex: 0 0 42%;
              max-width: 42%;
            }
            .faculty-info-col {
              flex: 0 0 58%;
              max-width: 58%;
            }
          }
        `}} />
      </div>
    </section>
  );
}
