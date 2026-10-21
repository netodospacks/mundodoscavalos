import { NextRequest, NextResponse } from "next/server";
import { orderService } from "@/services/payment/orderService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token") || req.headers.get("x-order-token");

    if (!token) {
      return NextResponse.json(
        { error: "Acesso não autorizado. Token do pedido não informado." },
        { status: 401 }
      );
    }

    // Consulta e sincronização segura com status atualizado
    const order = await orderService.checkAndUpdateStatus(orderId, token);

    if (!order) {
      return NextResponse.json(
        { error: "Pedido não localizado ou credencial inválida." },
        { status: 404 }
      );
    }

    // Retorna os dados sanitizados com segurança (sem vazar tokens internos)
    return NextResponse.json({
      id: order.id,
      status: order.status,
      chargeStatus: order.chargeStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      paidAt: order.paidAt,
      customer: {
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
      },
      items: order.items,
      pricing: order.pricing,
      delivery: order.delivery,
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

// Cancelamento de pedido pendente a pedido do titular
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token") || req.headers.get("x-order-token");

    if (!token) {
      return NextResponse.json(
        { error: "Acesso não autorizado." },
        { status: 401 }
      );
    }

    const cancelled = await orderService.cancelOrder(orderId, token);
    if (!cancelled) {
      return NextResponse.json(
        { error: "Pedido não encontrado ou não passível de cancelamento." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: cancelled.id,
      status: cancelled.status,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro ao cancelar pedido.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
