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
    alt: "Ana Rita Tavares de Melo ao lado de imponente reprodutor Guzerá no pasto",
    title: "Ana Rita e a Seleção Zebuína Guzerá",
    subtitle: "Pioneirismo & Genética de Ponta",
    caption:
      "Ana Rita Tavares de Melo no pasto, conduzindo um reprodutor de linhagem zebuína Guzerá de conformação zootécnica exemplar. A firmeza no trato com animais de grande porte e a visão de melhoramento genético marcaram as bases das negociações internacionais e da solidez da marca JAR.",
    tag: "Genética & Campo",
    aspectRatio: "3/4",
    objectPosition: "center 20%",
  },
  {
    id: "ana-rita-cavalo",
    src: "/historiadoharas/ana-rita-cavalo-tropa-elite.jpg",
    alt: "Ana Rita abraçando cavalo do Haras com afeto e dedicação",
    title: "Ana Rita e o Amor aos Cavalos",
    subtitle: "O Coração da Tropa de Elite",
    caption:
      "O afeto, a sensibilidade e o olhar apurado para os cavalos: Ana Rita em momento genuíno de carinho com um dos animais de sela do Haras. Essa ligação profunda estabeleceu o padrão de bem-estar animal e docilidade que caracteriza a criação do Haras Nossa Senhora Aparecida.",
    tag: "Tropa de Cavalos",
    aspectRatio: "4/3",
    objectPosition: "center center",
  },
  {
    id: "ana-rita-filha-chapeu",
    src: "/historiadoharas/ana-rita-filha-chapeu-vaqueiro.jpg",
    alt: "Ana Rita e filha vestindo chapéus em evento e pistas agropecuárias",
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
    alt: "Ana Rita e filha abraçadas — união familiar e valores que fundaram o Haras",
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
    alt: "Ana Rita e a filha em momento de cumplicidade e descanso na propriedade",
    title: "Memória Afetiva e Caminhada",
    subtitle: "A Base Humana da Marca JAR",
    caption:
      "Registros fotográficos do acervo íntimo da família, guardando a memória dos dias simples de muito trabalho, perseverança e comunhão com a natureza que prepararam o caminho para todas as conquistas do haras.",
    tag: "Memória Íntima",
    aspectRatio: "3/4",
    objectPosition: "center center",
  },
];

export interface TimelineStage {
  number: string;
  stageBadge: string;
  periodOrStatus: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  photo?: HistoryPhotoItem;
  secondaryPhoto?: HistoryPhotoItem;
  isMemoryToConfirm?: boolean;
  pressQuote?: string;
  isCurrentStage?: boolean;
}

