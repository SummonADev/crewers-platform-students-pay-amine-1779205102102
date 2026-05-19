import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/Avatar';
import Logo from '@/components/Logo';
import { members, sessionNotes, initialTasks } from '@/lib/mock';
import type { Task } from '@/types';

type MediaState = {
  mic: boolean;
  camera: boolean;
  screen: boolean;
};

export default function LiveSession() {
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaState>({ mic: true, camera: true, screen: false });
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [notes, setNotes] = useState(sessionNotes);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [leaving, setLeaving] = useState(false);

  function toggleMedia(key: keyof MediaState) {
    setMedia((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function handleLeave() {
    setLeaving(true);
    setTimeout(() => navigate('/dashboard'), 700);
  }

  function handleRate(star: number) {
    setRating(star);
    setRated(true);
  }

  return (
    <div style={styles.root}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <Logo size={22} />
        <div style={styles.topBarCenter}>
          <span style={styles.liveDot} />
          <span style={styles.liveLabel}>LIVE</span>
          <span style={styles.sessionName}>Session 13 — Points Dashboard</span>
        </div>
        <div style={styles.topBarRight}>
          {members.slice(0, 4).map((m) => (
            <Avatar key={m.id} initials={m.initials} color={m.color} size={28} title={m.name} />
          ))}
        </div>
      </div>

      {/* Video area */}
      <div style={styles.videoArea}>
        <div style={styles.videoGrid}>
          {/* Main video (screen share placeholder) */}
          <div style={styles.mainVideo}>
            <div style={styles.screenSharePlaceholder}>
              <div style={styles.screenShareIcon}>🖥️</div>
              <div style={styles.screenShareText}>Liam's screen</div>
              <div style={styles.screenShareSub}>Screen sharing active</div>
            </div>
          </div>
          {/* Participant thumbnails */}
          <div style={styles.participants}>
            {members.map((m) => (
              <div key={m.id} style={styles.participantThumb}>
                <div style={{ ...styles.participantVideo, background: m.color + '18' }}>
                  <Avatar initials={m.initials} color={m.color} size={40} />
                </div>
                <span style={styles.participantName}>{m.name.split(' ')[0]}</span>
                {m.role === 'lead' && <span style={styles.leadBadge}>Lead</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div style={styles.bottomContent}>
        {/* Shared notes */}
        <div style={styles.notesPanel}>
          <div style={styles.panelHeader}>
            <span style={styles.panelIcon}>📝</span>
            <h4 style={styles.panelTitle}>Shared Notes</h4>
            <span style={styles.editHint}>editing</span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={styles.notesTextarea}
            spellCheck={false}
          />
        </div>

        {/* Task checklist */}
        <div style={styles.tasksPanel}>
          <div style={styles.panelHeader}>
            <span style={styles.panelIcon}>✅</span>
            <h4 style={styles.panelTitle}>Live Tasks</h4>
            <span style={styles.taskCount}>
              {tasks.filter((t) => t.done).length}/{tasks.length} done
            </span>
          </div>
          <div style={styles.taskList}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={styles.taskRow}
                onClick={() => toggleTask(task.id)}
              >
                <div style={{
                  ...styles.taskCheck,
                  ...(task.done ? styles.taskCheckDone : {}),
                }}>
                  {task.done && <span style={{ fontSize: 10 }}>✓</span>}
                </div>
                <span style={{
                  ...styles.taskTitle,
                  ...(task.done ? styles.taskTitleDone : {}),
                }}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>

          {/* Rating */}
          {!rated ? (
            <div style={styles.ratingBlock}>
              <span style={styles.ratingLabel}>Rate this session</span>
              <div style={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleRate(s)}
                    style={styles.starBtn}
                  >
                    {s <= rating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.ratingThanks}>
              ⭐ Thanks for rating! Squad score updated.
            </div>
          )}
        </div>
      </div>

      {/* Bottom control bar */}
      <div style={styles.controlBar}>
        <div style={styles.controls}>
          <button
            style={{
              ...styles.controlBtn,
              ...(media.mic ? styles.controlBtnActive : styles.controlBtnOff),
            }}
            onClick={() => toggleMedia('mic')}
          >
            <span style={styles.controlIcon}>{media.mic ? '🎙️' : '🔇'}</span>
            <span style={styles.controlLabel}>{media.mic ? 'Mute' : 'Unmute'}</span>
          </button>

          <button
            style={{
              ...styles.controlBtn,
              ...(media.camera ? styles.controlBtnActive : styles.controlBtnOff),
            }}
            onClick={() => toggleMedia('camera')}
          >
            <span style={styles.controlIcon}>{media.camera ? '📹' : '📷'}</span>
            <span style={styles.controlLabel}>{media.camera ? 'Stop Video' : 'Start Video'}</span>
          </button>

          <button
            style={{
              ...styles.controlBtn,
              ...(media.screen ? styles.controlBtnActive : {}),
            }}
            onClick={() => toggleMedia('screen')}
          >
            <span style={styles.controlIcon}>🖥️</span>
            <span style={styles.controlLabel}>{media.screen ? 'Stop Share' : 'Share Screen'}</span>
          </button>

          <button
            style={{
              ...styles.controlBtn,
              ...styles.leaveBtn,
              opacity: leaving ? 0.6 : 1,
            }}
            onClick={handleLeave}
            disabled={leaving}
          >
            <span style={styles.controlIcon}>📴</span>
            <span style={styles.controlLabel}>Leave</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: 'var(--bg-base)',
    overflow: 'hidden',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    background: 'var(--bg-surface)',
    borderBottom: '1px solid var(--border)',
    flexShrink: 0,
  },
  topBarCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  liveDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'var(--red)',
    boxShadow: '0 0 8px rgba(255,93,108,0.8)',
    animation: 'pulse 1.5s infinite',
  },
  liveLabel: {
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.1em',
    color: 'var(--red)',
  },
  sessionName: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  topBarRight: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  videoArea: {
    flex: '0 0 50%',
    background: '#050810',
    borderBottom: '1px solid var(--border)',
    overflow: 'hidden',
  },
  videoGrid: {
    display: 'flex',
    height: '100%',
  },
  mainVideo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1428 100%)',
    position: 'relative',
  },
  screenSharePlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    opacity: 0.7,
  },
  screenShareIcon: {
    fontSize: '48px',
  },
  screenShareText: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  screenShareSub: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  participants: {
    width: '160px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '8px',
    background: '#070b14',
    overflowY: 'auto',
  },
  participantThumb: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    position: 'relative',
  },
  participantVideo: {
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
  },
  participantName: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },
  leadBadge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    fontSize: '9px',
    fontWeight: 700,
    background: 'var(--accent)',
    color: 'white',
    padding: '1px 5px',
    borderRadius: '3px',
  },
  bottomContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  notesPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid var(--border)',
    background: 'var(--bg-surface)',
    overflow: 'hidden',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 20px',
    borderBottom: '1px solid var(--border)',
    flexShrink: 0,
  },
  panelIcon: {
    fontSize: '15px',
  },
  panelTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    flex: 1,
  },
  editHint: {
    fontSize: '11px',
    color: 'var(--green)',
    fontWeight: 600,
  },
  taskCount: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontWeight: 600,
  },
  notesTextarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    resize: 'none',
    padding: '16px 20px',
    color: 'var(--text-secondary)',
    fontSize: '13px',
    lineHeight: 1.8,
    fontFamily: 'inherit',
  },
  tasksPanel: {
    width: '320px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-card)',
    overflow: 'hidden',
  },
  taskList: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  taskRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 10px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'background 0.12s',
  },
  taskCheck: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1.5px solid var(--border-light)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
  },
  taskCheckDone: {
    background: 'var(--accent)',
    borderColor: 'var(--accent)',
    color: 'white',
  },
  taskTitle: {
    fontSize: '13px',
    color: 'var(--text-primary)',
    lineHeight: 1.4,
  },
  taskTitleDone: {
    textDecoration: 'line-through',
    color: 'var(--text-muted)',
  },
  ratingBlock: {
    padding: '14px 12px',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  ratingLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    fontWeight: 600,
  },
  stars: {
    display: 'flex',
    gap: '4px',
  },
  starBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '2px',
    transition: 'transform 0.1s',
  },
  ratingThanks: {
    padding: '14px 12px',
    borderTop: '1px solid var(--border)',
    fontSize: '12px',
    color: 'var(--green)',
    fontWeight: 600,
  },
  controlBar: {
    flexShrink: 0,
    background: 'var(--bg-surface)',
    borderTop: '1px solid var(--border)',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'center',
  },
  controls: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  controlBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '10px 18px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.15s',
    minWidth: '80px',
  },
  controlBtnActive: {
    borderColor: 'var(--accent)',
    background: 'var(--accent-dim)',
  },
  controlBtnOff: {
    borderColor: 'var(--red)',
    background: 'rgba(255,93,108,0.08)',
  },
  controlIcon: {
    fontSize: '20px',
  },
  controlLabel: {
    fontSize: '11px',
    fontWeight: 600,
  },
  leaveBtn: {
    borderColor: 'var(--red)',
    background: 'rgba(255,93,108,0.15)',
    color: 'var(--red)',
    marginLeft: '16px',
  },
};
