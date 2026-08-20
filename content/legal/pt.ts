import { site } from "@/content/site";

import type { LegalContent } from "./types";

const legal = site.legal;

export const legalPt: LegalContent = {
  privacy: {
    eyebrow: "Legal",
    title: "Política de privacidade",
    description:
      "Como a Enriched Studios recolhe, usa e protege os dados pessoais de quem visita o site ou pede um orçamento.",
    updated: `Última atualização: ${legal.updated}`,
    intro:
      "Esta política explica que dados pessoais recolhemos, porque os recolhemos, durante quanto tempo os guardamos e que direitos tem sobre eles.",
    sections: [
      {
        heading: "1. Quem trata os seus dados",
        paragraphs: [
          `O responsável pelo tratamento é a ${legal.company}, com o número de identificação de pessoa coletiva ${legal.vat} e sede em ${legal.address}.`,
          `Para qualquer questão sobre dados pessoais, escreva para ${site.email} ou ligue para ${site.phone}.`,
        ],
      },
      {
        heading: "2. Que dados recolhemos",
        paragraphs: ["Só recolhemos o que precisamos para lhe responder e para manter o site seguro."],
        list: [
          "Dados que nos dá no formulário de contacto: nome, email, telemóvel (opcional), serviço pretendido e o conteúdo da mensagem.",
          "Dados técnicos gerados pela sua visita: endereço IP e registos do servidor, usados apenas para segurança e prevenção de abuso do formulário.",
          "Preferência de idioma, guardada no seu navegador para o site abrir na língua que escolheu.",
        ],
      },
      {
        heading: "3. Para que usamos e com que fundamento legal",
        list: [
          "Responder ao seu pedido e preparar uma proposta: diligências pré-contratuais a seu pedido, artigo 6.º, n.º 1, alínea b) do RGPD.",
          "Proteger o formulário contra abuso e envio automático: interesse legítimo, artigo 6.º, n.º 1, alínea f) do RGPD.",
          "Cumprir obrigações legais, nomeadamente de faturação e fiscais, quando se torne nosso cliente: artigo 6.º, n.º 1, alínea c) do RGPD.",
        ],
        paragraphs: [
          "Não usamos os seus dados para publicidade nem tomamos decisões automatizadas com efeitos jurídicos sobre si.",
        ],
      },
      {
        heading: "4. Durante quanto tempo guardamos",
        list: [
          "Pedidos de contacto sem seguimento comercial: 12 meses a contar da última comunicação.",
          "Dados de clientes: durante a relação contratual e, depois disso, pelos prazos legais aplicáveis, designadamente 10 anos para documentos de faturação.",
          "Registos técnicos do servidor: até 30 dias.",
        ],
      },
      {
        heading: "5. Com quem partilhamos",
        paragraphs: [
          "Não vendemos nem cedemos dados pessoais a terceiros. Recorremos a prestadores que tratam dados por nossa conta, sob contrato de subcontratação:",
        ],
        list: legal.processors.map((processor) => `${processor.name}, para ${processor.role}.`),
      },
      {
        heading: "6. Transferências para fora da União Europeia",
        paragraphs: [
          "Alguns destes prestadores podem tratar dados fora do Espaço Económico Europeu. Nesses casos, a transferência assenta em cláusulas contratuais-tipo aprovadas pela Comissão Europeia ou noutro mecanismo previsto no capítulo V do RGPD.",
        ],
      },
      {
        heading: "7. Os seus direitos",
        paragraphs: ["Pode, a qualquer momento, exercer os seguintes direitos:"],
        list: [
          "Aceder aos seus dados e obter uma cópia.",
          "Corrigir dados incorretos ou incompletos.",
          "Pedir o apagamento, quando já não sejam necessários.",
          "Pedir a limitação do tratamento ou opor-se a ele.",
          "Pedir a portabilidade dos dados que nos forneceu.",
          "Retirar o consentimento, quando o tratamento nele assente, sem afetar o que foi feito antes.",
        ],
      },
      {
        heading: "8. Como exercer e onde reclamar",
        paragraphs: [
          `Basta escrever para ${site.email}. Respondemos no prazo de um mês, prorrogável nos termos do artigo 12.º do RGPD.`,
          `Se entender que o tratamento viola a lei, pode apresentar reclamação à ${legal.dataProtectionAuthority.name}.`,
        ],
        links: [{ label: legal.dataProtectionAuthority.name, href: legal.dataProtectionAuthority.url }],
      },
      {
        heading: "9. Segurança",
        paragraphs: [
          "O site é servido em ligação cifrada, o formulário tem limites de envio por origem e o acesso às mensagens está restrito a quem precisa dele para responder.",
        ],
      },
      {
        heading: "10. Menores",
        paragraphs: [
          "Os nossos serviços dirigem-se a profissionais. Não recolhemos conscientemente dados de menores de 16 anos.",
        ],
      },
      {
        heading: "11. Alterações a esta política",
        paragraphs: [
          `Se mudarmos alguma coisa relevante, atualizamos esta página e a data no topo. Versão em vigor desde ${legal.updated}.`,
        ],
      },
    ],
  },

  terms: {
    eyebrow: "Legal",
    title: "Termos e condições",
    description:
      "Condições de utilização do site da Enriched Studios e regras aplicáveis aos serviços de produção de vídeo e marca pessoal.",
    updated: `Última atualização: ${legal.updated}`,
    intro:
      "Ao utilizar este site aceita as condições abaixo. Elas aplicam-se ao site e, na parte aplicável, aos serviços que prestamos.",
    sections: [
      {
        heading: "1. Identificação do prestador",
        paragraphs: [
          `${legal.company}, número de identificação de pessoa coletiva ${legal.vat}, com sede em ${legal.address}, registada na ${legal.registry}.`,
          `Contactos: ${site.email}, ${site.phone}. Atividade: produção de vídeo, edição e gestão de marca pessoal para o setor imobiliário.`,
        ],
      },
      {
        heading: "2. Objeto",
        paragraphs: [
          "Este site tem finalidade informativa e comercial: apresenta os nossos serviços e permite pedir contacto. A navegação não gera, por si só, qualquer obrigação de contratar.",
        ],
      },
      {
        heading: "3. Orçamentos e adjudicação",
        list: [
          "Os preços não estão publicados no site. Cada trabalho é orçamentado por escrito depois de percebermos o âmbito.",
          "As propostas são válidas por 30 dias, salvo indicação diferente.",
          "Os valores são apresentados em euros e acrescem do IVA à taxa legal em vigor, quando aplicável.",
          "O trabalho começa após aceitação por escrito da proposta e, quando previsto, após o pagamento do sinal acordado.",
        ],
      },
      {
        heading: "4. Prazos e entrega",
        paragraphs: [
          "Os prazos indicados nas propostas contam a partir da gravação ou da receção de todos os materiais necessários. As peças são entregues em formato digital, por ligação de descarregamento.",
          "O número de revisões incluídas está definido em cada proposta. Revisões adicionais são orçamentadas à parte.",
        ],
      },
      {
        heading: "5. Autorizações, imóveis e direitos de imagem",
        list: [
          "O cliente garante que tem autorização do proprietário para a filmagem e divulgação do imóvel.",
          "O cliente garante que obteve o consentimento das pessoas que aparecem nas imagens, nos termos do artigo 79.º do Código Civil.",
          "Salvo oposição escrita do cliente, a Enriched Studios pode usar excertos dos trabalhos no seu portfólio e redes sociais.",
        ],
      },
      {
        heading: "6. Direitos de autor e licença de utilização",
        paragraphs: [
          "As peças produzidas são obras protegidas pelo Código do Direito de Autor e dos Direitos Conexos. Com o pagamento integral, o cliente recebe licença de utilização para os fins e canais definidos na proposta.",
          "Os ficheiros em bruto e os projetos de montagem não fazem parte da entrega, salvo acordo escrito em contrário.",
        ],
      },
      {
        heading: "7. Propriedade intelectual do site",
        paragraphs: [
          "Os textos, imagens, marca e código deste site pertencem à Enriched Studios ou a terceiros que nos licenciaram a utilização. Não podem ser copiados ou reutilizados sem autorização escrita.",
        ],
      },
      {
        heading: "8. Responsabilidade",
        paragraphs: [
          "Esforçamo-nos por manter a informação do site correta e atualizada, mas não garantimos que esteja sempre isenta de erros nem que o site esteja disponível sem interrupções.",
          "Não respondemos por danos resultantes do uso de sites de terceiros para os quais existam ligações a partir daqui.",
        ],
      },
      {
        heading: "9. Direito de livre resolução",
        paragraphs: [
          "Se for consumidor e o contrato for celebrado à distância ou fora do estabelecimento, dispõe de 14 dias para resolver o contrato sem indicar motivo, nos termos do Decreto-Lei n.º 24/2014.",
          "Se pedir expressamente que o serviço comece dentro desse prazo e ele venha a ser integralmente prestado, o direito de livre resolução cessa. Se o serviço estiver apenas começado, é devido o valor proporcional ao já executado.",
        ],
      },
      {
        heading: "10. Reclamações e resolução de litígios",
        paragraphs: [
          "Pode apresentar reclamação através do Livro de Reclamações eletrónico.",
          `Em caso de litígio de consumo, pode recorrer à entidade de resolução alternativa competente: ${legal.adr.name}.`,
        ],
        links: [
          { label: "Livro de Reclamações eletrónico", href: legal.complaintsBook },
          { label: legal.adr.name, href: legal.adr.url },
        ],
      },
      {
        heading: "11. Lei aplicável e foro",
        paragraphs: [
          "Aplica-se a lei portuguesa. Para dirimir litígios é competente o foro da comarca do Porto, sem prejuízo das regras imperativas de proteção do consumidor.",
        ],
      },
      {
        heading: "12. Alterações",
        paragraphs: [
          `Estas condições podem ser atualizadas. A versão aplicável é a que estiver publicada no momento em que utiliza o site. Versão em vigor desde ${legal.updated}.`,
        ],
      },
    ],
  },

  cookies: {
    eyebrow: "Legal",
    title: "Política de cookies",
    description:
      "Que cookies o site da Enriched Studios usa, para que servem e como os pode controlar.",
    updated: `Última atualização: ${legal.updated}`,
    intro:
      "Cookies são pequenos ficheiros que um site guarda no seu navegador. Este site usa o mínimo possível.",
    sections: [
      {
        heading: "1. Cookies que usamos",
        list: [
          "NEXT_LOCALE: guarda o idioma que escolheu, para o site abrir nessa língua na visita seguinte. Duração de 12 meses. É criado apenas quando carrega no seletor de idioma, ou seja, a pedido seu.",
        ],
        paragraphs: [
          "Este cookie é estritamente necessário para lhe entregar a funcionalidade que pediu, pelo que não depende de consentimento prévio, nos termos do artigo 5.º, n.º 3, da Diretiva 2002/58/CE e do artigo 5.º da Lei n.º 41/2004.",
        ],
      },
      {
        heading: "2. O que não usamos",
        paragraphs: [
          "Não usamos cookies de análise de tráfego, de publicidade nem de redes sociais, e não partilhamos informação de navegação com terceiros para esses fins.",
          "Se um dia passarmos a usar ferramentas de análise ou de publicidade, pediremos o seu consentimento antes de as ativar e atualizaremos esta página.",
        ],
      },
      {
        heading: "3. Como controlar",
        paragraphs: [
          "Pode apagar ou bloquear cookies nas definições do seu navegador. Se bloquear o cookie de idioma, o site continua a funcionar, apenas deixará de se lembrar da sua escolha.",
        ],
      },
      {
        heading: "4. Alterações",
        paragraphs: [`Versão em vigor desde ${legal.updated}.`],
      },
    ],
  },
};