export default function HistoryInteractiveView() {
  const [activePhoto, setActivePhoto] = useState<HistoryPhotoItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("todos");

  // Fechar modal ao pressionar ESC e navegar com setas
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === "Escape") {
        setActivePhoto(null);
      } else if (e.key === "ArrowLeft") {
        const idx = HISTORY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
        const prevIdx = (idx - 1 + HISTORY_PHOTOS.length) % HISTORY_PHOTOS.length;
        setActivePhoto(HISTORY_PHOTOS[prevIdx]);
      } else if (e.key === "ArrowRight") {
        const idx = HISTORY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
        const nextIdx = (idx + 1) % HISTORY_PHOTOS.length;
        setActivePhoto(HISTORY_PHOTOS[nextIdx]);
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

  // As 7 Etapas Cronológicas da Linha do Tempo (Alteração 5)
  const timelineStages: TimelineStage[] = [
    {
      number: "01",
      stageBadge: "RAÍZES & FAMÍLIA",
      periodOrStatus: "Tradição Familiar & Vocação Rural",
      title: "As Origens da Família e a Relação com a Terra",
      subtitle: "A convivência com o semiárido e o despertar da lida com animais",
      paragraphs: [
        "A história do Haras Nossa Senhora Aparecida tem início na relação profunda de José e Ana Rita Tavares de Melo com a terra e com a vida no campo.",
        "No semiárido paraibano, a dedicação diária à pecuária e a observação atenta do comportamento dos animais forjaram uma filosofia baseada na paciência, no respeito aos ciclos da natureza e na perseverança diante dos desafios do clima e da caatinga.",
        "Essas primeiras vivências constituíram a base moral e humana que sustentaria, anos mais tarde, a construção de um dos criatórios mais respeitados da região.",
      ],
      photo: HISTORY_PHOTOS[5], // ana-rita-familia-jardim
    },
    {
      number: "02",
      stageBadge: "MEMÓRIA FAMILIAR",
      periodOrStatus: "Tradição Oral • Registro a Ser Confirmado",
      title: "A História do Avô: O Cavalo que Chegou no Ventre da Égua",
      subtitle: "Um episódio singular transmitido com afeto através das gerações",
      isMemoryToConfirm: true,
      paragraphs: [
        "Entre as passagens mais singulares e queridas guardadas pela memória da família, destaca-se o episódio da aquisição do cavalo negociado pelo avô, que teria sido trocado por bois e chegado à fazenda ainda no ventre de uma égua.",
        "Transmitida com carinho entre as gerações, essa história simboliza o espírito destemido e a paixão pelos equinos que já pulsavam nas origens da família Tavares de Melo.",
        "Preservamos essa narrativa como uma memória familiar viva a ser confirmada, mantendo os registros abertos para a inclusão futura de dados documentais, como a identificação do animal, a data exata e a procedência da égua, à medida que forem catalogados.",
      ],
    },
    {
      number: "03",
      stageBadge: "FORMAÇÃO DO CRIATÓRIO",
      periodOrStatus: "Estruturação & Manejo Racional",
      title: "A Formação da Criação e a Construção do Haras",
      subtitle: "Decisões pioneiras, respeito às matrizes e manejo cuidadoso",
      paragraphs: [
        "À medida que a atividade criatória se expandia, as decisões e experiências diárias da família começaram a transformar a propriedade em um criatório estruturado.",
        "O olhar cuidadoso de Ana Rita na lida diária — com atenção redobrada à saúde das matrizes, à nutrição e à mansidão dos potros — somou-se à visão prática de José Tavares de Melo na gestão das terras e das pastagens.",
        "Essa união estabeleceu um padrão diferenciado: animais criados com liberdade, aprumos fortes e convívio harmonioso com o ser humano, alicerçando a identidade do Haras Nossa Senhora Aparecida.",
      ],
      photo: HISTORY_PHOTOS[4], // ana-rita-filha-uniao
    },
    {
      number: "04",
      stageBadge: "GENÉTICA & SELEÇÃO",
      periodOrStatus: "Rigor Zootécnico & Exportação aos EUA",
      title: "A Evolução da Genética JAR: O Ferro que Assina a Excelência",
      subtitle: "O entrelaçamento de José e Ana Rita e a projeção internacional",
      paragraphs: [
        "A marca JAR nasce da união dos nomes dos fundadores: José e Ana Rita Tavares de Melo. Mais do que um ferro gravado a fogo, o símbolo transformou-se no selo de credibilidade zootécnica reconhecido por criadores e compradores em todo o território nacional.",
        "A seleção genética atingiu marcos reais de destaque histórico: reprodutores de linhagem zebuína Guzerá com conformação exemplar eram conduzidos com serenidade e docilidade nos pastos da propriedade, chamando a atenção de técnicos e pecuaristas.",
        "A consistência desse trabalho culminou na exportação histórica de reprodutores de elite para os Estados Unidos, levando a genética selecionada na Paraíba para o cenário agropecuário global.",
      ],
      photo: HISTORY_PHOTOS[1], // ana-rita-touro
    },
    {
      number: "05",
      stageBadge: "CONSOLIDAÇÃO & PISTAS",
      periodOrStatus: "Consagração Nacional • Anos 1970 – 1980",
      title: "A Consolidação do Haras: Reconhecimento nas Grandes Pistas",
      subtitle: "José e Ana Rita Tavares de Melo aclamados pela imprensa e pelo setor",
      pressQuote:
        "Da Paraíba — José e Ana Rita Tavares de Melo, com a filha, vieram da Paraíba divulgar sua criação de Guzerá. Obtiveram diversos prêmios, recebendo cumprimentos de Hélio Prates da Silveira, em nome do Banco Sulbrasileiro.",
      paragraphs: [
        "A consolidação do Haras Nossa Senhora Aparecida ganhou as grandes pistas e exposições agropecuárias do Brasil a partir dos anos 1970.",
        "Recortes históricos originais da imprensa documentam momentos decisivos da trajetória da família, celebrando premiações oficiais obtidas em diversas capitais brasileiras.",
        "Esse reconhecimento público atesta o pioneirismo do casal e firmou o Haras como referência de excelência zootécnica e seriedade no meio rural brasileiro.",
      ],
      photo: HISTORY_PHOTOS[0], // jornal-paraiba
    },
    {
      number: "06",
      stageBadge: "TROPAS DE ELITE",
      periodOrStatus: "Encontros Anuais • Marcha, Nobreza & Bem-Estar",
      title: "As Tropas de Elite: A Celebração dos Melhores Animais de Sela",
      subtitle: "Eventos anuais dedicados à marcha cômoda, aprumos e temperamento dócil",
      paragraphs: [
        "A paixão pelos equinos consolidou a tradição das Tropas de Elite, encontros anuais aguardados que celebram os melhores animais de sela do Haras Nossa Senhora Aparecida.",
        "Cada exemplar apresentado na tropa reunia as virtudes cultivadas na propriedade: andamento macio e marchador, nobreza zootécnica e, acima de tudo, equilíbrio e docilidade construídos através do manejo humanizado.",
        "Fotografias do acervo familiar documentam o afeto de Ana Rita no abraço sincero aos cavalos da tropa e a presença forte da tradição sertaneja nas pistas. A estrutura histórica permanece catalogada para registro das edições anuais confirmadas.",
      ],
      photo: HISTORY_PHOTOS[2], // ana-rita-cavalo
      secondaryPhoto: HISTORY_PHOTOS[3], // ana-rita-filha-chapeu
    },
    {
      number: "07",
      stageBadge: "PRESENTE & FUTURO",
      periodOrStatus: "Legado Vivo • Continuidade, Capacitação & Equoterapia",
      title: "O Haras nos Dias Atuais: Continuidade e Novos Horizontes",
      subtitle: "A preservação da genética JAR e a expansão para educação e impacto social",
      isCurrentStage: true,
      paragraphs: [
        "O compromisso iniciado por José e Ana Rita Tavares de Melo segue vivo e ativo nas mãos das novas gerações da família.",
        "Hoje, o Haras Nossa Senhora Aparecida mantém a criação equina com a mesma retidão zootécnica, protegendo a pureza da genética JAR e expandindo sua missão em três pilares integrados:",
        "A formação profissional técnica com o Curso de Capacitação de Tratadores de Equinos, o impacto humano e terapêutico com o Projeto Bem Viver de Equoterapia, e o acesso qualificado a animais de elite através do Shopping JAR.",
      ],
    },
  ];

  return (
    <>
      {/* ── BARRA DE DESTAQUE / PILARES DA CAMINHADA HISTÓRICA ── */}
      <div
        style={{
          margin: "2.5rem 0 3.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {[
          { label: "Origens & Família", desc: "Dedicação à terra e vocação no campo" },
          { label: "Marca JAR", desc: "José & Ana Rita: o ferro da excelência" },
          { label: "Genética de Ponta", desc: "Seleção zebuína e exportação aos EUA" },
          { label: "Tropas de Elite", desc: "Marcha, nobreza e temperamento superior" },
        ].map((highlight, hi) => (
          <div
            key={hi}
            style={{
              backgroundColor: "rgba(22, 20, 17, 0.75)",
              border: "1px solid rgba(196, 169, 110, 0.22)",
              borderRadius: "6px",
              padding: "1.1rem 1.25rem",
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
                marginBottom: "0.25rem",
              }}
            >
              {highlight.label}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(244, 239, 228, 0.75)",
                lineHeight: 1.45,
              }}
            >
              {highlight.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── SEÇÃO DA LINHA DO TEMPO CRONOLÓGICA (7 ETAPAS) ── */}
      <section
        style={{
          padding: "clamp(3rem, 6vw, 5rem) 0",
          borderBottom: "1px solid rgba(196, 169, 110, 0.16)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 6vw, 4.5rem)" }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold)",
              display: "block",
              marginBottom: "0.6rem",
            }}
          >
            CRONOLOGIA OFICIAL DA MARCA JAR
          </span>

          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "var(--off-white)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: "0 0 1rem 0",
            }}
          >
            Linha do Tempo do Haras Nossa Senhora Aparecida
          </h2>

          <div
            style={{
              width: "56px",
              height: "2px",
              backgroundColor: "var(--gold)",
              margin: "0 auto 1.25rem",
            }}
          />

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.92rem, 1.2vw, 1.05rem)",
              color: "rgba(244, 239, 228, 0.78)",
              maxWidth: "760px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Acompanhe as origens familiares, as decisões que estruturaram o criatório, os marcos comprovados da genética JAR e a continuidade do legado nos dias atuais.
          </p>
        </div>

        {/* ESTRUTURA VERTICAL DA LINHA DO TEMPO */}
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {timelineStages.map((stage, idx) => (
            <div
              key={stage.number}
              style={{
                position: "relative",
                paddingBottom: idx === timelineStages.length - 1 ? "1rem" : "clamp(3.5rem, 6vw, 5rem)",
                paddingLeft: "clamp(2rem, 5vw, 3.75rem)",
                borderLeft:
                  idx === timelineStages.length - 1
                    ? "2px solid transparent"
                    : "2px solid rgba(196, 169, 110, 0.28)",
              }}
            >
              {/* Marcador Circular Numerado no Eixo Vertical */}
              <div
                style={{
                  position: "absolute",
                  left: "-18px",
                  top: "0",
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  backgroundColor: "#16130f",
                  border: "2px solid var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(196, 169, 110, 0.4)",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "var(--gold-light)",
                  }}
                >
                  {stage.number}
                </span>
              </div>

              {/* Card da Etapa */}
              <div
                style={{
                  backgroundColor: "rgba(22, 20, 17, 0.88)",
                  border: "1px solid rgba(196, 169, 110, 0.24)",
                  borderRadius: "8px",
                  padding: "clamp(1.5rem, 3.5vw, 2.5rem)",
                  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.45)",
                  transition: "border-color 0.25s ease",
                }}
              >
                {/* Cabeçalho da Etapa com Badges e Datas */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.6rem",
                    marginBottom: "1rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid rgba(196, 169, 110, 0.14)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                    }}
                  >
                    ETAPA {stage.number} • {stage.stageBadge}
                  </span>

                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--gold-light)",
                      backgroundColor: "rgba(196, 169, 110, 0.12)",
                      border: "1px solid rgba(196, 169, 110, 0.25)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "3px",
                    }}
                  >
                    {stage.periodOrStatus}
                  </span>
                </div>

                {/* Grid de Conteúdo: Texto e Fotografia (quando disponível) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: stage.photo
                      ? "repeat(auto-fit, minmax(min(100%, 340px), 1fr))"
                      : "1fr",
                    gap: "2rem",
                    alignItems: "start",
                  }}
                >
                  {/* Bloco de Texto Narrativo */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(1.35rem, 2.5vw, 1.85rem)",
                        fontWeight: 800,
                        color: "var(--off-white)",
                        letterSpacing: "-0.015em",
                        lineHeight: 1.22,
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      {stage.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.88rem",
                        color: "var(--gold-light)",
                        fontWeight: 500,
                        margin: "0 0 1.25rem 0",
                        lineHeight: 1.5,
                      }}
                    >
                      {stage.subtitle}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.95rem",
                        fontSize: "clamp(0.88rem, 1.1vw, 0.98rem)",
                        color: "rgba(244, 239, 228, 0.84)",
                        lineHeight: 1.78,
                        fontWeight: 350,
                      }}
                    >
                      {stage.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} style={{ margin: 0 }}>
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Citação Histórica de Imprensa (Etapa 05) */}
                    {stage.pressQuote && (
                      <blockquote
                        style={{
                          borderLeft: "3px solid var(--gold)",
                          paddingLeft: "1.1rem",
                          margin: "1.35rem 0 0.5rem 0",
                          backgroundColor: "rgba(196, 169, 110, 0.05)",
                          padding: "0.85rem 1.1rem",
                          borderRadius: "0 4px 4px 0",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.85rem",
                            fontStyle: "italic",
                            color: "var(--gold-light)",
                            margin: 0,
                            lineHeight: 1.6,
                          }}
                        >
                          &ldquo;{stage.pressQuote}&rdquo;
                        </p>
                      </blockquote>
                    )}

                    {/* Tratamento Especial da Memória Familiar do Avô (Etapa 02) */}
                    {stage.isMemoryToConfirm && (
                      <div
                        style={{
                          marginTop: "1.35rem",
                          padding: "1.1rem 1.25rem",
                          backgroundColor: "rgba(196, 169, 110, 0.08)",
                          border: "1px dashed rgba(196, 169, 110, 0.35)",
                          borderRadius: "6px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--gold)",
                            display: "block",
                            marginBottom: "0.35rem",
                          }}
                        >
                          REGISTRO DA TRADIÇÃO ORAL DA FAMÍLIA
                        </span>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.82rem",
                            color: "rgba(244, 239, 228, 0.78)",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          Esta passagem é mantida como memória afetiva da trajetória dos fundadores. Detalhes documentais como ano exato, genealogia e local de origem da égua permanecem em aberto para inclusão posterior à medida que forem confirmados pelo acervo histórico da família.
                        </p>
                      </div>
                    )}

                    {/* Destaque dos 3 Pilares Atuais (Etapa 07) */}
                    {stage.isCurrentStage && (
                      <div
                        style={{
                          marginTop: "1.5rem",
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                          gap: "0.85rem",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "rgba(13, 12, 10, 0.7)",
                            border: "1px solid rgba(196, 169, 110, 0.2)",
                            borderRadius: "4px",
                            padding: "0.85rem 1rem",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.75rem",
                              fontWeight: 800,
                              color: "var(--gold-light)",
                              display: "block",
                              marginBottom: "0.2rem",
                            }}
                          >
                            Criação Equina & Genética JAR
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "rgba(244, 239, 228, 0.7)", display: "block" }}>
                            Preservação das linhagens de marcha, morfologia e aprumos fortes.
                          </span>
                        </div>

                        <div
                          style={{
                            backgroundColor: "rgba(13, 12, 10, 0.7)",
                            border: "1px solid rgba(196, 169, 110, 0.2)",
                            borderRadius: "4px",
                            padding: "0.85rem 1rem",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.75rem",
                              fontWeight: 800,
                              color: "var(--gold-light)",
                              display: "block",
                              marginBottom: "0.2rem",
                            }}
                          >
                            Capacitação de Tratadores
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "rgba(244, 239, 228, 0.7)", display: "block" }}>
                            Treinamento técnico e manejo com vivência prática no Haras.
                          </span>
                        </div>

                        <div
                          style={{
                            backgroundColor: "rgba(13, 12, 10, 0.7)",
                            border: "1px solid rgba(196, 169, 110, 0.2)",
                            borderRadius: "4px",
                            padding: "0.85rem 1rem",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.75rem",
                              fontWeight: 800,
                              color: "var(--gold-light)",
                              display: "block",
                              marginBottom: "0.2rem",
                            }}
                          >
                            Projeto Social Bem Viver
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "rgba(244, 239, 228, 0.7)", display: "block" }}>
                            Equoterapia, cuidado humano e responsabilidade social contínua.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bloco de Fotografia Histórica Original (quando associada à etapa) */}
                  {stage.photo && (
                    <div>
                      <div
                        onClick={() => stage.photo && setActivePhoto(stage.photo)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            stage.photo && setActivePhoto(stage.photo);
                          }
                        }}
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          borderRadius: "6px",
                          padding: "8px",
                          backgroundColor: "rgba(13, 12, 10, 0.8)",
                          border: "1px solid rgba(196, 169, 110, 0.3)",
                          boxShadow: "0 14px 35px rgba(0, 0, 0, 0.6)",
                          transition: "all 0.25s ease",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: stage.photo.aspectRatio || "4/3",
                            overflow: "hidden",
                            borderRadius: "4px",
                            backgroundColor: "#0d0c0a",
                          }}
                        >
                          <Image
                            src={stage.photo.src}
                            alt={stage.photo.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 480px"
                            style={{
                              objectFit: "cover",
                              objectPosition: stage.photo.objectPosition || "center center",
                            }}
                          />

                          {/* Tag sobre a foto */}
                          <div
                            style={{
                              position: "absolute",
                              top: "0.75rem",
                              left: "0.75rem",
                              backgroundColor: "rgba(13, 12, 10, 0.85)",
                              backdropFilter: "blur(6px)",
                              border: "1px solid rgba(196, 169, 110, 0.4)",
                              padding: "0.25rem 0.55rem",
                              borderRadius: "3px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.62rem",
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                color: "var(--gold-light)",
                                textTransform: "uppercase",
                              }}
                            >
                              {stage.photo.tag}
                            </span>
                          </div>

                          {/* Botão de Ampliar */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: "0.75rem",
                              right: "0.75rem",
                              backgroundColor: "rgba(13, 12, 10, 0.85)",
                              backdropFilter: "blur(6px)",
                              border: "1px solid rgba(196, 169, 110, 0.35)",
                              padding: "0.3rem 0.65rem",
                              borderRadius: "3px",
                              color: "var(--off-white)",
                              fontSize: "0.65rem",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            <span>Ampliar Foto</span>
                          </div>
                        </div>

                        {/* Legenda sob a foto */}
                        <div style={{ padding: "0.75rem 0.35rem 0.25rem" }}>
                          <h4
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              color: "var(--off-white)",
                              margin: "0 0 0.25rem 0",
                            }}
                          >
                            {stage.photo.title}
                          </h4>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.75rem",
                              color: "rgba(244, 239, 228, 0.72)",
                              lineHeight: 1.5,
                              margin: 0,
                            }}
                          >
                            {stage.photo.caption}
                          </p>
                        </div>
                      </div>

                      {/* Foto Secundária (Etapa 06 — Tropas de Elite) */}
                      {stage.secondaryPhoto && (
                        <div
                          onClick={() => stage.secondaryPhoto && setActivePhoto(stage.secondaryPhoto)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              stage.secondaryPhoto && setActivePhoto(stage.secondaryPhoto);
                            }
                          }}
                          style={{
                            marginTop: "1rem",
                            cursor: "pointer",
                            padding: "8px 12px",
                            backgroundColor: "rgba(13, 12, 10, 0.65)",
                            border: "1px solid rgba(196, 169, 110, 0.2)",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              width: "48px",
                              height: "48px",
                              borderRadius: "3px",
                              overflow: "hidden",
                              flexShrink: 0,
                            }}
                          >
                            <Image
                              src={stage.secondaryPhoto.src}
                              alt={stage.secondaryPhoto.alt}
                              fill
                              sizes="48px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.62rem",
                                fontWeight: 700,
                                color: "var(--gold)",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                display: "block",
                              }}
                            >
                              Foto Complementar do Acervo
                            </span>
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.78rem",
                                color: "var(--off-white)",
                                fontWeight: 600,
                                display: "block",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {stage.secondaryPhoto.title}
                            </span>
                          </div>
                          <span style={{ fontSize: "0.75rem", color: "var(--gold-light)" }}>Ver →</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALERIA COMPLETA DO ACERVO HISTÓRICO ORIGINAL ── */}
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
            Todas as fotos originais que documentam a caminhada de José e Ana Rita Tavares de Melo, a fundação familiar e os marcos que eternizaram o Haras Nossa Senhora Aparecida. Clique em qualquer imagem para abrir em alta resolução.
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
          {filteredPhotos.map((item) => (
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
                    top: "0.65rem",
                    left: "0.65rem",
                    backgroundColor: "rgba(13, 12, 10, 0.8)",
                    border: "1px solid rgba(196, 169, 110, 0.35)",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "2px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "var(--gold-light)",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>

              <div style={{ padding: "0.85rem 0.25rem 0.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h4
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: "var(--off-white)",
                      margin: "0 0 0.35rem 0",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(244, 239, 228, 0.72)",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {item.caption}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "0.75rem",
                    paddingTop: "0.5rem",
                    borderTop: "1px dashed rgba(196, 169, 110, 0.15)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.68rem",
                    color: "var(--gold-light)",
                    fontWeight: 600,
                  }}
                >
                  <span>Acervo Original</span>
                  <span>Ver em Alta Resolução →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MODAL DE ZOOM / LIGHTBOX ── */}
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
            backgroundColor: "rgba(7, 6, 5, 0.93)",
            backdropFilter: "blur(12px)",
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
              backgroundColor: "rgba(20, 18, 15, 0.98)",
              border: "1px solid rgba(196, 169, 110, 0.4)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.9)",
            }}
          >
            {/* Topo do Modal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid rgba(196, 169, 110, 0.2)",
                backgroundColor: "rgba(13, 12, 10, 0.9)",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 800,
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
