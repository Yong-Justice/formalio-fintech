import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone, Monitor, Shield, Building2,
  Users, Palette, ChevronRight, X, Menu, ExternalLink
} from 'lucide-react';
import { Logo } from '../formalio/Logo';
import { ToastProvider } from '../formalio/Toast';
import { LandingPage } from '../formalio/LandingPage';
import { MobileApp } from '../formalio/MobileApp';
import { DesktopDashboard } from '../formalio/DesktopDashboard';
import { AdminDashboard } from '../formalio/AdminDashboard';
import { AccountantPortal } from '../formalio/AccountantPortal';
import { BankPortal } from '../formalio/BankPortal';
import { DesignSystem } from '../formalio/DesignSystem';

type View = 'landing' | 'mobile' | 'desktop' | 'admin' | 'accountant' | 'bank' | 'design-system';

interface NavItem {
  id: View;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const navItems: NavItem[] = [
  { id: 'landing', label: 'Landing Website', description: 'Public marketing site', icon: ExternalLink, color: 'bg-formalio-600' },
  { id: 'mobile', label: 'Mobile App', description: 'iOS & Android experience', icon: Smartphone, color: 'bg-formalio-700' },
  { id: 'desktop', label: 'Desktop Dashboard', description: 'Web app for business owners', icon: Monitor, color: 'bg-forest-600' },
  { id: 'admin', label: 'Admin Dashboard', description: 'Internal operations console', icon: Shield, color: 'bg-surface-700' },
  { id: 'accountant', label: 'Accountant Portal', description: 'External accountant access', icon: Users, color: 'bg-info-600' },
  { id: 'bank', label: 'Bank / MFI Portal', description: 'Lender & partner access', icon: Building2, color: 'bg-gold-600' },
  { id: 'design-system', label: 'Design System', description: 'Tokens, components & states', icon: Palette, color: 'bg-formalio-800' },
];

const views: Record<View, React.ReactNode> = {
  landing: <LandingPage />,
  mobile: <MobileApp />,
  desktop: <DesktopDashboard />,
  admin: <AdminDashboard />,
  accountant: <AccountantPortal />,
  bank: <BankPortal />,
  'design-system': <DesignSystem />,
};

export default function FormalioApp() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [showMenu, setShowMenu] = useState(false);

  const isLanding = currentView === 'landing';

  return (
    <ToastProvider>
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`fixed z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full shadow-elevated transition-all ${
          isLanding
            ? 'top-4 right-4 bg-white/90 backdrop-blur-sm text-surface-700 border border-surface-200'
            : 'top-4 left-4 bg-formalio-800 text-white'
        }`}
      >
        {showMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        <span className="text-sm font-medium">{showMenu ? 'Close' : 'Menu'}</span>
      </button>

      {!isLanding && !showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 z-[90] bg-white/90 backdrop-blur-sm border border-surface-200 px-3 py-1.5 rounded-full shadow-card"
        >
          <span className="text-xs font-medium text-surface-600">
            {navItems.find((n) => n.id === currentView)?.label}
          </span>
        </motion.div>
      )}

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-surface-900/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-modal max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-surface-200">
                <div className="flex items-center gap-3">
                  <Logo size={32} />
                  <div>
                    <h2 className="text-lg font-bold text-surface-900">Formalio Ecosystem</h2>
                    <p className="text-xs text-surface-500">Select a view to explore</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setCurrentView(item.id);
                      setShowMenu(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all ${
                      currentView === item.id
                        ? 'bg-formalio-50 border-2 border-formalio-200'
                        : 'bg-white border-2 border-transparent hover:bg-surface-50'
                    }`}
                  >
                    <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-surface-900">{item.label}</p>
                      <p className="text-xs text-surface-500">{item.description}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${currentView === item.id ? 'text-formalio-600' : 'text-surface-300'}`} />
                  </motion.button>
                ))}
              </div>
              <div className="p-4 border-t border-surface-200">
                <div className="bg-surface-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-surface-500">Formalio v2.0 · Investor Demo</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {views[currentView]}
        </motion.div>
      </AnimatePresence>
    </div>
    </ToastProvider>
  );
}
