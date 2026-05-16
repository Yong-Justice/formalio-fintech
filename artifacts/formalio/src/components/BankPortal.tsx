import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle, ArrowDownRight, ArrowUpRight, Award, BarChart3, Building2, Check,
  CheckCircle2, ChevronDown, Download, FileText, Handshake, Landmark,
  Mail, MapPin, MessageSquare, Phone, Search, SlidersHorizontal,
  Star, Users, X
} from 'lucide-react';
import { Logo } from './Logo';
import { LiveCounter, MotionGridBackground, PulseDot, SystemSignal } from './EnterpriseMotion';
import { useToast } from './Toast';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

type BankView = 'portfolio' | 'applications' | 'scoring' | 'partners' | 'analytics';
type LoanStatus = 'new' | 'review' | 'approved' | 'rejected' | 'disbursed';
type Risk = 'low' | 'medium' | 'high';

interface SmeRecord {
  id: string;
  business: string;
  owner: string;
  phone: string;
  city: string;
  region: string;
  industry: string;
  score: number;
  risk: Risk;
  kyc: 'verified' | 'pending' | 'review';
  ohada: 'compliant' | 'partial' | 'missing';
  revenue: number;
  trend: number;
  volume: number;
  momo: 'MTN + Orange' | 'MTN only' | 'Orange only';
  repaymentProbability: number;
  eligibleAmount: number;
  requestedAmount: number;
  status: LoanStatus;
  relationshipManager: string;
  insights: string[];
}

const smes: SmeRecord[] = [
  { id: 'APP-2401', business: 'Boutique Elegance', owner: 'Marie Nkono', phone: '+237 699 224 110', city: 'Douala', region: 'Littoral', industry: 'Retail', score: 760, risk: 'low', kyc: 'verified', ohada: 'compliant', revenue: 12500000, trend: 18, volume: 21400000, momo: 'MTN + Orange', repaymentProbability: 91, eligibleAmount: 5000000, requestedAmount: 3000000, status: 'review', relationshipManager: 'Brice T.', insights: ['Consistent cashflow for 7 months', 'Low refund ratio', 'Stock purchases increased before seasonal demand'] },
  { id: 'APP-2402', business: 'Transport Express', owner: 'Jean-Pierre Eteme', phone: '+237 677 102 441', city: 'Yaounde', region: 'Centre', industry: 'Transport', score: 680, risk: 'medium', kyc: 'verified', ohada: 'partial', revenue: 8900000, trend: 8, volume: 17400000, momo: 'MTN + Orange', repaymentProbability: 78, eligibleAmount: 2500000, requestedAmount: 4000000, status: 'new', relationshipManager: 'Nadine A.', insights: ['Revenue volatile on weekends', 'High fuel expenses', 'Good mobile money diversity'] },
  { id: 'APP-2403', business: 'Restaurant Bon Gout', owner: 'Aminata Fouda', phone: '+237 655 904 222', city: 'Bafoussam', region: 'West', industry: 'Food', score: 720, risk: 'low', kyc: 'pending', ohada: 'compliant', revenue: 6700000, trend: 14, volume: 9600000, momo: 'Orange only', repaymentProbability: 84, eligibleAmount: 2000000, requestedAmount: 1500000, status: 'approved', relationshipManager: 'Eric M.', insights: ['Stable lunch-hour revenue pattern', 'Tax calendar up to date', 'Needs KYC refresh before disbursement'] },
  { id: 'APP-2404', business: 'Agro Business SARL', owner: 'Paul Ndongo', phone: '+237 670 333 908', city: 'Bertoua', region: 'East', industry: 'Agriculture', score: 590, risk: 'high', kyc: 'review', ohada: 'partial', revenue: 4500000, trend: -4, volume: 7200000, momo: 'MTN only', repaymentProbability: 61, eligibleAmount: 800000, requestedAmount: 3000000, status: 'rejected', relationshipManager: 'Brice T.', insights: ['Seasonal revenue dip', 'Expense velocity anomaly', 'Recommend smaller starter loan'] },
  { id: 'APP-2405', business: 'Tech Solutions CM', owner: 'Kofi Mensah', phone: '+237 681 420 800', city: 'Douala', region: 'Littoral', industry: 'Services', score: 810, risk: 'low', kyc: 'verified', ohada: 'compliant', revenue: 15200000, trend: 24, volume: 31000000, momo: 'MTN + Orange', repaymentProbability: 96, eligibleAmount: 10000000, requestedAmount: 7000000, status: 'disbursed', relationshipManager: 'Nadine A.', insights: ['High recurring revenue', 'Excellent payment discipline', 'Eligible for revolving credit line'] },
];

