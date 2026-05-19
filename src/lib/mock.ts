import type { Member, Task, ActivityItem } from '@/types';

export const SQUAD_NAME = 'Nebula Crew';
export const PROJECT_NAME = 'Acme Coffee — Loyalty Web App';
export const CLIENT_NAME = 'Acme Coffee Co.';

export const members: Member[] = [
  { id: 'm1', name: 'Liam Park', initials: 'LP', color: '#7c5cff', role: 'lead' },
  { id: 'm2', name: 'Emma Rossi', initials: 'ER', color: '#4ea1ff', role: 'member' },
  { id: 'm3', name: 'Noah Kim', initials: 'NK', color: '#3ad29f', role: 'member' },
  { id: 'm4', name: 'Sofia Diaz', initials: 'SD', color: '#ffb547', role: 'member' },
  { id: 'm5', name: 'Aiden Wu', initials: 'AW', color: '#ff5d6c', role: 'member' },
];

export const initialTasks: Task[] = [
  { id: 't1', title: 'Set up Next.js project + Tailwind base', done: true, assignee: 'LP' },
  { id: 't2', title: 'Design loyalty card data model', done: true, assignee: 'NK' },
  { id: 't3', title: 'Build sign-up + login flow', done: true, assignee: 'ER' },
  { id: 't4', title: 'Implement points dashboard component', done: false, assignee: 'ER' },
  { id: 't5', title: 'Wire up Stripe checkout for top-ups', done: false, assignee: 'SD' },
  { id: 't6', title: 'QA pass on mobile breakpoints', done: false, assignee: 'AW' },
  { id: 't7', title: 'Ship v1 to staging for client review', done: false, assignee: 'LP' },
];

export const activity: ActivityItem[] = [
  { id: 'a1', who: 'Liam Park', initials: 'LP', color: '#7c5cff', action: 'scheduled a session for Thursday 7:00 PM', time: '2h ago' },
  { id: 'a2', who: 'Emma Rossi', initials: 'ER', color: '#4ea1ff', action: 'pushed 3 commits to feature/points-dashboard', time: '4h ago' },
  { id: 'a3', who: 'Sofia Diaz', initials: 'SD', color: '#ffb547', action: 'opened PR #24 — Stripe checkout integration', time: '7h ago' },
  { id: 'a4', who: 'Noah Kim', initials: 'NK', color: '#3ad29f', action: 'completed task “Design loyalty card data model”', time: '1d ago' },
  { id: 'a5', who: 'Acme Coffee', initials: 'AC', color: '#a8aec0', action: 'left feedback on the v0.2 prototype', time: '2d ago' },
];

export const sessionNotes = `# Session 12 — Points Dashboard

## Goals
- Finalize points dashboard layout
- Hook up live data from /api/points
- Decide on copy for empty state

## Decisions
- Use a single-column layout on mobile
- Round points to nearest integer in UI
- Defer redemption flow to next session

## Notes
Emma is driving the dashboard component today.
Liam will pair on the API integration after standup.
Client wants a demo by Friday.
`;
