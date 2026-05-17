import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity, AlertTriangle, ArchiveRestore, Ban, BarChart3, Bell, Check, CheckCircle2, ChevronDown, Clock,
  Cloud, Download, Eye, FileText, Filter, Flag, HardDrive, KeyRound,
  LayoutDashboard, LifeBuoy, Lock, Mail, Megaphone, MoreHorizontal, NotebookPen,
  RefreshCw, Search, Server, ShieldAlert, ShieldCheck, Star, Trash2, UploadCloud, UserCheck,
  Users, Wallet, X, Zap
} from 'lucide-react';
import { Logo } from './Logo';
import { DataStream, LiveCounter, MotionGridBackground, PulseDot, SystemSignal } from './EnterpriseMotion';
import { useToast } from './Toast';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

type AdminView = 'overview' | 'users' | 'support' | 'system' | 'fraud' | 'analytics' | 'accountants';
type UserStatus = 'active' | 'inactive' | 'suspended' | 'restricted';
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
type KycStatus = 'verified' | 'pending' | 'rejected' | 'manual_review';
type Plan = 'Gratuit' | 'Pro' | 'Premium' | 'Lifetime';

interface AdminUser {
  id: string;
  owner: string;
  business: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  plan: Plan;
  registered: string;
  lastLogin: string;
  device: string;
  kyc: KycStatus;
  status: UserStatus;
  score: number;
  momo: 'connected' | 'partial' | 'disconnected';
  reports: number;
  volume: number;
  risk: RiskLevel;
  supportTickets: number;
  auditLogs: string[];
  agent: string;
  notes: string;
}

interface Ticket {
  id: string;
  user: string;
  business: string;
  channel: 'Email' | 'WhatsApp' | 'Live Chat' | 'AI Chatbot';
  subject: string;
  category: 'Bug' | 'Financial dispute' | 'Feature request' | 'Subscription' | 'Refund' | 'Technical issue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'resolved' | 'escalated';
  agent: string;
  updated: string;
  satisfaction: number;
  messages: string[];
  tags: string[];
}

const users: AdminUser[] = [
  {
    id: 'USR-1001', owner: 'Marie Nkono', business: 'Boutique Elegance', phone: '+237 699 224 110', email: 'marie@elegance.cm', country: 'Cameroon', city: 'Douala', plan: 'Pro', registered: '2025-01-04', lastLogin: '2 min ago', device: 'Tecno Spark 10 - Android 13', kyc: 'verified', status: 'active', score: 760, momo: 'connected', reports: 18, volume: 12450000, risk: 'low', supportTickets: 2, agent: 'Amina', notes: 'High value merchant, eligible for pilot loan.', auditLogs: ['KYC verified by Amina', 'MTN MoMo connected', 'PDF report exported'],
  },
  {
    id: 'USR-1002', owner: 'Jean-Pierre Eteme', business: 'Transport Express', phone: '+237 677 102 441', email: 'jp@transport.cm', country: 'Cameroon', city: 'Yaounde', plan: 'Premium', registered: '2024-12-18', lastLogin: '8 min ago', device: 'Samsung A14 - Android 14', kyc: 'verified', status: 'active', score: 680, momo: 'connected', reports: 26, volume: 8900000, risk: 'medium', supportTickets: 5, agent: 'Claude', notes: 'Asked for fleet financing.', auditLogs: ['Plan upgradé en Premium', 'Orange Money sync failed', 'Support escalation closed'],
  },
  {
    id: 'USR-1003', owner: 'Aminata Fouda', business: 'Restaurant Bon Gout', phone: '+237 655 904 222', email: 'amina@bongout.cm', country: 'Cameroon', city: 'Bafoussam', plan: 'Pro', registered: '2025-01-10', lastLogin: '31 min ago', device: 'Infinix Hot 30 - Android 13', kyc: 'pending', status: 'active', score: 720, momo: 'partial', reports: 11, volume: 6700000, risk: 'low', supportTickets: 1, agent: 'Nora', notes: 'Needs assistance completing tax calendar.', auditLogs: ['KYC document uploaded', 'TVA report previewed'],
  },
  {
    id: 'USR-1004', owner: 'Paul Ndongo', business: 'Agro Business SARL', phone: '+237 670 333 908', email: 'paul@agro.cm', country: 'Cameroon', city: 'Bertoua', plan: 'Gratuit', registered: '2024-11-29', lastLogin: '2 hours ago', device: 'Itel S23 - Android 12', kyc: 'manual_review', status: 'restricted', score: 590, momo: 'disconnected', reports: 4, volume: 4500000, risk: 'high', supportTickets: 8, agent: 'Amina', notes: 'Velocity anomaly on expenses. Restrict loan visibility.', auditLogs: ['Fraud flag added', 'Account restricted', 'Admin note updated'],
  },
  {
    id: 'USR-1005', owner: 'Kofi Mensah', business: 'Tech Solutions CM', phone: '+237 681 420 800', email: 'kofi@techsolutions.cm', country: 'Cameroon', city: 'Douala', plan: 'Lifetime', registered: '2024-10-02', lastLogin: 'Now', device: 'iPhone 13 - iOS 17', kyc: 'verified', status: 'active', score: 810, momo: 'connected', reports: 42, volume: 15200000, risk: 'low', supportTickets: 0, agent: 'Yvan', notes: 'Lifetime access granted by growth campaign.', auditLogs: ['Lifetime access granted', 'API access enabled', 'KYC refreshed'],
  },
  {
    id: 'USR-1006', owner: 'Clarisse Mballa', business: 'Marche Frais', phone: '+237 690 777 002', email: 'clarisse@marchefrais.cm', country: 'Cameroon', city: 'Garoua', plan: 'Pro', registered: '2025-01-14', lastLogin: '1 day ago', device: 'Tecno Pop 8 - Android 13', kyc: 'rejected', status: 'inactive', score: 540, momo: 'partial', reports: 2, volume: 2800000, risk: 'critical', supportTickets: 3, agent: 'Claude', notes: 'Rejected KYC due blurry ID. Needs call.', auditLogs: ['KYC rejected', 'Email sent', 'Refund request received'],
  },
];

