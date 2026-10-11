"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Fechar menu quando mudar de rota
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/shopping-jar-2026")) {
    return null;
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition:
          "background 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease",
        background: scrolled
          ? "rgba(13, 12, 10, 0.96)"
          : "linear-gradient(to bottom, rgba(13, 12, 10, 0.88) 0%, rgba(13, 12, 10, 0.45) 70%, transparent 100%)",
        backdropFilter: scrolled ? "blur(18px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.2)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(196, 169, 110, 0.22)"
          : "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
      }}
      role="banner"
    >
      <div
        className="header-container"
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 2.75rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "74px",
          position: "relative",
        }}
      >
        {/* ── 1. LOGO TRANSPARENTE OFICIAL HARAS NOSSA SENHORA APARECIDA ── */}
        <Link
          href="/"
          aria-label="Haras Nossa Senhora Aparecida — Início"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.85rem",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {/* Imagem da logo aplicada diretamente, 100% transparente, sem caixas ou fundos */}
          <img
            src="/images/logo-haras-transparente.png"
            alt="Logo Haras Nossa Senhora Aparecida"
            style={{
              height: "clamp(42px, 5vw, 50px)",
              width: "auto",
              objectFit: "contain",
              display: "block",
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
            }}
          />

          {/* Tipografia institucional com acabamento refinado */}
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(0.82rem, 1.15vw, 0.95rem)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#f4efe4",
              }}
            >
              HARAS <span style={{ color: "#c4a96e", fontWeight: 700 }}>NS APARECIDA</span>
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(244, 239, 228, 0.55)",
                marginTop: "2px",
              }}
            >
              Mundo dos Cavalos
            </span>
          </div>
        </Link>

        {/* ── 2. BOTÃO DE TRÊS PONTINHOS VERTICAIS (MENU KEBAB) ── */}
        <div style={{ position: "relative" }}>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de opções"}
            className="header-kebab-btn"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              border: menuOpen
                ? "1px solid rgba(196, 169, 110, 0.5)"
                : "1px solid rgba(255, 255, 255, 0.12)",
              backgroundColor: menuOpen
                ? "rgba(196, 169, 110, 0.18)"
                : "rgba(255, 255, 255, 0.04)",
              color: menuOpen ? "#c4a96e" : "#f4efe4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: menuOpen ? "0 4px 16px rgba(196, 169, 110, 0.2)" : "none",
            }}
          >
            {/* Ícone de 3 pontinhos verticais */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ display: "block" }}
            >
              <circle cx="12" cy="5" r="2.2" />
              <circle cx="12" cy="12" r="2.2" />
              <circle cx="12" cy="19" r="2.2" />
            </svg>
          </button>

          {/* ── DROPDOWN / MENU DOS TRÊS PONTINHOS ── */}
          {menuOpen && (
            <div
              ref={menuRef}
              role="menu"
              aria-label="Opções de navegação"
              className="kebab-menu-dropdown"
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                right: 0,
                width: "clamp(240px, 80vw, 290px)",
                backgroundColor: "rgba(18, 16, 13, 0.98)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(196, 169, 110, 0.3)",
                borderRadius: "12px",
                padding: "0.6rem",
                boxShadow: "0 18px 45px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                zIndex: 110,
                transformOrigin: "top right",
                animation: "kebabFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Cabeçalho sutil do menu */}
              <div
                style={{
                  padding: "0.45rem 0.75rem 0.35rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
                  marginBottom: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(196, 169, 110, 0.9)",
                  }}
                >
                  Navegação
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    color: "rgba(244, 239, 228, 0.4)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Haras NS Aparecida
                </span>
              </div>

              {/* Lista dos 4 itens */}
              {navItems.map((item, idx) => {
                const isJar = item.href.includes("shopping-jar");
                const isBemViver = item.href.includes("bemviver");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.target}
                    rel={item.rel}
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="kebab-menu-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem 0.9rem",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: isJar ? "#c4a96e" : "#f4efe4",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.86rem",
                      fontWeight: isJar ? 700 : 500,
                      letterSpacing: "0.03em",
                      backgroundColor: isJar ? "rgba(196, 169, 110, 0.08)" : "transparent",
                      border: isJar ? "1px solid rgba(196, 169, 110, 0.22)" : "1px solid transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: isJar ? "#c4a96e" : "rgba(196, 169, 110, 0.5)",
                          flexShrink: 0,
                        }}
                      />
                      <span>{item.label}</span>
                    </div>

                    {isJar && (
                      <span
                        style={{
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          backgroundColor: "#c4a96e",
                          color: "#0d0c0a",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                        }}
                      >
                        DESTAQUE
                      </span>
                    )}

                    {isBemViver && (
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: 0.6 }}
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── ESTILOS HOVER E ANIMAÇÕES ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes kebabFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .header-kebab-btn:hover {
          border-color: rgba(196, 169, 110, 0.45) !important;
          color: #c4a96e !important;
          background-color: rgba(196, 169, 110, 0.12) !important;
        }

        .kebab-menu-item:hover {
          background-color: rgba(196, 169, 110, 0.14) !important;
          color: #c4a96e !important;
          transform: translateX(3px);
        }

        @media (max-width: 480px) {
          .kebab-menu-dropdown {
            right: 0 !important;
            width: calc(100vw - 2rem) !important;
            max-width: 300px !important;
          }
        }
      `,
        }}
      />
    </header>
  );
}
