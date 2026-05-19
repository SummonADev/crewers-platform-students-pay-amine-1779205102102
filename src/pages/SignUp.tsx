import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Code2, ArrowRight, Mail, Lock, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import type { Role } from '@/types';
import Logo from '@/components/Logo';
import styles from './SignUp.module.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className={styles.page}>
      <div className={styles.gradient} />
      <div className={styles.grid} />

      <header className={styles.header}>
        <Logo />
        <nav className={styles.nav}>
          <a className={styles.navLink} href="#">How it works</a>
          <a className={styles.navLink} href="#">Squads</a>
          <a className={styles.navLink} href="#">Pricing</a>
          <button className={styles.signin} onClick={() => navigate('/dashboard')}>Sign in</button>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.badge}>
          <Sparkles size={14} />
          <span>Now onboarding the spring cohort</span>
        </div>

        <h1 className={styles.hero}>
          Learn by shipping.
          <br />
          <span className={styles.heroAccent}>With a crew.</span>
        </h1>

        <p className={styles.sub}>
          Join a small squad led by a working freelance dev. Build real client projects together —
          not another tutorial collecting dust.
        </p>

        <div className={styles.card}>
          <div className={styles.roles}>
            <button
              type="button"
              className={clsx(styles.role, role === 'student' && styles.roleActive)}
              onClick={() => setRole('student')}
            >
              <div className={styles.roleIcon} style={{ background: 'rgba(124, 92, 255, 0.14)', color: '#a896ff' }}>
                <GraduationCap size={22} />
              </div>
              <div className={styles.roleText}>
                <div className={styles.roleTitle}>I'm a student</div>
                <div className={styles.roleDesc}>Pay to join a squad and ship real work</div>
              </div>
              <div className={styles.roleCheck} aria-hidden />
            </button>

            <button
              type="button"
              className={clsx(styles.role, role === 'freelancer' && styles.roleActive)}
              onClick={() => setRole('freelancer')}
            >
              <div className={styles.roleIcon} style={{ background: 'rgba(78, 161, 255, 0.14)', color: '#7cb6ff' }}>
                <Code2 size={22} />
              </div>
              <div className={styles.roleText}>
                <div className={styles.roleTitle}>I'm a freelancer</div>
                <div className={styles.roleDesc}>Lead a squad, get paid per session</div>
              </div>
              <div className={styles.roleCheck} aria-hidden />
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <Mail size={16} className={styles.fieldIcon} />
              <input
                type="email"
                placeholder="you@studio.dev"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className={styles.field}>
              <Lock size={16} className={styles.fieldIcon} />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </label>

            <button type="submit" className={styles.submit}>
              {role === 'student' ? 'Find my squad' : 'Apply as squad leader'}
              <ArrowRight size={16} />
            </button>

            <p className={styles.terms}>
              By continuing you agree to our terms. {role === 'student' ? 'After signup you\'ll pick a squad and start a subscription.' : 'After signup we\'ll review your application within 48h.'}
            </p>
          </form>
        </div>

        <div className={styles.proof}>
          <div className={styles.proofItem}>
            <strong>120+</strong>
            <span>Active squads</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.proofItem}>
            <strong>4.8★</strong>
            <span>Average squad rating</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.proofItem}>
            <strong>$0.5M+</strong>
            <span>Paid out to leaders</span>
          </div>
        </div>
      </main>
    </div>
  );
}
