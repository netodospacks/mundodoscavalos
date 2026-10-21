import { NextRequest, NextResponse } from "next/server";
import { orderService } from "@/services/payment/orderService";
import { CreateOrderInput } from "@/services/payment/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Rate-limiting em memória para proteção contra abuso e DDoS
const ipRateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimits.get(ip);

  if (!record || now > record.resetAt) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return true;
  }

  if (record.count >= 20) {
    // Máximo de 20 pedidos por minuto por IP
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown-ip";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Muitas requisições. Por favor, aguarde um minuto antes de tentar novamente." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as CreateOrderInput | null;

    if (!body || !body.customer) {
      return NextResponse.json(
        { error: "Dados cadastrais do cliente são obrigatórios." },
        { status: 400 }
      );
    }

    const hasItems = (body.items && body.items.length > 0) || Boolean(body.productId);
    if (!hasItems) {
      return NextResponse.json(
        { error: "Selecione ao menos um produto ou curso válido." },
        { status: 400 }
      );
    }

    const result = await orderService.createOrder({
      items: body.items,
      productId: body.productId,
      quantity: body.quantity,
      idempotencyKey: body.idempotencyKey ? String(body.idempotencyKey) : undefined,
      customer: {
        name: String(body.customer.name || ""),
        email: String(body.customer.email || ""),
        phone: String(body.customer.phone || ""),
        cpf: body.customer.cpf ? String(body.customer.cpf) : undefined,
      },
    });

    if (!result.success || !result.order) {
      const isDbFailure = result.error?.toLowerCase().includes("banco de dados");
      return NextResponse.json(
        { error: result.error || "Erro ao processar criação do pedido." },
        { status: isDbFailure ? 503 : 400 }
      );
    }

    return NextResponse.json(
      {
        orderId: result.order.id,
        accessToken: result.order.accessToken,
        status: result.order.status,
        chargeStatus: result.order.chargeStatus,
        createdAt: result.order.createdAt,
        pricing: result.order.pricing,
        delivery: result.order.delivery,
        items: result.order.items,
        customer: result.order.customer,
        pix: result.order.pix,
        isDurable: Boolean(result.order.id && !result.order.pix?.isDemonstrationMode),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API_ORDERS_ERROR]", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao processar o pedido." },
      { status: 500 }
    );
  }
}
