import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Wallet, FileText, User, Plus, Mic, ArrowLeft, Bell,
  ChevronRight, TrendingUp, TrendingDown, Smartphone, Shield,
  Lock, Eye, EyeOff, Check, HelpCircle,
  Settings, LogOut, Moon, Globe, CreditCard, Award,
  Share2, AlertTriangle, WifiOff, RefreshCw,
  Gift, Phone, MapPin, MessageCircle,
  Search, Filter, CheckCircle2, Sparkles, FileSpreadsheet
} from 'lucide-react';
import { LogoMark } from './Logo';
import { SYSCOHADAReport } from './SYSCOHADAReports';
import { MosikaScore } from './MosikaScore';
import { AIAssistant } from './AIAssistant';
import { AnimatedMascot, ConfettiBurst } from './AnimatedMascot';
import { AuthFlows } from './AuthFlows';
import { VoiceRecorder, ParsedTransaction } from './VoiceRecorder';
import { DownloadModal } from './DownloadModal';
import { useToast } from './Toast';
import {
  transactions as initialTransactions, cashFlowData,
  notifications as initialNotifications, aiInsights, pricingPlans
} from '../data/demoData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

type Screen =
  | 'auth'
  | 'business-setup'
  | 'dashboard' | 'transactions' | 'add-transaction'
  | 'cashflow' | 'credit-score' | 'reports' | 'mobile-money'
  | 'notifications' | 'ai-insights' | 'tax' | 'profile' | 'settings'
  | 'security' | 'subscription' | 'help' | 'referral' | 'offline';

