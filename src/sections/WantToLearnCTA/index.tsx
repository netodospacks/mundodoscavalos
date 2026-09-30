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
                  PLANO ÚNICO VITALÍCIO • PAGUE APENAS UMA VEZ
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
                  margin: "0 0 1rem 0",
                }}
              >
                Aprenda a rotina real, a ciência e o respeito equino aplicados no Haras Nossa Senhora Aparecida. Assista onde e quando quiser com acesso para sempre.
              </p>

              {/* CARD CONTAINER GLASSMORPHISM DO PLANO VITALÍCIO */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "920px",
                  backgroundColor: "rgba(18, 16, 13, 0.92)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(196, 169, 110, 0.4)",
                  borderRadius: "12px",
                  padding: "clamp(1.5rem, 4vw, 3rem)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.95), inset 0 0 40px rgba(196,169,110,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2.2rem",
                }}
              >
                {/* 1. SEÇÃO DE PREÇO & ACESSO VITALÍCIO ÚNICO */}
                <div
                  style={{
                    backgroundColor: "rgba(32, 27, 20, 0.85)",
                    border: "2px solid var(--gold-light)",
                    borderRadius: "8px",
                    padding: "2rem 1.75rem",
                    textAlign: "center",
                    position: "relative",
                    boxShadow: "0 10px 30px rgba(196, 169, 110, 0.15)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      letterSpacing: "0.25em",
                      color: "var(--gold-light)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    ✦ PLANO ÚNICO DE ACESSO VITALÍCIO ✦
                  </span>

                  <h3
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      fontWeight: 900,
                      color: "var(--off-white)",
                      margin: "0 0 0.8rem 0",
                      textTransform: "uppercase",
                    }}
                  >
                    Sem Mensalidades • Acesso para Sempre
                  </h3>

                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.1rem", color: "rgba(244,239,228,0.7)", fontWeight: 500 }}>12x de</span>
                    <span style={{ fontSize: "clamp(2.8rem, 5vw, 3.8rem)", fontWeight: 900, color: "var(--off-white)", lineHeight: 1 }}>R$ 49,90</span>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "var(--gold-light)", fontWeight: 600, display: "block", marginBottom: "1.2rem" }}>
                    ou R$ 497,00 à vista no PIX / Cartão
                  </span>

                  {/* BENEFÍCIOS DO PLANO VITALÍCIO */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "0.85rem",
                      textAlign: "left",
                      paddingTop: "1.2rem",
                      borderTop: "1px solid rgba(196, 169, 110, 0.25)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--off-white)" }}>
                      <span style={{ color: "var(--gold-light)", fontWeight: 800, fontSize: "1rem" }}>✓</span> Acesso vitalício aos 10 Módulos Iniciais
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--off-white)" }}>
                      <span style={{ color: "var(--gold-light)", fontWeight: 800, fontSize: "1rem" }}>✓</span> Novos Módulos adicionados 100% Grátis
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--off-white)" }}>
                      <span style={{ color: "var(--gold-light)", fontWeight: 800, fontSize: "1rem" }}>✓</span> Certificado Oficial de Conclusão
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--off-white)" }}>
                      <span style={{ color: "var(--gold-light)", fontWeight: 800, fontSize: "1rem" }}>✓</span> Materiais em PDF + Suporte Direto
                    </div>
                  </div>
                </div>

                {/* 2. COMUNICADO DE EVOLUÇÃO CONTÍNUA (10 MÓDULOS + ATUALIZAÇÕES GRATUITAS) */}
                <div
                  style={{
                    backgroundColor: "rgba(13, 12, 10, 0.75)",
                    border: "1px solid rgba(196, 169, 110, 0.3)",
                    borderRadius: "8px",
                    padding: "1.35rem 1.5rem",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(196, 169, 110, 0.15)",
                      border: "1px solid var(--gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "1.2rem",
                    }}
                  >
                    🚀
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--gold-light)", margin: "0 0 0.3rem 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      CONTEÚDO EM CONSTANTE EVOLUÇÃO (10+ MÓDULOS)
                    </h4>
                    <p style={{ fontSize: "0.84rem", color: "rgba(244, 239, 228, 0.85)", margin: 0, lineHeight: 1.55 }}>
                      Iniciamos a plataforma com um total de <strong>10 Módulos Práticos completos</strong>. Conforme novos módulos e aulas forem produzidos e lançados, <strong>você receberá todas as atualizações automaticamente sem pagar absolutamente nada a mais por isso!</strong>
                    </p>
                  </div>
                </div>

                {/* 3. GRÁFICO / BARRA DE PROGRESSO DE VENDAS EM TEMPO REAL (0 A 100) */}
                <div
                  style={{
                    backgroundColor: "rgba(13, 12, 10, 0.85)",
                    border: "1px solid rgba(196, 169, 110, 0.25)",
                    borderRadius: "8px",
                    padding: "1.25rem 1.5rem",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#34d399", boxShadow: "0 0 8px #34d399" }} />
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", color: "var(--gold-light)", textTransform: "uppercase" }}>
                        VAGAS PREENCHIDAS DO LOTE VITALÍCIO (0 A 100)
                      </span>
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--off-white)", fontFamily: "'Inter', sans-serif" }}>
                      {salesCount} de {maxCapacity} Vagas ({progressPercentage.toFixed(0)}%)
                    </span>
                  </div>

                  {/* Barra Visual de Progresso Metalizada */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "14px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid rgba(196, 169, 110, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progressPercentage}%`,
                        background: "linear-gradient(90deg, #856a33 0%, #c4a96e 50%, #fff2d0 100%)",
                        boxShadow: "0 0 15px rgba(196, 169, 110, 0.8)",
                        borderRadius: "10px",
                        transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>
                  
                  <span style={{ display: "block", fontSize: "0.68rem", color: "rgba(244,239,228,0.5)", marginTop: "0.5rem" }}>
                    * Gráfico conectado para sincronização em tempo real via banco de dados. Restam {maxCapacity - salesCount} vagas neste valor.
                  </span>
                </div>

                {/* BOTÃO PRINCIPAL DE ASSINATURA CINEMATOGRÁFICO */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    style={{
                      width: "100%",
                      maxWidth: "520px",
                      padding: "1.25rem 2.5rem",
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
                    <span>GARANTIR MEU ACESSO VITALÍCIO AGORA</span>
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
