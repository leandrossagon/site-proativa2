import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Video, 
  Fingerprint, 
  Home, 
  Server, 
  Flame, 
  Wrench,
  ArrowRight
} from 'lucide-react';
import { SectorInfo } from '../types';

interface SectorGridProps {
  sectors: SectorInfo[];
  onSelectSector: (anchorId: string) => void;
}

export const SectorGrid: React.FC<SectorGridProps> = ({ sectors, onSelectSector }) => {
  const getSectorIcon = (sector: SectorInfo) => {
    switch (sector.id) {
      case 'automacoes':
        return <Cpu className="w-10 h-10 text-[#00A3FF] group-hover:scale-110 transition-transform" />;
      case 'seguranca':
        return <ShieldCheck className="w-10 h-10 text-[#00A3FF] group-hover:scale-110 transition-transform" />;
      case 'monitoramento':
        return <Video className="w-10 h-10 text-[#00A3FF] group-hover:scale-110 transition-transform" />;
      case 'acesso':
        return <Fingerprint className="w-10 h-10 text-[#00A3FF] group-hover:scale-110 transition-transform" />;
      case 'inteligentes':
        return <Home className="w-10 h-10 text-[#00A3FF] group-hover:scale-110 transition-transform" />;
      case 'incendio':
        return (
          <div className="relative inline-block">
            <Server className="w-10 h-10 text-[#00A3FF] group-hover:scale-110 transition-transform" />
            <Flame className="w-6 h-6 text-[#FF6B00] absolute -bottom-1 -right-2 fill-[#FF6B00]/20 animate-pulse" />
          </div>
        );
      case 'portoes':
        return <Wrench className="w-10 h-10 text-[#00A3FF] group-hover:scale-110 transition-transform" />;
      default:
        return <Cpu className="w-10 h-10 text-[#00A3FF]" />;
    }
  };

  return (
    <main className="max-w-7xl mx-auto my-16 px-4 text-center">
      <div className="max-w-3xl mx-auto mb-12">
        <div className="inline-block px-3 py-1 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/30 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
          Arquitetura Integrada
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight uppercase">
          7 Soluções Especializadas de Engenharia
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Selecione uma divisão técnica para acessar as especificações, conformidades normativas e modelos de implantação:
        </p>
      </div>

      {/* Grid of 7 Specialized Solutions */}
      <div className="flex flex-wrap justify-center gap-5">
        {sectors.map((sector) => (
          <a
            key={sector.id}
            href={`#${sector.anchorId}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectSector(sector.anchorId);
            }}
            className="group glass-card rounded-xl p-6 w-full sm:w-[260px] cursor-pointer border border-white/10 hover:border-[#00A3FF]/60 hover:bg-[#00A3FF]/10 hover:shadow-[0_0_25px_rgba(0,163,255,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between text-center relative overflow-hidden"
            id={`btn-sector-${sector.id}`}
          >
            {/* Top Indicator Badge */}
            <div className="mb-4">
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 group-hover:border-[#00A3FF]/40 group-hover:text-[#00A3FF] transition-colors">
                {sector.badge}
              </span>
            </div>

            {/* Icon Wrapper */}
            <div className="mb-4 flex items-center justify-center h-14">
              {getSectorIcon(sector)}
            </div>

            {/* Title & Description */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-base font-bold text-white group-hover:text-[#00A3FF] transition-colors tracking-tight">
                {sector.shortTitle}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 font-normal leading-relaxed">
                {sector.tagline}
              </div>
            </div>

            {/* Bottom Arrow Indicator */}
            <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-center text-xs font-bold uppercase tracking-wider text-[#00A3FF] opacity-80 group-hover:opacity-100 transition-all">
              <span>Especificações</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </main>
  );
};
