import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/services/payment/providers";
import { orderRepository } from "@/services/payment/repository";

/**
 * Endpoint de Webhook para Notificações Instantâneas do Banco (Pix).
 *
 * REGRAS DE SEGURANÇA E CONTRATO:
 * 1. NUNCA atualiza pedido sem validar a autenticidade da assinatura bancária.
 * 2. Processamento idempotente: se o pedido já estiver como 'paid', ignora reprocessamento.
 * 3. Rejeita requisições sem assinatura válida com HTTP 401.
 */
export async function POST(req: NextRequest) {
  try {
    const rawHeaders: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      rawHeaders[key.toLowerCase()] = value;
    });

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
    }

    const provider = getPaymentProvider();

    // 1. Validação Criptográfica de Autenticidade
    const isAuthentic = provider.validateWebhookSignature(body, rawHeaders);

    if (!isAuthentic) {
      console.warn("[SECURITY_WARNING] Tentativa de webhook rejeitada por assinatura inválida.");
      return NextResponse.json(
        { error: "Assinatura do webhook não autenticada." },
        { status: 401 }
      );
    }

    // 2. Extração do Identificador do Pedido / Cobrança
    const orderId = body.orderId || body.txid;
    if (!orderId) {
      return NextResponse.json({ error: "Identificador do pedido ausente no webhook" }, { status: 400 });
    }

    const existingOrder = await orderRepository.findById(orderId);
    if (!existingOrder) {
      return NextResponse.json({ error: "Pedido não localizado" }, { status: 404 });
    }

    // 3. Idempotência: Se já foi pago, retorna 200 imediatamente sem duplicar eventos
    if (existingOrder.status === "paid") {
      return NextResponse.json({ received: true, status: "already_paid" }, { status: 200 });
    }

    // 4. Atualização autorizada do status
    if (body.event === "PAYMENT_CONFIRMED" || body.status === "CONCLUIDA") {
      await orderRepository.updateStatus(
        orderId,
        "paid",
        `Pagamento Pix confirmado via webhook bancário oficial (${provider.name}).`
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
