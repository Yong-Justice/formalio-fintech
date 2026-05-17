export const transactions = [
  { id: 1, date: '2025-01-15', description: 'Vente marchandise — tissu wax', category: 'Revenus ventes', syscohada: '701', type: 'income', amount: 125000, method: 'MTN MoMo', status: 'completed' },
  { id: 2, date: '2025-01-14', description: 'Achat stock textile Marché Central', category: 'Achats marchandises', syscohada: '601', type: 'expense', amount: 45000, method: 'Espèces', status: 'completed' },
  { id: 3, date: '2025-01-14', description: 'Transport marchandise Douala-Yaoundé', category: 'Transport', syscohada: '624', type: 'expense', amount: 15000, method: 'Orange Money', status: 'completed' },
  { id: 4, date: '2025-01-13', description: 'Vente boutique — robe ankara', category: 'Revenus ventes', syscohada: '701', type: 'income', amount: 89000, method: 'Espèces', status: 'completed' },
  { id: 5, date: '2025-01-12', description: 'Abonnement téléphonique professionnel', category: 'Services extérieurs', syscohada: '626', type: 'expense', amount: 5000, method: 'MTN MoMo', status: 'completed' },
  { id: 6, date: '2025-01-11', description: 'Vente en gros — commande spéciale', category: 'Revenus ventes', syscohada: '701', type: 'income', amount: 210000, method: 'Virement bancaire', status: 'completed' },
  { id: 7, date: '2025-01-10', description: 'Loyer boutique Bonanjo — Janvier', category: 'Loyer', syscohada: '621', type: 'expense', amount: 75000, method: 'Espèces', status: 'completed' },
  { id: 8, date: '2025-01-09', description: 'Vente client régulier Mme Ntone', category: 'Revenus ventes', syscohada: '701', type: 'income', amount: 67000, method: 'Orange Money', status: 'completed' },
  { id: 9, date: '2025-01-08', description: 'Electricité boutique — ENEO', category: 'Services extérieurs', syscohada: '625', type: 'expense', amount: 18500, method: 'Espèces', status: 'completed' },
  { id: 10, date: '2025-01-07', description: 'Vente en ligne — commande WhatsApp', category: 'Revenus ventes', syscohada: '701', type: 'income', amount: 45000, method: 'MTN MoMo', status: 'completed' },
  { id: 11, date: '2025-01-06', description: 'Salaire assistante Marie-Claire', category: 'Charges de personnel', syscohada: '661', type: 'expense', amount: 85000, method: 'MTN MoMo', status: 'completed' },
  { id: 12, date: '2025-01-05', description: 'Achat emballages et sachets', category: 'Achats consommables', syscohada: '602', type: 'expense', amount: 12000, method: 'Espèces', status: 'completed' },
  { id: 13, date: '2025-01-04', description: 'Prestation couture sur commande', category: 'Prestations services', syscohada: '706', type: 'income', amount: 55000, method: 'Espèces', status: 'completed' },
  { id: 14, date: '2025-01-03', description: 'CNPS cotisations sociales', category: 'Charges sociales', syscohada: '664', type: 'expense', amount: 22000, method: 'Virement bancaire', status: 'completed' },
  { id: 15, date: '2025-01-02', description: 'Vente Nouvelle Année — promotion', category: 'Revenus ventes', syscohada: '701', type: 'income', amount: 178000, method: 'MTN MoMo', status: 'completed' },
];

