import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'dark' | 'light' | 'icon-only' | 'full';
  animated?: boolean;
}

/**
 * Formalio Logo - The "F" with receipt and growth bars
 * Matches the uploaded brand asset (teal/dark-green background, white F, green chart bars, receipt)
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 40, variant = 'dark', animated = false }) => {
  const isDark = variant === 'dark' || variant === 'icon-only';
  const bgColor = isDark ? '#0f4f4a' : '#ffffff';
  const fColor = isDark ? '#ffffff' : '#0f4f4a';
  const accentGreen = '#22c55e';
  const accentGreenDark = '#16a34a';

  const FIcon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? 'transition-transform hover:scale-105' : ''}
    >
      {/* Rounded square background */}
      <rect width="120" height="120" rx="28" fill={bgColor} />

      {/* Subtle inner gradient overlay */}
      <rect width="120" height="120" rx="28" fill="url(#logoGradient)" opacity="0.15" />

      {/* The "F" letter — bold with rounded corners */}
      <path
        d="M38 28 C38 25.79 39.79 24 42 24 H80 C82.21 24 84 25.79 84 28 V40 C84 42.21 82.21 44 80 44 H58 V58 H74 C76.21 58 78 59.79 78 62 V72 C78 74.21 76.21 76 74 76 H58 V92 C58 94.21 56.21 96 54 96 H42 C39.79 96 38 94.21 38 92 V28 Z"
        fill={fColor}
      />

      {/* Receipt - paper with curl */}
      <g transform="translate(28, 62)">
        <path
          d="M0 4 C0 1.79 1.79 0 4 0 H20 C22.21 0 24 1.79 24 4 V32 L20 28 L16 32 L12 28 L8 32 L4 28 L0 32 V4 Z"
          fill="#ffffff"
          stroke={accentGreenDark}
          strokeWidth="1.5"
        />
        <line x1="4" y1="8" x2="20" y2="8" stroke={accentGreen} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4" y1="14" x2="18" y2="14" stroke={accentGreen} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4" y1="20" x2="16" y2="20" stroke={accentGreen} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Growth bars - bottom right */}
      <g transform="translate(78, 70)">
        <rect x="0" y="18" width="6" height="10" rx="1.5" fill={accentGreen} />
        <rect x="9" y="10" width="6" height="18" rx="1.5" fill={accentGreen} />
        <rect x="18" y="2" width="6" height="26" rx="1.5" fill={accentGreenDark} />
      </g>

      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={className}>{FIcon}</div>;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {FIcon}
      {variant !== 'full' && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-bold tracking-tight ${isDark ? 'text-formalio-900' : 'text-white'}`}
            style={{ fontSize: size * 0.55 }}
          >
            Formalio
          </span>
          {variant === 'dark' && size >= 36 && (
            <span className="text-[9px] font-semibold tracking-[0.15em] text-formalio-600 mt-0.5">
              BUSINESS · COMPLIANT · GROWING
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <Logo variant="icon-only" size={size} className={className} />
);

export const Wordmark: React.FC<{ className?: string; light?: boolean }> = ({ className = '', light = false }) => (
  <span className={`font-bold text-2xl tracking-tight ${light ? 'text-white' : 'text-formalio-900'} ${className}`}>
    Formalio
  </span>
);
