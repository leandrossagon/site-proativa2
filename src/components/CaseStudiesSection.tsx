import React, { useState } from 'react';
import { 
  Quote, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Cpu, 
  Fingerprint, 
  TrendingUp, 
  X, 
  Clock, 
  ExternalLink,
  Award,
  Layers
} from 'lucide-react';
import { TESTIMONIALS_DATA, CASE_STUDIES_DATA } from '../data/caseStudiesData';
import { CaseStudyItem, SectorId } from '../types';

interface CaseStudiesSectionProps {
  onTriggerQuote: (sectorId: SectorId) => void;
  onDirectWhatsApp: (sectorId: SectorId, sectorTitle: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onTriggerQuote,
  onDirectWhatsApp
}) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudyItem | null>(null);
  const [activeTab, setActiveTab] = useState<SectorId | 'todos'>('todos');

  const filteredCases = activeTab === 'todos' 
    ? CASE_STUDIES_DATA 
    : CASE_STUDIES_DATA.filter((c) => c.sectorId === activeTab);

  const getSectorIcon = (id: SectorId) => {
    switch (id) {
      case 'automacoes':
        return <Cpu className="w-5 h-5 text-[#00A3FF]" />;
      case 'seguranca':
      case 'monitoramento':
        return <ShieldCheck className="w-5 h-5 text-[#00A3FF]" />;
      case 'acesso':
        return <Fingerprint className="w-5 h-5 text-[#00A3FF]" />;
      default:
        return <Layers className="w-5 h-5 text-[#00A3FF]" />;
    }
  };

  return (
    <section id="cases-e-depoimentos" className="max-w-6xl mx-auto px-4 py-16 space-y-16 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/30 text-[10px] font-mono font-bold uppercase tracking-widest">
          <Award className="w-3.5 h-3.5 text-[#00A3FF]" />
          Validação Técnica & Resultados Comprovados
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Depoimentos e Cases de Sucesso
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Veja como a engenharia especializada da PROATIVA viabiliza segurança ininterrupta, conformidade normativa e alta economia operacional para condomínios, construtoras e indústrias.
        </p>
      </div>

      {/* 1. Client Testimonials Block */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            <Quote className="w-4 h-4 text-[#FF6B00]" />
            O que dizem os gestores de obras e síndicos
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            100% Clientes Ativos Satisfeitos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#00A3FF]/40 transition-all shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3FF]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#00A3FF]/10 transition-all"></div>

              <div className="space-y-4">
                {/* Rating stars & Category badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#00A3FF] bg-[#00A3FF]/10 border border-[#00A3FF]/20 px-2 py-0.5 rounded">
                    {testimonial.serviceCategory}
                  </span>
                </div>

                {/* Highlight Callout */}
                <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                  "{testimonial.highlight}"
                </div>

                {/* Quote Body */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center gap-3.5">
                <img
                  src={testimonial.photoUrl}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#00A3FF]/40 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {testimonial.role}
                  </p>
                  <p className="text-[10px] font-mono text-[#00A3FF] truncate">
                    {testimonial.company} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Detailed Engineering Case Studies Block */}
      <div className="space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF6B00]">
              Engenharia em Prática
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Estudos de Caso das Principais Divisões
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'todos'
                  ? 'bg-[#00A3FF] text-white glow-accent'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Todos os Cases
            </button>
            <button
              onClick={() => setActiveTab('automacoes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'automacoes'
                  ? 'bg-[#00A3FF] text-white glow-accent'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Automações
            </button>
            <button
              onClick={() => setActiveTab('seguranca')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'seguranca'
                  ? 'bg-[#00A3FF] text-white glow-accent'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Segurança & CFTV
            </button>
            <button
              onClick={() => setActiveTab('acesso')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'acesso'
                  ? 'bg-[#00A3FF] text-white glow-accent'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Controle de Acesso
            </button>
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <article
              key={caseItem.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-[#00A3FF]/50 transition-all shadow-xl group"
            >
              {/* Card Image Header with Badge */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={caseItem.heroImage}
                  alt={caseItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081020] via-transparent to-black/40"></div>
                
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-md">
                    {caseItem.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-bold flex items-center gap-1.5 text-[#00A3FF]">
                    <Building2 className="w-3.5 h-3.5" />
                    {caseItem.client}
                  </span>
                  <span className="text-[11px] font-mono text-slate-300">
                    {caseItem.location}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="inline-block text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {caseItem.badge}
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#00A3FF] transition-colors line-clamp-2">
                    {caseItem.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {caseItem.summary}
                  </p>
                </div>

                {/* Key Results Mini-Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                  {caseItem.results.slice(0, 2).map((res, rIdx) => (
                    <div key={rIdx} className="bg-slate-900/80 p-2.5 rounded-lg border border-white/10">
                      <div className="text-sm font-black text-emerald-400 font-mono">
                        {res.value}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Action Button */}
                <button
                  type="button"
                  onClick={() => setSelectedCase(caseItem)}
                  className="w-full mt-2 py-2.5 px-4 rounded-lg bg-white/5 hover:bg-[#00A3FF] text-white border border-white/15 hover:border-[#00A3FF] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer glow-accent"
                >
                  <span>Ver Estudo de Caso Completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 3. Detailed Case Study Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="glass-panel-elevated w-full max-w-4xl rounded-2xl shadow-2xl border border-white/15 overflow-hidden my-auto text-white">
            {/* Modal Header Bar */}
            <div className="bg-[#081020] text-white p-5 sm:p-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#00A3FF]/20 border border-[#00A3FF]/40 rounded-xl text-[#00A3FF] glow-accent">
                  {getSectorIcon(selectedCase.sectorId)}
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00A3FF]">
                    Estudo de Caso de Engenharia • {selectedCase.category}
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-white">
                    {selectedCase.client} ({selectedCase.location})
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Fechar Detalhes"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Title & Badge */}
              <div className="space-y-2">
                <div className="inline-block text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  {selectedCase.badge} • {selectedCase.timeline}
                </div>
                <h4 className="text-lg sm:text-2xl font-black text-white leading-tight">
                  {selectedCase.title}
                </h4>
              </div>

              {/* Verified Metrics Hero Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedCase.results.map((res, idx) => (
                  <div key={idx} className="glass-panel p-4 rounded-xl border border-emerald-500/30 text-center space-y-1">
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      {res.value}
                    </div>
                    <div className="text-xs font-bold text-white">
                      {res.label}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {res.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge vs Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Challenge */}
                <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-5 space-y-2.5">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    O Desafio do Cliente
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {selectedCase.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-[#00A3FF]/10 border border-[#00A3FF]/30 rounded-xl p-5 space-y-2.5">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A3FF] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00A3FF]"></span>
                    Solução de Engenharia PROATIVA
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {selectedCase.solution}
                  </p>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3 bg-slate-900/90 p-5 rounded-xl border border-white/10">
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                  Diferenciais Técnicos Embarcados
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCase.technicalSpecs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="bg-[#081020] p-4 sm:p-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Voltar à Página
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    const sector = selectedCase.sectorId;
                    setSelectedCase(null);
                    onDirectWhatsApp(sector, selectedCase.category);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Tirar Dúvida no WhatsApp
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const sector = selectedCase.sectorId;
                    setSelectedCase(null);
                    onTriggerQuote(sector);
                  }}
                  className="w-full sm:w-auto bg-[#00A3FF] hover:bg-[#0090E0] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest glow-accent flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Orçar Projeto Semelhante</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