export const invoices = [
  { id: 'FAC-2025-001', client: 'Mme Céleste Ngo', clientPhone: '+237 699 112 234', date: '2025-01-15', dueDate: '2025-01-30', items: [{ desc: 'Tissu wax 6 yards', qty: 3, price: 25000 }, { desc: 'Broderie personnalisée', qty: 1, price: 50000 }], total: 125000, status: 'paid', method: 'MTN MoMo' },
  { id: 'FAC-2025-002', client: 'Boutique Mode Akwa', clientPhone: '+237 677 445 678', date: '2025-01-11', dueDate: '2025-01-25', items: [{ desc: 'Commande en gros — wax hollandais', qty: 10, price: 21000 }], total: 210000, status: 'paid', method: 'Virement bancaire' },
  { id: 'FAC-2025-003', client: 'Mme Solange Meka', clientPhone: '+237 655 890 123', date: '2025-01-13', dueDate: '2025-01-28', items: [{ desc: 'Robe ankara sur mesure', qty: 2, price: 44500 }], total: 89000, status: 'paid', method: 'Espèces' },
  { id: 'FAC-2025-004', client: 'Hôtel La Falaise Douala', clientPhone: '+237 233 421 800', date: '2025-01-09', dueDate: '2025-02-09', items: [{ desc: 'Uniforme personnel — 20 tenues', qty: 20, price: 35000 }], total: 700000, status: 'pending', method: 'Virement bancaire' },
  { id: 'FAC-2025-005', client: 'CAMAIR-CO', clientPhone: '+237 233 504 100', date: '2024-12-20', dueDate: '2025-01-20', items: [{ desc: 'Tenues de cérémonie personnalisées', qty: 50, price: 28000 }], total: 1400000, status: 'overdue', method: 'Virement bancaire' },
  { id: 'FAC-2025-006', client: 'M. Patrice Ondoua', clientPhone: '+237 695 334 210', date: '2025-01-04', dueDate: '2025-01-19', items: [{ desc: 'Costume traditionnel', qty: 1, price: 55000 }], total: 55000, status: 'paid', method: 'Espèces' },
];

export const journalEntries = [
  { id: 'JNL-001', date: '2025-01-15', libelle: 'Vente marchandise tissu wax', debit: { account: '411', label: 'Clients', amount: 148438 }, credit: { account: '701', label: 'Ventes marchandises', amount: 125000 }, creditTva: { account: '4431', label: 'TVA collectée 19,25%', amount: 23438 } },
  { id: 'JNL-002', date: '2025-01-14', libelle: 'Achat stock textile', debit: { account: '601', label: 'Achats marchandises', amount: 45000 }, credit: { account: '401', label: 'Fournisseurs', amount: 45000 } },
  { id: 'JNL-003', date: '2025-01-10', libelle: 'Règlement loyer Janvier', debit: { account: '621', label: 'Loyers et charges locatives', amount: 75000 }, credit: { account: '521', label: 'Banque UBA', amount: 75000 } },
  { id: 'JNL-004', date: '2025-01-11', libelle: 'Vente en gros — commande spéciale', debit: { account: '521', label: 'Banque UBA', amount: 210000 }, credit: { account: '701', label: 'Ventes marchandises', amount: 175836 }, creditTva: { account: '4431', label: 'TVA collectée 19,25%', amount: 33852 } },
  { id: 'JNL-005', date: '2025-01-06', libelle: 'Salaire assistante Marie-Claire', debit: { account: '661', label: 'Rémunérations du personnel', amount: 85000 }, credit: { account: '421', label: 'Personnel — rémunérations dues', amount: 85000 } },
  { id: 'JNL-006', date: '2025-01-03', libelle: 'CNPS — cotisations sociales', debit: { account: '664', label: 'Charges sociales', amount: 22000 }, credit: { account: '432', label: 'Organismes sociaux — CNPS', amount: 22000 } },
];

