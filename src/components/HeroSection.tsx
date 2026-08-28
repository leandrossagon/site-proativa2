import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  Building2, 
  Award, 
  Headphones, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  FileCheck2
} from 'lucide-react';
import { SectorId, LeadItem, CompanySettings } from '../types';

interface HeroSectionProps {
  settings: CompanySettings;
  preselectedSector?: SectorId;
  onSubmitLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  preselectedSector,
  onSubmitLead,
  onOpenCalculator
}) => {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [setor, setSetor] = useState<SectorId>(preselectedSector || 'automacoes');
  const [porteProjeto, setPorteProjeto] = useState<'pequeno' | 'medio' | 'grande' | 'corporativo'>('medio');
  const [detalhes, setDetalhes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadItem | null>(null);
  const [directWhatsapp, setDirectWhatsapp] = useState(true);

  // Sync if preselected changes from external clicks
  React.useEffect(() => {
    if (preselectedSector) {
      setSetor(preselectedSector);
    }
  }, [preselectedSector]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Auto-masking (XX) XXXXX-XXXX or (XX) XXXX-XXXX
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    setWhatsapp(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !whatsapp.trim()) return;

    setIsSubmitting(true);

    const leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'> = {
      nome,
      whatsapp,
      email: email.trim() || undefined,
      setor,
      porteProjeto,
      detalhes: detalhes.trim() || 'Solicitação de orçamento via formulário institucional rápido.'
    };

    setTimeout(() => {
      onSubmitLead(leadData);
      setIsSubmitting(false);
      setSubmittedLead({
        id: `PR-${Math.floor(1000 + Math.random() * 9000)}`,
        ...leadData,
        createdAt: new Date().toISOString(),
        status: 'novo'
      });
    }, 400);
  };

  const sectorLabels: Record<SectorId, string> = {
    automacoes: 'Automações Industriais e Prediais',
    seguranca: 'Segurança Eletrônica',
    monitoramento: 'Monitoramento / CFTV',
    acesso: 'Controle de Acesso e Portaria Remota',
    inteligentes: 'Soluções Inteligentes / Residencial High-End',
    incendio: 'Alarme de Incêndio (SDAI)',
    portoes: 'Manutenção de Portões',
    armazenamento_nuvem: 'Armazenamento em Nuvem com IA',
    redes_infra: 'Estruturação de Redes'
  };

  const getWhatsAppMessage = () => {
    const text = `*PROATIVA - Solicitação de Orçamento*%0A%0A` +
      `*Cliente/Empresa:* ${nome}%0A` +
      `*WhatsApp:* ${whatsapp}%0A` +
      `*Setor:* ${sectorLabels[setor]}%0A` +
      `*Porte Estimado:* ${porteProjeto.toUpperCase()}%0A` +
      `*Descrição:* ${detalhes || 'Sem observações adicionais.'}%0A%0A` +
      `_Enviado através do site oficial proativatecnologies.com.br_`;
    return `https://wa.me/${settings.whatsapp}?text=${text}`;
  };

  return (
    <section className="relative text-white pt-10 pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="flex justify-center mb-8 relative">
            <div className="absolute inset-0 bg-white/20 blur-[60px] rounded-full w-3/4 h-3/4 mx-auto top-1/2 -translate-y-1/2"></div>
            <img 
              src="/logo1.png" 
              alt="PROATIVA Tecnologies" 
              className="relative z-10 h-64 sm:h-[400px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" 
            />
          </div>

          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#FF6B00]"></span>
            <span className="text-[#FF6B00] text-[10px] sm:text-xs uppercase tracking-[0.35em] font-black">
              Fundada em 2008 • 18 Anos de Mercado
            </span>
            <span className="w-8 h-[1px] bg-[#FF6B00]"></span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-white mb-5 uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            ENGENHARIA <br className="hidden sm:inline" />
            DE ALTA PERFORMANCE
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Soluções integradas em automação, segurança perimetral, SDAI e controle de acesso para o ecossistema das maiores construtoras e indústrias do país.
          </p>

          {/* Real-Time Operational Telemetry Card */}
          <div className="mt-8 max-w-md mx-auto glass-panel p-4 rounded-xl border border-white/10">
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e] animate-ping"></span>
                Status Operacional de Engenharia
              </span>
              <span className="text-emerald-400 font-bold">100% ONLINE</span>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-gradient-to-r from-[#00A3FF] to-emerald-400 rounded-full"></div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>CONFORMIDADE TÉCNICA ABNT</span>
                <span className="text-[#00A3FF] font-bold">99.8% SLA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Capture Box */}
        <div className="max-w-2xl mx-auto glass-panel-elevated rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-white/15 relative overflow-hidden" id="orcamento">
          {/* Subtle accent corner glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3FF]/15 rounded-full blur-2xl pointer-events-none"></div>

          {submittedLead ? (
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4 glow-emerald">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Solicitação Recebida com Sucesso!
              </h3>
              <p className="text-sm text-slate-300 mb-4 max-w-md mx-auto">
                Obrigado, <strong>{submittedLead.nome}</strong>. Nossos engenheiros especialistas foram notificados sobre o seu projeto no setor de <strong>{sectorLabels[submittedLead.setor]}</strong>.
              </p>
              
              <div className="bg-slate-900/90 border border-white/10 rounded-xl p-4 mb-6 text-left text-xs text-slate-300 space-y-1 font-mono">
                <div><span className="text-[#00A3FF] font-semibold">Protocolo:</span> {submittedLead.id}</div>
                <div><span className="text-[#00A3FF] font-semibold">Telefone:</span> {submittedLead.whatsapp}</div>
                <div><span className="text-emerald-400 font-semibold">Previsão de Retorno:</span> Em até 2 horas úteis</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider glow-emerald transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Abrir WhatsApp Imediatamente
                </a>
                <button
                  onClick={() => {
                    setSubmittedLead(null);
                    setNome('');
                    setWhatsapp('');
                    setDetalhes('');
                  }}
                  className="px-5 py-3 rounded-lg font-semibold text-xs uppercase tracking-wider border border-white/20 text-slate-300 hover:bg-white/5 transition-colors"
                >
                  Novo Orçamento
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <div className="inline-block px-3 py-1 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/30 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                  Atendimento Consultivo Direto
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Solicite um Orçamento Estratégico
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Dimensionamento por engenheiros seniores para indústrias, condomínios e construtoras.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome Completo / Empresa */}
                  <div>
                    <label htmlFor="nome" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Nome Completo / Empresa *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Construtora Horizon / Eng. Carlos"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 transition-all"
                    />
                  </div>

                  {/* WhatsApp / Telefone */}
                  <div>
                    <label htmlFor="whatsapp" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      WhatsApp / Telefone *
                    </label>
                    <input
                      type="text"
                      id="whatsapp"
                      value={whatsapp}
                      onChange={handlePhoneChange}
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Setor de Interesse */}
                  <div>
                    <label htmlFor="setor" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Setor de Interesse *
                    </label>
                    <select
                      id="setor"
                      value={setor}
                      onChange={(e) => setSetor(e.target.value as SectorId)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 transition-all cursor-pointer"
                    >
                      <option value="automacoes">Automações Industriais e Prediais</option>
                      <option value="seguranca">Segurança Eletrônica</option>
                      <option value="monitoramento">Monitoramento / CFTV</option>
                      <option value="acesso">Controle de Acesso e Portaria Remota</option>
                      <option value="inteligentes">Soluções Inteligentes / Residencial High-End</option>
                      <option value="incendio">Alarme de Incêndio (SDAI)</option>
                      <option value="portoes">Manutenção de Portões</option>
                    </select>
                  </div>

                  {/* Porte do Empreendimento */}
                  <div>
                    <label htmlFor="porte" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Porte do Empreendimento
                    </label>
                    <select
                      id="porte"
                      value={porteProjeto}
                      onChange={(e) => setPorteProjeto(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 transition-all cursor-pointer"
                    >
                      <option value="pequeno">Pequeno Porte / Residencial (até 30 pontos)</option>
                      <option value="medio">Médio Porte / Condomínio (30 a 100 pontos)</option>
                      <option value="grande">Grande Porte / Torre Corporativa (100 a 300 pontos)</option>
                      <option value="corporativo">Corporativo / Industrial (+300 pontos / Múltiplas Unidades)</option>
                    </select>
                  </div>
                </div>

                {/* E-mail opcional */}
                <div>
                  <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    E-mail Corporativo <span className="font-normal text-slate-500">(Opcional para envio de proposta)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engenharia@empresa.com.br"
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 transition-all"
                  />
                </div>

                {/* Breve Descrição do Projeto */}
                <div>
                  <label htmlFor="detalhes" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Breve Descrição do Projeto
                  </label>
                  <textarea
                    id="detalhes"
                    rows={3}
                    value={detalhes}
                    onChange={(e) => setDetalhes(e.target.value)}
                    placeholder="Conte-nos sobre sua necessidade, prazo de entrega ou porte do empreendimento..."
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={directWhatsapp}
                      onChange={(e) => setDirectWhatsapp(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-900 border-white/20 text-[#00A3FF] focus:ring-[#00A3FF]"
                    />
                    Receber proposta detalhada via WhatsApp
                  </label>

                  <button
                    type="button"
                    onClick={onOpenCalculator}
                    className="text-xs text-[#00A3FF] hover:underline font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    Simulador
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00A3FF] hover:bg-[#0090E0] text-white py-3.5 px-6 rounded-sm text-xs font-bold uppercase tracking-widest glow-accent hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer mt-2"
                  id="btn-submit-hero"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Processando Projeto...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Solicitação de Orçamento
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* 4 Pillars Trust Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 text-center" id="diferenciais">
          <div className="glass-card p-4 rounded-xl border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-[#FF6B00] mb-1">18+ Anos</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300">Histórico Impecável</div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-[#00A3FF] mb-1">1.200+</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300">Projetos Executados</div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">100%</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300">Normas ABNT & SDAI</div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">SLA 24/7</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300">Plantão & Emergência</div>
          </div>
        </div>
      </div>
    </section>
  );
};
