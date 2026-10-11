export interface CourseEnrollmentConfig {
  checkoutUrl: string;
  whatsappUrl: string;
  isExternalCheckout: boolean;
  price: string;
  priceRaw: number;
}

export const siteConfig = {
  name: "Mundo dos Cavalos",
  tagline: "O Conhecimento Que Transforma Vidas e Cavalos",
  description:
    "Plataforma educacional premium dedicada ao universo dos cavalos. Aprenda manejo, bem-estar, nutrição, produção e saúde equina com conteúdo profissional e responsável.",
  seoTitle: "Mundo dos Cavalos — Conhecimento, Manejo e Respeito ao Animal",
  seoDescription:
    "Plataforma educacional premium Mundo dos Cavalos com o Haras Nossa Senhora Aparecida. Conhecimento, manejo, nutrição, bem-estar e saúde.",
  url: "https://mundodoscavalos.com.br",

  // Social
  instagram: "#",
  youtube: "#",
  whatsapp: "#",

  // Inscrição / Vendas Curso de Tratadores
  cursoTratadores: {
    price: "R$ 1.200,00",
    priceRaw: 1200,
    // Destino de checkout profissional do curso
    enrollmentUrl: "/checkout",
    contactEmail: "contato@mundodoscavalos.com.br",
  },

  // Haras parceiro
  harasName: "Haras Nossa Senhora Aparecida",
  harasUrl: "#",
};
