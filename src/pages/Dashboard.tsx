import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TASKS = [
  { id: 1, label: 'Set up project repo & CI pipeline', done: true },
  { id: 2, label: 'Design system tokens & component library', done: true },
  { id: 3, label: 'Auth flow (sign-up, login, OAuth)', done: false },
  { id: 4, label: 'Dashboard layout & data wiring', done: false },
  { id: 5, label: 'Client review call prep', done: false },
];

const ACTIVITY = [
  { id: 1, avatar: 'MK', name: 'Maya K.', action: 'marked task done', detail: 'Design system tokens', time: '2m ago', color: '#5b8af0' },
  { id: 2, avatar: 'TL', name: 'Tom L.', action: 'pushed a commit', detail: 'feat: add avatar component', time: '14m ago', color: '#7c5bf0' },
  { id: 3, avatar: 'SR', name: 'Sara R.', action: 'RSVP to session', detail: 'Thursday 7pm UTC', time: '1h ago', color: '#34d399' },
  { id: 4, avatar: 'JD', name: 'Jake D.', action: 'left a comment', detail: 'Great work on the tokens!', time: '2h ago', color: '#fbbf24' },
];

const MEMBERS = [
  { initials: 'EL', color: '#5b8af0', name: 'Emma L.' },
  { initials: 'MK', color: '#7c5bf0', name: 'Maya K.' },
  { initials: 'TL', color: '#34d399', name: 'Tom L.' },
  { initials: 'SR', color: '#fbbf24', name: 'Sara R.' },
  { initials: 'JD', color: '#f87171', name: 'Jake D.' },
];

