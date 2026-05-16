import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Wallet, FileText, TrendingUp, Users, Settings,
  Bell, Search, Download, ChevronDown, ArrowUpRight, ArrowDownRight,
  Calendar, BarChart3, CreditCard,
  Eye, EyeOff
} from 'lucide-react';
import { Logo } from './Logo';
import {
  transactions, monthlyData, categoryBreakdown, expenseBreakdown,
  creditScoreHistory
} from '../data/demoData';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Tableau de Bord', id: 'dashboard' },
  { icon: Wallet, label: 'Transactions', id: 'transactions' },
  { icon: TrendingUp, label: 'Trésorerie', id: 'cashflow' },
  { icon: FileText, label: 'Rapports', id: 'reports' },
  { icon: CreditCard, label: 'Score Mosika', id: 'credit' },
  { icon: Users, label: 'Clients', id: 'clients' },
  { icon: Settings, label: 'Paramètres', id: 'settings' },
];

export const DesktopDashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [showBalance, setShowBalance] = useState(true);

  const StatCard = ({ title, value, change, positive, icon: Icon }: any) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 border border-surface-200 hover:shadow-card-hover transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-formalio-50 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-formalio-600" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${positive ? 'bg-formalio-50 text-formalio-700' : 'bg-danger-50 text-danger-600'}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-sm text-surface-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-surface-900">{value}</p>
    </motion.div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Solde Total" value={showBalance ? "12 450 000 FCFA" : "••••••••"} change="+12.5%" positive icon={Wallet} />
        <StatCard title="Revenus (Mois)" value="8 500 000 FCFA" change="+8.2%" positive icon={TrendingUp} />
        <StatCard title="Dépenses (Mois)" value="4 200 000 FCFA" change="-3.1%" positive icon={BarChart3} />
        <StatCard title="Score Mosika" value="760" change="+15 pts" positive icon={CreditCard} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-surface-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-surface-900">Évolution Mensuelle</h3>
              <p className="text-sm text-surface-500">Revenus vs Dépenses</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-sm text-surface-500 bg-surface-50 px-3 py-1.5 rounded-lg">
                <Calendar className="w-4 h-4" />
                2025
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="p-2 bg-surface-50 rounded-lg hover:bg-surface-100">
                <Download className="w-4 h-4 text-surface-500" />
              </button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Revenus" stroke="#059669" fill="url(#revGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" name="Dépenses" stroke="#ef4444" fill="url(#expGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-surface-200">
          <h3 className="text-lg font-semibold text-surface-900 mb-1">Répartition</h3>
          <p className="text-sm text-surface-500 mb-4">Par catégorie</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-surface-600">{cat.name}</span>
                </div>
                <span className="font-medium text-surface-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-surface-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-surface-900">Transactions Récentes</h3>
          <button className="text-sm text-formalio-700 font-medium">Voir tout</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left text-xs font-medium text-surface-500 uppercase tracking-wider py-3">Description</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase tracking-wider py-3">Catégorie</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase tracking-wider py-3">Date</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase tracking-wider py-3">Méthode</th>
                <th className="text-right text-xs font-medium text-surface-500 uppercase tracking-wider py-3">Montant</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-formalio-50' : 'bg-danger-50'}`}>
                        {t.type === 'income' ? <ArrowUpRight className="w-4 h-4 text-formalio-600" /> : <ArrowDownRight className="w-4 h-4 text-danger-500" />}
                      </div>
                      <span className="text-sm font-medium text-surface-900">{t.description}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-surface-600">{t.category}</td>
                  <td className="py-3 text-sm text-surface-500">{t.date}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface-100 text-surface-600">
                      {t.method}
                    </span>
                  </td>
                  <td className={`py-3 text-sm font-semibold text-right ${t.type === 'income' ? 'text-formalio-600' : 'text-danger-500'}`}>
                    {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const CashflowView = () => (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-surface-200">
          <h3 className="text-lg font-semibold text-surface-900 mb-4">Flux de Trésorerie</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" name="Revenus" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Dépenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-surface-200">
          <h3 className="text-lg font-semibold text-surface-900 mb-4">Dépenses par Catégorie</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const CreditView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-surface-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-surface-900">Score Mosika</h3>
            <p className="text-sm text-surface-500">Historique et composantes</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-formalio-700">760</p>
            <p className="text-sm text-formalio-600">Très Bon · +15 ce mois</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={creditScoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis domain={[500, 850]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#059669" strokeWidth={3} dot={{ fill: '#059669', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const views: Record<string, React.ReactNode> = {
    dashboard: <DashboardView />,
    cashflow: <CashflowView />,
    credit: <CreditView />,
    transactions: <DashboardView />,
    reports: <CashflowView />,
    clients: <DashboardView />,
    settings: <CreditView />,
  };

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-200 flex flex-col fixed h-full">
        <div className="p-6">
          <Logo size={32} />
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeItem === item.id
                  ? 'bg-formalio-50 text-formalio-700'
                  : 'text-surface-600 hover:bg-surface-50'
              }`}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-surface-200">
          <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
            <div className="w-9 h-9 bg-formalio-100 rounded-full flex items-center justify-center text-formalio-700 font-bold text-xs">
              MN
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-900 truncate">Marie Nkono</p>
              <p className="text-xs text-surface-500 truncate">Boutique Élégance</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-surface-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2 bg-surface-50 rounded-xl px-3 py-2 w-96">
                <Search className="w-4 h-4 text-surface-400" />
                <input type="text" placeholder="Rechercher..." className="bg-transparent outline-none text-sm flex-1" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowBalance(!showBalance)} className="p-2 bg-surface-50 rounded-lg hover:bg-surface-100">
                {showBalance ? <Eye className="w-4 h-4 text-surface-500" /> : <EyeOff className="w-4 h-4 text-surface-500" />}
              </button>
              <button className="relative p-2 bg-surface-50 rounded-lg hover:bg-surface-100">
                <Bell className="w-4 h-4 text-surface-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <motion.div key={activeItem} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {views[activeItem] || <DashboardView />}
          </motion.div>
        </div>
      </main>
    </div>
  );
};
