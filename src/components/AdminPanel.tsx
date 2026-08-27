import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  X, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  Building2, 
  Sliders, 
  Save, 
  RefreshCw,
  Eye,
  FileSpreadsheet,
  Link2,
  BarChart3
} from 'lucide-react';
import { LeadItem, LeadStatus, SectorId, CompanySettings, SectorInfo } from '../types';
import { EmailTemplatesManager } from './EmailTemplatesManager';
import { DashboardMetrics } from './DashboardMetrics';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadItem[];
  sectors: SectorInfo[];
  settings: CompanySettings;
  onUpdateLeadStatus: (id: string, newStatus: LeadStatus) => void;
  onUpdateLeadNotes: (id: string, notes: string) => void;
  onDeleteLead: (id: string) => void;
  onAddLead: (lead: Omit<LeadItem, 'id' | 'createdAt'>) => void;
  onUpdateSettings: (newSettings: CompanySettings) => void;
  onResetDemoData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  leads,
  sectors,
  settings,
  onUpdateLeadStatus,
  onUpdateLeadNotes,
  onDeleteLead,
  onAddLead,
  onUpdateSettings,
  onResetDemoData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'settings' | 'novo_lead' | 'emails'>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [sectorFilter, setSectorFilter] = useState<string>('todos');

  // Internal editing state for notes
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  // Settings form state
  const [editSettings, setEditSettings] = useState<CompanySettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // New Lead form state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadSector, setNewLeadSector] = useState<SectorId>('automacoes');
  const [newLeadDetails, setNewLeadDetails] = useState('');
  const [newLeadBudget, setNewLeadBudget] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: admin or 1234 or 1880
    if (pinInput === 'admin' || pinInput === '1880' || pinInput === 'admin123' || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm) ||
      lead.detalhes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'todos' || lead.status === statusFilter;
    const matchesSector = sectorFilter === 'todos' || lead.setor === sectorFilter;

    return matchesSearch && matchesStatus && matchesSector;
  });

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'novo':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">Novo</span>;
      case 'em_analise':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Em Análise</span>;
      case 'orcamento_enviado':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">Orçamento Enviado</span>;
      case 'fechado':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Fechado / Ganho</span>;
      case 'arquivado':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">Arquivado</span>;
      default:
        return null;
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,Nome,WhatsApp,Email,Setor,Porte,Status,Data,Detalhes,Notas\n';
    const rows = leads.map((l) => {
      const cleanDetails = `"${(l.detalhes || '').replace(/"/g, '""')}"`;
      const cleanNotes = `"${(l.notes || '').replace(/"/g, '""')}"`;
      return `${l.id},"${l.nome}","${l.whatsapp}","${l.email || ''}",${l.setor},${l.porteProjeto || 'padrao'},${l.status},${l.createdAt},${cleanDetails},${cleanNotes}`;
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_proativa_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadPhone.trim()) return;

    onAddLead({
      nome: newLeadName,
      whatsapp: newLeadPhone,
      email: newLeadEmail.trim() || undefined,
      setor: newLeadSector,
      detalhes: newLeadDetails || 'Cadastrado manualmente pela equipe comercial.',
      status: 'novo',
      porteProjeto: 'medio',
      estimatedBudget: newLeadBudget || undefined
    });

    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
    setNewLeadDetails('');
    setNewLeadBudget('');
    setActiveTab('leads');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(editSettings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const openWhatsAppToClient = (phone: string, clientName: string) => {
    const rawNumber = phone.replace(/\D/g, '');
    const cleanNumber = rawNumber.startsWith('55') ? rawNumber : `55${rawNumber}`;
    const text = encodeURIComponent(`Olá ${clientName}, sou da equipe de engenharia e projetos da PROATIVA Tecnologies. Recebemos sua solicitação de orçamento estratégico e gostaria de alinhar os detalhes técnicos do seu empreendimento.`);
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="glass-panel-elevated w-full max-w-5xl rounded-2xl shadow-2xl border border-white/15 overflow-hidden flex flex-col max-h-[90vh] text-white">
        {/* Modal Top Header */}
        <div className="bg-[#081020] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00A3FF]/20 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF] glow-accent">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00A3FF]">
                Terminal de Operações
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">Painel Administrativo PROATIVA</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 bg-[#00A3FF]/15 text-[#00A3FF] border border-[#00A3FF]/30 rounded-full flex items-center justify-center mx-auto glow-accent">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Acesso Restrito à Gestão</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Autenticação requerida para visualização de dados comerciais e leads.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Digite a senha (padrão: admin123 ou 1880)"
                  className="w-full px-4 py-3 bg-slate-900/80 border border-white/15 rounded-xl text-center text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-1.5 font-medium">
                    Senha incorreta. Tente "admin123" ou "1880".
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#00A3FF] hover:bg-[#0090E0] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest glow-accent transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                Desbloquear Terminal
              </button>

              <button
                type="button"
                onClick={() => {
                  setPinInput('admin123');
                  setIsAuthenticated(true);
                }}
                className="text-xs text-[#00A3FF] hover:underline block mx-auto font-mono"
              >
                Entrar com credencial de demonstração
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Dashboard Tabs & Actions */}
            <div className="bg-[#081020]/90 px-6 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-[#00A3FF] text-white glow-accent'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Métricas
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-[#00A3FF] text-white glow-accent'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Leads Recebidos ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('novo_lead')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'novo_lead'
                      ? 'bg-[#00A3FF] text-white glow-accent'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Cadastrar Lead Manual
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-[#00A3FF] text-white glow-accent'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Dados de Contato & SLA
                </button>
                <button
                  onClick={() => setActiveTab('emails')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'emails'
                      ? 'bg-[#00A3FF] text-white glow-accent'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  E-mails B2B
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Exportar base para Excel / CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  Exportar CSV
                </button>
                <button
                  onClick={onResetDemoData}
                  className="p-1.5 text-slate-400 hover:text-[#00A3FF] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Restaurar dados de exemplo"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab 0: Dashboard Metrics */}
            {activeTab === 'dashboard' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 w-full">
                <DashboardMetrics leads={leads} sectors={sectors} />
              </div>
            )}

            {/* Tab 1: Leads View */}
            {activeTab === 'leads' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Search and Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-6 relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por cliente, empresa, WhatsApp..."
                      className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full py-2 px-3 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                    >
                      <option value="todos">Todos os Status</option>
                      <option value="novo">Novo</option>
                      <option value="em_analise">Em Análise</option>
                      <option value="orcamento_enviado">Orçamento Enviado</option>
                      <option value="fechado">Fechado</option>
                      <option value="arquivado">Arquivado</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <select
                      value={sectorFilter}
                      onChange={(e) => setSectorFilter(e.target.value)}
                      className="w-full py-2 px-3 bg-slate-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                    >
                      <option value="todos">Todos os Setores</option>
                      {sectors.map((s) => (
                        <option key={s.id} value={s.id}>{s.shortTitle}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Lead Items List */}
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 font-mono text-xs">
                    Nenhum lead encontrado para os filtros selecionados.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredLeads.map((lead) => {
                      const sectorInfo = sectors.find((s) => s.id === lead.setor);
                      const isEditingThisNote = editingNotesId === lead.id;

                      return (
                        <div
                          key={lead.id}
                          className="glass-card border border-white/10 rounded-xl p-4 sm:p-5 hover:border-[#00A3FF]/40 transition-all space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono font-bold text-[#00A3FF] bg-[#00A3FF]/10 border border-[#00A3FF]/20 px-2 py-0.5 rounded">
                                {lead.id}
                              </span>
                              <h4 className="text-sm font-bold text-white">
                                {lead.nome}
                              </h4>
                              {getStatusBadge(lead.status)}
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Status changer dropdown */}
                              <select
                                value={lead.status}
                                onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                className="text-[10px] font-mono font-bold bg-slate-900 border border-white/20 text-white rounded px-2 py-1 focus:outline-none cursor-pointer"
                              >
                                <option value="novo">Status: Novo</option>
                                <option value="em_analise">Status: Em Análise</option>
                                <option value="orcamento_enviado">Status: Proposta Enviada</option>
                                <option value="fechado">Status: Fechado</option>
                                <option value="arquivado">Status: Arquivado</option>
                              </select>

                              <button
                                onClick={() => onDeleteLead(lead.id)}
                                className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors cursor-pointer"
                                title="Excluir Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Contact Details & Sector */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                            <div className="flex items-center gap-1.5 font-mono font-semibold text-white">
                              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                              {lead.whatsapp}
                            </div>
                            {lead.email && (
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Mail className="w-3.5 h-3.5 text-[#00A3FF]" />
                                {lead.email}
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 text-[#00A3FF] font-mono text-[11px] font-semibold bg-[#00A3FF]/10 px-2 py-0.5 rounded border border-[#00A3FF]/20">
                              Setor: {sectorInfo?.shortTitle || lead.setor}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 ml-auto">
                              Recebido: {new Date(lead.createdAt).toLocaleString('pt-BR')}
                            </div>
                          </div>

                          {/* Lead Message / Description */}
                          <div className="bg-slate-900/90 p-3 rounded-lg text-xs text-slate-300 leading-relaxed border border-white/5">
                            <strong className="text-[#00A3FF]">Escopo Solicitado: </strong>
                            {lead.detalhes}
                          </div>

                          {/* Internal Notes and Fast Actions */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                            {/* Notes Field */}
                            <div className="flex-1">
                              {isEditingThisNote ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={tempNotes}
                                    onChange={(e) => setTempNotes(e.target.value)}
                                    placeholder="Adicione anotação interna..."
                                    className="flex-1 px-2.5 py-1 text-xs border border-[#00A3FF] rounded bg-slate-900 text-white"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => {
                                      onUpdateLeadNotes(lead.id, tempNotes);
                                      setEditingNotesId(null);
                                    }}
                                    className="p-1 bg-[#00A3FF] text-white rounded hover:bg-[#0090E0]"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setEditingNotesId(null)}
                                    className="p-1 text-slate-400 hover:text-slate-200"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    setEditingNotesId(lead.id);
                                    setTempNotes(lead.notes || '');
                                  }}
                                  className="text-[11px] text-slate-400 hover:text-[#00A3FF] cursor-pointer flex items-center gap-1.5 font-mono"
                                >
                                  <Edit3 className="w-3 h-3 text-slate-500" />
                                  <span>
                                    {lead.notes ? `Nota: ${lead.notes}` : '+ Adicionar nota interna da visita/orçamento'}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* WhatsApp Connect Button */}
                            <button
                              onClick={() => openWhatsAppToClient(lead.whatsapp, lead.nome)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors glow-emerald cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              Conversar no WhatsApp
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Add Lead Manually */}
            {activeTab === 'novo_lead' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
                <h3 className="text-base font-bold text-white mb-4 uppercase tracking-wider">
                  Cadastrar Contato ou Lead Manual
                </h3>
                <form onSubmit={handleCreateLead} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Nome / Razão Social *
                    </label>
                    <input
                      type="text"
                      value={newLeadName}
                      onChange={(e) => setNewLeadName(e.target.value)}
                      placeholder="Ex: Construtora Alfa / Dr. Roberto"
                      required
                      className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        WhatsApp / Telefone *
                      </label>
                      <input
                        type="text"
                        value={newLeadPhone}
                        onChange={(e) => setNewLeadPhone(e.target.value)}
                        placeholder="(11) 98888-7777"
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        E-mail de Contato
                      </label>
                      <input
                        type="email"
                        value={newLeadEmail}
                        onChange={(e) => setNewLeadEmail(e.target.value)}
                        placeholder="contato@empresa.com.br"
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Setor do Projeto *
                      </label>
                      <select
                        value={newLeadSector}
                        onChange={(e) => setNewLeadSector(e.target.value as SectorId)}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      >
                        {sectors.map((s) => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Estimativa de Valor (Opcional)
                      </label>
                      <input
                        type="text"
                        value={newLeadBudget}
                        onChange={(e) => setNewLeadBudget(e.target.value)}
                        placeholder="Ex: R$ 75.000,00"
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Necessidades & Observações
                    </label>
                    <textarea
                      rows={3}
                      value={newLeadDetails}
                      onChange={(e) => setNewLeadDetails(e.target.value)}
                      placeholder="Informações colhidas na ligação ou reunião preliminar..."
                      className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#00A3FF] hover:bg-[#0090E0] text-white py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest glow-accent transition-colors cursor-pointer"
                  >
                    Salvar Lead no Sistema
                  </button>
                </form>
              </div>
            )}

            {/* Tab 3: Company Settings */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      Configurações de Contato e Identidade
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Os números e textos alterados aqui são atualizados em todo o site.
                    </p>
                  </div>
                  {savedSuccess && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                      Alterações salvas!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        value={editSettings.companyName}
                        onChange={(e) => setEditSettings({ ...editSettings, companyName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Slogan / Tagline
                      </label>
                      <input
                        type="text"
                        value={editSettings.tagline}
                        onChange={(e) => setEditSettings({ ...editSettings, tagline: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        WhatsApp Comercial (Somente números com 55)
                      </label>
                      <input
                        type="text"
                        value={editSettings.whatsapp}
                        onChange={(e) => setEditSettings({ ...editSettings, whatsapp: e.target.value })}
                        placeholder="5511999999999"
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Telefone Principal
                      </label>
                      <input
                        type="text"
                        value={editSettings.phone}
                        onChange={(e) => setEditSettings({ ...editSettings, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Plantão Emergência SLA (0800)
                      </label>
                      <input
                        type="text"
                        value={editSettings.slaEmergencyPhone}
                        onChange={(e) => setEditSettings({ ...editSettings, slaEmergencyPhone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        E-mail de Recebimento
                      </label>
                      <input
                        type="email"
                        value={editSettings.email}
                        onChange={(e) => setEditSettings({ ...editSettings, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Endereço da Sede
                    </label>
                    <input
                      type="text"
                      value={editSettings.address}
                      onChange={(e) => setEditSettings({ ...editSettings, address: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        CNPJ
                      </label>
                      <input
                        type="text"
                        value={editSettings.cnpj}
                        onChange={(e) => setEditSettings({ ...editSettings, cnpj: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Horário de Atendimento
                      </label>
                      <input
                        type="text"
                        value={editSettings.operatingHours}
                        onChange={(e) => setEditSettings({ ...editSettings, operatingHours: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#00A3FF] hover:bg-[#0090E0] text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 glow-accent transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Salvar Dados Institucionais
                  </button>
                </form>
              </div>
            )}

            {/* Tab 5: Corporate Email Templates */}
            {activeTab === 'emails' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
                <EmailTemplatesManager leads={leads} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