export const MobileApp: React.FC = () => {
  const { showToast } = useToast();
  const [screen, setScreen] = useState<Screen>('auth');
  const [showNav, setShowNav] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [showBalance, setShowBalance] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [voiceRecorderOpen, setVoiceRecorderOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadReportInfo, setDownloadReportInfo] = useState({ title: '', period: '' });
  const [transactions, setTransactions] = useState(initialTransactions);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowNav(
      [
        'dashboard', 'transactions', 'cashflow', 'credit-score', 'reports',
        'notifications', 'ai-insights', 'tax', 'profile', 'settings',
        'security', 'subscription', 'help', 'referral', 'offline', 'mobile-money',
        'add-transaction',
      ].includes(screen)
    );
  }, [screen]);

  const navigate = (s: Screen) => setScreen(s);

  const goBack = () => {
    const backMap: Record<Screen, Screen> = {
      'auth': 'auth',
      'business-setup': 'auth',
      'dashboard': 'dashboard',
      'transactions': 'dashboard', 'add-transaction': 'transactions',
      'cashflow': 'dashboard', 'credit-score': 'dashboard',
      'reports': 'dashboard', 'mobile-money': 'profile',
      'notifications': 'dashboard', 'ai-insights': 'dashboard',
      'tax': 'dashboard', 'profile': 'dashboard',
      'settings': 'profile', 'security': 'settings',
      'subscription': 'profile', 'help': 'profile',
      'referral': 'profile', 'offline': 'dashboard',
    };
    setScreen(backMap[screen] || 'dashboard');
  };

  const handleVoiceTransaction = (parsed: ParsedTransaction) => {
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      description: parsed.description,
      category: parsed.category,
      type: parsed.type,
      amount: parsed.amount,
      method: parsed.method,
      status: 'completed',
    };
    setTransactions([newTransaction, ...transactions]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
    showToast({
      type: 'success',
      title: 'Transaction enregistrée !',
      message: `${parsed.amount.toLocaleString('fr-FR')} FCFA · ${parsed.category}`,
    });
  };

  const openDownload = (title: string, period: string) => {
    setDownloadReportInfo({ title, period });
    setDownloadModalOpen(true);
  };

  const bottomTabs = [
    { key: 'home', label: 'Accueil', icon: Home, screen: 'dashboard' as Screen },
    { key: 'transactions', label: 'Activité', icon: Wallet, screen: 'transactions' as Screen },
    { key: 'add', label: '', icon: Plus, screen: 'add-transaction' as Screen },
    { key: 'reports', label: 'Rapports', icon: FileText, screen: 'reports' as Screen },
    { key: 'profile', label: 'Profil', icon: User, screen: 'profile' as Screen },
  ];

  const ScreenWrapper: React.FC<{ children: React.ReactNode; title?: string; showBack?: boolean; noPadding?: boolean; rightAction?: React.ReactNode }> =
    ({ children, title, showBack = true, noPadding = false, rightAction }) => (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
        className="h-full flex flex-col bg-surface-50"
      >
        {title && (
          <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-surface-200 shrink-0">
            {showBack && (
              <button
                onClick={goBack}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-100 active:scale-95 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-surface-600" />
              </button>
            )}
            <h1 className="text-lg font-semibold text-surface-900 flex-1">{title}</h1>
            {rightAction}
          </div>
        )}
        <div className={`flex-1 overflow-y-auto ${noPadding ? '' : 'px-4 py-4'}`}>{children}</div>
        {showNav && (
          <div className="shrink-0 bg-white border-t border-surface-200 px-2 pb-2 pt-1">
            <div className="flex items-center justify-around">
              {bottomTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    navigate(tab.screen);
                  }}
                  className={`flex flex-col items-center py-1 px-3 rounded-lg active:scale-95 transition-all ${
                    activeTab === tab.key ? 'text-formalio-700' : 'text-surface-400'
                  }`}
                >
                  {tab.key === 'add' ? (
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-formalio-700 rounded-full flex items-center justify-center -mt-5 shadow-elevated"
                    >
                      <Plus className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    <>
                      <tab.icon className="w-5 h-5" />
                      <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );

  // ============ SCREENS ============

  const AuthScreenWrapper = () => (
    <AuthFlows
      onComplete={() => {
        showToast({
          type: 'success',
          title: 'Connexion réussie',
          message: 'Bienvenue dans votre tableau de bord',
        });
        setScreen(businessName ? 'dashboard' : 'business-setup');
      }}
    />
  );

  const BusinessSetupScreen = () => (
    <ScreenWrapper title="Votre Entreprise" showBack={false}>
      <div className="text-center mb-6">
        <AnimatedMascot state="pointing" size={100} />
        <h2 className="text-lg font-semibold text-surface-900 mt-2">Parlez-nous de vous</h2>
        <p className="text-sm text-surface-500">Quelques infos pour personnaliser Formalio</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-surface-700 mb-1.5 block">Nom de l'entreprise</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Ex: Boutique Élégance"
            className="w-full px-4 py-3 bg-white border border-surface-200 rounded-2xl outline-none focus:border-formalio-500 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-surface-700 mb-1.5 block">Type d'activité</label>
          <div className="grid grid-cols-2 gap-2">
            {['Commerce', 'Restauration', 'Transport', 'Services', 'Agriculture', 'Artisanat'].map((type) => (
              <motion.button
                key={type}
                whileTap={{ scale: 0.97 }}
                onClick={() => setBusinessType(type)}
                className={`p-3 rounded-xl text-sm font-medium border transition-colors ${
                  businessType === type
                    ? 'bg-formalio-50 border-formalio-300 text-formalio-700'
                    : 'bg-white border-surface-200 text-surface-600'
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-surface-700 mb-1.5 block">Localisation</label>
          <div className="flex items-center gap-2 px-4 py-3 bg-white border border-surface-200 rounded-2xl">
            <MapPin className="w-4 h-4 text-surface-400" />
            <input
              type="text"
              defaultValue="Douala, Cameroun"
              className="flex-1 outline-none text-sm"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setBusinessName(businessName || 'Marie Nkono');
          showToast({
            type: 'success',
            title: 'Compte créé !',
            message: 'Bienvenue sur Formalio',
          });
          navigate('dashboard');
        }}
        className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold mt-6 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <Check className="w-4 h-4" />
        Créer Mon Compte
      </button>
    </ScreenWrapper>
  );

  const DashboardScreen = () => (
    <ScreenWrapper noPadding>
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('profile')}
              className="w-11 h-11 bg-formalio-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
            >
              <span className="text-sm font-bold text-formalio-700">
                {(businessName || 'Marie Nkono').split(' ').map((s) => s[0]).join('').slice(0, 2)}
              </span>
            </button>
            <div>
              <p className="text-xs text-surface-400">Bonjour 👋</p>
              <p className="font-semibold text-surface-900 text-sm">
                {businessName || 'Marie Nkono'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg text-xs font-medium">
                <WifiOff className="w-3 h-3" />
                Hors ligne
              </div>
            )}
            <button
              onClick={() => navigate('notifications')}
              className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-surface-200 active:scale-95 transition-all"
            >
              <Bell className="w-5 h-5 text-surface-600" />
              {notifications.some((n) => !n.read) && (
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute top-2 right-2 w-2 h-2 bg-danger-500 rounded-full"
                />
              )}
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-card rounded-3xl p-5 text-white mb-4 relative overflow-hidden shadow-lg"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <LogoMark size={20} />
                <p className="text-xs text-white/60 font-medium">Solde Total</p>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="active:scale-95 transition-transform"
              >
                {showBalance ? (
                  <EyeOff className="w-4 h-4 text-white/60" />
                ) : (
                  <Eye className="w-4 h-4 text-white/60" />
                )}
              </button>
            </div>
            <motion.p
              key={showBalance ? 'visible' : 'hidden'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold mb-3"
            >
              {showBalance ? '1 245 000 FCFA' : '••••••••'}
            </motion.p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                <TrendingUp className="w-3.5 h-3.5 text-formalio-300" />
                <span className="text-xs text-formalio-300 font-medium">+12.5%</span>
              </div>
              <button
                onClick={() => navigate('cashflow')}
                className="text-xs bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-1 active:scale-95"
              >
                Détails
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Revenus', icon: TrendingUp, color: 'bg-formalio-50 text-formalio-700', value: '850K', screen: 'cashflow' as Screen },
            { label: 'Dépenses', icon: TrendingDown, color: 'bg-danger-50 text-danger-600', value: '420K', screen: 'cashflow' as Screen },
            { label: 'Score', icon: Award, color: 'bg-gold-50 text-gold-600', value: '760', screen: 'credit-score' as Screen },
            { label: 'Rapports', icon: FileText, color: 'bg-info-50 text-info-600', value: '12', screen: 'reports' as Screen },
          ].map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.screen)}
              className="bg-white rounded-2xl p-3 text-center border border-surface-200 active:bg-surface-50 transition-colors"
            >
              <div className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center mx-auto mb-1.5`}>
                <item.icon className="w-4 h-4" />
              </div>
              <p className="text-sm font-bold text-surface-900">{item.value}</p>
              <p className="text-[10px] text-surface-500">{item.label}</p>
            </motion.button>
          ))}
        </div>

        {/* AI Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-formalio-50 to-formalio-100/50 border border-formalio-200 rounded-2xl p-4 mb-4"
        >
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <AnimatedMascot state="thinking" size={48} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-formalio-700 flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3" />
                Conseil de Mosika
              </p>
              <p className="text-sm text-surface-700 leading-relaxed">
                Vos ventes ont augmenté de 23% ! C'est le moment idéal pour augmenter votre stock principal.
              </p>
              <button
                onClick={() => navigate('ai-insights')}
                className="text-xs text-formalio-700 font-semibold mt-2 flex items-center gap-1"
              >
                Voir tous les insights <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-4 border border-surface-200 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-surface-900">Transactions Récentes</p>
            <button
              onClick={() => navigate('transactions')}
              className="text-xs text-formalio-700 font-medium"
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-1">
            {transactions.slice(0, 4).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-formalio-50' : 'bg-danger-50'}`}>
                    {t.type === 'income' ? (
                      <TrendingUp className="w-4 h-4 text-formalio-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-danger-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900">{t.description}</p>
                    <p className="text-xs text-surface-400">{t.category} · {t.method}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-formalio-600' : 'text-danger-500'}`}>
                  {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('fr-FR')} FCFA
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Loan Opportunity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gold-50 border border-gold-200 rounded-2xl p-4 mb-4"
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center shrink-0"
            >
              <Award className="w-5 h-5 text-gold-600" />
            </motion.div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-surface-900 mb-1">Prêt pré-approuvé !</p>
              <p className="text-xs text-surface-600 mb-2">
                Avec votre Score Mosika de 760, vous êtes éligible pour 2 000 000 FCFA à 7,5 % / an.
              </p>
              <button
                onClick={() => navigate('credit-score')}
                className="text-xs bg-gold-500 text-white px-3 py-1.5 rounded-lg font-medium active:scale-95 transition-transform"
              >
                Voir l'offre
              </button>
            </div>
          </div>
        </motion.div>

        <button
          onClick={() => {
            setOfflineMode(!offlineMode);
            showToast({
              type: 'info',
              title: offlineMode ? 'En ligne' : 'Mode hors ligne',
              message: offlineMode ? 'Vos données sont synchronisées' : 'Vous pouvez continuer à travailler',
            });
          }}
          className="w-full py-2 text-xs text-surface-400 hover:text-surface-600 transition-colors mb-20"
        >
          {offlineMode ? 'Passer en mode en ligne' : 'Simuler mode hors ligne'}
        </button>
      </div>

      {/* AI Assistant FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        onClick={() => setAiAssistantOpen(true)}
        className="absolute bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-formalio-700 to-formalio-800 rounded-full flex items-center justify-center shadow-elevated hover:shadow-modal transition-all z-10"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
          AI
        </span>
      </motion.button>
    </ScreenWrapper>
  );

  const TransactionsScreen = () => {
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
    const filtered = transactions.filter((t) => filter === 'all' || t.type === filter);

    return (
      <ScreenWrapper title="Transactions">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 bg-white border border-surface-200 rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-surface-400" />
            <input type="text" placeholder="Rechercher..." className="flex-1 outline-none text-sm bg-transparent" />
          </div>
          <button className="w-10 h-10 bg-white border border-surface-200 rounded-xl flex items-center justify-center active:scale-95 transition-transform">
            <Filter className="w-4 h-4 text-surface-600" />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="bg-surface-100 rounded-xl p-1 flex gap-1 mb-4">
          {[
            { key: 'all', label: 'Toutes' },
            { key: 'income', label: 'Revenus' },
            { key: 'expense', label: 'Dépenses' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                filter === tab.key
                  ? 'bg-white text-surface-900 shadow-sm'
                  : 'text-surface-500 hover:text-surface-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <AnimatedMascot state="sleeping" size={120} />
            <p className="text-surface-700 font-semibold mt-4">Aucune transaction</p>
            <p className="text-xs text-surface-500 mt-1">Ajoutez votre première transaction</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-xl p-3 border border-surface-200 flex items-center justify-between active:bg-surface-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${t.type === 'income' ? 'bg-formalio-50' : 'bg-danger-50'}`}>
                    {t.type === 'income' ? (
                      <TrendingUp className="w-5 h-5 text-formalio-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-danger-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-surface-900 truncate">{t.description}</p>
                    <p className="text-xs text-surface-400">{t.date} · {t.method}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold whitespace-nowrap ml-2 ${t.type === 'income' ? 'text-formalio-600' : 'text-danger-500'}`}>
                  {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('fr-FR')} FCFA
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </ScreenWrapper>
    );
  };

  const AddTransactionScreen = () => {
    const [type, setType] = useState<'income' | 'expense'>('income');
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [method, setMethod] = useState('Espèces');

    const handleSave = () => {
      if (!amount || !desc) {
        showToast({ type: 'error', title: 'Champs manquants', message: 'Montant et description requis' });
        return;
      }
      const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split('T')[0],
        description: desc,
        category: category || 'Autres',
        type,
        amount: Number(amount),
        method,
        status: 'completed',
      };
      setTransactions([newTransaction, ...transactions]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
      showToast({
        type: 'success',
        title: 'Transaction enregistrée !',
        message: `${Number(amount).toLocaleString('fr-FR')} FCFA`,
      });
      navigate('dashboard');
    };

    return (
      <ScreenWrapper title="Nouvelle Transaction">
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setType('income')}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 active:scale-95 transition-all ${
                type === 'income'
                  ? 'bg-formalio-50 border-formalio-300 text-formalio-700'
                  : 'bg-white border-transparent text-surface-500'
              }`}
            >
              ↑ Revenu
            </button>
            <button
              onClick={() => setType('expense')}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 active:scale-95 transition-all ${
                type === 'expense'
                  ? 'bg-danger-50 border-danger-300 text-danger-600'
                  : 'bg-white border-transparent text-surface-500'
              }`}
            >
              ↓ Dépense
            </button>
          </div>

          <div>
            <label className="text-sm font-medium text-surface-700 mb-1.5 block">Montant (FCFA)</label>
            <input
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-4 bg-white border border-surface-200 rounded-2xl outline-none focus:border-formalio-500 text-2xl font-bold text-surface-900"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-surface-700 mb-1.5 block">Description</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Ex: Vente de tissus"
              className="w-full px-4 py-3 bg-white border border-surface-200 rounded-2xl outline-none focus:border-formalio-500 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-surface-700 mb-1.5 block">Catégorie</label>
            <div className="flex flex-wrap gap-2">
              {['Ventes', 'Achats', 'Transport', 'Loyer', 'Services', 'Salaires', 'Autres'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors active:scale-95 ${
                    category === cat
                      ? 'bg-formalio-50 border-formalio-300 text-formalio-700'
                      : 'bg-white border-surface-200 text-surface-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-surface-700 mb-1.5 block">Mode de paiement</label>
            <div className="grid grid-cols-3 gap-2">
              {['Espèces', 'MTN MoMo', 'Orange Money'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`p-3 rounded-xl text-xs font-medium text-center border transition-colors active:scale-95 ${
                    method === m
                      ? 'bg-formalio-50 border-formalio-300 text-formalio-700'
                      : 'bg-white border-surface-200 text-surface-600'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setVoiceRecorderOpen(true)}
            className="w-full py-3 bg-gradient-to-r from-formalio-700 to-formalio-800 text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-card"
          >
            <Mic className="w-4 h-4" />
            Saisie vocale Mosika AI
            <Sparkles className="w-3 h-3" />
          </button>

          <button
            onClick={handleSave}
            className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Check className="w-4 h-4" />
            Enregistrer
          </button>
        </div>
      </ScreenWrapper>
    );
  };

  const CashflowScreen = () => (
    <ScreenWrapper title="Trésorerie">
      <div className="bg-white rounded-2xl p-4 border border-surface-200 mb-4">
        <p className="text-sm font-semibold text-surface-900 mb-4">Flux Hebdomadaire</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="income" fill="#0f4f4a" radius={[4, 4, 0, 0]} animationDuration={800} />
              <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-formalio-50 rounded-2xl p-4 border border-formalio-100">
          <p className="text-xs text-formalio-600 mb-1">Revenus (7j)</p>
          <p className="text-xl font-bold text-formalio-800">784K FCFA</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-formalio-600" />
            <span className="text-xs text-formalio-600">+8.2%</span>
          </div>
        </div>
        <div className="bg-danger-50 rounded-2xl p-4 border border-danger-100">
          <p className="text-xs text-danger-600 mb-1">Dépenses (7j)</p>
          <p className="text-xl font-bold text-danger-700">240K FCFA</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3 text-danger-600" />
            <span className="text-xs text-danger-600">-3.1%</span>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  );

  const CreditScoreScreen = () => (
    <ScreenWrapper title="Score Mosika">
      <MosikaScore score={760} showDetails={true} />
    </ScreenWrapper>
  );

  const ReportsScreen = () => {
    const [selectedReport, setSelectedReport] = useState<'bilan' | 'compte-resultat' | 'tresorerie' | 'tva' | null>(null);

    if (selectedReport) {
      const titleMap = {
        bilan: 'Bilan Comptable',
        'compte-resultat': 'Compte de Résultat',
        tresorerie: 'Flux de Trésorerie',
        tva: 'Déclaration TVA',
      };
      return (
        <ScreenWrapper
          title="Rapport SYSCOHADA"
          rightAction={
            <button
              onClick={() => openDownload(titleMap[selectedReport], 'Janvier 2025')}
              className="px-3 py-1.5 bg-formalio-700 text-white text-xs font-semibold rounded-lg active:scale-95 transition-transform flex items-center gap-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Exporter
            </button>
          }
        >
          <button
            onClick={() => setSelectedReport(null)}
            className="text-xs text-formalio-700 font-medium mb-3 flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Retour aux rapports
          </button>
          <SYSCOHADAReport type={selectedReport} period="Janvier 2025" />
        </ScreenWrapper>
      );
    }

    return (
      <ScreenWrapper title="Rapports">
        <div className="bg-gradient-to-br from-formalio-800 to-formalio-900 rounded-2xl p-4 text-white mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-formalio-300" />
            </div>
            <div>
              <p className="text-sm font-semibold">Rapports OHADA</p>
              <p className="text-xs text-white/70">Conforme SYSCOHADA 2017</p>
            </div>
          </div>
          <p className="text-xs text-white/70 mt-2">
            Générez des rapports comptables officiels en un clic, prêts pour l'audit.
          </p>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Bilan Comptable', type: 'bilan' as const, date: 'Janvier 2025', status: 'ready' },
            { title: 'Compte de Résultat', type: 'compte-resultat' as const, date: 'Janvier 2025', status: 'ready' },
            { title: 'Flux de Trésorerie', type: 'tresorerie' as const, date: 'Janvier 2025', status: 'ready' },
            { title: 'Déclaration TVA', type: 'tva' as const, date: 'T1 2025', status: 'pending' },
          ].map((report, i) => (
            <motion.button
              key={report.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedReport(report.type)}
              className="w-full bg-white rounded-xl p-4 border border-surface-200 flex items-center gap-3 text-left hover:border-formalio-300 active:scale-[0.99] transition-all"
            >
              <div className="w-10 h-10 bg-formalio-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-formalio-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-surface-900">{report.title}</p>
                <p className="text-xs text-surface-400">{report.date}</p>
              </div>
              {report.status === 'ready' ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-formalio-50 text-formalio-700 px-2 py-1 rounded-full font-medium">
                    Prêt
                  </span>
                  <ChevronRight className="w-4 h-4 text-surface-400" />
                </div>
              ) : (
                <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-lg font-medium">
                  En attente
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </ScreenWrapper>
    );
  };

  const MobileMoneyScreen = () => (
    <ScreenWrapper title="Mobile Money">
      <div className="text-center mb-6">
        <AnimatedMascot state="secure" size={100} />
        <h2 className="text-lg font-semibold text-surface-900 mt-3">Connectez vos comptes</h2>
        <p className="text-sm text-surface-500">Importez automatiquement vos transactions</p>
      </div>
      <div className="space-y-3">
        {[
          { name: 'MTN MoMo', connected: true, lastSync: '2 min', count: 45, color: 'from-yellow-400 to-yellow-500' },
          { name: 'Orange Money', connected: true, lastSync: '15 min', count: 23, color: 'from-orange-400 to-orange-500' },
          { name: 'Wave', connected: false, lastSync: '-', count: 0, color: 'from-blue-400 to-blue-500' },
        ].map((account) => (
          <div key={account.name} className="bg-white rounded-2xl p-4 border border-surface-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${account.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                  {account.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-900">{account.name}</p>
                  <p className="text-xs text-surface-400">
                    {account.connected ? `Sync: ${account.lastSync}` : 'Non connecté'}
                  </p>
                </div>
              </div>
              {account.connected && (
                <div className="flex items-center gap-1 bg-formalio-50 text-formalio-700 text-xs font-medium px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-formalio-500 rounded-full animate-pulse" />
                  Actif
                </div>
              )}
            </div>
            {account.connected ? (
              <div className="flex items-center justify-between bg-surface-50 rounded-lg p-2.5">
                <span className="text-xs text-surface-600">{account.count} transactions importées</span>
                <button
                  onClick={() => {
                    showToast({ type: 'loading', title: 'Synchronisation...', duration: 1500 });
                    setTimeout(() => {
                      showToast({ type: 'success', title: 'Sync réussie !', message: '3 nouvelles transactions' });
                    }, 1500);
                  }}
                  className="text-xs text-formalio-700 font-semibold flex items-center gap-1 active:scale-95 transition-transform"
                >
                  <RefreshCw className="w-3 h-3" /> Sync
                </button>
              </div>
            ) : (
              <button
                onClick={() => showToast({ type: 'info', title: 'Connexion Wave', message: 'Bientôt disponible !' })}
                className="w-full py-2.5 bg-formalio-50 text-formalio-700 rounded-lg text-sm font-semibold active:scale-[0.98] transition-transform"
              >
                Connecter
              </button>
            )}
          </div>
        ))}
      </div>
    </ScreenWrapper>
  );

  const NotificationsScreen = () => (
    <ScreenWrapper
      title="Notifications"
      rightAction={
        <button
          onClick={() => {
            setNotifications(notifications.map((n) => ({ ...n, read: true })));
            showToast({ type: 'success', title: 'Tout est lu' });
          }}
          className="text-xs text-formalio-700 font-semibold"
        >
          Tout lire
        </button>
      }
    >
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <AnimatedMascot state="sleeping" size={120} />
          <p className="text-surface-700 font-semibold mt-4">Tout est calme</p>
          <p className="text-xs text-surface-500 mt-1">Aucune notification pour le moment</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-xl p-4 border ${n.read ? 'border-surface-200' : 'border-formalio-200 bg-formalio-50/50'}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    n.type === 'success'
                      ? 'bg-formalio-100 text-formalio-700'
                      : n.type === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-info-100 text-info-600'
                  }`}
                >
                  {n.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : n.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-surface-900">{n.title}</p>
                    <span className="text-xs text-surface-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-surface-500 mt-0.5">{n.message}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-formalio-500 rounded-full shrink-0 mt-1.5" />}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </ScreenWrapper>
  );

  const AiInsightsScreen = () => (
    <ScreenWrapper title="Insights IA">
      <div className="flex items-center gap-3 mb-4 bg-formalio-50 border border-formalio-200 rounded-2xl p-3">
        <AnimatedMascot state="thinking" size={48} />
        <div>
          <p className="text-sm font-semibold text-surface-900">Mosika Intelligence</p>
          <p className="text-xs text-surface-500">Basé sur vos {transactions.length * 30} transactions</p>
        </div>
      </div>
      <div className="space-y-3">
        {aiInsights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-4 border ${
              insight.type === 'alert'
                ? 'bg-danger-50 border-danger-200'
                : insight.type === 'opportunity'
                ? 'bg-gold-50 border-gold-200'
                : 'bg-formalio-50 border-formalio-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  insight.type === 'alert'
                    ? 'bg-danger-100 text-danger-600'
                    : insight.type === 'opportunity'
                    ? 'bg-gold-100 text-gold-600'
                    : 'bg-formalio-100 text-formalio-700'
                }`}
              >
                {insight.type === 'alert' ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : insight.type === 'opportunity' ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-surface-900">{insight.title}</p>
                <p className="text-xs text-surface-600 mt-1">{insight.message}</p>
                <p
                  className={`text-xs font-medium mt-2 ${
                    insight.type === 'alert'
                      ? 'text-danger-600'
                      : insight.type === 'opportunity'
                      ? 'text-gold-600'
                      : 'text-formalio-700'
                  }`}
                >
                  {insight.impact}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ScreenWrapper>
  );

  const TaxScreen = () => (
    <ScreenWrapper title="Fiscalité">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Déclaration TVA due</p>
            <p className="text-xs text-amber-700 mt-1">Date limite: 20 Janvier 2025 (dans 5 jours)</p>
            <button
              onClick={() => navigate('reports')}
              className="mt-2 text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg font-medium active:scale-95 transition-transform"
            >
              Préparer la déclaration
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 border border-surface-200">
        <p className="text-sm font-semibold text-surface-900 mb-3">Calendrier Fiscal</p>
        <div className="space-y-3">
          {[
            { date: '20 Jan', label: 'Déclaration TVA T4', status: 'upcoming' },
            { date: '15 Fév', label: 'Acompte IS', status: 'future' },
            { date: '31 Mar', label: 'Bilan Annuel', status: 'future' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-12 text-center">
                <p className="text-xs font-bold text-surface-700">{item.date.split(' ')[0]}</p>
                <p className="text-[10px] text-surface-400">{item.date.split(' ')[1]}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-surface-900">{item.label}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${item.status === 'upcoming' ? 'bg-amber-500' : 'bg-surface-300'}`} />
            </div>
          ))}
        </div>
      </div>
    </ScreenWrapper>
  );

  const ProfileScreen = () => (
    <ScreenWrapper noPadding>
      <div className="bg-gradient-to-br from-formalio-800 to-formalio-900 px-4 pt-8 pb-6 text-white">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
              <span className="text-xl font-bold text-white">
                {(businessName || 'Marie Nkono').split(' ').map((s) => s[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-formalio-500 border-2 border-formalio-800 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <p className="text-lg font-bold">{businessName || 'Marie Nkono'}</p>
            <p className="text-sm text-white/70">Boutique Élégance</p>
            <div className="flex items-center gap-2 mt-1">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs text-gold-300 font-medium">Score Mosika: 760</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden shadow-card">
          {[
            { icon: Settings, label: 'Paramètres', action: () => navigate('settings') },
            { icon: Shield, label: 'Sécurité', action: () => navigate('security') },
            { icon: CreditCard, label: 'Abonnement', badge: 'Croissance', action: () => navigate('subscription') },
            { icon: Smartphone, label: 'Mobile Money', action: () => navigate('mobile-money') },
            { icon: Gift, label: 'Parrainage', badge: '+1K', action: () => navigate('referral') },
            { icon: HelpCircle, label: 'Aide & Support', action: () => navigate('help') },
          ].map((item, i) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-surface-50 active:bg-surface-100 transition-colors ${i > 0 ? 'border-t border-surface-100' : ''}`}
            >
              <item.icon className="w-5 h-5 text-surface-500" />
              <span className="text-sm text-surface-700 flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] bg-formalio-100 text-formalio-700 px-2 py-0.5 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-surface-400" />
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            showToast({ type: 'info', title: 'Déconnexion', message: 'À bientôt !' });
            setTimeout(() => setScreen('auth'), 800);
          }}
          className="w-full flex items-center justify-center gap-2 py-3 mt-4 text-danger-500 text-sm font-medium active:scale-95 transition-transform"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
        <p className="text-center text-xs text-surface-400 mt-2 mb-4">
          Formalio v2.1.0 · Build 2451
        </p>
      </div>
    </ScreenWrapper>
  );

  const SettingsScreen = () => {
    const [toggles, setToggles] = useState({ darkMode: false, notifications: true, offlineSync: true });
    return (
      <ScreenWrapper title="Paramètres">
        <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden mb-4">
          {[
            { icon: Globe, label: 'Langue', value: 'Français' },
            { icon: Moon, label: 'Mode Sombre', toggle: 'darkMode' },
            { icon: Bell, label: 'Notifications', toggle: 'notifications' },
            { icon: WifiOff, label: 'Sync hors ligne', toggle: 'offlineSync' },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-surface-100' : ''}`}
            >
              <item.icon className="w-5 h-5 text-surface-500" />
              <span className="text-sm text-surface-700 flex-1">{item.label}</span>
              {item.toggle ? (
                <button
                  onClick={() => {
                    setToggles({ ...toggles, [item.toggle as keyof typeof toggles]: !toggles[item.toggle as keyof typeof toggles] });
                    showToast({
                      type: 'success',
                      title: `${item.label} ${toggles[item.toggle as keyof typeof toggles] ? 'désactivé' : 'activé'}`,
                    });
                  }}
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    toggles[item.toggle as keyof typeof toggles] ? 'bg-formalio-500' : 'bg-surface-300'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                    animate={{ left: toggles[item.toggle as keyof typeof toggles] ? 'calc(100% - 1.25rem)' : '0.25rem' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              ) : (
                <span className="text-sm text-surface-400">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </ScreenWrapper>
    );
  };

  const SecurityScreen = () => (
    <ScreenWrapper title="Sécurité">
      <div className="text-center mb-6">
        <AnimatedMascot state="secure" size={100} />
        <p className="text-sm text-surface-500 mt-3">Vos données sont chiffrées et sécurisées</p>
      </div>
      <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden mb-4">
        {[
          { icon: Lock, label: 'Code PIN', value: 'Activé' },
          { icon: Smartphone, label: 'Biométrie', value: 'Empreinte' },
          { icon: Shield, label: '2FA', value: 'Activée' },
        ].map((item, i) => (
          <div key={item.label} className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-surface-100' : ''}`}>
            <item.icon className="w-5 h-5 text-surface-500" />
            <span className="text-sm text-surface-700 flex-1">{item.label}</span>
            <span className="text-sm text-formalio-600 font-medium">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="bg-formalio-50 border border-formalio-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-formalio-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-formalio-800">Chiffrement bancaire</p>
            <p className="text-xs text-formalio-600 mt-1">AES-256 · TLS 1.3 · Données jamais partagées</p>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  );

  const SubscriptionScreen = () => (
    <ScreenWrapper title="Abonnement">
      <div className="bg-gradient-to-br from-formalio-800 to-formalio-900 rounded-2xl p-5 text-white mb-4 text-center">
        <p className="text-sm text-white/70 mb-1">Plan Actuel</p>
        <p className="text-2xl font-bold">Pro</p>
        <p className="text-sm text-white/70 mt-1">8 000 FCFA/mois</p>
        <div className="mt-3 inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs">
          <CheckCircle2 className="w-3 h-3" />
          Renouvellement: 15 Fév 2025
        </div>
      </div>
      <p className="text-sm font-semibold text-surface-900 mb-3">Changer de plan</p>
      <div className="space-y-3">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-xl p-4 border ${plan.popular ? 'border-formalio-300' : 'border-surface-200'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-surface-900">{plan.name}</p>
              {plan.popular && (
                <span className="text-xs bg-formalio-100 text-formalio-700 px-2 py-0.5 rounded-full font-medium">
                  Actuel
                </span>
              )}
            </div>
            <p className="text-lg font-bold text-surface-900">
              {plan.price} <span className="text-sm font-normal text-surface-500">{plan.period}</span>
            </p>
          </div>
        ))}
      </div>
    </ScreenWrapper>
  );

  const HelpScreen = () => (
    <ScreenWrapper title="Aide & Support">
      <div className="text-center mb-6">
        <AnimatedMascot state="wave" size={100} />
        <p className="text-sm text-surface-500 mt-3">Comment pouvons-nous vous aider ?</p>
      </div>
      <div className="space-y-3 mb-6">
        {[
          { icon: MessageCircle, label: 'Chat avec Mosika', desc: 'Assistant IA 24/7', action: () => setAiAssistantOpen(true) },
          { icon: Phone, label: 'Appeler le Support', desc: '+237 6XX XXX XXX' },
          { icon: HelpCircle, label: 'Centre d\'aide', desc: 'FAQs et tutoriels' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="w-full bg-white rounded-xl p-4 border border-surface-200 flex items-center gap-3 text-left hover:border-formalio-300 active:scale-[0.99] transition-all"
          >
            <div className="w-10 h-10 bg-formalio-50 rounded-lg flex items-center justify-center">
              <item.icon className="w-5 h-5 text-formalio-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-surface-900">{item.label}</p>
              <p className="text-xs text-surface-500">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-surface-400 ml-auto" />
          </button>
        ))}
      </div>
    </ScreenWrapper>
  );

  const ReferralScreen = () => (
    <ScreenWrapper title="Parrainage">
      <div className="text-center mb-6">
        <AnimatedMascot state="celebrate" size={100} />
        <h2 className="text-lg font-semibold text-surface-900 mt-3">Parrainez et Gagnez</h2>
        <p className="text-sm text-surface-500">Gagnez 1 000 FCFA par ami parrainé</p>
      </div>
      <div className="bg-gradient-to-br from-gold-50 to-gold-100/50 border border-gold-200 rounded-2xl p-5 text-center mb-4">
        <p className="text-sm text-gold-700 mb-2">Votre code de parrainage</p>
        <p className="text-3xl font-bold text-gold-800 tracking-widest">FORM24</p>
        <button
          onClick={() => showToast({ type: 'success', title: 'Code copié !', message: 'FORM24' })}
          className="mt-3 text-xs bg-gold-500 text-white px-4 py-2 rounded-lg font-medium active:scale-95 transition-transform"
        >
          Copier le Code
        </button>
      </div>
      <div className="bg-white rounded-2xl p-4 border border-surface-200 mb-4">
        <p className="text-sm font-semibold text-surface-900 mb-3">Vos statistiques</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xl font-bold text-surface-900">12</p>
            <p className="text-xs text-surface-500">Parrainés</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-surface-900">8</p>
            <p className="text-xs text-surface-500">Actifs</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gold-600">8K</p>
            <p className="text-xs text-surface-500">Gagnés</p>
          </div>
        </div>
      </div>
      <button className="w-full py-3.5 bg-formalio-700 text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
        <Share2 className="w-4 h-4" />
        Partager mon code
      </button>
    </ScreenWrapper>
  );

  const OfflineScreen = () => (
    <ScreenWrapper title="Hors Ligne">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <AnimatedMascot state="thinking" size={120} />
        <h2 className="text-lg font-semibold text-surface-900 mt-4 mb-2">Vous êtes hors ligne</h2>
        <p className="text-sm text-surface-500 max-w-xs mb-6">
          Pas de souci ! Vous pouvez continuer à utiliser Formalio. Vos données seront synchronisées automatiquement.
        </p>
      </div>
    </ScreenWrapper>
  );

  const screens: Record<Screen, React.ReactNode> = {
    auth: <AuthScreenWrapper />,
    'business-setup': <BusinessSetupScreen />,
    dashboard: <DashboardScreen />,
    transactions: <TransactionsScreen />,
    'add-transaction': <AddTransactionScreen />,
    cashflow: <CashflowScreen />,
    'credit-score': <CreditScoreScreen />,
    reports: <ReportsScreen />,
    'mobile-money': <MobileMoneyScreen />,
    notifications: <NotificationsScreen />,
    'ai-insights': <AiInsightsScreen />,
    tax: <TaxScreen />,
    profile: <ProfileScreen />,
    settings: <SettingsScreen />,
    security: <SecurityScreen />,
    subscription: <SubscriptionScreen />,
    help: <HelpScreen />,
    referral: <ReferralScreen />,
    offline: <OfflineScreen />,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-100 p-4 gap-4">
      {/* Demo Reset */}
      <div className="text-center">
        <p className="text-xs text-surface-500">Prototype Mobile · Cliquez pour interagir</p>
      </div>
      <div className="mobile-frame w-[360px] h-[720px] bg-white">
        <div className="w-full h-full overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div key={screen} className="w-full h-full">
              {screens[screen]}
            </motion.div>
          </AnimatePresence>
          <AIAssistant isOpen={aiAssistantOpen} onClose={() => setAiAssistantOpen(false)} />
          <VoiceRecorder
            isOpen={voiceRecorderOpen}
            onClose={() => setVoiceRecorderOpen(false)}
            onComplete={handleVoiceTransaction}
          />
          <DownloadModal
            isOpen={downloadModalOpen}
            onClose={() => setDownloadModalOpen(false)}
            reportTitle={downloadReportInfo.title}
            reportPeriod={downloadReportInfo.period}
          />
        </div>
      </div>

      {/* Quick Demo Reset Button */}
      <button
        onClick={() => {
          setScreen('auth');
          setBusinessName('');
          setBusinessType('');
          showToast({ type: 'info', title: 'Démo réinitialisée' });
        }}
        className="text-xs text-surface-400 hover:text-formalio-700 transition-colors flex items-center gap-1"
      >
        <RefreshCw className="w-3 h-3" />
        Recommencer la démo
      </button>

      <ConfettiBurst trigger={showConfetti} />
    </div>
  );
};
