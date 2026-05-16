export const transactions = [
  { id: 1, date: '2025-01-15', description: 'Vente marchandise', category: 'Revenus', type: 'income', amount: 125000, method: 'MTN MoMo', status: 'completed' },
  { id: 2, date: '2025-01-14', description: 'Achat stock textile', category: 'Achats', type: 'expense', amount: 45000, method: 'Espèces', status: 'completed' },
  { id: 3, date: '2025-01-14', description: 'Transport marchandise', category: 'Transport', type: 'expense', amount: 15000, method: 'Orange Money', status: 'completed' },
  { id: 4, date: '2025-01-13', description: 'Vente boutique', category: 'Revenus', type: 'income', amount: 89000, method: 'Espèces', status: 'completed' },
  { id: 5, date: '2025-01-12', description: 'Frais téléphonique', category: 'Services', type: 'expense', amount: 5000, method: 'MTN MoMo', status: 'completed' },
  { id: 6, date: '2025-01-11', description: 'Vente en gros', category: 'Revenus', type: 'income', amount: 210000, method: 'Virement', status: 'completed' },
  { id: 7, date: '2025-01-10', description: 'Loyer boutique', category: 'Loyer', type: 'expense', amount: 75000, method: 'Espèces', status: 'completed' },
  { id: 8, date: '2025-01-09', description: 'Vente client régulier', category: 'Revenus', type: 'income', amount: 67000, method: 'Orange Money', status: 'completed' },
];

export const cashFlowData = [
  { name: 'Lun', income: 125000, expense: 45000 },
  { name: 'Mar', income: 89000, expense: 60000 },
  { name: 'Mer', income: 210000, expense: 75000 },
  { name: 'Jeu', income: 67000, expense: 15000 },
  { name: 'Ven', income: 145000, expense: 35000 },
  { name: 'Sam', income: 98000, expense: 22000 },
  { name: 'Dim', income: 56000, expense: 8000 },
];

export const monthlyData = [
  { name: 'Jan', revenue: 850000, expenses: 420000 },
  { name: 'Fév', revenue: 920000, expenses: 480000 },
  { name: 'Mar', revenue: 780000, expenses: 390000 },
  { name: 'Avr', revenue: 1050000, expenses: 520000 },
  { name: 'Mai', revenue: 980000, expenses: 460000 },
  { name: 'Juin', revenue: 1120000, expenses: 510000 },
];

export const creditScoreHistory = [
  { month: 'Juil', score: 620 },
  { month: 'Août', score: 645 },
  { month: 'Sept', score: 670 },
  { month: 'Oct', score: 695 },
  { month: 'Nov', score: 710 },
  { month: 'Déc', score: 735 },
  { month: 'Jan', score: 760 },
];

export const categoryBreakdown = [
  { name: 'Revenus ventes', value: 65, color: '#059669' },
  { name: 'Services', value: 15, color: '#10b981' },
  { name: 'Locations', value: 12, color: '#34d399' },
  { name: 'Autres', value: 8, color: '#6ee7b7' },
];

export const expenseBreakdown = [
  { name: 'Achats stock', value: 40, color: '#ef4444' },
  { name: 'Loyer', value: 25, color: '#f97316' },
  { name: 'Transport', value: 15, color: '#f59e0b' },
  { name: 'Services', value: 12, color: '#eab308' },
  { name: 'Autres', value: 8, color: '#ca8a04' },
];

export const adminUserGrowth = [
  { month: 'Juil', users: 1200, active: 890 },
  { month: 'Août', users: 1850, active: 1340 },
  { month: 'Sept', users: 2600, active: 1920 },
  { month: 'Oct', users: 3400, active: 2580 },
  { month: 'Nov', users: 4200, active: 3240 },
  { month: 'Déc', users: 5100, active: 3980 },
  { month: 'Jan', users: 6200, active: 4850 },
];

