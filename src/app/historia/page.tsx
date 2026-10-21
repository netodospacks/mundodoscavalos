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
            Uma caminhada forjada na dedicação à terra, no respeito aos animais e na evolução contínua da genética JAR por José e Ana Rita Tavares de Melo. Conheça as origens, os momentos decisivos e o acervo fotográfico original que eterniza a nossa criação.
          </p>
        </header>

        {/* ── LINHA DO TEMPO CRONOLÓGICA (7 ETAPAS) & ACERVO HISTÓRICO ORIGINAL ── */}
        <HistoryInteractiveView />

        {/* ── PROPÓSITO & VALORES FUNDAMENTAIS ── */}
        <section
          style={{
            padding: "clamp(3.5rem, 6vw, 5rem) 0",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(157, 132, 82, 0.08)",
              border: "1px solid rgba(196, 169, 110, 0.28)",
              borderRadius: "8px",
              padding: "clamp(2rem, 5vw, 3.5rem)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2.5rem",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                PRINCÍPIOS INEGOCIÁVEIS
              </span>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)",
                  fontWeight: 900,
                  color: "var(--off-white)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  margin: "0 0 1rem 0",
                  lineHeight: 1.15,
                }}
              >
                O Que Move o Haras <br />
                <span style={{ color: "var(--gold-light)" }}>Nossa Senhora Aparecida</span>
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.92rem",
                  color: "rgba(244, 239, 228, 0.8)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Da simplicidade das pastagens à alta performance, mantemos a mesma essência desde 1984: amor pelos animais, verdade em cada negociação e compromisso absoluto com o futuro da equinocultura.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
              }}
            >
              {[
                { title: "Manejo Racional", desc: "Confiança, respeito e bem-estar do potro ao reprodutor." },
                { title: "Pureza Genética", desc: "Seleção rigorosa de marcha, aprumos e temperamento." },
                { title: "Família & Fé", desc: "Valores sólidos transmitidos de geração em geração." },
                { title: "Impacto Social", desc: "A equoterapia e a educação como instrumentos de vida." },
              ].map((val, vi) => (
                <div
                  key={vi}
                  style={{
                    backgroundColor: "rgba(13, 12, 10, 0.7)",
                    border: "1px solid rgba(196, 169, 110, 0.2)",
                    borderRadius: "4px",
                    padding: "1.1rem",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--gold-light)",
                      margin: "0 0 0.35rem 0",
                    }}
                  >
                    {val.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(244, 239, 228, 0.7)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
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
