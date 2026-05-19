import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/Avatar';
import { SESSION_NOTES, SESSION_TASKS, SQUAD } from '@/data/mock';
import {
  Mic, MicOff, Video, VideoOff, Monitor, PhoneOff,
  CheckCircle2, Circle, FileText, ListChecks,
} from 'lucide-react';

export default function LiveSession() {
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [tasks, setTasks] = useState(SESSION_TASKS);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(SESSION_NOTES);

  const toggleTask = (id: string) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const addNote = () => {
    const trimmed = note.trim();
    if (trimmed) {
      setNotes(n => [...n, trimmed]);
      setNote('');
    }
  };

  return (
    <div style={s.root}>
      {/* Top bar */}
      <div style={s.topBar}>
        <div style={s.topBarLeft}>
          <span style={s.liveDot} />
          <span style={s.liveLabel}>LIVE</span>
          <span style={s.sessionTitle}>Lumio SaaS — Session #7</span>
        </div>
        <div style={s.memberPile}>
          {SQUAD.members.slice(0, 4).map(m => (
            <div key={m.id} title={m.name}>
              <Avatar initials={m.avatar} color={m.color} size={28} />
            </div>
          ))}
          <span style={{ fontSize: 12, color: '#7a8fad', marginLeft: 6 }}>4 in session</span>
        </div>
      </div>

      {/* Video area */}
      <div style={s.videoArea}>
        <div style={s.videoGrid}>
          {/* Main presenter */}
          <div style={s.videoMain}>
            <div style={s.videoPlaceholder}>
              <Avatar initials="JB" color="#a78bfa" size={64} />
              <span style={s.videoName}>Jordan Blake · Squad leader</span>
              {sharing && (
                <div style={s.sharingBadge}><Monitor size={12} /> Sharing screen</div>
              )}
            </div>
          </div>
          {/* Side tiles */}
          <div style={s.videoSide}>
            {SQUAD.members.slice(0, 3).map(m => (
              <div key={m.id} style={s.videoTile}>
                <Avatar initials={m.avatar} color={m.color} size={36} />
                <span style={s.tileLabel}>{m.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div style={s.contentArea}>
        {/* Notes */}
        <div style={s.panel}>
          <div style={s.panelHeader}>
            <FileText size={14} color="#5b8af0" />
            <span>Shared Notes</span>
          </div>
          <div style={s.notesList}>
            {notes.map((n, i) => (
              <div key={i} style={s.noteItem}>
                <span style={s.noteBullet}>·</span>
                <span style={{ fontSize: 14, color: '#c5d0e6', lineHeight: 1.55 }}>{n}</span>
              </div>
            ))}
          </div>
          <div style={s.noteInput}>
            <input
              placeholder="Add a note…"
              value={note}
              onChange={e => setNote(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addNote()}
              style={s.input}
              onFocus={e => (e.currentTarget.style.borderColor = '#5b8af0')}
              onBlur={e => (e.currentTarget.style.borderColor = '#1e2d45')}
            />
            <button onClick={addNote} style={s.addBtn}>Add</button>
          </div>
        </div>

        {/* Tasks */}
        <div style={s.panel}>
          <div style={s.panelHeader}>
            <ListChecks size={14} color="#7c5bf0" />
            <span>Live Task Checklist</span>
          </div>
          <div style={s.tasksList}>
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  ...s.taskItem,
                  background: task.done ? 'rgba(52,211,153,0.04)' : 'transparent',
                }}
              >
                {task.done
                  ? <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0 }} />
                  : <Circle size={16} color="#3d5270" style={{ flexShrink: 0 }} />}
                <span style={{
                  fontSize: 14,
                  color: task.done ? '#7a8fad' : '#e8edf7',
                  textDecoration: task.done ? 'line-through' : 'none',
                  textAlign: 'left',
                }}>
                  {task.label}
                </span>
              </button>
            ))}
          </div>
          <div style={s.taskSummary}>
            {tasks.filter(t => t.done).length} of {tasks.length} tasks done
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={s.bottomBar}>
        <div style={s.controls}>
          <CtrlBtn
            active={micOn}
            color="#5b8af0"
            label={micOn ? 'Mute' : 'Unmute'}
            onClick={() => setMicOn(v => !v)}
          >
            {micOn ? <Mic size={18} /> : <MicOff size={18} />}
          </CtrlBtn>
          <CtrlBtn
            active={camOn}
            color="#5b8af0"
            label={camOn ? 'Stop video' : 'Start video'}
            onClick={() => setCamOn(v => !v)}
          >
            {camOn ? <Video size={18} /> : <VideoOff size={18} />}
          </CtrlBtn>
          <CtrlBtn
            active={sharing}
            color="#7c5bf0"
            label={sharing ? 'Stop share' : 'Share screen'}
            onClick={() => setSharing(v => !v)}
          >
            <Monitor size={18} />
          </CtrlBtn>
        </div>

        <button
          style={s.leaveBtn}
          onClick={() => navigate('/dashboard')}
          onMouseEnter={e => (e.currentTarget.style.background = '#d94f4f')}
          onMouseLeave={e => (e.currentTarget.style.background = '#f87171')}
        >
          <PhoneOff size={16} /> Leave session
        </button>
      </div>
    </div>
  );
}

