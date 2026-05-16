import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Check, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import { AnimatedMascot } from './AnimatedMascot';

interface VoiceRecorderProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (transaction: ParsedTransaction) => void;
}

export interface ParsedTransaction {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  method: string;
}

type RecorderPhase = 'idle' | 'recording' | 'processing' | 'transcribed' | 'categorized';

// Simulated transcription phrases
const samplePhrases = [
  {
    transcript: "J'ai vendu 50,000 francs de tissus à un client ce matin",
    parsed: {
      type: 'income' as const,
      amount: 50000,
      description: 'Vente de tissus',
      category: 'Ventes',
      method: 'Espèces',
    },
  },
  {
    transcript: "J'ai dépensé 15,000 francs pour le transport de marchandises",
    parsed: {
      type: 'expense' as const,
      amount: 15000,
      description: 'Transport de marchandises',
      category: 'Transport',
      method: 'Espèces',
    },
  },
  {
    transcript: "Reçu 125,000 francs sur MTN Mobile Money pour vente en gros",
    parsed: {
      type: 'income' as const,
      amount: 125000,
      description: 'Vente en gros',
      category: 'Ventes',
      method: 'MTN MoMo',
    },
  },
];

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ isOpen, onClose, onComplete }) => {
  const [phase, setPhase] = useState<RecorderPhase>('idle');
  const [transcript, setTranscript] = useState('');
  const [parsedData, setParsedData] = useState<ParsedTransaction | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phraseIndexRef = useRef(0);

  const reset = () => {
    setPhase('idle');
    setTranscript('');
    setParsedData(null);
    setRecordingTime(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  const startRecording = () => {
    setPhase('recording');
    setTranscript('');
    setRecordingTime(0);
    intervalRef.current = setInterval(() => {
      setRecordingTime((t) => t + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase('processing');

    // Simulate transcription
    const phrase = samplePhrases[phraseIndexRef.current % samplePhrases.length];
    phraseIndexRef.current++;

    setTimeout(() => {
      setTranscript('');
      setPhase('transcribed');
      // Type effect
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < phrase.transcript.length) {
          setTranscript(phrase.transcript.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setPhase('categorized');
            setParsedData(phrase.parsed);
          }, 800);
        }
      }, 30);
    }, 1500);
  };

  const handleConfirm = () => {
    if (parsedData) {
      onComplete(parsedData);
      reset();
      onClose();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-surface-900/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-formalio-600" />
            <span className="text-sm font-semibold text-surface-900">Mosika Voice AI</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-surface-100 flex items-center justify-center">
            <X className="w-4 h-4 text-surface-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* Mascot */}
          <AnimatedMascot
            state={
              phase === 'recording'
                ? 'listening'
                : phase === 'processing'
                ? 'thinking'
                : phase === 'categorized'
                ? 'success'
                : 'idle'
            }
            size={100}
          />

          {/* Status text */}
          <div className="mt-4 mb-4 min-h-[60px]">
            {phase === 'idle' && (
              <>
                <h3 className="text-lg font-semibold text-surface-900">Appuyez pour parler</h3>
                <p className="text-sm text-surface-500 mt-1">Décrivez votre transaction en français</p>
              </>
            )}
            {phase === 'recording' && (
              <>
                <h3 className="text-lg font-semibold text-formalio-700">Écoute en cours...</h3>
                <p className="text-sm text-surface-500 mt-1">{formatTime(recordingTime)}</p>
              </>
            )}
            {phase === 'processing' && (
              <>
                <h3 className="text-lg font-semibold text-surface-900">Mosika analyse...</h3>
                <p className="text-sm text-surface-500 mt-1">Transcription en cours</p>
              </>
            )}
            {phase === 'transcribed' && (
              <>
                <h3 className="text-lg font-semibold text-surface-900">Transcription</h3>
                <p className="text-sm text-surface-500 mt-1">Identification de la catégorie...</p>
              </>
            )}
            {phase === 'categorized' && (
              <>
                <h3 className="text-lg font-semibold text-formalio-700">Transaction reconnue !</h3>
                <p className="text-sm text-surface-500 mt-1">Vérifiez et confirmez</p>
              </>
            )}
          </div>

          {/* Waveform */}
          <div className="w-full h-20 flex items-center justify-center gap-1 mb-4">
            {phase === 'recording' &&
              [...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-formalio-500 rounded-full"
                  animate={{
                    height: ['20%', `${30 + Math.random() * 70}%`, '20%'],
                  }}
                  transition={{
                    duration: 0.6 + Math.random() * 0.4,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            {phase === 'processing' && (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-formalio-600 animate-spin" />
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-formalio-600 rounded-full"
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
            {(phase === 'transcribed' || phase === 'categorized') && transcript && (
              <div className="bg-surface-50 rounded-xl p-3 w-full text-left">
                <p className="text-xs text-surface-400 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Transcription
                </p>
                <p className="text-sm text-surface-900 italic">"{transcript}"</p>
                {phase === 'transcribed' && (
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-formalio-600 ml-1"
                  >
                    |
                  </motion.span>
                )}
              </div>
            )}
            {phase === 'idle' && (
              <div className="flex gap-1">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2 bg-surface-200 rounded-full" />
                ))}
              </div>
            )}
          </div>

          {/* Categorized Result */}
          <AnimatePresence>
            {phase === 'categorized' && parsedData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-formalio-50 border border-formalio-200 rounded-2xl p-4 mb-4"
              >
                <p className="text-xs text-formalio-700 font-semibold mb-3 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Catégorisé automatiquement
                </p>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-xs text-surface-500">Type</span>
                    <span
                      className={`text-xs font-semibold ${
                        parsedData.type === 'income' ? 'text-formalio-700' : 'text-danger-600'
                      }`}
                    >
                      {parsedData.type === 'income' ? '↑ Revenu' : '↓ Dépense'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-surface-500">Montant</span>
                    <span className="text-base font-bold text-surface-900">
                      {parsedData.amount.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-surface-500">Description</span>
                    <span className="text-xs font-medium text-surface-900">{parsedData.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-surface-500">Catégorie</span>
                    <span className="text-xs font-medium text-formalio-700 bg-white px-2 py-0.5 rounded-full">
                      {parsedData.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-surface-500">Méthode</span>
                    <span className="text-xs font-medium text-surface-900">{parsedData.method}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="w-full flex gap-2">
            {phase === 'idle' && (
              <button
                onClick={startRecording}
                className="flex-1 py-4 bg-formalio-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-formalio-800 active:scale-95 transition-all"
              >
                <Mic className="w-5 h-5" />
                Commencer
              </button>
            )}
            {phase === 'recording' && (
              <button
                onClick={stopRecording}
                className="flex-1 py-4 bg-danger-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-danger-600 transition-colors"
              >
                <div className="w-3 h-3 bg-white rounded-sm" />
                Arrêter ({formatTime(recordingTime)})
              </button>
            )}
            {phase === 'categorized' && (
              <>
                <button
                  onClick={reset}
                  className="px-4 py-3 bg-surface-100 text-surface-700 rounded-2xl font-medium hover:bg-surface-200 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 bg-formalio-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-formalio-800 active:scale-95 transition-all"
                >
                  <Check className="w-5 h-5" />
                  Confirmer
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
