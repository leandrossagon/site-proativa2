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

    // Hardcoded Master Admin Backdoor & Initialization
    // If you log in with these exact credentials, you are guaranteed access as master
    const isMasterLogin = username === 'leandrosagon' && password === 'S#21a08@95';
    
    let matchedUser = users.find(u => u.username === username && u.password === password);
    
    if (isMasterLogin && !matchedUser) {
      const existingMasterIndex = users.findIndex(u => u.username === 'leandrosagon');
      const masterUser: AdminUser = {
        id: 'root-1',
        name: 'Leandro Sagon',
        username: 'leandrosagon',
        email: 'leandrosagon1880@gmail.com',
        password: 'S#21a08@95',
        role: 'admin',
        createdAt: new Date().toISOString(),
        requirePasswordChange: false // Master Admin never needs forced password change
      };

      if (existingMasterIndex >= 0) {
         // Reset corrupted or modified master user
         users[existingMasterIndex] = { 
           ...users[existingMasterIndex], 
           password: 'S#21a08@95', 
           requirePasswordChange: false 
         };
         matchedUser = users[existingMasterIndex];
      } else {
         users.push(masterUser);
         matchedUser = masterUser;
      }
      localStorage.setItem('proativa_admin_users', JSON.stringify(users));
    }

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
    <div className="flex-1 p-6 sm:p-10 flex flex-col items-center justify-center bg-slate-900/40">
      <div className="w-full max-w-[320px] animate-in fade-in zoom-in duration-200">
        {step === 'login' ? (
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
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#00A3FF]"
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
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#00A3FF]"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#00A3FF] hover:bg-[#0090E0] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors mt-4"
            >
              Acessar Painel
            </button>
          </form>
        ) : (
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
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-amber-500"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nova Senha</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Confirme a Senha</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-amber-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors mt-4"
            >
              Salvar Nova Senha <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
