"use client";

import SectionReveal from "@/components/ui/SectionReveal";

const painPoints = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: "Aprende no improviso",
    text: "Depende de dicas espalhadas, informação fragmentada e nunca sabe se está fazendo certo.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: "Medo de errar com o animal",
    text: "Cada decisão parece um risco. Falta base técnica para agir com segurança em situações críticas.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Sem tempo para cursos presenciais",
    text: "A rotina do haras não para. Precisava de formação que acompanhe o seu ritmo, de onde você estiver.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      </svg>
    ),
    title: "Formação teórica sem aplicação real",
    text: "Cursos genéricos que não ensinam a realidade do campo. Você precisa de quem vive isso todo dia.",
  },
];

const targetAudience = [
  "Tratadores e funcionários de haras",
  "Proprietários de cavalos amadores",
  "Estudantes de medicina veterinária e zootecnia",
  "Praticantes e instrutores de equitação",
  "Quem quer ingressar na área equina",
  "Criadores e pequenos haras familiares",
];

export default function PainPoints() {
  return (
    <section
      id="para-quem"
      style={{
        backgroundColor: "var(--cream-deep)",
        position: "relative",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
        overflow: "hidden",
      }}
    >
      {/* Top gradient transition from dark hero */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(100px, 15vh, 200px)",
          background:
            "linear-gradient(to bottom, var(--ink) 0%, rgba(13, 12, 10, 0.85) 30%, rgba(40, 34, 26, 0.5) 65%, var(--cream-deep) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <SectionReveal type="up">
          <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--earth-2)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Reconhece Essa Situação?
            </span>
            <h2
              className="font-serif"
              style={{
                color: "var(--text-dark)",
                fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1.25rem",
                maxWidth: "700px",
                margin: "0 auto 1.25rem",
              }}
            >
              Você cuida de cavalos,{" "}
              <span style={{ color: "var(--earth-2)" }}>
                mas sente que falta base técnica
              </span>
              ?
            </h2>
            <div
              style={{
                width: "48px",
                height: "1px",
                backgroundColor: "var(--gold)",
                margin: "0 auto",
              }}
            />
          </div>
        </SectionReveal>

        {/* Pain Points Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(1.25rem, 3vw, 2rem)",
            marginBottom: "clamp(4rem, 8vw, 6rem)",
          }}
        >
          {painPoints.map((point, i) => (
            <SectionReveal key={i} delay={(i % 4) as 0 | 1 | 2 | 3 | 4} type="up">
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(157, 132, 82, 0.2)",
                  borderRadius: "8px",
                  padding: "clamp(1.5rem, 3vw, 2.25rem)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(61, 43, 26, 0.08)",
                    border: "1px solid rgba(157, 132, 82, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--earth-2)",
                  }}
                >
                  {point.icon}
                </div>
                <h3
                  className="font-sans"
                  style={{
                    color: "var(--text-dark)",
                    fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {point.title}
                </h3>
                <p
                  className="font-sans"
                  style={{
                    color: "var(--text-mid-light)",
                    fontSize: "clamp(0.82rem, 1vw, 0.92rem)",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {point.text}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Target Audience */}
        <SectionReveal type="up">
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              backgroundColor: "var(--earth-1)",
              borderRadius: "10px",
              padding: "clamp(2rem, 5vw, 3.5rem)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative corner */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "200px",
                height: "200px",
                background:
                  "radial-gradient(circle at top right, rgba(196, 169, 110, 0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  display: "block",
                  marginBottom: "0.65rem",
                }}
              >
                Este Curso é Para Você Se:
              </span>
              <h3
                className="font-serif"
                style={{
                  color: "var(--off-white)",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                Você faz parte do universo equino
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "0.85rem",
              }}
            >
              {targetAudience.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(196, 169, 110, 0.2)",
                    borderRadius: "6px",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold-light)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span
                    className="font-sans"
                    style={{
                      color: "var(--off-white)",
                      fontSize: "clamp(0.82rem, 1vw, 0.9rem)",
                      fontWeight: 400,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
