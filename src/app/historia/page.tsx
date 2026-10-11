import type { Metadata } from "next";
import Link from "next/link";
import HistoryInteractiveView from "@/components/historia/HistoryInteractiveView";

export const metadata: Metadata = {
  title: "História do Haras — Haras Nossa Senhora Aparecida | Marca JAR",
  description:
    "Conheça a trajetória familiar, a fundação do Haras Nossa Senhora Aparecida por José e Ana Rita Tavares de Melo, a história da marca JAR, as tropas de elite e o acervo histórico de fotos.",
};

export default function HistoriaPage() {
  return (
    <div
      style={{
        backgroundColor: "var(--ink)",
        minHeight: "100vh",
        paddingTop: "clamp(90px, 14vh, 130px)",
        color: "var(--off-white)",
      }}
    >
      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        {/* ── BREADCRUMB / VOLTAR ── */}
        <div style={{ marginBottom: "1.75rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold-light)",
            }}
          >
            <span aria-hidden="true">←</span>
            <span>Voltar ao Início</span>
          </Link>
        </div>

        {/* ── CABEÇALHO DA PÁGINA INSTITUCIONAL ── */}
        <header
          style={{
            paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
            borderBottom: "1px solid rgba(196, 169, 110, 0.2)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              MEMÓRIA & TRAJETÓRIA FAMILIAR
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--off-white)",
              margin: "0 0 1.25rem 0",
            }}
          >
            História do Haras <br />
            <span style={{ color: "var(--gold-light)" }}>Nossa Senhora Aparecida</span>
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
              fontWeight: 300,
              color: "rgba(244, 239, 228, 0.8)",
              lineHeight: 1.7,
              maxWidth: "840px",
              margin: 0,
            }}
          >
            Uma caminhada forjada na dedicação à terra, no respeito aos animais e na evolução contínua da genética JAR por José e Dona Ana Rita Tavares de Melo. Conheça as origens, os momentos decisivos e o acervo fotográfico original que eterniza a nossa criação.
          </p>
        </header>

        {/* ── CAPÍTULOS HISTÓRICOS & GALERIA COM FOTOS REAIS ── */}
        <HistoryInteractiveView />

        {/* ── SEÇÃO 6: OUTROS ACONTECIMENTOS IMPORTANTES ── */}
        <section
          style={{
            padding: "clamp(3rem, 6vw, 5rem) 0",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Capítulos da Trajetória Familiar
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--off-white)",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              Outros Acontecimentos Marcantes
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {[
              {
                title: "Tradição nas Pistas & Exposições",
                desc: "Espaço reservado para o histórico de participações, premiações e campeonatos conquistados pelos animais do haras em eventos oficiais.",
              },
              {
                title: "O Legado Geracional",
                desc: "Espaço reservado para os depoimentos familiares e a transmissão dos valores, conhecimentos e paixão pelo cavalo de geração em geração.",
              },
              {
                title: "Compromisso com o Futuro",
                desc: "Espaço reservado para os planos, projetos e a continuidade da seleção genética JAR mantendo os princípios fundadores intactos.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(22, 20, 17, 0.8)",
                  border: "1px solid rgba(196, 169, 110, 0.2)",
                  borderRadius: "4px",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(196, 169, 110, 0.12)",
                      border: "1px solid var(--gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--gold-light)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      marginBottom: "1rem",
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--off-white)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(244, 239, 228, 0.65)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px dashed rgba(196, 169, 110, 0.15)",
                    fontSize: "0.62rem",
                    color: "var(--gold-light)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Espaço para inserção de dados
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RODAPÉ DA PÁGINA: NAVEGAÇÃO ENTRE ÁREAS ── */}
        <div
          style={{
            padding: "2.5rem 0 4rem",
            borderTop: "1px solid rgba(196, 169, 110, 0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold-light)",
            }}
          >
            ← Voltar à Página Inicial
          </Link>

          <Link
            href="/shopping-jar-2026"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--off-white)",
              backgroundColor: "rgba(157, 132, 82, 0.2)",
              border: "1px solid var(--gold)",
              padding: "0.6rem 1.25rem",
              borderRadius: "2px",
            }}
          >
            Conhecer o Shopping JAR 2026 →
          </Link>
        </div>
      </div>
    </div>
  );
}
