import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const LiveCounter: React.FC<{ value: number; suffix?: string; prefix?: string; className?: string }> = ({
  value,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 });
  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString('fr-FR'));

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return (
    <span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

export const PulseDot: React.FC<{ tone?: 'green' | 'amber' | 'red' | 'blue'; label?: string }> = ({ tone = 'green', label }) => {
  const colors = {
    green: 'bg-formalio-500 text-formalio-700',
    amber: 'bg-gold-500 text-gold-700',
    red: 'bg-danger-500 text-danger-700',
    blue: 'bg-info-500 text-info-600',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${colors[tone].split(' ')[1]}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colors[tone].split(' ')[0]} opacity-40`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${colors[tone].split(' ')[0]}`} />
      </span>
      {label}
    </span>
  );
};

export const MotionGridBackground: React.FC<{ dense?: boolean }> = ({ dense = false }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(#0f4f4a 1px, transparent 1px), linear-gradient(90deg, #0f4f4a 1px, transparent 1px)',
        backgroundSize: dense ? '24px 24px' : '40px 40px',
      }}
      animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-formalio-400/10 blur-3xl"
      animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl"
      animate={{ x: [0, -60, 0], y: [0, -50, 0], scale: [1.1, 1, 1.1] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

export const FloatingDataOrb: React.FC<{ index: number; label: string; value: string; x: number; y: number }> = ({
  index,
  label,
  value,
  x,
  y,
}) => (
  <motion.div
    className="absolute hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white shadow-modal backdrop-blur-md lg:block"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: [0, -10, 0] }}
    transition={{ opacity: { delay: 0.5 + index * 0.15 }, y: { duration: 4 + index, repeat: Infinity, ease: 'easeInOut' } }}
  >
    <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">{label}</p>
    <p className="mt-1 text-sm font-bold">{value}</p>
  </motion.div>
);

export const SystemSignal: React.FC<{ active?: boolean }> = ({ active = true }) => (
  <div className="flex items-end gap-0.5">
    {[0, 1, 2, 3].map((bar) => (
      <motion.span
        key={bar}
        className={`w-1 rounded-full ${active ? 'bg-formalio-500' : 'bg-surface-300'}`}
        animate={active ? { height: [6, 12 + bar * 3, 6] } : { height: 6 }}
        transition={{ duration: 1, repeat: Infinity, delay: bar * 0.1 }}
      />
    ))}
  </div>
);

export const DataStream: React.FC = () => {
  const [events, setEvents] = useState(['MoMo webhook received', 'KYC check passed', 'Report PDF generated']);
  useEffect(() => {
    const pool = ['Fraud model scored user', 'Orange Money sync complete', 'OTP delivered', 'Backup shard verified', 'AI categorization queued'];
    const t = setInterval(() => {
      setEvents((prev) => [pool[Math.floor(Math.random() * pool.length)], ...prev].slice(0, 4));
    }, 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-2">
      {events.map((event, i) => (
        <motion.div
          key={`${event}-${i}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 rounded-lg bg-surface-50 px-3 py-2 text-xs text-surface-600"
        >
          <PulseDot tone="green" />
          {event}
        </motion.div>
      ))}
    </div>
  );
};