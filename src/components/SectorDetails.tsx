import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Video, 
  Fingerprint, 
  Home, 
  Flame, 
  Wrench, 
  CheckCircle2, 
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Layers
} from 'lucide-react';
import { SectorInfo, SectorId } from '../types';

interface SectorDetailsProps {
  sectors: SectorInfo[];
  onTriggerQuote: (sectorId: SectorId) => void;
  onDirectWhatsApp: (sectorId: SectorId, sectorTitle: string) => void;
}

export const SectorDetails: React.FC<SectorDetailsProps> = ({
  sectors,
  onTriggerQuote,
  onDirectWhatsApp
}) => {
  const getSectorIcon = (id: SectorId) => {
    switch (id) {
      case 'automacoes':
        return <Cpu className="w-7 h-7 text-[#00A3FF]" />;
      case 'seguranca':
        return <ShieldCheck className="w-7 h-7 text-[#00A3FF]" />;
      case 'monitoramento':
        return <Video className="w-7 h-7 text-[#00A3FF]" />;
      case 'acesso':
        return <Fingerprint className="w-7 h-7 text-[#00A3FF]" />;
      case 'inteligentes':
        return <Home className="w-7 h-7 text-[#00A3FF]" />;
      case 'incendio':
        return <Flame className="w-7 h-7 text-[#FF6B00]" />;
      case 'portoes':
        return <Wrench className="w-7 h-7 text-[#00A3FF]" />;
      default:
        return <Layers className="w-7 h-7 text-[#00A3FF]" />;
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-block px-3 py-1 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/30 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
          Engenharia de Alta Performance
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 uppercase tracking-tight">
          Detalhamento Técnico das Divisões
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
          Conheça os diferenciais construtivos e as tecnologias embarcadas em cada uma de nossas frentes de atuação:
        </p>
      </div>

      {sectors.map((sector, index) => {
        const isFire = sector.id === 'incendio';

        return (
          <article
            key={sector.id}
            id={sector.anchorId}
            className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/10 text-left scroll-mt-24 transition-all hover:border-[#00A3FF]/40 shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative glow */}
            <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none ${isFire ? 'bg-[#FF6B00]/10' : 'bg-[#00A3FF]/10'}`}></div>

            {/* Header of Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3.5">
                <div className={`p-3 rounded-xl border ${isFire ? 'bg-orange-500/10 border-orange-500/30' : 'bg-[#00A3FF]/10 border-[#00A3FF]/30'}`}>
                  {getSectorIcon(sector.id)}
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                    Divisão 0{index + 1} • {sector.badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {sector.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[11px] font-mono font-bold text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  {sector.tagline}
                </span>
              </div>
            </div>

            {/* Description Text */}
            <div className="prose max-w-none text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>{sector.fullDescription}</p>
            </div>

            {/* Grid of Key Features & Technical Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              {/* Feature List (Left side) */}
              <div className="lg:col-span-7">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                  Principais Vantagens e Entregáveis
                </h4>
                <ul className="space-y-3">
                  {sector.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm text-slate-200 font-medium leading-normal">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  <strong className="text-[#00A3FF] font-semibold">Indicado para: </strong>
                  {sector.recommendedAudience}
                </div>
              </div>

              {/* Specs Box (Right side) */}
              <div className="lg:col-span-5 bg-slate-900/90 rounded-xl p-5 border border-white/10 shadow-inner">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 pb-2 border-b border-white/10 flex items-center justify-between">
                  <span>Especificações Técnicas</span>
                  <span className="text-[9px] text-[#00A3FF]">ISO / ABNT</span>
                </h4>
                <div className="space-y-3">
                  {sector.specs.map((spec, sIndex) => (
                    <div key={sIndex} className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono">{spec.label}</span>
                      <span className="font-bold text-white text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-medium text-center sm:text-left font-mono">
                Visita técnica e dimensionamento preliminar com ART registrada.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onDirectWhatsApp(sector.id, sector.title)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Dúvida Técnica
                </button>

                <button
                  onClick={() => onTriggerQuote(sector.id)}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isFire ? 'bg-[#FF6B00] hover:bg-[#E05E00] glow-orange' : 'bg-[#00A3FF] hover:bg-[#0090E0] glow-accent'
                  }`}
                  id={`btn-cta-${sector.id}`}
                >
                  <span>{sector.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};
