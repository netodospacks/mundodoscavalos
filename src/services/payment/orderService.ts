import crypto from "crypto";
import {
  getOfficialProduct,
  calculateOrderPricing,
  resolveDeliveryInfo,
} from "./catalog.ts";
import { getPaymentProvider } from "./providers.ts";
import { orderRepository } from "./repository.ts";
import type {
  CreateOrderInput,
  CreateOrderResult,
  Order,
  CustomerData,
  OrderItem,
} from "./types.ts";

/**
 * Validação rigorosa dos dados cadastrais do cliente
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

  // CPF é opcional nesta etapa; se fornecido, valida formato de 11 dígitos
  if (data.cpf && data.cpf.trim() !== "") {
    const cpfDigits = data.cpf.replace(/\D/g, "");
    if (cpfDigits.length !== 11) {
      return { valid: false, error: "CPF inválido. Deve conter 11 dígitos." };
    }
  }

  return { valid: true };
}

/**
 * Gera um ID de pedido seguro, amigável e legível (ex: JAR-2026-AB12)
 */
function generateOrderId(): string {
  const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `JAR-${new Date().getFullYear()}-${randomSuffix}`;
}

/**
 * Gera token de acesso aleatório de 24 bytes (48 hex chars) para autorização de leitura do pedido
 */
function generateAccessToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

function constantTimeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
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

    // 1.1 Verificação de Idempotência
    if (input.idempotencyKey && input.idempotencyKey.trim()) {
      const existing = await orderRepository.findByIdempotencyKey?.(input.idempotencyKey.trim());
      if (existing) {
        return { success: true, order: existing };
      }
    }

    // 2. Resolução dos itens (suporta array ou item único)
    const rawItems = input.items && input.items.length > 0
      ? input.items
      : input.productId
        ? [{ productId: input.productId, quantity: input.quantity || 1 }]
        : [];

    if (rawItems.length === 0) {
      return { success: false, error: "Nenhum produto selecionado para o pedido." };
    }

    const validatedItems: OrderItem[] = [];

    for (const raw of rawItems) {
      const official = getOfficialProduct(raw.productId);
      if (!official) {
        return {
          success: false,
          error: `Item "${raw.productId}" não encontrado no catálogo oficial do servidor.`,
        };
      }

      const maxAllowed = official.maxQuantity || 10;
      const sanitizedQty = Math.min(Math.max(1, Math.floor(raw.quantity || 1)), maxAllowed);

      validatedItems.push({
        ...official,
        quantity: sanitizedQty,
      });
    }

    // 3. Cálculo de preços e regras de entrega no servidor (valores enviados pelo cliente são ignorados)
    const pricing = calculateOrderPricing(validatedItems);
    const delivery = resolveDeliveryInfo(validatedItems);

    // 4. Criação da estrutura do pedido
    const now = new Date().toISOString();
    const orderId = generateOrderId();
    const accessToken = generateAccessToken();

    const order: Order = {
      id: orderId,
      accessToken,
      idempotencyKey: input.idempotencyKey ? input.idempotencyKey.trim() : undefined,
      createdAt: now,
      updatedAt: now,
      status: "pending_payment",
      chargeStatus: "not_generated",
      customer: {
        name: input.customer.name.trim(),
        email: input.customer.email.trim().toLowerCase(),
        phone: input.customer.phone.trim(),
        cpf: input.customer.cpf ? input.customer.cpf.trim() : undefined,
      },
      items: validatedItems,
      pricing,
      paymentMethod: "pix",
      delivery,
      events: [
        {
          timestamp: now,
          type: "ORDER_CREATED",
          description: `Pedido ${orderId} registrado no servidor com ${validatedItems.length} item(ns). Subtotal: R$ ${(pricing.subtotal / 100).toFixed(2)}.`,
        },
      ],
    };

    // 5. Integração com Provedor Pix (Desacoplado)
    try {
      const provider = getPaymentProvider();
      const pixCharge = await provider.createPixCharge(order);

      order.chargeStatus = provider.mode === "demonstration" ? "not_generated" : "charge_created";
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
        type: "PIX_CHARGE_INITIALIZED",
        description: `Integração Pix inicializada via provedor [${provider.name}]. Modo: ${provider.mode}.`,
      });

      // 6. Persistência
      await orderRepository.save(order);

      return {
        success: true,
        order,
      };
    } catch (err: unknown) {
      console.error("[ORDER_CREATION_PROCESS_ERROR]", err);
      const isPersistenceError = err instanceof Error && err.message.toLowerCase().includes("banco de dados");
      const message = isPersistenceError
        ? "Não foi possível confirmar o pedido no sistema devido a uma falha de conexão com o banco de dados. Nenhuma cobrança foi efetuada. Por favor, tente novamente."
        : err instanceof Error
        ? err.message
        : "Erro desconhecido ao processar integração Pix.";
      return {
        success: false,
        error: message,
      };
    }
  }

  /**
   * Consulta pública segura de pedido (requer accessToken para impedir visualização não autorizada)
   */
  async getOrderSecurely(orderId: string, accessToken: string): Promise<Order | null> {
    if (!orderId || !accessToken || typeof orderId !== "string" || typeof accessToken !== "string") {
      return null;
    }
    const cleanId = orderId.trim();
    const cleanToken = accessToken.trim();
    if (cleanToken.length < 24) {
      return null;
    }

    const order = await orderRepository.findByIdAndToken(cleanId, cleanToken);
    if (!order) return null;

    // Proteção de isolamento estrita com mitigação de ataques de temporização (timing attacks)
    if (!constantTimeCompare(order.accessToken, cleanToken)) {
      return null;
    }

    return order;
  }

  /**
   * Consulta status atualizado junto ao provedor de pagamento e atualiza pedido
   */
  async checkAndUpdateStatus(orderId: string, accessToken: string): Promise<Order | null> {
    const order = await this.getOrderSecurely(orderId, accessToken);
    if (!order) return null;

    // Se já está pago ou cancelado, retorna o estado final
    if (order.status === "paid" || order.status === "cancelled") {
      return order;
    }

    // Se expirou pelo tempo limite configurado
    if (order.pix?.expiresAt) {
      const isExpired = new Date(order.pix.expiresAt).getTime() < Date.now();
      if (isExpired && order.status === "pending_payment") {
        await orderRepository.updateStatus(
          orderId,
          "expired",
          "Tempo limite da cobrança Pix atingido."
        );
        return orderRepository.findById(orderId);
      }
    }

    // Consulta ao provedor bancário
    try {
      const provider = getPaymentProvider();
      if (order.pix?.chargeId && provider.mode === "bank_api") {
        const check = await provider.checkChargeStatus(order.pix.chargeId);
        if (check.status !== order.status) {
          await orderRepository.updateStatus(
            orderId,
            check.status,
            `Status sincronizado com API bancária: ${check.status}.`,
            check.paidAt
          );
          return orderRepository.findById(orderId);
        }
      }
    } catch (err) {
      console.error("[STATUS_CHECK_ERROR]", err);
    }

    return order;
  }

  /**
   * Cancelamento de pedido pelo usuário ou administração
   */
  async cancelOrder(orderId: string, accessToken: string, reason = "Cancelado pelo usuário"): Promise<Order | null> {
    const order = await this.getOrderSecurely(orderId, accessToken);
    if (!order) return null;

    if (order.status === "paid") {
      throw new Error("Não é possível cancelar um pedido com pagamento já confirmado.");
    }

    await orderRepository.updateStatus(orderId, "cancelled", reason);
    return orderRepository.findById(orderId);
  }
}

export const orderService = new OrderService();
