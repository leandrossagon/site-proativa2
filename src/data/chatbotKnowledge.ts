import { SectorId } from '../types';

export interface FAQItem {
  id: string;
  category: 'servicos' | 'tecnica' | 'sla' | 'comercial';
  question: string;
  shortQuestion: string;
  keywords: string[];
  answer: string;
  suggestedAction?: {
    label: string;
    action: 'quote' | 'demo' | 'whatsapp' | 'calculator' | 'navigate';
    target?: string;
  };
}

export const FAQ_DATABASE: FAQItem[] = [
  {
    id: 'faq-art-crea',
    category: 'tecnica',
    question: 'A PROATIVA emite ART (Anotação de Responsabilidade Técnica) no CREA para os projetos?',
    shortQuestion: 'Emissão de ART / CREA',
    keywords: ['art', 'crea', 'engenheiro', 'responsabilidade tecnica', 'laudo', 'documento', 'registro', 'engenharia'],
    answer:
      'Sim! Todos os nossos projetos de automação, segurança eletrônica, CFTV e sistemas de incêndio (SDAI) são executados sob a supervisão direta de engenheiros seniores e acompanham a devida emissão de ART registrada junto ao CREA, atendendo rigorosamente às exigências legais e municipais.',
    suggestedAction: {
      label: 'Solicitar Proposta com ART',
      action: 'quote',
      target: 'automacoes'
    }
  },
  {
    id: 'faq-incendio-avcb',
    category: 'servicos',
    question: 'Como funciona o projeto de alarme de incêndio (SDAI) e adequação ao AVCB?',
    shortQuestion: 'Alarme de Incêndio & AVCB',
    keywords: ['incendio', 'avcb', 'sdai', 'bombeiro', 'bombeiros', 'habite-se', 'nbr 17240', 'fumaca', 'alarme de incendio', 'central de alarme'],
    answer:
      'Desenvolvemos o projeto executivo completo de SDAI (Sistema de Detecção e Alarme de Incêndio) de acordo com a norma ABNT NBR 17240. Instalamos centrais endereçáveis, acionadores manuais, detectores térmicos/ópticos e intertravamento com elevadores e pressurização de escadas para aprovação rápida do AVCB junto ao Corpo de Bombeiros.',
    suggestedAction: {
      label: 'Dimensionar SDAI / AVCB',
      action: 'quote',
      target: 'incendio'
    }
  },
  {
    id: 'faq-cftv-ia',
    category: 'servicos',
    question: 'Quais os recursos de Inteligência Artificial presentes no CFTV da PROATIVA?',
    shortQuestion: 'CFTV & IA (LPR / Facial)',
    keywords: ['cftv', 'camera', 'cameras', 'ia', 'inteligencia artificial', 'lpr', 'placa', 'placas', 'facial', 'reconhecimento', '4k', 'starlight', 'monitoramento'],
    answer:
      'Nossos sistemas de CFTV utilizam câmeras 4K Starlight com visão noturna colorida e processamento de IA embarcado para leitura automática de placas (LPR), reconhecimento facial veloz, detecção de invasão de perímetro e contagem de pessoas/veículos, reduzindo em até 95% os falsos positivos.',
    suggestedAction: {
      label: 'Orçar Sistema de CFTV IA',
      action: 'quote',
      target: 'monitoramento'
    }
  },
  {
    id: 'faq-portaria-remota',
    category: 'servicos',
    question: 'Quanto é possível economizar com Controle de Acesso e Portaria Remota?',
    shortQuestion: 'Economia com Portaria Remota',
    keywords: ['portaria', 'portaria remota', 'acesso', 'biometria', 'facial', 'catraca', 'catracas', 'economia', 'condominio', 'eclusa'],
    answer:
      'A implantação de portaria remota e controle de acesso com biometria facial anti-spoofing e catracas automatizadas gera uma economia média de 40% a 50% nos custos de folha de pagamento do condomínio, ao mesmo tempo em que elimina brechas humanas de segurança e agiliza a entrada de moradores em menos de 0.3 segundos.',
    suggestedAction: {
      label: 'Simular Economia no Projeto',
      action: 'calculator'
    }
  },
  {
    id: 'faq-sla-plantao',
    category: 'sla',
    question: 'Qual o tempo de resposta do suporte emergencial e manutenção de portões?',
    shortQuestion: 'Tempo de SLA / Plantão 24/7',
    keywords: ['sla', 'emergencia', 'tempo', 'resposta', 'suporte', 'portao', 'portoes', 'manutencao', 'quebrou', '0800', 'plantao'],
    answer:
      'Oferecemos planos de SLA com atendimento emergencial garantido em até 2 horas ou 4 horas (24/7) para clientes com contrato de manutenção preventiva e corretiva. Para chamados críticos de portões, cancelas ou centrais, nosso canal 0800 opera ininterruptamente.',
    suggestedAction: {
      label: 'Falar com Plantão de SLA',
      action: 'whatsapp'
    }
  },
  {
    id: 'faq-automacao-predial',
    category: 'servicos',
    question: 'O que inclui a Automação Predial e Industrial da PROATIVA?',
    shortQuestion: 'Automação Predial & Industrial',
    keywords: ['automacao', 'automacoes', 'clp', 'predial', 'industrial', 'bacnet', 'modbus', 'energia', 'telemetria', 'ar condicionado', 'climatizacao'],
    answer:
      'Projetamos a integração completa de quadros elétricos, sistemas de climatização (HVAC/Chillers), reservatórios, geradores e bombas utilizando CLPs industriais e protocolos abertos como BACnet, Modbus e MQTT, gerando economia média de até 32% no consumo energético.',
    suggestedAction: {
      label: 'Orçar Projeto de Automação',
      action: 'quote',
      target: 'automacoes'
    }
  },
  {
    id: 'faq-visita-demonstracao',
    category: 'comercial',
    question: 'A visita técnica e demonstração de produtos tem algum custo?',
    shortQuestion: 'Visita Técnica Gratuita',
    keywords: ['visita', 'gratis', 'custo', 'orcamento', 'preco', 'demonstracao', 'agendar', 'visita tecnica', 'avaliacao'],
    answer:
      'Não! A visita técnica de diagnóstico preliminar e o dimensionamento para construtoras, indústrias e condomínios de médio/grande porte são 100% gratuitos e sem compromisso. Você também pode agendar uma demonstração dos equipamentos.',
    suggestedAction: {
      label: 'Agendar Visita / Demonstração',
      action: 'demo'
    }
  },
  {
    id: 'faq-garantia',
    category: 'comercial',
    question: 'Qual a garantia oferecida nos equipamentos e na instalação?',
    shortQuestion: 'Garantia dos Equipamentos',
    keywords: ['garantia', 'tempo de garantia', 'equipamento', 'instalacao', 'reparo', 'troca'],
    answer:
      'Todos os equipamentos fornecidos contam com garantia de fábrica de 12 a 24 meses, e os serviços de infraestrutura e engenharia executados pela PROATIVA possuem garantia total de 12 meses, além de cobertura contínua sob contratos de SLA.',
    suggestedAction: {
      label: 'Falar com Especialista',
      action: 'whatsapp'
    }
  }
];

export function findMatchingFAQ(query: string): FAQItem | null {
  const normalized = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (!normalized) return null;

  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const faq of FAQ_DATABASE) {
    let score = 0;

    for (const keyword of faq.keywords) {
      const normKw = keyword
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (normalized.includes(normKw)) {
        score += normKw.length * 2;
      }
    }

    const normQ = faq.question
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const queryWords = normalized.split(/\s+/);
    for (const word of queryWords) {
      if (word.length > 3 && normQ.includes(word)) {
        score += 3;
      }
    }

    if (score > highestScore && score >= 4) {
      highestScore = score;
      bestMatch = faq;
    }
  }

  return bestMatch;
}
