/**
 * Domínio de Pagamentos e Pedidos — Tipos e Contratos
 * Arquitetura desacoplada e independente de provedor financeiro.
 */

export type OrderStatus =
  | "pending" // Pedido criado, aguardando pagamento
  | "paid" // Pagamento verificado e confirmado no servidor
  | "expired" // Tempo limite do Pix esgotado
  | "cancelled" // Cancelado pelo usuário ou administração
  | "failed"; // Erro no processamento

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
}

export interface OrderPricing {
  subtotal: number; // Em centavos
  discount: number; // Em centavos
  fee: number; // Em centavos
  total: number; // Em centavos
}

export interface PixChargeData {
  provider: string; // Ex: "demo_provider", "efi", "asaas", "inter"
  chargeId: string;
  qrCodeVisualAvailable: boolean;
  qrCodeUrl?: string; // Imagem do QR Code quando retornado pela API real
  copyAndPasteCode?: string; // Código Pix Copia e Cola real retornado pela API
  expiresAt: string; // ISO 8601
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
  status: OrderStatus;
  customer: CustomerData;
  item: OrderItem;
  pricing: OrderPricing;
  paymentMethod: PaymentMethod;
  pix?: PixChargeData;
  events: OrderEvent[];
}

export interface CreateOrderInput {
  productId: string;
  customer: CustomerData;
}

export interface CreateOrderResult {
  success: boolean;
  order?: Order;
  error?: string;
}

export interface PaymentStatusResult {
  orderId: string;
  status: OrderStatus;
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
  }>;

  /**
   * Valida a assinatura de autenticidade do webhook do banco
   */
  validateWebhookSignature(payload: unknown, headers: Record<string, string>): boolean;
}
