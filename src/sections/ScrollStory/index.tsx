"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface Chapter {
  id: number;
  imageSide: "left" | "right";
  tag: string;
  title: string;
  description: string;
  images: string[];
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    imageSide: "right",
    tag: "MÓDULO 01 · MANEJO",
    title: "Manejo e Bem-Estar do Cavalo",
    description:
      "Domine as técnicas fundamentais de cuidado diário — alimentação, higiene, comportamento e conforto do seu animal com metodologia prática.",
    images: [
      "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=900&q=85",
      "https://images.unsplash.com/photo-1534567110353-3ef9b5d0f8a2?w=900&q=85",
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&q=85",
      "https://images.unsplash.com/photo-1551655510-555dc3be8633?w=900&q=85",
      "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=900&q=85",
    ],
  },
  {
    id: 2,
    imageSide: "left",
    tag: "MÓDULO 02 · NUTRIÇÃO",
    title: "Nutrição Equina Aplicada",
    description:
      "Aprenda a montar a dieta ideal para cavalos de alta performance, trabalho e lazer — com base científica e orientação veterinária.",
    images: [
      "https://images.unsplash.com/photo-1504197456521-1fe0d61a1a2e?w=900&q=85",
      "https://images.unsplash.com/photo-1574168022060-c52e34e3fa0d?w=900&q=85",
      "https://images.unsplash.com/photo-1548695607-9c73430e06ab?w=900&q=85",
      "https://images.unsplash.com/photo-1518992094820-2dc3bfabbb4b?w=900&q=85",
      "https://images.unsplash.com/photo-1594218076285-8e35a0916d84?w=900&q=85",
    ],
  },
  {
    id: 3,
    imageSide: "right",
    tag: "MÓDULO 03 · SAÚDE",
    title: "Primeiros Socorros Equinos",
    description:
      "Reconheça sinais de alerta, aplique os primeiros cuidados e saiba exatamente quando acionar o veterinário para salvar a vida do seu cavalo.",
    images: [
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?w=900&q=85",
      "https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=900&q=85",
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=900&q=85",
      "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=900&q=85",
      "https://images.unsplash.com/photo-1534567110353-3ef9b5d0f8a2?w=900&q=85",
    ],
  },
];

