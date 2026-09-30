"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { courseModules } from "@/data/courseModules";

export default function CourseModules() {
  const [selectedModule, setSelectedModule] = useState<typeof courseModules[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Estado do Showcase Estilo Vídeo de Informações do Curso (Cenas: 0, 1, 2, 3)
  const [activeScene, setActiveScene] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Efeito de auto-play do Showcase de Vídeo (troca de cena a cada 4.5s)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Função para rolar o catálogo horizontalmente
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scenes = [
    {
      id: 1,
      badge: "🎥 METODOLOGIA PRÁTICA EM HD",
      title: "10+ Módulos Práticos Gravados no Haras",
      description: "Conteúdo 100% embasado na rotina real de manejo, nutrição, primeiros socorros e ciência equina do Haras Nossa Senhora Aparecida.",
      tag: "1080p Full HD • Gravado em Campo",
    },
    {
      id: 2,
      badge: "♾️ TIPO DE ACESSO",
      title: "Acesso Vitalício (Sem Mensalidades)",
      description: "Pague uma única vez e tenha acesso para sempre. Sem taxas ocultas, renovações ou assinaturas recorrentes.",
      tag: "Pague 1x • Assista para Sempre",
    },
    {
      id: 3,
      badge: "📊 GRÁFICO DE ADESÃO EM TEMPO REAL",
      title: "24 de 100 Vagas Preenchidas (24%)",
      description: "Acompanhe em tempo real o preenchimento das vagas promocionais da turma vitalícia. Restam 76 vagas neste valor.",
      tag: "76 Vagas Restantes no Lote Vitalício",
      isGraph: true,
    },
    {
      id: 4,
      badge: "📱 COMPATIBILIDADE DE DISPOSITIVOS",
      title: "Assista na Web, Smart TV e App Android",
      description: "Sua plataforma está disponível em qualquer tela: no navegador do computador, na Smart TV da sua sala ou no aplicativo Android dedicado.",
      tag: "Aplicativo Android Nativo (.APK) Incluso",
    },
  ];

  return (
    <section
      id="modulos"
      className="section-gap"
      style={{ backgroundColor: "var(--ink-mid)", position: "relative" }}
    >
      <div className="container">
        {/* Header da seção Centralizado */}
        <SectionReveal type="up">
          <div
            style={{
              marginBottom: "clamp(2rem, 5vw, 3rem)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                color: "var(--gold-light)",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                fontWeight: 700,
                fontSize: "0.72rem",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              CATÁLOGO DE APRENDIZADO
            </span>

            <h2
              className="font-sans"
              style={{
                color: "var(--off-white)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                margin: "0.1rem 0",
              }}
            >
              Explore o Mundo dos Cavalos
            </h2>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
                color: "var(--gold-light)",
                fontWeight: 700,
                backgroundColor: "rgba(196, 169, 110, 0.1)",
                border: "1px solid rgba(196, 169, 110, 0.25)",
                padding: "0.3rem 0.85rem",
                borderRadius: "20px",
                marginTop: "0.25rem",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--gold-light)" }} />
              <span>10 MÓDULOS DISPONÍVEIS</span>
            </div>
          </div>
        </SectionReveal>

        {/* CONTÊINER DO CATÁLOGO DE POSTERS COM ROLAGEM HORIZONTAL & BOTÕES DE NAVEGAÇÃO */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Botão Scroll Esquerda */}
          <button
            onClick={() => handleScroll("left")}
            aria-label="Rolar para esquerda"
            style={{
              position: "absolute",
              left: "-1rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(13, 12, 10, 0.85)",
              border: "1px solid var(--gold-light)",
              color: "var(--off-white)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
            }}
            className="hover:scale-110 hide-mobile-btn"
          >
            ‹
          </button>

          {/* Trilho Horizontal de Posters Verticais 2:3 */}
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: "1.25rem",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              paddingBottom: "1rem",
              paddingTop: "0.3rem",
            }}
            className="no-scrollbar"
          >
            {courseModules.map((mod, index) => (
              <div
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                className="module-poster-card"
                role="button"
                tabIndex={0}
                aria-label={`Ver detalhes do Módulo ${mod.number}: ${mod.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedModule(mod);
                }}
                style={{
                  flex: "0 0 clamp(180px, 24vw, 240px)",
                  scrollSnapAlign: "start",
                  aspectRatio: "2/3",
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid rgba(196, 169, 110, 0.3)",
                  backgroundColor: "#151310",
                  cursor: "pointer",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.65)",
                  transition: "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1rem",
                }}
              >
                {/* Layer 1: Imagem de Fundo em HD */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${mod.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.65,
                    transition: "transform 0.5s ease, opacity 0.5s ease",
                    zIndex: 0,
                  }}
                  className="poster-bg-image"
                />

                {/* Layer 2: Degradê Escuro Profundo */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13,12,10,0.98) 0%, rgba(13,12,10,0.75) 50%, rgba(13,12,10,0.3) 80%, rgba(13,12,10,0.4) 100%)",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />

                {/* Layer 3 Top: Emblema Módulo + Ícone */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: "var(--gold-light)",
                      backgroundColor: "rgba(13,12,10,0.85)",
                      backdropFilter: "blur(6px)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "3px",
                      border: "1px solid rgba(196,169,110,0.35)",
                      textTransform: "uppercase",
                    }}
                  >
                    MÓDULO {mod.number}
                  </span>

                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      border: "1px solid rgba(196, 169, 110, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(13,12,10,0.75)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  </div>
                </div>

                {/* Layer 3 Bottom: Título e Descrição Integrados */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      color: "var(--gold)",
                      textTransform: "uppercase",
                    }}
                  >
                    MUNDO DOS CAVALOS
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                      fontWeight: 800,
                      lineHeight: 1.2,
                      color: "var(--off-white)",
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {mod.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 400,
                      color: "rgba(244,239,228,0.8)",
                      lineHeight: 1.4,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {mod.description}
                  </p>

                  <div
                    style={{
                      marginTop: "0.4rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "var(--gold-light)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span>VER CONTEÚDO</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão Scroll Direita */}
          <button
            onClick={() => handleScroll("right")}
            aria-label="Rolar para direita"
            style={{
              position: "absolute",
              right: "-1rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(13, 12, 10, 0.85)",
              border: "1px solid var(--gold-light)",
              color: "var(--off-white)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
            }}
            className="hover:scale-110 hide-mobile-btn"
          >
            ›
          </button>
        </div>

        {/* Modal de Detalhes do Módulo */}
        {selectedModule && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(13, 12, 10, 0.9)",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.25rem",
            }}
            onClick={() => setSelectedModule(null)}
          >
            <div
              style={{
                backgroundColor: "var(--ink-soft)",
                border: "1px solid var(--gold)",
                maxWidth: "580px",
                width: "100%",
                borderRadius: "6px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 25px 60px rgba(0,0,0,0.9)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Modal em HD */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                <img
                  src={selectedModule.image}
                  alt={selectedModule.imageAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, var(--ink-soft) 0%, transparent 80%)",
                    pointerEvents: "none",
                  }}
                />
                <button
                  onClick={() => setSelectedModule(null)}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    backgroundColor: "rgba(13, 12, 10, 0.8)",
                    border: "1px solid rgba(244, 239, 228, 0.25)",
                    color: "var(--off-white)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                  }}
                  aria-label="Fechar janela"
                >
                  ✕
                </button>
              </div>

              {/* Conteúdo do Modal */}
              <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    color: "var(--gold-light)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  MÓDULO {selectedModule.number}
                </span>

                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "var(--off-white)",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  {selectedModule.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(244, 239, 228, 0.85)",
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {selectedModule.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "0.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(244, 239, 228, 0.1)",
                  }}
                >
                  <Link
                    href="#quero-aprender"
                    onClick={() => setSelectedModule(null)}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      padding: "0.85rem 1.5rem",
                      backgroundColor: "var(--off-white)",
                      color: "var(--ink)",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    INSCREVER-SE NO CURSO →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SHOWCASE ANIMADO ESTILO TRAILER / VÍDEO ("INFORMAÇÕES DO CURSO") */}
        <SectionReveal type="up">
          <div
            id="inscreva-se"
            style={{
              marginTop: "clamp(3.5rem, 7vw, 5.5rem)",
              backgroundColor: "rgba(18, 16, 13, 0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(196, 169, 110, 0.35)",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.95), inset 0 0 40px rgba(196,169,110,0.05)",
            }}
          >
            {/* Header do Player de Vídeo */}
            <div
              style={{
                backgroundColor: "rgba(13, 12, 10, 0.9)",
                borderBottom: "1px solid rgba(196, 169, 110, 0.2)",
                padding: "0.85rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444", boxShadow: "0 0 8px #ef4444" }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    color: "var(--gold-light)",
                    textTransform: "uppercase",
                  }}
                >
                  APRESENTAÇÃO VIRTUAL • INFORMAÇÕES DO CURSO
                </span>
              </div>

              {/* Botão Play / Pause da Animação */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(196, 169, 110, 0.3)",
                  borderRadius: "20px",
                  padding: "0.25rem 0.75rem",
                  color: "var(--off-white)",
                  fontSize: "0.65rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <span>{isPlaying ? "❚❚ PAUSAR" : "▶ REPRODUZIR"}</span>
              </button>
            </div>

            {/* PALCO DE VÍDEO CINEMATOGRÁFICO (CENAS COM TRANSIÇÕES EFEITO TEASER) */}
            <div
              style={{
                position: "relative",
                minHeight: "340px",
                padding: "clamp(2rem, 5vw, 4rem)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                overflow: "hidden",
                background: "radial-gradient(circle at 50% 40%, rgba(196, 169, 110, 0.12) 0%, rgba(13,12,10,0.98) 75%)",
              }}
            >
              {/* CENA ATIVA */}
              <div
                key={activeScene}
                className="animate-scene-fade"
                style={{
                  width: "100%",
                  maxWidth: "720px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.2rem",
                }}
              >
                {/* Badge da Cena */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.22em",
                    color: "var(--gold-light)",
                    backgroundColor: "rgba(13, 12, 10, 0.8)",
                    border: "1px solid var(--gold)",
                    padding: "0.35rem 1rem",
                    borderRadius: "30px",
                    textTransform: "uppercase",
                  }}
                >
                  {scenes[activeScene].badge}
                </span>

                {/* Título Principal da Cena */}
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    fontWeight: 900,
                    color: "var(--off-white)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    margin: 0,
                    textShadow: "0 4px 25px rgba(0,0,0,0.9)",
                  }}
                >
                  {scenes[activeScene].title}
                </h3>

                {/* Descrição */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                    color: "rgba(244, 239, 228, 0.85)",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: "600px",
                  }}
                >
                  {scenes[activeScene].description}
                </p>

                {/* Se for a Cena do Gráfico (Cena 3) */}
                {scenes[activeScene].isGraph && (
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      marginTop: "0.5rem",
                      backgroundColor: "rgba(13, 12, 10, 0.8)",
                      border: "1px solid var(--gold-light)",
                      borderRadius: "8px",
                      padding: "1rem 1.25rem",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 800, color: "var(--gold-light)", marginBottom: "0.4rem" }}>
                      <span>ADESÃO EM TEMPO REAL</span>
                      <span>24 / 100 VAGAS (24%)</span>
                    </div>
                    <div style={{ width: "100%", height: "12px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "6px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: "24%",
                          background: "linear-gradient(90deg, #856a33 0%, #c4a96e 50%, #fff2d0 100%)",
                          borderRadius: "6px",
                          boxShadow: "0 0 15px rgba(196,169,110,0.8)",
                        }}
                      />
                    </div>
                  </div>
                )}

                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    color: "rgba(244,239,228,0.55)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {scenes[activeScene].tag}
                </span>
              </div>
            </div>

            {/* CONTROLES / NAVEGAÇÃO DE CENAS (TABS + TIMELINE DE PROGRESSO) */}
            <div
              style={{
                backgroundColor: "rgba(13, 12, 10, 0.95)",
                borderTop: "1px solid rgba(196, 169, 110, 0.2)",
                padding: "1rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              {/* Abas Selecionáveis de Cenas */}
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {scenes.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => {
                      setActiveScene(idx);
                      setIsPlaying(false);
                    }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "0.45rem 0.85rem",
                      borderRadius: "4px",
                      border: idx === activeScene ? "1px solid var(--gold-light)" : "1px solid rgba(244,239,228,0.15)",
                      backgroundColor: idx === activeScene ? "rgba(196, 169, 110, 0.2)" : "rgba(255,255,255,0.04)",
                      color: idx === activeScene ? "var(--gold-light)" : "rgba(244,239,228,0.7)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    0{scene.id} {scene.badge.split(" ")[1] || "CENA"}
                  </button>
                ))}
              </div>

              {/* Botão de Inscrição Direta */}
              <Link
                href="#quero-aprender"
                style={{
                  padding: "0.95rem 2.5rem",
                  fontSize: "0.8rem",
                  letterSpacing: "0.14em",
                  backgroundColor: "var(--off-white)",
                  color: "var(--ink)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
                }}
                className="hover:scale-102"
              >
                <span>GARANTIR MEU ACESSO VITALÍCIO</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </SectionReveal>

        {/* Estilos CSS do Grid Responsivo de Posters & Animação de Transição de Cenas */}
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .module-poster-card:hover {
            border-color: var(--gold-light) !important;
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 15px 35px rgba(0,0,0,0.85) !important;
          }
          .module-poster-card:hover .poster-bg-image {
            transform: scale(1.08);
            opacity: 0.85 !important;
          }
          @keyframes sceneFade {
            0% {
              opacity: 0;
              transform: translateY(12px) scale(0.97);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-scene-fade {
            animation: sceneFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @media (max-width: 767px) {
            .hide-mobile-btn { display: none !important; }
          }
        `}} />
      </div>
    </section>
  );
}

