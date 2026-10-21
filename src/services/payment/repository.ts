import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { Order, OrderStatus, ChargeStatus } from "./types.ts";

/**
 * Validação de transições de status do pedido para integridade de concorrência.
 * Impede que pedidos pagos ou cancelados sejam revertidos.
 */
export function isValidStatusTransition(current: OrderStatus, next: OrderStatus): boolean {
  if (current === next) return true; // Idempotente
  if (current === "paid") {
    // Estado terminal de liquidação financeira confirmada (imutável)
    return false;
  }
  if (current === "cancelled") {
    // Estado terminal de cancelamento (imutável)
    return false;
  }
  if (current === "expired") {
    // Pedido expirado só pode ser formalmente cancelado, nunca reaberto como pendente ou pago
    return next === "cancelled";
  }
  if (current === "pending_payment") {
    return ["paid", "expired", "cancelled", "payment_failed"].includes(next);
  }
  if (current === "payment_failed") {
    return ["pending_payment", "cancelled"].includes(next);
  }
  return false;
}

/**
 * Comparação em tempo constante para mitigar timing attacks na validação de tokens
 */
export function constantTimeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Interface de Armazenamento e Persistência de Pedidos.
 * Preparada para persistência serverless e durável (Supabase / Postgres).
 */
export interface OrderRepository {
  readonly isDurable: boolean;
  readonly providerName: string;
  save(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
  findByIdAndToken(orderId: string, accessToken: string): Promise<Order | null>;
  findByIdempotencyKey?(key: string): Promise<Order | null>;
  updateStatus(
    orderId: string,
    status: OrderStatus,
    eventNote: string,
    paidAt?: string
  ): Promise<Order | null>;
}

// Armazenamento em memória (globalThis preservado em instâncias quentes da mesma execução)
interface GlobalOrdersScope {
  __aras_orders?: Map<string, Order>;
}

const globalOrders = globalThis as unknown as GlobalOrdersScope;
if (!globalOrders.__aras_orders) {
  globalOrders.__aras_orders = new Map<string, Order>();
}

export class MemoryOrderRepository implements OrderRepository {
  readonly isDurable = false;
  readonly providerName = "memory_volatile";

  private get store(): Map<string, Order> {
    return globalOrders.__aras_orders!;
  }

  // Caminho do arquivo de cache para persistência durante desenvolvimento local
  private get devCacheFilePath(): string | null {
    if (process.env.NODE_ENV === "production") return null;
    try {
      return path.join(process.cwd(), ".next", "orders_cache.json");
    } catch {
      return null;
    }
  }

  constructor() {
    this.hydrateFromDevCache();
  }

  private hydrateFromDevCache() {
    try {
      const filePath = this.devCacheFilePath;
      if (filePath && fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw) as Record<string, Order>;
        for (const [id, order] of Object.entries(parsed)) {
          if (!this.store.has(id)) {
            this.store.set(id, order);
          }
        }
      }
    } catch {
      // Ignora silenciosamente se o ambiente tiver sistema de arquivos somente leitura
    }
  }

  private persistToDevCache() {
    try {
      const filePath = this.devCacheFilePath;
      if (filePath) {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const obj: Record<string, Order> = {};
        for (const [key, value] of this.store.entries()) {
          obj[key] = value;
        }
        fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf-8");
      }
    } catch {
      // Ignora silenciosamente se não for possível gravar em disco
    }
  }

  async save(order: Order): Promise<void> {
    this.store.set(order.id, { ...order });
    this.persistToDevCache();
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = this.store.get(orderId);
    if (!order) return null;
    return { ...order };
  }

  async findByIdAndToken(orderId: string, accessToken: string): Promise<Order | null> {
    const order = this.store.get(orderId);
    if (!order) return null;
    if (!constantTimeCompare(order.accessToken, accessToken)) {
      return null;
    }
    return { ...order };
  }

  async findByIdempotencyKey(key: string): Promise<Order | null> {
    if (!key) return null;
    for (const order of this.store.values()) {
      if (order.idempotencyKey && order.idempotencyKey === key) {
        return { ...order };
      }
    }
    return null;
  }

  async updateStatus(
    orderId: string,
    status: OrderStatus,
    eventNote: string,
    paidAt?: string
  ): Promise<Order | null> {
    const order = this.store.get(orderId);
    if (!order) return null;

    if (!isValidStatusTransition(order.status, status)) {
      console.warn(
        `[STATUS_TRANSITION_REJECTED] Transição não permitida de "${order.status}" para "${status}" no pedido ${orderId}.`
      );
      return null;
    }

    const now = new Date().toISOString();
    const updated: Order = {
      ...order,
      status,
      updatedAt: now,
      paidAt: paidAt || (status === "paid" ? now : order.paidAt),
      events: [
        ...order.events,
        {
          timestamp: now,
          type: `STATUS_CHANGE_TO_${status.toUpperCase()}`,
          description: eventNote,
        },
      ],
    };

    this.store.set(orderId, updated);
    this.persistToDevCache();
    return { ...updated };
  }
}

