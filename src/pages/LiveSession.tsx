import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
  CheckCircle2,
  Circle,
  Users,
  Radio,
  MessageSquare,
  Star,
} from 'lucide-react';
import clsx from 'clsx';
import Avatar from '@/components/Avatar';
import AvatarStack from '@/components/AvatarStack';
import { members, initialTasks, sessionNotes, SQUAD_NAME } from '@/lib/mock';
import type { Task } from '@/types';
import styles from './LiveSession.module.css';

export default function LiveSession() {
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState<boolean>(true);
  const [camOn, setCamOn] = useState<boolean>(true);
  const [sharing, setSharing] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [notes, setNotes] = useState<string>(sessionNotes);
  const [showRate, setShowRate] = useState<boolean>(false);
  const [rated, setRated] = useState<number>(0);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleLeave = () => {
    setShowRate(true);
  };

  const submitRating = () => {
    setShowRate(false);
    navigate('/dashboard');
  };

  const speaker = members[0];
  const others = members.slice(1);

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.headLeft}>
          <div className={styles.liveBadge}>
            <Radio size={13} />
            <span>LIVE</span>
          </div>
          <div>
            <div className={styles.squadName}>{SQUAD_NAME}</div>
            <div className={styles.sessionMeta}>Session 12 · Points dashboard pairing</div>
          </div>
        </div>
        <div className={styles.headRight}>
          <div className={styles.viewers}>
            <Users size={14} />
            <span>{members.length} in room</span>
          </div>
          <AvatarStack members={members} size={28} />
        </div>
      </header>

      <section className={styles.stage}>
        <div className={styles.speaker}>
          <div className={styles.speakerInner}>
            {camOn ? (
              <>
                <div
                  className={styles.speakerAvatar}
                  style={{
                    background: `radial-gradient(circle at 30% 25%, ${speaker.color}cc, ${speaker.color}55 50%, transparent 70%)`,
                  }}
                >
                  <Avatar initials={speaker.initials} color={speaker.color} size={120} />
                </div>
                <div className={styles.speakerLabel}>
                  <span className={styles.speakerName}>{speaker.name}</span>
                  <span className={styles.speakerRole}>Squad leader · speaking</span>
                </div>
                {sharing && (
                  <div className={styles.sharingPill}>
                    <MonitorUp size={13} />
                    Sharing screen
                  </div>
                )}
              </>
            ) : (
              <div className={styles.camOff}>
                <VideoOff size={28} />
                <span>Camera off</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.tiles}>
          {others.map((m) => (
            <div key={m.id} className={styles.tile}>
              <Avatar initials={m.initials} color={m.color} size={48} />
              <div className={styles.tileName}>{m.name.split(' ')[0]}</div>
              <div className={styles.micIcon}>
                <Mic size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.splitView}>
        <div className={styles.notes}>
          <div className={styles.panelHead}>
            <div className={styles.panelTitle}>
              <MessageSquare size={15} />
              Shared notes
            </div>
            <span className={styles.panelHint}>Synced live</span>
          </div>
          <textarea
            className={styles.notesArea}
            value={notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className={styles.checklist}>
          <div className={styles.panelHead}>
            <div className={styles.panelTitle}>
              <CheckCircle2 size={15} />
              Live tasks
            </div>
            <span className={styles.panelHint}>
              {tasks.filter((t) => t.done).length} / {tasks.length} done
            </span>
          </div>
          <div className={styles.taskList}>
            {tasks.map((task) => (
              <button
                key={task.id}
                className={clsx(styles.task, task.done && styles.taskDone)}
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? (
                  <CheckCircle2 size={17} className={styles.taskIconDone} />
                ) : (
                  <Circle size={17} className={styles.taskIcon} />
                )}
                <span>{task.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.controlBar}>
        <div className={styles.controlGroup}>
          <ControlButton
            active={micOn}
            onClick={() => setMicOn((v) => !v)}
            label={micOn ? 'Mute' : 'Unmute'}
            icon={micOn ? <Mic size={18} /> : <MicOff size={18} />}
          />
          <ControlButton
            active={camOn}
            onClick={() => setCamOn((v) => !v)}
            label={camOn ? 'Stop video' : 'Start video'}
            icon={camOn ? <Video size={18} /> : <VideoOff size={18} />}
          />
          <ControlButton
            active={sharing}
            onClick={() => setSharing((v) => !v)}
            label={sharing ? 'Stop sharing' : 'Share screen'}
            icon={<MonitorUp size={18} />}
            accent
          />
        </div>

        <button className={styles.leaveBtn} onClick={handleLeave}>
          <PhoneOff size={16} />
          Leave session
        </button>
      </div>

      {showRate && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Rate this session</h2>
            <p className={styles.modalSub}>
              Your rating updates the squad's score and unlocks your leader's payout.
            </p>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={clsx(styles.star, n <= rated && styles.starActive)}
                  onClick={() => setRated(n)}
                  aria-label={`${n} star`}
                >
                  <Star size={28} fill={n <= rated ? '#ffb547' : 'none'} stroke={n <= rated ? '#ffb547' : '#6b7185'} />
                </button>
              ))}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.modalGhost} onClick={() => navigate('/dashboard')}>
                Skip
              </button>
              <button
                className={styles.modalPrimary}
                onClick={submitRating}
                disabled={rated === 0}
              >
                Submit & leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type ControlButtonProps = {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  accent?: boolean;
};

function ControlButton({ active, onClick, label, icon, accent = false }: ControlButtonProps) {
  return (
    <button
      className={clsx(
        styles.ctrl,
        active && !accent && styles.ctrlOn,
        active && accent && styles.ctrlAccent,
        !active && styles.ctrlOff
      )}
      onClick={onClick}
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );
}
