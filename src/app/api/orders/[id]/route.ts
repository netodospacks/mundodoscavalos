import { NextRequest, NextResponse } from "next/server";
import { orderService } from "@/services/payment/orderService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Acesso não autorizado. Token do pedido não informado." },
        { status: 401 }
      );
    }

    const order = await orderService.getOrderSecurely(orderId, token);

    if (!order) {
      return NextResponse.json(
        { error: "Pedido não encontrado ou credencial inválida." },
        { status: 404 }
      );
    }

    // Retorna os dados com sanitização (sem expor segredos)
    return NextResponse.json({
      id: order.id,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      customer: {
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
      },
      item: order.item,
      pricing: order.pricing,
      pix: order.pix,
    });
  } catch (error) {
    console.error("[API_ORDER_STATUS_ERROR]", error);
    return NextResponse.json(
      { error: "Erro interno ao consultar status do pedido." },
      { status: 500 }
    );
  }
}
