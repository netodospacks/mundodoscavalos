"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface OrderReturnData {
  id: string;
  status: "pending" | "paid" | "expired" | "cancelled" | "failed";
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  item: {
    title: string;
    modality: string;
    unitPrice: number;
  };
  pricing: {
    total: number;
  };
  pix?: {
    isDemonstrationMode: boolean;
    instructions: string[];
  };
}

export default function OrderReturnClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("pedido");
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderReturnData | null>(null);

  useEffect(() => {
    if (!orderId || !token) {
      setLoading(false);
      setError("Identificador do pedido ou token de acesso não fornecido.");
      return;
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}?token=${token}`);
        if (!res.ok) {
          throw new Error("Não foi possível localizar o pedido com as credenciais informadas.");
        }
        const data = await res.json();
        setOrder(data);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Erro ao consultar pedido.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId, token]);

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
        backgroundColor: "#0d0c0a",
        color: "#f4efe4",
        paddingTop: "clamp(80px, 14vh, 120px)",
        paddingBottom: "5rem",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              backgroundColor: "rgba(22, 20, 17, 0.7)",
              border: "1px solid rgba(196, 169, 110, 0.2)",
              borderRadius: "8px",
            }}
          >
            <div style={{ color: "var(--gold-light)", fontSize: "1.2rem", marginBottom: "1rem" }}>
              ✦
            </div>
            <p style={{ color: "rgba(244, 239, 228, 0.75)", fontSize: "0.9rem" }}>
              Consultando status do pedido no servidor...
            </p>
          </div>
        ) : error || !order ? (
          <div
            style={{
              backgroundColor: "rgba(22, 20, 17, 0.85)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "8px",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                color: "#ef4444",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                marginBottom: "1rem",
              }}
            >
              ✕
            </div>
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.35rem",
                fontWeight: 800,
                color: "#fca5a5",
                marginBottom: "0.5rem",
              }}
            >
              Erro ao Consultar Pedido
            </h1>
            <p style={{ color: "rgba(244, 239, 228, 0.7)", fontSize: "0.85rem", marginBottom: "2rem" }}>
              {error || "Pedido não encontrado."}
            </p>
            <Link
              href="/checkout"
              style={{
                backgroundColor: "var(--gold)",
                color: "#000",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "0.8rem",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              Ir para o Checkout
            </Link>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "rgba(22, 20, 17, 0.9)",
              border: "1px solid rgba(196, 169, 110, 0.3)",
              borderRadius: "8px",
              padding: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  color: "var(--gold-light)",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Consulta de Pedido
              </span>

              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.8rem",
                  fontWeight: 900,
                  color: "var(--off-white)",
                  textTransform: "uppercase",
                  margin: "0 0 1rem 0",
                }}
              >
                Pedido {order.id}
              </h1>

              {/* Status Badge */}
              {order.status === "paid" ? (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "rgba(34, 197, 94, 0.15)",
                    border: "1px solid rgba(34, 197, 94, 0.4)",
                    color: "#86efac",
                    padding: "0.4rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                  }}
                >
                  <span>✓ Pagamento Confirmado com Sucesso</span>
                </div>
              ) : order.status === "expired" ? (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                    color: "#fca5a5",
                    padding: "0.4rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                  }}
                >
                  <span>Cobrança Pix Expirada</span>
                </div>
              ) : (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "rgba(234, 179, 8, 0.15)",
                    border: "1px solid rgba(234, 179, 8, 0.4)",
                    color: "#fde047",
                    padding: "0.4rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#fde047",
                    }}
                  />
                  <span>Aguardando Confirmação do Pagamento</span>
                </div>
              )}
            </div>

            {/* Informações do Pedido */}
            <div
              style={{
                backgroundColor: "rgba(13, 12, 10, 0.7)",
                border: "1px solid rgba(196, 169, 110, 0.2)",
                borderRadius: "6px",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid rgba(196, 169, 110, 0.15)",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{order.item.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(244, 239, 228, 0.6)" }}>
                    Modalidade: {order.item.modality}
                  </div>
                </div>
                <div style={{ fontWeight: 800, color: "var(--gold-light)" }}>
                  {formatBRL(order.pricing.total)}
                </div>
              </div>

              <div style={{ fontSize: "0.8rem", color: "rgba(244, 239, 228, 0.7)", lineHeight: 1.6 }}>
                <div>
                  <strong>Participante:</strong> {order.customer.name}
                </div>
                <div>
                  <strong>E-mail:</strong> {order.customer.email}
                </div>
                <div>
                  <strong>Contato:</strong> {order.customer.phone}
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link
                href="/cursos/capacitacao-tratadores-equinos"
                style={{
                  border: "1px solid rgba(196, 169, 110, 0.3)",
                  color: "var(--gold-light)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "4px",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Voltar à Página do Curso
              </Link>

              <Link
                href="/"
                style={{
                  backgroundColor: "rgba(196, 169, 110, 0.15)",
                  border: "1px solid var(--gold)",
                  color: "var(--off-white)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "4px",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Ir para a Página Inicial
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
