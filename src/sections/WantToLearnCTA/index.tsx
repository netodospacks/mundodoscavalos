"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { NetflixLoginModal } from "@/components/ui/NetflixLoginModal";

export default function WantToLearnCTA() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Estado preparado para receber a contagem real de vendas do banco de dados/API
  // Valor de 0 a 100 (ex: 24 vendas realizadas = 24% preenchido)
  const [salesCount] = useState<number>(24);
  const maxCapacity = 100;
  const progressPercentage = Math.min(Math.max((salesCount / maxCapacity) * 100, 0), 100);

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
          paddingTop: "clamp(4rem, 10vh, 7rem)",
          paddingBottom: "clamp(4rem, 10vh, 7rem)",
        }}
      >
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 50% 40%, rgba(196, 169, 110, 0.12) 0%, transparent 60%),
              linear-gradient(to bottom, var(--ink) 0%, rgba(13,12,10,0.95) 50%, var(--ink) 100%)
            `,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "860px",
            margin: "0 auto",
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
          }}
        >
          <SectionReveal type="up">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1.25rem",
              }}
            >
              {/* Badge Minimalista */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "rgba(196, 169, 110, 0.1)",
                  border: "1px solid rgba(196, 169, 110, 0.25)",
                  padding: "0.35rem 0.9rem",
                  borderRadius: "20px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--gold-light)" }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold-light)",
                  }}
                >
                  PLATAFORMA MUNDO DOS CAVALOS • ACESSO VITALÍCIO
                </span>
              </div>

              {/* Título de Cinema Elegante */}
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                  fontWeight: 900,
                  color: "var(--off-white)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  margin: "0.25rem 0",
                  textTransform: "uppercase",
                  textShadow: "0 4px 25px rgba(0,0,0,0.8)",
                }}
              >
                Quero Transformar <br />
                <span style={{ color: "var(--gold-light)" }}>Meu Manejo</span>
              </h2>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                  color: "rgba(244, 239, 228, 0.8)",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: "600px",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Acesse o conhecimento prático e a ciência equina do Haras Nossa Senhora Aparecida. Assista de onde quiser com acesso para sempre.
              </p>

              {/* CARD CONTAINER ESTILO STREAMING PLATFORM */}
              <div
                style={{
                  width: "100%",
                  backgroundColor: "rgba(18, 16, 13, 0.95)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(196, 169, 110, 0.3)",
                  borderRadius: "8px",
                  padding: "clamp(1.5rem, 3.5vw, 2.5rem)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.9)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.75rem",
                  textAlign: "center",
                }}
              >
                {/* 1. PREÇO CLEAN & SEM MENSALIDADES */}
                <div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      color: "var(--gold-light)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    PLANO ÚNICO VITALÍCIO • PAGAMENTO ÚNICO
                  </span>

                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontSize: "1rem", color: "rgba(244,239,228,0.65)", fontWeight: 500 }}>12x de</span>
                    <span style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.4rem)", fontWeight: 900, color: "var(--off-white)", lineHeight: 1, letterSpacing: "-0.02em" }}>R$ 49,90</span>
                  </div>
                  <span style={{ fontSize: "0.82rem", color: "rgba(244,239,228,0.75)", fontWeight: 500, display: "block" }}>
                    ou R$ 497,00 à vista • Sem mensalidades ou taxas de renovação
                  </span>
                </div>

                {/* 2. RECURSOS DO PLANO */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "0.75rem",
                    textAlign: "left",
                    padding: "1.25rem",
                    backgroundColor: "rgba(13, 12, 10, 0.6)",
                    borderRadius: "6px",
                    border: "1px solid rgba(196, 169, 110, 0.15)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--off-white)" }}>
                    <span style={{ color: "var(--gold-light)", fontWeight: 800 }}>✓</span> Acesso vitalício aos 10 Módulos Iniciais
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--off-white)" }}>
                    <span style={{ color: "var(--gold-light)", fontWeight: 800 }}>✓</span> Novos Módulos adicionados 100% Grátis
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--off-white)" }}>
                    <span style={{ color: "var(--gold-light)", fontWeight: 800 }}>✓</span> Certificado Oficial de Conclusão
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--off-white)" }}>
                    <span style={{ color: "var(--gold-light)", fontWeight: 800 }}>✓</span> Web, Smart TV e App Android dedicado
                  </div>
                </div>

                {/* 3. BARRA DE PROGRESSO DE VENDAS COMPACTA (0 A 100) */}
                <div
                  style={{
                    textAlign: "left",
                    backgroundColor: "rgba(13, 12, 10, 0.6)",
                    padding: "1rem 1.25rem",
                    borderRadius: "6px",
                    border: "1px solid rgba(196, 169, 110, 0.15)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--gold-light)", textTransform: "uppercase" }}>
                      VAGAS PREENCHIDAS (LOTE VITALÍCIO 0-100)
                    </span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--off-white)" }}>
                      {salesCount} / {maxCapacity} Vagas ({progressPercentage.toFixed(0)}%)
                    </span>
                  </div>

                  {/* Barra Visual */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progressPercentage}%`,
                        background: "linear-gradient(90deg, #856a33 0%, #c4a96e 50%, #fff2d0 100%)",
                        borderRadius: "6px",
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                  <span style={{ display: "block", fontSize: "0.65rem", color: "rgba(244,239,228,0.5)", marginTop: "0.4rem" }}>
                    * {maxCapacity - salesCount} vagas restantes com este valor promocional vitalício.
                  </span>
                </div>

                {/* BOTÃO PRINCIPAL STREAMING */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem" }}>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    style={{
                      width: "100%",
                      maxWidth: "460px",
                      padding: "1.1rem 2rem",
                      backgroundColor: "var(--off-white)",
                      color: "var(--ink)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 900,
                      fontSize: "0.85rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.6)",
                      transition: "all 0.25s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                    }}
                    className="hover:scale-102"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>GARANTIR ACESSO VITALÍCIO AGORA</span>
                  </button>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1.25rem",
                      fontSize: "0.72rem",
                      color: "rgba(244,239,228,0.65)",
                    }}
                  >
                    <span>🛡️ 7 Dias de Garantia</span>
                    <span>⚡ Liberação Imediata</span>
                    <span>🔒 Pagamento Seguro</span>
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
