"use client";

import { useState } from "react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { cursoTratadoresData } from "@/data/cursoTratadores";
import { siteConfig } from "@/data/siteConfig";

export default function CursoTratadoresSalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedContact, setCopiedContact] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleEnrollment = () => {
    const target = siteConfig.cursoTratadores?.enrollmentUrl || "#contato-matricula";
    if (target.startsWith("http")) {
      window.open(target, "_blank", "noopener,noreferrer");
    } else {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.cursoTratadores?.contactEmail || "contato@mundodoscavalos.com.br");
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2500);
  };

  return (
    <main style={{ backgroundColor: "#fbfaf7", color: "#1c1813", minHeight: "100vh" }}>
      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 1 — HERO DE VENDAS
          - Selo: FORMAÇÃO PRESENCIAL
          - Título principal
          - Subtítulo
          - Texto complementar
          - Preço: R$ 1.200,00
          - Texto próximo ao preço: "Investimento na sua capacitação profissional."
          - Botão: QUERO GARANTIR MINHA VAGA
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "clamp(6rem, 12vh, 8.5rem)",
          paddingBottom: "clamp(4rem, 8vh, 6rem)",
          backgroundColor: "#16130f",
          overflow: "hidden",
        }}
      >
        {/* Imagem de Fundo de Alta Qualidade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.38,
            zIndex: 0,
          }}
        />

        {/* Gradiente Cinematográfico Suave */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(22, 19, 15, 0.96) 0%, rgba(22, 19, 15, 0.88) 45%, rgba(22, 19, 15, 0.6) 100%)",
            zIndex: 1,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to top, #fbfaf7 0%, transparent 100%)",
            zIndex: 2,
          }}
        />

        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 3 }}>
          <SectionReveal type="up">
            <div style={{ maxWidth: "780px" }}>
              {/* Navegação de retorno */}
              <div style={{ marginBottom: "1.5rem" }}>
                <Link
                  href="/#cursos"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#c4a96e",
                    textDecoration: "none",
                  }}
                >
                  <span>←</span>
                  <span>Voltar aos Cursos</span>
                </Link>
              </div>

              {/* Selo: FORMAÇÃO PRESENCIAL */}
              <div style={{ marginBottom: "1.25rem" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "rgba(196, 169, 110, 0.15)",
                    border: "1px solid rgba(196, 169, 110, 0.45)",
                    color: "#d8be86",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "0.4rem 1rem",
                    borderRadius: "100px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#c4a96e",
                    }}
                  />
                  FORMAÇÃO PRESENCIAL
                </span>
              </div>

              {/* Título Principal */}
              <h1
                className="font-serif"
                style={{
                  color: "#fbfaf7",
                  fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                  margin: "0 0 1.25rem 0",
                  textShadow: "0 4px 20px rgba(0,0,0,0.6)",
                }}
              >
                {cursoTratadoresData.title}
              </h1>

              {/* Subtítulo */}
              <p
                className="font-sans"
                style={{
                  color: "#e8dfce",
                  fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  margin: "0 0 1rem 0",
                }}
              >
                “{cursoTratadoresData.subtitle}”
              </p>

              {/* Texto Complementar */}
              <p
                className="font-sans"
                style={{
                  color: "rgba(244, 239, 228, 0.78)",
                  fontSize: "clamp(0.92rem, 1.3vw, 1.02rem)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  maxWidth: "680px",
                  margin: "0 0 2rem 0",
                }}
              >
                {cursoTratadoresData.complementaryText}
              </p>

              {/* Bloco de Conversão: Preço + Botão Principal */}
              <div
                style={{
                  backgroundColor: "rgba(35, 30, 24, 0.85)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(196, 169, 110, 0.35)",
                  borderRadius: "12px",
                  padding: "clamp(1.25rem, 3vw, 1.75rem)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1.25rem",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)",
                        fontWeight: 800,
                        color: "#fbfaf7",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {cursoTratadoresData.price}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      color: "#c4a96e",
                      fontWeight: 500,
                      display: "block",
                      marginTop: "0.15rem",
                    }}
                  >
                    {cursoTratadoresData.priceLabel}
                  </span>
                </div>

                {/* Botão: QUERO GARANTIR MINHA VAGA */}
                <button
                  onClick={handleEnrollment}
                  style={{
                    backgroundColor: "#c4a96e",
                    color: "#16130f",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "1rem 2.2rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(196, 169, 110, 0.35)",
                    transition: "all 0.25s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  className="btn-garantir-vaga"
                >
                  <span>QUERO GARANTIR MINHA VAGA</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 2 — APRESENTAÇÃO DO CURSO
          - Título
          - Textos
          - 3 Pilares destacados
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "#fbfaf7",
        }}
      >
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <SectionReveal type="up">
            <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8c6e3d",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                SOBRE A FORMAÇÃO
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.2,
                  margin: "0 0 1.5rem 0",
                  letterSpacing: "-0.01em",
                }}
              >
                {cursoTratadoresData.presentation.title}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                    color: "#463d33",
                    lineHeight: 1.8,
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {cursoTratadoresData.presentation.text1}
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                    color: "#463d33",
                    lineHeight: 1.8,
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {cursoTratadoresData.presentation.text2}
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                    color: "#463d33",
                    lineHeight: 1.8,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {cursoTratadoresData.presentation.text3}
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* 3 Pilares destacados visualmente */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {cursoTratadoresData.presentation.pillars.map((pilar, idx) => (
              <SectionReveal key={idx} delay={(idx % 3) as any} type="up">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(140, 110, 61, 0.2)",
                    borderRadius: "12px",
                    padding: "2rem 1.75rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 8px 24px rgba(28, 24, 19, 0.04)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(140, 110, 61, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#8c6e3d",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "0.9rem" }}>
                      0{idx + 1}
                    </span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 600,
                      color: "#1c1813",
                      marginBottom: "0.75rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {pilar.title}
                  </h3>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.92rem",
                      color: "#5f5547",
                      lineHeight: 1.65,
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {pilar.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 3 — CONTEÚDO PROGRAMÁTICO
          - Título: O que você vai aprender
          - Subtítulo: Conheça os principais temas abordados durante a capacitação.
          - 8 tópicos em cards numerados mantidos integralmente
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="conteudo-programatico"
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "#f2ece0",
        }}
      >
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <SectionReveal type="up">
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8c6e3d",
                  display: "block",
                  marginBottom: "0.65rem",
                }}
              >
                GRADE TÉCNICA COMPLETA
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.15,
                  margin: "0 0 0.75rem 0",
                  letterSpacing: "-0.01em",
                }}
              >
                O que você vai aprender
              </h2>

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  color: "#5f5547",
                  maxWidth: "580px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Conheça os principais temas abordados durante a capacitação.
              </p>
            </div>
          </SectionReveal>

          {/* Grid dos 8 Tópicos */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {cursoTratadoresData.topics.map((topico, idx) => (
              <SectionReveal key={topico.number} delay={(idx % 4) as any} type="up">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(140, 110, 61, 0.2)",
                    borderRadius: "10px",
                    padding: "1.5rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 16px rgba(28, 24, 19, 0.03)",
                    transition: "all 0.3s ease",
                  }}
                  className="program-topic-card"
                >
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
                        fontSize: "0.85rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        color: "#8c6e3d",
                        backgroundColor: "rgba(140, 110, 61, 0.1)",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "4px",
                      }}
                    >
                      {topico.number}
                    </span>

                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8c6e3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "#1c1813",
                      lineHeight: 1.3,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {topico.title}
                  </h3>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.84rem",
                      color: "#5f5547",
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {topico.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 4 — APRESENTAÇÃO DA INSTRUTORA
          - Título: Conheça sua instrutora
          - Nome: Pollyanna Santiago Carrazzoni
          - Apresentação completa e identificação acadêmica UFPB
          - Linha do tempo / cards com as 6 experiências profissionais
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="instrutora"
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "#fbfaf7",
        }}
      >
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <SectionReveal type="up">
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8c6e3d",
                  display: "block",
                  marginBottom: "0.65rem",
                }}
              >
                CORPO DOCENTE & EXPERIÊNCIA PRÁTICA
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.15,
                  margin: "0 0 0.5rem 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Conheça sua instrutora
              </h2>

              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)",
                  color: "#8c6e3d",
                  fontWeight: 600,
                  margin: "0 0 1.5rem 0",
                }}
              >
                {cursoTratadoresData.instructor.name}
              </p>
            </div>
          </SectionReveal>

          {/* Bloco Bio + Identificação Acadêmica */}
          <SectionReveal type="up">
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(140, 110, 61, 0.2)",
                borderRadius: "14px",
                padding: "clamp(1.75rem, 4vw, 3rem)",
                marginBottom: "3rem",
                boxShadow: "0 8px 30px rgba(28, 24, 19, 0.04)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                  gap: "2.5rem",
                  alignItems: "center",
                }}
              >
                {/* Fotografia Profissional Oficial da Instrutora */}
                <div>
                  <div
                    style={{
                      aspectRatio: "3/4",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid rgba(140, 110, 61, 0.35)",
                      position: "relative",
                      boxShadow: "0 12px 35px rgba(28, 24, 19, 0.15)",
                      backgroundColor: "#16130f",
                    }}
                  >
                    <img
                      src="/images/pollyanna.jpg"
                      alt="Pollyanna Santiago Carrazzoni com cavalo no Haras Nossa Senhora Aparecida"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "45%",
                        background:
                          "linear-gradient(to top, rgba(22, 19, 15, 0.9) 0%, transparent 100%)",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "1rem",
                        left: "1rem",
                        right: "1rem",
                        color: "#fbfaf7",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#c4a96e",
                          display: "block",
                          marginBottom: "0.2rem",
                        }}
                      >
                        Sua Instrutora
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                        }}
                      >
                        {cursoTratadoresData.instructor.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Texto da Instrutora & Identificação Acadêmica */}
                <div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      fontWeight: 600,
                      color: "#1c1813",
                      marginBottom: "1rem",
                      lineHeight: 1.25,
                    }}
                  >
                    Trajetória Dedicada à Equinocultura
                  </h3>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.98rem",
                      color: "#463d33",
                      lineHeight: 1.75,
                      marginBottom: "1.75rem",
                      fontWeight: 400,
                    }}
                  >
                    {cursoTratadoresData.instructor.presentation}
                  </p>

                  {/* Identificação Acadêmica Detalhada */}
                  <div
                    style={{
                      backgroundColor: "#f7f4ec",
                      border: "1px solid rgba(140, 110, 61, 0.2)",
                      borderRadius: "8px",
                      padding: "1.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#8c6e3d",
                        display: "block",
                        marginBottom: "0.75rem",
                      }}
                    >
                      IDENTIFICAÇÃO ACADÊMICA
                    </span>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.85rem", color: "#3d352b", fontFamily: "'Inter', sans-serif" }}>
                      <div><strong>Formação:</strong> {cursoTratadoresData.instructor.academic.degree}</div>
                      <div><strong>Instituição:</strong> {cursoTratadoresData.instructor.academic.institution}</div>
                      <div><strong>Centro:</strong> {cursoTratadoresData.instructor.academic.center}</div>
                      <div><strong>Local:</strong> {cursoTratadoresData.instructor.academic.location}</div>
                      <div><strong>Conclusão da graduação:</strong> {cursoTratadoresData.instructor.academic.graduationPeriod}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Linha do Tempo / Cards de Experiências Profissionais */}
          <SectionReveal type="up">
            <div>
              <h3
                className="font-serif"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                Experiências Profissionais
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                  gap: "1.25rem",
                }}
              >
                {cursoTratadoresData.instructor.experiences.map((exp) => (
                  <div
                    key={exp.number}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid rgba(140, 110, 61, 0.2)",
                      borderRadius: "10px",
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 4px 16px rgba(28, 24, 19, 0.03)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            color: "#8c6e3d",
                            backgroundColor: "rgba(140, 110, 61, 0.1)",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "4px",
                          }}
                        >
                          {exp.number}
                        </span>
                      </div>

                      <h4
                        className="font-serif"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          color: "#1c1813",
                          margin: "0 0 0.4rem 0",
                          lineHeight: 1.3,
                        }}
                      >
                        {exp.role}
                      </h4>

                      <p
                        className="font-sans"
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "#8c6e3d",
                          margin: "0 0 0.5rem 0",
                        }}
                      >
                        {exp.institution}
                      </p>

                      <p
                        className="font-sans"
                        style={{
                          fontSize: "0.82rem",
                          color: "#5f5547",
                          lineHeight: 1.5,
                          margin: "0 0 0.75rem 0",
                        }}
                      >
                        {exp.periodOrDate}
                      </p>

                      {exp.details && (
                        <div
                          style={{
                            marginTop: "0.5rem",
                            paddingTop: "0.5rem",
                            borderTop: "1px dashed rgba(140, 110, 61, 0.2)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              color: "#1c1813",
                              display: "block",
                              marginBottom: "0.25rem",
                            }}
                          >
                            Disciplinas informadas:
                          </span>
                          <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.8rem", color: "#5f5547" }}>
                            {exp.details.map((d, di) => (
                              <li key={di}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 5 — PARA QUEM É O CURSO
          - Título: Uma capacitação para quem deseja aprofundar seus conhecimentos sobre equinos
          - Público potencial em lista / cards elegantes
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="publico-alvo"
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "#f2ece0",
        }}
      >
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>
          <SectionReveal type="up">
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8c6e3d",
                  display: "block",
                  marginBottom: "0.65rem",
                }}
              >
                PÚBLICO POTENCIAL
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.2,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Uma capacitação para quem deseja aprofundar seus conhecimentos sobre equinos
              </h2>
            </div>
          </SectionReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {cursoTratadoresData.targetAudience.map((item, idx) => (
              <SectionReveal key={idx} delay={(idx % 2) as any} type="up">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(140, 110, 61, 0.2)",
                    borderRadius: "10px",
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    boxShadow: "0 4px 16px rgba(28, 24, 19, 0.03)",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(140, 110, 61, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#8c6e3d",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.95rem",
                      color: "#3d352b",
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 6 — INVESTIMENTO E INSCRIÇÃO
          - Título: Invista na sua capacitação
          - Nome: Curso de Capacitação de Tratadores de Equinos
          - Modalidade: Presencial
          - Valor: R$ 1.200,00
          - Texto persuasivo
          - Botão: QUERO ME INSCREVER
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="investimento"
        style={{
          paddingTop: "clamp(5rem, 9vw, 8rem)",
          paddingBottom: "clamp(5rem, 9vw, 8rem)",
          backgroundColor: "#16130f",
          color: "#fbfaf7",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 30%, rgba(196, 169, 110, 0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
          <SectionReveal type="up">
            <div
              style={{
                backgroundColor: "rgba(28, 24, 19, 0.95)",
                border: "1px solid rgba(196, 169, 110, 0.35)",
                borderRadius: "16px",
                padding: "clamp(2rem, 5vw, 3.5rem)",
                textAlign: "center",
                boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#c4a96e",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                PROCESSO DE INSCRIÇÃO
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                  fontWeight: 600,
                  color: "#fbfaf7",
                  lineHeight: 1.15,
                  margin: "0 0 0.5rem 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Invista na sua capacitação
              </h2>

              <h3
                className="font-sans"
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                  fontWeight: 600,
                  color: "#e8dfce",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {cursoTratadoresData.title}
              </h3>

              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(196, 169, 110, 0.15)",
                  color: "#d8be86",
                  border: "1px solid rgba(196, 169, 110, 0.35)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.3rem 0.85rem",
                  borderRadius: "100px",
                  marginBottom: "1.75rem",
                }}
              >
                Modalidade: {cursoTratadoresData.modality}
              </div>

              {/* Valor em destaque */}
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(2.6rem, 5.5vw, 3.8rem)",
                    fontWeight: 900,
                    color: "#fbfaf7",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {cursoTratadoresData.price}
                </span>
              </div>

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                  color: "rgba(244, 239, 228, 0.8)",
                  lineHeight: 1.7,
                  maxWidth: "580px",
                  margin: "0 auto 2.25rem",
                  fontWeight: 300,
                }}
              >
                “Dê o próximo passo para aprofundar seus conhecimentos sobre as práticas de manejo e os cuidados essenciais com equinos.”
              </p>

              {/* Botão: QUERO ME INSCREVER */}
              <div id="contato-matricula" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <button
                  onClick={handleEnrollment}
                  style={{
                    backgroundColor: "#c4a96e",
                    color: "#16130f",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "1.15rem 2.8rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(196, 169, 110, 0.4)",
                    transition: "all 0.25s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                  className="btn-garantir-vaga"
                >
                  <span>QUERO ME INSCREVER</span>
                  <span>→</span>
                </button>

                {/* Canal de Atendimento / Matrícula */}
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1rem 1.5rem",
                    backgroundColor: "rgba(13, 12, 10, 0.6)",
                    borderRadius: "8px",
                    border: "1px solid rgba(196, 169, 110, 0.2)",
                    maxWidth: "500px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#c4a96e",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Canal Oficial de Atendimento & Matrícula
                  </span>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.85rem", color: "#fbfaf7", fontFamily: "'Inter', sans-serif" }}>
                      {siteConfig.cursoTratadores?.contactEmail}
                    </span>
                    <button
                      onClick={copyEmail}
                      style={{
                        backgroundColor: "rgba(196, 169, 110, 0.2)",
                        color: "#c4a96e",
                        border: "1px solid rgba(196, 169, 110, 0.4)",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "4px",
                        fontSize: "0.7rem",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {copiedContact ? "Copiado!" : "Copiar E-mail"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 7 — DÚVIDAS FREQUENTES
          - Acordeão interativo com as 5 perguntas e respostas solicitadas
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="duvidas"
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "#fbfaf7",
        }}
      >
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <SectionReveal type="up">
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8c6e3d",
                  display: "block",
                  marginBottom: "0.65rem",
                }}
              >
                ESCLARECIMENTOS
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Dúvidas Frequentes
              </h2>
            </div>
          </SectionReveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {cursoTratadoresData.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <SectionReveal key={idx} delay={(idx % 5) as any} type="up">
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      border: `1px solid ${isOpen ? "rgba(140, 110, 61, 0.45)" : "rgba(140, 110, 61, 0.2)"}`,
                      borderRadius: "10px",
                      overflow: "hidden",
                      transition: "all 0.25s ease",
                      boxShadow: isOpen
                        ? "0 8px 24px rgba(140, 110, 61, 0.08)"
                        : "0 2px 8px rgba(28, 24, 19, 0.02)",
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      style={{
                        width: "100%",
                        padding: "1.35rem 1.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span
                        className="font-sans"
                        style={{
                          fontWeight: 700,
                          fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                          color: "#1c1813",
                          lineHeight: 1.35,
                        }}
                      >
                        {faq.question}
                      </span>

                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: isOpen ? "rgba(140, 110, 61, 0.15)" : "#f7f4ec",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#8c6e3d",
                          flexShrink: 0,
                          transition: "all 0.25s ease",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.25s ease",
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: "0 1.6rem 1.4rem",
                          borderTop: "1px solid rgba(140, 110, 61, 0.12)",
                          marginTop: "0.2rem",
                          paddingTop: "1rem",
                        }}
                      >
                        <p
                          className="font-sans"
                          style={{
                            fontSize: "0.95rem",
                            color: "#5f5547",
                            lineHeight: 1.7,
                            margin: 0,
                            fontWeight: 400,
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 8 — CHAMADA FINAL
          - Título: O cuidado com os cavalos começa com conhecimento.
          - Texto persuasivo
          - Preço: Curso de Capacitação de Tratadores de Equinos — R$ 1.200,00
          - Botão: GARANTIR MINHA VAGA
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "#f2ece0",
          borderTop: "1px solid rgba(140, 110, 61, 0.15)",
        }}
      >
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <SectionReveal type="up">
            <div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8c6e3d",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                CAPACITAÇÃO PROFISSIONAL EM EQUINOS
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 4.8vw, 3.5rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.18,
                  margin: "0 0 1rem 0",
                  letterSpacing: "-0.01em",
                }}
              >
                O cuidado com os cavalos começa com conhecimento.
              </h2>

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  color: "#5f5547",
                  lineHeight: 1.7,
                  maxWidth: "620px",
                  margin: "0 auto 2rem",
                  fontWeight: 400,
                }}
              >
                “Conheça as práticas essenciais de manejo e aprofunde sua compreensão sobre a rotina de um criatório de equinos.”
              </p>

              {/* Box de Resumo e Preço */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(140, 110, 61, 0.25)",
                  borderRadius: "12px",
                  padding: "1.75rem 2rem",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                  boxShadow: "0 6px 20px rgba(28, 24, 19, 0.04)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#1c1813",
                  }}
                >
                  Curso de Capacitação de Tratadores de Equinos
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.75rem",
                    fontWeight: 900,
                    color: "#8c6e3d",
                    letterSpacing: "-0.02em",
                  }}
                >
                  R$ 1.200,00
                </span>
                <span style={{ fontSize: "0.72rem", color: "#7a6e5e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Modalidade Presencial
                </span>
              </div>

              <div>
                <button
                  onClick={handleEnrollment}
                  style={{
                    backgroundColor: "#1c1813",
                    color: "#fbfaf7",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "1.15rem 2.8rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(28, 24, 19, 0.25)",
                    transition: "all 0.25s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                  className="btn-garantir-vaga-dark"
                >
                  <span>GARANTIR MINHA VAGA</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Estilos e Animações Específicas */}
      <style dangerouslySetInnerHTML={{ __html: `
        .btn-garantir-vaga:hover {
          background-color: #d8be86 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(196, 169, 110, 0.5) !important;
        }
        .btn-garantir-vaga-dark:hover {
          background-color: #8c6e3d !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(140, 110, 61, 0.35) !important;
        }
        .program-topic-card:hover {
          border-color: rgba(140, 110, 61, 0.5) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(28, 24, 19, 0.08) !important;
        }
      `}} />
    </main>
  );
}
