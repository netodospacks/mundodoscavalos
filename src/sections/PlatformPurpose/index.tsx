"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";

export default function PlatformPurpose() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="a-plataforma"
      style={{
        backgroundColor: "#ede8df",
        position: "relative",
        paddingTop: "clamp(4.5rem, 8vw, 7rem)",
        paddingBottom: "clamp(4.5rem, 8vw, 7rem)",
        borderTop: "1px solid rgba(140, 110, 61, 0.15)",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
        <SectionReveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(2.5rem, 5vw, 4rem)", alignItems: "center" }}>
            
            {/* LEFT Column (Text) */}
            <div style={{ flex: "1 1 480px", minWidth: 0, width: "100%" }}>
              <span
                style={{
                  color: "#8c6e3d",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                A PLATAFORMA & NOSSA HISTÓRIA
              </span>
              
              <h2
                className="font-serif"
                style={{
                  color: "#1f1a14",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginTop: 0,
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Por que o Mundo dos Cavalos existe?
              </h2>
              
              <div style={{ width: "48px", height: "2px", backgroundColor: "#c4a96e", marginBottom: "1.75rem" }} />
              
              <p
                className="font-sans"
                style={{
                  color: "#4a4135",
                  fontWeight: 400,
                  fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                Levar conhecimento prático e responsável para quem deseja compreender melhor os cavalos, seu manejo, sua saúde, sua alimentação e seu bem-estar. Não apenas como tradição — mas como ciência aplicada com respeito ao animal.
              </p>
              
              <p
                className="font-sans"
                style={{
                  color: "#4a4135",
                  fontWeight: 400,
                  fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                Esta plataforma nasceu da experiência real com equinos, do Haras Nossa Senhora Aparecida, e do desejo de compartilhar esse conhecimento de forma acessível, séria e profissional.
              </p>
              
              <Link
                href="/historia"
                className="font-sans"
                style={{
                  color: "#1f1a14",
                  backgroundColor: "rgba(140, 110, 61, 0.12)",
                  border: "1px solid rgba(140, 110, 61, 0.3)",
                  padding: "0.75rem 1.4rem",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.25s ease",
                }}
              >
                <span>Conhecer a História do Haras</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* RIGHT Column (Vídeo Oficial em Destaque) */}
            <div
              style={{
                flex: "1 1 520px",
                minWidth: 0,
                width: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#16130f",
                  border: "1px solid rgba(140, 110, 61, 0.35)",
                  boxShadow: "0 22px 55px rgba(31, 26, 20, 0.2)",
                }}
              >
                <video
                  ref={videoRef}
                  src="/videos/hero-cavalos.mp4"
                  poster="/images/hero-bg.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Badge institucional sobre o vídeo */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "rgba(13, 12, 10, 0.75)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(196, 169, 110, 0.3)",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "100px",
                    pointerEvents: "none",
                    zIndex: 2,
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
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#f4efe4",
                    }}
                  >
                    Haras NS Aparecida
                  </span>
                </div>

                {/* Botão de Som / Áudio Rápido */}
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-label={isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
                  style={{
                    position: "absolute",
                    bottom: "3.75rem",
                    right: "1rem",
                    zIndex: 3,
                    backgroundColor: "rgba(13, 12, 10, 0.75)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(196, 169, 110, 0.4)",
                    color: "#f4efe4",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
