import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import type { Role } from '@/types';

const ROLES: { key: Role; emoji: string; title: string; desc: string }[] = [
  {
    key: 'student',
    emoji: '🚀',
    title: "I'm a Student",
    desc: 'Join a squad, ship real client work, and level up your skills by actually building things.',
  },
  {
    key: 'freelancer',
    emoji: '⚡',
    title: "I'm a Freelancer",
    desc: 'Lead a crew, take on client projects, earn while you mentor the next generation of devs.',
  },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState<Role | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 900);
  }

  return (
    <div style={styles.root}>
      {/* Gradient orbs */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      <div style={styles.card}>
        <div style={styles.logoRow}>
          <Logo size={32} />
        </div>

        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Learn by shipping.<br />
            <span style={styles.heroAccent}>With a crew.</span>
          </h1>
          <p style={styles.heroSub}>
            Small squads. Real clients. Zero fluff.
          </p>
        </div>

        {/* Role selector */}
        <div style={styles.roleRow}>
          {ROLES.map((r) => {
            const isSelected = role === r.key;
            const isHovered = hovered === r.key;
            return (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                onMouseEnter={() => setHovered(r.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  ...styles.roleCard,
                  ...(isSelected ? styles.roleCardActive : {}),
                  ...(isHovered && !isSelected ? styles.roleCardHover : {}),
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <span style={styles.roleEmoji}>{r.emoji}</span>
                <span style={styles.roleTitle}>{r.title}</span>
                <span style={styles.roleDesc}>{r.desc}</span>
                {isSelected && <div style={styles.roleCheck}>✓</div>}
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Creating your account...' : `Join as ${role === 'student' ? 'Student' : 'Freelancer'} →`}
          </button>
        </form>

        <p style={styles.terms}>
          By joining you agree to our{' '}
          <span style={styles.link}>Terms of Service</span> and{' '}
          <span style={styles.link}>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--bg-base)',
  },
  orb1: {
    position: 'absolute',
    top: '-120px',
    left: '-80px',
    width: '480px',
    height: '480px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute',
    bottom: '-100px',
    right: '-60px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '560px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: 'var(--shadow-lg)',
  },
  logoRow: {
    marginBottom: '32px',
  },
  hero: {
    marginBottom: '32px',
  },
  heroTitle: {
    fontSize: '32px',
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '-0.03em',
    marginBottom: '8px',
    color: 'var(--text-primary)',
  },
  heroAccent: {
    background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    fontWeight: 400,
  },
  roleRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '28px',
  },
  roleCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
    padding: '20px',
    background: 'var(--bg-card)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.18s ease',
  },
  roleCardActive: {
    borderColor: 'var(--accent)',
    background: 'var(--accent-dim)',
    boxShadow: '0 0 0 1px var(--accent), 0 4px 20px var(--accent-glow)',
  },
  roleCardHover: {
    borderColor: 'var(--border-light)',
    background: 'var(--bg-card-hover)',
  },
  roleEmoji: {
    fontSize: '24px',
    marginBottom: '4px',
  },
  roleTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  roleDesc: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  roleCheck: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'var(--accent)',
    color: 'white',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    letterSpacing: '0.02em',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--bg-card)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontSize: '15px',
    transition: 'border-color 0.15s',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    fontSize: '15px',
    fontWeight: 700,
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.01em',
    marginTop: '4px',
    transition: 'opacity 0.15s, transform 0.15s',
    boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
  },
  terms: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  link: {
    color: 'var(--accent-bright)',
    cursor: 'pointer',
  },
};
