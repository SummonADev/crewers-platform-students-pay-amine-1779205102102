import type { Member } from '@/types';
import Avatar from './Avatar';
import styles from './AvatarStack.module.css';

type AvatarStackProps = {
  members: Member[];
  max?: number;
  size?: number;
};

export default function AvatarStack({ members, max = 6, size = 34 }: AvatarStackProps) {
  const shown = members.slice(0, max);
  const extra = members.length - shown.length;
  return (
    <div className={styles.stack}>
      {shown.map((m) => (
        <div key={m.id} className={styles.item}>
          <Avatar initials={m.initials} color={m.color} size={size} ring title={m.name} />
        </div>
      ))}
      {extra > 0 && (
        <div className={styles.more} style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}>
          +{extra}
        </div>
      )}
    </div>
  );
}