export const grandLivreAccounts = [
  { code: '101', label: 'Capital social', type: 'passif', solde: 500000, mouvements: [{ date: '2024-01-01', libelle: 'Constitution capital', debit: 0, credit: 500000 }] },
  { code: '411', label: 'Clients', type: 'actif', solde: 320000, mouvements: [{ date: '2025-01-15', libelle: 'FAC-2025-004 — Hôtel La Falaise', debit: 700000, credit: 0 }, { date: '2025-01-09', libelle: 'Règlement FAC-2025-001', debit: 0, credit: 148438 }] },
  { code: '401', label: 'Fournisseurs', type: 'passif', solde: 215000, mouvements: [{ date: '2025-01-14', libelle: 'Achat stock textile', debit: 0, credit: 45000 }, { date: '2025-01-10', libelle: 'Règlement fournisseur', debit: 45000, credit: 0 }] },
  { code: '521', label: 'Banque UBA', type: 'actif', solde: 1245000, mouvements: [{ date: '2025-01-15', libelle: 'MTN MoMo sync', debit: 125000, credit: 0 }, { date: '2025-01-11', libelle: 'Virement vente gros', debit: 210000, credit: 0 }, { date: '2025-01-10', libelle: 'Loyer boutique', debit: 0, credit: 75000 }] },
  { code: '571', label: 'Caisse', type: 'actif', solde: 89000, mouvements: [{ date: '2025-01-13', libelle: 'Vente boutique espèces', debit: 89000, credit: 0 }, { date: '2025-01-12', libelle: 'Téléphone pro', debit: 0, credit: 5000 }] },
  { code: '601', label: 'Achats marchandises', type: 'charge', solde: 3200000, mouvements: [{ date: '2025-01-14', libelle: 'Stock textile', debit: 45000, credit: 0 }] },
  { code: '621', label: 'Loyers & charges locatives', type: 'charge', solde: 75000, mouvements: [{ date: '2025-01-10', libelle: 'Loyer boutique Janvier', debit: 75000, credit: 0 }] },
  { code: '661', label: 'Rémunérations personnel', type: 'charge', solde: 85000, mouvements: [{ date: '2025-01-06', libelle: 'Salaire Marie-Claire', debit: 85000, credit: 0 }] },
  { code: '701', label: 'Ventes marchandises', type: 'produit', solde: 8500000, mouvements: [{ date: '2025-01-15', libelle: 'Vente tissu wax', debit: 0, credit: 125000 }, { date: '2025-01-11', libelle: 'Vente en gros', debit: 0, credit: 210000 }] },
  { code: '4431', label: 'TVA collectée (19,25%)', type: 'passif', solde: 145000, mouvements: [{ date: '2025-01-15', libelle: 'TVA FAC-2025-001', debit: 0, credit: 23438 }, { date: '2025-01-11', libelle: 'TVA FAC-2025-002', debit: 0, credit: 33852 }] },
];

export const bilanData = {
  actif: {
    immobilise: [
      { label: 'Immobilisations corporelles (Matériel)', code: '24', brut: 850000, amort: 170000, net: 680000 },
      { label: 'Immobilisations incorporelles (Logiciels)', code: '21', brut: 0, amort: 0, net: 0 },
    ],
    circulant: [
      { label: 'Stocks de marchandises', code: '31', brut: 450000, amort: 0, net: 450000 },
      { label: 'Créances clients', code: '411', brut: 320000, amort: 0, net: 320000 },
      { label: 'Autres créances', code: '47', brut: 85000, amort: 0, net: 85000 },
    ],
    tresorerie: [
      { label: 'Banque UBA', code: '521', brut: 1245000, amort: 0, net: 1245000 },
      { label: 'Caisse', code: '571', brut: 89000, amort: 0, net: 89000 },
      { label: 'MTN MoMo', code: '572', brut: 312000, amort: 0, net: 312000 },
    ],
  },
  passif: {
    capitauxPropres: [
      { label: 'Capital social', code: '101', montant: 500000 },
      { label: 'Réserve légale (10%)', code: '111', montant: 180000 },
      { label: 'Résultat net exercice', code: '131', montant: 2320000 },
    ],
    dettesLT: [
      { label: 'Emprunt bancaire Afriland First Bank', code: '162', montant: 450000 },
    ],
    dettesCT: [
      { label: 'Dettes fournisseurs', code: '401', montant: 215000 },
      { label: 'Dettes fiscales — TVA', code: '4431', montant: 145000 },
      { label: 'Dettes sociales — CNPS', code: '432', montant: 22000 },
      { label: 'Rémunérations dues', code: '421', montant: 85000 },
    ],
  },
};

