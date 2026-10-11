"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShoppingJarLot } from "@/data/shoppingJarLots";

interface LotVideoCardProps {
  lot: ShoppingJarLot;
  whatsAppHref: string;
}

export function LotVideoCard({ lot, whatsAppHref }: LotVideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Autoplay when visible on screen, pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            video.muted = isMuted;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // Fallback: ensure video is muted and retry
                  video.muted = true;
                  setIsMuted(true);
                  video.play().then(() => setIsPlaying(true)).catch(() => {});
                });
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: [0, 0.25, 0.45, 0.75, 1.0],
        rootMargin: "0px",
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isMuted]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <article
      ref={containerRef}
      style={{
        backgroundColor: "#191510",
        border: "1px solid rgba(196, 169, 110, 0.22)",
        borderRadius: "14px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className="hover:border-[#c4a96e] hover:shadow-[0_12px_36px_rgba(196,169,110,0.18)]"
    >
      {/* ── ÁREA DO VÍDEO COM AUTO-PLAY AO SCROLLAR ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "9/16",
          maxHeight: "560px",
          backgroundColor: "#080706",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            togglePlay();
          }
        }}
        aria-label={`Vídeo do ${lot.lotNumber} - clique para pausar ou reproduzir`}
      >
        <video
          ref={videoRef}
          src={lot.videoUrl}
          preload="metadata"
          muted={isMuted}
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            backgroundColor: "#050505",
          }}
        />

        {/* Gradiente sutil no topo para contraste do badge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "70px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Badge do Lote no canto superior esquerdo */}
        <div
          style={{
            position: "absolute",
            top: "0.85rem",
            left: "0.85rem",
            padding: "0.32rem 0.8rem",
            backgroundColor: "rgba(13, 12, 10, 0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(196, 169, 110, 0.55)",
            borderRadius: "6px",
            fontSize: "0.72rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#c4a96e",
            boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {lot.lotNumber}
        </div>

        {/* Botão de Som (Mudo / Ativar som) no canto superior direito */}
        <button
          onClick={toggleSound}
          type="button"
          aria-label={isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
          style={{
            position: "absolute",
            top: "0.85rem",
            right: "0.85rem",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "rgba(13, 12, 10, 0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(196, 169, 110, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f4efe4",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
            zIndex: 3,
          }}
          className="hover:scale-110 hover:border-[#c4a96e]"
        >
          {isMuted ? (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e5dfd4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c4a96e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        {/* Indicador discreto apenas se o usuário pausou manualmente */}
        {!isPlaying && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "rgba(13, 12, 10, 0.75)",
              backdropFilter: "blur(6px)",
              border: "1.5px solid rgba(196, 169, 110, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(0,0,0,0.6)",
              pointerEvents: "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#c4a96e"
              style={{ marginLeft: "2px" }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}
      </div>

      {/* ── BOTÃO "CONSULTAR NO WHATSAPP" LOGO ABAIXO DO VÍDEO ── */}
      <div
        style={{
          padding: "1.1rem 1.15rem 1.3rem 1.15rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          alignItems: "center",
          backgroundColor: "#14100c",
          borderTop: "1px solid rgba(196, 169, 110, 0.15)",
        }}
      >
        {/* Identificação do Lote */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#f4efe4",
            textAlign: "center",
          }}
        >
          {lot.name}
        </div>

        {/* Botão Consultar no WhatsApp */}
        <a
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.55rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 800,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#0a1f0f",
            backgroundColor: "#25d366",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(37, 211, 102, 0.28)",
            transition: "all 0.25s ease",
          }}
          className="hover:bg-[#20ba59] hover:scale-[1.02] hover:shadow-[0_6px_22px_rgba(37,211,102,0.42)]"
        >
          {/* WhatsApp Icon */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>Consultar no WhatsApp</span>
        </a>
      </div>
    </article>
  );
}
