"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { NetflixLoginModal } from "@/components/ui/NetflixLoginModal";

export default function WantToLearnCTA() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"anual" | "mensal">("anual");

  return (
    <>
      <section
        id="quero-aprender"
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "var(--ink)",
          overflow: "hidden",
          color: "var(--off-white)",
          paddingTop: "clamp(5rem, 12vh, 10rem)",
          paddingBottom: "clamp(5rem, 12vh, 10rem)",
        }}
      >
        {/* Ambient Lighting & Particle Background Glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 50% 30%, rgba(196, 169, 110, 0.18) 0%, transparent 60%),
              radial-gradient(circle at 80% 80%, rgba(157, 132, 82, 0.12) 0%, transparent 50%),
              linear-gradient(to bottom, var(--ink) 0%, rgba(13,12,10,0.92) 50%, var(--ink) 100%)
            `,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Brand Emblem Background Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.04,
            pointerEvents: "none",
            zIndex: 0,
            userSelect: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(20rem, 45vw, 40rem)",
              fontWeight: 900,
              color: "var(--gold)",
            }}
          >
            M
          </span>
        </div>

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1140px",
            margin: "0 auto",
          }}
        >
          <SectionReveal type="up">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1.5rem",
              }}
            >
              {/* Badge de Destaque Cinematográfico */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  backgroundColor: "rgba(196, 169, 110, 0.12)",
                  border: "1px solid rgba(196, 169, 110, 0.3)",
                  padding: "0.4rem 1.1rem",
                  borderRadius: "30px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--gold-light)" }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--gold-light)",
                  }}
                >
                  ACESSO ILIMITADO • PLATAFORMA MUNDO DOS CAVALOS
                </span>
              </div>

              {/* Título Gigante de Cinema */}
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(2.2rem, 5.5vw, 4.6rem)",
                  fontWeight: 900,
                  color: "var(--off-white)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.02,
                  margin: "0.5rem 0",
                  textTransform: "uppercase",
                  maxWidth: "920px",
                  textShadow: "0 4px 30px rgba(0,0,0,0.9)",
                }}
              >
                Quero Transformar <br />
                <span style={{ color: "var(--gold-light)" }}>Meu Manejo</span>
              </h2>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)",
                  color: "rgba(244, 239, 228, 0.85)",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: "680px",
                  margin: "0 0 1.5rem 0",
                }}
              >
                Aprenda a rotina real, a ciência e o respeito equino aplicados no Haras Nossa Senhora Aparecida. Assista onde e quando quiser.
              </p>

              {/* CARD CONTAINER GLASSMORPHISM COM OS PLANOS DE ASSINATURA */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "960px",
                  backgroundColor: "rgba(18, 16, 13, 0.88)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(196, 169, 110, 0.35)",
                  borderRadius: "12px",
                  padding: "clamp(1.5rem, 4vw, 3rem)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.95), inset 0 0 40px rgba(196,169,110,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2.5rem",
                }}
              >
                {/* GRID DOS DOIS PLANOS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem",
                    alignItems: "stretch",
                  }}
                >
                  {/* PLANO 1: ANUAL (DESTAQUE RECOMENDADO) */}
                  <div
                    onClick={() => setSelectedPlan("anual")}
                    style={{
                      position: "relative",
                      backgroundColor: selectedPlan === "anual" ? "rgba(32, 27, 20, 0.9)" : "rgba(13, 12, 10, 0.6)",
                      border: selectedPlan === "anual" ? "2px solid var(--gold-light)" : "1px solid rgba(196, 169, 110, 0.2)",
                      borderRadius: "8px",
                      padding: "1.8rem 1.5rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: selectedPlan === "anual" ? "0 10px 30px rgba(196, 169, 110, 0.2)" : "none",
                    }}
                  >
                    {/* Badge Mais Escolhido */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-14px",
                        right: "1.5rem",
                        backgroundColor: "var(--gold-light)",
                        color: "var(--ink)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 800,
                        letterSpacing: "0.15em",
                        padding: "0.35rem 0.85rem",
                        borderRadius: "20px",
                        textTransform: "uppercase",
                      }}
                    >
                      MAIS POPULAR • ECONOMIZE 40%
                    </div>

                    <div>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold-light)", textTransform: "uppercase" }}>
                        PLANO COMPLETO ANUAL
                      </span>
                      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--off-white)", margin: "0.3rem 0 1rem 0" }}>
                        Passe Livre Total
                      </h3>

                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "1.25rem" }}>
                        <span style={{ fontSize: "0.9rem", color: "rgba(244,239,228,0.7)" }}>12x de</span>
                        <span style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--off-white)", lineHeight: 1 }}>R$ 49,90</span>
                        <span style={{ fontSize: "0.8rem", color: "rgba(244,239,228,0.6)" }}>/mês</span>
                      </div>

                      {/* Benefícios */}
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--off-white)" }}>
                          <span style={{ color: "var(--gold-light)", fontWeight: 800 }}>✓</span> Acesso completo aos 4 módulos práticos
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--off-white)" }}>
                          <span style={{ color: "var(--gold-light)", fontWeight: 800 }}>✓</span> Certificado Oficial de Conclusão
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--off-white)" }}>
                          <span style={{ color: "var(--gold-light)", fontWeight: 800 }}>✓</span> Suporte técnico & Material em PDF
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* PLANO 2: MENSAL */}
                  <div
                    onClick={() => setSelectedPlan("mensal")}
                    style={{
                      position: "relative",
                      backgroundColor: selectedPlan === "mensal" ? "rgba(32, 27, 20, 0.9)" : "rgba(13, 12, 10, 0.6)",
                      border: selectedPlan === "mensal" ? "2px solid var(--gold-light)" : "1px solid rgba(196, 169, 110, 0.2)",
                      borderRadius: "8px",
                      padding: "1.8rem 1.5rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(244,239,228,0.6)", textTransform: "uppercase" }}>
                        PLANO FLEXÍVEL MENSAL
                      </span>
                      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--off-white)", margin: "0.3rem 0 1rem 0" }}>
                        Acesso Mês a Mês
                      </h3>

                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "1.25rem" }}>
                        <span style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--off-white)", lineHeight: 1 }}>R$ 79,90</span>
                        <span style={{ fontSize: "0.8rem", color: "rgba(244,239,228,0.6)" }}>/mês</span>
                      </div>

                      {/* Benefícios */}
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "rgba(244,239,228,0.85)" }}>
                          <span style={{ color: "var(--gold)", fontWeight: 800 }}>✓</span> Cancele a qualquer momento sem multa
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "rgba(244,239,228,0.85)" }}>
                          <span style={{ color: "var(--gold)", fontWeight: 800 }}>✓</span> Todos os vídeos em qualidade HD/4K
                        </li>
                        <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "rgba(244,239,228,0.85)" }}>
                          <span style={{ color: "var(--gold)", fontWeight: 800 }}>✓</span> Assista pelo Celular, TV ou Tablet
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* BOTÃO PRINCIPAL DE ASSINATURA CINEMATOGRÁFICO */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    style={{
                      width: "100%",
                      maxWidth: "480px",
                      padding: "1.2rem 2.5rem",
                      backgroundColor: "var(--off-white)",
                      color: "var(--ink)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 900,
                      fontSize: "0.95rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 10px 35px rgba(0, 0, 0, 0.7)",
                      transition: "all 0.3s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.75rem",
                    }}
                    className="hover:scale-103"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>COMEÇAR MINHA TRANSFORMAÇÃO AGORA</span>
                  </button>

                  {/* GARANTIA & CONFIANÇA */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1.5rem",
                      fontSize: "0.75rem",
                      color: "rgba(244,239,228,0.7)",
                      marginTop: "0.5rem",
                    }}
                  >
                    <span>🛡️ <strong>7 Dias de Garantia</strong> Incondicional</span>
                    <span>⚡ Liberação <strong>Imediata</strong></span>
                    <span>🔒 Pagamento <strong>100% Seguro</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Modal de Entrada Cinematográfica */}
      <NetflixLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
