import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check, X, Bell, Loader2, AlertTriangle, Info, CheckCircle2,
  Search, Plus
} from 'lucide-react';
import { Logo } from './Logo';

export const DesignSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('colors');
  const [toggleOn, setToggleOn] = useState(true);

  const tabs = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'components', label: 'Components' },
    { id: 'states', label: 'States' },
  ];

  const ColorsView = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Formalio Green</h3>
        <div className="grid grid-cols-5 gap-3">
          {['formalio-50', 'formalio-100', 'formalio-200', 'formalio-300', 'formalio-400', 'formalio-500', 'formalio-600', 'formalio-700', 'formalio-800', 'formalio-900'].map((color) => (
            <div key={color} className="space-y-1">
              <div className={`h-16 rounded-xl bg-${color}`} />
              <p className="text-xs text-surface-500 font-mono">{color}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Surface Grays</h3>
        <div className="grid grid-cols-5 gap-3">
          {['surface-50', 'surface-100', 'surface-200', 'surface-300', 'surface-400', 'surface-500', 'surface-600', 'surface-700', 'surface-800', 'surface-900'].map((color) => (
            <div key={color} className="space-y-1">
              <div className={`h-16 rounded-xl bg-${color}`} />
              <p className="text-xs text-surface-500 font-mono">{color}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Semantic</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'danger-500', class: 'bg-danger-500' },
            { name: 'danger-100', class: 'bg-danger-100' },
            { name: 'info-500', class: 'bg-info-500' },
            { name: 'info-100', class: 'bg-info-100' },
            { name: 'gold-500', class: 'bg-gold-500' },
            { name: 'gold-100', class: 'bg-gold-100' },
            { name: 'forest-500', class: 'bg-forest-500' },
            { name: 'forest-100', class: 'bg-forest-100' },
          ].map((color) => (
            <div key={color.name} className="space-y-1">
              <div className={`h-16 rounded-xl ${color.class}`} />
              <p className="text-xs text-surface-500 font-mono">{color.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TypographyView = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-surface-900">Display H1 — 48px Bold</h1>
        <h2 className="text-4xl font-bold text-surface-900">Display H2 — 36px Bold</h2>
        <h3 className="text-3xl font-bold text-surface-900">Display H3 — 30px Bold</h3>
        <h4 className="text-2xl font-semibold text-surface-900">Heading H4 — 24px Semibold</h4>
        <h5 className="text-xl font-semibold text-surface-900">Heading H5 — 20px Semibold</h5>
        <h6 className="text-lg font-semibold text-surface-900">Heading H6 — 18px Semibold</h6>
      </div>
      <div className="space-y-4">
        <p className="text-base text-surface-700 leading-relaxed">Body Large — 16px regular. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p className="text-sm text-surface-600 leading-relaxed">Body Medium — 14px regular. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p className="text-xs text-surface-500 leading-relaxed">Body Small — 12px regular. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
    </div>
  );

  const ComponentsView = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-formalio-700 text-white rounded-xl text-sm font-medium hover:bg-formalio-800 transition-colors">Primary</button>
          <button className="px-4 py-2 bg-white text-surface-700 border border-surface-200 rounded-xl text-sm font-medium hover:bg-surface-50 transition-colors">Secondary</button>
          <button className="px-4 py-2 bg-surface-100 text-surface-700 rounded-xl text-sm font-medium hover:bg-surface-200 transition-colors">Tertiary</button>
          <button className="px-4 py-2 bg-danger-500 text-white rounded-xl text-sm font-medium hover:bg-danger-600 transition-colors">Danger</button>
          <button className="px-4 py-2 bg-gold-500 text-white rounded-xl text-sm font-medium hover:bg-gold-600 transition-colors">Gold</button>
          <button className="px-4 py-2 bg-formalio-700 text-white rounded-xl text-sm font-medium opacity-50 cursor-not-allowed">Disabled</button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Inputs</h3>
        <div className="grid md:grid-cols-2 gap-4 max-w-lg">
          <div>
            <label className="text-sm font-medium text-surface-700 mb-1.5 block">Default</label>
            <input type="text" placeholder="Placeholder" className="w-full px-4 py-2.5 bg-white border border-surface-200 rounded-xl outline-none focus:border-formalio-500 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-surface-700 mb-1.5 block">With Icon</label>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-surface-200 rounded-xl">
              <Search className="w-4 h-4 text-surface-400" />
              <input type="text" placeholder="Search..." className="flex-1 outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-surface-700 mb-1.5 block">Error</label>
            <input type="text" value="Invalid" className="w-full px-4 py-2.5 bg-white border border-danger-300 rounded-xl outline-none text-sm text-danger-700" />
            <p className="text-xs text-danger-600 mt-1">This field is required</p>
          </div>
          <div>
            <label className="text-sm font-medium text-surface-700 mb-1.5 block">Success</label>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-formalio-50 border border-formalio-200 rounded-xl">
              <input type="text" value="Valid input" className="flex-1 outline-none text-sm bg-transparent text-formalio-800" />
              <CheckCircle2 className="w-4 h-4 text-formalio-600" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Cards</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-surface-200 shadow-card">
            <p className="text-sm text-surface-500 mb-1">Default Card</p>
            <p className="text-lg font-bold text-surface-900">12,450,000 FCFA</p>
          </div>
          <div className="bg-formalio-800 rounded-2xl p-5 text-white">
            <p className="text-sm text-white/70 mb-1">Gradient Card</p>
            <p className="text-lg font-bold">Premium Plan</p>
          </div>
          <div className="bg-surface-50 rounded-2xl p-5 border border-surface-200">
            <p className="text-sm text-surface-500 mb-1">Muted Card</p>
            <p className="text-lg font-bold text-surface-900">Offline Mode</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Toggle & Checkbox</h3>
        <div className="flex items-center gap-6">
          <button onClick={() => setToggleOn(!toggleOn)}
            className={`w-11 h-6 rounded-full relative transition-colors ${toggleOn ? 'bg-formalio-500' : 'bg-surface-300'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${toggleOn ? 'right-1' : 'left-1'}`} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-formalio-500 rounded-md flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm text-surface-700">Checked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-surface-300 rounded-md" />
            <span className="text-sm text-surface-700">Unchecked</span>
          </div>
        </div>
      </div>
    </div>
  );

  const StatesView = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Empty States</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-surface-400" />
            </div>
            <p className="text-sm font-medium text-surface-900 mb-1">No results found</p>
            <p className="text-xs text-surface-500">Try adjusting your search</p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-surface-400" />
            </div>
            <p className="text-sm font-medium text-surface-900 mb-1">No notifications</p>
            <p className="text-xs text-surface-500">You're all caught up</p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-surface-200 text-center">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-surface-400" />
            </div>
            <p className="text-sm font-medium text-surface-900 mb-1">Get started</p>
            <p className="text-xs text-surface-500">Add your first transaction</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Loading States</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-surface-200 flex items-center justify-center gap-3">
            <Loader2 className="w-5 h-5 text-formalio-600 animate-spin" />
            <span className="text-sm text-surface-600">Loading...</span>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-surface-200">
            <div className="h-4 bg-surface-200 rounded animate-pulse mb-3 w-3/4" />
            <div className="h-4 bg-surface-200 rounded animate-pulse mb-3 w-1/2" />
            <div className="h-4 bg-surface-200 rounded animate-pulse w-2/3" />
          </div>
          <div className="bg-white rounded-2xl p-6 border border-surface-200 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-surface-200 border-t-formalio-600 rounded-full animate-spin" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Error States</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-danger-50 border border-danger-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-danger-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-danger-800">Connection Error</p>
                <p className="text-xs text-danger-600 mt-1">Unable to sync with server. Retrying in 5s...</p>
                <button className="mt-3 text-xs bg-danger-500 text-white px-3 py-1.5 rounded-lg font-medium">Retry</button>
              </div>
            </div>
          </div>
          <div className="bg-white border border-surface-200 rounded-2xl p-6 text-center">
            <X className="w-8 h-8 text-danger-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-surface-900">Something went wrong</p>
            <p className="text-xs text-surface-500 mt-1">Please try again later</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Offline State</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">You're offline</p>
              <p className="text-xs text-amber-600 mt-1">Your changes will sync automatically when you're back online.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Toasts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-formalio-800 text-white px-4 py-3 rounded-xl max-w-sm">
            <CheckCircle2 className="w-5 h-5 text-formalio-300" />
            <span className="text-sm">Transaction saved successfully</span>
          </div>
          <div className="flex items-center gap-3 bg-danger-500 text-white px-4 py-3 rounded-xl max-w-sm">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">Failed to connect to Mobile Money</span>
          </div>
          <div className="flex items-center gap-3 bg-gold-500 text-white px-4 py-3 rounded-xl max-w-sm">
            <Info className="w-5 h-5" />
            <span className="text-sm">New feature available — try voice input!</span>
          </div>
        </div>
      </div>
    </div>
  );

  const views: Record<string, React.ReactNode> = {
    colors: <ColorsView />,
    typography: <TypographyView />,
    components: <ComponentsView />,
    states: <StatesView />,
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <header className="bg-white border-b border-surface-200 px-8 py-6">
        <Logo size={36} />
        <h1 className="text-2xl font-bold text-surface-900 mt-4">Design System</h1>
        <p className="text-sm text-surface-500">Formalio UI Kit — v2.0</p>
      </header>
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex gap-2 mb-8 border-b border-surface-200">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id ? 'border-formalio-600 text-formalio-700' : 'border-transparent text-surface-500 hover:text-surface-700'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {views[activeTab]}
        </motion.div>
      </div>
    </div>
  );
};
