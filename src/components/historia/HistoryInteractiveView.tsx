"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export interface HistoryPhotoItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  caption: string;
  tag: string;
  aspectRatio?: string;
  objectPosition?: string;
}

export const HISTORY_PHOTOS: HistoryPhotoItem[] = [
  {
    id: "jornal-paraiba",
    src: "/historiadoharas/jornal-paraiba-premios-guzera.jpg",
    alt: "Recorte histórico de jornal: José e Ana Rita Tavares de Melo com a filha, premiação e criação de Guzerá",
    title: "Registro Histórico de Imprensa — Da Paraíba para o Brasil",
    subtitle: "Consagração Nacional da Criação",
    caption:
      "Recorte original de jornal de época: 'Da Paraíba — José e Ana Rita Tavares de Melo, com a filha, vieram da Paraíba divulgar sua criação de Guzerá. Obtiveram diversos prêmios, recebendo cumprimentos de Hélio Prates da Silveira, em nome do Banco Sulbrasileiro.' Documento que atesta o pioneirismo e a excelência que deram origem à marca JAR.",
    tag: "Imprensa Histórica",
    aspectRatio: "4/3",
    objectPosition: "center top",
  },
  {
    id: "ana-rita-touro",
    src: "/historiadoharas/ana-rita-touro-guzera-pasto.jpg",
    alt: "Dona Ana Rita Tavares de Melo ao lado de imponente reprodutor Guzerá no pasto",
    title: "Dona Ana Rita e a Seleção Zebuína Guzerá",
    subtitle: "Pioneirismo & Genética de Ponta",
    caption:
      "Dona Ana Rita Tavares de Melo no pasto, conduzindo um reprodutor de linhagem zebuína Guzerá de conformação zootécnica exemplar. A firmeza no trato com animais de grande porte e a visão de melhoramento genético marcaram as bases das negociações internacionais e da solidez da marca JAR.",
    tag: "Genética & Campo",
    aspectRatio: "3/4",
    objectPosition: "center 20%",
  },
  {
    id: "ana-rita-cavalo",
    src: "/historiadoharas/ana-rita-cavalo-tropa-elite.jpg",
    alt: "Dona Ana Rita abraçando cavalo do Haras com afeto e dedicação",
    title: "Dona Ana Rita e o Amor aos Cavalos",
    subtitle: "O Coração da Tropa de Elite",
    caption:
      "O afeto, a sensibilidade e o olhar apurado para os cavalos: Dona Ana Rita em momento genuíno de carinho com um dos animais de sela do Haras. Essa ligação profunda estabeleceu o padrão de bem-estar animal e docilidade que caracteriza a criação do Haras Nossa Senhora Aparecida.",
    tag: "Tropa de Cavalos",
    aspectRatio: "4/3",
    objectPosition: "center center",
  },
  {
    id: "ana-rita-filha-chapeu",
    src: "/historiadoharas/ana-rita-filha-chapeu-vaqueiro.jpg",
    alt: "Dona Ana Rita e filha vestindo chapéus em evento e pistas agropecuárias",
    title: "Tradição, Pistas e Grandes Exposições",
    subtitle: "Presença & Identidade Sertaneja",
    caption:
      "Mãe e filha em traje tradicional de vaqueira/cowgirl durante grandes encontros do agronegócio. A presença feminina forte nas pistas e feiras agropecuárias consolidou o prestígio da marca JAR em âmbito estadual, nacional e internacional.",
    tag: "Tradição & Pistas",
    aspectRatio: "3/4",
    objectPosition: "center 25%",
  },
  {
    id: "ana-rita-filha-uniao",
    src: "/historiadoharas/ana-rita-filha-uniao-familiar.jpg",
    alt: "Dona Ana Rita e filha abraçadas — união familiar e valores que fundaram o Haras",
    title: "A Força do Legado Familiar",
    subtitle: "Valores Transmitidos de Geração em Geração",
    caption:
      "A essência familiar que norteia cada decisão: o companheirismo e o compromisso ético transmitidos de mãe para filha. Mais do que uma criação zootécnica, o Haras Nossa Senhora Aparecida é uma história viva de família e devoção.",
    tag: "Raízes Familiares",
    aspectRatio: "3/4",
    objectPosition: "center center",
  },
  {
    id: "ana-rita-familia-jardim",
    src: "/historiadoharas/ana-rita-familia-jardim.jpg",
    alt: "Dona Ana Rita e a filha em momento de cumplicidade e descanso na propriedade",
    title: "Memória Afetiva e Caminhada",
    subtitle: "A Base Humana da Marca JAR",
    caption:
      "Registros fotográficos do acervo íntimo da família, guardando a memória dos dias simples de muito trabalho, perseverança e comunhão com a natureza que prepararam o caminho para todas as conquistas do haras.",
    tag: "Memória Íntima",
    aspectRatio: "3/4",
    objectPosition: "center center",
  },
];

