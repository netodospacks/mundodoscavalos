import { OFFICIAL_PRODUCTS } from "@/services/payment/catalog";

export const dynamic = "force-dynamic";

export default async function CheckoutRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ produto?: string; curso?: string }>;
}) {
  const params = await searchParams;
  const targetId = params.produto || params.curso || "capacitacao-tratadores-equinos";
  const defaultProduct = OFFICIAL_PRODUCTS[targetId] || OFFICIAL_PRODUCTS["capacitacao-tratadores-equinos"];

  // Importamos o cliente do checkout
  const CheckoutClient = (await import("@/components/checkout/CheckoutClient")).default;

  return <CheckoutClient initialProduct={defaultProduct} />;
}
