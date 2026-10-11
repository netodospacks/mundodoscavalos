import { Order, OrderStatus, PaymentProvider } from "./types";

/**
 * Provedor de Pagamento em Modo Demonstração & Arquitetura Preparada.
 *
 * Em conformidade com a exigência estrita:
 * - NÃO gera códigos Pix fictícios mascarados como reais.
 * - NÃO valida pagamentos automaticamente sem confirmação bancária.
 * - Sinaliza de maneira transparente o status de preparação da API bancária.
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
        "O sistema está em modo de homologação/demonstração enquanto as chaves da API bancária Pix são configuradas.",
        "Nenhum débito ou transação bancária real será processada nesta etapa.",
        "Para formalizar a inscrição antes da liberação da chave bancária automatizada, envie o número deste pedido para o canal oficial de atendimento do Haras.",
      ],
    };
  }

  async checkChargeStatus(_chargeId: string): Promise<{
    status: OrderStatus;
    paidAt?: string;
  }> {
    // Em modo demonstração, o status permanece aguardando pagamento seguro
    return {
      status: "pending",
    };
  }

  validateWebhookSignature(_payload: unknown, _headers: Record<string, string>): boolean {
    return false;
  }
}

/**
 * Interface/Stub de Exemplo para a Futura Implementação Bancária Pix.
 * Quando a documentação oficial do banco for fornecida (ex: Efí/Gerencianet, Asaas, Inter, Itaú),
 * basta instanciar uma classe que implemente PaymentProvider e conectá-la na factory.
 */
export class FutureBankPixProvider implements PaymentProvider {
  readonly name = "future_bank_api";
  readonly mode = "bank_api" as const;

  async createPixCharge(order: Order): Promise<{
    chargeId: string;
    qrCodeUrl?: string;
    copyAndPasteCode?: string;
    expiresAt: string;
    instructions: string[];
  }> {
    // Este método será conectado ao endpoint bancário real (ex: POST /v2/cob)
    throw new Error(
      "A API bancária Pix ainda não foi configurada. Configure as variáveis de ambiente na Vercel e o provedor bancário correspondente."
    );
  }

  async checkChargeStatus(_chargeId: string): Promise<{
    status: OrderStatus;
    paidAt?: string;
  }> {
    // Consulta direta ao endpoint do banco (ex: GET /v2/cob/:txid)
    throw new Error("A API bancária Pix ainda não foi configurada.");
  }

  validateWebhookSignature(_payload: unknown, _headers: Record<string, string>): boolean {
    // Validação criptográfica da assinatura HMAC ou certificado mTLS do banco
    return false;
  }
}

/**
 * Factory de seleção do Provedor de Pagamento
 */
export function getPaymentProvider(): PaymentProvider {
  const mode = process.env.PAYMENT_MODE || "demonstration";

  if (mode === "bank_api") {
    return new FutureBankPixProvider();
  }

  return new DemonstrationPixProvider();
}
