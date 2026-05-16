import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Check, X, FileSpreadsheet, Mail, Share2, Eye } from 'lucide-react';
import { AnimatedMascot } from './AnimatedMascot';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  reportPeriod: string;
}

type DownloadPhase = 'preview' | 'choosing' | 'preparing' | 'downloading' | 'complete';
type FileFormat = 'pdf' | 'excel';

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, reportTitle, reportPeriod }) => {
  const [phase, setPhase] = useState<DownloadPhase>('preview');
  const [format, setFormat] = useState<FileFormat>('pdf');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPhase('preview');
      setProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (phase === 'preparing') {
      const t = setTimeout(() => setPhase('downloading'), 1200);
      return () => clearTimeout(t);
    }
    if (phase === 'downloading') {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('complete'), 300);
            return 100;
          }
          return p + 4 + Math.random() * 6;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const startDownload = (fmt: FileFormat) => {
    setFormat(fmt);
    setProgress(0);
    setPhase('preparing');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 bg-surface-900/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-3xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-formalio-800 to-formalio-900 text-white p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">{reportTitle}</h3>
                  <p className="text-xs text-white/70">{reportPeriod} · SYSCOHADA</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {phase === 'preview' && (
              <>
                {/* Mock document preview */}
                <div className="bg-surface-50 border border-surface-200 rounded-2xl p-4 mb-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-surface-400">FORMALIO</p>
                        <p className="text-sm font-bold text-surface-900">{reportTitle}</p>
                      </div>
                      <div className="w-8 h-8 bg-formalio-700 rounded-lg" />
                    </div>
                    <div className="space-y-1.5">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div className="h-2 bg-surface-200 rounded w-1/2" />
                          <div className="h-2 bg-surface-300 rounded w-16" />
                        </div>
                      ))}
                      <div className="h-px bg-surface-300 my-2" />
                      <div className="flex justify-between items-center">
                        <div className="h-2.5 bg-formalio-300 rounded w-1/3" />
                        <div className="h-2.5 bg-formalio-500 rounded w-20" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-surface-400 text-center mt-2">Aperçu · Page 1 sur 4</p>
                </div>

                {/* Format Selection */}
                <p className="text-sm font-semibold text-surface-900 mb-3">Choisir le format</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => startDownload('pdf')}
                    className="bg-white border-2 border-surface-200 hover:border-danger-300 rounded-2xl p-4 text-center transition-all group"
                  >
                    <div className="w-12 h-12 bg-danger-50 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-danger-100 transition-colors">
                      <FileText className="w-6 h-6 text-danger-600" />
                    </div>
                    <p className="text-sm font-semibold text-surface-900">PDF</p>
                    <p className="text-[10px] text-surface-500 mt-1">Idéal pour imprimer</p>
                  </button>
                  <button
                    onClick={() => startDownload('excel')}
                    className="bg-white border-2 border-surface-200 hover:border-formalio-300 rounded-2xl p-4 text-center transition-all group"
                  >
                    <div className="w-12 h-12 bg-formalio-50 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-formalio-100 transition-colors">
                      <FileSpreadsheet className="w-6 h-6 text-formalio-600" />
                    </div>
                    <p className="text-sm font-semibold text-surface-900">Excel</p>
                    <p className="text-[10px] text-surface-500 mt-1">Pour analyse</p>
                  </button>
                </div>

                {/* Other actions */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: Eye, label: 'Aperçu' },
                    { icon: Share2, label: 'Partager' },
                    { icon: Mail, label: 'Email' },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="bg-surface-50 hover:bg-surface-100 rounded-xl p-3 flex flex-col items-center gap-1 transition-colors"
                    >
                      <action.icon className="w-4 h-4 text-surface-600" />
                      <span className="text-[10px] text-surface-600 font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {(phase === 'preparing' || phase === 'downloading') && (
              <div className="text-center py-4">
                <AnimatedMascot state="loading" size={100} />
                <h3 className="text-lg font-semibold text-surface-900 mt-4">
                  {phase === 'preparing' ? 'Préparation du fichier...' : 'Téléchargement...'}
                </h3>
                <p className="text-sm text-surface-500 mt-1">
                  {format === 'pdf' ? 'PDF en cours de génération' : 'Excel en cours de génération'}
                </p>

                <div className="mt-6 bg-surface-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        format === 'pdf' ? 'bg-danger-100' : 'bg-formalio-100'
                      }`}
                    >
                      {format === 'pdf' ? (
                        <FileText className="w-5 h-5 text-danger-600" />
                      ) : (
                        <FileSpreadsheet className="w-5 h-5 text-formalio-600" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-surface-900">
                        {reportTitle.toLowerCase().replace(/\s+/g, '-')}.{format === 'pdf' ? 'pdf' : 'xlsx'}
                      </p>
                      <p className="text-xs text-surface-500">
                        {phase === 'preparing' ? 'Préparation...' : `${Math.round(progress)}% · ${(progress * 12).toFixed(0)} KB / 1.2 MB`}
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${format === 'pdf' ? 'bg-danger-500' : 'bg-formalio-500'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            )}

            {phase === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <AnimatedMascot state="celebrate" size={120} />
                <h3 className="text-xl font-bold text-surface-900 mt-4">Téléchargé avec succès !</h3>
                <p className="text-sm text-surface-500 mt-1 mb-6">
                  Votre rapport est prêt à être consulté
                </p>

                <div className="bg-formalio-50 border border-formalio-200 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-formalio-100 rounded-xl flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-formalio-700" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-900 truncate">
                        {reportTitle.toLowerCase().replace(/\s+/g, '-')}.{format === 'pdf' ? 'pdf' : 'xlsx'}
                      </p>
                      <p className="text-xs text-formalio-600">1.24 MB · Téléchargement complet</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPhase('preview')}
                    className="flex-1 py-2.5 bg-surface-100 text-surface-700 rounded-xl text-sm font-medium hover:bg-surface-200 transition-colors"
                  >
                    Nouveau format
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-formalio-700 text-white rounded-xl text-sm font-medium hover:bg-formalio-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Terminé
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
