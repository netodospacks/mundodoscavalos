"use client";

import { useState, useEffect } from "react";

interface NetflixLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NetflixLoginModal({ isOpen, onClose }: NetflixLoginModalProps) {
  // Fases da animação: 'intro-m' | 'intro-title' | 'login-form'
  const [phase, setPhase] = useState<"intro-m" | "intro-title" | "login-form">("intro-m");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Reinicia a sequência de animação sempre que o modal abre
  useEffect(() => {
    if (isOpen) {
      setPhase("intro-m");
      setIsLoggingIn(false);
      setLoginSuccess(false);

      const timer1 = setTimeout(() => {
        setPhase("intro-title");
      }, 1100);

      const timer2 = setTimeout(() => {
        setPhase("login-form");
      }, 2300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setLoginSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail("aluno@mundodoscavalos.com.br");
    setPassword("••••••••••••");
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setLoginSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 900);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Entrar na Plataforma Mundo dos Cavalos"
    >
      {/* Botão de Fechar (✕) no Canto Superior Direito */}
      <button
        onClick={onClose}
        aria-label="Fechar janela de login"
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 10001,
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(196, 169, 110, 0.3)",
          color: "var(--off-white)",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          cursor: "pointer",
          transition: "all 0.25s ease",
          backdropFilter: "blur(8px)",
        }}
        className="hover:scale-110"
      >
        ✕
      </button>

      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(196, 169, 110, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ============================================================
          FASES 1 & 2: VINHETA CINEMATOGRÁFICA DO LOGO "M" GIGANTE (ESTILO NETFLIX)
          ============================================================ */}
      {(phase === "intro-m" || phase === "intro-title") && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            textAlign: "center",
            padding: "2rem",
          }}
        >
          {/* O "M" GIGANTE ANIMAÇÃO NETFLIX ZOOM */}
          <div
            className={`netflix-m-logo ${phase === "intro-m" ? "animate-m-zoom" : "animate-m-pulse"}`}
            style={{
              fontWeight: 900,
              fontSize: "clamp(7rem, 22vw, 15rem)",
              lineHeight: 0.85,
              background: "linear-gradient(135deg, #fff2d0 0%, #c4a96e 50%, #856a33 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 45px rgba(196, 169, 110, 0.5))",
              userSelect: "none",
            }}
          >
            M
          </div>

