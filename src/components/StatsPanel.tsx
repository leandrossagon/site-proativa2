import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Video, Award } from 'lucide-react';

export const StatsPanel = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    {
      label: 'Projetos Ativos Monitorados',
      value: '4.892+',
      icon: <Activity className="w-5 h-5 text-[#00A3FF]" />,
      color: 'text-[#00A3FF]'
    },
    {
      label: 'Falhas Evitadas (SDAI)',
      value: '156.4k',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      color: 'text-emerald-400'
    },
    {
      label: 'Câmeras em Operação 24/7',
      value: '12.000+',
      icon: <Video className="w-5 h-5 text-amber-400" />,
      color: 'text-amber-400'
    },
    {
      label: 'Anos de Engenharia',
      value: '18+',
      icon: <Award className="w-5 h-5 text-purple-400" />,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="bg-[#040810] border-y border-white/5 py-8 relative overflow-hidden">
      {/* Background Grid Pattern for SCADA look */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/5">
          {stats.map((stat, idx) => (
            <div key={idx} className="px-6 flex flex-col items-center justify-center text-center group">
              <div className="flex items-center gap-2 mb-2">
                {stat.icon}
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-400 transition-colors">
                  {stat.label}
                </span>
              </div>
              <div className={`text-3xl font-black font-mono tracking-tight ${stat.color} drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]`}>
                {mounted ? stat.value : '...'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
