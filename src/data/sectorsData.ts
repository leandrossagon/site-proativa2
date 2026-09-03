import { SectorInfo, CompanySettings, LeadItem } from '../types';

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  companyName: 'PROATIVA Tecnologies',
  tagline: 'SOLUÇÕES E TECNOLOGIA EM AUTOMAÇÕES',
  yearsOfExperience: 18,
  phone: '+55 11 92518-4811',
  whatsapp: '5511925184811',
  email: 'suporte-proativa@protonmail.com',
  commercialEmail: 'comercial-proativa@protonmail.com',
  address: 'Av. José Joaquim Seabra, 91 - Salas 01, 02 e 03, Jd. Bonfiglioli, CEP 05364-000 - São Paulo / SP',
  cnpj: '14.892.401/0001-88',
  slaEmergencyPhone: '+55 11 92518-4811',
  operatingHours: 'Segunda a Sexta das 08h às 18h | Plantão SLA 24/7',
};

export const SECTORS_DATA: SectorInfo[] = [
  {
    id: 'automacoes',
    anchorId: 'sec-automacoes',
    title: 'Automações Industriais e Prediais',
    shortTitle: 'Automações',
    badge: 'Engenharia de Sistemas',
    tagline: 'Eficiência operacional máxima',
    iconName: 'Cpu',
    heroExcerpt: 'Sistemas inteligentes integrando CLPs, telemetria e gestão predial unificada.',
    fullDescription:
      'A otimização de processos não é apenas um diferencial competitivo; é a linha entre o lucro e o desperdício operacional. Na PROATIVA, projetamos o sistema nervoso central do seu empreendimento, integrando maquinários, sensores e sistemas prediais em uma interface unificada e autônoma.',
    features: [
      'Redução drástica de paradas de máquina (downtime) através de diagnósticos preditivos.',
      'Gestão inteligente de energia e climatização, gerando economia expressiva em grandes condomínios e indústrias.',
      'Integração total com protocolos industriais de alta confiabilidade (Modbus, BACnet, MQTT, OPC-UA).'
    ],
    specs: [
      { label: 'Economia Energética Média', value: 'Até 32% ao ano' },
      { label: 'Protocolos Suportados', value: 'BACnet / Modbus / MQTT' },
      { label: 'Interface de Controle', value: 'Dashboard Cloud & IHM Local' },
      { label: 'Monitoramento Preditivo', value: '24/7 com alerta via push/SMS' }
    ],
    ctaText: 'Orçar Projeto de Automação',
    recommendedAudience: 'Indústrias de transformação, galpões logísticos e condomínios de grande porte.'
  },
  {
    id: 'seguranca',
    anchorId: 'sec-seguranca',
    title: 'Segurança Eletrônica Avançada',
    shortTitle: 'Segurança Eletrônica',
    badge: 'Blindagem Patrimonial',
    tagline: 'Blindagem patrimonial total',
    iconName: 'ShieldCheck',
    heroExcerpt: 'Cerca virtual, barreiras micro-ondas, sensores perimetrais e redundância de centrais.',
    fullDescription:
      'Perímetros vulneráveis atraem riscos desnecessários. Nossos sistemas de segurança eletrônica são desenhados por engenheiros seniores para criar camadas invisíveis, porém intransponíveis, de proteção ao seu patrimônio corporativo ou residencial.',
    features: [
      'Alarmes perimetrais inteligentes com imunidade a falsos disparos por intempéries ou animais.',
      'Barreiras físicas eletrificadas monitoradas em tempo real com reporte instantâneo de falhas de laço.',
      'Redundância de centrais para garantir operação ininterrupta mesmo em tentativas de sabotagem física.'
    ],
    specs: [
      { label: 'Tempo Médio de Resposta', value: '< 2 segundos' },
      { label: 'Falsos Positivos', value: 'Redução superior a 95%' },
      { label: 'Redundância Elétrica', value: 'No-breaks senoidais + Gerador' },
      { label: 'Perímetro Protegido', value: 'Projetos de 50m a +10.000m' }
    ],
    ctaText: 'Blindar Meu Projeto',
    recommendedAudience: 'Condomínios horizontais fechados, centros de distribuição e plantas corporativas.'
  },
  {
    id: 'monitoramento',
    anchorId: 'sec-monitoramento',
    title: 'Monitoramento e CFTV Inteligente',
    shortTitle: 'Monitoramento',
    badge: 'Visão Computacional IA',
    tagline: 'CFTV com Inteligência Artificial',
    iconName: 'Video',
    heroExcerpt: 'Câmeras 4K Starlight, Leitura de Placas (LPR), Reconhecimento e Detecção de Intrusão.',
    fullDescription:
      'Ver o passado através de gravações estáticas não resolve incidentes. Nós implementamos soluções de vigilância ativa com Inteligência Artificial capaz de antecipar ocorrências antes mesmo que elas afetem a sua segurança.',
    features: [
      'Câmeras com alta definição (4K / Starlight) e visão noturna colorida de longa distância.',
      'Análise comportamental por IA: detecção automática de invasão de zona, permanência suspeita e leitura de placas (LPR).',
      'Central de monitoramento integrada com acesso remoto via aplicativo seguro de ultra baixa latência.'
    ],
    specs: [
      { label: 'Resolução de Captura', value: 'Ultra HD 4K / 8MP Starlight' },
      { label: 'Mecanismo de IA', value: 'LPR / Detecção Facial / Heatmap' },
      { label: 'Armazenamento Seguro', value: 'Local NVR RAID + Nuvem Criptografada' },
      { label: 'App Mobile', value: 'Streaming P2P direto em iOS/Android' }
    ],
    ctaText: 'Solicitar Projeto de CFTV',
    recommendedAudience: 'Grandes empreendimentos, hipermercados, marinas e loteamentos.'
  },
  {
    id: 'acesso',
    anchorId: 'sec-acesso',
    title: 'Controle de Acesso e Portaria Remota',
    shortTitle: 'Controle de Acesso',
    badge: 'Biometria & Portaria 4.0',
    tagline: 'Portaria Remota e Biometria',
    iconName: 'Fingerprint',
    heroExcerpt: 'Facial Anti-spoofing em 0.3s, catracas flap, eclusas automáticas e gestão em nuvem.',
    fullDescription:
      'O fluxo de pessoas em grandes edifícios e condomínios exige rigor absoluto sem sacrificar a agilidade. Unimos biometria de última geração, reconhecimento facial de alta velocidade e portarias remotas altamente estruturadas.',
    features: [
      'Reconhecimento facial com anti-spoofing (impede fraudes com fotos ou máscaras) em menos de 0.5 segundos.',
      'Redução de custos operacionais com portaria física através de centrais remotas hiperconectadas.',
      'Histórico completo de acessos com relatórios gerenciais e exportação em tempo real na nuvem.'
    ],
    specs: [
      { label: 'Tempo de Validação', value: '0.3 segundos por usuário' },
      { label: 'Economia com Portaria', value: 'Até 50% de redução na taxa condominial' },
      { label: 'Controle de Visitantes', value: 'QR Code dinâmico via WhatsApp' },
      { label: 'Integração de Catracas', value: 'Flap, Torniquetes e Cancelas' }
    ],
    ctaText: 'Modernizar o Controle de Acesso',
    recommendedAudience: 'Edifícios corporativos Triple A, condomínios verticais e coworkings.'
  },
  {
    id: 'inteligentes',
    anchorId: 'sec-inteligentes',
    title: 'Soluções Inteligentes (Residencial & Predial High-End)',
    shortTitle: 'Soluções Inteligentes',
    badge: 'Alto Padrão & IoT',
    tagline: 'Conectividade e alto padrão',
    iconName: 'Home',
    heroExcerpt: 'Automação residencial completa, dimerização DALI, home theater e climatização por zonas.',
    fullDescription:
      'O futuro da moradia e do trabalho corporativo chegou aos padrões mais exigentes do mercado. Nossas soluções inteligentes transformam ambientes comuns em espaços responsivos, luxuosos e intuitivos.',
    features: [
      'Automação de iluminação, cortinas, áudio/vídeo e climatização integradas por comandos de voz ou painéis touch.',
      'Eficiência energética passiva e ativa que reduz custos operacionais de condomínios inteiros.',
      'Infraestrutura invisível e robusta, garantindo design limpo sem travamentos ou falhas de sinal.'
    ],
    specs: [
      { label: 'Controle Unificado', value: 'Painéis Touch, Apple Home, Alexa & App' },
      { label: 'Distribuição AV', value: 'Matrizes 4K HDR Multi-room' },
      { label: 'Protocolos de Automação', value: 'KNX, Zigbee 3.0, Z-Wave, DALI' },
      { label: 'Cenários Personalizados', value: 'Cinema, Festa, Relax, Segurança' }
    ],
    ctaText: 'Descobrir Soluções Inteligentes',
    recommendedAudience: 'Residências de luxo, penthouses, sedes diretivas e auditórios corporativos.'
  },
  {
    id: 'incendio',
    anchorId: 'sec-incendio',
    title: 'Alarme de Incêndio (SDAI) e Conformidade',
    shortTitle: 'Alarme de Incêndio',
    badge: 'Norma NBR 17240 / AVCB',
    tagline: 'SDAI e conformidade rigorosa',
    iconName: 'Server',
    hasCompositeFireIcon: true,
    heroExcerpt: 'Centrais de detecção endereçáveis, laudos técnicos para AVCB e aprovação rápida em bombeiros.',
    fullDescription:
      'A segurança contra incêndios não tolera falhas. Desenvolvemos projetos completos de SDAI (Sistema de Detecção e Alarme de Incêndio) totalmente em conformidade com as exigências dos Corpos de Bombeiros e normativas técnicas vigentes.',
    features: [
      'Centrais endereçáveis de altíssima precisão que identificam o sensor exato da ocorrência de fumaça ou calor.',
      'Acionadores manuais, sinalizadores audiovisuais robustos e automação de corte de energia/ar-condicionado em emergências.',
      'Aprovação simplificada para Habite-se em grandes construtoras e edifícios comerciais com ART recolhida.'
    ],
    specs: [
      { label: 'Topologia do Sistema', value: 'Endereçável Classe A / Laço Fechado' },
      { label: 'Certificação de Produtos', value: 'UL / FM / ABNT NBR 17240' },
      { label: 'Intertravamento', value: 'Dampers, Elevadores e Pressurização' },
      { label: 'Aprovação AVCB', value: 'Suporte completo de engenharia' }
    ],
    ctaText: 'Garantir Conformidade SDAI',
    recommendedAudience: 'Construtoras, shopping centers, hospitais e edifícios em fase de Habite-se.'
  },
  {
    id: 'portoes',
    anchorId: 'sec-portoes',
    title: 'Manutenção de Portões e Automação de Cargas',
    shortTitle: 'Manutenção de Portões',
    badge: 'SLA Crítico & Manutenção',
    tagline: 'Disponibilidade e SLA garantido',
    iconName: 'Wrench',
    heroExcerpt: 'Motores industriais de ciclo contínuo, cancelas de alto fluxo e planos de SLA preventivo.',
    fullDescription:
      'Portões travados geram caos no tráfego e brechas críticas de segurança. Nosso serviço especializado de manutenção preditiva e corretiva garante disponibilidade contínua para portões industriais, de condomínios e cancelas de alta frequência.',
    features: [
      'Atendimento rápido com equipe técnica sênior especializada em motores de alta performance e inversores de frequência.',
      'Planos de SLA personalizados com manutenções preventivas mensais para evitar quebras imprevistas.',
      'Instalação e ajustes de dispositivos de segurança anti-esmagamento e fotocélulas de proteção de padrão internacional.'
    ],
    specs: [
      { label: 'Velocidade de Abertura', value: 'A partir de 4 segundos (Jet Flex)' },
      { label: 'Ciclos por Hora', value: '100% contínuo sem superaquecimento' },
      { label: 'Tempo de Chegada SLA', value: 'Planos de 2h / 4h / 12h' },
      { label: 'Segurança Passiva', value: 'Freio eletromagnético + Fotocélula ativa' }
    ],
    ctaText: 'Contratar Manutenção / SLA',
    recommendedAudience: 'Condomínios de alto tráfego de veículos, docas logísticas e garagens comerciais.'
  },
  {
    id: 'armazenamento_nuvem',
    anchorId: 'sec-armazenamento-nuvem',
    title: 'Armazenamento em Nuvem com Inteligência de Reconhecimento Facial',
    shortTitle: 'Nuvem e I.A.',
    badge: 'Cloud & AI Analytics',
    tagline: 'Armazenamento seguro e reconhecimento inteligente',
    iconName: 'Cloud',
    heroExcerpt: 'Gravação em nuvem com alta disponibilidade, backups redundantes e reconhecimento facial.',
    fullDescription:
      'Garantir a integridade dos seus dados e gravações de segurança é vital para mitigar riscos operacionais. Oferecemos armazenamento em nuvem criptografado de ponta a ponta, associado a robustos algoritmos de Inteligência Artificial para reconhecimento facial e alertas analíticos em tempo real.',
    features: [
      'Backup contínuo e escalonável na nuvem com proteção contra danos físicos ou roubos locais (NVR/DVR).',
      'Inteligência de borda (Edge Computing) e análise preditiva focada no reconhecimento rápido e assertivo de suspeitos.',
      'Acesso seguro, unificado e de alta velocidade por meio de plataformas B2B customizadas (App e Dashboard).'
    ],
    specs: [
      { label: 'Criptografia', value: 'AES-256 (Ponta a Ponta)' },
      { label: 'SLA de Uptime Cloud', value: '99,99% de Disponibilidade' },
      { label: 'Reconhecimento Facial', value: 'Machine Learning integrado (Baixo delay)' },
      { label: 'Retenção de Imagens', value: 'Sob demanda (30, 60, 90+ dias)' }
    ],
    ctaText: 'Estruturar Cloud Analytics',
    recommendedAudience: 'Instituições financeiras, datacenters, complexos hospitalares e redes de varejo.'
  },
  {
    id: 'redes_infra',
    anchorId: 'sec-redes-infra',
    title: 'Estruturação de Redes: Do Projeto à Execução',
    shortTitle: 'Infra & Redes',
    badge: 'Infraestrutura B2B',
    tagline: 'Cabeamento estruturado e performance',
    iconName: 'Network',
    heroExcerpt: 'Projetos lógicos e físicos de redes, switches layer 3, fibra óptica e certificação de backbone.',
    fullDescription:
      'O desempenho de qualquer tecnologia – seja CFTV 4K ou Automação Predial – depende intrinsecamente da fundação de conectividade. Executamos projetos de infraestrutura e redes de dados hiper-convergentes, do lançamento da fibra óptica à certificação de cada ponto de cabeamento estruturado.',
    features: [
      'Elaboração de plantas topológicas detalhadas, dimensionamento de switches corporativos e roteadores de alta densidade.',
      'Lançamento, fusão de fibra óptica e certificação de cabeamento (Cat6, Cat6A) de acordo com normas técnicas internacionais (TIA/EIA).',
      'Padronização de racks, identificação técnica e garantia de escalabilidade para as operações de TI da sua empresa.'
    ],
    specs: [
      { label: 'Cabeamento', value: 'Metálico (Cat6/Cat6A) e Óptico' },
      { label: 'Topologia', value: 'Anel, Estrela e Spine-Leaf' },
      { label: 'Certificação', value: 'Equipamentos Fluke Networks' },
      { label: 'Equipamentos Ativos', value: 'Provisão de Core e Edge Switches' }
    ],
    ctaText: 'Solicitar Projeto de Rede',
    recommendedAudience: 'Prédios comerciais Triple A, galpões logísticos logísticos e novos campi universitários.'
  }
];