export const compteResultatData = {
  produits: [
    { code: '701', label: 'Ventes de marchandises', montant: 8500000 },
    { code: '706', label: 'Prestations de services', montant: 520000 },
    { code: '75', label: 'Autres produits', montant: 85000 },
  ],
  charges: [
    { code: '601', label: 'Achats de marchandises', montant: 3200000 },
    { code: '602', label: 'Achats consommables & emballages', montant: 144000 },
    { code: '621', label: 'Loyers et charges locatives', montant: 900000 },
    { code: '624', label: 'Transport & déplacement', montant: 180000 },
    { code: '625', label: 'Électricité, eau, services', montant: 222000 },
    { code: '626', label: 'Télécom & communication', montant: 60000 },
    { code: '661', label: 'Rémunérations du personnel', montant: 1020000 },
    { code: '664', label: 'Charges sociales — CNPS', montant: 264000 },
    { code: '671', label: 'Charges fiscales — PATENTE', montant: 120000 },
    { code: '695', label: 'Impôt sur les Sociétés (IS 30%)', montant: 576000 },
  ],
};

export const cashFlowData = [
  { name: 'Lun', income: 125000, expense: 45000 },
  { name: 'Mar', income: 89000, expense: 60000 },
  { name: 'Mer', income: 210000, expense: 75000 },
  { name: 'Jeu', income: 67000, expense: 15000 },
  { name: 'Ven', income: 145000, expense: 35000 },
  { name: 'Sam', income: 178000, expense: 22000 },
  { name: 'Dim', income: 56000, expense: 8000 },
];

export const monthlyData = [
  { name: 'Juil', revenue: 620000, expenses: 310000 },
  { name: 'Août', revenue: 750000, expenses: 380000 },
  { name: 'Sep', revenue: 690000, expenses: 350000 },
  { name: 'Oct', revenue: 890000, expenses: 430000 },
  { name: 'Nov', revenue: 1050000, expenses: 480000 },
  { name: 'Déc', revenue: 1380000, expenses: 560000 },
  { name: 'Jan', revenue: 850000, expenses: 420000 },
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
  { name: 'Prestations services', value: 15, color: '#10b981' },
  { name: 'Locations', value: 12, color: '#34d399' },
  { name: 'Autres', value: 8, color: '#6ee7b7' },
];

export const expenseBreakdown = [
  { name: 'Achats stock', value: 40, color: '#ef4444' },
  { name: 'Loyer', value: 25, color: '#f97316' },
  { name: 'Salaires & CNPS', value: 20, color: '#f59e0b' },
  { name: 'Transport', value: 8, color: '#eab308' },
  { name: 'Services', value: 7, color: '#ca8a04' },
];

export const adminUserGrowth = [
  { month: 'Juil', users: 1200, active: 890 },
  { month: 'Août', users: 1850, active: 1340 },
  { month: 'Sept', users: 2600, active: 1920 },
  { month: 'Oct', users: 3400, active: 2580 },
  { month: 'Nov', users: 4200, active: 3240 },
  { month: 'Déc', users: 5100, active: 3980 },
  { month: 'Jan', users: 6980, active: 5420 },
];

export const revenueAnalytics = [
  { month: 'Juil', mrr: 4500000, arr: 54000000 },
  { month: 'Août', mrr: 6200000, arr: 74400000 },
  { month: 'Sept', mrr: 8100000, arr: 97200000 },
  { month: 'Oct', mrr: 10500000, arr: 126000000 },
  { month: 'Nov', mrr: 12800000, arr: 153600000 },
  { month: 'Déc', mrr: 15200000, arr: 182400000 },
  { month: 'Jan', mrr: 11240000, arr: 134880000 },
];

