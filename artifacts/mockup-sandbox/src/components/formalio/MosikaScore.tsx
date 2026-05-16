import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Shield, Zap, ChevronRight, Info, CheckCircle2, Star, ArrowUpRight } from 'lucide-react';
import { creditScoreHistory } from '../data/demoData';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface MosikaScoreProps {
  score?: number;
  showDetails?: boolean;
}

export const MosikaScore: React.FC<MosikaScoreProps> = ({ score = 760, showDetails = true }) => {
  const [showBreakdown, setShowBreakdown] = useState(true);

  const getScoreLevel = (score: number) => {
    if (score >= 750) return { level: 'Excellent', color: 'text-formalio-700', bg: 'bg-formalio-500', description: 'Éligible aux meilleurs taux' };
    if (score >= 650) return { level: 'Très Bon', color: 'text-formalio-600', bg: 'bg-formalio-400', description: 'Éligible à la plupart des prêts' };
    if (score >= 550) return { level: 'Bon', color: 'text-gold-600', bg: 'bg-gold-500', description: 'Éligible sous conditions' };
    if (score >= 450) return { level: 'Moyen', color: 'text-orange-600', bg: 'bg-orange-500', description: 'Amélioration nécessaire' };
    return { level: 'Faible', color: 'text-danger-600', bg: 'bg-danger-500', description: 'Actions requises' };
  };

  const scoreInfo = getScoreLevel(score);

  const breakdown = [
    { label: 'Historique de Paiement', weight: 35, score: 92, icon: CheckCircle2, tips: 'Continuez vos paiements réguliers' },
    { label: 'Utilisation du Crédit', weight: 25, score: 78, icon: TrendingUp, tips: 'Réduisez votre taux d\'utilisation à 30%' },
    { label: 'Ancienneté des Comptes', weight: 15, score: 85, icon: Award, tips: 'Maintenez vos comptes actifs' },
    { label: 'Diversité des Crédits', weight: 15, score: 72, icon: Star, tips: 'Ajoutez un crédit diversifié' },
    { label: 'Nouvelles Demandes', weight: 10, score: 88, icon: Zap, tips: 'Évitez trop de demandes simultanées' },
  ];

  const loanOffers = [
    { lender: 'BOA Cameroun', amount: 5000000, rate: 7.5, period: 24, approved: true },
    { lender: 'Ecobank', amount: 3000000, rate: 8.2, period: 18, approved: true },
    { lender: 'Afriland First Bank', amount: 10000000, rate: 9.5, period: 36, approved: false },
  ];

  const improvements = [
    { action: 'Synchroniser Orange Money', impact: '+25 points', time: 'Immédiat' },
    { action: 'Compléter déclaration TVA', impact: '+40 points', time: '1-2 semaines' },
    { action: 'Ajouter 3 mois de transactions', impact: '+35 points', time: '3 mois' },
    { action: 'Réduire dettes de 20%', impact: '+50 points', time: '1-2 mois' },
  ];

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <div className="bg-gradient-to-br from-formalio-800 to-formalio-900 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-gold-400" />
              <span className="text-sm text-white/70">Score Mosika</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-bold">{score}</span>
              <div>
                <span className={`text-sm font-semibold ${scoreInfo.color.replace('text-', 'text-').replace('700', '300').replace('600', '400')}`}>
                  {scoreInfo.level}
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3 text-formalio-300" />
                  <span className="text-xs text-formalio-300">+15 ce mois</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/60 mt-3 max-w-[200px]">{scoreInfo.description}</p>
          </div>
          
          {/* Score Gauge */}
          <div className="relative">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={score >= 750 ? '#10b981' : score >= 650 ? '#059669' : score >= 550 ? '#f59e0b' : '#ef4444'}
                strokeWidth="8"
                strokeDasharray={`${(score / 850) * 264} 264`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white/80" />
            </div>
          </div>
        </div>

        {/* Score Range */}
        <div className="relative mt-6">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-danger-500 via-gold-500 to-formalio-500 rounded-full" />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-white/50">
            <span>300</span>
            <span>500</span>
            <span>650</span>
            <span>750</span>
            <span>850</span>
          </div>
          <div
            className="absolute top-0 w-1 h-4 bg-white -translate-x-1/2"
            style={{ left: `${((score - 300) / 550) * 100}%` }}
          />
        </div>
      </div>

      {showDetails && (
        <>
          {/* Score Evolution Chart */}
          <div className="bg-white rounded-2xl p-5 border border-surface-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-surface-900">Évolution du Score</h3>
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="text-xs text-formalio-700 font-medium flex items-center gap-1"
              >
                {showBreakdown ? 'Masquer' : 'Voir'} détails
                <ChevronRight className={`w-3 h-3 transition-transform ${showBreakdown ? 'rotate-90' : ''}`} />
              </button>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={creditScoreHistory}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis domain={[500, 850]} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`${value} points`, 'Score']}
                  />
                  <Area type="monotone" dataKey="score" stroke="#059669" fill="url(#scoreGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown */}
          {showBreakdown && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              {breakdown.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-surface-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-formalio-50 rounded-lg flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-formalio-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-900">{item.label}</p>
                        <p className="text-xs text-surface-500">Poids: {item.weight}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-surface-900">{item.score}</p>
                      <p className="text-xs text-surface-400">/100</p>
                    </div>
                  </div>
                  <div className="h-2 bg-surface-100 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all ${item.score >= 80 ? 'bg-formalio-500' : item.score >= 60 ? 'bg-gold-500' : 'bg-danger-500'}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-surface-500 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {item.tips}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Loan Offers */}
          <div className="bg-white rounded-2xl p-5 border border-surface-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-surface-900">Offres de Prêt Pré-approuvées</h3>
              <span className="text-xs bg-formalio-100 text-formalio-700 px-2 py-1 rounded-full font-medium">
                {loanOffers.filter((l) => l.approved).length} disponibles
              </span>
            </div>
            <div className="space-y-3">
              {loanOffers.map((offer, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${offer.approved ? 'bg-formalio-50 border-formalio-200' : 'bg-surface-50 border-surface-200 opacity-60'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-surface-900">{offer.lender}</p>
                    {offer.approved ? (
                      <span className="text-xs bg-formalio-500 text-white px-2 py-0.5 rounded-full font-medium">
                        Pré-approuvé
                      </span>
                    ) : (
                      <span className="text-xs bg-surface-200 text-surface-600 px-2 py-0.5 rounded-full font-medium">
                        Sous conditions
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-surface-500">Montant</p>
                      <p className="font-semibold text-surface-900">{(offer.amount / 1000000).toFixed(1)}M FCFA</p>
                    </div>
                    <div>
                      <p className="text-surface-500">Taux</p>
                      <p className="font-semibold text-formalio-700">{offer.rate}% / an</p>
                    </div>
                    <div>
                      <p className="text-surface-500">Durée</p>
                      <p className="font-semibold text-surface-900">{offer.period} mois</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Tips */}
          <div className="bg-gold-50 border border-gold-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-gold-600" />
              <h3 className="text-sm font-semibold text-surface-900">Comment améliorer votre score</h3>
            </div>
            <div className="space-y-3">
              {improvements.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-formalio-500" />
                    <span className="text-sm text-surface-700">{item.action}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-formalio-700">{item.impact}</p>
                    <p className="text-[10px] text-surface-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score Benefits */}
          <div className="bg-formalio-800 rounded-2xl p-5 text-white">
            <h3 className="text-sm font-semibold mb-4">Avantages de votre score</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Taux préférentiels', icon: PercentIcon },
                { label: 'Approbation rapide', icon: Zap },
                { label: 'Plafonds élevés', icon: TrendingUp },
                { label: 'Partenaires premium', icon: Star },
              ].map((benefit, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
                  <benefit.icon className="w-5 h-5 text-formalio-300 mx-auto mb-1" />
                  <p className="text-xs text-white/80">{benefit.label}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function PercentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}
