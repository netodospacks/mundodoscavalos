"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const mainNavItems: NavItem[] = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossa História", href: "/nossa-historia" },
  { label: "Pacotes de Cursos", href: "/pacotes" },
  { label: "Programas", href: "/programas" },
  { label: "Haras NS Aparecida", href: "/haras" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [userHasSwiped, setUserHasSwiped] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Detecta o scroll vertical para ajustar a densidade do fundo do cabeçalho
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detecta o scroll horizontal dos links para ocultar suavemente o indicador
  const handleNavScroll = () => {
    if (!userHasSwiped && navRef.current && navRef.current.scrollLeft > 15) {
      setUserHasSwiped(true);
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition:
          "background 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled
          ? "rgba(13, 12, 10, 0.94)"
          : "linear-gradient(to bottom, rgba(13, 12, 10, 0.75) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(157, 132, 82, 0.25)"
          : "1px solid rgba(244, 239, 228, 0.08)",
      }}
      role="banner"
    >
      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "0 clamp(0.85rem, 3.5vw, 2.5rem)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── LINHA 1 (SUPERIOR): MUNDO DOS CAVALOS [ESQ] | CONTA / LOGIN [DIR] ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "52px",
            borderBottom: "1px solid rgba(244, 239, 228, 0.06)",
            width: "100%",
          }}
        >
          {/* BRAND (FIXO À ESQUERDA) — Tipografia Sans-Serif Forte & Contemporânea */}
          <Link
            href="/"
            aria-label="Mundo dos Cavalos — Página inicial"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
            }}
          >
            <span
              className="font-sans"
              style={{
                fontWeight: 800,
                fontSize: "clamp(0.9rem, 1.3vw, 1.15rem)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--off-white)",
              }}
            >
              MUNDO DOS <span style={{ color: "var(--gold-light)", fontWeight: 700 }}>CAVALOS</span>
            </span>
          </Link>

          {/* CONTA / LOGIN (FIXO À DIREITA) */}
          <Link
            href="/login"
            aria-label="Área de Conta e Login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--off-white)",
              backgroundColor: "rgba(157, 132, 82, 0.18)",
              border: "1px solid var(--gold-light)",
              padding: "0.4rem 0.85rem",
              borderRadius: "2px",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold-light)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>CONTA / LOGIN</span>
          </Link>
        </div>

        {/* ── LINHA 2 (INFERIOR): NAVEGAÇÃO COM ROLAGEM HORIZONTAL E INDICADOR ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "0.4rem 0 0.35rem 0",
          }}
        >
          <nav
            ref={navRef}
            onScroll={handleNavScroll}
            aria-label="Navegação principal"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(1.25rem, 4vw, 2.2rem)",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              width: "100%",
              padding: "0.2rem 0",
            }}
          >
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(244, 239, 228, 0.85)",
                  whiteSpace: "nowrap",
                  scrollSnapAlign: "start",
                  flexShrink: 0,
                  padding: "0.2rem 0",
                  transition: "color 0.2s ease",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* INDICADOR DISCRETO "ARRASTE PARA O LADO →" */}
          {!userHasSwiped && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "2px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: "0.52rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                  color: "var(--gold-light)",
                  opacity: 0.8,
                  pointerEvents: "none",
                }}
              >
                arraste para o lado
                <span
                  style={{ display: "inline-block" }}
                  className="animate-slide-right"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
