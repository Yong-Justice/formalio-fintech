import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Eye, EyeOff, Check, X, Lock, Mail, User, Phone,
  Shield, Fingerprint, ChevronRight, Loader2, AlertCircle, Sparkles
} from 'lucide-react';
import { Logo, LogoMark } from './Logo';
import { AnimatedMascot } from './AnimatedMascot';

export type AuthScreen =
  | 'splash'
  | 'welcome'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'forgot-otp'
  | 'reset-password'
  | 'phone'
  | 'otp'
  | 'biometric-setup'
  | 'welcome-back'
  | 'success';

interface AuthFlowsProps {
  initialScreen?: AuthScreen;
  onComplete: () => void;
}

export const AuthFlows: React.FC<AuthFlowsProps> = ({ initialScreen = 'splash', onComplete }) => {
  const [screen, setScreen] = useState<AuthScreen>(initialScreen);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Splash auto-advance
  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('welcome'), 2200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  // Format Cameroon phone number
  const formatPhone = (val: string): string => {
    const digits = val.replace(/\D/g, '').slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  };

  const validateEmail = (val: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePhone = (val: string): boolean => val.replace(/\D/g, '').length === 9;
  const validatePassword = (val: string): boolean => val.length >= 8;

  const handleNavigate = (newScreen: AuthScreen) => {
    setErrors({});
    setScreen(newScreen);
  };

  const simulateLoading = (next: AuthScreen | (() => void), delay = 1200) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (typeof next === 'function') next();
      else setScreen(next);
    }, delay);
  };

  const handleOtpChange = (idx: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pasted.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    const lastFilled = Math.min(pasted.length, 5);
    otpRefs.current[lastFilled]?.focus();
  };

  // ============ SCREENS ============

  const SplashScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-formalio-900 to-formalio-950 relative overflow-hidden"
    >
      {/* Decorative circles */}
      <motion.div
        className="absolute top-1/4 right-0 w-64 h-64 bg-formalio-700/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-72 h-72 bg-formalio-500/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <LogoMark size={100} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-white mt-6"
      >
        Formalio
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-white/50 mt-2 tracking-[0.25em] font-semibold"
      >
        BUSINESS · COMPLIANT · GROWING
      </motion.p>

      <div className="absolute bottom-12">
        <motion.div
          className="w-10 h-10 border-2 border-white/10 border-t-formalio-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );

  const WelcomeScreen = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12">
        <AnimatedMascot state="wave" size={160} />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <h1 className="text-2xl font-bold text-surface-900">
            Bienvenue chez <span className="text-formalio-700">Formalio</span>
          </h1>
          <p className="text-surface-500 text-sm mt-3 max-w-xs">
            Votre compagnon intelligent pour gérer, formaliser et faire grandir votre business.
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-6 max-w-xs"
        >
          {['💰 Comptabilité', '📊 Score Mosika', '🏦 Mobile Money', '📄 OHADA'].map((feature) => (
            <span
              key={feature}
              className="text-xs bg-formalio-50 text-formalio-700 px-3 py-1.5 rounded-full font-medium"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="px-6 pb-8 pt-4 space-y-3">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => handleNavigate('signup')}
          className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 active:scale-[0.98] transition-all"
        >
          Créer un compte
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={() => handleNavigate('login')}
          className="w-full py-4 bg-white border border-surface-200 text-surface-700 rounded-2xl font-semibold hover:bg-surface-50 active:scale-[0.98] transition-all"
        >
          J'ai déjà un compte
        </motion.button>
        <p className="text-center text-[11px] text-surface-400 pt-2">
          En continuant, vous acceptez nos{' '}
          <span className="text-formalio-700 font-medium">Conditions</span> et notre{' '}
          <span className="text-formalio-700 font-medium">Confidentialité</span>
        </p>
      </div>
    </motion.div>
  );

  const LoginScreen = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-white overflow-y-auto"
    >
      <div className="px-6 pt-6 pb-2">
        <button
          onClick={() => handleNavigate('welcome')}
          className="w-10 h-10 rounded-full bg-surface-50 hover:bg-surface-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-surface-700" />
        </button>
      </div>

      <div className="px-6 pt-4 flex-1">
        <Logo size={44} />
        <h1 className="text-2xl font-bold text-surface-900 mt-6">Bon retour ! 👋</h1>
        <p className="text-surface-500 text-sm mt-1">Connectez-vous à votre compte</p>

        <div className="mt-6 space-y-4">
          {/* Phone or Email tabs */}
          <div className="bg-surface-100 rounded-xl p-1 flex gap-1">
            <button className="flex-1 py-2 bg-white rounded-lg text-sm font-semibold text-surface-900 shadow-sm">
              Téléphone
            </button>
            <button className="flex-1 py-2 text-sm font-medium text-surface-500 hover:text-surface-700">
              Email
            </button>
          </div>

          {/* Phone input */}
          <div>
            <label className="text-xs font-semibold text-surface-700 mb-1.5 block">
              Numéro de téléphone
            </label>
            <div
              className={`flex items-center gap-2 bg-surface-50 border-2 rounded-xl px-3 py-3 transition-colors ${
                errors.phone ? 'border-danger-300' : 'border-transparent focus-within:border-formalio-300'
              }`}
            >
              <span className="text-surface-700 font-medium text-sm flex items-center gap-1">
                🇨🇲 +237
              </span>
              <div className="w-px h-5 bg-surface-300" />
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="6XX XXX XXX"
                className="flex-1 bg-transparent outline-none text-surface-900 font-medium text-sm"
                autoComplete="tel"
              />
              {validatePhone(phone) && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="w-4 h-4 text-formalio-600" />
                </motion.div>
              )}
            </div>
            {errors.phone && (
              <p className="text-xs text-danger-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-surface-700 mb-1.5 block">Mot de passe</label>
            <div
              className={`flex items-center gap-2 bg-surface-50 border-2 rounded-xl px-3 py-3 transition-colors ${
                errors.password ? 'border-danger-300' : 'border-transparent focus-within:border-formalio-300'
              }`}
            >
              <Lock className="w-4 h-4 text-surface-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none text-surface-900 text-sm"
                autoComplete="current-password"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-surface-400" />
                ) : (
                  <Eye className="w-4 h-4 text-surface-400" />
                )}
              </button>
            </div>
            <button
              onClick={() => handleNavigate('forgot-password')}
              className="text-xs text-formalio-700 font-semibold mt-2 hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={() => {
              if (!validatePhone(phone)) {
                setErrors({ phone: 'Numéro invalide (9 chiffres)' });
                return;
              }
              if (!validatePassword(password)) {
                setErrors({ password: 'Minimum 8 caractères' });
                return;
              }
              simulateLoading('welcome-back', 1500);
            }}
            disabled={loading}
            className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 disabled:opacity-60 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connexion...
              </>
            ) : (
              <>
                Se connecter
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Or divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-surface-200" />
            <span className="text-xs text-surface-400 font-medium">OU</span>
            <div className="flex-1 h-px bg-surface-200" />
          </div>

          {/* OTP Login */}
          <button
            onClick={() => handleNavigate('phone')}
            className="w-full py-3.5 bg-surface-50 hover:bg-surface-100 border border-surface-200 rounded-2xl font-medium text-surface-700 text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Connexion par code SMS
          </button>

          {/* Biometric */}
          <button className="w-full py-3.5 bg-surface-50 hover:bg-surface-100 border border-surface-200 rounded-2xl font-medium text-surface-700 text-sm flex items-center justify-center gap-2 transition-colors">
            <Fingerprint className="w-4 h-4" />
            Empreinte digitale
          </button>
        </div>

        <p className="text-center text-sm text-surface-500 mt-6 pb-6">
          Pas encore de compte ?{' '}
          <button onClick={() => handleNavigate('signup')} className="text-formalio-700 font-semibold">
            Créer un compte
          </button>
        </p>
      </div>
    </motion.div>
  );

  const SignupScreen = () => {
    const passwordStrength = (() => {
      let score = 0;
      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
      return score;
    })();
    const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    const strengthColors = ['bg-danger-500', 'bg-orange-500', 'bg-gold-500', 'bg-formalio-400', 'bg-formalio-600'];

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="h-full flex flex-col bg-white overflow-y-auto"
      >
        <div className="px-6 pt-6 pb-2">
          <button
            onClick={() => handleNavigate('welcome')}
            className="w-10 h-10 rounded-full bg-surface-50 hover:bg-surface-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-surface-700" />
          </button>
        </div>

        <div className="px-6 pt-4 flex-1">
          <Logo size={40} />
          <h1 className="text-2xl font-bold text-surface-900 mt-5">Créer votre compte</h1>
          <p className="text-surface-500 text-sm mt-1">Commencez en 2 minutes — c'est gratuit !</p>

          <div className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-surface-700 mb-1.5 block">Nom complet</label>
              <div className="flex items-center gap-2 bg-surface-50 border-2 border-transparent focus-within:border-formalio-300 rounded-xl px-3 py-3 transition-colors">
                <User className="w-4 h-4 text-surface-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Marie Nkono"
                  className="flex-1 bg-transparent outline-none text-surface-900 text-sm"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-semibold text-surface-700 mb-1.5 block">
                Numéro de téléphone
              </label>
              <div
                className={`flex items-center gap-2 bg-surface-50 border-2 rounded-xl px-3 py-3 transition-colors ${
                  errors.phone ? 'border-danger-300' : 'border-transparent focus-within:border-formalio-300'
                }`}
              >
                <span className="text-surface-700 font-medium text-sm flex items-center gap-1">
                  🇨🇲 +237
                </span>
                <div className="w-px h-5 bg-surface-300" />
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="6XX XXX XXX"
                  className="flex-1 bg-transparent outline-none text-surface-900 font-medium text-sm"
                  autoComplete="tel"
                />
                {validatePhone(phone) && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-4 h-4 text-formalio-600" />
                  </motion.div>
                )}
              </div>
              {errors.phone && (
                <p className="text-xs text-danger-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-surface-700 mb-1.5 block">
                Email <span className="text-surface-400 font-normal">(optionnel)</span>
              </label>
              <div className="flex items-center gap-2 bg-surface-50 border-2 border-transparent focus-within:border-formalio-300 rounded-xl px-3 py-3 transition-colors">
                <Mail className="w-4 h-4 text-surface-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="flex-1 bg-transparent outline-none text-surface-900 text-sm"
                  autoComplete="email"
                />
                {email && validateEmail(email) && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-4 h-4 text-formalio-600" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-surface-700 mb-1.5 block">Mot de passe</label>
              <div className="flex items-center gap-2 bg-surface-50 border-2 border-transparent focus-within:border-formalio-300 rounded-xl px-3 py-3 transition-colors">
                <Lock className="w-4 h-4 text-surface-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 caractères"
                  className="flex-1 bg-transparent outline-none text-surface-900 text-sm"
                  autoComplete="new-password"
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-surface-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-surface-400" />
                  )}
                </button>
              </div>
              {/* Password strength */}
              {password.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-colors ${
                          i < passwordStrength ? strengthColors[passwordStrength] : 'bg-surface-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-surface-500">
                    Force: <span className="font-semibold">{strengthLabels[passwordStrength]}</span>
                  </p>
                </motion.div>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={() => {
                if (!name.trim()) return setErrors({ name: 'Nom requis' });
                if (!validatePhone(phone)) return setErrors({ phone: 'Numéro invalide' });
                if (!validatePassword(password)) return setErrors({ password: 'Min. 8 caractères' });
                simulateLoading('otp', 1500);
              }}
              disabled={loading}
              className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 disabled:opacity-60 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  Créer mon compte
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="bg-formalio-50 border border-formalio-100 rounded-xl p-3 flex items-start gap-2">
              <Shield className="w-4 h-4 text-formalio-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-formalio-700 leading-relaxed">
                Vos données sont chiffrées (AES-256) et ne sont jamais partagées sans votre consentement.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-surface-500 mt-6 pb-6">
            Vous avez déjà un compte ?{' '}
            <button onClick={() => handleNavigate('login')} className="text-formalio-700 font-semibold">
              Se connecter
            </button>
          </p>
        </div>
      </motion.div>
    );
  };

  const PhoneScreen = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-6 pb-2">
        <button
          onClick={() => handleNavigate('login')}
          className="w-10 h-10 rounded-full bg-surface-50 hover:bg-surface-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-surface-700" />
        </button>
      </div>

      <div className="px-6 pt-4 flex-1 flex flex-col">
        <div className="text-center mb-6">
          <AnimatedMascot state="secure" size={100} />
          <h1 className="text-xl font-bold text-surface-900 mt-4">Vérification rapide</h1>
          <p className="text-surface-500 text-sm mt-1">
            Entrez votre numéro pour recevoir un code SMS
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold text-surface-700 mb-1.5 block">
            Numéro de téléphone
          </label>
          <div className="flex items-center gap-2 bg-surface-50 border-2 border-transparent focus-within:border-formalio-300 rounded-2xl px-4 py-4 transition-colors">
            <span className="text-surface-700 font-semibold text-base flex items-center gap-1">
              🇨🇲 +237
            </span>
            <div className="w-px h-6 bg-surface-300" />
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="6XX XXX XXX"
              className="flex-1 bg-transparent outline-none text-surface-900 font-semibold text-base"
              autoFocus
              autoComplete="tel"
            />
          </div>
          <p className="text-[11px] text-surface-400 mt-2 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Vos communications sont sécurisées
          </p>
        </div>

        <div className="mt-auto pb-8">
          <button
            onClick={() => {
              if (!validatePhone(phone)) return setErrors({ phone: 'Numéro invalide' });
              simulateLoading('otp', 1200);
            }}
            disabled={loading || !validatePhone(phone)}
            className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 disabled:opacity-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Envoi du code...
              </>
            ) : (
              'Recevoir le code'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const OtpScreen = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-6 pb-2">
        <button
          onClick={() => handleNavigate('phone')}
          className="w-10 h-10 rounded-full bg-surface-50 hover:bg-surface-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-surface-700" />
        </button>
      </div>

      <div className="px-6 pt-4 flex-1 flex flex-col">
        <div className="text-center mb-6">
          <AnimatedMascot state="thinking" size={100} />
          <h1 className="text-xl font-bold text-surface-900 mt-4">Vérification du code</h1>
          <p className="text-surface-500 text-sm mt-1">
            Code envoyé au <span className="font-semibold text-surface-700">+237 {phone || '6XX XXX XXX'}</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex gap-2 justify-center mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { otpRefs.current[i] = el; }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              onPaste={i === 0 ? handleOtpPaste : undefined}
              className={`w-11 h-14 text-center text-xl font-bold bg-surface-50 border-2 rounded-2xl outline-none transition-all ${
                digit
                  ? 'border-formalio-500 bg-formalio-50 text-formalio-700'
                  : 'border-transparent focus:border-formalio-300'
              }`}
            />
          ))}
        </div>

        {/* Demo hint */}
        <button
          onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
          className="mx-auto text-[11px] text-surface-400 hover:text-formalio-600 mb-4 flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Démo: cliquer pour remplir
        </button>

        <button
          onClick={() => {
            if (otp.some((d) => !d)) return setErrors({ otp: 'Code incomplet' });
            simulateLoading('biometric-setup', 1500);
          }}
          disabled={loading || otp.some((d) => !d)}
          className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 disabled:opacity-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Vérification...
            </>
          ) : (
            'Vérifier'
          )}
        </button>

        <p className="text-center text-sm text-surface-500 mt-4">
          Pas reçu ?{' '}
          <button className="text-formalio-700 font-semibold hover:underline">Renvoyer dans 28s</button>
        </p>
      </div>
    </motion.div>
  );

  const ForgotPasswordScreen = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-6 pb-2">
        <button
          onClick={() => handleNavigate('login')}
          className="w-10 h-10 rounded-full bg-surface-50 hover:bg-surface-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-surface-700" />
        </button>
      </div>

      <div className="px-6 pt-4 flex-1 flex flex-col">
        <div className="text-center mb-8">
          <AnimatedMascot state="thinking" size={120} message="Pas de panique !" showBubble />
          <h1 className="text-xl font-bold text-surface-900 mt-4">Mot de passe oublié ?</h1>
          <p className="text-surface-500 text-sm mt-2 max-w-xs mx-auto">
            Entrez votre numéro de téléphone et nous vous enverrons un code pour réinitialiser votre mot de passe
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold text-surface-700 mb-1.5 block">
            Numéro de téléphone
          </label>
          <div className="flex items-center gap-2 bg-surface-50 border-2 border-transparent focus-within:border-formalio-300 rounded-2xl px-4 py-4 transition-colors">
            <span className="text-surface-700 font-semibold flex items-center gap-1">🇨🇲 +237</span>
            <div className="w-px h-6 bg-surface-300" />
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="6XX XXX XXX"
              className="flex-1 bg-transparent outline-none text-surface-900 font-semibold"
              autoFocus
            />
          </div>
        </div>

        <div className="mt-auto pb-8">
          <button
            onClick={() => {
              if (!validatePhone(phone)) return setErrors({ phone: 'Numéro invalide' });
              simulateLoading('forgot-otp', 1500);
            }}
            disabled={loading || !validatePhone(phone)}
            className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 disabled:opacity-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Envoi...
              </>
            ) : (
              'Envoyer le code'
            )}
          </button>
          <p className="text-center text-xs text-surface-500 mt-4">
            Vous vous souvenez ?{' '}
            <button onClick={() => handleNavigate('login')} className="text-formalio-700 font-semibold">
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );

  const ForgotOtpScreen = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-6 pb-2">
        <button
          onClick={() => handleNavigate('forgot-password')}
          className="w-10 h-10 rounded-full bg-surface-50 hover:bg-surface-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-surface-700" />
        </button>
      </div>

      <div className="px-6 pt-4 flex-1 flex flex-col">
        <div className="text-center mb-6">
          <AnimatedMascot state="secure" size={100} />
          <h1 className="text-xl font-bold text-surface-900 mt-4">Code de récupération</h1>
          <p className="text-surface-500 text-sm mt-1">
            Code envoyé au <span className="font-semibold text-surface-700">+237 {phone}</span>
          </p>
        </div>

        <div className="flex gap-2 justify-center mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { otpRefs.current[i] = el; }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              onPaste={i === 0 ? handleOtpPaste : undefined}
              className={`w-11 h-14 text-center text-xl font-bold bg-surface-50 border-2 rounded-2xl outline-none transition-all ${
                digit
                  ? 'border-formalio-500 bg-formalio-50 text-formalio-700'
                  : 'border-transparent focus:border-formalio-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
          className="mx-auto text-[11px] text-surface-400 hover:text-formalio-600 mb-4 flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Démo: remplir auto
        </button>

        <div className="mt-auto pb-8">
          <button
            onClick={() => {
              if (otp.some((d) => !d)) return setErrors({ otp: 'Code incomplet' });
              simulateLoading('reset-password', 1200);
            }}
            disabled={loading || otp.some((d) => !d)}
            className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 disabled:opacity-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Vérification...
              </>
            ) : (
              'Vérifier le code'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const ResetPasswordScreen = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-6 pb-2">
        <button
          onClick={() => handleNavigate('forgot-otp')}
          className="w-10 h-10 rounded-full bg-surface-50 hover:bg-surface-100 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-surface-700" />
        </button>
      </div>

      <div className="px-6 pt-4 flex-1 flex flex-col">
        <div className="text-center mb-6">
          <AnimatedMascot state="celebrate" size={100} />
          <h1 className="text-xl font-bold text-surface-900 mt-4">Nouveau mot de passe</h1>
          <p className="text-surface-500 text-sm mt-1">Choisissez un mot de passe sécurisé</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-surface-700 mb-1.5 block">Nouveau mot de passe</label>
            <div className="flex items-center gap-2 bg-surface-50 border-2 border-transparent focus-within:border-formalio-300 rounded-xl px-3 py-3 transition-colors">
              <Lock className="w-4 h-4 text-surface-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 caractères"
                className="flex-1 bg-transparent outline-none text-surface-900 text-sm"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-4 h-4 text-surface-400" /> : <Eye className="w-4 h-4 text-surface-400" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-surface-700 mb-1.5 block">Confirmer</label>
            <div
              className={`flex items-center gap-2 bg-surface-50 border-2 rounded-xl px-3 py-3 transition-colors ${
                confirmPassword && confirmPassword !== password
                  ? 'border-danger-300'
                  : 'border-transparent focus-within:border-formalio-300'
              }`}
            >
              <Lock className="w-4 h-4 text-surface-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Retapez le mot de passe"
                className="flex-1 bg-transparent outline-none text-surface-900 text-sm"
              />
              {confirmPassword && confirmPassword === password && (
                <Check className="w-4 h-4 text-formalio-600" />
              )}
              {confirmPassword && confirmPassword !== password && (
                <X className="w-4 h-4 text-danger-500" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto pb-8">
          <button
            onClick={() => {
              if (!validatePassword(password)) return setErrors({ password: 'Min. 8 caractères' });
              if (password !== confirmPassword) return setErrors({ confirm: 'Ne correspond pas' });
              simulateLoading('success', 1500);
            }}
            disabled={loading || !password || password !== confirmPassword}
            className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 disabled:opacity-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Mise à jour...
              </>
            ) : (
              'Réinitialiser'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const BiometricSetupScreen = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-4 flex-1 flex flex-col items-center justify-center">
        <AnimatedMascot state="secure" size={140} />
        <h1 className="text-2xl font-bold text-surface-900 mt-6 text-center">
          Activer la biométrie ?
        </h1>
        <p className="text-surface-500 text-sm mt-2 text-center max-w-xs">
          Connectez-vous plus rapidement avec votre empreinte digitale ou Face ID
        </p>

        <div className="mt-8 w-24 h-24 bg-formalio-100 rounded-full flex items-center justify-center">
          <Fingerprint className="w-12 h-12 text-formalio-700" />
        </div>

        <div className="bg-formalio-50 border border-formalio-100 rounded-2xl p-4 mt-8 mx-6 max-w-sm">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-formalio-600 shrink-0 mt-0.5" />
            <p className="text-xs text-formalio-700 leading-relaxed">
              Vos données biométriques restent sur votre appareil. Formalio n'y a jamais accès.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-2">
        <button
          onClick={() => simulateLoading('success', 1200)}
          disabled={loading}
          className="w-full py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 disabled:opacity-60 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Fingerprint className="w-4 h-4" />}
          Activer
        </button>
        <button
          onClick={() => setScreen('success')}
          className="w-full py-3 text-surface-500 text-sm font-medium hover:text-surface-700"
        >
          Plus tard
        </button>
      </div>
    </motion.div>
  );

  const WelcomeBackScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-gradient-to-br from-formalio-50 to-white items-center justify-center px-6"
    >
      <AnimatedMascot state="celebrate" size={160} />
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-surface-900 mt-6 text-center"
      >
        Content de vous revoir, Marie ! 🎉
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-surface-500 text-sm mt-3 text-center"
      >
        Voici un résumé de votre activité depuis votre dernière connexion
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white border border-surface-200 rounded-2xl p-5 mt-6 w-full max-w-sm shadow-card"
      >
        <p className="text-xs text-surface-500 mb-3">Depuis hier</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-surface-600">Nouvelles transactions</span>
            <span className="text-sm font-bold text-formalio-700">+12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-surface-600">Score Mosika</span>
            <span className="text-sm font-bold text-formalio-700">760 (+5)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-surface-600">Notifications</span>
            <span className="text-sm font-bold text-gold-600">3 nouvelles</span>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onComplete}
        className="w-full max-w-sm mt-8 py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        Accéder au tableau de bord
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );

  const SuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-white items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
      >
        <AnimatedMascot state="celebrate" size={160} />
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
        className="w-20 h-20 bg-formalio-100 rounded-full flex items-center justify-center mt-6"
      >
        <motion.svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="#059669"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          />
        </motion.svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-2xl font-bold text-surface-900 mt-6 text-center"
      >
        Tout est prêt !
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-surface-500 text-sm mt-2 text-center"
      >
        Votre compte Formalio est activé. Bienvenue dans votre nouvelle vie financière !
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={onComplete}
        className="w-full max-w-sm mt-10 py-4 bg-formalio-700 text-white rounded-2xl font-semibold hover:bg-formalio-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        Commencer l'aventure
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );

  const screens: Record<AuthScreen, React.ReactNode> = {
    splash: <SplashScreen />,
    welcome: <WelcomeScreen />,
    login: <LoginScreen />,
    signup: <SignupScreen />,
    'forgot-password': <ForgotPasswordScreen />,
    'forgot-otp': <ForgotOtpScreen />,
    'reset-password': <ResetPasswordScreen />,
    phone: <PhoneScreen />,
    otp: <OtpScreen />,
    'biometric-setup': <BiometricSetupScreen />,
    'welcome-back': <WelcomeBackScreen />,
    success: <SuccessScreen />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={screen} className="h-full">
        {screens[screen]}
      </motion.div>
    </AnimatePresence>
  );
};
