export const SQUAD = {
  name: 'Pixel Wolves',
  rating: 4.8,
  ratingCount: 34,
  members: [
    { id: '1', name: 'Emma Rossi',     role: 'student',    avatar: 'ER', color: '#5b8af0' },
    { id: '2', name: 'Carlos Vega',    role: 'student',    avatar: 'CV', color: '#7c5bf0' },
    { id: '3', name: 'Aiko Tanaka',    role: 'student',    avatar: 'AT', color: '#34d399' },
    { id: '4', name: 'Lena Müller',    role: 'student',    avatar: 'LM', color: '#fbbf24' },
    { id: '5', name: 'Dev Patel',      role: 'student',    avatar: 'DP', color: '#f87171' },
    { id: '6', name: 'Jordan Blake',   role: 'freelancer', avatar: 'JB', color: '#a78bfa' },
  ],
};

export const PROJECT = {
  name: 'Lumio — SaaS landing page',
  client: 'Lumio Inc.',
  dueDate: 'Dec 28, 2024',
  progress: 62,
  tasks: [
    { id: 't1', label: 'Design system tokens',       done: true  },
    { id: 't2', label: 'Hero section',                done: true  },
    { id: 't3', label: 'Features grid',               done: true  },
    { id: 't4', label: 'Pricing table',               done: false },
    { id: 't5', label: 'Testimonials carousel',       done: false },
    { id: 't6', label: 'Footer + mobile polish',      done: false },
  ],
};

export const NEXT_SESSION = new Date(Date.now() + 2 * 3600 * 1000 + 14 * 60 * 1000 + 33 * 1000);

export const ACTIVITY = [
  { id: 'a1', who: 'Jordan Blake',  action: 'pushed a commit',          time: '3 min ago',  color: '#a78bfa' },
  { id: 'a2', who: 'Emma Rossi',    action: 'completed "Features grid"', time: '18 min ago', color: '#5b8af0' },
  { id: 'a3', who: 'Carlos Vega',   action: 'left a note in the doc',   time: '42 min ago', color: '#7c5bf0' },
  { id: 'a4', who: 'Aiko Tanaka',   action: 'RSVP\'d to next session',  time: '1 hr ago',   color: '#34d399' },
  { id: 'a5', who: 'Jordan Blake',  action: 'updated the task list',     time: '2 hrs ago',  color: '#a78bfa' },
];

export const SESSION_NOTES = [
  'Review pricing table design with client feedback',
  'Decide on animation library (Framer vs CSS)',
  'Assign testimonials section to Emma',
  'Schedule final review call for Dec 22',
];

export const SESSION_TASKS = [
  { id: 's1', label: 'Open Figma and share screen',     done: true  },
  { id: 's2', label: 'Review last PR together',          done: true  },
  { id: 's3', label: 'Build pricing table component',    done: false },
  { id: 's4', label: 'Write unit tests for pricing',     done: false },
  { id: 's5', label: 'Deploy preview to Vercel',         done: false },
];
