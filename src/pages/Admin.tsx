import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Users, MousePointer, Eye, Activity, Lock, 
  LogOut, LayoutDashboard, Settings, FileText, 
  Bell, Search, ChevronRight, ShieldCheck, Terminal 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Admin.css';

// --- MOCK DATA ---
const VISIT_STATS = [
  { name: 'Главная', visits: 4000 },
  { name: 'Tweaker', visits: 3000 },
  { name: 'Сборки', visits: 2000 },
  { name: 'ISO', visits: 2780 },
  { name: 'WinPE', visits: 1890 },
  { name: 'Гайд', visits: 2390 },
];

const CLICK_STATS = [
  { name: 'Скачать', value: 1200 },
  { name: 'Telegram', value: 800 },
  { name: 'YouTube', value: 450 },
  { name: 'Boosty', value: 150 },
];

const DAILY_TRAFFIC = [
  { day: 'Пн', users: 120 },
  { day: 'Вт', users: 230 },
  { day: 'Ср', users: 180 },
  { day: 'Чт', users: 340 },
  { day: 'Пт', users: 500 },
  { day: 'Сб', users: 480 },
  { day: 'Вс', users: 600 },
];

// Логи действий (новая фича)
const RECENT_LOGS = [
  { id: 1, action: "Login Success", user: "Admin", time: "10:42 AM", status: "success" },
  { id: 2, action: "Update Tweaker", user: "Admin", time: "09:15 AM", status: "warning" },
  { id: 3, action: "Failed Login", user: "IP: 192.168...", time: "04:20 AM", status: "error" },
  { id: 4, action: "New Comment", user: "User_123", time: "Yesterday", status: "info" },
];

const COLORS = ['#9F55FF', '#00C49F', '#FFBB28', '#FF8042'];

export const Admin = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Имитация процесса входа
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (password === 'admin') setIsAuth(true);
      else alert('Access Denied');
    }, 1500);
  };

  // --- ЭКРАН ВХОДА ---
  if (!isAuth) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-bg-grid"></div>
        
        <motion.div 
          className="login-card glass-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="login-header">
            <div className="icon-circle">
              <ShieldCheck size={32} />
            </div>
            <h2>Secure Access</h2>
            <p>Adderly.Top Control Center</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="Enter Access Key..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <button className={`btn-login ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                <>Authorize <ChevronRight size={18} /></>
              )}
            </button>
          </form>

          <div className="login-footer">
            <Terminal size={14} /> System v2.4.0 Secure Connection
          </div>
        </motion.div>
      </div>
    );
  }

  // --- ДАШБОРД ---
  return (
    <div className="admin-layout">
      
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <LayoutDashboard size={24} color="var(--accent-color)" />
          <span>Panel</span>
        </div>
        
        <nav className="sidebar-menu">
          <button className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <Activity size={20} /> Обзор
          </button>
          <button className={`menu-item ${activeTab === 'pages' ? 'active' : ''}`} onClick={() => setActiveTab('pages')}>
            <FileText size={20} /> Страницы
          </button>
          <button className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Настройки
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="menu-item logout" onClick={() => setIsAuth(false)}>
            <LogOut size={20} /> Выйти
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        
        <header className="content-header">
          <div className="header-title">
            <h1>Dashboard</h1>
            <span className="date-badge">Live Updates</span>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search size={16} />
              <input type="text" placeholder="Поиск..." />
            </div>
            <button className="icon-btn"><Bell size={20} /><span className="dot"></span></button>
            <div className="user-avatar">A</div>
          </div>
        </header>

        {/* KPI Grid */}
        <div className="kpi-grid">
          <motion.div className="kpi-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="kpi-head">
              <span>Посетители</span>
              <Users size={18} className="text-accent" />
            </div>
            <div className="kpi-val">12,450</div>
            <div className="kpi-trend positive">+12% this week</div>
            <div className="kpi-chart-bg"></div>
          </motion.div>
          
          <motion.div className="kpi-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="kpi-head">
              <span>Просмотры</span>
              <Eye size={18} className="text-accent" />
            </div>
            <div className="kpi-val">48,200</div>
            <div className="kpi-trend positive">+5% today</div>
          </motion.div>

          <motion.div className="kpi-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="kpi-head">
              <span>Клики</span>
              <MousePointer size={18} className="text-accent" />
            </div>
            <div className="kpi-val">3,890</div>
            <div className="kpi-trend neutral">0% stable</div>
          </motion.div>

           <motion.div className="kpi-card highlight" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="kpi-head">
              <span>Online</span>
              <Activity size={18} />
            </div>
            <div className="kpi-val">42</div>
            <div className="pulse-dot"></div>
          </motion.div>
        </div>

        <div className="dashboard-grid">
          
          {/* Main Chart */}
          <div className="panel chart-panel">
            <h3>Динамика трафика</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={DAILY_TRAFFIC}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9F55FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#9F55FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="day" stroke="#666" axisLine={false} tickLine={false} />
                  <YAxis stroke="#666" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#9F55FF" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Logs Panel */}
          <div className="panel logs-panel">
            <h3>Последние события</h3>
            <div className="logs-list">
              {RECENT_LOGS.map(log => (
                <div key={log.id} className="log-item">
                  <div className={`status-indicator ${log.status}`}></div>
                  <div className="log-info">
                    <span className="log-action">{log.action}</span>
                    <span className="log-user">{log.user}</span>
                  </div>
                  <span className="log-time">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pages Bar Chart */}
          <div className="panel">
            <h3>Топ Страниц</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={VISIT_STATS} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} stroke="#888" tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                  <Bar dataKey="visits" fill="#4ade80" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Clicks Pie Chart */}
          <div className="panel">
             <h3>Конверсия кликов</h3>
             <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={CLICK_STATS}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {CLICK_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};