function CtrlBtn({
  children, active, color, label, onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  color: string;
  label: string;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      title={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '10px 18px',
        borderRadius: 10,
        background: active ? (hov ? color + '28' : color + '18') : (hov ? '#1e2d45' : '#141d2e'),
        border: `1px solid ${active ? color + '55' : '#1e2d45'}`,
        color: active ? color : '#7a8fad',
        cursor: 'pointer',
        transition: 'all 0.15s',
        minWidth: 72,
      }}
    >
      {children}
      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.04em' }}>{label}</span>
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
    background: '#0b1120',
    borderBottom: '1px solid #162035',
    flexShrink: 0,
  },
  topBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#f87171',
    boxShadow: '0 0 8px #f87171',
    animation: 'none',
  },
  liveLabel: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: '0.1em',
    color: '#f87171',
  },
  sessionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#e8edf7',
  },
  memberPile: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  videoArea: {
    height: '36vh',
    flexShrink: 0,
    background: '#06090f',
    borderBottom: '1px solid #162035',
    padding: '12px 16px',
  },
  videoGrid: {
    display: 'flex',
    height: '100%',
    gap: 10,
  },
  videoMain: {
    flex: 1,
  },
  videoPlaceholder: {
    height: '100%',
    background: '#0b1120',
    border: '1px solid #1e2d45',
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    position: 'relative',
  },
  videoName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#7a8fad',
  },
  sharingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    background: 'rgba(124,91,240,0.2)',
    border: '1px solid rgba(124,91,240,0.4)',
    borderRadius: 6,
    padding: '3px 10px',
    fontSize: 11,
    fontWeight: 700,
    color: '#a78bfa',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  videoSide: {
    width: 110,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  videoTile: {
    flex: 1,
    background: '#0b1120',
    border: '1px solid #1e2d45',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  tileLabel: {
    fontSize: 11,
    color: '#7a8fad',
    fontWeight: 600,
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    gap: 0,
  },
  panel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '18px 20px',
    borderRight: '1px solid #162035',
    overflow: 'hidden',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    fontWeight: 700,
    color: '#e8edf7',
    marginBottom: 14,
    letterSpacing: '-0.01em',
  },
  notesList: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 12,
  },
  noteItem: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-start',
  },
  noteBullet: {
    color: '#5b8af0',
    fontWeight: 800,
    fontSize: 18,
    lineHeight: 1.3,
    flexShrink: 0,
  },
  noteInput: {
    display: 'flex',
    gap: 8,
  },
  input: {
    flex: 1,
    background: '#0b1120',
    border: '1.5px solid #1e2d45',
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: 13,
    color: '#e8edf7',
    transition: 'border-color 0.15s',
  },
  addBtn: {
    padding: '8px 14px',
    background: 'rgba(91,138,240,0.15)',
    border: '1px solid rgba(91,138,240,0.3)',
    borderRadius: 8,
    color: '#5b8af0',
    fontWeight: 700,
    fontSize: 13,
    cursor: 'pointer',
  },
  tasksList: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 10px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.12s',
    width: '100%',
  },
  taskSummary: {
    fontSize: 12,
    color: '#3d5270',
    fontWeight: 600,
    marginTop: 12,
    padding: '8px 0 0',
    borderTop: '1px solid #162035',
  },
  bottomBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    background: '#0b1120',
    borderTop: '1px solid #162035',
    flexShrink: 0,
  },
  controls: {
    display: 'flex',
    gap: 10,
  },
  leaveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 20px',
    background: '#f87171',
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
};
