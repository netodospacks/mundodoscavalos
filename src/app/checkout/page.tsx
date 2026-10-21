import { OFFICIAL_PRODUCTS } from "@/services/payment/catalog";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ produto?: string; curso?: string; carrinho?: string }>;
}) {
  const params = await searchParams;

  if (params.carrinho === "vazio" || params.produto === "vazio") {
    return <CheckoutClient initialProduct={null} />;
  }

  const targetId = params.produto || params.curso || "capacitacao-tratadores-equinos";
  const defaultProduct =
    OFFICIAL_PRODUCTS[targetId] || OFFICIAL_PRODUCTS["capacitacao-tratadores-equinos"];

  return <CheckoutClient initialProduct={defaultProduct} />;
}
