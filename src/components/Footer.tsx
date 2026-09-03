import React, { useState, useRef, useEffect } from 'react';
import { Lock, Phone, Mail, MapPin, Shield, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { CompanySettings, SectorInfo } from '../types';

interface FooterProps {
  settings: CompanySettings;
  sectors: SectorInfo[];
  onOpenAdmin: () => void;
  onSelectSector: (anchorId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  sectors,
  onOpenAdmin,
  onSelectSector
}) => {
  // Hidden admin sequence logic (Security through obscurity)
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (clickCount === 15) {
      onOpenAdmin();
      setClickCount(0); // reset
    }
  }, [clickCount, onOpenAdmin]);

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    
    // Reset click count if not clicked again within 1.5 seconds
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 1500);
  };

  return (
    <footer className="mt-20 bg-[#050B18] text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00A3FF]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-sm">
          {/* Col 1: Brand */}
          <div className="space-y-4 lg:col-span-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#00A3FF] flex items-center justify-center text-[#050B18] font-black text-lg glow-accent">
                P
              </div>
              <span className="text-xl font-black tracking-wider uppercase text-white">
                {settings.companyName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {settings.tagline}. Engenharia de sistemas de alta complexidade para as maiores construtoras, condomínios e indústrias do Brasil.
            </p>
            <div className="pt-2 text-xs text-slate-400 font-mono space-y-1">
              <div><strong className="text-slate-300">ART / CREA / AVCB:</strong> Responsabilidade Técnica Registrada para Automações e Projetos de Prevenção contra Incêndios (SDAI).</div>
            </div>
          </div>

          {/* Col 2: Sectors */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-4 pb-1 border-b border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#00A3FF] rounded-full"></span>
              Soluções Especializadas
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {sectors.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.anchorId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectSector(s.anchorId);
                    }}
                    className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#FF6B00]"></span>
                    {s.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div id="contato" className="lg:col-span-4">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-4 pb-1 border-b border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></span>
              Central de Atendimento
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-mono font-bold text-white">WhatsApp: {settings.phone}</div>
                  <div className="text-[11px] text-slate-400 font-mono">Atendimento comercial de Segunda a Sexta das 08h às 18h</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-[11px] text-slate-400 font-mono">Nosso Plantão Funciona de Seg a Seg 24/7</div>
                  <div className="font-mono font-bold text-slate-300">Suporte via WhatsApp:</div>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-white whitespace-nowrap">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    {settings.slaEmergencyPhone}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">Atendimento 24/7 para contratos ativos</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-slate-400 whitespace-nowrap">{settings.email}</div>
                  {settings.commercialEmail && (
                    <div className="text-slate-400 whitespace-nowrap">{settings.commercialEmail}</div>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">{settings.address}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality Commitment */}
          <div className="space-y-3 lg:col-span-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-4 pb-1 border-b border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              Padrão de Conformidade
            </h4>
            <div className="glass-panel p-3.5 rounded-xl border border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle className="w-4 h-4" />
                NBR 17240 / AVCB Bombeiros
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle className="w-4 h-4" />
                Normas de Telecom & Cabeamento
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle className="w-4 h-4" />
                Equipe NR-10 e NR-35 Certificada
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar strictly matching prompt */}
        <div className="pt-8 text-center text-xs text-slate-400 space-y-2">
          <p 
            className="font-medium text-slate-300 cursor-default"
            onClick={handleSecretClick}
          >
            &copy; {new Date().getFullYear()} proativatecnologies.com.br - Todos os direitos reservados.
          </p>
          <p className="text-slate-400 text-xs font-mono">
            Referência em Grandes Projetos e Construtoras — 18 Anos de Mercado
          </p>
        </div>
      </div>
    </footer>
  );
};
