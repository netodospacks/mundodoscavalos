"use client";

import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";

export default function PlatformPurpose() {
  return (
    <section className="section-gap" style={{ backgroundColor: "var(--cream-deep)", position: "relative" }}>
      <div className="container">
        <SectionReveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
            
            {/* LEFT Column (Text) */}
            <div style={{ flex: "1 1 500px", minWidth: 0, width: "100%" }}>
              <span className="text-label font-sans" style={{ color: "var(--gold)", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
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
              
              <Link href="/nossa-historia" className="font-sans" style={{ color: "var(--earth-1)", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <span>Nossa história completa</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* RIGHT Column (Image) */}
            <div style={{ flex: "1 1 400px", minWidth: 0, width: "100%", position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: "2px" }}>
              <Image 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80"
                alt="Equipe do Mundo dos Cavalos"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
              <div style={{ 
                position: "absolute", 
                bottom: 0, 
                left: 0, 
                width: "100%", 
                height: "30%", 
                background: "linear-gradient(to bottom, transparent, var(--cream-deep))" 
              }}></div>
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

