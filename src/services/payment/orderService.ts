import crypto from "crypto";
import { getOfficialProduct, calculateOrderPricing } from "./catalog";
import { getPaymentProvider } from "./providers";
import { orderRepository } from "./repository";
import { CreateOrderInput, CreateOrderResult, Order, CustomerData } from "./types";

/**
 * Validação rigorosa dos dados de entrada
 */
export function validateCustomerInput(data: CustomerData): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 3) {
    return { valid: false, error: "Informe o nome completo (mínimo 3 caracteres)." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    return { valid: false, error: "Informe um endereço de e-mail válido." };
  }

  // Telefone deve conter pelo menos 10 dígitos (DDD + número)
  const phoneDigits = (data.phone || "").replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    return { valid: false, error: "Informe um telefone válido com DDD (10 ou 11 dígitos)." };
  }

  // CPF é opcional nesta etapa; se fornecido, valida dígitos
  if (data.cpf && data.cpf.trim() !== "") {
    const cpfDigits = data.cpf.replace(/\D/g, "");
    if (cpfDigits.length !== 11) {
      return { valid: false, error: "CPF inválido. Deve conter 11 dígitos." };
    }
  }

  return { valid: true };
}

/**
 * Gera um ID de pedido seguro e amigável (ex: JAR-2026-AB12)
 */
function generateOrderId(): string {
  const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `JAR-${new Date().getFullYear()}-${randomSuffix}`;
}

/**
 * Gera token de acesso aleatório de 32 bytes para consulta segura do pedido
 */
function generateAccessToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

export class OrderService {
  /**
   * Criação do pedido com validação estrita no servidor
   */
  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    // 1. Validação dos dados do cliente
    const validation = validateCustomerInput(input.customer);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // 2. Busca do produto oficial no catálogo do servidor (rejeita preços enviados pelo cliente)
    const product = getOfficialProduct(input.productId);
    if (!product) {
      return { success: false, error: "Produto ou curso não encontrado no catálogo oficial." };
    }

    // 3. Cálculo de preços no servidor
    const pricing = calculateOrderPricing(product);

    // 4. Criação da estrutura do pedido
    const now = new Date().toISOString();
    const orderId = generateOrderId();
    const accessToken = generateAccessToken();

    const order: Order = {
      id: orderId,
      accessToken,
      createdAt: now,
      updatedAt: now,
      status: "pending",
      customer: {
        name: input.customer.name.trim(),
        email: input.customer.email.trim().toLowerCase(),
        phone: input.customer.phone.trim(),
        cpf: input.customer.cpf ? input.customer.cpf.trim() : undefined,
      },
      item: product,
      pricing,
      paymentMethod: "pix",
      events: [
        {
          timestamp: now,
          type: "ORDER_CREATED",
          description: `Pedido ${orderId} iniciado no servidor para o item "${product.title}".`,
        },
      ],
    };

    // 5. Integração com Provedor Pix
    try {
      const provider = getPaymentProvider();
      const pixCharge = await provider.createPixCharge(order);

      order.pix = {
        provider: provider.name,
        chargeId: pixCharge.chargeId,
        qrCodeVisualAvailable: Boolean(pixCharge.qrCodeUrl),
        qrCodeUrl: pixCharge.qrCodeUrl,
        copyAndPasteCode: pixCharge.copyAndPasteCode,
        expiresAt: pixCharge.expiresAt,
        isDemonstrationMode: provider.mode === "demonstration",
        instructions: pixCharge.instructions,
      };

      order.events.push({
        timestamp: new Date().toISOString(),
        type: "PIX_CHARGE_GENERATED",
        description: `Cobrança Pix ${pixCharge.chargeId} gerada via provedor ${provider.name}.`,
      });

      // 6. Persistência
      await orderRepository.save(order);

      return {
        success: true,
        order,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro desconhecido ao gerar cobrança Pix.";
      return {
        success: false,
        error: message,
      };
    }
  }

  /**
   * Consulta pública segura de pedido (requer accessToken para impedir que estranhos vejam pedidos alheios)
   */
  async getOrderSecurely(orderId: string, accessToken: string): Promise<Order | null> {
    const order = await orderRepository.findById(orderId);
    if (!order) return null;

    // Proteção estrita: só retorna se o token de acesso corresponder
    if (order.accessToken !== accessToken) {
      return null;
    }

    return order;
  }
}

export const orderService = new OrderService();