const tickets: Ticket[] = [
  { id: 'SUP-9042', user: 'Marie Nkono', business: 'Boutique Elegance', channel: 'WhatsApp', subject: 'MTN MoMo transactions duplicated after sync', category: 'Technical issue', priority: 'high', status: 'open', agent: 'Amina', updated: '3 min ago', satisfaction: 4.8, tags: ['momo', 'sync', 'duplicate'], messages: ['Client reports duplicate imports from 14 Jan.', 'AI suggests: reassure user and offer rollback.'] },
  { id: 'SUP-9041', user: 'Paul Ndongo', business: 'Agro Business SARL', channel: 'Email', subject: 'Loan eligibility hidden after restriction', category: 'Financial dispute', priority: 'urgent', status: 'escalated', agent: 'Claude', updated: '14 min ago', satisfaction: 2.1, tags: ['loan', 'restriction', 'fraud'], messages: ['User disputes restriction.', 'Fraud team reviewing expense velocity.'] },
  { id: 'SUP-9038', user: 'Aminata Fouda', business: 'Restaurant Bon Gout', channel: 'Live Chat', subject: 'How to prepare TVA report', category: 'Feature request', priority: 'medium', status: 'pending', agent: 'Nora', updated: '1 hour ago', satisfaction: 4.5, tags: ['tax', 'training'], messages: ['User needs guided flow for TVA.', 'Send article and book onboarding call.'] },
  { id: 'SUP-9033', user: 'Clarisse Mballa', business: 'Marche Frais', channel: 'AI Chatbot', subject: 'Refund request for failed premium payment', category: 'Refund', priority: 'high', status: 'open', agent: 'Yvan', updated: '2 hours ago', satisfaction: 3.2, tags: ['refund', 'payment', 'orange-money'], messages: ['Orange Money debit happened but plan not activated.', 'Payment gateway says webhook delayed.'] },
];

const userGrowthData = [
  { day: 'Mon', users: 6100, active: 4700, kyc: 4200 },
  { day: 'Tue', users: 6220, active: 4840, kyc: 4380 },
  { day: 'Wed', users: 6380, active: 4980, kyc: 4510 },
  { day: 'Thu', users: 6510, active: 5120, kyc: 4630 },
  { day: 'Fri', users: 6690, active: 5290, kyc: 4770 },
  { day: 'Sat', users: 6810, active: 5480, kyc: 4860 },
  { day: 'Sun', users: 6980, active: 5610, kyc: 5010 },
];

const systemMetrics = [
  { name: 'API', value: 99.98, color: '#10b981' },
  { name: 'DB', value: 99.95, color: '#059669' },
  { name: 'MoMo', value: 98.7, color: '#f59e0b' },
  { name: 'AI', value: 99.2, color: '#3b82f6' },
];

const cpuData = [
  { t: '00:00', cpu: 42, ram: 61, net: 35 },
  { t: '00:05', cpu: 48, ram: 63, net: 44 },
  { t: '00:10', cpu: 51, ram: 68, net: 58 },
  { t: '00:15', cpu: 39, ram: 64, net: 42 },
  { t: '00:20', cpu: 55, ram: 70, net: 66 },
  { t: '00:25', cpu: 47, ram: 67, net: 51 },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Command Center', id: 'overview' as AdminView },
  { icon: Users, label: 'User Management', id: 'users' as AdminView },
  { icon: LifeBuoy, label: 'Support Center', id: 'support' as AdminView },
  { icon: Server, label: 'System Ops', id: 'system' as AdminView },
  { icon: ShieldAlert, label: 'Fraud Watch', id: 'fraud' as AdminView },
  { icon: BarChart3, label: 'Analytics MRR', id: 'analytics' as AdminView },
  { icon: FileText, label: 'Comptables ONECCA', id: 'accountants' as AdminView },
];

const statusClass = (status: UserStatus) => ({
  active: 'bg-formalio-50 text-formalio-700 border-formalio-200',
  inactive: 'bg-surface-100 text-surface-600 border-surface-200',
  suspended: 'bg-danger-50 text-danger-700 border-danger-200',
  restricted: 'bg-gold-50 text-gold-700 border-gold-200',
}[status]);

