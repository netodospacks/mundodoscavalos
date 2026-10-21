"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  User,
  Mail,
  Phone,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { OrderItem, OrderDeliveryInfo } from "@/services/payment/types.ts";

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

interface CreatedOrderResponse {
  orderId: string;
  accessToken: string;
  status: "pending_payment" | "paid" | "expired" | "cancelled" | "payment_failed";
  chargeStatus: "not_generated" | "charge_created" | "charge_paid" | "charge_expired" | "charge_failed";
  createdAt: string;
  pricing: {
    subtotal: number;
    discount: number;
    fee: number;
    total: number;
  };
  delivery: OrderDeliveryInfo;
  items: OrderItem[];
  customer?: CustomerFormData;
  pix?: {
    provider: string;
    chargeId?: string;
    qrCodeVisualAvailable: boolean;
    qrCodeUrl?: string;
    copyAndPasteCode?: string;
    expiresAt?: string;
    isDemonstrationMode: boolean;
    instructions: string[];
  };
}

interface CheckoutClientProps {
  initialProduct?: OrderItem | null;
}

type PaymentMethodType = "pix" | "card";

export default function CheckoutClient({ initialProduct }: CheckoutClientProps) {
  // Itens do Pedido no Carrinho
  const [cartItems, setCartItems] = useState<OrderItem[]>(() => {
    if (initialProduct) {
      return [{ ...initialProduct, quantity: initialProduct.quantity || 1 }];
    }
    return [];
  });

  // Forma de Pagamento Selecionada
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("pix");

  // Dados do Comprador
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
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Polling ref para acompanhamento do pedido
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

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

  // Alterar Quantidade
  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const max = item.maxQuantity || 10;
          const newQty = Math.max(1, Math.min(item.quantity + delta, max));
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Cálculos no Frontend (Espelho do catálogo oficial)
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = 0;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  const formatBRL = (cents: number) => {
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Validação estrita
  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!customer.name.trim() || customer.name.trim().length < 3) {
      errs.name = "Informe seu nome completo.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customer.email.trim() || !emailRegex.test(customer.email.trim())) {
      errs.email = "Informe um e-mail válido para confirmação.";
    }

    const phoneDigits = customer.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      errs.phone = "Informe o celular com DDD no formato (XX) 9XXXX-XXXX.";
    }

    if (customer.cpf && customer.cpf.trim() !== "") {
      const cpfDigits = customer.cpf.replace(/\D/g, "");
      if (cpfDigits.length !== 11) {
        errs.cpf = "O CPF deve conter exatamente 11 dígitos.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (cartItems.length === 0) {
      setApiError("Seu carrinho está vazio. Selecione um item antes de prosseguir.");
      return;
    }

    if (paymentMethod === "card") {
      setApiError("O pagamento por cartão de crédito estará disponível em breve. Utilize a opção Pix para aprovação imediata.");
      return;
    }

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
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
        throw new Error(data.error || "Não foi possível registrar seu pedido no momento.");
      }

      setOrderData(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro inesperado. Tente novamente.";
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Consulta e atualização de status em tempo real
  const refreshOrderStatus = useCallback(async () => {
    if (!orderData?.orderId || !orderData?.accessToken) return;

    setCheckingStatus(true);
    try {
      const res = await fetch(`/api/orders/${orderData.orderId}?token=${orderData.accessToken}`);
      if (res.ok) {
        const fresh = await res.json();
        setOrderData((prev) => (prev ? { ...prev, ...fresh } : fresh));
      }
    } catch (err) {
      console.error("[STATUS_REFRESH_FAILED]", err);
    } finally {
      setCheckingStatus(false);
    }
  }, [orderData?.orderId, orderData?.accessToken]);

  // Polling automático seguro enquanto o pedido aguarda pagamento
  useEffect(() => {
    if (orderData?.status === "pending_payment") {
      pollingRef.current = setInterval(() => {
        refreshOrderStatus();
      }, 7000);
    } else if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [orderData?.status, refreshOrderStatus]);

  const copyPixCode = () => {
    if (orderData?.pix?.copyAndPasteCode) {
      navigator.clipboard.writeText(orderData.pix.copyAndPasteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans antialiased selection:bg-emerald-600 selection:text-white">
      {/* ── BARRA SUPERIOR DO CHECKOUT (FINTECH DISCRETO & SEGURO) ── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1020px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/cursos/capacitacao-tratadores-equinos"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span className="hidden xs:inline">Voltar ao curso</span>
            <span className="xs:hidden">Voltar</span>
          </Link>

          {/* Identificação Institucional Discreta */}
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

          {/* Indicador de Segurança SSL */}
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-3 py-1.5 rounded-full shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline">Ambiente 100% Seguro</span>
            <span className="sm:hidden">Seguro</span>
          </div>
        </div>
      </header>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <main className="max-w-[1020px] mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
        {orderData ? (
          /* ── TELA DE PAGAMENTO PIX PÓS-REGISTRO (PADRÃO FINTECH MODERNO) ── */
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_28px_rgba(0,0,0,0.04)] p-6 sm:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                Pedido #{orderData.orderId}
              </span>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                Conclua seu pagamento via Pix
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 font-medium">
                Abra o aplicativo do seu banco, escolha Pix Copia e Cola ou escaneie o QR Code abaixo.
              </p>

              {/* Valor Total Destacado */}
              <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-5 mb-6 text-center shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Valor total à vista no Pix:
                </span>
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight block">
                  {formatBRL(orderData.pricing.total)}
                </span>
                <span className="text-xs text-slate-600 block mt-1.5 font-medium">
                  Comprador: <strong className="text-slate-900">{orderData.customer?.name}</strong>
                </span>
              </div>

              {/* Informação Clara de Demonstração */}
              {orderData.pix?.isDemonstrationMode && (
                <div className="mb-6 bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-left flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed font-medium">
                    <strong className="font-bold text-amber-950 block mb-0.5">
                      Ambiente de Demonstração Arquitetural
                    </strong>
                    O pedido foi registrado e salvo com sucesso no banco de dados. A chave Pix bancária em produção será ativada na homologação final.
                  </div>
                </div>
              )}

              {/* QR Code Visual */}
              {orderData.pix?.qrCodeUrl && (
                <div className="mb-6 flex flex-col items-center justify-center p-5 bg-[#f8fafc] border border-slate-200 rounded-xl">
                  <div className="bg-white p-3.5 rounded-xl shadow-xs border border-slate-200 mb-2">
                    <Image
                      src={orderData.pix.qrCodeUrl}
                      alt="QR Code Pix"
                      width={190}
                      height={190}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    Aponte a câmera do aplicativo do seu banco
                  </span>
                </div>
              )}

              {/* Código Pix Copia e Cola */}
              {orderData.pix?.copyAndPasteCode && (
                <div className="mb-6 text-left">
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Código Pix Copia e Cola:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={orderData.pix.copyAndPasteCode}
                      className="w-full h-12 bg-[#f8fafc] border border-slate-300 rounded-xl px-3.5 text-xs text-slate-800 font-mono select-all focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={copyPixCode}
                      style={{ backgroundColor: copiedCode ? "#059669" : "#0f172a", color: "#ffffff" }}
                      className="shrink-0 h-12 px-5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all text-white shadow-xs cursor-pointer"
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

              {/* Instruções de Pagamento */}
              <div className="text-left bg-[#f8fafc] rounded-xl p-4 sm:p-5 border border-slate-200 mb-6 space-y-2">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                  Como pagar com Pix:
                </span>
                <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside font-medium leading-relaxed">
                  <li>Abra o app do seu banco no smartphone.</li>
                  <li>Acesse a área <strong className="text-slate-900">Pix</strong> e selecione <strong className="text-slate-900">Pix Copia e Cola</strong>.</li>
                  <li>Cole o código gerado acima ou escaneie o QR Code.</li>
                  <li>Confirme o valor de <strong className="text-slate-900">{formatBRL(orderData.pricing.total)}</strong> e conclua a transação.</li>
                </ol>
              </div>

              {/* Status ao Vivo e Verificação */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-slate-600 mb-6 bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600 shrink-0" />
                  <span>Aguardando confirmação bancária...</span>
                </div>
                <button
                  type="button"
                  onClick={refreshOrderStatus}
                  disabled={checkingStatus}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 disabled:opacity-60 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${checkingStatus ? "animate-spin text-emerald-600" : ""}`} />
                  <span>{checkingStatus ? "Verificando..." : "Verificar agora"}</span>
                </button>
              </div>

              {/* Botão para Comprovante */}
              <Link
                href={`/checkout/retorno?pedido=${orderData.orderId}&token=${orderData.accessToken}`}
                style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Acessar comprovante e detalhes do pedido</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* ── FORMULÁRIO DE CHECKOUT EDITORIAL EM DUAS ÁREAS ── */
          <form onSubmit={handleSubmit} noValidate>
            {/* ── VERSÃO MOBILE: RESUMO COMPACTO NO TOPO ── */}
            <div className="lg:hidden mb-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)] p-4">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Resumo do Pedido
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {formatBRL(total)}
                  </span>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3.5 items-center">
                    {item.image && (
                      <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {item.modality}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[11px] text-slate-600 font-medium">
                          Qtd: {item.quantity}
                        </span>
                        <span className="text-xs font-extrabold text-slate-900">
                          {formatBRL(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── GRADE PRINCIPAL DESKTOP (FORMULÁRIO ESQUERDA + RESUMO DIREITA) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
              {/* COLUNA ESQUERDA: DADOS + PAGAMENTO + AÇÃO (7 COLUNAS) */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. SEÇÃO: DADOS PESSOAIS */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)] p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 pb-3.5 mb-5 border-b border-slate-100">
                    <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                      Identificação do Comprador
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Nome Completo */}
                    <div>
                      <label htmlFor="customer-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Nome Completo <span className="text-red-500">*</span>
                      </label>
                      <div className={`flex items-center w-full h-12 px-3.5 rounded-xl border transition-all ${
                        errors.name
                          ? "border-red-400 bg-red-50/20 ring-2 ring-red-400/20"
                          : "border-slate-300 bg-[#f8fafc] focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 hover:border-slate-400"
                      }`}>
                        <User className="w-[18px] h-[18px] text-slate-400 shrink-0 mr-3" />
                        <input
                          id="customer-name"
                          type="text"
                          value={customer.name}
                          onChange={(e) => {
                            setCustomer((prev) => ({ ...prev, name: e.target.value }));
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          placeholder="Informe seu nome completo"
                          style={{ background: "transparent", border: "none", outline: "none", width: "100%", height: "100%" }}
                          className="text-sm font-medium text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      {errors.name && (
                        <span className="text-red-600 text-xs font-medium block mt-1">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* E-mail */}
                    <div>
                      <label htmlFor="customer-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <div className={`flex items-center w-full h-12 px-3.5 rounded-xl border transition-all ${
                        errors.email
                          ? "border-red-400 bg-red-50/20 ring-2 ring-red-400/20"
                          : "border-slate-300 bg-[#f8fafc] focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 hover:border-slate-400"
                      }`}>
                        <Mail className="w-[18px] h-[18px] text-slate-400 shrink-0 mr-3" />
                        <input
                          id="customer-email"
                          type="email"
                          value={customer.email}
                          onChange={(e) => {
                            setCustomer((prev) => ({ ...prev, email: e.target.value }));
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          placeholder="seu@email.com"
                          style={{ background: "transparent", border: "none", outline: "none", width: "100%", height: "100%" }}
                          className="text-sm font-medium text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      {errors.email ? (
                        <span className="text-red-600 text-xs font-medium block mt-1">
                          {errors.email}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px] block mt-1">
                          O comprovante de inscrição será enviado para este e-mail.
                        </span>
                      )}
                    </div>

                    {/* WhatsApp e CPF lado a lado no desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Telefone / WhatsApp */}
                      <div>
                        <label htmlFor="customer-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                          WhatsApp / Celular com DDD <span className="text-red-500">*</span>
                        </label>
                        <div className={`flex items-center w-full h-12 px-3.5 rounded-xl border transition-all ${
                          errors.phone
                            ? "border-red-400 bg-red-50/20 ring-2 ring-red-400/20"
                            : "border-slate-300 bg-[#f8fafc] focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 hover:border-slate-400"
                        }`}>
                          <Phone className="w-[18px] h-[18px] text-slate-400 shrink-0 mr-3" />
                          <input
                            id="customer-phone"
                            type="tel"
                            value={customer.phone}
                            onChange={handlePhoneChange}
                            placeholder="(DDD) 90000-0000"
                            style={{ background: "transparent", border: "none", outline: "none", width: "100%", height: "100%" }}
                            className="text-sm font-medium text-slate-900 placeholder:text-slate-400"
                            maxLength={15}
                          />
                        </div>
                        {errors.phone && (
                          <span className="text-red-600 text-xs font-medium block mt-1">
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      {/* CPF (Opcional) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label htmlFor="customer-cpf" className="block text-xs font-semibold text-slate-700">
                            CPF (Opcional)
                          </label>
                          <span className="text-[10px] text-slate-400 font-medium">Para NF</span>
                        </div>
                        <div className={`flex items-center w-full h-12 px-3.5 rounded-xl border transition-all ${
                          errors.cpf
                            ? "border-red-400 bg-red-50/20 ring-2 ring-red-400/20"
                            : "border-slate-300 bg-[#f8fafc] focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 hover:border-slate-400"
                        }`}>
                          <FileText className="w-[18px] h-[18px] text-slate-400 shrink-0 mr-3" />
                          <input
                            id="customer-cpf"
                            type="text"
                            value={customer.cpf}
                            onChange={handleCpfChange}
                            placeholder="000.000.000-00"
                            style={{ background: "transparent", border: "none", outline: "none", width: "100%", height: "100%" }}
                            className="text-sm font-medium text-slate-900 placeholder:text-slate-400"
                            maxLength={14}
                          />
                        </div>
                        {errors.cpf && (
                          <span className="text-red-600 text-xs font-medium block mt-1">
                            {errors.cpf}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. SEÇÃO: FORMA DE PAGAMENTO */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)] p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 pb-3.5 mb-5 border-b border-slate-100">
                    <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                      Forma de Pagamento
                    </h2>
                  </div>

                  {/* Seletor Segmentado */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Botão Pix */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pix")}
                      style={{
                        backgroundColor: paymentMethod === "pix" ? "#ecfdf5" : "#ffffff",
                        borderColor: paymentMethod === "pix" ? "#059669" : "#e2e8f0",
                      }}
                      className="h-16 px-4 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            backgroundColor: paymentMethod === "pix" ? "#059669" : "#f1f5f9",
                            color: paymentMethod === "pix" ? "#ffffff" : "#64748b",
                          }}
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 512 512">
                            <path d="M400.7 32.3c-23.7 0-46.3 9.4-63.1 26.2l-64.6 64.6c-4.4 4.4-11.6 4.4-16 0l-64.6-64.6C175.6 41.7 153 32.3 129.3 32.3 80.6 32.3 41 71.9 41 120.6c0 23.7 9.4 46.3 26.2 63.1l64.6 64.6c4.4 4.4 4.4 11.6 0 16l-64.6 64.6C50.4 345.7 41 368.3 41 392c0 48.7 39.6 88.3 88.3 88.3 23.7 0 46.3-9.4 63.1-26.2l64.6-64.6c4.4-4.4 11.6-4.4 16 0l64.6 64.6c16.8 16.8 39.4 26.2 63.1 26.2 48.7 0 88.3-39.6 88.3-88.3 0-23.7-9.4-46.3-26.2-63.1l-64.6-64.6c-4.4-4.4-4.4-11.6 0-16l64.6-64.6c16.8-16.8 26.2-39.4 26.2-63.1 0-48.7-39.6-88.3-88.3-88.3zm-17.6 195.9c-2.4 2.4-5.6 3.7-8.9 3.7s-6.5-1.3-8.9-3.7l-42.3-42.3c-4.9-4.9-12.9-4.9-17.8 0l-42.3 42.3c-4.9 4.9-12.9 4.9-17.8 0L202.8 186c-4.9-4.9-4.9-12.9 0-17.8l42.3-42.3c4.9-4.9 12.9-4.9 17.8 0l42.3 42.3c4.9 4.9 12.9 4.9 17.8 0l42.3-42.3c4.9-4.9 12.9-4.9 17.8 0l42.3 42.3c4.9 4.9 4.9 12.9 0 17.8l-42.3 42.2zm0 163.6c-2.4 2.4-5.6 3.7-8.9 3.7s-6.5-1.3-8.9-3.7l-42.3-42.3c-4.9-4.9-12.9-4.9-17.8 0l-42.3 42.3c-4.9 4.9-12.9 4.9-17.8 0l-42.3-42.3c-4.9-4.9-4.9-12.9 0-17.8l42.3-42.3c4.9-4.9 12.9-4.9 17.8 0l42.3 42.3c4.9 4.9 12.9 4.9 17.8 0l42.3-42.3c4.9-4.9 12.9-4.9 17.8 0l42.3 42.3c4.9 4.9 4.9 12.9 0 17.8l-42.3 42.3z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-tight">PIX</span>
                          <span className="text-[11px] text-emerald-700 font-bold block truncate">Instantâneo</span>
                        </div>
                      </div>
                      <div
                        style={{
                          backgroundColor: paymentMethod === "pix" ? "#059669" : "transparent",
                          borderColor: paymentMethod === "pix" ? "#059669" : "#cbd5e1",
                          color: "#ffffff",
                        }}
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      >
                        {paymentMethod === "pix" && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>

                    {/* Botão Cartão (Em Breve) */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      style={{
                        backgroundColor: paymentMethod === "card" ? "#f8fafc" : "#f8fafc",
                        borderColor: paymentMethod === "card" ? "#94a3b8" : "#e2e8f0",
                      }}
                      className="h-16 px-4 rounded-xl border text-left transition-all flex items-center justify-between opacity-80 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-slate-700 block leading-tight">Cartão</span>
                          <span className="text-[11px] text-slate-500 font-medium">Em breve</span>
                        </div>
                      </div>
                      <div
                        style={{
                          backgroundColor: paymentMethod === "card" ? "#475569" : "transparent",
                          borderColor: paymentMethod === "card" ? "#475569" : "#cbd5e1",
                          color: "#ffffff",
                        }}
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      >
                        {paymentMethod === "card" && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  </div>

                  {/* Detalhes Pix */}
                  {paymentMethod === "pix" && (
                    <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Liberação instantânea após a confirmação</span>
                      </div>
                      <p className="text-[12px] text-slate-500 pl-6 leading-relaxed font-medium">
                        Ao clicar no botão de confirmação, o QR Code e o código Pix Copia e Cola serão exibidos para pagamento no aplicativo do seu banco.
                      </p>
                    </div>
                  )}

                  {/* Informativo Cartão */}
                  {paymentMethod === "card" && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
                      <div className="flex items-center gap-2 text-slate-800 font-semibold">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Cartão de Crédito indisponível no momento</span>
                      </div>
                      <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                        A modalidade cartão está em fase de homologação bancária. Selecione a opção <strong>PIX</strong> para aprovação imediata.
                      </p>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("pix")}
                        className="text-emerald-700 font-bold hover:underline text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        Mudar para pagamento com PIX →
                      </button>
                    </div>
                  )}
                </div>

                {/* ALERTA DE ERRO DE ENVIO */}
                {apiError && (
                  <div
                    role="alert"
                    className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-800 text-xs shadow-xs"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block mb-0.5">Não foi possível prosseguir:</strong>
                      <span>{apiError}</span>
                    </div>
                  </div>
                )}

                {/* BOTÃO PRINCIPAL DE FINALIZAÇÃO */}
                <div>
                  <button
                    type="submit"
                    disabled={submitting || paymentMethod === "card" || cartItems.length === 0}
                    style={{
                      backgroundColor:
                        paymentMethod === "card" || cartItems.length === 0
                          ? "#94a3b8"
                          : submitting
                          ? "#047857"
                          : "#059669",
                      color: "#ffffff",
                    }}
                    className="w-full h-14 rounded-xl font-extrabold text-sm sm:text-base text-white transition-all flex items-center justify-center gap-2.5 shadow-md shadow-emerald-700/25 hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        <span>Processando pedido com segurança...</span>
                      </>
                    ) : paymentMethod === "card" ? (
                      <span>Cartão indisponível • Selecione Pix</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 shrink-0" />
                        <span>FINALIZAR COMPRA VIA PIX</span>
                        <span className="opacity-90">• {formatBRL(total)}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-3 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Pagamento protegido por criptografia de 256 bits</span>
                  </div>
                </div>

                {/* SUPORTE E INFORMAÇÕES ESSENCIAIS */}
                <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div className="text-[12px] leading-relaxed">
                    <strong className="font-bold text-slate-800 block mb-0.5">
                      Suporte Haras Nossa Senhora Aparecida
                    </strong>
                    Dúvidas sobre o curso ou inscrição? Entre em contato pelos canais oficiais de atendimento do Haras.
                  </div>
                </div>
              </div>

              {/* COLUNA DIREITA: RESUMO DO PEDIDO DESKTOP (STICKY, 5 COLUNAS) */}
              <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.03)] p-6 space-y-5">
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                    <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                      Resumo da Compra
                    </h2>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {cartItems.reduce((acc, i) => acc + i.quantity, 0)}{" "}
                      {cartItems.reduce((acc, i) => acc + i.quantity, 0) === 1 ? "item" : "itens"}
                    </span>
                  </div>

                  {cartItems.length > 0 ? (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3.5 items-start">
                          {item.image && (
                            <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {item.modality}
                            </p>

                            <div className="mt-2.5 flex items-center justify-between">
                              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 border border-slate-200/70">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  disabled={item.quantity <= 1}
                                  className="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center font-bold text-xs disabled:opacity-40 hover:bg-slate-50 shadow-2xs cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="w-5 text-center text-xs font-bold text-slate-800">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  disabled={item.quantity >= (item.maxQuantity || 10)}
                                  className="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center font-bold text-xs disabled:opacity-40 hover:bg-slate-50 shadow-2xs cursor-pointer"
                                >
                                  +
                                </button>
                              </div>

                              <span className="text-sm font-extrabold text-slate-900">
                                {formatBRL(item.unitPrice * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Discriminação de Valores */}
                      <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600 font-medium">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-semibold text-slate-900">{formatBRL(subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Inscrição & Material Didático</span>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                            Incluso
                          </span>
                        </div>
                        <div className="flex justify-between pt-3.5 border-t border-slate-100 text-sm">
                          <span className="font-bold text-slate-900">Total à vista</span>
                          <span className="font-black text-lg text-slate-900">
                            {formatBRL(total)}
                          </span>
                        </div>
                      </div>

                      {/* Reafirmações de Confiança */}
                      <div className="pt-3.5 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Certificado oficial incluso</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Garantia de 7 dias com reembolso integral</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-xs text-slate-500 mb-2">Nenhum item selecionado.</p>
                      <Link
                        href="/cursos/capacitacao-tratadores-equinos"
                        className="text-xs font-bold text-emerald-700 underline"
                      >
                        Ver cursos disponíveis
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* ── RODAPÉ DISCRETO DO CHECKOUT ── */}
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
