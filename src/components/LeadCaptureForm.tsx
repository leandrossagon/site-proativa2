import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Send, ArrowRight, Building, Home, ArrowLeft, Calendar, Mail } from 'lucide-react';
import { SectorId, LeadItem, CompanySettings } from '../types';

interface LeadCaptureFormProps {
  settings: CompanySettings;
  preselectedSector?: SectorId;
  onSubmitLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => void;
  onOpenCalculator: () => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  settings,
  preselectedSector,
  onSubmitLead,
  onOpenCalculator
}) => {
  const [profile, setProfile] = useState<'b2b' | 'b2c' | null>(null);

  // Common fields
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  
  // B2B specific
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [setor, setSetor] = useState<SectorId | string>(preselectedSector || 'automacoes');
  const [porteProjeto, setPorteProjeto] = useState<'pequeno' | 'medio' | 'grande' | 'corporativo'>('medio');
  const [detalhes, setDetalhes] = useState('');

  // B2C specific
  const [tipoImovel, setTipoImovel] = useState('Casa Padrão');
  const [necessidadeB2C, setNecessidadeB2C] = useState('Câmeras de Segurança (CFTV)');
  const [necessidadeExtra, setNecessidadeExtra] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadItem | null>(null);
  const [intentLevel, setIntentLevel] = useState<'high' | 'low' | 'support' | null>(null);
  const [directWhatsapp, setDirectWhatsapp] = useState(true);

  // Scheduler state
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);
  const [scheduledTime, setScheduledTime] = useState<string | null>(null);

  React.useEffect(() => {
    if (preselectedSector) {
      setSetor(preselectedSector);
      // If a sector was pre-selected via navigation, maybe assume B2B so they don't have to click again?
      // Actually, better let them choose or just stick to the flow. We won't auto-set profile.
    }
  }, [preselectedSector]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
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
    if (profile === 'b2b' && !empresa.trim()) return; // Empresa mandatory for B2B

    setIsSubmitting(true);

    let leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'>;
    const textToAnalyze = profile === 'b2b' ? detalhes : necessidadeExtra;
    const lowerText = textToAnalyze.toLowerCase();
    
    // Heuristic AI rules for Lead Triage
    const supportKeywords = ['manutenç', 'manutenc', 'parado', 'quebrad', 'suporte', 'assistência', 'assistencia', 'técnica', 'tecnica', 'falha', 'erro', 'problema'];
    const highIntentKeywords = ['visita', 'custo', 'orçament', 'orcament', 'preço', 'preco', 'valor', 'urgente', 'contratar', 'projeto', 'comprar', 'instala', 'novo'];
    
    const isSupportRequest = supportKeywords.some(kw => lowerText.includes(kw));
    const hasHighIntentWords = highIntentKeywords.some(kw => lowerText.includes(kw));
    
    let calculatedIntent: 'high' | 'low' | 'support' = 'low';
    
    if (isSupportRequest) {
      calculatedIntent = 'support';
    } else if (hasHighIntentWords) {
      calculatedIntent = 'high';
    } else if (profile === 'b2b' && (porteProjeto === 'grande' || porteProjeto === 'corporativo')) {
      calculatedIntent = 'high';
    }

    if (profile === 'b2b') {
      leadData = {
        perfil: 'b2b',
        nome,
        empresa,
        whatsapp,
        email: email.trim() || undefined,
        setor,
        porteProjeto,
        detalhes: detalhes.trim() || 'Solicitação de orçamento corporativo.'
      };
    } else {
      leadData = {
        perfil: 'b2c',
        nome,
        whatsapp,
        tipoImovel,
        necessidadeB2C,
        setor: 'residencial_comercial', // Custom identifier
        porteProjeto: 'pequeno',
        detalhes: necessidadeExtra.trim() || `Interesse em: ${necessidadeB2C}`
      };
    }

    setTimeout(() => {
      onSubmitLead(leadData);
      setIsSubmitting(false);
      setIntentLevel(calculatedIntent);
      setSubmittedLead({
        id: `PR-${Math.floor(1000 + Math.random() * 9000)}`,
        ...leadData,
        createdAt: new Date().toISOString(),
        status: 'novo'
      });
    }, 600);
  };

  const getWhatsAppMessage = () => {
    let text = '';
    if (submittedLead?.perfil === 'b2b') {
      text = `*PROATIVA - Projeto Corporativo*%0A%0A` +
        `*Responsável:* ${nome}%0A` +
        `*Empresa:* ${empresa}%0A` +
        `*WhatsApp:* ${whatsapp}%0A` +
        `*Setor Técnico:* ${setor}%0A` +
        `*Porte:* ${porteProjeto.toUpperCase()}%0A` +
        `*Escopo:* ${detalhes || 'A definir.'}%0A%0A` +
        `_Via Portal B2B_`;
    } else {
      text = `*PROATIVA - Orçamento Rápido*%0A%0A` +
        `*Cliente:* ${nome}%0A` +
        `*WhatsApp:* ${whatsapp}%0A` +
        `*Imóvel:* ${tipoImovel}%0A` +
        `*Necessidade:* ${necessidadeB2C}%0A` +
        `*Detalhes:* ${necessidadeExtra || 'Sem detalhes extras.'}%0A%0A` +
        `_Via Atendimento B2C_`;
    }
    return `https://wa.me/${settings.whatsapp}?text=${text}`;
  };

  const getEmailMailto = () => {
    let subject = '';
    let body = '';
    let targetEmail = 'comercial-proativa@protonmail.com';

    // Heuristic Email Routing Logic
    // If it's B2B and asks for 'manutenção', 'suporte', 'parado', 'quebrado', route to support.
    const textToAnalyze = (submittedLead?.perfil === 'b2b' ? detalhes : necessidadeExtra).toLowerCase();
    const supportKeywords = ['manutenç', 'manutenc', 'parado', 'quebrad', 'suporte', 'assistência', 'assistencia', 'técnica', 'tecnica'];
    const isSupportRequest = supportKeywords.some(kw => textToAnalyze.includes(kw));

    if (isSupportRequest) {
      targetEmail = 'suporte-proativa@protonmail.com';
    }

    if (submittedLead?.perfil === 'b2b') {
      subject = `[Solicitação B2B] ${empresa} - ${nome}`;
      body = `Detalhes do Contato:\n\nResponsável: ${nome}\nEmpresa: ${empresa}\nWhatsApp: ${whatsapp}\nEmail: ${email}\nSetor: ${setor}\nPorte: ${porteProjeto}\n\nMensagem/Escopo:\n${detalhes || 'N/A'}`;
    } else {
      subject = `[Solicitação B2C] ${nome} - ${tipoImovel}`;
      body = `Detalhes do Contato:\n\nCliente: ${nome}\nWhatsApp: ${whatsapp}\nImóvel: ${tipoImovel}\nNecessidade: ${necessidadeB2C}\n\nMensagem:\n${necessidadeExtra || 'N/A'}`;
    }
    return `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-3xl mx-auto glass-panel-elevated rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-white/15 relative overflow-hidden my-8" id="orcamento">
      {/* Subtle accent corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3FF]/15 rounded-full blur-2xl pointer-events-none"></div>

      {submittedLead ? (
        <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4 glow-emerald">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Solicitação Recebida com Sucesso!
          </h3>
          <p className="text-sm text-slate-300 mb-4 max-w-md mx-auto">
            Obrigado, <strong>{submittedLead.nome}</strong>. Nossa equipe foi notificada e entrará em contato rapidamente.
          </p>
          
          <div className="bg-slate-900/90 border border-white/10 rounded-xl p-4 mb-6 text-left text-xs text-slate-300 space-y-1 font-mono max-w-sm mx-auto">
            <div><span className="text-[#00A3FF] font-semibold">Protocolo:</span> {submittedLead.id}</div>
            <div><span className="text-[#00A3FF] font-semibold">Perfil:</span> {submittedLead.perfil === 'b2b' ? 'Corporativo' : 'Residencial / Comercial'}</div>
            <div><span className="text-emerald-400 font-semibold">Status:</span> {intentLevel === 'high' ? 'Prioridade Alta (Orçamento)' : intentLevel === 'support' ? 'Prioridade Alta (Suporte Técnico)' : 'Triagem Normal (Informativo)'}</div>
            <div><span className="text-emerald-400 font-semibold">Previsão de Retorno:</span> {intentLevel === 'support' ? 'Em até 30 minutos (SLA Crítico)' : 'Em até 2 horas úteis'}</div>
          </div>

          {intentLevel === 'high' && (
            <div className="mb-6 p-4 bg-slate-950/50 border border-[#00A3FF]/20 rounded-xl max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-500">
              <h4 className="text-[#00A3FF] font-bold text-sm mb-3 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Agendar Vistoria Técnica / Call
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Como seu projeto possui alta prioridade, sugerimos agendar uma vistoria técnica gratuita.
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setScheduledDate('Amanhã')}
                  className={`py-2 rounded border text-xs font-semibold transition-colors ${scheduledDate === 'Amanhã' ? 'bg-[#0052CC] border-[#00A3FF] text-white' : 'border-white/10 text-slate-300 hover:bg-white/5'}`}
                >
                  Amanhã
                </button>
                <button
                  type="button"
                  onClick={() => setScheduledDate('Próxima Semana')}
                  className={`py-2 rounded border text-xs font-semibold transition-colors ${scheduledDate === 'Próxima Semana' ? 'bg-[#0052CC] border-[#00A3FF] text-white' : 'border-white/10 text-slate-300 hover:bg-white/5'}`}
                >
                  Próxima Semana
                </button>
              </div>

              {scheduledDate && (
                <div className="flex justify-center gap-2 mb-4 animate-in fade-in zoom-in duration-300">
                  {['09:00', '14:00', '16:00'].map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setScheduledTime(time)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${scheduledTime === time ? 'bg-emerald-600 border-emerald-400 text-white' : 'border-white/10 text-slate-300 hover:bg-white/5'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {intentLevel === 'high' ? (
              <a
                href={scheduledDate && scheduledTime 
                  ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`*PROATIVA - Agendamento de Vistoria*\n\nProtocolo: ${submittedLead.id}\nSolicitante: ${nome}\nEmpresa: ${empresa || 'N/A'}\n\n*Agendamento Sugerido:*\nData: ${scheduledDate}\nHorário: ${scheduledTime}\n\nPor favor, confirmem o agendamento desta visita técnica gratuita.`)}`
                  : getWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider glow-emerald transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {scheduledDate && scheduledTime ? 'Confirmar Visita no WhatsApp' : 'Falar com Vendas Imediatamente'}
              </a>
            ) : intentLevel === 'support' ? (
              <a
                href={getEmailMailto()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider glow-red transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Acionar Equipe de Suporte
              </a>
            ) : (
              <a
                href={getEmailMailto()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0052CC] hover:bg-[#004bb8] text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Enviar Cópia por E-mail
              </a>
            )}
            <button
              onClick={() => {
                setSubmittedLead(null);
                setProfile(null);
                setNome('');
                setWhatsapp('');
                setEmpresa('');
                setDetalhes('');
                setNecessidadeExtra('');
              }}
              className="px-5 py-3 rounded-lg font-semibold text-xs uppercase tracking-wider border border-white/20 text-slate-300 hover:bg-white/5 transition-colors"
            >
              Novo Orçamento
            </button>
          </div>
        </div>
      ) : !profile ? (
        <div className="animate-in fade-in duration-300">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/30 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
              Triagem de Atendimento
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Selecione o seu perfil para um atendimento direcionado:
            </h3>
            <p className="text-sm text-slate-400">
              Isso nos ajuda a conectar você ao time de engenharia correto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* B2B Card */}
            <button
              onClick={() => setProfile('b2b')}
              className="group text-left p-6 rounded-xl border border-white/10 bg-slate-900/50 hover:bg-[#00A3FF]/10 hover:border-[#00A3FF]/50 hover:shadow-[0_0_20px_rgba(0,163,255,0.15)] transition-all cursor-pointer flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-[#00A3FF]/20 text-[#00A3FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#00A3FF] transition-colors">
                Empresas, Condomínios e Projetos Corporativos
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sou administrador de condomínios, síndico, construtora, startup ou corporação buscando projetos técnicos.
              </p>
            </button>

            {/* B2C Card */}
            <button
              onClick={() => setProfile('b2c')}
              className="group text-left p-6 rounded-xl border border-white/10 bg-slate-900/50 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all cursor-pointer flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Residências, Lojas e Alto Padrão
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sou cliente final com projetos para casas, lojas de bairro, escritórios locais ou oficinas.
              </p>
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in slide-in-from-right-4 fade-in duration-300">
          <button
            onClick={() => setProfile(null)}
            className="mb-6 flex items-center gap-2 text-xs text-slate-400 hover:text-white uppercase tracking-wider font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Perfis
          </button>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              {profile === 'b2b' ? (
                <>
                  <Building className="w-6 h-6 text-[#00A3FF]" />
                  Orçamento Corporativo
                </>
              ) : (
                <>
                  <Home className="w-6 h-6 text-emerald-400" />
                  Orçamento Rápido
                </>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {profile === 'b2b'
                ? 'Preencha os dados técnicos para acionarmos nossos engenheiros.'
                : 'Informações simples para conectarmos você ao nosso time de atendimento.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {profile === 'b2b' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Responsável pelo Projeto *
                    </label>
                    <input maxLength={100}
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Eng. Carlos Silva"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Empresa / Condomínio *
                    </label>
                    <input maxLength={100}
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Ex: Construtora Horizon"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      WhatsApp Corporativo *
                    </label>
                    <input maxLength={100}
                      type="text"
                      value={whatsapp}
                      onChange={handlePhoneChange}
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      E-mail Corporativo *
                    </label>
                    <input maxLength={100}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="engenharia@empresa.com.br"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Solução de Engenharia *
                    </label>
                    <select
                      value={setor}
                      onChange={(e) => setSetor(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-sm text-white focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none"
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
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Porte do Empreendimento
                    </label>
                    <select
                      value={porteProjeto}
                      onChange={(e) => setPorteProjeto(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-sm text-white focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none"
                    >
                      <option value="medio">Médio Porte / Condomínio (30 a 100 pontos)</option>
                      <option value="grande">Grande Porte / Torre Corporativa (100 a 300 pontos)</option>
                      <option value="corporativo">Corporativo / Industrial (+300 pontos)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Briefing do Projeto / Escopo
                  </label>
                  <textarea maxLength={2000}
                    rows={3}
                    value={detalhes}
                    onChange={(e) => setDetalhes(e.target.value)}
                    placeholder="Descreva o escopo técnico, necessidades do edital ou prazos..."
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] outline-none resize-none"
                  ></textarea>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Seu Nome *
                    </label>
                    <input maxLength={100}
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Como podemos te chamar?"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Seu WhatsApp *
                    </label>
                    <input maxLength={100}
                      type="text"
                      value={whatsapp}
                      onChange={handlePhoneChange}
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Onde será a instalação? *
                    </label>
                    <select
                      value={tipoImovel}
                      onChange={(e) => setTipoImovel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Casa Padrão (Rua/Condomínio)">Casa (Rua ou Condomínio)</option>
                      <option value="Residência Alto Padrão">Residência de Alto Padrão</option>
                      <option value="Loja Comercial">Loja Comercial</option>
                      <option value="Oficina / Galpão">Oficina ou Galpão</option>
                      <option value="Outro">Outro tipo de imóvel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      O que você precisa hoje? *
                    </label>
                    <select
                      value={necessidadeB2C}
                      onChange={(e) => setNecessidadeB2C(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Câmeras de Segurança (CFTV)">Câmeras de Segurança (CFTV)</option>
                      <option value="Sistema de Alarme">Sistema de Alarme</option>
                      <option value="Fechadura Digital / Controle de Acesso">Fechadura Digital / Controle de Acesso</option>
                      <option value="Automação Residencial (Casa Inteligente)">Automação Residencial (Casa Inteligente)</option>
                      <option value="Manutenção de Portão Automático">Manutenção de Portão Automático</option>
                      <option value="Rede Wi-Fi / Infraestrutura">Rede Wi-Fi / Infraestrutura</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Descreva sua necessidade (Opcional)
                  </label>
                  <textarea maxLength={2000}
                    rows={2}
                    value={necessidadeExtra}
                    onChange={(e) => setNecessidadeExtra(e.target.value)}
                    placeholder="Ex: Preciso instalar 4 câmeras na minha loja..."
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
                  ></textarea>
                </div>
              </>
            )}

            <div className="flex items-center justify-between pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                <input maxLength={100}
                  type="checkbox"
                  checked={directWhatsapp}
                  onChange={(e) => setDirectWhatsapp(e.target.checked)}
                  className={`w-4 h-4 rounded bg-slate-900 border-white/20 ${profile === 'b2b' ? 'text-[#00A3FF] focus:ring-[#00A3FF]' : 'text-emerald-500 focus:ring-emerald-500'}`}
                />
                Desejo receber o retorno rápido via WhatsApp
              </label>

              {profile === 'b2b' && (
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="text-xs text-[#00A3FF] hover:underline font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  Simulador de Projetos
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-4 px-6 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer mt-2 ${
                profile === 'b2b' 
                  ? 'bg-[#00A3FF] hover:bg-[#0090E0] glow-accent' 
                  : 'bg-emerald-600 hover:bg-emerald-500 glow-emerald'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processando...
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Solicitação {profile === 'b2b' ? 'Corporativa' : ''}
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
