export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  BLOCKED = "BLOCKED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  DONE = "DONE",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  teamId: string;

  priority: TaskPriority;
  status: TaskStatus;

  estimatedHours: number;
  actualHours: number;

  dueDate: string;

  createdAt: string;
  updatedAt: string;
}
