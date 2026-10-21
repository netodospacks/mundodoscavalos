import { cursoTratadoresData } from "../../data/cursoTratadores.ts";
import type { OrderItem, OrderDeliveryInfo } from "./types.ts";

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
    maxQuantity: 10,
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
    maxQuantity: 10,
  },
  "curso-online-equinocultura": {
    id: "curso-online-equinocultura",
    title: "Curso Online — Formação em Equinocultura",
    subtitle: "Visão técnica abrangente com 8 módulos e mais de 40h de conteúdo com certificado.",
    modality: "Online (Acesso Vitalício)",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&q=80",
    unitPrice: 49700, // R$ 497,00 (49700 centavos)
    quantity: 1,
    maxQuantity: 5,
  },
};

export function getOfficialProduct(productId: string): OrderItem | null {
  const product = OFFICIAL_PRODUCTS[productId];
  if (!product) return null;
  return { ...product };
}

export function resolveDeliveryInfo(items: OrderItem[]): OrderDeliveryInfo {
  const hasInPerson = items.some((item) =>
    item.modality.toLowerCase().includes("presencial")
  );

  if (hasInPerson) {
    return {
      type: "in_person",
      title: "Credenciamento e Retirada de Material no Haras",
      location: "Haras Nossa Senhora Aparecida — Alagoa Nova, PB",
      fee: 0, // Incluso na inscrição oficial
      instructions:
        "O credenciamento, crachá oficial e entrega da apostila física ocorrerão na recepção do Haras no primeiro dia de formação. Café da manhã e almoço de campo inclusos.",
    };
  }

  return {
    type: "digital",
    title: "Liberação de Acesso Digital",
    fee: 0,
    instructions:
      "Instruções e credenciais de acesso à plataforma online serão encaminhadas ao e-mail cadastrado logo após a confirmação bancária do pagamento via Pix.",
  };
}

export function calculateOrderPricing(items: OrderItem[]): {
  subtotal: number;
  discount: number;
  fee: number;
  total: number;
} {
  const subtotal = items.reduce((acc, item) => {
    const qty = Math.min(Math.max(1, Math.floor(item.quantity)), item.maxQuantity || 10);
    return acc + item.unitPrice * qty;
  }, 0);

  const discount = 0; // Regras futuras de cupom/desconto validadas aqui
  const fee = 0; // Taxa de entrega/serviço (incluso)
  const total = subtotal - discount + fee;

  return {
    subtotal,
    discount,
    fee,
    total,
  };
}
