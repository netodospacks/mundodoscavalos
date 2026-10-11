"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OrderItem } from "@/services/payment/types";

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
}

interface CheckoutClientProps {
  initialProduct: OrderItem;
}

interface CreatedOrderResponse {
  orderId: string;
  accessToken: string;
  status: string;
  pricing: {
    subtotal: number;
    discount: number;
    fee: number;
    total: number;
  };
  pix?: {
    provider: string;
    chargeId: string;
    qrCodeVisualAvailable: boolean;
    qrCodeUrl?: string;
    copyAndPasteCode?: string;
    expiresAt: string;
    isDemonstrationMode: boolean;
    instructions: string[];
  };
}

export default function CheckoutClient({ initialProduct }: CheckoutClientProps) {
  const [customer, setCustomer] = useState<CustomerFormData>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Estado do Pedido Criado
  const [orderData, setOrderData] = useState<CreatedOrderResponse | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Formatação de Máscara de Telefone: (99) 99999-9999
  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  // Formatação de Máscara de CPF: 999.999.999-99
  const formatCPF = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((prev) => ({ ...prev, cpf: formatCPF(e.target.value) }));
    if (errors.cpf) setErrors((prev) => ({ ...prev, cpf: undefined }));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!customer.name.trim() || customer.name.trim().length < 3) {
      errs.name = "Informe seu nome completo.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customer.email.trim() || !emailRegex.test(customer.email.trim())) {
      errs.email = "Informe um e-mail válido.";
    }

    const phoneDigits = customer.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      errs.phone = "Informe um telefone válido com DDD (mínimo 10 dígitos).";
    }

    if (customer.cpf && customer.cpf.trim() !== "") {
      const cpfDigits = customer.cpf.replace(/\D/g, "");
      if (cpfDigits.length !== 11) {
        errs.cpf = "CPF deve conter 11 dígitos.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: initialProduct.id,
          customer: {
            name: customer.name.trim(),
            email: customer.email.trim(),
            phone: customer.phone.trim(),
            cpf: customer.cpf.trim() || undefined,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível gerar seu pedido no momento.");
      }

      setOrderData(data);
      // Rola suavemente até o topo
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro inesperado. Tente novamente.";
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const copyPixCode = () => {
    if (orderData?.pix?.copyAndPasteCode) {
      navigator.clipboard.writeText(orderData.pix.copyAndPasteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    }
  };

  const formatBRL = (cents: number) => {
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(75px, 12vh, 105px)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        backgroundColor: "#0d0c0a",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 2.5rem)",
        }}
      >
        {/* ── HEADER DO CHECKOUT: Voltar & Identificação do Haras ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "1.75rem",
            marginBottom: "2rem",
            borderBottom: "1px solid rgba(196, 169, 110, 0.2)",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            href="/cursos/capacitacao-tratadores-equinos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--gold-light)",
              textDecoration: "none",
            }}
          >
            <span aria-hidden="true">←</span>
            <span>Voltar aos Detalhes do Curso</span>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 8px rgba(34, 197, 94, 0.7)",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "rgba(244, 239, 228, 0.7)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Ambiente Seguro de Inscrição
            </span>
          </div>
        </div>

        {/* ── SE O PEDIDO JÁ FOI GERADO: TELA PIX / STATUS DO PEDIDO ── */}
        {orderData ? (
          <div
            style={{
              backgroundColor: "rgba(22, 20, 17, 0.9)",
              border: "1px solid rgba(196, 169, 110, 0.35)",
              borderRadius: "8px",
              padding: "clamp(1.75rem, 5vw, 3rem)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Header de Status */}
            <div
              style={{
                textAlign: "center",
                paddingBottom: "2rem",
                borderBottom: "1px solid rgba(196, 169, 110, 0.18)",
                marginBottom: "2.5rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(196, 169, 110, 0.12)",
                  border: "1px solid var(--gold)",
                  color: "var(--gold-light)",
                  fontSize: "1.75rem",
                  marginBottom: "1rem",
                }}
              >
                ✦
              </div>

              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  color: "var(--gold-light)",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Inscrição Registrada no Servidor
              </span>

              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
                  fontWeight: 900,
                  color: "var(--off-white)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Pedido {orderData.orderId}
              </h1>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "rgba(234, 179, 8, 0.12)",
                  border: "1px solid rgba(234, 179, 8, 0.4)",
                  padding: "0.35rem 0.9rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#fde047",
                  marginTop: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#fde047",
                  }}
                />
                <span>Status: Aguardando Pagamento</span>
              </div>
            </div>

            {/* Grid: Resumo Financeiro & Área Pix */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
                gap: "2.5rem",
                alignItems: "start",
              }}
            >
              {/* Lado Esquerdo: Resumo Oficial do Pedido */}
              <div
                style={{
                  backgroundColor: "rgba(13, 12, 10, 0.7)",
                  border: "1px solid rgba(196, 169, 110, 0.2)",
                  borderRadius: "6px",
                  padding: "1.75rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gold-light)",
                    marginBottom: "1.25rem",
                  }}
                >
                  Resumo do Pedido
                </h2>

                <div
                  style={{
                    paddingBottom: "1.25rem",
                    borderBottom: "1px solid rgba(196, 169, 110, 0.15)",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--off-white)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {initialProduct.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(244, 239, 228, 0.65)",
                    }}
                  >
                    Modalidade: {initialProduct.modality}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    fontSize: "0.85rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "rgba(244, 239, 228, 0.7)",
                    }}
                  >
                    <span>Valor Unitário</span>
                    <span>{formatBRL(orderData.pricing.subtotal)}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "rgba(244, 239, 228, 0.7)",
                    }}
                  >
                    <span>Desconto</span>
                    <span>{formatBRL(orderData.pricing.discount)}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "0.85rem",
                      borderTop: "1px solid rgba(196, 169, 110, 0.2)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      color: "var(--gold-light)",
                    }}
                  >
                    <span>Total a Pagar</span>
                    <span>{formatBRL(orderData.pricing.total)}</span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "1.75rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px dashed rgba(196, 169, 110, 0.15)",
                    fontSize: "0.75rem",
                    color: "rgba(244, 239, 228, 0.6)",
                    lineHeight: 1.6,
                  }}
                >
                  <div>
                    <strong style={{ color: "var(--off-white)" }}>Titular:</strong> {customer.name}
                  </div>
                  <div>
                    <strong style={{ color: "var(--off-white)" }}>E-mail:</strong> {customer.email}
                  </div>
                  <div>
                    <strong style={{ color: "var(--off-white)" }}>WhatsApp:</strong> {customer.phone}
                  </div>
                </div>
              </div>

              {/* Lado Direito: Área Visual do Pix & Integração */}
              <div
                style={{
                  backgroundColor: "rgba(13, 12, 10, 0.7)",
                  border: "1px solid rgba(196, 169, 110, 0.2)",
                  borderRadius: "6px",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                    }}
                  >
                    Área de Pagamento Pix
                  </span>

                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: "#93c5fd",
                      backgroundColor: "rgba(59, 130, 246, 0.12)",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "3px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {orderData.pix?.isDemonstrationMode ? "Modo Homologação" : "API Bancária Conectada"}
                  </span>
                </div>

                {/* Área Visual do QR Code (Preparada para imagem da futura API ou placeholder técnico claro) */}
                <div
                  style={{
                    width: "220px",
                    height: "220px",
                    borderRadius: "6px",
                    backgroundColor: "#161411",
                    border: "2px dashed rgba(196, 169, 110, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    position: "relative",
                  }}
                >
                  {orderData.pix?.qrCodeUrl ? (
                    <Image
                      src={orderData.pix.qrCodeUrl}
                      alt="QR Code Pix Oficial"
                      width={200}
                      height={200}
                      style={{ borderRadius: "4px" }}
                    />
                  ) : (
                    <>
                      <div
                        style={{
                          fontSize: "2.2rem",
                          color: "var(--gold)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        ❖
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "var(--gold-light)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: "0.35rem",
                        }}
                      >
                        Área de QR Code Pix
                      </span>
                      <p
                        style={{
                          fontSize: "0.65rem",
                          color: "rgba(244, 239, 228, 0.55)",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        Aguardando integração com as credenciais da API bancária na Vercel.
                      </p>
                    </>
                  )}
                </div>

                {/* Área Pix Copia e Cola */}
                <div style={{ width: "100%", marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(244, 239, 228, 0.75)",
                      display: "block",
                      textAlign: "left",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Código Pix Copia e Cola
                  </label>

                  {orderData.pix?.copyAndPasteCode ? (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <input
                        type="text"
                        readOnly
                        value={orderData.pix.copyAndPasteCode}
                        style={{
                          flex: 1,
                          backgroundColor: "#0d0c0a",
                          border: "1px solid rgba(196, 169, 110, 0.3)",
                          borderRadius: "3px",
                          padding: "0.6rem 0.8rem",
                          color: "#fff",
                          fontSize: "0.78rem",
                          fontFamily: "monospace",
                        }}
                      />
                      <button
                        type="button"
                        onClick={copyPixCode}
                        style={{
                          backgroundColor: "var(--gold)",
                          color: "#000",
                          border: "none",
                          borderRadius: "3px",
                          padding: "0.6rem 1rem",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        {copiedCode ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#0d0c0a",
                        border: "1px dashed rgba(196, 169, 110, 0.25)",
                        borderRadius: "3px",
                        padding: "0.75rem 1rem",
                        color: "rgba(244, 239, 228, 0.55)",
                        fontSize: "0.72rem",
                        textAlign: "left",
                        lineHeight: 1.5,
                      }}
                    >
                      Em modo de demonstração. O código Copia e Cola oficial será retornado automaticamente assim que as chaves da API do banco forem informadas no ambiente.
                    </div>
                  )}
                </div>

                {/* Instruções Oficiais & WhatsApp para Confirmação */}
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(196, 169, 110, 0.08)",
                    border: "1px solid rgba(196, 169, 110, 0.2)",
                    borderRadius: "4px",
                    padding: "1rem",
                    textAlign: "left",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      color: "var(--gold-light)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Orientações de Matrícula
                  </span>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(244, 239, 228, 0.8)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    Para garantir sua vaga e receber a chave de pagamento direto da secretaria do Haras, informe o identificador <strong>{orderData.orderId}</strong> no WhatsApp oficial.
                  </p>
                </div>

                {/* Botões de Ação */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <a
                    href={`https://wa.me/5583999999999?text=${encodeURIComponent(
                      `Olá! Acabei de registrar meu pedido de inscrição ${orderData.orderId} para o Curso de Capacitação de Tratadores. Gostaria de confirmar a vaga e as instruções de pagamento.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      backgroundColor: "#16a34a",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.85rem 1.5rem",
                      borderRadius: "3px",
                      textDecoration: "none",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <span>Falar com a Secretaria no WhatsApp</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setOrderData(null)}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(196, 169, 110, 0.25)",
                      color: "rgba(244, 239, 228, 0.75)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "0.6rem 1rem",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Editar Dados do Comprador
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── ETAPA 1 & 2: FORMULÁRIO DE INSCRIÇÃO & RESUMO DO PEDIDO ── */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "clamp(2rem, 5vw, 3.5rem)",
              alignItems: "start",
            }}
          >
            {/* COLUNA ESQUERDA: Formulário Profissional */}
            <div
              style={{
                backgroundColor: "rgba(22, 20, 17, 0.85)",
                border: "1px solid rgba(196, 169, 110, 0.28)",
                borderRadius: "8px",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
              }}
            >
              <div style={{ marginBottom: "1.75rem" }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--gold-light)",
                    display: "block",
                    marginBottom: "0.35rem",
                  }}
                >
                  Etapa 1 de 2
                </span>
                <h1
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)",
                    fontWeight: 800,
                    color: "var(--off-white)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  Dados do Participante
                </h1>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "rgba(244, 239, 228, 0.65)",
                    marginTop: "0.4rem",
                    lineHeight: 1.5,
                  }}
                >
                  Preencha os dados oficiais para emissão do comprovante de inscrição e certificado de conclusão.
                </p>
              </div>

              {apiError && (
                <div
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                    color: "#fca5a5",
                    padding: "0.85rem 1.15rem",
                    borderRadius: "4px",
                    fontSize: "0.82rem",
                    marginBottom: "1.5rem",
                    lineHeight: 1.5,
                  }}
                >
                  {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Nome Completo */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    htmlFor="name"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(244, 239, 228, 0.85)",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Nome Completo <span style={{ color: "var(--gold)" }}>*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => {
                      setCustomer((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Ex: João da Silva Santos"
                    style={{
                      width: "100%",
                      backgroundColor: "#0d0c0a",
                      border: errors.name
                        ? "1px solid #ef4444"
                        : "1px solid rgba(196, 169, 110, 0.28)",
                      borderRadius: "4px",
                      padding: "0.75rem 1rem",
                      fontSize: "0.9rem",
                      color: "#fff",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                  />
                  {errors.name && (
                    <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.25rem", display: "block" }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* E-mail */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(244, 239, 228, 0.85)",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    E-mail para Recebimento de Acesso <span style={{ color: "var(--gold)" }}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => {
                      setCustomer((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="seuemail@exemplo.com.br"
                    style={{
                      width: "100%",
                      backgroundColor: "#0d0c0a",
                      border: errors.email
                        ? "1px solid #ef4444"
                        : "1px solid rgba(196, 169, 110, 0.28)",
                      borderRadius: "4px",
                      padding: "0.75rem 1rem",
                      fontSize: "0.9rem",
                      color: "#fff",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                  />
                  {errors.email && (
                    <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.25rem", display: "block" }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Linha dupla: WhatsApp e CPF */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.25rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  {/* WhatsApp */}
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(244, 239, 228, 0.85)",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      WhatsApp com DDD <span style={{ color: "var(--gold)" }}>*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={handlePhoneChange}
                      placeholder="(83) 99999-9999"
                      style={{
                        width: "100%",
                        backgroundColor: "#0d0c0a",
                        border: errors.phone
                          ? "1px solid #ef4444"
                          : "1px solid rgba(196, 169, 110, 0.28)",
                        borderRadius: "4px",
                        padding: "0.75rem 1rem",
                        fontSize: "0.9rem",
                        color: "#fff",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                    />
                    {errors.phone && (
                      <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.25rem", display: "block" }}>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* CPF (Opcional nesta etapa) */}
                  <div>
                    <label
                      htmlFor="cpf"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(244, 239, 228, 0.85)",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      CPF <span style={{ fontSize: "0.62rem", color: "var(--gold)" }}>(opcional)</span>
                    </label>
                    <input
                      id="cpf"
                      type="text"
                      value={customer.cpf}
                      onChange={handleCpfChange}
                      placeholder="000.000.000-00"
                      style={{
                        width: "100%",
                        backgroundColor: "#0d0c0a",
                        border: errors.cpf
                          ? "1px solid #ef4444"
                          : "1px solid rgba(196, 169, 110, 0.28)",
                        borderRadius: "4px",
                        padding: "0.75rem 1rem",
                        fontSize: "0.9rem",
                        color: "#fff",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                    />
                    {errors.cpf && (
                      <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.25rem", display: "block" }}>
                        {errors.cpf}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botão de Envio / Prosseguir */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    backgroundColor: submitting ? "rgba(196, 169, 110, 0.5)" : "var(--gold)",
                    color: "#0d0c0a",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.95rem 1.75rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.88rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: submitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.65rem",
                    transition: "all 0.2s ease",
                    boxShadow: "0 6px 20px rgba(196, 169, 110, 0.25)",
                  }}
                >
                  {submitting ? (
                    <span>Registrando Pedido no Servidor...</span>
                  ) : (
                    <>
                      <span>Gerar Cobrança Pix e Continuar</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>

                <div
                  style={{
                    marginTop: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontSize: "0.68rem",
                    color: "rgba(244, 239, 228, 0.55)",
                  }}
                >
                  <span>🔒 Seus dados estão protegidos sob conexão criptografada SSL</span>
                </div>
              </form>
            </div>

            {/* COLUNA DIREITA: Resumo Transparente do Pedido */}
            <div
              style={{
                backgroundColor: "rgba(22, 20, 17, 0.8)",
                border: "1px solid rgba(196, 169, 110, 0.22)",
                borderRadius: "8px",
                padding: "clamp(1.5rem, 4vw, 2.25rem)",
                position: "sticky",
                top: "100px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  display: "block",
                  marginBottom: "0.35rem",
                }}
              >
                Etapa 2 de 2
              </span>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--off-white)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  margin: "0 0 1.5rem 0",
                }}
              >
                Resumo da Inscrição
              </h2>

              {/* Card do Produto */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  paddingBottom: "1.5rem",
                  borderBottom: "1px solid rgba(196, 169, 110, 0.18)",
                  marginBottom: "1.5rem",
                }}
              >
                {initialProduct.image && (
                  <div
                    style={{
                      position: "relative",
                      width: "80px",
                      height: "80px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={initialProduct.image}
                      alt={initialProduct.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: "var(--gold)",
                      backgroundColor: "rgba(196, 169, 110, 0.12)",
                      padding: "0.15rem 0.45rem",
                      borderRadius: "2px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {initialProduct.modality}
                  </span>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "var(--off-white)",
                      margin: "0.4rem 0 0.2rem 0",
                      lineHeight: 1.3,
                    }}
                  >
                    {initialProduct.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(244, 239, 228, 0.6)",
                    }}
                  >
                    Haras Nossa Senhora Aparecida
                  </div>
                </div>
              </div>

              {/* Discriminativo de Preço */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  fontSize: "0.88rem",
                  marginBottom: "1.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "rgba(244, 239, 228, 0.75)",
                  }}
                >
                  <span>Investimento Oficial</span>
                  <span>{formatBRL(initialProduct.unitPrice)}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "rgba(244, 239, 228, 0.75)",
                  }}
                >
                  <span>Taxa de Processamento</span>
                  <span style={{ color: "var(--gold-light)" }}>R$ 0,00</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(196, 169, 110, 0.2)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    color: "var(--gold-light)",
                  }}
                >
                  <span>Total</span>
                  <span>{formatBRL(initialProduct.unitPrice)}</span>
                </div>
              </div>

              {/* Benefícios Inclusos */}
              <div
                style={{
                  backgroundColor: "rgba(13, 12, 10, 0.6)",
                  border: "1px solid rgba(196, 169, 110, 0.15)",
                  borderRadius: "4px",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[
                  "Aulas práticas presenciais na estrutura do Haras",
                  "Material didático impresso incluso",
                  "Almoço e coffee break durante o período do curso",
                  "Certificado de Conclusão Oficial",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      fontSize: "0.75rem",
                      color: "rgba(244, 239, 228, 0.8)",
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ color: "var(--gold)", fontSize: "0.85rem" }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
