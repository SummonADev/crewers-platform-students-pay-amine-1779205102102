import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CHECKLIST = [
  { id: 1, label: 'Review PR #14 — auth flow', done: true },
  { id: 2, label: 'Walk through component library', done: true },
  { id: 3, label: 'Fix mobile nav bug', done: false },
  { id: 4, label: 'Deploy staging environment', done: false },
  { id: 5, label: 'Client feedback round', done: false },
];

const INITIAL_NOTES = `## Sprint Review — Session Notes

**Attendees:** Emma, Maya, Tom, Sara, Jake

### What we shipped
- Auth flow with OAuth (Google, GitHub)
- Token-based design system with 40+ components
- Responsive layout foundation

### Blockers
- Mobile nav animation glitch on iOS Safari
- Staging env missing env vars

### Action items
- [ ] Emma → fix Safari bug by Thursday
- [ ] Tom → add missing env vars to staging
- [ ] All → review client Figma feedback
`;

const MEMBERS = [
  { initials: 'EL', color: '#5b8af0', name: 'Emma L.', role: 'Student' },
  { initials: 'MK', color: '#7c5bf0', name: 'Maya K.', role: 'Leader' },
  { initials: 'TL', color: '#34d399', name: 'Tom L.', role: 'Student' },
  { initials: 'SR', color: '#fbbf24', name: 'Sara R.', role: 'Student' },
];