export const revenueAnalytics = [
  { month: 'Juil', mrr: 4500, arr: 54000 },
  { month: 'Août', mrr: 6200, arr: 74400 },
  { month: 'Sept', mrr: 8100, arr: 97200 },
  { month: 'Oct', mrr: 10500, arr: 126000 },
  { month: 'Nov', mrr: 12800, arr: 153600 },
  { month: 'Déc', mrr: 15200, arr: 182400 },
  { month: 'Jan', mrr: 18500, arr: 222000 },
];

export const smeProfiles = [
  { id: 1, name: 'Boutique Élégance', owner: 'Marie Nkono', sector: 'Commerce', creditScore: 760, revenue: 12500000, risk: 'low', loanReady: true },
  { id: 2, name: 'Transport Express', owner: 'Jean-Pierre Eteme', sector: 'Transport', creditScore: 680, revenue: 8900000, risk: 'medium', loanReady: true },
  { id: 3, name: 'Restaurant Bon Goût', owner: 'Aminata Fouda', sector: 'Restauration', creditScore: 720, revenue: 6700000, risk: 'low', loanReady: true },
  { id: 4, name: 'Agro Business SARL', owner: 'Paul Biya Jr.', sector: 'Agriculture', creditScore: 590, revenue: 4500000, risk: 'high', loanReady: false },
  { id: 5, name: 'Tech Solutions CM', owner: 'Kofi Mensah', sector: 'Services', creditScore: 810, revenue: 15200000, risk: 'low', loanReady: true },
];

export const accountantClients = [
  { id: 1, name: 'Boutique Élégance', owner: 'Marie Nkono', status: 'compliant', lastReport: '2025-01-10', transactions: 342, alerts: 0 },
  { id: 2, name: 'Transport Express', owner: 'Jean-Pierre Eteme', status: 'review', lastReport: '2025-01-08', transactions: 198, alerts: 2 },
  { id: 3, name: 'Restaurant Bon Goût', owner: 'Aminata Fouda', status: 'compliant', lastReport: '2025-01-12', transactions: 267, alerts: 0 },
  { id: 4, name: 'Agro Business SARL', owner: 'Paul Biya Jr.', status: 'audit', lastReport: '2024-12-20', transactions: 156, alerts: 5 },
  { id: 5, name: 'Tech Solutions CM', owner: 'Kofi Mensah', status: 'compliant', lastReport: '2025-01-14', transactions: 412, alerts: 0 },
];

export const testimonials = [
  { name: 'Marie Nkono', role: 'Propriétaire, Boutique Élégance', text: 'Formalio a transformé ma boutique. Avant, je ne savais pas combien je gagnais vraiment. Maintenant, j\'ai des rapports clairs et j\'ai obtenu mon premier prêt bancaire.', location: 'Douala, Cameroun' },
  { name: 'Jean-Pierre Eteme', role: 'Opérateur, Transport Express', text: 'Le sync avec MTN MoMo est magique. Je n\'ai plus besoin d\'écrire chaque transaction. Mon Score Mosika est passé de 580 à 720 en 4 mois.', location: 'Yaoundé, Cameroun' },
  { name: 'Aminata Fouda', role: 'Gérante, Restaurant Bon Goût', text: 'Je ne comprends pas grand-chose à la comptabilité, mais Mosika m\'explique tout simplement. Même ma comptable est impressionnée par mes rapports.', location: 'Bafoussam, Cameroun' },
];

export const faqs = [
  { q: 'Qu\'est-ce que Formalio ?', a: 'Formalio est un système d\'exploitation pour entreprises qui aide les PME informelles en Afrique francophone à devenir financièrement visibles, conformes fiscalement et éligibles au crédit.' },
  { q: 'Comment fonctionne le Score Mosika ?', a: 'Le Score Mosika analyse vos transactions, votre historique de paiements, votre conformité fiscale et votre stabilité commerciale pour générer un score de crédit de 300 à 850.' },
  { q: 'Puis-je utiliser Formalio sans connexion internet ?', a: 'Oui ! Formalio est conçu pour fonctionner hors ligne. Vos données sont synchronisées automatiquement dès que vous retrouvez une connexion.' },
  { q: 'Mes données sont-elles sécurisées ?', a: 'Absolument. Nous utilisons un chiffrement de niveau bancaire (AES-256) et vos données ne sont jamais partagées sans votre consentement explicite.' },
  { q: 'Quels opérateurs Mobile Money sont supportés ?', a: 'Nous supportons MTN MoMo, Orange Money, et Wave dans tous les pays de la CEMAC et bientôt en Côte d\'Ivoire et au Sénégal.' },
];

