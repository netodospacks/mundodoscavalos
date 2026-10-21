"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
  Check,
  RefreshCw,
  ArrowLeft,
  Lock,
  ShoppingBag,
  HelpCircle,
  AlertCircle,
  User,
} from "lucide-react";
import { OrderItem, OrderDeliveryInfo } from "@/services/payment/types.ts";

interface OrderReturnData {
  id: string;
  status: "pending_payment" | "paid" | "expired" | "cancelled" | "payment_failed" | "pending";
  chargeStatus?: string;
  createdAt: string;
  paidAt?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    discount: number;
    fee: number;
    total: number;
  };
  delivery?: OrderDeliveryInfo;
  pix?: {
    isDemonstrationMode: boolean;
    instructions: string[];
    copyAndPasteCode?: string;
    qrCodeUrl?: string;
  };
}

export default function OrderReturnClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("pedido") || searchParams.get("id");
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderReturnData | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const fetchOrder = useCallback(
    async (isManualRefresh = false) => {
      if (!orderId || !token) {
        setLoading(false);
        setError("Identificador do pedido ou token de acesso não fornecido.");
        return;
      }

      if (isManualRefresh) setRefreshing(true);

      try {
        const res = await fetch(`/api/orders/${orderId}?token=${token}`);
        if (!res.ok) {
          throw new Error("Não foi possível localizar o pedido com as credenciais informadas.");
        }
        const data = await res.json();
        setOrder(data);
        setError(null);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Erro ao consultar status do pedido.";
        setError(msg);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [orderId, token]
  );

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Polling automático a cada 8 segundos se o pedido estiver pendente
  useEffect(() => {
    if (order?.status === "pending_payment" || order?.status === "pending") {
      const interval = setInterval(() => {
        fetchOrder();
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [order?.status, fetchOrder]);

  const formatBRL = (cents: number) => {
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const copyPixCode = () => {
    if (order?.pix?.copyAndPasteCode) {
      navigator.clipboard.writeText(order.pix.copyAndPasteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    }
  };

  const isPending = order?.status === "pending_payment" || order?.status === "pending";
  const isPaid = order?.status === "paid";
  const isCancelled = order?.status === "cancelled" || order?.status === "expired" || order?.status === "payment_failed";

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans antialiased selection:bg-emerald-600 selection:text-white">
      {/* ── BARRA SUPERIOR ── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1020px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span className="hidden xs:inline">Voltar ao Checkout</span>
            <span className="xs:hidden">Voltar</span>
          </Link>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
              <Image
                src="/images/logo-haras-clean.png"
                alt="Haras Nossa Senhora Aparecida"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-extrabold tracking-tight text-slate-900 leading-none">
                MUNDO DOS CAVALOS
              </span>
              <span className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                Haras N. Sra. Aparecida
              </span>
            </div>
          </Link>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-3 py-1.5 rounded-full shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline">Ambiente 100% Seguro</span>
            <span className="sm:hidden">Seguro</span>
          </div>
        </div>
      </header>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <main className="max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_28px_rgba(0,0,0,0.04)] p-8 text-center space-y-4">
            <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-900">
              Consultando dados do pedido...
            </p>
            <p className="text-xs text-slate-400 font-medium">Verificando status no banco de dados oficial</p>
          </div>
        ) : error || !order ? (
          <div className="bg-white rounded-2xl border border-red-200 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_28px_rgba(0,0,0,0.04)] p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100 shadow-2xs">
              <XCircle className="w-7 h-7" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Pedido Não Localizado
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              {error || "Não foi possível carregar as informações deste pedido com as credenciais informadas."}
            </p>
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Checkout</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {/* CARD STATUS DO PEDIDO */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_28px_rgba(0,0,0,0.04)] p-6 sm:p-7 text-center">
              {isPaid ? (
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              ) : isCancelled ? (
                <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 border border-red-100 shadow-2xs">
                  <XCircle className="w-7 h-7" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-100 shadow-2xs">
                  <Clock className="w-7 h-7" />
                </div>
              )}

              <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                Pedido #{order.id}
              </span>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
                {isPaid
                  ? "Pagamento Confirmado!"
                  : isCancelled
                  ? "Pedido Cancelado"
                  : "Aguardando Pagamento Pix"}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed font-medium">
                {isPaid
                  ? "Sua inscrição e vaga foram confirmadas com sucesso no sistema oficial."
                  : isCancelled
                  ? "Este pedido foi cancelado ou expirou o prazo limite para pagamento."
                  : "Utilize o código Pix abaixo no aplicativo do seu banco para concluir o pagamento."}
              </p>

              {/* Botão de Atualizar Status */}
              <button
                type="button"
                onClick={() => fetchOrder(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all disabled:opacity-50 shadow-2xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-emerald-600" : ""}`} />
                <span>{refreshing ? "Verificando..." : "Atualizar status"}</span>
              </button>
            </div>

            {/* SE PENDENTE: BLOCO DE PAGAMENTO PIX */}
            {isPending && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_28px_rgba(0,0,0,0.04)] p-6 space-y-5">
                <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-5 text-center shadow-2xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Valor total à vista no Pix:
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight block">
                    {formatBRL(order.pricing.total)}
                  </span>
                  <span className="text-xs text-slate-600 block mt-1.5 font-medium">
                    Titular: <strong className="text-slate-900">{order.customer.name}</strong>
                  </span>
                </div>

                {/* Informação Clara de Homologação / Demonstração */}
                {order.pix?.isDemonstrationMode && (
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-left flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-900 leading-relaxed font-medium">
                      <strong className="font-bold text-amber-950 block mb-0.5">
                        Ambiente de Homologação Arquitetural
                      </strong>
                      Seu pedido foi registrado e persistido com sucesso no banco de dados oficial. A chave Pix bancária real será disponibilizada na ativação da conta bancária de produção.
                    </div>
                  </div>
                )}

                {order.pix?.copyAndPasteCode && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Código Pix Copia e Cola:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={order.pix.copyAndPasteCode}
                        className="w-full h-12 bg-[#f8fafc] border border-slate-300 rounded-xl px-3.5 text-xs text-slate-800 font-mono select-all focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={copyPixCode}
                        className={`shrink-0 h-12 px-5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all text-white shadow-xs ${
                          copiedCode ? "bg-emerald-600" : "bg-slate-900 hover:bg-slate-800"
                        }`}
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {order.pix?.qrCodeUrl && (
                  <div className="flex flex-col items-center justify-center p-5 bg-[#f8fafc] border border-slate-200 rounded-xl text-center">
                    <div className="bg-white p-3.5 rounded-xl shadow-xs border border-slate-200 mb-2">
                      <Image
                        src={order.pix.qrCodeUrl}
                        alt="QR Code Pix"
                        width={190}
                        height={190}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Abra o app do seu banco e escaneie o código acima
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* CARD DETALHES DO PEDIDO E ITENS */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_28px_rgba(0,0,0,0.04)] p-6 space-y-4">
              <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100">
                <ShoppingBag className="w-4 h-4 text-slate-700" />
                <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  Itens do Pedido
                </h2>
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                    <div>
                      <strong className="text-slate-900 block text-xs sm:text-sm font-bold">
                        {item.title}
                      </strong>
                      <span className="text-slate-500 text-[11px] font-medium">
                        Qtd: {item.quantity} • {item.modality}
                      </span>
                    </div>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {formatBRL(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}

                <div className="pt-3.5 border-t border-slate-100 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-black text-lg text-slate-900">
                    {formatBRL(order.pricing.total)}
                  </span>
                </div>
              </div>

              {/* Informações do Comprador */}
              <div className="pt-3.5 border-t border-slate-100 text-xs text-slate-600 space-y-1.5 font-medium">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold mb-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Dados do Comprador</span>
                </div>
                <p>Nome: <strong className="text-slate-900">{order.customer.name}</strong></p>
                <p>E-mail: <strong className="text-slate-900">{order.customer.email}</strong></p>
                <p>Telefone: <strong className="text-slate-900">{order.customer.phone}</strong></p>
              </div>

              {/* Informações de Entrega / Retirada */}
              {order.delivery && (
                <div className="pt-3.5 border-t border-slate-100 text-xs text-slate-600 space-y-1 font-medium">
                  <strong className="text-slate-900 block font-bold">Local e Modalidade:</strong>
                  <p>{order.delivery.title}</p>
                  {order.delivery.location && (
                    <p className="text-[11px] text-slate-500">{order.delivery.location}</p>
                  )}
                </div>
              )}
            </div>

            {/* CARD DE SUPORTE */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="text-[12px] leading-relaxed">
                <strong className="text-slate-800 font-bold block mb-0.5">
                  Precisa de suporte com seu pedido?
                </strong>
                Nossa equipe está à disposição para auxiliar você com confirmação ou dúvidas pelo canal oficial de atendimento do Haras.
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── RODAPÉ ── */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-[1020px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-medium">© {new Date().getFullYear()} Mundo dos Cavalos • Haras Nossa Senhora Aparecida</span>
          <div className="inline-flex items-center gap-3 text-[11px] text-slate-400 font-medium">
            <span>Pagamento seguro</span>
            <span>•</span>
            <span>Criptografia SSL de 256 bits</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
