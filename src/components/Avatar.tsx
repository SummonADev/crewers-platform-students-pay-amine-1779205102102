import styles from './Avatar.module.css';

type AvatarProps = {
  initials: string;
  color: string;
  size?: number;
  ring?: boolean;
  title?: string;
};

export default function Avatar({ initials, color, size = 36, ring = false, title }: AvatarProps) {
  return (
    <div
      className={styles.avatar}
      title={title}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
        fontSize: Math.round(size * 0.38),
        boxShadow: ring ? `0 0 0 2px var(--bg-elev-1), 0 0 0 4px ${color}55` : undefined,
      }}
    >
      {initials}
    </div>
  );
}
