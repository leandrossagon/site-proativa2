import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { CompanySettings } from '../types';

interface FloatingWhatsAppProps {
  settings: CompanySettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = message.trim() || 'Olá! Gostaria de falar com a equipe de engenharia da PROATIVA para um orçamento.';
    const url = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 glass-panel-elevated rounded-2xl shadow-2xl border border-white/15 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 text-white">
          {/* Header */}
          <div className="bg-[#081020] text-white p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#00A3FF] text-[#050B18] font-black flex items-center justify-center text-sm shadow glow-accent">
                  P
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#081020] absolute bottom-0 right-0"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-white">Engenharia PROATIVA</h4>
                <p className="text-[11px] font-mono text-[#00A3FF]">Atendimento Técnico Especializado</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#050B18]/90 space-y-3">
            <div className="glass-card p-3 rounded-2xl rounded-tl-xs text-xs text-slate-200 space-y-1 max-w-[90%] border border-white/10">
              <p className="font-semibold text-white flex items-center gap-1.5">
                Olá! Bem-vindo à PROATIVA Tecnologies 👋
              </p>
              <p className="text-slate-300 font-sans leading-relaxed">
                Como podemos ajudar em seu projeto de automação predial, controle de acesso, CFTV ou SDAI hoje?
              </p>
              <span className="text-[10px] font-mono text-slate-500 block text-right">Agora • Online</span>
            </div>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#081020] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua dúvida ou porte da obra..."
              className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF]"
            />
            <button
              type="submit"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-xs transition-colors glow-emerald cursor-pointer"
              title="Iniciar conversa no WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer glow-emerald"
        id="btn-floating-whatsapp"
        aria-label="Abrir suporte WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white/20" />
        <span className="hidden sm:inline-block text-xs font-bold font-mono uppercase tracking-wider pr-1">
          Falar com Engenheiro
        </span>
      </button>
    </div>
  );
};
