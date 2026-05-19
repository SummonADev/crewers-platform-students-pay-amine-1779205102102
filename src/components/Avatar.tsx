type Props = {
  initials: string;
  color: string;
  size?: number;
  title?: string;
};

export default function Avatar({ initials, color, size = 36, title }: Props) {
  return (
    <div
      title={title}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color + '33',
        border: `2px solid ${color}66`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.35,
        fontWeight: 700,
        color: color,
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}
    >
      {initials}
    </div>
  );
}
