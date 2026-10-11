import { NextRequest, NextResponse } from "next/server";
import { orderService } from "@/services/payment/orderService";
import { CreateOrderInput } from "@/services/payment/types";

// Simples rate-limiting em memória para evitar abuso de criação de pedidos
const ipRateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimits.get(ip);

  if (!record || now > record.resetAt) {
    ipRateLimits.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return true;
  }

  if (record.count >= 15) {
    // Máximo de 15 pedidos por minuto por IP
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Muitas requisições. Por favor, aguarde um momento antes de tentar novamente." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as CreateOrderInput;

    if (!body || !body.productId || !body.customer) {
      return NextResponse.json(
        { error: "Dados incompletos para a criação do pedido." },
        { status: 400 }
      );
    }

    const result = await orderService.createOrder({
      productId: String(body.productId),
      customer: {
        name: String(body.customer.name || ""),
        email: String(body.customer.email || ""),
        phone: String(body.customer.phone || ""),
        cpf: body.customer.cpf ? String(body.customer.cpf) : undefined,
      },
    });

    if (!result.success || !result.order) {
      return NextResponse.json({ error: result.error || "Erro ao processar pedido." }, { status: 400 });
    }

    return NextResponse.json(
      {
        orderId: result.order.id,
        accessToken: result.order.accessToken,
        status: result.order.status,
        pricing: result.order.pricing,
        pix: result.order.pix,
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
