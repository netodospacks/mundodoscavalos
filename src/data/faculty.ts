// ─── PLACEHOLDER ──────────────────────────────────────────────
// Os dados abaixo são estruturais.
// Aguardando informações reais do docente responsável.
// Substituir: nome, formação, experiência, foto e apresentação.
// ──────────────────────────────────────────────────────────────

export interface FacultyMember {
  id: string;
  name: string;          // PLACEHOLDER — preencher com nome real
  title: string;         // PLACEHOLDER — ex.: "Med. Veterinário CRMV-SP 00000"
  formation: string[];   // PLACEHOLDER — formação acadêmica
  experience: string[];  // PLACEHOLDER — experiência profissional
  specialties: string[]; // PLACEHOLDER — áreas de atuação
  bio: string;           // PLACEHOLDER — apresentação curta
  photo: string;         // PLACEHOLDER — substituir pela foto real
  photoAlt: string;
  photoSecondary: string;  // segunda foto (seção FacultyQuote)
  photoSecondaryAlt: string;
  quote: string;           // PLACEHOLDER — frase do docente
}

export const faculty: FacultyMember[] = [
  {
    id: "docente-principal",
    name: "[ Nome do Docente ]",
    title: "[ Cargo / Credencial Profissional ]",
    formation: [
      "[ Graduação — Instituição, Ano ]",
      "[ Especialização / Pós-graduação — Instituição, Ano ]",
      "[ Certificação ou Formação Complementar ]",
    ],
    experience: [
      "[ Experiência 1 — Cargo / Local / Período ]",
      "[ Experiência 2 — Cargo / Local / Período ]",
      "[ Experiência 3 — Cargo / Local / Período ]",
    ],
    specialties: [
      "Manejo Geral de Equinos",
      "Nutrição Equina",
      "Bem-estar Animal",
      "Produção de Equinos",
    ],
    bio: "[ Apresentação curta do docente — descreva brevemente sua trajetória, motivação e conexão com o universo dos cavalos. Este texto será visível na página inicial da plataforma. ]",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    photoAlt: "Foto do docente responsável",
    photoSecondary:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    photoSecondaryAlt: "Docente com cavalos no haras",
    quote:
      "Conhecimento não está apenas nos livros. Está na prática, na observação diária e no respeito genuíno ao animal.",
  },
];

export const mainFaculty = faculty[0];
