export interface ProgramTopic {
  number: string;
  title: string;
  description: string;
}

export interface CareerExperience {
  number: string;
  role: string;
  institution: string;
  periodOrDate: string;
  details?: string[];
}

export const cursoTratadoresData = {
  id: "capacitacao-tratadores-equinos",
  slug: "capacitacao-tratadores-equinos",
  title: "Curso de Capacitação de Tratadores de Equinos",
  modality: "Presencial",
  badge: "FORMAÇÃO PRESENCIAL",
  subtitle:
    "Conhecimento técnico e práticas essenciais para cuidar de equinos com responsabilidade, segurança e eficiência.",
  complementaryText:
    "Uma formação voltada para quem deseja aprofundar seus conhecimentos sobre manejo, alimentação, higiene, ambiente, prevenção de problemas sanitários e avaliação dos animais.",
  price: "R$ 1.200,00",
  priceLabel: "Investimento na sua capacitação profissional.",
  heroImage: "/images/hero-bg.jpg",

  // Apresentação do Curso
  presentation: {
    title: "Aprenda a cuidar de equinos com mais conhecimento e responsabilidade",
    text1:
      "O manejo adequado dos cavalos exige atenção aos detalhes, compreensão das necessidades dos animais e aplicação de práticas corretas no dia a dia do criatório.",
    text2:
      "O Curso de Capacitação de Tratadores de Equinos foi estruturado para abordar conhecimentos essenciais relacionados à rotina de manejo, alimentação, higiene, ambiente, controle de parasitas e avaliação dos animais.",
    text3:
      "Uma oportunidade de aprofundar conhecimentos importantes para quem participa dos cuidados diários com equinos.",
    pillars: [
      {
        title: "Manejo e rotina do criatório",
        description:
          "Organização dos processos diários, estratégias integradas e rotinas essenciais de cuidado aos animais.",
      },
      {
        title: "Alimentação, higiene e ambiente",
        description:
          "Práticas de arraçoamento, conservação de baias e instalações, higienização de materiais e controle de parasitas.",
      },
      {
        title: "Observação e avaliação dos animais",
        description:
          "Critérios práticos de condição corporal, comportamento e identificação precoce de alterações sanitárias.",
      },
    ],
  },

  // 8 Tópicos do Conteúdo Programático
  topics: [
    {
      number: "01",
      title: "Introdução às práticas gerais de manejo dentro de um criatório de cavalos",
      description:
        "Apresente os fundamentos das rotinas de manejo e dos cuidados necessários no ambiente de criação.",
    },
    {
      number: "02",
      title: "Estratégias integradas de manejo",
      description:
        "Aborde a importância da organização das rotinas e da integração das práticas de manejo.",
    },
    {
      number: "03",
      title: "Principais cuidados nos ambientes dos animais",
      description:
        "Apresente aspectos importantes de higiene, organização e conservação dos ambientes utilizados pelos equinos.",
    },
    {
      number: "04",
      title: "Limpeza de materiais e acessórios",
      description:
        "Destaque a importância dos procedimentos adequados de limpeza e conservação dos materiais utilizados no manejo.",
    },
    {
      number: "05",
      title: "Controle de parasitas e vetores de doenças",
      description:
        "Apresente noções de prevenção, identificação de riscos e importância do controle sanitário adequado, respeitando a orientação dos profissionais responsáveis.",
    },
    {
      number: "06",
      title: "Estratégias de arraçoamento dos animais",
      description:
        "Explique os fundamentos da organização da alimentação e da oferta de alimentos de acordo com as necessidades dos animais e a orientação técnica.",
    },
    {
      number: "07",
      title: "Principais problemas relacionados às práticas alimentares incorretas",
      description:
        "Aborde os riscos associados a erros alimentares e a importância de práticas adequadas de alimentação.",
    },
    {
      number: "08",
      title: "Parâmetros básicos de avaliação dos animais",
      description:
        "Apresente critérios básicos de observação dos equinos, incluindo condição corporal, comportamento e identificação de alterações que exijam avaliação especializada.",
    },
  ] as ProgramTopic[],

  // Instrutora
  instructor: {
    name: "Pollyanna Santiago Carrazzoni",
    title: "Zootecnista • Universidade Federal da Paraíba",
    presentation:
      "Zootecnista formada pela Universidade Federal da Paraíba, Pollyanna Santiago Carrazzoni possui experiência profissional relacionada à equitação, equoterapia, avaliação de equinos, modalidades equestres e ensino na área de Zootecnia.",
    academic: {
      degree: "Zootecnista",
      institution: "Universidade Federal da Paraíba — UFPB",
      center: "Centro de Ciências Agrárias — CCA, Campus II",
      location: "Areia, Paraíba",
      graduationPeriod: "Período 2007.1",
    },
    experiences: [
      {
        number: "01",
        role: "Instrutora de Equitação para Equoterapia",
        institution: "Associação Paraibana de Equoterapia, em João Pessoa — PB",
        periodOrDate: "Atuação informada desde 1º de janeiro de 2011.",
      },
      {
        number: "02",
        role: "Inspetora Oficial da ABQM",
        institution:
          "Stud Book da Associação Brasileira de Criadores de Cavalo Quarto de Milha",
        periodOrDate: "Credenciada em 14 de novembro de 2010.",
      },
      {
        number: "03",
        role: "Juíza Oficial da ABQM",
        institution:
          "Associação Brasileira de Criadores de Cavalo Quarto de Milha",
        periodOrDate:
          "Credenciada em 4 de outubro de 2011 para as modalidades Três Tambores, Seis Balizas, Team Penning e Ranch Sorting.",
      },
      {
        number: "04",
        role: "Juíza Oficial de Equipamentos — Vaquejada",
        institution:
          "Associação Brasileira de Criadores de Cavalo Quarto de Milha",
        periodOrDate: "Credenciada em 4 de abril de 2016.",
      },
      {
        number: "05",
        role: "Professora da Universidade Federal da Paraíba",
        institution:
          "Departamento de Zootecnia do Centro de Ciências Agrárias — CCA/UFPB",
        periodOrDate: "Período de 10 de setembro de 2009 a 9 de setembro de 2010.",
        details: [
          "Ezoognósia e Equideocultura, para o curso de Zootecnia.",
          "Criação e Exploração de Monogástricos, no segmento de equídeos, para o curso de Agronomia.",
        ],
      },
      {
        number: "06",
        role: "Consultora de Vendas — Potiguar Rações",
        institution: "Distribuidor Purina, Grupo Evialis",
        periodOrDate: "Atuação de 1º de outubro de 2007 a 3 de novembro de 2009.",
      },
    ] as CareerExperience[],
  },

  // Para quem é
  targetAudience: [
    "Pessoas que trabalham ou desejam trabalhar em criatórios de cavalos.",
    "Tratadores que buscam aprofundar seus conhecimentos sobre manejo.",
    "Profissionais envolvidos nas rotinas de cuidado e alimentação de equinos.",
    "Pessoas interessadas em compreender melhor a higiene, o ambiente e a avaliação dos animais.",
  ],

  // FAQ
  faqs: [
    {
      question: "O curso é presencial?",
      answer: "Sim. Esta formação foi planejada na modalidade presencial.",
    },
    {
      question: "Qual é o valor do curso?",
      answer: "O investimento informado é de R$ 1.200,00.",
    },
    {
      question: "Quais assuntos serão abordados?",
      answer:
        "O curso contempla oito temas, incluindo manejo, ambiente, higiene, controle de parasitas, alimentação e avaliação básica dos animais.",
    },
    {
      question: "Quem será a instrutora?",
      answer:
        "Pollyanna Santiago Carrazzoni, zootecnista formada pela Universidade Federal da Paraíba e profissional com experiência nas áreas apresentadas nesta página.",
    },
    {
      question: "Como posso obter informações sobre inscrição e realização do curso?",
      answer:
        "Utilize o canal de matrícula disponibilizado no site para consultar as informações atualizadas sobre inscrição, datas, local e condições de participação.",
    },
  ],
};