interface SupabaseOrderItemRow {
  product_id: string;
  title: string;
  subtitle?: string | null;
  modality: string;
  image_url?: string | null;
  unit_price_cents: number;
  quantity: number;
}

interface SupabaseOrderEventRow {
  created_at: string;
  event_type: string;
  description: string;
}

interface SupabaseOrderRow {
  id: string;
  access_token: string;
  idempotency_key?: string | null;
  status: OrderStatus;
  charge_status: ChargeStatus;
  created_at: string;
  updated_at: string;
  paid_at?: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_cpf?: string | null;
  subtotal_cents: number;
  discount_cents: number;
  fee_cents: number;
  total_cents: number;
  delivery_type?: "in_person" | "digital" | "shipping" | null;
  delivery_title: string;
  delivery_location?: string | null;
  delivery_instructions?: string | null;
  pix_provider?: string | null;
  pix_charge_id?: string | null;
  pix_qr_code_url?: string | null;
  pix_copy_paste?: string | null;
  pix_expires_at?: string | null;
  order_items?: SupabaseOrderItemRow[];
  order_events?: SupabaseOrderEventRow[];
}

/**
 * Repositório Durável Conectado ao Supabase via API PostgREST Nativa.
 * Utiliza fetch nativo do Node.js/Next.js, sem dependência de bibliotecas externas.
 * Utiliza exclusivamente SUPABASE_SERVICE_ROLE_KEY no backend para bypass RLS seguro.
 * 
 * REGRA ESTRITA DE PERSISTÊNCIA REAL:
 * Uma falha ao salvar um pedido no Supabase NUNCA é apresentada como gravação bem-sucedida.
 * Se o banco falhar, o método save() lança erro explícito para que o fluxo de checkout
 * informe ao frontend que o pedido não pôde ser gravado, permitindo nova tentativa.
 */
export class SupabaseOrderRepository implements OrderRepository {
  readonly isDurable = true;
  readonly providerName = "supabase";

  private url: string;
  private apiKey: string;

  constructor(url: string, apiKey: string) {
    this.url = url.replace(/\/+$/, "");
    this.apiKey = apiKey;
  }