export const smeProfiles = [
  { id: 1, name: 'Boutique Élégance', owner: 'Marie Nkono', sector: 'Commerce textile', creditScore: 760, revenue: 12500000, risk: 'low', loanReady: true, city: 'Douala', loanAmount: 2000000 },
  { id: 2, name: 'Transport Express', owner: 'Jean-Pierre Eteme', sector: 'Transport', creditScore: 680, revenue: 8900000, risk: 'medium', loanReady: true, city: 'Yaoundé', loanAmount: 1500000 },
  { id: 3, name: 'Restaurant Bon Goût', owner: 'Aminata Fouda', sector: 'Restauration', creditScore: 720, revenue: 6700000, risk: 'low', loanReady: true, city: 'Bafoussam', loanAmount: 1000000 },
  { id: 4, name: 'Agro Business SARL', owner: 'Paul Biya Jr.', sector: 'Agriculture', creditScore: 590, revenue: 4500000, risk: 'high', loanReady: false, city: 'Bertoua', loanAmount: 0 },
  { id: 5, name: 'Tech Solutions CM', owner: 'Kofi Mensah', sector: 'Services IT', creditScore: 810, revenue: 15200000, risk: 'low', loanReady: true, city: 'Douala', loanAmount: 3000000 },
];

export const accountantClients = [
  { id: 1, name: 'Boutique Élégance', owner: 'Marie Nkono', status: 'compliant', lastReport: '2025-01-10', transactions: 342, alerts: 0, revenue: 12500000, plan: 'Pro' },
  { id: 2, name: 'Transport Express', owner: 'Jean-Pierre Eteme', status: 'review', lastReport: '2025-01-08', transactions: 198, alerts: 2, revenue: 8900000, plan: 'Premium' },
  { id: 3, name: 'Restaurant Bon Goût', owner: 'Aminata Fouda', status: 'compliant', lastReport: '2025-01-12', transactions: 267, alerts: 0, revenue: 6700000, plan: 'Pro' },
  { id: 4, name: 'Agro Business SARL', owner: 'Paul Ndongo', status: 'audit', lastReport: '2024-12-20', transactions: 156, alerts: 5, revenue: 4500000, plan: 'Gratuit' },
  { id: 5, name: 'Tech Solutions CM', owner: 'Kofi Mensah', status: 'compliant', lastReport: '2025-01-14', transactions: 412, alerts: 0, revenue: 15200000, plan: 'Premium' },
];

export const testimonials = [
  { name: 'Marie Nkono', role: 'Propriétaire, Boutique Élégance', text: 'Formalio a transformé ma boutique. Avant, je ne savais pas combien je gagnais vraiment. Maintenant, j\'ai des rapports clairs et j\'ai obtenu mon premier prêt bancaire grâce à mon Score Mosika.', location: 'Douala, Cameroun' },
  { name: 'Jean-Pierre Eteme', role: 'Opérateur, Transport Express', text: 'Le sync avec MTN MoMo est magique. Je n\'ai plus besoin d\'écrire chaque transaction. Mon Score Mosika est passé de 580 à 720 en 4 mois. La banque m\'a même appelé en premier.', location: 'Yaoundé, Cameroun' },
  { name: 'Aminata Fouda', role: 'Gérante, Restaurant Bon Goût', text: 'Je ne comprends pas grand-chose à la comptabilité, mais Mosika m\'explique tout simplement. Même ma comptable agréée ONECCA est impressionnée par mes rapports SYSCOHADA.', location: 'Bafoussam, Cameroun' },
  { name: 'Philippe Nkemelu', role: 'Artisan, Menuiserie Moderne', text: 'J\'enregistre mes ventes par WhatsApp ! C\'est incroyable. Je tape juste "vendu 45 000" et Formalio classe tout. Mon comptable reçoit mes rapports directement. Trop fort.', location: 'Limbé, Cameroun' },
];