          {/* ESTÁGIO 2: SURGIMENTO DO NOME MUNDO DOS CAVALOS */}
          {phase === "intro-title" && (
            <div
              className="animate-title-reveal"
              style={{
                marginTop: "1rem",
              }}
            >
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
                  letterSpacing: "0.25em",
                  color: "var(--off-white)",
                  textTransform: "uppercase",
                  margin: 0,
                  textShadow: "0 4px 20px rgba(0,0,0,0.9)",
                }}
              >
                Mundo dos <span style={{ color: "var(--gold-light)" }}>Cavalos</span>
              </h2>
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.4em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  display: "block",
                  marginTop: "0.5rem",
                  fontWeight: 600,
                }}
              >
                PLATAFORMA PREMIUM DE CONHECIMENTO EQUINO
              </span>
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          FASE 3: FORMULÁRIO DE LOGIN ESTILO STREAMING PLATFORM
          ============================================================ */}
      {phase === "login-form" && (
        <div
          className="animate-form-fadein"
          style={{
            zIndex: 10000,
            width: "100%",
            maxWidth: "440px",
            padding: "0 1.25rem",
          }}
        >
          {loginSuccess ? (
            /* Tela de Sucesso de Login */
            <div
              style={{
                backgroundColor: "rgba(18, 16, 13, 0.95)",
                backdropFilter: "blur(24px)",
                border: "1px solid var(--gold)",
                borderRadius: "8px",
                padding: "3rem 2rem",
                textAlign: "center",
                boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(196, 169, 110, 0.2)",
                  border: "2px solid var(--gold-light)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: "var(--gold-light)",
                  fontSize: "1.8rem",
                }}
              >
                ✓
              </div>
              <h3 style={{ color: "var(--off-white)", fontSize: "1.4rem", fontWeight: 800, margin: "0 0 0.5rem 0" }}>
                Bem-vindo(a) de volta!
              </h3>
              <p style={{ color: "rgba(244, 239, 228, 0.75)", fontSize: "0.9rem" }}>
                Iniciando sua experiência no Mundo dos Cavalos...
              </p>
            </div>
          ) : (
            /* Formulário Principal de Login estilo Netflix */
            <div
              style={{
                backgroundColor: "rgba(18, 16, 13, 0.94)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(196, 169, 110, 0.3)",
                borderRadius: "8px",
                padding: "clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
              }}
            >
              {/* Header do Form */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "var(--gold)" }}>M</span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold-light)", textTransform: "uppercase" }}>
                    MUNDO DOS CAVALOS
                  </span>
                </div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--off-white)", margin: 0 }}>
                  Entrar
                </h2>
              </div>

              <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {/* Campo E-mail */}
                <div>
                  <label htmlFor="login-email" style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, color: "rgba(244,239,228,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    E-mail ou número de telefone
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(196, 169, 110, 0.25)",
                      borderRadius: "4px",
                      padding: "0.85rem 1rem",
                      color: "var(--off-white)",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    className="focus:border-gold"
                  />
                </div>

                {/* Campo Senha */}
                <div>
                  <label htmlFor="login-password" style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, color: "rgba(244,239,228,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    Senha
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(196, 169, 110, 0.25)",
                      borderRadius: "4px",
                      padding: "0.85rem 1rem",
                      color: "var(--off-white)",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    className="focus:border-gold"
                  />
                </div>

                {/* Botão Entrar Principal */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    backgroundColor: "var(--off-white)",
                    color: "var(--ink)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.95rem",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                    transition: "all 0.25s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                  className="hover:scale-102"
                >
                  {isLoggingIn ? (
                    <span>CONECTANDO...</span>
                  ) : (
                    <>
                      <span>ENTRAR</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    </>
                  )}
                </button>

                {/* Opções Auxiliares: Lembrar & Ajuda */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", color: "rgba(244,239,228,0.7)" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ accentColor: "var(--gold)" }}
                    />
                    <span>Lembrar de mim</span>
                  </label>
                  <a href="#ajuda" onClick={(e) => e.preventDefault()} style={{ color: "rgba(244,239,228,0.7)", textDecoration: "none" }}>
                    Precisa de ajuda?
                  </a>
                </div>

                {/* Linha Divisória */}
                <div style={{ borderTop: "1px solid rgba(244,239,228,0.1)", margin: "0.5rem 0" }} />

                {/* Botão de Atalho Demo */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(196, 169, 110, 0.15)",
                    border: "1px solid var(--gold-light)",
                    color: "var(--gold-light)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.75rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  ⚡ ACESSO RÁPIDO DEMO (1-CLIQUE)
                </button>

                {/* Footer do Login */}
                <p style={{ fontSize: "0.82rem", color: "rgba(244,239,228,0.6)", margin: "0.5rem 0 0 0", textAlign: "center" }}>
                  Novo no Mundo dos Cavalos?{" "}
                  <a href="#quero-aprender" onClick={() => onClose()} style={{ color: "var(--off-white)", fontWeight: 700, textDecoration: "none" }}>
                    Assine agora.
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Estilos CSS Inline de Animações Específicas do Logo Netflix M e Transições */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes mZoomIntro {
          0% {
            transform: scale(0.1);
            opacity: 0;
            filter: drop-shadow(0 0 0px rgba(196,169,110,0));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 60px rgba(196,169,110,0.8));
          }
          100% {
            transform: scale(1);
            opacity: 1;
            filter: drop-shadow(0 0 45px rgba(196,169,110,0.5));
          }
        }

        @keyframes mPulseLoop {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 45px rgba(196,169,110,0.5));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 75px rgba(196,169,110,0.85));
          }
        }

        @keyframes titleReveal {
          0% {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes formFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-m-zoom {
          animation: mZoomIntro 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-m-pulse {
          animation: mPulseLoop 1.2s ease-in-out infinite;
        }

        .animate-title-reveal {
          animation: titleReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-form-fadein {
          animation: formFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .focus\\:border-gold:focus {
          border-color: var(--gold-light) !important;
          box-shadow: 0 0 10px rgba(196, 169, 110, 0.3) !important;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
          background-color: #ffffff !important;
        }
      `}} />
    </div>
  );
}

export default NetflixLoginModal;
