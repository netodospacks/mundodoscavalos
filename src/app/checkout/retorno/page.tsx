import { Suspense } from "react";
import OrderReturnClient from "@/components/checkout/OrderReturnClient";

export const dynamic = "force-dynamic";

export default function OrderReturnPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0d0c0a",
            color: "#c4a96e",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
          }}
        >
          Carregando status do pedido...
        </div>
      }
    >
      <OrderReturnClient />
    </Suspense>
  );
}
