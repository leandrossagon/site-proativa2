import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Calculator, 
  Clock, 
  RefreshCw, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Flame,
  Cpu,
  Video,
  Fingerprint,
  Home,
  Wrench
} from 'lucide-react';
import { CompanySettings, LeadItem, SectorId, ChatMessage } from '../types';
import { FAQ_DATABASE, findMatchingFAQ, FAQItem } from '../data/chatbotKnowledge';

interface CustomerChatbotProps {
  settings: CompanySettings;
  onAddLead: (leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => void;
  onOpenCalculator: () => void;
  onSelectSector: (anchorId: string) => void;
  onTriggerQuote: (sectorId: SectorId) => void;
}

type ChatFlow = 'idle' | 'lead_form' | 'demo_schedule' | 'faq';

export const CustomerChatbot: React.FC<CustomerChatbotProps> = ({
  settings,
  onAddLead,
  onOpenCalculator,
  onSelectSector,
  onTriggerQuote
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatFlow, setChatFlow] = useState<ChatFlow>('idle');

  // Lead Collection State
  const [leadStep, setLeadStep] = useState<number>(0);
  const [leadData, setLeadData] = useState<{
    nome: string;
    whatsapp: string;
    email: string;
    setor: SectorId;
    detalhes: string;
    porteProjeto: 'pequeno' | 'medio' | 'grande' | 'corporativo';
  }>({
    nome: '',
    whatsapp: '',
    email: '',
    setor: 'automacoes',
    detalhes: '',
    porteProjeto: 'medio'
  });

  // Schedule Demo State
  const [demoStep, setDemoStep] = useState<number>(0);
  const [demoData, setDemoData] = useState<{
    nome: string;
    whatsapp: string;
    email: string;
    dataDesejada: string;
    periodo: 'manha' | 'tarde';
    tipoImovel: string;
    servicoInteresse: string;
  }>({
    nome: '',
    whatsapp: '',
    email: '',
    dataDesejada: '',
    periodo: 'manha',
    tipoImovel: 'Condomínio',
    servicoInteresse: 'Controle de Acesso / Portaria Remota'
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Olá! Sou o Assistente de Engenharia da PROATIVA Tecnologies. 🤖⚡\n\nPlantão WhatsApp: ${settings.slaEmergencyPhone}\nE-mail Suporte: ${settings.email}\nE-mail Comercial: ${settings.commercialEmail}\n\nComo posso ajudar você hoje?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '📋 Solicitar Orçamento / Lead', action: 'start_lead' },
        { label: '📅 Agendar Demonstração / Visita', action: 'start_demo' },
        { label: '❓ Dúvidas Frequentes (FAQ)', action: 'show_faq' },
        { label: '⚡ Falar no WhatsApp com Engenheiro', action: 'open_whatsapp' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen, isTyping]);

  const addBotMessage = (
    text: string, 
    quickActions?: { label: string; action: string; payload?: any }[],
    delay = 600
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'bot',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickActions
        }
      ]);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleResetChat = () => {
    setChatFlow('idle');
    setLeadStep(0);
    setDemoStep(0);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: 'Reiniciamos nosso atendimento. Como posso te auxiliar com as soluções de engenharia da PROATIVA?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '📋 Solicitar Orçamento / Lead', action: 'start_lead' },
          { label: '📅 Agendar Demonstração / Visita', action: 'start_demo' },
          { label: '❓ Dúvidas Frequentes (FAQ)', action: 'show_faq' },
          { label: '⚡ Falar no WhatsApp', action: 'open_whatsapp' }
        ]
      }
    ]);
  };

  // Handle Quick Actions Clicks
  const handleQuickAction = (action: string, payload?: any) => {
    switch (action) {
      case 'start_lead':
        addUserMessage('Gostaria de solicitar um orçamento para meu projeto.');
        setChatFlow('lead_form');
        setLeadStep(1);
        addBotMessage(
          'Excelente! Vamos coletar algumas informações para dimensionar a solução ideal para seu projeto.\n\nPara começar, **qual é o seu nome completo ou a razão social da sua empresa?**'
        );
        break;

      case 'start_demo':
        addUserMessage('Quero agendar uma demonstração técnica ou visita no local.');
        setChatFlow('demo_schedule');
        setDemoStep(1);
        addBotMessage(
          'Perfeito! A visita técnica preliminar para diagnóstico e demonstração de produtos é **100% gratuita**, sempre guiada por um responsável técnico, com ART/CREA registrada e expertise para adequação ao AVCB (SDAI).\n\nPor favor, informe o seu **nome completo**:'
        );
        break;

      case 'show_faq':
        addUserMessage('Gostaria de ver perguntas frequentes sobre os serviços.');
        setChatFlow('faq');
        addBotMessage(
          'Aqui estão alguns dos tópicos mais frequentes sobre nossa engenharia e serviços. Clique para ver a resposta imediata ou digite sua pergunta abaixo:',
          FAQ_DATABASE.map((faq) => ({
            label: `🔹 ${faq.shortQuestion}`,
            action: 'read_faq',
            payload: faq.id
          }))
        );
        break;

      case 'read_faq': {
        const faq = FAQ_DATABASE.find((f) => f.id === payload);
        if (faq) {
          addUserMessage(faq.question);
          const actions: { label: string; action: string; payload?: any }[] = [];

          if (faq.suggestedAction) {
            if (faq.suggestedAction.action === 'quote' && faq.suggestedAction.target) {
              actions.push({
                label: `📝 ${faq.suggestedAction.label}`,
                action: 'trigger_quote',
                payload: faq.suggestedAction.target
              });
            } else if (faq.suggestedAction.action === 'demo') {
              actions.push({
                label: `📅 ${faq.suggestedAction.label}`,
                action: 'start_demo'
              });
            } else if (faq.suggestedAction.action === 'calculator') {
              actions.push({
                label: `🧮 ${faq.suggestedAction.label}`,
                action: 'open_calculator'
              });
            }
          }

          actions.push({ label: '💬 Falar com Engenheiro no WhatsApp', action: 'open_whatsapp' });
          actions.push({ label: '⬅️ Outras Perguntas', action: 'show_faq' });

          addBotMessage(`**${faq.question}**\n\n${faq.answer}`, actions);
        }
        break;
      }

      case 'trigger_quote':
        onTriggerQuote(payload as SectorId);
        setIsOpen(false);
        break;

      case 'open_calculator':
        onOpenCalculator();
        setIsOpen(false);
        break;

      case 'open_whatsapp': {
        const text = encodeURIComponent(
          'Olá! Estava no chatbot da PROATIVA Tecnologies e gostaria de atendimento técnico direto com um engenheiro.'
        );
        window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
        break;
      }

      case 'select_lead_sector':
        setLeadData((prev) => ({ ...prev, setor: payload as SectorId }));
        setLeadStep(5);
        addBotMessage(
          'Perfeito! Descreva resumidamente o que você precisa (ex: número de câmeras, portas, tamanho do galpão, condomínio, prazo de AVCB):'
        );
        break;

      default:
        break;
    }
  };

  // Handle Free-text User Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    setInputValue('');
    addUserMessage(text);

    // 1. In Lead Collection Flow
    if (chatFlow === 'lead_form') {
      handleLeadFlowInput(text);
      return;
    }

    // 2. In Demo Schedule Flow
    if (chatFlow === 'demo_schedule') {
      handleDemoFlowInput(text);
      return;
    }

    // 3. General FAQ / Intent Detection
    const faqMatch = findMatchingFAQ(text);
    if (faqMatch) {
      const actions: { label: string; action: string; payload?: any }[] = [];
      if (faqMatch.suggestedAction) {
        if (faqMatch.suggestedAction.action === 'quote' && faqMatch.suggestedAction.target) {
          actions.push({
            label: `📝 ${faqMatch.suggestedAction.label}`,
            action: 'trigger_quote',
            payload: faqMatch.suggestedAction.target
          });
        } else if (faqMatch.suggestedAction.action === 'demo') {
          actions.push({
            label: `📅 ${faqMatch.suggestedAction.label}`,
            action: 'start_demo'
          });
        }
      }
      actions.push({ label: '⚡ Conversar no WhatsApp', action: 'open_whatsapp' });
      actions.push({ label: '📋 Deixar Contato / Orçamento', action: 'start_lead' });

      addBotMessage(`**${faqMatch.question}**\n\n${faqMatch.answer}`, actions);
      return;
    }

    // Fallback: General response with guided options
    addBotMessage(
      `Entendido! Identifiquei seu interesse em soluções de engenharia PROATIVA.\n\nPara que nossa equipe de engenharia analise seu caso com precisão, recomendo uma das opções abaixo:`,
      [
        { label: '📋 Deixar Dados para Orçamento Oficial', action: 'start_lead' },
        { label: '📅 Agendar Demonstração / Visita', action: 'start_demo' },
        { label: '💬 Atendimento Imediato no WhatsApp', action: 'open_whatsapp' },
        { label: '❓ Ver Perguntas Frequentes', action: 'show_faq' }
      ]
    );
  };

  // Lead Collection Step by Step
  const handleLeadFlowInput = (input: string) => {
    if (leadStep === 1) {
      setLeadData((prev) => ({ ...prev, nome: input }));
      setLeadStep(2);
      addBotMessage(`Prazer, ${input}! Qual é o seu **WhatsApp / Telefone com DDD** para contato comercial?`);
    } else if (leadStep === 2) {
      setLeadData((prev) => ({ ...prev, whatsapp: input }));
      setLeadStep(3);
      addBotMessage('Ótimo. Qual o seu **E-mail corporativo ou pessoal** para enviarmos a proposta formal?');
    } else if (leadStep === 3) {
      setLeadData((prev) => ({ ...prev, email: input }));
      setLeadStep(4);
      addBotMessage(
        'Qual das nossas **Divisões de Engenharia** atende melhor a sua necessidade?',
        [
          { label: '⚙️ Automações Industriais/Prediais', action: 'select_lead_sector', payload: 'automacoes' },
          { label: '🛡️ Segurança Eletrônica Perimetral', action: 'select_lead_sector', payload: 'seguranca' },
          { label: '📹 Monitoramento & CFTV com IA', action: 'select_lead_sector', payload: 'monitoramento' },
          { label: '🚪 Controle de Acesso & Portaria Remota', action: 'select_lead_sector', payload: 'acesso' },
          { label: '🔥 Alarme de Incêndio (SDAI / AVCB)', action: 'select_lead_sector', payload: 'incendio' },
          { label: '🏠 Soluções Inteligentes / IoT', action: 'select_lead_sector', payload: 'inteligentes' },
          { label: '🔧 Manutenção de Portões / SLA', action: 'select_lead_sector', payload: 'portoes' }
        ]
      );
    } else if (leadStep === 5) {
      const finalLead = {
        ...leadData,
        detalhes: input
      };
      
      // Save lead into the system
      onAddLead(finalLead);
      setChatFlow('idle');
      setLeadStep(0);

      addBotMessage(
        `✅ **Orçamento Registrado com Sucesso!**\n\nObrigado, **${finalLead.nome}**. Seus dados foram encaminhados diretamente para o engenheiro responsável pelo setor.\n\n📞 Entraremos em contato via WhatsApp/telefone (${finalLead.whatsapp}) em até 2 horas úteis.`,
        [
          { label: '⚡ Abrir Conversa Direta no WhatsApp', action: 'open_whatsapp' },
          { label: '🧮 Simular Matriz no Calculador', action: 'open_calculator' },
          { label: '🔄 Iniciar Nova Consulta', action: 'start_demo' }
        ]
      );
    }
  };

  // Demo Schedule Step by Step
  const handleDemoFlowInput = (input: string) => {
    if (demoStep === 1) {
      setDemoData((prev) => ({ ...prev, nome: input }));
      setDemoStep(2);
      addBotMessage(`Olá, ${input}! Qual o seu **WhatsApp / Telefone com DDD** para confirmarmos a visita?`);
    } else if (demoStep === 2) {
      setDemoData((prev) => ({ ...prev, whatsapp: input }));
      setDemoStep(3);
      addBotMessage('Qual é o seu **E-mail**?');
    } else if (demoStep === 3) {
      setDemoData((prev) => ({ ...prev, email: input }));
      setDemoStep(4);
      addBotMessage(
        'Qual o **Tipo de Imóvel / Obra** para a visita técnica?',
        [
          { label: '🏢 Condomínio Vertical / Residencial', action: 'set_demo_property', payload: 'Condomínio Vertical' },
          { label: '🏭 Indústria / Galpão Logístico', action: 'set_demo_property', payload: 'Indústria / Logística' },
          { label: '🏗️ Construtora / Obra Nova', action: 'set_demo_property', payload: 'Construtora / Empreendimento' },
          { label: '🏛️ Edifício Comercial / Corporativo', action: 'set_demo_property', payload: 'Corporativo' }
        ]
      );
    } else if (demoStep === 5) {
      // Finalize Demo
      const protocolNumber = `VISITA-${Math.floor(100000 + Math.random() * 900000)}`;
      
      onAddLead({
        nome: `${demoData.nome} (AGENDAMENTO DE DEMO)`,
        whatsapp: demoData.whatsapp,
        email: demoData.email,
        setor: 'acesso',
        detalhes: `Solicitação de Demonstração / Visita Técnica. Protocolo: ${protocolNumber}. Data/Detalhe preferido: ${input}. Tipo: ${demoData.tipoImovel}.`,
        porteProjeto: 'grande'
      });

      setChatFlow('idle');
      setDemoStep(0);

      addBotMessage(
        `🎉 **Demonstração Pré-Agendada com Sucesso!**\n\n📌 **Protocolo:** \`${protocolNumber}\`\n👤 **Responsável:** ${demoData.nome}\n🏢 **Empreendimento:** ${demoData.tipoImovel}\n\nNossa coordenação técnica entrará em contato pelo WhatsApp **${demoData.whatsapp}** para alinhar o horário exato e o envio da equipe com equipamentos de demonstração.`,
        [
          { label: '💬 Confirmar Imediatamente no WhatsApp', action: 'open_whatsapp' },
          { label: '⬅️ Voltar ao Início', action: 'show_faq' }
        ]
      );
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button with Status Pulse */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Unread Message Tooltip / Proactive Hook */}
        {!isOpen && hasUnread && (
          <div 
            onClick={() => setIsOpen(true)}
            className="mb-3 cursor-pointer glass-panel-elevated py-2.5 px-4 rounded-xl shadow-2xl border border-[#00A3FF]/40 text-xs text-white flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 max-w-xs group hover:border-[#00A3FF]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/20 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF] shrink-0 glow-accent">
              <Bot className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-white text-[11px] flex items-center justify-between">
                <span>Atendimento PROATIVA</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                Dúvidas sobre AVCB, CFTV ou Automações?
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group bg-[#00A3FF] hover:bg-[#0090E0] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-3 cursor-pointer glow-accent relative"
          id="btn-open-chatbot"
          aria-label="Abrir Atendente Virtual PROATIVA"
        >
          <div className="relative">
            <Bot className="w-6 h-6 fill-white/10" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#050B18] absolute -top-1 -right-1 animate-ping"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#050B18] absolute -top-1 -right-1"></span>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono font-bold uppercase tracking-wider pr-1">
            Atendimento IA
          </span>
        </button>
      </div>

      {/* Main Chatbot Window Modal/Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-h-[85vh] h-[580px] glass-panel-elevated rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200 text-white">
          {/* Top Bar Header */}
          <div className="bg-[#081020] text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#00A3FF]/20 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF] glow-accent">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#081020] absolute -bottom-0.5 -right-0.5"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm text-white">Atendimento PROATIVA</h4>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400">
                  Engenharia & Soluções Integradas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Reiniciar Atendimento"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Fechar Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050B18]/95 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-end gap-2 max-w-[88%]">
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-md bg-[#00A3FF]/20 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF] shrink-0 mb-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#00A3FF] text-white rounded-br-xs glow-accent font-medium'
                        : 'glass-card border border-white/10 text-slate-200 rounded-bl-xs shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-line font-sans">{msg.text}</p>
                    <span
                      className={`text-[9px] font-mono block text-right mt-1 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>

                {/* Quick Action Buttons (If attached to Bot message) */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="mt-2.5 ml-8 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (action.action === 'set_demo_property') {
                            setDemoData((prev) => ({ ...prev, tipoImovel: action.payload }));
                            addUserMessage(`Empreendimento: ${action.payload}`);
                            setDemoStep(5);
                            addBotMessage('Para qual **data e período preferido (manhã ou tarde)** você gostaria de receber nossa equipe?');
                          } else {
                            handleQuickAction(action.action, action.payload);
                          }
                        }}
                        className="text-[11px] font-mono font-medium py-1.5 px-3 rounded-lg bg-white/5 hover:bg-[#00A3FF] text-slate-300 hover:text-white border border-white/15 hover:border-[#00A3FF] transition-all cursor-pointer flex items-center gap-1.5 glow-accent text-left"
                      >
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 ml-2">
                <div className="w-6 h-6 rounded-md bg-[#00A3FF]/20 flex items-center justify-center text-[#00A3FF]">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="glass-card px-3 py-2 rounded-xl flex items-center gap-1 border border-white/10">
                  <span className="w-1.5 h-1.5 bg-[#00A3FF] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#00A3FF] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#00A3FF] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Category Bar at Bottom */}
          <div className="px-3 py-1.5 bg-[#081020] border-t border-white/10 flex items-center gap-2 overflow-x-auto text-[10px] font-mono no-scrollbar">
            <span className="text-slate-500 uppercase shrink-0">Atalhos:</span>
            <button
              onClick={() => handleQuickAction('start_lead')}
              className="text-[#00A3FF] hover:underline whitespace-nowrap cursor-pointer shrink-0"
            >
              + Orçamento
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => handleQuickAction('start_demo')}
              className="text-amber-400 hover:underline whitespace-nowrap cursor-pointer shrink-0"
            >
              + Agendar Visita
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => handleQuickAction('show_faq')}
              className="text-slate-300 hover:underline whitespace-nowrap cursor-pointer shrink-0"
            >
              FAQ Geral
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => handleQuickAction('open_whatsapp')}
              className="text-emerald-400 hover:underline whitespace-nowrap cursor-pointer shrink-0"
            >
              WhatsApp
            </button>
          </div>

          {/* Input Footer Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#081020] border-t border-white/10 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua dúvida ou mensagem..."
              maxLength={256}
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-900/90 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF]/30 font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-[#00A3FF] hover:bg-[#0090E0] disabled:opacity-40 text-white rounded-xl shadow-md transition-all glow-accent cursor-pointer shrink-0"
              title="Enviar Mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