export default function LiveSession() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(CHECKLIST);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [screen, setScreen] = useState(false);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  function toggleCheck(id: number) {
    setChecklist((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function handleLeave() {
    if (!rated) {
      const r = window.prompt('Rate this session (1–5):');
      if (r) setRated(true);
    }
    navigate('/dashboard');
  }

  return (
    <div style={s.root}>
      {/* Top bar */}
      <header style={s.topBar}>
        <div style={s.topLeft}>
          <span style={{ fontSize: '18px', color: '#5b8af0' }}>⬡</span>
          <span style={s.topTitle}>PixelCrew</span>
          <span style={s.sessionBadge}>🔴 Live</span>
        </div>
        <div style={s.topRight}>
          {MEMBERS.map((m) => (
            <div key={m.initials} title={`${m.name} · ${m.role}`} style={{ ...s.topAvatar, background: m.color }}>
              {m.initials}
            </div>
          ))}
          <span style={{ fontSize: '13px', color: '#7a8fad', marginLeft: '4px' }}>4 in session</span>
        </div>
      </header>

      {/* Video area */}
      <section style={s.videoArea}>
        <div style={s.videoGrid}>
          {MEMBERS.map((m, i) => (
            <div key={m.initials} style={s.videoTile}>
              <div style={{ ...s.videoAvatar, background: m.color }}>{m.initials}</div>
              <div style={s.videoName}>{m.name}</div>
              {m.role === 'Leader' && <div style={s.leaderTag}>Leader</div>}
              {i === 0 && !cam && (
                <div style={s.camOff}>Cam off</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom split */}
      <section style={s.splitArea}>
        {/* Notes */}
        <div style={s.notesPanel}>
          <div style={s.panelHeader}>
            <span style={s.panelIcon}>📝</span>
            <span style={s.panelTitle}>Shared Notes</span>
            <span style={s.liveDot} />
            <span style={{ fontSize: '11px', color: '#34d399' }}>Live sync</span>
          </div>
          <textarea
            style={s.textarea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Checklist */}
        <div style={s.checkPanel}>
          <div style={s.panelHeader}>
            <span style={s.panelIcon}>✅</span>
            <span style={s.panelTitle}>Session Tasks</span>
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#7a8fad' }}>
              {checklist.filter((t) => t.done).length}/{checklist.length} done
            </span>
          </div>
          <div style={s.checkList}>
            {checklist.map((task) => (
              <div
                key={task.id}
                style={s.checkItem}
                onClick={() => toggleCheck(task.id)}
              >
                <div style={{
                  ...s.checkBox,
                  ...(task.done ? s.checkBoxDone : {}),
                }}>
                  {task.done && <span style={{ fontSize: '10px', color: '#080c14' }}>✓</span>}
                </div>
                <span style={{
                  ...s.checkLabel,
                  ...(task.done ? s.checkLabelDone : {}),
                }}>{task.label}</span>
              </div>
            ))}
          </div>

          {/* Rating */}
          {!rated && (
            <div style={s.ratingBox}>
              <div style={{ fontSize: '12px', color: '#7a8fad', marginBottom: '8px' }}>Rate this session</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => { setRating(star); setRated(true); }}
                    style={{
                      ...s.starBtn,
                      color: star <= rating ? '#fbbf24' : '#3d5270',
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          )}
          {rated && (
            <div style={s.ratedMsg}>Thanks for rating! Squad score updated ★</div>
          )}
        </div>
      </section>

      {/* Control bar */}
      <footer style={s.controlBar}>
        <div style={s.controls}>
          <ControlBtn
            active={mic}
            onClick={() => setMic(!mic)}
            icon={mic ? '🎙️' : '🔇'}
            label={mic ? 'Mute' : 'Unmute'}
          />
          <ControlBtn
            active={cam}
            onClick={() => setCam(!cam)}
            icon={cam ? '📹' : '📷'}
            label={cam ? 'Stop Cam' : 'Start Cam'}
          />
          <ControlBtn
            active={screen}
            onClick={() => setScreen(!screen)}
            icon={'🖥️'}
            label={screen ? 'Stop Share' : 'Share Screen'}
          />
        </div>
        <button style={s.leaveBtn} onClick={handleLeave}>
          Leave Session
        </button>
      </footer>
    </div>
  );
}

function ControlBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        background: active ? 'rgba(91,138,240,0.12)' : 'rgba(255,255,255,0.04)',
        border: active ? '1.5px solid rgba(91,138,240,0.35)' : '1.5px solid #1e2d45',
        borderRadius: '12px',
        padding: '10px 18px',
        cursor: 'pointer',
        transition: 'background 0.15s',
        color: '#e8edf7',
      }}
    >
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <span style={{ fontSize: '11px', color: '#7a8fad', fontWeight: 500 }}>{label}</span>
    </button>
  );
}

const s: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#080c14',
    overflow: 'hidden',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    borderBottom: '1px solid #1e2d45',
    background: '#0b1120',
    flexShrink: 0,
  },
  topLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  topTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#e8edf7',
  },
  sessionBadge: {
    fontSize: '12px',
    fontWeight: 600,
    background: 'rgba(248,113,113,0.12)',
    color: '#f87171',
    padding: '3px 8px',
    borderRadius: '99px',
    border: '1px solid rgba(248,113,113,0.25)',
  },
  topRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  topAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 700,
    color: '#fff',
    marginLeft: '-4px',
    border: '2px solid #0b1120',
    flexShrink: 0,
  },
  videoArea: {
    flexShrink: 0,
    height: '35vh',
    background: '#05080f',
    borderBottom: '1px solid #1e2d45',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    width: '100%',
    height: '100%',
    maxWidth: '1100px',
  },
  videoTile: {
    background: '#0f1623',
    border: '1px solid #1e2d45',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    overflow: 'hidden',
  },
  videoAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 700,
    color: '#fff',
  },
  videoName: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#e8edf7',
  },
  leaderTag: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    fontSize: '10px',
    fontWeight: 600,
    background: 'rgba(91,138,240,0.18)',
    color: '#5b8af0',
    padding: '2px 7px',
    borderRadius: '99px',
    border: '1px solid rgba(91,138,240,0.3)',
  },
  camOff: {
    position: 'absolute',
    bottom: '8px',
    left: '8px',
    fontSize: '10px',
    color: '#f87171',
    background: 'rgba(248,113,113,0.1)',
    padding: '2px 7px',
    borderRadius: '99px',
    border: '1px solid rgba(248,113,113,0.2)',
  },
  splitArea: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    minHeight: 0,
  },
  notesPanel: {
    flex: 1,
    borderRight: '1px solid #1e2d45',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  checkPanel: {
    width: '360px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '16px 20px',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 20px',
    borderBottom: '1px solid #1e2d45',
    flexShrink: 0,
  },
  panelIcon: {
    fontSize: '15px',
  },
  panelTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#e8edf7',
  },
  liveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#34d399',
    marginLeft: '2px',
  },
  textarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#e8edf7',
    fontSize: '13px',
    lineHeight: 1.7,
    padding: '16px 20px',
    resize: 'none',
    fontFamily: 'monospace',
    overflow: 'auto',
  },
  checkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '12px',
    flex: 1,
    overflow: 'auto',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '6px 0',
  },
  checkBox: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    border: '1.5px solid #1e2d45',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkBoxDone: {
    background: '#5b8af0',
    borderColor: '#5b8af0',
  },
  checkLabel: {
    fontSize: '13px',
    color: '#e8edf7',
  },
  checkLabelDone: {
    color: '#3d5270',
    textDecoration: 'line-through',
  },
  ratingBox: {
    marginTop: '20px',
    padding: '14px',
    background: '#0f1623',
    border: '1px solid #1e2d45',
    borderRadius: '12px',
  },
  starBtn: {
    background: 'none',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    padding: '0 2px',
    transition: 'color 0.15s',
  },
  ratedMsg: {
    marginTop: '20px',
    padding: '12px 14px',
    background: 'rgba(52,211,153,0.08)',
    border: '1px solid rgba(52,211,153,0.2)',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#34d399',
    fontWeight: 600,
  },
  controlBar: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 28px',
    borderTop: '1px solid #1e2d45',
    background: '#0b1120',
  },
  controls: {
    display: 'flex',
    gap: '10px',
  },
  leaveBtn: {
    background: 'rgba(248,113,113,0.12)',
    border: '1.5px solid rgba(248,113,113,0.3)',
    borderRadius: '10px',
    padding: '10px 22px',
    fontSize: '14px',
    fontWeight: 700,
    color: '#f87171',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
};