export const faqs = [
  { q: 'Qu\'est-ce que Formalio ?', a: 'Formalio est le Système d\'Exploitation pour entreprises (Business Operating System) qui aide les PME informelles en Afrique francophone à devenir financièrement visibles, conformes fiscalement et éligibles au crédit. Fondé au Cameroun, Formalio est conçu pour les 3 millions d\'entreprises invisibles de l\'économie informelle.' },
  { q: 'Comment fonctionne le Score Mosika ?', a: 'Le Score Mosika analyse vos transactions réelles, votre historique de paiements, votre conformité fiscale et la stabilité de vos revenus pour générer un score de crédit de 300 à 850. Plus vous utilisez Formalio régulièrement, plus votre score augmente — et plus vous devenez éligible aux prêts de nos partenaires bancaires.' },
  { q: 'Puis-je utiliser Formalio sans connexion internet ?', a: 'Oui ! Formalio est conçu pour fonctionner hors ligne, même dans les zones rurales à faible connectivité. Vos données sont enregistrées localement et synchronisées automatiquement dès que vous retrouvez une connexion.' },
  { q: 'Mes données sont-elles sécurisées ?', a: 'Absolument. Nous utilisons un chiffrement de niveau bancaire AES-256. Vos données financières ne sont jamais partagées avec des tiers sans votre consentement explicite, conformément à la loi camerounaise 2010/012 sur la protection des données personnelles.' },
  { q: 'Quels opérateurs Mobile Money sont supportés ?', a: 'Nous supportons MTN MoMo, Orange Money, et Wave dans tous les pays de la CEMAC. Les transactions s\'importent automatiquement via NotchPay — zéro saisie manuelle.' },
  { q: 'Comment fonctionne le Bot WhatsApp ?', a: 'Envoyez simplement un message à notre bot WhatsApp officiel : "Vendu 45 000 FCFA de tissus" ou "Payé loyer 75 000". L\'IA classifie et enregistre la transaction automatiquement dans votre compte Formalio.' },
  { q: 'Qu\'est-ce que la Marketplace des Comptables ?', a: 'Formalio connecte les PME aux experts-comptables agréés ONECCA de Cameroun. Trouvez un comptable certifié selon votre secteur, votre budget et votre localisation. Vos données Formalio lui sont partagées automatiquement, avec votre accord — zéro ressaisie manuelle.' },
  { q: 'Les rapports sont-ils conformes au SYSCOHADA ?', a: 'Oui. Formalio génère des états financiers conformes au SYSCOHADA 2017 révisé : Bilan, Compte de Résultat, Tableau des Flux de Trésorerie, Journal Comptable et Grand Livre. Les rapports portent la mention légale requise et sont prêts pour présentation aux banques, DGI, et auditeurs.' },
];

export const features = [
  { icon: 'BookOpen', title: 'Comptabilité Simplifiée', desc: 'Suivez vos revenus et dépenses sans formation comptable. Mosika vous guide à chaque étape, en français ou en anglais.' },
  { icon: 'FileText', title: 'Rapports SYSCOHADA', desc: 'Générez des états financiers conformes au SYSCOHADA 2017 : Bilan, Compte de Résultat, Grand Livre, Journal Comptable.' },
  { icon: 'ShieldCheck', title: 'Centre Fiscal', desc: 'Restez à jour avec vos obligations DGI. Calcul automatique de la TVA (19,25%), rappels d\'échéances, pré-remplissage des formulaires.' },
  { icon: 'Smartphone', title: 'Sync Mobile Money', desc: 'Connectez MTN MoMo et Orange Money. Les transactions s\'importent automatiquement via NotchPay — zéro saisie manuelle.' },
  { icon: 'TrendingUp', title: 'Score Mosika', desc: 'Construisez votre Score Mosika et devenez éligible pour des prêts auprès de nos partenaires bancaires (Afriland, BOA, Ecobank).' },
  { icon: 'Zap', title: 'Insights IA', desc: 'Recevez des conseils personnalisés de Mosika pour optimiser votre trésorerie, anticiper les risques et saisir les opportunités.' },
  { icon: 'MessageCircle', title: 'Bot WhatsApp', desc: 'Enregistrez vos transactions par WhatsApp sans ouvrir l\'app. "Vendu 45 000 FCFA de tissus" — Mosika classe et enregistre tout.' },
  { icon: 'Users', title: 'Marketplace Comptables', desc: 'Trouvez un expert-comptable agréé ONECCA. Partagez vos données Formalio en un clic. Certification et conformité garanties.' },
];

