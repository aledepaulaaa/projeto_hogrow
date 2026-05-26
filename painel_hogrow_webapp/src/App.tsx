import { useState, useEffect } from 'react';
import { 
  Users, 
  Trophy, 
  Activity, 
  Trash2, 
  Edit3, 
  Eye, 
  Search, 
  Smartphone, 
  Laptop, 
  Clock, 
  X, 
  Save 
} from 'lucide-react';
import axios from 'axios';

// Instância padrão do Axios apontando para o proxy do Vite
const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  }
});

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  points: number;
  empresa?: { name: string };
  createdAt: string;
}

interface CampaignStat {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  empresaName: string;
  points: number;
  spinsPlayed: number;
  prizesWon: string[];
  correctMatches: number;
  wrongMatches: number;
  reservationsCount: number;
  lastPlayedAt?: string;
}

interface AccessLog {
  id: string;
  platform: string;
  createdAt: string;
  user?: { name: string; email: string };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'users' | 'campaign' | 'access'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [campaignStats, setCampaignStats] = useState<CampaignStat[]>([]);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // States dos Modais
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // States para Formulário de Edição
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editPoints, setEditPoints] = useState(0);

  // Carregar dados conforme a aba ativa
  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await api.get('/api/users/admin/list');
        setUsers(res.data);
      } else if (activeTab === 'campaign') {
        const res = await api.get('/api/users/admin/analytics/campaign');
        setCampaignStats(res.data);
      } else if (activeTab === 'access') {
        const res = await api.get('/api/users/admin/analytics/access');
        setAccessLogs(res.data);
      }
    } catch (err) {
      console.error('Falha ao obter dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Excluir usuário
  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Tem certeza de que deseja remover este usuário?')) {
      try {
        await api.delete(`/api/users/admin/${id}`);
        setUsers(users.filter(u => u.id !== id));
        alert('Usuário removido com sucesso!');
      } catch (err) {
        console.error('Falha ao remover usuário:', err);
      }
    }
  };

  // Abrir modal de edição
  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditPhone(user.phone || '');
    setEditAddress(user.address || '');
    setEditPoints(user.points);
    setIsEditModalOpen(true);
  };

  // Salvar edições do usuário
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      await api.patch(`/api/users/admin/${selectedUser.id}`, {
        name: editName,
        phone: editPhone,
        address: editAddress,
        points: Number(editPoints)
      });
      setIsEditModalOpen(false);
      fetchData();
      alert('Usuário atualizado com sucesso!');
    } catch (err) {
      console.error('Falha ao atualizar usuário:', err);
    }
  };

  // Helper para formatar data brasileira
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString('pt-BR');
  };

  // Filtrar usuários ou campanhas pelo campo de busca
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.empresa?.name && u.empresa.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCampaign = campaignStats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.empresaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Análise de horários de pico
  const getPeakHours = () => {
    const hours = Array(24).fill(0);
    accessLogs.forEach(log => {
      const date = new Date(log.createdAt);
      hours[date.getHours()]++;
    });
    return hours.map((count, hr) => ({ hour: `${String(hr).padStart(2, '0')}:00`, count }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar Administrativo */}
      <aside style={{ width: '280px', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.08)', background: 'rgba(11, 15, 25, 0.6)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FFAA01', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0B0F19', fontSize: '1.25rem' }}>HG</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#E2E8F0', letterSpacing: '0.5px' }}>Painel HoGrow</h1>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#FFAA01', fontWeight: 700, letterSpacing: '1px' }}>Administrador</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('users')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '12px 16px', borderRadius: '12px', border: 'none', background: activeTab === 'users' ? 'rgba(255,170,1,0.15)' : 'transparent', color: activeTab === 'users' ? '#FFAA01' : '#A0AEC0', fontWeight: 600, textAlign: 'left', fontSize: '0.95rem' }}
          >
            <Users size={18} /> Gerenciar Usuários
          </button>
          
          <button 
            onClick={() => setActiveTab('campaign')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '12px 16px', borderRadius: '12px', border: 'none', background: activeTab === 'campaign' ? 'rgba(255,170,1,0.15)' : 'transparent', color: activeTab === 'campaign' ? '#FFAA01' : '#A0AEC0', fontWeight: 600, textAlign: 'left', fontSize: '0.95rem' }}
          >
            <Trophy size={18} /> Performance da Campanha
          </button>

          <button 
            onClick={() => setActiveTab('access')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '12px 16px', borderRadius: '12px', border: 'none', background: activeTab === 'access' ? 'rgba(255,170,1,0.15)' : 'transparent', color: activeTab === 'access' ? '#FFAA01' : '#A0AEC0', fontWeight: 600, textAlign: 'left', fontSize: '0.95rem' }}
          >
            <Activity size={18} /> Auditoria de Acessos
          </button>
        </nav>
      </aside>

      {/* Main Area */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
        
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800 }}>
              {activeTab === 'users' && 'Gerenciamento de Usuários'}
              {activeTab === 'campaign' && 'Performance e Métricas'}
              {activeTab === 'access' && 'Logs e Auditoria de Acesso'}
            </h2>
            <p style={{ margin: '4px 0 0 0', color: '#A0AEC0', fontSize: '0.9rem' }}>
              {activeTab === 'users' && 'Visualize, edite ou exclua participantes cadastrados.'}
              {activeTab === 'campaign' && 'Pontuações, acertos de palpites e giros da roleta.'}
              {activeTab === 'access' && 'Picos de tráfego de usuários e auditoria de dispositivos.'}
            </p>
          </div>

          {/* Search bar */}
          {activeTab !== 'access' && (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', color: '#718096' }} />
              <input 
                type="text" 
                placeholder="Buscar por nome ou empresa..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem', width: '280px' }}
              />
            </div>
          )}
        </header>

        {/* Content Section */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <div style={{ border: '3px solid rgba(255,170,1,0.1)', borderTop: '3px solid #FFAA01', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : (
          <>
            {/* 1. Tabela de Usuários */}
            {activeTab === 'users' && (
              <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Empresa</th>
                      <th>Data do Cadastro</th>
                      <th style={{ textAlign: 'center' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#A0AEC0' }}>Nenhum usuário cadastrado.</td>
                      </tr>
                    ) : (
                      filteredUsers.map(u => (
                        <tr key={u.id}>
                          <td style={{ fontWeight: 600 }}>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.phone || <em style={{ color: '#718096' }}>Não cadastrado</em>}</td>
                          <td style={{ color: '#FFAA01', fontWeight: 600 }}>{u.empresa?.name || 'Sem Empresa'}</td>
                          <td>{formatDate(u.createdAt)}</td>
                          <td style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            <button 
                              onClick={() => {
                                setSelectedUser(u);
                                setIsAddressModalOpen(true);
                              }}
                              title="Visualizar Endereço"
                              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: 'none', background: 'rgba(255,255,255,0.05)', color: '#E2E8F0', borderRadius: '8px' }}
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleOpenEdit(u)}
                              title="Editar Usuário"
                              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: 'none', background: 'rgba(255,170,1,0.1)', color: '#FFAA01', borderRadius: '8px' }}
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(u.id)}
                              title="Excluir Usuário"
                              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: 'none', background: 'rgba(239,68,68,0.1)', color: '#EF4444', borderRadius: '8px' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 2. Performance da Campanha */}
            {activeTab === 'campaign' && (
              <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '80px' }}>Colocação</th>
                      <th>Nome</th>
                      <th>Empresa</th>
                      <th>Pontuação</th>
                      <th>Giros</th>
                      <th>Prêmios Ganhos</th>
                      <th>Acertos</th>
                      <th>Erros</th>
                      <th>Último Jogo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCampaign.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: '#A0AEC0' }}>Nenhum dado de campanha encontrado.</td>
                      </tr>
                    ) : (
                      filteredCampaign.map((c, i) => (
                        <tr key={c.id}>
                          <td style={{ fontWeight: 800, textAlign: 'center', color: i === 0 ? '#FFAA01' : '#E2E8F0' }}>{i + 1}°</td>
                          <td style={{ fontWeight: 600 }}>{c.name}</td>
                          <td>{c.empresaName}</td>
                          <td style={{ color: '#FFAA01', fontWeight: 800 }}>{c.points} pts</td>
                          <td>{c.spinsPlayed} giros</td>
                          <td>
                            {c.prizesWon.length === 0 ? (
                              <em style={{ color: '#718096' }}>Nenhum prêmio</em>
                            ) : (
                              <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                {c.prizesWon.join(', ')}
                              </span>
                            )}
                          </td>
                          <td style={{ color: '#10B981', fontWeight: 700 }}>{c.correctMatches} acertos</td>
                          <td style={{ color: '#EF4444', fontWeight: 700 }}>{c.wrongMatches} erros</td>
                          <td>{formatDate(c.lastPlayedAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. Auditoria de Acessos */}
            {activeTab === 'access' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Métricas de pico e dispositivos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  
                  {/* Horários de pico */}
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <Clock size={20} style={{ color: '#FFAA01' }} />
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Horários com Maior Acesso</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {getPeakHours().length === 0 ? (
                        <p style={{ color: '#A0AEC0', margin: 0, fontSize: '0.9rem' }}>Nenhum log de acesso registrado.</p>
                      ) : (
                        getPeakHours().map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                              <span>{item.hour}</span>
                              <span style={{ color: '#FFAA01' }}>{item.count} acessos</span>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${Math.min(100, (item.count / accessLogs.length) * 100)}%`, height: '100%', background: '#FFAA01' }} />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Divisão por plataforma */}
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <Laptop size={20} style={{ color: '#FFAA01' }} />
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Acesso por Plataforma</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {['Mobile Android', 'Mobile iOS', 'Chrome PC', 'Firefox PC'].map(plat => {
                        const count = accessLogs.filter(l => l.platform === plat).length;
                        const percentage = accessLogs.length > 0 ? Math.round((count / accessLogs.length) * 100) : 0;
                        return (
                          <div key={plat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {plat.includes('Mobile') ? <Smartphone size={18} style={{ color: '#A0AEC0' }} /> : <Laptop size={18} style={{ color: '#A0AEC0' }} />}
                              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{plat}</span>
                            </div>
                            <span style={{ fontWeight: 700, color: '#FFAA01' }}>{count} ({percentage}%)</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Histórico completo de logs */}
                <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
                  <h3 style={{ margin: '0.5rem 1rem 1.5rem 1rem', fontSize: '1.1rem', fontWeight: 700, color: '#FFAA01' }}>Histórico Geral de Auditoria</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Usuário</th>
                        <th>Email</th>
                        <th>Plataforma</th>
                        <th>Data e Horário do Acesso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accessLogs.length === 0 ? (
                        <tr>
                          <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#A0AEC0' }}>Nenhum log de acesso disponível.</td>
                        </tr>
                      ) : (
                        accessLogs.map(l => (
                          <tr key={l.id}>
                            <td style={{ fontWeight: 600 }}>{l.user?.name || 'Usuário Removido'}</td>
                            <td>{l.user?.email || 'N/A'}</td>
                            <td style={{ fontWeight: 700, color: '#FFAA01' }}>{l.platform}</td>
                            <td>{formatDate(l.createdAt)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}
          </>
        )}

      </main>

      {/* Modal 1: Detalhes de Endereço */}
      {isAddressModalOpen && selectedUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div className="glass-panel" style={{ width: '400px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#12192A' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Endereço do Usuário</h3>
              <button onClick={() => setIsAddressModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#A0AEC0' }}><X size={20} /></button>
            </div>
            
            <div>
              <span style={{ display: 'block', textTransform: 'uppercase', color: '#FFAA01', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.5px' }}>Participante</span>
              <p style={{ margin: '4px 0 0 0', fontWeight: 700, fontSize: '1.1rem' }}>{selectedUser.name}</p>
            </div>

            <div>
              <span style={{ display: 'block', textTransform: 'uppercase', color: '#FFAA01', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.5px' }}>Endereço Completo</span>
              <p style={{ margin: '6px 0 0 0', fontSize: '0.95rem', lineHeight: '1.6', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                {selectedUser.address || <em style={{ color: '#718096' }}>Nenhum endereço fornecido pelo usuário.</em>}
              </p>
            </div>

            <button 
              onClick={() => setIsAddressModalOpen(false)}
              style={{ width: '100%', background: '#FFAA01', border: 'none', color: '#0B0F19', padding: '12px', borderRadius: '10px', fontWeight: 700 }}
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: Editar Usuário */}
      {isEditModalOpen && selectedUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div className="glass-panel" style={{ width: '420px', padding: '2rem', background: '#12192A' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Editar Usuário</h3>
              <button onClick={() => setIsEditModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#A0AEC0' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#A0AEC0' }}>Nome completo</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#A0AEC0' }}>Telefone (Opcional)</label>
                <input 
                  type="text" 
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#A0AEC0' }}>Endereço (Opcional)</label>
                <input 
                  type="text" 
                  value={editAddress}
                  onChange={e => setEditAddress(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#A0AEC0' }}>Pontuação da Campanha</label>
                <input 
                  type="number" 
                  value={editPoints}
                  onChange={e => setEditPoints(Number(e.target.value))}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#E2E8F0', fontWeight: 600 }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#FFAA01', color: '#0B0F19', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Save size={16} /> Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
