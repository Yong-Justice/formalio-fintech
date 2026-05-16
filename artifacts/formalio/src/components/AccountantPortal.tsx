import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, FileText, CheckCircle2, AlertTriangle, Search, Bell,
  Download, Filter, Eye, Check, X, Clock, Briefcase, Award,
  BarChart3, Shield, Calendar, TrendingUp, ChevronRight
} from 'lucide-react';
import { Logo } from './Logo';
import { accountantClients, monthlyData } from '../data/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sidebarItems = [
  { icon: Users, label: 'Mes Clients', id: 'clients' },
  { icon: FileText, label: 'Rapports OHADA', id: 'reports' },
  { icon: CheckCircle2, label: 'Audit & Révision', id: 'audit' },
  { icon: Shield, label: 'Conformité DGI', id: 'compliance' },
];

const statusLabel = (status: string) => {
  if (status === 'compliant') return 'Conforme';
  if (status === 'review') return 'En révision';
  return 'Alerte';
};

export const AccountantPortal: React.FC = () => {
  const [activeItem, setActiveItem] = useState('clients');

  const ClientsView = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-formalio-700">Portail Expert-Comptable</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-surface-900">Gestion des Clients</h1>
        <p className="mt-2 text-sm text-surface-500">Suivez vos clients PME, leurs rapports SYSCOHADA et leur statut de conformité fiscale.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Clients', value: '24', icon: Users, color: 'bg-formalio-600' },
          { title: 'Conformes', value: '18', icon: CheckCircle2, color: 'bg-formalio-500' },
          { title: 'En Révision', value: '4', icon: Clock, color: 'bg-gold-500' },
          { title: 'Audit Requis', value: '2', icon: AlertTriangle, color: 'bg-danger-500' },
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
          <h3 className="text-lg font-semibold text-surface-900">Liste des Clients PME</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 text-sm text-surface-500 bg-surface-50 px-3 py-1.5 rounded-lg">
              <Filter className="w-4 h-4" /> Filtrer
            </button>
            <button className="p-2 bg-surface-50 rounded-lg"><Download className="w-4 h-4 text-surface-500" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Entreprise</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Statut</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Dernier Rapport</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Transactions</th>
                <th className="text-left text-xs font-medium text-surface-500 uppercase py-3">Alertes</th>
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
                      {statusLabel(client.status)}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-surface-600">{client.lastReport}</td>
                  <td className="py-3 text-sm text-surface-900">{client.transactions}</td>
                  <td className="py-3">
                    {client.alerts > 0 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-danger-50 text-danger-700">
                        {client.alerts} alerte{client.alerts > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-xs text-surface-400">Aucune</span>
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
        <h3 className="text-lg font-semibold text-surface-900 mb-1">Évolution du Chiffre d'Affaires Clients</h3>
        <p className="text-sm text-surface-500 mb-4">Revenus et dépenses consolidés — en FCFA</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `${(v / 1000).toLocaleString('fr-FR')}K`} />
              <Tooltip formatter={(v: number) => [`${v.toLocaleString('fr-FR')} FCFA`]} />
              <Legend />
              <Bar dataKey="revenue" name="Revenus" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Dépenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const ReportsView = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-formalio-700">Portail Expert-Comptable</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-surface-900">Rapports OHADA / SYSCOHADA</h1>
        <p className="mt-2 text-sm text-surface-500">Générez et exportez les états financiers conformes au Système Comptable OHADA (SYSCOHADA révisé 2017).</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: BarChart3, label: 'Bilans générés', value: '47', sub: 'Janvier 2025' },
          { icon: TrendingUp, label: 'Comptes de résultat', value: '39', sub: 'Janvier 2025' },
          { icon: Calendar, label: 'Déclarations TVA', value: '24', sub: 'T4 2024' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-surface-200">
            <s.icon className="w-8 h-8 text-formalio-600 mb-3" />
            <p className="text-sm text-surface-500">{s.label}</p>
            <p className="text-2xl font-bold text-surface-900">{s.value}</p>
            <p className="text-xs text-surface-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-surface-200">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-surface-900">Rapports par client</h3>
          <button className="flex items-center gap-2 bg-formalio-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-formalio-800 transition-colors">
            <Download className="w-4 h-4" /> Exporter tout
          </button>
        </div>
        <div className="space-y-3">
          {[
            { client: 'Boutique Elegance', owner: 'Marie Nkono', type: 'Bilan Comptable', period: 'Janv. 2025', status: 'ready', score: 760 },
            { client: 'Transport Express', owner: 'Jean-Pierre Eteme', type: 'Compte de Résultat', period: 'Janv. 2025', status: 'ready', score: 680 },
            { client: 'Restaurant Bon Goût', owner: 'Aminata Fouda', type: 'Flux de Trésorerie', period: 'Janv. 2025', status: 'ready', score: 720 },
            { client: 'Agro Business SARL', owner: 'Paul Ndongo', type: 'Déclaration TVA 19,25%', period: 'T4 2024', status: 'pending', score: 590 },
            { client: 'Tech Solutions CM', owner: 'Kofi Mensah', type: 'DSF — Déclaration Statistique', period: 'Exerc. 2024', status: 'ready', score: 810 },
          ].map((item) => (
            <div key={item.client + item.type} className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl hover:bg-formalio-50/40 cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-surface-200">
                <FileText className="w-5 h-5 text-formalio-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-surface-900">{item.client}</p>
                  <span className="text-xs text-surface-400">· {item.owner}</span>
                </div>
                <p className="text-xs text-surface-500 mt-0.5">{item.type} · {item.period}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.status === 'ready' ? 'bg-formalio-50 text-formalio-700' : 'bg-amber-50 text-amber-700'}`}>
                  {item.status === 'ready' ? 'Prêt' : 'En attente'}
                </span>
                <button className="p-1.5 bg-white rounded-lg border border-surface-200 hover:bg-formalio-50">
                  <Download className="w-4 h-4 text-surface-500" />
                </button>
                <ChevronRight className="w-4 h-4 text-surface-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-formalio-800 to-formalio-900 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Award className="w-6 h-6 text-formalio-300" />
          <div>
            <p className="font-semibold">Certifié ONECCA-CM</p>
            <p className="text-xs text-white/70">Ordre National des Experts-Comptables et Comptables Agréés du Cameroun</p>
          </div>
        </div>
        <p className="text-xs text-white/60">Tous les rapports générés sont conformes au SYSCOHADA révisé (acte uniforme OHADA 2017) et acceptés par la DGI Cameroun.</p>
      </div>
    </div>
  );

  const AuditView = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-formalio-700">Portail Expert-Comptable</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-surface-900">Audit & Révision Comptable</h1>
        <p className="mt-2 text-sm text-surface-500">Validez les pièces justificatives, vérifiez les imputations et approuvez les déclarations de vos clients.</p>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-surface-200">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Approbations en attente</h3>
        <div className="space-y-3">
          {[
            { id: 'AUD-001', client: 'Transport Express', type: 'Vérification Dépenses', amount: '450 000 FCFA', status: 'pending' },
            { id: 'AUD-002', client: 'Agro Business SARL', type: 'Déclaration de Revenus', amount: '1 200 000 FCFA', status: 'flagged' },
            { id: 'AUD-003', client: 'Restaurant Bon Goût', type: 'Déclaration TVA 19,25%', amount: '125 000 FCFA', status: 'pending' },
            { id: 'AUD-004', client: 'Boutique Elegance', type: 'Réconciliation MoMo', amount: '78 500 FCFA', status: 'pending' },
          ].map((item) => (
            <div key={item.id} className={`flex items-center gap-4 p-4 rounded-xl border ${item.status === 'flagged' ? 'bg-danger-50 border-danger-200' : 'bg-surface-50 border-surface-200'}`}>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-surface-200">
                <Briefcase className={`w-5 h-5 ${item.status === 'flagged' ? 'text-danger-500' : 'text-surface-500'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-surface-900">{item.type}</p>
                  <span className="text-xs text-surface-400">{item.id}</span>
                  {item.status === 'flagged' && (
                    <span className="text-[10px] bg-danger-100 text-danger-700 px-1.5 py-0.5 rounded font-semibold">SIGNALÉ</span>
                  )}
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

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Approuvés ce mois', value: '32', icon: CheckCircle2, color: 'text-formalio-600 bg-formalio-50' },
          { label: 'Signalés / Rejetés', value: '5', icon: AlertTriangle, color: 'text-danger-600 bg-danger-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-surface-200 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-surface-500">{s.label}</p>
              <p className="text-2xl font-bold text-surface-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ComplianceView = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-formalio-700">Portail Expert-Comptable</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-surface-900">Conformité DGI & Fiscalité</h1>
        <p className="mt-2 text-sm text-surface-500">Calendrier fiscal Cameroun, échéances DGI, TVA 19,25% et déclarations PATENTE / IS / DSF.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800">3 échéances fiscales dans les 30 prochains jours</p>
            <p className="text-sm text-amber-700 mt-1">Vérifiez le calendrier et préparez les déclarations avec vos clients.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-surface-200">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Calendrier Fiscal 2025 — DGI Cameroun</h3>
        <div className="space-y-3">
          {[
            { date: '20 Jan', label: 'Déclaration TVA T4 2024', tax: 'TVA 19,25%', status: 'urgent', clients: 4 },
            { date: '15 Fév', label: 'Acompte IS (Impôt sur les Sociétés)', tax: 'IS 30%', status: 'upcoming', clients: 2 },
            { date: '28 Fév', label: 'Déclaration PATENTE 2025', tax: 'PATENTE', status: 'upcoming', clients: 6 },
            { date: '31 Mar', label: 'Déclaration Statistique et Fiscale (DSF)', tax: 'DSF annuelle', status: 'future', clients: 8 },
            { date: '20 Avr', label: 'Déclaration TVA T1 2025', tax: 'TVA 19,25%', status: 'future', clients: 4 },
            { date: '30 Avr', label: 'Dépôt Bilan Comptable SYSCOHADA', tax: 'OHADA 2017', status: 'future', clients: 8 },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-4 p-4 rounded-xl ${item.status === 'urgent' ? 'bg-danger-50 border border-danger-200' : item.status === 'upcoming' ? 'bg-amber-50 border border-amber-200' : 'bg-surface-50 border border-surface-100'}`}>
              <div className="text-center w-14 shrink-0">
                <p className="text-sm font-bold text-surface-800">{item.date.split(' ')[0]}</p>
                <p className="text-xs text-surface-500">{item.date.split(' ')[1]}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-surface-900">{item.label}</p>
                <p className="text-xs text-surface-500 mt-0.5">{item.tax} · {item.clients} client{item.clients > 1 ? 's' : ''} concerné{item.clients > 1 ? 's' : ''}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${item.status === 'urgent' ? 'bg-danger-100 text-danger-700' : item.status === 'upcoming' ? 'bg-amber-100 text-amber-700' : 'bg-surface-100 text-surface-600'}`}>
                {item.status === 'urgent' ? 'Urgent' : item.status === 'upcoming' ? 'Bientôt' : 'À venir'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-formalio-800 to-formalio-900 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-formalio-300" />
          <p className="font-semibold">Conformité OHADA · COBAC · DGI</p>
        </div>
        <p className="text-xs text-white/70">
          Formalio génère automatiquement les états financiers conformes au SYSCOHADA révisé 2017. 
          Les rapports TVA sont pré-remplis à 19,25% conformément au Code Général des Impôts du Cameroun.
        </p>
      </div>
    </div>
  );

  const views: Record<string, React.ReactNode> = {
    clients: <ClientsView />,
    reports: <ReportsView />,
    audit: <AuditView />,
    compliance: <ComplianceView />,
  };

  return (
    <div className="min-h-screen bg-surface-50 flex">
      <aside className="w-64 bg-white border-r border-surface-200 flex flex-col fixed h-full">
        <div className="p-6">
          <Logo size={32} />
          <p className="text-xs text-surface-400 mt-1 font-medium">Portail Expert-Comptable</p>
          <div className="mt-3 flex items-center gap-2 bg-formalio-50 rounded-lg px-2.5 py-1.5">
            <Award className="w-3.5 h-3.5 text-formalio-600" />
            <span className="text-[10px] font-semibold text-formalio-700 uppercase tracking-wide">ONECCA-CM Certifié</span>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeItem === item.id ? 'bg-formalio-50 text-formalio-700' : 'text-surface-600 hover:bg-surface-50'
              }`}>
              <item.icon className="w-5 h-5" />
              {item.label}
              {activeItem === item.id && <motion.span layoutId="accountant-active" className="ml-auto h-2 w-2 rounded-full bg-formalio-600" />}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-surface-200">
          <div className="bg-surface-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-surface-500">Expert-Comptable</p>
            <p className="text-sm font-bold text-surface-900 mt-1">Antoine Chakour</p>
            <p className="text-xs text-formalio-600 font-medium">ONECCA N° CM-2841</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-surface-200 px-8 py-4 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-surface-50 rounded-xl px-3 py-2 w-96">
            <Search className="w-4 h-4 text-surface-400" />
            <input type="text" placeholder="Rechercher un client, rapport, échéance..." className="bg-transparent outline-none text-sm flex-1" />
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
