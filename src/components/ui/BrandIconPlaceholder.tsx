"use client";

import React from "react";

interface BrandIconPlaceholderProps {
  label?: string;
  className?: string;
  aspectRatio?: string;
}

export function BrandIconPlaceholder({
  label = "MUNDO DOS CAVALOS",
  className = "",
  aspectRatio = "16/9",
}: BrandIconPlaceholderProps) {
  return (
    <div
      className={`brand-icon-placeholder ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        aspectRatio: aspectRatio,
        background: "radial-gradient(circle at 50% 45%, #252018 0%, #12100d 70%, #0d0c0a 100%)",
        border: "1px solid rgba(196, 169, 110, 0.25)",
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "1rem",
        overflow: "hidden",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)",
      }}
    >
      {/* Brilho Dourado Sutil de Fundo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196, 169, 110, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Ícone Vetorial Elegante do Cavalo / Marca */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          backgroundColor: "rgba(13, 12, 10, 0.7)",
          border: "1px solid var(--gold)",
          boxShadow: "0 0 15px rgba(157, 132, 82, 0.3)",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold-light)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Ícone de Cavalo / Emblema Nobre */}
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>

      {/* Texto da Marca */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <span
          className="font-sans"
          style={{
            display: "block",
            fontSize: "0.62rem",
            fontWeight: 800,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold-light)",
            lineHeight: 1.2,
          }}
        >
          Mundo dos Cavalos
        </span>
        {label && label !== "MUNDO DOS CAVALOS" && (
          <span
            className="font-sans"
            style={{
              display: "block",
              fontSize: "0.55rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(244, 239, 228, 0.6)",
              marginTop: "0.2rem",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export default BrandIconPlaceholder;