const partners = [
  { name: 'BOA Cameroon', type: 'Commercial Bank', active: 128, approvals: 74, exposure: 230000000, sla: 98.2 },
  { name: 'Ecobank', type: 'Pan-African Bank', active: 96, approvals: 51, exposure: 175000000, sla: 97.6 },
  { name: 'Afriland First Bank', type: 'Commercial Bank', active: 63, approvals: 29, exposure: 88000000, sla: 96.9 },
  { name: 'ACEP Cameroun', type: 'MFI', active: 211, approvals: 133, exposure: 94000000, sla: 99.1 },
  { name: 'FINCA Microfinance', type: 'MFI', active: 142, approvals: 89, exposure: 61000000, sla: 98.8 },
];

const revenueTrend = [
  { m: 'Aug', revenue: 640, tx: 1200, risk: 2.8 },
  { m: 'Sep', revenue: 720, tx: 1340, risk: 2.5 },
  { m: 'Oct', revenue: 810, tx: 1480, risk: 2.2 },
  { m: 'Nov', revenue: 930, tx: 1710, risk: 2.0 },
  { m: 'Dec', revenue: 1020, tx: 1850, risk: 1.9 },
  { m: 'Jan', revenue: 1180, tx: 2110, risk: 1.7 },
];

const industryData = [
  { name: 'Retail', value: 38, color: '#0f4f4a' },
  { name: 'Food', value: 21, color: '#10b981' },
  { name: 'Transport', value: 18, color: '#f59e0b' },
  { name: 'Agriculture', value: 14, color: '#3b82f6' },
  { name: 'Services', value: 9, color: '#94a3b8' },
];

const sidebarItems = [
  { icon: Building2, label: 'SME Portfolio', id: 'portfolio' as BankView },
  { icon: FileText, label: 'Loan Review', id: 'applications' as BankView },
  { icon: Award, label: 'Credit Scoring', id: 'scoring' as BankView },
  { icon: Landmark, label: 'Partners', id: 'partners' as BankView },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' as BankView },
];

const riskTone = (risk: Risk) => risk === 'low' ? 'green' : risk === 'medium' ? 'amber' : 'red';

