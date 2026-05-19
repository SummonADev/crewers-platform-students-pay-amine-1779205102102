import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import Avatar from '@/components/Avatar';
import AvatarStack from '@/components/AvatarStack';
import { useCountdown } from '@/hooks/useCountdown';
import { members, initialTasks, activity, SQUAD_NAME, PROJECT_NAME, CLIENT_NAME } from '@/lib/mock';
import type { Task } from '@/types';

const NAV_ITEMS = [
  { icon: '⚡', label: 'Squad', active: true },
  { icon: '🎯', label: 'Sessions', active: false },
  { icon: '📦', label: 'Project', active: false },
  { icon: '💳', label: 'Billing', active: false },
];

// Session is Thursday at 7pm — compute next occurrence
function getNextSession() {
  const now = new Date();
  const d = new Date(now);
  // Thursday = 4
  const daysUntilThurs = (4 - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + daysUntilThurs);
  d.setHours(19, 0, 0, 0);
  return d;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeNav, setActiveNav] = useState('Squad');
  const [rsvped, setRsvped] = useState(false);
  const sessionDate = getNextSession();
  const { hours, minutes, seconds } = useCountdown(sessionDate);
  const completedCount = tasks.filter((t) => t.done).length;
  const progress = Math.round((completedCount / tasks.length) * 100);
  const rating = 4.8;

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <Logo size={26} />
        </div>
        <nav style={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              style={{
                ...styles.navItem,
                ...(activeNav === item.label ? styles.navItemActive : {}),
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={styles.sidebarBottom}>
          <div style={styles.sidebarUser}>
            <Avatar initials="ER" color="#4ea1ff" size={32} />
            <div style={styles.sidebarUserInfo}>
              <span style={styles.sidebarUserName}>Emma Rossi</span>
              <span style={styles.sidebarUserRole}>Student</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h2 style={styles.squadName}>{SQUAD_NAME}</h2>
            <div style={styles.squadMeta}>
              <AvatarStack members={members} size={28} />
              <span style={styles.memberCount}>{members.length} members</span>
              <span style={styles.dot} />
              <span style={styles.rating}>⭐ {rating}</span>
            </div>
          </div>
          <button
            style={styles.sessionBtn}
            onClick={() => navigate('/session')}
          >
            🎥 Join Session
          </button>
        </header>

        {/* Project card */}
        <section style={styles.projectCard}>
          <div style={styles.projectHeader}>
            <div>
              <div style={styles.clientBadge}>{CLIENT_NAME}</div>
              <h3 style={styles.projectName}>{PROJECT_NAME}</h3>
            </div>
            <div style={styles.progressLabel}>{progress}% complete</div>
          </div>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>

          {/* Task list */}
          <div style={styles.taskList}>
            <h4 style={styles.taskListTitle}>Tasks</h4>
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
                  {task.done && <span style={{ fontSize: 11 }}>✓</span>}
                </div>
                <span style={{
                  ...styles.taskTitle,
                  ...(task.done ? styles.taskTitleDone : {}),
                }}>
                  {task.title}
                </span>
                {task.assignee && (
                  <span style={styles.taskAssignee}>{task.assignee}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Activity feed */}
        <section style={styles.activitySection}>
          <h4 style={styles.sectionTitle}>Recent Activity</h4>
          <div style={styles.activityList}>
            {activity.map((item) => (
              <div key={item.id} style={styles.activityItem}>
                <Avatar initials={item.initials} color={item.color} size={32} />
                <div style={styles.activityText}>
                  <span style={styles.activityWho}>{item.who}</span>
                  <span style={styles.activityAction}> {item.action}</span>
                </div>
                <span style={styles.activityTime}>{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Right panel */}
      <aside style={styles.rightPanel}>
        <div style={styles.sessionCard}>
          <div style={styles.sessionCardHeader}>
            <span style={styles.sessionLive}>NEXT SESSION</span>
          </div>
          <div style={styles.sessionTitle}>Session 13 — Live Build</div>
          <div style={styles.sessionDate}>Thursday at 7:00 PM</div>

          <div style={styles.countdown}>
            <div style={styles.countdownUnit}>
              <span style={styles.countdownNum}>{String(hours).padStart(2, '0')}</span>
              <span style={styles.countdownLabel}>hrs</span>
            </div>
            <span style={styles.countdownSep}>:</span>
            <div style={styles.countdownUnit}>
              <span style={styles.countdownNum}>{String(minutes).padStart(2, '0')}</span>
              <span style={styles.countdownLabel}>min</span>
            </div>
            <span style={styles.countdownSep}>:</span>
            <div style={styles.countdownUnit}>
              <span style={styles.countdownNum}>{String(seconds).padStart(2, '0')}</span>
              <span style={styles.countdownLabel}>sec</span>
            </div>
          </div>

          <button
            style={styles.joinBtn}
            onClick={() => navigate('/session')}
          >
            Join Session →
          </button>

          <button
            style={{
              ...styles.rsvpBtn,
              ...(rsvped ? styles.rsvpBtnActive : {}),
            }}
            onClick={() => setRsvped((v) => !v)}
          >
            {rsvped ? '✓ RSVPd' : 'RSVP'}
          </button>
        </div>

        <div style={styles.membersCard}>
          <h4 style={styles.membersTitle}>Your Crew</h4>
          {members.map((m) => (
            <div key={m.id} style={styles.memberRow}>
              <Avatar initials={m.initials} color={m.color} size={32} />
              <div style={styles.memberInfo}>
                <span style={styles.memberName}>{m.name}</span>
                <span style={styles.memberRole}>{m.role === 'lead' ? '👑 Squad Lead' : 'Member'}</span>
              </div>
              <div style={styles.memberOnline} />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--bg-base)',
  },
  sidebar: {
    width: '220px',
    flexShrink: 0,
    background: 'var(--bg-surface)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
  },
  sidebarLogo: {
    padding: '0 20px 28px',
    borderBottom: '1px solid var(--border)',
    marginBottom: '16px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '0 12px',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: 'var(--radius-sm)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  },
  navItemActive: {
    background: 'var(--accent-dim)',
    color: 'var(--accent-bright)',
  },
  navIcon: {
    fontSize: '16px',
  },
  sidebarBottom: {
    padding: '16px 12px 0',
    borderTop: '1px solid var(--border)',
    marginTop: 'auto',
  },
  sidebarUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px',
    borderRadius: 'var(--radius-sm)',
  },
  sidebarUserInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarUserName: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  sidebarUserRole: {
    fontSize: '11px',
    color: 'var(--text-muted)',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  squadName: {
    fontSize: '22px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    marginBottom: '8px',
    color: 'var(--text-primary)',
  },
  squadMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  memberCount: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  dot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'var(--text-muted)',
  },
  rating: {
    fontSize: '13px',
    color: 'var(--yellow)',
    fontWeight: 600,
  },
  sessionBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
  },
  projectCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '28px',
    boxShadow: 'var(--shadow)',
  },
  projectHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  clientBadge: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--accent-bright)',
    background: 'var(--accent-dim)',
    padding: '3px 8px',
    borderRadius: '4px',
    marginBottom: '6px',
  },
  projectName: {
    fontSize: '17px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  progressLabel: {
    fontSize: '13px',
    fontWeight: 700,
    color: 'var(--accent-bright)',
  },
  progressTrack: {
    height: '6px',
    borderRadius: '99px',
    background: 'var(--border)',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  progressFill: {
    height: '100%',
    borderRadius: '99px',
    background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
    transition: 'width 0.4s ease',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  taskListTitle: {
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--text-muted)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  taskRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'background 0.12s',
  },
  taskCheck: {
    width: '18px',
    height: '18px',
    borderRadius: '5px',
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
    fontSize: '14px',
    color: 'var(--text-primary)',
    flex: 1,
    transition: 'all 0.15s',
  },
  taskTitleDone: {
    textDecoration: 'line-through',
    color: 'var(--text-muted)',
  },
  taskAssignee: {
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--text-muted)',
    background: 'var(--bg-surface)',
    padding: '2px 7px',
    borderRadius: '4px',
  },
  activitySection: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '24px',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--text-muted)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  activityText: {
    flex: 1,
    fontSize: '13px',
    lineHeight: 1.5,
  },
  activityWho: {
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  activityAction: {
    color: 'var(--text-secondary)',
  },
  activityTime: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    whiteSpace: 'nowrap',
  },
  rightPanel: {
    width: '280px',
    flexShrink: 0,
    borderLeft: '1px solid var(--border)',
    background: 'var(--bg-surface)',
    overflowY: 'auto',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sessionCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sessionCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sessionLive: {
    fontSize: '10px',
    fontWeight: 800,
    letterSpacing: '0.1em',
    color: 'var(--accent-bright)',
    background: 'var(--accent-dim)',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  sessionTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  sessionDate: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  countdown: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    justifyContent: 'center',
    padding: '16px 0',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
  },
  countdownUnit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  countdownNum: {
    fontSize: '28px',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    color: 'var(--text-primary)',
    fontVariantNumeric: 'tabular-nums',
  },
  countdownLabel: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  countdownSep: {
    fontSize: '24px',
    fontWeight: 800,
    color: 'var(--text-muted)',
    marginBottom: '12px',
  },
  joinBtn: {
    width: '100%',
    padding: '11px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
  },
  rsvpBtn: {
    width: '100%',
    padding: '10px',
    background: 'transparent',
    color: 'var(--text-secondary)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    fontWeight: 600,
    border: '1.5px solid var(--border)',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  rsvpBtnActive: {
    color: 'var(--green)',
    borderColor: 'var(--green)',
    background: 'rgba(58,210,159,0.08)',
  },
  membersCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '20px',
  },
  membersTitle: {
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--text-muted)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '14px',
  },
  memberRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 0',
  },
  memberInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  memberName: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  memberRole: {
    fontSize: '11px',
    color: 'var(--text-muted)',
  },
  memberOnline: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'var(--green)',
    boxShadow: '0 0 6px rgba(58,210,159,0.5)',
  },
};
