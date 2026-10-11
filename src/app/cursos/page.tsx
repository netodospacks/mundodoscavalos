import type { Metadata } from "next";
import CoursesSection from "@/sections/CoursesSection";
import SectionReveal from "@/components/ui/SectionReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cursos e Formação Equina — Haras Nossa Senhora Aparecida | Mundo dos Cavalos",
  description:
    "Explore nossos programas de formação e capacitação no manejo e cuidado de equinos. Cursos presenciais com ciência, vivência de campo e alto padrão técnico.",
};

export default function CursosPage() {
  return (
    <main style={{ backgroundColor: "#f7f5f0", minHeight: "100vh", paddingTop: "80px" }}>
      {/* Banner / Cabeçalho Superior Institucional */}
      <section
        style={{
          backgroundColor: "#16130f",
          color: "#f7f5f0",
          padding: "clamp(3.5rem, 7vw, 5.5rem) 1.5rem clamp(2.5rem, 5vw, 4rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.22,
            filter: "grayscale(30%)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(22, 19, 15, 0.7) 0%, #16130f 100%)",
          }}
        />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionReveal type="up">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Link
                href="/"
                style={{
                  color: "#c4a96e",
                  textDecoration: "none",
                  fontSize: "0.78rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Início
              </Link>
              <span style={{ color: "rgba(247, 245, 240, 0.4)", fontSize: "0.75rem" }}>/</span>
              <span
                style={{
                  color: "rgba(247, 245, 240, 0.7)",
                  fontSize: "0.78rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Cursos
              </span>
            </div>

            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c4a96e",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              FORMAÇÃO & CAPACITAÇÃO EQUINA
            </span>

            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 600,
                color: "#f7f5f0",
                lineHeight: 1.15,
                margin: "0 0 1rem 0",
                letterSpacing: "-0.01em",
              }}
            >
              Catálogo de Cursos
            </h1>

            <p
              className="font-sans"
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                color: "rgba(247, 245, 240, 0.78)",
                maxWidth: "680px",
                lineHeight: 1.65,
                fontWeight: 300,
                margin: 0,
              }}
            >
              Programas educacionais desenvolvidos com fundamentação zootécnica e prática diária no Haras Nossa Senhora Aparecida.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Seção Completa de Cursos (Presencial + Aviso Cursos Online em Breve) */}
      <CoursesSection showOnlineNotice={true} />
    </main>
  );
}
