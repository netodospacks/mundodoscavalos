import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/services/payment/providers";
import { orderRepository } from "@/services/payment/repository";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Endpoint de Webhook para Notificações Instantâneas do Banco (Pix).
 *
 * REGRAS DE SEGURANÇA E CONTRATO:
 * 1. NUNCA atualiza pedido sem validar a autenticidade da assinatura criptográfica bancária HMAC-SHA256 / mTLS.
 * 2. Processamento estritamente idempotente: se o pedido já estiver como 'paid', ignora reprocessamento.
 * 3. Rejeita requisições sem assinatura válida com HTTP 401.
 * 4. Registra histórico e timestamps para auditoria financeira.
 */
export async function POST(req: NextRequest) {
  try {
    const rawHeaders: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      rawHeaders[key.toLowerCase()] = value;
    });

    // Lê o corpo bruto como string antes de converter para JSON para cálculo exato de HMAC
    const rawBody = await req.text();
    if (!rawBody || rawBody.trim() === "") {
      return NextResponse.json({ error: "Payload vazio" }, { status: 400 });
    }

    const provider = getPaymentProvider();

    // 1. Verificação de ativação do webhook bancário real
    // Enquanto a API bancária real não estiver configurada, o webhook permanece rigorosamente desativado.
    if (provider.mode !== "bank_api" || !process.env.PIX_WEBHOOK_SECRET) {
      console.warn(
        "[WEBHOOK_DISABLED] Tentativa de acionamento do webhook rejeitada: API bancária não configurada ou PIX_WEBHOOK_SECRET ausente. Modo de demonstração ativo."
      );
      return NextResponse.json(
        {
          error:
            "Webhook Pix desativado: integração bancária em modo de homologação/demonstração. Confirmações automáticas de pagamento não estão ativas.",
        },
        { status: 503 }
      );
    }

    // 2. Validação Criptográfica de Autenticidade (HMAC-SHA256 com o segredo do webhook)
    const isAuthentic = provider.validateWebhookSignature(rawBody, rawHeaders);

    if (!isAuthentic) {
      console.warn("[SECURITY_AUDIT] Tentativa de chamada ao webhook rejeitada por assinatura inválida.");
      return NextResponse.json(
        { error: "Assinatura do webhook não autenticada." },
        { status: 401 }
      );
    }

    interface WebhookPayload {
      orderId?: string;
      txid?: string;
      external_reference?: string;
      event?: string;
      status?: string;
      pix?: Array<{
        status?: string;
        valor?: string | number;
        horario?: string;
      }>;
      [key: string]: unknown;
    }

    let body: WebhookPayload;
    try {
      body = JSON.parse(rawBody) as WebhookPayload;
    } catch {
      return NextResponse.json({ error: "Formato JSON inválido" }, { status: 400 });
    }

    // 2. Extração do Identificador do Pedido / Cobrança Pix
    // O BACEN padroniza 'txid'; outros gateways utilizam 'orderId' ou 'external_reference'
    const orderId = body.orderId || body.txid || body.external_reference;
    if (!orderId) {
      return NextResponse.json(
        { error: "Identificador do pedido (txid/orderId) ausente no webhook" },
        { status: 400 }
      );
    }

    const existingOrder = await orderRepository.findById(orderId);
    if (!existingOrder) {
      return NextResponse.json({ error: "Pedido não localizado no sistema" }, { status: 404 });
    }

    // 3. Idempotência: Se já foi pago, retorna 200 imediatamente sem duplicar eventos
    if (existingOrder.status === "paid") {
      return NextResponse.json({ received: true, status: "already_paid" }, { status: 200 });
    }

    // 4. Tratamento de Confirmação de Pagamento Autorizada
    const isConfirmed =
      body.event === "PAYMENT_CONFIRMED" ||
      body.status === "CONCLUIDA" ||
      body.pix?.[0]?.status === "CONCLUIDA" ||
      Boolean(body.pix?.[0]?.valor);

    if (isConfirmed) {
      const paidAt = body.pix?.[0]?.horario || new Date().toISOString();
      await orderRepository.updateStatus(
        orderId,
        "paid",
        `Pagamento Pix de R$ ${(existingOrder.pricing.total / 100).toFixed(
          2
        )} confirmado com sucesso via webhook bancário oficial (${provider.name}).`,
        paidAt
      );

      return NextResponse.json({ received: true, status: "paid" }, { status: 200 });
    }

    // 5. Tratamento de Expiração / Devolução
    if (body.status === "EXPIRADA") {
      await orderRepository.updateStatus(
        orderId,
        "expired",
        "Cobrança Pix marcada como expirada pela instituição bancária."
      );
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[WEBHOOK_PROCESSING_ERROR]", error);
    return NextResponse.json(
      { error: "Erro interno no processamento do webhook" },
      { status: 500 }
    );
  }
}
