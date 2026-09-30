// ─── PLACEHOLDER ──────────────────────────────────────────────
// Módulos e conteúdo do curso — aguardando informações reais.
// ──────────────────────────────────────────────────────────────

export interface CourseModule {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  // layout: alternado — par = foto direita, ímpar = foto esquerda
}

export interface CourseInfo {
  totalHours: string;    // PLACEHOLDER
  totalModules: string;  // PLACEHOLDER
  price: string;         // PLACEHOLDER
  accessPeriod: string;  // PLACEHOLDER
  certificate: boolean;
}

export const courseModules: CourseModule[] = [
  {
    id: "manejo-bem-estar",
    number: "01",
    title: "Manejo Geral e Bem-Estar",
    description:
      "Fundamentos do manejo equino responsável: rotinas, comportamento animal, comunicação homem-cavalo e princípios do bem-estar baseados nas Cinco Liberdades.",
    image:
      "https://images.unsplash.com/photo-1510520813379-4b1626a585dc?w=900&q=80",
    imageAlt: "Pessoa manejando cavalo com cuidado",
  },
  {
    id: "nutricao-pastagem",
    number: "02",
    title: "Nutrição e Pastagem",
    description:
      "Princípios de nutrição equina, formulação de dietas, manejo de pastagens, suplementação estratégica e prevenção de distúrbios nutricionais.",
    image:
      "https://images.unsplash.com/photo-1573212800792-0b2391c8c9b6?w=900&q=80",
    imageAlt: "Cavalos pastando em campo verde",
  },
  {
    id: "producao-manejo",
    number: "03",
    title: "Produção e Manejo de Equinos",
    description:
      "Sistemas de criação, reprodução, seleção genética, instalações e gestão de haras. Da concepção ao desenvolvimento do potro.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&q=80",
    imageAlt: "Haras com instalações profissionais",
  },
  {
    id: "saude-primeiros-socorros",
    number: "04",
    title: "Primeiros Socorros e Saúde",
    description:
      "Identificação de sinais vitais, reconhecimento de emergências, primeiros socorros equinos e protocolos básicos de saúde preventiva.",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&q=80",
    imageAlt: "Cuidados veterinários com equino",
  },
];

export const courseInfo: CourseInfo = {
  totalHours: "XX",        // PLACEHOLDER — preencher com carga horária real
  totalModules: "XX",      // PLACEHOLDER — preencher com número de módulos real
  price: "R$ XX,XX",       // PLACEHOLDER — preencher com valor real
  accessPeriod: "XX meses",// PLACEHOLDER — preencher com período de acesso real
  certificate: true,
};
