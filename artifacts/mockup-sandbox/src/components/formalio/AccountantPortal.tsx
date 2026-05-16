import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, FileText, CheckCircle2, AlertTriangle, Search, Bell,
  Download, Filter, Eye, Check, X, Clock, Briefcase
} from 'lucide-react';
import { Logo } from './Logo';
import { accountantClients, monthlyData } from '../data/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sidebarItems = [
  { icon: Users, label: 'Clients', id: 'clients' },
  { icon: FileText, label: 'Reports', id: 'reports' },
  { icon: CheckCircle2, label: 'Audit', id: 'audit' },
  { icon: AlertTriangle, label: 'Compliance', id: 'compliance' },
];

export const AccountantPortal: React.FC = () => {
  const [activeItem, setActiveItem] = useState('clients');

  const ClientsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Clients', value: '24', icon: Users, color: 'bg-formalio-600' },
          { title: 'Compliant', value: '18', icon: CheckCircle2, color: 'bg-formalio-500' },
          { title: 'Under Review', value: '4', icon: Clock, color: 'bg-gold-500' },
          { title: 'Audit Required', value: '2', icon: AlertTriangle, color: 'bg-danger-500' },
        ].map((stat) => (
          <div key={stat.title} className="bg-white rounded-2xl p-5 border border-surface-200">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-surface-500">{stat.title}</p>
            <p className="text-2xl font-bold text-surface-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-surface-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-surface-900">Client Management</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 text-sm text-surface-500 bg-surface-50 px-3 py-1.5 rounded-lg">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="p-2 bg-surface-50 rounded-lg"><Download className="w-4 h-4 text-surface-500" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Business</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Status</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Last Report</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Transactions</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Alerts</th>
                <th className="text-right text-xs font-medium text-surface-500 uppercase py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accountantClients.map((client) => (
                <tr key={client.id} className="border-b border-surface-100 hover:bg-surface-50">
                  <td className="py-3">
                    <div>
                      <p className="text-sm font-medium text-surface-900">{client.name}</p>
                      <p className="text-xs text-surface-500">{client.owner}</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === 'compliant' ? 'bg-formalio-50 text-formalio-700' :
                      client.status === 'review' ? 'bg-gold-50 text-gold-700' :
                      'bg-danger-50 text-danger-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        client.status === 'compliant' ? 'bg-formalio-500' :
                        client.status === 'review' ? 'bg-gold-500' :
                        'bg-danger-500'
                      }`} />
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-surface-600">{client.lastReport}</td>
                  <td className="py-3 text-sm text-surface-900">{client.transactions}</td>
                  <td className="py-3">
                    {client.alerts > 0 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-danger-50 text-danger-700">
                        {client.alerts} alerts
                      </span>
                    ) : (
                      <span className="text-xs text-surface-400">None</span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <button className="p-2 bg-surface-50 rounded-lg hover:bg-surface-100">
                      <Eye className="w-4 h-4 text-surface-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-surface-200">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Client Revenue Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const AuditView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-surface-200">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Pending Approvals</h3>
        <div className="space-y-3">
          {[
            { id: 'AUD-001', client: 'Transport Express', type: 'Expense Verification', amount: '450,000 FCFA', status: 'pending' },
            { id: 'AUD-002', client: 'Agro Business SARL', type: 'Revenue Declaration', amount: '1,200,000 FCFA', status: 'flagged' },
            { id: 'AUD-003', client: 'Restaurant Bon Goût', type: 'Tax Filing', amount: '125,000 FCFA', status: 'pending' },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-surface-200">
                <Briefcase className="w-5 h-5 text-surface-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-surface-900">{item.type}</p>
                  <span className="text-xs text-surface-400">{item.id}</span>
                </div>
                <p className="text-xs text-surface-500">{item.client} · {item.amount}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-formalio-50 rounded-lg text-formalio-600 hover:bg-formalio-100">
                  <Check className="w-4 h-4" />
                </button>
                <button className="p-2 bg-danger-50 rounded-lg text-danger-600 hover:bg-danger-100">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const views: Record<string, React.ReactNode> = {
    clients: <ClientsView />,
    reports: <ClientsView />,
    audit: <AuditView />,
    compliance: <AuditView />,
  };

  return (
    <div className="min-h-screen bg-surface-50 flex">
      <aside className="w-64 bg-white border-r border-surface-200 flex flex-col fixed h-full">
        <div className="p-6">
          <Logo size={32} />
          <p className="text-xs text-surface-400 mt-1">Accountant Portal</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeItem === item.id ? 'bg-formalio-50 text-formalio-700' : 'text-surface-600 hover:bg-surface-50'
              }`}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-surface-200 px-8 py-4 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-surface-50 rounded-xl px-3 py-2 w-96">
            <Search className="w-4 h-4 text-surface-400" />
            <input type="text" placeholder="Search clients..." className="bg-transparent outline-none text-sm flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 bg-surface-50 rounded-lg">
              <Bell className="w-4 h-4 text-surface-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
            </button>
            <div className="w-9 h-9 bg-formalio-100 rounded-full flex items-center justify-center text-formalio-700 font-bold text-xs">
              AC
            </div>
          </div>
        </header>
        <div className="p-8">
          <motion.div key={activeItem} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {views[activeItem] || <ClientsView />}
          </motion.div>
        </div>
      </main>
    </div>
  );
};
