"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  MapPin,
  ShieldCheck,
  Eye,
  Headphones,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Stethoscope,
  ChevronDown,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import { cursoTratadoresData } from "@/data/cursoTratadores";
import { siteConfig } from "@/data/siteConfig";

export default function CursoTratadoresSalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedContact, setCopiedContact] = useState(false);
  const [environmentImageError, setEnvironmentImageError] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleEnrollment = () => {
    const target = siteConfig.cursoTratadores?.enrollmentUrl || "/checkout";
    if (target.startsWith("http")) {
      window.open(target, "_blank", "noopener,noreferrer");
    } else if (target.startsWith("/")) {
      window.location.href = target;
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

  // Mapeamento de ícones distintos para a composição visual dos 7 benefícios (Item 1)
  const benefitIcons = [
    BookOpen,
    MapPin,
    ShieldCheck,
    Eye,
    Headphones,
    Award,
    Users,
  ];

  return (
    <main style={{ backgroundColor: "#fbfaf7", color: "#1c1813", minHeight: "100vh" }}>
      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 1 — HERO DE VENDAS & APRESENTAÇÃO
          - Selo: FORMAÇÃO PRESENCIAL
          - Título: Curso de Capacitação de Tratadores de Equinos — Nível I
          - Apresentação: Aprenda fundamentos essenciais de manejo, alimentação,
            higiene, controle de parasitas e avaliação de equinos.
          - Composição visual organizada dos 7 benefícios
          - Investimento: R$ 1.200,00
          - Botão: QUERO GARANTIR MINHA VAGA
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "clamp(6.5rem, 12vh, 9rem)",
          paddingBottom: "clamp(4.5rem, 8vh, 6.5rem)",
          backgroundColor: "#16130f",
          overflow: "hidden",
        }}
      >
        {/* Imagem de Fundo de Alta Resolução com Gradiente Cinematográfico */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
            opacity: 0.32,
            zIndex: 0,
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(22, 19, 15, 0.97) 0%, rgba(22, 19, 15, 0.90) 50%, rgba(22, 19, 15, 0.65) 100%)",
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
            <div style={{ maxWidth: "860px" }}>
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
                  {cursoTratadoresData.badge}
                </span>
              </div>

              {/* Título Principal Exato */}
              <h1
                className="font-serif"
                style={{
                  color: "#fbfaf7",
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  fontWeight: 600,
                  lineHeight: 1.12,
                  letterSpacing: "-0.015em",
                  margin: "0 0 1.25rem 0",
                  textShadow: "0 4px 20px rgba(0,0,0,0.6)",
                }}
              >
                {cursoTratadoresData.title}
              </h1>

              {/* Apresentação Essencial */}
              <p
                className="font-sans"
                style={{
                  color: "#e8dfce",
                  fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                  fontWeight: 400,
                  lineHeight: 1.55,
                  maxWidth: "760px",
                  margin: "0 0 2rem 0",
                }}
              >
                {cursoTratadoresData.subtitle}
              </p>

              {/* ── COMPOSIÇÃO VISUAL ORGANIZADA DOS 7 BENEFÍCIOS (Item 1) ── */}
              <div
                style={{
                  backgroundColor: "rgba(32, 27, 22, 0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(196, 169, 110, 0.28)",
                  borderRadius: "14px",
                  padding: "clamp(1.25rem, 3vw, 1.75rem)",
                  marginBottom: "2.25rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#c4a96e",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  O que esta formação oferece a você:
                </span>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                    gap: "0.85rem 1.25rem",
                  }}
                >
                  {cursoTratadoresData.benefits.map((benefit, idx) => {
                    const IconComponent = benefitIcons[idx] || CheckCircle2;
                    return (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.65rem",
                        }}
                      >
                        <div
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "6px",
                            backgroundColor: "rgba(196, 169, 110, 0.15)",
                            border: "1px solid rgba(196, 169, 110, 0.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#c4a96e",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        >
                          <IconComponent style={{ width: "13px", height: "13px" }} />
                        </div>
                        <span
                          className="font-sans"
                          style={{
                            fontSize: "0.88rem",
                            color: "#f4efe4",
                            lineHeight: 1.45,
                            fontWeight: 400,
                          }}
                        >
                          {benefit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bloco de Conversão: Preço + Botão Principal */}
              <div
                style={{
                  backgroundColor: "rgba(35, 30, 24, 0.9)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(196, 169, 110, 0.4)",
                  borderRadius: "12px",
                  padding: "clamp(1.25rem, 3vw, 1.75rem)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1.25rem",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(1.85rem, 3.8vw, 2.5rem)",
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
                      fontSize: "0.8rem",
                      color: "#c4a96e",
                      fontWeight: 500,
                      display: "block",
                      marginTop: "0.2rem",
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
                    fontSize: "0.88rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "1.05rem 2.2rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(196, 169, 110, 0.35)",
                    transition: "all 0.25s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                  }}
                  className="btn-garantir-vaga"
                >
                  <span>QUERO GARANTIR MINHA VAGA</span>
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 2 — IMAGEM DE DESTAQUE DO HARAS (Item 2)
          - Fotografia ampla e representativa do ambiente do Haras
          - Preparada para receber a fotografia dos cavalos bebendo água
          - Transmite ambiente real, cuidado com os animais, tranquilidade
            e profissionalismo
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#fbfaf7",
          paddingTop: "clamp(3rem, 6vw, 4.5rem)",
          paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
          position: "relative",
        }}
      >
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <SectionReveal type="up">
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(140, 110, 61, 0.25)",
                boxShadow: "0 16px 40px rgba(28, 24, 19, 0.08)",
                backgroundColor: "#16130f",
                position: "relative",
              }}
            >
              {/* Moldura Widescreen Panorâmica */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "21/9",
                  minHeight: "260px",
                }}
              >
                <img
                  src={
                    environmentImageError
                      ? "/images/hero-bg.jpg"
                      : cursoTratadoresData.harasEnvironmentImage
                  }
                  onError={() => setEnvironmentImageError(true)}
                  alt="Fotografia do ambiente real do Haras Nossa Senhora Aparecida — Tranquilidade, manejo e cuidado com os animais"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 40%",
                    display: "block",
                  }}
                />

                {/* Gradiente sutil inferior para garantir leitura da legenda */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(22, 19, 15, 0.88) 0%, rgba(22, 19, 15, 0.25) 45%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Informação e Selo de Ambiente Real */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "clamp(1rem, 2.5vw, 1.75rem)",
                    left: "clamp(1rem, 3vw, 2rem)",
                    right: "clamp(1rem, 3vw, 2rem)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: "1rem",
                    color: "#fbfaf7",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#c4a96e",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        marginBottom: "0.35rem",
                      }}
                    >
                      <MapPin style={{ width: "12px", height: "12px" }} />
                      Haras Nossa Senhora Aparecida • Ambiente Real do Curso
                    </span>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: "clamp(1.15rem, 2.2vw, 1.6rem)",
                        fontWeight: 600,
                        lineHeight: 1.25,
                        margin: 0,
                        color: "#ffffff",
                      }}
                    >
                      Vivência prática, tranquilidade e cuidado diário com os animais
                    </h3>
                  </div>

                  <div
                    style={{
                      backgroundColor: "rgba(22, 19, 15, 0.75)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(196, 169, 110, 0.35)",
                      borderRadius: "8px",
                      padding: "0.5rem 0.85rem",
                      fontSize: "0.75rem",
                      color: "#e8dfce",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Aulas práticas realizadas diretamente nas instalações e piquetes do criatório
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 3 — SOBRE A FORMAÇÃO (Item 3)
          - Título: Sobre a Formação
          - Subtítulo: Aprenda a cuidar de equinos com mais conhecimento
            e responsabilidade.
          - Texto integral em 5 parágrafos com alto contraste e tipografia nobre
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="sobre-a-formacao"
        style={{
          paddingTop: "clamp(3.5rem, 6vw, 5.5rem)",
          paddingBottom: "clamp(4.5rem, 7vw, 6.5rem)",
          backgroundColor: "#fbfaf7",
        }}
      >
        <div className="container" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 1.5rem" }}>
          <SectionReveal type="up">
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 4.5vw, 3.5rem)" }}>
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
                APRESENTAÇÃO DO CURSO
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.18,
                  margin: "0 0 1rem 0",
                  letterSpacing: "-0.015em",
                }}
              >
                {cursoTratadoresData.aboutSection.title}
              </h2>

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                  color: "#6b5d4b",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  maxWidth: "680px",
                  margin: "0 auto",
                }}
              >
                {cursoTratadoresData.aboutSection.subtitle}
              </p>
            </div>
          </SectionReveal>

          {/* 5 Parágrafos do Texto Oficial */}
          <SectionReveal type="up">
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(140, 110, 61, 0.18)",
                borderRadius: "16px",
                padding: "clamp(2rem, 5vw, 3.5rem)",
                boxShadow: "0 8px 30px rgba(28, 24, 19, 0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Parágrafo 1 */}
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                  color: "#3d352b",
                  lineHeight: 1.8,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {cursoTratadoresData.aboutSection.paragraphs[0]}
              </p>

              {/* Parágrafo 2 */}
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                  color: "#3d352b",
                  lineHeight: 1.8,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {cursoTratadoresData.aboutSection.paragraphs[1]}
              </p>

              {/* Parágrafo 3 — Destaque Editorial Central */}
              <div
                style={{
                  borderLeft: "3px solid #8c6e3d",
                  backgroundColor: "rgba(140, 110, 61, 0.06)",
                  padding: "1.25rem 1.75rem",
                  borderRadius: "0 10px 10px 0",
                  margin: "0.5rem 0",
                }}
              >
                <p
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.15rem, 1.8vw, 1.35rem)",
                    color: "#1c1813",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  “{cursoTratadoresData.aboutSection.paragraphs[2]}”
                </p>
              </div>

              {/* Parágrafo 4 */}
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                  color: "#3d352b",
                  lineHeight: 1.8,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {cursoTratadoresData.aboutSection.paragraphs[3]}
              </p>

              {/* Parágrafo 5 */}
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                  color: "#3d352b",
                  lineHeight: 1.8,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {cursoTratadoresData.aboutSection.paragraphs[4]}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SEÇÃO 4 — GRADE TÉCNICA (Item 4)
          - Título: Grade Técnica
          - Subtítulo: O que você vai aprender
          - Introdução: Conheça os principais temas abordados durante a capacitação.
          - 8 tópicos organizados em seção própria, numerados de 01 a 08,
            com boa leitura e aparência profissional.
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="grade-tecnica"
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 7rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7rem)",
          backgroundColor: "#f2ece0",
          borderTop: "1px solid rgba(140, 110, 61, 0.15)",
          borderBottom: "1px solid rgba(140, 110, 61, 0.15)",
        }}
      >
        <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
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
                {cursoTratadoresData.technicalGrid.sectionBadge}
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.15,
                  margin: "0 0 0.5rem 0",
                  letterSpacing: "-0.015em",
                }}
              >
                {cursoTratadoresData.technicalGrid.title}
              </h2>

              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  color: "#8c6e3d",
                  fontWeight: 600,
                  margin: "0 0 0.75rem 0",
                }}
              >
                {cursoTratadoresData.technicalGrid.subtitle}
              </p>

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                  color: "#5f5547",
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                {cursoTratadoresData.technicalGrid.intro}
              </p>
            </div>
          </SectionReveal>

          {/* Grid dos 8 Tópicos Técnicos — Numeração 01 a 08 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
              gap: "1.35rem",
            }}
          >
            {cursoTratadoresData.topics.map((topico, idx) => (
              <SectionReveal key={topico.number} delay={(idx % 4) as any} type="up">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(140, 110, 61, 0.22)",
                    borderRadius: "12px",
                    padding: "1.75rem 1.5rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 18px rgba(28, 24, 19, 0.04)",
                    transition: "all 0.3s ease",
                  }}
                  className="program-topic-card"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.15rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        color: "#8c6e3d",
                        backgroundColor: "rgba(140, 110, 61, 0.12)",
                        border: "1px solid rgba(140, 110, 61, 0.25)",
                        padding: "0.3rem 0.7rem",
                        borderRadius: "6px",
                      }}
                    >
                      {topico.number}
                    </span>

                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "#8c6e3d",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Módulo {topico.number}
                    </span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#1c1813",
                      lineHeight: 1.35,
                      marginBottom: "0.85rem",
                    }}
                  >
                    {topico.title}
                  </h3>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.88rem",
                      color: "#554c3e",
                      lineHeight: 1.65,
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
          SEÇÃO 5 — EXCLUSIVA DA INSTRUTORA POLLYANNA (Item 6)
          - Totalmente separada dos cards dos tópicos programáticos
          - Hierarquia visual própria e destaque para mentoria prática
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="instrutora"
        style={{
          paddingTop: "clamp(5rem, 8vw, 8rem)",
          paddingBottom: "clamp(5rem, 8vw, 8rem)",
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
                  letterSpacing: "-0.015em",
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
                  margin: "0 0 1rem 0",
                }}
              >
                {cursoTratadoresData.instructor.name}
              </p>

              <p
                className="font-sans"
                style={{
                  fontSize: "0.95rem",
                  color: "#6b5d4b",
                  maxWidth: "580px",
                  margin: "0 auto",
                }}
              >
                {cursoTratadoresData.instructor.title}
              </p>
            </div>
          </SectionReveal>

          {/* Bloco Bio + Identificação Acadêmica */}
          <SectionReveal type="up">
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(140, 110, 61, 0.22)",
                borderRadius: "16px",
                padding: "clamp(1.75rem, 4vw, 3rem)",
                marginBottom: "3.5rem",
                boxShadow: "0 8px 30px rgba(28, 24, 19, 0.04)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                  gap: "2.5rem",
                  alignItems: "center",
                }}
              >
                {/* Fotografia Profissional da Instrutora */}
                <div>
                  <div
                    style={{
                      aspectRatio: "3/4",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid rgba(140, 110, 61, 0.35)",
                      position: "relative",
                      boxShadow: "0 14px 38px rgba(28, 24, 19, 0.16)",
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
                          "linear-gradient(to top, rgba(22, 19, 15, 0.92) 0%, transparent 100%)",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "1.25rem",
                        left: "1.25rem",
                        right: "1.25rem",
                        color: "#fbfaf7",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#c4a96e",
                          display: "block",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Sua Instrutora no Haras
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "1rem",
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
                    Orientação Prática e Experiência Técnica na Rotina Equina
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
                      borderRadius: "10px",
                      padding: "1.35rem",
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

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", color: "#3d352b", fontFamily: "'Inter', sans-serif" }}>
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

          {/* Cards de Experiências Profissionais */}
          <SectionReveal type="up">
            <div>
              <h3
                className="font-serif"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  marginBottom: "1.75rem",
                  textAlign: "center",
                }}
              >
                Trajetória e Atuação Profissional
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                  gap: "1.35rem",
                }}
              >
                {cursoTratadoresData.instructor.experiences.map((exp) => (
                  <div
                    key={exp.number}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid rgba(140, 110, 61, 0.2)",
                      borderRadius: "12px",
                      padding: "1.6rem",
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
                          marginBottom: "0.85rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.78rem",
                            fontWeight: 800,
                            color: "#8c6e3d",
                            backgroundColor: "rgba(140, 110, 61, 0.1)",
                            padding: "0.25rem 0.6rem",
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
          SEÇÃO 6 — PARA QUEM É O CURSO (Item 5 — Linguagem voltada ao aluno)
          - Priorizar: "você vai aprender", "desenvolva suas habilidades"
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="publico-alvo"
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "#f2ece0",
        }}
      >
        <div className="container" style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 1.5rem" }}>
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
                DESENVOLVA SUAS HABILIDADES
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.2,
                  margin: "0 0 0.75rem 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Esta formação foi desenvolvida para você
              </h2>

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  color: "#5f5547",
                  maxWidth: "620px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Uma oportunidade prática para você aprofundar conhecimentos e aplicar esse aprendizado diretamente na rotina com os equinos.
              </p>
            </div>
          </SectionReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
              gap: "1.35rem",
            }}
          >
            {cursoTratadoresData.targetAudience.map((item, idx) => (
              <SectionReveal key={idx} delay={(idx % 2) as any} type="up">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(140, 110, 61, 0.2)",
                    borderRadius: "12px",
                    padding: "1.6rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.15rem",
                    boxShadow: "0 4px 16px rgba(28, 24, 19, 0.03)",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
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
                    <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                  </div>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.98rem",
                      color: "#3d352b",
                      lineHeight: 1.65,
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
          SEÇÃO 7 — INVESTIMENTO E INSCRIÇÃO
          - Título: Invista na sua capacitação
          - Valor: R$ 1.200,00
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
                INSCRIÇÃO OFICIAL
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
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    color: "#c4a96e",
                    marginTop: "0.5rem",
                  }}
                >
                  {cursoTratadoresData.priceLabel}
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
                Dê o próximo passo para compreender os fundamentos do manejo e aplicar esse conhecimento na rotina prática com os animais.
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
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
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
          SEÇÃO 8 — DÚVIDAS FREQUENTES
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
                        <ChevronDown
                          style={{
                            width: "16px",
                            height: "16px",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.25s ease",
                          }}
                        />
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
          SEÇÃO 9 — CHAMADA FINAL
          - O cuidado com os cavalos começa com conhecimento.
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
                Aprenda a cuidar de equinos com mais conhecimento, responsabilidade e segurança na rotina do haras.
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
                  {cursoTratadoresData.title}
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
                  {cursoTratadoresData.price}
                </span>
                <span style={{ fontSize: "0.72rem", color: "#7a6e5e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Modalidade Presencial • Haras Nossa Senhora Aparecida
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
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Estilos e Efeitos Hover Editoriais */}
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
          border-color: rgba(140, 110, 61, 0.55) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(28, 24, 19, 0.08) !important;
        }
      `}} />
    </main>
  );
}
