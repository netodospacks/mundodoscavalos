import { cursoTratadoresData } from "@/data/cursoTratadores";
import { siteConfig } from "@/data/siteConfig";
import { OrderItem } from "./types";

/**
 * Catálogo Oficial do Servidor.
 * NUNCA confie em valores vindos do frontend.
 * Preços são armazenados e validados estritamente no backend em centavos.
 */
export const OFFICIAL_PRODUCTS: Record<string, OrderItem> = {
  [cursoTratadoresData.id]: {
    id: cursoTratadoresData.id,
    title: cursoTratadoresData.title,
    subtitle: cursoTratadoresData.subtitle,
    modality: cursoTratadoresData.modality,
    image: cursoTratadoresData.heroImage,
    unitPrice: 120000, // R$ 1.200,00 (120000 centavos)
    quantity: 1,
  },
  // Alias compatível caso seja referenciado por slug
  [cursoTratadoresData.slug]: {
    id: cursoTratadoresData.id,
    title: cursoTratadoresData.title,
    subtitle: cursoTratadoresData.subtitle,
    modality: cursoTratadoresData.modality,
    image: cursoTratadoresData.heroImage,
    unitPrice: 120000, // R$ 1.200,00
    quantity: 1,
  },
};

export function getOfficialProduct(productId: string): OrderItem | null {
  const product = OFFICIAL_PRODUCTS[productId];
  if (!product) return null;
  return { ...product };
}

export function calculateOrderPricing(item: OrderItem): {
  subtotal: number;
  discount: number;
  fee: number;
  total: number;
} {
  const subtotal = item.unitPrice * Math.max(1, item.quantity);
  const discount = 0; // Sem descontos aplicados nesta versão oficial
  const fee = 0;
  const total = subtotal - discount + fee;

  return {
    subtotal,
    discount,
    fee,
    total,
  };
}
