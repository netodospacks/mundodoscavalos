import crypto from "crypto";
import type { Order, OrderStatus, PaymentProvider } from "./types.ts";

/**
 * Provedor de Pagamento em Modo Demonstração / Homologação Arquitetural.
 *
 * Em estrita conformidade com as diretrizes do projeto:
 * - NÃO gera códigos Pix fictícios ou estáticos fingindo serem dinâmicos.
 * - NÃO inventa QR Codes para simular falsamente uma cobrança bancária real.
 * - NÃO valida pagamentos sem confirmação autenticada do banco.
 * - Sinaliza de maneira transparente que a API bancária está em preparação.
 */
export class DemonstrationPixProvider implements PaymentProvider {
  readonly name = "demonstration_pix";
  readonly mode = "demonstration" as const;

  async createPixCharge(order: Order): Promise<{
    chargeId: string;
    qrCodeUrl?: string;
    copyAndPasteCode?: string;
    expiresAt: string;
    instructions: string[];
  }> {
    const expirationMinutes = parseInt(process.env.PIX_EXPIRATION_MINUTES || "30", 10);
    const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000).toISOString();
    const chargeId = `DEMO-CHG-${order.id}`;

    return {
      chargeId,
      // Não criamos QR Code falso nem copia-e-cola falso
      qrCodeUrl: undefined,
      copyAndPasteCode: undefined,
      expiresAt,
      instructions: [
        "O sistema está em modo de homologação e arquitetura preparada enquanto as credenciais da API bancária Pix são fornecidas.",
        "Nenhum débito, transação financeira ou cobrança bancária real foi gerada nesta etapa.",
        "O seu pedido foi registrado com segurança no servidor com status 'Aguardando Pagamento'.",
        "Para confirmação antecipada de vaga, você pode contatar diretamente a secretaria oficial do Haras via WhatsApp.",
      ],
    };
  }

  async checkChargeStatus(_chargeId: string): Promise<{
    status: OrderStatus;
    paidAt?: string;
  }> {
    // Em modo demonstração, o status permanece rigorosamente aguardando pagamento
    return {
      status: "pending_payment",
    };
  }

  validateWebhookSignature(_payload: unknown, _headers: Record<string, string>): boolean {
    // Em modo demonstração, webhooks não autorizados são rejeitados
    return false;
  }

  async cancelPixCharge?(_chargeId: string): Promise<boolean> {
    return true;
  }
}

/**
 * Adaptador para a Futura Integração Bancária Pix Real.
 *
 * Quando as credenciais bancárias oficiais forem fornecidas (ex: Efí/Gerencianet, Asaas, Inter, Itaú, Bradesco),
 * esta classe será preenchida com as chamadas HTTPS autenticadas:
 *
 * 1. Autenticação OAuth2 / mTLS (usando PIX_CLIENT_ID, PIX_CLIENT_SECRET, PIX_CERTIFICATE_BASE64)
 * 2. Criação da cobrança com payload padrão BACEN (PUT/POST /v2/cob com txid, valor, devedor, calendario.expiracao)
 * 3. Obtenção do QR Code (GET /v2/loc/:id/qrcode) retornando imagem base64 e copiaECola string
 * 4. Consulta de status (GET /v2/cob/:txid) retornando ATIVA, CONCLUIDA, EXPIRADA ou REMOVIDA_PELO_USUARIO_RECEBEDOR
 * 5. Validação de Webhook (HMAC-SHA256 ou validação mTLS do certificado do banco)
 */
export class FutureBankPixProvider implements PaymentProvider {
  readonly name = "bank_api";
  readonly mode = "bank_api" as const;

  private isConfigured(): boolean {
    const clientId = process.env.PIX_CLIENT_ID;
    const clientSecret = process.env.PIX_CLIENT_SECRET;
    const pixKey = process.env.PIX_KEY;
    return Boolean(clientId && clientSecret && pixKey);
  }

  async createPixCharge(_order: Order): Promise<{
    chargeId: string;
    qrCodeUrl?: string;
    copyAndPasteCode?: string;
    expiresAt: string;
    instructions: string[];
  }> {
    if (!this.isConfigured()) {
      throw new Error(
        "A API bancária Pix foi selecionada (PAYMENT_MODE=bank_api), porém as credenciais bancárias (PIX_CLIENT_ID, PIX_CLIENT_SECRET, PIX_KEY) ainda não foram configuradas nas variáveis de ambiente."
      );
    }

    /**
     * PONTO DE INTEGRAÇÃO BANCÁRIA:
     * Aqui será feita a requisição para o gateway bancário oficial:
     *
     * const response = await fetch(`${BANK_BASE_URL}/v2/cob/${order.id}`, {
     *   method: "PUT",
     *   headers: {
     *     Authorization: `Bearer ${token}`,
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify({
     *     calendario: { expiracao: 1800 },
     *     devedor: {
     *       cpf: order.customer.cpf?.replace(/\D/g, ""),
     *       nome: order.customer.name,
     *     },
     *     valor: { original: (order.pricing.total / 100).toFixed(2) },
     *     chave: process.env.PIX_KEY,
     *     solicitacaoPagador: `Inscrição ${order.id} - ${order.items[0]?.title || "Curso"}`,
     *   }),
     * });
     */
    throw new Error(
      "Aguardando documentação e credenciais oficiais da instituição financeira parceira."
    );
  }

  async checkChargeStatus(_chargeId: string): Promise<{
    status: OrderStatus;
    paidAt?: string;
    rawResponse?: unknown;
  }> {
    if (!this.isConfigured()) {
      return { status: "pending_payment" };
    }

    /**
     * PONTO DE CONSULTA DE COBRANÇA:
     * Chamada GET /v2/cob/:txid
     */
    throw new Error("Aguardando credenciais da API bancária para consulta de cobrança.");
  }

  validateWebhookSignature(rawBody: string, headers: Record<string, string>): boolean {
    const webhookSecret = process.env.PIX_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn("[WEBHOOK_REJECTED] PIX_WEBHOOK_SECRET não configurado.");
      return false;
    }

    // Identifica o cabeçalho de assinatura padrão enviado pelo banco
    const signature =
      headers["x-webhook-signature"] ||
      headers["x-signature"] ||
      headers["webhook-signature"] ||
      headers["x-hub-signature-256"];

    if (!signature) {
      console.warn("[WEBHOOK_REJECTED] Nenhum cabeçalho de assinatura bancária encontrado.");
      return false;
    }

    try {
      // Remove prefixos como 'sha256=' se fornecido pelo gateway
      const cleanSignature = signature.replace(/^sha256=/, "").trim();

      // Calcula HMAC-SHA256 do corpo bruto
      const computedHmac = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody, "utf8")
        .digest("hex");

      const bufA = Buffer.from(cleanSignature, "hex");
      const bufB = Buffer.from(computedHmac, "hex");

      if (bufA.length !== bufB.length) {
        return false;
      }

      // Comparação em tempo constante para mitigar timing attacks
      return crypto.timingSafeEqual(bufA, bufB);
    } catch {
      return false;
    }
  }

  async cancelPixCharge?(_chargeId: string): Promise<boolean> {
    return true;
  }
}

/**
 * Factory de seleção do Provedor de Pagamento.
 * Permite alternar entre demonstração e API bancária real via variável de ambiente.
 */
export function getPaymentProvider(): PaymentProvider {
  const mode = process.env.PAYMENT_MODE || "demonstration";

  if (mode === "bank_api") {
    return new FutureBankPixProvider();
  }

  return new DemonstrationPixProvider();
}
