export interface CourseModule {
  id: string;
  number: string;
  title: string;
  description: string;
  topics: string[];
  image: string;
  imageAlt: string;
}

export interface CourseInfo {
  totalHours: string;
  totalModules: string;
  price: string;
  priceInstallment: string;
  accessPeriod: string;
  certificate: boolean;
}

export const courseModules: CourseModule[] = [
  {
    id: "introducao-equinocultura",
    number: "01",
    title: "Introdução à Equinocultura",
    description:
      "Visão geral do universo equino: história, raças, finalidades e o papel do tratador profissional. A base para quem quer entender cavalos de verdade.",
    topics: [
      "Panorama geral da equinocultura brasileira",
      "Principais raças e suas finalidades",
      "O papel e responsabilidades do tratador",
      "Comunicação básica homem-cavalo",
    ],
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&q=80",
    imageAlt: "Cavaleiro com cavalo em haras",
  },
  {
    id: "manejo-bem-estar",
    number: "02",
    title: "Manejo e Bem-Estar Equino",
    description:
      "Rotinas de cuidado diário, higiene, comportamento e as Cinco Liberdades do bem-estar animal. Saiba como oferecer qualidade de vida real ao seu cavalo.",
    topics: [
      "Rotinas de manejo diário",
      "Higienização e limpeza de instalações",
      "As Cinco Liberdades do bem-estar animal",
      "Comportamento e sinais de estresse equino",
    ],
    image:
      "https://images.unsplash.com/photo-1510520813379-4b1626a585dc?w=900&q=80",
    imageAlt: "Pessoa manejando cavalo com cuidado",
  },
  {
    id: "nutricao-alimentacao",
    number: "03",
    title: "Nutrição e Alimentação",
    description:
      "Tudo sobre a alimentação do cavalo: forragens, concentrados, suplementação, frequência e quantidade. Erros comuns que custam caro e como evitá-los.",
    topics: [
      "Fisiologia digestiva do cavalo",
      "Forragens e concentrados: tipos e qualidade",
      "Suplementação estratégica",
      "Cálculo de dietas e frequência alimentar",
    ],
    image:
      "https://images.unsplash.com/photo-1573212800792-0b2391c8c9b6?w=900&q=80",
    imageAlt: "Cavalos pastando em campo verde",
  },
  {
    id: "saude-preventiva",
    number: "04",
    title: "Saúde Preventiva",
    description:
      "Vacinação, vermifugação, controle de parasitas, cuidados com cascos e dentes. Prevenção é o melhor investimento na saúde do seu animal.",
    topics: [
      "Calendário de vacinação equina",
      "Protocolos de vermifugação",
      "Controle de ectoparasitas",
      "Cuidados com cascos e ferrageamento",
    ],
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&q=80",
    imageAlt: "Cuidados veterinários com equino",
  },
  {
    id: "instalacoes-manejo",
    number: "05",
    title: "Instalações e Ambiente",
    description:
      "Como montar, organizar e manter um ambiente ideal para cavalos. Baias, pastagens, bebedouros, drenagem e segurança estrutural do haras.",
    topics: [
      "Projeto de baias e instalações",
      "Manejo de pastagens",
      "Sistemas de bebedouros e comedouros",
      "Segurança e ergonomia das instalações",
    ],
    image:
      "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=900&q=80",
    imageAlt: "Haras com instalações profissionais organizadas",
  },
  {
    id: "primeiros-socorros",
    number: "06",
    title: "Primeiros Socorros Equinos",
    description:
      "Como agir em situações de emergência. Identificação de sinais vitais, coliques, feridas, azotúria e quando chamar o veterinário com urgência.",
    topics: [
      "Avaliação de sinais vitais",
      "Reconhecimento e manejo de cólicas",
      "Cuidados com feridas e curativos",
      "Protocolo de emergência equina",
    ],
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&q=80",
    imageAlt: "Veterinária examinando cavalo",
  },
  {
    id: "reproducao-genetica",
    number: "07",
    title: "Reprodução e Genética",
    description:
      "Ciclo reprodutivo da égua, monta natural, inseminação artificial, gestação, parto e cuidados com o potro recém-nascido. O início de uma nova vida.",
    topics: [
      "Ciclo reprodutivo da égua",
      "Monta natural e inseminação artificial",
      "Gestação e acompanhamento pré-parto",
      "Cuidados com o potro recém-nascido",
    ],
    image:
      "https://images.unsplash.com/photo-1473654729523-203036f9c0ed?w=900&q=80",
    imageAlt: "Égua com potro no pasto",
  },
  {
    id: "treinamento-condicionamento",
    number: "08",
    title: "Treinamento e Condicionamento",
    description:
      "Fundamentos do adestramento básico, trabalho físico, aquecimento, resfriamento e prevenção de lesões. Como preparar o cavalo para qualquer atividade.",
    topics: [
      "Princípios do adestramento básico",
      "Condicionamento físico progressivo",
      "Aquecimento e resfriamento corretos",
      "Prevenção e identificação de lesões",
    ],
    image:
      "https://images.unsplash.com/photo-1553284965-e2815db4c1c4?w=900&q=80",
    imageAlt: "Cavalo em treinamento com cavaleiro",
  },
];

export const courseInfo: CourseInfo = {
  totalHours: "+40h",
  totalModules: "8",
  price: "R$ 497,00",
  priceInstallment: "12x de R$ 49,90",
  accessPeriod: "Vitalício",
  certificate: true,
};
