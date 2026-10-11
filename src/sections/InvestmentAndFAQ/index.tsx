"use client";

import { useState } from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import { NetflixLoginModal } from "@/components/ui/NetflixLoginModal";
import { courseInfo } from "@/data/courseModules";

const inclusions = [
  { icon: "▶", label: "8 Módulos em Vídeo Aula", detail: "Conteúdo prático e atualizado" },
  { icon: "📄", label: "Material de Apoio Completo", detail: "PDFs e fichas práticas por módulo" },
  { icon: "🏆", label: "Certificado de Conclusão", detail: "Emitido pelo Haras Nossa Senhora Aparecida" },
  { icon: "♾", label: "Acesso Vitalício", detail: "Sem mensalidades ou datas de expiração" },
  { icon: "📱", label: "Acesso em Qualquer Dispositivo", detail: "Celular, tablet, computador ou Smart TV" },
  { icon: "🔄", label: "Novos Módulos Grátis", detail: "Atualizações incluídas sem custo adicional" },
];

const faqs = [
  {
    question: "Preciso ter experiência prévia com cavalos?",
    answer:
      "Não. O curso é desenvolvido para iniciantes e para quem já trabalha com cavalos e quer aprofundar seus conhecimentos com base técnica e científica.",
  },
  {
    question: "Por quanto tempo tenho acesso ao conteúdo?",
    answer:
      "O acesso é vitalício. Uma vez inscrito, você pode assistir às aulas quantas vezes quiser, sem prazo de expiração.",
  },
  {
    question: "Vou receber um certificado ao concluir?",
    answer:
      "Sim. Ao concluir todos os módulos, você recebe um Certificado de Conclusão emitido pelo Haras Nossa Senhora Aparecida.",
  },
  {
    question: "O curso tem aulas ao vivo ou é gravado?",
    answer:
      "O curso é totalmente gravado, o que permite que você estude no seu próprio ritmo, no horário que quiser, sem depender de datas fixas.",
  },
  {
    question: "Posso parcelar o pagamento?",
    answer:
      "Sim. Você pode optar por 12 parcelas de R$ 49,90 ou pelo pagamento à vista de R$ 497,00.",
  },
  {
    question: "E se eu me arrepender após a compra?",
    answer:
      "Você tem 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeito, basta solicitar o reembolso integral, sem burocracia.",
  },
];

