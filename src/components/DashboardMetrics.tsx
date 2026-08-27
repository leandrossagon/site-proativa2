import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { LeadItem, SectorInfo } from '../types';

interface DashboardMetricsProps {
  leads: LeadItem[];
  sectors: SectorInfo[];
}

const STATUS_COLORS: Record<string, string> = {
  novo: '#00A3FF',
  em_analise: '#F59E0B',
  orcamento_enviado: '#8B5CF6',
  fechado: '#10B981',
  arquivado: '#64748B'
};

const STATUS_LABELS: Record<string, string> = {
  novo: 'Novo',
  em_analise: 'Em Contato',
  orcamento_enviado: 'Negociação',
  fechado: 'Finalizado',
  arquivado: 'Arquivado'
};

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ leads, sectors }) => {
  // Calculate Funnel Data
  const funnelData = useMemo(() => {
    const counts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Ensure specific order for the funnel
    const order = ['novo', 'em_analise', 'orcamento_enviado', 'fechado'];
    return order.map(status => ({
      name: STATUS_LABELS[status],
      value: counts[status] || 0,
      fill: STATUS_COLORS[status]
    }));
  }, [leads]);

  // Calculate Sector Data
  const sectorData = useMemo(() => {
    const counts = leads.reduce((acc, lead) => {
      acc[lead.setor] = (acc[lead.setor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([sectorId, count]) => {
        const sector = sectors.find(s => s.id === sectorId);
        return {
          name: sector ? sector.shortTitle : sectorId,
          value: count
        };
      })
      .sort((a, b) => Number(b.value) - Number(a.value)); // Sort by highest
  }, [leads, sectors]);

  // Colors for Sector Pie
  const PIE_COLORS = ['#00A3FF', '#0052CC', '#FF6B00', '#10B981', '#8B5CF6', '#F59E0B', '#3B82F6', '#0EA5E9'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF]">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-tight">Dashboard Comercial</h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Métricas B2B e Funil de Vendas da Engenharia
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Chart (BarChart Horizontal) */}
        <div className="bg-slate-900 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
          <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#00A3FF]" />
            Funil de Leads por Status
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#94A3B8" fontSize={12} allowDecimals={false} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} width={80} />
                <RechartsTooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#ffffff20', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Distribution PieChart */}
        <div className="bg-slate-900 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
          <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-[#00A3FF]" />
            Distribuição por Setor
          </h4>
          <div className="h-64 w-full">
            {sectorData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#ffffff20', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                Nenhum dado de setor disponível
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* High Level Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-white/5 p-4 rounded-xl">
          <p className="text-xs text-slate-400 font-mono mb-1">Total de Leads</p>
          <p className="text-2xl font-black text-white">{leads.length}</p>
        </div>
        <div className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl">
          <p className="text-xs text-emerald-400 font-mono mb-1">Taxa de Fechamento</p>
          <p className="text-2xl font-black text-emerald-400">
            {leads.length > 0 ? Math.round((funnelData.find(f => f.name === 'Finalizado')?.value || 0) / leads.length * 100) : 0}%
          </p>
        </div>
        <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl">
          <p className="text-xs text-blue-400 font-mono mb-1">Leads Novos (Pipeline)</p>
          <p className="text-2xl font-black text-blue-400">
            {funnelData.find(f => f.name === 'Novo')?.value || 0}
          </p>
        </div>
        <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/20 p-4 rounded-xl">
          <p className="text-xs text-[#FF6B00] font-mono mb-1">Setor Mais Procurado</p>
          <p className="text-sm font-black text-white truncate mt-1.5" title={sectorData[0]?.name || '-'}>
            {sectorData[0]?.name || '-'}
          </p>
        </div>
      </div>
    </div>
  );
};
