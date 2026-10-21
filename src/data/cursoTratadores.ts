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

export interface IncludedExperienceItem {
  title: string;
  description: string;
}

export const cursoTratadoresData = {
  id: "capacitacao-tratadores-equinos",
  slug: "capacitacao-tratadores-equinos",
  title: "Curso de Capacitação de Tratadores de Equinos — Nível I",
  modality: "Presencial",
  badge: "FORMAÇÃO PRESENCIAL",
  subtitle:
    "Aprenda fundamentos essenciais de manejo, alimentação, higiene, controle de parasitas e avaliação de equinos.",
  complementaryText:
    "Uma oportunidade prática para você desenvolver habilidades indispensáveis e aplicar esse conhecimento na rotina com os animais no Haras Nossa Senhora Aparecida.",
  price: "R$ 1.200,00",
  priceLabel: "Investimento na sua capacitação profissional.",
  heroImage: "/images/hero-bg.jpg",
  // Fotografia de destaque do Haras (preparada para receber a fotografia oficial dos cavalos bebendo água)
  harasEnvironmentImage: "/images/haras-ambiente-cavalos.jpg",

  // 7 Benefícios Apresentados em Composição Visual Organizada (Item 1)
  benefits: [
    "Mais de 8 tópicos programáticos.",
    "Prática real em ambiente de haras.",
    "Prevenção sanitária e arraçoamento.",
    "Avaliação e observação de equinos.",
    "Suporte e tira-dúvidas após o curso.",
    "Certificado.",
    "Acesso ao grupo para troca de experiências e auxílio técnico.",
  ],

  // Seção Sobre a Formação (Textos Oficiais da Alteração 2)
  aboutSection: {
    title: "Sobre a Formação",
    subtitle: "Aprenda a cuidar de equinos com mais conhecimento e responsabilidade.",
    paragraphs: [
      "O cuidado diário com os equinos exige conhecimento, atenção e decisões assertivas. A forma como os animais são alimentados, os ambientes são mantidos e os sinais do seu comportamento são observados pode fazer diferença no bem-estar, na saúde e na qualidade do manejo.",
      "O Curso de Capacitação de Tratadores de Equinos — Nível I foi desenvolvido para aprofundar conhecimentos essenciais sobre manejo, alimentação, higiene, controle de parasitas e avaliação dos animais, unindo fundamentos técnicos à realidade prática de um haras.",
      "Mais do que executar tarefas, é importante compreender como e por que os cuidados devem ser realizados.",
      "Práticas adequadas e preventivas ajudam a reduzir riscos, identificar alterações com maior atenção e evitar que problemas se agravem, gerando custos e prejuízos que poderiam ser minimizados.",
      "Investir em conhecimento é fortalecer a qualidade do manejo, preservar o bem-estar dos animais e proteger o valor de tudo aquilo que foi construído com dedicação.",
    ],
    callout:
      "Mais do que executar tarefas, é importante compreender como e por que os cuidados devem ser realizados.",
  },

  // Seção Grade Técnica
  technicalGrid: {
    sectionBadge: "GRADE TÉCNICA",
    title: "Grade Técnica",
    subtitle: "O que você vai aprender",
    intro: "Conheça os principais temas abordados durante a capacitação.",
  },

  // 8 Tópicos da Grade Técnica — Numeração Clara e Textos Oficiais
  topics: [
    {
      number: "01",
      title: "Introdução às práticas gerais de manejo dentro de um criatório de cavalos",
      description:
        "Conheça os princípios do manejo e os cuidados essenciais na rotina de um criatório.",
    },
    {
      number: "02",
      title: "Estratégias integradas de manejo",
      description:
        "Entenda a importância da organização das rotinas e da integração das práticas de manejo.",
    },
    {
      number: "03",
      title: "Principais cuidados nos ambientes dos animais",
      description:
        "Conheça os principais cuidados com higiene, organização e conservação dos ambientes, reconhecendo fatores que podem comprometer a saúde, a segurança e o bem-estar dos equinos.",
    },
    {
      number: "04",
      title: "Limpeza de materiais e acessórios",
      description:
        "Aprenda sobre os procedimentos adequados de limpeza e conservação dos materiais utilizados no manejo.",
    },
    {
      number: "05",
      title: "Controle de parasitas e vetores de doenças",
      description:
        "Conheça medidas preventivas e os principais cuidados relacionados ao controle de parasitas e vetores, entendendo a importância do manejo sanitário e da orientação dos profissionais responsáveis.",
    },
    {
      number: "06",
      title: "Estratégias de arraçoamento dos animais",
      description:
        "Compreenda os fundamentos da organização da alimentação e da oferta de alimentos de acordo com as necessidades dos animais e a orientação técnica.",
    },
    {
      number: "07",
      title: "Principais problemas relacionados às práticas alimentares incorretas",
      description:
        "Conheça os principais riscos associados a erros na alimentação e entenda como práticas inadequadas podem comprometer a saúde dos animais.",
    },
    {
      number: "08",
      title: "Parâmetros básicos de avaliação dos animais",
      description:
        "Desenvolva um olhar mais atento para a observação dos equinos, considerando aspectos como condição corporal, comportamento e sinais de alterações. Aprenda a reconhecer situações que exigem atenção e comunicação ao responsável ou avaliação veterinária.",
    },
  ] as ProgramTopic[],

  // Instrutora — Seção Exclusiva e Destacada
  instructor: {
    name: "Pollyanna Santiago Carrazzoni",
    title: "Zootecnista • Universidade Federal da Paraíba",
    presentation:
      "Zootecnista formada pela Universidade Federal da Paraíba, Pollyanna Santiago Carrazzoni une formação acadêmica de excelência a mais de 15 anos de atuação prática em criatórios, equitação, equoterapia, avaliação de animais e ensino na área de Zootecnia. Durante o curso, você receberá orientação técnica direta, aprendendo com quem vive a rotina e os desafios reais do manejo de cavalos.",
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

  // Para quem é — Comunicação voltada ao aluno
  targetAudience: [
    "Você que já atua no manejo diário e deseja aprofundar suas habilidades com técnica e segurança.",
    "Você que pretende ingressar no trabalho em criatórios e quer aprender as rotinas corretas desde o primeiro dia.",
    "Você que deseja compreender os cuidados com alimentação, sanidade e conservação dos ambientes dos animais.",
    "Você que ama cavalos e busca desenvolver um olhar atento para observar sinais de comportamento e saúde no dia a dia.",
  ],

  // ══════════════════════════════════════════════════════════════════
  // SEÇÃO DE INVESTIMENTO E CONVERSÃO (Alteração 3)
  // Reestruturada para demonstrar tudo o que está incluído antes do preço
  // ══════════════════════════════════════════════════════════════════
  investmentSection: {
    sectionBadge: "EXPERIÊNCIA COMPLETA",
    title: "INVESTIMENTO NA CAPACITAÇÃO",
    subtitle: "Conhecimento que acompanha você para além desses dois dias.",
    introParagraphs: [
      "Aprender, trocar experiências e aprimorar o manejo são investimentos que podem gerar benefícios muito além do período da capacitação.",
      "Nos dias 7 e 8 de novembro, você terá a oportunidade de participar de uma experiência presencial no Haras Nossa Senhora Aparecida, com conteúdo teórico e prático, orientação profissional, hospedagem e alimentação incluídas.",
      "Mais do que participar de um curso, é dedicar tempo e recursos para ampliar conhecimentos que podem fazer diferença na rotina, na qualidade dos cuidados e na prevenção de problemas.",
    ],
    // 8 Itens com destaque visual claro
    includedItems: [
      "Dois dias de capacitação presencial.",
      "Conteúdo técnico e atividades práticas.",
      "Orientação de profissional com experiência no setor equino.",
      "Hospedagem durante a experiência.",
      "Alimentação durante o evento, incluindo jantar, almoço e café da manhã.",
      "Certificado de participação.",
      "Suporte e tira-dúvidas após o curso.",
      "Acesso ao grupo para troca de experiências e auxílio técnico.",
    ],
    price: "R$ 1.200,00",
    priceLabel: "Investimento por participante: R$ 1.200,00",
    spotsLimit: "Turma limitada a 30 participantes.",
    paymentOptions: {
      pix: "Pagamento à vista via Pix com confirmação imediata.",
      // Mantido configurável para preenchimento posterior sem dados fictícios
      installmentNote:
        "Condições de parcelamento e opções adicionais sob consulta no atendimento ou diretamente no momento do checkout.",
      installmentsConfigurable: null as string | null,
    },
  },

  // Dúvidas Frequentes atualizadas com foco no aluno
  faqs: [
    {
      question: "O curso é presencial e quando será realizado?",
      answer:
        "Sim. A capacitação é 100% presencial, realizada nos dias 7 e 8 de novembro nas instalações do Haras Nossa Senhora Aparecida, com vivência prática no ambiente real do criatório, com hospedagem e alimentação completas inclusas.",
    },
    {
      question: "Qual é o valor do investimento e o que está incluído?",
      answer:
        "O investimento por participante é de R$ 1.200,00 (turma limitada a 30 vagas). Inclui dois dias de capacitação, atividades práticas, orientação de profissional experiente, hospedagem, alimentação completa (café da manhã, almoço e jantar), certificado de participação, suporte pós-curso e acesso ao grupo de troca técnica.",
    },
    {
      question: "Quais assuntos você vai aprender?",
      answer:
        "O curso abrange 8 tópicos programáticos: práticas gerais de manejo, rotinas integradas, higiene e conservação das instalações, limpeza de materiais, controle de parasitas e sanidade, estratégias de arraçoamento, prevenção de problemas alimentares e parâmetros de avaliação física e comportamental dos animais.",
    },
    {
      question: "Quem será a sua instrutora?",
      answer:
        "Pollyanna Santiago Carrazzoni, zootecnista formada pela Universidade Federal da Paraíba (UFPB), inspetora e juíza oficial da ABQM, com vasta experiência em manejo, equitação e ensino.",
    },
    {
      question: "Como você garante sua vaga no curso?",
      answer:
        "Clique no botão de inscrição nesta página para ser direcionado ao checkout oficial seguro ou utilize o canal de atendimento para tirar suas dúvidas e confirmar sua participação.",
    },
  ],
};