export const features = [
  { icon: 'BookOpen', title: 'Comptabilité Simplifiée', desc: 'Suivez vos revenus et dépenses sans connaissance comptable. Mosika guide chaque étape.' },
  { icon: 'FileText', title: 'Rapports OHADA', desc: 'Générez des rapports financiers conformes au SYSCOHADA en un clic. Prêts pour l\'audit.' },
  { icon: 'ShieldCheck', title: 'Conformité Fiscale', desc: 'Restez à jour avec vos obligations fiscales. Rappels automatiques et calculs de TVA.' },
  { icon: 'Smartphone', title: 'Sync Mobile Money', desc: 'Connectez MTN MoMo et Orange Money. Les transactions s\'importent automatiquement.' },
  { icon: 'TrendingUp', title: 'Score de Crédit', desc: 'Construisez votre Score Mosika et devenz éligible pour des prêts auprès de nos partenaires.' },
  { icon: 'Zap', title: 'Insights IA', desc: 'Recevez des conseils personnalisés pour améliorer votre trésorerie et réduire vos coûts.' },
];

export const pricingPlans = [
  { name: 'Débutant', price: '0', period: '/mois', description: 'Pour les petites entreprises qui démarrent', features: ['100 transactions/mois', 'Rapports basiques', 'Score Mosika', 'Support communautaire'], cta: 'Commencer Gratuitement', popular: false },
  { name: 'Croissance', price: '4,900', period: 'FCFA/mois', description: 'Pour les entreprises en expansion', features: ['Transactions illimitées', 'Rapports OHADA complets', 'Sync Mobile Money', 'Insights IA', 'Support prioritaire'], cta: 'Essai Gratuit 14j', popular: true },
  { name: 'Pro', price: '12,900', period: 'FCFA/mois', description: 'Pour les entreprises établies', features: ['Tout dans Croissance', 'Multi-utilisateurs', 'API access', 'Comptable dédié', 'Analyses avancées'], cta: 'Contacter les Ventes', popular: false },
];

export const notifications = [
  { id: 1, type: 'success', title: 'Sync Mobile Money', message: '45 transactions importées depuis MTN MoMo', time: '2 min', read: false },
  { id: 2, type: 'warning', title: 'Rappel Fiscal', message: 'Déclaration TVA due dans 5 jours', time: '1h', read: false },
  { id: 3, type: 'info', title: 'Score Mosika', message: 'Votre score a augmenté de +15 points !', time: '3h', read: true },
  { id: 4, type: 'success', title: 'Objectif atteint', message: 'Vous avez dépassé votre objectif de revenus mensuel', time: '1j', read: true },
];

export const aiInsights = [
  { id: 1, type: 'tip', title: 'Optimisation des stocks', message: 'Vos achats de stock ont augmenté de 23% ce mois. Envisagez de négocier des remises avec votre fournisseur principal.', impact: 'Économie potentielle: 45,000 FCFA/mois' },
  { id: 2, type: 'alert', title: 'Trésorerie', message: 'Votre trésorerie est basse pour la fin du mois. 3 factures clients sont en retard de paiement.', impact: 'Risque: Pénurie de liquidités' },
  { id: 3, type: 'opportunity', title: 'Prêt éligible', message: 'Avec votre Score Mosika actuel de 760, vous êtes éligible pour un prêt de 2,000,000 FCFA à 8% d\'intérêt.', impact: 'Opportunité: Expansion possible' },
];
