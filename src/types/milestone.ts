export interface Milestone {
  id: string;
  title: string;
  description: string;

  teamId: string;

  startDate: string;
  dueDate: string;

  progress: number;
}
