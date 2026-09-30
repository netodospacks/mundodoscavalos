// ─── PLACEHOLDER ──────────────────────────────────────────────
// Depoimentos estruturais — aguardando dados reais dos alunos.
// NÃO inventar nomes, textos ou fotos de pessoas reais.
// ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;       // PLACEHOLDER
  role: string;       // PLACEHOLDER — profissão / cargo / cidade
  text: string;       // PLACEHOLDER
  photo?: string;     // PLACEHOLDER — opcional
  photoAlt?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "depoimento-1",
    name: "[ Nome do Aluno ]",
    role: "[ Profissão ou Contexto — ex.: Criador de cavalos, Minas Gerais ]",
    text: "[ Depoimento do aluno — descreva a transformação no manejo, o conhecimento adquirido ou o impacto do curso na relação com os animais. ]",
    photo: undefined,
    photoAlt: undefined,
  },
  {
    id: "depoimento-2",
    name: "[ Nome do Aluno ]",
    role: "[ Profissão ou Contexto ]",
    text: "[ Depoimento do aluno — descreva a transformação no manejo, o conhecimento adquirido ou o impacto do curso na relação com os animais. ]",
    photo: undefined,
    photoAlt: undefined,
  },
  {
    id: "depoimento-3",
    name: "[ Nome do Aluno ]",
    role: "[ Profissão ou Contexto ]",
    text: "[ Depoimento do aluno — descreva a transformação no manejo, o conhecimento adquirido ou o impacto do curso na relação com os animais. ]",
    photo: undefined,
    photoAlt: undefined,
  },
];
