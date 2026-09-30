"use client";

import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { BrandIconPlaceholder } from "@/components/ui/BrandIconPlaceholder";

export default function PlatformPurpose() {
  return (
    <section
      id="a-plataforma"
      className="section-gap"
      style={{
        backgroundColor: "var(--cream-deep)",
        position: "relative",
        paddingTop: "clamp(6rem, 10vh, 9rem)",
        overflow: "hidden",
      }}
    >
      {/* Transição em degradê suave que elimina o corte/linha com o fundo escuro do topo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(140px, 20vh, 240px)",
          background: "linear-gradient(to bottom, var(--ink) 0%, rgba(13, 12, 10, 0.9) 25%, rgba(40, 34, 26, 0.6) 55%, rgba(244, 239, 228, 0.25) 85%, var(--cream-deep) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <SectionReveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
            
            {/* LEFT Column (Text) */}
            <div style={{ flex: "1 1 500px", minWidth: 0, width: "100%" }}>
              <span className="text-label font-sans" style={{ color: "var(--earth-1)", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.14em", fontWeight: 700 }}>
                A Plataforma
              </span>
              
              <h2 className="text-display-md font-serif" style={{ color: "var(--text-dark)", marginTop: "1rem", marginBottom: "1.5rem" }}>
                Por que o Mundo dos Cavalos existe?
              </h2>
              
              <div className="divider-gold" style={{ width: "48px", height: "1px", backgroundColor: "var(--gold)", marginBottom: "2rem" }}></div>
              
              <p className="text-body font-sans" style={{ color: "var(--text-mid-light)", fontWeight: 300, lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Levar conhecimento prático e responsável para quem deseja compreender melhor os cavalos, seu manejo, sua saúde, sua alimentação e seu bem-estar. Não apenas como tradição — mas como ciência aplicada com respeito ao animal.
              </p>
              
              <p className="text-body font-sans" style={{ color: "var(--text-mid-light)", fontWeight: 300, lineHeight: 1.8, marginBottom: "2rem" }}>
                Esta plataforma nasceu da experiência real com equinos, do Haras Nossa Senhora Aparecida, e do desejo de compartilhar esse conhecimento de forma acessível, séria e profissional.
              </p>
              
              <Link href="/nossa-historia" className="font-sans" style={{ color: "var(--earth-1)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <span>Nossa história completa</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* RIGHT Column (Brand Icon Placeholder) */}
            <div style={{ flex: "1 1 400px", minWidth: 0, width: "100%", position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "2px" }}>
              <BrandIconPlaceholder label="HARAS NS APARECIDA" aspectRatio="4/5" />
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