const riskTone = (risk: RiskLevel) => risk === 'low' ? 'green' : risk === 'medium' ? 'amber' : 'red';

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();
  const [activeItem, setActiveItem] = useState<AdminView>('overview');
  const [query, setQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(users[0]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(tickets[0]);
  const [confirmAction, setConfirmAction] = useState<{ title: string; copy: string; action: () => void } | null>(null);
  const [planFilter, setPlanFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [maintenance, setMaintenance] = useState(false);
  const [notes, setNotes] = useState('');

  const filteredUsers = useMemo(() => users.filter((user) => {
    const matchQuery = `${user.owner} ${user.business} ${user.phone} ${user.email} ${user.city}`.toLowerCase().includes(query.toLowerCase());
    const matchPlan = planFilter === 'all' || user.plan === planFilter;
    const matchRisk = riskFilter === 'all' || user.risk === riskFilter;
    return matchQuery && matchPlan && matchRisk;
  }), [query, planFilter, riskFilter]);

  const doAction = (title: string, message = 'Action completed') => {
    showToast({ type: 'success', title, message });
    setConfirmAction(null);
  };

  const StatCard = ({ label, value, sub, icon: Icon, tone = 'green' }: any) => (
    <motion.div whileHover={{ y: -3 }} className="relative overflow-hidden rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
      <div className={`absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl ${tone === 'red' ? 'bg-danger-100' : tone === 'amber' ? 'bg-gold-100' : 'bg-formalio-100'}`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-surface-500">{label}</p>
          <LiveCounter value={value} className="mt-1 block text-2xl font-bold text-surface-900" />
          <p className="mt-1 text-xs text-surface-400">{sub}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${tone === 'red' ? 'bg-danger-50 text-danger-600' : tone === 'amber' ? 'bg-gold-50 text-gold-600' : 'bg-formalio-50 text-formalio-700'}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );

  const AdminShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen bg-surface-50 text-surface-900">
      <aside className="fixed left-0 top-0 z-20 flex h-full w-72 flex-col border-r border-surface-200 bg-white">
        <div className="border-b border-surface-200 p-6">
          <Logo size={34} animated />
          <div className="mt-3 flex items-center gap-2 rounded-full bg-formalio-50 px-3 py-1.5">
            <PulseDot tone="green" label="Enterprise Admin Live" />
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${activeItem === item.id ? 'bg-formalio-50 text-formalio-700' : 'text-surface-600 hover:bg-surface-50'}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {activeItem === item.id && <motion.span layoutId="admin-active" className="h-2 w-2 rounded-full bg-formalio-600" />}
            </button>
          ))}
        </nav>
        <div className="border-t border-surface-200 p-4">
          <div className="rounded-2xl bg-surface-50 p-4">
            <p className="text-xs font-semibold text-surface-500">Security posture</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-2xl font-bold text-formalio-700">98%</span>
              <SystemSignal />
            </div>
          </div>
        </div>
      </aside>
      <main className="ml-72">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-surface-200 bg-white/90 px-8 py-4 backdrop-blur-xl">
          <div className="flex w-[520px] items-center gap-2 rounded-xl bg-surface-50 px-3 py-2 ring-1 ring-surface-200 focus-within:ring-formalio-300">
            <Search className="h-4 w-4 text-surface-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users, tickets, logs..." className="flex-1 bg-transparent text-sm outline-none" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => showToast({ type: 'info', title: 'Broadcast center opened', message: 'Compose an announcement from System Ops' })} className="rounded-xl bg-surface-50 p-2 ring-1 ring-surface-200 hover:bg-surface-100"><Megaphone className="h-4 w-4 text-surface-600" /></button>
            <button className="relative rounded-xl bg-surface-50 p-2 ring-1 ring-surface-200 hover:bg-surface-100"><Bell className="h-4 w-4 text-surface-600" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500" /></button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-formalio-100 text-xs font-bold text-formalio-700">AD</div>
          </div>
        </header>
        <div className="relative min-h-screen overflow-hidden p-8">
          <MotionGridBackground dense />
          <div className="relative z-0">{children}</div>
        </div>
      </main>
      <ConfirmationModal config={confirmAction} onClose={() => setConfirmAction(null)} />
    </div>
  );

  const UserActions = ({ user }: { user: AdminUser }) => {
    const actions = [
      { label: 'Suspend user', icon: Ban, tone: 'danger', run: () => setConfirmAction({ title: 'Suspend account?', copy: `${user.business} will lose access immediately.`, action: () => doAction('Account suspended') }) },
      { label: 'Restrict temporarily', icon: Lock, run: () => doAction('Account restricted', 'Loan access and exports are limited') },
      { label: 'Restore account', icon: ArchiveRestore, run: () => doAction('Account restored') },
      { label: 'Verify KYC', icon: UserCheck, run: () => doAction('KYC verified manually') },
      { label: 'Upgrade plan', icon: Wallet, run: () => doAction('Subscription upgraded') },
      { label: 'Premium access', icon: Zap, run: () => doAction('Premium access granted') },
      { label: 'Lifetime access', icon: KeyRound, run: () => doAction('Lifetime access granted') },
      { label: 'Reset password', icon: RefreshCw, run: () => doAction('Password reset SMS sent') },
      { label: 'Send notification', icon: Bell, run: () => doAction('Push notification sent') },
      { label: 'Send email', icon: Mail, run: () => doAction('Email queued') },
      { label: 'View reports', icon: FileText, run: () => doAction('Reports opened') },
      { label: 'Impersonate', icon: Eye, run: () => doAction('Impersonation session started') },
      { label: 'Export data', icon: Download, run: () => doAction('User data export started') },
      { label: 'Assign agent', icon: LifeBuoy, run: () => doAction('Support agent assigned') },
      { label: 'Flag suspicious', icon: Flag, run: () => doAction('Suspicious activity flagged') },
      { label: 'Delete account', icon: Trash2, tone: 'danger', run: () => setConfirmAction({ title: 'Delete account?', copy: 'This will permanently remove the customer record after retention checks.', action: () => doAction('Account deletion queued') }) },
    ];
    return (
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button key={action.label} onClick={action.run} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium ring-1 transition-all hover:-translate-y-0.5 ${action.tone === 'danger' ? 'bg-danger-50 text-danger-700 ring-danger-100' : 'bg-surface-50 text-surface-700 ring-surface-200 hover:bg-formalio-50 hover:text-formalio-700'}`}>
            <action.icon className="h-3.5 w-3.5" />
            {action.label}
          </button>
        ))}
      </div>
    );
  };

  const UsersPage = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-formalio-700">Enterprise Admin</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-surface-900">User Management</h1>
          <p className="mt-2 text-sm text-surface-500">Search, monitor, audit, restrict, and support every Formalio account in real time.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => doAction('Bulk export started')} className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-surface-700 ring-1 ring-surface-200 hover:bg-surface-50"><Download className="mr-2 inline h-4 w-4" />Export</button>
          <button onClick={() => doAction('Broadcast queued')} className="rounded-xl bg-formalio-700 px-4 py-2 text-sm font-medium text-white hover:bg-formalio-800"><Megaphone className="mr-2 inline h-4 w-4" />Broadcast</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Registered Users" value={6980} sub="+19.4% MoM" icon={Users} />
        <StatCard label="Verified KYC" value={5010} sub="72% completion" icon={ShieldCheck} />
        <StatCard label="High Risk" value={42} sub="7 critical today" icon={ShieldAlert} tone="red" />
        <StatCard label="MoMo Connected" value={4384} sub="MTN + Orange" icon={Wallet} tone="amber" />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_420px] gap-6">
        <div className="rounded-2xl border border-surface-200 bg-white shadow-card">
          <div className="flex flex-wrap items-center gap-3 border-b border-surface-200 p-4">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-surface-50 px-3 py-2 ring-1 ring-surface-200">
              <Search className="h-4 w-4 text-surface-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, business, phone, city..." className="flex-1 bg-transparent text-sm outline-none" />
            </div>
            <SelectFilter value={planFilter} onChange={setPlanFilter} options={['all', 'Gratuit', 'Pro', 'Premium', 'Lifetime']} label="Plan" />
            <SelectFilter value={riskFilter} onChange={setRiskFilter} options={['all', 'low', 'medium', 'high', 'critical']} label="Risk" />
            <button onClick={() => setQuery('')} className="rounded-xl bg-surface-50 px-3 py-2 text-sm text-surface-600 ring-1 ring-surface-200"><Filter className="mr-1 inline h-4 w-4" />Reset</button>
          </div>
          <div className="flex items-center justify-between border-b border-surface-200 bg-surface-50/70 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <span className="font-semibold text-surface-900">{filteredUsers.length}</span> users found
              {selectedUsers.length > 0 && <span className="rounded-full bg-formalio-100 px-2 py-0.5 text-xs font-semibold text-formalio-700">{selectedUsers.length} selected</span>}
            </div>
            <div className="flex gap-2">
              {['Suspend', 'Export', 'Assign agent', 'Notify'].map((action) => (
                <button key={action} onClick={() => doAction(`Bulk ${action.toLowerCase()} completed`)} disabled={!selectedUsers.length} className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-surface-600 ring-1 ring-surface-200 disabled:opacity-40">{action}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              <thead className="bg-white">
                <tr className="border-b border-surface-200 text-left text-[11px] font-semibold uppercase tracking-wider text-surface-400">
                  <th className="px-4 py-3"><input type="checkbox" checked={selectedUsers.length === filteredUsers.length} onChange={(e) => setSelectedUsers(e.target.checked ? filteredUsers.map((u) => u.id) : [])} /></th>
                  <th className="px-4 py-3">Profile</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Plan</th><th className="px-4 py-3">Registration</th><th className="px-4 py-3">Last login</th><th className="px-4 py-3">Device</th><th className="px-4 py-3">KYC</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Score</th><th className="px-4 py-3">MoMo</th><th className="px-4 py-3">Reports</th><th className="px-4 py-3">Volume</th><th className="px-4 py-3">Risk</th><th className="px-4 py-3">Support</th><th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((user) => (
                    <motion.tr key={user.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedUser(user)} className={`cursor-pointer border-b border-surface-100 text-sm hover:bg-formalio-50/40 ${selectedUser?.id === user.id ? 'bg-formalio-50/60' : 'bg-white'}`}>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={(e) => setSelectedUsers((prev) => e.target.checked ? [...prev, user.id] : prev.filter((id) => id !== user.id))} /></td>
                      <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-formalio-100 text-xs font-bold text-formalio-700">{user.owner.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div><div><p className="font-semibold text-surface-900">{user.owner}</p><p className="text-xs text-surface-500">{user.business}</p></div></div></td>
                      <td className="px-4 py-3"><p>{user.phone}</p><p className="text-xs text-surface-400">{user.email}</p></td>
                      <td className="px-4 py-3">{user.country}<p className="text-xs text-surface-400">{user.city}</p></td>
                      <td className="px-4 py-3"><span className="rounded-full bg-surface-100 px-2 py-1 text-xs font-semibold">{user.plan}</span></td>
                      <td className="px-4 py-3 text-surface-600">{user.registered}</td><td className="px-4 py-3"><PulseDot tone="green" label={user.lastLogin} /></td><td className="px-4 py-3 text-xs text-surface-500">{user.device}</td>
                      <td className="px-4 py-3"><KycBadge status={user.kyc} /></td><td className="px-4 py-3"><span className={`rounded-full border px-2 py-1 text-xs font-semibold ${statusClass(user.status)}`}>{user.status}</span></td>
                      <td className="px-4 py-3"><span className={user.score > 740 ? 'font-bold text-formalio-700' : user.score > 620 ? 'font-bold text-gold-600' : 'font-bold text-danger-600'}>{user.score}</span></td>
                      <td className="px-4 py-3"><PulseDot tone={user.momo === 'connected' ? 'green' : user.momo === 'partial' ? 'amber' : 'red'} label={user.momo} /></td><td className="px-4 py-3">{user.reports}</td><td className="px-4 py-3 font-semibold">{(user.volume / 1000000).toFixed(1)}M</td><td className="px-4 py-3"><PulseDot tone={riskTone(user.risk) as any} label={user.risk} /></td><td className="px-4 py-3">{user.supportTickets} tickets</td>
                      <td className="px-4 py-3"><button className="rounded-lg p-1 hover:bg-surface-100"><MoreHorizontal className="h-4 w-4" /></button></td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-surface-200 px-4 py-3 text-sm text-surface-500">
            <span>Page 1 of 12 · 25 rows per page</span>
            <div className="flex gap-2"><button className="rounded-lg bg-surface-50 px-3 py-1 ring-1 ring-surface-200">Previous</button><button className="rounded-lg bg-formalio-700 px-3 py-1 text-white">Next</button></div>
          </div>
        </div>
        <div className="space-y-4">
          {selectedUser && (
            <motion.div key={selectedUser.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-surface-400">Profile preview</p><h3 className="mt-1 text-lg font-bold text-surface-900">{selectedUser.business}</h3><p className="text-sm text-surface-500">{selectedUser.owner} · {selectedUser.id}</p></div><button className="rounded-xl bg-formalio-50 p-2 text-formalio-700"><Eye className="h-5 w-5" /></button></div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><Mini label="Credit score" value={String(selectedUser.score)} /><Mini label="Risk" value={selectedUser.risk} /><Mini label="Reports" value={String(selectedUser.reports)} /><Mini label="Volume" value={`${(selectedUser.volume / 1000000).toFixed(1)}M FCFA`} /></div>
              <div className="mt-5"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Admin actions</p><UserActions user={selectedUser} /></div>
              <div className="mt-5"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Internal notes</p><textarea value={notes || selectedUser.notes} onChange={(e) => setNotes(e.target.value)} className="h-24 w-full rounded-xl border border-surface-200 bg-surface-50 p-3 text-sm outline-none focus:border-formalio-300" /><button onClick={() => doAction('Internal note saved')} className="mt-2 rounded-lg bg-formalio-700 px-3 py-2 text-xs font-semibold text-white"><NotebookPen className="mr-1 inline h-3.5 w-3.5" />Save note</button></div>
              <div className="mt-5"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Audit logs</p><div className="space-y-2">{selectedUser.auditLogs.map((log) => <div key={log} className="rounded-lg bg-surface-50 px-3 py-2 text-xs text-surface-600"><Clock className="mr-1 inline h-3 w-3" />{log}</div>)}</div></div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  const SupportPage = () => (
    <div className="grid grid-cols-[360px_minmax(0,1fr)_360px] gap-6">
      <div className="space-y-4"><SectionTitle kicker="Zendesk-grade" title="Support Center" copy="Email, WhatsApp, live chat, disputes, refunds, AI chatbot transcripts, and escalations." />
        <div className="grid grid-cols-2 gap-3"><SupportStat label="Open" value="42" tone="amber" /><SupportStat label="Urgent" value="7" tone="red" /><SupportStat label="CSAT" value="4.6" tone="green" /><SupportStat label="SLA" value="98%" tone="green" /></div>
        <div className="rounded-2xl border border-surface-200 bg-white p-3"><div className="mb-3 flex items-center gap-2 rounded-xl bg-surface-50 px-3 py-2"><Search className="h-4 w-4 text-surface-400" /><input className="flex-1 bg-transparent text-sm outline-none" placeholder="Search tickets..." /></div><div className="space-y-2">{tickets.map((ticket) => <button key={ticket.id} onClick={() => setSelectedTicket(ticket)} className={`w-full rounded-xl border p-3 text-left transition-all ${selectedTicket?.id === ticket.id ? 'border-formalio-300 bg-formalio-50' : 'border-surface-100 hover:bg-surface-50'}`}><div className="flex items-center justify-between"><span className="text-xs font-bold text-surface-900">{ticket.id}</span><Priority priority={ticket.priority} /></div><p className="mt-1 text-sm font-semibold text-surface-900">{ticket.subject}</p><p className="mt-1 text-xs text-surface-500">{ticket.channel} · {ticket.user} · {ticket.updated}</p></button>)}</div></div>
      </div>
      <div className="rounded-2xl border border-surface-200 bg-white shadow-card">
        {selectedTicket && <><div className="border-b border-surface-200 p-5"><div className="flex items-start justify-between"><div><div className="flex items-center gap-2"><Priority priority={selectedTicket.priority} /><span className="rounded-full bg-surface-100 px-2 py-1 text-xs font-semibold text-surface-600">{selectedTicket.status}</span></div><h2 className="mt-3 text-xl font-bold text-surface-900">{selectedTicket.subject}</h2><p className="mt-1 text-sm text-surface-500">{selectedTicket.business} · {selectedTicket.channel} · assigned to {selectedTicket.agent}</p></div><button onClick={() => doAction('Ticket escalated')} className="rounded-xl bg-danger-50 px-3 py-2 text-sm font-semibold text-danger-700">Escalate</button></div><div className="mt-4 flex flex-wrap gap-2">{selectedTicket.tags.map((tag) => <span key={tag} className="rounded-full bg-surface-100 px-2 py-1 text-xs font-medium text-surface-600">#{tag}</span>)}</div></div>
        <div className="h-[420px] space-y-4 overflow-y-auto p-5">{selectedTicket.messages.map((message, i) => <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl p-4 text-sm ${i % 2 ? 'ml-12 bg-formalio-50 text-formalio-800' : 'mr-12 bg-surface-50 text-surface-700'}`}>{message}</motion.div>)}<div className="rounded-2xl border border-dashed border-formalio-300 bg-formalio-50 p-4"><p className="text-xs font-semibold text-formalio-700"><Zap className="mr-1 inline h-3.5 w-3.5" />AI response suggestion</p><p className="mt-2 text-sm text-formalio-800">Bonjour {selectedTicket.user.split(' ')[0]}, nous avons identifié le problème. Votre compte sera corrigé automatiquement et vous recevrez une confirmation par SMS.</p><button onClick={() => doAction('AI response inserted')} className="mt-3 rounded-lg bg-formalio-700 px-3 py-1.5 text-xs font-semibold text-white">Insert suggestion</button></div></div>
        <div className="border-t border-surface-200 p-5"><textarea className="h-28 w-full rounded-xl border border-surface-200 bg-surface-50 p-3 text-sm outline-none focus:border-formalio-300" placeholder="Write a reply or internal note..." /><div className="mt-3 flex items-center justify-between"><div className="flex gap-2"><button className="rounded-lg bg-surface-100 px-3 py-2 text-xs font-medium">Internal note</button><button className="rounded-lg bg-surface-100 px-3 py-2 text-xs font-medium">Attach file</button></div><button onClick={() => doAction('Reply sent')} className="rounded-xl bg-formalio-700 px-4 py-2 text-sm font-semibold text-white">Send reply</button></div></div></>}
      </div>
      <div className="space-y-4"><div className="rounded-2xl border border-surface-200 bg-white p-5"><h3 className="font-bold text-surface-900">Support analytics</h3><div className="mt-4 h-48"><ResponsiveContainer width="100%" height="100%"><BarChart data={[{ n: 'Bug', v: 28 }, { n: 'Money', v: 16 }, { n: 'Sub', v: 12 }, { n: 'Refund', v: 8 }]}><XAxis dataKey="n" tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="v" fill="#0f4f4a" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></div><div className="rounded-2xl border border-surface-200 bg-white p-5"><h3 className="font-bold text-surface-900">Realtime inbox</h3><DataStream /></div></div>
    </div>
  );

  const SystemPage = () => (
    <div className="space-y-6"><SectionTitle kicker="Operations center" title="System Management" copy="Live infrastructure, security, integrations, backups, payment gateways, fraud engines, and deployment controls." />
      <div className="grid grid-cols-4 gap-4"><StatCard label="API uptime" value={100} sub="99.98% rolling 30d" icon={Cloud} /><StatCard label="Active sessions" value={1842} sub="+12% today" icon={Activity} /><StatCard label="Fraud alerts" value={7} sub="2 critical" icon={ShieldAlert} tone="red" /><StatCard label="Storage used" value={64} sub="TB across regions" icon={HardDrive} tone="amber" /></div>
      <div className="grid grid-cols-[minmax(0,1fr)_390px] gap-6"><div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card"><div className="mb-5 flex items-center justify-between"><h3 className="text-lg font-bold text-surface-900">Infrastructure health</h3><PulseDot tone="green" label="All services live" /></div><div className="grid grid-cols-2 gap-3">{['API Gateway', 'PostgreSQL', 'Supabase Realtime', 'AI Categorization', 'MTN MoMo', 'Orange Money', 'Notification Queue', 'Payment Gateway', 'Backup System', 'Fraud Model'].map((service, i) => <div key={service} className="flex items-center justify-between rounded-xl bg-surface-50 p-3"><div className="flex items-center gap-2"><SystemSignal active={i !== 5} /><span className="text-sm font-medium text-surface-700">{service}</span></div><PulseDot tone={i === 5 ? 'amber' : 'green'} label={i === 5 ? 'degraded' : 'online'} /></div>)}</div></div><div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card"><h3 className="text-lg font-bold text-surface-900">Operations actions</h3><div className="mt-4 grid grid-cols-2 gap-2">{[{ l: 'Restart API', i: RefreshCw }, { l: 'Backup now', i: UploadCloud }, { l: 'Clear cache', i: Trash2 }, { l: 'Force sync', i: Zap }, { l: 'Broadcast', i: Megaphone }, { l: maintenance ? 'Disable maintenance' : 'Maintenance', i: Lock }].map((a) => <button key={a.l} onClick={() => { if (a.l.includes('Maintenance')) setMaintenance(!maintenance); doAction(a.l); }} className="rounded-xl bg-surface-50 p-3 text-left text-xs font-semibold text-surface-700 ring-1 ring-surface-200 hover:bg-formalio-50 hover:text-formalio-700"><a.i className="mb-2 h-4 w-4" />{a.l}</button>)}</div></div></div>
      <div className="grid grid-cols-3 gap-6"><div className="col-span-2 rounded-2xl border border-surface-200 bg-white p-6"><h3 className="mb-4 text-lg font-bold text-surface-900">CPU / RAM / Network</h3><div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={cpuData}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="t" /><YAxis /><Tooltip /><Line type="monotone" dataKey="cpu" stroke="#0f4f4a" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="ram" stroke="#f59e0b" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></div><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="mb-4 text-lg font-bold text-surface-900">Service uptime</h3><div className="h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={systemMetrics} innerRadius={58} outerRadius={86} dataKey="value">{systemMetrics.map((m) => <Cell key={m.name} fill={m.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div><div className="space-y-2">{systemMetrics.map((m) => <div key={m.name} className="flex justify-between text-sm"><span>{m.name}</span><span className="font-bold">{m.value}%</span></div>)}</div></div></div>
      <div className="grid grid-cols-2 gap-6"><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="font-bold text-surface-900">Deployment history</h3>{['v2.1.0 deployed to production', 'Feature flag: voice_ai enabled', 'DB migration 20250114 applied', 'Rollback point created'].map((log) => <div key={log} className="mt-3 rounded-xl bg-surface-50 p-3 text-sm text-surface-600"><CheckCircle2 className="mr-2 inline h-4 w-4 text-formalio-600" />{log}</div>)}</div><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="font-bold text-surface-900">Live logs</h3><DataStream /></div></div>
    </div>
  );

  const OverviewPage = () => (
    <div className="space-y-6"><SectionTitle kicker="Centre de commandement" title="Formalio Operations" copy="Tableau de bord de pilotage en temps réel — utilisateurs, revenus FCFA, fraude, support, infrastructure et expansion régionale." />
      <div className="grid grid-cols-4 gap-4"><StatCard label="MAU actifs" value={6980} sub="+19.4% MoM · objectif 10K" icon={Users} /><StatCard label="MRR (FCFA)" value={11240000} sub="+24.5% MoM · NPS &gt;50" icon={Wallet} /><StatCard label="Tickets ouverts" value={42} sub="Churn &lt;5% · SLA 98%" icon={LifeBuoy} tone="amber" /><StatCard label="Alertes risque" value={7} sub="2 critiques · COBAC" icon={ShieldAlert} tone="red" /></div>
      <div className="grid grid-cols-[minmax(0,1fr)_380px] gap-6"><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="mb-4 text-lg font-bold">User growth and KYC</h3><div className="h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={userGrowthData}><defs><linearGradient id="adminUsers" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0f4f4a" stopOpacity={0.25} /><stop offset="100%" stopColor="#0f4f4a" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Area type="monotone" dataKey="users" stroke="#0f4f4a" fill="url(#adminUsers)" strokeWidth={3} /><Area type="monotone" dataKey="active" stroke="#3b82f6" fill="transparent" strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="mb-4 text-lg font-bold">Live event stream</h3><DataStream /></div></div>
    </div>
  );

  const FraudPage = () => <SystemPage />;

  const mrrData = [
    { month: 'Juil', mrr: 3800000, users: 2400, arr: 45600000 },
    { month: 'Août', mrr: 5100000, users: 3100, arr: 61200000 },
    { month: 'Sep', mrr: 6200000, users: 3900, arr: 74400000 },
    { month: 'Oct', mrr: 7800000, users: 4700, arr: 93600000 },
    { month: 'Nov', mrr: 9400000, users: 5600, arr: 112800000 },
    { month: 'Déc', mrr: 10200000, users: 6200, arr: 122400000 },
    { month: 'Jan', mrr: 11240000, users: 6980, arr: 134880000 },
  ];
  const planBreakdown = [
    { name: 'Gratuit', users: 3890, color: '#94a3b8' },
    { name: 'Pro', users: 2640, color: '#059669' },
    { name: 'Premium', users: 420, color: '#0f4f4a' },
    { name: 'Lifetime', users: 30, color: '#f59e0b' },
  ];
  const revenueByCountry = [
    { pays: 'Cameroun', rev: 8920000, users: 5840 },
    { pays: 'Côte d\'Ivoire', rev: 1240000, users: 620 },
    { pays: 'Sénégal', rev: 680000, users: 340 },
    { pays: 'Gabon', rev: 280000, users: 140 },
    { pays: 'Bénin', rev: 120000, users: 40 },
  ];

  const AnalyticsPage = () => (
    <div className="space-y-6">
      <SectionTitle kicker="Revenue Intelligence" title="Analytics & MRR" copy="Croissance abonnements, répartition plans, expansion régionale CEMAC/UEMOA et métriques SaaS clés." />
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="MRR (Jan 2025)" value={11240000} sub="+10% MoM · Target 15M" icon={Wallet} />
        <StatCard label="ARR projeté" value={134880000} sub="Exercice 2025" icon={BarChart3} />
        <StatCard label="ARPU moyen" value={8200} sub="FCFA/utilisateur payant" icon={Users} tone="amber" />
        <StatCard label="Churn mensuel" value={4} sub="Objectif < 3%" icon={Activity} tone="red" />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_380px] gap-6">
        <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
          <h3 className="text-lg font-bold text-surface-900 mb-4">MRR & Croissance utilisateurs (7 mois)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mrrData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number, name: string) => name === 'mrr' ? [`${v.toLocaleString('fr-FR')} FCFA`, 'MRR'] : [v, 'Utilisateurs']} />
                <Bar yAxisId="left" dataKey="mrr" name="mrr" fill="#0f4f4a" radius={[6, 6, 0, 0]} />
                <Bar yAxisId="right" dataKey="users" name="users" fill="#3b82f6" radius={[6, 6, 0, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
          <h3 className="text-lg font-bold text-surface-900 mb-4">Répartition par plan</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={planBreakdown} innerRadius={60} outerRadius={90} dataKey="users" nameKey="name">
                  {planBreakdown.map((p) => <Cell key={p.name} fill={p.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v} utilisateurs`]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {planBreakdown.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-sm text-surface-700">{p.name}</span>
                </div>
                <span className="text-sm font-semibold text-surface-900">{p.users.toLocaleString('fr-FR')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-surface-200 bg-white shadow-card">
        <div className="border-b border-surface-200 px-6 py-4">
          <h3 className="font-semibold text-surface-900">Expansion régionale CEMAC · UEMOA</h3>
        </div>
        <table className="w-full">
          <thead className="bg-surface-50">
            <tr className="border-b border-surface-200 text-left text-[11px] font-semibold uppercase tracking-wider text-surface-400">
              <th className="px-6 py-3">Pays</th>
              <th className="px-6 py-3">Utilisateurs</th>
              <th className="px-6 py-3">Revenus FCFA</th>
              <th className="px-6 py-3">Part MRR</th>
              <th className="px-6 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {revenueByCountry.map((c, i) => (
              <tr key={c.pays} className="border-b border-surface-100 hover:bg-formalio-50/20">
                <td className="px-6 py-3 font-medium text-surface-900">{c.pays}</td>
                <td className="px-6 py-3">{c.users.toLocaleString('fr-FR')}</td>
                <td className="px-6 py-3 font-semibold">{c.rev.toLocaleString('fr-FR')} FCFA</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-32 bg-surface-100 rounded-full"><div className="h-full bg-formalio-600 rounded-full" style={{ width: `${(c.rev / 11240000) * 100}%` }} /></div>
                    <span className="text-xs text-surface-500">{((c.rev / 11240000) * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="px-6 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${i === 0 ? 'bg-formalio-100 text-formalio-700' : 'bg-amber-100 text-amber-700'}`}>{i === 0 ? 'Principal' : 'Expansion'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const oneccaAccountants = [
    { id: 'ONECCA-001', name: 'Dr. Etoundi Pierre-Marie', firm: 'Cabinet Etoundi & Associés', city: 'Yaoundé', specialty: 'PME & SYSCOHADA', clients: 48, rating: 4.9, status: 'vérifié', badge: 'Expert-comptable agréé' },
    { id: 'ONECCA-002', name: 'Mme. Ngo Biyong Claire', firm: 'BiyongExpert Consulting', city: 'Douala', specialty: 'Fiscalité DGI · TVA', clients: 37, rating: 4.8, status: 'vérifié', badge: 'Commissaire aux comptes' },
    { id: 'ONECCA-003', name: 'M. Tchouto Serge', firm: 'Tchouto Finance SARL', city: 'Bafoussam', specialty: 'Audit COBAC · Banques', clients: 22, rating: 4.7, status: 'vérifié', badge: 'Expert-comptable agréé' },
    { id: 'ONECCA-004', name: 'Mme. Kameni Astride', firm: 'AK Comptabilité', city: 'Douala', specialty: 'Start-ups & fintech', clients: 29, rating: 4.6, status: 'en revue', badge: 'Candidate ONECCA' },
    { id: 'ONECCA-005', name: 'M. Bekono Rodrigue', firm: 'Bekono Tax Advisors', city: 'Yaoundé', specialty: 'OHADA · CNPS · Paie', clients: 56, rating: 4.9, status: 'vérifié', badge: 'Expert-comptable agréé' },
  ];

  const AccountantsPage = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <SectionTitle kicker="Marketplace ONECCA-CM" title="Comptables Agréés" copy="Réseau d'experts-comptables ONECCA certifiés pour accompagner les PME Formalio. Gestion, validation et monitoring de la marketplace." />
        <button onClick={() => doAction('Invitation envoyée à ONECCA-CM')} className="rounded-xl bg-formalio-700 px-4 py-2 text-sm font-medium text-white hover:bg-formalio-800">+ Inviter un comptable</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Comptables actifs" value={oneccaAccountants.filter(a => a.status === 'vérifié').length} sub="Certifiés ONECCA-CM" icon={Users} />
        <StatCard label="Missions en cours" value={192} sub="+34% vs mois dernier" icon={FileText} />
        <StatCard label="Satisfaction moyenne" value={4} sub="/5 · 847 avis clients" icon={Star} tone="amber" />
        <StatCard label="PME accompagnées" value={192} sub="Formalisées avec crédit" icon={Wallet} />
      </div>
      <div className="rounded-2xl border border-surface-200 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-surface-200 px-6 py-4">
          <h3 className="font-semibold text-surface-900">Réseau Formalio × ONECCA</h3>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 bg-formalio-100 text-formalio-700 rounded-lg font-medium">Tous</button>
            <button className="text-xs px-3 py-1.5 bg-surface-100 text-surface-600 rounded-lg">Vérifiés</button>
            <button className="text-xs px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg">En revue</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50">
              <tr className="border-b border-surface-200 text-left text-[11px] font-semibold uppercase tracking-wider text-surface-400">
                <th className="px-6 py-3">Comptable</th>
                <th className="px-6 py-3">Cabinet</th>
                <th className="px-6 py-3">Ville</th>
                <th className="px-6 py-3">Spécialité</th>
                <th className="px-6 py-3">Clients</th>
                <th className="px-6 py-3">Note</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {oneccaAccountants.map((acc) => (
                <tr key={acc.id} className="border-b border-surface-100 text-sm hover:bg-formalio-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-formalio-100 rounded-full flex items-center justify-center text-xs font-bold text-formalio-700">
                        {acc.name.split(' ').slice(-2).map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-surface-900">{acc.name}</p>
                        <p className="text-xs text-formalio-600">{acc.badge}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-surface-700">{acc.firm}</td>
                  <td className="px-6 py-4 text-surface-600">{acc.city}</td>
                  <td className="px-6 py-4 text-surface-600 text-xs">{acc.specialty}</td>
                  <td className="px-6 py-4 font-semibold">{acc.clients}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-semibold">{acc.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${acc.status === 'vérifié' ? 'bg-formalio-100 text-formalio-700' : 'bg-amber-100 text-amber-700'}`}>
                      {acc.status === 'vérifié' ? '✓ Vérifié ONECCA' : '⏳ En revue'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => doAction('Profil comptable ouvert')} className="text-xs text-formalio-700 font-medium hover:underline">Voir</button>
                      <button onClick={() => doAction('Suspension envoyée')} className="text-xs text-danger-600 font-medium hover:underline">Suspendre</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const views: Record<AdminView, React.ReactNode> = { overview: <OverviewPage />, users: <UsersPage />, support: <SupportPage />, system: <SystemPage />, fraud: <FraudPage />, analytics: <AnalyticsPage />, accountants: <AccountantsPage /> };
  return <AdminShell>{views[activeItem]}</AdminShell>;
};

const SectionTitle: React.FC<{ kicker: string; title: string; copy: string }> = ({ kicker, title, copy }) => <div><p className="text-sm font-semibold text-formalio-700">{kicker}</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-surface-900">{title}</h1><p className="mt-2 max-w-3xl text-sm text-surface-500">{copy}</p></div>;
const Mini: React.FC<{ label: string; value: string }> = ({ label, value }) => <div className="rounded-xl bg-surface-50 p-3"><p className="text-xs text-surface-400">{label}</p><p className="mt-1 font-bold text-surface-900">{value}</p></div>;
const SupportStat: React.FC<{ label: string; value: string; tone: 'green' | 'amber' | 'red' }> = ({ label, value, tone }) => <div className={`rounded-2xl border p-4 ${tone === 'green' ? 'border-formalio-200 bg-formalio-50' : tone === 'amber' ? 'border-gold-200 bg-gold-50' : 'border-danger-200 bg-danger-50'}`}><p className="text-xs text-surface-500">{label}</p><p className="mt-1 text-2xl font-bold text-surface-900">{value}</p></div>;
const Priority: React.FC<{ priority: Ticket['priority'] }> = ({ priority }) => <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${priority === 'urgent' ? 'bg-danger-100 text-danger-700' : priority === 'high' ? 'bg-gold-100 text-gold-700' : priority === 'medium' ? 'bg-info-50 text-info-600' : 'bg-surface-100 text-surface-600'}`}>{priority}</span>;
const KycBadge: React.FC<{ status: KycStatus }> = ({ status }) => <span className={`rounded-full px-2 py-1 text-xs font-semibold ${status === 'verified' ? 'bg-formalio-50 text-formalio-700' : status === 'pending' ? 'bg-gold-50 text-gold-700' : status === 'rejected' ? 'bg-danger-50 text-danger-700' : 'bg-info-50 text-info-600'}`}>{status.replace('_', ' ')}</span>;
const SelectFilter: React.FC<{ value: string; onChange: (value: string) => void; options: string[]; label: string }> = ({ value, onChange, options, label }) => <label className="relative"><select value={value} onChange={(e) => onChange(e.target.value)} className="appearance-none rounded-xl bg-white px-3 py-2 pr-8 text-sm ring-1 ring-surface-200 outline-none"><option value="all">All {label}</option>{options.filter((o) => o !== 'all').map((o) => <option key={o}>{o}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-surface-400" /></label>;
const ConfirmationModal: React.FC<{ config: { title: string; copy: string; action: () => void } | null; onClose: () => void }> = ({ config, onClose }) => <AnimatePresence>{config && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/60 p-4 backdrop-blur-sm"><motion.div initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-modal"><div className="flex items-start gap-3"><div className="rounded-2xl bg-danger-50 p-3 text-danger-600"><AlertTriangle className="h-6 w-6" /></div><div><h3 className="text-lg font-bold text-surface-900">{config.title}</h3><p className="mt-1 text-sm text-surface-500">{config.copy}</p></div></div><div className="mt-6 flex justify-end gap-2"><button onClick={onClose} className="rounded-xl bg-surface-100 px-4 py-2 text-sm font-semibold text-surface-700"><X className="mr-1 inline h-4 w-4" />Cancel</button><button onClick={config.action} className="rounded-xl bg-danger-600 px-4 py-2 text-sm font-semibold text-white"><Check className="mr-1 inline h-4 w-4" />Confirm</button></div></motion.div></motion.div>}</AnimatePresence>;