  private get headers(): Record<string, string> {
    return {
      apikey: this.apiKey,
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  async save(order: Order): Promise<void> {
    const orderPayload = {
      id: order.id,
      access_token: order.accessToken,
      idempotency_key: order.idempotencyKey || null,
      status: order.status,
      charge_status: order.chargeStatus,
      customer_name: order.customer.name,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      customer_cpf: order.customer.cpf || null,
      subtotal_cents: order.pricing.subtotal,
      discount_cents: order.pricing.discount,
      fee_cents: order.pricing.fee,
      total_cents: order.pricing.total,
      delivery_type: order.delivery.type,
      delivery_title: order.delivery.title,
      delivery_location: order.delivery.location || null,
      delivery_instructions: order.delivery.instructions || null,
      pix_provider: order.pix?.provider || null,
      pix_charge_id: order.pix?.chargeId || null,
      pix_qr_code_url: order.pix?.qrCodeUrl || null,
      pix_copy_paste: order.pix?.copyAndPasteCode || null,
      pix_expires_at: order.pix?.expiresAt || null,
      created_at: order.createdAt,
      updated_at: order.updatedAt,
      paid_at: order.paidAt || null,
    };

    // 1. Gravação do Pedido Principal com resolução de conflito por ID
    let res: Response;
    try {
      res = await fetch(`${this.url}/rest/v1/orders?on_conflict=id`, {
        method: "POST",
        headers: {
          ...this.headers,
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify(orderPayload),
      });
    } catch (networkErr: unknown) {
      console.error(
        "[SUPABASE_PERSISTENCE_ERROR] Falha de rede ao conectar com Supabase:",
        networkErr instanceof Error ? networkErr.message : "Erro de conexão"
      );
      throw new Error(
        "Não foi possível registrar o pedido no banco de dados devido a uma falha de rede. Por favor, tente novamente."
      );
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(
        `[SUPABASE_SAVE_ERROR] Supabase retornou status ${res.status} ao persistir pedido ${order.id}:`,
        errText
      );
      throw new Error(
        `Não foi possível registrar o pedido no banco de dados (status HTTP ${res.status}). Por favor, tente novamente.`
      );
    }

    // 2. Persistir Itens com idempotência (on_conflict=order_id,product_id)
    if (order.items && order.items.length > 0) {
      const itemsPayload = order.items.map((i) => ({
        order_id: order.id,
        product_id: i.id,
        title: i.title,
        subtitle: i.subtitle || null,
        modality: i.modality,
        image_url: i.image || null,
        unit_price_cents: i.unitPrice,
        quantity: i.quantity,
        created_at: order.createdAt,
      }));

      let itemsRes: Response;
      try {
        itemsRes = await fetch(
          `${this.url}/rest/v1/order_items?on_conflict=order_id,product_id`,
          {
            method: "POST",
            headers: {
              ...this.headers,
              Prefer: "resolution=merge-duplicates",
            },
            body: JSON.stringify(itemsPayload),
          }
        );
      } catch (itemNetErr) {
        console.error("[SUPABASE_ITEMS_ERROR] Falha de rede ao gravar itens:", itemNetErr);
        throw new Error("Falha de rede ao registrar os itens do pedido no banco de dados.");
      }

      if (!itemsRes.ok) {
        const itemErrText = await itemsRes.text().catch(() => "");
        console.error(`[SUPABASE_ITEMS_ERROR] Status ${itemsRes.status} ao persistir itens:`, itemErrText);
        throw new Error(
          `Falha ao registrar itens do pedido no banco de dados (status HTTP ${itemsRes.status}).`
        );
      }
    }

    // 3. Persistir Eventos de Auditoria com idempotência
    if (order.events && order.events.length > 0) {
      const eventsPayload = order.events.map((e) => ({
        order_id: order.id,
        event_type: e.type,
        description: e.description,
        created_at: e.timestamp,
      }));

      let eventsRes: Response;
      try {
        eventsRes = await fetch(
          `${this.url}/rest/v1/order_events?on_conflict=order_id,event_type,created_at`,
          {
            method: "POST",
            headers: {
              ...this.headers,
              Prefer: "resolution=merge-duplicates",
            },
            body: JSON.stringify(eventsPayload),
          }
        );
      } catch (eventNetErr) {
        console.error("[SUPABASE_EVENTS_ERROR] Falha de rede ao gravar eventos:", eventNetErr);
        throw new Error("Falha de rede ao registrar eventos de auditoria do pedido no banco de dados.");
      }

      if (!eventsRes.ok) {
        const eventErrText = await eventsRes.text().catch(() => "");
        console.error(`[SUPABASE_EVENTS_ERROR] Status ${eventsRes.status} ao persistir eventos:`, eventErrText);
        throw new Error(
          `Falha ao registrar histórico de auditoria do pedido no banco de dados (status HTTP ${eventsRes.status}).`
        );
      }
    }
  }

  private mapRowToOrder(row: SupabaseOrderRow): Order {
    const items = Array.isArray(row.order_items)
      ? row.order_items.map((i: SupabaseOrderItemRow) => ({
          id: i.product_id,
          title: i.title,
          subtitle: i.subtitle || undefined,
          modality: i.modality,
          image: i.image_url || undefined,
          unitPrice: i.unit_price_cents,
          quantity: i.quantity,
        }))
      : [];

    const events = Array.isArray(row.order_events)
      ? row.order_events
          .map((e: SupabaseOrderEventRow) => ({
            timestamp: e.created_at,
            type: e.event_type,
            description: e.description,
          }))
          .sort((a: { timestamp: string }, b: { timestamp: string }) => a.timestamp.localeCompare(b.timestamp))
      : [];

    return {
      id: row.id,
      accessToken: row.access_token,
      idempotencyKey: row.idempotency_key || undefined,
      status: row.status,
      chargeStatus: row.charge_status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      paidAt: row.paid_at || undefined,
      customer: {
        name: row.customer_name,
        email: row.customer_email,
        phone: row.customer_phone,
        cpf: row.customer_cpf || undefined,
      },
      items,
      pricing: {
        subtotal: row.subtotal_cents,
        discount: row.discount_cents,
        fee: row.fee_cents,
        total: row.total_cents,
      },
      paymentMethod: "pix",
      delivery: {
        type: row.delivery_type || "in_person",
        title: row.delivery_title,
        location: row.delivery_location || undefined,
        fee: row.fee_cents,
        instructions: row.delivery_instructions || "",
      },
      pix: row.pix_charge_id
        ? {
            provider: row.pix_provider || "generic_pix",
            chargeId: row.pix_charge_id,
            qrCodeVisualAvailable: Boolean(row.pix_qr_code_url),
            qrCodeUrl: row.pix_qr_code_url || undefined,
            copyAndPasteCode: row.pix_copy_paste || undefined,
            expiresAt: row.pix_expires_at || undefined,
            isDemonstrationMode: (row.pix_provider === "demonstration_pix") || Boolean(row.pix_charge_id?.startsWith("DEMO-")),
            instructions: [],
          }
        : undefined,
      events,
    };
  }

  async findById(orderId: string): Promise<Order | null> {
    try {
      const res = await fetch(
        `${this.url}/rest/v1/orders?id=eq.${encodeURIComponent(
          orderId
        )}&select=*,order_items(*),order_events(*)`,
        {
          method: "GET",
          headers: this.headers,
        }
      );

      if (!res.ok) {
        console.warn(`[SUPABASE_QUERY_NOTICE] Consulta de pedido ${orderId} retornou HTTP ${res.status}`);
        return null;
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      return this.mapRowToOrder(data[0]);
    } catch (err) {
      console.error("[SUPABASE_QUERY_ERROR] Erro ao consultar pedido no Supabase:", err);
      return null;
    }
  }

  async findByIdAndToken(orderId: string, accessToken: string): Promise<Order | null> {
    try {
      const res = await fetch(
        `${this.url}/rest/v1/orders?id=eq.${encodeURIComponent(
          orderId
        )}&access_token=eq.${encodeURIComponent(
          accessToken
        )}&select=*,order_items(*),order_events(*)`,
        {
          method: "GET",
          headers: this.headers,
        }
      );

      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      const order = this.mapRowToOrder(data[0]);
      if (!constantTimeCompare(order.accessToken, accessToken)) {
        return null;
      }

      return order;
    } catch (err) {
      console.error("[SUPABASE_QUERY_ERROR] Erro ao consultar pedido e token no Supabase:", err);
      return null;
    }
  }

  async findByIdempotencyKey(key: string): Promise<Order | null> {
    if (!key) return null;
    try {
      const res = await fetch(
        `${this.url}/rest/v1/orders?idempotency_key=eq.${encodeURIComponent(
          key
        )}&select=*,order_items(*),order_events(*)`,
        {
          method: "GET",
          headers: this.headers,
        }
      );

      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      return this.mapRowToOrder(data[0]);
    } catch {
      return null;
    }
  }

  async updateStatus(
    orderId: string,
    status: OrderStatus,
    eventNote: string,
    paidAt?: string
  ): Promise<Order | null> {
    const currentOrder = await this.findById(orderId);
    if (!currentOrder) return null;

    if (!isValidStatusTransition(currentOrder.status, status)) {
      console.warn(
        `[STATUS_TRANSITION_REJECTED] Transição não permitida de "${currentOrder.status}" para "${status}" no pedido ${orderId}.`
      );
      return null;
    }

    try {
      const now = new Date().toISOString();
      const patchPayload: Record<string, unknown> = {
        status,
        updated_at: now,
      };
      if (paidAt) {
        patchPayload.paid_at = paidAt;
      } else if (status === "paid") {
        patchPayload.paid_at = now;
      }

      const patchRes = await fetch(`${this.url}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(patchPayload),
      });

      if (!patchRes.ok) {
        throw new Error(`Falha ao atualizar status no Supabase (status HTTP ${patchRes.status}).`);
      }

      // Gravar Evento com idempotência
      await fetch(
        `${this.url}/rest/v1/order_events?on_conflict=order_id,event_type,created_at`,
        {
          method: "POST",
          headers: {
            ...this.headers,
            Prefer: "resolution=merge-duplicates",
          },
          body: JSON.stringify({
            order_id: orderId,
            event_type: `STATUS_CHANGE_TO_${status.toUpperCase()}`,
            description: eventNote,
            created_at: now,
          }),
        }
      );

      return this.findById(orderId);
    } catch (err) {
      console.error("[SUPABASE_UPDATE_STATUS_ERROR] Erro ao atualizar status:", err);
      throw err;
    }
  }
}

/**
 * Factory do Repositório de Pedidos.
 * Se SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY forem fornecidos,
 * ativa persistência durável no Supabase automaticamente.
 * 
 * Se não fornecidos, opera com MemoryOrderRepository com identificação clara
 * de modo de demonstração. Em produção, alerta que pedidos não são duráveis.
 */
export function getOrderRepository(): OrderRepository {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY)?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

  if (supabaseUrl && serviceRoleKey) {
    return new SupabaseOrderRepository(supabaseUrl, serviceRoleKey);
  }

  if (supabaseUrl && !serviceRoleKey && anonKey) {
    console.warn(
      "[PERSISTENCE_SECURITY_NOTICE] SUPABASE_ANON_KEY detectada, mas SUPABASE_SERVICE_ROLE_KEY está ausente. Operações de gravação podem falhar devido às políticas RLS de segurança. Utilize a service role key exclusivamente no servidor."
    );
    return new SupabaseOrderRepository(supabaseUrl, anonKey);
  }

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[PERSISTENCE_MODE_NOTICE] SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY não configuradas no ambiente de produção. Operando em modo de demonstração com MemoryOrderRepository (pedidos voláteis não serão persistidos de forma durável entre instâncias serverless)."
    );
  }

  return new MemoryOrderRepository();
}

export const orderRepository: OrderRepository = getOrderRepository();
