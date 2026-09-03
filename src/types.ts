export type SectorId =
  | 'automacoes'
  | 'seguranca'
  | 'monitoramento'
  | 'acesso'
  | 'inteligentes'
  | 'incendio'
  | 'portoes'
  | 'armazenamento_nuvem'
  | 'redes_infra';

export interface SectorInfo {
  id: SectorId;
  anchorId: string;
  title: string;
  shortTitle: string;
  badge: string;
  tagline: string;
  iconName: string;
  hasCompositeFireIcon?: boolean;
  heroExcerpt: string;
  fullDescription: string;
  features: string[];
  specs: { label: string; value: string }[];
  ctaText: string;
  recommendedAudience: string;
}

export type LeadStatus = 'novo' | 'em_analise' | 'orcamento_enviado' | 'fechado' | 'arquivado';

export interface LeadItem {
  id: string;
  perfil?: 'b2b' | 'b2c';
  nome: string;
  empresa?: string;
  whatsapp: string;
  email?: string;
  setor: SectorId | string;
  detalhes: string;
  porteProjeto?: 'pequeno' | 'medio' | 'grande' | 'corporativo' | string;
  tipoImovel?: string;
  necessidadeB2C?: string;
  createdAt: string;
  status: LeadStatus;
  notes?: string;
  estimatedBudget?: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  yearsOfExperience: number;
  phone: string;
  whatsapp: string;
  email: string;
  commercialEmail?: string;
  address: string;
  cnpj: string;
  slaEmergencyPhone: string;
  operatingHours: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  photoUrl: string;
  quote: string;
  highlight: string;
  serviceCategory: string;
  rating: number;
}

export interface CaseStudyItem {
  id: string;
  sectorId: SectorId;
  category: string;
  title: string;
  client: string;
  clientType: string;
  location: string;
  badge: string;
  heroImage: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string; detail: string }[];
  technicalSpecs: string[];
  timeline: string;
}

export type ChatSender = 'bot' | 'user' | 'system';

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string; payload?: any }[];
  isLeadForm?: boolean;
  isScheduleForm?: boolean;
}


export type AdminRole = "admin" | "manager" | "viewer";

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  password?: string;
  role: AdminRole;
  createdAt: string;
  email?: string;
  requirePasswordChange?: boolean;
}
