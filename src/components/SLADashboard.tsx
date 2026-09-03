import React, { useState, useEffect } from 'react';
import { Server, Wifi, ShieldAlert, Cpu } from 'lucide-react';

export const SLADashboard = () => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050B14] py-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Server className="w-4 h-4 text-[#00A3FF]" />
            Status da Rede & Monitoramento
          </h3>
          <p className="text-xs text-slate-500 mt-2 font-mono">Painel de Disponibilidade Pública (SLA)</p>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Metric 1 */}
            <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-white/5">
              <div className="flex items-center gap-3">
                <VideoIcon className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono text-slate-300">Link CFTV (Guarulhos)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">100% OPERACIONAL</span>
                <div className={`w-2 h-2 rounded-full bg-emerald-400 ${blink ? 'opacity-100' : 'opacity-40'} transition-opacity`} />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-white/5">
              <div className="flex items-center gap-3">
                <Wifi className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono text-slate-300">Latência Portaria Remota</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">18ms</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-white/5">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono text-slate-300">Sistemas de Alarme (SDAI)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">ONLINE</span>
                <div className={`w-2 h-2 rounded-full bg-emerald-400 ${blink ? 'opacity-100' : 'opacity-40'} transition-opacity`} />
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-white/5">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono text-slate-300">Servidores de IA Analítica</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">PROCESSANDO</span>
                <div className={`w-2 h-2 rounded-full bg-emerald-400 ${!blink ? 'opacity-100' : 'opacity-40'} transition-opacity`} />
              </div>
            </div>

          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase tracking-wider">
            <span>Última atualização: Tempo Real</span>
            <span className="flex items-center gap-1.5"><ShieldAlert className="w-3 h-3 text-emerald-500" /> SLA Garantido 99.9%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

const VideoIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
)
