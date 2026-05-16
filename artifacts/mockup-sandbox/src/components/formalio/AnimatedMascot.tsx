import React from 'react';
import { motion } from 'framer-motion';
import mascotOnboarding from '../assets/mascot-onboarding.png';
import mascotHero from '../assets/mascot-hero.png';
import mascotSecure from '../assets/mascot-secure.png';
import mascotCelebrate from '../assets/mascot-celebrate.png';
import mascotThinking from '../assets/mascot-thinking.png';

export type MascotState =
  | 'idle'           // Floating gently
  | 'wave'           // Greeting / Welcome
  | 'thinking'       // AI processing
  | 'celebrate'      // Success / Payment received
  | 'secure'         // Security / Privacy
  | 'listening'      // Voice recording
  | 'sleeping'       // Empty state
  | 'loading'        // Sync / Loading
  | 'success'        // Action completed
  | 'error'          // Error / Help
  | 'pointing';      // Onboarding guide

interface AnimatedMascotProps {
  state?: MascotState;
  size?: number;
  className?: string;
  message?: string;
  showBubble?: boolean;
}

const mascotImages: Record<MascotState, string> = {
  idle: mascotOnboarding,
  wave: mascotOnboarding,
  thinking: mascotThinking,
  celebrate: mascotCelebrate,
  secure: mascotSecure,
  listening: mascotHero,
  sleeping: mascotOnboarding,
  loading: mascotThinking,
  success: mascotCelebrate,
  error: mascotSecure,
  pointing: mascotHero,
};

const mascotAnimations: Record<MascotState, any> = {
  idle: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  wave: {
    rotate: [0, -10, 10, -10, 0],
    transition: { duration: 1.5, repeat: Infinity, repeatDelay: 0.5 },
  },
  thinking: {
    rotate: [0, 5, -5, 0],
    y: [0, -3, 0],
    transition: { duration: 2, repeat: Infinity },
  },
  celebrate: {
    scale: [1, 1.1, 1],
    rotate: [0, -5, 5, 0],
    transition: { duration: 0.8, repeat: Infinity },
  },
  secure: {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Infinity },
  },
  listening: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.6, repeat: Infinity },
  },
  sleeping: {
    rotate: [0, 2, 0, -2, 0],
    transition: { duration: 4, repeat: Infinity },
  },
  loading: {
    rotate: [0, 360],
    transition: { duration: 2, repeat: Infinity, ease: 'linear' },
  },
  success: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.5 },
  },
  error: {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4 },
  },
  pointing: {
    y: [0, -5, 0],
    transition: { duration: 1.5, repeat: Infinity },
  },
};

export const AnimatedMascot: React.FC<AnimatedMascotProps> = ({
  state = 'idle',
  size = 120,
  className = '',
  message,
  showBubble = false,
}) => {
  const animation = mascotAnimations[state];

  return (
    <div className={`relative inline-block ${className}`}>
      {state === 'celebrate' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${50 + Math.cos((i * Math.PI) / 4) * 30}%`,
                top: `${50 + Math.sin((i * Math.PI) / 4) * 30}%`,
                background: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'][i % 4],
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                x: [0, Math.cos((i * Math.PI) / 4) * 60],
                y: [0, Math.sin((i * Math.PI) / 4) * 60],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}

      {state === 'listening' && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-formalio-400/30"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-formalio-400/30"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}

      {state === 'loading' && (
        <div className="absolute -inset-2">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="50 250"
              strokeLinecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      )}

      <motion.img
        src={mascotImages[state]}
        alt={`Mosika ${state}`}
        style={{ width: size, height: size, objectFit: 'contain' }}
        animate={animation}
        className="relative z-10"
      />

      {showBubble && message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute left-full top-2 ml-2 bg-white border border-surface-200 rounded-2xl rounded-bl-sm px-3 py-2 shadow-card whitespace-nowrap z-20"
        >
          <p className="text-xs text-surface-700 font-medium">{message}</p>
          <div className="absolute left-0 top-3 -translate-x-1/2 w-2 h-2 bg-white border-l border-b border-surface-200 rotate-45" />
        </motion.div>
      )}
    </div>
  );
};

/**
 * Confetti overlay for celebration moments
 */
export const ConfettiBurst: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  if (!trigger) return null;
  const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'];
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-3 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[i % colors.length],
            top: '-10px',
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: Math.random() * 720,
            opacity: [1, 1, 0],
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};
