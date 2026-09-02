cat << 'INNER_EOF' > src/components/AdminLogin.tsx
import React, { useState } from 'react';
import { Lock, Shield, ArrowRight, AlertCircle, X } from 'lucide-react';
import { AdminUser } from '../types';

interface AdminLoginProps {
  onLogin: (user: AdminUser) => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [step, setStep] = useState<'login' | 'force_change'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [pendingUser, setPendingUser] = useState<AdminUser | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (pwd: string) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>\-_]/.test(pwd);
    return hasUpper && hasLower && hasNumber && hasSpecial && pwd.length >= 8;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const stored = localStorage.getItem('proativa_admin_users');
    let users: AdminUser[] = [];
    
    if (stored) {
      try {
        users = JSON.parse(stored);
      } catch(e) {}
    }

    if (users.length === 0) {
      const defaultRootUser: AdminUser = {
        id: 'root-1',
        name: 'Leandro Sagon',
        username: 'leandrosagon',
        password: 'S#21a08@95',
        role: 'admin',
        createdAt: new Date().toISOString(),
        requirePasswordChange: false
      };
      users.push(defaultRootUser);
      localStorage.setItem('proativa_admin_users', JSON.stringify(users));
    }

    const matchedUser = users.find(u => u.username === username && u.password === password);
    
    if (matchedUser) {
      if (matchedUser.requirePasswordChange) {
        setPendingUser(matchedUser);
        setNewEmail(matchedUser.email || '');
        setStep('force_change');
      } else {
        onLogin(matchedUser);
      }
    } else {
      setError('Credenciais inválidas.');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('Senha fraca. Use min/maiúscula, número e símbolo.');
      return;
    }

    if (!newEmail) {
      setError('Confirme um e-mail válido.');
      return;
    }

    const stored = localStorage.getItem('proativa_admin_users');
    if (stored && pendingUser) {
      const users: AdminUser[] = JSON.parse(stored);
      const updatedUsers = users.map(u => {
        if (u.id === pendingUser.id) {
          return {
            ...u,
            password: newPassword,
            email: newEmail,
            requirePasswordChange: false
          };
        }
        return u;
      });
      localStorage.setItem('proativa_admin_users', JSON.stringify(updatedUsers));
      
      const updatedUser = updatedUsers.find(u => u.id === pendingUser.id);
      if (updatedUser) {
        onLogin(updatedUser);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto" onClick={onCancel}>
      <div 
        className="bg-slate-900 border border-white/10 rounded-xl w-full max-w-sm shadow-2xl relative animate-in fade-in zoom-in duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
        
        {step === 'login' ? (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <div className="w-10 h-10 bg-[#00A3FF]/10 rounded-lg flex items-center justify-center border border-[#00A3FF]/20">
                <Shield className="w-5 h-5 text-[#00A3FF]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Login</h2>
                <p className="text-xs text-slate-400">Acesso Restrito</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded text-xs text-center flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error}
                </div>
              )}
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Usuário</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00A3FF]"
                  placeholder="Digite seu login"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Senha</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00A3FF]"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#00A3FF] hover:bg-[#0090E0] text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors mt-2"
              >
                Entrar
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20">
                <Lock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Nova Senha</h2>
                <p className="text-xs text-slate-400">Troca obrigatória</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded text-xs text-center flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {error}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Confirmar E-mail</label>
                <input 
                  type="email" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nova Senha</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Confirme a Senha</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors mt-2"
              >
                Salvar <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
INNER_EOF
