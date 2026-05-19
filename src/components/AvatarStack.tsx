import React from 'react';
import Avatar from './Avatar';

interface Member {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export default function AvatarStack({ members, size = 36 }: { members: Member[]; size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {members.map((m, i) => (
        <div
          key={m.id}
          title={m.name}
          style={{ marginLeft: i === 0 ? 0 : -(size * 0.28), zIndex: members.length - i }}
        >
          <Avatar initials={m.avatar} color={m.color} size={size} />
        </div>
      ))}
    </div>
  );
}