interface HistoryChapterProps {
  number: string;
  tag: string;
  title: string;
  paragraphs: string[];
  photo: HistoryPhotoItem;
  secondaryPhoto?: HistoryPhotoItem;
  reverse?: boolean;
  onOpenPhoto: (photo: HistoryPhotoItem) => void;
}

export function HistoryChapter({
  number,
  tag,
  title,
  paragraphs,
  photo,
  secondaryPhoto,
  reverse = false,
  onOpenPhoto,
}: HistoryChapterProps) {
  return (
    <section
      style={{
        padding: "clamp(3.5rem, 6.5vw, 6rem) 0",
        borderBottom: "1px solid rgba(196, 169, 110, 0.16)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(2rem, 5vw, 4.5rem)",
          alignItems: "center",
        }}
      >
        {/* Coluna de Texto */}
        <div style={{ order: reverse ? 2 : 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.65rem",
              marginBottom: "0.85rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "var(--gold)",
                letterSpacing: "0.16em",
              }}
            >
              {number}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
              }}
            >
              {tag}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--off-white)",
              letterSpacing: "-0.02em",
              lineHeight: 1.18,
              marginBottom: "1.25rem",
              textTransform: "uppercase",
            }}
          >
            {title}
          </h2>

          <div
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "var(--gold)",
              marginBottom: "1.75rem",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
            }}
          >
            {paragraphs.map((text, idx) => (
              <p
                key={idx}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.92rem, 1.15vw, 1.02rem)",
                  color: "rgba(244, 239, 228, 0.84)",
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 350,
                }}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Destaque / Citação ou Selo de Autenticidade */}
          <div
            style={{
              marginTop: "1.75rem",
              padding: "0.9rem 1.2rem",
              backgroundColor: "rgba(196, 169, 110, 0.05)",
              borderLeft: "3px solid var(--gold)",
              borderRadius: "0 4px 4px 0",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontSize: "1.1rem",
                color: "var(--gold)",
              }}
              aria-hidden="true"
            >
              ✦
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "var(--gold-light)",
                letterSpacing: "0.08em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Registro verificado do Acervo Histórico JAR
            </span>
          </div>
        </div>

        {/* Coluna da Foto Principal */}
        <div style={{ order: reverse ? 1 : 2 }}>
          <div
            onClick={() => onOpenPhoto(photo)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenPhoto(photo);
              }
            }}
            style={{
              position: "relative",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "10px",
              backgroundColor: "rgba(22, 20, 17, 0.85)",
              border: "1px solid rgba(196, 169, 110, 0.3)",
              boxShadow: "0 18px 45px rgba(0, 0, 0, 0.65)",
              transition: "transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.boxShadow = "0 24px 55px rgba(196, 169, 110, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(196, 169, 110, 0.3)";
              e.currentTarget.style.boxShadow = "0 18px 45px rgba(0, 0, 0, 0.65)";
            }}
          >
            {/* Moldura da imagem */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                aspectRatio: photo.aspectRatio || "4/3",
                overflow: "hidden",
                borderRadius: "4px",
                backgroundColor: "#0d0c0a",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                style={{
                  objectFit: "cover",
                  objectPosition: photo.objectPosition || "center center",
                  filter: "contrast(1.04) brightness(0.98)",
                }}
              />

              {/* Tag sobre a foto */}
              <div
                style={{
                  position: "absolute",
                  top: "0.85rem",
                  left: "0.85rem",
                  backgroundColor: "rgba(13, 12, 10, 0.82)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(196, 169, 110, 0.4)",
                  padding: "0.3rem 0.65rem",
                  borderRadius: "3px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--gold)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "var(--gold-light)",
                    textTransform: "uppercase",
                  }}
                >
                  {photo.tag}
                </span>
              </div>

              {/* Botão de Ampliar Hover */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0.85rem",
                  right: "0.85rem",
                  backgroundColor: "rgba(13, 12, 10, 0.85)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(196, 169, 110, 0.4)",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "3px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  color: "var(--off-white)",
                  fontSize: "0.68rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
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
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Ampliar Foto</span>
              </div>
            </div>

            {/* Legenda sob a foto */}
            <div style={{ padding: "1rem 0.5rem 0.25rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "0.5rem",
                  marginBottom: "0.35rem",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "var(--off-white)",
                    margin: 0,
                  }}
                >
                  {photo.title}
                </h4>
                <span
                  style={{
                    fontSize: "0.62rem",
                    color: "var(--gold-light)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Acervo JAR
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  color: "rgba(244, 239, 228, 0.72)",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {photo.caption}
              </p>
            </div>
          </div>

          {/* Foto Secundária (se houver no capítulo) */}
          {secondaryPhoto && (
            <div
              onClick={() => onOpenPhoto(secondaryPhoto)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenPhoto(secondaryPhoto);
                }
              }}
              style={{
                marginTop: "1.25rem",
                cursor: "pointer",
                padding: "8px 12px",
                backgroundColor: "rgba(22, 20, 17, 0.6)",
                border: "1px solid rgba(196, 169, 110, 0.2)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.backgroundColor = "rgba(196, 169, 110, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(196, 169, 110, 0.2)";
                e.currentTarget.style.backgroundColor = "rgba(22, 20, 17, 0.6)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "56px",
                  height: "56px",
                  flexShrink: 0,
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={secondaryPhoto.src}
                  alt={secondaryPhoto.alt}
                  fill
                  sizes="56px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--off-white)",
                    marginBottom: "0.15rem",
                  }}
                >
                  {secondaryPhoto.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    color: "rgba(244, 239, 228, 0.6)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {secondaryPhoto.subtitle} — Clique para ver
                </div>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--gold-light)",
                  fontWeight: 700,
                }}
              >
                + Ver foto
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function HistoryInteractiveView() {
  const [activePhoto, setActivePhoto] = useState<HistoryPhotoItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("todos");

  // Fechar com ESC e navegação com setas
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === "Escape") {
        setActivePhoto(null);
      } else if (e.key === "ArrowRight") {
        const idx = HISTORY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
        const nextIdx = (idx + 1) % HISTORY_PHOTOS.length;
        setActivePhoto(HISTORY_PHOTOS[nextIdx]);
      } else if (e.key === "ArrowLeft") {
        const idx = HISTORY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
        const prevIdx = (idx - 1 + HISTORY_PHOTOS.length) % HISTORY_PHOTOS.length;
        setActivePhoto(HISTORY_PHOTOS[prevIdx]);
      }
    },
    [activePhoto]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const filteredPhotos =
    activeFilter === "todos"
      ? HISTORY_PHOTOS
      : HISTORY_PHOTOS.filter((p) =>
          activeFilter === "imprensa"
            ? p.id === "jornal-paraiba"
            : activeFilter === "cavalos"
            ? p.id === "ana-rita-cavalo" || p.id === "ana-rita-filha-chapeu"
            : activeFilter === "guzera"
            ? p.id === "ana-rita-touro"
            : p.id === "ana-rita-filha-uniao" || p.id === "ana-rita-familia-jardim"
        );

  return (
    <>
      {/* ── BARRA DE DESTAQUE / PONTOS CHAVE DA NARRATIVA ── */}
      <div
        style={{
          margin: "2.5rem 0 1rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {[
          { label: "Pioneirismo Feminino", desc: "Dona Ana Rita à frente da lida" },
          { label: "Marca JAR", desc: "José & Ana Rita: selo de confiança" },
          { label: "Projeção Global", desc: "Exportação zebuína aos EUA" },
          { label: "Tropa de Sela", desc: "Marcha, nobreza e temperamento" },
        ].map((highlight, hi) => (
          <div
            key={hi}
            style={{
              backgroundColor: "rgba(22, 20, 17, 0.7)",
              border: "1px solid rgba(196, 169, 110, 0.2)",
              borderRadius: "4px",
              padding: "1rem 1.25rem",
              borderLeft: "3px solid var(--gold)",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "var(--gold-light)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.2rem",
              }}
            >
              {highlight.label}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(244, 239, 228, 0.7)",
              }}
            >
              {highlight.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── SEÇÃO 1: A HISTÓRIA DE ANA RITA ── */}
      <HistoryChapter
        number="01"
        tag="Raízes & Matriarca"
        title="A História de Dona Ana Rita Tavares de Melo"
        paragraphs={[
          "A história do Haras e da marca JAR tem em Dona Ana Rita Tavares de Melo a sua alma e o seu alicerce moral. Mulher sertaneja de presença marcante, fibra inabalável e amor visceral pela terra e pelos animais, Dona Ana Rita construiu, ao lado da família, uma trajetória que une coragem e sensibilidade.",
          "Com sua garra e sabedoria diária no trato do campo, ela sempre esteve à frente de cada detalhe: desde o cuidado atento com as matrizes até a formação de um ambiente familiar onde integridade, honra e respeito pelo rebanho são valores sagrados.",
          "O respeito conquistado por Dona Ana Rita atravessou fronteiras, tornando-se referência de liderança feminina no agronegócio e na criação de animais de alta linhagem no Brasil.",
        ]}
        photo={HISTORY_PHOTOS[4]} // ana-rita-filha-uniao
        onOpenPhoto={setActivePhoto}
      />

      {/* ── SEÇÃO 2: A FUNDAÇÃO DO HARAS ── */}
      <HistoryChapter
        number="02"
        tag="Origens & Conquistas"
        title="Da Paraíba para o Brasil: O Nascimento do Haras"
        paragraphs={[
          "Com conhecimento adquirido em décadas de lida no semiárido nordestino, José e Ana Rita Tavares de Melo transformaram a vocação rural em referência nacional de pecuária de seleção.",
          "Registros da grande imprensa dos anos 1970 documentam a aclamação da família: premiados em exposições agropecuárias em diversas capitais brasileiras com reprodutores de alta linhagem, o casal firmou o nome do Haras Nossa Senhora Aparecida como sinônimo de credibilidade zootécnica.",
        ]}
        photo={HISTORY_PHOTOS[0]} // jornal-paraiba
        reverse
        onOpenPhoto={setActivePhoto}
      />

      {/* ── SEÇÃO 3: A MARCA JAR — ORIGEM E EVOLUÇÃO ── */}
      <HistoryChapter
        number="03"
        tag="Símbolo & Rigor"
        title="A Marca JAR: O Ferro que Assina a Excelência"
        paragraphs={[
          "A sigla JAR nasce do entrelaçamento dos nomes dos fundadores: José e Ana Rita. Mais do que um ferro gravado a fogo, transformou-se no selo de confiança de compradores de todo o país.",
          "Ter a marca JAR em um lote é garantia de aprumos equilibrados, nobreza zootécnica e genética comprovada por gerações de seleção rigorosa.",
        ]}
        photo={HISTORY_PHOTOS[3]} // ana-rita-filha-chapeu
        secondaryPhoto={HISTORY_PHOTOS[5]} // ana-rita-familia-jardim
        onOpenPhoto={setActivePhoto}
      />

      {/* ── SEÇÃO 4: VENDA DE TOUROS E PROJEÇÃO INTERNACIONAL ── */}
      <HistoryChapter
        number="04"
        tag="Fronteiras Superadas"
        title="Projeção Internacional: Touros Guzerá para os EUA"
        paragraphs={[
          "O manejo manso e a conformação de ponta dos animais selecionados por Dona Ana Rita atraíram os olhares de criadores estrangeiros. Reprodutores de grande porte eram conduzidos com serenidade e respeito no pasto, refletindo um manejo pioneiro e ético.",
          "Essa excelência culminou em negociações históricas e na exportação de reprodutores de elite para os Estados Unidos, levando a genética nordestina para o cenário agropecuário global.",
        ]}
        photo={HISTORY_PHOTOS[1]} // ana-rita-touro
        reverse
        onOpenPhoto={setActivePhoto}
      />

      {/* ── SEÇÃO 5: AS TROPAS DE ELITE DO HARAS ── */}
      <HistoryChapter
        number="05"
        tag="Equinocultura de Elite"
        title="A Tropa de Cavalos: Marcha, Nobreza & Bem-Estar"
        paragraphs={[
          "No haras, o cavalo sempre foi compreendido em sua essência: temperamento equilibrado, andamento cômodo e parceria leal com o cavaleiro. O treino e o convívio diário fundamentaram o conceito de manejo racional praticado na propriedade.",
          "Hoje, essa tradição centenária se desdobra na plataforma Mundo dos Cavalos, nos projetos de equoterapia Bem Viver e nos leilões do Shopping JAR 2026.",
        ]}
        photo={HISTORY_PHOTOS[2]} // ana-rita-cavalo
        onOpenPhoto={setActivePhoto}
      />

      {/* ── SEÇÃO 6: GALERIA COMPLETA DO ACERVO HISTÓRICO ── */}
      <section
        style={{
          padding: "clamp(3.5rem, 6.5vw, 6rem) 0",
          borderBottom: "1px solid rgba(196, 169, 110, 0.16)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              ACERVO FOTOGRÁFICO OFICIAL
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)",
              fontWeight: 800,
              color: "var(--off-white)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              margin: "0 0 1rem 0",
            }}
          >
            Memória Visual do Haras & Marca JAR
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.92rem, 1.2vw, 1.05rem)",
              color: "rgba(244, 239, 228, 0.75)",
              maxWidth: "760px",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Todas as fotos originais que documentam a caminhada de Dona Ana Rita Tavares de Melo, a fundação familiar e os marcos que eternizaram o Haras Nossa Senhora Aparecida. Clique em qualquer imagem para abrir em alta resolução.
          </p>

          {/* BOTÕES DE FILTRO */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              margin: "0 auto 2.5rem",
            }}
          >
            {[
              { id: "todos", label: "Todas as Fotos (6)" },
              { id: "imprensa", label: "Imprensa & Prêmios" },
              { id: "cavalos", label: "Tropa de Cavalos" },
              { id: "guzera", label: "Genética Guzerá" },
              { id: "familia", label: "Família & Raízes" },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setActiveFilter(btn.id)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.5rem 1rem",
                  borderRadius: "3px",
                  cursor: "pointer",
                  border:
                    activeFilter === btn.id
                      ? "1px solid var(--gold)"
                      : "1px solid rgba(196, 169, 110, 0.25)",
                  backgroundColor:
                    activeFilter === btn.id
                      ? "rgba(196, 169, 110, 0.2)"
                      : "rgba(22, 20, 17, 0.6)",
                  color:
                    activeFilter === btn.id
                      ? "var(--gold-light)"
                      : "rgba(244, 239, 228, 0.7)",
                  transition: "all 0.2s ease",
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* GRID COM FOTOS FILTRADAS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {filteredPhotos.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePhoto(item);
                }
              }}
              style={{
                cursor: "pointer",
                borderRadius: "6px",
                backgroundColor: "rgba(22, 20, 17, 0.9)",
                border: "1px solid rgba(196, 169, 110, 0.22)",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.28s ease",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.boxShadow = "0 16px 35px rgba(196, 169, 110, 0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(196, 169, 110, 0.22)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.5)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "4px",
                  overflow: "hidden",
                  backgroundColor: "#0d0c0a",
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{
                    objectFit: "cover",
                    objectPosition: item.objectPosition || "center center",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "0.6rem",
                    left: "0.6rem",
                    backgroundColor: "rgba(13, 12, 10, 0.82)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(196, 169, 110, 0.4)",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "3px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "var(--gold-light)",
                    textTransform: "uppercase",
                  }}
                >
                  Foto #{index + 1}
                </div>
              </div>

              <div style={{ padding: "0.9rem 0.4rem 0.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "var(--gold-light)",
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.tag}
                </span>

                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "var(--off-white)",
                    marginBottom: "0.4rem",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(244, 239, 228, 0.65)",
                    lineHeight: 1.5,
                    margin: "0 0 0.8rem 0",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    flex: 1,
                  }}
                >
                  {item.caption}
                </p>

                <div
                  style={{
                    paddingTop: "0.6rem",
                    borderTop: "1px dashed rgba(196, 169, 110, 0.18)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.68rem",
                    color: "var(--gold)",
                    fontWeight: 600,
                  }}
                >
                  <span>Ver em Alta Resolução</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MODAL / LIGHTBOX DE IMAGEM AMPLIADA ── */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(1rem, 3vw, 2.5rem)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "1000px",
              width: "100%",
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#14120f",
              borderRadius: "8px",
              border: "1px solid rgba(196, 169, 110, 0.4)",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(196, 169, 110, 0.15)",
              overflow: "hidden",
            }}
          >
            {/* Top Bar do Modal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid rgba(196, 169, 110, 0.2)",
                backgroundColor: "rgba(22, 20, 17, 0.95)",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                  }}
                >
                  Acervo Histórico Original JAR
                </span>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "var(--off-white)",
                    margin: "0.15rem 0 0 0",
                  }}
                >
                  {activePhoto.title}
                </h3>
              </div>

              {/* Botão Fechar */}
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label="Fechar visualização"
                style={{
                  background: "rgba(196, 169, 110, 0.12)",
                  border: "1px solid rgba(196, 169, 110, 0.35)",
                  color: "var(--off-white)",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--gold)";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(196, 169, 110, 0.12)";
                  e.currentTarget.style.color = "var(--off-white)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Imagem Ampliada */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(340px, 58vh, 600px)",
                backgroundColor: "#080706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Rodapé com Legenda Detalhada */}
            <div
              style={{
                padding: "1.25rem 1.75rem",
                backgroundColor: "rgba(18, 16, 13, 0.98)",
                borderTop: "1px solid rgba(196, 169, 110, 0.2)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(244, 239, 228, 0.88)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {activePhoto.caption}
              </p>

              {/* Controles de Navegação Prev/Next */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(196, 169, 110, 0.12)",
                }}
              >
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => {
                      const idx = HISTORY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
                      const prevIdx = (idx - 1 + HISTORY_PHOTOS.length) % HISTORY_PHOTOS.length;
                      setActivePhoto(HISTORY_PHOTOS[prevIdx]);
                    }}
                    style={{
                      background: "rgba(196, 169, 110, 0.12)",
                      border: "1px solid rgba(196, 169, 110, 0.3)",
                      color: "var(--off-white)",
                      padding: "0.35rem 0.85rem",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    ← Anterior
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const idx = HISTORY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
                      const nextIdx = (idx + 1) % HISTORY_PHOTOS.length;
                      setActivePhoto(HISTORY_PHOTOS[nextIdx]);
                    }}
                    style={{
                      background: "rgba(196, 169, 110, 0.12)",
                      border: "1px solid rgba(196, 169, 110, 0.3)",
                      color: "var(--off-white)",
                      padding: "0.35rem 0.85rem",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Próxima →
                  </button>
                </div>

                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    color: "var(--gold-light)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Use as setas do teclado ← → ou ESC para fechar
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
