import React from 'react';
import { CompanySettings } from '../types';

interface HeroSectionProps {
  settings: CompanySettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  return (
    <section className="relative text-white pt-10 pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
      <div className="flex justify-center mb-8 relative">
        <img 
          src="/loogo2.png" 
          alt="PROATIVA Tecnologies" 
          className="relative z-10 h-56 sm:h-[340px] object-contain brightness-[0.9] contrast-[1.15] [image-rendering:-webkit-optimize-contrast]" 
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

        {/* 4 Pillars Trust Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-center" id="diferenciais">
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
