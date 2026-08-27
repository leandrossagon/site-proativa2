import { TestimonialItem, CaseStudyItem } from '../types';

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Eng. Ricardo Vasconcellos',
    role: 'Diretor de Engenharia & Obras',
    company: 'Cygnus Construtora & Incorporadora',
    location: 'São Paulo - SP',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote:
      'A PROATIVA entregou a infraestrutura completa de automação predial e SDAI de 3 torres comerciais sem um único dia de atraso no cronograma. A aprovação do AVCB pelo Corpo de Bombeiros ocorreu de primeira, com todo o suporte e ART registrados.',
    highlight: 'Aprovação de AVCB de 1ª e zero retrabalho nas 3 torres',
    serviceCategory: 'Alarme de Incêndio & Automações',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Dra. Fernanda Castilho',
    role: 'Síndica Profissional & Gestora Predial',
    company: 'Condomínio Residencial Parque dos Pássaros',
    location: 'Barueri / Alphaville - SP',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote:
      'A migração para a portaria remota e o controle de acesso com reconhecimento facial anti-spoofing reduziu em 44% os nossos custos operacionais mensais de condomínio, elevando drasticamente a segurança dos 240 condôminos.',
    highlight: '44% de economia na taxa condominial e fluxo 100% auditado',
    serviceCategory: 'Controle de Acesso & Portaria Remota',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Marcelo Prado',
    role: 'Gerente de Facilities & Infraestrutura',
    company: 'Complexo Logístico AlphaTech',
    location: 'Campinas - SP',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote:
      'Projetaram um sistema perimetral e CFTV com Inteligência Artificial que eliminou 98% dos falsos alarmes causados pela vegetação e animais. O suporte com SLA de 2 horas do contrato de manutenção é impecável.',
    highlight: 'Redução de 98% em falsos disparos no perímetro de 6km',
    serviceCategory: 'Segurança Eletrônica & CFTV com IA',
    rating: 5
  }
];

