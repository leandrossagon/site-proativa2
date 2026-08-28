import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Clock, 
  Lock, 
  Menu, 
  X, 
  Layers, 
  Calculator,
  ChevronDown
} from 'lucide-react';
import { CompanySettings, SectorInfo } from '../types';

interface HeaderProps {
  settings: CompanySettings;
  sectors: SectorInfo[];
  onOpenAdmin: () => void;
  onSelectSector: (sectorId: string) => void;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  sectors,
  onOpenAdmin,
  onSelectSector,
  onOpenCalculator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectorsDropdownOpen, setSectorsDropdownOpen] = useState(false);

  const handleSectorClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    setSectorsDropdownOpen(false);
    onSelectSector(anchorId);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050B18]/85 backdrop-blur-xl border-b border-white/10 transition-all">
      {/* Top Utility Bar */}
      <div className="bg-[#081020]/90 text-slate-300 text-xs py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
              Plantão SLA 24/7: {settings.slaEmergencyPhone}
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300 text-[11px]">
              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
              {settings.phone}
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-300 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-[#00A3FF]" />
              {settings.operatingHours}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-amber-300 hover:text-amber-200 font-bold transition-colors"
              id="header-btn-calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-[#FF6B00]" />
              Simulador de Projetos
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
              id="header-btn-admin"
              title="Acesso Administrativo ao Painel de Leads"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Painel Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-baseline gap-2 group focus:outline-none">
          <div className="flex flex-col sm:flex-row sm:items-baseline">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
              PROATIVA
            </span>
            <span className="mt-0.5 sm:mt-0 sm:ml-2 text-[8px] sm:text-[10px] uppercase tracking-widest text-[#00A3FF] font-bold sm:border-l sm:border-white/20 sm:pl-2">
              Soluções em Tecnologia e Automações
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-300">
          <a
            href="#"
            className="hover:text-[#00A3FF] transition-colors py-1"
          >
            Início
          </a>

          {/* Sectors Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSectorsDropdownOpen(!sectorsDropdownOpen)}
              onMouseEnter={() => setSectorsDropdownOpen(true)}
              className="flex items-center gap-1 hover:text-[#00A3FF] transition-colors py-1"
            >
              <Layers className="w-3.5 h-3.5 text-[#00A3FF]" />
              Soluções
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sectorsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {sectorsDropdownOpen && (
              <div 
                onMouseLeave={() => setSectorsDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-80 glass-panel-elevated rounded-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest px-3 py-1.5 border-b border-white/10">
                  7 Divisões de Engenharia
                </div>
                <div className="mt-1 space-y-1">
                  {sectors.map((sector) => (
                    <a
                      key={sector.id}
                      href={`#${sector.anchorId}`}
                      onClick={() => handleSectorClick(sector.anchorId)}
                      className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-[#00A3FF]/15 hover:text-[#00A3FF] border border-transparent hover:border-[#00A3FF]/30 transition-all"
                    >
                      <div className="font-bold text-xs text-white flex items-center justify-between">
                        <span>{sector.shortTitle}</span>
                        <span className="text-[9px] text-[#00A3FF] font-mono">{sector.badge}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{sector.tagline}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="#orcamento"
            className="hover:text-[#00A3FF] transition-colors py-1"
          >
            Orçamento
          </a>

          <a
            href="#cases-e-depoimentos"
            className="hover:text-[#00A3FF] transition-colors py-1"
          >
            Cases & Depoimentos
          </a>

          <a
            href="#diferenciais"
            className="hover:text-[#00A3FF] transition-colors py-1"
          >
            18 Anos
          </a>

          <a
            href="#contato"
            className="hover:text-[#00A3FF] transition-colors py-1"
          >
            Contato
          </a>

          {/* High Conversion CTA Button */}
          <a
            href="#orcamento"
            className="bg-[#00A3FF] hover:bg-[#0090E0] text-white px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-widest glow-accent hover:scale-[1.02] transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            Solicitar Orçamento
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <a
            href="#orcamento"
            className="bg-[#00A3FF] text-white px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider glow-accent"
          >
            Orçamento
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/10"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00A3FF]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1124] border-t border-white/10 px-4 py-4 space-y-3 shadow-2xl">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
            Navegação
          </div>
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-white hover:text-[#00A3FF]"
          >
            Início
          </a>
          <a
            href="#orcamento"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#00A3FF]"
          >
            Solicitar Orçamento Estratégico
          </a>
          <a
            href="#cases-e-depoimentos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-white hover:text-[#00A3FF]"
          >
            Depoimentos e Cases de Sucesso
          </a>
          
          <div className="pt-2 border-t border-white/10">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
              Soluções Especializadas
            </div>
            <div className="grid grid-cols-1 gap-1">
              {sectors.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.anchorId}`}
                  onClick={() => handleSectorClick(s.anchorId)}
                  className="py-1.5 px-2 rounded text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-[#00A3FF] flex items-center justify-between"
                >
                  <span>{s.shortTitle}</span>
                  <span className="text-[10px] font-mono text-[#00A3FF]">{s.badge}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full py-2 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-[#FF6B00]" />
              Abrir Simulador de Projetos
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-white/10"
            >
              <Lock className="w-3.5 h-3.5" />
              Acesso ao Painel Admin (Leads)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
