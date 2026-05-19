import React from 'react';

export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="9" fill="url(#lg)" />
      <circle cx="11" cy="13" r="4" fill="#fff" fillOpacity="0.9" />
      <circle cx="21" cy="13" r="4" fill="#fff" fillOpacity="0.55" />
      <ellipse cx="16" cy="22" rx="8" ry="4" fill="#fff" fillOpacity="0.7" />
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5b8af0" />
          <stop offset="1" stopColor="#7c5bf0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
