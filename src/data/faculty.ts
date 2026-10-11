export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  formation: string[];
  experience: string[];
  specialties: string[];
  bio: string;
  photo: string;
  photoAlt: string;
  photoSecondary: string;
  photoSecondaryAlt: string;
  quote: string;
}

export const faculty: FacultyMember[] = [
  {
    id: "pollyanna-carrazzoni",
    name: "Pollyanna Santiago Carrazzoni",
    title: "Médica Veterinária • Especialista em Equinocultura",
    formation: [
      "Graduação em Medicina Veterinária",
      "Especialização em Manejo e Produção de Equinos",
      "Formação em Equoterapia e Bem-Estar Animal",
    ],
    experience: [
      "Médica veterinária atuante no Haras Nossa Senhora Aparecida",
      "Experiência prática em manejo, nutrição e reprodução equina",
      "Facilitadora de programas de equoterapia e desenvolvimento humano",
      "Gestão e cuidado de equinos de diversas raças e finalidades",
    ],
    specialties: [
      "Manejo Geral de Equinos",
      "Nutrição e Alimentação Equina",
      "Bem-estar e Saúde Animal",
      "Produção e Reprodução Equina",
    ],
    bio: "Médica veterinária com profunda conexão com o universo equino, Pollyanna Santiago Carrazzoni une ciência e prática no Haras Nossa Senhora Aparecida. Sua missão é levar conhecimento real, responsável e acessível para quem deseja cuidar de cavalos com excelência.",
    photo:
      "/images/pollyanna.jpg",
    photoAlt: "Pollyanna Santiago Carrazzoni — Zootecnista e Médica Veterinária",
    photoSecondary:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
    photoSecondaryAlt: "Pollyanna com cavalos no Haras Nossa Senhora Aparecida",
    quote:
      "O cavalo ensina quem está disposto a observar. Cuidar com ciência e respeito é o que transforma um tratador comum em um profissional de excelência.",
  },
];

export const mainFaculty = faculty[0];
