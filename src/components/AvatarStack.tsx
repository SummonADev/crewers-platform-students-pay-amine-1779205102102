import Avatar from './Avatar';
import type { Member } from '@/types';

export default function AvatarStack({ members, size = 36 }: { members: Member[]; size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {members.map((m, i) => (
        <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -size * 0.3, zIndex: members.length - i }}>
          <div style={{ border: '2px solid var(--bg-card)', borderRadius: '50%' }}>
            <Avatar initials={m.initials} color={m.color} size={size} title={m.name} />
          </div>
        </div>
      ))}
    </div>
  );
}