export const pricingPlans = [
  {
    name: 'Gratuit',
    price: '0',
    period: ' FCFA/mois',
    description: 'Pour les entrepreneurs qui démarrent leur formalisation',
    features: [
      '50 transactions/mois',
      'Score Mosika basique',
      'Rapport mensuel PDF',
      'Bot WhatsApp inclus',
      'Support communautaire',
      '1 entreprise',
    ],
    cta: 'Commencer Gratuitement',
    popular: false,
  },
  {
    name: 'Pro',
    price: '8 000',
    period: ' FCFA/mois',
    description: 'Pour les PME qui veulent accéder au crédit et à la conformité',
    features: [
      'Transactions illimitées',
      'Score Mosika complet + historique',
      'Rapports SYSCOHADA complets',
      'Sync Mobile Money automatique',
      'Insights IA personnalisés',
      'Centre Fiscal + rappels DGI',
      'Facturation client (Factures PDF)',
      'Accès Marketplace Comptables',
      'Support prioritaire 24h',
      '2 entreprises',
    ],
    cta: 'Essai Gratuit 14 jours',
    popular: true,
  },
  {
    name: 'Premium',
    price: '15 000',
    period: ' FCFA/mois',
    description: 'Pour les entreprises établies et les cabinets comptables',
    features: [
      'Tout dans Pro',
      'Multi-utilisateurs (5 accès)',
      'API B2B partenaires bancaires',
      'Comptable dédié ONECCA',
      'Dossier bancaire automatique',
      'Grand Livre & Journal Comptable',
      'Export CNPS, DSF, DGI intégré',
      'Analyses avancées + export Excel',
      'Marque blanche disponible',
      '5+ entreprises',
    ],
    cta: 'Contacter les Ventes',
    popular: false,
  },
];

export const notifications = [
  { id: 1, type: 'success', title: 'Sync Mobile Money réussie', message: '45 transactions importées depuis MTN MoMo — 312 000 FCFA reçus', time: '2 min', read: false },
  { id: 2, type: 'warning', title: 'Rappel Fiscal — Urgent', message: 'Déclaration TVA T4 2024 due dans 5 jours (145 000 FCFA)', time: '1h', read: false },
  { id: 3, type: 'info', title: 'Score Mosika en hausse', message: 'Votre score a augmenté de +15 points ce mois — 760/850', time: '3h', read: true },
  { id: 4, type: 'success', title: 'Objectif mensuel atteint', message: 'Revenus janvier : 870 000 FCFA — +23% vs décembre', time: '1j', read: true },
  { id: 5, type: 'warning', title: 'Facture en retard', message: 'FAC-2025-005 — CAMAIR-CO — 1 400 000 FCFA impayée depuis 25 jours', time: '2j', read: false },
  { id: 6, type: 'info', title: 'Opportunité de prêt', message: 'Afriland First Bank vous propose un prêt de 2 000 000 FCFA à 8%/an', time: '3j', read: true },
];

export const aiInsights = [
  { id: 1, type: 'tip', title: 'Optimisation des stocks', message: 'Vos achats de stock ont augmenté de 23% ce mois. Envisagez de négocier des remises avec votre fournisseur principal.', impact: 'Économie potentielle : 45 000 FCFA/mois' },
  { id: 2, type: 'alert', title: 'Créances clients en retard', message: 'FAC-2025-005 (CAMAIR-CO — 1 400 000 FCFA) est en retard de 25 jours. Relancez immédiatement pour protéger votre trésorerie.', impact: 'Risque : Pénurie de liquidités' },
  { id: 3, type: 'opportunity', title: 'Prêt Afriland — Pré-approuvé', message: 'Avec votre Score Mosika de 760, vous êtes pré-approuvé pour un prêt de 2 000 000 FCFA à 8% annuel via Afriland First Bank.', impact: 'Opportunité : Expansion possible' },
  { id: 4, type: 'tip', title: 'TVA déductible non réclamée', message: 'Vos achats professionnels de ce trimestre génèrent 609 300 FCFA de TVA déductible. Déclarez-les avant le 20 janvier.', impact: 'Récupération : 609 300 FCFA' },
];
