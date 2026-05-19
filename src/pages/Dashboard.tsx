import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  FolderKanban,
  CreditCard,
  Star,
  Play,
  Bell,
  Search,
  CheckCircle2,
  Circle,
  Clock,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';
import Logo from '@/components/Logo';
import Avatar from '@/components/Avatar';
import AvatarStack from '@/components/AvatarStack';
import { useCountdown } from '@/hooks/useCountdown';
import { members, initialTasks, activity, SQUAD_NAME, PROJECT_NAME, CLIENT_NAME } from '@/lib/mock';
import type { Task } from '@/types';
import styles from './Dashboard.module.css';

type NavKey = 'squad' | 'sessions' | 'project' | 'billing';

export default function Dashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState<NavKey>('squad');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [rating, setRating] = useState<number>(4.8);

  const sessionAt = useMemo<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(19, 0, 0, 0);
    return d;
  }, []);

  const countdown = useCountdown(sessionAt);
  const completed = tasks.filter((t) => t.done).length;
  const progress = Math.round((completed / tasks.length) * 100);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const ratingBump = () => {
    setRating((r) => Math.min(5, +(r + 0.1).toFixed(1)));
  };

  const memberById = (initials: string) => members.find((m) => m.initials === initials);

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Logo />
        </div>

        <nav className={styles.nav}>
          <SideItem icon={<Users size={18} />} label="Squad" active={active === 'squad'} onClick={() => setActive('squad')} />
          <SideItem icon={<Calendar size={18} />} label="Sessions" active={active === 'sessions'} onClick={() => setActive('sessions')} />
          <SideItem icon={<FolderKanban size={18} />} label="Project" active={active === 'project'} onClick={() => setActive('project')} />
          <SideItem icon={<CreditCard size={18} />} label="Billing" active={active === 'billing'} onClick={() => setActive('billing')} />
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.upgrade}>
            <div className={styles.upgradeIcon}>
              <Sparkles size={16} />
            </div>
            <div>
              <div className={styles.upgradeTitle}>Invite a friend</div>
              <div className={styles.upgradeDesc}>Get 1 month free</div>
            </div>
          </div>
          <div className={styles.me}>
            <Avatar initials="ER" color="#4ea1ff" size={32} />
            <div className={styles.meText}>
              <div className={styles.meName}>Emma Rossi</div>
              <div className={styles.meRole}>Student · Nebula</div>
            </div>
          </div>
        </div>
      </aside>

      <div className={styles.content}>
        <header className={styles.topbar}>
          <div className={styles.search}>
            <Search size={15} />
            <input placeholder="Search squads, tasks, members…" />
          </div>
          <div className={styles.topActions}>
            <button className={styles.iconBtn} aria-label="Notifications">
              <Bell size={17} />
              <span className={styles.dot} />
            </button>
          </div>
        </header>

        <section className={styles.squadHeader}>
          <div className={styles.squadInfo}>
            <div className={styles.squadMeta}>
              <span className={styles.squadKicker}>Squad</span>
              <span className={styles.squadDivider}>·</span>
              <span className={styles.squadStatus}>
                <span className={styles.live} /> Active sprint · Week 4
              </span>
            </div>
            <h1 className={styles.squadName}>{SQUAD_NAME}</h1>
            <div className={styles.squadSub}>
              <AvatarStack members={members} size={32} />
              <div className={styles.squadCount}>{members.length} members</div>
              <div className={styles.ratingPill}>
                <Star size={14} fill="#ffb547" stroke="#ffb547" />
                <strong>{rating.toFixed(1)}</strong>
                <span>squad rating</span>
              </div>
            </div>
          </div>

          <div className={styles.squadActions}>
            <button className={styles.ghostBtn} onClick={ratingBump}>
              <Star size={15} />
              Rate last session
            </button>
            <button className={styles.primaryBtn} onClick={() => navigate('/session')}>
              <Play size={15} fill="currentColor" />
              Join live session
            </button>
          </div>
        </section>

        <section className={styles.grid}>
          <div className={styles.projectCard}>
            <div className={styles.projectHead}>
              <div>
                <div className={styles.projectClient}>Client · {CLIENT_NAME}</div>
                <h2 className={styles.projectTitle}>{PROJECT_NAME}</h2>
              </div>
              <div className={styles.projectStat}>
                <TrendingUp size={14} />
                <span>On track</span>
              </div>
            </div>

            <div className={styles.progressRow}>
              <div className={styles.progressLabel}>
                <span>{progress}% complete</span>
                <span className={styles.progressSub}>{completed} of {tasks.length} tasks done</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className={styles.taskList}>
              {tasks.map((task) => {
                const m = task.assignee ? memberById(task.assignee) : undefined;
                return (
                  <button
                    key={task.id}
                    className={clsx(styles.task, task.done && styles.taskDone)}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.done ? (
                      <CheckCircle2 size={18} className={styles.taskIconDone} />
                    ) : (
                      <Circle size={18} className={styles.taskIcon} />
                    )}
                    <span className={styles.taskTitle}>{task.title}</span>
                    {m && <Avatar initials={m.initials} color={m.color} size={22} title={m.name} />}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className={styles.sidePanel}>
            <div className={styles.sessionCard}>
              <div className={styles.sessionHead}>
                <span className={styles.sessionKicker}>Next session</span>
                <Clock size={14} />
              </div>
              <div className={styles.sessionTitle}>Points dashboard pairing</div>
              <div className={styles.sessionDate}>
                {sessionAt.toLocaleDateString(undefined, { weekday: 'long' })} ·{' '}
                {sessionAt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
              </div>
              <div className={styles.countdown}>
                <CountBox value={countdown.days} label="days" />
                <CountBox value={countdown.hours} label="hrs" />
                <CountBox value={countdown.minutes} label="min" />
                <CountBox value={countdown.seconds} label="sec" />
              </div>
              <button className={styles.sessionBtn} onClick={() => navigate('/session')}>
                <Play size={14} fill="currentColor" />
                Join session
              </button>
              <div className={styles.rsvp}>
                <AvatarStack members={members.slice(0, 4)} size={22} />
                <span>4 of {members.length} RSVP'd</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Sessions this month</span>
                <strong>8</strong>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Leader payout pending</span>
                <strong>$640</strong>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Subscription</span>
                <strong>$49 /mo</strong>
              </div>
            </div>
          </aside>
        </section>

        <section className={styles.activitySection}>
          <div className={styles.activityHead}>
            <h3>Recent squad activity</h3>
            <button className={styles.linkBtn}>View all</button>
          </div>
          <ul className={styles.activityList}>
            {activity.map((a) => (
              <li key={a.id} className={styles.activityItem}>
                <Avatar initials={a.initials} color={a.color} size={32} />
                <div className={styles.activityText}>
                  <span className={styles.activityWho}>{a.who}</span>
                  <span className={styles.activityAction}> {a.action}</span>
                </div>
                <span className={styles.activityTime}>{a.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

type SideItemProps = {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
};

function SideItem({ icon, label, active, onClick }: SideItemProps) {
  return (
    <button className={clsx(styles.navItem, active && styles.navItemActive)} onClick={onClick}>
      <span className={styles.navIcon}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

type CountBoxProps = { value: number; label: string };
function CountBox({ value, label }: CountBoxProps) {
  return (
    <div className={styles.countBox}>
      <span className={styles.countValue}>{String(value).padStart(2, '0')}</span>
      <span className={styles.countLabel}>{label}</span>
    </div>
  );
}
