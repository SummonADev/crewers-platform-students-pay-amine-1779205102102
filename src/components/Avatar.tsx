import React from 'react';

interface AvatarProps {
  initials: string;
  color?: string;
  size?: number;
  ring?: boolean;
}

export default function Avatar({ initials, color = '#5b8af0', size = 36, ring = false }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color + '28',
        border: ring ? `2px solid ${color}` : `2px solid #0f1623`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.35,
        fontWeight: 700,
        color: color,
        flexShrink: 0,
        letterSpacing: '-0.02em',
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  );
}