export default function ScrollStory() {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[][]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Pré-carrega todas as imagens para evitar flash
    CHAPTERS.forEach((ch) => {
      ch.images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    });

    let ticking = false;

    const update = () => {
      const vh = window.innerHeight;
      const isMobile = window.innerWidth < 768;

      CHAPTERS.forEach((chapter, ci) => {
        const wrapper = wrapperRefs.current[ci];
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const totalScrollable = rect.height - vh;
        const scrolled = -rect.top;
        const raw = scrolled / totalScrollable;
        const progress = Math.min(Math.max(raw, 0), 1);

        // ── CROSSFADE DE IMAGENS ──
        const imgs = imgRefs.current[ci];
        if (imgs && imgs.length > 0) {
          const N = imgs.length;
          const rawFrame = progress * (N - 1);
          const frameA = Math.floor(rawFrame);
          const frameB = Math.min(frameA + 1, N - 1);
          const frac = rawFrame - frameA;

          imgs.forEach((img, i) => {
            if (!img) return;
            if (i === frameA) img.style.opacity = (1 - frac).toFixed(3);
            else if (i === frameB) img.style.opacity = frac.toFixed(3);
            else img.style.opacity = "0";
          });
        }

        // ── BARRA DE PROGRESSO ──
        const bar = progressBarRefs.current[ci];
        if (bar) {
          bar.style.transform = `scaleX(${progress.toFixed(3)})`;
        }

        // ── TEXTO: slide e fade conforme progresso ──
        const textEl = textRefs.current[ci];
        if (textEl) {
          // Aparece rápido, some rápido
          const fade =
            progress < 0.12
              ? progress / 0.12
              : progress > 0.85
              ? (1 - progress) / 0.15
              : 1;

          let tx = 0;
          let ty = 0;
          if (isMobile) {
            ty = (1 - fade) * 30; // sobe de baixo no mobile
          } else {
            tx =
              chapter.imageSide === "right"
                ? (1 - fade) * -50
                : (1 - fade) * 50;
          }

          textEl.style.opacity = Math.max(0, Math.min(1, fade)).toFixed(3);
          textEl.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "var(--ink)" }}>
      {/* ── LABEL DO BLOCO ── */}
      <div
        style={{
          textAlign: "center",
          padding: "clamp(3rem, 6vw, 5rem) 1rem 0",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.35em",
            color: "var(--gold-light)",
            textTransform: "uppercase",
          }}
        >
          ✦ &nbsp; PILARES DO CONHECIMENTO &nbsp; ✦
        </span>
      </div>

      {/* ── CHAPTERS ── */}
      {CHAPTERS.map((chapter, ci) => (
        <div
          key={chapter.id}
          ref={(el) => {
            wrapperRefs.current[ci] = el;
          }}
          style={{
            position: "relative",
            /* 260vh → usuário passa tempo suficiente em cada capítulo */
            height: "260vh",
          }}
        >
          {/* Sticky container: ocupa 100vh e permanece fixo enquanto o usuário scrolla os 260vh */}
          <div
            className="scroll-story-sticky"
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              backgroundColor: "var(--ink)",
            }}
          >
            {/* ══════════════ DESKTOP: lado a lado ══════════════ */}
            <div className="scroll-story-desktop">
              {/* Lado da Imagem */}
              <div
                className={`scroll-story-img-col ${
                  chapter.imageSide === "left" ? "order-first" : "order-last"
                }`}
              >
                {chapter.images.map((src, ii) => (
                  <img
                    key={ii}
                    ref={(el) => {
                      if (!imgRefs.current[ci]) imgRefs.current[ci] = [];
                      imgRefs.current[ci][ii] = el;
                    }}
                    src={src}
                    alt={`${chapter.tag} frame ${ii + 1}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      opacity: ii === 0 ? 1 : 0,
                      willChange: "opacity",
                      transition: "opacity 0.15s linear",
                    }}
                  />
                ))}

                {/* Degradê que funde imagem com o fundo no lado do texto */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      chapter.imageSide === "right"
                        ? "linear-gradient(to right, var(--ink) 0%, transparent 28%)"
                        : "linear-gradient(to left, var(--ink) 0%, transparent 28%)",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />
                {/* Degradê superior e inferior */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, var(--ink) 0%, transparent 12%, transparent 88%, var(--ink) 100%)",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Lado do Texto */}
              <div
                className={`scroll-story-text-col ${
                  chapter.imageSide === "left" ? "order-last" : "order-first"
                }`}
              >
                <div
                  ref={(el) => {
                    textRefs.current[ci] = el;
                  }}
                  style={{
                    opacity: 0,
                    willChange: "opacity, transform",
                    transform:
                      chapter.imageSide === "right"
                        ? "translateX(-50px)"
                        : "translateX(50px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.32em",
                      color: "var(--gold-light)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "1rem",
                    }}
                  >
                    {chapter.tag}
                  </span>

                  <h2
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1.9rem, 3.2vw, 3rem)",
                      fontWeight: 900,
                      color: "var(--off-white)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                      margin: "0 0 1.25rem 0",
                    }}
                  >
                    {chapter.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                      color: "rgba(244,239,228,0.78)",
                      lineHeight: 1.7,
                      margin: "0 0 2rem 0",
                      maxWidth: "360px",
                    }}
                  >
                    {chapter.description}
                  </p>

                  <Link
                    href="#modulos"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--gold-light)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(196,169,110,0.4)",
                      paddingBottom: "0.2rem",
                    }}
                  >
                    <span>Ver módulo completo</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* ══════════════ MOBILE: empilhado ══════════════ */}
            <div className="scroll-story-mobile">
              {/* Imagem ocupa metade superior */}
              <div className="scroll-story-mobile-img">
                {chapter.images.map((src, ii) => (
                  <img
                    key={`m-${ii}`}
                    src={src}
                    alt={`${chapter.tag} frame ${ii + 1} mobile`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      opacity: ii === 0 ? 1 : 0,
                      willChange: "opacity",
                      transition: "opacity 0.15s linear",
                    }}
                    /* Mobile usa mesmo ref para crossfade — o update() aplica em ambos */
                    ref={(el) => {
                      /* apenas registra se ainda não foi registrado */
                      if (!imgRefs.current[ci]) imgRefs.current[ci] = [];
                      if (!imgRefs.current[ci][ii]) imgRefs.current[ci][ii] = el;
                    }}
                  />
                ))}
                {/* Degradê inferior da imagem */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "45%",
                    background:
                      "linear-gradient(to top, var(--ink) 0%, transparent 100%)",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Texto na metade inferior */}
              <div className="scroll-story-mobile-text">
                <div
                  style={{
                    opacity: 0,
                    willChange: "opacity, transform",
                    transform: "translateY(30px)",
                  }}
                  ref={(el) => {
                    /* Apenas sobreescreve se não houver ref desktop */
                    if (!textRefs.current[ci]) textRefs.current[ci] = el;
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 800,
                      letterSpacing: "0.3em",
                      color: "var(--gold-light)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {chapter.tag}
                  </span>

                  <h2
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1.5rem, 6vw, 2.2rem)",
                      fontWeight: 900,
                      color: "var(--off-white)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      margin: "0 0 0.85rem 0",
                    }}
                  >
                    {chapter.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.88rem",
                      color: "rgba(244,239,228,0.75)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {chapter.description}
                  </p>
                </div>
              </div>
            </div>

            {/* ── BARRA DE PROGRESSO DO CAPÍTULO ── */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: "rgba(196,169,110,0.15)",
                zIndex: 20,
              }}
            >
              <div
                ref={(el) => {
                  progressBarRefs.current[ci] = el;
                }}
                style={{
                  height: "100%",
                  backgroundColor: "var(--gold-light)",
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                  willChange: "transform",
                  boxShadow: "0 0 8px rgba(196,169,110,0.6)",
                }}
              />
            </div>

            {/* ── INDICADOR DE CAPÍTULO (dot) ── */}
            <div
              style={{
                position: "absolute",
                right: "clamp(1rem, 3vw, 2.5rem)",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {CHAPTERS.map((_, di) => (
                <div
                  key={di}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor:
                      di === ci
                        ? "var(--gold-light)"
                        : "rgba(196,169,110,0.25)",
                    boxShadow:
                      di === ci ? "0 0 8px rgba(196,169,110,0.7)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ── ESTILOS RESPONSIVOS ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* DESKTOP */
        .scroll-story-desktop {
          display: flex;
          width: 100%;
          height: 100%;
        }
        .scroll-story-mobile {
          display: none;
        }
        .scroll-story-img-col {
          position: relative;
          flex: 0 0 58%;
          height: 100%;
          overflow: hidden;
        }
        .scroll-story-text-col {
          flex: 0 0 42%;
          display: flex;
          align-items: center;
          padding: clamp(2rem, 5vw, 6rem);
          position: relative;
          z-index: 5;
        }
        .order-first { order: -1; }
        .order-last  { order:  1; }

        /* MOBILE */
        @media (max-width: 767px) {
          .scroll-story-desktop { display: none; }
          .scroll-story-mobile  {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
          }
          .scroll-story-mobile-img {
            position: relative;
            flex: 0 0 52%;
            overflow: hidden;
          }
          .scroll-story-mobile-text {
            flex: 1;
            display: flex;
            align-items: flex-start;
            padding: 0 1.5rem 2rem;
            overflow: hidden;
          }
        }
      `}} />
    </div>
  );
}
