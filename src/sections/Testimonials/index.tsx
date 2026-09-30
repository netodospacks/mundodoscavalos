import { SectionReveal } from "@/components/ui/SectionReveal";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      style={{
        background: "var(--ink-soft)",
        padding: "clamp(5rem, 10vw, 10rem) clamp(1.25rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "1380px", margin: "0 auto" }}>

        {/* Cabeçalho */}
        <SectionReveal type="up">
          <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            <span
              style={{
                display: "block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.75rem",
              }}
            >
              Depoimentos
            </span>
            <h2
              id="testimonials-heading"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--off-white)",
                maxWidth: "520px",
              }}
            >
              O que dizem
              <br />
              quem já aprendeu.
            </h2>
          </div>
        </SectionReveal>

        {/* Grid de depoimentos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {testimonials.map((t, i) => (
            <SectionReveal key={t.id} delay={(i % 3) as 0 | 1 | 2 | 3 | 4} type="up">
              <article
                aria-label={`Depoimento de ${t.name}`}
                style={{
                  borderTop: "1px solid rgba(157, 132, 82, 0.2)",
                  paddingTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  height: "100%",
                }}
              >
                {/* Aspas */}
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "4rem",
                    lineHeight: 0.8,
                    color: "var(--gold)",
                    opacity: 0.3,
                    fontWeight: 300,
                    display: "block",
                  }}
                >
                  "
                </span>

                {/* Texto */}
                <blockquote
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
                    fontStyle: "italic",
                    lineHeight: 1.65,
                    color: "var(--off-white)",
                    flex: 1,
                    margin: 0,
                  }}
                >
                  {t.text}
                </blockquote>

                {/* Autor */}
                <footer
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginTop: "auto",
                  }}
                >
                  {/* Avatar com Emblema da Marca */}
                  <div
                    aria-hidden="true"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(13, 12, 10, 0.8)",
                      border: "1px solid var(--gold)",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 10px rgba(157, 132, 82, 0.2)",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    </svg>
                  </div>

                  <div>
                    <cite
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        color: "var(--off-white)",
                        fontStyle: "normal",
                        display: "block",
                      }}
                    >
                      {t.name}
                    </cite>
                    {t.role && (
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.72rem",
                          color: "var(--stone)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {t.role}
                      </span>
                    )}
                  </div>
                </footer>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
