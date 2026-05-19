import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Role = 'student' | 'freelancer' | null;

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role) return;
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 900);
  }

  return (
    <div style={styles.root}>
      {/* background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoMark}>&#x2B21;</span>
          <span style={styles.logoText}>Crewers</span>
        </div>

        <h1 style={styles.hero}>Learn by shipping.<br />With a crew.</h1>
        <p style={styles.sub}>Join a small squad, ship real client projects, grow fast.</p>

        {/* Role cards */}
        <div style={styles.roleRow}>
          {(['student', 'freelancer'] as Role[]).map((r) => (
            <button
              key={r as string}
              onClick={() => setRole(r)}
              style={{
                ...styles.roleCard,
                ...(role === r ? styles.roleCardActive : {}),
              }}
            >
              <span style={styles.roleIcon}>{r === 'student' ? '\uD83C\uDF93' : '\u26A1'}</span>
              <span style={styles.roleTitle}>
                {r === 'student' ? "I'm a student" : "I'm a freelancer"}
              </span>
              <span style={styles.roleDesc}>
                {r === 'student'
                  ? 'Pay to join a squad and learn by doing real work.'
                  : 'Lead a squad, take on clients, earn while you teach.'}
              </span>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              required
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            disabled={!role || loading}
            style={{
              ...styles.btn,
              ...(!role || loading ? styles.btnDisabled : {}),
            }}
          >
            {loading ? 'Joining...' : role === 'freelancer' ? 'Apply as Squad Leader' : 'Join a Squad'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/dashboard')}
            style={styles.link}
          >
            Sign in
          </span>
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
    background: '#080c14',
    position: 'relative',
    overflow: 'hidden',
    padding: '24px',
  },
  blob1: {
    position: 'absolute',
    top: '-160px',
    left: '-160px',
    width: '520px',
    height: '520px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(91,138,240,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    bottom: '-120px',
    right: '-120px',
    width: '480px',
    height: '480px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124,91,240,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    background: '#0f1623',
    border: '1px solid #1e2d45',
    borderRadius: '20px',
    padding: '48px 44px',
    width: '100%',
    maxWidth: '560px',
    boxShadow: '0 4px 48px rgba(0,0,0,0.55)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px',
  },
  logoMark: {
    fontSize: '22px',
    color: '#5b8af0',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#e8edf7',
    letterSpacing: '-0.02em',
  },
  hero: {
    fontSize: '32px',
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    color: '#e8edf7',
    marginBottom: '10px',
  },
  sub: {
    fontSize: '15px',
    color: '#7a8fad',
    marginBottom: '28px',
    lineHeight: 1.5,
  },
  roleRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '24px',
  },
  roleCard: {
    background: '#080c14',
    border: '1.5px solid #1e2d45',
    borderRadius: '14px',
    padding: '18px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
    cursor: 'pointer',
    transition: 'border-color 0.18s, background 0.18s',
    textAlign: 'left',
  },
  roleCardActive: {
    border: '1.5px solid #5b8af0',
    background: 'rgba(91,138,240,0.08)',
  },
  roleIcon: {
    fontSize: '22px',
    marginBottom: '2px',
  },
  roleTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#e8edf7',
  },
  roleDesc: {
    fontSize: '12px',
    color: '#7a8fad',
    lineHeight: 1.4,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#7a8fad',
  },
  input: {
    background: '#080c14',
    border: '1.5px solid #1e2d45',
    borderRadius: '10px',
    padding: '11px 14px',
    fontSize: '14px',
    color: '#e8edf7',
    width: '100%',
    transition: 'border-color 0.18s',
  },
  btn: {
    marginTop: '6px',
    background: 'linear-gradient(135deg, #5b8af0, #7c5bf0)',
    border: 'none',
    borderRadius: '10px',
    padding: '13px',
    fontSize: '15px',
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    transition: 'opacity 0.18s',
  },
  btnDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
  },
  footer: {
    marginTop: '20px',
    fontSize: '13px',
    color: '#7a8fad',
    textAlign: 'center',
  },
  link: {
    color: '#5b8af0',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
