export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill="url(#lg)" />
        <path d="M8 16c0-4.418 3.582-8 8-8v4a4 4 0 000 8v4c-4.418 0-8-3.582-8-8z" fill="white" opacity="0.9" />
        <circle cx="20" cy="12" r="3" fill="white" opacity="0.7" />
        <circle cx="22" cy="20" r="2" fill="white" opacity="0.5" />
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ fontWeight: 800, fontSize: size * 0.75, letterSpacing: '-0.02em', color: '#f0f4ff' }}>Crewers</span>
    </div>
  );
}