export const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    nome: 'Construtora Horizon (Eng. Carlos Albuquerque)',
    whatsapp: '(11) 98765-4321',
    email: 'carlos.eng@horizon.com.br',
    setor: 'incendio',
    detalhes: 'Projeto de SDAI endereçável para 2 torres corporativas de 28 andares na Chucri Zaidan. Precisamos de aprovação para AVCB em 60 dias.',
    porteProjeto: 'grande',
    createdAt: '2026-08-25T14:32:00Z',
    status: 'em_analise',
    notes: 'Enviado pré-memorial descritivo e agendada visita técnica na quinta-feira.',
    estimatedBudget: 'R$ 180.000,00'
  },
  {
    id: 'lead-2',
    nome: 'Condomínio Reserva Imperial (Síndico Marcos)',
    whatsapp: '(11) 99123-8877',
    email: 'sindico@reservaimperial.sp.gov',
    setor: 'acesso',
    detalhes: 'Modernização de 4 catracas e instalação de portaria remota com reconhecimento facial para 320 apartamentos.',
    porteProjeto: 'medio',
    createdAt: '2026-08-26T09:15:00Z',
    status: 'novo',
    notes: 'Aguardando envio da planta da guarita.',
    estimatedBudget: 'R$ 65.000,00'
  },
  {
    id: 'lead-3',
    nome: 'LogTech Centro de Distribuição (Renata - Operações)',
    whatsapp: '(19) 98844-3322',
    email: 'renata@logtechbr.com',
    setor: 'automacoes',
    detalhes: 'Automação predial com telemetria para controle térmico de galpão de 14.000m² e intertravamento de esteiras.',
    porteProjeto: 'corporativo',
    createdAt: '2026-08-24T18:40:00Z',
    status: 'orcamento_enviado',
    notes: 'Proposta comercial nº PR-2026/089 enviada por e-mail.',
    estimatedBudget: 'R$ 240.000,00'
  }
];
