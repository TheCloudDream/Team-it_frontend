import { TaskPriority, TaskStatus } from "@/types/task";

export const statusLabels: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.BLOCKED]: "Blocked",
  [TaskStatus.UNDER_REVIEW]: "Under Review",
  [TaskStatus.APPROVED]: "Approved",
  [TaskStatus.DONE]: "Done",
};

export const priorityLabels: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "Low",
  [TaskPriority.MEDIUM]: "Medium",
  [TaskPriority.HIGH]: "High",
  [TaskPriority.CRITICAL]: "Critical",
};

export const statusOrder: TaskStatus[] = [
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.BLOCKED,
  TaskStatus.UNDER_REVIEW,
  TaskStatus.APPROVED,
  TaskStatus.DONE,
];
