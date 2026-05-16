import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, X, Sparkles, TrendingUp, AlertTriangle, CheckCircle2, Lightbulb, ChevronRight, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  action?: 'categorize' | 'insight' | 'alert';
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'Bonjour Marie ! 👋 Je suis Mosika, votre assistant intelligent. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
      suggestions: ['Catégoriser une transaction', 'Voir mes insights', 'Analyser mes dépenses', 'Préparer ma déclaration TVA'],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): { content: string; suggestions?: string[]; action?: Message['action'] } => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('catégoris') || lowerMessage.includes('transaction')) {
      return {
        content: 'J\'ai analysé vos 12 transactions non catégorisées. Voici mes suggestions :\n\n📦 "Achat tissu wax 50m" → Achats de marchandises\n🚕 "Taxi Douala-Yaoundé" → Transport\n📱 "Recharge MTN 5000F" → Télécommunications\n\nVoulez-vous que j\'applique ces catégories ?',
        suggestions: ['Appliquer les catégories', 'Voir les détails', 'Modifier manuellement'],
        action: 'categorize',
      };
    }

    if (lowerMessage.includes('insight') || lowerMessage.includes('conseil')) {
      return {
        content: '📊 Voici mes insights basés sur vos données :\n\n✅ Vos revenus ont augmenté de 23% ce mois\n⚠️ Vos dépenses de transport sont 40% plus élevées que la moyenne\n💡 Opportunité : Négociez avec votre fournisseur principal pour obtenir 5% de remise',
        suggestions: ['Voir le détail', 'Agir maintenant', 'Ignorer'],
        action: 'insight',
      };
    }

    if (lowerMessage.includes('dépens') || lowerMessage.includes('depens')) {
      return {
        content: '📈 Analyse de vos dépenses ce mois :\n\n• Achats stock : 420,000 FCFA (42%)\n• Loyer : 150,000 FCFA (15%)\n• Transport : 95,000 FCFA (10%)\n• Autres : 335,000 FCFA (33%)\n\nComparé au mois dernier, vos dépenses ont diminué de 8%. Bravo ! 🎉',
        suggestions: ['Voir le graphique', 'Définir un budget', 'Exporter'],
        action: 'insight',
      };
    }

    if (lowerMessage.includes('tva') || lowerMessage.includes('déclar') || lowerMessage.includes('tax')) {
      return {
        content: '📋 État de votre déclaration TVA :\n\n• TVA Collectée : 1,875,000 FCFA\n• TVA Déductible : 630,000 FCFA\n• Net à payer : 1,245,000 FCFA\n\n⏰ Date limite : 15 Février 2025 (dans 5 jours)\n\nVoulez-vous que je prépare votre déclaration ?',
        suggestions: ['Préparer la déclaration', 'Voir le détail', 'Rappeler plus tard'],
        action: 'alert',
      };
    }

    if (lowerMessage.includes('score') || lowerMessage.includes('crédit') || lowerMessage.includes('credit')) {
      return {
        content: '🏆 Votre Score Mosika actuel : 760 points (Très Bon)\n\nÉvolution : +15 points ce mois !\n\nFacteurs positifs :\n✓ Historique de paiement excellent\n✓ Diversité des transactions\n\nÀ améliorer :\n• Taux d\'utilisation du crédit (78%)\n\nObjectif : Atteindre 800+ d\'ici 3 mois',
        suggestions: ['Voir le détail', 'Améliorer mon score', 'Offres de prêt'],
        action: 'insight',
      };
    }

    if (lowerMessage.includes('prêt') || lowerMessage.includes('loan') || lowerMessage.includes('finance')) {
      return {
        content: '💰 Vous êtes pré-approuvé pour les prêts suivants :\n\n🏦 BOA Cameroun\n• Montant : 5,000,000 FCFA\n• Taux : 7.5% / an\n• Durée : 24 mois\n\n🏦 Ecobank\n• Montant : 3,000,000 FCFA\n• Taux : 8.2% / an\n• Durée : 18 mois\n\nVoulez-vous postuler ?',
        suggestions: ['Postuler chez BOA', 'Comparer les offres', 'Plus tard'],
        action: 'insight',
      };
    }

    // Default response
    return {
      content: 'Je peux vous aider avec :\n\n📊 Catégorisation automatique de transactions\n💡 Insights personnalisés sur votre business\n📋 Préparation des déclarations fiscales\n🏆 Suivi de votre Score Mosika\n💰 Offres de prêt pré-approuvées\n\nQue souhaitez-vous faire ?',
      suggestions: ['Catégoriser transactions', 'Voir insights', 'Déclaration TVA', 'Mon score'],
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(inputValue);
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
        action: response.action,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputValue('Catégoriser mes transactions récentes');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-surface-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white w-full max-w-lg max-h-[80vh] rounded-3xl shadow-modal overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-formalio-800 to-formalio-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Mosika AI</h3>
              <p className="text-xs text-white/70">Votre assistant intelligent</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-50">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-formalio-700 text-white rounded-br-md'
                    : 'bg-white border border-surface-200 rounded-bl-md'
                }`}
              >
                {message.type === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-formalio-600" />
                    <span className="text-xs font-medium text-formalio-700">Mosika</span>
                  </div>
                )}
                <p className={`text-sm whitespace-pre-line ${message.type === 'user' ? 'text-white' : 'text-surface-700'}`}>
                  {message.content}
                </p>
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-formalio-50 text-formalio-700 px-3 py-1.5 rounded-full font-medium hover:bg-formalio-100 transition-colors flex items-center gap-1"
                      >
                        {suggestion}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
                <p className={`text-[10px] mt-2 ${message.type === 'user' ? 'text-white/60' : 'text-surface-400'}`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white border border-surface-200 rounded-2xl rounded-bl-md p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-formalio-600 animate-spin" />
                  <span className="text-sm text-surface-500">Mosika réfléchit...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 bg-white border-t border-surface-200">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { icon: TrendingUp, label: 'Mes insights', query: 'Voir mes insights' },
              { icon: AlertTriangle, label: 'Alertes', query: 'Y a-t-il des alertes ?' },
              { icon: CheckCircle2, label: 'TVA', query: 'État déclaration TVA' },
              { icon: Lightbulb, label: 'Conseils', query: 'Des conseils pour mon business ?' },
            ].map((action, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(action.query)}
                className="flex items-center gap-1.5 bg-surface-50 hover:bg-formalio-50 px-3 py-1.5 rounded-full text-xs font-medium text-surface-600 hover:text-formalio-700 transition-colors whitespace-nowrap"
              >
                <action.icon className="w-3.5 h-3.5" />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-surface-200">
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceInput}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isListening ? 'bg-danger-500 animate-pulse' : 'bg-surface-100 hover:bg-surface-200'
              }`}
            >
              <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-surface-600'}`} />
            </button>
            <div className="flex-1 flex items-center gap-2 bg-surface-50 rounded-full px-4 py-2.5 border border-surface-200 focus-within:border-formalio-300 transition-colors">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez une question à Mosika..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 bg-formalio-700 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-formalio-800 transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          {isListening && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-center text-surface-500 mt-2">
              Écoute en cours... Parlez maintenant
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
