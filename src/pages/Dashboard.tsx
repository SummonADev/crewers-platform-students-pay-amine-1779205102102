import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import Avatar from '@/components/Avatar';
import AvatarStack from '@/components/AvatarStack';
import { useCountdown } from '@/hooks/useCountdown';
import { SQUAD, PROJECT, NEXT_SESSION, ACTIVITY } from '@/data/mock';
import {
  Users, BookOpen, FolderKanban, CreditCard,
  Star, CheckCircle2, Circle, Video, ChevronRight,
  Zap, Bell,
} from 'lucide-react';

const NAV = [
  { id: 'squad',    label: 'Squad',    icon: <Users size={16} /> },
  { id: 'sessions', label: 'Sessions', icon: <BookOpen size={16} /> },
  { id: 'project',  label: 'Project',  icon: <FolderKanban size={16} /> },
  { id: 'billing',  label: 'Billing',  icon: <CreditCard size={16} /> },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('squad');
  const [tasks, setTasks] = useState(PROJECT.tasks);
  const countdown = useCountdown(NEXT_SESSION);

  const toggleTask = (id: string) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const doneCount = tasks.filter(t => t.done).length;
  const progress = Math.round((doneCount / tasks.length) * 100);

  return (
    <div style={s.root}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sidebarLogo}>
          <Logo size={28} />
          <span style={s.sidebarLogoText}>Crewers</span>
        </div>

        <nav style={s.nav}>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                ...s.navItem,
                background: activeNav === item.id ? 'rgba(91,138,240,0.12)' : 'transparent',
                color: activeNav === item.id ? '#5b8af0' : '#7a8fad',
                borderLeft: `2px solid ${activeNav === item.id ? '#5b8af0' : 'transparent'}`,
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div style={s.sidebarFooter}>
          <Avatar initials="ER" color="#5b8af0" size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e8edf7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Emma Rossi</div>
            <div style={{ fontSize: 11, color: '#3d5270' }}>Student</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={s.main}>
        {/* Header */}
        <div style={s.topBar}>
          <div>
            <div style={s.squadName}>{SQUAD.name}</div>
            <div style={s.squadMeta}>
              <Star size={13} fill="#fbbf24" stroke="none" />
              <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: 13 }}>{SQUAD.rating}</span>
              <span style={{ color: '#3d5270', fontSize: 13 }}>({SQUAD.ratingCount} sessions)</span>
            </div>
          </div>
          <div style={s.topBarRight}>
            <AvatarStack members={SQUAD.members} size={34} />
            <button style={s.notifBtn}><Bell size={16} /></button>
          </div>
        </div>

        <div style={s.content}>
          {/* Project card */}
          <div style={s.projectCard}>
            <div style={s.projectHeader}>
              <div>
                <div style={s.clientBadge}>CLIENT PROJECT</div>
                <div style={s.projectName}>{PROJECT.name}</div>
                <div style={s.projectMeta}>{PROJECT.client} · Due {PROJECT.dueDate}</div>
              </div>
              <div style={s.progressCircle}>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#5b8af0' }}>{progress}%</span>
                <span style={{ fontSize: 11, color: '#3d5270' }}>done</span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={s.barTrack}>
              <div style={{ ...s.barFill, width: `${progress}%` }} />
            </div>

            {/* Task list */}
            <div style={s.taskList}>
              {tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  style={{
                    ...s.taskItem,
                    opacity: task.done ? 0.6 : 1,
                  }}
                >
                  {task.done
                    ? <CheckCircle2 size={16} color="#34d399" />
                    : <Circle size={16} color="#3d5270" />}
                  <span style={{
                    fontSize: 14,
                    color: task.done ? '#7a8fad' : '#e8edf7',
                    textDecoration: task.done ? 'line-through' : 'none',
                  }}>
                    {task.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div style={s.activityCard}>
            <div style={s.sectionTitle}><Zap size={14} color="#5b8af0" /> Recent activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {ACTIVITY.map((a, i) => (
                <div key={a.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: i < ACTIVITY.length - 1 ? '1px solid #1e2d45' : 'none',
                }}>
                  <Avatar initials={a.who.split(' ').map(n => n[0]).join('')} color={a.color} size={30} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: '#e8edf7' }}>{a.who}</span>
                    <span style={{ fontSize: 13, color: '#7a8fad' }}> {a.action}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#3d5270', whiteSpace: 'nowrap' }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Right panel */}
      <aside style={s.rightPanel}>
        <div style={s.sessionCard}>
          <div style={s.sessionLabel}><Video size={13} /> NEXT SESSION</div>
          <div style={s.countdown}>
            <CountBox value={countdown.h} unit="hr" />
            <span style={{ color: '#3d5270', fontSize: 20, fontWeight: 300 }}>:</span>
            <CountBox value={countdown.m} unit="min" />
            <span style={{ color: '#3d5270', fontSize: 20, fontWeight: 300 }}>:</span>
            <CountBox value={countdown.s} unit="sec" />
          </div>
          <div style={{ fontSize: 12, color: '#7a8fad', marginBottom: 16, textAlign: 'center' }}>
            Led by <strong style={{ color: '#a78bfa' }}>Jordan Blake</strong>
          </div>
          <button
            style={s.joinBtn}
            onClick={() => navigate('/session')}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <Video size={15} /> Join session
          </button>
          <div style={s.rsvpRow}>
            <AvatarStack members={SQUAD.members.slice(0, 4)} size={24} />
            <span style={{ fontSize: 12, color: '#3d5270' }}>4 RSVP'd</span>
          </div>
        </div>

        <div style={s.membersCard}>
          <div style={s.sectionTitle}><Users size={14} color="#5b8af0" /> Squad members</div>
          {SQUAD.members.map(m => (
            <div key={m.id} style={s.memberRow}>
              <Avatar initials={m.avatar} color={m.color} size={30} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e8edf7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</div>
                <div style={{ fontSize: 11, color: m.role === 'freelancer' ? '#a78bfa' : '#3d5270', textTransform: 'capitalize' }}>{m.role}</div>
              </div>
              <ChevronRight size={14} color="#3d5270" />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function CountBox({ value, unit }: { value: number; unit: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: '#e8edf7', letterSpacing: '-0.04em', minWidth: 40 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 10, color: '#3d5270', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{unit}</div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    background: '#080c14',
  },
  sidebar: {
    width: 200,
    flexShrink: 0,
    background: '#0b1120',
    borderRight: '1px solid #162035',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
  },
  sidebarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '0 18px 20px',
    borderBottom: '1px solid #162035',
    marginBottom: 16,
  },
  sidebarLogoText: {
    fontSize: 17,
    fontWeight: 800,
    letterSpacing: '-0.04em',
    color: '#e8edf7',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '0 10px',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '9px 12px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    background: 'transparent',
    border: 'none',
    borderLeft: '2px solid transparent',
    width: '100%',
    textAlign: 'left',
  },
  sidebarFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '14px 18px 0',
    borderTop: '1px solid #162035',
    marginTop: 'auto',
  },
  main: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 28px',
    borderBottom: '1px solid #162035',
    background: '#080c14',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  squadName: {
    fontSize: 20,
    fontWeight: 800,
    color: '#e8edf7',
    letterSpacing: '-0.03em',
    marginBottom: 4,
  },
  squadMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  topBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  notifBtn: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: '#0f1623',
    border: '1px solid #1e2d45',
    color: '#7a8fad',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  content: {
    padding: '24px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  projectCard: {
    background: '#0f1623',
    border: '1px solid #1e2d45',
    borderRadius: 16,
    padding: '24px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  clientBadge: {
    display: 'inline-block',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#5b8af0',
    background: 'rgba(91,138,240,0.1)',
    border: '1px solid rgba(91,138,240,0.2)',
    borderRadius: 5,
    padding: '2px 8px',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  projectName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#e8edf7',
    letterSpacing: '-0.02em',
    marginBottom: 4,
  },
  projectMeta: {
    fontSize: 13,
    color: '#7a8fad',
  },
  progressCircle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: 'rgba(91,138,240,0.08)',
    border: '2px solid rgba(91,138,240,0.2)',
    flexShrink: 0,
  },
  barTrack: {
    height: 6,
    background: '#162035',
    borderRadius: 99,
    marginBottom: 20,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #5b8af0, #7c5bf0)',
    borderRadius: 99,
    transition: 'width 0.4s ease',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 10px',
    borderRadius: 8,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background 0.12s',
    width: '100%',
  },
  activityCard: {
    background: '#0f1623',
    border: '1px solid #1e2d45',
    borderRadius: 16,
    padding: '20px 24px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    fontSize: 12,
    fontWeight: 700,
    color: '#7a8fad',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  rightPanel: {
    width: 260,
    flexShrink: 0,
    background: '#0b1120',
    borderLeft: '1px solid #162035',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: '20px 14px',
    overflow: 'auto',
  },
  sessionCard: {
    background: '#0f1623',
    border: '1px solid #1e2d45',
    borderRadius: 14,
    padding: '18px 16px',
  },
  sessionLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#5b8af0',
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  countdown: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  joinBtn: {
    width: '100%',
    padding: '10px',
    background: 'linear-gradient(135deg, #5b8af0, #7c5bf0)',
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
    borderRadius: 9,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginBottom: 12,
    transition: 'transform 0.15s',
  },
  rsvpRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  membersCard: {
    background: '#0f1623',
    border: '1px solid #1e2d45',
    borderRadius: 14,
    padding: '18px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  memberRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 0',
    borderBottom: '1px solid #162035',
  },
};
