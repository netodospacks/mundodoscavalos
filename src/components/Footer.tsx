import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { navItems } from "@/data/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--ink)",
        borderTop: "1px solid rgba(157, 132, 82, 0.12)",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem) 2rem",
        color: "var(--off-white)",
      }}
    >
      <style>{`
        .footer-nav-link { color: var(--stone-light); transition: color 0.22s ease; }
        .footer-nav-link:hover { color: var(--off-white); }
        .footer-haras-link { color: var(--gold); transition: color 0.22s ease; }
        .footer-haras-link:hover { color: var(--gold-light); }
      `}</style>

      <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Identidade */}
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.6rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  marginBottom: "2px",
                }}
              >
                Mundo dos
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--off-white)",
                }}
              >
                Cavalos
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "0.82rem",
                lineHeight: 1.75,
                color: "var(--stone-light)",
                maxWidth: "260px",
              }}
            >
              Plataforma educacional dedicada ao universo equino — conhecimento, manejo e respeito ao animal.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Navegação
            </p>
            <nav
              style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}
              aria-label="Navegação no rodapé"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="footer-nav-link"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Haras */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Parceiro
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                fontSize: "1.1rem",
                color: "var(--off-white)",
                marginBottom: "0.5rem",
              }}
            >
              {siteConfig.harasName}
            </p>
            <Link
              href={siteConfig.harasUrl}
              className="footer-haras-link"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Conheça o Haras →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(157, 132, 82, 0.1)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: "0.72rem",
              color: "var(--stone)",
              letterSpacing: "0.05em",
            }}
          >
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: "0.72rem",
              color: "var(--stone)",
              letterSpacing: "0.05em",
            }}
          >
            Conhecimento · Manejo · Respeito
          </p>
        </div>
      </div>
    </footer>
  );
}
