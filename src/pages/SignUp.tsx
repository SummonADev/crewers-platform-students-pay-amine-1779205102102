import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ArrowRight, Zap, Briefcase } from 'lucide-react';

type Role = 'student' | 'freelancer' | null;

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setLoading(true);
    setTimeout(() => navigate('/dashboard'), 900);
  };

  return (
    <div style={styles.root}>
      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.container}>
        {/* Logo + tagline */}
        <div style={styles.header}>
          <div style={styles.logoRow}>
            <Logo size={36} />
            <span style={styles.logoText}>Crewers</span>
          </div>
          <h1 style={styles.hero}>Learn by shipping.<br />With a crew.</h1>
          <p style={styles.sub}>
            Join small squads led by freelance developers. Ship real client work. Grow fast.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.card}>
          {/* Role picker */}
          <p style={styles.label}>I am a…</p>
          <div style={styles.roleRow}>
            <RoleCard
              icon={<Zap size={22} />}
              title="Student"
              desc="Join a crew, learn by shipping real projects with a pro developer."
              selected={role === 'student'}
              color="#5b8af0"
              onClick={() => setRole('student')}
            />
            <RoleCard
              icon={<Briefcase size={22} />}
              title="Freelancer"
              desc="Lead a squad, earn while mentoring. Get matched with paid client work."
              selected={role === 'freelancer'}
              color="#7c5bf0"
              onClick={() => setRole('freelancer')}
            />
          </div>

          {/* Fields */}
          <div style={styles.fields}>
            <div style={styles.fieldWrap}>
              <label style={styles.fieldLabel}>Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={styles.input}
                onFocus={e => (e.currentTarget.style.borderColor = '#5b8af0')}
                onBlur={e => (e.currentTarget.style.borderColor = '#1e2d45')}
              />
            </div>
            <div style={styles.fieldWrap}>
              <label style={styles.fieldLabel}>Password</label>
              <input
                type="password"
                required
                placeholder="Min. 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={styles.input}
                onFocus={e => (e.currentTarget.style.borderColor = '#5b8af0')}
                onBlur={e => (e.currentTarget.style.borderColor = '#1e2d45')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!role || !email || !password || loading}
            style={{
              ...styles.btn,
              opacity: !role || !email || !password ? 0.45 : 1,
            }}
            onMouseEnter={e => { if (role && email && password) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
          >
            {loading ? 'Creating account…' : (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Create account <ArrowRight size={18} />
              </span>
            )}
          </button>

          <p style={styles.terms}>
            By signing up you agree to our{' '}
            <span style={{ color: '#5b8af0', cursor: 'pointer' }}>Terms</span> and{' '}
            <span style={{ color: '#5b8af0', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <span
            style={{ color: '#5b8af0', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => navigate('/dashboard')}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

function RoleCard({
  icon, title, desc, selected, color, onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  selected: boolean;
  color: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        background: selected ? color + '18' : hovered ? '#141d2e' : '#0b1120',
        border: `1.5px solid ${selected ? color : hovered ? '#2a3d5a' : '#1e2d45'}`,
        borderRadius: 12,
        padding: '20px 18px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        boxShadow: selected ? `0 0 0 1px ${color}40, 0 4px 24px ${color}18` : 'none',
      }}
    >
      <div style={{ color: color, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: '#e8edf7', marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, color: '#7a8fad', lineHeight: 1.5 }}>{desc}</div>
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#080c14',
    padding: '24px 16px',
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    top: '-120px',
    left: '-80px',
    width: 480,
    height: 480,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(91,138,240,0.13) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    bottom: '-100px',
    right: '-60px',
    width: 420,
    height: 420,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124,91,240,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  container: {
    width: '100%',
    maxWidth: 560,
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 800,
    color: '#e8edf7',
    letterSpacing: '-0.04em',
  },
  hero: {
    fontSize: 38,
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: '-0.04em',
    color: '#e8edf7',
    marginBottom: 14,
  },
  sub: {
    fontSize: 15,
    color: '#7a8fad',
    lineHeight: 1.6,
    maxWidth: 400,
    margin: '0 auto',
  },
  card: {
    background: '#0f1623',
    border: '1px solid #1e2d45',
    borderRadius: 18,
    padding: '32px 28px',
    boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: '#7a8fad',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  roleRow: {
    display: 'flex',
    gap: 12,
    marginBottom: 24,
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginBottom: 20,
  },
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: '#7a8fad',
  },
  input: {
    background: '#0b1120',
    border: '1.5px solid #1e2d45',
    borderRadius: 9,
    padding: '11px 14px',
    fontSize: 15,
    color: '#e8edf7',
    transition: 'border-color 0.15s',
    width: '100%',
  },
  btn: {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #5b8af0 0%, #7c5bf0 100%)',
    color: '#fff',
    fontWeight: 700,
    fontSize: 15,
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.15s, opacity 0.15s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  terms: {
    fontSize: 12,
    color: '#3d5270',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#7a8fad',
  },
};