export const CASE_STUDIES_DATA: CaseStudyItem[] = [
  {
    id: 'case-automacoes',
    sectorId: 'automacoes',
    category: 'Automações Prediais e Industriais',
    title: 'Otimização Energética & Telemetria em Tempo Real em Mega Centro Logístico',
    client: 'LogTech Centro de Distribuição Sul',
    clientType: 'Logística & Cadeia de Suprimentos',
    location: 'Cajamar - SP',
    badge: 'Eficiência Energética & BACnet',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    summary:
      'Engenharia de integração com CLPs industriais, telemetria climática automatizada e controle centralizado de subestações em galpão de 42.000m².',
    challenge:
      'O cliente enfrentava consumo excessivo de eletricidade nos sistemas de refrigeração e climatização, além de manutenções corretivas emergenciais recorrentes por falta de telemetria preditiva nos quadros de distribuição.',
    solution:
      'Desenvolvemos a topologia completa de automação com controladores lógicos programáveis (CLPs), integrando medidores inteligentes de energia via protocolo Modbus/BACnet e central de controle com painel web em nuvem com telemetria 24/7.',
    results: [
      {
        label: 'Redução na Fatura Elétrica',
        value: '31.2%',
        detail: 'Economia comprovada no primeiro trimestre'
      },
      {
        label: 'Downtime Não Programado',
        value: '0 horas',
        detail: 'Prevenção de paradas por alerta preditivo'
      },
      {
        label: 'Payback do Investimento',
        value: '7 meses',
        detail: 'Retorno financeiro acelerado'
      }
    ],
    technicalSpecs: [
      'Topologia com 12 CLPs redundantes em anel de fibra óptica',
      'Protocolos industriais: BACnet IP, Modbus RTU e MQTT',
      'Sensores ambientais de temperatura, umidade e CO2 com precisão industrial',
      'Painel supervisório IHM em tela touch blindada e dashboard mobile'
    ],
    timeline: 'Implementação em 45 dias com operação contínua'
  },
  {
    id: 'case-seguranca',
    sectorId: 'seguranca',
    category: 'Segurança Eletrônica & CFTV com IA',
    title: 'Blindagem Perimetral Inteligente com Barreiras Micro-ondas e Câmeras Starlight 4K',
    client: 'Condomínio Reserva Imperial',
    clientType: 'Loteamento Fechado de Alto Padrão',
    location: 'Itu - SP',
    badge: 'Visão Computacional & Perímetro',
    heroImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format&fit=crop&q=80',
    summary:
      'Proteção perimetral de 7.400 metros lineares com sensores micro-ondas imunes a animais e sistema CFTV com Inteligência Artificial e Reconhecimento LPR nos portões.',
    challenge:
      'Altíssimo índice de disparos falsos de sirenes causados por intempéries climáticas, galhos de árvores e animais silvestres, gerando desgaste na equipe de vigilância e insegurança nos moradores.',
    solution:
      'Substituição do sistema convencional por barreiras micro-ondas volumétricas calibradas, complementadas por 48 câmeras 4K Starlight com analítico de inteligência artificial embarcado para classificação humana/veicular e leitura automática de placas (LPR).',
    results: [
      {
        label: 'Queda em Falsos Positivos',
        value: '97.5%',
        detail: 'Fim dos disparos acidentais por fauna/flora'
      },
      {
        label: 'Tempo de Alerta na Central',
        value: '1.4 seg',
        detail: 'Notificação com gravação com pré-buffer'
      },
      {
        label: 'Reconhecimento LPR',
        value: '99.8%',
        detail: 'Acurácia em dia, noite e sob chuva forte'
      }
    ],
    technicalSpecs: [
      'Barreiras micro-ondas bi-estáticas com alcance de 200m por zona',
      'Câmeras 4K 8MP com tecnologia Starlight e zoom óptico 30x',
      'Servidores NVR com RAID-6 e 120 dias de armazenamento seguro',
      'Central de monitoramento com redundância de energia via no-break senoidal'
    ],
    timeline: '30 dias de instalação e parametrização'
  },
  {
    id: 'case-acesso',
    sectorId: 'acesso',
    category: 'Controle de Acesso & Portaria Remota',
    title: 'Modernização de Controle de Acesso Facial Anti-Spoofing em Torre Corporativa Triple A',
    client: 'Edifício Infinity Tower Corporate',
    clientType: 'Complexo Corporativo',
    location: 'Av. Brigadeiro Faria Lima - SP',
    badge: 'Biometria Facial 0.3s & Eclusas',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    summary:
      'Implantação de 10 catracas tipo flap gate em vidro com reconhecimento facial de alta precisão e gestão de convidados por QR Code criptografado.',
    challenge:
      'Gargalo severo no saguão nos horários de pico (entrada às 08h-09h e almoço), gerando filas de até 15 minutos para liberação de crachás físicos de visitantes e funcionários.',
    solution:
      'Instalação de terminais biométricos faciais com algoritmo de inteligência artificial anti-spoofing que validam o acesso em 0.3 segundos, integrados a catracas automatizadas em aço inox e vidro temperado com abertura ultrarrápida.',
    results: [
      {
        label: 'Tempo de Passagem',
        value: '0.3 seg',
        detail: 'Fim total das filas na recepção'
      },
      {
        label: 'Capacidade de Fluxo',
        value: '45 pess/min',
        detail: 'Por catraca nos horários de pico'
      },
      {
        label: 'Fraudes e Empréstimos',
        value: 'Zero',
        detail: 'Biometria facial intransferível'
      }
    ],
    technicalSpecs: [
      'Terminais faciais com câmera dupla com sensor IR e luz visível',
      'Catracas motorizadas tipo flap gate em aço inox AISI 304 escovado',
      'Integração via API com softwares de gestão condominial e RH',
      'Autoatendimento para cadastro de visitantes via totens e WhatsApp'
    ],
    timeline: 'Concluído em 21 dias com liberação faseada'
  }
];
