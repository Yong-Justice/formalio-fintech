import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, FileText, ShieldCheck, Smartphone, TrendingUp, Zap,
  ChevronDown, Check, Menu, X, ArrowRight, Star, Users, Globe,
  Lock, Download, Play, MessageCircle, BarChart3, Wallet, Receipt
} from 'lucide-react';
import { Logo } from './Logo';
import { testimonials, faqs, features, pricingPlans, transactions } from '../data/demoData';
import mascotOnboarding from '../assets/mascot-onboarding.png';
import { AnimatedMascot } from './AnimatedMascot';
import { FloatingDataOrb, LiveCounter, MotionGridBackground } from './EnterpriseMotion';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
};

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  const navLinks = [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Témoignages', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo size={36} />
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-surface-600 hover:text-formalio-700 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="text-sm font-medium text-surface-600 hover:text-formalio-700 px-3 py-2">
                Connexion
              </button>
              <button className="text-sm font-medium bg-formalio-700 text-white px-4 py-2 rounded-xl hover:bg-formalio-800 transition-colors">
                Essai Gratuit
              </button>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-surface-200 overflow-hidden">
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="block py-2 text-surface-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <button className="w-full text-left py-2 text-surface-600 font-medium">Connexion</button>
                <button className="w-full bg-formalio-700 text-white py-2.5 rounded-xl font-medium">Essai Gratuit</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <MotionGridBackground />
        <FloatingDataOrb index={0} label="MoMo Sync" value="68 transactions / min" x={80} y={150} />
        <FloatingDataOrb index={1} label="SYSCOHADA reports" value="12,450 generated" x={1400} y={220} />
        <FloatingDataOrb index={2} label="Mosika Score" value="+15 avg this month" x={1180} y={520} />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-formalio-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/90 font-medium">Déjà 6,200+ entreprises inscrites</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Votre entreprise,<br />
                <span className="text-formalio-300">enfin visible.</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                Le système d'exploitation pour les PME informelles au Cameroun et en Afrique francophone. Comptabilité, conformité fiscale, et accès au crédit — simplifiés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="inline-flex items-center justify-center gap-2 bg-white text-formalio-900 px-6 py-3.5 rounded-2xl font-semibold hover:bg-surface-100 transition-colors">
                  <Download className="w-5 h-5" />
                  Télécharger l'App
                </button>
                <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-white/20 transition-colors">
                  <Play className="w-5 h-5" />
                  Voir la Démo
                </button>
              </div>
              <div className="flex items-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Chiffrement bancaire</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Disponible hors ligne</span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center">
              <div className="flex items-center justify-center w-full max-w-md drop-shadow-2xl">
                <AnimatedMascot state="wave" size={380} />
              </div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                className="absolute -right-4 top-1/4 bg-white rounded-2xl p-4 shadow-elevated max-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-formalio-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-formalio-700" />
                  </div>
                  <span className="text-xs font-semibold text-surface-600">Score Mosika</span>
                </div>
                <div className="text-2xl font-bold text-formalio-800">760</div>
                <div className="text-xs text-formalio-600">Très Bon · +15 ce mois</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
                className="absolute -left-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-elevated max-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-gold-600" />
                  </div>
                  <span className="text-xs font-semibold text-surface-600">Trésorerie</span>
                </div>
                <div className="text-2xl font-bold text-formalio-800">1.2M FCFA</div>
                <div className="text-xs text-formalio-600">+23% vs mois dernier</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-12 bg-surface-50 border-y border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-surface-400 mb-8 uppercase tracking-wider">En partenariat avec</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['MTN MoMo', 'Orange Money', 'Afreximbank', 'BOA', 'Ecobank', 'SGBC'].map((partner) => (
              <span key={partner} className="text-lg font-bold text-surface-600">{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-formalio-600 font-semibold text-sm uppercase tracking-wider">Fonctionnalités</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mt-3 mb-4">
              Tout ce dont votre entreprise a besoin
            </h2>
            <p className="text-surface-500 text-lg">
              Des outils puissants mais simples, conçus pour les entrepreneurs africains.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white border border-surface-200 rounded-2xl p-6 hover:shadow-card-hover hover:border-formalio-200 transition-all">
                <div className="w-12 h-12 bg-formalio-50 rounded-xl flex items-center justify-center text-formalio-700 mb-4 group-hover:bg-formalio-100 transition-colors">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{feature.title}</h3>
                <p className="text-surface-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-formalio-600 font-semibold text-sm uppercase tracking-wider">Interface Mobile</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mt-3 mb-6">
                Gérez votre business depuis votre poche
              </h2>
              <div className="space-y-6">
                {[
                  { icon: <Smartphone className="w-5 h-5" />, title: 'Sync Mobile Money', desc: 'Connectez MTN MoMo et Orange Money. Les transactions s\'importent automatiquement.' },
                  { icon: <MessageCircle className="w-5 h-5" />, title: 'Saisie Vocale', desc: 'Dites "J\'ai vendu 50,000 FCFA de tissus" et Mosika enregistre tout.' },
                  { icon: <BarChart3 className="w-5 h-5" />, title: 'Insights en Temps Réel', desc: 'Visualisez votre trésorerie, vos tendances et vos opportunités.' },
                  { icon: <Receipt className="w-5 h-5" />, title: 'Rapports OHADA', desc: 'Générez des rapports conformes au SYSCOHADA en quelques secondes.' },
                ].map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex gap-4">
                    <div className="w-10 h-10 bg-formalio-100 rounded-xl flex items-center justify-center text-formalio-700 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-surface-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mobile-frame w-[320px] h-[640px] bg-white">
                <div className="w-full h-full bg-surface-50 overflow-y-auto">
                  <div className="p-4 pt-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xs text-surface-400">Bonjour,</p>
                        <p className="font-semibold text-surface-900">Marie Nkono</p>
                      </div>
                      <div className="w-10 h-10 bg-formalio-100 rounded-full flex items-center justify-center">
                        <img src={mascotOnboarding} alt="Mosika" className="w-8 h-8 object-contain" />
                      </div>
                    </div>
                    <div className="bg-formalio-800 rounded-2xl p-4 text-white mb-4">
                      <p className="text-xs text-white/70 mb-1">Solde Total</p>
                      <p className="text-2xl font-bold">1,245,000 FCFA</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="w-3 h-3 text-formalio-300" />
                        <span className="text-xs text-formalio-300">+12.5% ce mois</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {['Revenus', 'Dépenses', 'Rapports'].map((label) => (
                        <div key={label} className="bg-white rounded-xl p-3 text-center border border-surface-200">
                          <div className="w-8 h-8 bg-formalio-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                            {label === 'Revenus' ? <TrendingUp className="w-4 h-4 text-formalio-600" /> :
                             label === 'Dépenses' ? <Receipt className="w-4 h-4 text-danger-500" /> :
                             <FileText className="w-4 h-4 text-info-500" />}
                          </div>
                          <span className="text-xs font-medium text-surface-600">{label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-surface-200">
                      <p className="text-sm font-semibold text-surface-900 mb-3">Transactions Récentes</p>
                      {transactions.slice(0, 3).map((t) => (
                        <div key={t.id} className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-surface-900">{t.description}</p>
                            <p className="text-xs text-surface-400">{t.date}</p>
                          </div>
                          <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-formalio-600' : 'text-danger-500'}`}>
                            {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Score Feature */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-card rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium mb-4">Le Score Mosika</span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Devenez éligible au crédit
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Votre Score Mosika transforme votre activité commerciale quotidienne en une preuve de crédibilité financière. Plus vous utilisez Formalio, plus votre score augmente.
                </p>
                <div className="space-y-4">
                  {[
                    'Basé sur vos transactions réelles',
                    'Mis à jour en temps réel',
                    'Reconnu par nos partenaires bancaires',
                    'Completement gratuit'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-3xl p-8 text-surface-900 max-w-sm w-full">
                  <div className="text-center mb-6">
                    <p className="text-sm text-surface-500 mb-2">Votre Score Mosika</p>
                    <div className="text-6xl font-bold text-formalio-700">760</div>
                    <div className="inline-flex items-center gap-1 bg-formalio-50 text-formalio-700 px-3 py-1 rounded-full text-sm font-medium mt-2">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Très Bon
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Historique Transactions', score: 95 },
                      { label: 'Conformité Fiscale', score: 88 },
                      { label: 'Stabilité Revenus', score: 82 },
                      { label: 'Diversité Paiements', score: 76 },
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-surface-600">{metric.label}</span>
                          <span className="font-medium">{metric.score}%</span>
                        </div>
                        <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                          <div className="h-full bg-formalio-500 rounded-full" style={{ width: `${metric.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-formalio-600 font-semibold text-sm uppercase tracking-wider">Tarifs</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mt-3 mb-4">
              Des prix adaptés à chaque entreprise
            </h2>
            <p className="text-surface-500 text-lg">
              Commencez gratuitement et évoluez selon vos besoins. Pas de frais cachés.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-6 ${plan.popular ? 'bg-formalio-900 text-white shadow-elevated' : 'bg-white border border-surface-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Plus Populaire
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-surface-900'}`}>{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? 'text-white/70' : 'text-surface-500'}`}>{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-surface-900'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-surface-500'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${plan.popular ? 'text-formalio-400' : 'text-formalio-600'}`} />
                      <span className={plan.popular ? 'text-white/90' : 'text-surface-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                  plan.popular
                    ? 'bg-white text-formalio-900 hover:bg-surface-100'
                    : 'bg-formalio-700 text-white hover:bg-formalio-800'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-formalio-600 font-semibold text-sm uppercase tracking-wider">Témoignages</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mt-3 mb-4">
              Ils nous font confiance
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-surface-200 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-surface-700 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-formalio-100 rounded-full flex items-center justify-center text-formalio-700 font-bold text-sm">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-surface-900 text-sm">{t.name}</p>
                    <p className="text-xs text-surface-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-surface-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-formalio-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mt-3 mb-4">
              Questions fréquentes
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-surface-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-surface-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-surface-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <div className="px-5 pb-5 text-surface-600 text-sm leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist / CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-formalio-900 rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-formalio-700 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-formalio-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Rejoignez la révolution des PME africaines
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Inscrivez-vous à notre liste d'attente et soyez parmi les premiers à accéder à Formalio dans votre région.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                <button className="px-6 py-3 bg-white text-formalio-900 rounded-xl font-semibold hover:bg-surface-100 transition-colors flex items-center justify-center gap-2">
                  S'inscrire
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-white/50 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <LiveCounter value={6200} suffix="+ inscrits" />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>5 pays CEMAC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <Logo variant="light" size={36} />
              <p className="text-surface-400 text-sm mt-4 leading-relaxed">
                Le système d'exploitation pour les PME informelles en Afrique francophone.
              </p>
              <div className="flex gap-4 mt-6">
                {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                  <div key={social} className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <Globe className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-3 text-sm text-surface-400">
                {['Fonctionnalités', 'Tarifs', 'Sécurité', 'API', 'Intégrations'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-3 text-sm text-surface-400">
                {['À propos', 'Carrières', 'Presse', 'Partenaires', 'Contact'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-3 text-sm text-surface-400">
                {['Blog', 'Documentation', 'Centre d\'aide', 'Communauté', 'Statut'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-surface-500">© 2025 Formalio Technologies. Tous droits réservés.</p>
            <div className="flex gap-6 text-sm text-surface-500">
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


