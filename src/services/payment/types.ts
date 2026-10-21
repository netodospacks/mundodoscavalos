/**
 * Domínio de Pagamentos e Pedidos — Tipos e Contratos
 * Arquitetura desacoplada e independente de provedor financeiro.
 */

export type OrderStatus =
  | "pending_payment" // Pedido criado, aguardando pagamento
  | "paid" // Pagamento verificado e confirmado no servidor
  | "expired" // Tempo limite do Pix esgotado
  | "cancelled" // Cancelado pelo usuário ou administração
  | "payment_failed"; // Erro ou rejeição no processamento

export type ChargeStatus =
  | "not_generated" // Cobrança ainda não enviada ao banco
  | "charge_created" // Cobrança Pix criada com sucesso no gateway
  | "charge_paid" // Cobrança liquidada no banco
  | "charge_expired" // Cobrança expirada
  | "charge_failed"; // Erro retornado pela API bancária

export type PaymentMethod = "pix";

export type PaymentMode = "demonstration" | "bank_api";

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  cpf?: string;
}

export interface OrderItem {
  id: string;
  title: string;
  subtitle?: string;
  modality: string;
  image?: string;
  unitPrice: number; // Em centavos (ex: 120000 = R$ 1.200,00)
  quantity: number;
  maxQuantity?: number;
}

export interface OrderPricing {
  subtotal: number; // Em centavos
  discount: number; // Em centavos
  fee: number; // Em centavos (taxa de entrega / serviço)
  total: number; // Em centavos
}

export interface OrderDeliveryInfo {
  type: "in_person" | "digital" | "shipping";
  title: string;
  location?: string;
  fee: number; // Em centavos (0 = Grátis / Incluso)
  instructions: string;
}

export interface PixChargeData {
  provider: string; // Ex: "demonstration_pix", "efi", "asaas", "inter"
  chargeId?: string;
  qrCodeVisualAvailable: boolean;
  qrCodeUrl?: string; // Imagem ou SVG do QR Code retornado pela API bancária real
  copyAndPasteCode?: string; // Código Pix Copia e Cola retornado pela API
  expiresAt?: string; // ISO 8601
  isDemonstrationMode: boolean;
  instructions: string[];
}

export interface OrderEvent {
  timestamp: string;
  type: string;
  description: string;
}

export interface Order {
  id: string; // Identificador amigável e único do pedido (ex: JAR-2026-XXXX)
  accessToken: string; // Token seguro de leitura para o comprador visualizar APENAS seu pedido
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  status: OrderStatus;
  chargeStatus: ChargeStatus;
  customer: CustomerData;
  items: OrderItem[];
  pricing: OrderPricing;
  paymentMethod: PaymentMethod;
  delivery: OrderDeliveryInfo;
  idempotencyKey?: string;
  pix?: PixChargeData;
  events: OrderEvent[];
}

export interface CreateOrderItemInput {
  productId: string;
  quantity?: number;
}

export interface CreateOrderInput {
  // Suporte a múltiplos itens ou item único
  items?: CreateOrderItemInput[];
  productId?: string;
  quantity?: number;
  customer: CustomerData;
  idempotencyKey?: string;
}

export interface CreateOrderResult {
  success: boolean;
  order?: Order;
  error?: string;
}

export interface PaymentStatusResult {
  orderId: string;
  status: OrderStatus;
  chargeStatus: ChargeStatus;
  updatedAt: string;
  paidAt?: string;
  isDemonstrationMode: boolean;
}

/**
 * Interface de Contrato para Provedores de Pagamento Pix.
 * Qualquer API de banco futuro (Gerencianet/Efí, Asaas, Inter, Itaú, etc.)
 * implementará esta interface sem necessidade de refatorar o frontend ou o core.
 */
export interface PaymentProvider {
  readonly name: string;
  readonly mode: PaymentMode;

  /**
   * Cria a cobrança Pix no provedor bancário
   */
  createPixCharge(order: Order): Promise<{
    chargeId: string;
    qrCodeUrl?: string;
    copyAndPasteCode?: string;
    expiresAt: string;
    instructions: string[];
  }>;

  /**
   * Consulta o status atual da cobrança diretamente na API bancária
   */
  checkChargeStatus(chargeId: string): Promise<{
    status: OrderStatus;
    paidAt?: string;
    rawResponse?: unknown;
  }>;

  /**
   * Valida a assinatura de autenticidade do webhook do banco
   */
  validateWebhookSignature(rawBody: string, headers: Record<string, string>): boolean;

  /**
   * Cancela uma cobrança Pix no banco (quando suportado)
   */
  cancelPixCharge?(chargeId: string): Promise<boolean>;
}
