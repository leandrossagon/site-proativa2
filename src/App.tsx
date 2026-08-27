import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SectorGrid } from './components/SectorGrid';
import { SectorDetails } from './components/SectorDetails';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ProjectCalculator } from './components/ProjectCalculator';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { CustomerChatbot } from './components/CustomerChatbot';
import { 
  SECTORS_DATA, 
  INITIAL_COMPANY_SETTINGS, 
  INITIAL_LEADS 
} from './data/sectorsData';
import { LeadItem, LeadStatus, SectorId, CompanySettings } from './types';

export default function App() {
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [settings, setSettings] = useState<CompanySettings>(INITIAL_COMPANY_SETTINGS);

  const [preselectedSector, setPreselectedSector] = useState<SectorId>('automacoes');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // URL Hash handling for /admin or #admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleSelectSector = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerQuote = (sectorId: SectorId) => {
    setPreselectedSector(sectorId);
    const quoteEl = document.getElementById('orcamento');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
      // highlight effect
      quoteEl.classList.add('ring-4', 'ring-[#0052CC]/30');
      setTimeout(() => {
        quoteEl.classList.remove('ring-4', 'ring-[#0052CC]/30');
      }, 1500);
    }
  };

  const handleDirectWhatsApp = (sectorId: SectorId, sectorTitle: string) => {
    const text = encodeURIComponent(
      `Olá! Tenho interesse na divisão de *${sectorTitle}* da PROATIVA Tecnologies e gostaria de mais informações técnicas.`
    );
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
  };

  const handleAddLead = async (leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => {
    const newLead: LeadItem = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'novo' as LeadStatus,
      ...leadData
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = async (id: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const handleUpdateLeadNotes = async (id: string, notes: string) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, notes } : lead));
  };

  const handleDeleteLead = async (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const handleResetDemoData = async () => {
    setLeads(INITIAL_LEADS);
    setSettings(INITIAL_COMPANY_SETTINGS);
  };

  const handleUpdateSettings = async (newSettings: CompanySettings) => {
    setSettings(newSettings);
  };

  const handleApplyEstimateToQuote = (data: {
    setor: SectorId;
    detalhes: string;
    porteProjeto: 'pequeno' | 'medio' | 'grande' | 'corporativo';
  }) => {
    setPreselectedSector(data.setor);
    const quoteEl = document.getElementById('orcamento');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050B18] text-[#E2E8F0] font-sans antialiased relative selection:bg-[#00A3FF] selection:text-white">
      {/* Immersive Background Elements */}
      <div className="fixed inset-0 tech-grid opacity-35 pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00A3FF] opacity-10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FF6B00] opacity-[0.06] rounded-full blur-[130px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header
          settings={settings}
          sectors={SECTORS_DATA}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onSelectSector={handleSelectSector}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Hero Section with Fast Lead Capture Form */}
        <HeroSection
          settings={settings}
          preselectedSector={preselectedSector}
          onSubmitLead={handleAddLead}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Sector Navigation Grid (7 specialized solutions) */}
        <SectorGrid
          sectors={SECTORS_DATA}
          onSelectSector={handleSelectSector}
        />

        {/* Detailed Technical Routes and Conversion Copy */}
        <SectorDetails
          sectors={SECTORS_DATA}
          onTriggerQuote={handleTriggerQuote}
          onDirectWhatsApp={handleDirectWhatsApp}
        />

        {/* Testimonials and Real Engineering Case Studies */}
        <CaseStudiesSection
          onTriggerQuote={handleTriggerQuote}
          onDirectWhatsApp={handleDirectWhatsApp}
        />

        {/* Project Dimensioning Calculator Modal */}
        <ProjectCalculator
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          sectors={SECTORS_DATA}
          onApplyEstimateToQuote={handleApplyEstimateToQuote}
        />

        {/* Admin Panel (Leads, WhatsApp quick contact & Settings) */}
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => {
            setIsAdminOpen(false);
            if (window.location.hash === '#admin') {
              window.history.pushState('', document.title, window.location.pathname);
            }
          }}
          leads={leads}
          sectors={SECTORS_DATA}
          settings={settings}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onUpdateLeadNotes={handleUpdateLeadNotes}
          onDeleteLead={handleDeleteLead}
          onAddLead={handleAddLead}
          onUpdateSettings={handleUpdateSettings}
          onResetDemoData={handleResetDemoData}
        />

        {/* Intelligent Customer Service Chatbot with Lead Capture, FAQs & Demo Scheduler */}
        <CustomerChatbot
          settings={settings}
          onAddLead={handleAddLead}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onSelectSector={handleSelectSector}
          onTriggerQuote={handleTriggerQuote}
        />

        {/* Footer strictly with administrative access and copyright */}
        <Footer
          settings={settings}
          sectors={SECTORS_DATA}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onSelectSector={handleSelectSector}
        />
      </div>
    </div>
  );
}
