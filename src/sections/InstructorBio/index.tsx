"use client";

import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import { mainFaculty } from "@/data/faculty";

export default function InstructorBio() {
  return (
    <section
      id="docente"
      style={{
        backgroundColor: "var(--ink-soft)",
        position: "relative",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 80% 50%, rgba(157, 132, 82, 0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <SectionReveal type="up">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(2.5rem, 6vw, 5rem)",
              alignItems: "center",
            }}
          >
            {/* LEFT: Photo */}
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: "420px",
                minWidth: "260px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid rgba(157, 132, 82, 0.3)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={mainFaculty.photo}
                  alt={mainFaculty.photoAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
                {/* Gradient at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background:
                      "linear-gradient(to top, rgba(26, 24, 20, 0.85) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Name overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1.25rem",
                    left: "1.25rem",
                    right: "1.25rem",
                  }}
                >
                  <span
                    className="font-sans"
                    style={{
                      color: "var(--gold-light)",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Sua Instrutora
                  </span>
                  <p
                    className="font-sans"
                    style={{
                      color: "var(--off-white)",
                      fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {mainFaculty.name}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Bio */}
            <div style={{ flex: "1 1 400px", minWidth: 0 }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Quem vai te ensinar
              </span>

              <h2
                className="font-serif"
                style={{
                  color: "var(--off-white)",
                  fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  marginBottom: "0.35rem",
                }}
              >
                {mainFaculty.name}
              </h2>

              <p
                className="font-sans"
                style={{
                  color: "var(--gold-light)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.04em",
                  marginBottom: "1.75rem",
                  fontWeight: 400,
                }}
              >
                {mainFaculty.title}
              </p>

              <div
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "var(--gold)",
                  marginBottom: "1.75rem",
                }}
              />

              <p
                className="font-sans"
                style={{
                  color: "rgba(244, 239, 228, 0.82)",
                  fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                {mainFaculty.bio}
              </p>

              {/* Formation */}
              <div style={{ marginBottom: "1.75rem" }}>
                <h3
                  className="font-sans"
                  style={{
                    color: "var(--gold)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                  }}
                >
                  Formação
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {mainFaculty.formation.map((item, i) => (
                    <li
                      key={i}
                      className="font-sans"
                      style={{
                        color: "var(--stone-light)",
                        fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)",
                        fontWeight: 300,
                        lineHeight: 1.45,
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--gold)", flexShrink: 0 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experience */}
              <div style={{ marginBottom: "2rem" }}>
                <h3
                  className="font-sans"
                  style={{
                    color: "var(--gold)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                  }}
                >
                  Experiência
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {mainFaculty.experience.map((item, i) => (
                    <li
                      key={i}
                      className="font-sans"
                      style={{
                        color: "var(--stone-light)",
                        fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)",
                        fontWeight: 300,
                        lineHeight: 1.45,
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--gold)", flexShrink: 0 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  borderLeft: "2px solid rgba(196, 169, 110, 0.45)",
                  paddingLeft: "1rem",
                  margin: 0,
                }}
              >
                <p
                  className="font-sans"
                  style={{
                    color: "rgba(244, 239, 228, 0.75)",
                    fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  &ldquo;{mainFaculty.quote}&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
