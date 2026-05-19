import styles from './Logo.module.css';

type LogoProps = { compact?: boolean };

export default function Logo({ compact = false }: LogoProps) {
  return (
    <div className={styles.logo}>
      <div className={styles.mark}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      {!compact && <span className={styles.word}>Crewers</span>}
    </div>
  );
}
