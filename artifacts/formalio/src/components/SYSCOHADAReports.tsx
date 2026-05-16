import React from 'react';
import { FileText, Download, Share2, Eye, Calendar, TrendingUp, Building2 } from 'lucide-react';
import { monthlyData } from '../data/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReportProps {
  type: 'bilan' | 'compte-resultat' | 'tresorerie' | 'tva';
  period: string;
}

export const SYSCOHADAReport: React.FC<ReportProps> = ({ type, period }) => {
  const reportTitles = {
    'bilan': 'Bilan Comptable',
    'compte-resultat': 'Compte de Résultat',
    'tresorerie': 'Tableau de Flux de Trésorerie',
    'tva': 'Déclaration de TVA',
  };

  const bilanData = {
    actifs: [
      { label: 'Actifs Immobilisés', value: 2500000 },
      { label: 'Actifs Circulants', value: 4200000 },
      { label: 'Trésorerie Actif', value: 1245000 },
      { label: 'Total Actif', value: 7945000, total: true },
    ],
    passifs: [
      { label: 'Capitaux Propres', value: 3500000 },
      { label: 'Dettes Financières', value: 1800000 },
      { label: 'Dettes Circulantes', value: 2645000 },
      { label: 'Total Passif', value: 7945000, total: true },
    ],
  };

  const compteResultatData = [
    { label: 'Chiffre d\'Affaires', value: 12500000, type: 'income' },
    { label: 'Achats de Marchandises', value: -4200000, type: 'expense' },
    { label: 'Variation de Stock', value: 150000, type: 'income' },
    { label: 'Autres Produits', value: 320000, type: 'income' },
    { label: 'Charges de Personnel', value: -1800000, type: 'expense' },
    { label: 'Impôts et Taxes', value: -425000, type: 'expense' },
    { label: 'Autres Charges', value: -680000, type: 'expense' },
    { label: 'Dotations aux Amortissements', value: -250000, type: 'expense' },
    { label: 'Résultat d\'Exploitation', value: 5615000, type: 'result', bold: true },
    { label: 'Charges Financières', value: -125000, type: 'expense' },
    { label: 'Produits Financiers', value: 45000, type: 'income' },
    { label: 'Résultat Financier', value: -80000, type: 'result' },
    { label: 'Résultat Net', value: 5535000, type: 'result', bold: true, final: true },
  ];

  const tvaData = {
    collectee: 1875000,
    deductible: 630000,
    net: 1245000,
    details: [
      { label: 'Ventes de marchandises (19.25%)', value: 975000 },
      { label: 'Prestations de services (19.25%)', value: 420000 },
      { label: 'Autres opérations taxables', value: 480000 },
      { label: 'TVA Collectée Totale', value: 1875000, total: true },
    ],
    deductions: [
      { label: 'Achats de marchandises', value: 320000 },
      { label: 'Immobilisations', value: 185000 },
      { label: 'Autres biens et services', value: 125000 },
      { label: 'TVA Déductible Totale', value: 630000, total: true },
    ],
  };

  const formatFCFA = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(Math.abs(value)) + ' FCFA';
  };

  return (
    <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
      {/* Header */}
      <div className="bg-formalio-800 text-white p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{reportTitles[type]}</h3>
              <p className="text-xs text-white/70">Conforme SYSCOHADA Révisé</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70">Période</p>
            <p className="text-sm font-semibold">{period}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            Partager
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
            <Eye className="w-3.5 h-3.5" />
            Aperçu
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {type === 'bilan' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-surface-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-formalio-500 rounded-full" />
                ACTIF
              </h4>
              <div className="bg-surface-50 rounded-xl overflow-hidden">
                {bilanData.actifs.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 ${i > 0 ? 'border-t border-surface-200' : ''} ${item.total ? 'bg-formalio-50' : ''}`}>
                    <span className={`text-sm ${item.total ? 'font-bold text-surface-900' : 'text-surface-600'}`}>{item.label}</span>
                    <span className={`text-sm font-semibold ${item.total ? 'text-formalio-700' : 'text-surface-900'}`}>{formatFCFA(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-surface-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-gold-500 rounded-full" />
                PASSIF
              </h4>
              <div className="bg-surface-50 rounded-xl overflow-hidden">
                {bilanData.passifs.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 ${i > 0 ? 'border-t border-surface-200' : ''} ${item.total ? 'bg-gold-50' : ''}`}>
                    <span className={`text-sm ${item.total ? 'font-bold text-surface-900' : 'text-surface-600'}`}>{item.label}</span>
                    <span className={`text-sm font-semibold ${item.total ? 'text-gold-700' : 'text-surface-900'}`}>{formatFCFA(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-formalio-50 border border-formalio-200 rounded-xl p-4">
              <p className="text-xs text-formalio-700 text-center">
                ✓ Bilan équilibré · Total Actif = Total Passif
              </p>
            </div>
          </div>
        )}

        {type === 'compte-resultat' && (
          <div className="space-y-1">
            {compteResultatData.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  item.final ? 'bg-formalio-800 text-white' :
                  item.bold ? 'bg-surface-100' :
                  'hover:bg-surface-50'
                }`}
              >
                <span className={`text-sm ${item.final ? 'font-bold' : item.bold ? 'font-semibold text-surface-900' : 'text-surface-600'} ${item.type === 'expense' && !item.final ? 'text-danger-600' : ''}`}>
                  {item.label}
                </span>
                <span className={`text-sm font-semibold ${
                  item.final ? 'text-formalio-300' :
                  item.type === 'income' ? 'text-formalio-600' :
                  item.type === 'expense' ? 'text-danger-600' :
                  'text-surface-900'
                }`}>
                  {item.value >= 0 ? '+' : ''}{formatFCFA(item.value)}
                </span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-surface-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-surface-900">Marge Nette</span>
                <span className="text-lg font-bold text-formalio-700">{((5535000 / 12500000) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        {type === 'tva' && (
          <div className="space-y-6">
            <div className="bg-formalio-50 border border-formalio-200 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-surface-600">TVA Collectée</span>
                <span className="text-lg font-bold text-formalio-700">{formatFCFA(tvaData.collectee)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-surface-600">TVA Déductible</span>
                <span className="text-lg font-bold text-danger-600">-{formatFCFA(tvaData.deductible)}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-formalio-200">
                <span className="text-sm font-bold text-surface-900">TVA Nette à Payer</span>
                <span className="text-xl font-bold text-formalio-800">{formatFCFA(tvaData.net)}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-surface-900 mb-3">Détail TVA Collectée</h4>
              <div className="bg-surface-50 rounded-xl overflow-hidden">
                {tvaData.details.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 ${i > 0 ? 'border-t border-surface-200' : ''} ${item.total ? 'bg-formalio-50' : ''}`}>
                    <span className={`text-sm ${item.total ? 'font-bold text-surface-900' : 'text-surface-600'}`}>{item.label}</span>
                    <span className={`text-sm font-semibold ${item.total ? 'text-formalio-700' : 'text-surface-900'}`}>{formatFCFA(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-surface-900 mb-3">Détail TVA Déductible</h4>
              <div className="bg-surface-50 rounded-xl overflow-hidden">
                {tvaData.deductions.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 ${i > 0 ? 'border-t border-surface-200' : ''} ${item.total ? 'bg-gold-50' : ''}`}>
                    <span className={`text-sm ${item.total ? 'font-bold text-surface-900' : 'text-surface-600'}`}>{item.label}</span>
                    <span className={`text-sm font-semibold ${item.total ? 'text-gold-700' : 'text-surface-900'}`}>{formatFCFA(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Date limite de déclaration</p>
                  <p className="text-xs text-amber-600 mt-1">15 Février 2025 · Il reste 5 jours</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'tresorerie' && (
          <div className="space-y-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`${(value / 1000).toFixed(0)}K FCFA`, '']}
                  />
                  <Bar dataKey="revenue" name="Encaissements" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Décaissements" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-formalio-50 rounded-xl p-4 border border-formalio-100">
                <p className="text-xs text-formalio-600 mb-1">Total Encaissements</p>
                <p className="text-xl font-bold text-formalio-800">5.7M FCFA</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-formalio-600" />
                  <span className="text-xs text-formalio-600">+12.5%</span>
                </div>
              </div>
              <div className="bg-danger-50 rounded-xl p-4 border border-danger-100">
                <p className="text-xs text-danger-600 mb-1">Total Décaissements</p>
                <p className="text-xl font-bold text-danger-700">2.8M FCFA</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-danger-600" />
                  <span className="text-xs text-danger-600">+5.2%</span>
                </div>
              </div>
            </div>
            <div className="bg-formalio-800 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70 mb-1">Flux de Trésorerie Net</p>
                  <p className="text-2xl font-bold">+2.9M FCFA</p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-formalio-300" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-surface-50 border-t border-surface-200 p-4">
        <div className="flex items-center justify-between text-xs text-surface-500">
          <span>Généré le {new Date().toLocaleDateString('fr-FR')}</span>
          <span className="flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            SYSCOHADA 2017
          </span>
        </div>
      </div>
    </div>
  );
};
