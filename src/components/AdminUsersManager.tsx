import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Shield, User, Clock, Key, Eye, AlertCircle } from 'lucide-react';
import { AdminUser, AdminRole } from '../types';

interface AdminUsersManagerProps {
  currentUser: AdminUser;
}

const LOCAL_STORAGE_KEY = 'proativa_admin_users';

export const AdminUsersManager: React.FC<AdminUsersManagerProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('viewer');

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setUsers(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaultUser: AdminUser = {
        id: 'root-1',
        name: 'Leandro Sagon',
        username: 'leandrosagon',
        password: 'S#21a08@95',
        role: 'admin',
        createdAt: new Date().toISOString(),
        requirePasswordChange: false
      };
      setUsers([defaultUser]);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([defaultUser]));
    }
  }, []);

  const handleSave = () => {
    if (!newName || !newUsername || !newPassword) {
      alert('Preencha todos os campos obrigatórios (Nome, Login e Senha Temporária).');
      return;
    }
    
    if (users.find(u => u.username === newUsername)) {
      alert('Este nome de usuário já existe.');
      return;
    }

    const newUser: AdminUser = {
      id: Date.now().toString(),
      name: newName,
      username: newUsername,
      password: newPassword,
      email: newEmail,
      role: newRole,
      createdAt: new Date().toISOString(),
      requirePasswordChange: true // Forces password change on first login
    };

    const updated = [...users, newUser];
    setUsers(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    
    setIsAdding(false);
    setNewName('');
    setNewUsername('');
    setNewPassword('');
    setNewEmail('');
    setNewRole('viewer');
  };

  const handleDelete = (id: string) => {
    if (id === currentUser.id) {
      alert('Você não pode excluir a si mesmo enquanto estiver logado.');
      return;
    }
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  if (currentUser.role !== 'admin') {
    return (
      <div className="p-8 text-center bg-slate-900 rounded-xl border border-white/5">
        <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Acesso Restrito</h3>
        <p className="text-slate-400 text-sm">
          Apenas usuários com permissão de Administrador podem gerenciar a equipe.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#00A3FF]" />
            Gerenciamento de Usuários
          </h2>
          <p className="text-slate-400 text-sm mt-1">Crie logins e defina permissões de acesso ao painel.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#00A3FF] hover:bg-[#0090E0] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
        >
          {isAdding ? 'Cancelar' : <><Plus className="w-4 h-4" /> Novo Usuário</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10 space-y-4 relative">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Cadastrar Novo Acesso</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nome Completo</label>
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00A3FF]"
                placeholder="Ex: João Silva"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">E-mail (Opcional)</label>
              <input 
                type="email" 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00A3FF]"
                placeholder="joao@proativatec.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nome de Usuário (Login)</label>
              <input 
                type="text" 
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00A3FF]"
                placeholder="Ex: joao.silva"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Senha Temporária</label>
              <input 
                type="text" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00A3FF]"
                placeholder="Ex: 123456"
              />
              <p className="text-[10px] text-amber-400/80 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Usuário será forçado a trocar a senha no 1º login.
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Permissão / Cargo</label>
              <select 
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as AdminRole)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00A3FF]"
              >
                <option value="admin">Administrador (Acesso Total)</option>
                <option value="manager">Gerente Comercial (Lê e Edita Leads)</option>
                <option value="viewer">Visualizador (Apenas Leitura)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              Cadastrar Usuário
            </button>
          </div>
        </div>
      )}

      <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/80 text-xs uppercase text-slate-400 border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-semibold">Usuário</th>
              <th className="px-6 py-4 font-semibold">Login / E-mail</th>
              <th className="px-6 py-4 font-semibold">Permissão</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00A3FF]/20 flex items-center justify-center text-[#00A3FF] font-bold">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-white">{u.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400">
                  <div className="flex flex-col">
                    <span className="text-white">{u.username}</span>
                    <span className="text-[10px]">{u.email || 'Sem e-mail'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    u.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    u.role === 'manager' ? 'bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20' :
                    'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                  }`}>
                    {u.role === 'admin' && <Shield className="w-3 h-3" />}
                    {u.role === 'manager' && <Key className="w-3 h-3" />}
                    {u.role === 'viewer' && <Eye className="w-3 h-3" />}
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {u.requirePasswordChange ? (
                    <span className="text-amber-400 text-xs flex items-center gap-1 font-medium bg-amber-400/10 px-2 py-1 rounded w-max">
                      <AlertCircle className="w-3 h-3" /> Pendente de Login
                    </span>
                  ) : (
                    <span className="text-emerald-400 text-xs flex items-center gap-1 font-medium bg-emerald-400/10 px-2 py-1 rounded w-max">
                      Ativo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(u.id)}
                    disabled={u.id === currentUser.id}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      u.id === currentUser.id 
                        ? 'text-slate-600 cursor-not-allowed' 
                        : 'text-red-400 hover:bg-red-500/10'
                    }`}
                    title={u.id === currentUser.id ? 'Você não pode se excluir' : 'Excluir usuário'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