export const BankPortal: React.FC = () => {
  const { showToast } = useToast();
  const [activeItem, setActiveItem] = useState<BankView>('portfolio');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const [industry, setIndustry] = useState('all');
  const [selected, setSelected] = useState<SmeRecord>(smes[0]);
  const [decision, setDecision] = useState<{ type: 'approve' | 'reject'; sme: SmeRecord } | null>(null);

  const filtered = useMemo(() => smes.filter((sme) => {
    const matchQuery = `${sme.business} ${sme.owner} ${sme.city} ${sme.industry}`.toLowerCase().includes(query.toLowerCase());
    const matchRegion = region === 'all' || sme.region === region;
    const matchIndustry = industry === 'all' || sme.industry === industry;
    return matchQuery && matchRegion && matchIndustry;
  }), [query, region, industry]);

  const showAction = (title: string, message?: string) => showToast({ type: 'success', title, message });

  const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen bg-surface-50 text-surface-900">
      <aside className="fixed left-0 top-0 z-20 flex h-full w-72 flex-col border-r border-surface-200 bg-white">
        <div className="border-b border-surface-200 p-6">
          <Logo size={34} animated />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-surface-400">Financial Institution Portal</p>
          <div className="mt-3 rounded-xl bg-formalio-50 p-3"><PulseDot tone="green" label="Partner API connected" /></div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setActiveItem(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${activeItem === item.id ? 'bg-formalio-50 text-formalio-700' : 'text-surface-600 hover:bg-surface-50'}`}>
              <item.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {activeItem === item.id && <motion.span layoutId="bank-active" className="h-2 w-2 rounded-full bg-formalio-600" />}
            </button>
          ))}
        </nav>
        <div className="border-t border-surface-200 p-4"><div className="rounded-2xl bg-surface-50 p-4"><p className="text-xs font-semibold text-surface-500">Portfolio quality</p><div className="mt-3 flex items-center justify-between"><span className="text-2xl font-bold text-formalio-700">A-</span><SystemSignal /></div></div></div>
      </aside>
      <main className="ml-72">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-surface-200 bg-white/90 px-8 py-4 backdrop-blur-xl">
          <div className="flex w-[520px] items-center gap-2 rounded-xl bg-surface-50 px-3 py-2 ring-1 ring-surface-200 focus-within:ring-formalio-300"><Search className="h-4 w-4 text-surface-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" placeholder="Search SME, owner, region, industry..." /></div>
          <div className="flex items-center gap-3"><button onClick={() => showAction('Portfolio exported')} className="rounded-xl bg-surface-50 px-3 py-2 text-sm font-semibold text-surface-700 ring-1 ring-surface-200"><Download className="mr-2 inline h-4 w-4" />Export</button><div className="flex h-10 w-10 items-center justify-center rounded-full bg-formalio-100 text-xs font-bold text-formalio-700">BK</div></div>
        </header>
        <div className="relative min-h-screen overflow-hidden p-8"><MotionGridBackground dense /><div className="relative z-0">{children}</div></div>
      </main>
      <DecisionModal decision={decision} onClose={() => setDecision(null)} onDone={() => { showAction(decision?.type === 'approve' ? 'Loan approved' : 'Loan rejected', `${decision?.sme.business} workflow updated`); setDecision(null); }} />
    </div>
  );

  const StatCard = ({ label, value, sub, icon: Icon, tone = 'green', suffix = '' }: any) => (
    <motion.div whileHover={{ y: -3 }} className="relative overflow-hidden rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
      <div className={`absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl ${tone === 'red' ? 'bg-danger-100' : tone === 'amber' ? 'bg-gold-100' : 'bg-formalio-100'}`} />
      <div className="relative flex items-start justify-between"><div><p className="text-sm text-surface-500">{label}</p><LiveCounter value={value} suffix={suffix} className="mt-1 block text-2xl font-bold text-surface-900" /><p className="mt-1 text-xs text-surface-400">{sub}</p></div><div className={`rounded-xl p-2.5 ${tone === 'red' ? 'bg-danger-50 text-danger-600' : tone === 'amber' ? 'bg-gold-50 text-gold-600' : 'bg-formalio-50 text-formalio-700'}`}><Icon className="h-5 w-5" /></div></div>
    </motion.div>
  );

  const Header = () => <div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-formalio-700">Formalio Credit Intelligence</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-surface-900">Bank & MFI Portal</h1><p className="mt-2 max-w-3xl text-sm text-surface-500">AI-assisted lending intelligence for SME underwriting, OHADA-compliant financial report access, risk analytics, and regional portfolio growth.</p></div><div className="flex gap-2"><button onClick={() => showAction('Relationship manager assigned')} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-surface-700 ring-1 ring-surface-200"><Handshake className="mr-2 inline h-4 w-4" />Assign RM</button><button onClick={() => showAction('Loan committee packet generated')} className="rounded-xl bg-formalio-700 px-4 py-2 text-sm font-semibold text-white"><FileText className="mr-2 inline h-4 w-4" />Committee Packet</button></div></div>;

  const PortfolioPage = () => (
    <div className="space-y-6"><Header />
      <div className="grid grid-cols-4 gap-4"><StatCard label="SMEs screened" value={1240} sub="5 regions connected" icon={Users} /><StatCard label="Loan-ready SMEs" value={856} sub="69% eligible" icon={CheckCircle2} /><StatCard label="Avg Mosika Score" value={712} sub="+5 pts this month" icon={Award} tone="amber" /><StatCard label="Default risk" value={2} suffix="%" sub="model estimate" icon={AlertTriangle} tone="red" /></div>
      <div className="grid grid-cols-[minmax(0,1fr)_420px] gap-6"><div className="rounded-2xl border border-surface-200 bg-white shadow-card"><div className="flex items-center gap-3 border-b border-surface-200 p-4"><div className="flex flex-1 items-center gap-2 rounded-xl bg-surface-50 px-3 py-2 ring-1 ring-surface-200"><Search className="h-4 w-4 text-surface-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" placeholder="Search SMEs..." /></div><Select value={region} setValue={setRegion} options={['all', 'Littoral', 'Centre', 'West', 'East']} label="Region" /><Select value={industry} setValue={setIndustry} options={['all', 'Retail', 'Transport', 'Food', 'Agriculture', 'Services']} label="Industry" /><button className="rounded-xl bg-surface-50 px-3 py-2 text-sm text-surface-600 ring-1 ring-surface-200"><SlidersHorizontal className="mr-1 inline h-4 w-4" />More</button></div><div className="overflow-x-auto"><table className="w-full min-w-[1100px]"><thead><tr className="border-b border-surface-200 text-left text-[11px] font-semibold uppercase tracking-wider text-surface-400"><th className="px-4 py-3">SME</th><th className="px-4 py-3">Region</th><th className="px-4 py-3">Industry</th><th className="px-4 py-3">Score</th><th className="px-4 py-3">KYC/OHADA</th><th className="px-4 py-3">Revenue</th><th className="px-4 py-3">Trend</th><th className="px-4 py-3">Repay prob.</th><th className="px-4 py-3">Risk</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr></thead><tbody>{filtered.map((sme) => <motion.tr key={sme.id} layout onClick={() => setSelected(sme)} className={`cursor-pointer border-b border-surface-100 text-sm hover:bg-formalio-50/40 ${selected.id === sme.id ? 'bg-formalio-50/60' : ''}`}><td className="px-4 py-3"><p className="font-semibold text-surface-900">{sme.business}</p><p className="text-xs text-surface-500">{sme.owner} · {sme.id}</p></td><td className="px-4 py-3"><MapPin className="mr-1 inline h-3.5 w-3.5 text-surface-400" />{sme.city}<p className="text-xs text-surface-400">{sme.region}</p></td><td className="px-4 py-3">{sme.industry}</td><td className="px-4 py-3"><Score score={sme.score} /></td><td className="px-4 py-3"><Badge label={sme.kyc} good={sme.kyc === 'verified'} /><span className="ml-1"><Badge label={sme.ohada} good={sme.ohada === 'compliant'} /></span></td><td className="px-4 py-3 font-semibold">{(sme.revenue / 1000000).toFixed(1)}M</td><td className={`px-4 py-3 font-semibold ${sme.trend > 0 ? 'text-formalio-700' : 'text-danger-600'}`}>{sme.trend > 0 ? <ArrowUpRight className="mr-1 inline h-4 w-4" /> : <ArrowDownRight className="mr-1 inline h-4 w-4" />}{sme.trend}%</td><td className="px-4 py-3 font-bold text-formalio-700">{sme.repaymentProbability}%</td><td className="px-4 py-3"><PulseDot tone={riskTone(sme.risk) as any} label={sme.risk} /></td><td className="px-4 py-3"><Status status={sme.status} /></td><td className="px-4 py-3"><button onClick={(e) => { e.stopPropagation(); setDecision({ type: 'approve', sme }); }} className="rounded-lg bg-formalio-700 px-3 py-1.5 text-xs font-semibold text-white">Review</button></td></motion.tr>)}</tbody></table></div></div><ProfilePanel sme={selected} setDecision={setDecision} showAction={showAction} /></div>
    </div>
  );

  const ApplicationsPage = () => (
    <div className="space-y-6"><Header /><div className="grid grid-cols-5 gap-3">{['new', 'review', 'approved', 'rejected', 'disbursed'].map((status) => <div key={status} className="rounded-2xl border border-surface-200 bg-white p-4"><p className="text-xs uppercase tracking-wider text-surface-400">{status}</p><p className="mt-1 text-2xl font-bold text-surface-900">{smes.filter((s) => s.status === status).length}</p></div>)}</div><div className="grid grid-cols-5 gap-4">{['new', 'review', 'approved', 'rejected', 'disbursed'].map((status) => <div key={status} className="space-y-3"><h3 className="text-sm font-bold uppercase tracking-wider text-surface-500">{status}</h3>{smes.filter((s) => s.status === status).map((sme) => <motion.div key={sme.id} whileHover={{ y: -3 }} className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card"><div className="flex items-center justify-between"><Score score={sme.score} /><PulseDot tone={riskTone(sme.risk) as any} label={sme.risk} /></div><p className="mt-3 font-bold text-surface-900">{sme.business}</p><p className="text-xs text-surface-500">{sme.owner}</p><div className="mt-3 rounded-xl bg-surface-50 p-3"><p className="text-xs text-surface-500">Requested</p><p className="font-bold text-surface-900">{(sme.requestedAmount / 1000000).toFixed(1)}M FCFA</p></div><div className="mt-3 flex gap-2"><button onClick={() => setDecision({ type: 'approve', sme })} className="flex-1 rounded-lg bg-formalio-700 py-2 text-xs font-semibold text-white">Approve</button><button onClick={() => setDecision({ type: 'reject', sme })} className="flex-1 rounded-lg bg-danger-50 py-2 text-xs font-semibold text-danger-700">Reject</button></div></motion.div>)}</div>)}</div></div>
  );

  const ScoringPage = () => (
    <div className="space-y-6"><Header /><div className="grid grid-cols-2 gap-6"><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="text-lg font-bold">Credit scoring distribution</h3><div className="mt-4 h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={[{ r: '300-500', c: 45 }, { r: '500-650', c: 120 }, { r: '650-750', c: 340 }, { r: '750-850', c: 180 }]}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="r" /><YAxis /><Tooltip /><Bar dataKey="c" fill="#0f4f4a" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></div><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="text-lg font-bold">Revenue vs risk trend</h3><div className="mt-4 h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={revenueTrend}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="m" /><YAxis /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#0f4f4a" strokeWidth={3} dot={false} /><Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></div></div><div className="grid grid-cols-4 gap-4">{['Payment discipline', 'Revenue stability', 'OHADA compliance', 'Mobile Money depth'].map((label, i) => <div key={label} className="rounded-2xl border border-surface-200 bg-white p-5"><p className="text-sm font-semibold text-surface-900">{label}</p><div className="mt-4 h-2 rounded-full bg-surface-100"><motion.div initial={{ width: 0 }} animate={{ width: `${[88, 74, 81, 93][i]}%` }} className="h-full rounded-full bg-formalio-600" /></div><p className="mt-2 text-xs text-surface-500">Model weight {[35, 25, 20, 20][i]}%</p></div>)}</div></div>
  );

  const PartnersPage = () => (
    <div className="space-y-6"><Header /><div className="grid grid-cols-5 gap-4">{partners.map((partner) => <motion.div key={partner.name} whileHover={{ y: -4 }} className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card"><div className="flex items-center justify-between"><div className="rounded-xl bg-formalio-50 p-2 text-formalio-700"><Landmark className="h-5 w-5" /></div><PulseDot tone="green" label="live" /></div><h3 className="mt-4 font-bold text-surface-900">{partner.name}</h3><p className="text-xs text-surface-500">{partner.type}</p><div className="mt-4 space-y-2 text-sm"><div className="flex justify-between"><span>Active files</span><b>{partner.active}</b></div><div className="flex justify-between"><span>Approvals</span><b>{partner.approvals}</b></div><div className="flex justify-between"><span>Exposure</span><b>{(partner.exposure / 1000000).toFixed(0)}M</b></div><div className="flex justify-between"><span>SLA</span><b>{partner.sla}%</b></div></div></motion.div>)}</div><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="text-lg font-bold">MFI directory</h3><div className="mt-4 grid grid-cols-3 gap-3">{['ACEP Cameroun', 'FINCA Microfinance', 'Express Union Finance', 'CCA Bank SME desk', 'Credit Communautaire', 'Mutuelles CEMAC'].map((mfi) => <div key={mfi} className="rounded-xl bg-surface-50 p-4"><p className="font-semibold text-surface-900">{mfi}</p><p className="mt-1 text-xs text-surface-500">SME credit partner · API-ready</p></div>)}</div></div></div>
  );

  const AnalyticsPage = () => (
    <div className="space-y-6"><Header /><div className="grid grid-cols-[minmax(0,1fr)_360px] gap-6"><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="text-lg font-bold">Transaction and revenue trends</h3><div className="mt-4 h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenueTrend}><defs><linearGradient id="bankRev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0f4f4a" stopOpacity={0.25} /><stop offset="100%" stopColor="#0f4f4a" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="m" /><YAxis /><Tooltip /><Area type="monotone" dataKey="revenue" stroke="#0f4f4a" fill="url(#bankRev)" strokeWidth={3} /><Area type="monotone" dataKey="tx" stroke="#3b82f6" fill="transparent" strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div><div className="rounded-2xl border border-surface-200 bg-white p-6"><h3 className="text-lg font-bold">Industry mix</h3><div className="mt-4 h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={industryData} innerRadius={60} outerRadius={92} dataKey="value">{industryData.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div><div className="space-y-2">{industryData.map((item) => <div key={item.name} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />{item.name}</span><b>{item.value}%</b></div>)}</div></div></div></div>
  );

  const views: Record<BankView, React.ReactNode> = { portfolio: <PortfolioPage />, applications: <ApplicationsPage />, scoring: <ScoringPage />, partners: <PartnersPage />, analytics: <AnalyticsPage /> };
  return <Shell>{views[activeItem]}</Shell>;
};

const Select: React.FC<{ value: string; setValue: (v: string) => void; options: string[]; label: string }> = ({ value, setValue, options, label }) => <label className="relative"><select value={value} onChange={(e) => setValue(e.target.value)} className="appearance-none rounded-xl bg-white px-3 py-2 pr-8 text-sm ring-1 ring-surface-200 outline-none"><option value="all">All {label}</option>{options.filter((o) => o !== 'all').map((o) => <option key={o}>{o}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-surface-400" /></label>;
const Score: React.FC<{ score: number }> = ({ score }) => <span className={`rounded-full px-2 py-1 text-xs font-bold ${score >= 750 ? 'bg-formalio-50 text-formalio-700' : score >= 650 ? 'bg-gold-50 text-gold-700' : 'bg-danger-50 text-danger-700'}`}>{score}</span>;
const Badge: React.FC<{ label: string; good?: boolean }> = ({ label, good }) => <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${good ? 'bg-formalio-50 text-formalio-700' : 'bg-gold-50 text-gold-700'}`}>{label}</span>;
const Status: React.FC<{ status: LoanStatus }> = ({ status }) => <span className={`rounded-full px-2 py-1 text-xs font-semibold ${status === 'approved' || status === 'disbursed' ? 'bg-formalio-50 text-formalio-700' : status === 'rejected' ? 'bg-danger-50 text-danger-700' : 'bg-gold-50 text-gold-700'}`}>{status}</span>;
const ProfilePanel: React.FC<{ sme: SmeRecord; setDecision: (d: { type: 'approve' | 'reject'; sme: SmeRecord }) => void; showAction: (t: string, m?: string) => void }> = ({ sme, setDecision, showAction }) => <motion.div key={sme.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4"><div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-surface-400">SME profile</p><h3 className="mt-1 text-xl font-bold text-surface-900">{sme.business}</h3><p className="text-sm text-surface-500">{sme.owner} · {sme.id}</p></div><Status status={sme.status} /></div><div className="mt-4 grid grid-cols-2 gap-3"><Mini label="Eligible" value={`${(sme.eligibleAmount / 1000000).toFixed(1)}M FCFA`} /><Mini label="Requested" value={`${(sme.requestedAmount / 1000000).toFixed(1)}M FCFA`} /><Mini label="Repayment" value={`${sme.repaymentProbability}%`} /><Mini label="Revenue" value={`${(sme.revenue / 1000000).toFixed(1)}M`} /></div><div className="mt-4 flex gap-2"><button onClick={() => setDecision({ type: 'approve', sme })} className="flex-1 rounded-xl bg-formalio-700 py-2.5 text-sm font-semibold text-white"><Check className="mr-1 inline h-4 w-4" />Approve</button><button onClick={() => setDecision({ type: 'reject', sme })} className="flex-1 rounded-xl bg-danger-50 py-2.5 text-sm font-semibold text-danger-700"><X className="mr-1 inline h-4 w-4" />Reject</button></div><div className="mt-4 grid grid-cols-2 gap-2">{[{ l: 'Open PDF reports', i: FileText }, { l: 'Message RM', i: MessageSquare }, { l: 'Email owner', i: Mail }, { l: 'Call owner', i: Phone }].map((a) => <button key={a.l} onClick={() => showAction(a.l)} className="rounded-xl bg-surface-50 p-3 text-left text-xs font-semibold text-surface-700 ring-1 ring-surface-200 hover:bg-formalio-50"><a.i className="mb-2 h-4 w-4" />{a.l}</button>)}</div></div><div className="rounded-2xl border border-surface-200 bg-white p-5"><h3 className="font-bold text-surface-900">AI business insights</h3><div className="mt-3 space-y-2">{sme.insights.map((insight) => <div key={insight} className="rounded-xl bg-formalio-50 p-3 text-sm text-formalio-800"><Star className="mr-2 inline h-4 w-4 text-gold-500" />{insight}</div>)}</div></div></motion.div>;
const Mini: React.FC<{ label: string; value: string }> = ({ label, value }) => <div className="rounded-xl bg-surface-50 p-3"><p className="text-xs text-surface-400">{label}</p><p className="mt-1 font-bold text-surface-900">{value}</p></div>;
const DecisionModal: React.FC<{ decision: { type: 'approve' | 'reject'; sme: SmeRecord } | null; onClose: () => void; onDone: () => void }> = ({ decision, onClose, onDone }) => <AnimatePresence>{decision && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/60 p-4 backdrop-blur-sm"><motion.div initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }} className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-modal"><div className="flex items-start gap-3"><div className={`rounded-2xl p-3 ${decision.type === 'approve' ? 'bg-formalio-50 text-formalio-700' : 'bg-danger-50 text-danger-600'}`}>{decision.type === 'approve' ? <CheckCircle2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}</div><div><h3 className="text-lg font-bold text-surface-900">{decision.type === 'approve' ? 'Approve loan application?' : 'Reject loan application?'}</h3><p className="mt-1 text-sm text-surface-500">{decision.sme.business} requested {(decision.sme.requestedAmount / 1000000).toFixed(1)}M FCFA. This action will update application tracking and notify the relationship manager.</p></div></div><textarea className="mt-5 h-24 w-full rounded-xl border border-surface-200 bg-surface-50 p-3 text-sm outline-none" placeholder="Committee note..." /><div className="mt-5 flex justify-end gap-2"><button onClick={onClose} className="rounded-xl bg-surface-100 px-4 py-2 text-sm font-semibold text-surface-700">Cancel</button><button onClick={onDone} className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${decision.type === 'approve' ? 'bg-formalio-700' : 'bg-danger-600'}`}>{decision.type === 'approve' ? 'Approve' : 'Reject'}</button></div></motion.div></motion.div>}</AnimatePresence>;