export default function InvestmentAndFAQ() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <>
      {/* ====== INVESTMENT SECTION ====== */}
      <section
        id="inscreva-se"
        style={{
          backgroundColor: "var(--ink)",
          position: "relative",
          paddingTop: "clamp(5rem, 10vw, 9rem)",
          paddingBottom: "clamp(5rem, 10vw, 9rem)",
          overflow: "hidden",
        }}
      >
        {/* Gold ambient */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 30%, rgba(196, 169, 110, 0.1) 0%, transparent 55%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          className="container"
          style={{ position: "relative", zIndex: 2 }}
        >
          {/* Section header */}
          <SectionReveal type="up">
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                Investimento
              </span>
              <h2
                className="font-sans"
                style={{
                  color: "var(--off-white)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                  marginBottom: "0.75rem",
                }}
              >
                Comece Hoje Mesmo
              </h2>
              <p
                className="font-sans"
                style={{
                  color: "rgba(244,239,228,0.65)",
                  fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                  fontWeight: 300,
                  maxWidth: "480px",
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}
              >
                Acesso completo ao curso com toda base técnica que você precisa
                para cuidar de cavalos com excelência.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal type="up">
            <div
              style={{
                maxWidth: "820px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
                gap: "1.5rem",
                alignItems: "start",
              }}
            >
              {/* Pricing Card */}
              <div
                style={{
                  backgroundColor: "rgba(18, 16, 13, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(196, 169, 110, 0.45)",
                  borderRadius: "10px",
                  padding: "clamp(1.75rem, 4vw, 2.75rem)",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.9), inset 0 1px 0 rgba(196,169,110,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {/* Price Display */}
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--gold-light)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Plano Único Vitalício
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      gap: "0.35rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(244,239,228,0.5)",
                        fontSize: "1rem",
                        fontWeight: 400,
                      }}
                    >
                      12x de
                    </span>
                    <span
                      style={{
                        color: "var(--off-white)",
                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      R$ 49,90
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(244,239,228,0.65)",
                      margin: 0,
                    }}
                  >
                    ou <strong style={{ color: "var(--off-white)" }}>{courseInfo.price}</strong> à vista
                  </p>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(196,169,110,0.15)",
                  }}
                />

                {/* Inclusions list */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {inclusions.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          fontSize: "1rem",
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <span
                          className="font-sans"
                          style={{
                            color: "var(--off-white)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            display: "block",
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="font-sans"
                          style={{
                            color: "rgba(244,239,228,0.5)",
                            fontSize: "0.72rem",
                            fontWeight: 300,
                          }}
                        >
                          {item.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  id="btn-inscrever-se"
                  style={{
                    width: "100%",
                    padding: "1.15rem 1.5rem",
                    backgroundColor: "var(--off-white)",
                    color: "var(--ink)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: "0.82rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
                    transition: "all 0.25s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  GARANTIR ACESSO AGORA
                </button>

                {/* Micro-trust */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    justifyContent: "center",
                    fontSize: "0.68rem",
                    color: "rgba(244,239,228,0.5)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <span>🛡️ 7 Dias de Garantia</span>
                  <span>⚡ Acesso Imediato</span>
                  <span>🔒 Pagamento Seguro</span>
                </div>
              </div>

              {/* Bonus / Urgency block */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* Guarantee */}
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(196,169,110,0.2)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "0.75rem",
                      lineHeight: 1,
                    }}
                  >
                    🛡️
                  </div>
                  <h3
                    className="font-sans"
                    style={{
                      color: "var(--off-white)",
                      fontWeight: 800,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Garantia de 7 Dias
                  </h3>
                  <p
                    className="font-sans"
                    style={{
                      color: "rgba(244,239,228,0.65)",
                      fontSize: "0.82rem",
                      fontWeight: 300,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    Se em 7 dias você não ficar satisfeito, devolvemos 100% do
                    seu dinheiro. Sem perguntas, sem burocracia.
                  </p>
                </div>

                {/* For whom */}
                <div
                  style={{
                    backgroundColor: "rgba(196, 169, 110, 0.06)",
                    border: "1px solid rgba(196, 169, 110, 0.2)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                  }}
                >
                  <h3
                    className="font-sans"
                    style={{
                      color: "var(--gold-light)",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      marginBottom: "0.85rem",
                    }}
                  >
                    O Que Você Vai Conquistar
                  </h3>
                  {[
                    "Confiança para tomar decisões de manejo com segurança",
                    "Base técnica reconhecida por profissionais da área",
                    "Conhecimento para emergências e situações críticas",
                    "Certificado que comprova sua formação",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--gold)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span
                        className="font-sans"
                        style={{
                          color: "var(--off-white)",
                          fontSize: "0.82rem",
                          fontWeight: 300,
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ====== FAQ SECTION ====== */}
      <section
        id="faq"
        style={{
          backgroundColor: "var(--ink-soft)",
          paddingTop: "clamp(5rem, 10vw, 8rem)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
        }}
      >
        <div className="container">
          <SectionReveal type="up">
            <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                Dúvidas Frequentes
              </span>
              <h2
                className="font-serif"
                style={{
                  color: "var(--off-white)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  margin: "0 auto",
                  maxWidth: "580px",
                }}
              >
                Ainda tem dúvidas?{" "}
                <span style={{ color: "var(--gold-light)" }}>
                  A gente responde.
                </span>
              </h2>
            </div>
          </SectionReveal>

          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <SectionReveal key={i} delay={(i % 5) as 0 | 1 | 2 | 3 | 4} type="up">
                  <div
                    style={{
                      backgroundColor: isOpen
                        ? "rgba(196,169,110,0.06)"
                        : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isOpen ? "rgba(196,169,110,0.35)" : "rgba(196,169,110,0.12)"}`,
                      borderRadius: "8px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isOpen}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        padding: "clamp(1rem, 2.5vw, 1.35rem) clamp(1.25rem, 3vw, 1.75rem)",
                        cursor: "pointer",
                        textAlign: "left",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      <span
                        className="font-sans"
                        style={{
                          color: "var(--off-white)",
                          fontWeight: 600,
                          fontSize: "clamp(0.85rem, 1.1vw, 0.98rem)",
                          lineHeight: 1.35,
                        }}
                      >
                        {faq.question}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--gold-light)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: "0 clamp(1.25rem, 3vw, 1.75rem) clamp(1rem, 2.5vw, 1.35rem)",
                          borderTop: "1px solid rgba(196,169,110,0.12)",
                        }}
                      >
                        <p
                          className="font-sans"
                          style={{
                            color: "rgba(244,239,228,0.72)",
                            fontSize: "clamp(0.82rem, 1vw, 0.92rem)",
                            fontWeight: 300,
                            lineHeight: 1.75,
                            margin: "0.85rem 0 0",
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          {/* Final CTA under FAQ */}
          <SectionReveal type="up">
            <div
              style={{
                textAlign: "center",
                marginTop: "clamp(3rem, 6vw, 5rem)",
              }}
            >
              <p
                className="font-sans"
                style={{
                  color: "rgba(244,239,228,0.65)",
                  fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                  maxWidth: "480px",
                  margin: "0 auto 1.5rem",
                }}
              >
                Não deixe o conhecimento que seus cavalos merecem para depois.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  backgroundColor: "var(--off-white)",
                  padding: "1.1rem 2.75rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                  transition: "all 0.25s ease",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                GARANTIR MEU ACESSO AGORA
              </button>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  color: "rgba(244,239,228,0.4)",
                  marginTop: "0.85rem",
                }}
              >
                7 dias de garantia • Acesso imediato • Pagamento 100% seguro
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Modal */}
      <NetflixLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
