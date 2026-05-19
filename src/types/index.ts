export type Role = 'student' | 'freelancer';

export type Member = {
  id: string;
  name: string;
  initials: string;
  color: string;
  role?: 'lead' | 'member';
};

export type Task = {
  id: string;
  title: string;
  done: boolean;
  assignee?: string;
};

export type ActivityItem = {
  id: string;
  who: string;
  initials: string;
  color: string;
  action: string;
  time: string;
};
