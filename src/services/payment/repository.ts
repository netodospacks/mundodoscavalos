import { Order } from "./types";

/**
 * Interface de Armazenamento de Pedidos.
 * Preparada para persistência serverless na Vercel (Supabase / Postgres / Redis).
 * Fornece fallback seguro em memória durante demonstração.
 */
export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
  updateStatus(orderId: string, status: Order["status"], eventNote: string): Promise<Order | null>;
}

// Armazenamento em memória (globalThis preservado em requisições quentes da mesma instância)
const globalOrders = (globalThis as unknown as { __aras_orders?: Map<string, Order> });
if (!globalOrders.__aras_orders) {
  globalOrders.__aras_orders = new Map<string, Order>();
}

export class MemoryOrderRepository implements OrderRepository {
  private get store(): Map<string, Order> {
    return globalOrders.__aras_orders!;
  }

  async save(order: Order): Promise<void> {
    this.store.set(order.id, { ...order });
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = this.store.get(orderId);
    if (!order) return null;
    return { ...order };
  }

  async updateStatus(
    orderId: string,
    status: Order["status"],
    eventNote: string
  ): Promise<Order | null> {
    const order = this.store.get(orderId);
    if (!order) return null;

    const updated: Order = {
      ...order,
      status,
      updatedAt: new Date().toISOString(),
      events: [
        ...order.events,
        {
          timestamp: new Date().toISOString(),
          type: `STATUS_CHANGE_TO_${status.toUpperCase()}`,
          description: eventNote,
        },
      ],
    };

    this.store.set(orderId, updated);
    return { ...updated };
  }
}

export const orderRepository: OrderRepository = new MemoryOrderRepository();
