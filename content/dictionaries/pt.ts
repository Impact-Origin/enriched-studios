import { site } from "@/content/site";

export const pt = {
  nav: {
    services: "Serviços",
    portfolio: "Trabalhos",
    contact: "Contactos",
    cta: "Marcar chamada",
    menu: "Menu",
    close: "Fechar",
    language: "Idioma",
  },

  actions: {
    bookCall: "Marcar chamada",
    seeWork: "Ver trabalhos",
    seeServices: "Ver serviços",
    talkToUs: "Falar connosco",
    playReel: "Ver showreel",
    allWork: "Ver todos os trabalhos",
    instagram: "Instagram",
  },

  ui: {
    goTo: "Ir para a imagem",
    skip: "Saltar para o conteúdo",
    clients: "Empresas com que trabalhamos",
    drag: "Arraste para ver mais",
    prev: "Anterior",
    next: "Seguinte",
  },
  notFound: {
    eyebrow: "Erro 404",
    title: "Este plano não existe",
    lead: "A página que procurava foi movida, mudou de nome ou nunca chegou a ser gravada. Acontece nas melhores montagens.",
    signal: "Sem sinal",
    helpTitle: "Talvez procurasse",
    cta: "Voltar ao início",
  },
  hero: {
    eyebrow: "Produtora de vídeo · Setor imobiliário",
    titleLine1: "Filmamos imóveis.",
    titleLine2: "Construímos",
    titleAccent: "marcas.",
    lead: "Gravação, edição e marca pessoal para consultores e agências imobiliárias. Da primeira ideia à publicação: conteúdo que gera visitas, contactos e reputação.",
    note: "Resposta em 24h · Sem compromisso",
    mediaLabel: "Estúdio",
    scroll: "Descer",
  },

  stats: [
    { value: site.stats.videos, label: "Vídeos entregues" },
    { value: site.stats.agents, label: "Consultores e agências" },
    { value: site.stats.views, label: "Visualizações geradas" },
    { value: site.stats.delivery, label: "Entrega média" },
  ],

  services: {
    eyebrow: "O que fazemos",
    title: "Três pilares, um sistema de conteúdo",
    lead: "Não vendemos vídeos avulso. Construímos uma máquina de conteúdo que trabalha por si todos os meses.",
    timeline: {
      hint: "Arraste o cursor ou clique num bloco",
      play: "Retomar",
      pause: "Parar",
      sliderLabel: "Linha de tempo dos serviços",
    },
    items: [
      {
        id: "filming",
        number: "01",
        title: "Gravação",
        tagline: "Imagem que valoriza o imóvel",
        description:
          "Equipa e equipamento profissional no terreno. Filmamos o imóvel como ele merece ser visto e filmamos consigo, para que a sua cara fique associada ao negócio.",
        deliverables: [
          "Tour de imóvel em 4K",
          "Vídeo aéreo com drone",
          "Fotografia imobiliária",
          "Captação de som e iluminação",
          "Sessões de conteúdo em série",
        ],
      },
      {
        id: "editing",
        number: "02",
        title: "Edição",
        tagline: "Pós-produção que prende nos primeiros 3 segundos",
        description:
          "Cortamos para reter atenção. Ritmo, legendas, cor e som pensados para o feed, em formato vertical para redes e horizontal para portais e apresentações.",
        deliverables: [
          "Reels e cortes verticais",
          "Legendas dinâmicas",
          "Color grading cinematográfico",
          "Motion graphics com a sua marca",
          "Entrega em 48h úteis",
        ],
      },
      {
        id: "branding",
        number: "03",
        title: "Marca pessoal",
        tagline: "O consultor deixa de ser mais um",
        description:
          "Estratégia, guião e calendário de publicação. Trabalhamos o seu posicionamento para que os clientes o procurem a si e não ao anúncio.",
        deliverables: [
          "Estratégia de conteúdo mensal",
          "Guiões e preparação de discurso",
          "Gravação recorrente todos os meses",
          "Publicação e calendarização",
          "Relatório de performance",
        ],
      },
    ],
    cta: "Ver serviços em detalhe",
  },

  process: {
    eyebrow: "Como trabalhamos",
    title: "Um processo simples, sem surpresas",
    lead: "Você concentra-se em vender. Nós tratamos do resto.",
    steps: [
      {
        number: "01",
        title: "Diagnóstico",
        description:
          "Chamada de 30 minutos para perceber o seu mercado, os seus imóveis e onde está a perder oportunidades.",
      },
      {
        number: "02",
        title: "Estratégia e guião",
        description:
          "Definimos formatos, mensagem e calendário. Recebe os guiões antes da gravação. Nada é improvisado.",
      },
      {
        number: "03",
        title: "Dia de gravação",
        description:
          "Vamos ao imóvel ou ao seu escritório. Numa sessão captamos o imóvel e várias peças de conteúdo pessoal.",
      },
      {
        number: "04",
        title: "Edição e publicação",
        description:
          "Editamos, entregamos em 48h e, se quiser, publicamos e acompanhamos os resultados consigo.",
      },
    ],
  },

  work: {
    eyebrow: "Trabalhos",
    title: "Conteúdo que já está a vender",
    lead: "Uma amostra do que produzimos para consultores e agências. Cada peça foi pensada para uma plataforma e um objetivo.",
    featured: "Destaques",
    filters: [
      { id: "all", label: "Tudo" },
      { id: "tours", label: "Tours de imóvel" },
      { id: "branding", label: "Marca pessoal" },
      { id: "events", label: "Eventos" },
      { id: "interviews", label: "Entrevistas" },
      { id: "aerial", label: "Aéreo" },
      { id: "backstage", label: "Bastidores" },
    ],
    items: [
      { id: "w1", title: "Interior com terraço", category: "tours", format: "4:5", duration: "0:07", description: "Percurso calmo pela sala até à varanda, para mostrar luz e área." },
      { id: "w2", title: "Sala em plano contínuo", category: "tours", format: "4:5", duration: "0:06", description: "Um só movimento a atravessar o espaço, sem cortes." },
      { id: "w3", title: "Cozinha com vida", category: "tours", format: "4:5", duration: "0:06", description: "O imóvel filmado com alguém lá dentro, para dar escala e uso." },
      { id: "w4", title: "Consultor no terreno", category: "branding", format: "9:16", duration: "0:54", description: "Peça vertical gravada em obra, com legendas e ritmo de redes." },
      { id: "w5", title: "Apresentação de empreendimento", category: "interviews", format: "9:16", duration: "1:31", description: "Explicação de um projeto ao ecrã, formato longo para autoridade." },
      { id: "w6", title: "Formação em palco", category: "events", format: "9:16", duration: "0:44", description: "Cobertura de intervenção em palco, com público e detalhe de sala." },
      { id: "w7", title: "Evento de agência", category: "events", format: "9:16", duration: "0:40", description: "Abertura de escritório e convívio, editado em peça de marca." },
      { id: "w8", title: "Peça com motion graphics", category: "branding", format: "9:16", duration: "0:40", description: "Mensagem comercial com números e grafismos animados." },
      { id: "w9", title: "Rotina e vista aérea", category: "aerial", format: "9:16", duration: "0:59", description: "Dia de trabalho intercalado com planos aéreos do empreendimento." },
      { id: "p1", title: "Bastidores de gravação", category: "backstage", format: "4:5", duration: "", description: "Câmara montada em exterior, num dia de filmagem." },
      { id: "p2", title: "Estúdio de podcast", category: "backstage", format: "1:1", duration: "", description: "Set preparado para gravação de entrevista, com equipa e convidados." },
      { id: "p3", title: "Entrevista em estúdio", category: "interviews", format: "1:1", duration: "", description: "Dois planos, luz controlada e som de mesa." },
    ],
    empty: "Sem trabalhos nesta categoria por agora.",
    cta: "Quero conteúdo assim",
  },

  why: {
    eyebrow: "Porquê a Enriched",
    title: "Produtora que percebe de imobiliário",
    lead: "Já filmámos casas suficientes para saber o que faz um cliente pedir uma visita.",
    items: [
      { title: "Especialistas no setor", description: "Só trabalhamos imobiliário. Sabemos o que mostrar, por que ordem e o que cortar." },
      { title: "Entrega rápida", description: "48h úteis para as peças principais. Um imóvel novo não pode esperar duas semanas." },
      { title: "Formatos para cada plataforma", description: "Vertical para redes, horizontal para portais, versões curtas para anúncios pagos." },
      { title: "Consistência mensal", description: "Planos recorrentes: todos os meses há gravação, edição e publicação." },
    ],
  },

  faq: {
    eyebrow: "Dúvidas",
    title: "Perguntas frequentes",
    lead: "Se a sua pergunta não estiver aqui, escreva-nos e respondemos em 24h.",
    items: [
      {
        q: "Quanto custa um vídeo?",
        a: "Depende do imóvel, do formato e da frequência. Trabalhamos por projeto e em planos mensais para quem quer conteúdo consistente. Após uma chamada de 30 minutos enviamos uma proposta com preço fechado.",
      },
      {
        q: "Quanto tempo demora a entrega?",
        a: "As peças principais são entregues em 48h úteis após a gravação. Projetos maiores, com várias localizações ou motion graphics, podem levar até cinco dias.",
      },
      {
        q: "Em que zonas trabalham?",
        a: `Trabalhamos em ${site.areaServed.slice(0, 3).join(", ")} e restante ${site.region}. Para projetos fora da nossa base, incluímos a deslocação na proposta.`,
      },
      {
        q: "Tenho de aparecer em vídeo?",
        a: "Não é obrigatório, mas é o que gera mais resultado. Preparamos guiões, damos direção no momento da gravação e cortamos tudo o que não ficar bem. A maioria dos nossos clientes nunca tinha filmado antes.",
      },
      {
        q: "Também tratam da publicação?",
        a: "Sim. Nos planos de marca pessoal tratamos do calendário, das legendas e da publicação, e enviamos um relatório mensal com o desempenho de cada peça.",
      },
      {
        q: "Fazem drone com licença?",
        a: "Sim. Todos os voos são feitos com operador certificado e dentro das regras da ANAC, incluindo autorizações em zonas condicionadas.",
      },
      {
        q: "Trabalham com agências ou só com consultores?",
        a: "Ambos. Temos planos para consultores individuais e formatos de equipa para agências, com identidade visual consistente entre todos os elementos.",
      },
      {
        q: "Como começamos?",
        a: "Preencha o formulário de contacto ou envie mensagem no Instagram. Marcamos uma chamada, percebemos o seu objetivo e propomos o plano certo.",
      },
    ],
  },

  cta: {
    eyebrow: "Próximo passo",
    title: "O seu próximo imóvel merece melhor do que um vídeo de telemóvel",
    lead: "Marque uma chamada de 30 minutos. Sem compromisso, saímos com um plano concreto para o seu conteúdo.",
    primary: "Marcar chamada",
    secondary: "Ver Instagram",
    note: "Resposta em 24h · Proposta com preço fechado",
  },

  footer: {
    tagline: "Gravação, edição e marca pessoal para o setor imobiliário.",
    legalTitle: "Legal",
    complaints: "Livro de Reclamações",
    navTitle: "Navegação",
    servicesTitle: "Serviços",
    contactTitle: "Contactos",
    services: ["Gravação de imóveis", "Edição e pós-produção", "Marca pessoal", "Vídeo aéreo"],
    rights: "Todos os direitos reservados.",
    madeIn: `Feito ${site.cityIn}`,
    builtBy: "Plataforma desenvolvida por",
  },

  pages: {
    home: {
      title: "Enriched Studios · Vídeo imobiliário e marca pessoal",
      description:
        "Produtora de vídeo para o setor imobiliário: tours de imóvel, reels, drone e marca pessoal para consultores e agências. Entrega em 48h.",
    },
    services: {
      title: "Serviços de vídeo imobiliário",
      description:
        "Gravação de imóveis, edição e pós-produção e gestão de marca pessoal para consultores e agências imobiliárias.",
      eyebrow: "Serviços",
      heroTitle: "Tudo o que precisa para o seu imóvel e para a sua marca",
      heroLead:
        "Trabalhamos por projeto ou em plano mensal. Escolha o que precisa hoje; construímos o resto ao longo do caminho.",
      includedTitle: "Inclui",
      addonsTitle: "Extras disponíveis",
      addons: [
        "Sessão fotográfica completa do imóvel",
        "Planta e tour virtual 360º",
        "Anúncios pagos (Meta e Google)",
        "Locução profissional",
        "Legendagem em inglês",
        "Identidade visual e templates",
      ],
      pricingTitle: "E quanto custa?",
      pricingLead:
        "Cada consultor tem uma realidade diferente: número de imóveis, zona, objetivos. Por isso não trabalhamos com tabelas fixas: fazemos uma chamada de 30 minutos e enviamos uma proposta com preço fechado, sem custos escondidos.",
      pricingCta: "Pedir proposta",
    },
    portfolio: {
      title: "Trabalhos",
      description:
        "Portfólio da Enriched Studios: tours de imóvel, reels verticais, vídeo aéreo e conteúdo de marca pessoal para o setor imobiliário.",
      eyebrow: "Portfólio",
      heroTitle: "Trabalhos recentes",
      heroLead:
        "Tours, reels, drone e conteúdo de marca pessoal. Filtre por tipo de trabalho para ver o que se aproxima do que precisa.",
    },
    contact: {
      title: "Contactos",
      description:
        "Fale com a Enriched Studios. Chamada de 30 minutos sem compromisso e proposta com preço fechado em 24h.",
      eyebrow: "Contactos",
      heroTitle: "Vamos falar.",
      heroLead:
        "Conte-nos o que precisa. Respondemos em 24h com os próximos passos e uma proposta à medida.",
      infoTitle: "Contacto direto",
      whatsappLabel: "Falar por WhatsApp",
      availability: "Segunda a sexta, 9h30 às 19h",
      coverage: "Porto e Norte de Portugal",
      formTitle: "Ou deixe-nos uma mensagem",
      form: {
        name: "Nome",
        namePlaceholder: "O seu nome",
        email: "Email",
        emailPlaceholder: "nome@email.com",
        phone: "Telemóvel",
        phonePlaceholder: "Opcional",
        service: "O que procura",
        serviceOptions: [
          "Gravação de imóveis",
          "Edição e pós-produção",
          "Marca pessoal",
          "Vídeo aéreo com drone",
          "Plano mensal completo",
          "Outro",
        ],
        message: "Mensagem",
        messagePlaceholder: "Fale-nos do imóvel, da zona e do objetivo do vídeo.",
        submit: "Enviar mensagem",
        submitting: "A enviar...",
        success: "Mensagem enviada. Respondemos em 24h.",
        error: "Não foi possível enviar. Tente novamente ou escreva-nos por email.",
        tooMany: "Demasiadas tentativas. Tente novamente daqui a alguns minutos.",
        errors: {
          name: "Indique o seu nome.",
          email: "Indique um email válido.",
          message: "Escreva-nos uma mensagem.",
        },
        required: "Preencha os campos obrigatórios.",
        consent: "Ao enviar, concorda que usemos os seus dados apenas para responder a este pedido. Saiba mais na",
        consentLink: "política de privacidade",
      },
    },
  },
};

export type Dictionary = typeof pt;
