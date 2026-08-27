import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { FileText, LogIn, LogOut, Plus, RefreshCw, CheckCircle, FileDown, ExternalLink } from 'lucide-react';
import { initAuth, googleSignIn, logout, getAccessToken } from '../lib/firebase';
import { LeadItem, SectorId } from '../types';

interface GoogleFormsManagerProps {
  onAddLeads: (leads: Omit<LeadItem, 'id' | 'createdAt'>[]) => void;
}

export const GoogleFormsManager: React.FC<GoogleFormsManagerProps> = ({ onAddLeads }) => {
  const [needsAuth, setNeedsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [forms, setForms] = useState<any[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setUser(user);
        setToken(token);
        setNeedsAuth(false);
      },
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
      setMessage({ text: 'Erro ao fazer login com o Google.', type: 'error' });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setNeedsAuth(true);
    setForms([]);
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  // 1. Create a new Lead Capture Form
  const handleCreateForm = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      // Create empty form
      const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          info: {
            title: 'PROATIVA - Captação de Leads',
            documentTitle: 'PROATIVA - Leads',
          }
        })
      });
      
      if (!createRes.ok) throw new Error('Falha ao criar o formulário.');
      const formData = await createRes.json();
      const formId = formData.formId;

      // Add questions using batchUpdate
      const batchUpdateRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [
            {
              createItem: {
                item: {
                  title: 'Nome Completo / Razão Social',
                  questionItem: { question: { required: true, textQuestion: {} } }
                },
                location: { index: 0 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'WhatsApp / Telefone',
                  questionItem: { question: { required: true, textQuestion: {} } }
                },
                location: { index: 1 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'E-mail',
                  questionItem: { question: { required: false, textQuestion: {} } }
                },
                location: { index: 2 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'Setor de Interesse',
                  questionItem: { 
                    question: { 
                      required: true, 
                      choiceQuestion: {
                        type: 'RADIO',
                        options: [
                          { value: 'automacoes' },
                          { value: 'seguranca' },
                          { value: 'monitoramento' },
                          { value: 'acesso' },
                          { value: 'inteligentes' },
                          { value: 'incendio' },
                          { value: 'portoes' },
                          { value: 'armazenamento_nuvem' },
                          { value: 'redes_infra' }
                        ]
                      }
                    } 
                  }
                },
                location: { index: 3 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'Detalhes da Solicitação',
                  questionItem: { question: { required: false, textQuestion: { paragraph: true } } }
                },
                location: { index: 4 }
              }
            }
          ]
        })
      });

      if (!batchUpdateRes.ok) throw new Error('Falha ao configurar as perguntas do formulário.');
      
      setSelectedFormId(formId);
      showMessage('Formulário criado com sucesso no seu Google Drive!', 'success');
      
    } catch (err: any) {
      console.error(err);
      showMessage(err.message || 'Erro ao criar o formulário.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Import responses from the selected form
  const handleImportResponses = async () => {
    if (!token || !selectedFormId) return;
    
    // Explicit user confirmation (Destructive operation pattern applied for data modification/creation)
    const confirmed = window.confirm(
      "Deseja buscar novas respostas do Google Forms e importá-las para a base de Leads? " +
      "Isso criará novos registros no painel."
    );
    if (!confirmed) return;

    setIsLoading(true);
    try {
      // Need to fetch the form to get question IDs to map answers correctly
      const formRes = await fetch(`https://forms.googleapis.com/v1/forms/${selectedFormId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!formRes.ok) throw new Error('Falha ao obter os detalhes do formulário.');
      const formData = await formRes.json();
      
      const questionMapping: Record<string, string> = {};
      formData.items?.forEach((item: any) => {
        if (item.questionItem && item.questionItem.question) {
          const title = item.title?.toLowerCase() || '';
          const qId = item.questionItem.question.questionId;
          if (title.includes('nome') || title.includes('razão')) questionMapping[qId] = 'nome';
          else if (title.includes('whatsapp') || title.includes('telefone')) questionMapping[qId] = 'whatsapp';
          else if (title.includes('e-mail') || title.includes('email')) questionMapping[qId] = 'email';
          else if (title.includes('setor')) questionMapping[qId] = 'setor';
          else if (title.includes('detalhe') || title.includes('solicitação')) questionMapping[qId] = 'detalhes';
        }
      });

      // Fetch responses
      const resRes = await fetch(`https://forms.googleapis.com/v1/forms/${selectedFormId}/responses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!resRes.ok) throw new Error('Falha ao obter as respostas do formulário.');
      const resData = await resRes.json();

      if (!resData.responses || resData.responses.length === 0) {
        showMessage('Nenhuma resposta encontrada neste formulário.', 'success');
        setIsLoading(false);
        return;
      }

      const newLeads: Omit<LeadItem, 'id' | 'createdAt'>[] = [];

      resData.responses.forEach((resp: any) => {
        const answers = resp.answers || {};
        let nome = 'Lead Google Forms';
        let whatsapp = 'Não informado';
        let email = '';
        let setor: SectorId = 'automacoes';
        let detalhes = '';

        Object.keys(answers).forEach(qId => {
          const type = questionMapping[qId];
          const val = answers[qId]?.textAnswers?.answers?.[0]?.value || '';
          
          if (type === 'nome') nome = val;
          if (type === 'whatsapp') whatsapp = val;
          if (type === 'email') email = val;
          if (type === 'setor') {
            const mappedVal = val as SectorId;
            const validSectors: SectorId[] = [
              'automacoes', 'seguranca', 'monitoramento', 'acesso', 
              'inteligentes', 'incendio', 'portoes', 
              'armazenamento_nuvem', 'redes_infra'
            ];
            if (validSectors.includes(mappedVal)) {
              setor = mappedVal;
            } else {
              setor = 'automacoes';
            }
          }
          if (type === 'detalhes') detalhes = val;
        });

        // Simple deduplication can be done on the parent side, but here we just pass it up.
        newLeads.push({
          nome,
          whatsapp,
          email: email || undefined,
          setor,
          detalhes: detalhes || 'Importado do Google Forms',
          status: 'novo',
          porteProjeto: 'medio',
          notes: `ID da Resposta: ${resp.responseId}`
        });
      });

      onAddLeads(newLeads);
      showMessage(`Foram importados ${newLeads.length} leads do Google Forms com sucesso!`, 'success');

    } catch (err: any) {
      console.error(err);
      showMessage(err.message || 'Erro ao importar as respostas.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-[#00A3FF]/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF]">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Integração com Google Forms</h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Crie formulários e sincronize leads automaticamente
          </p>
        </div>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-xs font-bold font-mono flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : null}
          {message.text}
        </div>
      )}

      {needsAuth || !user ? (
        <div className="text-center py-8">
          <p className="text-sm text-slate-300 mb-6">
            Faça login com sua conta Google para autorizar o acesso ao Google Forms e Drive.
          </p>
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="gsi-material-button mx-auto"
            style={{
              backgroundColor: '#1a73e8',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: 500,
              fontSize: '14px',
              boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)'
            }}
          >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', padding: '2px' }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            {isLoggingIn ? 'Autenticando...' : 'Sign in with Google'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User avatar" className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-white">{user.displayName}</p>
                <p className="text-xs text-slate-400 font-mono">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ações Disponíveis</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Criar novo formulário */}
              <div className="bg-slate-800 border border-white/5 p-4 rounded-xl flex flex-col items-start gap-4">
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Criar Formulário Padrão</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Gera automaticamente um formulário de captação de leads padronizado da PROATIVA na sua conta Google.
                  </p>
                </div>
                <button
                  onClick={handleCreateForm}
                  disabled={isLoading}
                  className="mt-auto px-4 py-2 bg-[#00A3FF]/10 text-[#00A3FF] hover:bg-[#00A3FF] hover:text-white border border-[#00A3FF]/30 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Gerar Formulário
                </button>
              </div>

              {/* Card 2: Importar Respostas */}
              <div className="bg-slate-800 border border-white/5 p-4 rounded-xl flex flex-col gap-4">
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Importar Respostas</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Insira o ID do Formulário gerado ou de um formulário existente para importar os leads preenchidos.
                  </p>
                </div>
                
                <div className="space-y-3 mt-auto">
                  <input 
                    type="text" 
                    value={selectedFormId}
                    onChange={(e) => setSelectedFormId(e.target.value)}
                    placeholder="Cole o ID do Google Forms aqui..."
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:border-[#00A3FF] focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleImportResponses}
                      disabled={isLoading || !selectedFormId}
                      className="flex-1 px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <FileDown className="w-4 h-4" />
                      Sincronizar
                    </button>
                    {selectedFormId && (
                      <a 
                        href={`https://docs.google.com/forms/d/${selectedFormId}/edit`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        title="Abrir formulário"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
