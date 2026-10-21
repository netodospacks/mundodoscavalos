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
  Calendar,
  Bed,
  UtensilsCrossed,
  FileCheck,
  CreditCard,
  QrCode,
  ChevronDown,
  Mail,
  Copy,
  Check,
  GraduationCap,
  Quote,
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

  // Mapeamento de ícones distintos para os 7 benefícios da apresentação (Item 1)
  const benefitIcons = [
    BookOpen,
    MapPin,
    ShieldCheck,
    Eye,
    Headphones,
    Award,
    Users,
  ];

  // Mapeamento de ícones expressivos para os 8 itens inclusos na experiência completa (Alteração 3 - Item 2)
  const includedExperienceIcons = [
    Calendar,
    BookOpen,
    Award,
    Bed,
    UtensilsCrossed,
    FileCheck,
    Headphones,
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
          - Composição visual organizada dos benefícios
          - Investimento por participante com tudo incluso
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
                  {cursoTratadoresData.badge} • 7 E 8 DE NOVEMBRO
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

              {/* ── COMPOSIÇÃO VISUAL DOS BENEFÍCIOS ── */}
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

              {/* Bloco de Conversão: Preço com contextualização de Hospedagem + Alimentação + Botão */}
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
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        color: "#d8be86",
                        fontWeight: 600,
                      }}
                    >
                      / participante
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      color: "#c4a96e",
                      fontWeight: 500,
                      display: "block",
                      marginTop: "0.2rem",
                    }}
                  >
                    Hospedagem e alimentação completas inclusas • Turma limitada a 30 vagas
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
          - 5 parágrafos oficiais com alto contraste e tipografia nobre
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
          - 8 tópicos organizados em seção própria, numerados de 01 a 08
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
          SEÇÃO 5 — EXCLUSIVA DA INSTRUTORA (Alteração 4)
          - Aparência editorial, elegante e profissional
          - Seção independente da grade curricular
          - Fotografia em destaque com credenciais lado a lado em telas maiores
          - Preserva integralmente todas as qualificações e trajetórias existentes
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="instrutora"
        style={{
          paddingTop: "clamp(5rem, 8vw, 8rem)",
          paddingBottom: "clamp(5rem, 8vw, 8rem)",
          backgroundColor: "#fbfaf7",
          borderTop: "1px solid rgba(140, 110, 61, 0.16)",
          borderBottom: "1px solid rgba(140, 110, 61, 0.16)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow de iluminação ambiente editorial */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 12% 25%, rgba(196, 169, 110, 0.08) 0%, transparent 55%), radial-gradient(circle at 88% 75%, rgba(140, 110, 61, 0.06) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
          {/* Cabeçalho Editorial da Seção */}
          <SectionReveal type="up">
            <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto clamp(3rem, 6vw, 4.5rem)" }}>
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
                {cursoTratadoresData.instructor.sectionBadge}
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)",
                  fontWeight: 600,
                  color: "#1c1813",
                  lineHeight: 1.15,
                  margin: "0 0 1rem 0",
                  letterSpacing: "-0.015em",
                }}
              >
                {cursoTratadoresData.instructor.sectionTitle}
              </h2>

              <div
                style={{
                  width: "54px",
                  height: "2px",
                  backgroundColor: "#c4a96e",
                  margin: "0 auto 1.25rem",
                }}
              />

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                  color: "#5f5547",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {cursoTratadoresData.instructor.sectionSubtitle}
              </p>
            </div>
          </SectionReveal>

          {/* Layout Editorial: Lado a Lado em Telas Maiores, Empilhado em Mobile */}
          <SectionReveal type="up">
            <div className="instructor-editorial-container">
              {/* COLUNA ESQUERDA: Fotografia em Destaque + Identificação Acadêmica */}
              <div>
                {/* Fotografia Profissional em Destaque Editorial */}
                <div
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid rgba(140, 110, 61, 0.35)",
                    position: "relative",
                    boxShadow: "0 18px 45px rgba(28, 24, 19, 0.14)",
                    backgroundColor: "#16130f",
                    marginBottom: "1.5rem",
                  }}
                >
                  <img
                    src="/images/pollyanna.jpg"
                    alt="Pollyanna Santiago Carrazzoni — Zootecnista e Instrutora no Haras Nossa Senhora Aparecida"
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
                      height: "50%",
                      background:
                        "linear-gradient(to top, rgba(22, 19, 15, 0.94) 0%, transparent 100%)",
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
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#c4a96e",
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Instrutora Responsável
                    </span>
                    <span
                      className="font-serif"
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        display: "block",
                        lineHeight: 1.2,
                      }}
                    >
                      {cursoTratadoresData.instructor.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        color: "rgba(251, 250, 247, 0.82)",
                        marginTop: "0.2rem",
                        display: "block",
                      }}
                    >
                      {cursoTratadoresData.instructor.title}
                    </span>
                  </div>
                </div>

                {/* Identificação Acadêmica Oficial (Aparência Editorial Elegante) */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(140, 110, 61, 0.22)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    boxShadow: "0 6px 22px rgba(28, 24, 19, 0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.95rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "1px solid rgba(140, 110, 61, 0.16)",
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(140, 110, 61, 0.12)",
                        border: "1px solid rgba(140, 110, 61, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#8c6e3d",
                        flexShrink: 0,
                      }}
                    >
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#8c6e3d",
                          display: "block",
                        }}
                      >
                        IDENTIFICAÇÃO ACADÊMICA
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: "#1c1813",
                        }}
                      >
                        {cursoTratadoresData.instructor.academic.degree} • UFPB
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      fontSize: "0.84rem",
                      color: "#463d33",
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    <div>
                      <strong style={{ color: "#1c1813" }}>Formação:</strong>{" "}
                      {cursoTratadoresData.instructor.academic.degree}
                    </div>
                    <div>
                      <strong style={{ color: "#1c1813" }}>Instituição:</strong>{" "}
                      {cursoTratadoresData.instructor.academic.institution}
                    </div>
                    <div>
                      <strong style={{ color: "#1c1813" }}>Centro:</strong>{" "}
                      {cursoTratadoresData.instructor.academic.center}
                    </div>
                    <div>
                      <strong style={{ color: "#1c1813" }}>Local:</strong>{" "}
                      {cursoTratadoresData.instructor.academic.location}
                    </div>
                    <div>
                      <strong style={{ color: "#1c1813" }}>Conclusão da graduação:</strong>{" "}
                      {cursoTratadoresData.instructor.academic.graduationPeriod}
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUNA DIREITA: Apresentação Editorial + Trajetória Profissional */}
              <div>
                {/* Bloco de Apresentação e Credibilidade */}
                <div style={{ marginBottom: "2.25rem" }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#8c6e3d",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    ORIENTAÇÃO TÉCNICA E PRÁTICA
                  </span>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)",
                      fontWeight: 600,
                      color: "#1c1813",
                      lineHeight: 1.15,
                      margin: "0 0 0.5rem 0",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {cursoTratadoresData.instructor.name}
                  </h3>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: "1.02rem",
                      color: "#8c6e3d",
                      fontWeight: 600,
                      margin: "0 0 1.25rem 0",
                    }}
                  >
                    {cursoTratadoresData.instructor.title}
                  </p>

                  <div
                    style={{
                      width: "48px",
                      height: "2px",
                      backgroundColor: "#c4a96e",
                      marginBottom: "1.75rem",
                    }}
                  />

                  {/* Texto Editorial */}
                  <p
                    className="font-sans"
                    style={{
                      fontSize: "1.02rem",
                      color: "#3d352b",
                      lineHeight: 1.8,
                      marginBottom: "1.75rem",
                      fontWeight: 400,
                    }}
                  >
                    {cursoTratadoresData.instructor.presentation}
                  </p>

                  {/* Citação Editorial Humanizada */}
                  <div
                    style={{
                      backgroundColor: "rgba(140, 110, 61, 0.06)",
                      borderLeft: "3px solid #8c6e3d",
                      borderRadius: "0 8px 8px 0",
                      padding: "1.15rem 1.35rem",
                      display: "flex",
                      gap: "0.85rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <Quote size={22} style={{ color: "#8c6e3d", flexShrink: 0, marginTop: "0.15rem" }} />
                    <p
                      className="font-serif"
                      style={{
                        fontSize: "0.98rem",
                        fontStyle: "italic",
                        color: "#463d33",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      O manejo responsável une olhar atento e procedimento técnico embasado. O objetivo desta capacitação é proporcionar a você clareza e segurança real na lida diária com os cavalos.
                    </p>
                  </div>
                </div>

                {/* Trajetória e Atuação Profissional (Apresentação Editorial Contínua) */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.25rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "1px solid rgba(140, 110, 61, 0.18)",
                    }}
                  >
                    <h4
                      className="font-serif"
                      style={{
                        fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
                        fontWeight: 600,
                        color: "#1c1813",
                        margin: 0,
                      }}
                    >
                      Trajetória e Atuação no Setor Equino
                    </h4>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#8c6e3d",
                      }}
                    >
                      CREDENCIAIS OFICIAIS
                    </span>
                  </div>

                  {/* Lista Editorial de Experiências Profissionais */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {cursoTratadoresData.instructor.experiences.map((exp, expIdx) => (
                      <div
                        key={expIdx}
                        className="instructor-credential-item"
                        style={{
                          backgroundColor: "#ffffff",
                          border: "1px solid rgba(140, 110, 61, 0.18)",
                          borderRadius: "10px",
                          padding: "1.15rem 1.35rem",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "1rem",
                          boxShadow: "0 2px 10px rgba(28, 24, 19, 0.02)",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(140, 110, 61, 0.1)",
                            border: "1px solid rgba(140, 110, 61, 0.22)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#8c6e3d",
                            flexShrink: 0,
                            marginTop: "0.1rem",
                          }}
                        >
                          <Award size={16} />
                        </div>

                        <div style={{ flex: 1 }}>
                          <h5
                            className="font-serif"
                            style={{
                              fontSize: "1.08rem",
                              fontWeight: 600,
                              color: "#1c1813",
                              margin: "0 0 0.25rem 0",
                              lineHeight: 1.3,
                            }}
                          >
                            {exp.role}
                          </h5>

                          <p
                            className="font-sans"
                            style={{
                              fontSize: "0.86rem",
                              fontWeight: 600,
                              color: "#8c6e3d",
                              margin: "0 0 0.25rem 0",
                              lineHeight: 1.4,
                            }}
                          >
                            {exp.institution}
                          </p>

                          <p
                            className="font-sans"
                            style={{
                              fontSize: "0.8rem",
                              color: "#6b5d4b",
                              margin: 0,
                              lineHeight: 1.45,
                            }}
                          >
                            {exp.periodOrDate}
                          </p>

                          {exp.details && (
                            <div
                              style={{
                                marginTop: "0.6rem",
                                paddingTop: "0.6rem",
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
                                  marginBottom: "0.35rem",
                                }}
                              >
                                Disciplinas ministradas:
                              </span>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                                {exp.details.map((d, di) => (
                                  <span
                                    key={di}
                                    style={{
                                      fontFamily: "'Inter', sans-serif",
                                      fontSize: "0.72rem",
                                      color: "#3d352b",
                                      backgroundColor: "#f7f4ec",
                                      border: "1px solid rgba(140, 110, 61, 0.2)",
                                      padding: "0.2rem 0.55rem",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {d}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
          SEÇÃO 7 — INVESTIMENTO E CONVERSÃO (ALTERAÇÃO 3 COMPLETA)
          - Título: INVESTIMENTO NA CAPACITAÇÃO
          - Subtítulo: Conhecimento que acompanha você para além desses dois dias.
          - Texto introdutório em 3 parágrafos
          - Tudo o que está incluído em cards de alto destaque
          - Investimento por participante: R$ 1.200,00
          - Turma limitada a 30 participantes
          - Área de parcelamento e opções de pagamento configuráveis
          - Botão de ação oficial
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
              "radial-gradient(circle at 50% 25%, rgba(196, 169, 110, 0.16) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
          {/* Cabeçalho da Seção de Investimento */}
          <SectionReveal type="up">
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
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
                {cursoTratadoresData.investmentSection.sectionBadge}
              </span>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
                  fontWeight: 600,
                  color: "#fbfaf7",
                  lineHeight: 1.15,
                  margin: "0 0 1rem 0",
                  letterSpacing: "-0.015em",
                }}
              >
                {cursoTratadoresData.investmentSection.title}
              </h2>

              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.65rem)",
                  color: "#e8dfce",
                  fontWeight: 500,
                  margin: "0 auto 1.75rem auto",
                  maxWidth: "760px",
                  lineHeight: 1.35,
                }}
              >
                {cursoTratadoresData.investmentSection.subtitle}
              </p>

              {/* Texto Introdutório Oficial em 3 Parágrafos */}
              <div
                style={{
                  maxWidth: "820px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  textAlign: "center",
                  fontSize: "clamp(0.98rem, 1.3vw, 1.08rem)",
                  color: "rgba(244, 239, 228, 0.82)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                <p style={{ margin: 0 }}>
                  {cursoTratadoresData.investmentSection.introParagraphs[0]}
                </p>
                <p style={{ margin: 0, fontWeight: 500, color: "#fbfaf7" }}>
                  {cursoTratadoresData.investmentSection.introParagraphs[1]}
                </p>
                <p style={{ margin: 0 }}>
                  {cursoTratadoresData.investmentSection.introParagraphs[2]}
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* ── TUDO O QUE ESTÁ INCLUÍDO (Item 2) ── */}
          <SectionReveal type="up">
            <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  marginBottom: "1.75rem",
                }}
              >
                <Sparkles style={{ width: "18px", height: "18px", color: "#c4a96e" }} />
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.4rem, 2.6vw, 1.95rem)",
                    color: "#fbfaf7",
                    fontWeight: 600,
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  Tudo o que está incluído na sua formação
                </h3>
              </div>

              {/* Grid dos 8 Benefícios em Destaque Visual Nobre */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                  gap: "1.25rem",
                }}
              >
                {cursoTratadoresData.investmentSection.includedItems.map((item, idx) => {
                  const Icon = includedExperienceIcons[idx] || CheckCircle2;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "rgba(35, 30, 24, 0.8)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid rgba(196, 169, 110, 0.3)",
                        borderRadius: "14px",
                        padding: "1.6rem 1.4rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.85rem",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                        transition: "all 0.25s ease",
                      }}
                      className="included-experience-card"
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(196, 169, 110, 0.15)",
                          border: "1px solid rgba(196, 169, 110, 0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#c4a96e",
                          flexShrink: 0,
                        }}
                      >
                        <Icon style={{ width: "19px", height: "19px" }} />
                      </div>

                      <p
                        className="font-sans"
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          color: "#fbfaf7",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionReveal>

          {/* ── CARD MESTRE DE PREÇO, CONDIÇÕES E PARCELAMENTO (Itens 3 e 4) ── */}
          <SectionReveal type="up">
            <div
              style={{
                backgroundColor: "rgba(28, 24, 19, 0.96)",
                border: "1px solid rgba(196, 169, 110, 0.45)",
                borderRadius: "18px",
                padding: "clamp(2rem, 5vw, 3.5rem)",
                maxWidth: "760px",
                margin: "0 auto",
                textAlign: "center",
                boxShadow: "0 25px 60px rgba(0,0,0,0.65)",
                position: "relative",
              }}
            >
              {/* Selo de Exclusividade e Limite de Participantes */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "rgba(196, 169, 110, 0.18)",
                  border: "1px solid rgba(196, 169, 110, 0.5)",
                  color: "#f4efe4",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.45rem 1.15rem",
                  borderRadius: "100px",
                  marginBottom: "1.75rem",
                }}
              >
                <Users style={{ width: "15px", height: "15px", color: "#c4a96e" }} />
                <span>{cursoTratadoresData.investmentSection.spotsLimit}</span>
              </div>

              {/* Rótulo de Investimento */}
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#d8be86",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Investimento por participante:
              </span>

              {/* Valor em Destaque */}
              <div style={{ marginBottom: "1.75rem" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(2.8rem, 6vw, 4.2rem)",
                    fontWeight: 900,
                    color: "#fbfaf7",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {cursoTratadoresData.investmentSection.price}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(244, 239, 228, 0.7)",
                    marginTop: "0.5rem",
                    fontWeight: 400,
                  }}
                >
                  Valor único da experiência completa • Haras Nossa Senhora Aparecida
                </span>
              </div>

              {/* ── ÁREA DE PARCELAMENTO E CONDIÇÕES DE PAGAMENTO (Item 4) ── */}
              <div
                style={{
                  backgroundColor: "rgba(18, 15, 12, 0.8)",
                  border: "1px solid rgba(196, 169, 110, 0.25)",
                  borderRadius: "12px",
                  padding: "1.25rem 1.5rem",
                  marginBottom: "2rem",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#10b981",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    <QrCode style={{ width: "15px", height: "15px" }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.86rem", color: "#fbfaf7", display: "block" }}>
                      Pagamento com aprovação instantânea
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "rgba(244, 239, 228, 0.75)", lineHeight: 1.5 }}>
                      {cursoTratadoresData.investmentSection.paymentOptions.pix}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: "0.75rem",
                    borderTop: "1px solid rgba(196, 169, 110, 0.15)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(196, 169, 110, 0.15)",
                      border: "1px solid rgba(196, 169, 110, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c4a96e",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    <CreditCard style={{ width: "15px", height: "15px" }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.86rem", color: "#fbfaf7", display: "block" }}>
                      Condições de parcelamento e pagamento
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "rgba(244, 239, 228, 0.75)", lineHeight: 1.5 }}>
                      {cursoTratadoresData.investmentSection.paymentOptions.installmentsConfigurable ||
                        cursoTratadoresData.investmentSection.paymentOptions.installmentNote}
                    </span>
                  </div>
                </div>
              </div>

              {/* Frase final da seção de investimento (sem aspas) */}
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                  color: "rgba(244, 239, 228, 0.85)",
                  lineHeight: 1.6,
                  maxWidth: "580px",
                  margin: "0 auto 1.5rem",
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                Dê o próximo passo para aprofundar seus conhecimentos sobre as práticas de manejo e os cuidados essenciais com equinos.
              </p>

              {/* Botão Principal de Inscrição */}
              <div id="contato-matricula" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
                <button
                  onClick={handleEnrollment}
                  style={{
                    backgroundColor: "#c4a96e",
                    color: "#16130f",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "1.2rem 3rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(196, 169, 110, 0.45)",
                    transition: "all 0.25s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    width: "100%",
                    maxWidth: "420px",
                    justifyContent: "center",
                  }}
                  className="btn-garantir-vaga"
                >
                  <span>GARANTIR MINHA INSCRIÇÃO</span>
                  <ArrowRight style={{ width: "18px", height: "18px" }} />
                </button>

                {/* Canal Oficial de Atendimento */}
                <div
                  style={{
                    padding: "0.85rem 1.25rem",
                    backgroundColor: "rgba(13, 12, 10, 0.6)",
                    borderRadius: "8px",
                    border: "1px solid rgba(196, 169, 110, 0.2)",
                    maxWidth: "480px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#c4a96e",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Atendimento Oficial & Dúvidas
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
          SEÇÃO 9 — CHAMADA FINAL CONTEXTUALIZADA (Item 5)
          - O valor aparece junto do resumo dos benefícios, hospedagem,
            alimentação, condições de pagamento e convite à inscrição
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          paddingTop: "clamp(4.5rem, 8vw, 7.5rem)",
          paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)",
          backgroundColor: "#f2ece0",
          borderTop: "1px solid rgba(140, 110, 61, 0.15)",
        }}
      >
        <div className="container" style={{ maxWidth: "880px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
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

              {/* Frase final do encerramento (sem aspas) */}
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                  color: "#3d352b",
                  lineHeight: 1.6,
                  maxWidth: "680px",
                  margin: "0 auto 0.85rem",
                  fontWeight: 500,
                }}
              >
                Conheça as práticas essenciais de manejo e aprofunde sua compreensão sobre a rotina de um criatório de equinos.
              </p>

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.92rem, 1.15vw, 1.02rem)",
                  color: "#5f5547",
                  lineHeight: 1.65,
                  maxWidth: "680px",
                  margin: "0 auto 2rem",
                  fontWeight: 400,
                }}
              >
                Participe de dois dias de imersão presencial no Haras Nossa Senhora Aparecida (7 e 8 de novembro) com aulas práticas, orientação de profissional qualificada, hospedagem e alimentação completas inclusas.
              </p>

              {/* Box de Resumo Contextualizado do Investimento (Item 5) */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(140, 110, 61, 0.25)",
                  borderRadius: "16px",
                  padding: "clamp(1.75rem, 4vw, 2.5rem)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.85rem",
                  marginBottom: "2.25rem",
                  boxShadow: "0 8px 24px rgba(28, 24, 19, 0.05)",
                }}
              >
                {/* Selo de Vagas */}
                <span
                  style={{
                    backgroundColor: "rgba(140, 110, 61, 0.12)",
                    color: "#8c6e3d",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "100px",
                  }}
                >
                  Turma limitada a 30 participantes • 7 e 8 de novembro
                </span>

                <h3
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                    fontWeight: 600,
                    color: "#1c1813",
                    margin: 0,
                  }}
                >
                  {cursoTratadoresData.title}
                </h3>

                {/* Síntese visual do que está incluso */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "0.5rem 1rem",
                    fontSize: "0.82rem",
                    color: "#554c3e",
                    fontFamily: "'Inter', sans-serif",
                    margin: "0.25rem 0",
                  }}
                >
                  <span>✓ 2 dias de imersão</span>
                  <span>•</span>
                  <span>✓ Hospedagem inclusa</span>
                  <span>•</span>
                  <span>✓ Refeições completas</span>
                  <span>•</span>
                  <span>✓ Prática no Haras</span>
                  <span>•</span>
                  <span>✓ Certificado</span>
                </div>

                {/* Preço e condições oficiais */}
                <div style={{ marginTop: "0.25rem", textAlign: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(2.2rem, 4vw, 2.8rem)",
                      fontWeight: 900,
                      color: "#8c6e3d",
                      letterSpacing: "-0.02em",
                      display: "block",
                      lineHeight: 1,
                    }}
                  >
                    {cursoTratadoresData.investmentSection.price}
                  </span>
                  <span
                    style={{
                      fontSize: "0.82rem",
                      color: "#3d352b",
                      fontWeight: 600,
                      display: "block",
                      marginTop: "0.45rem",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {cursoTratadoresData.investmentSection.priceLabel}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#5f5547",
                      display: "block",
                      marginTop: "0.3rem",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {cursoTratadoresData.investmentSection.paymentOptions.pix}
                  </span>
                  <span
                    style={{
                      fontSize: "0.76rem",
                      color: "#7a6e5e",
                      display: "block",
                      marginTop: "0.25rem",
                      fontFamily: "'Inter', sans-serif",
                      maxWidth: "520px",
                      margin: "0.25rem auto 0",
                    }}
                  >
                    {cursoTratadoresData.investmentSection.paymentOptions.installmentsConfigurable ||
                      cursoTratadoresData.investmentSection.paymentOptions.installmentNote}
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={handleEnrollment}
                  style={{
                    backgroundColor: "#1c1813",
                    color: "#fbfaf7",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "1.15rem 3rem",
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
        .included-experience-card:hover {
          border-color: rgba(196, 169, 110, 0.6) !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5) !important;
        }
        .instructor-editorial-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (min-width: 960px) {
          .instructor-editorial-container {
            grid-template-columns: 380px 1fr;
            gap: 3.5rem;
          }
        }
        @media (min-width: 1200px) {
          .instructor-editorial-container {
            grid-template-columns: 420px 1fr;
            gap: 4.5rem;
          }
        }
        .instructor-credential-item {
          transition: all 0.25s ease;
        }
        .instructor-credential-item:hover {
          background-color: #ffffff !important;
          border-color: rgba(140, 110, 61, 0.45) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(28, 24, 19, 0.06) !important;
        }
      `}} />
    </main>
  );
}
