import React, { useState } from 'react';
import { 
  Calculator, 
  X, 
  Check, 
  Building2, 
  Factory, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  ArrowRight,
  Download
} from 'lucide-react';
import { SectorId, SectorInfo } from '../types';

interface ProjectCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  sectors: SectorInfo[];
  onApplyEstimateToQuote: (data: {
    setor: SectorId;
    detalhes: string;
    porteProjeto: 'pequeno' | 'medio' | 'grande' | 'corporativo';
  }) => void;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({
  isOpen,
  onClose,
  sectors,
  onApplyEstimateToQuote
}) => {
  const [propertyType, setPropertyType] = useState<'condominio' | 'industria' | 'comercial' | 'construtora'>('condominio');
  const [selectedSectorIds, setSelectedSectorIds] = useState<SectorId[]>(['acesso', 'monitoramento']);
  const [scalePoints, setScalePoints] = useState<number>(64);
  const [slaLevel, setSlaLevel] = useState<'essencial' | 'corporativo' | 'critico'>('corporativo');

  if (!isOpen) return null;

  const toggleSector = (id: SectorId) => {
    if (selectedSectorIds.includes(id)) {
      if (selectedSectorIds.length > 1) {
        setSelectedSectorIds(selectedSectorIds.filter((s) => s !== id));
      }
    } else {
      setSelectedSectorIds([...selectedSectorIds, id]);
    }
  };

  // Derive estimations
  const propertyLabels = {
    condominio: 'Condomínio Residencial Horizontal/Vertical',
    industria: 'Parque Fabril / Logístico',
    comercial: 'Edifício Comercial Triple A / Coworking',
    construtora: 'Construtora / Obra Nova em Execução'
  };

  const slaLabels = {
    essencial: 'SLA Essencial (Até 12h de resposta)',
    corporativo: 'SLA Corporativo (Até 4h de resposta + Preventiva Mensal)',
    critico: 'SLA Crítico 24/7 (Até 2h de resposta + Backup Imediato)'
  };

  const getScaleCategory = (): 'pequeno' | 'medio' | 'grande' | 'corporativo' => {
    if (scalePoints <= 32) return 'pequeno';
    if (scalePoints <= 100) return 'medio';
    if (scalePoints <= 250) return 'grande';
    return 'corporativo';
  };

  const estimatedCapexSavings = `${Math.min(35, 12 + selectedSectorIds.length * 4)}%`;
  const estimatedDowntimeReduction = 'Até 88%';

  const handleApply = () => {
    const primarySector = selectedSectorIds[0] || 'automacoes';
    const sectorNames = selectedSectorIds
      .map((id) => sectors.find((s) => s.id === id)?.shortTitle)
      .filter(Boolean)
      .join(', ');

    const summaryText = `[Simulação Proativa] Empreendimento: ${propertyLabels[propertyType]} | Escala: ~${scalePoints} pontos de controle | Módulos integrados: ${sectorNames} | Nível de Atendimento: ${slaLabels[slaLevel]}.`;

    onApplyEstimateToQuote({
      setor: primarySector,
      detalhes: summaryText,
      porteProjeto: getScaleCategory()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="glass-panel-elevated w-full max-w-3xl rounded-2xl shadow-2xl border border-white/15 overflow-hidden my-8 text-white">
        {/* Header */}
        <div className="bg-[#081020] text-white p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#00A3FF]/20 border border-[#00A3FF]/40 rounded-xl text-[#00A3FF] glow-accent">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00A3FF]">
                Dimensionamento Estratégico
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">Simulador de Matriz Tecnológica</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Step 1: Property Type */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              1. Tipo de Empreendimento
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'condominio', label: 'Condomínio Residencial', desc: 'Torres ou horizontal fechado' },
                { id: 'industria', label: 'Indústria / Logística', desc: 'Galpões, docas e pátios' },
                { id: 'comercial', label: 'Edifício Comercial', desc: 'Salas, lajes e escritórios' },
                { id: 'construtora', label: 'Construtora / Obra Nova', desc: 'Habite-se, SDAI e infra' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPropertyType(item.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    propertyType === item.id
                      ? 'border-[#00A3FF] bg-[#00A3FF]/15 text-white ring-1 ring-[#00A3FF] glow-accent'
                      : 'border-white/10 bg-slate-900/60 hover:border-white/25 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm text-white">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Sectors to integrate */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              2. Módulos de Engenharia Desejados (Multi-seleção)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {sectors.map((sec) => {
                const isSelected = selectedSectorIds.includes(sec.id);
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => toggleSector(sec.id)}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-semibold text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#00A3FF] bg-[#00A3FF] text-white glow-accent'
                        : 'border-white/10 bg-slate-900/60 text-slate-300 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span>{sec.shortTitle}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Scale / Point Count */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                3. Estimativa de Pontos de Controle (Câmeras, Portas, Sensores, Laços)
              </label>
              <span className="text-xs font-mono font-bold text-[#00A3FF] bg-[#00A3FF]/15 border border-[#00A3FF]/30 px-2.5 py-0.5 rounded-full">
                {scalePoints} pontos
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="350"
              step="4"
              value={scalePoints}
              onChange={(e) => setScalePoints(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00A3FF]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>8 pontos (Residencial)</span>
              <span>100 pontos (Condomínio Médio)</span>
              <span>350+ pontos (Corporativo)</span>
            </div>
          </div>

          {/* Step 4: SLA Level */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              4. Nível de Garantia Operacional (SLA)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'essencial', title: 'Essencial 12h', desc: 'Atendimento comercial padrão' },
                { id: 'corporativo', title: 'Corporativo 4h', desc: 'Preventiva mensal + Suporte rápido' },
                { id: 'critico', title: 'Crítico 24/7 (2h)', desc: 'Plantão imediato com peças de reposição' }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlaLevel(s.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    slaLevel === s.id
                      ? 'border-emerald-500 bg-emerald-500/15 text-white ring-1 ring-emerald-500 glow-emerald'
                      : 'border-white/10 bg-slate-900/60 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{s.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Result Box */}
          <div className="glass-panel p-5 rounded-xl border border-[#00A3FF]/30 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-emerald-400" />
              Arquitetura Recomendada pela Engenharia PROATIVA
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-white/10">
                <div className="text-xl font-black text-amber-300">{estimatedCapexSavings}</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Economia OPEX</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-white/10">
                <div className="text-xl font-black text-[#00A3FF]">{estimatedDowntimeReduction}</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Redução de Falhas</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-white/10 col-span-2 sm:col-span-1">
                <div className="text-xl font-black text-emerald-400">100% ART</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Conformidade AVCB</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              O projeto para <strong>{propertyLabels[propertyType]}</strong> com {scalePoints} pontos integrará os sistemas selecionados em topologia redundante e protocolo seguro unificado.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#081020] p-4 sm:p-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Fechar Simulador
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="w-full sm:w-auto bg-[#00A3FF] hover:bg-[#0090E0] text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest glow-accent flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Transferir Dados para o Orçamento</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
