"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { JarLogo } from "@/components/ui/JarLogo";
import { SHOPPING_JAR_LOTS, ShoppingJarLot } from "@/data/shoppingJarLots";
import { LotVideoCard } from "@/components/shopping-jar/LotVideoCard";

export default function ShoppingJar2026Page() {

  // WhatsApp links
  const ANA_CRISTINA_PHONE = "5583988389505";
  const PARDAL_PHONE = "5583999227667";

  const getWhatsAppLink = (
    phone: string,
    message: string
  ) => {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const generalInterestMessage =
    "Olá! Gostaria de mais informações sobre o Shopping JAR 2026.";

  const getLotInterestMessage = (lot: ShoppingJarLot) => {
    return `Olá! Tenho interesse no ${lot.lotNumber} (${lot.name}) do Shopping JAR 2026 e gostaria de saber mais informações e condições de negociação direta.`;
  };

  return (
    <div
      style={{
        backgroundColor: "#110f0c",
        color: "#f4efe4",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════
          1. HERO SECTION — VISUAL DE REFERÊNCIA
          ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(520px, 75vh, 760px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#0d0c0a",
        }}
      >
        {/* Imagem de Fundo (Cavalo na Cerca ao Pôr do Sol) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        >
          <Image
            src="/images/shopping-jar-hero.jpg"
            alt="Cavalo Quarto de Milha — Shopping JAR 2026"
            fill
            priority
            quality={92}
            style={{
              objectFit: "cover",
              objectPosition: "right 20% center",
            }}
          />

          {/* Gradiente de Fusão Exatamente no Estilo da Referência */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #0d0c0a 0%, rgba(13, 12, 10, 0.94) 38%, rgba(13, 12, 10, 0.72) 60%, rgba(13, 12, 10, 0.25) 100%)",
            }}
          />

          {/* Gradiente vertical para suavizar topo e base */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(13, 12, 10, 0.5) 0%, transparent 20%, transparent 80%, #0d0c0a 100%)",
            }}
          />
        </div>

        {/* Conteúdo do Hero (Alinhado à Esquerda) */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1380px",
            width: "100%",
            margin: "0 auto",
            padding: "clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3.5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Link discreto para retornar ao site principal */}
          <div style={{ marginBottom: "2.5rem" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#c4a96e",
                padding: "0.35rem 0.75rem",
                backgroundColor: "rgba(13, 12, 10, 0.65)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(196, 169, 110, 0.3)",
                borderRadius: "2px",
                transition: "all 0.25s ease",
              }}
              className="hover:border-[#c4a96e] hover:bg-[rgba(196,169,110,0.15)]"
            >
              <span aria-hidden="true">←</span>
              <span>Haras NS Aparecida</span>
            </Link>
          </div>

          {/* Logo JAR com o Cavalo */}
          <div style={{ marginBottom: "1.25rem" }}>
            <JarLogo size={68} color="#c4a96e" />
          </div>

          {/* Título Principal Exatamente como na Referência */}
          <h1
            style={{
              margin: 0,
              lineHeight: 0.95,
              textTransform: "none",
            }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(3.8rem, 8vw, 7.5rem)",
                fontWeight: 400,
                color: "#f4efe4",
                letterSpacing: "-0.01em",
              }}
            >
              Shopping
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(3.5rem, 7.5vw, 6.8rem)",
                fontWeight: 700,
                color: "#c4a96e",
                letterSpacing: "0.02em",
                marginTop: "0.1rem",
              }}
            >
              JAR 2026
            </span>
          </h1>

          {/* Subtítulo */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 1.6vw, 1.35rem)",
              fontWeight: 400,
              color: "#f4efe4",
              letterSpacing: "0.04em",
              marginTop: "1.25rem",
              marginBottom: "1rem",
            }}
          >
            Genética JAR à sua disposição
          </p>

          {/* Linha Dourada Horizontal de Acento */}
          <div
            style={{
              width: "56px",
              height: "2px",
              backgroundColor: "#c4a96e",
              borderRadius: "1px",
            }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. SEÇÃO DE APRESENTAÇÃO DO EVENTO — FUNDO AREIA / CREME
          ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#f2ece2",
          color: "#221c17",
          padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 4vw, 3.5rem)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(2.5rem, 5vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* ── COLUNA DA ESQUERDA: TEXTO DO EVENTO + CARD "NÃO É LEILÃO" ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1rem, 1.25vw, 1.15rem)",
                lineHeight: 1.7,
                color: "#2a221b",
                fontWeight: 400,
                margin: 0,
              }}
            >
              Durante a Tropa de Elite JAR 2026, no dia 12 de outubro, o Haras
              realiza mais uma edição do Shopping JAR: uma oportunidade especial
              para quem deseja adquirir potros e potras com a genética JAR.
            </p>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1rem, 1.25vw, 1.15rem)",
                lineHeight: 1.7,
                color: "#2a221b",
                fontWeight: 400,
                margin: 0,
              }}
            >
              Serão 10 animais disponíveis para venda, com preços pré-fixados e
              negociação direta com o Haras.
            </p>

            {/* CARD "NÃO É LEILÃO" (DESIGN FIEL À REFERÊNCIA) */}
            <div
              style={{
                marginTop: "0.75rem",
                backgroundColor: "#e8ded1",
                border: "1px solid rgba(160, 130, 90, 0.28)",
                borderRadius: "12px",
                padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                boxShadow: "0 4px 18px rgba(34, 28, 23, 0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                }}
              >
                {/* Ícone de Proibição / Não é Leilão */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1.5px solid #8c734b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8c734b",
                  }}
                  aria-hidden="true"
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
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                </div>

                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#221c17",
                    margin: 0,
                  }}
                >
                  Não é leilão
                </h3>
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.92rem",
                  lineHeight: 1.65,
                  color: "#3f3328",
                  margin: 0,
                }}
              >
                O Shopping JAR funciona de forma simples e direta. Os animais
                são disponibilizados para venda individual, com valores
                previamente definidos, e os interessados podem entrar em contato
                diretamente com a equipe do Haras para conhecer os animais, tirar
                dúvidas e realizar a negociação.
              </p>
            </div>
          </div>

          {/* ── COLUNA DA DIREITA: OS 3 BLOCOS COM ÍCONES CIRCULARES ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2.2rem",
            }}
          >
            {/* Bloco 1: Conheça os animais */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.25rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#221c17",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(34, 28, 23, 0.12)",
                }}
                aria-hidden="true"
              >
                {/* Ícone de Cavalo */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f4efe4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.5V9a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 4 9v7.5" />
                  <path d="M7 11.5a5 5 0 0 0 10 0" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#221c17",
                    marginBottom: "0.35rem",
                  }}
                >
                  Conheça os animais
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    color: "#4a3e32",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Confira o catálogo, conheça cada animal, sua genealogia e as
                  informações disponíveis sobre a nossa genética.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    color: "#6b5847",
                    margin: 0,
                  }}
                >
                  Escolha o seu e entre em contato conosco para mais informações
                  sobre a compra.
                </p>
              </div>
            </div>

            {/* Bloco 2: 12 de outubro */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.25rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#221c17",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(34, 28, 23, 0.12)",
                }}
                aria-hidden="true"
              >
                {/* Ícone de Calendário */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f4efe4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <circle cx="8" cy="15" r="1" fill="#f4efe4" />
                  <circle cx="12" cy="15" r="1" fill="#f4efe4" />
                  <circle cx="16" cy="15" r="1" fill="#f4efe4" />
                </svg>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#221c17",
                    marginBottom: "0.35rem",
                  }}
                >
                  12 de outubro
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.92rem",
                    color: "#544537",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <span aria-hidden="true">📍</span>
                  <span>Durante a Tropa de Elite JAR 2026</span>
                </p>
              </div>
            </div>

            {/* Bloco 3: Informações e vendas com contatos WhatsApp */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.25rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#221c17",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(34, 28, 23, 0.12)",
                }}
                aria-hidden="true"
              >
                {/* Ícone de Telefone */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f4efe4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#221c17",
                    marginBottom: "0.5rem",
                  }}
                >
                  Informações e vendas
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {/* Contato: Ana Cristina */}
                  <a
                    href={getWhatsAppLink(
                      ANA_CRISTINA_PHONE,
                      generalInterestMessage
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.85rem",
                      padding: "0.45rem 0.85rem",
                      backgroundColor: "rgba(34, 28, 23, 0.06)",
                      border: "1px solid rgba(160, 130, 90, 0.3)",
                      borderRadius: "6px",
                      color: "#221c17",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    className="hover:bg-[rgba(34,28,23,0.12)] hover:border-[#8c734b]"
                  >
                    <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>
                      Ana Cristina
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.86rem",
                        color: "#1c6b39",
                        fontWeight: 700,
                      }}
                    >
                      {/* WhatsApp Mini SVG */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>83 98838.9505</span>
                    </span>
                  </a>

                  {/* Contato: Pardal */}
                  <a
                    href={getWhatsAppLink(
                      PARDAL_PHONE,
                      generalInterestMessage
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.85rem",
                      padding: "0.45rem 0.85rem",
                      backgroundColor: "rgba(34, 28, 23, 0.06)",
                      border: "1px solid rgba(160, 130, 90, 0.3)",
                      borderRadius: "6px",
                      color: "#221c17",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    className="hover:bg-[rgba(34,28,23,0.12)] hover:border-[#8c734b]"
                  >
                    <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>
                      Pardal
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.86rem",
                        color: "#1c6b39",
                        fontWeight: 700,
                      }}
                    >
                      {/* WhatsApp Mini SVG */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>83 99922.7667</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FRASE DE TRANSIÇÃO COM DIVISORES ELEGANTES ── */}
        <div
          style={{
            maxWidth: "1050px",
            margin: "4rem auto 0 auto",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "rgba(160, 130, 90, 0.4)",
            }}
          />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)",
              textAlign: "center",
              color: "#3f3328",
              margin: 0,
              maxWidth: "780px",
            }}
          >
            Shopping JAR 2026 — Uma oportunidade especial para quem deseja
            adquirir potros e potras com a genética JAR.
          </p>
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "rgba(160, 130, 90, 0.4)",
            }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. SEÇÃO "CONHEÇA OS ANIMAIS" — FUNDO ESCURO / PRESTÍGIO
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="conheca-os-animais"
        style={{
          backgroundColor: "#13100c",
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(196, 169, 110, 0.08) 0%, transparent 60%)",
          padding: "clamp(4rem, 7vw, 6.5rem) clamp(1.25rem, 4vw, 3.5rem)",
          borderTop: "1px solid rgba(196, 169, 110, 0.15)",
        }}
      >
        <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
          {/* Título da Seção (Exatamente como na Referência) */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
                fontWeight: 600,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#c4a96e",
                margin: "0 0 0.6rem 0",
              }}
            >
              CONHEÇA OS ANIMAIS
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(244, 239, 228, 0.65)",
                margin: 0,
              }}
            >
              10 Lotes Selecionados • Genética JAR • Venda Direta
            </p>
          </div>

          {/* Grid com os 10 Animais em Vídeo Auto-Play */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(clamp(280px, 26vw, 340px), 1fr))",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
              justifyContent: "center",
            }}
          >
            {SHOPPING_JAR_LOTS.map((lot) => (
              <LotVideoCard
                key={lot.id}
                lot={lot}
                whatsAppHref={getWhatsAppLink(
                  PARDAL_PHONE,
                  getLotInterestMessage(lot)
                )}
              />
            ))}
          </div>

          {/* ── RODAPÉ E LOGO JAR DE ENCERRAMENTO (COMO NA REFERÊNCIA) ── */}
          <div
            style={{
              marginTop: "5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {/* Logo JAR com Linhas Horizontais */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "700px",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "rgba(196, 169, 110, 0.3)",
                }}
              />
              <JarLogo size={62} color="#c4a96e" />
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "rgba(196, 169, 110, 0.3)",
                }}
              />
            </div>

            {/* Informações Finais e Contatos Rápidos */}
            <div
              style={{
                textAlign: "center",
                color: "rgba(244, 239, 228, 0.65)",
                fontSize: "0.82rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p style={{ margin: 0 }}>
                Haras Nossa Senhora Aparecida • Tropa de Elite JAR 2026
              </p>
              <p style={{ margin: 0, fontSize: "0.78rem" }}>
                Atendimento Direto: Ana Cristina (83 98838.9505) • Pardal (83
                99922.7667)
              </p>

              <div style={{ marginTop: "1rem" }}>
                <Link
                  href="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.74rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#c4a96e",
                  }}
                  className="hover:underline"
                >
                  <span>← Voltar para a página inicial</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
