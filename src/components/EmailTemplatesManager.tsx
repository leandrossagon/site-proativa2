import React, { useState } from 'react';
import { Mail, Copy, CheckCircle2, Send, Briefcase, Clock, FileText } from 'lucide-react';
import { LeadItem } from '../types';

interface EmailTemplatesManagerProps {
  leads: LeadItem[];
}

interface Template {
  id: string;
  name: string;
  icon: React.ReactNode;
  subject: string;
  body: string;
}

export const EmailTemplatesManager: React.FC<EmailTemplatesManagerProps> = ({ leads }) => {
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || null;

  const replaceVariables = (text: string) => {
    if (!selectedLead) return text;
    return text
      .replace(/\[Nome do Cliente\]/g, selectedLead.nome)
      .replace(/\[Setor de Interesse\]/g, selectedLead.setor.replace('_', ' ').toUpperCase())
      .replace(/\[Empresa\/Condomínio\]/g, selectedLead.nome); // Assuming name could be company name for B2B
  };

  const templates: Template[] = [
    {
      id: 'template-1',
      name: 'Contato Inicial (SLA de 1h)',
      icon: <Clock className="w-4 h-4" />,
      subject: 'PROATIVA Tecnologies - Confirmação de Solicitação de Engenharia',
      body: `Olá [Nome do Cliente],

Recebemos sua solicitação de análise técnica para o escopo de [Setor de Interesse] através do nosso portal.

A PROATIVA Tecnologies atua há mais de 18 anos viabilizando infraestrutura de automação e segurança eletrônica de alta complexidade, sempre com ART (CREA), projetos de Alarmes de Incêndio (SDAI) e adequações de conformidade para laudos do Corpo de Bombeiros (AVCB).

Para que nossa engenharia possa dimensionar a solução exata para sua operação, gostaríamos de agendar uma breve call de alinhamento técnico ou uma visita preliminar gratuita (sem compromisso).

Qual seria sua disponibilidade para conversarmos amanhã, nos períodos da manhã ou tarde?

Atenciosamente,
Equipe de Engenharia Comercial
PROATIVA Tecnologies | Inovação e Segurança B2B`
    },
    {
      id: 'template-2',
      name: 'Envio de Proposta Comercial',
      icon: <FileText className="w-4 h-4" />,
      subject: 'Proposta Técnico-Comercial - Sistema de [Setor de Interesse]',
      body: `Prezado(a) [Nome do Cliente],

Com base no levantamento realizado em sua operação, apresentamos em anexo o Projeto e a Proposta Comercial referente à implantação do sistema de [Setor de Interesse].

Nossa proposta foi estruturada com foco em três pilares fundamentais para o sucesso do seu empreendimento:
1. Eliminação de falhas de segurança e mitigação de riscos;
2. Redução escalável de custos operacionais (Payback estimado em até 12 meses);
3. Garantia integral de funcionamento amparada por nosso contrato de SLA com tempo de resposta de 2 horas.

A documentação anexa detalha o cronograma de implantação, os hardwares enterprise-grade selecionados e a matriz de investimentos.

Fico à disposição para uma reunião de apresentação do escopo. 

Atenciosamente,
Departamento de Engenharia
PROATIVA Tecnologies`
    },
    {
      id: 'template-3',
      name: 'Follow-up de Fechamento',
      icon: <Briefcase className="w-4 h-4" />,
      subject: 'Próximos Passos - Infraestrutura PROATIVA',
      body: `Olá [Nome do Cliente],

Gostaria de verificar se você conseguiu analisar a arquitetura de [Setor de Interesse] que estruturamos para a sua planta.

Sabemos que a escolha da tecnologia impacta diretamente na segurança e na economia a longo prazo da sua operação. Gostaria de entender se restou alguma dúvida técnica ou necessidade de adequação na matriz comercial para avançarmos com a emissão do contrato e da ART.

Caso necessário, podemos envolver nosso Arquiteto de Soluções em uma rápida conferência para sanar qualquer ponto em aberto.

Aguardo seu retorno.

Cordialmente,
Equipe Comercial
PROATIVA Tecnologies`
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenMailClient = (subject: string, body: string) => {
    if (!selectedLead || !selectedLead.email) {
      alert('Este lead não possui um e-mail cadastrado.');
      return;
    }
    const mailtoLink = `mailto:${selectedLead.email}?subject=${encodeURIComponent(replaceVariables(subject))}&body=${encodeURIComponent(replaceVariables(body))}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-slate-900 border border-[#00A3FF]/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-tight">Templates de E-mail Corporativo</h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Estratégias de Growth e Comunicação B2B de Alta Conversão
            </p>
          </div>
        </div>
      </div>

      {/* Lead Selector */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Selecione um Lead para Personalizar as Variáveis
        </label>
        <select
          value={selectedLeadId}
          onChange={(e) => setSelectedLeadId(e.target.value)}
          className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00A3FF] transition-colors appearance-none"
        >
          <option value="">-- Selecione um Lead --</option>
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>
              {lead.nome} ({lead.setor}) {lead.email ? `- ${lead.email}` : ''}
            </option>
          ))}
        </select>
        {!selectedLead && (
          <p className="text-[10px] text-amber-400 mt-2 flex items-center gap-1 font-mono">
            * Variáveis como [Nome do Cliente] e [Setor] serão exibidas sem substituição.
          </p>
        )}
      </div>

      {/* Templates Grid */}
      <div className="space-y-4">
        {templates.map((template) => (
          <div key={template.id} className="bg-slate-800 border border-white/5 rounded-xl overflow-hidden transition-colors hover:border-white/10">
            <div className="bg-slate-800/80 px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#00A3FF]">{template.icon}</span>
                <h4 className="text-sm font-bold text-white">{template.name}</h4>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(replaceVariables(template.body), template.id)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  {copiedId === template.id ? (
                    <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Copiado</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copiar Texto</>
                  )}
                </button>
                <button
                  onClick={() => handleOpenMailClient(template.subject, template.body)}
                  disabled={!selectedLead?.email}
                  className="px-3 py-1.5 bg-[#00A3FF]/10 text-[#00A3FF] hover:bg-[#00A3FF] hover:text-white rounded border border-[#00A3FF]/30 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  title={!selectedLead?.email ? 'Selecione um lead com e-mail' : 'Abrir cliente de e-mail'}
                >
                  <Send className="w-3.5 h-3.5" />
                  Enviar E-mail
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-bold">Assunto:</span>
                <span className="text-white font-mono">{replaceVariables(template.subject)}</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-lg text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans border border-black/50 shadow-inner">
                {replaceVariables(template.body)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