function useCountdown(targetHours: number) {
  const [seconds, setSeconds] = useState(targetHours * 3600);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const NAV_ITEMS = [
  { icon: '\u2B21', label: 'Squad' },
  { icon: '\uD83D\uDCC5', label: 'Sessions' },
  { icon: '\uD83D\uDCBC', label: 'Project' },
  { icon: '\uD83D\uDCB3', label: 'Billing' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Squad');
  const [tasks, setTasks] = useState(TASKS);
  const countdown = useCountdown(11);

  const doneCount = tasks.filter((t) => t.done).length;
  const progress = Math.round((doneCount / tasks.length) * 100);

  function toggleTask(id: number) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <div style={s.root}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sidebarLogo}>
          <span style={{ fontSize: '20px', color: '#5b8af0' }}>&#x2B21;</span>
          <span style={s.logoText}>Crewers</span>
        </div>
        <nav style={s.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              style={{
                ...s.navItem,
                ...(activeNav === item.label ? s.navItemActive : {}),
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={s.sidebarBottom}>
          <div style={s.sidebarAvatar}>EL</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#e8edf7' }}>Emma Rossi</div>
            <div style={{ fontSize: '11px', color: '#7a8fad' }}>Student</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={s.main}>
        {/* Header */}
        <header style={s.header}>
          <div>
            <div style={s.squadName}>&#x26A1; PixelCrew</div>
            <div style={s.squadMeta}>
              <div style={s.memberStack}>
                {MEMBERS.map((m) => (
                  <div
                    key={m.initials}
                    title={m.name}
                    style={{ ...s.memberAvatar, background: m.color }}
                  >
                    {m.initials}
                  </div>
                ))}
              </div>
              <span style={s.metaSep}>&#xB7;</span>
              <span style={s.rating}>&#9733; 4.9</span>
              <span style={s.metaSep}>&#xB7;</span>
              <span style={{ fontSize: '13px', color: '#7a8fad' }}>5 members</span>
            </div>
          </div>
        </header>

        {/* Content row */}
        <div style={s.contentRow}>
          {/* Project card */}
          <section style={s.projectSection}>
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div>
                  <div style={s.cardLabel}>CURRENT PROJECT</div>
                  <div style={s.cardTitle}>Luminary SaaS Dashboard</div>
                  <div style={s.cardClient}>Client: Luminary Inc. &middot; Sprint 2 of 4</div>
                </div>
                <span style={s.sprintBadge}>In Progress</span>
              </div>

              {/* Progress */}
              <div style={s.progressSection}>
                <div style={s.progressHeader}>
                  <span style={{ fontSize: '13px', color: '#7a8fad' }}>Progress</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#5b8af0' }}>{progress}%</span>
                </div>
                <div style={s.progressBg}>
                  <div style={{ ...s.progressFill, width: `${progress}%` }} />
                </div>
              </div>

              {/* Tasks */}
              <div style={s.taskList}>
                <div style={s.taskListHeader}>Tasks ({doneCount}/{tasks.length})</div>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    style={s.taskItem}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div style={{
                      ...s.taskCheck,
                      ...(task.done ? s.taskCheckDone : {}),
                    }}>
                      {task.done && <span style={{ fontSize: '10px', color: '#080c14' }}>&#x2713;</span>}
                    </div>
                    <span style={{
                      ...s.taskLabel,
                      ...(task.done ? s.taskLabelDone : {}),
                    }}>{task.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div style={{ ...s.card, marginTop: '16px' }}>
              <div style={s.taskListHeader}>Recent Activity</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
                {ACTIVITY.map((a) => (
                  <div key={a.id} style={s.activityItem}>
                    <div style={{ ...s.activityAvatar, background: a.color }}>{a.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#e8edf7' }}>{a.name}</span>
                      <span style={{ fontSize: '13px', color: '#7a8fad' }}> {a.action} </span>
                      <span style={{ fontSize: '13px', color: '#5b8af0' }}>{a.detail}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#3d5270', whiteSpace: 'nowrap' }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right panel */}
          <aside style={s.rightPanel}>
            <div style={s.sessionCard}>
              <div style={s.sessionLabel}>NEXT LIVE SESSION</div>
              <div style={s.sessionTitle}>Sprint Review &amp; Code Walk</div>
              <div style={s.sessionDate}>Thursday &middot; 7:00 PM UTC</div>
              <div style={s.countdown}>{countdown}</div>
              <div style={s.countdownSub}>hours &middot; mins &middot; secs</div>
              <button
                style={s.joinBtn}
                onClick={() => navigate('/session')}
              >
                Join Session &#x2192;
              </button>
              <div style={s.rsvpRow}>
                <span style={{ fontSize: '12px', color: '#7a8fad' }}>Attending:</span>
                <div style={s.rsvpAvatars}>
                  {MEMBERS.slice(0, 3).map((m) => (
                    <div key={m.initials} style={{ ...s.rsvpAvatar, background: m.color }}>
                      {m.initials}
                    </div>
                  ))}
                  <div style={{ ...s.rsvpAvatar, background: '#1e2d45', fontSize: '10px' }}>+2</div>
                </div>
              </div>
            </div>

            <div style={{ ...s.card, marginTop: '16px' }}>
              <div style={s.taskListHeader}>Squad Stats</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                {[
                  { label: 'Sessions completed', value: '8' },
                  { label: 'Tasks shipped', value: '34' },
                  { label: 'Avg. session rating', value: '4.9 \u2605' },
                  { label: 'Revenue generated', value: '$2,400' },
                ].map((stat) => (
                  <div key={stat.label} style={s.statRow}>
                    <span style={{ fontSize: '13px', color: '#7a8fad' }}>{stat.label}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#e8edf7' }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    height: '100vh',
    background: '#080c14',
    overflow: 'hidden',
  },
  sidebar: {
    width: '220px',
    flexShrink: 0,
    background: '#0b1120',
    borderRight: '1px solid #1e2d45',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
  },
  sidebarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px',
    paddingLeft: '4px',
  },
  logoText: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#e8edf7',
    letterSpacing: '-0.02em',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#7a8fad',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s',
    textAlign: 'left',
  },
  navItemActive: {
    background: 'rgba(91,138,240,0.12)',
    color: '#5b8af0',
    fontWeight: 600,
  },
  sidebarBottom: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    paddingTop: '16px',
    borderTop: '1px solid #1e2d45',
  },
  sidebarAvatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#5b8af0,#7c5bf0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
  },
  main: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '28px 32px 20px',
    borderBottom: '1px solid #1e2d45',
  },
  squadName: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#e8edf7',
    letterSpacing: '-0.02em',
    marginBottom: '10px',
  },
  squadMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  memberStack: {
    display: 'flex',
  },
  memberAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 700,
    color: '#fff',
    marginLeft: '-6px',
    border: '2px solid #0b1120',
    flexShrink: 0,
  },
  metaSep: {
    color: '#3d5270',
    fontSize: '14px',
  },
  rating: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#fbbf24',
  },
  contentRow: {
    display: 'flex',
    flex: 1,
    gap: '20px',
    padding: '24px 32px',
    overflow: 'auto',
  },
  projectSection: {
    flex: 1,
    minWidth: 0,
  },
  card: {
    background: '#0f1623',
    border: '1px solid #1e2d45',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  cardLabel: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#5b8af0',
    letterSpacing: '0.08em',
    marginBottom: '4px',
  },
  cardTitle: {
    fontSize: '19px',
    fontWeight: 800,
    color: '#e8edf7',
    letterSpacing: '-0.02em',
    marginBottom: '4px',
  },
  cardClient: {
    fontSize: '13px',
    color: '#7a8fad',
  },
  sprintBadge: {
    background: 'rgba(91,138,240,0.12)',
    color: '#5b8af0',
    fontSize: '12px',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '99px',
    border: '1px solid rgba(91,138,240,0.25)',
    whiteSpace: 'nowrap',
  },
  progressSection: {
    marginBottom: '22px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  progressBg: {
    height: '7px',
    background: '#1e2d45',
    borderRadius: '99px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #5b8af0, #7c5bf0)',
    borderRadius: '99px',
    transition: 'width 0.4s ease',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  taskListHeader: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#7a8fad',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '6px 0',
  },
  taskCheck: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    border: '1.5px solid #1e2d45',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 0.15s, border-color 0.15s',
  },
  taskCheckDone: {
    background: '#5b8af0',
    borderColor: '#5b8af0',
  },
  taskLabel: {
    fontSize: '14px',
    color: '#e8edf7',
    transition: 'color 0.15s',
  },
  taskLabelDone: {
    color: '#3d5270',
    textDecoration: 'line-through',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  activityAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
  },
  rightPanel: {
    width: '280px',
    flexShrink: 0,
  },
  sessionCard: {
    background: 'linear-gradient(145deg, #111b2e, #0f1623)',
    border: '1px solid #1e2d45',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sessionLabel: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#5b8af0',
    letterSpacing: '0.08em',
  },
  sessionTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#e8edf7',
    letterSpacing: '-0.01em',
  },
  sessionDate: {
    fontSize: '13px',
    color: '#7a8fad',
  },
  countdown: {
    fontSize: '36px',
    fontWeight: 800,
    color: '#e8edf7',
    letterSpacing: '0.04em',
    fontVariantNumeric: 'tabular-nums',
    marginTop: '8px',
  },
  countdownSub: {
    fontSize: '10px',
    color: '#3d5270',
    letterSpacing: '0.1em',
    fontWeight: 600,
  },
  joinBtn: {
    marginTop: '8px',
    background: 'linear-gradient(135deg, #5b8af0, #7c5bf0)',
    border: 'none',
    borderRadius: '10px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: 700,
    color: '#fff',
    cursor: 'pointer',
    transition: 'opacity 0.18s',
    width: '100%',
  },
  rsvpRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '4px',
  },
  rsvpAvatars: {
    display: 'flex',
  },
  rsvpAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    fontWeight: 700,
    color: '#fff',
    marginLeft: '-4px',
    border: '2px solid #0f1623',
    flexShrink: 0,
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #1a2640',
  },
};
